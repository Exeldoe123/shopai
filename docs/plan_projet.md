# Plan de Projet — ShopAI

## 1. Diagramme de Gantt (6 semaines)

```mermaid
gantt
    title Planification ShopAI (6 semaines)
    dateFormat YYYY-MM-DD
    axisFormat %W
    section Phase 0-1 : Cadrage & Conception
    Analyse du sujet & cahier des charges     :a1, 2024-03-04, 2d
    Conception BDD (MCD/MLD/MPD)              :a2, after a1, 2d
    Diagrammes UML & maquettes               :a3, after a2, 3d
    section Phase 2 : Sprint 1 (Socle)
    Setup Git + CI GitHub Actions + Docker   :b1, 2024-03-11, 2d
    Auth (JWT, bcrypt, CAPTCHA) + rôles      :b2, after b1, 3d
    Back-office admin (base)                 :b3, after b2, 2d
    section Phase 3 : Sprint 2 (Fonctionnalités)
    API Catalogue & Catégories               :c1, 2024-03-18, 2d
    Panier & Checkout (COD)                  :c2, after c1, 3d
    Intégration front (React + React Query)  :c3, after c2, 2d
    section Phase 4 : Sprint 3 (IA + Admin)
    Service Recommandation (LLM + fallback)  :d1, 2024-03-25, 3d
    Génération de fiches produits (IA)       :d2, after d1, 2d
    Dashboard admin (stats, CRUD, commandes) :d3, after d2, 2d
    section Phase 5 : Finalisation
    Tests unitaires (Jest) & sécurité        :e1, 2024-04-01, 3d
    Conteneurisation Docker & doc            :e2, after e1, 2d
    Rapport PFE & soutenance                 :e3, after e2, 2d
```

## 2. Tableau Kanban (état final)

| À Faire | En Cours | Terminé |
| :--- | :--- | :--- |
| Générer l'APK (Capacitor) | Rédaction du rapport PFE | Dépôt GitHub + branches main/develop |
| Maquettes Figma (.fig) | Étoffement de la documentation | Auth JWT + bcrypt + CAPTCHA |
| Avis produits (perspective) | | Verrouillage anti brute-force |
| Paiement en ligne (perspective) | | CRUD produits + génération IA |
| | | Recommandations IA + fallback |
| | | Panier + Checkout COD |
| | | Dashboard admin + journal d'activité |
| | | Tests Jest (14) + CI GitHub Actions |
| | | Conteneurisation Docker (compose) |

## 3. Matrice RACI

| Tâche | Chef de Projet | Dév. Backend | Dév. Frontend | QA |
| :--- | :---: | :---: | :---: | :---: |
| Cadrage & planning | **A/R** | C | C | I |
| Conception BDD & architecture | C | **A/R** | C | I |
| API REST + sécurité | I | **A/R** | C | C |
| UI/UX (web + PWA) | I | C | **A/R** | C |
| Intégration IA (LLM) | A | **R** | C | C |
| Tests, CI/CD & Docker | A | **R** | C | **R** |

*(R = Réalise, A = Approuve, C = Consulté, I = Informé)*

## 4. Gestion des risques

| Risque | Probabilité | Impact | Mitigation |
| :--- | :---: | :---: | :--- |
| Indisponibilité / coût de l'API LLM | Moyenne | Élevé | **Fallback déterministe** intégré (l'app fonctionne sans clé) |
| Dérive du planning (2 personnes) | Moyenne | Moyen | Découpage en sprints + Kanban + priorisation MVP |
| Incohérence schéma BDD ↔ code | Faible | Élevé | Source unique = modèles Sequelize + `npm run seed` |
| Faille de sécurité (auth) | Faible | Élevé | JWT, bcrypt, CAPTCHA, verrouillage, revue OWASP |
| Environnement de démo non reproductible | Moyenne | Moyen | **Docker Compose** (MySQL + back + front en 1 commande) |
| Perte de code | Faible | Élevé | Git + branches + CI à chaque push |
