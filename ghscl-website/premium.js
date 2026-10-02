/* Progressive corporate-identity enhancements. Content/navigation remain usable without JS. */
(() => {
  'use strict';

  const menu = document.querySelector('.site-menu');
  if (menu) {
    const summary = menu.querySelector('summary');
    menu.addEventListener('toggle', () => summary.setAttribute('aria-expanded', String(menu.open)));
    summary.setAttribute('aria-expanded', String(menu.open));
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.open = false; }));
  }

  // Trilingual registered identity line: English remains primary; Traditional Chinese and Arabic are supporting identity treatments.
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

  // Neutral connector-state label. It deliberately does not imply a live authority connection.
  const header = document.querySelector('.site-header');
  if (header && !header.querySelector('.system-state')) {
    const state = document.createElement('span');
    state.className = 'system-state';
    state.innerHTML = '<i aria-hidden="true"></i><span>AUTHORITY CONNECTIVITY · PENDING AUTHORIZATION</span>';
    header.insertBefore(state, header.querySelector('.site-menu'));
  }

  const onboard = document.querySelector('.site-start');
  if (onboard) {
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

  // Ambient orthogonal circuit field, derived from the corporate shield/circuit concept.
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    const canvas = document.createElement('canvas');
    canvas.className = 'identity-circuit';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d', { alpha: true });
    if (ctx) {
      let width = 0, height = 0, dpr = 1;
      const nodes = Array.from({ length: 24 }, (_, i) => ({
        x: (i * 97 % 100) / 100,
        y: (i * 61 % 100) / 100,
        vx: ((i % 5) - 2) * .000035,
        vy: (((i * 3) % 5) - 2) * .000028
      }));
      const resize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      };
      const draw = () => {
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = .8;
        for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          const ax = a.x * width, ay = a.y * height;
          for (let j = i + 1; j < nodes.length; j++) {
            const b = nodes[j];
            const bx = b.x * width, by = b.y * height;
            const dx = ax - bx, dy = ay - by;
            const dist = Math.hypot(dx, dy);
            if (dist < 190) {
              const opacity = .12 * (1 - dist / 190);
              ctx.strokeStyle = `rgba(212,175,95,${opacity})`;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(ax, by);
              ctx.lineTo(bx, by);
              ctx.stroke();
            }
          }
          ctx.fillStyle = 'rgba(212,175,95,.34)';
          ctx.beginPath();
          ctx.arc(ax, ay, 1.35, 0, Math.PI * 2);
          ctx.fill();
          a.x += a.vx; a.y += a.vy;
          if (a.x < -.02 || a.x > 1.02) a.vx *= -1;
          if (a.y < -.02 || a.y > 1.02) a.vy *= -1;
        }
        requestAnimationFrame(draw);
      };
      resize();
      window.addEventListener('resize', resize, { passive: true });
      requestAnimationFrame(draw);
    }
  }

  if (reducedMotion || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('premium-entry');
      observer.unobserve(entry.target);
    }
  }), { threshold: .08 });
  document.querySelectorAll('.page-hero > div, .content-section, .interactive-panel, .home-ecosystem .shell').forEach(el => observer.observe(el));
})();
