# Diagrammes de Séquence - ShopAI

## Scénario 1 : Inscription & Connexion client

```mermaid
sequenceDiagram
    actor Client
    participant Frontend as Interface Web (React)
    participant AuthController as Controleur Auth
    participant AuthService as Service Authentification
    participant BDD as Base de Données

    %% Inscription
    Client->>Frontend: Remplit le formulaire d'inscription
    Frontend->>AuthController: POST /api/auth/register (données)
    AuthController->>AuthService: validateData(données)
    
    alt Données invalides
        AuthService-->>AuthController: Erreur de validation
        AuthController-->>Frontend: 400 Bad Request
        Frontend-->>Client: Affiche les erreurs du formulaire
    else Données valides
        AuthService->>BDD: checkEmailExists(email)
        BDD-->>AuthService: Email disponible
        AuthService->>AuthService: hashPassword(mot_de_passe)
        AuthService->>BDD: createUser(données, mot_de_passe_hash)
        BDD-->>AuthService: User créé
        AuthService-->>AuthController: Success
        AuthController-->>Frontend: 201 Created
        Frontend-->>Client: Affiche message de succès et redirige vers login
    end

    %% Connexion
    Client->>Frontend: Remplit email et mot de passe
    Frontend->>AuthController: POST /api/auth/login (email, password)
    AuthController->>AuthService: authenticate(email, password)
    AuthService->>BDD: getUserByEmail(email)
    
    alt Utilisateur non trouvé ou mot de passe incorrect
        BDD-->>AuthService: User null / Mot de passe invalide
        AuthService-->>AuthController: Unauthorized
        AuthController-->>Frontend: 401 Unauthorized
        Frontend-->>Client: Affiche erreur de connexion
    else Identifiants corrects
        BDD-->>AuthService: User details
        AuthService->>AuthService: verifyPassword(password, hash)
        AuthService->>AuthService: generateJWT(user_id, role)
        AuthService->>BDD: updateLastLogin(user_id)
        AuthService-->>AuthController: Token JWT
        AuthController-->>Frontend: 200 OK (Token)
        Frontend->>Frontend: Stocke le token (localStorage/cookie)
        Frontend-->>Client: Redirige vers la page d'accueil authentifiée
    end
```

## Scénario 2 : Parcours commande (ajout panier → checkout → paiement)

```mermaid
sequenceDiagram
    actor Client
    participant Web as Interface Web
    participant CartAPI as API Panier
    participant OrderAPI as API Commande
    participant PaymentAPI as Service Paiement (Stripe)
    participant BDD as Base de Données

    %% Ajout Panier
    Client->>Web: Clique "Ajouter au panier"
    Web->>CartAPI: POST /api/cart/items (produit_id, qte)
    CartAPI->>BDD: verifierStock(produit_id, qte)
    BDD-->>CartAPI: Stock OK
    CartAPI->>BDD: ajouterLignePanier()
    CartAPI-->>Web: 200 OK (Panier mis à jour)
    Web-->>Client: Notification d'ajout

    %% Checkout
    Client->>Web: Accède au Checkout
    Web->>OrderAPI: GET /api/checkout/summary
    OrderAPI->>BDD: recupererPanier(user_id)
    BDD-->>OrderAPI: Détails panier
    OrderAPI-->>Web: 200 OK (Résumé)
    Client->>Web: Valide adresse et méthode livraison
    Web->>OrderAPI: POST /api/orders (données livraison)
    OrderAPI->>BDD: creerCommande(statut="En attente")
    OrderAPI->>BDD: viderPanier()
    BDD-->>OrderAPI: Commande ID
    OrderAPI-->>Web: 201 Created (Commande ID)

    %% Paiement
    Web->>PaymentAPI: POST /api/payment/create-intent (montant, commande_id)
    PaymentAPI->>PaymentAPI: Contact Stripe API
    PaymentAPI-->>Web: Client Secret
    Web->>Web: Initialise le widget Stripe
    Client->>Web: Saisit coordonnées bancaires et valide
    Web->>PaymentAPI: Confirme le paiement avec Stripe
    PaymentAPI->>PaymentAPI: Valide la transaction (Webhook)
    PaymentAPI->>BDD: majStatutCommande(commande_id, "Payée")
    PaymentAPI->>BDD: enregistrerPaiement()
    PaymentAPI-->>Web: Succès
    Web-->>Client: Redirige vers page de confirmation
```

## Scénario 3 : Recommandation IA (consultation fiche produit → requête LLM → affichage recommandations)

```mermaid
sequenceDiagram
    actor Client
    participant Frontend as Interface Web
    participant ProductCtrl as Controleur Produit
    participant RecoService as AI Recommendation Service
    participant LLM as API LLM (OpenAI/Mistral)
    participant BDD as Base de Données

    Client->>Frontend: Visite la fiche produit (ID: 123)
    Frontend->>ProductCtrl: GET /api/products/123
    ProductCtrl->>BDD: getProductDetails(123)
    BDD-->>ProductCtrl: Données Produit
    ProductCtrl-->>Frontend: 200 OK (Détails)
    Frontend-->>Client: Affiche la fiche produit

    %% Processus asynchrone pour les recommandations
    Frontend->>ProductCtrl: GET /api/products/123/recommendations
    ProductCtrl->>RecoService: getRecommendations(user_id, product_id)
    
    RecoService->>BDD: getProductContext(product_id)
    BDD-->>RecoService: Tags, Catégorie, Description
    
    RecoService->>BDD: getUserHistory(user_id)
    BDD-->>RecoService: Historique achats/vues
    
    RecoService->>RecoService: buildPrompt(Context, History)
    
    RecoService->>LLM: POST /v1/chat/completions (Prompt)
    Note over LLM: Analyse sémantique et<br/>identification de produits<br/>complémentaires
    LLM-->>RecoService: JSON Array [ID_A, ID_B, ID_C]
    
    RecoService->>BDD: getProductsByIds([ID_A, ID_B, ID_C])
    BDD-->>RecoService: Détails des produits recommandés
    
    RecoService-->>ProductCtrl: Liste Produits Formatée
    ProductCtrl-->>Frontend: 200 OK (Recommandations)
    Frontend-->>Client: Affiche la section "Vous aimerez aussi"
```
