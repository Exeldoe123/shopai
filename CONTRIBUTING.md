# Convention de contribution — ShopAI

## Stratégie de branches (Git Flow simplifié)
- **main** : code stable, prêt pour la production. Chaque merge = version livrable.
- **develop** : branche d'intégration où les fonctionnalités sont assemblées.
- **feature/xxx** : une branche par fonctionnalité (ex. `feature/checkout`, `feature/ia-reco`).

Flux : `feature/*` → PR vers `develop` → (CI verte) → merge → PR `develop` → `main`.

## Commandes
```bash
git checkout develop
git checkout -b feature/ma-fonctionnalite
# ... commits ...
git push -u origin feature/ma-fonctionnalite
# ouvrir une Pull Request vers develop sur GitHub
```

## Convention de commits (Conventional Commits)
`type(scope): description`
- **feat** : nouvelle fonctionnalité — `feat(cart): ajout du checkout COD`
- **fix** : correction de bug — `fix(auth): captcha à usage unique`
- **docs** : documentation — `docs(readme): section Docker`
- **test** : tests — `test(product): couverture du service`
- **refactor**, **chore**, **ci** : refactor, tâches, pipeline

## Règles
- Ne jamais committer de fichier `.env` (seuls les `.env.example` sont versionnés).
- Une PR doit passer la CI (tests + build + images Docker) avant merge.
- Un reviewer minimum par PR.
