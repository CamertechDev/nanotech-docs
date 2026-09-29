---
sidebar_position: 7
title: Checklist et rapport
---

# Checklist et rapport de recette

## Modèle de rapport

Copier ce bloc en fin de session (Confluence, e-mail, ticket).

```markdown
# Recette GestionBois IFO — AAAA-MM-JJ

**Testeur :** …  
**Mode :** Inventaire | Forêt | Référentiel | Tenancy | Mixte  
**API :** up / down — **UI :** up / down  
**Base :** PostgreSQL seed OK / KO  
**Compte principal :** admin.teste  

| # | Scénario ID | Résultat | Preuve (capture / URL / message) |
|---|-------------|----------|----------------------------------|
| 1 | INV-A1 | OK / KO / SKIP | |
| 2 | FOR-A6 | OK / KO / SKIP | |

## Bloquants
- …

## Anomalies non bloquantes
- …

## Hors scope (pas de ticket)
- …

## Suite recommandée
- …
```

### Légende résultats

| Code | Signification |
|------|----------------|
| **OK** | Comportement conforme au scénario |
| **KO** | Écart fonctionnel ou régression |
| **SKIP** | Prérequis absent (API down, seed manquant, droit refusé **attendu**) |

Un **rejet métier attendu** (ex. doublon `Nord`) = **OK**.

---

## Checklist minimale — release inventaire + forêt

### Session 1 — Inventaire lecture (2 h)

- [ ] Login `admin.teste`, menu Inventaire visible
- [ ] INV-A1 … INV-A6 ([Scénarios inventaire](./inventaire-scenarios))
- [ ] INV-B1 unicité situation
- [ ] INV-B5 import GTG sur AAC2025 **ou** SKIP si pas de fichier

### Session 2 — Forêt lecture (2 h)

- [ ] FOR-A6 abattage → FOR-A11 roulage
- [ ] FOR-A11b routage
- [ ] États + export sur **un** module (ex. débusquage)

### Session 3 — Écriture + droits (1 h 30)

- [ ] FOR-B6 ou FOR-B7 une feuille nouvelle
- [ ] Login `oper.pnr` : pas d’accès Sécurité (URL directe bloquée)
- [ ] REF smoke : essences IFO visibles

### Session 4 — API (optionnel, 30 min)

- [ ] `GET /health` 200
- [ ] Login JWT + `GET /api/foret/situations` 200
- [ ] Sans token → 401

---

## Feuille codes — à coller dans les filtres

```
Société     : IFO
UFP         : NGOKO
AAC         : AAC2026  (import : AAC2025)
VMA         : VMA-NG01
Parcelles   : AA01, AA03, AB01
Essences    : SAP, SIP, PAD, OKU, IRO, WEN, AYO, LIM
Login       : admin.teste / 123
```

---

## Escalade

| Situation | Action |
|-----------|--------|
| Menu absent après deploy | Déconnexion / reconnexion ; vérifier `__SeedHistory` |
| Données vides avec bons filtres | Vérifier PostgreSQL + seeds 010–022 |
| 401 API | Token expiré — se reconnecter |
| Écart doc vs écran | Noter **KO** + URL ; doc Docusaurus prioritaire pour QA |
