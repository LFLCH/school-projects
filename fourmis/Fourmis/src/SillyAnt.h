#ifndef SRC_SILLYANT_H_
#define SRC_SILLYANT_H_

#include "AntBase.h"
#include "MathUtils.h"

class SillyAnt :public AntBase {
public:
	SillyAnt(Environment * ev_, const Vector2<float>& position_,Anthill * fourmiliere_,
			 float duree_vie_ = 1000+MathUtils::random()*1500 ,float vitesse_ = 1);

	void update();



};

#endif /* SRC_SILLYANT_H_ */
