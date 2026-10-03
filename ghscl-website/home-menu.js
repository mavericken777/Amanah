// Keep the compact homepage navigation fully keyboard-operable without loading the cinematic runtime.
(() => {
  const menu = document.querySelector('.site-menu');
  if (!menu) return;
  const summary = menu.querySelector('summary');
  const update = () => summary.setAttribute('aria-expanded', String(menu.open));
  menu.addEventListener('toggle', update);
  summary.setAttribute('aria-expanded', String(menu.open));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.open) {
      menu.open = false;
      summary.focus({ preventScroll: true });
    }
  });
})();
