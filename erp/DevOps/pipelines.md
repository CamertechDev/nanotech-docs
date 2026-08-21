# Pipelines CI/CD

## Statut : 🟡 Proposé

## Un seul pipeline, pas un par service

Cohérent avec la décision "monolithe modulaire" (`Architecture/architecture.md`) : **un
seul pipeline de build/test/déploiement**, pas un pipeline par microservice. Simplifie
drastiquement la maintenance pour un développeur seul.

## Pipeline minimal recommandé (GitHub Actions ou Azure DevOps, tier gratuit)

```yaml
# Étapes conceptuelles, à adapter à l'outil choisi
1. Build      → dotnet build (API) + npm run build (frontend, si Angular)
2. Test       → dotnet test (tests unitaires domaine — voir clean-architecture.md)
3. Migration  → dotnet ef database update (environnement cible)
4. Deploy     → publication vers Azure App Service (voir azure.md)
```

## Ce qui n'est pas recommandé en première itération

- Pipelines séparés par environnement multiples (dev/staging/preprod/prod) — voir
  `environments.md`, recommandation à 2 environnements seulement.
- Déploiements bleu/vert ou canary — complexité opérationnelle non justifiée pour le volume
  d'utilisateurs actuel et l'effectif de l'équipe.
- Tests end-to-end automatisés lourds (ex : Cypress complet) avant d'avoir au moins un module
  stable en production — prioriser les tests unitaires sur les règles de calcul (cubage,
  provisions — voir `Domain/services.md`), qui ont le risque financier le plus élevé.

## Gestion des migrations de base partagée avec le legacy

🔴 Rappel (voir `Database/migrations.md`) : le pipeline doit garantir que les migrations de
schéma restent rétro-compatibles avec le legacy VB tant que la coexistence dure — prévoir une
étape de vérification (même manuelle au départ) avant d'appliquer une migration en production.
