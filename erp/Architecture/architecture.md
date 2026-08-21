# Architecture — état des lieux et décisions

## Statut : ⚠️ Document le plus important à tenir à jour — plusieurs décisions structurantes ne sont PAS encore tranchées

## Contrainte n°1, à respecter dans toute décision de ce document

Le projet est maintenu par **une seule personne, non dédiée à temps plein, sans budget de
développement externe garanti** (voir `intro.md`). Toute architecture proposée doit être
évaluable par la question : *"une personne seule peut-elle l'opérer et la faire évoluer sans
service DevOps dédié ?"* Si la réponse est non, l'option est écartée par défaut, même si elle
est techniquement supérieure dans l'absolu.

## Décisions NON tranchées à ce jour (🔴 à arbitrer avant de coder davantage)

### 1. Stack frontend : Angular PWA vs Blazor WebAssembly

Deux architectures ont été évoquées dans l'historique du projet, sans qu'aucune décision
formelle ne soit actée :

| Piste | Source | État |
|---|---|---|
| Angular + 3 microservices .NET 9 (Security, DataReferences, Inventaire) en DDD | Décrit verbalement comme "déjà en développement" | 🔴 Aucune trace dans les documents de spécification/offre — état du code réel à vérifier directement dans le(s) dépôt(s) |
| N-tier (Client/Web/DB) avec choix entre ASP.NET Core Blazor WebAssembly **ou** Angular PWA 16, backend Web API Core commun | Offre commerciale Camertechdev/TechUp | 🔴 Présentée comme deux options concurrentes, non arbitrées dans le document source |

**Recommandation** 🟡 : compte tenu de la contrainte n°1, privilégier **Blazor WebAssembly**
si l'équipe reste majoritairement C#/.NET — un seul langage du frontend au backend réduit la
charge cognitive pour un développeur solo. Angular reste un choix valide s'il existe déjà du
code Angular fonctionnel à ne pas jeter — **la première action concrète doit être d'auditer
l'état réel du code existant** (les 3 microservices mentionnés) avant d'écrire une seule
ligne de plus, pour ne pas trancher dans le vide.

### 2. Découpage service unique vs microservices

🟡 Recommandation ferme compte tenu de la contrainte n°1 : **monolithe modulaire**, pas
microservices. Voir `Domain/bounded-contexts.md` pour le découpage logique en modules à
l'intérieur de ce monolithe. Si 3 microservices existent déjà en développement (non déployés
en production, confirmé), **les consolider en un seul déployable est recommandé avant
d'ajouter les 5 modules restants**, plutôt que de poursuivre le découpage en services séparés.
Raisons détaillées : chaque service séparé ajoute un pipeline CI/CD, une base/schéma, une
gestion d'authentification inter-service, un cycle de déploiement — coûts opérationnels
incompressibles qu'une personne seule ne peut pas absorber en plus du développement
fonctionnel.

## Ce qui est acquis / peu discutable (✅ Confirmé)

- **Base de données** : SQL Server (déjà en place, 199 tables, 522 FK, schéma globalement
  sain — voir `Database/schema.md`). Pas de raison de changer de SGBD.
- **Backend** : Web API Core (REST) — cohérent sur toutes les sources (offre, discussion projet).
- **Multi-site** : déjà résolu au niveau données (voir `Business/organisation.md`), à
  préserver via un filtrage transversal par site/société.

## Style architectural recommandé (Clean Architecture allégée)

Voir `Architecture/clean-architecture.md` pour le détail des couches. Principe directeur :
DDD riche uniquement sur Forêt et Usine (complexité métier réelle avérée) ; CRUD simple
partout ailleurs (Administration, Sécurité, Logistique, Transit, Comptabilisation en première
itération).

## Prochaine étape concrète recommandée

🟡 Avant toute nouvelle fonctionnalité : (1) auditer l'état réel des 3 microservices
existants, (2) documenter la décision Angular/Blazor et service unique/microservices dans ce
fichier avec un statut ✅, (3) seulement ensuite reprendre le développement fonctionnel
module par module selon la priorisation de `Functional/use-cases.md`.
