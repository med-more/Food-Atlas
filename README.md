# 🍽️ Food Atlas

**Food Atlas** est une application web moderne de gestion et de découverte de recettes culinaires internationales. Explorez des recettes authentiques du monde entier, de la cuisine marocaine aux saveurs asiatiques, en passant par les spécialités européennes et bien plus encore.

## 📋 Table des matières

- [À propos du projet](#à-propos-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Pages et fonctionnalités détaillées](#pages-et-fonctionnalités-détaillées)
- [API et services externes](#api-et-services-externes)
- [Scripts disponibles](#scripts-disponibles)

## 🎯 À propos du projet

Food Atlas est une plateforme complète qui permet aux utilisateurs de :
- Découvrir des recettes culinaires de différents pays
- Filtrer les recettes par pays d'origine
- Consulter les détails complets de chaque recette (ingrédients, étapes de préparation)
- Contacter l'équipe via un formulaire de contact
- Gérer les recettes (ajout, modification, suppression) pour les administrateurs

L'application utilise une architecture moderne avec React pour l'interface utilisateur et JSON Server pour simuler une API REST backend.

## ✨ Fonctionnalités

### Pour les visiteurs
- 🏠 **Page d'accueil** : Présentation du projet avec aperçu des catégories de pays
- 📚 **Catalogue de recettes** : Liste complète de toutes les recettes disponibles
- 🔍 **Filtrage par pays** : Filtrez les recettes selon leur pays d'origine
- 📖 **Détails des recettes** : Consultez les informations complètes (ingrédients, étapes, temps de préparation, difficulté)
- 📧 **Formulaire de contact** : Envoyez des messages à l'équipe via EmailJS

### Pour les administrateurs
- ➕ **Ajout de recettes** : Formulaire complet pour ajouter de nouvelles recettes
- ✏️ **Modification de recettes** : Éditez les recettes existantes via une modal
- 🗑️ **Suppression de recettes** : Supprimez des recettes avec confirmation
- 📊 **Statistiques** : Visualisez le nombre total de recettes, pays et catégories
- 🖼️ **Upload d'images** : Téléchargez des images de recettes sur Cloudinary

## 🛠️ Technologies utilisées

### Frontend
- **React 19.2.0** : Bibliothèque JavaScript pour construire l'interface utilisateur
- **React Router DOM 7.9.6** : Gestion de la navigation et des routes
- **Vite 7.2.4** : Outil de build et serveur de développement rapide
- **Axios 1.13.2** : Client HTTP pour les requêtes API
- **React Hot Toast 2.6.0** : Notifications toast élégantes
- **React Icons 5.5.0** : Bibliothèque d'icônes

### Backend & Services
- **JSON Server 1.0.0-beta.3** : Serveur REST API simulé pour le développement
- **Cloudinary 2.8.0** : Service de gestion et stockage d'images
- **EmailJS 4.4.1** : Service d'envoi d'emails depuis le frontend

### Outils de développement
- **ESLint** : Linter pour maintenir la qualité du code
- **Node.js** : Environnement d'exécution JavaScript

## 📁 Structure du projet

```
Food Atlas/
├── public/                 # Fichiers statiques publics
├── src/
│   ├── assets/            # Images et ressources statiques
│   ├── components/         # Composants réutilisables
│   │   ├── DeleteModal/   # Modal de confirmation de suppression
│   │   ├── EditModal/     # Modal d'édition de recette
│   │   ├── Footer/        # Composant pied de page
│   │   ├── Navbar/        # Composant barre de navigation
│   │   └── RecipeCard/    # Carte d'affichage de recette
│   ├── pages/             # Pages de l'application
│   │   ├── AddRecipe/     # Page d'ajout de recette
│   │   ├── Contact/       # Page de contact
│   │   ├── Home/          # Page d'accueil
│   │   ├── ManageRecipes/ # Page de gestion des recettes
│   │   ├── RecipeDetails/ # Page de détails d'une recette
│   │   └── Recipes/       # Page de liste des recettes
│   ├── App.jsx            # Composant principal et routes
│   ├── App.css            # Styles globaux de l'application
│   ├── main.jsx           # Point d'entrée de l'application
│   ├── index.css          # Styles de base
│   └── recipesApi.js      # Fonctions API pour les recettes
├── db.json                # Base de données JSON Server
├── package.json           # Dépendances et scripts
├── vite.config.js         # Configuration Vite
└── README.md              # Documentation du projet
```

## 🚀 Installation

### Prérequis
- **Node.js** (version 16 ou supérieure)
- **npm** ou **yarn**

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   cd "Food Atlas"
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Créer un fichier `.env` à la racine du projet** (voir section Configuration)

4. **Lancer le serveur JSON Server** (dans un terminal séparé)
   ```bash
   npm run server
   ```
   Le serveur sera accessible sur `http://localhost:3001`

5. **Lancer l'application de développement** (dans un autre terminal)
   ```bash
   npm run dev
   ```
   L'application sera accessible sur `http://localhost:5173` (ou un autre port si 5173 est occupé)

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet avec les variables d'environnement suivantes :

```env
# Configuration Cloudinary (pour l'upload d'images)
VITE_CLOUDINARY_CLOUD_NAME=votre_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=votre_upload_preset

# Configuration EmailJS (pour le formulaire de contact)
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_PUBLIC_KEY=votre_public_key
```

### Comment obtenir ces clés ?

#### Cloudinary
1. Créez un compte sur [Cloudinary](https://cloudinary.com/)
2. Dans le dashboard, récupérez votre **Cloud Name**
3. Allez dans **Settings > Upload** et créez un **Upload Preset** (mode unsigned recommandé pour le développement)

#### EmailJS
1. Créez un compte sur [EmailJS](https://www.emailjs.com/)
2. Créez un **Service** (Gmail, Outlook, etc.) et notez le **Service ID**
3. Créez un **Template** d'email et notez le **Template ID**
4. Dans **Account > General**, récupérez votre **Public Key**

## 📖 Utilisation

### Démarrage de l'application

1. **Terminal 1 - JSON Server** (doit être lancé en premier)
   ```bash
   npm run server
   ```
   ✅ Le serveur API est maintenant actif sur `http://localhost:3001`

2. **Terminal 2 - Application React**
   ```bash
   npm run dev
   ```
   ✅ L'application est maintenant accessible dans votre navigateur

### Navigation dans l'application

- **Accueil** (`/`) : Page de bienvenue avec présentation des catégories
- **Recettes** (`/recettes`) : Liste de toutes les recettes avec filtres par pays
- **Détails d'une recette** (`/recette/:id`) : Affichage complet d'une recette
- **Contact** (`/contact`) : Formulaire de contact
- **Admin - Ajouter** (`/admin/ajouter`) : Formulaire d'ajout de recette
- **Admin - Gestion** (`/admin/gestion`) : Interface de gestion des recettes

## 📄 Pages et fonctionnalités détaillées

### 🏠 Page d'accueil (`Home.jsx`)
- Présentation visuelle du projet
- Section hero avec call-to-action
- Grille de catégories de pays avec descriptions
- Liens vers la page des recettes

**Fonctionnalités :**
- Affichage de 11 catégories de pays (Maroc, Italie, Turquie, Mexique, etc.)
- Animations de fade-in pour les cartes de catégories
- Navigation vers la liste complète des recettes

### 📚 Page des recettes (`Recipes.jsx`)
- Liste complète de toutes les recettes disponibles
- Système de filtrage par pays
- Compteur de recettes affichées
- Affichage en grille responsive

**Fonctionnalités :**
- Chargement des recettes depuis l'API JSON Server
- Filtres dynamiques basés sur les pays disponibles
- État de chargement pendant la récupération des données
- Message si aucune recette n'est trouvée
- Navigation vers les détails de chaque recette

**Comment ça marche :**
1. Au chargement, récupère toutes les recettes via `getAllRecipes()`
2. Extrait la liste unique des pays depuis les recettes
3. Permet de filtrer en cliquant sur un bouton de pays
4. Affiche uniquement les recettes correspondant au filtre sélectionné

### 📖 Page de détails (`RecipeDetails.jsx`)
- Affichage complet d'une recette sélectionnée
- Image hero avec overlay
- Informations clés (temps, portions, difficulté)
- Liste des ingrédients
- Étapes de préparation numérotées

**Fonctionnalités :**
- Récupération de la recette par ID depuis l'API
- Affichage de l'image en grand format
- Badge du pays d'origine
- Cartes d'information avec icônes
- Navigation de retour vers la liste

**Comment ça marche :**
1. Récupère l'ID depuis l'URL (`useParams()`)
2. Charge les détails de la recette via `getRecipeById(id)`
3. Affiche toutes les informations structurées
4. Gère les états de chargement et d'erreur

### ➕ Page d'ajout de recette (`AddRecipe.jsx`)
- Formulaire complet pour créer une nouvelle recette
- Upload d'image avec prévisualisation
- Gestion dynamique des ingrédients et étapes
- Validation des champs

**Fonctionnalités :**
- **Champs requis :**
  - Nom de la recette
  - Pays (sélection depuis une liste)
  - Catégorie
  - Image (upload fichier ou URL)
  - Description
  - Ingrédients (au moins un)
  - Étapes de préparation (au moins une)

- **Fonctionnalités avancées :**
  - Upload d'image vers Cloudinary avec conversion en base64 pour prévisualisation
  - Validation de la taille d'image (max 5MB)
  - Ajout/suppression dynamique d'ingrédients
  - Ajout/suppression dynamique d'étapes
  - Réinitialisation du formulaire
  - Messages de validation en temps réel

**Comment ça marche :**
1. L'utilisateur remplit le formulaire
2. Sélectionne une image (validée et prévisualisée)
3. Ajoute/supprime des ingrédients et étapes dynamiquement
4. À la soumission :
   - Validation de tous les champs
   - Upload de l'image sur Cloudinary (si fichier sélectionné)
   - Envoi des données à l'API via `addRecipe()`
   - Redirection vers la page de gestion
   - Notification de succès/erreur

### ⚙️ Page de gestion (`ManageRecipes.jsx`)
- Interface d'administration complète
- Liste de toutes les recettes avec actions
- Statistiques du catalogue
- Modals d'édition et de suppression

**Fonctionnalités :**
- **Affichage :**
  - Grille de toutes les recettes avec leurs cartes
  - Statistiques (total, pays, catégories)
  - Boutons d'action pour chaque recette

- **Actions disponibles :**
  - **Modifier** : Ouvre une modal d'édition (`EditModal`)
  - **Supprimer** : Ouvre une modal de confirmation (`DeleteModal`)
  - **Actualiser** : Recharge la liste depuis l'API
  - **Ajouter** : Redirige vers la page d'ajout

**Comment ça marche :**
1. Charge toutes les recettes au montage du composant
2. Calcule les statistiques (total, pays uniques, catégories uniques)
3. Affiche chaque recette avec ses boutons d'action
4. Gère l'ouverture/fermeture des modals
5. Rafraîchit la liste après modification/suppression

### 📧 Page de contact (`Contact.jsx`)
- Formulaire de contact avec validation
- Intégration EmailJS pour l'envoi d'emails
- Carte Google Maps intégrée
- Informations de contact

**Fonctionnalités :**
- Validation des champs (nom, email, message)
- Validation de format d'email
- Message minimum de 10 caractères
- Envoi via EmailJS
- Feedback visuel (chargement, succès, erreur)
- Carte Google Maps pour la localisation

**Comment ça marche :**
1. L'utilisateur remplit le formulaire
2. Validation côté client des champs
3. Envoi via EmailJS avec les paramètres configurés
4. Notification de succès/erreur
5. Réinitialisation du formulaire en cas de succès

## 🔌 API et services externes

### JSON Server API

L'application utilise JSON Server qui simule une API REST. Les endpoints disponibles sont :

- `GET /recettes` : Récupère toutes les recettes
- `GET /recettes/:id` : Récupère une recette par ID
- `POST /recettes` : Ajoute une nouvelle recette
- `PUT /recettes/:id` : Met à jour une recette
- `DELETE /recettes/:id` : Supprime une recette

**Fichier de données :** `db.json`

### Fonctions API (`recipesApi.js`)

Le fichier `recipesApi.js` contient toutes les fonctions pour interagir avec l'API :

```javascript
getAllRecipes()      // Récupère toutes les recettes
getRecipeById(id)    // Récupère une recette par ID
addRecipe(recipe)    // Ajoute une nouvelle recette
updateRecipe(id, recipe)  // Met à jour une recette
deleteRecipe(id)     // Supprime une recette
```

### Structure d'une recette

```json
{
  "id": "1",
  "nom": "Nom de la recette",
  "pays": "Maroc",
  "categorie": "Plat principal",
  "image": "URL de l'image",
  "description": "Description de la recette",
  "tempsPreparation": "30 minutes",
  "portions": "4 personnes",
  "difficulte": "Facile",
  "ingredients": ["Ingrédient 1", "Ingrédient 2"],
  "etapes": ["Étape 1", "Étape 2"]
}
```

## 📜 Scripts disponibles

```bash
# Lancer le serveur de développement
npm run dev

# Lancer le serveur JSON Server (API)
npm run server

# Construire l'application pour la production
npm run build

# Prévisualiser la build de production
npm run preview

# Lancer le linter ESLint
npm run lint
```

## 🎨 Composants réutilisables

### `RecipeCard`
Affiche une carte de recette avec image, nom, pays, catégorie et description. Cliquable pour naviguer vers les détails.

### `EditModal`
Modal pour éditer une recette existante. Réutilise la logique du formulaire d'ajout avec pré-remplissage des données.

### `DeleteModal`
Modal de confirmation avant suppression d'une recette. Affiche les informations de la recette et demande confirmation.

### `Navbar`
Barre de navigation principale avec liens vers toutes les pages importantes.

### `Footer`
Pied de page avec informations supplémentaires (optionnel).

## 🔒 Notes importantes

- **JSON Server** doit être lancé avant l'application React pour que les fonctionnalités API fonctionnent
- Les variables d'environnement doivent être configurées pour l'upload d'images et l'envoi d'emails
- Le fichier `db.json` est la base de données. Toutes les modifications sont persistées dans ce fichier
- Pour la production, remplacez JSON Server par une vraie API backend

## 🐛 Dépannage

### L'application ne charge pas les recettes
- Vérifiez que JSON Server est lancé sur le port 3001
- Vérifiez que le fichier `db.json` existe et contient des données
- Vérifiez la console du navigateur pour les erreurs

### L'upload d'image ne fonctionne pas
- Vérifiez que les variables Cloudinary sont correctement configurées dans `.env`
- Vérifiez que votre Upload Preset est en mode "unsigned" ou que vous avez les bonnes permissions

### Le formulaire de contact ne fonctionne pas
- Vérifiez que les variables EmailJS sont correctement configurées
- Vérifiez que votre template EmailJS est correctement configuré
- Vérifiez la console pour les erreurs EmailJS

## 📝 Licence

Ce projet est un projet éducatif/démonstratif.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

**Food Atlas** - Découvrez le monde à travers la cuisine ! 🌍🍴
