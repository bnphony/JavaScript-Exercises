const fs = require('node:fs/promises');


// Leer un archivo
//  readFileSync(<path>, <encoding>) -> Sin el encoding, se obtiene un buffer de bits
console.log('Leyendo el primer archivo ...');
fs.readFile('./file1.txt', 'utf-8')
    .then(text => {
        console.log(text);
    })
    .catch(err => {
        console.log(err);
    });

console.log("Haciendo otras tareas mientras ...")

console.log('Leyendo el segundo archivo ...');
const secondText = fs.readFile('./file2.txt', 'utf-8')
    .then(text => {
        console.log(text);
    })
    .catch(err => {
        console.log(err);
    });