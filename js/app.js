/**
 * URBANTOP NEGÓCIOS IMOBILIÁRIOS — APP INTERATIVO
 * Gerenciamento dinâmico de catálogo, busca rápida, modal, animações e WhatsApp
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initCounters();
  initPropertiesShowcase();
  initHeroSearch();
  initModal();
  initScrollReveal();
  initContactForms();
});

/* --------------------------------------------------------------------------
   NAVBAR & SCROLL
   -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   DRAWER MOBILE MENU
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerClose = document.getElementById('drawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  function openMenu() {
    mobileToggle?.classList.add('active');
    mobileDrawer?.classList.add('open');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileToggle?.classList.remove('active');
    mobileDrawer?.classList.remove('open');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', () => {
    if (mobileDrawer?.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  drawerClose?.addEventListener('click', closeMenu);
  drawerBackdrop?.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/* --------------------------------------------------------------------------
   CONTADORES ANIMADOS (STATS STRIP)
   -------------------------------------------------------------------------- */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        animateValue(el, 0, targetVal, 1600, prefix, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => observer.observe(num));
}

function animateValue(el, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // easeOutQuad
    const current = Math.floor(progress * (2 - progress) * (end - start) + start);
    el.innerHTML = `${prefix}${current.toLocaleString('pt-BR')}${suffix}`;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      el.innerHTML = `${prefix}${end.toLocaleString('pt-BR')}${suffix}`;
    }
  };
  window.requestAnimationFrame(step);
}

/* --------------------------------------------------------------------------
   VITRINE DE IMÓVEIS (RENDER & FILTROS)
   -------------------------------------------------------------------------- */
let currentCategory = 'todos';
let currentSearchFilters = null;

function initPropertiesShowcase() {
  const container = document.getElementById('propertiesGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  if (!container || typeof PROPERTIES_DATA === 'undefined') return;

  // Atualizar contadores nos botões de filtro
  updateFilterCounts();

  // Render inicial
  renderProperties(PROPERTIES_DATA);

  // Eventos de clique nos filtros
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-filter') || 'todos';
      applyFilters();
    });
  });
}

function updateFilterCounts() {
  const total = PROPERTIES_DATA.length;
  const vendas = PROPERTIES_DATA.filter(p => p.purpose === 'venda').length;
  const locacoes = PROPERTIES_DATA.filter(p => p.purpose === 'locacao').length;
  const destaques = PROPERTIES_DATA.filter(p => p.featured).length;

  setCountText('count-todos', total);
  setCountText('count-venda', vendas);
  setCountText('count-locacao', locacoes);
  setCountText('count-destaques', destaques);
}

function setCountText(id, count) {
  const el = document.getElementById(id);
  if (el) el.textContent = count;
}

function applyFilters() {
  let list = [...PROPERTIES_DATA];

  // Filtro de aba
  if (currentCategory === 'venda') {
    list = list.filter(p => p.purpose === 'venda');
  } else if (currentCategory === 'locacao') {
    list = list.filter(p => p.purpose === 'locacao');
  } else if (currentCategory === 'destaques') {
    list = list.filter(p => p.featured);
  }

  // Filtros avançados do hero se ativos
  if (currentSearchFilters) {
    const { purpose, type, neighborhood, code } = currentSearchFilters;

    if (code && code.trim() !== '') {
      const qCode = code.trim().toLowerCase();
      list = list.filter(p => p.code.toLowerCase().includes(qCode));
    } else {
      if (purpose && purpose !== 'todos') {
        list = list.filter(p => p.purpose === purpose);
      }
      if (type && type !== 'todos') {
        list = list.filter(p => p.type === type);
      }
      if (neighborhood && neighborhood !== 'todos') {
        list = list.filter(p => p.neighborhood.toLowerCase().includes(neighborhood.toLowerCase()) || p.city.toLowerCase().includes(neighborhood.toLowerCase()));
      }
    }
  }

  renderProperties(list);
}

function renderProperties(list) {
  const container = document.getElementById('propertiesGrid');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="prop-empty-state">
        <h3>Nenhum imóvel encontrado com esses critérios</h3>
        <p style="color: var(--text-dark-muted); margin-bottom: 20px;">
          Temos outras opções em carteira que podem atender você. Fale diretamente com nossa equipe no WhatsApp!
        </p>
        <button class="btn btn-gold" onclick="resetFilters()">Ver Todos os Imóveis</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(prop => {
    const isMcmv = prop.badge && prop.badge.toLowerCase().includes('minha casa');
    return `
      <article class="property-card" data-id="${prop.id}">
        <div class="prop-media-wrap">
          <img src="${prop.image}" alt="${prop.title} - UrbanTop Imóveis" class="prop-img" loading="lazy" />
          <div class="prop-badges-strip">
            <span class="prop-badge ${isMcmv ? 'badge-mcmv' : ''}">${prop.badge || 'Imóvel'}</span>
            <span class="prop-code-pill">Cód. ${prop.code}</span>
          </div>
        </div>

        <div class="prop-body">
          <div class="prop-location">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 21s-8-7.5-8-12a8 8 0 1 1 16 0c0 4.5-8 12-8 12z"></path>
              <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
            <span>${prop.neighborhood}, ${prop.city}</span>
          </div>

          <h3 class="prop-title" title="${prop.title}">${prop.title}</h3>

          <div class="prop-specs-row">
            ${prop.specs.bedrooms > 0 ? `
              <div class="prop-spec-item" title="${prop.specs.bedrooms} Quartos">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 7v11m0-4h18m0-7v11M7 7h10"></path>
                </svg>
                <span>${prop.specs.bedrooms} Qts</span>
              </div>
            ` : ''}

            ${prop.specs.bathrooms > 0 ? `
              <div class="prop-spec-item" title="${prop.specs.bathrooms} Banheiros">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3a1 1 0 0 1 1-1zm2-5a2 2 0 1 1 4 0v5H6V7z"></path>
                </svg>
                <span>${prop.specs.bathrooms} Ban</span>
              </div>
            ` : ''}

            ${prop.specs.parking > 0 ? `
              <div class="prop-spec-item" title="${prop.specs.parking} Vagas">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="5" width="18" height="12" rx="2"></rect>
                  <circle cx="7" cy="14" r="1.5"></circle>
                  <circle cx="17" cy="14" r="1.5"></circle>
                </svg>
                <span>${prop.specs.parking} Vg</span>
              </div>
            ` : ''}

            <div class="prop-spec-item" title="Área do Imóvel">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M3 9h18M9 21V9"></path>
              </svg>
              <span>${prop.specs.area}</span>
            </div>
          </div>

          <div class="prop-footer">
            <div class="prop-price-wrap">
              <span class="prop-price-label">${prop.purpose === 'locacao' ? 'Aluguel' : 'Valor de Venda'}</span>
              <span class="prop-price-value">${prop.price}</span>
            </div>

            <button class="btn btn-gold prop-cta-btn" onclick="openPropertyModal(${prop.id})">
              Ver Detalhes
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

window.resetFilters = function() {
  currentCategory = 'todos';
  currentSearchFilters = null;
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-filter') === 'todos') b.classList.add('active');
  });
  const codeInput = document.getElementById('searchCode');
  if (codeInput) codeInput.value = '';
  renderProperties(PROPERTIES_DATA);
};

/* --------------------------------------------------------------------------
   HERO BUSCA RÁPIDA
   -------------------------------------------------------------------------- */
function initHeroSearch() {
  const searchForm = document.getElementById('heroSearchForm');
  const tabBtns = document.querySelectorAll('.search-tab-btn');
  let searchPurpose = 'comprar';

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      searchPurpose = btn.getAttribute('data-purpose') || 'comprar';
    });
  });

  searchForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const typeSelect = document.getElementById('searchType');
    const locationSelect = document.getElementById('searchLocation');
    const codeInput = document.getElementById('searchCode');

    currentSearchFilters = {
      purpose: searchPurpose === 'comprar' ? 'venda' : (searchPurpose === 'alugar' ? 'locacao' : 'todos'),
      type: typeSelect ? typeSelect.value : 'todos',
      neighborhood: locationSelect ? locationSelect.value : 'todos',
      code: codeInput ? codeInput.value : ''
    };

    // Rolar suavemente até a vitrine de imóveis
    const section = document.getElementById('imoveis');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }

    applyFilters();
  });
}

/* --------------------------------------------------------------------------
   MODAL DE DETALHES DO IMÓVEL
   -------------------------------------------------------------------------- */
function initModal() {
  const overlay = document.getElementById('propertyModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  closeBtn?.addEventListener('click', closeModal);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

window.openPropertyModal = function(propId) {
  const prop = PROPERTIES_DATA.find(p => p.id === propId);
  if (!prop) return;

  const overlay = document.getElementById('propertyModal');
  const imgEl = document.getElementById('modalImg');
  const badgeEl = document.getElementById('modalBadge');
  const codeEl = document.getElementById('modalCode');
  const titleEl = document.getElementById('modalTitle');
  const locEl = document.getElementById('modalLoc');
  const priceEl = document.getElementById('modalPrice');
  const descEl = document.getElementById('modalDesc');
  const specsEl = document.getElementById('modalSpecs');
  const featuresEl = document.getElementById('modalFeatures');
  const whatsappBtn = document.getElementById('modalWhatsappBtn');

  if (imgEl) imgEl.src = prop.image;
  if (badgeEl) badgeEl.textContent = prop.badge || 'Imóvel';
  if (codeEl) codeEl.textContent = `Código: ${prop.code}`;
  if (titleEl) titleEl.textContent = prop.title;
  if (locEl) locEl.textContent = `${prop.address || prop.neighborhood}, ${prop.city} - ${prop.state}`;
  if (priceEl) priceEl.textContent = prop.price;
  if (descEl) descEl.textContent = prop.description;

  // Specs
  if (specsEl) {
    specsEl.innerHTML = `
      <div class="prop-spec-item">
        <strong>${prop.specs.bedrooms}</strong> Quartos
      </div>
      <div class="prop-spec-item">
        <strong>${prop.specs.bathrooms}</strong> Banheiros
      </div>
      <div class="prop-spec-item">
        <strong>${prop.specs.parking}</strong> Vagas
      </div>
      <div class="prop-spec-item">
        <strong>${prop.specs.area}</strong> Área Total
      </div>
    `;
  }

  // Features list
  if (featuresEl && prop.features) {
    featuresEl.innerHTML = prop.features.map(f => `
      <li>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        ${f}
      </li>
    `).join('');
  }

  // Configurar link do WhatsApp
  if (whatsappBtn) {
    const textMsg = encodeURIComponent(
      `Olá! Tenho interesse no imóvel cód. ${prop.code} (${prop.title} - ${prop.price}), localizado em ${prop.neighborhood}, ${prop.city}. Gostaria de mais detalhes e agendar uma visita com a UrbanTop.`
    );
    whatsappBtn.href = `https://api.whatsapp.com/send?phone=${COMPANY_INFO.phoneRaw}&text=${textMsg}`;
  }

  overlay?.classList.add('open');
  document.body.style.overflow = 'hidden';
};

function closeModal() {
  const overlay = document.getElementById('propertyModal');
  overlay?.classList.remove('open');
  document.body.style.overflow = '';
}

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER PARA EFEITOS DE SCROLL SUAVES
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   FORMULÁRIOS & WHATSAPP DIRECT
   -------------------------------------------------------------------------- */
function initContactForms() {
  const ownerForm = document.getElementById('ownerForm');
  ownerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('ownerName')?.value || '';
    const phone = document.getElementById('ownerPhone')?.value || '';
    const type = document.getElementById('ownerType')?.value || '';
    const city = document.getElementById('ownerCity')?.value || '';

    const text = encodeURIComponent(
      `Olá, equipe UrbanTop! Meu nome é ${name} (Tel: ${phone}). Gostaria de cadastrar/avaliar meu imóvel do tipo "${type}" localizado em "${city}" para venda ou locação.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${COMPANY_INFO.phoneRaw}&text=${text}`, '_blank');
  });
}
