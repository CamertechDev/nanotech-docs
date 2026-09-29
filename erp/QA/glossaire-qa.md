---
sidebar_position: 2
title: Glossaire QA (forêt)
---

# Glossaire QA — forêt et inventaire

Définitions **courtes** pour la recette. Pas besoin de tout mémoriser : garder cette page ouverte.

| Terme | En une phrase pour le QA |
|--------|---------------------------|
| **IFO** | Société de démo (Industrie Forestière de Ouesso). Toujours la choisir en recette inventaire/forêt. |
| **Site opération** | Site physique (ex. Douala `DL`, Pointe-Noire `PNR`). Filtre les données et les menus selon le **login**. |
| **Situation** | Zone géographique large (Nord, Sud…) rattachée à une UFP. |
| **UFP** | Unité forestière de production — « la forêt » côté gestion (ex. **NGOKO**). |
| **AAC** | Assiette annuelle de coupe — périmètre + année (ex. **AAC2026** prête, **AAC2025** vide pour import). |
| **VMA / permis / tenant** | Autorisation de coupe sur une AAC (ex. **VMA-NG01**) avec **quotas** par essence. |
| **Parcelle** | Sous-zone dans l’AAC pour le pistage (ex. **AA01**, pas **AA02** en démo). |
| **Pistage / FOR0001** | Saisie ou import des **arbres** inventoriés (n° forêt, essence, coordonnées). |
| **GTG** | Prestataire carto : fichier **CSV/DBF** importé → lot → validation → arbres en base. |
| **Feuille FOR000x** | Document d’exploitation **émis** dans l’app (abattage, étêtage, débusquage…), avec n° et QR. |
| **Bille** | Morceau de tronc après étêtage (codes type **100-1**, **100-2**). |
| **Opérateur (référentiel)** | Personne métier choisie dans une feuille (abatteur, pointeur, chauffeur…) — **pas** le login Windows. |
| **Chef de bureau** | Utilisateur qui émet feuilles, valide lots GTG, consulte **états** — en démo : `admin.teste`. |
| **Nature de mouvement** | Statut d’une bille (abattu, débarde, stock parc, roulée, tombée route…) — **ne pas créer** en QA. |

## Chaîne métier (ordre logique)

```text
Inventaire : Situation → UFP → AAC → VMA → parcelles → (import GTG) → pistage → déclassement → états

Exploitation : Abattage (arbres) → Étêtage (billes) → Débusquage/cubage → Débardage → Production parc → Roulage
```

## Confusion fréquente

| Erreur | Clarification |
|--------|----------------|
| « Tronçonnage forêt » vs « Étêtage » | **Même écran** FOR0003 (`stretching`). Un seul menu : *Etetage / tronç. forêt*. |
| « Tronçonnage parc » | **Production parc** FOR0007 (`park-cutting`), au **parc forêt**, pas en brousse. |
| Login `oper.pnr` vs opérateur `PT01` | Le **login** = droits écran ; **PT01** = ligne dans une liste déroulante de feuille. |
