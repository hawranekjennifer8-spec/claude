/* MAGNIFIO · Motion & Mobile-CRO (MASTER-AUDIT 2026-10) – ohne Abhängigkeiten, ~2 KB */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1) Hero: ein einziger, orchestrierter Auftritt beim Laden */
  function initHero() {
    var hero = document.querySelector('.mfc-hero');
    if (!hero) return;
    var go = function () { requestAnimationFrame(function () { hero.classList.add('is-ready'); }); };
    if (reduce) { hero.classList.add('is-ready'); return; }
    var img = hero.querySelector('.mfc-hero__img img');
    if (img && !img.complete) {
      img.addEventListener('load', go, { once: true });
      img.addEventListener('error', go, { once: true });
      setTimeout(go, 1200); /* Fallback: Text nie unsichtbar lassen */
    } else { go(); }
  }

  /* 2) Mobile Sticky "In den Warenkorb" – spiegelt den echten Button */
  function initStickyATC() {
    var form = document.querySelector('form[data-type="add-to-cart-form"]');
    if (!form) return;
    var main = form.querySelector('button[name="add"]');
    if (!main) return;
    var titleEl = document.querySelector('.product__title h1, .product__title .h1');
    var priceEl = document.querySelector('.product__info-container .price-item--last, .product__info-container .price-item--regular');

    var bar = document.createElement('div');
    bar.className = 'mf-sticky-atc';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = '<div class="mf-sticky-atc__info"><p class="mf-sticky-atc__title"></p><p class="mf-sticky-atc__price"></p></div><button type="button" class="mf-sticky-atc__btn" tabindex="-1"></button>';
    var bTitle = bar.querySelector('.mf-sticky-atc__title'), bPrice = bar.querySelector('.mf-sticky-atc__price'), bBtn = bar.querySelector('.mf-sticky-atc__btn');

    function sync() {
      bTitle.textContent = titleEl ? titleEl.textContent.trim() : '';
      var p = document.querySelector('.product__info-container .price-item--last, .product__info-container .price-item--regular');
      bPrice.textContent = p ? p.textContent.trim() : '';
      var label = main.querySelector('span');
      bBtn.textContent = (label ? label.textContent : main.textContent).trim();
      bBtn.disabled = main.disabled;
    }
    sync();
    new MutationObserver(sync).observe(main, { attributes: true, childList: true, subtree: true, characterData: true });
    var info = document.querySelector('.product__info-container');
    if (info) new MutationObserver(sync).observe(info, { childList: true, subtree: true });

    bBtn.addEventListener('click', function () {
      if (main.disabled) return;
      main.click();
    });
    document.body.appendChild(bar);

    var ticking = false;
    function check() {
      ticking = false;
      var r = main.getBoundingClientRect();
      bar.classList.toggle('is-visible', r.bottom < 0);
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(check); } }, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    check();
  }

  function init() { initHero(); initStickyATC(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
