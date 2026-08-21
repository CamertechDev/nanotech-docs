# Architecture Cloud

## Statut : architecure de référence 
###  Dimensionnement à préciser par environnement

C'est ici que NanoAdmin se différencie auprès des DSI : l'ERP repose sur une
**architecture Azure moderne, sécurisée et évolutive**, alignée sur les meilleures
pratiques du **Microsoft Cloud Adoption Framework (CAF)**.

## Hébergé sur Microsoft Azure

NanoAdmin est déployé selon une topologie **hub-spoke** : le trafic public est filtré en
amont (Front Door, WAF, Firewall), la charge de travail vit dans un réseau spoke isolé,
et les secrets comme la supervision sont externalisés dans des services managés.

## Schéma d'architecture

```
                            Internet
                                │
                                ▼
                      ┌───────────────────┐
                      │  Azure Front Door │   Point d'entrée global, TLS,
                      └─────────┬─────────┘   routage, CDN
                                │
                                ▼
                ┌───────────────────────────────┐
                │  Application Gateway (WAF)    │   Pare-feu applicatif web :
                └───────────────┬───────────────┘   protection OWASP, SSL offload
                                │
                       ┌────────┴────────┐
                       │   Hub Network   │   Services partagés, connectivité
                       └────────┬────────┘
                                │
                                ▼
                       ┌────────────────┐
                       │ Azure Firewall │   Filtrage du trafic sortant/entrant,
                       └───────┬────────┘   règles réseau centralisées
                                │
                                ▼
                  ┌──────────────────────────┐
                  │     Spoke Production     │   Réseau isolé de la charge
                  │  ┌────────────────────┐  │   de travail
                  │  │    App Service     │  │   Application NanoAdmin
                  │  └─────────┬──────────┘  │
                  │            ▼             │
                  │  ┌────────────────────┐  │
                  │  │        API         │  │   API REST (backend)
                  │  └─────────┬──────────┘  │
                  │            ▼             │
                  │  ┌────────────────────┐  │
                  │  │     PostgreSQL     │──┼──► Storage (documents, exports)
                  │  └────────────────────┘  │
                  └──────────────────────────┘

        Services transverses (hors chemin de données) :

        ┌─────────────┐     ┌───────────────┐     ┌─────────────┐
        │  Key Vault  │     │ Azure Monitor │     │ Azure DevOps│
        │  (secrets,  │     │ (logs, métriques│    │ (CI/CD,     │
        │   clés,     │     │  alertes)      │     │  pipelines) │
        │   certificats)│   └───────────────┘     └─────────────┘
        └─────────────┘
```

## Rôle de chaque composant

| Composant | Rôle | Ce que ça apporte au client |
|---|---|---|
| **Azure Front Door** | Point d'entrée global (terminaison TLS, routage, accélération) | Performance et disponibilité à l'échelle mondiale |
| **Application Gateway (WAF)** | Pare-feu applicatif web (règles OWASP) | Protection contre les attaques web courantes (injection, XSS…) |
| **Hub Network** | Réseau central de connectivité et services partagés | Topologie hub-spoke propre au CAF, extensible |
| **Azure Firewall** | Filtrage réseau centralisé (entrant/sortant) | Contrôle strict des flux, journalisation des connexions |
| **Spoke Production** | Réseau virtuel isolé dédié à la charge de travail | Isolation : la production n'est jamais exposée directement |
| **App Service** | Hébergement managé de l'application | Pas de serveurs à gérer, montée en charge intégrée |
| **API** | Backend REST de NanoAdmin | Ouverture et intégration (voir `pourquoi.md`) |
| **PostgreSQL** | Base de données relationnelle managée | Sauvegardes, patching et haute disponibilité gérés par Azure |
| **Storage** | Stockage objet (documents, pièces jointes, exports) | Durabilité et coût maîtrisé pour les fichiers |
| **Key Vault** | Coffre de secrets (chaînes de connexion, clés, certificats) | Aucun secret dans le code ni dans la configuration |
| **Azure Monitor** | Logs, métriques, alertes | Supervision proactive, détection d'incidents |
| **Azure DevOps** | Pipelines CI/CD, gestion du code | Déploiements automatisés, traçables et réversibles |

## Principes d'architecture (alignement CAF)

- **Sécurité en profondeur** — trois niveaux de filtrage successifs (Front Door → WAF →
  Firewall) avant d'atteindre la moindre donnée ; le spoke production n'a aucune exposition
  publique directe.
- **Services managés d'abord** — App Service, PostgreSQL managé, Key Vault, Monitor :
  pas de VM à patcher, surface d'attaque et charge d'exploitation réduites.
- **Aucun secret en clair** — toutes les chaînes de connexion et clés vivent dans
  Key Vault, référencées par l'application au runtime.
- **Observabilité native** — toute la plateforme alimente Azure Monitor ; les alertes
  sont configurées dès le déploiement, pas après le premier incident.
- **Livraison continue** — chaque mise à jour passe par un pipeline Azure DevOps :
  build, tests, déploiement automatisé, retour arrière possible.
- **Évolutivité** — la topologie hub-spoke permet d'ajouter des spokes (nouveaux
  environnements, nouvelles régions) sans repenser l'architecture.

## Points à préciser avant mise en production

| Sujet | Statut |
|---|---|
| Dimensionnement des SKU (App Service, PostgreSQL, Front Door) | 🟡 à chiffrer selon la charge cible |
| Stratégie de sauvegarde et PRA (RPO/RTO) | 🔴 à formaliser |
| Redondance multi-région | 🟡 envisageable via Front Door — à arbitrer selon le SLA visé |
| Environnements (dev / staging / prod) en spokes séparés | 🟡 recommandé CAF, à confirmer |
