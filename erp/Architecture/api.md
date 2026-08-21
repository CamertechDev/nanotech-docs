# API

## Statut : 🟡 Proposé pour la structure · ✅ Confirmé pour la liste des intégrations externes

## Principe

Une seule surface d'API REST (Web API Core), pas une API par microservice (cohérent avec
`architecture.md`). Organisée par contexte (voir `Domain/bounded-contexts.md`), mais
déployée comme un seul service.

```
/api/administration/{entityName}   # endpoint générique référentiels (voir clean-architecture.md)
/api/foret/...
/api/usine/...
/api/commandes/...
/api/logistique/...
/api/transit/...
/api/comptabilisation/...
/api/security/...                  # auth, profils, droits
```

## Intégrations externes — à concevoir en priorité

✅ Confirmé (spec2 §3.4, schéma SQL) — ces 3 intégrations existent déjà avec le legacy et
doivent être portées, pas réinventées :

| Système | Direction | Contexte concerné | Endpoint cible (proposé) |
|---|---|---|---|
| **GTG** | Import → Expert Bois | Forêt (inventaire) | `POST /api/foret/inventaire/import` |
| **INTERHOLCO** (système de commandes du siège) | Import → Expert Bois | Commandes | `POST /api/commandes/import` |
| **SAGE** | Export ← Expert Bois | Comptabilisation | `POST /api/comptabilisation/export-sage` (ou job planifié, voir ci-dessous) |

🔴 Lacune : pour chacune de ces 3 intégrations, le **format d'échange réel** (fichier plat,
XML, appel API, fréquence : temps réel ou batch quotidien) n'est documenté nulle part dans les
sources disponibles. C'est un prérequis à clarifier avec IFO/GTG/le siège avant de développer
ces endpoints — ne pas supposer un format REST/JSON par défaut si l'existant fonctionne par
échange de fichiers.

## Recommandation de conception

🟡 Proposé : traiter chaque intégration comme un **anti-corruption layer** dans la couche
Infrastructure (voir `clean-architecture.md`) — un service dédié qui traduit le format externe
vers/depuis le modèle de domaine interne, pour ne pas laisser le format SAGE ou GTG fuiter
dans les entités de domaine.

## Authentification de l'API

Voir `security.md` pour le détail. Recommandation : un seul mécanisme d'authentification
(JWT/OAuth2 via un provider comme ASP.NET Identity ou Azure AD B2C selon le budget
disponible), pas un mécanisme par microservice.
