# Gestion d'état (State Management)

## Statut : 🟡 Proposé

## Recommandation : léger, pas de NgRx par défaut

Compte tenu de la contrainte de ressources (voir `intro.md`), **ne pas introduire NgRx** (ou
équivalent Redux) comme standard par défaut — la charge de boilerplate (actions, reducers,
effects, selectors) pour chacun des 8 contextes n'est pas justifiée pour un projet à effectif
de développement quasi nul. C'est le même raisonnement que pour CQRS côté backend
(`Architecture/cqrs.md`) : un outil puissant, mais dont le coût d'adoption dépasse le
bénéfice ici.

## Approche recommandée

- **Signals Angular** (natifs depuis Angular 16+) pour l'état local et partagé simple —
  suffisant pour la majorité des écrans CRUD générés par le pattern générique (voir `ui.md`).
- **Services Angular avec `BehaviorSubject`/signal** pour l'état partagé entre composants
  d'un même module (ex : site d'opération actif, utilisateur connecté).
- Pas de state manager global unique pour toute l'application — chaque module gère son état
  localement, cohérent avec le découpage en bounded contexts.

## Où un state manager plus structuré pourrait se justifier

🔴 À réévaluer seulement si un écran complexe (ex : un formulaire de commande multi-étapes
avec beaucoup d'interactions croisées) démontre un besoin réel de traçabilité d'état
(undo/redo, debug time-travel) — pas en anticipation.
