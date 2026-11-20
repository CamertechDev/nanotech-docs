---
sidebar_position: 6
---

# Déploiement Ramsess-AI

## Statut : 🟡 Pipelines prêts ; secret Neon Public encore à aligner sur `apipublic_app`

Détail opératoire : `docs/pUBLIC/DEPLOIEMENT-CLOUD-RUN-NEON.md`. Ici : la carte et les pièges
déjà rencontrés.

## Ordre

1. Schéma Public : `schema.sql` idempotent via `migrate-neon-public.yaml` (`psql`). **Jamais EF.**
2. Images : `src/ApiPublic/Dockerfile`, `src/BlazorWasmRag.Public/Dockerfile`.
3. Terraform Cloud Run prod : services `nanoia-public` / `nanoia-public-web`, bucket
   `{projet}-nanoia-public-exports`.
4. GitHub secrets Public, dont `OLLAMA_VM_IP` = IP **publique réservée** de `ollama-gpu-vm`.
5. `deploy-public.yaml` : Artifact Registry → Cloud Run → IAM `roles/run.invoker` au service
   `nanoia-cloud-run`.

La VM RAG n'est **pas** redéployée par ce workflow.

## Secrets Public (noms)

| Secret | Contenu |
|---|---|
| `NANOIA_PUBLIC_DATABASE_ADMIN_URL` | Owner Neon, **non poolé**, DDL |
| `NANOIA_PUBLIC_DATABASE_URL` | `Username=apipublic_app`, **poolé**, `Database=nanoia` |
| `OLLAMA_VM_IP` | IPv4 publique GPU |
| `SPEECH_ENDPOINT` | URL Speaches, ou vide |
| `PUBLIC_OPERATOR_SEED_EMAIL` / `_PASSWORD` | Premier owner, rotation après install |
| Data Protection | bucket + préfixe `public` |

## Pièges déjà vus

| Symptôme | Cause réelle | Correction |
|---|---|---|
| Deploy Public refuse la connexion | Chaîne Neon = `neondb_owner` ou mauvais login | Secret `…_DATABASE_URL` → `apipublic_app` |
| « Plus d'admin » dans Neon | On lisait `users` ou la base `neondb` | Table `public_platform_operators` sur `nanoia` |
| Login owner échoue après UPDATE SQL du mot de passe | Hash Identity, pas du clair | Hasher .NET, ou flux mot de passe oublié |
| GPU timeout depuis Cloud Run | Secret = IP VPC `10.128…` | IP publique réservée |
| Dictée KO, chat OK | `SPEECH_ENDPOINT` vide ou égal à Ollama | Speaches séparé, modèle déjà sur disque |
| Bucket exports 403 | Compte GitHub sans `storage.buckets.create` | Bucket créé par Terraform ; le job **avertit** et continue |
| WASM `file:///api/` | Mauvais `BaseAddress` | Même origine `/api/` derrière nginx |
| OAuth Google 400 | Redirect URI incomplet | URI exacte du site Public, y compris `/signin-google` |
| Chat swahili / bulle vide | Verrou langue + `<think>` DeepSeek | Code livré ; **redéployer** Public |

## Bucket GCS Public

Terraform : `google_storage_bucket.public_exports` dans
`infra/terraform/CloudRun/environments/gcp-prod`.

- Nom : `{project_id}-nanoia-public-exports` (ex. `artdevis-play-nanoia-public-exports`).
- IAM : `nanoia-cloud-run` + compte de calcul par défaut.
- **Pas** le bucket `{project}-nanoia-exports` (RAG / chat Entreprise).

## Après un déploiement

- Vérifier que Cloud Run `nanoia-public` a bien `Username=apipublic_app`.
- Tirer une révision WASM : le lien « mot de passe oublié » n'existe que sur l'UI récente.
- Recette minimale : `/health`, `/operator`, un message français, une image vision, un export PDF.
