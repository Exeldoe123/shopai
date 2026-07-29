# Rapport PFE : Conception et Développement de la Plateforme e-commerce ShopAI avec Intégration IA

## Page de Garde
*   **Titre** : Conception et Développement de ShopAI, une plateforme e-commerce intelligente
*   **Auteur** : [Nom de l'étudiant]
*   **Formation** : Master 1 Concepteur Développeur d'Applications (CDA)
*   **Année Universitaire** : 2023-2024
*   **Tuteur Entreprise / Tuteur Pédagogique** : [Nom du tuteur]

---

## Sommaire
1. Introduction
2. Chapitre 1 : Analyse des besoins
3. Chapitre 2 : Conception de l'application
4. Chapitre 3 : Développement et Implémentation
5. Chapitre 4 : Tests & Qualité
6. Chapitre 5 : Bilan et Perspectives
7. Conclusion
8. Bibliographie et Webographie
9. Annexes

---

## Introduction
Le domaine du e-commerce est en constante évolution, avec une exigence croissante de personnalisation de l'expérience utilisateur. Le projet **ShopAI** s'inscrit dans cette dynamique en proposant une plateforme de commerce en ligne moderne intégrant des fonctionnalités d'Intelligence Artificielle pour guider le client. Ce rapport détaille le processus complet de réalisation de ce projet de fin d'études (PFE), de l'analyse initiale au déploiement, en passant par l'architecture logicielle et l'intégration des modèles LLM (Large Language Models).

---

## Chapitre 1 : Analyse des besoins

### 1.1 Contexte et Enjeux
L'objectif est de créer un système capable de gérer le cycle complet de vente en ligne, tout en se démarquant par des suggestions de produits intelligentes basées sur le contexte sémantique plutôt que de simples règles statiques.

### 1.2 Besoins Fonctionnels
*   **Gestion des Utilisateurs** : Inscription, authentification (JWT), gestion de profil.
*   **Catalogue** : Affichage des produits, catégories, tags, recherche textuelle.
*   **Processus d'Achat** : Gestion du panier, tunnel de commande (Checkout), paiement sécurisé (Stripe).
*   **Administration** : Dashboard pour la gestion des stocks, suivi des commandes.
*   **Module IA** : Génération de recommandations de produits personnalisées via un LLM.

### 1.3 Besoins Non-Fonctionnels
*   **Performances** : Temps de réponse API < 200ms (hors appels IA).
*   **Sécurité** : Protection contre l'injection SQL, XSS, CSRF, et hachage des mots de passe.
*   **Maintenabilité** : Architecture en microservices ou monolithique modulaire, code commenté et documenté.
*   **Disponibilité** : Tolérance aux pannes du service IA (fallback sur recommandations classiques).

### 1.4 Personas Utilisateurs
*   **Alice, 28 ans, Cliente régulière** : Cherche une expérience d'achat fluide et des suggestions pertinentes basées sur ses goûts.
*   **Bob, 45 ans, Administrateur** : A besoin d'une interface claire pour suivre le chiffre d'affaires et gérer les stocks facilement.

---

## Chapitre 2 : Conception

### 2.1 Choix Technologiques
*   **Backend** : Node.js avec Express / NestJS pour la robustesse et l'écosystème asynchrone.
*   **Frontend** : React.js avec Tailwind CSS pour un rendu rapide et responsive.
*   **Base de données** : PostgreSQL pour la fiabilité transactionnelle (ACID) essentielle au e-commerce.
*   **IA** : API OpenAI (GPT-3.5/4) ou modèle Open Source via Hugging Face pour l'analyse sémantique.
*   **Infrastructure** : Docker pour la conteneurisation.

### 2.2 Architecture Système
L'architecture suit un modèle Client-Serveur classique, avec une API REST stateless. Les requêtes IA sont gérées de manière asynchrone pour ne pas bloquer le thread principal du serveur.

### 2.3 Modélisation des Données (MCD/MLD)
La base de données est structurée autour des entités centrales : Utilisateur, Produit, et Commande.
*(Référence aux diagrammes MCD et MLD créés en annexe)*

### 2.4 Modélisation UML
Définition des comportements à l'aide des diagrammes de cas d'utilisation, de classes et de séquence.
*(Référence aux diagrammes de conception créés dans le projet)*

---

## Chapitre 3 : Développement

### 3.1 Architecture du Code (Backend)
Mise en place d'une architecture en couches (Controllers, Services, Repositories) pour séparer les responsabilités. Utilisation d'un ORM (Prisma ou TypeORM) pour interagir avec PostgreSQL.

### 3.2 Développement de l'API REST
Création des endpoints sécurisés. L'authentification utilise des JSON Web Tokens (JWT) passés dans le header `Authorization`.

### 3.3 Module Intelligence Artificielle
Le service `AIRecommendationService` agrège l'historique de l'utilisateur et les métadonnées des produits, construit un "Prompt" structuré, et interroge l'API LLM. Une couche de parsing valide et nettoie la réponse JSON générée par l'IA avant de la renvoyer au client. Mise en cache via Redis pour limiter les coûts d'API.

### 3.4 Sécurité et Paiement
Intégration du SDK Stripe. Le backend génère un `Client Secret`, et le frontend gère la saisie sécurisée avec `Stripe Elements`. Mise en place de webhooks pour confirmer la transaction en base de données.

---

## Chapitre 4 : Tests & Qualité

### 4.1 Stratégie de Tests
*   **Tests Unitaires** : Jest pour tester la logique métier (calcul des totaux du panier, vérification des règles de réduction).
*   **Tests d'Intégration** : Supertest pour vérifier le comportement des endpoints API avec une base de données de test.
*   **Tests End-to-End (E2E)** : Cypress pour simuler le parcours d'achat complet d'un utilisateur sur le navigateur.

### 4.2 Résultats et Couverture
Objectif de couverture de code (Code Coverage) de 75%. Intégration d'outils comme SonarQube pour l'analyse statique du code (détection de "code smells" et vulnérabilités).

---

## Chapitre 5 : Bilan

### 5.1 Rétrospective de Projet
Le projet a été mené à bien en suivant la méthodologie Agile (Kanban). La modélisation préalable a permis de gagner un temps précieux lors du développement de la base de données.

### 5.2 Difficultés Rencontrées
*   Gestion des réponses non-déterministes du modèle LLM : nécessité d'implémenter un système de *retry* et des prompts très stricts pour forcer une sortie JSON valide.
*   Configuration des Webhooks Stripe en environnement de développement local (contourné grâce à Stripe CLI).

### 5.3 Améliorations Futures
*   Remplacement de l'API tierce IA par un modèle local (LLaMA) hébergé sur nos propres serveurs pour réduire les coûts et garantir la confidentialité des données.
*   Ajout d'une application mobile (React Native).
*   Mise en place d'une architecture microservices complète pour scaler la partie IA indépendamment du système de commande.

---

## Conclusion
Le projet ShopAI démontre la faisabilité d'intégrer des technologies d'IA générative modernes dans une architecture e-commerce classique, apportant une réelle valeur ajoutée à l'expérience client. Ce PFE m'a permis de consolider mes compétences en développement full-stack tout en abordant des problématiques complexes liées au paiement et à l'ingénierie des prompts (Prompt Engineering).

---

## Bibliographie
*   Documentation officielle de React (react.dev)
*   Documentation de l'API Stripe (stripe.com/docs/api)
*   "Clean Architecture" par Robert C. Martin
*   Documentation OpenAI API Reference

---

## Annexes

### Annexe 1 : Liste Principale des Endpoints API
*   `POST /api/auth/register` : Création de compte
*   `POST /api/auth/login` : Connexion
*   `GET /api/products` : Liste des produits (avec filtres)
*   `GET /api/products/:id/recommendations` : Appel IA pour suggestions
*   `POST /api/cart/items` : Ajout au panier
*   `POST /api/orders` : Création de commande
*   `POST /api/payment/create-intent` : Initialisation du paiement

---

# Addendum — État réel de l'implémentation (à intégrer dans les chapitres)

> ⚠️ Les chapitres ci-dessus contiennent quelques éléments **idéalisés** qui diffèrent du code livré
> (PostgreSQL→MySQL, Prisma→Sequelize, Stripe→Paiement à la livraison, pas de Redis).
> Cet addendum décrit l'**implémentation réelle** — c'est la version à défendre devant le jury.

## A. Stack réellement utilisée
- **Base de données** : MySQL 8, via l'ORM **Sequelize** (et non PostgreSQL/Prisma).
- **Paiement** : **Paiement à la livraison (COD)**, adapté au marché ciblé, plutôt que Stripe.
  Le tunnel de commande reste en 3 étapes (livraison → mode de paiement → confirmation).
- **IA** : OpenAI GPT-3.5, avec un **repli déterministe** si aucune clé n'est configurée
  (l'application reste 100 % démontrable sans coût d'API). Pas de cache Redis (hors périmètre),
  mais l'architecture le permettrait.

## B. Architecture en couches (réelle)
```
Route (Express Router)  →  Controller  →  Service (logique métier)  →  Modèle Sequelize  →  MySQL
```
- **Middlewares transverses** : `authenticate` (vérif JWT), `isAdmin` (contrôle de rôle),
  `rateLimiter` (anti brute-force), `logger`, `errorHandler` (gestion centralisée des erreurs).
- **Associations** centralisées dans `models/index.ts` (relations 1-N et N-N Product/Tag).
- Le front consomme l'API via une couche `services/` typée + **React Query** (cache, invalidation).

## C. Module IA — deux fonctionnalités
1. **Recommandations** (`GET /ai/recommendations/:productId`) : le service construit un prompt à partir
   de la fiche produit + l'historique d'achat, interroge le LLM, parse et valide le JSON, puis mappe
   les noms renvoyés vers de vrais produits en base. **Fallback** : filtrage par catégorie.
2. **Génération de fiche produit** (`POST /ai/generate-product`, admin) : à partir d'un nom + mots-clés,
   le LLM renvoie titre, description marketing, caractéristiques et tags SEO (format JSON strict).
   Le résultat est **éditable** avant enregistrement, conformément à l'option B du cahier des charges.

## D. Parcours de commande implémenté
Inscription → Connexion (avec CAPTCHA) → Catalogue → Fiche produit → Panier (Zustand, persistant) →
Checkout (adresse + COD) → `POST /orders/checkout` (les prix sont **recalculés côté serveur**, le stock
est décrémenté dans une **transaction**) → Confirmation → Suivi dans « Mes commandes » (timeline de statut).

## E. Sécurité (OWASP — mesures effectives)
| Risque OWASP | Mesure implémentée | Où |
|--------------|--------------------|-----|
| Broken Access Control | JWT + `isAdmin` sur chaque route sensible ; garde de rôle côté front (`ProtectedRoute`) ; vérification de propriété sur `GET /orders/:id` | `middleware/`, `App.tsx` |
| Cryptographic Failures | Hachage **bcrypt** (hook `beforeCreate`), aucun mot de passe en clair | `models/User.ts` |
| Injection | Requêtes paramétrées via l'ORM Sequelize | `services/` |
| Security Misconfiguration | `helmet`, CORS, secrets en `.env` | `app.ts` |
| Auth Failures | **CAPTCHA** au login (défi serveur à usage unique) + **verrouillage** après 5 tentatives + complexité MDP (regex) | `utils/captcha.ts`, `models/User.ts`, `utils/validators.ts` |
| Logging Failures | Table `ActivityLog` consultable dans le back-office | `models/ActivityLog.ts`, page Journal |

## F. Tests & qualité (résultats réels)
- **14 tests unitaires Jest** au vert (services Auth, Product, AI), avec mocks des modèles et d'OpenAI.
- Couverture générée via `jest --coverage`.
- **CI GitHub Actions** (`.github/workflows/ci.yml`) : install, build, tests à chaque push.
- Typage strict TypeScript (front et back compilent sans erreur).

## G. Back-office administrateur (livré)
Tableau de bord (CA, commandes par statut, alertes stock faible, graphe des ventes mensuelles),
CRUD produits avec génération IA, gestion des commandes (changement de statut), gestion des
utilisateurs (activation/désactivation), et journal d'activité paginé.

## H. Mobile / PWA
Le front est une **PWA** (`vite-plugin-pwa`) : service worker + manifeste générés au build,
installable sur mobile (« Ajouter à l'écran d'accueil »). C'est la solution mobile retenue
(alternative acceptée par le cahier des charges à React Native/Flutter).

## I. Perspectives concrètes
Intégration d'un vrai PSP (Stripe/CMI), cache Redis pour les recommandations, avis produits,
recherche à facettes, et export React Native en réutilisant la couche `services/`.
