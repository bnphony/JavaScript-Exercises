import {readFile}  from 'node:fs/promises';
// OJO: Para que funcione debe ser un modulo .mjs

const text = await readFile('./file1.txt', 'utf-8')
console.log(text);