// Run with: node scripts/check-site.cjs
// Dependency-free checks for common publishing errors; browser QA is still required.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const file = name => fs.readFileSync(path.join(root, name), 'utf8');
const html = file('index.html');
const reader = file('reading-book.js');
const css = file('site.css');
const ids = [...html.matchAll(/\\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(new Set(ids).size, ids.length, 'Duplicate HTML IDs');
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
  assert(ids.includes(match[1]), `Missing anchor target: #${match[1]}`);
}
for (const match of html.matchAll(/(?:src|href)="\\.\\/([^"?#]+)(?:[?#][^"]*)?"/g)) {
  assert(fs.existsSync(path.join(root, match[1])), `Missing local file: ${match[1]}`);
}
assert(html.includes('<h1>The Road<br>Back to <em>Myself</em></h1>'), 'Hero title must match the book title');
assert(html.includes('978-93-345-7669-6'), 'Paperback ISBN is missing');
assert(html.includes('https://hemavardhan-midhtech.github.io/mybook/assets/front-cover.jpg'), 'Sharing image is missing');
assert(html.includes('Purchase Links Coming Soon'), 'Unverified availability language');
assert(reader.includes('Preview panel ${index + 1} of ${pages.length}'), 'Preview label should not imply novel page numbers');
assert(reader.includes('reading-previous') && reader.includes('reading-next'), 'Reader navigation controls are missing');
assert(css.includes('.reading-page-actions'), 'Built CSS is missing reader navigation styles');
for (const name of ['script.js','books.js','reading-book.js','interactions.js']) {
  assert(fs.existsSync(path.join(root, name)), `Missing JavaScript: ${name}`);
}
console.log('PASS — internal links, assets, title, ISBN, social metadata and reader controls');
