import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir)) {
    if (['node_modules', '.git'].includes(entry)) continue;
    const full = join(dir, entry);
    const info = await stat(full);
    if (info.isDirectory()) await walk(full);
    else if (entry.endsWith('.html') && !entry.startsWith('google')) htmlFiles.push(full);
  }
}

await walk(root);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const label = relative(root, file);
  const required = ['<title>', 'meta name="description"', 'rel="canonical"', '<h1', 'application/ld+json'];
  for (const item of required) if (!html.includes(item)) errors.push(`${label}: falta ${item}`);
  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${label}: contiene ${h1Count} H1`);
  if (html.includes('cdn.tailwindcss.com')) errors.push(`${label}: utiliza Tailwind CDN`);
  if (html.includes('AI Arbitrage Bot')) errors.push(`${label}: conserva contenido ajeno`);

  const localRefs = [...html.matchAll(/(?:href|src)="(\/[^"]+)"/g)].map((match) => match[1]);
  for (const ref of localRefs) {
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean || clean === '/') continue;
    const target = extname(clean)
      ? join(root, clean.slice(1))
      : join(root, clean.slice(1), 'index.html');
    try { await stat(target); } catch { errors.push(`${label}: referencia inexistente ${ref}`); }
  }
}

const requiredFiles = [
  'index.html', 'sitemap.xml', 'robots.txt', '404.html', 'CNAME',
  'assets/css/styles.css', 'assets/js/main.js', 'data/site.json'
];
for (const item of requiredFiles) {
  try { await stat(join(root, item)); } catch { errors.push(`Falta archivo requerido: ${item}`); }
}

if (htmlFiles.length < 25) errors.push(`Solo se generaron ${htmlFiles.length} páginas HTML`);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validación correcta: ${htmlFiles.length} páginas HTML, metadatos y archivos esenciales presentes.`);
