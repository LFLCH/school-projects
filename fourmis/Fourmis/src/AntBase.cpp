
#include "AntBase.h"
#include <assert.h>
#include "Timer.h"
#include "MathUtils.h"
#include "Renderer.h"

#include <iostream>

using namespace MathUtils;


	AntBase::AntBase(Environment * ev_, const Vector2<float>& position_,Anthill * fourmiliere_,float duree_vie_ ,Vector2<float> deplacement_,float vitesse_)
	:Agent(ev_,position_), fourmiliere(fourmiliere_), vitesse(vitesse_), duree_vie(duree_vie_),vie(0),nourriture(0),deplacement(deplacement_)
	{
		assert(duree_vie>=1000 && duree_vie<=2500);
		assert(deplacement.norm()==1);
		std::cout<<"Nouvelle fourmi !"<<std::endl;
	}



	bool AntBase::explore(){
		return nourriture==0;//nourriture<max_nourriture;
	}

	void AntBase::avancer(){
	 deplacement = deplacement.normalized();
	 const Vector2<float> & avancement = deplacement*vitesse*Timer::dt();
	 this->translate(avancement);
	}

	void AntBase::tourner(float theta){
		deplacement = deplacement.rotate(theta);
	}

	void AntBase::demitour(){
		this->tourner(pi);
	}

	void AntBase::vagabonde(){
		float amplitude = pi*Timer::dt()/10;
		float angle = MathUtils::random(-amplitude,amplitude);
		tourner(angle);
	}
	void AntBase::orientation(const Vector2<float> position){
		deplacement =getPosition().direction(position);
		//this->translate(position*vitesse*Timer::dt());
	}

	bool AntBase::livraison(){
		// La fourmi dépose la nourriture sur SA fourmilière si elle s'y trouve
		//std::cout<<"Fourmilières à proximité"<<std::endl;
		// Condition : La fourmi a détecté sa fourmilière
		// Et elle est suffisamment proche (elle se situe dans son rayon)
		if(procheDeLaMaison() && getPosition().distance(fourmiliere->getPosition()) < fourmiliere->getRadius()){
			fourmiliere->depositFood(this->nourriture);
			nourriture=0;
			return true;
		}
		return false;
	}
	bool AntBase::procheDeLaMaison(){
		std::vector<Anthill*> fourmilieres = perceive<Anthill>(deplacement,pi/2,3);
		while(!fourmilieres.empty()){
			if(fourmilieres.back() == fourmiliere)return true;
			fourmilieres.pop_back();
		}
		return false;
	}

	bool AntBase::percoitNourriture(){
		return perceive<Food>(deplacement,pi/2,3).size()>0;
	}



	// récolte la nourriture seulement si la fourmis est à la même poisition
	// sinon, si elle en perçoit, elle s'en rapproche
	// Le booléen renvoyé indique si de la nourriture a été détectée
	bool AntBase::recolte(){
		std::vector<Food*> buffet = perceive<Food>(deplacement,pi/2,3);
		for (Food * f : buffet){
			if( max_nourriture>nourriture &&  getPosition().distance(f->getPosition())<f->getRadius()){ // La fourmis se trouve sur de la nourriture
				//std::cout<<"Miam"<<std::endl;
				nourriture+= f->collectFood(max_nourriture-nourriture); return true;
			}
			else { //de la nourriture a été détectée à proximité, il faut s'orienter vers elle
				orientation(f->getPosition()); return true;
			}
		}
		return false;
	}

	void AntBase::updateVie(){
		if(vie>duree_vie){
			this->setStatus(destroy);
		}
		else{
			if(!explore() && nourriture>max_nourriture/2 && random(0,5)>2.5) { 
				// La fourmis se nourrit si elle le peut, ce qui a pour conséquence de la maintenir en vie
				duree_vie+=Timer::dt()*2;
				nourriture-=0.1;
			}
			vie+=Timer::dt();
		}
	}

	void AntBase::affiche(){
		int c = nourriture>0?128:255;
		Renderer::Color couleur(c,255,c,255);
		Renderer::getInstance()->drawCircle(getPosition(),getRadius(),couleur);
	}





