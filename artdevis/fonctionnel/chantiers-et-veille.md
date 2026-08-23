---
sidebar_position: 4
title: Chantiers et veille
description: Planning jour J, navigation par date, report, annulation client, veille MVP et facturation post-chantier.
---

# Chantiers et veille

> **Spec code :** dépôt ArtDevis `docs/USECASE-CHANTIERS-VEILLE.md`

## Mes Chantiers — livré

```
Devis Accepté → agenda → Onglet Mes Chantiers (plan Pro)
        ↓
Navigation par date · GPS · Appel · Statuts · Optimiser · Reporter · Annulation client
        ↓
Chantier Terminé → proposition facturation (acompte / solde)
```

| Fonctionnalité | Détail |
| --- | --- |
| Planification auto | À l'**Accepté** sur la fiche client |
| Planification manuelle | Bouton **Planifier le chantier** si échec auto |
| Navigation | Flèches ← / →, bouton **Aujourd'hui** |
| Report | Date future + motif (pluie, client absent…) |
| Statuts | À faire → En cours → Terminé |
| Annulation client | Fiche client → **Client a annulé** → retrait agenda |
| Facturation | Bottom sheet à la clôture **Terminé** → voir [Factures](./factures) |

:::note Limitation actuelle
Les temps de trajet sont **simulés**, Google Maps n'est pas encore branché.
:::

### Affichage et navigation par date

L'onglet **Mes Chantiers** permet de consulter les chantiers **par jour** (pas uniquement aujourd'hui). Utilisez les flèches ← / → ou **Aujourd'hui** pour changer de date.

### Planification automatique et manuelle

* À l'**acceptation** d'un devis, le cubit historique appelle `planifierChantierDepuisDevis`
* En cas d'échec, le devis reste accepté et un message d'avertissement s'affiche
* Le bouton **Planifier le chantier** sur la fiche client permet une **relance manuelle**

## Veille & Entretien — MVP (août 2026)

Passage d'une coquille statique à un **MVP fonctionnel mock** :

| Zone | Contenu |
| --- | --- |
| Architecture | `VeilleRepository` + `VeilleListCubit` + mock/Supabase |
| Données mock | 2 alertes (entretien M. Bernard, rappel lot PER) |
| Badge onglet | Compteur dynamique d'alertes |
| **Envoyer SMS** | Ouvre l'app SMS avec message pré-rempli |
| **Devis auto** | Navigation fiche client concernée |
| **Voir clients** | Bottom sheet liste clients du lot PER |

**Phase 2 (non livré) :** table `equipements_installes`, calcul d'échéances réel, agent IA entretien, SMS automatisé serveur.

## Plan Pro

| Plan | Chantiers | Veille |
| --- | --- | --- |
| Starter / Essai | Upgrade | Upgrade |
| **Pro** | ✅ | ✅ |

Compte démo : `pro@plomberie.fr` / `password123`

## Démo PO (10 min)

**Chantiers :**

1. Mock + Pro → Mes Chantiers → naviguer entre les jours
2. Reporter un chantier → vérifier le jour cible
3. Terminer un chantier → facturation proposée

**Veille :**

1. Onglet Veille → 2 alertes + footer « 21 autres chantiers OK »
2. **Envoyer SMS** sur l'alerte entretien
3. **Voir clients** sur l'alerte PER

## QA

Campagne : [2026-08-release-r2b](../qa/campagnes/2026-08-release-r2b) — phases **Chantiers**, **Veille**, **Factures**.
