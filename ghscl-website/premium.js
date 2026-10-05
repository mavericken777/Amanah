/* AMANAH public progressive enhancements.
   Interaction reveals meaning; decorative animation is intentionally avoided. */
(() => {
  'use strict';

  const menu = document.querySelector('.site-menu');
  if (menu) {
    const summary = menu.querySelector('summary');
    const sync = () => summary?.setAttribute('aria-expanded', String(menu.open));
    menu.addEventListener('toggle', sync);
    sync();
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) {
        menu.open = false;
        summary?.focus({ preventScroll: true });
      }
    });
  }

  const brand = document.querySelector('.site-brand span');
  if (brand && !brand.querySelector('.brand-trilingual')) {
    const line = document.createElement('span');
    line.className = 'brand-trilingual';

    const zh = document.createElement('b');
    zh.lang = 'zh-Hant';
    zh.textContent = '全球清真供應鏈有限公司';

    const dot = document.createElement('i');
    dot.setAttribute('aria-hidden', 'true');
    dot.textContent = '•';

    const ar = document.createElement('b');
    ar.lang = 'ar';
    ar.dir = 'rtl';
    ar.textContent = 'سلسلة التوريد العالمية للحلال';

    line.append(zh, dot, ar);
    brand.append(line);
  }

  const onboard = document.querySelector('.site-start');
  if (onboard && !onboard.querySelector('.premium-arrow')) {
    const arrow = document.createElement('span');
    arrow.className = 'premium-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    onboard.append(arrow);
  }

  document.querySelectorAll('.cta b').forEach(arrow => {
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
  });

  // Keep journey context visible without inventing live telemetry.
  const journey = document.querySelector('.journey-track-full');
  if (journey && 'IntersectionObserver' in window) {
    const cards = [...journey.querySelectorAll('article')];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = cards.indexOf(entry.target);
        cards.forEach((card, i) => card.toggleAttribute('data-current', i === index));
      });
    }, { rootMargin: '-38% 0px -48%', threshold: .1 });
    cards.forEach(card => observer.observe(card));
  }

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('premium-entry');
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });

  document.querySelectorAll(
    '.page-hero > div, .content-section, .interactive-panel, .home-ecosystem .shell, .home-intro, .home-friction, .home-terminal, .trust-passport'
  ).forEach(el => observer.observe(el));
})();
