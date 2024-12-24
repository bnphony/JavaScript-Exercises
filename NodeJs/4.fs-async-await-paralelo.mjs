import { readFile } from 'node:fs/promises';
// Asincrono en paralelo

Promise.all([
    readFile('./file1.txt', 'utf-8'),
    readFile('./file2.txt', 'utf-8')
]).then(([text, secondText]) => {
    console.log(text);
    console.log(secondText);
});