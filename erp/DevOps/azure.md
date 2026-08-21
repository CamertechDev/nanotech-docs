# Azure — empreinte minimale

## Statut : 🟡 Proposé — en rupture volontaire avec les propositions initiales du projet (Hub & Spoke, cloud natif complet)

## Pourquoi ce changement de cap

Les toutes premières discussions sur ce projet évoquaient une infrastructure Azure "cloud
native" complète (topologie Hub & Spoke, observabilité avancée, CI/CD multi-environnements).
Compte tenu de la contrainte réelle de ressources (voir `intro.md` — un seul développeur, pas
de budget garanti), cette ambition est **revue à la baisse volontairement** : la priorité est
qu'une seule personne puisse opérer l'infrastructure sans expertise Azure poussée ni charge
de maintenance récurrente.

## Empreinte recommandée

| Ressource Azure | Tier recommandé | Rôle |
|---|---|---|
| App Service | Basic ou Standard (1 instance) | Héberge l'API + le frontend (si servi statiquement depuis le même service) |
| Azure SQL Database | Basic/Standard (ou réutiliser le SQL Server existant si déjà hébergé) | Base unique, déjà en place |
| Application Insights | Tier gratuit | Supervision minimale (voir `monitoring.md`) |
| Azure Blob Storage | Standard (si migration des colonnes `image`/`text`, voir `Database/erd.md`) | Stockage de documents hors base |

## Ce qui est explicitement écarté pour l'instant

- Kubernetes / AKS — charge opérationnelle disproportionnée pour un seul déployable.
- Topologie réseau Hub & Spoke — utile pour isoler plusieurs services/environnements à
  l'échelle ; pas de bénéfice pour un monolithe modulaire unique.
- Azure Front Door / CDN avancé — pas de besoin de scalabilité géographique démontré.

🔴 À réévaluer uniquement si le volume d'utilisateurs ou la répartition géographique des
sites (Congo, Cameroun, autres) démontre un vrai besoin de résilience régionale — pas en
anticipation.

## Coexistence avec l'infrastructure existante

🔴 Lacune : l'hébergement actuel de la base SQL Server d'Expert Bois (sur site ? déjà dans le
cloud ?) n'est pas documenté dans les sources disponibles — à clarifier avant de décider
si la base migre vers Azure SQL ou reste sur l'infrastructure actuelle (option la moins
coûteuse et la moins risquée à court terme si l'infra actuelle fonctionne déjà).
