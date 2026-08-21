# Frontend clinique (`client/`) — cible

## Statut : ✅ Confirmé (structure réelle, FONCT.MD)

## Stack

| Composant | Choix |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Appels API | axios (dossier `src/api/`) |
| État / session | React Context (`AuthContext`) |
| Routage | Router avec **RoleGuard** par rôle |

Port de dev : **5173**. Backend associé : `server/` (PostgreSQL, port 5002).

## Structure

```
client/src/
├── api/       → appels API (axios)
├── context/   → AuthContext (session, token, rôle courant)
├── pages/     → public / patient / doctor / receptionist / admin
├── routes/    → Router avec RoleGuard
├── layouts/   → layouts du dashboard (à construire)
├── types/     → types TypeScript partagés
├── App.tsx
└── main.tsx
```

## Découpage des pages par rôle

✅ Confirmé — le dossier `pages/` est déjà organisé par espace :

| Sous-dossier | Espace |
|---|---|
| `public/` | login, register |
| `patient/` | portail patient |
| `doctor/` | dashboard dentiste |
| `receptionist/` | dashboard réceptionniste |
| `admin/` | dashboard administrateur |

Le `RoleGuard` redirige chaque utilisateur authentifié vers l'espace de son rôle —
principe R1/R2 de `Business/business-rules.md`. Attention : le garde frontend ne remplace
pas l'autorisation serveur (voir `Architecture/security.md`).

## Routes d'entrée

✅ Confirmé (FONCT.MD, ARCHITECTURE.md) :

```
http://localhost:5173/login              → connexion patient
http://localhost:5173/register           → inscription patient
http://localhost:5173/clinique/login     → connexion staff
http://localhost:5173/admin/dashboard    → dashboard admin (rôle ADMIN)
http://localhost:5173/doctor/dashboard   → dashboard dentiste (rôle DOCTOR)
```

## Démarrage

```bash
npm run clinique     # depuis la racine du repo
# ou
cd client && npm run dev
```

## État d'avancement

✅ Confirmé (FONCT.MD) : seules les pages d'authentification sont implémentées. À
construire en priorité (ARCHITECTURE.md) :

- [ ] Layout dashboard (sidebar + header)
- [ ] Page médecins (liste + ajout)
- [ ] Agenda réceptionniste
- [ ] Dossier patient
- [ ] Facturation

## Dette déclarée

🟡 Le dossier `client/` doit être renommé en `clinique/` (opération manuelle : fermer
terminaux et VSCode, renommer, rouvrir). Les scripts racine (`npm run clinique`,
`npm run dev:new`) font encore référence à `client/` — penser à les mettre à jour lors du
renommage.
