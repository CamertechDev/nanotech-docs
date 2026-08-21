# Conventions de nommage — legacy vs cible

## Statut : ✅ Confirmé (colonne "Legacy") · 🟡 Proposé (colonne "Cible")

| Élément | Convention legacy (SQL actuel) | Convention cible proposée (code C#/domaine) |
|---|---|---|
| Table | `tblCommandesEntete` | Classe `Commande` (retirer `tbl`, retirer `Entete` si racine d'agrégat évidente) |
| Table enfant | `tblCommandesDetails` | Classe `LigneCommande` (nommer le concept métier, pas répéter "Details") |
| Clé primaire | `CommandesEnteteID` | `Id` (convention EF Core), mapping explicite vers la colonne legacy conservé en commentaire pendant la transition |
| Clé étrangère | `SiteOperationID` | `SiteOperationId` (Pascal/camel selon contexte C#) |
| Table référentiel | `tblEssence` | Classe `Essence` |
| Booléen | `bit`, souvent préfixé (à vérifier au cas par cas) | `bool`, préfixe `Is`/`Has` en C# |

## Principe de transition

🟡 Proposé : garder le nom de table SQL d'origine visible (via l'attribut `[Table("tbl...")]`
d'EF Core ou équivalent) pendant toute la phase de coexistence avec le legacy VB — facilite le
débogage croisé entre les deux systèmes qui partagent la même base (voir
`Architecture/deployment.md`). Une fois un module totalement migré et le legacy VB
définitivement éteint sur ce module, le renommage physique des tables peut être envisagé
(non prioritaire).

## Ne pas renommer prématurément

🔴 Attention pour les agents IA : ne pas renommer les tables/colonnes SQL existantes tant
qu'un module est encore utilisé en parallèle par le legacy VB — un renommage casserait
silencieusement l'application VB en production. Toute la traduction de nommage se fait dans
la couche domaine C#, jamais en modifiant le schéma SQL partagé tant que la coexistence dure.
