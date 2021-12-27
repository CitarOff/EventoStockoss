"use strict";
exports.__esModule = true;
// Importation des librairies
var fs = require("fs");
// Déclaration des variables
var myFile = fs.readFileSync('./numbers.txt').toString().split("\n");
var gamma = "";
var epsilon = "";
var Dgamma;
var Depsilon;
var _loop_1 = function (index) {
    var nbF = 0;
    var nbT = 0;
    myFile.forEach(function (element) {
        if (element[index] == "0") {
            nbF++;
        }
        else {
            nbT++;
        }
    });
    // Si plus de 0 ou plus de 1
    if (nbF > nbT) {
        // On ajoute
        gamma += '0';
        epsilon += '1';
    }
    else {
        // On ajoute
        gamma += '1';
        epsilon += '0';
    }
};
// On boucle le tableau élément par élément et on compte
for (var index = 0; index < 12; index++) {
    _loop_1(index);
}
// On affiche pour test
console.log(gamma);
console.log(epsilon);
// On convertie en décimal 
Dgamma = parseInt(gamma, 2);
Depsilon = parseInt(epsilon, 2);
// On affiche le résultat
console.log(Dgamma * Depsilon);
