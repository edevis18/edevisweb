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
        <img src="/assets/images/brand-mark-purple.webp" width="92" height="48" alt="" decoding="async">
        <span><strong>Edevis Raga</strong><small>Web · Marca · Marketing</small></span>
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
      <a class="brand" href="/"><img src="/assets/images/brand-mark-purple.webp" width="82" height="43" alt=""><span><strong>Edevis Raga</strong><small>Web · Marca · Marketing</small></span></a>
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
        <a class="brand" href="/"><img src="/assets/images/brand-mark-purple.webp" width="92" height="48" alt=""><span><strong>Edevis Raga</strong><small>Web · Marca · Marketing</small></span></a>
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
      <p>Diseño, desarrollo y estrategia digital desde una relación de trabajo directa.</p>
    </div>
  </footer>
  <a class="floating-contact" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, tengo un proyecto y quiero conversar contigo.')}" target="_blank" rel="noopener noreferrer" aria-label="Conversar por WhatsApp" data-track="whatsapp-floating">${icons.message}<span>Hablemos</span></a>
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
      jobTitle: 'Programador y asesor de marca',
      knowsAbout: ['Desarrollo web', 'Landing pages', 'Branding', 'Marketing digital', 'Optimización de conversión'],
      sameAs: Object.values(site.social)
    },
    ...schema
  ];
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <meta name="theme-color" content="#ffffff">
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
  <meta property="og:image:alt" content="Edevis Raga, desarrollo web, marca y marketing digital">
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

function cta(site, title = '¿Tienes algo en mente?', text = 'Cuéntame qué quieres construir, mejorar o comunicar. Revisamos tu idea y te digo cuál puede ser el siguiente paso más útil.') {
  return `<section class="section"><div class="container"><div class="cta-panel reveal">
    <div><span class="eyebrow">Hablemos sin complicarlo</span><h2>${esc(title)}</h2><p>${esc(text)}</p></div>
    <div class="cta-actions"><a class="button" href="/contacto/">Cuéntame tu proyecto ${icons.arrow}</a><a class="button button-ghost" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, tengo un proyecto y quiero conversar contigo.')}" target="_blank" rel="noopener noreferrer" data-track="whatsapp-cta">Escribirme por WhatsApp</a></div>
  </div></div></section>`;
}

function serviceCards() {
  const cards = [
    ['Desarrollo web', 'Construyo sitios y experiencias digitales rápidas, claras y adaptadas a la forma en que tu negocio realmente trabaja.', '/contacto/', 'code'],
    ['Landing pages', 'Creo páginas enfocadas en una oferta y una acción concreta: captar contactos, presentar un servicio o vender.', '/landing-pages/', 'target'],
    ['Marca y comunicación', 'Te ayudo a ordenar cómo te presentas, qué comunicas y cómo se percibe tu negocio en los puntos de contacto digitales.', '/contacto/', 'spark'],
    ['Marketing digital', 'Conecto la web, el mensaje y la medición para que tus campañas y contenidos tengan una base más útil para crecer.', '/contacto/', 'chart']
  ];
  return `<div class="card-grid brand-service-grid">${cards.map(([title, text, url, icon]) => `<article class="feature-card reveal"><div class="icon-box">${icons[icon]}</div><h3>${title}</h3><p>${text}</p><a class="text-link" href="${url}">Cómo puedo ayudarte ${icons.arrow}</a></article>`).join('')}</div>`;
}

export function renderHome(ctx) {
  const { site, navigation, footerData, portfolio, testimonials, posts } = ctx;
  const body = `<section class="hero home-hero personal-hero">
    <div class="personal-orb personal-orb-one"></div><div class="personal-orb personal-orb-two"></div>
    <div class="container hero-grid personal-hero-grid">
      <div class="hero-copy reveal">
        <span class="eyebrow">Desarrollo web · marca · marketing</span>
        <h1>Hola, soy Edevis. <span>Te ayudo a construir una presencia digital que inspire confianza y genere oportunidades.</span></h1>
        <p>Trabajo entre tecnología, diseño y comunicación para convertir ideas, servicios y marcas en experiencias digitales claras, rápidas y pensadas para personas reales.</p>
        <div class="hero-actions"><a class="button" href="/contacto/">Cuéntame tu proyecto ${icons.arrow}</a><a class="button button-ghost" href="/portafolio/">Ver mi trabajo</a></div>
        <ul class="hero-trust"><li>${icons.check} Trabajo directo conmigo</li><li>${icons.check} Desarrollo a medida</li><li>${icons.check} Enfoque mobile-first</li></ul>
      </div>
      <div class="hero-visual personal-portrait reveal">
        <div class="portrait-frame"><img src="${site.profileImage}" width="900" height="1125" fetchpriority="high" decoding="async" alt="Edevis Raga, programador y asesor de marca"></div>
        <div class="portrait-note portrait-note-bottom"><strong>200+ proyectos</strong><span>construidos y entregados</span></div>
      </div>
    </div>
  </section>
  <section class="stats-strip personal-stats"><div class="container stats-grid"><div><strong>${site.experienceYears}+</strong><span>Años creando en digital</span></div><div><strong>${site.projectsDelivered}+</strong><span>Proyectos desarrollados</span></div><div><strong>Directo</strong><span>Sin intermediarios</span></div><div><strong>Global</strong><span>Trabajo remoto</span></div></div></section>
  <section class="section" id="servicios"><div class="container"><div class="section-heading reveal"><span class="eyebrow">Así puedo ayudarte</span><h2>No empiezo por una plantilla. Empiezo por entender qué necesitas conseguir.</h2><p>Dependiendo de tu proyecto, puedo ayudarte desde el desarrollo de la web hasta la forma en que presentas tu marca y conectas esa presencia con una estrategia digital.</p></div>${serviceCards()}</div></section>
  <section class="section section-alt personal-method"><div class="container personal-method-grid"><div class="method-copy reveal"><span class="eyebrow">Cómo trabajo</span><h2>Primero entiendo el negocio. Después diseño la solución.</h2><p>No creo en hacer una web solo porque “hay que tener una web”. Antes de diseñar necesito saber qué quieres comunicar, a quién quieres llegar y qué debería pasar después de que alguien te encuentre.</p><p>Mi trabajo es unir <strong>criterio, diseño y tecnología</strong> para que cada pantalla, texto y botón tenga una razón.</p><a class="text-link" href="/sobre-mi/">Conoce más sobre mi forma de trabajar ${icons.arrow}</a></div><div class="method-list">${[
    ['01','Entender','Reviso tu idea, oferta, audiencia y objetivo antes de proponer una solución.'],
    ['02','Ordenar','Defino qué necesita ver primero el visitante y cómo debe avanzar la conversación.'],
    ['03','Construir','Diseño y desarrollo una experiencia ligera, adaptable y coherente con tu marca.'],
    ['04','Medir','Dejo una base preparada para observar acciones y tomar mejores decisiones.']
  ].map(([n,t,p])=>`<article class="method-item reveal"><span>${n}</span><div><h3>${t}</h3><p>${p}</p></div></article>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="section-heading row-heading reveal"><div><span class="eyebrow">Proyectos seleccionados</span><h2>Algunas cosas en las que he trabajado</h2><p>Prefiero mostrar pocos proyectos y explicar qué papel tuvo cada uno. Aquí tienes una selección de trabajos reales.</p></div><a class="button button-ghost" href="/portafolio/">Ver todos los proyectos</a></div><div class="project-grid personal-projects">${portfolio.slice(0,3).map((project) => `<article class="project-card reveal"><a href="${project.url}"><img src="${project.image}" width="760" height="500" loading="lazy" decoding="async" alt="${esc(project.imageAlt)}"><div class="project-body"><span>${esc(project.category)}</span><h3>${esc(project.name)}</h3><p>${esc(project.summary)}</p><small>${esc(project.result)}</small></div></a></article>`).join('')}</div></div></section>
  <section class="section personal-story"><div class="container story-grid"><div class="story-photo reveal"><img src="${site.aboutImage || site.profileImage}" width="800" height="1200" loading="lazy" decoding="async" alt="Edevis Raga trabajando su marca personal"></div><div class="story-copy reveal"><span class="eyebrow">Detrás del trabajo</span><h2>Llevo más de ${site.experienceYears} años aprendiendo cómo se conectan tecnología, diseño, publicidad y negocio.</h2><p>He visto cambiar plataformas, tendencias y herramientas muchas veces. Lo que no cambia es la necesidad de comunicar con claridad, generar confianza y ofrecer una experiencia que haga fácil el siguiente paso.</p><p>Eso es lo que intento llevar a cada proyecto: menos ruido, más intención y una solución que puedas entender y mantener.</p><div class="story-pills"><span>Desarrollo web</span><span>Branding</span><span>Publicidad</span><span>Conversión</span></div><a class="button button-ghost" href="/sobre-mi/">Conocer mi historia ${icons.arrow}</a></div></div></section>
  <section class="section section-alt"><div class="container"><div class="section-heading centered reveal"><span class="eyebrow">Experiencias reales</span><h2>Lo que dicen algunas personas que han trabajado conmigo</h2></div><div class="testimonial-grid">${testimonials.map((item) => `<figure class="testimonial-card reveal"><blockquote>“${esc(item.quote)}”</blockquote><figcaption><strong>${esc(item.name)}</strong><span>${esc(item.role)}</span></figcaption></figure>`).join('')}</div></div></section>
  <section class="section"><div class="container"><div class="section-heading row-heading reveal"><div><span class="eyebrow">Tres guías, no treinta artículos</span><h2>Contenido que prefiero explicar bien</h2><p>He concentrado el blog en tres temas que realmente ayudan a tomar decisiones sobre una web o landing page.</p></div><a class="text-link" href="/blog/">Ir al blog ${icons.arrow}</a></div><div class="article-grid">${posts.map(renderPostCard).join('')}</div></div></section>
  ${cta(site)}`;
  return shell({site, navigation, footerData, title: 'Edevis Raga | Desarrollo Web, Marca y Marketing Digital', description: site.description, path: '/', body, schema: [{ '@context':'https://schema.org','@type':'ProfessionalService','@id':`${site.siteUrl}/#service`,name:'Servicios digitales de Edevis Raga',provider:{'@id':`${site.siteUrl}/#person`},areaServed:'Worldwide',serviceType:['Desarrollo web','Landing pages','Marca y comunicación','Marketing digital']}]});
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
  return `<article class="article-card reveal"><div class="article-meta"><span>${esc(post.keyword)}</span><small>${esc(post.readTime)}</small></div><h3><a href="/blog/${post.slug}/">${esc(post.title)}</a></h3><p>${esc(post.description)}</p><a class="text-link" href="/blog/${post.slug}/">Leer artículo ${icons.arrow}</a></article>`;
}

export function renderBlogIndex(ctx) {
  const {site,navigation,footerData,posts}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Blog'}])}<section class="inner-hero blog-hero"><div class="container narrow reveal"><span class="eyebrow">Blog</span><h1>Prefiero publicar poco y explicar cada tema de verdad</h1><p>He concentrado el blog en tres guías principales. La idea no es llenar Google de páginas parecidas, sino ayudarte a entender decisiones que aparecen una y otra vez cuando vas a contratar, crear o mejorar una web.</p></div></section><section class="section"><div class="container"><div class="article-grid all-articles">${posts.map(renderPostCard).join('')}</div></div></section>${cta(site,'¿Quieres aplicar estas ideas a tu proyecto?','Cuéntame en qué estás trabajando y revisamos si necesitas una landing, un sitio más completo o una solución diferente.')}`;
  return shell({site,navigation,footerData,title:'Blog de Edevis Raga | Web, Landing Pages y Conversión',description:'Tres guías en profundidad sobre landing pages, sitios web, conversión y costos para ayudarte a tomar mejores decisiones digitales.',path:'/blog/',body,schema:[{'@context':'https://schema.org','@type':'Blog',name:'Blog de Edevis Raga',url:`${site.siteUrl}/blog/`,author:{'@id':`${site.siteUrl}/#person`}}]});
}

export function renderPost(ctx, post) {
  const {site,navigation,footerData}=ctx;
  const updatedLabel = new Date(`${post.updated}T12:00:00`).toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'});
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Blog',url:'/blog/'},{label:post.title}])}<article class="blog-post"><header class="post-header container narrow reveal"><span class="eyebrow">${esc(post.keyword)}</span><h1>${esc(post.title)}</h1><p>${esc(post.intro)}</p><div class="post-meta"><span>Escrito por mí, Edevis Raga</span><span>${esc(post.readTime)} de lectura</span><time datetime="${post.updated}">Actualizado el ${updatedLabel}</time></div></header><div class="post-layout container"><aside class="post-aside"><div><strong>En esta guía</strong><ol>${post.sections.map((section,index)=>`<li><a href="#seccion-${index+1}">${esc(section.heading.replace(/^\d+\.\s*/,''))}</a></li>`).join('')}</ol><a class="button button-small" href="${post.relatedPage}">Ver solución</a></div></aside><div class="post-content">${post.sections.map((section,index)=>`<section id="seccion-${index+1}" class="reveal"><h2>${esc(section.heading)}</h2>${section.paragraphs.map((p)=>`<p>${esc(p)}</p>`).join('')}</section>`).join('')}<section><h2>Preguntas frecuentes</h2>${post.faqs.map((faq)=>`<details class="faq-item"><summary>${esc(faq.q)}<span>+</span></summary><p>${esc(faq.a)}</p></details>`).join('')}</section><aside class="article-author reveal"><img src="${site.profileImage}" width="150" height="188" loading="lazy" alt="Edevis Raga"><div><span class="eyebrow">Sobre quien escribe</span><h2>Soy Edevis Raga</h2><p>Llevo más de ${site.experienceYears} años trabajando entre desarrollo web, diseño, publicidad y proyectos digitales. Escribo estas guías desde la experiencia práctica, intentando explicar qué decisiones importan y cuáles suelen ser solo ruido.</p><a class="text-link" href="/sobre-mi/">Conoce más sobre mí ${icons.arrow}</a></div></aside><div class="inline-cta"><h2>¿Quieres llevar esto a tu proyecto?</h2><p>Cuéntame qué vendes, qué estás intentando mejorar y cuál es tu objetivo. Puedo ayudarte a ordenar la solución antes de comenzar a diseñar.</p><a class="button" href="/contacto/">Hablemos ${icons.arrow}</a></div></div></div></article>${cta(site)}`;
  const articleSchema={'@context':'https://schema.org','@type':'Article',headline:post.title,description:post.description,datePublished:post.published,dateModified:post.updated,inLanguage:'es',author:{'@id':`${site.siteUrl}/#person`},publisher:{'@id':`${site.siteUrl}/#person`},mainEntityOfPage:absolute(site,`/blog/${post.slug}/`),image:absolute(site,site.ogImage)};
  const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:post.faqs.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))};
  return shell({site,navigation,footerData,title:`${post.title} | Edevis Raga`,description:post.description,path:`/blog/${post.slug}/`,body,type:'article',article:post,schema:[articleSchema,faqSchema]});
}

export function renderPortfolio(ctx) {
  const {site,navigation,footerData,portfolio}=ctx;
  const ids=['dabar','stageg','makrisystem','futura','vida-activa'];
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Proyectos'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Proyectos seleccionados</span><h1>Algunos proyectos en los que he trabajado</h1><p>No quiero llenar esta página con todo lo que he hecho. Prefiero mostrar una selección de trabajos que representan distintos retos de diseño, desarrollo, comunicación y conversión.</p></div></section><section class="section"><div class="container project-grid portfolio-grid">${portfolio.map((project,index)=>`<article class="project-card reveal" id="${ids[index] || `proyecto-${index+1}`}"><img src="${project.image}" width="760" height="500" loading="${index<2?'eager':'lazy'}" decoding="async" alt="${esc(project.imageAlt)}"><div class="project-body"><span>${esc(project.category)}</span><h2>${esc(project.name)}</h2><p>${esc(project.summary)}</p><small>${esc(project.result)}</small><div class="project-actions">${project.url.startsWith('/casos')?`<a class="text-link" href="${project.url}">Ver caso de éxito ${icons.arrow}</a>`:''}${project.externalUrl?`<a class="text-link project-external" href="${project.externalUrl}" target="_blank" rel="noopener noreferrer">${esc(project.externalLabel || 'Visitar proyecto')} ${icons.arrow}</a>`:''}</div></div></article>`).join('')}</div></section>${cta(site,'¿Tienes un proyecto que quieres poner en marcha?','Cuéntame qué necesitas construir o mejorar. Si puedo ayudarte, te explicaré cómo lo plantearía y qué alcance tendría.')}`;
  return shell({site,navigation,footerData,title:'Proyectos de Edevis Raga | Desarrollo Web y Landing Pages',description:'Una selección de proyectos web, landing pages y experiencias digitales en los que he trabajado.',path:'/portafolio/',body,schema:[{'@context':'https://schema.org','@type':'CollectionPage',name:'Proyectos de Edevis Raga',url:`${site.siteUrl}/portafolio/`} ]});
}

export function renderCases(ctx) {
  const {site,navigation,footerData,portfolio}=ctx;
  const featured=portfolio[0];
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Casos de éxito'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Estrategia, ejecución y resultados</span><h1>Casos de Éxito de Landing Pages con Contexto y Datos</h1><p>No se trata de mostrar cifras aisladas. Cada caso explica el objetivo, la estructura creada, las decisiones técnicas y los resultados disponibles.</p></div></section><section class="section"><div class="container"><article class="featured-case reveal"><img src="${featured.image}" width="760" height="500" alt="${esc(featured.imageAlt)}"><div><span class="eyebrow">Caso editorial</span><h2>${esc(featured.name)}</h2><p>${esc(featured.summary)}</p><div class="mini-metrics"><span><strong>9</strong> ventas</span><span><strong>3.4×</strong> ROAS</span><span><strong>5.7%</strong> CTR</span></div><a class="button" href="${featured.url}">Leer caso completo ${icons.arrow}</a></div></article><div class="empty-case-note"><h2>Nuevos casos se publicarán únicamente cuando existan datos verificables</h2><p>Los proyectos de portafolio muestran experiencia visual y técnica. Esta sección queda reservada para trabajos con objetivo, proceso y resultados documentados.</p></div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Casos de Éxito de Landing Pages | Edevis Raga',description:'Casos de éxito con estrategia, implementación y resultados documentados de landing pages desarrolladas por Edevis Raga.',path:'/casos-de-exito/',body});
}

export function renderDabarCase(ctx) {
  const {site,navigation,footerData}=ctx;
  const dabarUrl='https://linktr.ee/dabar_ministerio';
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Casos de éxito',url:'/casos-de-exito/'},{label:'DABAR'}])}<article class="case-study"><header class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Caso de éxito · Editorial cristiana</span><h1>DABAR: Landing Page y Recorrido de Venta para un Ebook Ministerial</h1><p>Cómo se organizó una oferta editorial para la comunidad cristiana hispana y se conectó con medición y checkout.</p><div class="hero-actions"><a class="button button-ghost" href="${dabarUrl}" target="_blank" rel="noopener noreferrer">Conocer DABAR ${icons.arrow}</a></div></div></header><section class="case-numbers"><div class="container case-metrics"><div><strong>$40</strong><span>Inversión inicial</span></div><div><strong>9</strong><span>Ventas confirmadas</span></div><div><strong>3.4×</strong><span>ROAS retargeting</span></div><div><strong>5.7%</strong><span>CTR promedio</span></div></div></section><section class="section"><div class="container article-prose"><h2>El reto</h2><p>El proyecto necesitaba presentar un ebook ministerial a una audiencia hispana distribuida en Estados Unidos y otros mercados, manteniendo coherencia con la identidad editorial y ofreciendo un recorrido sencillo hasta la compra.</p><p>La información del libro, la autora, los beneficios y el checkout se encontraban en etapas distintas. La landing debía convertir esos elementos en una narrativa única y medible.</p><h2>La solución</h2><p>Se diseñó una estructura enfocada en el mensaje del libro, la comunidad a la que sirve y el valor de la lectura. Se incorporaron bloques de confianza, presentación de autora, contenido editorial, preguntas frecuentes y llamados de compra consistentes.</p><div class="check-grid">${['Landing enfocada en conversión','Integración con checkout externo','Pixel y eventos de compra','Copy para comunidad hispana','Experiencia móvil','Retargeting medible'].map(i=>`<div class="check-item">${icons.check}<span>${i}</span></div>`).join('')}</div><h2>Resultados y lectura correcta</h2><p>La campaña inicial confirmó nueve ventas y permitió identificar compradores en distintas ciudades de Estados Unidos. El retargeting recuperó una compra con un ROAS de 3.4× y el conjunto registró un CTR promedio de 5.7%.</p><p>Estos datos pertenecen a un periodo y presupuesto concretos. No constituyen una promesa de resultados futuros; demuestran que la página, la medición y la oferta pudieron trabajar como un mismo sistema.</p><p><a class="text-link" href="${dabarUrl}" target="_blank" rel="noopener noreferrer">Visitar DABAR ${icons.arrow}</a></p><div class="inline-cta"><h2>¿Vendes un libro o recurso digital?</h2><p>Construyamos una landing que explique su valor y conecte correctamente con tu plataforma de venta.</p><a class="button" href="/landing-pages/para-autores-ebooks/">Ver solución para autores ${icons.arrow}</a></div></div></section></article>${cta(site)}`;
  const schema={'@context':'https://schema.org','@type':'CreativeWork',name:'Caso de éxito DABAR',description:'Landing page y recorrido de venta para un ebook ministerial.',creator:{'@id':`${site.siteUrl}/#person`},url:`${site.siteUrl}/casos-de-exito/dabar-landing-page-ebooks/`,sameAs:dabarUrl};
  return shell({site,navigation,footerData,title:'Caso de Éxito DABAR: Landing Page para Ebook | Edevis Raga',description:'Caso de éxito de una landing page editorial para DABAR: estructura de venta, checkout, medición y resultados documentados.',path:'/casos-de-exito/dabar-landing-page-ebooks/',body,schema:[schema]});
}

export function renderPricing(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Precios de landing page'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Inversión clara</span><h1>Precio de una Landing Page Profesional</h1><p>El alcance depende de la oferta, el contenido y las integraciones. Esta referencia permite saber qué incluye una base profesional antes de solicitar una propuesta.</p></div></section><section class="section"><div class="container pricing-grid"><article class="pricing-card featured reveal"><span class="popular-label">Proyecto base</span><div><span>Desde</span><strong>$250 <small>USD</small></strong><p>Para una oferta principal con contenido definido y un recorrido de conversión claro.</p></div><ul>${['Análisis inicial de oferta','Estructura de contenido','Diseño personalizado','Desarrollo responsive','Formulario o WhatsApp','SEO técnico inicial','Analytics básico','Publicación y pruebas'].map(i=>`<li>${icons.check}${i}</li>`).join('')}</ul><a class="button" href="/contacto/">Solicitar propuesta ${icons.arrow}</a></article><div class="pricing-notes reveal"><h2>El precio puede variar cuando el proyecto requiere:</h2>${[['Contenido y copy','Investigación, entrevistas o redacción completa.'],['Dos o más idiomas','Versiones independientes y revisión de contenido.'],['Integraciones','Agenda, checkout, CRM, automatización o APIs.'],['Variantes','Páginas adicionales para ofertas o audiencias.'],['Recursos especiales','Calculadores, filtros, animaciones o componentes a medida.']].map(([t,p])=>`<div><h3>${t}</h3><p>${p}</p></div>`).join('')}</div></div></section><section class="section section-alt"><div class="container faq-layout"><div class="section-heading"><span class="eyebrow">Antes de comparar</span><h2>Una propuesta debe explicar mucho más que el número final</h2></div><div class="faq-list">${[['¿El dominio está incluido?','Puede incluirse configuración y primer año según la propuesta. La titularidad siempre debe quedar a nombre del cliente.'],['¿Existe una mensualidad obligatoria?','No por el diseño. Dominio, hosting y servicios externos pueden tener renovaciones independientes.'],['¿Cuántas revisiones incluye?','La propuesta define rondas y alcance. Los comentarios se agrupan para mantener el calendario.'],['¿Recibo los archivos?','Sí. El proyecto se entrega según el alcance y no depende de una plataforma propietaria para conservar el diseño.']].map(([q,a])=>`<details class="faq-item"><summary>${q}<span>+</span></summary><p>${a}</p></details>`).join('')}</div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Precio de Landing Page Profesional | Edevis Raga',description:'Conoce el precio inicial y los elementos incluidos en una landing page profesional diseñada y desarrollada por Edevis Raga.',path:'/precios-landing-page/',body});
}

export function renderAbout(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Sobre mí'}])}<section class="section about-hero"><div class="container about-grid"><div class="about-image reveal"><img src="${site.aboutImage || site.profileImage}" width="800" height="1200" fetchpriority="high" alt="Edevis Raga, programador y asesor de marca"><span>${site.experienceYears}+ años creando y aprendiendo en digital</span></div><div class="about-copy reveal"><span class="eyebrow">Hola, soy Edevis</span><h1>Trabajo donde se encuentran la tecnología, el diseño, la comunicación y el negocio</h1><p>Llevo más de ${site.experienceYears} años construyendo proyectos digitales. En ese camino he trabajado con empresas, medios, profesionales, marcas, autores y organizaciones en Latinoamérica y Estados Unidos.</p><p>Mi formación práctica no se quedó en una sola disciplina. Programo, diseño, pienso en marca y entiendo la publicidad como parte de un mismo sistema. Esa mezcla me permite mirar un proyecto más allá de cómo se ve: necesito entender qué comunica, cómo funciona y qué debería conseguir.</p><p>No me interesa complicar una solución para que parezca más avanzada. Prefiero elegir la tecnología y la estructura que realmente necesita el proyecto, mantener la experiencia rápida y explicarte por qué tomo cada decisión.</p><div class="about-values"><div><strong>Claridad</strong><span>Quiero que entiendas lo que estoy construyendo y por qué.</span></div><div><strong>Trabajo directo</strong><span>Hablas conmigo durante el proceso, sin capas innecesarias.</span></div><div><strong>Propiedad</strong><span>Tus activos, dominios y accesos deben seguir siendo tuyos.</span></div><div><strong>Rendimiento</strong><span>Una experiencia bonita también tiene que cargar y funcionar bien.</span></div></div><a class="button" href="/contacto/">Cuéntame en qué estás trabajando ${icons.arrow}</a></div></div></section><section class="section section-alt"><div class="container split-grid"><div class="sticky-copy reveal"><span class="eyebrow">Mi forma de pensar</span><h2>La tecnología es una herramienta. El objetivo es hacer más fácil la decisión del usuario.</h2><p>Por eso antes de comenzar pregunto por el negocio, la audiencia, la oferta y el siguiente paso. Una interfaz puede verse espectacular y aun así fallar si no comunica con claridad.</p></div><div class="benefit-stack">${[['01','Escucho antes de proponer','Necesito entender el problema antes de elegir diseño o tecnología.'],['02','Simplifico','Intento eliminar fricción, no agregar funciones porque sí.'],['03','Construyo pensando en móvil','La experiencia principal debe funcionar bien en la pantalla que más usa la gente.'],['04','Dejo una base mantenible','Prefiero soluciones que puedas conservar, medir y mejorar.']].map(([n,t,p])=>`<article class="benefit-row reveal"><span>${n}</span><div><h3>${t}</h3><p>${p}</p></div></article>`).join('')}</div></div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Sobre mí | Edevis Raga',description:'Soy Edevis Raga, programador y asesor de marca con más de 18 años trabajando en desarrollo web, diseño, publicidad y proyectos digitales.',path:'/sobre-mi/',body});
}

export function renderContact(ctx) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Contacto'}])}<section class="inner-hero contact-intro"><div class="container narrow reveal"><span class="eyebrow">Hablemos</span><h1>Cuéntame qué estás intentando construir o mejorar</h1><p>No necesitas llegar con un documento técnico. Explícame tu idea, qué problema quieres resolver y qué te gustaría conseguir. A partir de ahí podemos definir el siguiente paso.</p></div></section><section class="section"><div class="container contact-grid"><form class="contact-form reveal" data-contact-form data-whatsapp="${site.whatsappNumber}"><div class="field-grid"><label><span>Nombre completo *</span><input type="text" name="name" autocomplete="name" required placeholder="Tu nombre"></label><label><span>Correo electrónico *</span><input type="email" name="email" autocomplete="email" required placeholder="nombre@empresa.com"></label></div><div class="field-grid"><label><span>País</span><input type="text" name="country" autocomplete="country-name" placeholder="Desde dónde me escribes"></label><label><span>¿En qué puedo ayudarte? *</span><select name="project" required><option value="">Selecciona una opción</option><option>Desarrollo web</option><option>Landing page</option><option>Marca y comunicación</option><option>Marketing digital</option><option>Mejorar una web existente</option><option>Otro proyecto digital</option></select></label></div><label><span>Cuéntame un poco más *</span><textarea name="message" rows="6" required placeholder="Qué quieres construir, qué tienes actualmente y cuál sería un buen resultado para ti..."></textarea></label><label class="consent"><input type="checkbox" name="consent" required><span>Acepto que estos datos se utilicen únicamente para responder mi solicitud.</span></label><button class="button" type="submit">Continuar por WhatsApp ${icons.arrow}</button><p class="form-status" role="status" aria-live="polite"></p></form><aside class="contact-sidebar reveal"><span class="eyebrow">Contacto directo</span><h2>Si ya lo tienes claro, puedes escribirme directamente</h2><a class="contact-option" href="${site.whatsappUrl}?text=${encodeURIComponent('Hola Edevis, tengo un proyecto y quiero conversar contigo.')}" target="_blank" rel="noopener noreferrer">${icons.message}<span><strong>WhatsApp</strong><small>La forma más rápida de iniciar la conversación</small></span></a><a class="contact-option" href="mailto:${site.email}">${icons.arrow}<span><strong>${site.email}</strong><small>Si prefieres explicar el proyecto por correo</small></span></a><div class="availability">${icons.globe}<p><strong>Trabajo completamente remoto</strong><span>Puedo colaborar contigo sin importar dónde estés, siempre que podamos coordinar objetivos, materiales y tiempos con claridad.</span></p></div></aside></div></section>`;
  return shell({site,navigation,footerData,title:'Contacto | Edevis Raga',description:'Cuéntame tu proyecto de desarrollo web, landing page, marca o marketing digital y revisemos cómo puedo ayudarte.',path:'/contacto/',body});
}


function offeringCards(items, basePath) {
  return `<div class="card-grid">${items.map((item) => `<article class="feature-card reveal"><div class="icon-box">${icons.spark}</div><h2>${esc(item.title)}</h2><p>${esc(item.lead)}</p><a class="text-link" href="${basePath}${item.slug}/">Abrir ${item.title.toLowerCase()} ${icons.arrow}</a></article>`).join('')}</div>`;
}

export function renderCoursesHub(ctx, courses) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Cursos Gratis'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Aprende conmigo</span><h1>Cursos Gratis</h1><p>He preparado contenidos sencillos y prácticos para que puedas aprender haciendo. La idea es darte una base clara, sin llenar cada explicación de términos innecesarios.</p></div></section><section class="section"><div class="container">${offeringCards(courses,'/cursos-gratis/')}</div></section>${cta(site,'¿Quieres llevar lo aprendido a un proyecto real?','Si estás construyendo una web, una marca o una idea digital y necesitas una mano más técnica, cuéntame qué estás haciendo.')}`;
  return shell({site,navigation,footerData,title:'Cursos Gratis | Edevis Raga',description:'Cursos gratis de ChatGPT y HTML básico explicados de forma práctica por Edevis Raga.',path:'/cursos-gratis/',body});
}

export function renderCourse(ctx, course) {
  const {site,navigation,footerData}=ctx;
  const path=`/cursos-gratis/${course.slug}/`;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Cursos Gratis',url:'/cursos-gratis/'},{label:course.title}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">${esc(course.eyebrow)}</span><h1>${esc(course.title)}</h1><p>${esc(course.lead)}</p></div></section><section class="section"><div class="container split-grid"><div class="sticky-copy reveal"><span class="eyebrow">Empecemos por la base</span><h2>${esc(course.introTitle)}</h2><p>${esc(course.introText)}</p></div><div class="benefit-stack">${course.items.map(([n,t,p])=>`<article class="benefit-row reveal"><span>${esc(n)}</span><div><h3>${esc(t)}</h3><p>${esc(p)}</p></div></article>`).join('')}</div></div></section><section class="section section-alt"><div class="container"><div class="section-heading reveal"><span class="eyebrow">Ponlo en práctica</span><h2>${esc(course.checkTitle)}</h2></div><div class="check-grid">${course.checks.map(i=>`<div class="check-item reveal">${icons.check}<span>${esc(i)}</span></div>`).join('')}</div></div></section><section class="section"><div class="container narrow reveal"><span class="eyebrow">Siguiente paso</span><h2>${esc(course.closingTitle)}</h2><p>${esc(course.closingText)}</p><a class="button button-ghost" href="/cursos-gratis/">Ver todos los cursos ${icons.arrow}</a></div></section>`;
  return shell({site,navigation,footerData,title:`${course.title} | Edevis Raga`,description:course.lead,path,body,schema:[{'@context':'https://schema.org','@type':'Course',name:course.title,description:course.lead,provider:{'@id':`${site.siteUrl}/#person`},isAccessibleForFree:true,inLanguage:'es'}]});
}

export function renderAdditionalServicesHub(ctx, services) {
  const {site,navigation,footerData}=ctx;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Servicios Adicionales'}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">Más formas de trabajar conmigo</span><h1>Servicios Adicionales</h1><p>Además del desarrollo web y las landing pages, puedo ayudarte en áreas de diseño, publicidad y comunicación digital cuando el proyecto necesita una visión más completa.</p></div></section><section class="section"><div class="container">${offeringCards(services,'/servicios-adicionales/')}</div></section>${cta(site)}`;
  return shell({site,navigation,footerData,title:'Servicios Adicionales | Edevis Raga',description:'Diseño gráfico, anuncios Ads, publicidad digital y acompañamiento Music Manager como servicios adicionales.',path:'/servicios-adicionales/',body});
}

export function renderAdditionalService(ctx, service) {
  const {site,navigation,footerData}=ctx;
  const path=`/servicios-adicionales/${service.slug}/`;
  const body=`${breadcrumbs([{label:'Inicio',url:'/'},{label:'Servicios Adicionales',url:'/servicios-adicionales/'},{label:service.title}])}<section class="inner-hero"><div class="container narrow reveal"><span class="eyebrow">${esc(service.eyebrow)}</span><h1>${esc(service.title)}</h1><p>${esc(service.lead)}</p><div class="hero-actions"><a class="button" href="/contacto/">Cuéntame qué necesitas ${icons.arrow}</a></div></div></section><section class="section"><div class="container split-grid"><div class="sticky-copy reveal"><span class="eyebrow">Mi enfoque</span><h2>${esc(service.introTitle)}</h2><p>${esc(service.introText)}</p></div><div class="benefit-stack">${service.items.map(([n,t,p])=>`<article class="benefit-row reveal"><span>${esc(n)}</span><div><h3>${esc(t)}</h3><p>${esc(p)}</p></div></article>`).join('')}</div></div></section><section class="section section-alt"><div class="container"><div class="section-heading reveal"><span class="eyebrow">Alcance</span><h2>${esc(service.checkTitle)}</h2></div><div class="check-grid">${service.checks.map(i=>`<div class="check-item reveal">${icons.check}<span>${esc(i)}</span></div>`).join('')}</div></div></section>${cta(site,service.closingTitle,service.closingText)}`;
  return shell({site,navigation,footerData,title:`${service.title} | Edevis Raga`,description:service.lead,path,body,schema:[{'@context':'https://schema.org','@type':'Service',name:service.title,description:service.lead,provider:{'@id':`${site.siteUrl}/#person`},areaServed:'Worldwide'}]});
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
