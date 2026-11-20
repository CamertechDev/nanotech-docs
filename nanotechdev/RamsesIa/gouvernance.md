---
sidebar_position: 5
---

# Gouvernance, isolation et secrets

## Statut : ✅ Confirmé dans le code et les pipelines

## Isolation Public / Entreprise

| Surface | Public | Entreprise |
|---|---|---|
| Projet .NET | `ApiPublic` | `ApiRag` |
| Base Neon | `nanoia` | `neondb` |
| Rôle applicatif | `apipublic_app` | `nanoia_app` |
| Cloud Run | `nanoia-public`, `nanoia-public-web` | `nanoia`, `nanoia-web` (si SaaS B2B) |
| Cookie | `ApiPublic.Session` / cookie opérateur Public | cookies ApiRag |
| Bucket exports | `{projet}-nanoia-public-exports` | `{projet}-nanoia-exports` |
| Clés Data Protection | même bucket GCS, préfixe `public` | préfixe Enterprise |

Ne jamais coller une chaîne `neondb_owner` / `nanoia_app` dans `NANOIA_PUBLIC_DATABASE_URL`.
Le workflow Public **échoue** si le login n'est pas `apipublic_app`.

## Qui est « admin »

Trois notions distinctes. Les mélanger a déjà fait croire que l'admin Public « n'existait plus ».

| Nom | Table / rôle | Produit |
|---|---|---|
| Propriétaire Public | `public_platform_operators.role = owner` | Ramsess-AI |
| Admin visiteur | `users.role = Admin` | **Pas** la console `/operator` |
| Operator / Admin RAG | `platform_operators` + tenant | RAMSES RAG |

Le seed du propriétaire : `PUBLIC_OPERATOR_SEED_EMAIL` / `PUBLIC_OPERATOR_SEED_PASSWORD` au
premier démarrage. Ensuite : invitations. Mot de passe stocké en **hash ASP.NET Identity**,
jamais en clair SQL.

## Quotas et Fair Use

1. Abonnement actif (402).
2. Messages du jour (429, reset minuit UTC).
3. Fair Use : taille, image, `num_predict`, file GPU.

Un forfait plus cher = plus de **messages**, pas plus de droit à saturer le GPU par appel.

## Secrets — règles déjà appliquées

- Secrets uniquement GitHub / Secret Manager. Jamais dans `appsettings` commités, logs, docs.
- `migrate-neon-public` : admin **non poolé**. `deploy-public` : `apipublic_app` **poolé**
  (`-pooler.`).
- Mot de passe Neon : caractères URL-safe. `@`, `#`, `:` cassent `Host=` et Npgsql.
- Ne jamais logger e-mail, téléphone, hash, token, PII.

## Données visiteur

- Conversations sidebar : **navigateur** (IndexedDB), pas le corpus RAG.
- Exports PDF : objet GCS Public, pas le bucket Enterprise.
- Dictée : audio → Speaches interne. Pas d'API cloud de transcription.
- Images générées / URL Markdown du modèle : non rendues (exfiltration).
