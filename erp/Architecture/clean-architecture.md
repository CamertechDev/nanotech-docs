# Clean Architecture — allégée

## Statut : 🟡 Proposé, cohérent avec `architecture.md`

## Principe : complexité proportionnée au contexte, pas uniforme

Toutes les couches ci-dessous ne s'appliquent pas avec la même rigueur à tous les contextes
(voir `Domain/bounded-contexts.md`, colonne "Traitement DDD recommandé"). Forcer 4 couches
complètes sur un référentiel de pays/monnaies (Administration) est un coût sans bénéfice.

## Structure de solution proposée (monolithe modulaire, un seul déployable)

```
GestionBoisERP.sln
├── src/
│   ├── GestionBoisERP.Domain/          # Entités, agrégats, value objects, événements
│   │   ├── Foret/
│   │   ├── Usine/
│   │   ├── Commandes/
│   │   ├── Logistique/
│   │   ├── Transit/
│   │   ├── Comptabilisation/
│   │   └── Administration/             # CRUD simple, pas d'agrégats riches ici
│   ├── GestionBoisERP.Application/      # Cas d'usage, DTOs, interfaces de services
│   ├── GestionBoisERP.Infrastructure/   # EF Core, accès SQL Server, intégrations GTG/SAGE/INTERHOLCO
│   └── GestionBoisERP.Api/              # Web API Core — un seul point d'entrée REST
└── tests/
    └── GestionBoisERP.Tests/
```

## Règle de couche par niveau de complexité

| Niveau | Contextes | Domain riche ? | Application (cas d'usage explicites) ? | Pattern |
|---|---|---|---|---|
| Riche | Forêt, Usine | Oui | Oui | Entités + agrégats + services de domaine (voir `Domain/`) |
| Modéré | Commandes, Logistique, Transit, Comptabilisation | Partiel (agrégat Entete/Details) | Oui | Repository + agrégat léger |
| Simple | Administration, Sécurité | Non — CRUD direct | Non — endpoint générique | Pattern générique liste + formulaire (voir `Frontend/ui.md`) côté API aussi : un contrôleur générique paramétré par métadonnées plutôt que 80+ contrôleurs quasi-identiques |

## Pourquoi un contrôleur générique pour les référentiels

Avec ~82 objets de type "référentiel" recensés dans l'offre de migration (Administration),
générer 82 contrôleurs CRUD manuels reproduirait exactement le défaut de prolifération
d'écrans dénoncé dans `Business/business-rules.md`. 🟡 Recommandation : un endpoint
générique `GET/POST/PUT/DELETE /api/reference/{entityName}` piloté par un registre de
métadonnées (nom de table, colonnes, validations), avec des exceptions ponctuelles pour les
référentiels ayant une vraie logique métier propre (ex : `Essence` avec ses règles de cubage).

## Ce qui n'est PAS proposé ici

- Pas d'Event Sourcing.
- Pas de base de données séparée en lecture/écriture (voir `cqrs.md` pour la position sur le
  CQRS "léger").
- Pas de couche de domaine riche pour Administration/Sécurité.
