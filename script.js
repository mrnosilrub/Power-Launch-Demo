function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
    menu.classList.toggle('translate-x-full');
  }
}

function initMenu() {
  const btn = document.getElementById('menuButton');
  const closeBtn = document.getElementById('closeMenu');
  if (btn) {
    btn.addEventListener('click', toggleMenu);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', toggleMenu);
  }
  const links = document.querySelectorAll('#mobileMenu a');
  links.forEach(l => l.addEventListener('click', toggleMenu));

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const success = document.getElementById('successMessage');
      if (success) {
        success.classList.remove('hidden');
      }
      form.reset();
    });
  }

  const accordions = document.querySelectorAll('details');
  accordions.forEach(d => {
    const summary = d.querySelector('summary');
    if (summary) {
      summary.setAttribute('aria-expanded', 'false');
      d.addEventListener('toggle', () => {
        summary.setAttribute('aria-expanded', d.open ? 'true' : 'false');
      });
    }
  });

  const counters = document.querySelectorAll('.stat-number');
  if (counters.length) {
    const animate = (el) => {
      const target = parseInt(el.getAttribute('data-target'), 10) || 0;
      const suffix = el.getAttribute('data-suffix') || '';
      let start = 0;
      const duration = 1500;
      const step = Math.max(Math.floor(duration / target), 20);
      const increment = target / (duration / step);
      const update = () => {
        start += increment;
        if (start >= target) {
          el.textContent = target + suffix;
        } else {
          el.textContent = Math.floor(start) + suffix;
          setTimeout(update, step);
        }
      };
      update();
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(el => observer.observe(el));
  }

  const aosEls = document.querySelectorAll('[data-aos]');
  if (aosEls.length) {
    const aosObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    aosEls.forEach(el => aosObserver.observe(el));
  }

  const quoteBar = document.getElementById('quoteBar');
  if (quoteBar) {
    const close = quoteBar.querySelector('button');
    if (close) {
      close.addEventListener('click', () => quoteBar.classList.add('hidden'));
    }
    const onScroll = () => {
      const depth = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (depth > 0.75) {
        quoteBar.classList.remove('hidden');
      }
    };
    window.addEventListener('scroll', onScroll);
  }

  const homeBtn = document.getElementById('homeButton');
  if (homeBtn) {
    homeBtn.addEventListener('click', (e) => {
      const path = window.location.pathname;
      if (path === '/' || path.endsWith('index.html') || path === '') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

}


function initStickyCTA() {
  const cta = document.getElementById('stickyCTA');
  if (!cta) return;
  const close = cta.querySelector('button[aria-label="Close"]');
  if (close) close.addEventListener('click', () => cta.classList.add('hidden'));
  const showAt = 0.8;
  const onScroll = () => {
    const progress = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
    if (progress >= showAt) {
      cta.classList.remove('hidden');
      window.removeEventListener('scroll', onScroll);
    }
  };
  window.addEventListener('scroll', onScroll);
}

function initFlyOver() {
  const btn = document.getElementById('flyOverBtn');
  const modal = document.getElementById('flyOverModal');
  if (!btn || !modal) return;
  const video = modal.querySelector('video');
  const close = modal.querySelector('button[aria-label="Close"]');
  const open = () => { modal.classList.remove('hidden'); };
  const hide = () => { modal.classList.add('hidden'); if (video) video.pause(); };
  btn.addEventListener('click', open);
  if (close) close.addEventListener('click', hide);
}

function initYardMap() {
  const map = document.getElementById('yardMap');
  const tooltip = document.getElementById('mapTooltip');
  if (!map || !tooltip) return;
  const zones = map.querySelectorAll('rect');
  zones.forEach(zone => {
    zone.addEventListener('mouseenter', (e) => {
      const info = zone.getAttribute('data-info');
      if (!info) return;
      tooltip.textContent = info;
      tooltip.style.left = `${e.offsetX + 10}px`;
      tooltip.style.top = `${e.offsetY + 10}px`;
      tooltip.classList.remove('hidden');
    });
    zone.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });
    zone.addEventListener('click', () => {
      tooltip.classList.add('hidden');
    });
  });
}

function initPage() {
  initMenu();
  initStickyCTA();
  initFlyOver();
  initYardMap();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
