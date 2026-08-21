# UI — pattern générique liste + formulaire

## Statut : 🟡 Proposé — recommandation la plus importante de la section Frontend

## Le problème à résoudre (rappel du contexte)

L'étude 2018 sur le legacy (spec1 §6.2) a identifié comme défaut n°1, récurrent sur presque
tous les modules : trop de formulaires quasi-identiques pour des opérations similaires,
alors que 2 écrans par entité auraient suffi (un pour créer/éditer, un pour lister/rechercher/
supprimer). L'offre de migration actuelle (Camertechdev/TechUp) recense **~181 objets** et,
en appliquant un facteur ×2 systématique, arrive à **~370 écrans CRUD** à construire — ce qui
reproduit exactement le même défaut si chaque écran est codé à la main. Voir
`Business/actors.md` et `Business/business-rules.md` pour le détail de cette critique.

## La solution : composants génériques pilotés par métadonnées

Au lieu de 370 composants Angular quasi-identiques, construire **deux composants génériques**
réutilisés pour tous les référentiels (contexte Administration, ~82 objets) et adaptés pour
les contextes à logique métier propre (Forêt, Usine, etc.) :

```
<gb-entity-list [config]="essenceListConfig"></gb-entity-list>
<gb-entity-form [config]="essenceFormConfig" [id]="selectedId"></gb-entity-form>
```

Chaque écran référentiel devient une **configuration** (JSON/TypeScript), pas un composant
codé à la main :

```typescript
export const essenceListConfig: EntityListConfig = {
  entityName: 'Essence',
  apiEndpoint: '/api/administration/essence',
  columns: [
    { field: 'code', label: 'Code' },
    { field: 'nom', label: 'Nom' },
    { field: 'densite', label: 'Densité' },
  ],
  searchableFields: ['code', 'nom'],
};
```

## Où NE PAS appliquer ce pattern

Pour les contextes à complexité métier réelle (Forêt, Usine — voir
`Domain/bounded-contexts.md`), un écran sur-mesure reste justifié quand le formulaire
implique des calculs, des règles conditionnelles ou une UX spécifique (ex : saisie d'un
mesurage avec calcul de cubage en temps réel). Le pattern générique cible d'abord les
référentiels et les écrans CRUD simples, pas tous les écrans de l'application.

## Bénéfice attendu

- Réduction drastique de l'effort de développement sur les ~82 objets référentiels
  (potentiellement quelques configurations au lieu de ~172 écrans codés).
- Cohérence UX automatique entre tous les écrans référentiels (même comportement de
  recherche, tri, pagination, validation).
- Argument concret pour revoir à la baisse l'estimation de coût de l'offre de migration (voir
  discussion sur le deck Camertechdev) — pertinent vu la contrainte budgétaire du projet.

## Prochaine étape

🔴 Le détail technique du composant générique (bibliothèque de composants sous-jacente,
gestion de la validation, des relations FK dans les formulaires) reste à concevoir — première
tâche concrète recommandée pour démarrer le chantier Frontend, avant tout écran métier.
