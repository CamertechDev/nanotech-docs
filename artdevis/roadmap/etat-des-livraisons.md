---
sidebar_position: 1
title: État des livraisons
---

## Vue d'ensemble août 2026

| Domaine | Statut global | Commentaire |
| --- | --- | --- |
| Auth et profil | Livré | Session, onboarding, acompte |
| Clients | Livré | CRUD, fiche, historique |
| Devis vocal | Livré | Flux 3→6 + protocole + **compléter par la voix** + **photos 0/2** (patron, hors PDF) |
| Flux France R1-R3 | Livré | Contrôle, traduction, acompte |
| Relation client R2b | Livré | Partage, marquer envoyé, verrouillage |
| Chantiers | Livré | Navigation date, report, facturation à la clôture |
| Catalogue tarifs | Livré | Référentiel fixe + tarifs privés |
| Veille | MVP mock | Alertes démo, actions SMS, badge dynamique |
| Factures acompte / solde | Livré | PDF + partage, Edge Function `generer-pdf-facture` |
| Email auto Resend | Code livré | Désactivé en prod |

## Releases produit (France)

| Release | Contenu | Statut |
| --- | --- | --- |
| R1 | Contrôle langue dictée + traduction FR + aperçu client | Livré |
| R2 | Edge Function email + statut `envoye` | Code livré, email off |
| R3 | Paramètres acompte + bloc PDF | Livré |
| R2b | Historique client enrichi | Livré |
| Logging N1 | AppLogger + logs Edge Functions | Livré |
| Factures MVP | Acompte / solde PDF | Livré |
| Veille MVP | Repository + cubit mock | Livré |
| Photos chantier | 2 / devis, patron, bucket privé | Livré (app) ; `db push` prod |

## Backlog prioritaire

### P0 (stabilité production)

* Validation E2E dictée mobile réelle + OpenAI
* Validation E2E devis accepté → agenda → Mes Chantiers
* Migration `20260901_photos_devis.sql` + redéploiement `supprimer-compte`

### P1 (valeur terrain)

* Google Maps pour temps de route réels
* Brancher disponibilités artisan au planning
* Import CSV tarifs fournisseurs (scénario hybride)
* Validation E2E facture solde après chantier terminé
* Déploiement `generer-pdf-facture` + migration `20260835_factures.sql`

### P2 (Phase 2)

* Veille et entretien données réelles (`equipements_installes`)
* Factur-X et paiement en ligne
* Lien web Accepter/Refuser pour le client
* Assignation technicien, multi-jours, OR-Tools
* Photos chantier par un salarié (login + RLS devis partagés)
* Purge auto photos 30 j après statut terminal
* International Espagne et Royaume-Uni
* Observabilité Niveau 2 (Sentry)

## Hors scope France V1

* Signature électronique
* Relances SMS/WhatsApp automatiques
* Comparaison marge prix Web vs B2B persistée
* OCR grille fournisseur PDF

## Décisions PO ouvertes

| Sujet | Options |
| --- | --- |
| Expéditeur email | Adresse plateforme vs email artisan |
| MVP Chantiers | Valider malgré trajets simulés ? |
| Priorisation | Google Maps vs Veille |
| Catalogue | Scénario hybride (B) vs centralisé (A) |
| Starter + planification | Bloquer la planification auto sans Pro ? |
| MVP vocal | Démo commerciale vs beta interne |

## Prochaines étapes documentation

* Enrichir avec captures d'écran des écrans 3 à 6
* Documenter les cas de test PO dans un guide dédié
* Synchroniser cette section à chaque release majeure

## Références source

Cette documentation est dérivée du dépôt ArtDevis (`docs/`, `AGENTS.md`, `README.md`), consolidée pour le site Docusaurus centralisé Exfob.
