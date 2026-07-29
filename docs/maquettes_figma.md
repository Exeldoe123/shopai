# Maquettes Figma — Inventaire des écrans

> ⚠️ Un fichier `.fig` ne peut pas être généré automatiquement : à créer dans Figma.
> Ce document liste **tous les écrans à maquetter** (déjà implémentés en React) pour aller vite.
> Astuce : l'app tourne déjà — vous pouvez faire des captures d'écran et les importer dans Figma,
> ou recréer les écrans à partir de cette liste. Design system ci-dessous.

## Design system (déjà utilisé dans le code)
- **Thème** : sombre. Fond `#0f172a` (slate-900), surfaces `#1e293b`.
- **Couleurs** : primary (violet/indigo), secondary, accent (jaune/or), success (vert), danger (rouge).
- **Typo** : sans-serif, titres bold, coins arrondis `xl/2xl`.
- **Composants** : Button (primary/secondary/ghost/outline/danger), Card, Input, Modal, Badge, Spinner.

## Écrans publics (storefront)
1. **Accueil** (`/`) — hero + features + catégories + recommandations IA
2. **Catalogue** (`/products`) — grille produits + filtres + tri
3. **Fiche produit** (`/products/:id`) — galerie, prix, stock, quantité, "Ajouter au panier", recommandations IA
4. **Panier** (`/cart`) — lignes produits, quantités, récapitulatif
5. **Checkout** (`/checkout`) — 3 étapes : Livraison → Paiement (COD) → Confirmation
6. **Connexion** (`/login`) — email, mot de passe, **CAPTCHA**
7. **Inscription** (`/register`)
8. **Mes commandes** (`/account/orders`)
9. **Détail commande** (`/account/orders/:id`) — timeline de suivi, articles, adresse
10. **Compte** (`/account`)
11. **404** (`/*`)

## Écrans admin (back-office)
12. **Dashboard** (`/admin`) — KPIs, graphe des ventes, commandes par statut, stock faible
13. **Produits** (`/admin/products`) — table + modal CRUD + **génération IA de fiche**
14. **Commandes** (`/admin/orders`) — table + changement de statut
15. **Utilisateurs** (`/admin/users`) — activer/désactiver
16. **Journal** (`/admin/logs`) — logs paginés

## États à prévoir dans Figma
Pour les écrans clés (catalogue, produit, checkout, dashboard) : état **normal**, **chargement** (spinner),
**vide** (aucun produit / panier vide), **erreur**. Prévoir aussi les variantes **mobile** (responsive).
