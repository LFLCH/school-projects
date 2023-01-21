
#include "Food.h"
#include "MathUtils.h"
#include "Renderer.h"

using namespace MathUtils;

Food::Food(Environment * ev_, const Vector2<float>& position_,float quantite_):
Agent(ev_,position_,circleRadius(quantite_)),quantite(quantite_),changement(false){
 // Juste pour faire joli r= random(0,255); g= random(0,255);b= random(0,255);
	r=154;g=235;b=38;
}

float Food::getFoodQuantity() const {
	return quantite;
}

float Food::collectFood(float quantite_){
	float qte_prelevee (0);
	if (quantite<=quantite_)qte_prelevee = quantite;
	else qte_prelevee = quantite_;
	quantite -= qte_prelevee;
	changement=true;
	return qte_prelevee;
}

void Food::update(){
	if(changement){
		this->setRadius(circleRadius(quantite));
		if(quantite==0){
			this->setStatus(destroy);
		}
		changement=false;
	}
	Renderer::Color couleur(r,g,b);//couleur(154,235,38,255);
	Renderer::getInstance()->drawCircle(getPosition(),getRadius(),couleur);
}

