(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mob = () => innerWidth <= 760;
  const root = document.documentElement;
  if (reduce) root.classList.add('reduce');

  // Intro (einmal pro Sitzung)
  const intro = $('#intro');
  let seen = false;
  try { seen = sessionStorage.getItem('zw-intro') === '1'; sessionStorage.setItem('zw-intro', '1'); } catch (e) {}
  if (seen || reduce || !window.gsap) { root.classList.add('no-intro'); }
  else {
    document.body.style.overflow = 'hidden';
    gsap.timeline({ onComplete: () => { intro.remove(); document.body.style.overflow = ''; } })
      .to('.intro-ring circle', { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' })
      .fromTo('.intro-logo', { opacity: 0, scale: .9 }, { opacity: 1, scale: 1, duration: .6, ease: 'power2.out' }, '-=.5')
      .to(intro, { clipPath: 'circle(0% at 50% 50%)', duration: .8, ease: 'power3.inOut', delay: .35 });
  }
  if (!window.gsap) { root.classList.add('no-js'); return; }
  gsap.registerPlugin(ScrollTrigger);

  // Smooth Scroll
  if (!reduce && window.Lenis) {
    const lenis = new Lenis({ lerp: .1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis.scrollTo(t, { offset: a.getAttribute('href') === '#top' ? 0 : -70 });
    }));
  }

  // Hero-Portal: der Logo-Kreis öffnet sich
  const hero = $('#hero');
  const r0 = () => mob() ? innerWidth * .34 : Math.min(innerWidth, innerHeight) * .30;
  const rMax = () => Math.hypot(innerWidth, innerHeight);
  if (!reduce) {
    gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: '+=130%', pin: true, scrub: .6, invalidateOnRefresh: true } })
      .fromTo(hero, { '--r': () => r0() + 'px', '--z': 1.12, '--sh': 0 }, { '--r': () => rMax() + 'px', '--z': 1, '--sh': 1, ease: 'power2.in', duration: 1 })
      .to('.hero-txt', { opacity: 0, y: -50, duration: .35 }, 0)
      .to('.portal-ring', { opacity: 0, duration: .3 }, .1)
      .to('.portal-cap', { opacity: 1, duration: .25 }, .78);
  }

  // Einblenden
  $$('.rv').forEach(el => gsap.to(el, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
  $$('.praxis-img img, .fam-imgs img').forEach(img => gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true } }));

  // Lichtstimmungen
  const panels = $$('.panel');
  let pi = 0, auto = null;
  const setP = i => { pi = i; panels.forEach((p, k) => p.classList.toggle('on', k === i)); };
  panels.forEach((p, i) => { p.addEventListener('click', () => { clearInterval(auto); setP(i); }); p.addEventListener('mouseenter', () => { if (!mob()) { clearInterval(auto); setP(i); } }); });
  ScrollTrigger.create({ trigger: '#panels', start: 'top 70%', once: true, onEnter: () => { if (!reduce) auto = setInterval(() => setP((pi + 1) % panels.length), 3200); } });

  // Lupe (2,4-fach)
  const lupe = $('#lupe'), lens = $('#lens'), limg = $('#lupe img'), Z = 2.4;
  let touched = false, t0 = 0;
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
  gsap.ticker.add(t => {
    if (touched || !lupe.clientWidth) return;
    const w = lupe.clientWidth, h = lupe.clientHeight;
    placeLens(w * (.5 + .3 * Math.sin(t * .5)), h * (.45 + .28 * Math.sin(t * .37 + 1)));
  });

  // Rundgang horizontal (Desktop)
  const track = $('#track');
  ScrollTrigger.matchMedia({
    '(min-width: 761px)': () => {
      const dist = () => Math.max(0, track.scrollWidth - innerWidth);
      gsap.to(track, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: '.tour', start: 'top top', end: () => '+=' + dist(), pin: true, scrub: .6, invalidateOnRefresh: true } });
    }
  });

  // Öffnungsstatus (Zeit in Wiesbaden)
  const now = new Intl.DateTimeFormat('de-DE', { timeZone: 'Europe/Berlin', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const wd = now.find(p => p.type === 'weekday').value.replace('.', ''), hm = +now.find(p => p.type === 'hour').value * 60 + +now.find(p => p.type === 'minute').value;
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
  $('#statusTxt').textContent = txt; $('#status').classList.toggle('closed', !open);

  // Termin-Anfrage
  $$('.chips').forEach(c => c.addEventListener('click', e => {
    const b = e.target.closest('.chip'); if (!b) return;
    if (c.classList.contains('multi')) b.classList.toggle('on');
    else { $$('.chip', c).forEach(x => x.classList.toggle('on', x === b)); }
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
    mbar.classList.toggle('show', scrollY > innerHeight * 1.6 && !(tb.top < innerHeight && tb.bottom > 0));
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  addEventListener('load', () => ScrollTrigger.refresh());
})();
