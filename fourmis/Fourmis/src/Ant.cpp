#include "Ant.h"
#include "Timer.h"
#include "MathUtils.h"
#include <iostream>

using namespace MathUtils;

Ant::Ant(Environment * ev_,const Vector2<float>& position_,Anthill * fourmiliere_,
        float duree_vie_,float vitesse_)
:AntBasePheromone(ev_,position_,fourmiliere_,duree_vie_,vitesse_)
{
}

void Ant::update(){
    if(explore()){ 
        // 1. Si la fourmi ne transporte pas de nourriture et se trouve sur de la nourriture, elle en ramasse.
        // 2. Si la fourmi ne transporte pas de nourriture mais perçoit la nourriture, elle se déplace vers la
        // nourriture. 
        // méthode avec action 
        if(!recolte()){
            //Petite sécurité poour éviter que les fourmis ne mettent des phéromones partout dans la fourmilière
           if(((int) Timer::dt())%5==0  &&
                getPosition().distance(fourmiliere->getPosition())>fourmiliere->getRadius()*random(1,2) /*Ce multiplicateur permet d'éviter la création d'un cercle de phéromone autour de la fourmilière faisant tourner les fourmis en boucle*/
                ) putPheromone(5);
            // 3. Si la fourmi ne transporte pas de nourriture et perçoit des phéromones, elle se déplace dans
            // la direction de la phéromone perçue (utilisation de choosePheromone)
            Pheromone * ph = choosePheromone();
            if(ph!=nullptr)orientation(ph->getPosition());
            else vagabonde();
            // 4. Si la fourmi ne transporte pas de nourriture et ne perçoit pas de phéromones, elle se déplace
            // au hasard suivant les conditions de la question 4.2.
        }
    }
    else{ // La fourmi transoporte de la nourriture
        // 5. Si la fourmi transporte de la nourriture et se trouve sur son nid, elle dépose la nourriture et
        // fait demi-tour.
        // méthode avec action
        if(livraison()){
            // La nourriture qu'elle a déposé permet possiblement créer des nouvelles fourmis 
            int nbFourmis = fourmiliere->nourritureSuffisante();
            this->generer<Ant>(getEnvironment(),fourmiliere,nbFourmis);
            demitour();
        }
        else if(procheDeLaMaison()){
            orientation(fourmiliere->getPosition()); // Plus besoin des phéromones, la fourmilière est à portée de vue
        }
        else {
            this->putPheromone(50);
           /* Le suivi des phéromones n'est pas une bonne idée pour rentrer. Il provoque des boucles qui empêchent la nourriture d'arriver à bon port*/
            Pheromone * ph = choosePheromone();
            if(ph!=nullptr && 
            fourmiliere->getPosition().distance(this->getPosition())
            >
            fourmiliere->getPosition().distance(ph->getPosition())
            )orientation(ph->getPosition()); // suivi des phéromones
            else orientation(fourmiliere->getPosition()); // ligne droite
        }
        // 6. Si la fourmi transporte de la nourriture et ne se trouve pas sur son nid, elle retourne au nid.
        
    }
    avancer();
	affiche();
	updateVie();
}