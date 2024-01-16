/*
 * Subset-Sum Problem (SSP)
 *
 * ESIR HPC project 2023
 *
 * last update: November 18th, 2023
 *
 * AM
 */

#include <stdio.h>
#include <stdlib.h>
#include "filoche.c"

enum memoizationtype{
   SEQUENTIAL_RECURSIVE = 0,
   SEQUENTIAL_ITERATIVE = 1,
   PARALLEL_ITERATIVE = 2,
};
typedef int MemoizationType;

// Directives considering the handling of the memoization process and its result.
struct memoizationprocess{
   bool showSumMemory;
   bool showSubSet;
   bool showDuration; // in ms
   bool showExistence;
   MemoizationType type;
};
typedef struct memoizationprocess MemoizationProcess;

// SSP data structure
// - "n" is the size of the instance (# of elements in the set)
// - "solution" is an array of unsigned int that contains one of the known solutions (binary)
// - "target" is the (unsigned long) integer target
// - "set" is the pointer to the array of (unsigned long) integer values
struct ssp
{
   unsigned int n;
   unsigned int* solution;
   unsigned long target;
   unsigned long* set;
};
typedef struct ssp SSP;

// SSP printer
void printSSP(SSP instance)
{
   unsigned int i;
   printf("Subset-Sum instance (n = %u, target = %lu)\n",instance.n,instance.target);
   printf("Set (solution in binary) = {");
   for (i = 0; i < instance.n; i++)
   {
      printf("%lu (%1d)",instance.set[i],instance.solution[i]);
      if (i != instance.n - 1)  printf(", ");
   };
   printf("}\n");
}

// log2 with bit shifts
unsigned int ln(unsigned long number)
{
   unsigned int log = 0UL;
   while (number > 0)
   {
      number = number >> 1; // correction of the bit shift
      log++;
   };
   return log;
}

// SSP instance generator
// - "n" is the size of the instance (input, >0)
// - "instance" is a pointer to an 'empty' variable of type SSP (input and output)
// - "max" is the maximum allowed value for the integers in the set (>1, input)
// The returning value is the 'density' of the instance
double genSSP(int n,SSP *instance,unsigned long max)
{
   int i;
   unsigned int nbits;
   unsigned long element;
   unsigned long current_max = 0;
   double density = 0.0;

   // initializing the instance (we suppose that no memory is associated to inner pointers)
   instance->n = n;
   instance->solution = (unsigned int*)calloc(n,sizeof(unsigned int));
   instance->target = 0L;
   instance->set = (unsigned long*)calloc(n,sizeof(unsigned long));

   // seed of random number generator
   srand(6666);

   // creating the instance with one of its solutions
   for (i = 0; i < n; i++)
   {
      element= 1UL + rand()%(max - 1);
      if (current_max < element)
      {
         current_max = element;
         nbits = ln(element);
         density = (double) n/nbits;
      }
      instance->solution[i] = 0;
      if (rand()%2)
      {
         instance->target = instance->target + element;
         instance->solution[i] = 1;
      }
      instance->set[i] = element;
   };

   return density;
}

// freeSSP
void freeSSP(SSP *instance)
{
   free(instance->solution);
   free(instance->set);
}
/**
 * Logs the solution subset from the instance
 * @param instance the instance of the SSP
*/
void printFoundSubset(SSP *instance){
   printf("Subset found : ");
   for(int i=0; i<instance->n ;i ++){
      if(instance->solution[i]) printf("%li | ", instance->set[i]);
   }
   printf("\n");
}

#include<sys/time.h>
/**
 * @return the current time in milliseconds
*/
double timeInMilliseconds(void) {
    struct timeval tv;

    gettimeofday(&tv,NULL);
    return (((double)tv.tv_sec)*1000)+(tv.tv_usec/1000);
}

/**
 * Runs the corresponding memoization process. Logs some information if requested.
 * @param instance the instance of the SSP
 * @param process the process of the memoization
 * 
*/
void memoization(SSP *instance, MemoizationProcess * process){
   int n = instance->n;
   unsigned long  * a = instance->set;
   unsigned long target = instance->target;
   initializeSumMemory(n, target);

   bool subsetExists;
   double start = timeInMilliseconds();
   if(process->type==SEQUENTIAL_RECURSIVE) subsetExists =  memoization_sequential_recursive(a, n, target);
   else if(process->type==SEQUENTIAL_ITERATIVE) subsetExists = memoization_sequential_iterative(a, n, target);
   else if(process->type==PARALLEL_ITERATIVE) subsetExists= memoization_parallel_iterative(a, n, target);
   double stop = timeInMilliseconds();
   
   if(process->showExistence) printf(subsetExists?"A subset was found\n":"No solution subset was found\n");
   if(process->showDuration) printf("%i", (int) (stop - start));

   unsigned long sum = processSubset(instance->solution, instance->set, instance->n, instance->target);
   if(subsetExists  && sum != target) printf("🚨 ERROR : FOUND %lu instead of %lu\n", sum, target);
   
   if(process->showSumMemory){printf("\n") ;printSumMemory(n, target, instance->set);}
   if(process->showSubSet) {printf("\n"); printFoundSubset(instance);}
   releaseSumMemory(n);
   
}


/**
 * Runs the memoization process according to the parameters. Minds the memory allocation and the freeing.
 * @param a the set of integers
 * @param target the target sum
 * @param n the size of a
 * @param type the type of memoization process
 * @param expectedResult if a solution is expected
 * @param showSubSet show the found subset
 * @param showSumMemory show the sum memory
 * @param showDuration show the duration of the process
 * @param showExistence show if a solution was found
*/
void findSubsetSumSolution(unsigned long * a, unsigned long target, unsigned int n, MemoizationType  type, bool showSubSet, bool showSumMemory, bool showDuration, bool showExistence){
   SSP instance;
   
   instance.set = a;
   instance.n = n;
   instance.target = target;
   instance.solution = (unsigned int*)calloc(instance.n,sizeof(unsigned int));

   MemoizationProcess process;
   process.showSubSet = showSubSet;
   process.showExistence = showExistence;
   process.showSumMemory = showSumMemory;
   process.showDuration = showDuration;
   process.type = type;

   memoization(&instance, &process);

   freeSSP(&instance);
}

void printInstanceSet(SSP * instance){
   for(int j=0; j< instance->n ; j++){
         printf("%lu | ", instance->set[j]);
      }
      printf("\n");
}


// PERFORMANCE TEST METHODS
#include <math.h>


void fillSetFromTarget( unsigned long *a, unsigned int n, unsigned long target){
   srand(123);
   unsigned long remainingTargetValue = target;
      for(int i=0; i<n; i++){
         if (rand()%2 && remainingTargetValue>0)
         {
            unsigned long value = rand()%(remainingTargetValue+1);
            a[i]=value;
            remainingTargetValue-=value;
         }
         else if(i==n-1 && remainingTargetValue>0){
            a[i]=remainingTargetValue;
         }
         else {
            a[i]=rand()%10000;
         }
      }
}

void testTarget(){
   MemoizationType types[] = {SEQUENTIAL_RECURSIVE, SEQUENTIAL_ITERATIVE, PARALLEL_ITERATIVE};
   int n = 1000;

   printf("target;séquentielle récursive; séquentielle itérative; parallèle itérative\n");
   for(unsigned long target = 10; target<=1000000; target += pow(10, (int) log10(target))){
      printf("%li ", target);
      for(int i=0; i<3; i++){
         printf("; ");
         MemoizationType type = types[i];
         unsigned long *a = (unsigned long*) calloc(n, sizeof(unsigned long)); 

         fillSetFromTarget(a, n, target);
         findSubsetSumSolution(a, target, n, type, false, false, true, false);
      }  
      printf("\n");
   }
}

void fillSetRandomly(unsigned long *a,unsigned int n){
   for(int i=0; i<n;i++){
      a[i]=rand()%10000;
   }
}


void testN(){
   MemoizationType types[] = {SEQUENTIAL_RECURSIVE, SEQUENTIAL_ITERATIVE, PARALLEL_ITERATIVE};
   int target = 1000;

   printf("target;séquentielle récursive; séquentielle itérative; parallèle itérative\n");
   for(unsigned long n = 10; n<=100000; n += pow(10, (int) log10(n))){
      printf("%li", n);
      for(int i=0; i<3; i++){
         printf("; ");
         MemoizationType type = types[i];
         unsigned long *a = (unsigned long*) calloc(n, sizeof(unsigned long)); 

         fillSetRandomly(a, n);
         findSubsetSumSolution(a, target, n, type, false, false, true, false);
      }  
      printf("\n");
   }
}

void testParallelization(){
   int maxThreads = omp_get_max_threads(); 
   // In this test, the number of maximum threads is marked out by 8 (the best my machine can do)
   int nThreads = maxThreads>8?8:maxThreads; 
   int target = 1234;
   int n = 100000;
   printf("threads;duration\n");
   for(int i=1; i<=nThreads; i++){
      printf("%i; ",i);
      NUM_THREADS = i;
      unsigned long *a = (unsigned long*) calloc(n, sizeof(unsigned long)); 
      fillSetRandomly(a, n);
      findSubsetSumSolution(a, target, n, PARALLEL_ITERATIVE, false, false, true, false);
      printf("\n");
   }
}




int main()
{
   // Example
   unsigned long set[4] = {1, 7, 2, 4};
   int n = 4;
   unsigned long *a = (unsigned long*) calloc(n, sizeof(unsigned long)); // copy of the set array into a dynamic array
   for(int i=0; i<n; i++) a[i] = set[i];
   unsigned long target = 6;
   findSubsetSumSolution(a, target, n, SEQUENTIAL_RECURSIVE , true, true, false, true);

   // Tests
   // testTarget();
   // testN();
   // testParallelization();

   return 0;
}