# Modèle Conceptuel de Données (version corrigée)

![Modèle Conceptuel de Données](images/mcd.png)

> Version finale validée. Le schéma Mermaid ci-dessous est conservé comme source éditable.

# Modèle Conceptuel de Données (MCD) - ShopAI

Ce document présente le Modèle Conceptuel de Données pour la plateforme e-commerce ShopAI.

## Diagramme Entité-Association (Mermaid)

```mermaid
erDiagram
    UTILISATEUR {
        int id_utilisateur PK
        string email
        string mot_de_passe
        string nom
        string prenom
        string telephone
        datetime date_creation
        datetime date_derniere_connexion
    }
    
    ROLE {
        int id_role PK
        string nom_role
        string description
    }
    
    PRODUIT {
        int id_produit PK
        string nom
        string reference
        text description
        float prix_ht
        float taux_tva
        int quantite_stock
        string url_image_principale
        boolean est_actif
        datetime date_ajout
    }
    
    CATEGORIE {
        int id_categorie PK
        string nom_categorie
        string description
        int id_categorie_parente
    }
    
    TAG {
        int id_tag PK
        string nom_tag
    }
    
    PANIER {
        int id_panier PK
        datetime date_creation
        datetime date_mise_a_jour
    }
    
    LIGNE_PANIER {
        int id_ligne_panier PK
        int quantite
        datetime date_ajout
    }
    
    COMMANDE {
        int id_commande PK
        string numero_commande
        float total_ht
        float total_ttc
        string statut_commande
        datetime date_commande
        string numero_suivi_colis
    }
    
    LIGNE_COMMANDE {
        int id_ligne_commande PK
        int quantite
        float prix_unitaire_ht_facture
        float taux_tva_facture
    }
    
    ADRESSE {
        int id_adresse PK
        string ligne_1
        string ligne_2
        string code_postal
        string ville
        string pays
        string type_adresse
    }
    
    PAIEMENT {
        int id_paiement PK
        string methode_paiement
        float montant
        string statut_paiement
        string reference_transaction
        datetime date_paiement
    }
    
    AVIS {
        int id_avis PK
        int note
        text commentaire
        boolean est_verifie
        datetime date_publication
    }
    
    LOG_ACTIVITE {
        int id_log PK
        string type_action
        string adresse_ip
        text donnees_supplementaires
        datetime date_action
    }

    %% Relations
    UTILISATEUR }o--o{ ROLE : "possede"
    UTILISATEUR ||--o{ COMMANDE : "passe"
    UTILISATEUR ||--o{ ADRESSE : "enregistre"
    UTILISATEUR ||--o{ AVIS : "publie"
    UTILISATEUR ||--o{ LOG_ACTIVITE : "declenche"
    UTILISATEUR ||--|| PANIER : "utilise"
    
    PANIER ||--o{ LIGNE_PANIER : "contient"
    PRODUIT ||--o{ LIGNE_PANIER : "est ajoute dans"
    
    COMMANDE ||--o{ LIGNE_COMMANDE : "est composee de"
    PRODUIT ||--o{ LIGNE_COMMANDE : "est commande"
    
    COMMANDE ||--|| PAIEMENT : "est reglee par"
    COMMANDE }o--|| ADRESSE : "est livree a"
    COMMANDE }o--|| ADRESSE : "est facturee a"
    
    CATEGORIE ||--o{ PRODUIT : "categorise"
    CATEGORIE ||--o{ CATEGORIE : "est sous-categorie de"
    
    PRODUIT }o--o{ TAG : "est decrit par"
    PRODUIT ||--o{ AVIS : "concerne"
```
