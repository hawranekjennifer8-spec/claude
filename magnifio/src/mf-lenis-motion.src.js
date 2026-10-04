/* MAGNIFIO · Smooth Scroll + Scroll-Reveals (MASTER-AUDIT 2026-10)
   Lenis (MIT, darkroom.engineering) + Motion (MIT, motion.dev) – gebündelt, tree-shaken.
   Regeln: nur Desktop mit Maus/Trackpad, nie bei prefers-reduced-motion, Inhalte sind ohne JS sichtbar. */
import Lenis from 'lenis';
import { animate } from 'motion/mini';
import { inView, stagger } from 'motion';

const mq = (q) => window.matchMedia && window.matchMedia(q).matches;
const reduce = mq('(prefers-reduced-motion: reduce)');
const fine = mq('(hover: hover) and (pointer: fine)');
const EASE = [0.16, 1, 0.3, 1];

/* 1) Lenis – sanftes Scrollen nur auf Desktop */
function initLenis() {
  if (reduce || !fine) return null;
  const lenis = new Lenis({
    lerp: 0.11,
    wheelMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    anchors: true,
    autoRaf: true,
    prevent: (node) =>
      !!(node.closest && node.closest('.drawer, cart-drawer, menu-drawer, .menu-drawer, details-modal, .modal, .predictive-search, .header__submenu, [data-lenis-prevent], iframe, .shopify-section-group-overlay-group')),
  });
  document.documentElement.classList.add('mf-lenis');
  /* Theme-Scroll-Locks (Drawer, Menü, Suche) respektieren */
  const locked = () => /\boverflow-hidden(-mobile|-tablet|-desktop)?\b/.test(document.body.className);
  const sync = () => (locked() ? lenis.stop() : lenis.start());
  new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
  sync();
  window.MFLenis = lenis;
  return lenis;
}

/* 2) Reveals – ruhig, einmalig, gestaffelt */
function reveal(groups) {
  groups.forEach(({ root, items, y = 18, blur = 0, gap = 0.07 }) => {
    document.querySelectorAll(root).forEach((el) => {
      const targets = items ? Array.from(el.querySelectorAll(items)).slice(0, 12) : [el];
      if (!targets.length) return;
      /* Was beim Laden schon sichtbar ist, bleibt unangetastet (kein Flackern, kein CLS) */
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92) return;
      targets.forEach((t) => {
        t.style.opacity = '0';
        t.style.transform = `translateY(${y}px)`;
        if (blur) t.style.filter = `blur(${blur}px)`;
      });
      const show = () => {
        const kf = { opacity: [0, 1], transform: [`translateY(${y}px)`, 'translateY(0px)'] };
        if (blur) kf.filter = [`blur(${blur}px)`, 'blur(0px)'];
        const a = animate(targets, kf, { duration: 0.9, ease: EASE, delay: stagger(gap) });
        a.then(() => targets.forEach((t) => { t.style.transform = ''; t.style.filter = ''; t.style.opacity = ''; }));
      };
      inView(el, () => { show(); }, { amount: 0.15, margin: '0px 0px -5% 0px' });
      /* Sicherheitsnetz: nach 4 s alles sichtbar, falls ein Observer nicht feuert */
      setTimeout(() => targets.forEach((t) => { if (t.style.opacity === '0') { t.style.opacity = ''; t.style.transform = ''; t.style.filter = ''; } }), 4000);
    });
  });
}

/* 3) Hero-Parallaxe – sehr dezent, nur Desktop */
function initParallax() {
  if (!fine) return;
  const hero = document.querySelector('.mfc-hero');
  if (!hero) return;
  const imgs = Array.from(hero.querySelectorAll('.mfc-hero__img'));
  const copy = hero.querySelector('.mfc-hero__copy');
  let ticking = false;
  const update = () => {
    ticking = false;
    const h = hero.offsetHeight || 1;
    const p = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / h));
    imgs.forEach((img, i) => { img.style.transform = p ? `translate3d(0,${(p * (i ? 48 : 72)).toFixed(1)}px,0)` : ''; });
    if (copy) copy.style.opacity = p ? String(1 - p * 0.85) : '';
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

function init() {
  initLenis();
  if (reduce) return;
  reveal([
    { root: '.mfc-rail__head, .mfc-cats .mfc-h2, .collection-hero__title, .rich-text__heading', blur: 6, y: 10 },
    { root: '.mfc-track', items: '.mfc-card', y: 22, gap: 0.06 },
    { root: '.mfc-cats__grid', items: '.mfc-cat', y: 22 },
    { root: '.mfc-split', items: '.mfc-tile', y: 28, gap: 0.12 },
    { root: '.mfc-chips__row', items: '.mfc-chip', y: 10, gap: 0.03 },
    { root: '#product-grid', items: '.grid__item', y: 22, gap: 0.05 },
    { root: '.newsletter__wrapper, .footer__content-top', y: 16 },
  ]);
  initParallax();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
