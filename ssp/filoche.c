/**
 * @author Léo Filoche
 * @details This file contains memoization solutions to the subset sum problem, as described in https://favtutor.com/blogs/subset-sum-problem. Memoization consists in storing processed answers inside an array, so that they do not need to be processed again while searching for the solution to the subset sum problem.
 *
 * You will find several memoization functions.
 * Indeed, the initial memoization solution is recursive.
 * However, if we want to paralellize it, we need to have an iterative version of it.
 * Then, apply Open MP to do the paralellization work.
 *
 */
#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>
#include <omp.h>


#define UNSET_VALUE -1
int NUM_THREADS = 5;

// 2D array ( NumberOfELementsFromA X ValueOfTarget ) where the solutions to the ssp are stored.
int **sumMemory;

/**
 * Allocate memory for the sumMemory array
 */
void initializeSumMemory(unsigned int nb_elements, unsigned long target)
{
    sumMemory = (int **)malloc((nb_elements + 1) * sizeof(int *));
    for (int i = 0; i <= nb_elements; ++i)
    {
        sumMemory[i] = (int *)malloc((target + 1) * sizeof(int));
        for (int j = 0; j <= target; ++j)
        {
            sumMemory[i][j] = UNSET_VALUE;
        }
    }
}


/**
 * Deallocate memory for the sumMemory array
 */
void releaseSumMemory(int nb_elements)
{
    for (int i = 0; i <= nb_elements; ++i)
    {
        free(sumMemory[i]);
    }
    free(sumMemory);
}


void printSumMemory(unsigned int n, unsigned long target, unsigned long * a){
    for(int i=0; i<n ; i++){
        for(int j=0; j<=target ; j++){
            if(sumMemory[i][j]==1){
                printf("✅");
            }
            else if(sumMemory[i][j]==UNSET_VALUE){
                printf("🆕");
            }
            else printf("❌");
            if(j==target)printf(" %li ", a[i]);
        }
        printf("\n");
    }
}

/**
 * @brief 
 * The memoization process creates a  2D array that contains a solution subset.
 * This method reads this 2D array and stores the solution subset into a 1D array and returns the processed sum.
 * @param solution a 1D boolean array where the true cells indexes compose the found solution
 * @param a the input array that was given for the memoization process. 
 * @param n the size of a.
 * @return the processed sum from the solution array
*/
unsigned long processSubset(unsigned int * solution, unsigned long * a,unsigned int n, unsigned long target){
    // Initialising solution array
    for(int i=0; i<n ; i++){
        solution[i]=0;
    }

    long current_target = target;
    long current_size = n;

    // Iterating over the sumMemory array to retrieve the solution
    while(current_target>0 && current_size>0){
        if(sumMemory[current_size-1][current_target]==1){
            current_size-=1;
            if(current_size==0){
                solution[current_size] = true;
            }
        }
        else{
            if(current_size<n && sumMemory[current_size][current_target]==1){
                solution[current_size] = true;
            }
            if(a[current_size]==0){
                current_target-=1;
            }
            else {
                current_target-= a[current_size];
            }

        }
    }
    
    // Processing the sum associated to the solution array.
    unsigned long result = 0;
    for(int i=0; i<n ; i++){
        if(solution[i]) {
            result+= a[i];
        }
    }
    return result;
}

/**
 * Initial version of memoization
 * @param a an array of integers
 * @param n the number of elements from a to consider
 * @param target the value to find
 */
bool memoization_sequential_recursive(long unsigned  * a, unsigned int n, unsigned long target)
{
    // No element can be considered to find target
    if (n <= 0) return false;

    // The value has already been processed.
    if (sumMemory[n - 1][target] != UNSET_VALUE) return sumMemory[n - 1][target];

    else
    {
        bool ignore_current, consider_current;
        
        // The current element to consider is the target
        consider_current = a[n - 1] == target;

        // The current value is ignored
        if(!consider_current) ignore_current = memoization_sequential_recursive(a, n - 1, target);

        // Considering the current value helps to find a a sum that creates target. 
        if(!ignore_current && !consider_current && a[n - 1] <= target)  {
            consider_current = memoization_sequential_recursive(a, n - 1, target - a[n - 1]);
        }

        sumMemory[n - 1][target] = ignore_current || consider_current;

        return sumMemory[n - 1][target];
    }
}



bool memoization_sequential_iterative(long unsigned  * a, unsigned int n, unsigned long target){
    if(n==0)return false;
    
    // iterations on each element of a
    for(int i=0; i < n ; i++){
        // iterations over each value that may compose target
        for(int j=0; j<=target ; j++){
            // We say a value is found if it is possible to create a subset
            bool found_value = false; 
            if(a[i]==j){
                found_value = true;
            }
            if(i>0){ 
                 //  look at previous values and check if they answer the search
                if(a[i]> target) found_value = found_value || sumMemory[i-1][j];
                else {
                    // ignore current
                    found_value = found_value || sumMemory[i-1][j];
                    if ((long)(j - a[i]) >= 0){
                        // consider current 
                        found_value = found_value || sumMemory[i-1][j - a[i]];
                    }
                }
            }
            sumMemory[i][j] = found_value;
        }
    }
    // the target has never been found in a subset of values of a.
    return sumMemory[n-1][target];
}



bool memoization_parallel_iterative(long unsigned  * a, unsigned int n, unsigned long target){
    if(n==0)return false;

    int i, j = 0;

    // iterations on each element of a
    for(i=0; i < n ; i++){
        // iterations over each value that may compose target
        #pragma omp parallel for private(j) num_threads(NUM_THREADS)
        for(j=0; j<=target ; j++){
            // We say a value is found if it is possible to create a subset
            bool found_value = false; 
            if(a[i]==j){
                found_value = true;
            }
            if(i>0){ 
                 //  look at previous values and check if they answer the search
                if(a[i]> target) found_value = found_value || sumMemory[i-1][j];
                else {
                    // ignore current
                    found_value = found_value || sumMemory[i-1][j];
                    if ((long)(j - a[i]) >= 0){
                        // consider current 
                        found_value = found_value || sumMemory[i-1][j - a[i]];
                    }
                }
            }
            // We store the new value in the sumMemory array. Do not need to use a critical section because each thread has its own j value. Moreover, adding a critical section would ruin the parallelization.
            sumMemory[i][j] = found_value;
        }
    }
    // the target has never been found in a subset of values of a.
    return sumMemory[n-1][target];
}