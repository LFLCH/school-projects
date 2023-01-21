#ifndef SRC_FOOD_H_
#define SRC_FOOD_H_

#include "Agent.h"

class Food : public Agent
{
private:
	float quantite;
	bool changement;
    int r,g,b;

public:
	Food(Environment * ev_, const Vector2<float>& position_,float quantite_);

	float getFoodQuantity() const;
	float collectFood(float quantite_);

	void update();

};

#endif /* SRC_FOOD_H_ */
