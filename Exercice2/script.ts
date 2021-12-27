// Importation des librairies
import fs = require('fs');

// Déclaration des variables
const myFile:Array<String> =  fs.readFileSync('./numbers.txt').toString().split("\n");

let gamma:string = "";
let epsilon:string = "";
let Dgamma:number;
let Depsilon:number;

// On boucle le tableau élément par élément et on compte
for (let index = 0; index < 12; index++) {
    let nbF = 0
    let nbT = 0

    myFile.forEach(element => {
        if(element[index] == "0") {
            nbF++
        }else{
            nbT++
        }
    });

    // Si plus de 0 ou plus de 1
    if(nbF > nbT){
        // On ajoute
        gamma += '0';
        epsilon += '1';
    } else{
        // On ajoute
        gamma += '1';
        epsilon += '0';
    }
}

// On affiche pour test
console.log(gamma)
console.log(epsilon)

// On convertie en décimal 
Dgamma = parseInt(gamma, 2);
Depsilon = parseInt(epsilon, 2);

// On affiche le résultat
console.log(Dgamma*Depsilon);