(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAIL = 'info@autolackiererei-wiesbaden.de';
const TONES = [['Signalrot','#B5140F','#FF6A5F'],['Tiefschwarz','#16181B','#C9CDD2'],['Brillantsilber','#8E9399','#E6E9EC'],['Tiefseeblau','#1F3A5F','#8DB4E8'],['Polarweiß','#E9E7E1','#FFFFFF'],['Racinggrün','#2F4A3A','#9CCFAE']];

/* Smooth Scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.09}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset:-60, duration:1.3}) : t.scrollIntoView(); }));

/* Intro: Spritzgang lackiert die Wortmarke */
const heroIn = () => {
  gsap.from('.hero-txt > *', {y:40, opacity:0, duration:1.1, stagger:.1, ease:'power3.out'});
  gsap.from('.swatch', {y:60, opacity:0, rotate:4, duration:1.3, delay:.2, ease:'power3.out'});
  gsap.from('.facts li', {y:24, opacity:0, stagger:.07, duration:.8, delay:.5});
};
if (sessionStorage.getItem('gt-intro') || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('gt-intro', '1'); lenis && lenis.stop();
  gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
    .to('.i-mist', {x:'160vw', duration:1.5, ease:'power2.inOut'})
    .to('.i-paint', {clipPath:'inset(0 0% 0 0)', duration:1.25, ease:'power2.inOut'}, .15)
    .to('.i-sub', {opacity:1, duration:.5}, '-=.3')
    .to('#intro', {clipPath:'inset(0 0 100% 0)', duration:.9, ease:'power4.inOut'}, '+=.35')
    .add(heroIn, '-=.5');
}

/* Kopfleiste & Handy-Leiste */
const onS = () => $('#hdr').classList.toggle('solid', scrollY > 60); addEventListener('scroll', onS, {passive:true}); onS();
const mbar = $('#mbar');
const mb = () => { const st = ScrollTrigger.getById('dmgS'); mbar.classList.toggle('hide', scrollY < innerHeight*.6 || (st && st.isActive)); };
ScrollTrigger.create({id:'dmgS', trigger:'#schaden', start:'top 80%', end:'bottom 30%', onToggle: mb});
addEventListener('scroll', mb, {passive:true}); mb();

/* Lackprobe: Farbton wählen, Glanzlicht folgt Finger/Maus */
const panel = $('#panel');
$('#chips').innerHTML = TONES.map(([n, c], i) => `<button type="button" role="radio" aria-checked="${!i}" aria-label="${n}" style="background:${c}"></button>`).join('');
const setTone = i => {
  const [n, c, h] = TONES[i];
  document.documentElement.style.setProperty('--paint', c); document.documentElement.style.setProperty('--hl', h);
  $('#swName').textContent = n; $('#swNo').textContent = String(i+1).padStart(2, '0');
  $$('#chips button').forEach((b, j) => b.setAttribute('aria-checked', i === j));
};
$$('#chips button').forEach((b, i) => b.addEventListener('click', () => { setTone(i); auto && auto.kill(); auto = null; }));
setTone(0);
let auto = RM ? null : gsap.delayedCall(4, function cyc(){ setTone((TONES.findIndex(t => t[0] === $('#swName').textContent) + 1) % TONES.length); auto = gsap.delayedCall(4, cyc); });
const spec = $('#spec');
const mv = e => { const r = panel.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; gsap.to(spec, {'--x':(p.clientX - r.left)/r.width*100+'%', '--y':(p.clientY - r.top)/r.height*100+'%', duration:.6, ease:'power3.out'}); };
panel.addEventListener('pointermove', mv); panel.addEventListener('touchmove', mv, {passive:true});
if (!RM) gsap.to(spec, {'--y':'70%', ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});

/* Farbfächer: Leistungen fächern sich auf (Desktop) */
ScrollTrigger.matchMedia({'(min-width: 1001px)': () => {
  const cards = $$('#fan li'), n = cards.length;
  gsap.set(cards, {rotate:0});
  gsap.timeline({scrollTrigger:{trigger:'.fan-sec', start:'top top', end:'+=1400', scrub:.6, pin:true}})
    .to(cards, {rotate:i => -62 + i*(62/(n-1))*1.0, y:i => -i*6, ease:'none', stagger:0});
}});

/* Schaden-Check */
const zones = new Set();
const syncZ = () => {
  $$('.zn').forEach(z => z.classList.toggle('on', zones.has(z.dataset.z)));
  $('#zoneList').innerHTML = [...zones].map(z => `<button type="button" data-z="${z}">${z}</button>`).join('');
  $('#zoneHint').textContent = zones.size ? `${zones.size} Stelle${zones.size > 1 ? 'n' : ''} gewählt` : 'Stelle antippen';
};
const tog = z => { zones.has(z) ? zones.delete(z) : zones.add(z); syncZ(); };
$$('.zn').forEach(z => { z.setAttribute('tabindex', '0'); z.setAttribute('role', 'button'); z.setAttribute('aria-label', z.dataset.z);
  z.addEventListener('click', () => tog(z.dataset.z)); z.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); tog(z.dataset.z); } }); });
$('#zoneList').addEventListener('click', e => { const b = e.target.closest('button'); if (b) tog(b.dataset.z); });
$('#kinds').addEventListener('click', e => { const b = e.target.closest('button'); if (b) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true'); });
$('#dform').addEventListener('input', e => e.target.classList.remove('bad'));
$('#dform').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = Object.fromEntries(new FormData(f));
  const bad = ['name','tel'].filter(k => !v[k].trim() || (k === 'tel' && v.tel.replace(/\D/g,'').length < 6));
  f.querySelectorAll('input').forEach(i => i.classList.toggle('bad', bad.includes(i.name)));
  if (bad.length) { $('#err').textContent = 'Bitte Name und Telefonnummer eintragen.'; f.querySelector(`[name=${bad[0]}]`).focus(); return; }
  $('#err').textContent = '';
  const kinds = $$('#kinds [aria-pressed=true]').map(b => b.textContent), where = [...zones];
  const subject = `Schadensanfrage${v.car ? ' – ' + v.car : ''}`;
  const body = `Guten Tag,\n\nich möchte einen Schaden melden:\n\nFahrzeug: ${v.car || '–'}\nStelle: ${where.length ? where.join(', ') : '–'}\nSchadensart: ${kinds.length ? kinds.join(', ') : '–'}\n\nFotos vom Schaden hänge ich an.\n\nName: ${v.name}\nTelefon: ${v.tel}\n\nViele Grüße\n${v.name}`;
  const href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#mailFb').href = href; $('#sentT').textContent = [where.join(', '), kinds.join(', ')].filter(Boolean).join(' · ') || 'Ihre Anfrage';
  f.hidden = true; $('#sent').hidden = false;
  gsap.from('#sent > *', {y:20, opacity:0, stagger:.08, duration:.6});
  location.href = href;
});

/* Werkstatt-Strecke */
$('#strip').innerHTML = Array.from({length:19}, (_, i) => `<figure><img src="img/w${i+1}.webp" width="1050" height="700" alt="Aus der Werkstatt der Autolackiererei Götter" loading="lazy"></figure>`).join('');
ScrollTrigger.matchMedia({'(min-width: 1001px)': () => {
  const st = $('#strip');
  gsap.to(st, {x:() => -(st.scrollWidth - innerWidth + 48), ease:'none', scrollTrigger:{trigger:'.shop', start:'top top', end:() => '+=' + (st.scrollWidth - innerWidth), pin:true, scrub:.6, invalidateOnRefresh:true}});
}});

/* Öffnungszeiten live (Europe/Berlin) */
const H = {1:[8,19],2:[8,19],3:[8,19],4:[8,19],5:[8,17],6:[9,12]};
const now = new Date(new Date().toLocaleString('en-US', {timeZone:'Europe/Berlin'})), d = now.getDay(), h = now.getHours() + now.getMinutes()/60;
$(`#hours tr[data-d="${d}"]`).classList.add('today');
const open = H[d] && h >= H[d][0] && h < H[d][1];
$('#now').classList.add(open ? 'open' : 'closed'); $('#now span').textContent = open ? 'Jetzt geöffnet' : 'Gerade geschlossen';

/* Reveals */
$$('.fan-head > *, .dmg .label, .dmg .h2, .dmg .body, .car-box, .dform, .shop-head > *, .qual .label, .qual .h2, .q-grid article, .k-grid > *').forEach(el =>
  gsap.from(el, {y:40, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 90%'}}));

addEventListener('load', () => ScrollTrigger.refresh());
})();
