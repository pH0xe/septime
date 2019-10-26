# Septime (septime)

Outil de gestion de club d'escrime

## Installation

### Prérequis
* Git
* Node.JS
* (Optional) Quasar CLI (`sudo npm i -g @quasar/cli`)

### Installation
```bash
git clone ...
cd septime
npm install
```

### Serveur de dev
```bash
npm run dev
```

### Corriger les erreurs de style
```bash
npm run lint
```

### Build l'app pour la production
```bash
npm run build
# or
npm run build:pwa
```

## Structure du projet

Seulement les trucs importants

```
.
+-- .gitignore          Liste des fichiers et dossier ignorés par git
+-- package.json        Présent dans tous les dossier JS, info sur le projet, les deps, des scripts
+-- package-lock.json   Permet a tout le monde d'avoir d'installer les même version des deps
+-- quasar.config.js    Config spécifique a Quasar
+-- babel.config.js     Config de babel (transpileur), ajouter les plugin babel ici
+-- .eslintrc.js        Config d'ESLint (linter) qui corrige votre syntaxe moche
+-- .editorconfig       Config pour des fichiers uniforme selon les editeurs
+-- src/
|   +-- assets/         Assets dynamiques process par webpack <-- A préferrer 
|   +-- statics/        Assets pures (aucun traitement)
|   +-- boot/           Initialisations a faire avant la création de Vue
|   +-- router/         Config du router
|   +-- layouts/        Mises en pages globales (dans lesquels sont inclu le contenu des pages)
|   +-- pages/          Contenu de chaque page
|   +-- components/     Composants réutilisables
|   +-- css/            Config du thème et styles globaux
+-- src-pwa/            Fichiers spécifiques aux PWA (service worker)
```
