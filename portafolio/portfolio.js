(() => {
  'use strict';

  const grid = document.querySelector('[data-portfolio-grid]');
  const pagination = document.querySelector('[data-portfolio-pagination]');
  const status = document.querySelector('[data-portfolio-status]');
  const note = document.querySelector('[data-portfolio-note]');
  const cards = grid ? [...grid.querySelectorAll('[data-portfolio-card]')] : [];

  if (!grid || !pagination || cards.length === 0) return;

  let currentPage = 1;
  let itemsPerPage = window.matchMedia('(max-width: 680px)').matches ? 2 : 3;

  const arrow = (direction) => direction === 'previous'
    ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg><span>Anterior</span>'
    : '<span>Siguiente</span><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';

  function totalPages() {
    return Math.max(1, Math.ceil(cards.length / itemsPerPage));
  }

  function makeButton(label, page, options = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.page = String(page);
    button.setAttribute('aria-label', options.ariaLabel || `Ir a la página ${page}`);

    if (options.direction) {
      button.className = 'pagination-arrow';
      button.innerHTML = arrow(options.direction);
    } else {
      button.textContent = label;
    }

    if (options.current) button.setAttribute('aria-current', 'page');
    if (options.disabled) button.disabled = true;
    return button;
  }

  function renderPagination() {
    const pages = totalPages();
    pagination.replaceChildren();
    pagination.append(makeButton('Anterior', currentPage - 1, {
      direction: 'previous',
      ariaLabel: 'Mostrar proyectos anteriores',
      disabled: currentPage === 1
    }));

    for (let page = 1; page <= pages; page += 1) {
      pagination.append(makeButton(String(page), page, { current: page === currentPage }));
    }

    pagination.append(makeButton('Siguiente', currentPage + 1, {
      direction: 'next',
      ariaLabel: 'Mostrar más proyectos',
      disabled: currentPage === pages
    }));
  }

  function render({ focusGrid = false } = {}) {
    const pages = totalPages();
    currentPage = Math.min(currentPage, pages);
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, cards.length);

    cards.forEach((card, index) => {
      const visible = index >= start && index < end;
      card.hidden = !visible;
      card.setAttribute('aria-hidden', String(!visible));
    });

    if (status) status.innerHTML = `<strong>Página ${currentPage} de ${pages}</strong><br>${start + 1}–${end} de ${cards.length} proyectos`;
    if (note) note.textContent = `Mostrando ${end - start} de ${cards.length} proyectos seleccionados.`;
    renderPagination();

    if (focusGrid) {
      grid.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      grid.setAttribute('tabindex', '-1');
      window.setTimeout(() => grid.focus({ preventScroll: true }), 350);
    }
  }

  pagination.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-page]');
    if (!button || button.disabled) return;
    const requestedPage = Number(button.dataset.page);
    if (!Number.isInteger(requestedPage) || requestedPage < 1 || requestedPage > totalPages()) return;
    currentPage = requestedPage;
    render({ focusGrid: true });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'portfolio_pagination', { portfolio_page: currentPage });
    }
  });

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      const nextItemsPerPage = window.matchMedia('(max-width: 680px)').matches ? 2 : 3;
      if (nextItemsPerPage === itemsPerPage) return;
      itemsPerPage = nextItemsPerPage;
      currentPage = 1;
      render();
    }, 150);
  }, { passive: true });

  render();
})();
