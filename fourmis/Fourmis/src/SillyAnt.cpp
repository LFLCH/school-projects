#include "SillyAnt.h"
#include "MathUtils.h"
#include "Timer.h"

#include <iostream>

using namespace MathUtils;

SillyAnt::SillyAnt(Environment * ev_, const Vector2<float>& position_, Anthill * fourmiliere_, float duree_vie_,float vitesse_) :
AntBase(ev_, position_, fourmiliere_, duree_vie_,	Vector2<float>::random().normalized())
{ 
}

void SillyAnt::update() {
	if(explore()){
		if(!percoitNourriture())vagabonde();
		else recolte();
	}
	else {
		//std::cout<<getPosition().distance(fourmiliere->getPosition())<<std::endl;
		orientation(fourmiliere->getPosition());
		livraison();
	}
	avancer();
	affiche();
	updateVie();
}

