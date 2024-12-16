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
