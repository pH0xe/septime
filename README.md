# Septime (septime)

Outil de gestion du club d'escrime de Moirans

## Version de developpement en ligne
Disponible [ici](https://septime-dev.web.app).

## Installation

> **Note importante: Toutes les commandes cités supposent que le dossier courant soit la racine du projet !**

### Prérequis
* (Optionel) Git
    * Pour cloner le projet
* Node.JS (testé sur la v13.6.0)
    * Pour compiler le projet
* NPM (fourni avec Node.JS)
* Compte Google
    * Pour créer un projet Firebase
* Firebase tools (via NPM: `sudo npm i -g firebase-tools`)
    * Pour envoyer les fonctions vitales à l'application sur Firebase
* (Optionel) Quasar CLI (`sudo npm i -g @quasar/cli`)

### Installation
```bash
# Obtenir les sources
git clone ...
cd septime

# Installer les dépendances, peut échouer selon la version de Node.JS
npm install
# Ou si vous n'envisagez pas d'utiliser le serveur de developpement
npm install --only=prod
```

### Mise en place de Firebase
1. Créer un projet firebase sur https://console.firebase.google.com/
2. Activer le module Authentification
    * Seul la connexion par email/mot de passe est requise (onglet "Mode de connexion")
3. Activer le module Database (Firestore)
4. Activer le module Storage
    * Créer cette hierarchie de dossiers:

```
+-- certificates/       Contient les certificats par l'id de l'utilisateur
|   +-- public_temp/    Dossier temporaire où sont uploader les fichiers avant d'être deplacer
+-- news/               Contient les images des news par l'id de la news
|   +-- public_temp/    Dossier d'upload temporaire
+-- profile_pics/       Contient les images de profil par l'id de l'utilisateur
|   +-- public_temp/    Dossier d'upload temporaire
```

5. Activer le module Hosting (optionel)
    * Necessaire pour publier l'application sur Firebase
6. Activer le module Functions
7. Activer le module Cloud Messaging (FCM)
8. Lier le projet local et le projet Firebase
    1. Copier le fichier `.env.sample` en `.env`
    2. Completer ce fichier avec les informations disponibles dans Paramètres du projet > Paramètres généraux > Vos Applications > (Créer une application si vide) > Firebase SDK Snippet > Configuration.
    3. Génerer une clé VAPID à ajouter au `.env` dans Paramètres du projet > Cloud Messaging > Configuration Web > Certificats Web Push, et génerez une nouvelle paire de clé. La clé publique est a entrer dans le `.env` sous `PUBLIC_VAPID_KEY`.
    4. Copier le fichier `.env` sous `.env.dev` pour n'utiliser qu'un même projet pour le dev et la prod
    5. Editer `.firebaserc` avec le bon nom de projet.
9. Se connecter à firebase avec `firebase login` (necessite `firebase-tools`).
10. Envoyer les règles de securité et cloud functions
    * `firebase deploy --only storage,firestore,functions`

### Premier lancement
1. Lancez un serveur de dev: `npm run dev:pwa`
    * Ou un serveur de production (necessite Quasar CLI)<br>`npm run build:pwa` puis `quasar serve dist/pwa -p 8080 --history`
    * Dans les deux cas, l'application est disponible à http://localhost:8080
2. Créez un compte via l'inscription
3. Trouvez l'ID de cet utilisateur depuis firebase dans le module Authentification
4. Faites de cet utilisateur un administrateur en editant le champ `isAdmin` dans Database > `users` > (ID de l'utilisateur) > `isAdmin` et mettez le à `true`
5. Rafraichissez la page et maintenant l'utilisateur est administrateur

### Publier l'application sur Firebase
1. Compilez l'application pour la production avec `npm run build:pwa`
2. Un navigateur s'ouvre, fermez le et arretez le processus dans la console avec Ctrl+C
3. Deployez l'application avec `firebase deploy --only hosting`
4. L'application est maintenant disponible à l'addresse `<project id>.web.app`

### Lancer le serveur de developpement
```bash
npm run dev:pwa
```

### Corriger les erreurs de style
```bash
npm run lint
```

### Build l'app pour la production
```bash
npm run build:pwa
```

## Structure du projet

Seulement les dossiers/fichiers importants

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
