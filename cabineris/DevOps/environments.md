# Environnements et démarrage

## Statut : ✅ Confirmé (FONCT.MD — guide de démarrage du repo)

## Prérequis (poste de développement Windows)

| Service | Statut requis | Vérification |
|---|---|---|
| MongoDB | Service Windows actif | `Get-Service MongoDB` |
| PostgreSQL 18 | Service Windows actif | `Get-Service postgresql-x64-18` |
| Node.js | v16+ | `node --version` |

## Carte des ports

| Port | Application | Stack |
|---|---|---|
| 30005 | Vitrine `src/` (legacy) | React 17 CRA |
| 5001 | API vitrine `api/` (legacy) | Express + MongoDB |
| 5002 | API clinique `server/` | Express + PostgreSQL + Prisma |
| 5173 | Dashboard `client/` | React 18 + Vite |

⚠️ Le script `npm start` racine force `PORT=5173` pour la vitrine alors que la
documentation du repo annonce 30005 — 🔴 incohérence à trancher (cf. `Frontend/vitrine.md`).

## Démarrage rapide

```bash
# Nouvelle plateforme (cible) — server + client en parallèle
npm run dev:new

# Legacy (vitrine) — api + src en parallèle
npm run dev
```

Démarrage séparé :

```bash
cd server && npm run dev     # API clinique → http://localhost:5002/health
cd client && npm run dev     # Dashboard   → http://localhost:5173/login
```

## Bases de données locales

### PostgreSQL (cible — `dentaldoctordb`)

```
Host     : localhost
Port     : 5432
Database : dentaldoctordb
User     : postgres
Password : devadmin
```

La connexion réelle passe par `DATABASE_URL` (`.env` de `server/`, non versionné).

### MongoDB (legacy — `doctorappointment`)

```
Host     : localhost
Port     : 27017
Database : doctorappointment
```

## Comptes de test

### Nouveau serveur (PostgreSQL — créés par `npm run db:seed`)

| Rôle | Email | Mot de passe | Dashboard |
|---|---|---|---|
| ADMIN | admin@sudsoft.com | Admin@1234 | /admin/dashboard |
| DOCTOR | dr.dupont@sudsoft.com | Doctor@1234 | /doctor/dashboard |
| RECEPTIONIST | reception@sudsoft.com | Recep@1234 | — |
| PATIENT | patient@test.com | Patient@1234 | — |

### Ancien serveur (MongoDB — `doctorappointment`)

| Rôle | Email | Mot de passe |
|---|---|---|
| ADMIN | Admin@gmail.com | 1234 |
| TEST | test@sudsoft.com | Test@1234 |

🟡 Ces comptes sont des données de dev : les désactiver / ne pas les seed en production
(voir `Architecture/security.md`).

## Endpoints de vérification

```
GET http://localhost:5002/health        → l'API clinique répond
POST http://localhost:5002/api/v1/auth/login → authentification OK
```

## Problèmes fréquents

### Port déjà utilisé (EADDRINUSE)

```powershell
# Libérer le port 5002 (server)
$p = (Get-NetTCPConnection -LocalPort 5002 -ErrorAction SilentlyContinue).OwningProcess
if ($p) { Stop-Process -Id $p -Force }

# Libérer le port 5173 (client)
$p = (Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue).OwningProcess
if ($p) { Stop-Process -Id $p -Force }
```

Identifier d'abord le processus fautif :

```powershell
Get-NetTCPConnection -LocalPort 5002 -State Listen -ErrorAction SilentlyContinue |
  Select-Object -ExpandProperty OwningProcess |
  ForEach-Object { $p = Get-Process -Id $_ -ErrorAction SilentlyContinue; "PID $_ — $($p.Name)" }
```

### Node OpenSSL (react-scripts 4)

La vitrine legacy (react-scripts 4 + Node récent) exige
`NODE_OPTIONS=--openssl-legacy-provider` — déjà présent dans les scripts racine
(`start`, `build`). Ne pas le retirer.
