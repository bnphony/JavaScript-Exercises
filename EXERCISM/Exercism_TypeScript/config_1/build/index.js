"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const app1_1 = require("./app1");
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!!!');
    res.end();
});
server.listen(3000, () => console.log(`Server on port ${3000}`));
// TODO: Desde aqui van los ejercicios de TypeScript
// ? Ejercicio 1) Calcular la edad en diferentes planetas
const planetTime = {
    'mercury': 0.2408467, 'venus': 0.61519726, 'earth': 1,
    'mars': 1.8808158, 'jupiter': 11.862615, 'saturn': 29.447498,
    'uranus': 84.016846, 'neptune': 164.79132
};
const EARTHDAYS = 365.25;
function age(planet, seconds) {
    let hours = seconds / 3600;
    let days = hours / 24;
    let years = days / (EARTHDAYS * planetTime[planet]);
    console.log(`days: ${days}, years: ${years}`);
    return +years.toFixed(2);
}
// ? *** Fin Ejercicio 1 ***
// ? *** EJERCICIO 2: 4 dados y 6 skils ***
/*
 * 1) Tienes 6 habilidades, el puntaje de cada una se determina
 *   lanzando 4 dados, se suman los 3 valores maximos
 * 2) Hitpoints: Math.floor((Habilidad Constitucion - 10) / 2)

*/
for (let i = 0; i < 20; i++) {
    // console.log(randomnumber)
}
function generateAbilityScore() {
    let diceNumbers = [];
    for (let i = 0; i < 4; i++) {
        let randomnumber = Math.floor(1 + Math.random() * 6);
        diceNumbers.push(randomnumber);
    }
    console.log(diceNumbers);
    let total = diceNumbers
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((acc, item) => acc + item, 0);
    console.log(total);
    return total;
}
// generateAbilityScore()
function getModifierFor(abilityValue) {
    return Math.floor((abilityValue - 10) / 2) + 10;
}
// console.log(getModifierFor(3))
// ? *** FIN EJERCICIO 2 ***
// ? *** EJERCICIO 3: DARDOS ***
/*
    * Circulo de 10 Unidades -> 1 punto
    * Circulo de 5 Unidades -> 5 puntos
    * Circulo de 1 unidad  -> 10 puntos

*/
function darts(x, y) {
    let point = Math.sqrt(x ** 2 + y ** 2);
    let result = 0;
    if (point <= 1) {
        result = 10;
    }
    else if (point > 1 && point <= 5) {
        result = 5;
    }
    else if (point > 5 && point <= 10) {
        result = 1;
    }
    return result;
}
// ? *** FIN EJERCICIO 3 ***
// ? *** EJERCICIO 4: PANGRAM ***
function isPangram(text) {
    text = text.toLowerCase();
    const alphabet = [];
    for (let i = 97; i < 123; i++) {
        alphabet.push(String.fromCharCode(i));
    }
    let result = alphabet.every(letter => text.includes(letter));
    return result;
}
// console.log(isPangram("The quick brown fox jumps over he lazy dog."))
// console.log([false, false, false].every(item => item === false))
main();
function main() {
    console.log("funciona");
    // console.log(age('mercury', 2134835688));
    // TODO: Funciones del archivo APP1.ts
    (0, app1_1.mainApp1)();
}
