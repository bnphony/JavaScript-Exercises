"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp1 = mainApp1;
// ? EJERCICIO 6: BOB 
/*
    * Pregunta normal, sin solo numeros, o solo mayusculas -> "Sure."
    * Solo mayusculas, no solo numeros  -> "Whoa, chill out!"
    * Pregunta solo mayusculas, no solo numeros -> "Calm down, I know what I'm doing!"
    * ""  -> "Fine, Be that way!"
    * Calquier otro caso -> "Whatever."
*/
const RESPONSES = {
    'question': 'Sure.',
    'yelling': 'Whoa, chill out!',
    'yelling_question': "Calm donw, I know what I'm doing!",
    'silence': "Fine, Be that way!",
    'anything': "Whatever."
};
function bob(text) {
    text = text.trim();
    let response = '';
    let pattern = /[a-zA-Z]+/;
    let checkString = text.match(pattern);
    switch (true) {
        case text.toUpperCase() === text && text.endsWith('?') && checkString !== null:
            response = RESPONSES['yelling_question'];
            break;
        case text.toUpperCase() === text && checkString !== null:
            response = RESPONSES['yelling'];
            break;
        case text.endsWith('?') && checkString !== null:
            response = RESPONSES['question'];
            break;
        case text === "":
            response = RESPONSES['silence'];
            break;
        default:
            response = RESPONSES['anything'];
            break;
    }
    return response;
}
// ! *** Fin ejercicio 6 ***
// ? EJERCICIO 7: CONTAR PALABRAS
/*
 * Palabras simples, contraciones, numeros, no se diferente por mayuscula/minuscula, signos de puntuacion normales
 * no se toma en cuenta, las palabras se pueden separar no solo por ESPACIOS
 * EJEMPLO: "That's the password: 'PASSWORD 123'!", cried the Special Agent.\nSo I fled.
 *      123: 1
 *      agent: 1
 *      cried: 1
 *      fled: 1
 *      i: 1
 *      password: 2
 *      so: 1
 *      special: 1
 *      that's: 1
 *      the: 2
 * */
function contarPalabras(text) {
    const contador = new Map();
    text = text.toLowerCase().trim();
    let regx = new RegExp("[\n\t\r]+", 'g');
    text = text.replace(regx, " ");
    let text_array = text.split(/[-_, ]+/);
    console.log("TESXT: ", text_array);
    text_array.forEach(word => {
        let cleanWord = word.replace(/^[^a-z0-9]+|[^a-z0-9]+$/gmi, "");
        if (cleanWord) {
            contador.set(cleanWord, (contador.get(cleanWord) || 0) + 1);
        }
    });
    console.log(contador);
    return contador;
}
// ! *** Fin Ejercicio 7 ***
// ? EJERCICIO 8: Diferencia entre el cuadrado de la suma de N numeros y la suma de los cuadros de N numeros
/**
 * Cuadrado de la Suma de 5: (1 + 2 + 3 + 4 + 5)^2
 * Suma de los cuadrados de 5: 1^2 + 2^2 + 3^2 + 4^2 + 5^2
 */
class Squares {
    constructor(count) {
        this.sumSquares = 0;
        this.squareSum = 0;
        this.count = count;
    }
    get sumOfSquares() {
        for (let i = 1; i <= this.count; i++) {
            this.sumSquares += i ** 2;
        }
        return this.sumSquares;
    }
    get squareOfSum() {
        for (let i = 1; i <= this.count; i++) {
            this.squareSum += i;
        }
        this.squareSum **= 2;
        return this.squareSum;
    }
    get difference() {
        console.log(`${this.squareSum}, ${this.sumSquares}`);
        return this.squareSum - this.sumSquares;
    }
}
// ! *** FIN EJERCICIO 8 ***
// ? *** EJERCIcio 9: GIGA SECOND ***
/**
 * Input -> seconds: int
 * Input -> fecha: date
 * Output: Nueva fecha sumada los segundos ingresados
 */
function gigaSecond(date, seconds) {
    let newDate = new Date(date.getTime() + seconds);
    return newDate;
}
// ! *** FIN EJERCICIO 9 ***
// ? *** EJERCICIO 10: Revertir un string *** 
function revertirString(text) {
    let array_text = text.trim().split("");
    let reverse = [];
    for (let i = array_text.length - 1; i >= 0; i--) {
        reverse.push(array_text[i]);
    }
    return reverse.join("");
}
// ! *** FIN EJERCICIO 10 ***
// ? *** EJERCICIO 11: Tipo de Triangulo **
/**
 * Equilatero: los tres lados iguales
 * Isosceles: dos lados iguales
 * Scaleno: los tres lados NO iguales
 */
class Triangle {
    constructor(...sides) {
        this.setNumbers = new Set();
        if (sides.length !== 3) {
            throw new Error('The sides must be equal to 3');
        }
        if (!sides.every(item => item > 0)) {
            throw new Error('All sides must be greater than 0');
        }
        let orderedSides = sides.sort();
        console.log(orderedSides);
        if (orderedSides[0] + orderedSides[1] < orderedSides[2]) {
            throw new Error('The sum of two sides must be greater than the other side');
        }
        this.setNumbers.add(orderedSides[0]);
        this.setNumbers.add(orderedSides[1]);
        this.setNumbers.add(orderedSides[2]);
    }
    get isEquilateral() {
        if (this.setNumbers.size === 1) {
            return true;
        }
        return false;
    }
    get isIsosceles() {
        console.log(this.setNumbers.size);
        if ([1, 2].includes(this.setNumbers.size)) {
            return true;
        }
        return false;
    }
    get isScalene() {
        if (this.setNumbers.size === 3) {
            return true;
        }
        return false;
    }
}
function mainApp1() {
    // * BOB
    // console.log(bob("  "))    
    // * Contar Palabras
    // contarPalabras(`,\n,one,\n ,two \n 'three'`)
    // * SumOfSquares VS SquareOfSum
    // const sqaure = new Squares(5)
    // console.log(sqaure.squareOfSum)
    // console.log(sqaure.sumOfSquares)
    // console.log(sqaure.difference)
    // * GigaSeconds
    // let hoy = new Date();
    // gigaSecond(hoy, 10 ** 9);
    // * Revertir String
    // console.log(revertirString("bryan"))
    // * Comprobar que tipo de triangulo es?
    const triangulo = new Triangle(3, 4, 4);
    console.log(triangulo.isEquilateral);
    console.log(triangulo.isIsosceles);
    console.log(triangulo.isScalene);
}
