# Bloggr

#### _- Partie frontend -_

#### Application de création et gestion d'articles de blog

# • • •

## Description

Cette application permet à un utilisateur de créer et gérer ses articles de blog. Le but est de générer une API avec la liste des articles qui pourront être affichés sur un site externe (par exemple un site vitrine).

## Fonctionnalités

- **Connexion et authentification** : L'application n'autorise qu'un seul utilisateur dont les données seront préalablement renseignées dans la base de données par l'administrateur. Possibilité de modifier le mot de passe via l'application.
- **Accueil du dashboard** : Une fois connecté, l'utilisateur aura accès à la page principale affichant la liste des articles sous forme de cartes et pilotant la majorité des actions (Voir, Modifier, Supprimer). L'entièreté du dashboard est protégée par un Auth-Guard et accessible uniquement à l'utilisateur connecté.
- **Création d'un article** : Formulaire de création avec les champs 'Titre', 'Image de couverture', 'Corps de l'article' et 'Mots-clé'. Ce dernier champs sera particulièrement important pour l'optimisation SEO de l'article et son référencement.
- **Modification d'un article** : Formulaire pré-rempli avec les données initiales de l'article. Chaque donnée pouvant être modifiée et mise à jour.
- **Publication controlée** : Un article nouvellement créé a un statut "En attente de publication". Pour être "Publié", l'utilisateur devra le publier manuellement après contrôle. L'API à récupérer sur un site tierce ne concernera que les articles publiés (plus de détails concernant les API dans la partie <a href="https://github.com/Efyx-07/bloggr_backend">backend</a>).
- **Interface** : Entièrement responsive avec une expérience utilisateur et une interface conviviales.

## Technologies utilisées

- **Next.js / React** : Pour la création de l’interface utilisateur.
- **TypeScript** : Pour le typage des données.
- **Zustand** : Pour la gestion des états clients.
- **Tanstack-react-query**: Pour la gestion des états serveurs.
- **TailwindCSS** : Pour le design personnalisé.
- **Vercel-blob** : Pour la gestion des images.
- **Browser-image-compression** : Pour l'optimisation des images.
- **CKEditor** : Pour les champs de textes enrichis (corps de l'article).
- **Date-fns** : Pour le formatage des dates.
- **Iconify** : Bibliothèque d’icônes.
- **Jest / Testing Library** : Pour les tests unitaires et d'intégration.

## Configuration

### Communication avec le backend

La partie frontend détaillée ici communique avec un backend présent sur un autre dépôt (<a href="https://github.com/Efyx-07/bloggr_backend">dépôt du backend</a>). Pour lier le backend au frontend:

1. Créez un fichier `.env` à la racine du projet et l'URL du backend comme suit :
   ```plaintext
   NEXT_PUBLIC_BACKEND_URL=BackendUrl
   ```
2. Assurez-vous que votre fichier `.env` est ignoré par Git. Le fichier .gitignore doit inclure .env pour éviter que la clé ne soit exposée publiquement.

### Utilisation de Vercel Blob

L’application utilise Vercel et son stockage d'images Vercel Blob.

1. Assurez-vous d'avoir un compte créé sur Vercel https://vercel.com/ et selectionnez le stockage Vercel-blob pour lier le projet frontend de l'application. Cela générera une variable d'environnement pour le stockage avec un token à renseigner comme suit:
2. Créez un fichier `.env.development.local` à la racine du projet et ajoutez-y la clé comme suit :
   ```plaintext
   BLOB_READ_WRITE_TOKEN=VercelBlobToken
   ```
3. Assurez-vous que votre fichier `.env` est ignoré par Git. Le fichier .gitignore doit inclure .env pour éviter que la clé ne soit exposée publiquement.
4. Pour optimiser le stockage, une compression d'image est appliquée avec la bibliothèque <a href="https://www.npmjs.com/package/browser-image-compression">Browser-image-compression</a>. Une image non utilisée (dans le cas d'un remplacement ou d'un article supprimé) sera automatiquement effacée.

## Installation

1. Clonez le dépôt:
   ```plaintext
   git clone https://github.com/votre-id-utilisateur/bloggr_frontend.git
   ```
2. Accédez au projet:
   ```plaintext
   cd bloggr_frontend
   ```
3. Installez les dépendances:
   ```plaintext
   npm install
   ```
4. Configurez votre backend et votre dépôt Vercel Blob dans les fichiers `.env` et `.env.development.local` comme décrit dans la section Configuration.
5. Lancez le serveur de développement:
   ```plaintext
   npm run dev
   ```
6. Ouvrez votre navigateur et accédez à http://localhost:3000 (ou [3001](http://localhost:3001) si le backend est executé en local sur le port 3000) pour voir l'application en action.

## Tests

Des tests unitaires ont été écrits pour assurer le bon fonctionnement des fonctionnalités critiques de l’application. Pour les exécuter, utilisez la commande suivante:

```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

## Screenshots

1. Interface: Vue du panneau de connexion "Administrateur".

![Screenshot 1](./screenshots/view1.png)

2. Interface: Accueil du dashboard affichant la liste des articles créés. Accès aux différentes actions possibles.

![Screenshot 2](./screenshots/view2.png)

3. Interface: Formulaire "Créer un article".

![Screenshot 3](./screenshots/view3.png)

4. Interface: Formulaire "Modifier un article".

![Screenshot 4](./screenshots/view4.png)

4. Interface: Exemple de présentation d'un article final (au sein de l'application sert principalement de vue de contrôle avant publication).

![Screenshot 5](./screenshots/view5.png)

## Note

Ce dépôt ne concerne que la partie frontend de l'application. Pour fonctionner celle-ci est indissociable de son backend réalisé en NodeJs / NestJs.
<a href="https://github.com/Efyx-07/bloggr_backend">Accéder au dépôt du backend</a>

**Bonne découverte !**

FX.
