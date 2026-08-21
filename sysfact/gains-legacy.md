---
sidebar_position: 2
title: Gains vs Système Legacy
---

| # | Domaine | Système Legacy | SysFact 2.0 | Gain |
|---|---------|---------------|-------------|------|
| 1 | **Archivage** | Archivage manuel, aucune trace des données client/devise au moment de l'archivage | Snapshot JSON immutable (client, compte, devise) stocké avec la facture | Reproductibilité totale — audit légal, données historiques fiables |
| 2 | **Journal de vente** | Saisie manuelle dans SAGE, erreurs humaines fréquentes | Génération automatique (`POST /ventes/journaux/generer`), export fichier structuré | Temps de traitement ÷10, zéro erreur de saisie, traçabilité par log |
| 3 | **IA** | Aucune capacité d'analyse prédictive | Analyse de risque, suggestions de statut, analyse des causes de rebus, prédictions produits, rapport de ventes — multi-provider (Claude/OpenAI/Gemini) | Détection proactive des impayés, support décisionnel, disponible même hors-connexion (FallbackAIService) |
| 4 | **Config. DB** | Modification manuelle du fichier `appsettings.json` sur le serveur (risque d'erreur, indisponibilité) | Interface web admin → écriture dans `sysfact.local.json` + test de connexion avant sauvegarde | Zéro accès serveur requis, rollback possible, test avant application |
| 5 | **Config. SMTP / Stockage** | Fichier de configuration partagé, pas de test en ligne | Formulaires dédiés par section, isolation des responsabilités | Modification ciblée sans risque d'effacer d'autres paramètres |
| 6 | **Multi-tenant** | Un seul client par instance | `CompanyId` partout, toutes données isolées par entreprise | SaaS-ready sans redéploiement |
| 7 | **Résilience réseau** | Timeout bloquant l'utilisateur si IA ou service externe indisponible | Timeout 15 s + `FallbackAIService` → l'application reste utilisable | UX préservée même en Afrique sans connexion fiable |
| 8 | **Audit & Traçabilité** | Aucun journal d'audit — impossible de savoir qui a fait quoi et quand | `AuditLog` horodaté sur chaque action sensible (login, factures, config…) — filtrable par type, action, utilisateur, sévérité | Conformité légale, détection d'intrusion, support utilisateur |
| 9 | **Compte Owner** | Compte admin en base de données — modifiable par un DBA malveillant | Compte Owner hardcodé dans la config (`appsettings.json`) — BCrypt + JWT `role=OWNER` — aucune BD touchée au login | Immuable même si la BD est compromise |
| 10 | **Sauvegarde BD** | Intervention DBA requise (SSMS, ligne de commande) — clients PME non formés | Interface web Admin : backup manuel ou planifié (quotidien/hebdo/mensuel), liste des backups, restauration avec confirmation — chemin configurable | Autonomie totale, zéro accès serveur requis pour la sauvegarde |

---