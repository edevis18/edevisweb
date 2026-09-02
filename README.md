# Edevis Raga — Marca personal y servicios digitales

Sitio estático 2026 orientado a marca personal, rendimiento y lectura cómoda. Mantiene una arquitectura ligera en HTML, CSS y JavaScript sin frameworks frontend ni fuentes externas pesadas.

## Identidad visual

- Fondo principal: `#ffffff`
- Color primario: `#7407b8`
- Color secundario: `#ffbf13`
- Tipografía base de lectura: `20px`
- Menú y botones con peso regular, evitando el uso excesivo de negritas.

## Navegación

La navegación principal incluye:

- Inicio
- Sobre mí
- Servicios
- Proyectos
- Cursos Gratis
  - Curso ChatGPT
  - Curso HTML Básico
- Servicios Adicionales
  - Diseño Gráfico
  - Anuncios Ads
  - Publicidad Digital
  - Music Manager
- Blog
- Hablemos

## Portafolio

Los proyectos con presencia pública incluyen enlaces directos:

- DABAR: `https://linktr.ee/dabar_ministerio`
- Makrisystem: `https://makrisystem.com/`
- Futura 104.7 FM: `https://futurafm.gob.ve/`
- Vida Activa: `https://vidaactiva.click/`

El caso de éxito de DABAR mantiene el enlace al proyecto y su página interna de caso.

## Contenido editable

- `data/site.json`: identidad, contacto, redes, Analytics y datos globales.
- `data/navigation.json`: navegación principal y dropdowns.
- `data/footer.json`: contenido del footer.
- `data/pages.json`: páginas SEO de landing pages.
- `data/posts.json`: 3 artículos pilares del blog.
- `data/portfolio.json`: proyectos y enlaces externos.
- `data/offerings.json`: cursos gratuitos y servicios adicionales.
- `data/testimonials.json`: testimonios.

## Blog y SEO

El blog visible e indexable se mantiene consolidado en tres guías principales. Las URLs antiguas permanecen como redirecciones `noindex,follow` hacia las guías relacionadas.

## Generar y validar

```bash
npm run build
npm run check
```

El generador convierte las rutas internas a rutas relativas. Esto permite probar el proyecto dentro de una subcarpeta como:

```text
http://localhost/edevis/
```

sin perder CSS, JavaScript, imágenes o navegación, y también funciona publicado en la raíz de `edevisraga.com`.

## Publicación

1. Sube el contenido de esta carpeta a la raíz del hosting o repositorio.
2. Conserva `CNAME` si utilizas GitHub Pages.
3. Publica el sitio.
4. Revisa `sitemap.xml` en Google Search Console después de cambios de URLs o contenido.
