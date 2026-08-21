# Migrations de données et de schéma

## Statut : 🟡 Proposé

## Stratégie recommandée : Database-First initial, puis évolution Code-First par module

1. **Scaffolding EF Core Database-First** sur la base existante pour démarrer vite (générer
   les entités C# depuis les 199 tables réelles) — évite de retaper manuellement un modèle
   qui existe déjà et fonctionne.
2. **Au fur et à mesure de la migration de chaque module** (voir ordre dans
   `Architecture/deployment.md`), faire évoluer le sous-ensemble de tables concerné vers
   un modèle Code-First propre (migrations EF Core versionnées), avec les corrections
   nécessaires (types de données, index — voir `schema.md`).
3. Ne **pas** réécrire tout le schéma d'un coup avant de commencer le développement
   fonctionnel — cohérent avec l'approche Strangler Fig.

## Coexistence légale/technique avec le legacy VB pendant la transition

🔴 Lacune à trancher avant la première mise en production partielle (voir
`Architecture/deployment.md` — recommandation actuelle : base partagée, pas de
synchronisation séparée). Implication : les migrations de schéma sur une table encore utilisée
par le legacy VB doivent rester **rétro-compatibles** (ajout de colonnes nullable, pas de
suppression/renommage de colonnes en place tant que le legacy VB écrit encore dessus).

## Migration de données historiques

🔴 Lacune : aucune volumétrie réelle (nombre de lignes par table, profondeur d'historique
attendue) n'est documentée dans les sources disponibles. À collecter avant de dimensionner
l'effort de migration de données (au-delà de la migration de schéma).

## Outils recommandés

🟡 Proposé, cohérent avec la contrainte de ressources : EF Core Migrations (déjà inclus dans
l'écosystème .NET, pas d'outil tiers payant à ajouter) pour la gestion de schéma versionnée.
