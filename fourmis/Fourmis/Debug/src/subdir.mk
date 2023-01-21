################################################################################
# Automatically-generated file. Do not edit!
################################################################################

# Add inputs and outputs from these tool invocations to the build variables 
CPP_SRCS += \
../src/Agent.cpp \
../src/Ant.cpp \
../src/AntBase.cpp \
../src/AntBasePheromone.cpp \
../src/Anthill.cpp \
../src/Environment.cpp \
../src/Food.cpp \
../src/Pheromone.cpp \
../src/Renderer.cpp \
../src/SillyAnt.cpp \
../src/Timer.cpp \
../src/main.cpp 

CPP_DEPS += \
./src/Agent.d \
./src/Ant.d \
./src/AntBase.d \
./src/AntBasePheromone.d \
./src/Anthill.d \
./src/Environment.d \
./src/Food.d \
./src/Pheromone.d \
./src/Renderer.d \
./src/SillyAnt.d \
./src/Timer.d \
./src/main.d 

OBJS += \
./src/Agent.o \
./src/Ant.o \
./src/AntBase.o \
./src/AntBasePheromone.o \
./src/Anthill.o \
./src/Environment.o \
./src/Food.o \
./src/Pheromone.o \
./src/Renderer.o \
./src/SillyAnt.o \
./src/Timer.o \
./src/main.o 


# Each subdirectory must supply rules for building sources it contributes
src/%.o: ../src/%.cpp src/subdir.mk
	@echo 'Building file: $<'
	@echo 'Invoking: GCC C++ Compiler'
	g++ -I/private/student/e/he/lfiloche/workspacecpp/Fourmis/src -I"/home/leo/espace/eclipse-cpp/Fourmis/src" -I/home/leo/espace/eclipse-cpp/Fourmis/src -O0 -g3 -Wall -c -fmessage-length=0 -MMD -MP -MF"$(@:%.o=%.d)" -MT"$@" -o "$@" "$<"
	@echo 'Finished building: $<'
	@echo ' '


clean: clean-src

clean-src:
	-$(RM) ./src/Agent.d ./src/Agent.o ./src/Ant.d ./src/Ant.o ./src/AntBase.d ./src/AntBase.o ./src/AntBasePheromone.d ./src/AntBasePheromone.o ./src/Anthill.d ./src/Anthill.o ./src/Environment.d ./src/Environment.o ./src/Food.d ./src/Food.o ./src/Pheromone.d ./src/Pheromone.o ./src/Renderer.d ./src/Renderer.o ./src/SillyAnt.d ./src/SillyAnt.o ./src/Timer.d ./src/Timer.o ./src/main.d ./src/main.o

.PHONY: clean-src

