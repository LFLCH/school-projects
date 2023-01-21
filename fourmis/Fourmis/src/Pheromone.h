#ifndef SRC_PHEROMONE_H_
#define SRC_PHEROMONE_H_

#include "Agent.h"

class Pheromone  : public Agent{
private:
	float quantite;
public:



	Pheromone(Environment * ev_, const Vector2<float> & position_,float quantite);

	float getQuantity() const;

	void addQuantity(float q);

	void update();
};

#endif /* SRC_PHEROMONE_H_ */
