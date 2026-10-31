(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAIL = 'info@webers-wikinger.de';
// Öffnungszeiten (Webers Wikinger): Di–Fr 16:30, Sa 11:30, letzte Online-Reservierung 21:30; So/Mo Ruhetag
const OPEN = {2:[16,30],3:[16,30],4:[16,30],5:[16,30],6:[11,30]}, LAST = [21,30], LEAD = 24*36e5;
const pad = n => String(n).padStart(2,'0');
const DAYS = ['So','Mo','Di','Mi','Do','Fr','Sa'];

/* heute geöffnet */
const now = new Date(), o = OPEN[now.getDay()];
$('#todayHours').textContent = o ? `Heute ab ${o[0]}:${pad(o[1])} Uhr geöffnet` : 'Heute Ruhetag · Di – Sa geöffnet';

/* smooth scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.09}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset: a.getAttribute('href') === '#top' ? 0 : -70, duration:1.4}) : t.scrollIntoView(); }));

/* intro: Logo wächst ins Bild, Fläche hebt sich */
const seen = sessionStorage.getItem('ww-intro');
const heroIn = () => gsap.from('.door-txt .h1 span, .door-txt .label', {y:60, opacity:0, duration:1.2, stagger:.12, ease:'power3.out'});
if (seen || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('ww-intro', '1'); lenis && lenis.stop();
  gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
    .to('.intro-logo', {clipPath:'inset(0% 0 0 0)', duration:1.5, ease:'power2.inOut'})
    .to('#intro p', {opacity:1, duration:.6}, '-=.3')
    .to('#intro', {yPercent:-100, duration:1.1, ease:'power4.inOut'}, '+=.5')
    .from('.door-pic', {'--m':12, duration:1.3, ease:'power3.out'}, '-=.7')
    .add(heroIn, '-=1');
}

/* Header */
const onS = () => $('#hdr').classList.toggle('solid', scrollY > 80); addEventListener('scroll', onS, {passive:true}); onS();
ScrollTrigger.create({trigger:'#stein', start:'top 80%', endTrigger:'#reservieren', end:'top 90%', onToggle: s => $('.mres').classList.toggle('hide', !s.isActive)});

/* Scroll-Story: Zeltbogen öffnet sich, Vision erscheint */
if (!RM) {
  const mob = innerWidth < 640;
  gsap.set('.door-pic', {'--m': mob ? 100 : 70});
  gsap.timeline({scrollTrigger:{trigger:'.door', start:'top top', end:'bottom bottom', scrub:.6}})
    .to('.door-txt, .door-foot', {opacity:0, y:-40, duration:.3}, 0)
    .to('.door-pic', {'--m': mob ? 260 : 140, duration:1, ease:'power1.inOut'}, 0)
    .to('.door-pic img', {scale:1, duration:1}, 0);
}

/* Reveals */
$$('.vision, .label, .h2, .body, .menu li, .room, .notes, .htable, .ctas').forEach(el => {
  if (el.closest('.door')) return;
  gsap.from(el, {y:40, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el, start: el.matches('.vision') ? 'top bottom' : 'top 88%'}});
});

/* Heißer Stein: Garstufen-Marke + Bildzoom */
gsap.to('#garDot', {left:'calc(100% - 11px)', ease:'none', scrollTrigger:{trigger:'.stein', start:'top 70%', end:'bottom 40%', scrub:.5}});
gsap.fromTo('.stein-pic img', {scale:1.18}, {scale:1, ease:'none', scrollTrigger:{trigger:'.stein', start:'top bottom', end:'bottom top', scrub:true}});
gsap.fromTo('.gin-pic img', {scale:1.15, yPercent:-4}, {scale:1, yPercent:4, ease:'none', scrollTrigger:{trigger:'.gin', start:'top bottom', end:'bottom top', scrub:true}});

/* Speisekarte: Foto folgt dem Cursor */
const peek = $('#peek'), pimg = peek.querySelector('img');
if (matchMedia('(pointer:fine)').matches) {
  const qx = gsap.quickTo(peek, 'x', {duration:.6, ease:'power3'}), qy = gsap.quickTo(peek, 'y', {duration:.6, ease:'power3'});
  addEventListener('mousemove', e => { qx(e.clientX - 150); qy(e.clientY - 190); });
  $$('.menu li').forEach(li => {
    li.addEventListener('mouseenter', () => { pimg.src = li.dataset.img; gsap.to(peek, {opacity:1, scale:1, rotate:li.dataset.r || -3, duration:.4}); });
    li.addEventListener('mouseleave', () => gsap.to(peek, {opacity:0, scale:.85, duration:.3}));
  });
}

/* Das Haus: Linien zeichnen, Zähler, Hotspots */
$$('.plan-svg .ln').forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = RM ? 0 : L; });
if (!RM) gsap.to('.plan-svg .ln', {strokeDashoffset:0, duration:2.4, stagger:.18, ease:'power2.inOut', scrollTrigger:{trigger:'.plan', start:'top 75%'}});
const c = $('.cnt'); gsap.from(c, {textContent:0, duration:1.8, snap:{textContent:1}, ease:'power2.out', scrollTrigger:{trigger:c, start:'top 85%'}});
const ROOMS = {
  empore:{img:'img/innen1.webp', alt:'Gastraum mit Holzbalken', n:'60', h:'Plätze auf der Empore.', t:'Zusammen mit den 45 Plätzen im Erdgeschoss bietet unser Haus über 105 Gästen Platz.'},
  eg:{img:'img/innen3.webp', alt:'Gedeckte Tische unter Holzbalken', n:'45', h:'Plätze im Erdgeschoss.', t:'Holzbalken, gedeckte Tische – zu jeder Jahreszeit ein einzigartiges Ambiente.'},
  kamin:{img:'img/kamin.webp', alt:'Brennender Kamin im Restaurant', n:'Winter', h:'Urgemütliche Kaminatmosphäre.', t:'Im Winter zeichnet sich unser Restaurant durch eine urgemütliche Kaminatmosphäre aus.'},
  terrasse:{img:'img/terrasse1.webp', alt:'Terrasse in der Altstadt mit Sonnenschirmen', n:'Sommer', h:'Eine der schönsten Terrassen der Altstadt.', t:'Im Sommer speist man bei uns draußen, mitten in der Wiesbadener Altstadt.'}
};
$$('.hot').forEach(b => b.addEventListener('click', () => {
  if (b.classList.contains('on')) return;
  $$('.hot').forEach(x => x.classList.toggle('on', x === b));
  const r = ROOMS[b.dataset.k];
  gsap.to('#room', {opacity:0, y:14, duration:.25, onComplete(){
    $('#roomImg').src = r.img; $('#roomImg').alt = r.alt; $('#roomN').textContent = r.n; $('#roomH').textContent = r.h; $('#roomT').textContent = r.t;
    gsap.to('#room', {opacity:1, y:0, duration:.5, ease:'power3.out'});
  }});
}));
Object.values(ROOMS).forEach(r => { new Image().src = r.img; });

/* Reservierung als Satz */
const fDay = $('#fDay'), fTime = $('#fTime'), fG = $('#fGuests');
for (let i = 1; i <= 10; i++) fG.add(new Option(i, i, false, i === 2));
const slotsFor = d => {
  const op = OPEN[d.getDay()]; if (!op) return [];
  const out = [];
  for (let m = op[0]*60 + op[1]; m <= LAST[0]*60 + LAST[1]; m += 30) {
    const t = new Date(d); t.setHours(Math.floor(m/60), m%60, 0, 0);
    if (t - Date.now() >= LEAD) out.push(`${pad(t.getHours())}:${pad(t.getMinutes())}`);
  }
  return out;
};
for (let i = 0; i < 60; i++) {
  const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate() + i);
  if (slotsFor(d).length) fDay.add(new Option(`${DAYS[d.getDay()]}, ${pad(d.getDate())}.${pad(d.getMonth()+1)}.`, d.toISOString().slice(0,10)));
}
const fillTimes = () => {
  const d = new Date(fDay.value + 'T12:00'), keep = fTime.value; fTime.length = 0;
  slotsFor(d).forEach(s => fTime.add(new Option(s, s, false, s === keep)));
  if (!fTime.value) fTime.value = fTime.options[Math.min(4, fTime.length-1)].value;
};
fDay.addEventListener('change', fillTimes); fillTimes();

$('#rform').addEventListener('input', e => e.target.closest('.f')?.classList.remove('bad'));
$('#rform').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = Object.fromEntries(new FormData(f));
  const bad = ['name','tel'].filter(k => !v[k].trim() || (k === 'tel' && v.tel.replace(/\D/g,'').length < 6));
  $$('.f').forEach(l => l.classList.toggle('bad', bad.includes(l.querySelector('input,select').name)));
  if (bad.length) { $('#err').textContent = 'Bitte Name und Telefonnummer eintragen.'; f.querySelector(`[name=${bad[0]}]`).focus(); return; }
  $('#err').textContent = '';
  const day = fDay.options[fDay.selectedIndex].text + new Date(fDay.value).getFullYear();
  const area = v.area || 'egal';
  const subject = `Reservierungsanfrage – ${day}, ${v.time} Uhr, ${v.guests} Personen`;
  const body = `Liebes Team vom Webers Wikinger,\n\nich möchte gern einen Tisch reservieren:\n\nTag: ${day}\nUhrzeit: ${v.time} Uhr\nPersonen: ${v.guests}\nPlatzwunsch: ${area}\n\nName: ${v.name}\nTelefon: ${v.tel}${v.mail ? `\nE-Mail: ${v.mail}` : ''}${v.note ? `\nAnmerkung: ${v.note}` : ''}\n\nIch freue mich auf Ihre Bestätigung.\nViele Grüße\n${v.name}`;
  const href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#mailFallback').href = href;
  $('#thanksT').textContent = `${day} um ${v.time} Uhr · ${v.guests} ${v.guests === '1' ? 'Person' : 'Personen'}${v.area ? ' · ' + v.area : ''}`;
  f.hidden = true; $('#thanks').hidden = false;
  gsap.from('#thanks > *', {y:30, opacity:0, stagger:.1, duration:.8, ease:'power3.out'});
  location.href = href;
});

addEventListener('load', () => ScrollTrigger.refresh());
})();
