---
sidebar_position: 4
title: Référentiel et jeux de données
---

# Référentiel — quoi vérifier, quoi saisir

Le **référentiel** alimente les listes déroulantes des écrans inventaire et forêt. En recette standard, **95 % en lecture** (données seed), **5 % écriture** pédagogique.

## Principe

```text
Seed SQL (001, 010, 012, 013…) → catalogues API → écrans Angular
```

Le QA ne recrée **pas** toute la hiérarchie org à chaque test.

---

## Jeu seed — tableau de repères

### Organisation (tenancy)

| Entité | Codes / noms démo |
|--------|-------------------|
| Groupe | IHC (Interholco), MKD (tests isolation) |
| Société recette forêt | **IFO** |
| Sites IFO | ABT Ngoko, DL Douala, PNR Pointe-Noire, IFOD, TRCM… |

### Essences IFO (8 codes)

| Code | Libellé |
|------|---------|
| SAP | Sapelli |
| SIP | Sipo |
| PAD | Padouk |
| IRO | Iroko |
| WEN | Wenge |
| AYO | Ayous |
| LIM | Limba |
| OKU | Okoume |

**Où vérifier** : Administration → Données références → Essences (ou API `GET /api/referentiel/essences`).

### Inventaire Ngoko (010 + 011)

| Objet | Valeurs |
|-------|---------|
| Situations | Nord, Sud, Est, Ouest, … (9) |
| UFP | **NGOKO** (Nord), SANGHA (Sud, sans AAC) |
| AAC | **AAC2026** (pleine), **AAC2025** (vide, import) |
| VMA | **VMA-NG01** — quotas SAP 120 / SIP 80 / PAD 40 pieds |
| Parcelles AAC2026 | **AA01**, **AA03**, **AB01** (pas AA02) |
| Distances | Société IFO, plages X/Y seedées |

### Référentiel élargi (012) — exploitation

| Domaine | Exemples seed |
|---------|----------------|
| Clients | ASIA01, EURO01, LOC01 |
| Parcs forêt | PFO, PUS, PPN |
| Ports | Pointe-Noire, Douala, Ouesso |
| Équipes / matériel / scies | SKID-01, etc. |
| Opérateurs | PT01, PT02 (`POINTFORET`) |
| Transport | transporteur Ngoko, moyens de transport (022) |

### Natures (ne pas créer en QA)

| Code | Usage |
|------|--------|
| `DECLFORET` | Déclassement forêt |
| `ABATTU`, `BILLE_PRODUIE`, `DEBARDE`, `STOCKPARC`, `ROULEE`, `TOMBEEROUTE` | Chaîne mouvements billes |

---

## Matrice : référentiel → écrans

| Écran / module | Catalogues utilisés |
|----------------|---------------------|
| Situations | (aucun — racine) |
| UFP / AAC | Société, Situation |
| VMA / quotas | Essences |
| Parcelles | AAC (layon / base nord) |
| Import GTG | Essences, qualités, classes |
| Pistage | Essences, qualités, distances X/Y |
| Abattage FOR0002 | Opérateurs `ABATTEUR`, `POINTFORET`, équipes, parcelles |
| Étêtage FOR0003 | `POINTFORET`, `TRONCFORE`, arbres abattus |
| Débusquage FOR0004 | Matériel skidder, tronçonneur |
| Débardage FOR0006 | Pointeur, skidder |
| Production parc FOR0007 | Parc forêt, commis cubeur, tronçonneur |
| Roulage FOR0008 | Chauffeur `CHAUFFEUR`, moyen transport, transporteur |

---

## Recette référentiel (niveaux)

| Niveau | Action | Résultat attendu |
|--------|--------|------------------|
| **A — Smoke API** | Script sweep ou GET listes `/api/referentiel/…` | **200** ; liste vide = OK si non seedé |
| **B — Smoke UI** | 5 écrans Administration références | Grilles avec lignes IFO |
| **C — Écriture** | POST situation doublon `Nord` | **Rejet** unicité = **OK** |

Ne pas lancer de DELETE massif sur le référentiel partagé.

---

## Saisies QA optionnelles (référentiel)

| ID scénario | Action | Données à saisir |
|-------------|--------|------------------|
| REF-01 | Nouvelle situation | `Nord-Test` (éviter doublon `Nord`) |
| REF-02 | Nouvel opérateur test | Type `POINTFORET`, code unique, libellé « QA Test » |
| REF-03 | Vérifier essence inexistante en import | Ligne GTG avec `ESPE_CODE=ZZZ` → erreur lot |

Tout le reste : **consommer le seed**.
