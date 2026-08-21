# Agrégats

## Statut : 🟡 Proposé — déduit du pattern de nommage Entete/Details observé dans le schéma SQL réel

## Méthode de déduction

Le schéma SQL suit un pattern de nommage cohérent qui donne de bons indices d'agrégation :
tables en `*Entete` (racine) + tables en `*Details` (enfants), reliées par clé étrangère. Ce
pattern DDD est **déjà présent implicitement dans le schéma existant** — la migration
consiste à le rendre explicite dans le code, pas à l'inventer.

## Agrégats candidats par contexte

### Contexte Commandes
- **Racine** : `CommandesEntete` (`tblCommandesEntete`)
- **Entités enfants** : `CommandesDetails`, `CommandesAvenant`, `CommandesSoldes`,
  `CommandesObservations`, `CommandesDocumentation`
- **Invariant candidat** 🔴 (à valider) : une commande ne peut probablement pas être modifiée
  après un certain statut (embarquée ? facturée ?) — statut réel non documenté, voir
  `Functional/workflows.md`

### Contexte Usine
- **Racine** : `SciagesEntete` (`tblSciagesEntete`)
- **Entités enfants** : `SciagesMesurages`
- **Racine séparée** : `GrumesUsine` (réception, distincte du sciage — probablement un
  agrégat séparé, la grume existe avant d'être sciée)

### Contexte Forêt
- **Racine** : `RoulageForet` (`tblRoulageForet`)
- **Entités enfants** : `RoulageForetDetails`, `RoulageForetDetailTombee`,
  `RoulageForetDetailTombeeRecuperees`
- **Racine séparée** : `AssietteAnnuelleCoupe` (unité de gestion forestière, cycle de vie
  propre — probablement un agrégat racine indépendant, source de `ArbresInventories`)

### Contexte Logistique / Transit
- **Racine** : `TransitBoisOrdre` (`tblTransitBoisOrdre`)
- **Entités enfants** : `TransitBoisOrdreDetails`
- **Racine séparée** : `TransitBillOfLeading` (document juridique distinct, cycle de vie
  propre) avec `TransitBillOfLeadingDetails`
- **Racine séparée** : `Conteneurs` (suivi indépendant, référencé par plusieurs expéditions)

### Contexte Comptabilisation
- **Racine** : `ComptabiliteFactureExport` / `ComptabiliteFactureLocale` (deux agrégats
  distincts — la structure diffère, `FactureLocale` a des composants/taxes/types propres)
- **Entités enfants (export)** : `ComptabiliteFactureExportDetails`
- **Entités enfants (locale)** : `ComptabiliteFactureLocaleDetails`,
  `ComptabiliteFactureLocaleComposants`, `ComptabiliteFactureLocaleTaxes`

### Contexte Administration
- Essentiellement des **agrégats à entité unique** (pas de sous-entités) : `Essence`,
  `QualitesBois`, `Produits`, `Unites` — cohérent avec leur rôle de référentiel.

## ⚠️ Avertissement méthodologique

Cette liste est une **hypothèse de départ basée sur la structure du schéma**, pas une analyse
DDD event-storming avec les métiers. Les vrais invariants métier (ce qui doit rester cohérent
à l'intérieur d'un agrégat, quelles règles interdisent quelles modifications) restent à
documenter module par module — voir la lacune récurrente sur les règles de gestion
(`Business/business-rules.md` §3).
