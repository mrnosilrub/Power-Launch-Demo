function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
    menu.classList.toggle('translate-x-full');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('menuButton');
  if (btn) {
    btn.addEventListener('click', toggleMenu);
  }
  const links = document.querySelectorAll('#mobileMenu a');
  links.forEach(l => l.addEventListener('click', toggleMenu));

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
});

