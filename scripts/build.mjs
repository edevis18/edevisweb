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
  renderCoursesHub,
  renderCourse,
  renderAdditionalServicesHub,
  renderAdditionalService,
  renderLegal,
  render404
} from '../src/render.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const load = async (name) => JSON.parse(await readFile(join(root, 'data', name), 'utf8'));

const [site, navigation, footerData, pages, posts, portfolio, testimonials, offerings] = await Promise.all([
  load('site.json'),
  load('navigation.json'),
  load('footer.json'),
  load('pages.json'),
  load('posts.json'),
  load('portfolio.json'),
  load('testimonials.json'),
  load('offerings.json')
]);

const ctx = { site, navigation, footerData, pages, posts, portfolio, testimonials };

const legacyBlogRedirects = {
  'como-vender-ebook-con-landing-page': '/blog/que-debe-tener-landing-page-para-captar-clientes/',
  'landing-page-bilingue-cuando-es-necesaria': '/blog/landing-page-o-pagina-web-cual-necesita-mi-negocio/',
  'informacion-para-contratar-landing-page': '/blog/cuanto-cuesta-crear-landing-page-profesional/',
  'landing-page-para-medicos-elementos-imprescindibles': '/blog/que-debe-tener-landing-page-para-captar-clientes/',
  'cuanto-tarda-desarrollo-landing-page': '/blog/cuanto-cuesta-crear-landing-page-profesional/',
  'errores-que-landing-page-no-convierta': '/blog/que-debe-tener-landing-page-para-captar-clientes/',
  'como-crear-landing-page-para-vender-servicios': '/blog/que-debe-tener-landing-page-para-captar-clientes/',
  'landing-page-para-whatsapp-estructura-ejemplos': '/blog/que-debe-tener-landing-page-para-captar-clientes/',
  'ejemplos-landing-pages-para-profesionales': '/blog/landing-page-o-pagina-web-cual-necesita-mi-negocio/'
};

function legacyRedirectHtml(fromSlug, targetPath) {
  const fromUrl = `${site.siteUrl}/blog/${fromSlug}/`;
  const targetUrl = `${site.siteUrl}${targetPath}`;
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Contenido actualizado | Edevis Raga</title>
<meta name="description" content="Este artículo fue consolidado en una guía más completa y actualizada.">
<meta name="robots" content="noindex,follow"><link rel="canonical" href="${targetUrl}"><meta http-equiv="refresh" content="0;url=${targetPath}">
<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'WebPage',url:fromUrl,isPartOf:{'@id':`${site.siteUrl}/#website`}})}</script>
</head><body><main><h1>Este contenido ahora forma parte de una guía más completa</h1><p>He consolidado este artículo para evitar contenido repetido y mantener una sola guía de mayor valor.</p><p><a href="${targetPath}">Ir a la guía actualizada</a></p></main></body></html>`;
}

function relativePrefix(path) {
  if (path === '/' || path.endsWith('.html')) return path === '/' ? './' : './';
  const depth = path.split('/').filter(Boolean).length;
  return '../'.repeat(depth);
}

function makeLocalPathsRelative(html, path) {
  const prefix = relativePrefix(path);
  const convert = (value) => {
    if (!value.startsWith('/')) return value;
    if (value === '/') return prefix;
    return prefix + value.slice(1);
  };
  return html
    .replace(/(href|src|action)="(\/[^"]*)"/g, (_, attr, value) => `${attr}="${convert(value)}"`)
    .replace(/(content="0;url=)(\/[^"]*)"/g, (_, start, value) => `${start}${convert(value)}"`);
}

async function writeRoute(path, html) {
  const destination = path === '/'
    ? join(root, 'index.html')
    : path.endsWith('.html')
      ? join(root, path.slice(1))
      : join(root, path.slice(1), 'index.html');
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, makeLocalPathsRelative(html, path), 'utf8');
}

await writeRoute('/', renderHome(ctx));
for (const page of pages) await writeRoute(page.path, renderSolutionPage(ctx, page));
await writeRoute('/precios-landing-page/', renderPricing(ctx));
await writeRoute('/portafolio/', renderPortfolio(ctx));
await writeRoute('/casos-de-exito/', renderCases(ctx));
await writeRoute('/casos-de-exito/dabar-landing-page-ebooks/', renderDabarCase(ctx));
await writeRoute('/sobre-mi/', renderAbout(ctx));
await writeRoute('/contacto/', renderContact(ctx));
await writeRoute('/cursos-gratis/', renderCoursesHub(ctx, offerings.courses));
for (const course of offerings.courses) await writeRoute(`/cursos-gratis/${course.slug}/`, renderCourse(ctx, course));
await writeRoute('/servicios-adicionales/', renderAdditionalServicesHub(ctx, offerings.services));
for (const service of offerings.services) await writeRoute(`/servicios-adicionales/${service.slug}/`, renderAdditionalService(ctx, service));
await writeRoute('/blog/', renderBlogIndex(ctx));
for (const post of posts) await writeRoute(`/blog/${post.slug}/`, renderPost(ctx, post));
for (const [slug, target] of Object.entries(legacyBlogRedirects)) await writeRoute(`/blog/${slug}/`, legacyRedirectHtml(slug, target));
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
  '/cursos-gratis/',
  ...offerings.courses.map((course) => `/cursos-gratis/${course.slug}/`),
  '/servicios-adicionales/',
  ...offerings.services.map((service) => `/servicios-adicionales/${service.slug}/`),
  '/blog/',
  ...posts.map((post) => `/blog/${post.slug}/`),
  '/politica-de-privacidad/',
  '/terminos-de-servicio/'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routePaths.map((path) => `  <url><loc>${site.siteUrl}${path}</loc><lastmod>2026-09-01</lastmod></url>`).join('\n')}
</urlset>\n`;
await writeFile(join(root, 'sitemap.xml'), sitemap, 'utf8');

await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.siteUrl}/sitemap.xml\n`, 'utf8');

const manifest = {
  name: 'Edevis Raga — Desarrollo Web, Marca y Marketing',
  short_name: 'Edevis Raga',
  start_url: './',
  display: 'standalone',
  background_color: '#ffffff',
  theme_color: '#7407b8',
  lang: 'es',
  icons: [{ src: 'assets/images/favicon.png', sizes: '64x64', type: 'image/png' }]
};
await writeFile(join(root, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2), 'utf8');

console.log(`Sitio generado: ${routePaths.length} URLs indexables.`);
