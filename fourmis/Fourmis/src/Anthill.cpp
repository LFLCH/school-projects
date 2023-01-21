#include "Anthill.h"
#include "Renderer.h"
#include <iostream>
#include "Ant.h"

Anthill::Anthill(Environment * ev_, const Vector2<float>& position_)
:Agent(ev_,position_,10),quantite_totale(0),nombre_nouvelles_fourmis(0)
{
	std::cout<<"Nouvelle fourmilère créée ";
	std::cout<<getPosition()[0]<<" "<<getPosition()[1]<<std::endl;
}

void Anthill::update(){
	if(this->getStatus()==running){
		// Affichage de la nourriture
		Renderer::Color couleur(0,0,255);//couleur(154,235,38,255);
		Renderer::getInstance()->drawCircle(getPosition(),getRadius(),couleur);

	}
	nombre_nouvelles_fourmis=0;
}

void Anthill::depositFood(float quantite){
	quantite_totale+=quantite;
	std::cout<<"La fourmilière :"<<getPosition()[0]<<" "<<getPosition()[1]<<" a comme nourriture :"<<quantite_totale<<std::endl;
}
int Anthill::nourritureSuffisante(){
	int seuil = 10;
	int nb_max_creation = 4;
	if(quantite_totale>seuil && nombre_nouvelles_fourmis<nb_max_creation){
		int nbfourmis =quantite_totale/seuil;
		if(nbfourmis>nb_max_creation)nbfourmis=nb_max_creation;
		quantite_totale-= nbfourmis*seuil;
		return nbfourmis;
	}
	else return 0;
}