---
sidebar_position: 1
---

# GestionBoisERP — Documentation fonctionnelle et technique

Documentation de référence pour la refonte de **GestionBois / Expert Bois**, application
métier de gestion et traçabilité du bois (forêt → transformation → export), du legacy
Visual Basic / SQL Server vers une nouvelle plateforme web.

## À qui s'adresse cette documentation

Cette documentation est écrite pour être consommée par des **agents IA de développement**
(Claude Code ou équivalent) et par toute nouvelle personne rejoignant le projet. Elle sert de
socle de contexte avant toute génération de code : lire `Business` et `Functional`
avant de toucher au domaine, lire `Domain` avant d'écrire du code applicatif, lire
`Architecture` avant de créer un nouveau service ou une nouvelle couche.

## Contexte projet à connaître avant de contribuer

- **Historique** : ceci est la **deuxième refonte**. GestionBois (VB6, 15 modules, 3 bases
  distinctes) a été analysé en 2018, puis reconsolidé en 2023 en "Expert Bois" (VB.NET +
  SQL Server, 8 modules, base unique). La refonte actuelle vise à migrer Expert Bois vers une
  stack web moderne.
- **Contrainte majeure : ressources très limitées.** Le projet est actuellement maintenu par
  une seule personne, non dédiée à temps plein, sans budget de développement externe garanti.
  **Toute proposition d'architecture doit être évaluée à l'aune de cette contrainte** :
  préférer systématiquement la solution la plus simple à opérer et à maintenir seul, même si
  une solution plus sophistiquée serait "meilleure" dans l'absolu.
- **Décisions non tranchées à ce jour** : le choix définitif de la stack frontend (Angular PWA
  vs Blazor WebAssembly) et le découpage service unique / microservices ne sont **pas
  arbitrés**. Voir `Architecture/architecture.md` pour l'état des lieux — ne pas supposer
  qu'une décision a été prise tant que ce fichier n'a pas été mis à jour avec un statut ✅.

## Légende des statuts utilisée dans tous les documents

| Statut | Signification |
|---|---|
| ✅ Confirmé | Extrait directement d'un document source ou du schéma SQL réel |
| 🟡 Proposé | Recommandation ou déduction raisonnable, à valider avant implémentation |
| 🔴 Lacune | Information absente des sources disponibles — nécessite audit du code VB existant ou interview métier |

## Sources documentaires utilisées pour produire cette documentation

| Document | Date | Contenu |
|---|---|---|
| `GBRW-Document Fonctionnel-Specification1` | 2018 | Étude de l'existant du legacy GestionBois (15 modules, 393 formulaires, critiques par module) |
| `GBRW-Document Fonctionnel-Spécification2` | 2018 | Première analyse fonctionnelle de refonte (processus métier, dictionnaire de données, modèle physique) |
| `GW_Spécifications_Expert_Bois` V0.1 | 2023 | Spécification fonctionnelle et technique d'Expert Bois (8 modules, structures de tables détaillées) |
| `BaseDeDonnees_EXPERTBOIS.sql` | 2023 | Script de création de la base SQL Server réelle en production (199 tables, 7 vues, 522 FK) |
| `Support-Offre-migration-Gestionbois-v2.pptx` | — | Offre commerciale de migration (Camertechdev / TechUp), architecture N-tier proposée |

**Aucune de ces sources ne documente les règles métier au niveau du code** (0 procédure
stockée, 0 trigger, 0 fonction dans la base SQL réelle — toute la logique vit dans le client
VB). C'est la lacune 🔴 la plus importante et récurrente de cette documentation : elle doit
être comblée par lecture du code VB existant ou par interviews métier, module par module, au
fur et à mesure de la migration — pas anticipée en bloc avant de commencer.

## Structure du dossier

```
erp/
├── Business/       → Pourquoi ce logiciel existe, qui l'utilise, quelles règles le gouvernent
├── Functional/     → Ce que le logiciel fait, processus par processus
├── Domain/         → Modélisation DDD (bounded contexts, agrégats, entités)
├── Architecture/   → Comment le logiciel est construit techniquement
├── Database/       → Le schéma de données réel et sa migration
├── Frontend/       → L'application cliente
├── DevOps/         → Déploiement, CI/CD, supervision
└── images/         → Diagrammes (schémas extraits des sources, à régénérer proprement)
```

## Principe directeur pour toute contribution (humaine ou IA)

> À ressources égales, préférer le monolithe modulaire aux microservices, le CRUD simple à la
> DDD complète, et un composant générique liste + formulaire réutilisable à 370 écrans
> codés à la main. Complexifier uniquement là où la complexité métier réelle l'exige
> (cubage, mesurages forestiers, tarification) — pas par principe.
