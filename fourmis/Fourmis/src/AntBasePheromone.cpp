#include "AntBasePheromone.h"
#include "MathUtils.h"


using namespace MathUtils;

AntBasePheromone::AntBasePheromone(Environment * ev_, const Vector2<float>& position_, Anthill * fourmiliere_, float duree_vie_,float vitesse_)
:AntBase(ev_, position_, fourmiliere_, duree_vie_,	Vector2<float>::random().normalized())
{}

void AntBasePheromone::putPheromone(float q){
	std::vector<Pheromone*> pheromones = perceive<Pheromone>();
	if(pheromones.size()>0)pheromones.front()->addQuantity(q);
	else if(random(0,50)>5 )  new Pheromone(getEnvironment(),getPosition(),q); // Un peu de random permet d'alléger la simulation et est plus naturel
}

Pheromone * AntBasePheromone::choosePheromone() const {
	std::vector<Pheromone*> pheromones = perceive<Pheromone>(deplacement,pi/2,8);
	if(pheromones.size()>0){
		std::vector<float> poids;
		for (Pheromone * f : pheromones){
			poids.push_back(f->getQuantity());
		}
		return pheromones[randomChoose(poids)];
	}
	else return nullptr;
}

