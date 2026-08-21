# Processus métier

## Statut : ✅ Confirmé (spec2 §3.5.1-3.5.2, GW spec §1.1, pptx slide 7)

## Deux découpages à connaître (et pourquoi ils diffèrent)

Les sources utilisent deux découpages différents du même domaine métier, à des niveaux
d'abstraction différents — il ne faut pas les confondre :

1. **Les 9 processus opérationnels** (spec2, analyse BPR 2018) — vision transverse,
   indépendante de l'organisation en écrans/modules.
2. **Les 8 modules applicatifs** d'Expert Bois (GW spec + pptx) — le découpage réellement
   implémenté dans le logiciel, qui regroupe ces processus en unités de menu.

## 1. Les 9 processus opérationnels (analyse métier)

| # | Processus | Description sommaire |
|---|---|---|
| 1 | Inventaire | Gestion des chantiers VMA, pistages |
| 2 | Exploitation Forestière | Abattage, étêtage (tronçonnage brousse) |
| 3 | Transport | Débardage, roulage vers usine/parc |
| 4 | Commandes | Saisie et gestion des contrats clients |
| 5 | Usine | Réception grumes, tronçonnage, sciage, production |
| 6 | Contrôle Qualité | Contrôle des produits (peu détaillé dans les sources — 🔴 lacune) |
| 7 | Production | Suivi de production (peu détaillé — 🔴 lacune, chevauche partiellement "Usine") |
| 8 | Embarquement | Déclaration douanière, transit, embarquement navire |
| 9 | Administration | Référentiels, sécurité, paramétrage — transverse aux 8 autres |

## 2. Les 8 modules applicatifs (Expert Bois — implémentation actuelle)

| # | Module | Sous-modules (pptx) | Processus couverts |
|---|---|---|---|
| 1 | Fichier / Administration | Fichier, Paramétrages | Administration |
| 2 | Paramétrages | (fusionné avec Fichier dans le pptx, distinct dans GW spec) | Administration |
| 3 | Forêt | Inventaire, Exploitation Forestière, Transport, États | Inventaire, Exploitation Forestière, Transport |
| 4 | Commandes / Contrats | Mercuriale, Contrats, États statistiques | Commandes |
| 5 | Usines de Transformation | Grumes, Sciages | Usine, Production |
| 6 | Logistiques (Export) | Déclaration, Documentation Transit, Gestion conteneurs, Expéditions, États | Embarquement (partie logistique) |
| 7 | Port Embarquement (Transit) | Exploitation, Exportation, Prestataires, États | Embarquement (partie douane/port) |
| 8 | Comptabilisation | Facturation, Prestataires et taxes étatiques, Provisions, États | Export vers SAGE |

⚠️ Le module "Contrôle Qualité" identifié dans l'analyse 2018 (processus n°6) **n'apparaît
pas** comme module distinct dans la liste des 8 modules d'Expert Bois — il a probablement été
absorbé dans Forêt ou Usine (tables `tblQualitesBois`, `tblQualitesBoisGroupe` existent dans le
schéma, rattachées au module Forêt/Paramétrages). 🔴 À confirmer.

## Flux de bout en bout (chaîne de traçabilité)

Voir `Functional/workflows.md` pour le détail des étapes et des tables SQL associées à
chaque étape.

## Diagramme SADT

Le document spec2 mentionne un "Diagramme SADT du Processus Traçabilité Bois" (§3.5.3, page
53 du document source). 🔴 Ce diagramme n'a pas été extrait dans cette documentation (image
vectorielle non capturée) — à récupérer depuis le PDF source si nécessaire pour une vue
graphique du processus global.
