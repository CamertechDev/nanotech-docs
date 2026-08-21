---
sidebar_position: 1
title: Clean Architecture
---

## Principes

Le code Flutter suit une **Clean Architecture feature-first** : chaque domaine métier est isolé en trois couches, avec injection de dépendances via **get_it** et navigation via **go_router**.

| Couche | Responsabilité |
| --- | --- |
| **Domain** | Entités pures, interfaces de repositories, règles métier |
| **Data** | Models, datasources Supabase, implémentations mock et production |
| **Presentation** | Cubits ou Blocs, pages, widgets |

:::info Règle d'or
Aucune page n'appelle Supabase directement. Tout passe par un repository injecté ou un Cubit/Bloc.
:::

## Organisation du dossier `lib/`

```
lib/
├── main.dart                 # Bootstrap Supabase + get_it
├── app.dart                  # SessionCubit global + MaterialApp.router
├── core/
│   ├── config/               # Supabase, email devis, stratégie URL web
│   ├── di/injection.dart     # Enregistrement get_it
│   ├── error/                # Result<T>, AppFailure
│   ├── logging/              # AppLogger (Niveau 1)
│   ├── router/               # go_router + redirection session
│   └── widgets/              # Composants partagés (header, nav, logout)
└── features/
    ├── auth/                 # Session, login, signup
    ├── clients/              # Liste, fiche, historique
    ├── equipe/               # Membres rattachés au patron
    ├── devis/                # Flux vocal, historique, PDF
    ├── chantiers/            # Planning du jour
    ├── veille/               # Coquille Phase 2
    ├── admin/                # Cockpit super-admin
    ├── home/                 # Shell de navigation
    └── profil/               # Paramètres artisan
```

## Gestion d'état

| Feature | Pattern | Raison |
| --- | --- | --- |
| Auth (session) | **Cubit** global | État de connexion partagé |
| Clients, équipe, profil | **Cubit** | Formulaires et listes |
| Devis vocal | **Bloc** (events) | Machine à états complexe (7 événements, 9 états) |
| Chantiers | **Cubit** | Chargement et optimisation du jour |

Le flux vocal enchaîne : Enregistrement → Upload → Transcription → Analyse → Prix → Brouillon contrôle → Brouillon client → PDF. Toute erreur réseau aboutit à un état **NetworkError** avec possibilité de relance, jamais à un chargement infini.

## Bascule mock / production

```bash
flutter run --dart-define=USE_MOCK=true
```

Chaque repository possède une implémentation **Supabase** et une implémentation **Mock** (seeds en dur, latence simulée). Le flag `USE_MOCK` bascule l'injection dans `configureDependencies()`.

## Features migrées et coquilles

| Feature | Statut migration |
| --- | --- |
| auth | Terminée |
| clients | Terminée |
| equipe | Terminée |
| devis | Terminée |
| chantiers | Terminée (repository + cubit) |
| veille | Coquille UI, Phase 2 |
| admin | Coquille, appels Supabase directs restants |

## Règles métier critiques (devis)

* Les totaux HT, TVA et TTC **ne sont jamais stockés** : ils sont recalculés à partir des lignes.
* La TVA est **par ligne** (20 %, 10 % ou 5,5 %).
* L'IA **ne devine jamais** le client : l'artisan le sélectionne avant la dictée.
* Un devis accepté ou refusé est **verrouillé** en lecture seule, avec option « Remettre en brouillon ».

## Tests

| Fichier | Couverture |
| --- | --- |
| `test/widget_test.dart` | Branding écran de connexion |
| `test/features/devis/voice_devis_bloc_test.dart` | Machine à états du flux vocal |
| Tests pages et cubits | Historique client, assistant, disponibilités |

Les abstractions `AudioRecorderWrapper` et `PdfSharer` permettent de tester le Bloc sans plugins natifs.
