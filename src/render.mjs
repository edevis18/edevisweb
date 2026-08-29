const icons = {
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  check: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></svg>',
  spark: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z"/></svg>',
  target: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M15 9l5-5"/></svg>',
  speed: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 15a8 8 0 1 1 16 0"/><path d="m12 13 4-4"/><path d="M7 19h10"/></svg>',
  mobile: '<svg aria-hidden="true" viewBox="0 0 24 24"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M10 18h4"/></svg>',
  chart: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
  message: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.7-5A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/></svg>',
  globe: '<svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>',
  code: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14"/></svg>',
  shield: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M12 3 4 6v5c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-5"/></svg>'
};

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const json = (data) => JSON.stringify(data).replaceAll('<', '\\u003c');
const absolute = (site, path) => `${site.siteUrl}${path === '/' ? '/' : path}`;

function renderMenuItems(navigation, mobile = false) {
  return navigation.items.map((item) => {
    const childMarkup = item.children?.length
      ? `<div class="nav-dropdown" role="menu">${item.children.map((child) => `<a href="${child.url}" role="menuitem">${esc(child.label)}</a>`).join('')}</div>`
      : '';
    return `<div class="nav-item${item.children ? ' has-dropdown' : ''}">
      <a href="${item.url}"${item.children ? ' aria-haspopup="true"' : ''}>${esc(item.label)}${item.children && !mobile ? '<span class="chevron">⌄</span>' : ''}</a>
      ${childMarkup}
    </div>`;
  }).join('');
}

function header(site, navigation) {
  return `<header class="site-header" data-header>
    <div class="container header-inner">
      <a class="brand" href="/" aria-label="Edevis Raga, inicio">
        <img src="${site.logo}" width="160" height="84" alt="Edevis Raga" decoding="async">
        <span><strong>Edevis Raga</strong><small>Landing Pages</small></span>
      </a>
      <nav class="desktop-nav" aria-label="Navegación principal">${renderMenuItems(navigation)}</nav>
      <a class="button button-small header-cta" href="${navigation.cta.url}">${esc(navigation.cta.label)}</a>
      <button class="menu-toggle" type="button" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-menu" data-menu-toggle>
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
  <div class="menu-overlay" data-menu-overlay></div>
  <aside class="mobile-menu" id="mobile-menu" aria-hidden="true" data-mobile-menu>
    <div class="mobile-menu-head">
      <a class="brand" href="/"><img src="${site.logo}" width="130" height="68" alt="Edevis Raga"><span><strong>Edevis Raga</strong><small>Landing Pages</small></span></a>
      <button type="button" class="menu-close" aria-label="Cerrar menú" data-menu-close>×</button>
    </div>
    <nav aria-label="Navegación móvil">${renderMenuItems(navigation, true)}</nav>
    <a class="button mobile-menu-cta" href="${navigation.cta.url}">${esc(navigation.cta.label)} ${icons.arrow}</a>
    <p>${esc(site.availability)}</p>
  </aside>`;
}

function footer(site, footerData) {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand" href="/"><img src="${site.logo}" width="160" height="84" alt="Edevis Raga"><span><strong>Edevis Raga</strong><small>Landing Pages</small></span></a>
        <p>${esc(footerData.summary)}</p>
        <div class="social-links">
          <a href="${site.social.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">IG</a>
          <a href="${site.social.behance}" target="_blank" rel="noopener noreferrer" aria-label="Behance">Be</a>
          <a href="${site.social.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
        </div>
      </div>
      ${footerData.columns.map((column) => `<div><h2>${esc(column.title)}</h2><ul>${column.links.map((link) => `<li><a href="${link.url}">${esc(link.label)}</a></li>`).join('')}</ul></div>`).join('')}
    </div>
    <div class="container footer-bottom">
      <p>© <span data-current-year>2026</span> Edevis Raga. Todos los derechos reservados.</p>
      <p>Diseño y desarrollo de landing pages para clientes de todo el mundo.</p>
    </div>
  </footer>
  <a class="floating-contact" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, quiero información para crear una landing page profesional.')}" target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp" data-track="whatsapp-floating">${icons.message}<span>Hablemos</span></a>
  <button class="back-to-top" type="button" aria-label="Volver arriba" data-back-top>↑</button>`;
}

function breadcrumbs(items) {
  return `<nav class="breadcrumbs container" aria-label="Migas de pan"><ol>${items.map((item, index) => `<li>${item.url && index < items.length - 1 ? `<a href="${item.url}">${esc(item.label)}</a>` : `<span aria-current="page">${esc(item.label)}</span>`}</li>`).join('')}</ol></nav>`;
}

function shell({ site, navigation, footerData, title, description, path, body, schema = [], type = 'website', article = null, noindex = false }) {
  const canonical = absolute(site, path);
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${site.siteUrl}/#website`,
      url: `${site.siteUrl}/`,
      name: site.name,
      inLanguage: 'es'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${site.siteUrl}/#person`,
      name: site.name,
      url: `${site.siteUrl}/`,
      image: absolute(site, site.profileImage),
      jobTitle: 'Diseñador y desarrollador de landing pages',
      knowsAbout: ['Landing pages', 'Diseño web', 'Desarrollo frontend', 'Optimización de conversión'],
      sameAs: Object.values(site.social)
    },
    ...schema
  ];
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="theme-color" content="#090b10">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex,follow">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
  <link rel="canonical" href="${canonical}">
  <link rel="icon" href="/assets/images/favicon.png" sizes="64x64">
  <link rel="manifest" href="/manifest.webmanifest">
  <meta property="og:type" content="${type}">
  <meta property="og:locale" content="${site.locale}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${absolute(site, site.ogImage)}">
  <meta property="og:image:alt" content="Edevis Raga, creación de landing pages profesionales">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${absolute(site, site.ogImage)}">
  ${article ? `<meta property="article:published_time" content="${article.published}"><meta property="article:modified_time" content="${article.updated}">` : ''}
  <link rel="preload" href="/assets/css/styles.css" as="style">
  <link rel="stylesheet" href="/assets/css/styles.css">
  ${schemas.map((item) => `<script type="application/ld+json">${json(item)}</script>`).join('\n  ')}
  ${site.analyticsId ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date);gtag('config','${site.analyticsId}',{anonymize_ip:true});</script>` : ''}
</head>
<body>
  <a class="skip-link" href="#main-content">Saltar al contenido</a>
  ${header(site, navigation)}
  <main id="main-content">${body}</main>
  ${footer(site, footerData)}
  <script src="/assets/js/main.js" defer></script>
</body>
</html>`;
}

function cta(site, title = '¿Tu oferta necesita una landing page más clara?', text = 'Cuéntame qué vendes, a quién ayudas y cuál es la acción que quieres generar. Recibirás una orientación inicial para definir el proyecto.') {
  return `<section class="section"><div class="container"><div class="cta-panel reveal">
    <div><span class="eyebrow">Conversemos sobre tu proyecto</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <div class="cta-actions"><a class="button" href="/contacto/">Solicitar propuesta ${icons.arrow}</a><a class="button button-ghost" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, quiero crear una landing page profesional.')}" target="_blank" rel="noopener noreferrer" data-track="whatsapp-cta">Consultar por WhatsApp</a></div>
  </div></div></section>`;
}

function serviceCards() {
  const cards = [
    ['Landing pages para captar clientes', 'Una propuesta clara, prueba de confianza y formularios pensados para solicitudes útiles.', '/landing-pages/para-captar-clientes/', 'target'],
    ['Landing pages para vender servicios', 'Haz visible el valor de un servicio profesional mediante alcance, proceso y resultados.', '/landing-pages/para-vender-servicios/', 'chart'],
    ['Landing pages para WhatsApp', 'Prepara la conversación, reduce preguntas repetidas y mide cada clic de contacto.', '/landing-pages/para-whatsapp/', 'message'],
    ['Landing pages bilingües', 'Versiones independientes en español e inglés con una arquitectura SEO correcta.', '/landing-pages/bilingues/', 'globe']
  ];
  return `<div class="card-grid">${cards.map(([title, text, url, icon]) => `<article class="feature-card reveal"><div class="icon-box">${icons[icon]}</div><h3>${title}</h3><p>${text}</p><a class="text-link" href="${url}">Conocer solución ${icons.arrow}</a></article>`).join('')}</div>`;
}

export function renderHome(ctx) {
  const { site, navigation, footerData, portfolio, testimonials, posts } = ctx;
  const body = `<section class="hero home-hero">
    <div class="hero-glow hero-glow-one"></div><div class="hero-glow hero-glow-two"></div>
    <div class="container hero-grid">
      <div class="hero-copy reveal">
        <span class="eyebrow">Diseño estratégico + desarrollo optimizado</span>
        <h1>Landing Pages Profesionales Diseñadas para <span>Convertir Visitas en Clientes</span></h1>
        <p>Creo páginas rápidas, claras y adaptadas a móviles para empresas, profesionales y emprendedores de cualquier parte del mundo.</p>
        <div class="hero-actions"><a class="button" href="/contacto/">Solicitar propuesta ${icons.arrow}</a><a class="button button-ghost" href="/portafolio/">Ver proyectos</a></div>
        <ul class="hero-trust"><li>${icons.check} Diseño personalizado</li><li>${icons.check} Archivos propios</li><li>${icons.check} Atención en español</li></ul>
      </div>
      <div class="hero-visual reveal" aria-label="Vista conceptual de una landing page optimizada">
        <div class="browser-card">
          <div class="browser-top"><span></span><span></span><span></span><small>tuoferta.com</small></div>
          <div class="browser-body"><div class="mini-nav"><b>MARCA</b><i></i><i></i><i></i></div><div class="mini-content"><span>PROPUESTA CLARA</span><h2>Una página. Una oferta.<br>Una acción.</h2><p></p><p></p><button>Quiero comenzar →</button></div><div class="mini-proof"><div></div><div></div><div></div></div></div>
        </div>
        <div class="metric-card metric-speed">${icons.speed}<span><strong>Rápida</strong><small>Optimizada para móvil</small></span></div>
        <div class="metric-card metric-focus">${icons.target}<span><strong>Enfocada</strong><small>Un objetivo principal</small></span></div>
      </div>
    </div>
  </section>
  <section class="stats-strip"><div class="container stats-grid"><div><strong>${site.experienceYears}+</strong><span>Años de experiencia</span></div><div><strong>${site.projectsDelivered}+</strong><span>Proyectos entregados</span></div><div><strong>100%</strong><span>Responsive y mobile-first</span></div><div><strong>Global</strong><span>Trabajo completamente remoto</span></div></div></section>
  <section class="section"><div class="container"><div class="section-heading centered reveal"><span class="eyebrow">Una oferta especializada</span><h2>No necesitas otra página bonita. Necesitas una página que explique y guíe.</h2><p>La estructura combina mensaje, diseño, velocidad y una acción medible. Cada decisión responde a la oferta y al tipo de cliente que deseas atraer.</p></div>${serviceCards()}</div></section>
  <section class="section section-alt"><div class="container split-grid"><div class="sticky-copy reveal"><span class="eyebrow">Qué incluye</span><h2>Todo lo necesario para publicar con una base profesional</h2><p>El proyecto no comienza eligiendo una plantilla. Primero se organiza qué debe comprender el visitante y cómo continuará la conversación.</p><a class="text-link" href="/landing-pages/">Conocer el servicio completo ${icons.arrow}</a></div><div class="deliverables-list">${['Análisis de oferta y audiencia','Arquitectura del contenido','Diseño visual personalizado','Desarrollo HTML optimizado','Experiencia mobile-first','Formulario y WhatsApp','SEO técnico inicial','Analítica y eventos','Publicación y pruebas'].map((item, index) => `<div class="deliverable reveal"><span>${String(index + 1).padStart(2, '0')}</span><h3>${item}</h3>${icons.check}</div>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="section-heading reveal"><span class="eyebrow">Proceso de trabajo</span><h2>De una idea dispersa a una página lista para presentar tu oferta</h2></div><div class="process-grid">${[
    ['01','Descubrimiento','Definimos oferta, audiencia, objetivo, materiales y restricciones.'],
    ['02','Estructura','Ordenamos mensajes, objeciones, prueba y llamados a la acción.'],
    ['03','Diseño y desarrollo','Construyo una experiencia propia, rápida y adaptable a cada pantalla.'],
    ['04','Revisión y publicación','Probamos enlaces, formularios, metadatos, medición y rendimiento.']
  ].map(([n,t,p]) => `<article class="process-card reveal"><span>${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>
  <section class="section section-alt"><div class="container"><div class="section-heading row-heading reveal"><div><span class="eyebrow">Trabajo comprobable</span><h2>Proyectos diseñados para objetivos reales</h2></div><a class="button button-ghost" href="/portafolio/">Ver portafolio</a></div><div class="project-grid">${portfolio.slice(0,3).map((project) => `<article class="project-card reveal"><a href="${project.url}"><img src="${project.image}" width="760" height="500" loading="lazy" decoding="async" alt="${esc(project.imageAlt)}"><div class="project-body"><span>${esc(project.category)}</span><h3>${esc(project.name)}</h3><p>${esc(project.summary)}</p><small>${esc(project.result)}</small></div></a></article>`).join('')}</div></div></section>
  <section class="section case-highlight"><div class="container case-grid"><div class="case-copy reveal"><span class="eyebrow">Caso de éxito</span><h2>Una landing editorial conectada con una campaña y un checkout real</h2><p>Para DABAR se organizó la presentación del ebook, se conectó el recorrido de compra y se configuraron eventos que permitieron evaluar resultados.</p><a class="button" href="/casos-de-exito/dabar-landing-page-ebooks/">Ver caso completo ${icons.arrow}</a></div><div class="case-metrics reveal"><div><strong>$40</strong><span>Inversión inicial</span></div><div><strong>9</strong><span>Ventas confirmadas</span></div><div><strong>3.4×</strong><span>ROAS en retargeting</span></div><div><strong>5.7%</strong><span>CTR promedio</span></div></div></div></section>
  <section class="section"><div class="container"><div class="section-heading centered reveal"><span class="eyebrow">Experiencias de clientes</span><h2>Claridad, acompañamiento y una solución adaptada</h2></div><div class="testimonial-grid">${testimonials.map((item) => `<figure class="testimonial-card reveal"><blockquote>“${esc(item.quote)}”</blockquote><figcaption><strong>${esc(item.name)}</strong><span>${esc(item.role)}</span></figcaption></figure>`).join('')}</div></div></section>
  <section class="section section-alt"><div class="container"><div class="section-heading row-heading reveal"><div><span class="eyebrow">Guías prácticas</span><h2>Aprende antes de contratar o publicar</h2></div><a class="text-link" href="/blog/">Ver todos los artículos ${icons.arrow}</a></div><div class="article-grid">${posts.slice(0,3).map(renderPostCard).join('')}</div></div></section>
  ${cta(site)}`;
  return shell({site, navigation, footerData, title: 'Creación de Landing Pages Profesionales | Edevis Raga', description: site.description, path: '/', body, schema: [{ '@context':'https://schema.org','@type':'Service','@id':`${site.siteUrl}/#service`,name:'Creación de landing pages profesionales',provider:{'@id':`${site.siteUrl}/#person`},areaServed:'Worldwide',serviceType:'Diseño y desarrollo de landing pages'}]});
}

export function renderSolutionPage(ctx, page) {
  const { site, navigation, footerData } = ctx;
  const crumbLabel = page.path === '/landing-pages/' ? 'Landing Pages' : page.h1.replace(/^Landing Pages? /, '');
  const body = `${breadcrumbs([{label:'Inicio',url:'/'},{label:'Landing Pages',url:'/landing-pages/'},{label:crumbLabel}])}
  <section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">${esc(page.eyebrow)}</span><h1>${esc(page.h1)}</h1><p>${esc(page.lead)}</p><div class="hero-actions"><a class="button" href="/contacto/">Solicitar propuesta ${icons.arrow}</a><a class="button button-ghost" href="/portafolio/">Ver trabajos</a></div></div></section>
  <section class="section"><div class="container split-grid"><div class="sticky-copy reveal"><span class="eyebrow">El enfoque correcto</span><h2>${esc(page.problemTitle)}</h2><p>${esc(page.problemText)}</p></div><div class="benefit-stack">${page.benefits.map((benefit, index) => `<article class="benefit-row reveal"><span>${String(index+1).padStart(2,'0')}</span><div><h3>${esc(benefit.title)}</h3><p>${esc(benefit.text)}</p></div></article>`).join('')}</div></div></section>
  <section class="section section-alt"><div class="container"><div class="section-heading centered reveal"><span class="eyebrow">Alcance del proyecto</span><h2>Una base completa, rápida y preparada para crecer</h2><p>El alcance final se adapta a la oferta, pero estos son los componentes habituales del servicio.</p></div><div class="check-grid">${page.deliverables.map((item) => `<div class="check-item reveal">${icons.check}<span>${esc(item)}</span></div>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="section-heading reveal"><span class="eyebrow">Cómo trabajaremos</span><h2>Un proceso visible de principio a fin</h2></div><div class="process-grid compact">${[['01','Estrategia','Objetivo, audiencia y oferta.'],['02','Contenido','Jerarquía, beneficios y objeciones.'],['03','Construcción','Diseño, HTML y experiencia móvil.'],['04','Validación','Pruebas, SEO y publicación.']].map(([n,t,p])=>`<article class="process-card reveal"><span>${n}</span><h3>${t}</h3><p>${p}</p></article>`).join('')}</div></div></section>
  <section class="section section-alt"><div class="container faq-layout"><div class="section-heading reveal"><span class="eyebrow">Preguntas frecuentes</span><h2>Lo que conviene definir antes de comenzar</h2></div><div class="faq-list">${page.faqs.map((faq) => `<details class="faq-item reveal"><summary>${esc(faq.q)}<span>+</span></summary><p>${esc(faq.a)}</p></details>`).join('')}</div></div></section>
  ${cta(site)}`;
  const faqSchema = {'@context':'https://schema.org','@type':'FAQPage',mainEntity:page.faqs.map((faq)=>({'@type':'Question',name:faq.q,acceptedAnswer:{'@type':'Answer',text:faq.a}}))};
  return shell({site, navigation, footerData, title:page.title, description:page.description, path:page.path, body, schema:[{'@context':'https://schema.org','@type':'Service',name:page.h1,description:page.description,provider:{'@id':`${site.siteUrl}/#person`},areaServed:'Worldwide'},faqSchema]});
}

function renderPostCard(post) {
  const postUrl = post.url || `/blog/${post.slug}/`;
  return `<article class="article-card reveal"><div class="article-meta"><span>${esc(post.keyword)}</span><small>${esc(post.readTime)}</small></div><h3><a href="${postUrl}">${esc(post.title)}</a></h3><p>${esc(post.description)}</p><a class="text-link" href="${postUrl}">Leer artículo ${icons.arrow}</a></article>`;
}

export function renderBlogIndex(ctx) {
  const {site,navigation,footerData,posts}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Blog'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Blog sobre landing pages</span><h1>Guías para Planificar, Crear y Mejorar una Landing Page</h1><p>Contenido práctico sobre estrategia, estructura, precios, velocidad, conversión y decisiones que conviene tomar antes de publicar.</p></div></section><section class="section"><div class="container"><div class="article-grid all-articles">${posts.map(renderPostCard).join('')}</div></div></section>${cta(site,'¿Prefieres aplicar estas ideas con ayuda profesional?','Podemos convertir tu oferta y tus contenidos en una landing page clara, rápida y lista para medir.')}`;
  return shell({site,navigation,footerData,title:'Blog sobre Landing Pages y Conversión | Edevis Raga',description:'Guías prácticas sobre creación de landing pages, estructura, precios, conversión, velocidad y SEO técnico.',path:'/blog/',body,schema:[{'@context':'https://schema.org','@type':'Blog',name:'Blog de Edevis Raga sobre landing pages',url:`${site.siteUrl}/blog/`} ]});
}

export function renderPost(ctx, post) {
  const {site,navigation,footerData}=ctx;
  const postUrl = post.url || `/blog/${post.slug}/`;
  const updatedDate = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${post.updated}T00:00:00Z`));
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Blog',url:'/blog/'},{label:post.title}])}<article class="blog-post"><header class="post-header container narrow reveal"><span class="eyebrow">${esc(post.keyword)}</span><h1>${esc(post.title)}</h1><p>${esc(post.intro)}</p><div class="post-meta"><span>Por Edevis Raga</span><span>${esc(post.readTime)} de lectura</span><time datetime="${post.updated}">Actualizado el ${updatedDate}</time></div></header><div class="post-layout container"><aside class="post-aside"><div><strong>En este artículo</strong><ol>${post.sections.map((section,index)=>`<li><a href="#seccion-${index+1}">${esc(section.heading)}</a></li>`).join('')}</ol><a class="button button-small" href="${post.relatedPage}">Ver servicio</a></div></aside><div class="post-content">${post.sections.map((section,index)=>`<section id="seccion-${index+1}" class="reveal"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((p)=>`<p>${esc(p)}</p>`).join('')}</section>`).join('')}<section><h2>Preguntas frecuentes</h2>${post.faqs.map((faq)=>`<details class="faq-item"><summary>${esc(faq.q)}<span>+</span></summary><p>${esc(faq.a)}</p></details>`).join('')}</section><div class="inline-cta"><h2>Convierte esta información en una landing page lista para publicar</h2><p>Diseño una estructura propia para tu oferta, con contenido claro, desarrollo optimizado y medición de acciones.</p><a class="button" href="${post.relatedPage}">Conocer la solución ${icons.arrow}</a></div></div></div></article>${cta(site)}`;
  const articleSchema={'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.description,datePublished:post.published,dateModified:post.updated,inLanguage:'es',author:{'@id':`${site.siteUrl}/#person`},publisher:{'@id':`${site.siteUrl}/#person`},mainEntityOfPage:absolute(site,`/blog/${post.slug}/`),image:absolute(site,site.ogImage)};
  const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:post.faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))};
  return shell({site,navigation,footerData,title:`${post.title} | Edevis Raga`,description:post.description,path:postUrl,body,type:'article',article:post,schema:[articleSchema,faqSchema]});
}

export function renderPortfolio(ctx) {
  const {site,navigation,footerData,portfolio}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Portafolio'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Proyectos seleccionados</span><h1>Landing Pages y Experiencias Digitales Construidas para Objetivos Reales</h1><p>Una selección de proyectos desarrollados para servicios, medios, marcas y productos digitales. Cada trabajo parte de una necesidad distinta.</p></div></section><section class="section"><div class="container project-grid portfolio-grid">${portfolio.map((project,index)=>`<article class="project-card reveal" id="${['dabar','stageg','makrisystem','futura','vida-activa'][index]}"><img src="${project.image}" width="760" height="500" loading="${index<2?'eager':'lazy'}" decoding="async" alt="${esc(project.imageAlt)}"><div class="project-body"><span>${esc(project.category)}</span><h2>${esc(project.name)}</h2><p>${esc(project.summary)}</p><small>${esc(project.result)}</small>${project.url.startsWith('/casos')?`<a class="text-link" href="${project.url}">Ver caso de éxito ${icons.arrow}</a>`:''}</div></article>`).join('')}</div></section>${cta(site,'¿Quieres que tu proyecto sea el próximo caso bien presentado?','Construyamos una landing page basada en tu oferta, tus clientes y una acción comercial concreta.')}`;
  return shell({site,navigation,footerData,title:'Portafolio de Landing Pages y Proyectos Web | Edevis Raga',description:'Conoce proyectos de landing pages, productos digitales y experiencias web desarrolladas por Edevis Raga.',path:'/portafolio/',body,schema:[{'@context':'https://schema.org','@type':'CollectionPage',name:'Portafolio de Edevis Raga',url:`${site.siteUrl}/portafolio/`} ]});
}

export function renderCases(ctx) {
  const {site,navigation,footerData,portfolio}=ctx;
  const featured=portfolio[0];
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Casos de éxito'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Estrategia, ejecución y resultados</span><h1>Casos de Éxito de Landing Pages con Contexto y Datos</h1><p>No se trata de mostrar cifras aisladas. Cada caso explica el objetivo, la estructura creada, las decisiones técnicas y los resultados disponibles.</p></div></section><section class="section"><div class="container"><article class="featured-case reveal"><img src="${featured.image}" width="760" height="500" alt="${esc(featured.imageAlt)}"><div><span class="eyebrow">Caso editorial</span><h2>${esc(featured.name)}</h2><p>${esc(featured.summary)}</p><div class="mini-metrics"><span><strong>9</strong> ventas</span><span><strong>3.4×</strong> ROAS</span><span><strong>5.7%</strong> CTR</span></div><a class="button" href="${featured.url}">Leer caso completo ${icons.arrow}</a></div></article><div class="empty-case-note"><h2>Nuevos casos se publicarán únicamente cuando existan datos verificables</h2><p>Los proyectos de portafolio muestran experiencia visual y técnica. Esta sección queda reservada para trabajos con objetivo, proceso y resultados documentados.</p></div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Casos de Éxito de Landing Pages | Edevis Raga',description:'Casos de éxito con estrategia, implementación y resultados documentados de landing pages desarrolladas por Edevis Raga.',path:'/casos-de-exito/',body});
}

export function renderDabarCase(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Casos de éxito',url:'/casos-de-exito/'},{label:'DABAR'}])}<article class="case-study"><header class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Caso de éxito · Editorial cristiana</span><h1>DABAR: Landing Page y Recorrido de Venta para un Ebook Ministerial</h1><p>Cómo se organizó una oferta editorial para la comunidad cristiana hispana y se conectó con medición y checkout.</p></div></header><section class="case-numbers"><div class="container case-metrics"><div><strong>$40</strong><span>Inversión inicial</span></div><div><strong>9</strong><span>Ventas confirmadas</span></div><div><strong>3.4×</strong><span>ROAS retargeting</span></div><div><strong>5.7%</strong><span>CTR promedio</span></div></div></section><section class="section"><div class="container article-prose"><h2>El reto</h2><p>El proyecto necesitaba presentar un ebook ministerial a una audiencia hispana distribuida en Estados Unidos y otros mercados, manteniendo coherencia con la identidad editorial y ofreciendo un recorrido sencillo hasta la compra.</p><p>La información del libro, la autora, los beneficios y el checkout se encontraban en etapas distintas. La landing debía convertir esos elementos en una narrativa única y medible.</p><h2>La solución</h2><p>Se diseñó una estructura enfocada en el mensaje del libro, la comunidad a la que sirve y el valor de la lectura. Se incorporaron bloques de confianza, presentación de autora, contenido editorial, preguntas frecuentes y llamados de compra consistentes.</p><div class="check-grid">${['Landing enfocada en conversión','Integración con checkout externo','Pixel y eventos de compra','Copy para comunidad hispana','Experiencia móvil','Retargeting medible'].map(i=>`<div class="check-item">${icons.check}<span>${i}</span></div>`).join('')}</div><h2>Resultados y lectura correcta</h2><p>La campaña inicial confirmó nueve ventas y permitió identificar compradores en distintas ciudades de Estados Unidos. El retargeting recuperó una compra con un ROAS de 3.4× y el conjunto registró un CTR promedio de 5.7%.</p><p>Estos datos pertenecen a un periodo y presupuesto concretos. No constituyen una promesa de resultados futuros; demuestran que la página, la medición y la oferta pudieron trabajar como un mismo sistema.</p><div class="inline-cta"><h2>¿Vendes un libro o recurso digital?</h2><p>Construyamos una landing que explique su valor y conecte correctamente con tu plataforma de venta.</p><a class="button" href="/landing-pages/para-autores-ebooks/">Ver solución para autores ${icons.arrow}</a></div></div></section></article>${cta(site)}`;
  const schema={'@context':'https://schema.org','@type':'CreativeWork',name:'Caso de éxito DABAR',description:'Landing page y recorrido de venta para un ebook ministerial.',creator:{'@id':`${site.siteUrl}/#person`},url:`${site.siteUrl}/casos-de-exito/dabar-landing-page-ebooks/`};
  return shell({site,navigation,footerData,title:'Caso de Éxito DABAR: Landing Page para Ebook | Edevis Raga',description:'Caso de éxito de una landing page editorial para DABAR: estructura de venta, checkout, medición y resultados documentados.',path:'/casos-de-exito/dabar-landing-page-ebooks/',body,schema:[schema]});
}

export function renderPricing(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Precios de landing page'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Inversión clara</span><h1>Precio de una Landing Page Profesional</h1><p>El alcance depende de la oferta, el contenido y las integraciones. Esta referencia permite saber qué incluye una base profesional antes de solicitar una propuesta.</p></div></section><section class="section"><div class="container pricing-grid"><article class="pricing-card featured reveal"><span class="popular-label">Proyecto base</span><div><span>Desde</span><strong>$250 <small>USD</small></strong><p>Para una oferta principal con contenido definido y un recorrido de conversión claro.</p></div><ul>${['Análisis inicial de oferta','Estructura de contenido','Diseño personalizado','Desarrollo responsive','Formulario o WhatsApp','SEO técnico inicial','Analytics básico','Publicación y pruebas'].map(i=>`<li>${icons.check}${i}</li>`).join('')}</ul><a class="button" href="/contacto/">Solicitar propuesta ${icons.arrow}</a></article><div class="pricing-notes reveal"><h2>El precio puede variar cuando el proyecto requiere:</h2>${[['Contenido y copy','Investigación, entrevistas o redacción completa.'],['Dos o más idiomas','Versiones independientes y revisión de contenido.'],['Integraciones','Agenda, checkout, CRM, automatización o APIs.'],['Variantes','Páginas adicionales para ofertas o audiencias.'],['Recursos especiales','Calculadores, filtros, animaciones o componentes a medida.']].map(([t,p])=>`<div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></div></section><section class="section section-alt"><div class="container faq-layout"><div class="section-heading"><span class="eyebrow">Antes de comparar</span><h2>Una propuesta debe explicar mucho más que el número final</h2></div><div class="faq-list">${[['¿El dominio está incluido?','Puede incluirse configuración y primer año según la propuesta. La titularidad siempre debe quedar a nombre del cliente.'],['¿Existe una mensualidad obligatoria?','No por el diseño. Dominio, hosting y servicios externos pueden tener renovaciones independientes.'],['¿Cuántas revisiones incluye?','La propuesta define rondas y alcance. Los comentarios se agrupan para mantener el calendario.'],['¿Recibo los archivos?','Sí. El proyecto se entrega según el alcance y no depende de una plataforma propietaria para conservar el diseño.']].map(([q,a])=>`<details class="faq-item"><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Precio de Landing Page Profesional | Edevis Raga',description:'Conoce el precio inicial y los elementos incluidos en una landing page profesional diseñada y desarrollada por Edevis Raga.',path:'/precios-landing-page/',body});
}

export function renderAbout(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Sobre mí'}])}<section class="section about-hero"><div class="container about-grid"><div class="about-image reveal"><img src="${site.profileImage}" width="720" height="857" fetchpriority="high" alt="Edevis Raga, diseñador y desarrollador de landing pages"><span>${site.experienceYears}+ años creando proyectos digitales</span></div><div class="about-copy reveal"><span class="eyebrow">Sobre Edevis Raga</span><h1>Experiencia Técnica con una Mirada Comercial y Comunicacional</h1><p>Soy comunicador digital, diseñador y desarrollador de proyectos web. Durante más de ${site.experienceYears} años he trabajado con empresas, emisoras, fotógrafos, marcas, autores y ministerios en proyectos para Latinoamérica y Estados Unidos.</p><p>Mi enfoque actual es específico: crear landing pages profesionales que expliquen una oferta con claridad, funcionen correctamente en móviles y permitan medir las acciones importantes.</p><p>No trabajo desde una plantilla única. Cada proyecto se organiza según audiencia, propuesta, contenido y proceso comercial. La tecnología debe permanecer al servicio del mensaje, no convertirse en una distracción.</p><div class="about-values"><div><strong>Claridad</strong><span>Decisiones explicables y contenido comprensible.</span></div><div><strong>Propiedad</strong><span>El cliente conserva sus activos y accesos.</span></div><div><strong>Responsabilidad</strong><span>Sin promesas de resultados imposibles.</span></div><div><strong>Optimización</strong><span>Velocidad, accesibilidad y mantenimiento.</span></div></div><a class="button" href="/contacto/">Trabajemos juntos ${icons.arrow}</a></div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Sobre Edevis Raga | Diseñador de Landing Pages',description:'Conoce la experiencia y metodología de Edevis Raga, comunicador digital, diseñador y desarrollador especializado en landing pages.',path:'/sobre-mi/',body});
}

export function renderContact(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Contacto'}])}<section class="inner-hero contact-intro"><div class="container narrow reveal"><span class="eyebrow">Hablemos de tu proyecto</span><h1>Cuéntame Qué Necesitas Comunicar y Qué Acción Quieres Generar</h1><p>Completa la información básica. Al enviar, se abrirá WhatsApp con un resumen para comenzar la conversación.</p></div></section><section class="section"><div class="container contact-grid"><form class="contact-form reveal" data-contact-form data-whatsapp="${site.whatsappNumber}"><div class="field-grid"><label><span>Nombre completo *</span><input type="text" name="name" autocomplete="name" required placeholder="Tu nombre"></label><label><span>Correo electrónico *</span><input type="email" name="email" autocomplete="email" required placeholder="nombre@empresa.com"></label></div><div class="field-grid"><label><span>País</span><input type="text" name="country" autocomplete="country-name" placeholder="País desde donde trabajas"></label><label><span>Tipo de proyecto *</span><select name="project" required><option value="">Selecciona una opción</option><option>Landing page para captar clientes</option><option>Landing page para vender servicios</option><option>Landing page para ebook</option><option>Landing page bilingüe</option><option>Otra landing page</option></select></label></div><label><span>Cuéntame sobre tu oferta y objetivo *</span><textarea name="message" rows="6" required placeholder="Qué vendes, a quién ayudas y qué debería hacer el visitante..."></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>Acepto que estos datos se utilicen únicamente para responder mi solicitud.</span></label><button class="button" type="submit">Enviar por WhatsApp ${icons.arrow}</button><p class="form-status" role="status" aria-live="polite"></p></form><aside class="contact-sidebar reveal"><span class="eyebrow">Contacto directo</span><h2>También puedes escribirme por el canal que prefieras</h2><a class="contact-option" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, quiero información sobre una landing page.')}" target="_blank" rel="noopener noreferrer">${icons.message}<span><strong>WhatsApp</strong><small>Consulta inicial sobre tu proyecto</small></span></a><a class="contact-option" href="mailto:${site.email}">${icons.arrow}<span><strong>${site.email}</strong><small>Respuesta por correo</small></span></a><div class="availability">${icons.globe}<p><strong>Trabajo completamente remoto</strong><span>Atención para empresas, profesionales y emprendedores de cualquier parte del mundo.</span></p></div></aside></div></section>`;
  return shell({site,navigation,footerData,title:'Solicitar una Landing Page Profesional | Contacto',description:'Contacta a Edevis Raga para solicitar una propuesta de diseño y desarrollo de landing page profesional.',path:'/contacto/',body});
}

export function renderLegal(ctx, kind) {
  const {site,navigation,footerData}=ctx;
  const privacy=kind==='privacy';
  const title=privacy?'Política de Privacidad':'Términos de Servicio';
  const path=privacy?'/politica-de-privacidad/':'/terminos-de-servicio/';
  const content=privacy?[
    ['Responsable y finalidad',`Los datos enviados mediante formularios o canales de contacto son recibidos por ${site.name} con la finalidad de responder consultas, preparar propuestas y dar seguimiento a proyectos solicitados.`],
    ['Datos recopilados','La web puede solicitar nombre, correo, país, tipo de proyecto y mensaje. No se solicita información financiera, clínica ni contraseñas mediante los formularios públicos.'],
    ['Analítica y cookies','Se utiliza Google Analytics para comprender el uso general del sitio. La configuración procura minimizar la recopilación y no debe utilizarse para almacenar datos sensibles.'],
    ['Servicios externos','Los enlaces a WhatsApp, correo, redes sociales o plataformas de terceros se rigen también por sus propias políticas.'],
    ['Derechos y contacto',`Puedes solicitar información, corrección o eliminación de datos de contacto escribiendo a ${site.email}.`]
  ]:[
    ['Información general','El contenido de este sitio describe servicios de diseño y desarrollo de landing pages. Cada proyecto se rige por una propuesta o acuerdo específico.'],
    ['Propuestas y alcance','Precios, plazos, revisiones, entregables, responsabilidades y servicios externos se confirman por escrito antes de comenzar. Las referencias generales del sitio no sustituyen una propuesta.'],
    ['Resultados','Una landing page puede mejorar claridad, experiencia y medición, pero no garantiza ventas, posiciones en buscadores ni una cantidad determinada de clientes.'],
    ['Propiedad intelectual','El contenido, diseño y código de cada proyecto se transfieren o licencian según el acuerdo. Materiales proporcionados por el cliente deben contar con derechos de uso.'],
    ['Contacto',`Para consultas relacionadas con estos términos puedes escribir a ${site.email}.`]
  ];
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:title}])}<article class="legal-page"><header class="inner-hero"><div class="container narrow"><span class="eyebrow">Información legal</span><h1>${title}</h1><p>Última actualización: 13 de agosto de 2026.</p></div></header><div class="container article-prose">${content.map(([h,p])=>`<section><h2>${h}</h2><p>${p}</p></section>`).join('')}</div></article>`;
  return shell({site,navigation,footerData,title:`${title} | Edevis Raga`,description:`${title} del sitio edevisraga.com y de los servicios de landing pages.`,path,body});
}

export function render404(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`<section class="not-found"><div class="container narrow"><span>404</span><h1>Esta página no está disponible</h1><p>El enlace puede haber cambiado o la dirección no existe. Puedes regresar al inicio o explorar el servicio de landing pages.</p><div class="hero-actions"><a class="button" href="/">Volver al inicio</a><a class="button button-ghost" href="/landing-pages/">Ver landing pages</a></div></div></section>`;
  return shell({site,navigation,footerData,title:'Página no encontrada | Edevis Raga',description:'La página solicitada no está disponible.',path:'/404.html',body,noindex:true});
}
