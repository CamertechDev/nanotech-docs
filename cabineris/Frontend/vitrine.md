# Frontend vitrine (`src/`) — legacy

## Statut : ✅ Confirmé (package.json, ARCHITECTURE.md) — application figée

## Stack

| Composant | Version |
|---|---|
| React | 17 (Create React App, `react-scripts` 4) |
| UI | React-Bootstrap 2 (beta), Bootstrap 5, FontAwesome, React Icons |
| i18n | i18next + react-i18next (FR/EN), browser-languagedetector |
| Formulaires | react-hook-form |
| Agenda | react-calendar |
| Divers | axios, jwt-decode, sweetalert, react-modal, react-hot-toast, firebase 8 |

Port de dev : **30005**. Backend associé : `api/` (MongoDB, port 5001).

## Périmètre fonctionnel

- Page d'accueil : hero, services, médecins, blog, contact
- Inscription / connexion patient
- Prise de rendez-vous (wizard 3 étapes) et suivi de ses rendez-vous
- i18n FR/EN complet

Structure :

```
src/
├── components/
│   ├── Home/      → sections de la landing page
│   ├── hooks/
│   └── Shared/
├── App.js
└── index.js
```

## Démarrage

```bash
npm start        # vitrine sur http://localhost:30005 (PORT=5173 dans le script racine,
                 # ARCHITECTURE.md documente :30005 — 🔴 incohérence à trancher)
npm run dev      # vitrine + API MongoDB en parallèle (depuis la racine)
```

## Règle de contribution

**Ne plus enrichir cette application.** Décision ARCHITECTURE.md : le legacy est en
maintenance uniquement ; toute évolution fonctionnelle se fait sur la nouvelle plateforme
(`client/` + `server/`). Le dossier `build/` est généré automatiquement — ne jamais le
modifier à la main.
