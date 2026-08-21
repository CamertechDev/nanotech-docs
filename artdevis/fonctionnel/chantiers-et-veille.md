---
sidebar_position: 4
title: Chantiers et veille
---

## Synthèse

**Mes Chantiers** : lorsqu'un devis est accepté, un créneau apparaît dans le planning du jour, avec optimisation simulée et actions terrain.

**Veille et entretien** : écran de **démonstration statique**, les alertes d'entretien ne sont pas fonctionnelles (Phase 2).

## Mes Chantiers (livré)

```
Devis Accepté (fiche client) → insert agenda → Onglet Mes Chantiers (Pro)
                                      ↓
              Timeline · GPS Waze · Appel · Statut · Optimiser la journée
```

| Zone | Contenu |
| --- | --- |
| Architecture | Clean Architecture complète (`PlanningRepository`, cubit, Supabase + mock) |
| Données | Table `agenda`, migrations RLS, 1 chantier maximum par devis |
| Planning auto | Urgence critique → 08:00, sinon enchaînement après le dernier job |
| Interface | Cartes client, bannières trajet « Agent IA », actions terrain |
| Tests | Planner, cubit, intégration devis accepté |

:::note Limitation actuelle
Les temps de trajet sont **simulés**, Google Maps n'est pas encore branché.
:::

### Affichage

L'onglet **Mes Chantiers** affiche les chantiers **du jour uniquement**. Un chantier planifié pour une autre date n'apparaît pas dans la liste courante.

### Planification automatique et manuelle

* À l'**acceptation** d'un devis, le cubit historique appelle `planifierChantierDepuisDevis`
* En cas d'échec, le devis reste accepté et un message d'avertissement s'affiche
* Le bouton **Planifier le chantier** sur la fiche client permet une **relance manuelle**

### Reste à faire (Chantiers)

| Priorité | Item |
| --- | --- |
| P0 | Validation production E2E (devis réel → agenda → affichage) |
| P1 | Vrais temps de route (Google Maps) + disponibilités artisan |
| P1 | Assignation technicien (équipe) |
| P2 | Multi-jours, drag-and-drop, OR-Tools, RLS patron/opérateur |

## Veille et entretien (coquille)

| Zone | Contenu |
| --- | --- |
| Interface | 2 cartes alerte démo + footer « 21 autres chantiers OK » |
| Données | Seeds statiques, aucune base, aucun calcul |
| Actions | Boutons SMS / Devis auto sans effet |

### Reste à faire (Veille, Phase 2)

| Priorité | Item |
| --- | --- |
| P0 | Atelier PO : types d'alertes (chauffe-eau, PER, garanties…) |
| P1 | Table `equipements_installes` + repository + cubit |
| P2 | Règles d'échéances, SMS, devis entretien auto, badge dynamique |

## Accès par plan

| Plan | Chantiers | Veille |
| --- | --- | --- |
| Starter / Essai | Upgrade requis | Upgrade requis |
| **Pro** | Oui | Oui |

Compte démo Pro : `pro@plomberie.fr` / `password123`

## Démo PO (5 minutes)

**Chantiers :**

1. Mock + compte Pro
2. Mes Chantiers → jobs du jour → Optimiser → changer un statut
3. Client → devis → Accepté → retour Chantiers

**Veille :**

1. Onglet Veille → lire les 2 alertes démo
2. Confirmer que les boutons ne déclenchent rien (comportement attendu)

## Décisions produit suggérées

* Valider le MVP Chantiers comme « planning jour J utilisable » malgré trajets simulés ?
* Prioriser Google Maps avant Veille ?
* Lancer un atelier scope Veille (équipements, fréquence, canaux SMS) ?
* Bloquer la planification auto pour les comptes Starter ?
