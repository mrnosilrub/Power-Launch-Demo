function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
    menu.classList.toggle('translate-x-full');
  }
}

function initMenu() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
  if (counters.length && !prefersReduced) {
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
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  } else if (prefersReduced) {
    counters.forEach(el => {
      const target = el.getAttribute('data-target') || '0';
      const suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target + suffix;
    });
  }

  const aosEls = document.querySelectorAll('[data-aos]');
  if (aosEls.length && !prefersReduced) {
    const aosObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-active');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    aosEls.forEach(el => aosObserver.observe(el));
  } else if (prefersReduced) {
    aosEls.forEach(el => el.classList.add('aos-active'));
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

function initTimeline() {
  const steps = document.querySelectorAll('.timeline-step');
  const line = document.querySelector('.timeline-line');
  steps.forEach(step => {
    const tip = step.querySelector('.timeline-tip');
    const show = () => {
      if (tip) tip.classList.remove('hidden');
      if (line) line.classList.add('highlight');
    };
    const hide = () => {
      if (tip) tip.classList.add('hidden');
      if (line) line.classList.remove('highlight');
    };
    step.addEventListener('mouseenter', show);
    step.addEventListener('mouseleave', hide);
    step.addEventListener('focus', show);
    step.addEventListener('blur', hide);

  });
}


function initTeamFlip() {
  const cards = document.querySelectorAll('.team-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (window.matchMedia('(hover: none)').matches) {
        const active = card.classList.toggle('flipped');
        if (!active) {
          const focused = card.querySelector(':focus');
          if (focused) focused.blur();
        }
      }
    });
    card.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') card.classList.remove('flipped');
    });
  });
}

function initVideoModal() {
  const btn = document.getElementById('openVideo');
  const modal = document.getElementById('videoModal');
  if (!btn || !modal) return;
  const iframe = modal.querySelector('iframe');
  const close = modal.querySelector('button[aria-label="Close"]');
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });
  if (close) {
    close.addEventListener('click', () => {
      modal.classList.add('hidden');
      iframe.src = iframe.src;
    });
  }
}

function initMaterialCards() {
  const cards = document.querySelectorAll('#materials a[href^="#"]');
  if (!cards.length) return;
  cards.forEach(card => {
    card.addEventListener('click', e => {
      e.preventDefault();
      const id = card.getAttribute('href').substring(1);
      const section = document.getElementById(id);
      if (!section) return;
      const details = section.querySelector('details');
      if (details) details.open = true;
      const header = document.querySelector('header');
      const offset = header ? header.offsetHeight : 0;
      const top = section.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      history.pushState(null, '', '#' + id);
    });
  });
}

function initQuoteBar() {
  const bar = document.getElementById('quoteBar');
  if (!bar) return;
  const hideBuffer = 300;
  const check = () => {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    const max = document.body.offsetHeight - window.innerHeight - hideBuffer;
    if (scroll > window.innerHeight * 0.2 && scroll < max) {
      bar.classList.remove('translate-y-full');
    } else {
      bar.classList.add('translate-y-full');
    }
  };
  document.addEventListener('scroll', check);
  window.addEventListener('resize', check);
  check();
}

function initValuesCarousel() {
  const container = document.querySelector('.values-carousel');
  if (!container) return;
  const slides = Array.from(container.children);
  if (!slides.length) return;

  let index = 0;

  const setHeight = () => {
    slides.forEach(s => s.classList.remove('hidden'));
    const max = Math.max(...slides.map(s => s.offsetHeight));
    container.style.height = max + 'px';
    slides.forEach((s, idx) => { if (idx !== index) s.classList.add('hidden'); });
  };

  const dotList = document.createElement('ul');
  dotList.className = 'slick-dots';

  slides.forEach((slide, idx) => {
    if (idx !== 0) slide.classList.add('hidden');
    const li = document.createElement('li');
    const btn = document.createElement('button');
    li.appendChild(btn);
    dotList.appendChild(li);
    btn.addEventListener('click', () => show(idx));
  });

  container.after(dotList);
  const show = (i) => {
    slides.forEach((s, idx) => {
      if (idx === i) {
        s.classList.remove('hidden');
        s.classList.add('fade-in');
        s.addEventListener('animationend', () => {
          s.classList.remove('fade-in');
        }, { once: true });
      } else {
        s.classList.add('hidden');
      }
    });
    dotList.querySelectorAll('li').forEach((d, idx) => {
      d.classList.toggle('slick-active', idx === i);
    });
  };

  const next = () => {
    index = (index + 1) % slides.length;
    show(index);
  };

  let timer = setInterval(next, 3000);
  container.addEventListener('mouseenter', () => clearInterval(timer));
  container.addEventListener('mouseleave', () => { timer = setInterval(next, 3000); });

  setHeight();
  show(index);
  window.addEventListener('resize', setHeight);
}

function initTeamCarousel() {
  const container = document.getElementById('teamCarousel');
  if (!container) return;
  const slides = container.querySelectorAll('.carousel-slide');
  const dots = container.querySelectorAll('.carousel-dot');
  let index = 0;
  const show = (i) => {
    slides.forEach((s, idx) => {
      if (idx === i) {
        s.classList.remove('hidden');
      } else {
        s.classList.add('hidden');
      }
    });
    dots.forEach((d, idx) => {
      d.classList.toggle('bg-brand-orange', idx === i);
    });
  };
  show(index);
  setInterval(() => {
    index = (index + 1) % slides.length;
    show(index);
  }, 4000);
  dots.forEach((d, idx) => d.addEventListener('click', () => {
    index = idx;
    show(index);
  }));

}

function initPage() {
  initMenu();
  initFlyOver();
  initYardMap();


  initTimeline();


  initTeamFlip();
  initVideoModal();
  initQuoteBar();

  initMaterialCards();

  initValuesCarousel();

  initTeamCarousel();


}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}
