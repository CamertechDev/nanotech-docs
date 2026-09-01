---
sidebar_position: 1
title: Campagne onboarding QA (août 2026)
description: Parcours complet, inscription, clients, équipe, tarifs, R2b, chantiers, veille MVP, factures, logging.
---

# Campagne QA — Onboarding complet (août 2026)

| Champ | Valeur |
| --- | --- |
| **Périmètre** | Inscription, clients, devis vocal, équipe, tarifs, R2b, chantiers, veille MVP, factures (acompte/solde), logging |
| **Release** | MVP août 2026 (R2b + chantiers + veille + factures + AppLogger) |
| **Environnement principal** | Mock (`USE_MOCK=true`), puis prod si indiqué |
| **Durée estimée** | 6 à 8 h (mock) + 1 h 30 (prod optionnel) |
| **Exécuteur** | |
| **Date d'exécution** | |
| **Version testée** | Commit / build : |
| **Résultat global** | Pass / Fail / Pass avec réserves |

:::tip Ordre obligatoire
Exécuter les phases **dans l'ordre**. Guides : [Index guides QA](/artdevis/qa/guides/index-guides-qa) · Remontée bugs : template **Bug QA** GitHub.
:::

| Phase | Thème | Guide |
| --- | --- | --- |
| 1 | Inscription et plans | [Inscription](/artdevis/qa/guides/inscription-et-plans) |
| 2 | Fiche client CRUD | [Clients](/artdevis/qa/guides/fiche-client-crud) |
| 3 | Devis vocal | [Devis vocal](/artdevis/qa/guides/devis-vocal) |
| 4 | Mon équipe | [Équipe](/artdevis/qa/guides/fiche-equipe) |
| 5 | Tarifs fournisseurs | [Tarifs](/artdevis/qa/guides/tarifs-fournisseurs) |
| 6 | Relation client R2b | [Relation client](/artdevis/fonctionnel/relation-client) |
| 7 | Chantiers | [Chantiers](/artdevis/fonctionnel/chantiers-et-veille) |
| 8 | Veille MVP | [Chantiers et veille](/artdevis/fonctionnel/chantiers-et-veille) |
| 9 | Factures | [Factures](/artdevis/fonctionnel/factures) |
| 10 | Logging | [Logging](/artdevis/exploitation/logging-et-diagnostic) |
| 11 | Smoke prod | Optionnel |

## Prérequis généraux

* Application mock : `flutter run -d chrome --dart-define=USE_MOCK=true`
* Email **inédit** pour TC-AUTH-001 (ex. `qa+001@test.fr`)
* Compte **Pro** : `pro@plomberie.fr` / `password123` (phases 4, 5, 7)
* Compte standard : `julien@plomberie.fr` / `password123` (phases 1 à 3, 6)
* Mock : client **Mme Claire Dubois** en tête de liste — devis **Accepté** + chantier du jour (phases 6 et 7)
* Console développeur (F12) pour la phase 8

## Légende

| Colonne | Signification |
| --- | --- |
| **P / F / N / B** | Pass, Fail, N/A, Blocked (noter une seule valeur) |
| **Remarques** | Capture, message d'erreur, lien Issue GitHub `[QA]` |

---

## Phase 1 — Inscription et plans

Guide : [Inscription et plans](/artdevis/qa/guides/inscription-et-plans)

### TC-AUTH-001 — Inscription patron valide

| | |
| --- | --- |
| **Prérequis** | Email jamais utilisé |
| **Étapes** | 1. Connexion → Créer un compte<br/>2. Remplir entreprise, SIRET 14 chiffres, email, mot de passe (6+ car.)<br/>3. Valider |
| **Résultat attendu** | Message succès, retour connexion, compte créé en Essai |
| **P / F / N / B** | |
| **Remarques** | |

### TC-AUTH-002 — SIRET invalide (13 chiffres)

| | |
| --- | --- |
| **Étapes** | 1. Inscription avec SIRET `1234567890123` (13 chiffres)<br/>2. Valider |
| **Résultat attendu** | Erreur validation, inscription bloquée |
| **P / F / N / B** | |
| **Remarques** | |

### TC-AUTH-003 — Consulter comparatif des plans

| | |
| --- | --- |
| **Étapes** | 1. Écran inscription → **Voir les formules…**<br/>2. Lire Base (49 €) et Professionnel (99 €) |
| **Résultat attendu** | Feuille comparatif visible, pas de crash |
| **P / F / N / B** | |
| **Remarques** | Achat simulé uniquement en MVP |

### TC-AUTH-004 — Connexion après inscription

| | |
| --- | --- |
| **Prérequis** | TC-AUTH-001 Pass |
| **Étapes** | 1. Se connecter avec email et mot de passe créés |
| **Résultat attendu** | Accueil onglet Clients |
| **P / F / N / B** | |
| **Remarques** | |

### TC-AUTH-005 — Bannière essai gratuit

| | |
| --- | --- |
| **Étapes** | 1. Après connexion, repérer bannière ou info essai |
| **Résultat attendu** | Indication Essai gratuit ou jours restants |
| **P / F / N / B** | |
| **Remarques** | |

### TC-AUTH-006 — Gate Pro (équipe sans Pro)

| | |
| --- | --- |
| **Prérequis** | Compte Essai ou `julien@plomberie.fr` non Pro |
| **Étapes** | 1. Tenter d'ouvrir Mon équipe (icône 👥) |
| **Résultat attendu** | Feuille upgrade Pro ou message équivalent |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 2 — Fiche client CRUD

Guide : [Fiche client CRUD](/artdevis/qa/guides/fiche-client-crud)

### TC-CLI-001 — Créer client particulier (express)

| | |
| --- | --- |
| **Étapes** | 1. FAB Nouveau client<br/>2. Type Particulier, nom, téléphone, adresse<br/>3. Enregistrer |
| **Résultat attendu** | Client en tête de liste |
| **P / F / N / B** | |
| **Remarques** | Ex. Madonna Dupont |

### TC-CLI-002 — Créer client Pro (SIRET + email)

| | |
| --- | --- |
| **Étapes** | 1. Nouveau client → Type **Pro**<br/>2. Déplier détails : email + SIRET 14 chiffres<br/>3. Enregistrer |
| **Résultat attendu** | Client Pro enregistré, SIRET visible sur fiche |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CLI-003 — Recherche client

| | |
| --- | --- |
| **Étapes** | 1. Saisir nom ou ville dans la recherche |
| **Résultat attendu** | Liste filtrée en temps réel |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CLI-004 — Modifier client

| | |
| --- | --- |
| **Étapes** | 1. Fiche client → crayon<br/>2. Changer téléphone<br/>3. Enregistrer |
| **Résultat attendu** | Modification visible sur fiche et liste |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CLI-005 — Archiver client (actif off)

| | |
| --- | --- |
| **Étapes** | 1. Édition → Client actif désactivé<br/>2. Enregistrer |
| **Résultat attendu** | Client marqué inactif, toujours en base |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CLI-006 — Supprimer client

| | |
| --- | --- |
| **Prérequis** | Client sans enjeu (données test) |
| **Étapes** | 1. Fiche → supprimer → confirmer |
| **Résultat attendu** | Client retiré de la liste |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CLI-007 — Pro sans email (négatif)

| | |
| --- | --- |
| **Étapes** | 1. Créer Pro sans email |
| **Résultat attendu** | Validation refuse l'enregistrement |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 3 — Devis vocal

Guide : [Devis vocal](/artdevis/qa/guides/devis-vocal) · Mode **mock** recommandé.

### TC-VOC-001 — Lancer dictée depuis fiche client

| | |
| --- | --- |
| **Prérequis** | Client créé (phase 2), `USE_MOCK=true` |
| **Étapes** | 1. Fiche client → bouton micro **Devis vocal**<br/>2. Écran enregistrement affiché |
| **Résultat attendu** | Flux démarré, nom client visible, pas de crash |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-002 — Parcours mock jusqu'au brouillon contrôle

| | |
| --- | --- |
| **Étapes** | 1. Terminer la dictée (mock, **après 3 s**)<br/>2. Attendre fin du traitement (~3 s) |
| **Résultat attendu** | Écran contrôle avec lignes de devis, totaux TTC visibles |
| **P / F / N / B** | |
| **Remarques** | Scénario selon le client (TC-VOC-011) |

### TC-VOC-003 — Valider pour le client (traduction FR)

| | |
| --- | --- |
| **Étapes** | 1. **Valider pour le client**<br/>2. Lire l'aperçu français |
| **Résultat attendu** | Lignes en français, bouton continuer vers PDF disponible |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-004 — Modifier une ligne et total TTC

| | |
| --- | --- |
| **Étapes** | 1. Avant validation client : changer un prix unitaire<br/>2. Noter le total TTC |
| **Résultat attendu** | Total recalculé immédiatement |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-005 — Générer PDF (Écran 6)

| | |
| --- | --- |
| **Étapes** | 1. Continuer → génération PDF<br/>2. Attendre fin |
| **Résultat attendu** | Écran PDF prêt, URL ou aperçu, bouton Partager |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-006 — Partager PDF depuis le flux

| | |
| --- | --- |
| **Étapes** | 1. **Partager** → feuille OS<br/>2. Annuler ou partager |
| **Résultat attendu** | Partage proposé, retour possible à Terminer |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-007 — Terminer et vérifier historique

| | |
| --- | --- |
| **Étapes** | 1. **Terminer** → fiche client<br/>2. Vérifier historique devis |
| **Résultat attendu** | Nouveau devis **Brouillon**, montant TTC affiché |
| **P / F / N / B** | |
| **Remarques** | Prérequis phase 6 R2b |

### TC-VOC-008 — Entrée Assistant IA

| | |
| --- | --- |
| **Étapes** | 1. Onglet **Assistant IA**<br/>2. Choisir un client → lancer dictée mock |
| **Résultat attendu** | Même flux que TC-VOC-001 à 007 |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-009 — Terminer inactif avant 3 secondes

| | |
| --- | --- |
| **Prérequis** | `USE_MOCK=true`, écran enregistrement |
| **Étapes** | 1. Démarrer l'enregistrement<br/>2. Observer **Terminer** avant 3 s, puis après |
| **Résultat attendu** | Bouton inactif avant 3 s, actif ensuite |
| **P / F / N / B** | |
| **Remarques** | Anti-clic / anti-poche |

### TC-VOC-010 — Consignes protocole (1ʳᵉ visite + rappel)

| | |
| --- | --- |
| **Étapes** | 1. Premier enregistrement (nouvel appareil ou prefs vides)<br/>2. Lire **Comment dicter un devis** → *J'ai compris*<br/>3. Vérifier le rappel sous le micro |
| **Résultat attendu** | Ouverture **Nouveau devis**, clôture **Génère devis**, rappel à chaque enregistrement |
| **P / F / N / B** | |
| **Remarques** | Carte courte aussi à l'inscription |

### TC-VOC-011 — Mock aligné sur le client

| | |
| --- | --- |
| **Prérequis** | `USE_MOCK=true` |
| **Étapes** | 1. Fiche **Mme Claire Dubois** → dictée mock → siphon / fuite évier<br/>2. Fiche **Mme Sophie Dupont** → dictée mock → chauffe-eau Thermor |
| **Résultat attendu** | Chantier mock = client ouvert ; le nom n'est pas inventé par l'IA |
| **P / F / N / B** | |
| **Remarques** | Luc = mitigeur FR ; SARL = WC pro TVA 20 % |

### TC-VOC-012 — Historique : un seul bloc d'actions ouvert

| | |
| --- | --- |
| **Prérequis** | Client avec ≥ 2 devis (seed + brouillon de TC-VOC-007) |
| **Étapes** | 1. Fiche client, historique<br/>2. Observer les tuiles<br/>3. Déplier un devis plus ancien (bouton pliant) |
| **Résultat attendu** | Le plus récent a Partager PDF visible ; les autres repliés ; cible tactile large |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VOC-013 — Refus protocole (prod uniquement)

| | |
| --- | --- |
| **Prérequis** | `USE_MOCK=false`, Edge Function `devis-vocal` déployée avec contrôle protocole |
| **Étapes** | 1. Dicter sans les 2 phrases (ex. « je veux des bonbons »), ≥ 3 s<br/>2. Attendre le traitement |
| **Résultat attendu** | Message métier (pas NetworkError) : **Nouveau devis** … **Génère devis**. Aucun brouillon |
| **P / F / N / B** | |
| **Remarques** | **N/A en mock** : le mock entoure toujours le protocole |

### TC-VOC-014 — Compléter par la voix (même brouillon)

| | |
| --- | --- |
| **Prérequis** | `USE_MOCK=true` ; brouillon ouvert (après TC-VOC-002 ou **Modifier** depuis l'historique) |
| **Étapes** | 1. Écran 5a : bouton **Compléter par la voix** (sous « Ajouter une ligne manuelle »)<br/>2. Dicter ≥ 3 s → Terminer<br/>3. Attendre le traitement<br/>4. Ouvrir un devis **Accepté** (ex. seed Dubois) |
| **Résultat attendu** | Même `devis.id` ; lignes **cuisine** ajoutées à la suite (mock) ; totaux recalculés ; retour au contrôle (5a). Devis accepté : **pas** de bouton micro |
| **P / F / N / B** | |
| **Remarques** | Annuler pendant l'enregistrement restaure le brouillon sans perte. Prod : 2ᵉ dictée conforme au protocole |

### TC-VOC-015 — Photos chantier (patron, max 2, hors PDF)

| | |
| --- | --- |
| **Prérequis** | `USE_MOCK=true` ; brouillon ouvert (Écran 5a) |
| **Étapes** | 1. Section **Photos du chantier (0/2)** sous la dictée<br/>2. Ajouter 2 photos (galerie ou caméra)<br/>3. Tenter une 3ᵉ<br/>4. Générer le PDF (Écran 6)<br/>5. Ouvrir un devis **Accepté** |
| **Résultat attendu** | 2 miniatures, plein écran au tap ; 3ᵉ refusée ; PDF **sans** photos ; devis accepté : aperçu sans bouton Ajouter |
| **P / F / N / B** | |
| **Remarques** | Pas de photo par ligne. Pas d'upload employé (hors scope). Prod : `supabase db push` + bucket `photos-chantiers` |

---

## Phase 4 — Mon équipe

Guide : [Mon équipe](/artdevis/qa/guides/fiche-equipe) · Compte **Pro** requis.

### TC-EQP-001 — Ouvrir Mon équipe (Pro)

| | |
| --- | --- |
| **Prérequis** | `pro@plomberie.fr` |
| **Étapes** | 1. Icône équipe depuis Clients |
| **Résultat attendu** | Liste équipe, filtres Tous/Actifs/Inactifs |
| **P / F / N / B** | |
| **Remarques** | |

### TC-EQP-002 — Ajouter membre sans invitation

| | |
| --- | --- |
| **Étapes** | 1. FAB → nom, email<br/>2. Décocher invitation email<br/>3. Enregistrer |
| **Résultat attendu** | Membre visible dans la liste |
| **P / F / N / B** | |
| **Remarques** | |

### TC-EQP-003 — Ajouter membre avec invitation

| | |
| --- | --- |
| **Étapes** | 1. FAB → laisser invitation cochée<br/>2. Enregistrer |
| **Résultat attendu** | Membre créé (email envoyé si Edge Function déployée) |
| **P / F / N / B** | |
| **Remarques** | N/A si pas d'email reçu en dev |

### TC-EQP-004 — Filtre Actifs / Inactifs

| | |
| --- | --- |
| **Étapes** | 1. Désactiver un membre<br/>2. Filtrer Inactifs |
| **Résultat attendu** | Membre visible uniquement dans Inactifs |
| **P / F / N / B** | |
| **Remarques** | |

### TC-EQP-005 — Modifier membre

| | |
| --- | --- |
| **Étapes** | 1. Tap carte → ajouter compétences<br/>2. Enregistrer |
| **Résultat attendu** | Puces compétences visibles |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 5 — Tarifs fournisseurs

Guide : [Tarifs fournisseurs](/artdevis/qa/guides/tarifs-fournisseurs) · Compte **Pro** requis.

### TC-TAR-001 — Ouvrir Mes tarifs

| | |
| --- | --- |
| **Prérequis** | Compte Pro |
| **Étapes** | 1. Icône tarifs depuis Clients ou Profil |
| **Résultat attendu** | Liste tarifs (vide ou existante) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-TAR-002 — Ajouter un tarif

| | |
| --- | --- |
| **Étapes** | 1. FAB → choisir produit et fournisseur catalogue<br/>2. Prix public 450, négocié 380<br/>3. Enregistrer |
| **Résultat attendu** | Tarif visible dans la liste |
| **P / F / N / B** | |
| **Remarques** | |

### TC-TAR-003 — Fournisseur favori

| | |
| --- | --- |
| **Étapes** | 1. Marquer favori sur un tarif |
| **Résultat attendu** | Étoile visible, état persisté |
| **P / F / N / B** | |
| **Remarques** | |

### TC-TAR-004 — Prix négocié supérieur au public (négatif)

| | |
| --- | --- |
| **Étapes** | 1. Saisir négocié > public |
| **Résultat attendu** | Validation refuse |
| **P / F / N / B** | |
| **Remarques** | |

### TC-TAR-005 — Supprimer un tarif

| | |
| --- | --- |
| **Étapes** | 1. Supprimer le tarif test |
| **Résultat attendu** | Retiré de la liste |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 6 — Relation client R2b

Référence : [Relation client](/artdevis/fonctionnel/relation-client)

### TC-R2B-001 — Partager PDF depuis l'historique (brouillon)

| | |
| --- | --- |
| **Prérequis** | Client avec au moins un devis en statut **Brouillon** |
| **Étapes** | 1. Ouvrir la fiche client<br/>2. Repérer un devis brouillon dans l'historique<br/>3. Appuyer sur **Partager PDF** |
| **Résultat attendu** | Génération du PDF sans erreur, ouverture de la feuille de partage OS (WhatsApp, Gmail, etc.) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-002 — Partager PDF depuis l'historique (devis accepté)

| | |
| --- | --- |
| **Prérequis** | Client avec un devis **Accepté** |
| **Étapes** | 1. Fiche client → devis accepté<br/>2. Appuyer sur **Partager PDF** |
| **Résultat attendu** | PDF généré et partage proposé, statut du devis inchangé (reste Accepté) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-003 — Marquer envoyé (brouillon uniquement)

| | |
| --- | --- |
| **Prérequis** | Devis en **Brouillon** |
| **Étapes** | 1. Fiche client → devis brouillon<br/>2. Appuyer sur **Marquer envoyé** |
| **Résultat attendu** | Statut passe à **Envoyé**, date affichée (« Envoyé le JJ/MM/AAAA »), bouton Marquer envoyé disparaît ou est désactivé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-004 — Marquer envoyé indisponible (devis déjà envoyé)

| | |
| --- | --- |
| **Prérequis** | Devis déjà **Envoyé** ou **Accepté** |
| **Étapes** | 1. Ouvrir l'historique<br/>2. Vérifier la présence du bouton **Marquer envoyé** |
| **Résultat attendu** | Bouton **absent** ou non cliquable pour les statuts autres que Brouillon |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-005 — Ouvrir un devis accepté (consultation seule)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** |
| **Étapes** | 1. Tap sur la ligne du devis dans l'historique<br/>2. Tenter de modifier une ligne ou un prix |
| **Résultat attendu** | Éditeur en **lecture seule**, totaux visibles, pas de modification possible sans action explicite |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-006 — Ouvrir un devis refusé (consultation seule)

| | |
| --- | --- |
| **Prérequis** | Devis **Refusé** |
| **Étapes** | 1. Tap sur la ligne du devis refusé<br/>2. Vérifier l'absence d'édition libre |
| **Résultat attendu** | Consultation seule, même comportement que TC-R2B-005 |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-007 — Remettre en brouillon (depuis accepté)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté**, ouvert en consultation seule |
| **Étapes** | 1. Appuyer sur **Remettre en brouillon**<br/>2. Confirmer dans la boîte de dialogue<br/>3. Modifier une ligne |
| **Résultat attendu** | Statut repasse **Brouillon**, édition à nouveau possible, total TTC recalculé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-008 — Marquer Accepté puis message planification

| | |
| --- | --- |
| **Prérequis** | Compte **Pro**, devis **Brouillon** ou **Envoyé**, client avec adresse renseignée |
| **Étapes** | 1. Fiche client → **Accepté** sur un devis<br/>2. Observer le retour utilisateur (SnackBar ou message) |
| **Résultat attendu** | Devis passe **Accepté**, pas de crash, planification chantier tentée (succès silencieux ou avertissement explicite si échec) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-009 — Renvoi client (Partager PDF deux fois)

| | |
| --- | --- |
| **Prérequis** | Devis **Envoyé** |
| **Étapes** | 1. **Partager PDF** une première fois (annuler le partage)<br/>2. **Partager PDF** une seconde fois |
| **Résultat attendu** | PDF régénéré à chaque fois, pas d'erreur réseau bloquante, statut inchangé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-010 — Édition libre d'un devis brouillon (régression)

| | |
| --- | --- |
| **Prérequis** | Devis **Brouillon** |
| **Étapes** | 1. Tap sur le devis → éditeur<br/>2. Modifier le prix d'une ligne<br/>3. Revenir à la fiche client |
| **Résultat attendu** | Total TTC mis à jour, statut reste Brouillon |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-011 — Bouton « Client a annulé » (devis accepté uniquement)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** (ex. Mme Dubois en mock) |
| **Étapes** | 1. Fiche client → historique<br/>2. Repérer le bouton **Client a annulé** sur le devis accepté<br/>3. Vérifier un devis **Brouillon** ou **Envoyé** sur un autre client |
| **Résultat attendu** | Bouton **visible** uniquement sur devis **Accepté** ; absent sur les autres statuts |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-012 — Annulation client : devis + retrait chantier

| | |
| --- | --- |
| **Prérequis** | Compte Pro, mock : **Mme Claire Dubois**, devis accepté avec chantier visible aujourd'hui dans Mes Chantiers |
| **Étapes** | 1. Onglet **Mes Chantiers** → noter la présence du chantier Dubois<br/>2. Fiche **Mme Dubois** → **Client a annulé**<br/>3. Choisir motif **Client a annulé** → confirmer<br/>4. Retourner sur **Mes Chantiers** (aujourd'hui) |
| **Résultat attendu** | SnackBar succès « Devis annulé — chantier retiré », statut devis **Annulé**, chantier **absent** de Mes Chantiers |
| **P / F / N / B** | |
| **Remarques** | Prod : migrations `20260834_devis_annulation_client.sql` et RLS `agenda_delete` requises |

### TC-R2B-013 — Devis annulé en consultation seule

| | |
| --- | --- |
| **Prérequis** | TC-R2B-012 Pass (devis **Annulé**) ou devis annulé existant |
| **Étapes** | 1. Tap sur la ligne du devis annulé<br/>2. Tenter de modifier une ligne |
| **Résultat attendu** | Badge **Annulé**, éditeur en **lecture seule**, pas de boutons Accepté / Refusé / Client a annulé |
| **P / F / N / B** | |
| **Remarques** | |

### TC-R2B-014 — Motif « Autre » à l'annulation

| | |
| --- | --- |
| **Prérequis** | Nouveau devis **Accepté** avec chantier (créer via Accepté sur un client test) |
| **Étapes** | 1. **Client a annulé** → motif **Autre**<br/>2. Saisir texte libre (ex. « Travaux reportés par le syndic »)<br/>3. Confirmer |
| **Résultat attendu** | Annulation enregistrée, motif visible dans le SnackBar ou sur la fiche |
| **P / F / N / B** | |
| **Remarques** | Ne pas exécuter sur Dubois si TC-R2B-012 déjà Pass (devis déjà annulé) |

---

## Phase 7 — Chantiers et planification

Référence : [Chantiers et veille](/artdevis/fonctionnel/chantiers-et-veille)

**Compte requis :** `pro@plomberie.fr` / `password123` (plan Pro).

### TC-CHA-001 — Affichage Mes Chantiers (jour J)

| | |
| --- | --- |
| **Prérequis** | Compte Pro, au moins un chantier planifié **aujourd'hui** (voir TC-CHA-002) |
| **Étapes** | 1. Onglet **Mes Chantiers**<br/>2. Lister les cartes affichées |
| **Résultat attendu** | Au moins une carte client visible, horaire et description présents, pas d'écran vide si chantier du jour existe |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-002 — Planification auto à l'acceptation

| | |
| --- | --- |
| **Prérequis** | Compte Pro, nouveau devis ou devis Envoyé |
| **Étapes** | 1. Fiche client → **Accepté**<br/>2. Onglet **Mes Chantiers** |
| **Résultat attendu** | Nouveau chantier visible pour le **jour courant**, lié au client du devis |
| **P / F / N / B** | |
| **Remarques** | En prod, vérifier migrations `agenda` appliquées |

### TC-CHA-003 — Planifier le chantier (bouton manuel)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** sans chantier visible (ex. acceptation avant déploiement module) |
| **Étapes** | 1. Fiche client → devis accepté<br/>2. Appuyer sur **Planifier le chantier**<br/>3. Onglet Mes Chantiers |
| **Résultat attendu** | Message de succès ou absence d'erreur, chantier créé ou retrouvé, visible dans Mes Chantiers (jour J) |
| **P / F / N / B** | |
| **Remarques** | Cas type « Madonna » : devis accepté sans chantier |

### TC-CHA-004 — Planifier le chantier (devis non accepté)

| | |
| --- | --- |
| **Prérequis** | Devis **Brouillon** ou **Envoyé** |
| **Étapes** | 1. Vérifier la présence du bouton **Planifier le chantier** |
| **Résultat attendu** | Bouton **absent** ou action refusée avec message explicite |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-005 — Idempotence (double planification)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** déjà planifié |
| **Étapes** | 1. **Planifier le chantier** une seconde fois<br/>2. Vérifier Mes Chantiers |
| **Résultat attendu** | Pas de doublon, un seul chantier par devis, pas d'erreur bloquante |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-006 — Optimiser la journée

| | |
| --- | --- |
| **Prérequis** | Au moins **2 chantiers** le même jour |
| **Étapes** | 1. Mes Chantiers → **Optimiser la journée**<br/>2. Observer l'ordre des cartes |
| **Résultat attendu** | Réorganisation visible ou message de confirmation, pas de crash |
| **P / F / N / B** | |
| **Remarques** | Trajets simulés, pas de Google Maps |

### TC-CHA-007 — Changer le statut d'un chantier

| | |
| --- | --- |
| **Prérequis** | Chantier du jour affiché |
| **Étapes** | 1. Changer le statut (ex. En cours → Terminé)<br/>2. Vérifier le bottom sheet **Facturer le chantier** (si implémenté)<br/>3. Rafraîchir ou revenir sur l'onglet |
| **Résultat attendu** | Statut persisté ; proposition facturation (acompte/solde) à la clôture |
| **P / F / N / B** | |
| **Remarques** | Voir phase 9 Factures |

### TC-CHA-008 — Compte Starter sans onglet Chantiers

| | |
| --- | --- |
| **Prérequis** | Compte **non Pro** (Starter), si disponible |
| **Étapes** | 1. Se connecter<br/>2. Vérifier la barre de navigation |
| **Résultat attendu** | Onglet Chantiers masqué ou message upgrade, acceptation devis possible mais onglet inaccessible |
| **P / F / N / B** | |
| **Remarques** | N/A si seul compte Pro disponible |

### TC-CHA-009 — Navigation par date (← / →)

| | |
| --- | --- |
| **Prérequis** | Compte Pro, mock avec chantiers sur plusieurs jours (Dubois aujourd'hui + autres seeds) |
| **Étapes** | 1. Mes Chantiers → repérer le sélecteur de date (libellé **Aujourd'hui** ou JJ/MM/AAAA)<br/>2. Appuyer sur **←** puis **→** pour changer de jour |
| **Résultat attendu** | Liste rechargée pour le jour sélectionné, libellé de date mis à jour, pas de crash |
| **P / F / N / B** | |
| **Remarques** | Corrige le bug « liste vide » quand les chantiers ne sont pas datés au jour courant |

### TC-CHA-010 — Retour « Aujourd'hui »

| | |
| --- | --- |
| **Prérequis** | Mes Chantiers affiché sur un jour **autre** qu'aujourd'hui (après TC-CHA-009) |
| **Étapes** | 1. Naviguer vers hier ou demain<br/>2. Appuyer sur **Aujourd'hui** |
| **Résultat attendu** | Retour instantané au jour courant, libellé **Aujourd'hui**, liste du jour affichée |
| **P / F / N / B** | |
| **Remarques** | Bouton visible uniquement hors jour courant |

### TC-CHA-011 — État vide avec indication navigation

| | |
| --- | --- |
| **Prérequis** | Jour sans chantier planifié |
| **Étapes** | 1. Naviguer vers un jour sans chantier<br/>2. Lire le message central |
| **Résultat attendu** | Texte « Aucun chantier planifié … » + mention « Utilisez les flèches ci-dessus pour consulter les autres jours » |
| **P / F / N / B** | |
| **Remarques** | |

### TC-CHA-012 — Reporter un chantier (date + motif)

| | |
| --- | --- |
| **Prérequis** | Chantier **À faire** ou **En cours** (ex. Dubois avant TC-R2B-012, ou autre client) |
| **Étapes** | 1. Mes Chantiers → carte chantier → **Reporter**<br/>2. Choisir **demain** (ou autre date future)<br/>3. Motif **Pluie / intempéries** → confirmer<br/>4. Naviguer vers le jour choisi |
| **Résultat attendu** | Chantier **absent** du jour d'origine, **visible** au jour reporté, motif persisté si affiché sur la carte |
| **P / F / N / B** | |
| **Remarques** | Prod : migration `20260833_agenda_motif_report.sql` |

### TC-CHA-013 — Reporter indisponible (chantier terminé)

| | |
| --- | --- |
| **Prérequis** | Chantier passé au statut **Terminé** (TC-CHA-007) |
| **Étapes** | 1. Ouvrir la carte du chantier terminé<br/>2. Vérifier la présence du bouton **Reporter** |
| **Résultat attendu** | Bouton **Reporter absent** |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 8 — Veille MVP

Référence : [Chantiers et veille](/artdevis/fonctionnel/chantiers-et-veille)

**Prérequis :** compte **Pro**, mock (`USE_MOCK=true`).

### TC-VEI-001 — Affichage des alertes mock

| | |
| --- | --- |
| **Étapes** | 1. Onglet **Veille & Entretien**<br/>2. Lire le sous-titre et les cartes |
| **Résultat attendu** | 2 alertes visibles (entretien M. Bernard + lot PER) + footer « 21 autres chantiers » |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VEI-002 — Badge dynamique onglet

| | |
| --- | --- |
| **Étapes** | 1. Repérer le badge sur l'onglet Veille dans la barre du bas |
| **Résultat attendu** | Badge numérique cohérent avec le nombre d'alertes (ex. 2) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VEI-003 — Envoyer SMS (alerte entretien)

| | |
| --- | --- |
| **Étapes** | 1. Carte entretien → **Envoyer SMS** |
| **Résultat attendu** | Ouverture app SMS / `sms:` avec corps pré-rempli, pas de crash |
| **P / F / N / B** | |
| **Remarques** | Web : comportement navigateur variable |

### TC-VEI-004 — Devis auto → fiche client

| | |
| --- | --- |
| **Étapes** | 1. Carte entretien → **Devis auto** |
| **Résultat attendu** | Navigation vers la fiche du client concerné (M. Bernard / seed mock) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-VEI-005 — Voir clients (alerte PER)

| | |
| --- | --- |
| **Étapes** | 1. Carte lot PER → **Voir clients** |
| **Résultat attendu** | Bottom sheet listant les clients du lot (3 clients mock) |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 9 — Factures (acompte et solde)

Référence : [Factures](/artdevis/fonctionnel/factures)

**Prérequis :** compte **Pro**, mock, client **Mme Claire Dubois** (devis accepté + acompte si seed).

### TC-FAC-001 — Facture acompte (fiche client)

| | |
| --- | --- |
| **Prérequis** | Devis **Accepté** avec demande d'acompte |
| **Étapes** | 1. Fiche client → historique → **Facture acompte (XXX €)** |
| **Résultat attendu** | Snackbar succès ; bouton devient **Partager facture acompte** |
| **P / F / N / B** | |
| **Remarques** | N/A si devis sans acompte |

### TC-FAC-002 — Partager facture acompte

| | |
| --- | --- |
| **Prérequis** | TC-FAC-001 Pass |
| **Étapes** | 1. **Partager facture acompte** |
| **Résultat attendu** | Feuille de partage OS (mock : URL fictive), pas de crash |
| **P / F / N / B** | |
| **Remarques** | |

### TC-FAC-003 — Facture solde refusée (chantier non terminé)

| | |
| --- | --- |
| **Prérequis** | Devis accepté, chantier **non terminé** |
| **Étapes** | 1. Fiche client → **Facture solde** |
| **Résultat attendu** | Message d'erreur explicite (chantier doit être terminé) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-FAC-004 — Facture solde après chantier terminé

| | |
| --- | --- |
| **Prérequis** | Chantier Dubois **Terminé** (TC-CHA-007) |
| **Étapes** | 1. Fiche Dubois → **Facture solde** → **Partager** |
| **Résultat attendu** | Facture générée, montant = TTC − acompte, partage OK |
| **P / F / N / B** | |
| **Remarques** | |

### TC-FAC-005 — Bottom sheet facturation (Mes Chantiers)

| | |
| --- | --- |
| **Prérequis** | Chantier en cours |
| **Étapes** | 1. Mes Chantiers → passer **Terminé**<br/>2. Utiliser le bottom sheet **Facturer le chantier** |
| **Résultat attendu** | Génération acompte et/ou solde + partage PDF depuis la feuille |
| **P / F / N / B** | |
| **Remarques** | |

### TC-FAC-006 — Idempotence facture acompte

| | |
| --- | --- |
| **Prérequis** | Facture acompte déjà générée |
| **Étapes** | 1. Regénérer **Facture acompte** |
| **Résultat attendu** | Pas de doublon ; retour immédiat vers partage |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 10 — Logging et diagnostic (Niveau 1)

Référence : [Logging et diagnostic](/artdevis/exploitation/logging-et-diagnostic)

**Prérequis :** application en **mode debug** (pas release), console visible.

### TC-LOG-001 — Log planification manuelle (info)

| | |
| --- | --- |
| **Prérequis** | Mode debug, compte Pro, devis accepté |
| **Étapes** | 1. Fiche client → **Planifier le chantier**<br/>2. Filtrer la console sur `[ArtDevis]` |
| **Résultat attendu** | Ligne JSON avec `"action":"planifierChantier"` ou `"planifierChantierDepuisDevis"`, `"level":"info"`, contexte `devisId` et `clientId` |
| **P / F / N / B** | |
| **Remarques** | |

### TC-LOG-002 — Log planification auto après Accepté

| | |
| --- | --- |
| **Prérequis** | Mode debug, compte Pro |
| **Étapes** | 1. Marquer un devis **Accepté**<br/>2. Observer la console |
| **Résultat attendu** | Log `"action":"planifierChantierAuto"` en info (succès) ou error/failure (échec avec message) |
| **P / F / N / B** | |
| **Remarques** | |

### TC-LOG-003 — Log échec PDF (Partager PDF)

| | |
| --- | --- |
| **Prérequis** | Mode debug, **prod** recommandé (`USE_MOCK=false`) ou mock |
| **Étapes** | 1. **Partager PDF** depuis l'historique<br/>2. Si succès, noter log info `generatePdf` ; simuler échec si possible (déconnexion réseau) |
| **Résultat attendu** | Succès : `"action":"generatePdf"`, `"level":"info"`. Échec : `"level":"error"` avec `failureType` |
| **P / F / N / B** | |
| **Remarques** | Échec réseau optionnel |

### TC-LOG-004 — Silence en release (contrôle)

| | |
| --- | --- |
| **Prérequis** | Build release ou `kReleaseMode` |
| **Étapes** | 1. Lancer build release web ou APK<br/>2. Répéter une action planification |
| **Résultat attendu** | **Aucune** ligne `[ArtDevis]` dans la console utilisateur |
| **P / F / N / B** | |
| **Remarques** | N/A si QA n'a pas accès build release |

### TC-LOG-005 — Scénario diagnostic Madonna

| | |
| --- | --- |
| **Prérequis** | Client test « Madonna » (ou équivalent) avec devis **Accepté** sans chantier visible |
| **Étapes** | 1. Planifier le chantier manuellement<br/>2. Copier le log JSON complet en cas d'échec<br/>3. Vérifier Mes Chantiers |
| **Résultat attendu** | Succès : chantier du jour visible. Échec : log `ServerFailure` avec message explicite (ex. RLS, table absente) |
| **P / F / N / B** | |
| **Remarques** | Joindre extrait log à l'Issue GitHub si Fail |

### TC-LOG-006 — Log annulation client

| | |
| --- | --- |
| **Prérequis** | Mode debug, compte Pro, devis **Accepté** |
| **Étapes** | 1. **Client a annulé** → confirmer avec un motif<br/>2. Filtrer la console sur `[ArtDevis]` |
| **Résultat attendu** | Ligne JSON `"action":"annulerParClient"`, `"level":"info"`, contexte `devisId` et `clientId` |
| **P / F / N / B** | |
| **Remarques** | |

### TC-LOG-007 — Log génération facture PDF

| | |
| --- | --- |
| **Prérequis** | Mode debug, facture générée (phase 9) |
| **Étapes** | 1. Générer une facture acompte ou solde<br/>2. Filtrer console `[ArtDevis]` |
| **Résultat attendu** | Log `"action":"creerFactureAcompte"` ou `"creerFactureSolde"` / `"generatePdf"`, `"level":"info"` |
| **P / F / N / B** | |
| **Remarques** | |

---

## Phase 11 — Smoke prod (optionnel)

Exécuter sur [artdevis.vercel.app](https://artdevis.vercel.app) après validation mock.

| ID | Cas | P / F / N / B | Remarques |
| --- | --- | --- | --- |
| TC-PROD-01 | Login compte réel | | |
| TC-PROD-02 | Partager PDF historique | | |
| TC-PROD-03 | Accepté → Mes Chantiers (Pro) | | |
| TC-PROD-04 | Navigation date + Reporter chantier (Pro) | | |
| TC-PROD-05 | Client a annulé → retrait agenda | | |
| TC-PROD-06 | Facture solde après chantier terminé (Pro) | | |

---

## Synthèse de campagne

| Phase | Total cas | Pass | Fail | N/A | Blocked |
| --- | --- | --- | --- | --- | --- |
| 1 — Inscription | 6 | | | | |
| 2 — Clients | 7 | | | | |
| 3 — Devis vocal | 8 | | | | |
| 4 — Équipe | 5 | | | | |
| 5 — Tarifs | 5 | | | | |
| 6 — R2b | 14 | | | | |
| 7 — Chantiers | 13 | | | | |
| 8 — Veille | 5 | | | | |
| 9 — Factures | 6 | | | | |
| 10 — Logging | 7 | | | | |
| 11 — Smoke prod | 6 | | | | |
| **Total** | **82** | | | | |

### Bugs ouverts

| ID cas | Issue GitHub (`[QA] …`) | Gravité | Statut |
| --- | --- | --- | --- |
| | | | |

### Commentaire QA

```
[Rédiger ici le compte rendu : blocages, réserves, recommandation go/no-go release]
```

### Validation

| Rôle | Nom | Date | Décision |
| --- | --- | --- | --- |
| QA | | | Go / No-go / Go avec réserves |
| PO | | | Go / No-go / Go avec réserves |

---

:::info Copie dans le dépôt ArtDevis
Ce document est également versionné dans le code source :

`artdevis/docs/qa/campagnes/2026-08-release-r2b.md`
:::
