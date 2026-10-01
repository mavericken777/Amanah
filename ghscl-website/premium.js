/* Progressive visual enhancements: content and navigation also work without JS. */
(() => {
  'use strict';
  const menu = document.querySelector('.site-menu');
  if (menu) {
    const summary = menu.querySelector('summary');
    menu.addEventListener('toggle', () => summary.setAttribute('aria-expanded', String(menu.open)));
    summary.setAttribute('aria-expanded', String(menu.open));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  }
  const onboard = document.querySelector('.site-start');
  if (onboard) { const arrow = document.createElement('span'); arrow.className = 'premium-arrow'; arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); onboard.append(arrow); }
  document.querySelectorAll('.cta b').forEach(arrow => { arrow.textContent = '↗'; arrow.setAttribute('aria-hidden', 'true'); });
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('premium-entry'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.page-hero > div, .content-section, .interactive-panel, .home-ecosystem .shell').forEach(el => observer.observe(el));
})();
