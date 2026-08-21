# Routing

## Statut : 🟡 Proposé

## Principe

Une route par module métier confirmé, sous-routée par entité pour les référentiels
(pattern générique, voir `ui.md`), et par cas d'usage pour les contextes riches (Forêt,
Usine).

```
/administration/:entityName            # liste générique
/administration/:entityName/:id        # formulaire édition générique
/securite/utilisateurs
/securite/profils

/foret/inventaire
/foret/abattage
/foret/roulage

/usine/reception-grumes
/usine/sciage

/commandes
/commandes/:id

/logistique/conteneurs
/logistique/expeditions

/transit/declarations
/transit/embarquements

/comptabilisation/factures-export
/comptabilisation/factures-locales
/comptabilisation/provisions
```

## Garde de routes

🟡 Proposé : garde basée sur les `modules` du JWT (voir `Architecture/security.md`) —
un utilisateur sans le module `Foret` dans son token n'accède pas aux routes `/foret/*`,
redirection vers une page "accès non autorisé" plutôt qu'un masquage silencieux du menu
uniquement (défense en profondeur : le menu ET la route doivent être protégés).

## Filtrage multi-site dans l'URL ou dans le contexte de session ?

🔴 Lacune : à trancher — soit le `SiteOperationID` actif fait partie du contexte de session
(sélecteur de site en haut de l'application, stocké côté état applicatif), soit il apparaît
explicitement dans l'URL (`/sites/:siteId/foret/...`). Le second est plus explicite et
partageable (lien direct vers une vue d'un site précis) mais alourdit toutes les routes.
Recommandation 🟡 : contexte de session avec sélecteur, sauf besoin explicite de lien
partageable inter-sites exprimé par les utilisateurs.
