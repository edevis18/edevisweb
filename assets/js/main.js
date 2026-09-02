(() => {
  'use strict';

  const body = document.body;
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-mobile-menu]');
  const overlay = document.querySelector('[data-menu-overlay]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const closeButton = document.querySelector('[data-menu-close]');
  let previousFocus = null;

  const focusableSelector = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function setMenu(open) {
    if (!menu || !overlay || !toggle) return;
    menu.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (open) {
      previousFocus = document.activeElement;
      menu.querySelector(focusableSelector)?.focus();
    } else if (previousFocus instanceof HTMLElement) {
      previousFocus.focus();
    }
  }

  toggle?.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  closeButton?.addEventListener('click', () => setMenu(false));
  overlay?.addEventListener('click', () => setMenu(false));
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu?.classList.contains('open')) setMenu(false);
    if (event.key !== 'Tab' || !menu?.classList.contains('open')) return;
    const focusable = [...menu.querySelectorAll(focusableSelector)];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const backTop = document.querySelector('[data-back-top]');
  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 20);
    backTop?.classList.toggle('visible', window.scrollY > 700);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  backTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' });
    revealElements.forEach((element) => observer.observe(element));
  }

  document.querySelectorAll('.faq-list').forEach((list) => {
    list.addEventListener('toggle', (event) => {
      const current = event.target;
      if (!(current instanceof HTMLDetailsElement) || !current.open) return;
      list.querySelectorAll('details[open]').forEach((item) => {
        if (item !== current) item.open = false;
      });
    }, true);
  });

  const track = (eventName, params = {}) => {
    if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
  };

  document.querySelectorAll('[data-track]').forEach((element) => {
    element.addEventListener('click', () => track(element.dataset.track, {
      page_path: window.location.pathname,
      link_url: element.href || ''
    }));
  });

  const form = document.querySelector('[data-contact-form]');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (!form.checkValidity()) {
      form.reportValidity();
      if (status) status.textContent = 'Completa los campos obligatorios para continuar.';
      return;
    }
    const data = new FormData(form);
    const text = [
      'Hola Edevis, quiero conversar contigo sobre un proyecto.',
      '',
      `Nombre: ${data.get('name')}`,
      `Correo: ${data.get('email')}`,
      `País: ${data.get('country') || 'No indicado'}`,
      `Tipo de proyecto: ${data.get('project')}`,
      `Detalles: ${data.get('message')}`
    ].join('\n');
    const number = form.dataset.whatsapp;
    track('generate_lead', { method: 'whatsapp_form', project_type: String(data.get('project')) });
    if (status) status.textContent = 'Abriendo WhatsApp con el resumen de tu solicitud…';
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  document.querySelectorAll('[data-current-year]').forEach((item) => {
    item.textContent = String(new Date().getFullYear());
  });
})();
