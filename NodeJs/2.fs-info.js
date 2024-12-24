const fs = require('node:fs');


// Conseguir informacion de un fichero
const stats = fs.statSync('./file1.txt')

// console.log(stats.isFile(), stats.isDirectory(),
// stats.isSymbolicLink(), stats.size);

// Leer un archivo
//  readFileSync(<path>, <encoding>) -> Sin el encoding, se obtiene un buffer de bits
console.log('Leyendo el primer archivo ...');
fs.readFile('./file1.txt', 'utf-8', (err, text) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(text);
});

console.log("Haciendo otras tareas mientras ...")

console.log('Leyendo el segundo archivo ...');
const secondText = fs.readFile('./file2.txt', 'utf-8', (err, text) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(text);
});