# Corrections & ajouts — partie Admin

## Bugs corrigés (bloquants)
- **Associations Sequelize non enregistrées** : `models/index.ts` n'était importé nulle part → toute requête avec `include:` plantait. Ajout de `import './models'` dans `app.ts`.
- **Tests injouables** : ajout de `jest.config.js` (ts-jest). `npm test` → 14/14 ✅.
- **Recherche produit** : `$like` (invalide en Sequelize v6) → `[Op.like]`.
- **URL API front/back** : le front appelait `/api`, le back sert `/api/v1` → corrigé.
- **Test IA** : client OpenAI initialisé au chargement du module → init lazy (`getClient()`).

## Ajouts back-end
- `PUT /products/:id` et `DELETE /products/:id` (admin) — le Service avait déjà `update`/`delete`, routes+controllers exposés.
- `POST /ai/generate-product` (admin) — génération de fiche produit par IA (Option B) avec fallback sans clé API.
- `GET /admin/dashboard` enrichi : commandes par statut, produits en stock faible, CA mensuel.
- `GET /orders` (admin) inclut désormais le client (email/nom).

## Ajouts front-end (partie admin branchée au vrai backend)
- `ProtectedRoute` (garde de rôle admin) + `AdminNav` (navigation entre les pages).
- `adminService.ts` : tous les appels admin.
- **Dashboard** : stats réelles, graphe des ventes, stock faible, commandes par statut.
- **Produits** : liste réelle + création/édition/suppression + bouton "Générer avec l'IA".
- **Commandes** : liste réelle + changement de statut en direct.
- **Utilisateurs** : liste réelle + activer/désactiver.
- **Journal** : nouvelle page (logs d'activité paginés).

---

# Session 2 — Storefront branché + config + livrables

## Storefront relié au backend (fin des mocks)
- `productService` / `aiService` / `authService` / `orderService` : appels réels + `mappers.ts`
  (conversion des DECIMAL string → number, shape backend → types front).
- **Login** : vraie authentification + **CAPTCHA** (défi serveur).
- **Register** : vraie inscription + connexion automatique.
- **Checkout** : création de commande réelle (`POST /orders/checkout`), paiement à la livraison,
  décrément de stock en transaction, prix recalculés côté serveur.
- **Mes commandes** / **Détail commande** : données réelles + timeline de suivi.
- Correction de l'enum de statut (`pending/confirmed/shipped/delivered/cancelled`).

## Backend — nouveautés
- `POST /orders/checkout` (commande directe depuis le panier client) + includes enrichis
  (OrderItems→Product, Address) + contrôle de propriété sur `GET /orders/:id`.
- `GET /auth/captcha` + vérification CAPTCHA au login (`utils/captcha.ts`).
- Script de seed Sequelize `npm run seed` (crée le schéma + données + comptes admin/client).
- Option `DB_SYNC=true` pour synchroniser les tables au démarrage (dev).

## Config / DB
- `database/schema.sql` avait divergé des modèles → voir `database/README.md`.
  **Méthode fiable : `npm run seed`**. Comptes : admin@shopai.ma / Admin123!, client@shopai.ma / Client123!.
- `.env.example` mis à jour (front + back).

## Livrables cahier des charges
- **Collection Postman** complète : `docs/ShopAI.postman_collection.json`.
- **CAPTCHA** au login (exigence Auth Failures) ✅.
- **PWA** mobile : build vérifié (service worker + manifeste générés).
- **Rapport PFE** : addendum « état réel de l'implémentation » (stack MySQL/Sequelize/COD, sécurité OWASP, IA, tests).
- **Figma** : inventaire des écrans `docs/maquettes_figma.md` (le .fig reste à créer manuellement).

## Reste à faire (manuel)
- Créer le fichier Figma (.fig) à partir de l'inventaire fourni.
- Générer l'APK si React Native souhaité (sinon la PWA suffit).
- Compléter le rapport PFE avec vos captures d'écran et le remplir à 30 pages.

---

# Session 3 — Corrections critiques (backend qui crashait dans Docker)

Diagnostic réalisé en exécutant réellement le backend compilé contre une base MySQL.

## 🐛 Bug 1 — `useDefineForClassFields` (CRITIQUE, cassait tous les modèles)
Avec `target: es2022`, TypeScript émettait les champs de classe (`public password!: string`)
comme de vraies propriétés initialisées à `undefined`, **masquant les getters Sequelize**.
Conséquence : `user.password` était `undefined` → le seed plantait, le hachage échouait.
→ Ajout de `"useDefineForClassFields": false` dans `tsconfig.json`.

## 🐛 Bug 2 — Clés étrangères mal formées (errno 150)
`Payment.orderId`, `Review.userId` et `Review.productId` sont `NOT NULL`, mais les
associations n'avaient pas d'`onDelete` → Sequelize appliquait `SET NULL` sur des colonnes
NOT NULL → les tables `Payments` et `Reviews` n'étaient jamais créées.
→ Ajout de `onDelete: 'CASCADE'` sur ces associations. **13/13 tables créées.**

## 🐛 Bug 3 — Boucle de redémarrage du conteneur backend
`sequelize.sync({ alter: true })` était appelé sans `try/catch` dans un callback async :
la moindre erreur provoquait une *unhandled rejection* → crash → `Restarting (1)` en boucle.
→ Démarrage résilient : reconnexion BDD avec 15 tentatives, `sync()` simple (sans `alter`)
protégé par try/catch, handler global `unhandledRejection`. Le serveur démarre toujours.

## 🔧 bcrypt → bcryptjs
`bcrypt` est un module natif qui doit être compilé (échecs fréquents sur Alpine/Docker et Windows).
Remplacé par **bcryptjs** (pur JavaScript, hachages 100 % compatibles `$2b$`).
Dockerfile simplifié (plus besoin de python3/make/g++).

## ✅ Validation end-to-end réelle (backend compilé + MySQL)
- Seed : 6 produits, 4 catégories, 2 comptes ✅
- Login admin avec CAPTCHA → token JWT ✅
- Dashboard admin : CA 389,98 € / 1 commande / 2 clients / 2 stocks faibles ✅
- Checkout client : commande créée, **stock décrémenté 5 → 3** ✅
- Modification d'un utilisateur par l'admin ✅
- Auto-suppression admin bloquée (400) ✅
- Accès sans token refusé (401) ✅
- 19/19 tests unitaires ✅

---

# Session 4 — Jeu de données enrichi pour la démonstration

Objectif : un catalogue et un tableau de bord réalistes devant le jury.

## Contenu du seed (`npm run seed`)
- **24 produits** répartis sur **5 catégories** (High-Tech, Mode, Maison Connectée, Sport, Gaming)
- **7 utilisateurs** : 1 admin, 5 clients actifs, 1 compte désactivé (pour démontrer la gestion)
- **12 commandes** réparties sur **6 mois**, couvrant **tous les statuts**
  (pending, confirmed, shipped, delivered, cancelled) → le graphique des ventes est rempli
- **7 produits en stock faible** → les alertes du dashboard sont visibles
- **8 entrées de journal d'activité** (connexions, création produit, échec de connexion…)

## Correction
`schema.sql` ne contenait pas les tables `Payments` et `Reviews` (présentes dans les modèles),
ce qui interrompait l'import de `seed.sql`. → Tables ajoutées, les deux chemins d'import validés.

## Vérifié sur une vraie base MySQL
- `npm run seed` ✅
- `mysql < schema.sql && mysql < seed.sql` → 24 produits, 7 users, 12 commandes, 22 lignes ✅
- `mysql < shopai_dump.sql` ✅
- Dashboard admin : **CA 3 124,72 €**, 12 commandes, 7 clients, 5 statuts, 7 stocks faibles,
  graphique sur 5 mois ✅
- 19/19 tests unitaires ✅
