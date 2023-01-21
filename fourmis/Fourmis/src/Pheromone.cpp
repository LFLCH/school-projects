#include "Pheromone.h"
#include "MathUtils.h"
#include "Timer.h"
#include "Renderer.h"


using namespace MathUtils;

Pheromone::Pheromone(Environment * ev_, const Vector2<float> & position_,float quantite_)
:Agent(ev_,position_,circleRadius(quantite_)),quantite(quantite_)
{

}

float Pheromone::getQuantity() const{
	return quantite;
}

void Pheromone::addQuantity(float q){
	quantite += q;
}

void Pheromone::update(){
	if(quantite>0)quantite -= 0.01*quantite*Timer::dt();
	if(quantite<0.01)this->setStatus(destroy);
	Renderer::Color couleur(0,128,128,std::min<float>(quantite,255));
	Renderer::getInstance()->drawCircle(getPosition(),getRadius(),couleur);
}

