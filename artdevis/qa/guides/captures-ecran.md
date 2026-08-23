---
sidebar_position: 6
title: Captures d'écran
description: Comment ajouter vos images dans Docusaurus pour le QA.
---

## Emplacement des fichiers

Placez vos captures dans :

```
gestionbois-docs/static/img/artdevis/qa/
```

Docusaurus sert les fichiers `static/` à la racine du site. Une image `static/img/artdevis/qa/auth-login.png` est accessible via `/img/artdevis/qa/auth-login.png`.

## Convention de nommage

| Fichier | Écran |
| --- | --- |
| `auth-login.png` | Connexion |
| `auth-signup.png` | Inscription |
| `plans-comparatif.png` | Feuille comparatif Base / Pro |
| `clients-liste.png` | Liste clients |
| `client-form-express.png` | Formulaire client (express) |
| `client-form-details.png` | Formulaire client (détails) |
| `client-fiche.png` | Fiche client |
| `equipe-liste.png` | Liste Mon équipe |
| `equipe-form.png` | Formulaire membre |
| `tarifs-liste.png` | Liste tarifs |
| `tarifs-form.png` | Formulaire tarif |
| `devis-recording.png` | Écran 3 enregistrement |
| `devis-processing.png` | Écran 4 traitement |
| `devis-controle.png` | Écran 5a contrôle langue dictée |
| `devis-apercu-fr.png` | Écran 5b aperçu français |
| `devis-pdf.png` | Écran 6 PDF |
| `devis-historique.png` | Historique devis fiche client |
| `chantiers-jour.png` | Mes Chantiers |

## Insérer une image dans un guide

Dans un fichier `.md` du dossier `artdevis/qa/guides/` :

```markdown
![Écran connexion](/img/artdevis/qa/auth-login.png)
```

## Bonnes pratiques

* Format **PNG** ou **WebP**, largeur max ~1200 px
* Masquer ou flouter données personnelles réelles
* Nom de fichier en **minuscules**, tirets entre mots (exception : convention fichiers statiques)
* Une capture par étape clé, pas une par champ

## Vérifier en local

```bash
cd gestionbois-docs
npm start
```

Ouvrir le guide concerné et vérifier que l'image s'affiche.

## Images manquantes

Tant qu'une capture n'est pas déposée, le guide affiche un placeholder cassé. Priorité de capture pour le QA :

1. Inscription + plans
2. Formulaire client (particulier et Pro)
3. Fiche client + historique devis
4. Tarifs fournisseurs
5. Mes Chantiers
