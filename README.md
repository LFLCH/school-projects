# school-projects
Short presentation of my school projects.
For each command you see in this readme, make sure you are in the associated folder before running it.


## While Compiler
### Presentation
📆 : 3 months (from mid-October 2022 to mid-January 2023) 

🧑‍💻 *️⃣3️⃣ : Group of three, with [Bastien Faisant](https://github.com/Unstery) & [Kilian Cornec](https://github.com/Kali-ki)<br>

🛠️ : ```java``` ```antlr``` ```c++``` ```bash```

📖 : In order to illustrate our Language Theory and Compilation course, we had to build a compiler able to follow all the steps of a compilation chain, allowing to go from a source code to a result displayed in command line. This compiler being for educational purposes, the programs it compiles are those written in the 'fictional' While language, of which we wrote the grammar. 

🏗️ : [ANTLRWORKS](https://www.antlr3.org/works/) allowed us to automatically generate the code of a lexer and a parser (in java) from the description of the while language grammar that we described. We then continued by writing the code allowing us to :
1. Build a table of symbols.
2. Generate the 3 address code.
3. Interpret 3 address code to write it in a target language (we chose C++)
4. Execute the code written in this target language

### Demo
▶️ : Beware, to use it you need to have a recent java version (above v16). <br>
To start, just run ```./runner.bash program.while```. You should see a hello world message !
For more help, just type ```./runner.bash -h```. It will display advices (in french), than can be translated by :
```
Format : ./runner.bash [-a] [-t] [-c] [-r] [-p] [-e] file.while
-a : Display the AST
-t : Display the symbol table 
-c : Display the intermediate code 
-r : Create the c++ file but do not run it
-p : Do not delete the c++ file
-e : Do not delete the executable
```
Just have fun by editing the program.while, taking the [*gwhile.g*](whilecompiler/gwhile.g) rules into consideration, or reading seeing the .while file examples. And if you understand french, you can  read the [*rapport_fr.pdf*](whilecompiler/rapport_fr.pdf) file. 


## Administration 
### Presentation
📆 : 1 month (between December 2022 & January 2023) <br>

🧑‍💻 *️⃣2️⃣ : In pairs, with [Bastien Faisant](https://github.com/Unstery) <br>

🛠️ : ```angular```  ```nestjs``` ```quarkus``` ```docker```

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
After, just go on your favorite browser, and visit the frontend on [```localhost```](http://localhost) (with the ```1``` & ```valid_password``` credentials), the backend's API on [```localhost/api```](http://localhost/api), and  watch the send of fake emails when creating new associations with members on [```http://localhost/maildev/#/```](http://localhost/maildev/#/)
 
📹 : Otherwise, just watch the following video showing the project in a nutshell.<br>

https://user-images.githubusercontent.com/62034725/213479168-936b3705-f282-48c8-96de-2998f2ef6636.mp4

## Simple Editor
### Presentation 
📆 : 1 month (During the whole month of October 2022) <br>

🧑‍💻 *️⃣2️⃣ : In pairs, with [Bastien Faisant](https://github.com/Unstery) <br>

🛠️ : ```java```

📖 : Simple Editor is, as the name suggests a basic text editor. It has all the main common features that all text editors do share. Indeed, after having wrote some text, erasing, moving the cursor, selecting part of the text, copy, paste, undo and redo are actions you can apply to it. <br>
It takes place in the 'Tools & Methods of modeling' class, where we learnt (among other things like the importance of UML and the Software development life-cycle with agile methods) the 'design patterns' concept. We have put into practice this knowledge by implementing this editor, and trying to respect the [SOLID](https://en.wikipedia.org/wiki/SOLID) principles in the class design.

🏗️ : This project was done in java, because it is an object oriented language, which is particularly adapted to the constraints of this exercise. Moreover, it is a language that we are familiar with, which allowed us to concentrate on the design part. In addition, it allowed us to improve our skills in terms of GUI (with the swing library).

### Demo
▶️ : If Java is installed, you can try to run the jar file and enjoy playing with the editor !

📹 : You can also watch the following video to make you an idea of the final result.<br>

https://user-images.githubusercontent.com/62034725/213699879-90bce329-80d7-45a2-9de0-b41e1d800626.mp4

## Fourmis
### Presentation
📆 : 1 month (Between April and May 2022)

🧑‍💻 *️⃣1️⃣ : Just me !

🛠️ : ```c++```

📖 : Fourmis (french word for Ants 🐜) is a basic simulation of the behavior of ants when they look for food.  In this modelling, food resources (🟢) and anthills (🔵) can be created and randomly placed on the map. For each anthill's creation, a certain number of ants (⚪) are created. The goal of these ants is to seek food and bring it back to the anthill to keep it alive. To help in their search for food, and because ants are social insects, each individual produce a substance called "pheromone" during their activity, forming a path that other ants can follow. If a ant has found food, the production of pheromone will be more important, allowing a prioritization of the information. <br>
This simulation was done within the framework of our C++ class, where we learnt the specificity of the language. Before this course, our knowledge of the object model was strongly linked to java, and it allowed us to approach this concept from a new point of view, especially concerning the memory management with the manipulation of pointers and references.

🏗️ : Thanks to this project, we consolidated our knowledge in the Oriented Programming  (inheritance, polymorphism, abstraction..). It was also an opportunity to discover the concept of multi-agent systems and the programming of their behavior via a rule-based system.

### Demo
▶️ : If you have access to a c++ environment, make sure "SDL2.h" exists (you can install it with ```sudo apt-get install libsdl2-dev```), as well as for "SDL2_gfxPrimitives.h"  (follow the [repo's](https://github.com/RobLoach/sdl2_gfx) instructions to install it). Once everything seems ready, go on Fourmis/Debug. Then run ```make all``` to create the executable and ```./Fourmis``` to start. You'll see the interface appear. There, type ```f``` to create food ressources,```d``` to delete the last one,```a``` to create an anthill, ```e``` to add new ants to the last anthill, and ```q``` to end the simulation.

📹 : If you play with it, you should see something like in the following video, or in [these](fourmis/Fourmis/img/) captures

https://user-images.githubusercontent.com/62034725/213896468-51edd675-d7ee-4bb3-8d6d-012a0cb9bba7.mp4

# Work in progress
////////////////////////////////////////////////////////////////////////

🚧The Following projects presentations are not finished of editing🚧<br>
*I am currently looking for my old projects* <br>
*and the executables that were associated with them*

//////////////////////////////////////////////////////////////////////


## Hackathon
### Presentation
📆 : 2 days (May 2022)

🧑‍💻 : Group of 4 students :  Jérémy Bindel, Germaine Nyatsikor, Yazid Benjamaa & I.

🛠️ : ```java```

📖 : 2D action-adventure game in less than 28 hours. In Java, with the Swing library. It was a subject in its own right, but we did not have a specific lesson (we followed the instructions given in the morning)

## Hangman Game
### Presentation
📆 : 1 month (June 2021)

🧑‍💻 : In pairs, with Jérémy Bindel

🛠️ : ```HTML5``` ```CSS``` ```JavaScript``` ```PHP```

📖 : Game development with basic web and database technologies of a hangman game. It was the final part of our WEB class, where we learnt the fundamentals, with a lot of practical works.


 



