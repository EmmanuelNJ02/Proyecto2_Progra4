import fs from 'fs';
import path from 'path';
const root = process.cwd();
const out = path.resolve(root, '../backend/src/main/resources/static');
fs.mkdirSync(path.join(out, 'assets'), { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), `<!doctype html>\n<html lang="es">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>BolsaEmpleo</title>\n  <link rel="stylesheet" href="/assets/app.css" />\n</head>\n<body>\n  <div id="app"></div>\n  <script src="/assets/app.js"></script>\n</body>\n</html>\n`);
fs.copyFileSync(path.join(root, 'src/shared/styles/app.css'), path.join(out, 'assets/app.css'));
fs.copyFileSync(path.join(root, 'src/app/App.jsx'), path.join(out, 'assets/app.js'));
console.log('Frontend copiado al backend.');
