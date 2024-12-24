const fs = require('node:fs/promises');

// Tomar el segundo argumento como directorio o sino por defecto 
// usar el directorio actual
const folder  = process.argv[2] ?? '.';

fs.readdir(folder)
.then(files => {
    files.forEach(file => console.log(file))
})
.catch(err => {
    console.error('Error al leer el directorio', err);
    return;
});