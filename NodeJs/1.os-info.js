console.log("Hola Mundo!");
const os = require('node:os');

console.log('Información del sistema operativo: ');
console.log('-------------------------------------');
console.log('Plataforma: ' + os.platform());
console.log('Versión del SO: ' + os.version());
console.log('Arquitectura del SO: ' + os.arch());
console.log('CPUs: ' + os.cpus().length);
console.log("Memoria libre: ", os.freemem() / 1024 /1024);
console.log("Memoria total: ", os.totalmem() / 1024 /1024);
console.log("Tiempo Encendido: ", os.uptime() / 60 / 60);