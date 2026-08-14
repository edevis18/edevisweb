import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  renderHome,
  renderSolutionPage,
  renderBlogIndex,
  renderPost,
  renderPortfolio,
  renderCases,
  renderDabarCase,
  renderPricing,
  renderAbout,
  renderContact,
  renderLegal,
  render404
} from '../src/render.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = async (name) => JSON.parse(await readFile(join(root, 'data', name), 'utf8'));

const [site, navigation, footerData, pages, posts, portfolio, testimonials] = await Promise.all([
  load('site.json'),
  load('navigation.json'),
  load('footer.json'),
  load('pages.json'),
  load('posts.json'),
  load('portfolio.json'),
  load('testimonials.json')
]);

const ctx = { site, navigation, footerData, pages, posts, portfolio, testimonials };

async function writeRoute(path, html) {
  const destination = path === '/'
    ? join(root, 'index.html')
    : path.endsWith('.html')
      ? join(root, path.slice(1))
      : join(root, path.slice(1), 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, html, 'utf8');
}

await writeRoute('/', renderHome(ctx));
for (const page of pages) await writeRoute(page.path, renderSolutionPage(ctx, page));
await writeRoute('/precios-landing-page/', renderPricing(ctx));
await writeRoute('/portafolio/', renderPortfolio(ctx));
await writeRoute('/casos-de-exito/', renderCases(ctx));
await writeRoute('/casos-de-exito/dabar-landing-page-ebooks/', renderDabarCase(ctx));
await writeRoute('/sobre-mi/', renderAbout(ctx));
await writeRoute('/contacto/', renderContact(ctx));
await writeRoute('/blog/', renderBlogIndex(ctx));
for (const post of posts) await writeRoute(`/blog/${post.slug}/`, renderPost(ctx, post));
await writeRoute('/politica-de-privacidad/', renderLegal(ctx, 'privacy'));
await writeRoute('/terminos-de-servicio/', renderLegal(ctx, 'terms'));
await writeRoute('/404.html', render404(ctx));

const routePaths = [
  '/',
  ...pages.map((page) => page.path),
  '/precios-landing-page/',
  '/portafolio/',
  '/casos-de-exito/',
  '/casos-de-exito/dabar-landing-page-ebooks/',
  '/sobre-mi/',
  '/contacto/',
  '/blog/',
  ...posts.map((post) => `/blog/${post.slug}/`),
  '/politica-de-privacidad/',
  '/terminos-de-servicio/'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routePaths.map((path) => `  <url><loc>${site.siteUrl}${path}</loc><lastmod>2026-08-13</lastmod></url>`).join('\n')}
</urlset>\n`;
await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`, 'utf8');

const manifest = {
  name: 'Edevis Raga — Landing Pages Profesionales',
  short_name: 'Edevis Raga',
  start_url: '/',
  display: 'standalone',
  background_color: '#090b10',
  theme_color: '#090b10',
  lang: 'es',
  icons: [{ src: '/assets/images/favicon.png', sizes: '64x64', type: 'image/png' }]
};
await writeFile(join(root, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

console.log(`Sitio generado: ${routePaths.length} URLs indexables.`);
