const path = require('node:path');

console.log(path.sep)

const url1 = path.join('/content', 'subfolder', 'text.txt');
console.log(url1);

const base = path.basename(url1);
console.log(base);