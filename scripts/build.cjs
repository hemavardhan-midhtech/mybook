// Dependency-free release preparation. Keep authored CSS files editable.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const sheets = ['styles.css','refinement.css','cinematic.css','final-polish.css','reading-book.css','author-site.css','interactions.css'];
const css = sheets.map(name => `/* Source: ${name} */\n${fs.readFileSync(path.join(root,name),'utf8')}`).join('\n');
const hash = crypto.createHash('sha256').update(css).digest('hex').slice(0,12);
fs.writeFileSync(path.join(root,'site.css'), css);
let html = fs.readFileSync(path.join(root,'index.html'),'utf8');
let first = true;
html = html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, () => {
  if (!first) return '';
  first = false; return `<link rel="stylesheet" href="./site.css?v=${hash}">`;
});
if (first) throw new Error('No stylesheet link found');
const missing = [];
for (const match of html.matchAll(/(?:src|href)="\.\/([^"?#]+)(?:[?#][^"]*)?"/g)) {
  if (!fs.existsSync(path.join(root,match[1]))) missing.push(match[1]);
}
if (missing.length) throw new Error(`Missing public files: ${missing.join(', ')}`);
fs.writeFileSync(path.join(root,'index.html'),html);
console.log(`Built site.css (${Buffer.byteLength(css)} bytes); validated local HTML assets.`);
