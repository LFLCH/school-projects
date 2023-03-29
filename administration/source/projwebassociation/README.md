<p align="center">
  <a href="https://github.com/stephaniechallita/WebServer-course" target="blank">
    <img src="assets/logo.png"  width="400" alt="Administration logo" >
</a>
</p>

# Projwebassociation (Administration backend)

Bienvenue sur le back end de notre projet web "administration" d'ESIR2 SI.
Dans celui-ci, vous trouverez une API REST communiquant avec la base de données SQLite afin de pouvoir gérer les informations des ```utilisateurs```, c'est-à-dire les personnes qui sont rattachées à une association, ainsi que ces dites ```associations```.

## Installation

### Prérequis

Avoir une version à jour de <a href="https://nodejs.org/en/download/">NodeJS</a> et de <a href="https://nestjs.com/">NestJS</a><br>

### Préparation

Après avoir cloné ce projet, ne pas oublier d'installer les librairies nécessaires à son bon fonctionnement avec ```npm install```

## Exécution

L'exécution est possible, via <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm">npm</a> avec ```npm run start```. 

Le backend tourne par défaut sur le port ```3000```. Pour tester le backend, il suffit d'utiliser la commande ```curl http://localhost:3000``` ou de taper l'URL directement sur votre navigateur <a href="http://localhost:3000/"> ```http://localhost:3000```</a>.

De plus, une interface Swagger a été mise en place permettant de visualiser les entités ainsi que les requêtes implémentées. L'interface est disponible à l'URL suivante : <a href="http://localhost:3000/api"> ```http://localhost:3000/api```</a>


## Fonctionnalités

### Authentification

L'ensemble des requêtes du projet n'est accessible qu'une fois authentifié. Une authentification est possible avec l'endpoint ```/auth/login``` en entrant l'identifiant et le mot de passe par défaut : ```"username": "1"```, ```"password": "valid_password"```. Une fois le ```token``` récupéré depuis la réponse de la requête précédente, il suffit de le rentrer dans la fenêtre ```Authorize```.<br>
<img src="assets/authentification.png" width="500"><br>
<img src="assets/authorize_login.png" height="30">

### Gestion des utilisateurs - ```/users```

Un ```User``` comporte un ```id```, un nom de famille ```lastname```, un prénom ```firstname```, un âge ```age``` et un mot de passe ```password```.<br>
Un objet de transfert de données (DTO) ```UserWithRole``` a aussi été créé comportant un ```id```, un nom de famille ```lastname```, un prénom ```firstname```, un âge ```age``` ainsi qu'un role ```role```.

Le module ```utilisateurs``` permet de :
- Créer un utilisateur : le mot de passe enregistré est hashé
- Récupérer tous les utilisateurs
- Récupérer un unique utilisateur
- Modifier un utilisateur
- Supprimer un utilisateur : sa suppression entraine également la suppression de tous ses rôles dans les associations où il appartenait.<br>
<img src="assets/users.png" width="500">

### Gestion des associations - ```/associations```

Une ```Association``` comporte un ```id```, une liste d'utilisateurs ```User[]``` ainsi qu'un nom ```name```.<br>
Un objet de transfert de données (DTO) ```AssociationWithRoles``` a aussi été créé comportant un ```id```, une liste d'utilisateurs avec leur rôle associé ```UserWithRole[]``` ainsi qu'un nom ```name```.

Le module ```associations``` permet de :
- Créer une association : sa création entraine également l'ajout des ```roles``` (par défaut ```Membre```) aux adhérents.
- Récupérer toutes les associations
- Récupérer toutes les associations avec les rôles des adhérents : contrairement à la requête précédente, celle-ci retourne une liste d'```AssociationWithRoles```.
- Récupérer une association
- Récupérer une association avec les rôles des adhérents : celle-ci retourne le type ```AssociationWithRoles```.
- Récupérer les membres d'une association
- Récupérer tous les noms des rôles d'une association spécifique
- Récupérer les membres possédant un rôle spécifique au sein de l'association
- Modifier une association
- Supprimer une association : sa suppression entraine également la suppression des ```roles``` des adhérents.<br>
<img src="assets/associations.png" width="500">

### Gestion du compte - ```/account```

Le module ```account``` permet de :
- Changer le mot de passe à l'aide d'un ```access_token```<br>
<img src="assets/account.png" width="500">

### Gestion des rôles - ```/roles```

Un ```Role``` comporte un ```id```, un utilisateur ```User```, une association ```Association``` ainsi qu'un nom ```name```.<br>

Le module ```roles``` permet de :
- Créer un rôle
- Récupérer tous les rôles
- Récupérer les utilisateurs ayant un rôle spécifié
- Récupérer le rôle d'un utilisateur au sein d'une association
- Modifier un rôle
- Supprimer un rôle<br>
<img src="assets/roles.png" width="500">

## Structure
Le projet est organisé selon la logique des endpoint : chaque composant correspond à un endpoint spécifique. 

## Commentaires

### Branches

Ce dépôt contient plusieurs branches, mais seule la branche courante  ```main``` est à prendre en compte, les deux autres ne sont plus maintenues.
- La branche ```main``` contient le projet fonctionnel et opérationnel. 
- La branche ```al``` est une branche qui a été utilisée dans une optique de conteneurisation du projet.
- La branche ```otherVersion``` a permis à @BastienFaisant d'implémenter son propre back end du projet jusqu'à l'étape 8.

### Auteurs
Ce projet a été réalisé en binôme par @LéoFiloche et @BastienFaisant, suivant les <a href="https://github.com/stephaniechallita/WebServer-course">consignes </a> des responsables de l'UE Web du S7.

