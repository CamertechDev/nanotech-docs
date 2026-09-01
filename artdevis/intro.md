---
sidebar_position: 1
title: ArtDevis — Présentation
---

## Présentation générale

**ArtDevis** est une application métier multiplateforme Developper avec (Flutter) destinée aux artisans du bâtiment, en particulier les plombiers. Elle permet de **dicter un devis sur le chantier**, de le contrôler, de le traduire en français pour le client, puis de générer un **PDF professionnel** prêt à partager.

Le client final **n'utilise pas l'application**. Toute la relation commerciale passe par le PDF, le téléphone, WhatsApp ou l'email, selon les habitudes de l'artisan.

### Les trois piliers produit

| Pilier | Apport |
| --- | --- |
| **Gain de temps** | Un devis structuré en quelques minutes au lieu d'une rédaction manuelle longue |
| **Marge** | Intégration des tarifs fournisseurs négociés dans le devis vocal |
| **Inclusion** | L'artisan dicte dans sa langue, le client reçoit un document en français |

### Périmètre MVP livré (août 2026)

| Module | Statut | Commentaire |
| --- | --- | --- |
| Authentification et profil artisan | Livré | Connexion Supabase, onboarding, paramètres acompte |
| Clients | Livré | Liste, recherche, fiche client, historique devis |
| Devis vocal | Livré | Flux complet Écrans 3 à 6, protocole, compléter par la voix, photos 0/2 |
| Flux devis France | Livré | Contrôle langue dictée, traduction FR, aperçu client |
| Relation client | Livré | Partage PDF, marquer envoyé, accepté/refusé |
| Mes Chantiers | Livré | Navigation par date, report, annulation client |
| Mon Équipe | Livré | Gestion des opérateurs rattachés au patron |
| Catalogue fournisseurs | Livré | Tarifs privés par artisan, injection IA |
| Veille et entretien | MVP mock | Alertes démo, SMS, badge dynamique — données réelles Phase 2 |
| Factures acompte / solde | Livré | PDF + partage depuis fiche client et chantiers terminés |

## Interface
![alt text](image.png)
### Environnements

| Environnement | URL ou accès |
| --- | --- |
| Application web (production) | [artdevis.vercel.app](https://artdevis.vercel.app) |
| Backend | Supabase (PostgreSQL, Auth, Storage, Edge Functions) |
| Démo mock | `USE_MOCK=true` sans appel réseau |

### Sommaire de cette section

**Présentation**
* [Vue d'ensemble](./presentation/vue-ensemble)

**Architecture**
* [Clean Architecture](./architecture/clean-architecture)
* [Stack, BaaS, IA et modèle de données](./architecture/stack-et-backend)

**Fonctionnel**
* [Flux devis France](./fonctionnel/flux-devis-france)
* [Devis vocal](./fonctionnel/devis-vocal)
* [Relation client](./fonctionnel/relation-client)
* [Chantiers et veille](./fonctionnel/chantiers-et-veille)
* [Factures (acompte et solde)](./fonctionnel/factures)
* [Catalogue et tarifs fournisseurs](./fonctionnel/catalogue-fournisseurs)

**Guide utilisateur** *(artisans)*
* [Premiers pas](./guide-utilisateur/premiers-pas)
* [Clients et devis vocal](./guide-utilisateur/clients-et-devis-vocal)
* [Envoyer un devis au client](./guide-utilisateur/envoyer-au-client)
* [Chantiers et factures](./guide-utilisateur/chantiers-et-factures)
* [Mon équipe](./guide-utilisateur/mon-equipe)
* [Profil et compte](./guide-utilisateur/profil-et-compte)

**Exploitation**
* [Développement et tests](./exploitation/developpement-et-tests)
* [Guide QA](./exploitation/guide-qa)
* [Conformité App Store / Play Store](./exploitation/conformite-app-stores)
* [Logging et diagnostic](./exploitation/logging-et-diagnostic)
* [Déploiement](./exploitation/deploiement)

**Roadmap**
* [État des livraisons](./roadmap/etat-des-livraisons)

**Tests QA**
* [Index guides QA](./qa/guides/index-guides-qa)
* [Conformité stores (checklist TC-STORE)](./qa/conformite-stores-checklist)
* [Devis vocal (guide QA)](./qa/guides/devis-vocal)
* [Campagne onboarding (août 2026)](./qa/campagnes/2026-08-release-r2b)

Pour **mettre à jour** ces pages après un changement produit : [Développement et tests](./exploitation/developpement-et-tests#maj-docs).
