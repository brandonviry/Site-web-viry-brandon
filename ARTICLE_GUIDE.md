# Guide de Création d'Articles - Blog

Ce guide explique comment créer et publier des articles sur le blog de votre site web personnel.

## Table des matières

- [Structure d'un article](#structure-dun-article)
- [Métadonnées obligatoires](#métadonnées-obligatoires)
- [Créer un nouvel article](#créer-un-nouvel-article)
- [Formatage du contenu](#formatage-du-contenu)
- [Composants personnalisés](#composants-personnalisés)
- [Bonnes pratiques](#bonnes-pratiques)

---

## Structure d'un article

Les articles sont écrits en **MDX** (Markdown avec JSX), ce qui permet d'utiliser du Markdown classique ainsi que des composants React personnalisés.

### Emplacement des fichiers

Tous les articles doivent être placés dans le dossier :
```
src/content/posts/
```

### Format du nom de fichier

Le nom du fichier devient automatiquement le slug de l'URL. Utilisez des tirets `-` pour séparer les mots :

```
src/content/posts/Mon-Premier-Article.mdx
→ URL: /blog/Mon-Premier-Article
```

**Conventions de nommage :**
- Utilisez des tirets `-` au lieu d'espaces
- Évitez les caractères spéciaux (accents acceptés)
- Soyez descriptif et concis
- Exemples :
  - ✅ `Guide-d'installation-et-d'utilisation-de-Mojo-sur-Windows.mdx`
  - ✅ `Introduction-a-Next.js-14.mdx`
  - ✅ `Les-meilleures-pratiques-React-2025.mdx`
  - ❌ `article 1.mdx`
  - ❌ `test.mdx`

---

## Métadonnées obligatoires

Chaque article **doit** commencer par un bloc de métadonnées (frontmatter) en YAML, délimité par `---`.

### Template de métadonnées

```yaml
---
title: "Titre de votre article"
date: "YYYY-MM-DD"
author: "VIRY Brandon"
excerpt: "Une brève description de l'article (1-2 phrases)"
tags: ["Tag1", "Tag2", "Tag3"]
---
```

### Détails des champs

| Champ | Obligatoire | Type | Description |
|-------|-------------|------|-------------|
| `title` | ✅ Oui | String | Le titre principal de l'article (affiché sur la carte et en haut de l'article) |
| `date` | ✅ Oui | String | Date de publication au format ISO `YYYY-MM-DD` (ex: `2025-03-14`) |
| `author` | ✅ Oui | String | Nom de l'auteur (généralement "VIRY Brandon") |
| `excerpt` | ✅ Oui | String | Description courte pour la carte de l'article (max 120-150 caractères recommandés) |
| `tags` | ✅ Oui | Array | Liste de mots-clés (maximum 3 affichés sur la carte) |

### Exemple complet

```yaml
---
title: "Introduction complète à TypeScript"
date: "2025-01-15"
author: "VIRY Brandon"
excerpt: "Découvrez TypeScript, ses avantages et comment l'intégrer dans vos projets web modernes"
tags: ["TypeScript", "JavaScript", "Développement Web", "Tutorial", "Débutant"]
---
```

---

## Créer un nouvel article

### Étape 1 : Créer le fichier

1. Naviguez vers `src/content/posts/`
2. Créez un nouveau fichier avec l'extension `.mdx`
3. Nommez-le selon les conventions (ex: `Mon-Nouvel-Article.mdx`)

### Étape 2 : Ajouter les métadonnées

Copiez-collez le template de métadonnées et remplissez tous les champs :

```yaml
---
title: "Mon Nouvel Article"
date: "2025-01-20"
author: "VIRY Brandon"
excerpt: "Une introduction captivante à mon nouvel article sur un sujet passionnant"
tags: ["Web", "Tutorial", "Guide"]
---
```

### Étape 3 : Rédiger le contenu

Après les métadonnées, écrivez votre contenu en Markdown :

```markdown
---
title: "Mon Nouvel Article"
date: "2025-01-20"
author: "VIRY Brandon"
excerpt: "Une introduction captivante"
tags: ["Web", "Tutorial"]
---

# Introduction

Voici le contenu de mon article...

## Section 1

Détails de la première section.

### Sous-section 1.1

Plus de détails...
```

### Étape 4 : Vérifier l'affichage

1. Démarrez le serveur de développement : `npm run dev`
2. Naviguez vers `http://localhost:3000/blog`
3. Votre article devrait apparaître dans la liste
4. Cliquez dessus pour voir le rendu complet

---

## Formatage du contenu

### Markdown de base

#### Titres

```markdown
# Titre H1
## Titre H2
### Titre H3
#### Titre H4
```

#### Texte

```markdown
**Texte en gras**
*Texte en italique*
~~Texte barré~~
`Code inline`
```

#### Listes

```markdown
- Item 1
- Item 2
  - Sous-item 2.1
  - Sous-item 2.2

1. Premier élément
2. Deuxième élément
3. Troisième élément
```

#### Liens et images

```markdown
[Texte du lien](https://example.com)
![Texte alternatif](url-de-l-image.jpg)
```

#### Citations

```markdown
> Ceci est une citation
> qui peut s'étendre sur plusieurs lignes
```

### Blocs de code

#### Code inline

```markdown
Utilisez `const variable = valeur` pour déclarer une constante.
```

#### Blocs de code avec syntaxe highlighting

````markdown
```javascript
function hello() {
  console.log("Hello World!");
}
```

```typescript
interface User {
  name: string;
  age: number;
}
```

```python
def bonjour():
    print("Bonjour!")
```
````

### Tableaux

```markdown
| Colonne 1 | Colonne 2 | Colonne 3 |
|-----------|-----------|-----------|
| Valeur 1  | Valeur 2  | Valeur 3  |
| Valeur 4  | Valeur 5  | Valeur 6  |
```

### Notes et avertissements

```markdown
> **Note:** Ceci est une note importante

> **Attention:** Soyez prudent avec cette commande

> **Astuce:** Utilisez ce raccourci pour gagner du temps
```

---

## Composants personnalisés

Le site utilise MDX, ce qui permet d'inclure des composants React personnalisés dans vos articles.

### Composant Prog (Code)

Pour afficher du code avec le composant personnalisé `<Prog>` :

```jsx
<Prog language="bash">
{`npm install next`}
</Prog>

<Prog language="javascript">
{`const greeting = "Hello World";
console.log(greeting);`}
</Prog>

<Prog language="python">
{`def hello():
    print("Hello World")`}
</Prog>
```

**Langages supportés :** `bash`, `javascript`, `typescript`, `python`, `java`, `c`, `cpp`, `rust`, `go`, etc.

---

## Bonnes pratiques

### 1. Structure de l'article

- Commencez toujours par une introduction claire
- Utilisez des titres hiérarchiques (H2, H3, H4)
- Divisez le contenu en sections logiques
- Terminez par une conclusion ou un résumé

### 2. Métadonnées

- **Title:** Soyez descriptif et précis (50-60 caractères)
- **Excerpt:** Donnez envie de lire (120-150 caractères max)
- **Tags:** Utilisez 3-6 tags pertinents
- **Date:** Respectez le format ISO `YYYY-MM-DD`

### 3. Contenu

- Écrivez des paragraphes courts (3-4 lignes max)
- Utilisez des listes à puces pour la lisibilité
- Incluez des exemples de code pertinents
- Ajoutez des liens vers des ressources externes
- Relisez pour corriger les fautes

### 4. Code

- Toujours spécifier le langage pour la coloration syntaxique
- Commentez le code complexe
- Testez vos exemples de code avant de publier
- Utilisez des exemples concrets et pratiques

### 5. SEO

- Utilisez des titres descriptifs
- Incluez des mots-clés dans les tags
- Rédigez un excerpt attractif
- Structurez bien le contenu (H1, H2, H3...)

---

## Exemple d'article complet

```markdown
---
title: "Guide complet de Git pour débutants"
date: "2025-01-20"
author: "VIRY Brandon"
excerpt: "Apprenez les bases de Git et GitHub pour gérer vos projets de développement efficacement"
tags: ["Git", "GitHub", "Version Control", "Tutorial", "Débutant"]
---

# Guide complet de Git pour débutants

## Introduction

Git est un système de contrôle de version distribué qui permet de suivre les modifications de votre code. Dans ce guide, nous allons explorer les bases de Git.

## Installation

### Sur Windows

<Prog language="bash">
{`winget install Git.Git`}
</Prog>

### Sur Linux

<Prog language="bash">
{`sudo apt install git`}
</Prog>

## Configuration initiale

Configurez votre nom et email :

<Prog language="bash">
{`git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"`}
</Prog>

## Commandes de base

### Créer un nouveau dépôt

<Prog language="bash">
{`git init
git add .
git commit -m "Premier commit"`}
</Prog>

### Les trois états de Git

| État | Description |
|------|-------------|
| **Working Directory** | Fichiers modifiés non trackés |
| **Staging Area** | Fichiers prêts à être commités |
| **Repository** | Fichiers commités dans l'historique |

## Conclusion

Vous connaissez maintenant les bases de Git ! Pratiquez régulièrement pour maîtriser ces commandes.

## Ressources

- [Documentation officielle Git](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
```

---

## Dépannage

### L'article n'apparaît pas

- Vérifiez que le fichier est bien dans `src/content/posts/`
- Vérifiez que l'extension est `.mdx`
- Vérifiez que les métadonnées sont complètes
- Redémarrez le serveur de développement

### Erreur de parsing

- Vérifiez la syntaxe YAML des métadonnées
- Assurez-vous que les `---` sont bien présents
- Vérifiez les guillemets dans les valeurs

### Le code ne s'affiche pas correctement

- Utilisez les triple backticks pour les blocs de code
- Spécifiez toujours le langage
- Pour le composant `<Prog>`, utilisez les accolades `{``}`

---

## Aide et support

Pour toute question ou problème :
- Consultez la [documentation Next.js](https://nextjs.org/docs)
- Consultez la [documentation MDX](https://mdxjs.com/)
- Vérifiez les articles existants dans `src/content/posts/` comme exemples

---

**Bonne rédaction ! 📝**
