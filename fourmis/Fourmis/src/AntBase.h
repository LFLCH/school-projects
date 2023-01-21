#ifndef SRC_ANTBASE_H_
#define SRC_ANTBASE_H_

#include "Agent.h"
#include "Anthill.h"
#include "Food.h"

class AntBase  : public Agent
{
protected:
	// Variables
	Anthill * fourmiliere; // fourmilière à laquelle la fourmi est rattachée
	float vitesse; // valeur par défaut 1 cm/s
	float duree_vie; // intervalle [1000 ; 2500] secondes
	float vie;
	float nourriture; // Nombre d'unités de nourriture transportées
	static const int max_nourriture = 5;

	Vector2<float>  deplacement; // de norme 1
protected:
	bool explore();
	bool percoitNourriture();

public:
	AntBase(Environment * ev_, const Vector2<float>& position_,Anthill * fourmiliere_,float duree_vie_ ,Vector2<float> deplacement_,float vitesse_ = 1);

	template<class T>
	static void generer(Environment *ev, Anthill * fourmiliere, int n=25){
		for (int i=0;i<n;i++)new T(ev,fourmiliere->getPosition(),fourmiliere);
	}

	// Méthodes à programmer

	// avancement de la fourmi d'un vecteur d’un vecteur d*v*Timer::dt()
	// avec d le vecteur de direction de déplacement
	// avec v la vitesse de déplacement
	// Timer::dt() dernier appel à update
	void avancer();

	// theta : angle de rotation en radians
	void tourner(float theta);

	// la fourmi fait demi-tour sur elle même
	void demitour();

	// @position la position d'une cible
	// oriente la fourmi vers la cible
	void orientation(const Vector2<float> position);

	// dépose toute la cargaison de nourriture transportée par la fourmi sur sa fourmilière si elle est dessus
	// indique si la livraison a été faite avec succès
	bool livraison();

	// récolte la nourriture si elle le peut et dans la limite de ses capacités. Si de la nourriture est perçue, dirige la fourmis.
	// indique si une action de récolte est en cours (recherche active de nourriture ou récupération en cours)
	bool recolte();

	// la fourmi meurt si sa durée de vie est atteinte
	void updateVie();

	// affiche sous la forme d’un point blanc
	//(R :255, V :255, B :255, A :255)
	// tracé à sa position ou d’un point vert
	// (128,255,128,255)
	// si elle transporte de la nourriture
	void affiche();

	// Se déplace aléatoirement
	void vagabonde();

	// Détecte sa proximité avec la fourmilière de référence
	bool procheDeLaMaison();


};

#endif /* SRC_ANTBASE_H_ */
