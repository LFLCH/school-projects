#include <iostream>
#include <SDL2/SDL.h>
#include <SDL2/SDL2_gfxPrimitives.h>
#include "Environment.h"
#include "Renderer.h"
#include <time.h>
#include "Timer.h"

#include "Agent.h"
#include "MathUtils.h"
#include "Food.h"
#include "Vector2.h"
#include "Anthill.h"
#include "SillyAnt.h"
#include "Ant.h"

using namespace MathUtils;


static unsigned int windowWidth() { return 1024; }
static unsigned int windowHeight() { return 700; }


static Anthill * acourante = nullptr; // Permet d'avoir un accès direct à la dernière fourmilière crée, sans passer par getAllInstancesOf qui est très lent


/// <summary>
/// called each time a key is pressed.
/// </summary>
/// <param name="key">The key.</param>
/// <param name="environment">The environment.</param>
void onKeyPressed(char key, Environment * environment)
{
	std::cout << "Key pressed: " << key << std::endl;
	if(key=='f'){
		float qte = random(200, 2000);
		Vector2<float>  pos = environment->randomPosition();
		new Food(environment,pos,qte);

	}
	else if (key=='d' && ! environment->getAllInstancesOf<Food>().empty()){
		std::vector<Food*> instances = environment->getAllInstancesOf<Food>();
		Food *f = instances.front();
		f->setStatus(Agent::destroy);
	}
	else if (key=='a'){
		Vector2<float>  pos = environment->randomPosition();
	    Anthill * a = new Anthill(environment,pos);
		//AntBase::generer<SillyAnt>(environment,a);
		AntBase::generer<Ant>(environment,a); 
		acourante =a;
	} // Génère des fourmis automatiquement ratachées à la première fourmilière
	else if( key=='e' && acourante!=nullptr){
		//AntBase::generer<SillyAnt>(environment,acourante);
		AntBase::generer<Ant>(environment,acourante);
	}
 
}

/// <summary>
/// Called at each time step.
/// </summary>
void onSimulate()
{
  Agent::simulate();

}

/// <summary>
/// The main program.
/// </summary>
/// <param name="argc">The number of arguments.</param>
/// <param name="argv">The arguments.</param>
/// <returns></returns>
int main(int /*argc*/, char ** /*argv*/)
{
	// 1 - Initialization of SDL
	if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_EVENTS/* | SDL_INIT_AUDIO*/) != 0) {
		SDL_Log("Unable to initialize SDL: %s", SDL_GetError());
		return 1;
	}
	// 2 - Initialization of the renderer
	Renderer::initialize(windowWidth(), windowHeight());

	// 3 - Creation of an environment
	Environment environment(windowWidth(), windowHeight());

	// 4 - We change the seed of the random number generator
	srand((unsigned int)time(NULL));

	// The main event loop...
	SDL_Event event;
	bool exit = false;
	while (!exit) 
	{
		// 1 - We handle events 
		while (SDL_PollEvent(&event))
		{
			if ((event.type == SDL_QUIT) || (event.type == SDL_KEYDOWN && event.key.keysym.sym == 'q'))
			{
				::std::cout << "Exit signal detected" << ::std::endl;
				exit = true;
				break;
			}
			if (event.type == SDL_KEYDOWN)
			{
				onKeyPressed((char)event.key.keysym.sym, &environment);
			}
		}
		// 2 - We update the simulation
		Timer::update(0.5);
		onSimulate();
		// 3 - We render the scene
		Renderer::getInstance()->flush();
	}

	std::cout << "Shutting down renderer..." << std::endl;
	Agent::finalize();
	Renderer::finalize();

	std::cout << "Shutting down SDL" << std::endl;
	SDL_Quit();

	return 0;
}
