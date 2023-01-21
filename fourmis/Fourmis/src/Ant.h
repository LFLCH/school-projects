#ifndef SRC_ANT_H_
#define SRC_ANT_H_

#include "AntBasePheromone.h"
#include "MathUtils.h"

class Ant : public AntBasePheromone
{
public:

	Ant(Environment * ev_, const Vector2<float>& position_,Anthill * fourmiliere_,
			 float duree_vie_ = 1000+MathUtils::random()*1500 ,float vitesse_ = 1);

	void update();

};

#endif /* SRC_ANT_H_ */
