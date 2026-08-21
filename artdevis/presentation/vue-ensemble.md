---
sidebar_position: 1
title: Vue d'ensemble
---

## Positionnement

ArtDevis cible les **artisans indépendants et petites équipes** qui perdent du temps sur la paperasse et souhaitent envoyer des devis crédibles depuis le terrain, sans retourner au bureau.

L'application combine :

* un **agenda** et une **gestion des clients** ;
* un **assistant vocal** pour produire des devis à partir d'une dictée ;
* un suivi des **chantiers du jour** après acceptation d'un devis ;
* une section **veille et entretien** (Phase 2) ;
* un **cockpit admin** pour la suspension de comptes.

## Utilisateurs et rôles

| Rôle | Usage principal |
| --- | --- |
| **Patron (owner)** | Clients, devis, équipe, chantiers (plan Pro), tarifs fournisseurs |
| **Opérateur** | Accès limité, prévu pour le planning équipe en Phase 2 |
| **Super admin** | Tableau de bord de suspension/réactivation des comptes artisans |
| **Client final** | Hors application, reçoit le PDF et répond par ses canaux habituels |

## Plans d'abonnement (aperçu)

| Fonctionnalité | Starter / Essai | Pro |
| --- | --- | --- |
| Clients et devis vocal | Oui | Oui |
| Mes Chantiers | Non (upgrade) | Oui |
| Veille et entretien | Non (upgrade) | Oui |
| Tarifs fournisseurs | Non (upgrade) | Oui |

:::note Compte de démonstration Pro
Email : `pro@plomberie.fr` · Mot de passe : `password123`
:::

Un compte Starter peut accepter un devis et créer un chantier en base, mais **n'affiche pas** l'onglet Chantiers sans abonnement Pro.

## Parcours utilisateur synthétique

1. Connexion de l'artisan
2. Sélection ou création d'un client
3. Dictée de l'intervention depuis la fiche client ou l'assistant IA
4. Contrôle du brouillon dans la langue de dictée
5. Validation pour le client, traduction automatique en français
6. Génération du PDF et partage manuel (WhatsApp, Gmail, etc.)
7. Marquage « envoyé » si besoin
8. Décision artisan : accepté ou refusé
9. Si accepté, apparition du chantier dans **Mes Chantiers** (plan Pro)

## Décisions produit validées (France, août 2026)

| Sujet | Décision |
| --- | --- |
| Langue du devis client | Toujours en **français** |
| Contrôle artisan | Relecture d'abord dans la **langue dictée** |
| Canal client principal | **Partage manuel du PDF** (email auto disponible mais désactivé par défaut) |
| Acompte | Paramétrage par l'artisan, mention automatique si seuil dépassé |
| International (ES, GB) | Reporté après stabilisation du marché France |

## Hors périmètre Phase 1

* Facturation et Factur-X
* Lien web Accepter/Refuser pour le client
* Signature électronique
* Relances SMS/WhatsApp automatiques
* Vrais temps de route (Google Maps)
