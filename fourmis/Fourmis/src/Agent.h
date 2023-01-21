#ifndef SRC_AGENT_CPP_
#define SRC_AGENT_CPP_

#include "Environment.h"

class Agent : public Environment::LocalizedEntity{
	public :
		typedef enum { running, destroy } Status;

	private:
		Status status;
		static std::set<Agent *> agent_history;

	public:

		Agent(Environment * ev_, const Vector2<float> & position_, float rayon_ = defaultRadius());

		virtual void update() = 0;

		Status getStatus();
		void setStatus(Status s);

		static void simulate();
		static void finalize();

};

#endif
