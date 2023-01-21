#include "Agent.h"


std::set<Agent*> Agent::agent_history;

Agent::Agent(Environment * ev_, const Vector2<float>& position_,float rayon_):
		Environment::LocalizedEntity(ev_,position_,rayon_),status(running){
	agent_history.insert(this);
}



Agent::Status Agent::getStatus(){
	return status;
}

void Agent::setStatus(Status s){
	status = s;
}

void Agent::simulate(){
	std::set<Agent*>::iterator it = agent_history.begin();
	std::set<Agent*>::iterator itend = agent_history.end();
	while(it !=itend){
		Agent* ag = *it;
		if(ag->getStatus()==running){
			ag->update();
			++it;
		}
		else if(ag->getStatus()==destroy){
			it = agent_history.erase(it);
			delete ag;
		}
	}
}
void Agent::finalize(){
	while(!agent_history.empty()){
		Agent*ag = *agent_history.begin();
		agent_history.erase(ag);
		delete ag;
	}
}



