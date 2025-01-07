const fs = require('node:fs/promises');
// Codigo asincrono, utilizando import Common JS
// NOTA: este archivo no utiliza el formato .mjs

// Forma #1 de IIFE -> Funciones creadas e inmediatamente ejecutadas
// ( async () => {
//     const text = await fs.readFile('./file1.txt', 'utf-8');
//     console.log(text);
// })();

// Forma #2 de IIFE -> Funciones asincronas normales

async function readFiles() {
    const text = await fs.readFile('./file1.txt', 'utf-8');
    console.log(text);
}
readFiles();