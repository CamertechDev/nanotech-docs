# Exfob Documentation

Site de documentation unique et centralisé pour les projets Exfob, construit avec [Docusaurus](https://docusaurus.io/).

## Projets documentés

| Projet | Chemin |
|--------|--------|
| GestionBois ERP | `/erp/` |
| Cabineris | `/cabineris/` |
| Sysfact-Web | `/sysfact/` |
| ArtDevis | `/artdevis/` |

## Prérequis

- Node.js >= 20.0
- npm

## Installation

```bash
npm install
```

## Démarrage local

```bash
npm start
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Le contenu statique généré se trouve dans le dossier `build/`.

## Déploiement sur Vercel

Le workflow GitHub Actions `.github/workflows/deploy-vercel.yml` déploie sur Vercel
à chaque push sur `main`. Il peut aussi être lancé manuellement depuis l'onglet
**Actions** de GitHub.

Dans **Settings → Secrets and variables → Actions**, créer ces secrets du dépôt :

- `VERCEL_TOKEN` : jeton d'accès Vercel.
- `VERCEL_ORG_ID` : valeur `orgId` du fichier local `.vercel/project.json`.
- `VERCEL_PROJECT_ID` : valeur `projectId` du même fichier.

Ne pas ajouter le jeton Vercel au dépôt. Une fois les secrets configurés, pousser
les changements sur `main` pour déclencher le déploiement.

## Architecture

Ce site utilise le plugin `@docusaurus/plugin-content-docs` en plusieurs instances pour servir 3 documentations distinctes sous un seul site Docusaurus :

- `erp`
- `cabineris`
- `sysfact`

Chaque instance a son propre contenu (`erp/`, `cabineris/`, `sysfact/`) et sa propre sidebar (`sidebars/erp.js`, `sidebars/cabineris.js`, `sidebars/sysfact.js`).

## Ajouter une nouvelle documentation

1. Créer un dossier `mon-projet/` avec du contenu Markdown.
2. Créer une sidebar `sidebars/mon-projet.js`.
3. Ajouter une nouvelle instance du plugin docs dans `docusaurus.config.js`.
4. Ajouter un lien dans la navbar et le footer.
`npx vercel --prod`
`npx vercel login`