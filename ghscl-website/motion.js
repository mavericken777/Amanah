(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll('main > section, main .content-section, main .interactive-panel, main .related, main .source-panel, main .page-hero, main > .hero, .site-footer');
  const sequenceTargets = document.querySelectorAll('.identity-diagram, .system-flow, .scene-zones, .exception-response-path, .recall-tree, .timeline, #labSteps, #warehouseZones, #custodyRibbon, #portNodes, #monitorViews, #exceptionButtons, #viewModes, #actorButtons, #architectureButtons, #passportTabs');

  sequenceTargets.forEach((node) => {
    if (!node.classList.contains('journey-sequence')) node.classList.add(node.matches('.system-flow,.scene-zones,.exception-response-path,.recall-tree') ? 'process-list' : 'journey-sequence');
    node.dataset.processFlow = 'interactive';
    node.tabIndex = 0;
    if (!node.hasAttribute('aria-label') && !node.hasAttribute('aria-labelledby')) node.setAttribute('aria-label', 'Interactive process sequence');
  });

  if (reduced || !('IntersectionObserver' in window)) return;

  revealTargets.forEach((node, index) => {
    node.classList.add('motion-reveal');
    node.style.setProperty('--motion-order', String(index % 4));
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -8% 0px' });

  document.body.classList.add('motion-ready');
  revealTargets.forEach((node) => observer.observe(node));
})();
