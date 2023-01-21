#!/bin/bash

# Ce script permet d'éxécuter un fichier while.

# Déclaration des variables
a=0
t=0
c=0
r=0
p=0
e=0

# Traitement des options
while getopts "atcpreh" opt; do

    case $opt in
        a)
            a=1
            ;;
        t)
            t=1
            ;;
        c)
            c=1
            ;;
        r)
            r=1
            e=1
            ;;
        p)
            p=1
            ;;
        e)
            e=1
            ;;
        h)
            echo "Ce script permet d'éxécuter un fichier while."
            echo "Usage : $0 [-a] [-t] [-c] [-r] [-p] [-e] fichier"
            echo "-a : Affiche l'AST"
            echo "-t : Affiche la table des symboles"
            echo "-c : Affiche le code intermédiaire"
            echo "-r : N'éxecute pas le programme ; Active -e"
            echo "-p : Ne supprime pas le code intermédiaire C++"
            echo "-e : Ne supprime pas l'exécutable"
            exit 0
            ;;
        \?)
            echo "Usage : $0 [-a] [-t] [-c] [-r] [-p] [-e] fichier_while"
            echo "Pour plus d'informations, consulter le manuel : $0 -h"
            exit 0
            ;;
    esac
done

# Permet de ne pas prendre en compte les options dans le traitement des arguments
shift $((OPTIND-1))

# Vérifie que le fichier existe
if [ ! -f $1 ]
then
    echo "File $1 not found."
else
    # Vérifie que le fichier est un fichier while
    if [[ ! $1 == *.while ]]
    then
        echo "File $1 is not a while file."
    else

        # Compilation du fichier while
        java --enable-preview -jar while_compiler.jar $1 $a $t $c

        # Compilation du code intermédiaire C++
        g++ -o program program.cpp

        # Exécution du programme
        if [ $r == 0 ]
        then
            ./program
        fi

        # Suppression du code C++
        if [ $p == 0 ]
        then
            rm program.cpp
        fi

        # Suppression de l'exécutable
        if [ $e == 0 ]
        then
            rm program
        fi
        
    fi
fi