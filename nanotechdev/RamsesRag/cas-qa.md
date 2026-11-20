---
sidebar_position: 9
---

# Cas QA

## Statut : 🟡 Protocoles rédigés — exécution navigateur / Compose / Cloud Run à consigner

Index issu de `docs/USEACSE-ENTREPRISE.MD` et des fichiers `docs/entreprise/USE-CASE-QA-*.md`.
Cette page est la **recette Enterprise**. Elle ne mélange pas la campagne Public.

Le statut `VALIDE` exige l'environnement cible (Compose, VM client ou Cloud Run), pas
seulement un build.

## Prérequis communs

- ApiRag + Enterprise de la version à tester ;
- PostgreSQL de recette (**pas Neon depuis un poste d'agent**) ;
- Ollama ou équivalent pour les cas d'inférence ;
- comptes : Operator, propriétaire Admin, Admin délégué, Membre, Support temporaire ;
- fichiers de recette **sans donnée personnelle** ;
- aucune preuve contenant mot de passe, code d'activation, cookie, prompt ou document client.

## Hors recette (non finalisé)

Cache sémantique, accusé obligatoire des politiques bloquantes, canvas graphique de carte
mentale, persistance des claims `features`, SqlAgent, contexte statique, agents outillés.
Prompts 26 à 31 : hors campagne tant que leur journal n'est pas `TERMINE`.

## Écarts connus (ne pas ouvrir d'anomalie)

| Écart | Comportement actuel |
|---|---|
| URL `/parametres/*` | Spec : une route par onglet. Code : `/parametres` + état interne. |
| Carte mentale | Arbre HTML repliable, pas un graphe. |
| Lot Studio page fermée | La génération s'arrête. Artefacts déjà écrits conservés. |
| Historique chat du vase | `localStorage`, perdu ailleurs. |
| Aperçu LibreOffice | Profil Compose `preview` uniquement, **hors Cloud Run**. |
| Claim `features` | Lu à l'activation, non appliqué aux modules. |
| Documents Organisation | Un Membre ne les liste pas (Bibliothèque ni vase). |

## Ordre de campagne

1. Identité et licence (ID-01, P17-01).
2. Calebasse / vase / sources / chat / Studio (CAL, VAS, SRC, NCH, STD).
3. Import fichiers et pièces jointes (P13, P21, P18).
4. Console Admin (ADM).
5. Écran Support (SUP).
6. Garde-fous GPU.
7. Operator (P20) si la console HTML est dans la release.

Minimum Calebasse/vase : **CAL-03, CAL-06, SRC-01, SRC-06, SRC-07, NCH-01, NCH-02, STD-02,
STD-05, VAS-04**.

Minimum GPU : **GPU-01, GPU-02, GPU-04, GPU-12, GPU-16**.

## Calebasse, vase, Studio

Protocole : `USE-CASE-QA-CALEBASSE-VASE-STUDIO.md`.

| ID | Priorité | Cas | Attendu |
|---|---|---|---|
| CAL-03 | Critique | Nouveau vase | Titre obligatoire → `/notebooks/{id}` ; apparaît dans la liste. |
| CAL-06 | Critique | Isolation | Vase de A invisible chez M. URL → 404. |
| SRC-01 | Critique | Bibliothèque | Document visible → source avec badge de visibilité. |
| SRC-06 | Critique | Retirer | Lien parti ; fichier encore en Bibliothèque. |
| SRC-07 | Critique | Perte de droit | Source absente ; le chat ne s'en sert plus. |
| NCH-01 | Critique | Sans source | Composeur désactivé. |
| NCH-02 | Critique | Source indexée | SSE + cartes de citations. |
| STD-02 | Critique | Rapport | Artefact ouvert dans le détail. |
| STD-05 | Critique | Tableau vide | 200, message « aucune donnée tabulaire », pas d'erreur. |
| VAS-04 | Critique | Supprimer le vase | Documents conservés en Bibliothèque. |

## Import Office et Bibliothèque

Protocole : `USE-CASE-QA-IMPORT-OFFICE.md`.

| ID | Cas | Attendu |
|---|---|---|
| P13-01 / IMP-01 | Format coché | Texte indexé, chunks > 0. |
| P13-02 / IMP-07 | Format retiré | 415, « contactez le support NaNo-IA ». |
| P13-03 | Fichier trop lourd | 413, 20 Mo. |
| P21-02 / IMP-06 | `.doc` / ZIP sans Word | Refus clair, pas de document fantôme. |
| IMP-09 | Admin, Personnel | Membre **ne voit pas**. |
| IMP-10 | Admin, Organisation | Membre **ne voit pas**. |
| IMP-11 | Département | Visible seulement des membres du département. |
| IMP-12 | Embeddings down | 503 lisible. |
| P18-04 | Joint dans un vase | 400, ajouter comme source. |
| P18-05 | Extract sans CSRF | 400. |

## Console Admin (`/parametres`)

Protocole : `USE-CASE-QA-CONSOLE-ADMIN.md`. Rôle `Admin` seulement. Membre et Support :
refus **API**, pas seulement masquage UI.

Surfaces : Utilisateurs, Départements, Sessions, Politiques, Contrat, Analytique.
Service TI : impossible à renommer ou supprimer. Invitations : siège réservé, y compris
codes en attente. Propriétaire : seul à nommer / rétrograder un Admin délégué.

## Support (`/plateforme`)

Protocole : `USE-CASE-QA-ECRAN-SUPPORT.md`. Compte temporaire créé par l'Operator
(durée 1–72 h, défaut 8 h). Ne consomme aucun siège. Pas d'accès aux documents privés.

| Thème | Contrôle |
|---|---|
| Chunking | Support enregistre Recursive / taille ; Admin n'a pas le formulaire (P2-01). |
| Formats | Cases = lecteurs réellement implémentés. |
| Isolation | Tenant d'un autre client → 404. |
| Transparence | Bannière Admin : un accès Support est ouvert. |

## Garde-fous GPU

Protocole : `USE-CASE-QA-GARDE-FOUS-GPU.md`.

Pas de facture au jeton. Un utilisateur trop rapide : **429**. Un PDF trop long : **coupé**.
Un fichier trop lourd : **413**. La ligne de jetons dans le chat est un budget de fenêtre.

| Paramètre | Défaut |
|---|---|
| Appels modèle / minute / utilisateur | 5 |
| Jetons extraits max | 8 000 |
| Fenêtre de contexte | 32 768 |
| Pièce jointe chat | 10 Mo / 24 000 caractères |
| Import RAG | 20 Mo |

## Identité et licence

| ID | Cas | Attendu |
|---|---|---|
| ID-01 | Activation propriétaire | Code bootstrap une fois ; Service TI créé. |
| ID-02 | Login PME sans email | `login_code` + `login_name` + mot de passe. |
| ID-03 | Sièges | Invitation refusée au plafond. |
| ID-05 | JWT | Signature RS256, `tenantId`, `tier`, `seatsMax`, `validUntil`. `features` ignoré. |
| P17-01 | `init` + licence | Code Admin affiché une seule fois. |
| P20-01 | Login Operator | Cookie dédié ; `must_change_password` bloque le reste. |
| P20-05 | Operator ≠ tenant | `/auth/me` Operator → 401. |

## Rapport de campagne

```markdown
### AAAA-MM-JJ — Campagne Enterprise <environnement/version>

- **Statut** : PARTIEL | BLOQUE | TERMINE | VALIDE
- **Protocoles exécutés** : ADM / SUP / GPU / CAL …
- **Cas critiques échoués** : …
- **Écarts connus confirmés** : …
- **Décision QA** : …
```
