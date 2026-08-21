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

## Déploiement Azure Static Web App

1. Créer une Azure Static Web App.
2. Pointer le build vers le dossier `build/`.
3. Configurer la commande de build : `npm run build`.
4. Déployer.

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
