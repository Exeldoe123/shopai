# ShopAI — Plateforme E-commerce avec IA

Projet Master 1 CDA — application Full-Stack (React + Node/Express + MySQL) avec un module IA
(recommandations produits + génération de fiches produits), back-office admin complet, et version PWA mobile.

## Stack

| Couche      | Technologies |
|-------------|--------------|
| Front-end   | React 18, Vite, TypeScript, Tailwind, React Query, Zustand, PWA |
| Back-end    | Node.js, Express, TypeScript, Sequelize (ORM) |
| Base        | MySQL 8 |
| IA          | OpenAI (avec fallback déterministe sans clé) |
| Sécurité    | JWT, bcrypt, helmet, rate-limiter, CAPTCHA, verrouillage de compte |
| Qualité     | Jest (14 tests), GitHub Actions CI, Swagger/OpenAPI |

---

## 1. Prérequis
- Node.js 18+
- MySQL 8 en cours d'exécution

## 2. Base de données
Deux options :

**Option A — recommandée (Sequelize seed, toujours cohérente avec le code)**
```bash
cd backend
cp .env.example .env        # ajustez DB_USER / DB_PASS
npm install
npm run seed                # crée les tables + données de démo + comptes
```

**Option B — SQL brut** : `database/schema.sql` + `database/seed.sql` sont fournis comme référence,
mais voir `database/README.md` (ils ont divergé des modèles — utilisez plutôt `npm run seed`).

### Comptes créés par le seed
| Rôle   | Email             | Mot de passe |
|--------|-------------------|--------------|
| Admin  | admin@shopai.ma   | Admin123!    |
| Client | client@shopai.ma  | Client123!   |

## 3. Lancer le back-end
```bash
cd backend
npm run dev          # http://localhost:3000
# API      : http://localhost:3000/api/v1
# Swagger  : http://localhost:3000/api-docs
```
> Astuce : mettez `DB_SYNC=true` dans `.env` pour synchroniser les tables au démarrage (dev uniquement).

## 4. Lancer le front-end
```bash
cd frontend
cp .env.example .env   # VITE_API_URL=http://localhost:3000/api/v1
npm install
npm run dev            # http://localhost:5173
```
Connectez-vous avec le compte admin → vous arrivez sur `/admin`.

## 5. Tests
```bash
cd backend && npm test        # 14 tests (services Auth, Product, AI)
```

## 6. Build production
```bash
cd frontend && npm run build  # génère dist/ + service worker PWA
cd backend  && npm run build  # compile vers dist/
```

---

## 🐳 Exécution avec Docker (le plus simple)

Prérequis : **Docker** + **Docker Compose**. Aucune installation de Node/MySQL requise.

```bash
# 1) Construire et lancer MySQL + backend + frontend
docker compose up -d --build

# 2) Insérer les données de démo + comptes admin/client (one-shot)
docker compose --profile seed run --rm seed

# 3) Ouvrir l'application
#    Frontend : http://localhost
#    API      : http://localhost:3000/api/v1
#    Swagger  : http://localhost:3000/api-docs
```

Commandes utiles :
```bash
docker compose logs -f backend     # voir les logs
docker compose down                # arrêter (les données MySQL sont conservées)
docker compose down -v             # arrêter + supprimer la base
```

> Notes techniques : les tables sont créées automatiquement par le backend (`DB_SYNC=true`),
> le service `seed` insère les données. On n'utilise PAS `schema.sql`/`seed.sql` (voir `database/README.md`).
> Pour activer l'IA réelle, décommentez `OPENAI_API_KEY` dans `docker-compose.yml`.


---

## Module IA
- **Recommandations** (`GET /ai/recommendations/:productId`) : suggère des produits similaires
  via LLM avec repli sur un filtrage par catégorie si aucune clé OpenAI.
- **Génération de fiche produit** (`POST /ai/generate-product`, admin) : à partir d'un nom + mots-clés,
  génère titre, description, caractéristiques et tags SEO (repli déterministe sans clé).

Sans `OPENAI_API_KEY`, l'appli reste 100 % fonctionnelle (mode démo).

## Sécurité (mapping cahier des charges)
| Menace | Mesure |
|--------|--------|
| Broken Access Control | middleware `authenticate` + `isAdmin` sur chaque route sensible ; garde de rôle côté front |
| Cryptographic Failures | mots de passe hachés bcrypt (jamais en clair) |
| Injection SQL | ORM Sequelize (requêtes paramétrées) |
| Security Misconfiguration | `.env`, helmet, CORS |
| Auth Failures | CAPTCHA au login + verrouillage après 5 tentatives + complexité MDP |
| Logging Failures | table `ActivityLog` consultable dans le back-office |

## Endpoints principaux
Auth : `/auth/captcha`, `/auth/register`, `/auth/login`, `/auth/me`
Produits : `/products` (CRUD admin), `/categories`
Panier : `/cart`, `/cart/items`
Commandes : `/orders/checkout`, `/orders/me`, `/orders/:id`, `/orders` (admin), `/orders/:id/status`
IA : `/ai/recommendations/:id`, `/ai/generate-product`
Admin : `/admin/dashboard`, `/admin/users`, `/admin/logs`

Collection Postman complète : `docs/ShopAI.postman_collection.json`.

## Documentation
- `docs/rapport_pfe.md` — rapport PFE
- `docs/plan_projet.md` — Gantt, Kanban, RACI, risques
- `docs/diagrams/` — MCD, MLD, UML (use case, séquence, classes)
- `docs/maquettes_figma.md` — inventaire des écrans pour Figma
- `CHANGELOG_ADMIN.md` — corrections & ajouts
