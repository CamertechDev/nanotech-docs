# CQRS — usage ciblé, pas systématique

## Statut : 🟡 Proposé

## Position

CQRS complet (modèles de lecture et d'écriture séparés, potentiellement des bases séparées,
projections asynchrones) **n'est pas recommandé** pour ce projet dans son état actuel de
ressources. C'est un investissement qui se justifie pour des volumes de trafic ou une
complexité de lecture que rien dans les documents disponibles ne démontre pour l'instant.

## Ce qui est recommandé à la place : "CQRS léger"

- **Séparer les DTOs de lecture des modèles d'écriture** (ne pas exposer les entités EF Core
  directement dans l'API) — bénéfice immédiat, coût quasi nul.
- **Pas de second stockage, pas de bus de projection** — une seule base SQL Server, des
  requêtes de lecture optimisées (vues SQL si besoin, comme les 7 vues déjà présentes dans le
  schéma actuel) plutôt qu'un modèle de lecture dénormalisé séparé.
- Utiliser MediatR (ou équivalent) pour structurer les handlers de commandes/requêtes **si
  ça aide à la lisibilité**, sans que ce soit un prérequis architectural.

## Où un vrai CQRS pourrait un jour se justifier

🔴 À réévaluer seulement si un besoin réel apparaît, par exemple :
- Des écrans de reporting/états lourds (rappel : le legacy avait 192 états + 117 exports
  Excel) qui ralentiraient la base transactionnelle — dans ce cas, des vues matérialisées ou
  une base de reporting en lecture seule répliquée seraient une réponse ciblée, pas un CQRS
  généralisé à toute l'application.
- Un contexte extrait en service séparé (voir `architecture.md`) avec un besoin de
  scalabilité en lecture propre.

## Pourquoi cette section existe dans le proposé initial de structure de doc

Le dossier `Architecture` prévoyait un fichier `cqrs.md` — ce document répond à cette
attente en posant explicitement la limite : CQRS est un outil, pas un objectif en soi, et son
absence de justification actuelle doit être documentée pour éviter qu'un agent IA ou un
développeur ne l'implémente "parce que c'est dans le plan".
