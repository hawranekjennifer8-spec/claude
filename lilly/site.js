(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAIL = 'info.lillyslounge@web.de';
const ZONES = ['Gesicht','Achseln','Arme','Brust & Bauch','Rücken','Bikinizone','Beine'];

/* Smooth Scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.085}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset:-60, duration:1.5}) : t.scrollIntoView(); }));

/* Intro: Laserlinie, Wappen mit Glanzlicht, Bild teilt sich */
const heroIn = () => gsap.from('.hero-in > *', {y:50, opacity:0, duration:1.3, stagger:.12, ease:'power3.out'});
if (sessionStorage.getItem('ll-intro') || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('ll-intro', '1'); lenis && lenis.stop();
  gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
    .to('.i-line', {scaleX:1, duration:.9, ease:'power3.inOut'})
    .to('.i-logo', {opacity:1, duration:.8}, '-=.2')
    .to('.i-line', {opacity:0, duration:.4}, '<')
    .to('.i-logo .sheen', {x:'120%', duration:1.1, ease:'power2.inOut'}, '-=.3')
    .to('.i-logo', {opacity:0, scale:.96, duration:.5}, '+=.2')
    .set('.i-line', {opacity:1, scaleX:1})
    .to('.i-top', {yPercent:-100, duration:1, ease:'power4.inOut'})
    .to('.i-bot', {yPercent:100, duration:1, ease:'power4.inOut'}, '<')
    .to('.i-line', {opacity:0, duration:.6}, '<')
    .add(heroIn, '-=.7');
}

/* Kopfleiste & Handy-Leiste */
const onS = () => $('#hdr').classList.toggle('solid', scrollY > 60); addEventListener('scroll', onS, {passive:true}); onS();
ScrollTrigger.create({trigger:'#technik', start:'top 80%', endTrigger:'#anfrage', end:'top 85%', onToggle: s => $('.mbar').classList.toggle('hide', !s.isActive)});

/* Lichtfeld: Lichtkegel + Licht folgt Cursor/Finger */
const cv = $('#light'), cx = cv.getContext('2d');
let W, H, DPR = Math.min(devicePixelRatio || 1, 2), px = .5, py = .45, tx = .5, ty = .45, vis = true;
const size = () => { W = cv.clientWidth; H = cv.clientHeight; cv.width = W*DPR; cv.height = H*DPR; cx.setTransform(DPR,0,0,DPR,0,0); };
size(); addEventListener('resize', size);
const move = e => { const r = cv.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; tx = (p.clientX - r.left)/r.width; ty = (p.clientY - r.top)/r.height; };
$('.hero').addEventListener('pointermove', move); $('.hero').addEventListener('touchmove', move, {passive:true});
new IntersectionObserver(es => vis = es[0].isIntersecting).observe(cv);
const beam = (x, ang, w, col, t) => {
  cx.save(); cx.translate(x, -40); cx.rotate(ang + Math.sin(t*.4 + x)*.04);
  const g = cx.createLinearGradient(-w, 0, w, 0); g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(.5,col); g.addColorStop(1,'rgba(0,0,0,0)');
  cx.fillStyle = g; cx.fillRect(-w, 0, w*2, H*1.6); cx.restore();
};
const draw = ms => {
  if (vis) {
    const t = ms/1000; px += (tx-px)*.06; py += (ty-py)*.06;
    cx.globalCompositeOperation = 'source-over'; cx.fillStyle = '#0E0C11'; cx.fillRect(0,0,W,H);
    cx.globalCompositeOperation = 'lighter';
    beam(W*.18, -.35, W*.10, 'rgba(244,166,184,.10)', t);
    beam(W*.55, .28, W*.14, 'rgba(243,220,147,.07)', t+2);
    beam(W*.86, .42, W*.09, 'rgba(244,166,184,.08)', t+4);
    const R = Math.max(W,H)*.32, g = cx.createRadialGradient(px*W, py*H, 0, px*W, py*H, R);
    g.addColorStop(0,'rgba(255,190,205,.30)'); g.addColorStop(.35,'rgba(244,166,184,.10)'); g.addColorStop(1,'rgba(0,0,0,0)');
    cx.fillStyle = g; cx.fillRect(0,0,W,H);
    const c = cx.createRadialGradient(px*W, py*H, 0, px*W, py*H, 26); c.addColorStop(0,'rgba(255,255,255,.55)'); c.addColorStop(1,'rgba(255,255,255,0)');
    cx.fillStyle = c; cx.fillRect(px*W-30, py*H-30, 60, 60);
    if (!pointerSeen) { tx = .5 + Math.sin(t*.5)*.28; ty = .45 + Math.sin(t*.8)*.15; }
  }
  if (!RM) requestAnimationFrame(draw);
};
let pointerSeen = false; $('.hero').addEventListener('pointermove', () => pointerSeen = true, {once:true});
requestAnimationFrame(draw);

/* Reveals */
$$('.tech .label, .tech .h2, .dev, .treat .label, .treat .h2, .col, .ask-txt > *, .figure, .k-in > *').forEach(el =>
  gsap.from(el, {y:40, opacity:0, duration:1.1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 90%'}}));
$$('.dev').forEach((d, i) => gsap.fromTo(d.querySelector('.scan'), {left:'-30%', opacity:1}, {left:'110%', duration:1.4, delay:.3 + i*.15, ease:'power2.inOut', scrollTrigger:{trigger:d, start:'top 80%'}}));

/* Zonen-Wähler */
const sel = new Set();
$('#zones').innerHTML = ZONES.map(z => `<button type="button" aria-pressed="false" data-z="${z}">${z}</button>`).join('');
const sync = () => {
  $$('.z').forEach(g => g.classList.toggle('on', sel.has(g.dataset.z)));
  $$('#zones button').forEach(b => b.setAttribute('aria-pressed', sel.has(b.dataset.z)));
};
const toggle = z => { sel.has(z) ? sel.delete(z) : sel.add(z); sync(); };
$$('.z').forEach(g => { g.setAttribute('tabindex', '0'); g.setAttribute('role', 'button'); g.setAttribute('aria-label', g.dataset.z);
  g.addEventListener('click', () => toggle(g.dataset.z)); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(g.dataset.z); } }); });
$('#zones').addEventListener('click', e => { const b = e.target.closest('button'); if (b) toggle(b.dataset.z); });
$$('.seg').forEach(s => s.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; s.querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x === b)); }));

$('#aform').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = Object.fromEntries(new FormData(f));
  const bad = ['name','tel'].filter(k => !v[k].trim() || (k === 'tel' && v.tel.replace(/\D/g,'').length < 6));
  f.querySelectorAll('input').forEach(i => i.classList.toggle('bad', bad.includes(i.name)));
  if (bad.length) { $('#err').textContent = 'Bitte Name und Telefonnummer eintragen.'; f.querySelector(`[name=${bad[0]}]`).focus(); return; }
  $('#err').textContent = '';
  const kind = $('#kind [aria-checked=true]').textContent, when = $('#when [aria-checked=true]').textContent;
  const zones = sel.size ? [...sel].join(', ') : 'noch offen';
  const subject = `Terminanfrage – ${kind}${sel.size ? ' – ' + [...sel].join(', ') : ''}`;
  const body = `Hallo Lilly's Luxe Lounge,\n\nich möchte gern einen Termin anfragen:\n\nBehandlung: ${kind}\nZonen: ${zones}\nWunschzeit: ${when}\n\nName: ${v.name}\nTelefon: ${v.tel}${v.note ? `\nNachricht: ${v.note}` : ''}\n\nViele Grüße\n${v.name}`;
  const href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#mailFb').href = href;
  $('#sentT').textContent = `${kind} · ${zones} · ${when}`;
  f.hidden = true; $('#sent').hidden = false;
  gsap.from('#sent > *', {y:24, opacity:0, stagger:.1, duration:.7, ease:'power3.out'});
  location.href = href;
});
$('#aform').addEventListener('input', e => e.target.classList.remove('bad'));

addEventListener('load', () => ScrollTrigger.refresh());
})();
