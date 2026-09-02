/* Mehmet Oğuz Tulum — portfolio
   Three small behaviours, no dependencies:
   1. mobile menu toggle
   2. nav hairline on scroll + active section highlighting
   3. entrance reveals (skipped entirely under prefers-reduced-motion) */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Mobile menu ------------------------------------------------- */
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    menu.removeAttribute('data-open');
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      if (open) { menu.removeAttribute('data-open'); }
      else { menu.setAttribute('data-open', 'true'); }
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 820) closeMenu();
    });
  }

  /* ---- 2. Nav state --------------------------------------------------- */
  var nav = document.getElementById('site-nav');
  var ticking = false;

  function clearCurrent() {
    var marked = document.querySelectorAll('.nav__link[aria-current]');
    Array.prototype.forEach.call(marked, function (link) { link.removeAttribute('aria-current'); });
  }

  function onScroll() {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 8);
    // Near the top no section is "current" — clear any lingering highlight.
    if (window.scrollY < window.innerHeight * 0.45) clearCurrent();
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        if (window.scrollY < window.innerHeight * 0.45) { clearCurrent(); return; }
        navLinks.forEach(function (link) {
          var match = link.getAttribute('href') === '#' + entry.target.id;
          if (match) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* ---- 3. Entrance reveals -------------------------------------------- */
  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  } else {
    var reveal = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(revealables, function (el) { reveal.observe(el); });
  }

  /* ---- Footer year ---------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
