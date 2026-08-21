# Architecture

## Statut : ✅ Confirmé (ARCHITECTURE.md du repo — source de vérité)

## Vue d'ensemble : deux applications distinctes

```
┌─────────────────────────────────────────────────────────────────┐
│                    DEUX APPLICATIONS DISTINCTES                  │
├────────────────────────────┬────────────────────────────────────┤
│   VITRINE + RDV PATIENTS   │   DASHBOARD INTERNE CLINIQUE       │
│   src/  (port 30005)       │   client/  (port 5173)             │
│   React 17 CRA             │   React 18 Vite TypeScript         │
│   i18n FR/EN               │   Admin / Doctor / Receptionist    │
├────────────────────────────┼────────────────────────────────────┤
│   api/   (port 5001)       │   server/    (port 5002)           │
│   Express + MongoDB        │   Express + PostgreSQL + Prisma    │
│   Mongoose (legacy)        │   JWT + Zod + Nodemailer           │
└────────────────────────────┴────────────────────────────────────┘
```

La nouvelle plateforme (`client/` + `server/`) est la **cible** ; le couple legacy
(`src/` + `api/`) reste en service pour la vitrine mais n'est plus enrichi.

## Responsabilités

### `src/` — Vitrine publique (port 30005)

- Page d'accueil (hero, services, médecins, blog, contact)
- Inscription / connexion patient
- Prise de rendez-vous (wizard 3 étapes)
- Mes rendez-vous (statuts `PENDING / CONFIRMED / CANCELLED`)
- i18n FR/EN complet
- Backend : `api/` (MongoDB, port 5001)

### `client/` — Dashboard interne (port 5173)

- 🩺 Médecin : agenda, dossiers patients, ordonnances
- 👩‍💼 Réceptionniste : agenda global, confirmation RDV, facturation
- 🔧 Admin : gestion médecins, départements, paramètres clinique
- Backend : `server/` (PostgreSQL/Prisma, port 5002)

### `server/` — API clinique (port 5002)

Modules Prisma/PostgreSQL : auth, doctors, patients, departments, appointments,
time-slots, medical-records, prescriptions, documents, invoices, payments, notifications,
reports, settings (Clinic multi-tenant). Détail dans `backend.md`.

### `api/` — API vitrine (port 5001)

- MongoDB/Mongoose (legacy)
- Gère : auth patient, rendez-vous publics, services

## Ce qu'on NE touche plus

✅ Confirmé (ARCHITECTURE.md) :

- `api/controllers/` + `api/models/` + `api/routes/` → **LEGACY** (vieux JS)
- `build/` → généré automatiquement

## Commandes de développement

```bash
# Nouvelle plateforme (cible) — tout en parallèle depuis la racine
npm run dev:new              # server/ :5002 + client/ :5173

# Séparé
npm run server               # server/  → http://localhost:5002
npm run clinique             # client/  → http://localhost:5173

# Legacy (vitrine)
npm run dev                  # api/ :5001 + src/ :30005

# Base de données clinique
cd server && npm run db:migrate    # migrations Prisma
cd server && npm run db:studio     # interface Prisma Studio
cd server && npm run db:seed       # données initiales
```

Vérification : `curl http://localhost:5002/health` doit répondre OK.

## Modules à construire (priorité déclarée)

✅ Confirmé (ARCHITECTURE.md) — ordre de priorité du repo :

### server/ (backend)

- [ ] doctors module
- [ ] patients module
- [ ] appointments module
- [ ] time-slots module
- [ ] medical-records module
- [ ] invoices module

### client/ (frontend)

- [ ] Layout dashboard (sidebar + header)
- [ ] Page médecins (liste + ajout)
- [ ] Agenda réceptionniste
- [ ] Dossier patient
- [ ] Facturation

## Dettes et décisions en suspens

| Sujet | État |
|---|---|
| Renommage `client/` → `clinique/` | 🟡 Prévu (manuel : fermer VSCode, renommer, rouvrir) — les scripts racine font encore référence à `client/` |
| Données patients legacy (MongoDB) vs nouvelle base (PostgreSQL) | 🔴 Stratégie de migration non définie |
| Paiement en ligne, SMS | 🔴 Providers non choisis |
