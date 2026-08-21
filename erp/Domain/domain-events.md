# Domain Events

## Statut : 🟡 Proposé — le legacy n'a aucun mécanisme d'événements (0 trigger dans la base réelle), cette liste est une proposition de conception, pas une reprise de l'existant

## Pourquoi ce fichier est une proposition, pas un audit

Le schéma SQL réel ne contient ni trigger, ni procédure stockée, ni file d'événements — le
legacy VB ne publie aucun événement, chaque écran modifie directement la base. La liste
ci-dessous est donc une proposition de conception pour la nouvelle architecture, à construire
progressivement, **uniquement là où un événement a un consommateur réel** (ne pas publier
d'événements "au cas où" — coût de maintenance inutile vu les ressources limitées du projet).

## Événements candidats, contexte par contexte

### Forêt
- `ArbreAbattuEnregistre` — pourrait déclencher une mise à jour d'inventaire
- `GrumeReceptionneeAuParc` — déclenche potentiellement un événement inter-contexte vers Usine

### Usine
- `SciageProduit` — production disponible, pertinent pour le rapprochement avec les commandes

### Commandes
- `CommandeConfirmee` — déclenche la planification logistique
- `CommandeSoldee` — déclenche la facturation

### Logistique / Transit
- `ConteneurEmpote`
- `ExpeditionEmbarquee` — déclenche potentiellement la facturation export

### Comptabilisation
- `FactureExporteeVersSage` — événement d'intégration, pas seulement domaine interne

## Recommandation d'implémentation

🟡 Proposé, cohérent avec la contrainte de ressources (voir `intro.md`) :
- **Ne pas mettre en place de bus d'événements/message broker** (Azure Service Bus, RabbitMQ…)
  dans une première itération — la charge opérationnelle n'est pas justifiée pour un
  monolithe modulaire porté par une personne.
- Utiliser des **événements in-process** (MediatR `INotification` ou équivalent léger), qui
  restent utiles pour découpler les modules à l'intérieur du même déploiement, sans coût
  d'infrastructure supplémentaire.
- Réévaluer un vrai bus d'événements uniquement si/quand un contexte est effectivement
  extrait en service séparé (voir `Architecture/architecture.md`).
