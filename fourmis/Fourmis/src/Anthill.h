#ifndef SRC_ANTHILL_H_
#define SRC_ANTHILL_H_

#include "Agent.h"

class Anthill : public Agent
{
private:
	float quantite_totale;
	int nombre_nouvelles_fourmis;
public:

	Anthill(Environment * ev_, const Vector2<float>& position_);

	void update();

	void depositFood(float quantity);

	// Renvoie 0 s'il n'y a pas assez de nourriture pour créer une fourmilière
	// Indique le nombre de fourmis qu'il est possible de créer sinon
	int nourritureSuffisante(); 
};

#endif /* SRC_ANTHILL_H_ */
