function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
    menu.classList.toggle('translate-x-full');
  }
}

document.addEventListener('DOMContentLoaded', function () {
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
});

