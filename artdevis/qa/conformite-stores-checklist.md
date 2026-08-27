---
sidebar_position: 6
title: Conformité stores (checklist QA)
description: Cas TC-STORE à exécuter avant soumission App Store et Play Store.
---

Checklist courte **avant soumission** iOS / Android.

Document source : dépôt ArtDevis `docs/qa/conformite-stores-checklist.md`.

---

## Prérequis

- Build **release** pour les cas iOS commerce (TC-STORE-001 à 008)
- Backend prod + Edge Function `supprimer-compte` déployée
- Compte test `julien@plomberie.fr` actif

---

## Abonnements iOS (TC-STORE-001 à 008)

| ID | Cas | Attendu iOS release |
| --- | --- | --- |
| TC-STORE-001 | Inscription | Pas de lien « Voir les formules » |
| TC-STORE-003 | Profil abonnement | Pas de prix €/mois |
| TC-STORE-005 | Tap Mon abonnement | Feuille info sans cartes payantes |
| TC-STORE-006 | Onglet Pro verrouillé | Dialogue support, pas de prix |
| TC-STORE-007 | TrialBanner | Non cliquable |

Sur **Web / Android** : TC-STORE-002, 004, 008 vérifient que prix et simulation upgrade restent visibles.

---

## Inscription (TC-STORE-010 à 012)

| ID | Cas | Attendu |
| --- | --- | --- |
| TC-STORE-010 | SIRET `00000000000000` | Inscription OK |
| TC-STORE-011 | SIRET 3 chiffres | Erreur 14 chiffres |
| TC-STORE-012 | Essai | Pas de paiement CB |

---

## Suppression compte (TC-STORE-020 à 024)

| ID | Cas | Attendu |
| --- | --- | --- |
| TC-STORE-020 | Profil patron | Bouton rouge visible |
| TC-STORE-021 | Super-admin | Bouton absent |
| TC-STORE-023 | Compte jetable prod | Suppression + redirect login |
| TC-STORE-024 | Patron + équipe active | Erreur 409 ; Mon Équipe → ⋮ Retirer de l'équipe, puis réessayer |

---

## Release (TC-STORE-030 à 032)

| ID | Cas | Attendu |
| --- | --- | --- |
| TC-STORE-030 | Login release | Champs vides |
| TC-STORE-032 | Identifiants notes reviewer | Connexion OK |

---

## Notes reviewer (copier-coller)

```
Compte test : julien@plomberie.fr / password123
SIRET inscription test : 00000000000000
Suppression compte : Profil → Supprimer mon compte et mes données
Abonnements : essai gratuit, pas de paiement in-app iOS
```

Voir aussi : [Conformité App Store et Play Store](/artdevis/exploitation/conformite-app-stores).
