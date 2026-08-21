# Modèle entité-relation (ERD)

## Statut : ✅ Confirmé pour l'inventaire chiffré · 🟡 Proposé pour le regroupement en clusters

## Chiffres réels du schéma (✅ Confirmé, `BaseDeDonnees_EXPERTBOIS.sql`)

| Métrique | Valeur |
|---|---|
| Tables | 199 |
| Vues | 7 |
| Colonnes (total) | ~1546 |
| Contraintes FK | 522 |
| Procédures stockées | 0 |
| Triggers | 0 |
| Fonctions | 0 |
| Colonnes calculées | 0 |
| Index au-delà des clés primaires | 0 |

## Pourquoi pas de diagramme ERD complet dans ce fichier

199 tables et 522 FK produisent un diagramme illisible en un seul schéma. 🟡 Recommandation :
générer un diagramme **par contexte** (voir `Domain/bounded-contexts.md`) avec un outil
(dbdiagram.io, Azure Data Studio, SSMS Database Diagrams) au moment de migrer chaque contexte,
et le déposer dans `docs/images/`. Un ERD global, statique, deviendrait obsolète dès la
première évolution de schéma et n'aiderait pas la migration incrémentale.

## Clusters de tables identifiés (🟡 Proposé, base pour les futurs diagrammes par contexte)

Correspond au découpage de `Domain/bounded-contexts.md` — voir ce fichier pour le détail
des relations inter-contextes déduites des FK.

## Points d'attention identifiés dans le schéma

- **Pas d'index métier** : toutes les recherches (autres que par clé primaire) reposent
  aujourd'hui sur des scans ou des plans d'exécution non optimisés. À corriger lors de la
  migration, pas à reproduire à l'identique — voir `migrations.md`.
- **Colonnes legacy `image`/`text`** : 8 occurrences dans le schéma — probablement des
  documents/signatures stockés en BLOB. 🔴 À vérifier si ces données doivent migrer vers un
  stockage fichier dédié (Azure Blob Storage) plutôt que rester en base.
- **Clé primaire non-clustered sur certaines tables** (ex. `tblCommandesEntete`) avec des
  conventions de nommage type Access — signe d'un schéma dont l'origine remonte à une
  migration antérieure (Access → SQL Server). Sans impact fonctionnel, mais à garder en tête
  pour l'optimisation des performances lors de la migration.
