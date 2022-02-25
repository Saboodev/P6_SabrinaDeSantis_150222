# HOT TAKES
## Contexte du projet

Piiquante se dédie à la création de sauces épicées dont les recettes sont gardées
secrètes. Pour tirer parti de son succès et générer davantage de buzz, l'entreprise
souhaite créer une application web dans laquelle les utilisateurs peuvent ajouter
leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

## Exigences de sécurité
- Le mot de passe de l'utilisateur doit être haché. Ici, l'email a également été crypté grâce à crypto-js.
- L'authentification doit être renforcée sur toutes les routes sauce requises.
- Les adresses électroniques dans la base de données sont uniques et un
plugin Mongoose approprié est utilisé pour garantir leur unicité et signaler
les erreurs.
- La sécurité de la base de données MongoDB (à partir d'un service tel que
MongoDB Atlas) ne doit pas empêcher l'application de se lancer sur la
machine d'un utilisateur.
- Un plugin Mongoose doit assurer la remontée des erreurs issues de la base
de données.
- Les versions les plus récentes des logiciels sont utilisées avec des correctifs
de sécurité actualisés.
- Le contenu du dossier images ne doit pas être téléchargé sur GitHub.

## Accéder et tester l'application web

Cloner le repository github.
L'installation de [Node.js] est requise.
Dans le terminal, saisir ``cd frontend``, pour accéder au dossier frontend.
```sh
npm install
npm install --save-dev run-script-os
npm run start 
```
Dans le terminal, saisir ``cd backend``, pour accéder au dossier backend. Ensuite lancer le server :
```sh
npm install
npm start
nodemon server
```
Pour des raisons de sécurité le fichier **.env** n'est pas fourni. Il faut donc ajouter un fichier **.env** dans le dossier backend. Se référer au fichier **.env.example** pour connaître les variables d'environnement à compléter.

Le frontend est accessible à l'adresse http://localhost:8081/
Le backend est accessible à l'adresse: http://localhost:3000

Utiliser ``Ctrl+c`` pour arrêter le server local.

## Les routes
- **POST :**
Créer un compte
http://localhost:3000/api/auth/signup

    Se logger
http://localhost:3000/api/auth/login

- **GET :**
Accéder à toutes les sauces
http://localhost:3000/api/sauces

    Accéder à une sauce avec l'id fourni
http://localhost:3000/api/sauces/:id


- **POST :**
Créer une sauce
http://localhost:3000/api/sauces

    Likes et dislikes
http://localhost:3000/api/sauces/:id/like

- **PUT :** 
Modifier une sauce
http://localhost:3000/api/sauces/:id

- **DELETE :**
Supression de sauce
http://localhost:3000/api/sauces/:id