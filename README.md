# school-projects
Demo of my school projects.
For each command you see in this readme, make sure you are in the associated folder before running it.

## Administration 
### Presentation
📆 : 1 month (between December 2022 & January 2023) <br>
🧑‍💻 *️⃣2️⃣ : In pairs, with [Bastien Faisant](https://github.com/Unstery) <br>
📖 : Administration is a web app, allowing to manage associations (like sport associations) by creating, deleting and modifying one of them, likewise with member accounts. 
The construction of this app takes place in the framework of two classes : [```Web programming```](https://stephaniechallita.github.io/web/) (where we learnt how to make a backend and a frontend), and ```Software Architecture``` (where we learnt the basics of this domain, with the 'Service Oriented Computing' concept).<br>
Having this task as a coherent project was a great opportunity to put these newly acquired skills into practice.
🏗️ :Because  a picture speaks a thousand words, here is the list of the technos we used and their roles. <br>
<img src="assets/administration.png" width="400"> <br>

### Demo
▶️ : If [Docker](https://www.docker.com/) in installed on your computer, you can try it by running the following command
```bash
docker-compose -f docker-compose.administration.yml up -d
```
After, just go on your favorite browser, and visit the frontend on ```localhost``` (with the ```1```&```valid_password``` credentials), the backend's API on ```http://localhost/```, and  watch the send of fake emails when creating new associations with members on ```http://localhost/maildev/#/```
 
Otherwise, just watch the following video showing the project in a nutshell.<br>
<video src='assets/administration.mp4' width="400" />