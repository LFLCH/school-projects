# school-projects
Demo of my school projects.
For each command you see in this readme, make sure you are in the associated folder before running it.

## Administration 
### Presentation
📆 : 1 month (between December 2022 & January 2023) <br>

🧑‍💻 *️⃣2️⃣ : In pairs, with [Bastien Faisant](https://github.com/Unstery) <br>

📖 : Administration is a web app, allowing to manage associations (like sport associations) by creating, deleting and modifying one of them, likewise with member accounts. 
The construction of this app takes place in the framework of two classes : [```Web programming```](https://stephaniechallita.github.io/web/) (where we learnt how to make a backend and a frontend), and ```Software Architecture``` (where we learnt the basics of this domain, with the 'Service Oriented Computing' concept).
Having this task as a coherent project was a great opportunity to put these newly acquired skills into practice.<br>

🏗️ :Because  a picture speaks a thousand words, here is the list of the technos we used and their roles. <br>

<img src="assets/administration.png" width="500"> <br>

### Demo
▶️ : If [Docker](https://www.docker.com/) in installed on your computer, you can try it by running the following command
```bash
docker-compose -f docker-compose.administration.yml up -d
```
After, just go on your favorite browser, and visit the frontend on ```localhost``` (with the ```1```&```valid_password``` credentials), the backend's API on ```http://localhost/```, and  watch the send of fake emails when creating new associations with members on ```http://localhost/maildev/#/```
 
📹 : Otherwise, just watch the following video showing the project in a nutshell.<br>

https://user-images.githubusercontent.com/62034725/213479168-936b3705-f282-48c8-96de-2998f2ef6636.mp4

## Simple Editor
### Presentation 
📆 : 1 month (During the whole month of October 2022) <br>

🧑‍💻 *️⃣2️⃣ : In pairs, with [Bastien Faisant](https://github.com/Unstery) <br>

📖 : Simple Editor is, as the name suggests a basic text editor. It has all the main common features that all text editors do share. Indeed, after having wrote some text, erasing, moving the cursor, selecting part of the text, copy, paste, undo and redo are actions you can apply to it. <br>
It takes place in the 'Tools & Methods of modelisation' class, where we learnt (among other things like the importance of UML and the Sofware developpment life-cycle with agile methods) the 'design patterns' concept. We have put into practice this knowledge by implementing this editor, and trying to respect the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles in the class design.

🏗️ : This project was done in java, because it is an object oriented language, which is particulary adapted to the constraints of this exercise. Moreover, it is a laguage that we are familiar with, which allowed us to concentrate on the design part. In addition, it allowed us to improve our skills in terms of GUI (with the swing library).

### Demo
▶️ : If Java is installed, you can try to run the jar file and enjoy playing with the editor !

📹 : You can also watch the following video to make you an idea of the final result.<br>
