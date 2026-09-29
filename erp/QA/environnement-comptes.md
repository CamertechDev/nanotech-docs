---
sidebar_position: 3
title: Environnement et comptes
---

# Environnement et comptes QA

## Prérequis techniques

| Élément | Valeur recette |
|---------|----------------|
| API | `http://localhost:5000` — `GET /health` → **200** |
| Swagger | `http://localhost:5000/swagger` |
| Angular | `http://localhost:4200` — URLs avec **hash** `#/…` |
| Base | **PostgreSQL** (seeds SQL au démarrage API). SQL Server seul = pas de jeu démo auto. |
| Mot de passe (tous comptes seed) | `123` |

Après **redémarrage API** ou script seed : **se déconnecter et se reconnecter** (menus chargés au login).

Vérifier les seeds tenancy :

```sql
SELECT "ScriptName", "ExecutedAt"
FROM public."__SeedHistory"
WHERE "ScriptName" LIKE '%Demo%' OR "ScriptName" LIKE '01%'
ORDER BY "ScriptName";
```

Inventaire + forêt démo : scripts **010**, **011**, puis **017**–**022** (exploitation).

---

## Personas QA (logins)

### Chef de bureau — parcours principal

| Login | Profil | Poste | Usage recette |
|-------|--------|-------|----------------|
| **`admin.teste`** | Administrateur | Douala | **Défaut** : inventaire + forêt + référentiel + Propriétaire |
| **`admin.ifo`** | Admin société IFO | Direction IFO | Même périmètre IFO, sans menu Propriétaire |

### Admin site — isolation

| Login | Site | Vérifier |
|-------|------|----------|
| **`admin.dl`** | Douala | Menus admin réduits, données site |
| **`admin.pnr`** | Pointe-Noire | Idem |
| **`admin.mkab`** | Makoua (MKD) | Ne doit **pas** voir les données IFO Ngoko |

### Opérateur — droits limités

| Login | Attendu |
|-------|---------|
| **`oper.pnr`** | Pas de **Sécurité** / **Sociétés** ; peut accéder à **Données références** selon profil |

Détail menus par login : voir doc tenancy `P2-tenancy-seed-qa` (repo GestionBois).

---

## Société et site en UI

1. Se connecter avec le compte choisi.
2. Si un sélecteur **société** apparaît : **IFO** (pas Interholco AG).
3. Pour la forêt inventaire : données **Ngoko / AAC2026** visibles avec `admin.teste` sur site IFO.

---

## Opérateurs **métier** (référentiel, pas login)

Utilisés dans les **feuilles** (listes déroulantes) :

| Code type | Rôle | Exemple seed |
|-----------|------|----------------|
| `POINTFORET` | Pointeur forêt | PT01 Jean Mbemba |
| `ABATTEUR` | Abatteur | (seed abattage) |
| `TRONCFORE` | Tronçonneur | (étêtage / production parc) |
| `CHAUFFEUR` | Chauffeur roulage | CH01 (seed 022) |

Le QA **sélectionne** ces lignes ; il ne se connecte pas avec elles.

---

## Matrice rôle × type de test

| Test | Compte recommandé |
|------|-------------------|
| Inventaire complet EB1–EB5 | `admin.teste` |
| Exploitation EB6–EB11 | `admin.teste` |
| Export états / QR / impression | `admin.teste` |
| Menus masqués | `oper.pnr` |
| Isolation MKD vs IFO | `admin.mkab` vs `admin.teste` |
| API Swagger smoke | `admin.teste` (JWT) |
