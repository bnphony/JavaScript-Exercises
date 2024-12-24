console.log("Hola Mundo!");
import { platform, version, arch, cpus, freemem, totalmem, uptime } from 'node:os';

console.log('Información del sistema operativo: ');
console.log('-------------------------------------');
console.log('Plataforma: ' + platform());
console.log('Versión del SO: ' + version());
console.log('Arquitectura del SO: ' + arch());
console.log('CPUs: ' + cpus().length);
console.log("Memoria libre: ", freemem() / 1024 /1024);
console.log("Memoria total: ", totalmem() / 1024 /1024);
console.log("Tiempo Encendido: ", uptime() / 60 / 60);