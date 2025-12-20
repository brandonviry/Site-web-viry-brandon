# Site Web Personnel - VIRY Brandon

Site web personnel dynamique pour la gestion de mes projets, publications et articles de blog. Construit avec Next.js 14, TypeScript et Tailwind CSS, intégrant l'API Notion pour la gestion de contenu.

> Ce site web évoluera et changera jusqu'à ce que je sois satisfait.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)](https://tailwindcss.com/)

## Table des matières

- [Description](#description)
- [Démarrage rapide](#démarrage-rapide)
- [Langages de programmation](#langages-de-programmation)
- [Technologies](#technologies)
- [Structure du projet](#structure-du-projet)
- [Arborescence du site web](#arborescence-du-site-web)
- [Fonctionnalités](#fonctionnalités)
- [Configuration](#configuration)
- [Guides](#guides)
- [Déploiement](#déploiement)
- [Licence](#licence)

## Description

Application web moderne combinant :
- **Portfolio dynamique** : Projets synchronisés avec Notion
- **Blog MDX** : Articles avec métadonnées et coloration syntaxique
- **Publications sociales** : Agrégation de posts LinkedIn, Instagram, Twitter, etc.
- **Formulaire de contact** : Stockage dans Notion
- **Interface admin** : Gestion de contenu (en cours)

## Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Notion avec API key

### Installation

1. **Cloner le dépôt**
```bash
git clone <repository-url>
cd Site-web-viry-brandon
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**
```bash
cp .env.example .env
```

Remplir le fichier `.env` avec vos clés :
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID_PROJET=your_project_database_id
NOTION_DATABASE_ID_PUB=your_publications_database_id
NOTION_DATABASE_ID_CONTACT=your_contact_database_id
NOTION_PAGE_ID_HOME=your_home_page_id
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Scripts disponibles

```bash
npm run dev          # Lancer en mode développement
npm run build        # Build de production
npm run start        # Lancer en mode production
npm run lint         # Vérifier le code avec ESLint
```

## Langages de programmation

- **TypeScript** - Langage principal
- **JavaScript** - Logique métier
- **CSS** - Styling (via Tailwind)
- **HTML** - Structure (via JSX/TSX)
- **MDX** - Articles de blog

## Technologies

### Frontend
- **Next.js 14** - Framework React avec App Router
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utility-first

### Gestion de contenu
- **Notion API** - CMS pour projets, publications, contacts
- **MDX** - Markdown enrichi pour les articles
- **Gray Matter** - Parsing de frontmatter
- **Remark GFM** - Support GitHub Flavored Markdown

### UI/UX
- **Shadcn/ui** - Composants UI
- **Framer Motion** - Animations
- **React Icons** - Icônes
- **React Syntax Highlighter** - Coloration syntaxique du code

### Formulaires et validation
- **React Hook Form** - Gestion de formulaires
- **Zod** - Validation de schémas

### Outils de développement
- **ESLint** - Linting
- **Next MDX Remote** - Rendu MDX côté serveur

## Structure du projet

```
Site-web-viry-brandon/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── blog/              # Pages du blog
│   │   │   └── [slug]/        # Article individuel
│   │   ├── publications/      # Page publications
│   │   ├── contact/           # Page contact
│   │   └── admin/             # Interface admin
│   ├── components/            # Composants React réutilisables
│   ├── content/               # Contenu statique
│   │   └── posts/            # Articles MDX
│   ├── layouts/               # Layouts de page
│   ├── lib/                   # Utilitaires et helpers
│   │   └── mdx.ts            # Fonctions MDX
│   ├── utils/                 # Fonctions utilitaires
│   │   └── notionUtils.ts    # Intégration Notion
│   └── data/                  # Données statiques
│       └── metatags.json     # Métadonnées SEO
├── public/                    # Assets statiques
├── .env                       # Variables d'environnement (non versionné)
├── .gitignore                # Fichiers ignorés par Git
├── ARTICLE_GUIDE.md          # Guide de création d'articles
└── README.md                 # Ce fichier
```

## Arborescence du site web

- **Accueil** (`/`) - Page d'accueil avec profil et introduction
- **Portfolio** (`/portfolio`) - Galerie de projets depuis Notion
- **Blog** (`/blog`) - Liste des articles
  - Article 1 (`/blog/[slug]`)
  - Article 2
  - ...
- **Publications** (`/publications`) - Agrégation de posts sociaux
- **Contact** (`/contact`) - Formulaire de contact
- **Admin** (`/admin`) - Interface d'administration

## Fonctionnalités

### Implémenté ✅

- [x] **Portfolio** : Affichage dynamique des projets depuis Notion
  - Grille responsive (1/2/3 colonnes)
  - Images de couverture
  - Liens vers GitHub et sites web
  - Design harmonieux avec hover effects

- [x] **Blog** : Système complet d'articles
  - Articles en MDX avec frontmatter
  - Métadonnées (titre, date, auteur, excerpt, tags)
  - Coloration syntaxique du code
  - Support GitHub Flavored Markdown
  - Tri par date (plus récents en premier)
  - Gradients cohérents basés sur le titre
  - Affichage de 3 tags maximum avec compteur

- [x] **Publications** : Agrégateur de posts sociaux
  - Support multi-plateformes (LinkedIn, Instagram, Twitter, Facebook, YouTube, Medium, Dev.to, GitHub)
  - Détection automatique de la plateforme
  - Nettoyage universel du texte (métadonnées, hashtags)
  - Mise en forme des hashtags et mentions
  - Troncature intelligente du texte
  - Chargement par lots (6 par 6)
  - Extraction de métadonnées (Open Graph)

- [x] **Contact** : Formulaire de contact
  - Validation avec Zod et React Hook Form
  - Stockage dans Notion
  - Design responsive

- [x] **Accueil** : Page d'accueil
  - Lecture des données depuis Notion
  - Profil et bienvenue personnalisés

### En cours de développement 🚧

- [~] **Panneau Admin** : Mise à jour base de données accueil
- [~] **Panneau Admin** : Gestion des bases de données projets
- [~] **Panneau Admin** : Gestion des contacts

### À venir 📋

- [ ] **Panneau Admin** : Création / modification / suppression d'articles
- [ ] **Panneau Admin** : Gestion des publications
- [ ] Optimisation des performances (ISR, cache)
- [ ] Tests unitaires et d'intégration
- [ ] Système de recherche d'articles
- [ ] Système de catégories pour le blog
- [ ] Mode sombre / clair

## Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Notion API
NOTION_API_KEY=secret_xxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID_PROJET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID_PUB=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID_CONTACT=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTION_PAGE_ID_HOME=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Configuration Notion

#### Base de données Projets
Propriétés requises :
- `titre` (Title)
- `description` (Rich Text)
- `Cover ` (Rich Text) - URL de l'image
- `Lien` (Rich Text) - URL du projet

#### Base de données Publications
Propriétés requises :
- `Site` (Title) - Titre de la publication
- `type` (Multi-select) - Type/Catégorie
- `lien` (Rich Text) - URL de la publication

#### Base de données Contact
Propriétés requises :
- `Nom` (Title)
- `Email` (Email)
- `Message` (Rich Text)

#### Page Accueil
Propriétés requises :
- Contenu de présentation en texte riche

## Guides

### Créer un article de blog

Consultez le guide complet : [ARTICLE_GUIDE.md](./ARTICLE_GUIDE.md)

**Résumé rapide :**

1. Créer un fichier `.mdx` dans `src/content/posts/`
2. Ajouter les métadonnées :
```yaml
---
title: "Titre de l'article"
date: "2025-01-20"
author: "VIRY Brandon"
excerpt: "Description courte"
tags: ["Tag1", "Tag2"]
---
```
3. Écrire le contenu en Markdown
4. L'article apparaît automatiquement sur `/blog`

### Ajouter un projet

1. Ouvrir la base de données Notion "Projets"
2. Créer une nouvelle page
3. Remplir les champs :
   - `titre` : Nom du projet
   - `description` : Description détaillée
   - `Cover ` : URL de l'image
   - `Lien` : URL du projet
4. Le projet apparaît automatiquement sur `/portfolio`

### Ajouter une publication

1. Ouvrir la base de données Notion "Publications"
2. Créer une nouvelle page
3. Remplir les champs :
   - `Site` : Titre personnalisé
   - `type` : Catégorie(s)
   - `lien` : URL du post social
4. La publication apparaît automatiquement sur `/publications`

## Déploiement

### Vercel (recommandé)

1. Connecter le dépôt GitHub à Vercel
2. Configurer les variables d'environnement dans Vercel
3. Déployer automatiquement

```bash
# Ou avec la CLI Vercel
npm install -g vercel
vercel
```

### Build manuel

```bash
npm run build
npm run start
```

Le site sera disponible sur `http://localhost:3000`

### Variables d'environnement en production

Ne pas oublier de configurer toutes les variables `NOTION_*` dans l'environnement de production.

## Contribution

Ce projet est personnel, mais les suggestions sont les bienvenues :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amélioration`)
3. Commit les changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amélioration`)
5. Ouvrir une Pull Request

## Licence

Ce projet n'est pas sous licence.

---

**Développé avec ❤️ par VIRY Brandon**

Pour toute question : [Contact](https://site-web-viry-brandon.vercel.app/contact)
