# Site public (vitrine)

## Statut : ✅ Confirmé (ANALYSE.MD, ARCHITECTURE.md, dossier `src/`)

## Objectif

Le site public sert à **informer et attirer les patients**. Il est accessible sans compte
et constitue la porte d'entrée vers le portail patient. Il tourne sur l'application legacy
`src/` (React 17 + CRA, port 30005) adossée à l'API `api/` (MongoDB, port 5001) —
voir `Frontend/vitrine.md`.

## Menu public (visiteur)

✅ Confirmé (ANALYSE.MD §1) :

| Entrée | Rôle |
|---|---|
| Home (Accueil) | Hero, présentation du cabinet |
| About (À propos) | Équipe, valeurs, cabinet |
| Dental Services | Catalogue des soins proposés |
| Reviews / Testimonials | Avis patients |
| Blog | Contenu éditorial (hygiène dentaire, actualités) |
| Contact | Coordonnées, formulaire, localisation |
| Login / Sign In | Accès au portail patient |
| **Book Appointment** ⭐ | Prise de rendez-vous — à mettre plus en évidence que le Blog |

## Prise de rendez-vous en ligne

✅ Confirmé (ARCHITECTURE.md) : wizard en **3 étapes** —

```
1. Choix du médecin → 2. Choix du créneau → 3. Confirmation
```

Le rendez-vous créé démarre au statut `PENDING` (voir `Business/business-rules.md`) et sera
confirmé par la réceptionniste depuis le portail staff.

## Fonctions du visiteur connecté (vitrine legacy)

✅ Confirmé (ARCHITECTURE.md §src/) :

- Inscription / connexion patient
- Mes rendez-vous avec suivi des statuts `PENDING / CONFIRMED / CANCELLED`
- i18n **FR/EN** complet

## Limite de la vitrine

Le site public ne donne accès qu'au rendez-vous. Toutes les fonctions de suivi (historique
des visites, ordonnances, factures, documents, messagerie) relèvent du **portail patient**
(voir `patient-portal.md`), qui est la cible de la nouvelle plateforme `client/`.
La vitrine legacy ne doit plus être enrichie (🟡 décision ARCHITECTURE.md "Ce qu'on NE
touche plus").
