// * QUE ES TYPESCRIPT ?
/* 
- Lenguage de Programación
- Superset de JavaScript
- Añade tipos al lenguaje
*/

let persona = "Bryan";

let objeto1 = {
    nombre: "bryan",
    edad: 20
};

function funcion1() : string {
    return "hola";
}

let array1 = ["item1", "item2", "item3"]
array1.forEach(item => {
    console.log(item);
})

let ann : number | string;
ann = 'string';
ann = 1;

type PowerScale = 'normal' | 'fuerte'
let power : PowerScale;
power = 'fuerte'

// ❌ poner errores con iconos



/*
    INTERFACES
*/

interface Producto {
    id: number
    nombre: string
    precio: number
    saludar: () => void
}

interface CarritoDeCompras {
    cantidad: number
    productos: Producto[]
}

const compra: CarritoDeCompras = {
    cantidad: 10,
    productos: [
        {
            id: 1,
            nombre: 'como',
            precio: 39,
            saludar: () => console.log('hola')
        }
    ]
}

function twoFer(name: string): string {

    if (name !== '' && typeof name === 'string') {
      return `One for ${name}, one for me`;
    }
    return `One for you, one for me`;
}

function colors3(colors: string[]) {
        let total: string = '';
        
        colors.forEach((color, index) => {
            if (index === 3) {
                total += '0'.repeat(COLORS.indexOf(color))
            } else {
                total += `${COLORS.indexOf(color)}`
            }
        });
        let intTotal: number = parseInt(total);
        if (intTotal >= 10**3 && intTotal < 10**6) {
            intTotal /= 10 ** 3
            total = `${intTotal} kiloohms`
            // Kilo
        } else if (intTotal >= 10**6 && intTotal < 10**9) {
            intTotal /= 10 ** 6
            total = `${intTotal} kiloohms`
            // Mega
        } else if (intTotal >= 10**9 && intTotal < 10**12) {
            // Giga
            intTotal /= 10 ** 9
            total = `${intTotal} kiloohms`
        }
        return total
}

const COLORS: string[] = [
    'black', 'brown', 'red', 'orange', 'yellow',
    'green', 'blue', 'violet', 'grey', 'white'
]



  