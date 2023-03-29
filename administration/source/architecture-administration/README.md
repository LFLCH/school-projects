<h1>Version multiservices du projet architecture WEB</h1>

## Motivations
<p>L'objectif est ici d'appliquer les connaissances acquises en cours d'architecture logicielle à notre projet de programmation web</p>

## Exécution du projet

Le projet contient 2 docker-compose. Le premier est en mode de production et appelle donc les images de notre projet depuis le dockerhub. Quant au deuxième docker-compose, il correspond au mode de développement en faisant appel au différents Dockerfile des services de notre projet.

### Mode de développement

Certains détails n'ont pas été résolus pour pouvoir exécuter le projet en mode développement à l'aide d'une seule commande.<br>
En effet, nous devons, d'abord installer les dépendances du backend. L'origine de ce problème n'a pas été trouvée malgré que notre Dockerfile a été configuré pour installer les dépendances.
Pour cela il faut suivre ces étapes :
```Docker
# Se rendre au repertoire concerné  
cd projwebassociation/

# Installation des dépendances
npm install
```
Ensuite, les dépendances de Quarkus doivent aussi être installées à l'aide de la commande suivante :
```Docker
# Se rendre au repertoire concerné  
cd quarkus-app/

# Installation des dépendances
./mvnw package
```

Une fois ces prérequis effectués, nous pouvons exécuter le fichier 'docker-compose.dev.yml' :
```Docker
docker-compose -f docker-compose.dev.yml up -d
```

Le frontend est disponible à l'URL suivante : <a href="http://localhost:80">```http://localhost:80```</a>
Connectez vous en tant qu'utilisateur avec l'id ```1``` et le mot de passe ```valid_password```

L'interface du backend (Swagger UI) est disponible à l'URL suivante : <a href="http://localhost:3000/api">```http://localhost:3000/api```</a>

Le client SMTP MailDev est disponible à l'URL suivante : <a href="http://localhost:1080">```http://localhost:1080```</a>
Vous verrez apparaître un email à chaque fois que vous créez une association, contenant des utilisateurs.

### Mode de production
Il suffit d'exécuter directement le fichier 'docker-compose.yml' :
```Docker
docker-compose up -d
```
Le frontend est disponible à l'URL suivante : <a href="http://localhost">```http://localhost```</a>
Connectez vous en tant qu'utilisateur avec l'id ```1``` et le mot de passe ```valid_password```

L'interface du backend (Swagger UI) est disponible à l'URL suivante : <a href="http://localhost/api">```http://localhost/api```</a>

Le client SMTP MailDev est disponible à l'URL suivante : <a href="http://localhost/maildev">```http://localhost/maildev```</a>
Vous verrez apparaître un email à chaque fois que vous créez une association, contenant des utilisateurs.
