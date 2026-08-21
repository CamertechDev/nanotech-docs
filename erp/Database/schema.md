# Schéma — conventions observées

## Statut : ✅ Confirmé (inspection directe du script `BaseDeDonnees_EXPERTBOIS.sql`)

## Conventions de nommage actuelles (legacy)

| Élément | Convention observée | Exemple |
|---|---|---|
| Table | Préfixe `tbl` + PascalCase | `tblCommandesEntete` |
| Table enfant d'agrégat | Suffixe `Details` | `tblCommandesDetails` |
| Clé primaire | `<NomTable sans tbl>ID`, `int IDENTITY` | `CommandesEntete.CommandesEnteteID` (🔴 à vérifier au cas par cas — la convention n'est pas rigoureusement uniforme sur les 199 tables) |
| Clé étrangère | `<TableReferencee>ID` | `SiteOperationID`, `SocieteID` |
| Table de référence "nature/type" | Suffixe `Nature` ou `Type` | `tblOperateurNature`, `tblDensitesBoisNatures` |

## Types de données utilisés (✅ Confirmé, comptage réel)

| Type | Occurrences |
|---|---|
| `int` | 670 |
| `nvarchar` | 310 |
| `smallint` | 227 |
| `real` | 111 |
| `smalldatetime` | 106 |
| `varchar` | 32 |
| `bit` | 61 |
| `binary` | 3 |
| `image`/`text`/`ntext` (legacy) | 8 |

Observation : `real` (float 4 octets) est utilisé pour les mesures/volumes — 🔴 à vérifier si
la précision est suffisante pour les calculs de cubage/facturation, ou si `decimal` serait
plus approprié pour la migration (le float peut introduire des erreurs d'arrondi
inacceptables sur des montants financiers).

## Absence de logique serveur (✅ Confirmé — rappel critique)

0 procédure stockée, 0 trigger, 0 fonction, 0 colonne calculée. Toute règle de gestion doit
être retrouvée côté client VB ou reconstituée avec le métier — voir
`Business/business-rules.md` §3 pour l'implication sur la méthode de travail.

## Absence d'indexation métier (✅ Confirmé)

Aucun index au-delà des clés primaires. À l'usage réel en production, cela peut déjà être une
source de lenteur sur les grosses tables transactionnelles (mesurages, mouvements). 🟡
Recommandation : profiler les requêtes les plus fréquentes de chaque module au moment de sa
migration et ajouter les index correspondants dans le nouveau schéma — ne pas se contenter de
répliquer l'absence d'index de l'existant.

## Intégrité référentielle (✅ Confirmé — bon signal pour la migration)

522 contraintes FK sur 199 tables : la cohérence référentielle est globalement bien posée au
niveau du schéma, ce qui limite le risque de données orphelines lors de la migration.
