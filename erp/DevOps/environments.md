# Environnements

## Statut : 🟡 Proposé

## Deux environnements, pas plus, en première itération

| Environnement | Rôle |
|---|---|
| **Dev/Test** | Développement et validation avant bascule d'un module ; base de données de test (copie anonymisée ou jeu de données réduit) |
| **Production** | Coexiste avec le legacy VB pendant toute la durée de la migration (voir `Architecture/deployment.md`) |

Pas d'environnement de préproduction séparé en première itération — la validation se fait en
Dev/Test avant bascule module par module, cohérent avec l'approche Strangler Fig et la
contrainte de ressources (un environnement supplémentaire = un coût et une charge de
synchronisation supplémentaires pour une seule personne).

## Configuration par environnement

🟡 Proposé : variables d'environnement / `appsettings.{Environment}.json` pour :
- Chaîne de connexion base de données
- Endpoints des intégrations externes (GTG, INTERHOLCO, SAGE — probablement des endpoints de
  test distincts à obtenir auprès de ces partenaires, 🔴 à confirmer)
- Clés d'authentification (Azure AD B2C ou équivalent)

## Réévaluation future

🔴 Un environnement de préproduction dédié devient justifié si l'équipe grandit à nouveau
(retour à un budget de développement, voir contexte `intro.md`) — à revisiter à ce moment,
pas à anticiper maintenant.
