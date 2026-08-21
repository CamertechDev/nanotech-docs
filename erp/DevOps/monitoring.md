# Supervision (Monitoring)

## Statut : 🟡 Proposé — minimal par défaut

## Recommandation

Application Insights (tier gratuit, intégré nativement à .NET et Azure App Service) pour :
- Logs applicatifs centralisés (remplace le débogage "sur poste" propre au client lourd VB).
- Suivi des temps de réponse API — utile notamment pour repérer les tables sans index
  métier qui deviendraient lentes en production (voir `Database/schema.md`).
- Alertes basiques (taux d'erreur, disponibilité) — pas de tableau de bord sophistiqué en
  première itération.

## Ce qui n'est pas recommandé en première itération

- Stack d'observabilité distribuée (traces distribuées, corrélation multi-services) — sans
  objet pour un monolithe modulaire unique (voir `Architecture/architecture.md`).
- Outils de monitoring tiers payants — Application Insights gratuit suffit tant que le volume
  reste dans les seuils du tier gratuit.

## Priorité de supervision métier

🟡 Proposé : superviser en priorité les échecs des 3 intégrations externes critiques (GTG,
INTERHOLCO, SAGE — voir `Architecture/api.md`), car une panne silencieuse sur l'export SAGE
aurait un impact comptable direct et différé (découvert trop tard). Une alerte simple par
email/Teams en cas d'échec d'export est suffisante pour démarrer.
