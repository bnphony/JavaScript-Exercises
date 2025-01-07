const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.'

async function ls (folder) {
    let files
    try {
        files = await fs.readdir(folder)
    } catch {
        console.error(pc.red(`Error al leer el directorio ${folder}`));
        process.exit(1)
    }

    const filesPromises = files.map(async file => {
        const filePath = path.join(folder, file);
        let stats
        try {
            stats = await fs.stat(filePath) // status - informacion del archivo
        } catch {
            console.error(`No se pudo leer el archivo ${filePath}`);
            process.exit(1)
        }

        const isDirectory = stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f' // d: directorio, -: archivo
        const fileSize = stats.size.toString() // tamaño del archivo
        const fileModified = stats.mtime.toLocaleString()  // fecha de modificacion

        return `${pc.bgCyan(fileType.padEnd(3))} ${pc.blue(file.padEnd(20))} ${pc.green(fileSize.padStart(10))} ${pc.yellow(fileModified)}`
    })
    const filesInfo = await Promise.all(filesPromises)

    filesInfo.forEach(fileInfo => console.log(fileInfo))
    
}

ls(folder)