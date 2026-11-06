(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mob = () => innerWidth <= 760;
  const root = document.documentElement;
  if (reduce) root.classList.add('reduce');
  if (!window.gsap) { root.classList.add('no-js'); }

  // Smooth Scroll
  let lenis = null;
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger);
    if (!reduce && window.Lenis) {
      lenis = new Lenis({ lerp: .1 });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    }
    // Hero: Zahn-Linie zeichnet sich, Inhalte erscheinen
    const outline = $('#toothOutline'), len = outline.getTotalLength();
    const hu = $('.hero-tooth use');
    hu.style.strokeDasharray = len; hu.style.strokeDashoffset = reduce ? 0 : len;
    if (!reduce) {
      gsap.to(hu, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', delay: .2 });
      gsap.from('.hero-txt > *', { opacity: 0, y: 24, duration: .9, stagger: .08, ease: 'power3.out' });
      gsap.from('.hero-img', { opacity: 0, scale: .96, duration: 1.1, ease: 'power3.out' });
      gsap.from('.hero-card', { opacity: 0, y: 20, duration: .8, delay: .5, ease: 'power3.out' });
      gsap.to('.hero-img img', { yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }
    $$('.rv').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t || !lenis) return; e.preventDefault(); lenis.scrollTo(t, { offset: a.getAttribute('href') === '#top' ? 0 : -76 });
  }));

  // Zahn-Querschnitt: aktiver Fachbereich
  const tooth = $('#tooth'), steps = $$('.step');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    steps.forEach(s => s.classList.toggle('on', s === e.target));
    tooth.dataset.a = e.target.dataset.s;
  }), { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach(s => io.observe(s));
  tooth.dataset.a = '0';

  // Lupe (2,4-fach)
  const lupe = $('#lupe'), lens = $('#lens'), limg = $('#lupe img'), Z = 2.4;
  let touched = false;
  const placeLens = (x, y) => {
    const w = lupe.clientWidth, h = lupe.clientHeight, iw = limg.naturalWidth || 1067, ih = limg.naturalHeight || 1600;
    const s = Math.max(w / iw, h / ih), dw = iw * s, dh = ih * s, ox = (w - dw) / 2, oy = (h - dh) / 2, R = lens.offsetWidth / 2;
    lens.style.transform = `translate(${x}px,${y}px)`;
    lens.style.backgroundImage = `url(${limg.currentSrc || limg.src})`;
    lens.style.backgroundSize = `${dw * Z}px ${dh * Z}px`;
    lens.style.backgroundPosition = `${-((x - ox) * Z - R)}px ${-((y - oy) * Z - R)}px`;
  };
  lupe.addEventListener('pointermove', e => { touched = true; const b = lupe.getBoundingClientRect(); placeLens(e.clientX - b.left, e.clientY - b.top); });
  lupe.addEventListener('pointerleave', () => { touched = false; });
  const autoLens = t => { if (!touched && lupe.clientWidth) placeLens(lupe.clientWidth * (.5 + .28 * Math.sin(t * .5)), lupe.clientHeight * (.45 + .26 * Math.sin(t * .37 + 1))); };
  if (window.gsap) gsap.ticker.add(autoLens); else autoLens(0);

  // Öffnungsstatus (Zeit in Wiesbaden)
  const parts = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const wd = parts.find(p => p.type === 'weekday').value.replace('.', ''), hm = +parts.find(p => p.type === 'hour').value * 60 + +parts.find(p => p.type === 'minute').value;
  const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'], d = days.indexOf(wd);
  const slots = k => k === 0 ? [] : k === 6 ? [[540, 840]] : [[480, 780], [840, 1080]];
  const fmt = m => String(m / 60 | 0).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  let txt, open = false;
  const cur = slots(d).find(([a, b]) => hm >= a && hm < b);
  if (cur) { open = true; txt = `Jetzt geöffnet · bis ${fmt(cur[1])} Uhr`; }
  else {
    const later = slots(d).find(([a]) => hm < a);
    if (later) txt = (d !== 6 && hm >= 780 ? 'Mittagspause' : 'Noch geschlossen') + ` · ab ${fmt(later[0])} Uhr`;
    else { let k = (d + 1) % 7; while (!slots(k).length) k = (k + 1) % 7; txt = `Geschlossen · öffnet ${days[k]} ${fmt(slots(k)[0][0])} Uhr`; }
  }
  $('#statusTxt').textContent = $('#status0').textContent = txt;
  $$('.dot', $('#status')).concat($('#dot0')).forEach(x => x.classList.toggle('closed', !open));

  // Termin-Anfrage
  $$('.chips').forEach(c => c.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    if (c.classList.contains('multi')) b.classList.toggle('on');
    else $$('.chip', c).forEach(x => x.classList.toggle('on', x === b));
    if (c.dataset.name === 'anliegen') $('#urgent').hidden = !b.hasAttribute('data-urgent');
  }));
  const pick = n => $$(`.chips[data-name="${n}"] .chip.on`).map(b => b.textContent).join(', ') || 'egal';
  $('#termin').addEventListener('submit', e => {
    e.preventDefault();
    const f = e.target, name = f.name.value.trim(), tel = f.tel.value.trim();
    $('#err').hidden = !!(name && tel); if (!name || !tel) return;
    const body = `Guten Tag,\n\nich möchte einen Termin anfragen.\n\nAnliegen: ${pick('anliegen')}\nWunschtage: ${pick('tage')}\nTageszeit: ${pick('zeit')}\nNeu in der Praxis: ${f.neu.checked ? 'ja' : 'nein'}\n\nName: ${name}\nTelefon: ${tel}\n\nBitte rufen Sie mich zur Terminabstimmung zurück.`;
    location.href = 'mailto:info@zahnwelt-wiesbaden.de?subject=' + encodeURIComponent('Terminanfrage über die Website') + '&body=' + encodeURIComponent(body);
  });

  // Header + Handy-Leiste
  const hdr = $('#hdr'), mbar = $('#mbar');
  const onScroll = () => {
    hdr.classList.toggle('scrolled', scrollY > 10);
    const tb = $('#termin').getBoundingClientRect();
    mbar.classList.toggle('show', scrollY > innerHeight * .9 && !(tb.top < innerHeight && tb.bottom > 0));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  addEventListener('load', () => window.ScrollTrigger && ScrollTrigger.refresh());
})();
