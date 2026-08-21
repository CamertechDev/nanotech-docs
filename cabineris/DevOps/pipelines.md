# Pipelines CI/CD

## Statut : ✅ Confirmé (présence des fichiers dans le repo) — contenu détaillé 🟡 à documenter au fil des déploiements

## Workflows GitHub Actions

✅ Confirmé (`.github/workflows/`) — deux pipelines de déploiement Azure App Service :

| Workflow | Cible | Déploie |
|---|---|---|
| `main_app-nano-api-dev-20260614.yml` | App Service `app-nano-api-dev` | Backend (`server/`) |
| `main_app-nano-cabineris-dev-20260614.yml` | App Service `app-nano-cabineris-dev` | Frontend (`client/`) |

Le nommage (`main_app-nano-*-dev-20260614`) indique un déclenchement sur la branche
`main` vers un environnement **dev** — 🔴 la stratégie d'environnements
(dev / staging / prod) n'est pas formalisée dans les sources.

## Autres artefacts de déploiement présents

| Fichier / dossier | Rôle probable | Statut |
|---|---|---|
| `azure.yaml` | Configuration Azure Developer CLI (`azd`) | 🔴 contenu à documenter |
| `infra/` | Infrastructure as Code (provisioning Azure) | 🔴 contenu à documenter |
| `firebase.json` | Hosting Firebase (historique du projet MERN d'origine) | 🟡 vraisemblablement obsolète — à confirmer |
| `server/startup.sh` | Script de démarrage du backend sur App Service Linux | ✅ Confirmé (présence) |
| `server/web.config` | Configuration IIS (hébergement Windows éventuel) | ✅ Confirmé (présence) |

## Variables et secrets

🔴 Lacune : la liste des variables d'environnement requises en production
(`DATABASE_URL`, secret JWT, configuration SMTP Nodemailer…) n'est pas documentée dans les
sources. À constituer au premier déploiement maîtrisé — référence : les `.env.example`
éventuels des dossiers `server/` et `client/`.

## Migrations de base en déploiement

🟡 Recommandation (non confirmée par un pipeline existant) : appliquer les migrations
Prisma (`npm run db:migrate`) dans le pipeline backend **avant** le basculement de
l'App Service, ou via `startup.sh`. Vérifier à chaque évolution de
`server/prisma/schema.prisma` (voir `Database/schema.md`).

## Points à documenter ultérieurement

- Stratégie de branches et déclencheurs réels des workflows
- Inventaire des ressources Azure (App Service, base PostgreSQL managée, stockage des uploads)
- Politique de sauvegarde de la base de production (🟡 annoncée côté admin, non définie)
- Supervision / logs (dossier `server/logs/` en local — 🔴 solution centralisée non choisie)
