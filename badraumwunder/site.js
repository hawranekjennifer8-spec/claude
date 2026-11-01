(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAIL = 'info@badraumwunder.de';

/* Vorher-Nachher-Projekte laut badraumwunder.de */
const CASES = [
  ['3,8 m²','Komfortdusche statt Wanne','Das in die Jahre gekommene Wannenbad wurde durch eine große Fünfeckdusche in ein großzügiges Duschbad verwandelt. Ein wandhängendes Eck-WC erleichtert den Zugang zum Fenster. Der Eckwaschtisch bietet viel Stauraum und Ablagefläche.'],
  ['3,9 m²','Wannenbad wird Duschbad','Das alte Wannenbad aus den 1980ern wurde in ein komfortables Duschbad umgebaut. Eine spezielle Duschform ermöglicht trotz begrenztem Platz eine großzügige Dusche. Ein Eckwaschtisch mit Ablage und Unterschrank sowie Hochschränke bieten ausreichend Stauraum.'],
  ['2,8 m²','Gäste-WC bekommt Dusche','Das Gäste-WC erhielt eine Duschgelegenheit. Wegklappbare Duschabtrennungen schaffen nach dem Duschen mehr Bewegungsraum. Ein schlanker Waschtisch und ein Sprossenheizkörper vervollständigen das kompakte Bad.'],
  ['3,5 m²','Duschbad mit Bidet','Das 3,5 m² große Wannenbad wurde altersgerecht modernisiert. Anstelle der Badewanne entstand ein komfortabler WC-Bidet-Bereich. Die ebenerdige Dusche mit gebogener Abtrennung und eine großzügige Waschtischanlage runden das Konzept ab.'],
  ['3,3 m²','Duschbad mit Waschmaschine','Durch eine geschickte Anordnung der Glas-Schiebeelemente wurde Platz für eine große Walk-in-Dusche und einen versteckten Stellplatz für die Waschmaschine geschaffen. Verschiebbare Duschgläser schützen WC und Waschmaschine vor Spritzwasser.'],
  ['3,4 m²','Modernes Komfort-Duschbad','Das kleine Duschbad im Keller eines Bungalows wurde modernisiert. Wegklappbare Duschgläser und ein geänderter Türanschlag bieten mehr Bewegungsfreiheit. Eine große Waschtischanlage und ein Edelstahl-Heizkörper im Duschbereich ergänzen das moderne Design.']
];

/* Smooth Scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.09}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset:-60, duration:1.4}) : t.scrollIntoView(); }));

/* Intro: Grundriss zeichnet sich, Maßzahl zählt 3,0 → 7,0 m² */
const heroIn = () => {
  gsap.from('.hero-txt > *', {y:40, opacity:0, duration:1.1, stagger:.1, ease:'power3.out'});
  gsap.from('.hero-pic img', {clipPath:'inset(0 0 0 100%)', duration:1.4, ease:'power3.inOut'});
  const d = $('.dims .d'), L = 400; d.style.strokeDasharray = L; gsap.fromTo(d, {strokeDashoffset:L}, {strokeDashoffset:0, duration:1.6, delay:.8, ease:'power2.inOut'});
  gsap.from('.tag', {y:20, opacity:0, duration:.8, delay:1.4});
  gsap.from('.facts li', {y:30, opacity:0, stagger:.08, duration:.9, delay:.6, ease:'power3.out'});
};
if (sessionStorage.getItem('brw-intro') || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('brw-intro', '1'); lenis && lenis.stop();
  const r = $('.i-rect'), d = $('.i-dim'), Lr = r.getTotalLength(), Ld = d.getTotalLength(), n = {v:3};
  gsap.set(r, {strokeDasharray:Lr, strokeDashoffset:Lr}); gsap.set(d, {strokeDasharray:Ld, strokeDashoffset:Ld});
  gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
    .to(r, {strokeDashoffset:0, duration:1.2, ease:'power2.inOut'})
    .to(d, {strokeDashoffset:0, duration:.8}, '-=.5')
    .to(n, {v:7, duration:1.3, ease:'power2.inOut', onUpdate(){ $('#iNum').textContent = n.v.toFixed(1).replace('.', ','); }}, '-=1.2')
    .to('.i-logo', {opacity:1, duration:.6}, '-=.2')
    .to('#intro', {yPercent:-100, duration:1, ease:'power4.inOut'}, '+=.5')
    .add(heroIn, '-=.6');
}

/* Kopfleiste & Handy-Leiste */
const onS = () => $('#hdr').classList.toggle('solid', scrollY > 60); addEventListener('scroll', onS, {passive:true}); onS();
ScrollTrigger.create({trigger:'#vorher-nachher', start:'top 70%', endTrigger:'#planer', end:'top 80%', onToggle: s => $('.mbar').classList.toggle('hide', !s.isActive)});
ScrollTrigger.create({trigger:'#ausstellung', start:'top 80%', endTrigger:'#kontakt', end:'top 70%', onToggle: s => s.isActive && $('.mbar').classList.remove('hide')});

/* Vorher / Nachher */
const setCmp = v => { $('#after').style.clipPath = `inset(0 0 0 ${v}%)`; $('#handle').style.left = v + '%'; };
const showCase = i => {
  $$('#cases button').forEach((b, j) => b.setAttribute('aria-selected', j === i));
  $('#cA').src = `img/plan${i+1}a.webp`; $('#cB').src = `img/plan${i+1}b.webp`;
  const [m, t, d] = CASES[i]; $('#cM2').textContent = m; $('#cT').textContent = t; $('#cD').textContent = d;
  $('#cRange').value = 50; setCmp(50);
  gsap.fromTo('.vn-txt > *', {y:16, opacity:0}, {y:0, opacity:1, stagger:.06, duration:.5});
};
$('#cases').innerHTML = CASES.map(([m, t], i) => `<button type="button" role="tab" aria-selected="false"><b>${m}</b>${t}</button>`).join('');
$$('#cases button').forEach((b, i) => b.addEventListener('click', () => showCase(i)));
$('#cRange').addEventListener('input', e => setCmp(e.target.value));
showCase(0);
ScrollTrigger.create({trigger:'#compare', start:'top 70%', once:true, onEnter:() => { const o = {v:50}; gsap.timeline().to(o, {v:15, duration:.9, ease:'power2.inOut', onUpdate:() => setCmp(o.v)}).to(o, {v:85, duration:1.2, ease:'power2.inOut', onUpdate:() => setCmp(o.v)}).to(o, {v:50, duration:.8, ease:'power2.inOut', onUpdate:() => { setCmp(o.v); $('#cRange').value = o.v; }}); }});

/* Bad-Planer */
const SIZES = {'unter 4 m²':[70,60], '4–5 m²':[96,72], '5–7 m²':[120,90], 'über 7 m²':[150,105]};
const sel = q => [...$(`.opts[data-q="${q}"]`).querySelectorAll('[aria-pressed=true]')];
const sync = () => {
  const size = sel('size')[0].textContent, wish = sel('wish').map(b => b.textContent), lv = sel('level')[0];
  $('#sSize').textContent = size; $('#sWish').textContent = wish.length ? wish.join(', ') : '–'; $('#sLevel').textContent = lv.textContent; $('#sRange').textContent = lv.dataset.r;
  const [w, h] = SIZES[size]; const r = $('#spRect'); r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('x', 100 - w/2); r.setAttribute('y', 112 - h);
  $('#spDim').setAttribute('d', `M${100-w/2} 125h${w}M${100-w/2} 121v8M${100+w/2} 121v8`); $('#spTxt').textContent = size;
};
$$('.opts').forEach(o => o.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (o.classList.contains('multi')) b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') !== 'true');
  else o.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
  sync();
}));
sync();
$('#pform').addEventListener('input', e => e.target.classList.remove('bad'));
$('#pform').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, v = Object.fromEntries(new FormData(f));
  const bad = ['name','tel'].filter(k => !v[k].trim() || (k === 'tel' && v.tel.replace(/\D/g,'').length < 6));
  f.querySelectorAll('input').forEach(i => i.classList.toggle('bad', bad.includes(i.name)));
  if (bad.length) { $('#err').textContent = 'Bitte Name und Telefonnummer eintragen.'; f.querySelector(`[name=${bad[0]}]`).focus(); return; }
  $('#err').textContent = '';
  const size = $('#sSize').textContent, wish = $('#sWish').textContent, lv = $('#sLevel').textContent;
  const subject = `Anfrage Erstberatung – Bad ${size}, ${lv}`;
  const body = `Guten Tag,\n\nich interessiere mich für eine Erstberatung zu meinem Bad:\n\nBadgröße: ${size}\nWünsche: ${wish}\nAusstattung: ${lv} (${$('#sRange').textContent})${v.ort ? `\nOrt: ${v.ort}` : ''}\n\nName: ${v.name}\nTelefon: ${v.tel}\n\nViele Grüße\n${v.name}`;
  const href = `mailto:${MAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#mailFb').href = href; f.hidden = true; $('#sent').hidden = false;
  gsap.from('#sent > *', {y:20, opacity:0, stagger:.08, duration:.6});
  location.href = href;
});

/* Ausstellung: horizontale Strecke (Desktop) */
ScrollTrigger.matchMedia({'(min-width: 1001px)': () => {
  const st = $('#strip');
  gsap.to(st, {x:() => -(st.scrollWidth - innerWidth), ease:'none', scrollTrigger:{trigger:'#ausstellung', start:'top top', end:() => '+=' + (st.scrollWidth - innerWidth), pin:true, scrub:.6, invalidateOnRefresh:true}});
}});

/* 10 Regeln: aktive Regel + Zähler */
$$('.rlist li').forEach((li, i) => ScrollTrigger.create({trigger:li, start:'top 60%', end:'bottom 60%', onToggle: s => { if (s.isActive) { $$('.rlist li').forEach(x => x.classList.toggle('on', x === li)); $('#ruleNo').textContent = String(i+1).padStart(2, '0'); } }}));
$$('.rlist li')[0].classList.add('on');

/* Reveals */
$$('.vn .label, .vn .h2, .planer .label, .planer .h2, .show-head > *, .mat .label, .mat .h2, .mat .body, .mat-grid figure, .rules-side > .label, .rules-side > .h2, .d3 .label, .d3 .h2, .d3 .body, .d3-grid figure, .flow .label, .flow .h2, .steps li, .team-grid > *, .k-grid > *').forEach(el =>
  gsap.from(el, {y:40, opacity:0, duration:1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 90%'}}));

addEventListener('load', () => ScrollTrigger.refresh());
})();
