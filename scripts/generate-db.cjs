const fs = require('fs');
const path = require('path');

const gameDPath = path.join(__dirname, '../public/gameD');
const outputPath = path.join(__dirname, '../public/database.json');

function scanGames() {
    const games = [];
    if (!fs.existsSync(gameDPath)) {
        console.error("No existe la carpeta public/gameD/");
        return;
    }

    const folders = fs.readdirSync(gameDPath);

    folders.forEach(folder => {
        const fullPath = path.join(gameDPath, folder);
        if (fs.statSync(fullPath).isDirectory()) {
            const files = fs.readdirSync(fullPath);
            
            const zipFile = files.find(f => f.endsWith('.zip'));
            const readmeFile = files.find(f => f.toLowerCase() === 'read.me');
            const iconFile = files.find(f => f.toLowerCase() === 'icon.png' || f.toLowerCase() === 'icon.jpg');

            const id = zipFile ? path.basename(zipFile, '.zip') : 'unknown';
            const description = readmeFile ? fs.readFileSync(path.join(fullPath, readmeFile), 'utf8') : 'Sin descripción disponible.';
            const stats = fs.statSync(fullPath);

            games.push({
                name: folder,
                id: id,
                description: description,
                // Rutas relativas simples para máxima compatibilidad
                icon: iconFile ? `gameD/${folder}/${iconFile}` : null,
                downloadUrl: zipFile ? `gameD/${folder}/${zipFile}` : null,
                updatedAt: stats.mtime.getTime()
            });
        }
    });

    games.sort((a, b) => b.updatedAt - a.updatedAt);

    fs.writeFileSync(outputPath, JSON.stringify(games, null, 2));
    console.log(`Base de datos generada con ${games.length} juegos.`);
}

scanGames();
