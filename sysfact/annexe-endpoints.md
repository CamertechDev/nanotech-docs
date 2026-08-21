---
sidebar_position: 14
title: Annexe — Résumé des endpoints testés
---

| Méthode | Endpoint | Feature | Test clé |
|---------|----------|---------|----------|
| `POST` | `/facture/factures/{id}/archiver` | Archivage | SC-ARC-01 |
| `POST` | `/facture/factures/{id}/clore` | Archivage | SC-ARC-05 |
| `GET` | `/facture/factures?ArchiveMode=1` | Archivage | SC-ARC-03 |
| `POST` | `/ventes/journaux/generer` | Journal | SC-JRN-01 |
| `POST` | `/ventes/journaux/{id}/exporter` | Journal | SC-JRN-04 |
| `GET` | `/ventes/journaux/factures-eligibles` | Journal | SC-JRN-01 |
| `GET` | `/factures/{id}/analyze` | IA | SC-IA-01 |
| `GET` | `/factures/{id}/risk` | IA | SC-IA-01 |
| `POST` | `/factures/ai/status-suggestions` | IA | SC-IA-06 |
| `GET` | `/factures/ai/rebus-analysis` | IA | SC-IA-04 |
| `GET` | `/clients/{id}/ai/product-suggestions` | IA | SC-IA-04 |
| `GET` | `/ai/sales-summary` | IA | SC-IA-05 |
| `PUT` | `/companies/{id}/settings/ai` | Config | SC-CFG-08 |
| `PUT` | `/companies/{id}/settings/smtp` | Config | SC-CFG-03 |
| `PUT` | `/companies/{id}/settings/formats` | Config | SC-CFG-01 |
| `PUT` | `/companies/{id}/settings/storage` | Config | SC-CFG-06 |
| `PUT` | `/companies/{id}/settings/sage` | Config | SC-CFG-17 |
| `GET` | `/admin/deployment-info` | Config DB | SC-CFG-16 |
| `POST` | `/admin/local-config/database/test` | Config DB | SC-CFG-12 |
| `PUT` | `/admin/local-config/database` | Config DB | SC-CFG-14 |
| `GET` | `/admin/audit/logs` | Audit | SC-AUD-01 |
| `POST` | `/auth/login` (Owner) | Owner | SC-OWN-01 |
| `GET` | `/owner/activation-keys` | Owner | SC-OWN-04 |
| `POST` | `/owner/activation-keys` | Owner | SC-OWN-03 |
| `GET` | `/system-modules` | Owner | — |
| `GET` | `/system-modules/{id}/submodules` | Owner | — |
| `GET` | `/system-menus` | Owner | — |
| `GET` | `/parametres/database/settings` | Backup BD | SC-DB-01 |
| `PUT` | `/parametres/database/settings` | Backup BD | SC-DB-01 |
| `POST` | `/parametres/database/backup` | Backup BD | SC-DB-02 |
| `GET` | `/parametres/database/backups` | Backup BD | SC-DB-04 |
| `POST` | `/parametres/database/restore` | Backup BD | SC-DB-05 |