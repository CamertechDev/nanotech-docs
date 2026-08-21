# Déploiement et stratégie de migration

## Statut : 🟡 Proposé

## Stratégie générale : Strangler Fig, pas Big Bang

Le legacy VB (Expert Bois) continue de tourner en production pendant toute la durée de la
migration. Chaque module migré remplace progressivement son équivalent legacy, module par
module — jamais de bascule totale en une fois. Cohérent avec la réalité des ressources
(voir `intro.md`) : un big bang demande une capacité de test/bascule qu'une personne seule ne
peut pas assumer sans risque opérationnel majeur pour l'entreprise (traçabilité bois = activité
critique, export/douane inclus).

## Ordre de migration recommandé

🟡 Proposé, basé sur : (a) la présence d'intégrations externes prioritaires (`api.md`), (b) la
complexité métier réelle (`Domain/bounded-contexts.md`), (c) le volume d'écrans à faible
risque pour valider le pattern générique en premier :

1. **Administration / Sécurité** — référentiels + auth, sert de fondation, valide le pattern
   CRUD générique avant tout le reste (voir `Frontend/ui.md`), risque métier faible.
2. **Commandes** — intégration INTERHOLCO prioritaire, workflow métier modéré.
3. **Forêt** — intégration GTG, complexité métier réelle (cubage), contexte riche.
4. **Usine** — dépend de Forêt (réception grumes), complexité réelle (mesurages).
5. **Logistique + Transit** — dépendent de Commandes et Usine, workflow export.
6. **Comptabilisation** — dépend de tout ce qui précède, intégration SAGE.

## Infrastructure minimale recommandée

🟡 Proposé, en rupture volontaire avec l'architecture Azure Hub & Spoke évoquée dans les
premières discussions du projet (jugée disproportionnée) :

| Composant | Recommandation | Pourquoi |
|---|---|---|
| Hébergement API + frontend | 1 Azure App Service (tier Basic/Standard) ou 1 VM | Un seul déployable, coût prévisible, pas de Kubernetes |
| Base de données | 1 Azure SQL Database (ou SQL Server sur la même VM si moins cher) | Réutilise directement le schéma existant |
| CI/CD | 1 pipeline GitHub Actions ou Azure DevOps (tier gratuit) | Pas de pipeline par microservice |
| Monitoring | Application Insights (tier gratuit) ou logs applicatifs simples | Voir `DevOps/monitoring.md` |

## Coexistence avec le legacy pendant la transition

🔴 Lacune : le mécanisme de synchronisation de données entre le legacy VB (toujours en
écriture sur les modules non encore migrés) et la nouvelle base doit être défini avant la
première mise en production partielle — soit base partagée (le legacy et le nouveau système
lisent/écrivent la même base SQL Server, module par module), soit synchronisation explicite.
🟡 Recommandation : **base partagée** si le schéma le permet sans risque (c'est déjà une base
unique, pas de duplication) — évite de construire un mécanisme de synchronisation
supplémentaire, cohérent avec la contrainte de ressources.
