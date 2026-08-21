# Entités

## Statut : ✅ Confirmé (noms et colonnes) · 🟡 Proposé (regroupement par contexte)

## Principe

Cette page recense les entités principales (tables avec identité propre et cycle de vie),
par contexte, en s'appuyant sur les 199 tables réelles du schéma. Elle ne reproduit pas les
199 tables (voir `Database/schema.md` pour l'inventaire complet) — seulement les entités
métier de premier plan, utiles pour démarrer la modélisation du domaine.

## Administration

`Siege`, `Societe`, `SiteOperation`, `Utilisateur`, `Operateur`, `Langue`, `Pays`,
`Continent`, `Monnaie`, `Ville`, `Certification`, `Materiel`

## Forêt

`AssietteAnnuelleCoupe`, `UniteForestiereProduction`, `Parcelle`, `ArbresInventories`,
`AbattageDetails`, `EtetageDetails`, `DebardageDetails`, `DebusquageDetails`, `RoulageForet`,
`Essence`, `TronconnageForetBilles`

## Usine

`GrumesUsine`, `Parc`, `UsineSciage`, `SciagesEntete`, `DebitesLocales`,
`LamellesProduitIntermediaires`, `ChambresSechoirs`, `UsineSciageTetesScie`

## Commandes

`CommandesEntete`, `CommandesDetails`, `CommandesAvenant`, `QualitesTarification`,
`Prestataires`

## Logistique

`Conteneurs`, `Expeditions`, `Empotages`, `CircuitsLogistiques`, `ModesTransports`

## Transit

`TransitBoisOrdre`, `TransitBoisEmbarquement`, `TransitBillOfLeading`,
`DeclarationsDossier`, `AttestationVerificationExport`, `Navires`,
`DossiersDeclarationDouaniere`

## Comptabilisation

`ComptabiliteFactureExport`, `ComptabiliteFactureLocale`, `ComptabiliteComptes`,
`ComptabiliteJournal`, `PrestationsFactures`

## Convention de nommage à adopter dans le code cible

🟡 Proposé (voir aussi `Database/naming-conventions.md`) : retirer le préfixe `tbl` et le
suffixe `ID` legacy dans les classes de domaine C# (`tblCommandesEntete` → classe
`Commande`), en gardant le nom SQL d'origine en commentaire/attribut de mapping EF Core pour
la traçabilité pendant la migration.
