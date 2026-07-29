# Base de données

Deux méthodes équivalentes pour initialiser la base :

## Méthode 1 — SQL brut (livrable §5.5)
Les scripts sont désormais **alignés sur les modèles** de l'application.
```bash
mysql -u root -p < schema.sql   # crée la base + les tables
mysql -u root -p < seed.sql     # insère les données de démonstration
```

## Méthode 2 — Seed Sequelize (recommandée en dev)
```bash
cd ../backend && npm run seed
```
Crée le schéma à partir des modèles + les mêmes données.

## Comptes de démonstration
| Rôle   | Email                                             | Mot de passe |
|--------|---------------------------------------------------|--------------|
| Admin  | admin@shopai.ma                                   | Admin123!    |
| Client | client@shopai.ma                                  | Client123!   |
| Client | sara@ · omar@ · fatima@ · mehdi@shopai.ma         | Client123!   |
| Client | compte.bloque@shopai.ma *(désactivé, pour démo)*  | Client123!   |

## Contenu du jeu de données
24 produits · 5 catégories · 7 utilisateurs · 12 commandes réparties sur 6 mois
(tous les statuts représentés) · 7 produits en stock faible · 8 entrées de journal.

> Les mots de passe dans `seed.sql` sont des hachages **bcrypt** (jamais en clair).
> Périmètre : le schéma implémenté (MVP) couvre le parcours COD. La conception complète
> (Avis, Paiement en ligne, TVA détaillée) figure dans les diagrammes `docs/diagrams/`.
