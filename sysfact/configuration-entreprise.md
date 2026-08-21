---
sidebar_position: 8
title: Configuration Entreprise (CompanySettings)
---

### 7.1 Vue d'ensemble des sections

```mermaid
flowchart LR
    CS(["⚙️ CompanySettings\nEntreprise"])

    CS --> SEC1["📍 Régional\n— Fuseau horaire\n— Format date\n— Format numérique\n— Devise par défaut"]
    CS --> SEC2["📧 SMTP\n— Serveur / Port / SSL\n— Utilisateur / MdP\n— Email expéditeur"]
    CS --> SEC3["💾 Stockage\n— Chemin racine\n— Taille max fichier\n— Extensions autorisées"]
    CS --> SEC4["🏢 Métier\n— Devise défaut\n— Code journal ventes\n— Jour limite\n— Pagination"]
    CS --> SEC5["📊 SAGE\n— Code dossier\n— Encodage fichier\n— Comptes OHADA\n— Mode analytique\n— Mode livraison"]
    CS --> SEC6["🤖 IA\n— Fournisseur\n— Clé API (chiffrée)\n— Modèle\n— Timeout"]
    CS --> SEC7["🗄️ Base de données\n— Provider / Connexion (local)\n— Mode sauvegarde (None/Quotidien/Hebdo/Mensuel)\n— Chemin dossier backup\n— Rétention (jours)"]
```

### 7.2 Cas d'utilisation globaux

```mermaid
flowchart TD
    Admin(["👤 Administrateur"])

    UC1["Configurer les formats régionaux"]
    UC2["Configurer SMTP"]
    UC3["Tester la connexion SMTP"]
    UC4["Configurer le stockage"]
    UC5["Configurer les paramètres métier"]
    UC6["Configurer l'intégration SAGE"]
    UC7["Configurer le fournisseur IA"]
    UC8["Tester la connexion IA"]
    UC9["Configurer la base de données\n(mode local uniquement)"]
    UC10["Tester la connexion DB"]
    UC11["Configurer la sauvegarde\n(chemin · mode · rétention)"]
    UC12["Déclencher un backup manuel"]
    UC13["Restaurer depuis un backup"]

    Admin --> UC1
    Admin --> UC2
    Admin --> UC4
    Admin --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC9
    Admin --> UC11
    Admin --> UC12
    Admin --> UC13

    UC2 -.->|«extend»| UC3
    UC7 -.->|«extend»| UC8
    UC9 -.->|«extend»| UC10

    style UC3 fill:#e8f4fd,stroke:#2196f3
    style UC8 fill:#e8f4fd,stroke:#2196f3
    style UC10 fill:#e8f4fd,stroke:#2196f3
```

### 7.3 Diagramme de séquence — Chargement et mise à jour

```mermaid
sequenceDiagram
    actor A as Administrateur
    participant FE as Frontend (CompanyPage)
    participant API as Backend API
    participant PROV as CompanySettingsProvider
    participant DB as Base de données

    A->>FE: Ouvre l'onglet Paramètres
    FE->>API: GET /companies/{id}/settings
    API->>PROV: GetSettingsAsync(companyId)
    Note right of PROV: Cache mémoire — invalidé\naprès chaque PUT
    PROV->>DB: SELECT * FROM CompanySettings\nWHERE CompanyId = {id}
    DB-->>PROV: CompanySettings (toutes sections)
    PROV-->>API: CompanySettingsDto\n(AiApiKey NON exposé — AiKeyConfigured:bool uniquement)
    API-->>FE: 200 OK + DTO complet
    FE-->>A: Formulaire pré-rempli par section

    A->>FE: Modifie section SMTP + valide
    FE->>API: PUT /companies/{id}/settings/smtp\n{ host, port, username, password, enableSsl, ... }
    API->>DB: UPDATE CompanySettings\nSET SmtpHost=..., SmtpPort=..., SmtpPasswordEncrypted=Base64(pwd)
    API->>PROV: InvalidateCache(companyId)
    DB-->>API: OK
    API-->>FE: 204 No Content
    FE-->>A: ✅ Toast "Configuration SMTP enregistrée"
```

### 7.4 Scénarios de test par section

#### 🌍 Section Formats Régionaux

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-01 ✅ | `PUT /companies/{id}/settings/formats` `{ timeZone: "Africa/Douala", dateFormat: "dd/MM/yyyy", numberFormat: "fr-FR", defaultCurrency: "XAF" }` | HTTP 204 · Affichage des dates et montants mis à jour |
| SC-CFG-02 ❌ | `timeZone: ""` (vide) | HTTP 400 — validation |

#### 📧 Section SMTP

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-03 ✅ | `PUT /companies/{id}/settings/smtp` `{ useCustomSmtp: true, host: "smtp.gmail.com", port: 587, enableSsl: true, ... }` | HTTP 204 · Mot de passe stocké en Base64 |
| SC-CFG-04 ✅ | Modification sans passer le mot de passe (`smtpPasswordClear: null`) | HTTP 204 · Ancien mot de passe **conservé** (pas écrasé) |
| SC-CFG-05 ✅ | `useCustomSmtp: false` | HTTP 204 · Serveur SMTP par défaut utilisé |

#### 💾 Section Stockage

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-06 ✅ | `PUT /companies/{id}/settings/storage` `{ storageRootPath: "C:\\data\\sysfact", maxFileSizeMb: 10, allowedExtensions: ".pdf,.jpg" }` | HTTP 204 |
| SC-CFG-07 ❌ | `maxFileSizeMb: 0` | HTTP 400 |

#### 🤖 Section IA (cf. aussi SC-IA-*)

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-08 ✅ | `PUT /companies/{id}/settings/ai` `{ aiEnabled: true, aiProvider: "claude", aiApiKey: "sk-ant-...", aiTimeoutSeconds: 15 }` | HTTP 204 · `AiKeyConfigured=true` au prochain GET · clé non exposée |
| SC-CFG-09 ✅ | Re-PUT sans `aiApiKey` (null) | HTTP 204 · Ancienne clé conservée |
| SC-CFG-10 ❌ | `aiProvider: "unknown"` | HTTP 400 — `"AiProvider doit être 'claude', 'openai' ou 'gemini'"` |
| SC-CFG-11 ❌ | `aiTimeoutSeconds: 120` | HTTP 400 — hors plage [5, 60] |

#### 🗄️ Section Base de données (mode local uniquement)

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-12 ✅ | `POST /admin/local-config/database/test` `{ dbProvider: "sqlite", connectionString: "Data Source=C:\\data\\test.db" }` | HTTP 200 `{ success: true, message: "Connexion réussie." }` |
| SC-CFG-13 ❌ | Test connexion SQL Server — serveur inexistant | HTTP 408 Timeout ou HTTP 400 avec message d'erreur SQL |
| SC-CFG-14 ✅ | `PUT /admin/local-config/database` `{ dbProvider: "sqlite", connectionString: "Data Source=C:\\data\\prod.db" }` | HTTP 200 `{ restartRequired: true }` · Fichier `sysfact.local.json` créé dans `%ProgramData%\Sysfact\` |
| SC-CFG-15 ✅ | Appel après `DEPLOYMENT_MODE=saas` | HTTP 403 — endpoint désactivé |
| SC-CFG-16 ✅ | `GET /admin/deployment-info` | HTTP 200 `{ deploymentMode: "local", dbProvider: "sqlite", connectionStringMasked: "Data Source=C:\\...db", localConfigExists: false }` |

#### 📊 Section SAGE

| Scénario | Étapes | Résultats attendus |
|----------|--------|-------------------|
| SC-CFG-17 ✅ | `PUT /companies/{id}/settings/sage` `{ sageDossierCode: "ENT001", sageFileEncoding: "ISO-8859-1", sageJvModeAnalytique: "prod", sageLivraisonMode: "download" }` | HTTP 204 |
| SC-CFG-18 ✅ | Export journal SAGE avec les settings configurés | Fichier généré avec l'encodage `ISO-8859-1` et le code dossier `ENT001` |

---