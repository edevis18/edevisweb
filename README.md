# Edevis Raga — Marca personal y servicios digitales

Sitio estático optimizado para GitHub Pages. La versión 2026 reposiciona la página principal alrededor de la marca personal de Edevis Raga y mantiene las páginas especializadas de landing pages como activos SEO/comerciales.

## Identidad visual

- Fondo principal: `#ffffff`
- Color primario: `#7407b8`
- Color secundario: `#ffbf13`
- Sistema visual blanco-first, con morado para identidad y amarillo como acento.
- Fotografías optimizadas en WebP y sin dependencias visuales pesadas.

## Contenido editable

- `data/site.json`: identidad, contacto, redes, Analytics y datos globales.
- `data/navigation.json`: navegación principal.
- `data/footer.json`: contenido del footer.
- `data/pages.json`: páginas SEO de landing pages.
- `data/posts.json`: 3 artículos pilares del blog.
- `data/portfolio.json`: proyectos reales mostrados en el sitio.
- `data/testimonials.json`: testimonios.

## Blog y SEO

El blog visible e indexable se consolidó en tres guías de mayor profundidad. Las URLs antiguas se conservan únicamente como redirecciones `noindex,follow` hacia la guía más relacionada para no dejar enlaces rotos ni mantener artículos débiles compitiendo entre sí. El sitemap incluye únicamente las tres guías principales.

## Generar el sitio

```bash
npm run build
npm run check
```

## Publicación en GitHub Pages

1. Sube el contenido de esta carpeta a la raíz del repositorio.
2. Conserva `CNAME` para `edevisraga.com`.
3. Publica desde GitHub Pages / GitHub Actions según la configuración actual del repositorio.
4. Después de publicar, vuelve a enviar `sitemap.xml` en Google Search Console.

## Rendimiento

El proyecto no utiliza framework frontend, Tailwind CDN ni fuentes externas. Las animaciones se realizan con CSS e `IntersectionObserver`. La fotografía principal está optimizada y el resto de imágenes cargan de forma diferida cuando corresponde.
