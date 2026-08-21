# Backend

## Statut : ✅ Confirmé (structure réelle de `server/` et `api/`)

## `server/` — API clinique (Express + PostgreSQL + Prisma, port 5002)

### Stack

| Composant | Choix |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework HTTP | Express |
| ORM | Prisma (PostgreSQL, base `dentaldoctordb`) |
| Auth | JWT |
| Validation | Zod |
| Email | Nodemailer |

### Structure modulaire

```
server/
├── prisma/              → schema.prisma + migrations + seed.ts
├── src/
│   ├── config/          → index.ts, logger.ts, prisma.ts
│   ├── modules/         → un dossier par module métier
│   ├── shared/          → middlewares, utils
│   ├── routes/          → index.ts (agrège tous les modules)
│   ├── app.ts
│   └── server.ts
├── uploads/             → fichiers déposés (documents médicaux)
└── logs/
```

### Modules (squelettes en place)

✅ Confirmé — 15 dossiers dans `server/src/modules/` :

```
appointments  auth  compat  departments  doctors  documents  invoices
medical-records  notifications  patients  payments  prescriptions
reports  settings  time-slots
```

Convention : chaque nouveau module suit le même découpage interne (routes, contrôleur,
service, schéma Zod) et s'enregistre dans `src/routes/index.ts`. Le module `compat` assure
vraisemblablement la compatibilité avec l'ancien frontend — 🔴 périmètre exact à confirmer
à la lecture du code.

### API exposée

✅ Confirmé (FONCT.MD) — préfixe `/api/v1` :

```
GET  /health                        → statut du serveur
POST /api/v1/auth/register          → créer un compte patient
POST /api/v1/auth/login             → se connecter (retourne un JWT)
GET  /api/v1/auth/me                → profil connecté (Bearer token requis)
```

Exemple login :

```json
POST http://localhost:5002/api/v1/auth/login
{ "email": "admin@sudsoft.com", "password": "Admin@1234" }
```

### Commandes Prisma

```bash
cd server
npm run dev           # démarre l'API sur :5002
npm run db:migrate    # applique une migration après changement du schema
npm run db:generate   # régénère le Prisma Client
npm run db:studio     # interface graphique de la base
npm run db:seed       # réinitialise les données de test
```

## `api/` — API vitrine (Express + MongoDB, port 5001) — LEGACY

- Express + Mongoose, base MongoDB `doctorappointment` (port 27017).
- Gère : auth patient, rendez-vous publics, services de la vitrine.
- Les dossiers `controllers/`, `models/`, `routes/` sont du vieux JS **figé** — ne plus y
  toucher (décision ARCHITECTURE.md).

## Règles pour tout nouveau développement backend

1. Tout nouveau code va dans `server/src/modules/<module>/` — jamais dans `api/`.
2. Toute entité créée porte le `clinicId` de la clinique courante (multi-tenant, R3).
3. Toute entrée est validée par un schéma Zod avant d'atteindre Prisma.
4. Toute action sensible écrit un `AuditLog` (voir `Domain/domain-model.md`).
5. Les endpoints sont préfixés `/api/v1/<module>` et enregistrés dans
   `src/routes/index.ts`.
