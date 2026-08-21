# Design system

## Statut : 🟡 Proposé — minimal par défaut

## Recommandation

Compte tenu de la contrainte de ressources, **ne pas construire de design system sur
mesure**. Adopter une bibliothèque de composants existante et l'utiliser telle quelle :

- **Angular Material** ou **PrimeNG** — les deux couvrent nativement les besoins d'un ERP
  (data grid, formulaires, dialogues, pagination) nécessaires au pattern générique
  (`ui.md`). 🔴 Choix final non tranché — dépend surtout de la disponibilité de composants
  data-grid avancés (tri/filtre/export) adaptés au volume de données (rappel : 117 exports
  Excel dans le legacy, un besoin d'export doit rester possible depuis les listes).
- Personnalisation graphique minimale (logo, couleurs de marque IFO/Danzer si fournies) —
  pas de refonte visuelle ambitieuse en première itération.

## Cohérence avec le pattern générique

Le composant `gb-entity-list`/`gb-entity-form` (voir `ui.md`) doit être construit **au-dessus**
de la bibliothèque choisie, pas en remplacement — éviter de réinventer des primitives UI
(inputs, tableaux) déjà fournies.

## Accessibilité et langue

🔴 Lacune : le besoin multilingue est confirmé au niveau des données (`tblLangue`, voir
`Functional/permissions.md`) mais aucune exigence d'accessibilité (WCAG) n'est mentionnée
dans les sources — pas de traitement prioritaire tant que non demandé explicitement.
