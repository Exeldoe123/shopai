# Modèle Logique de Données (version corrigée)

![Modèle Logique de Données](images/mld.png)

> Version finale validée. Le schéma Mermaid ci-dessous est conservé comme source éditable.

# Modèle Logique de Données (MLD) - ShopAI

Ce document présente le Modèle Logique de Données, dérivé du MCD, pour l'implémentation physique dans la base de données relationnelle.

## Notation Textuelle

*   **utilisateur** (<ins>id_utilisateur</ins>, email, mot_de_passe, nom, prenom, telephone, date_creation, date_derniere_connexion)
*   **role** (<ins>id_role</ins>, nom_role, description)
*   **utilisateur_role** (<ins>#id_utilisateur</ins>, <ins>#id_role</ins>)
*   **categorie** (<ins>id_categorie</ins>, nom_categorie, description, #id_categorie_parente)
*   **produit** (<ins>id_produit</ins>, nom, reference, description, prix_ht, taux_tva, quantite_stock, url_image_principale, est_actif, date_ajout, #id_categorie)
*   **tag** (<ins>id_tag</ins>, nom_tag)
*   **produit_tag** (<ins>#id_produit</ins>, <ins>#id_tag</ins>)
*   **adresse** (<ins>id_adresse</ins>, ligne_1, ligne_2, code_postal, ville, pays, type_adresse, #id_utilisateur)
*   **panier** (<ins>id_panier</ins>, date_creation, date_mise_a_jour, #id_utilisateur)
*   **ligne_panier** (<ins>id_ligne_panier</ins>, quantite, date_ajout, #id_panier, #id_produit)
*   **commande** (<ins>id_commande</ins>, numero_commande, total_ht, total_ttc, statut_commande, date_commande, numero_suivi_colis, #id_utilisateur, #id_adresse_livraison, #id_adresse_facturation)
*   **ligne_commande** (<ins>id_ligne_commande</ins>, quantite, prix_unitaire_ht_facture, taux_tva_facture, #id_commande, #id_produit)
*   **paiement** (<ins>id_paiement</ins>, methode_paiement, montant, statut_paiement, reference_transaction, date_paiement, #id_commande)
*   **avis** (<ins>id_avis</ins>, note, commentaire, est_verifie, date_publication, #id_utilisateur, #id_produit)
*   **log_activite** (<ins>id_log</ins>, type_action, adresse_ip, donnees_supplementaires, date_action, #id_utilisateur)

## Diagramme avec Clés Étrangères Explicites (Mermaid)

```mermaid
erDiagram
    utilisateur {
        int id_utilisateur PK
        varchar email
        varchar mot_de_passe
        varchar nom
        varchar prenom
        varchar telephone
        datetime date_creation
        datetime date_derniere_connexion
    }
    
    role {
        int id_role PK
        varchar nom_role
        text description
    }
    
    utilisateur_role {
        int id_utilisateur PK, FK
        int id_role PK, FK
    }
    
    produit {
        int id_produit PK
        varchar nom
        varchar reference
        text description
        decimal prix_ht
        decimal taux_tva
        int quantite_stock
        varchar url_image_principale
        boolean est_actif
        datetime date_ajout
        int id_categorie FK
    }
    
    categorie {
        int id_categorie PK
        varchar nom_categorie
        text description
        int id_categorie_parente FK "NULLABLE"
    }
    
    tag {
        int id_tag PK
        varchar nom_tag
    }
    
    produit_tag {
        int id_produit PK, FK
        int id_tag PK, FK
    }
    
    panier {
        int id_panier PK
        datetime date_creation
        datetime date_mise_a_jour
        int id_utilisateur FK "UNIQUE"
    }
    
    ligne_panier {
        int id_ligne_panier PK
        int quantite
        datetime date_ajout
        int id_panier FK
        int id_produit FK
    }
    
    commande {
        int id_commande PK
        varchar numero_commande
        decimal total_ht
        decimal total_ttc
        varchar statut_commande
        datetime date_commande
        varchar numero_suivi_colis
        int id_utilisateur FK
        int id_adresse_livraison FK
        int id_adresse_facturation FK
    }
    
    ligne_commande {
        int id_ligne_commande PK
        int quantite
        decimal prix_unitaire_ht_facture
        decimal taux_tva_facture
        int id_commande FK
        int id_produit FK
    }
    
    adresse {
        int id_adresse PK
        varchar ligne_1
        varchar ligne_2
        varchar code_postal
        varchar ville
        varchar pays
        varchar type_adresse
        int id_utilisateur FK
    }
    
    paiement {
        int id_paiement PK
        varchar methode_paiement
        decimal montant
        varchar statut_paiement
        varchar reference_transaction
        datetime date_paiement
        int id_commande FK "UNIQUE"
    }
    
    avis {
        int id_avis PK
        int note
        text commentaire
        boolean est_verifie
        datetime date_publication
        int id_utilisateur FK
        int id_produit FK
    }
    
    log_activite {
        int id_log PK
        varchar type_action
        varchar adresse_ip
        json donnees_supplementaires
        datetime date_action
        int id_utilisateur FK "NULLABLE"
    }

    utilisateur ||--o{ utilisateur_role : ""
    role ||--o{ utilisateur_role : ""
    
    utilisateur ||--o{ commande : ""
    utilisateur ||--o{ adresse : ""
    utilisateur ||--o{ avis : ""
    utilisateur ||--o{ log_activite : ""
    utilisateur ||--|| panier : ""
    
    panier ||--o{ ligne_panier : ""
    produit ||--o{ ligne_panier : ""
    
    commande ||--o{ ligne_commande : ""
    produit ||--o{ ligne_commande : ""
    
    commande ||--|| paiement : ""
    adresse ||--o{ commande : "livraison"
    adresse ||--o{ commande : "facturation"
    
    categorie ||--o{ produit : ""
    categorie ||--o{ categorie : ""
    
    produit ||--o{ produit_tag : ""
    tag ||--o{ produit_tag : ""
    
    produit ||--o{ avis : ""
```
