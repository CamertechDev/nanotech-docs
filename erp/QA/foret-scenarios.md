---
sidebar_position: 6
title: Scénarios exploitation forêt (EB6–EB11)
---

# Scénarios exploitation forêt EB6–EB11

**Compte** : `admin.teste` / `123`  
**Filtres communs** : UFP **NGOKO** → AAC **AAC2026** → VMA **VMA-NG01**

Menu : **Exploitation forestière** (et **Transport** pour EB11).

## Chaîne des feuilles (même VMA)

```text
Abattage FOR0002 → Étêtage FOR0003 → Débusquage FOR0004 (+ cubage)
→ Débardage FOR0006 → Production parc FOR0007 → Roulage FOR0008
```

---

## Carte des écrans

| ID | Module | Nature | URL hash |
|----|--------|--------|----------|
| FOR-06 | Abattage | FOR0002 | `/#/lumbering/exploitation/slaughter` |
| FOR-07 | Étêtage / tronç. forêt | FOR0003 | `/#/lumbering/exploitation/stretching` |
| FOR-08 | Débusquage | FOR0004 | `/#/lumbering/exploitation/flushing` |
| FOR-08b | Cubage fûts | — | `/#/lumbering/exploitation/flushing/cubage` |
| FOR-09 | Débardage | FOR0006 | `/#/lumbering/exploitation/skidding` |
| FOR-10 | Production parc | FOR0007 | `/#/lumbering/exploitation/park-cutting` |
| FOR-11 | Roulage | FOR0008 | `/#/lumbering/transport/road` |
| FOR-11b | Routage (tombées) | — | `/#/lumbering/transport/routing` |

Alias URL legacy `bush-cutlery` = même écran que étêtage (ne pas maintenir deux entrées menu).

---

## Jeu démo seed (lecture — parcours A)

Valeurs **indicatives** après seeds 017–022 ; vérifier numéros de feuille en grille.

| Module | Seed | À contrôler |
|--------|------|-------------|
| Abattage | 017 | Feuille(s) sur VMA-NG01, arbres abattus, cotes |
| Étêtage | 018 | Arbre n°2 → billes 100-1, 100-2… |
| Débusquage | 019 | Feuille n°1, ligne arbre n°2, skidder |
| Débardage | 020 | Bille débarquée vers parc |
| Production parc | 021 | Bille en stock parc, cubage 4 diamètres |
| Roulage | 022 | Chauffeur CH01, moyen transport, feuille roulage |

---

## Parcours A — UX par module

| ID | Actions | Attendu |
|----|---------|---------|
| **FOR-A6** | Liste abattage : filtres VMA + Rechercher | Grille non vide ; ouvrir fiche ; chip statut |
| **FOR-A7** | Liste étêtage | Toolbar Nouveau / QR / États ; fiche lignes billes |
| **FOR-A8** | Débusquage + cubage | Arbres dispo / lignes ; cubage n° forêt 1 (Huber) |
| **FOR-A9** | Débardage | Billes non débardees → ajout lignes |
| **FOR-A10** | Production parc | Billes débardees dispo ; cubage panneau |
| **FOR-A11** | Roulage | Entête chauffeur + moyen transport ; stock parc dispo |
| **FOR-A11b** | Routage | VMA → liste billes tombées ; ouvrir feuille liée |

**Grille vide** sans VMA/dates : message filtre (normal).

---

## Parcours B — Écriture limitée (chef de bureau)

| ID | Scénario | Étapes | Attendu |
|----|----------|--------|---------|
| **FOR-B6** | Nouvelle feuille abattage | Nouveau → entête → enregistrer | Redirection fiche ; entête figée |
| **FOR-B7** | Ligne étêtage | Sélection arbre abattu + nb billes | Lignes + codes billes générés |
| **FOR-B8** | Cubage | Cubage → cotes → enregistrer | Volume calculé (formule Huber) |
| **FOR-B9** | Supprimer ligne débardage | Confirmation | Ligne retirée ; bille dispo |
| **FOR-B11** | Tombe en route | Ligne roulée → marquer tombée | Nature mouvement tombée |
| **FOR-B11** | Annuler feuille roulage | Annuler (non validée) | Statut annulée |

Ne pas annuler toute la chaîne seed en une seule session.

---

## États (hub) — tous modules

Pour chaque module avec bouton **États** :

1. Sélectionner **VMA-NG01**.
2. Ouvrir dialogue états → parcourir **tous les onglets** (libellés Expert Bois).
3. **Export Excel/CSV** : fichier téléchargé, encodage UTF-8, séparateur `;`.

---

## QR et impression

| Module | Contrôle |
|--------|----------|
| QR liste | Dialogue scan / n° feuille → ouvre fiche |
| QR fiche | Image QR en en-tête après émission |
| Impression | Fenêtre print (autoriser pop-ups) — abattage, débardage, production parc |

Roulage : QR fiche ; impression complète FOR0008 = évolution future.

---

## EB11 — cas particuliers

| UC | Recette |
|----|---------|
| Feuille route | Chauffeur type `CHAUFFEUR`, moyen transport obligatoire |
| Billes tombées | Routage + états onglet tombées |
| Billes ramassées | **États seulement** (pas encore feuille ramassage dédiée) |

---

## Prérequis inventaire

Si les listes d’**arbres** ou **billes** sont vides : revenir [Inventaire](./inventaire-scenarios) (pistage + chaîne seed 010–011) avant de conclure **KO** sur l’exploitation.
