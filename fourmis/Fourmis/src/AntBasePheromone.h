#ifndef SRC_ANTBASEPHEROMONE_H_
#define SRC_ANTBASEPHEROMONE_H_

#include "AntBase.h"
#include "Pheromone.h"

class AntBasePheromone : public AntBase{
public:
	AntBasePheromone(Environment * ev_, const Vector2<float>& position_,Anthill * fourmiliere_,
			 float duree_vie_ = 1000+MathUtils::random()*1500 ,float vitesse_ = 1);

	void putPheromone(float q);

	Pheromone * choosePheromone() const;
};

#endif /* SRC_ANTBASEPHEROMONE_H_ */
