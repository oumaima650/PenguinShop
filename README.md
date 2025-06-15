#  PenguinShop — Environnement de Développement Web Collaboratif avec Docker

##  Description du projet

**PenguinShop** est un projet académique réalisé dans le cadre du module **Systèmes d’exploitation** à l’ENSA de Tétouan (1ère année Génie Informatique, 2024-2025). L’objectif principal est de concevoir un **environnement de développement web collaboratif** standardisé basé sur **Docker**, permettant de faciliter la collaboration entre développeurs, éviter les conflits d’environnement, et garantir la portabilité du projet.

Le projet combine les technologies **Laravel** côté back-end et **HTML/CSS/JAVASCRIPT** côté front-end, avec une base de données **MySQL** et un serveur web **Nginx**, le tout intégré dans une image Docker partagée via Docker Hub.

---

##  Technologies utilisées

-  Docker & Docker Compose
-  Laravel 10
-  HTML/CSS/JAVASCRIPT
-  MySQL
-  Nginx
-  GitHub pour la gestion de code
-  Jira pour la gestion des tâches

---

##  Fonctionnalités clés

- Configuration d’une **image Docker personnalisée** contenant tous les outils nécessaires au développement
- **Partage de l’image via Docker Hub** pour garantir la cohérence entre tous les membres de l’équipe
- **Organisation du travail collaboratif** à l’aide de GitHub (branches, commits, pull requests)
- Mise en place d’un espace de gestion de projet avec Notion/Jira (répartition des tâches, suivi de l’avancement)
- Déploiement final sur un **serveur Linux** contenant la même image Docker que l’environnement de développement

---

##  Instructions d’utilisation

###  Prérequis

- Docker installé (`docker` + `docker-compose`)
- Git installé
- Compte GitHub et Docker Hub

###  Cloner le projet

```bash
git clone https://github.com/Oumhella/PenguinShop.git
cd PenguinShop
```
###  Lancer l’environnement Docker
```bash
docker-compose up --build
```
###  Équipe du projet
Abdellatif Oumhella  
Oumaima Ameziane  
Amine El biyadi  
Aya Raissouni  
Douae Rohand

###  Liens utiles
Docker Hub (image Laravel): https://hub.docker.com/search?q=amineelbiyadi  
Docker Hub (image MySQL): https://hub.docker.com/r/abdellatifbiti03/laravelmysql

###  Licence
Ce projet est réalisé à des fins éducatives dans le cadre d’un module universitaire. Toute réutilisation ou contribution est la bienvenue sous conditions respectueuses de l’usage académique.
