# Frontend Angular

## Statut : 🟡 Conditionnel — applicable uniquement si Angular est confirmé comme choix final (voir `Architecture/architecture.md`, décision non tranchée)

## ⚠️ Avant de lire ce fichier

Le choix entre Angular PWA et Blazor WebAssembly n'est **pas arbitré** (voir
`Architecture/architecture.md`). Ce fichier documente l'organisation cible **si** Angular
est retenu. Si Blazor est retenu à la place, ce fichier devient obsolète et doit être
remplacé par son équivalent (`blazor.md`) — ne pas développer les deux en parallèle.

## Structure de modules proposée (miroir des bounded contexts)

```
src/app/
├── core/                  # auth, intercepteurs HTTP, garde de routes
├── shared/                # composants génériques (voir ui.md), pipes, directives
├── features/
│   ├── administration/
│   ├── securite/
│   ├── foret/
│   ├── usine/
│   ├── commandes/
│   ├── logistique/
│   ├── transit/
│   └── comptabilisation/
└── layout/                # shell applicatif, navigation par module
```

Chaque dossier sous `features/` correspond à un contexte de `Domain/bounded-contexts.md` —
la frontière frontend suit la frontière domaine, pas l'inverse.

## Version et fonctionnalités

🟡 Proposé (aligné sur l'offre commerciale Camertechdev, non re-vérifié indépendamment) :
Angular 16+, avec support PWA (`@angular/pwa`) activé dès le départ si la contrainte terrain
(connectivité en forêt) est confirmée comme réelle — voir `Architecture/architecture.md`
et la remarque sur l'offline-first.

## Ce qui n'est volontairement pas prescrit ici

Pas de choix de librairie de composants UI (Material, PrimeNG, etc.) tant que
`Frontend/design-system.md` n'a pas tranché — éviter les décisions dupliquées entre
fichiers.
