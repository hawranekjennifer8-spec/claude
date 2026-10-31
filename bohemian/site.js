(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const BOOK = 'https://www.studiobookr.com/kosmetikstudio-bohemian-beauty-by-ann-kosmetikinstitut-wiesbaden-74709';

/* Behandlungen & Preise laut bohemianbeauty.de (inkl. 19 % MwSt.) */
const T = {
  kobido:['Boho Facial Massage (Kobido & Sculptural)','ca. 60 Min.','185 €','Eine einzigartige Fusion aus Kobido- und Skulptur-Gesichtsmassage, verstärkt durch ein personalisiertes Serum und eine Maske.'],
  bukkal:['Bukkal Massage','ca. 60 Min.','185 €','Spezielle Technik für Lippen, unteres Gesicht und Kieferbereich – präventiv und korrigierend, mit intraoraler Massage.'],
  lymphG:['Lymphdrainage Gesicht','ca. 60 Min.','185 €','Sanfte, manuelle Technik, die gezielt das Lymphsystem aktiviert – für Entstauung und ein sichtbar frischeres, strahlendes Hautbild.'],
  br:['Biologique Recherche Kennenlernen','ca. 50 Min.','145 €','Individuell abgestimmte Gesichtsbehandlung mit hochkonzentrierten Wirkstoffen. Sofortige Wirkung. Französische Expertise.'],
  sig:['Boho Signature Gesichtsbehandlung','ca. 60 Min.','189 €','Individuell auf Ihren Hauttyp abgestimmte Biologique Recherche Gesichtsbehandlung.'],
  zeit:['Individuelle Boho Beautyzeit','ca. 90 Min.','ab 250 €','Signatur-Skulptur-Gesichtsmassage kombiniert mit einem Booster von Biologique Recherche zur tiefen Revitalisierung und Ausstrahlung der Haut.'],
  beratung:['Beratungsgespräch (online)','ca. 30 Min.','','Beratungsgespräch online, ca. 30 Minuten.'],
  dp:['Microneedling Dermapen 4 – Gesicht','ca. 50 Min.','260 €','Medizinisches Microneedling zur Verbesserung der Hautstruktur und zur Verjüngung der Haut – mit Biologique Recherche oder DP Dermaceutical.'],
  dp2:['Microneedling Dermapen 4 – Gesicht, Hals, Dekolleté','ca. 70 Min.','300 €','Medizinisches Microneedling zur Verbesserung der Hautstruktur und zur Verjüngung der Haut.'],
  exo:['Microneedling Dermapen 4 & Exosomen – Gesicht','ca. 50 Min.','399 €','Stimulation von Kollagen & Elastin: Dermapen sorgt für mikrofeine Kanäle – Exosomen liefern gezielt Wachstumsfaktoren.'],
  exo2:['Microneedling & Exosomen – Gesicht, Hals, Dekolleté','ca. 70 Min.','520 €','Stimulation von Kollagen & Elastin mit Dermapen 4 und Exosomen.'],
  aqua:['Aquafacial (Gesicht, Hals, Dekolleté)','ca. 60 Min.','189 €','Wasserstoffreinigung + Maske + Serum.'],
  aquaX:['Aquafacial Express','ca. 45 Min.','110 €','Wasserstoffreinigung + Serum.'],
  oxyb:['Oxybrasion (Gesicht, Hals, Dekolleté)','ca. 50 Min.','150 €','Oxybrasion + Maske + Serum.'],
  oxyg:['OxyGeneo Sauerstoffbehandlung','ca. 60 Min.','189 €','Peeling, Sauerstoffversorgung und Regeneration – eine 3-in-1-Technologie, die die Haut sanft exfoliert, mit Sauerstoff versorgt und mit hochwirksamen Seren nährt.'],
  oxyB:['OxyGeneo – Back Facial','ca. 60 Min.','189 €','Die 3-in-1-Sauerstoffbehandlung für den Rücken.'],
  brasil:['Brasilianische Lymphdrainage','ca. 60 Min.','150 €','Manuelle Massagetechnik, die das Lymphsystem stimuliert und dem Körper hilft, überschüssige Flüssigkeiten auszuleiten.'],
  ganz:['Ganzkörpermassage','ca. 60 Min.','100 €','Wellness-Körpermassage mit Bio-Ölen.'],
  wrap:['Body Wrapping + Tiefenwärme + Madero','ca. 90 Min.','160 €','Maderotherapie (Holzmassage) mit einer Körperwickel-Behandlung und einer Thermodecke.'],
  madero:['Bio Maderotherapie – Anti-Cellulite & Body Shaping','ca. 60 Min.','150 €','Cellulite wird reduziert, das Lymphsystem angeregt, die Haut fühlt sich straffer an.']
};
const CATS = [
  {img:'img/kobido.webp', k:['kobido','bukkal','lymphG']},
  {img:'img/hands.webp', k:['br','sig','zeit','beratung']},
  {img:'img/needling.webp', k:['dp','dp2','exo','exo2','aqua','aquaX','oxyb','oxyg','oxyB']},
  {img:'img/madero.webp', k:['brasil','ganz','wrap','madero']}
];
const WISH = {ruhe:['kobido','ganz','lymphG'], kontur:['kobido','bukkal','zeit'], glow:['aqua','oxyg','br'], struktur:['dp','exo','oxyb'], koerper:['brasil','madero','wrap']};

/* Smooth Scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.085}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset:-60, duration:1.5}) : t.scrollIntoView(); }));

/* Intro: Logo zeichnet sich in Gold, Iris öffnet die Seite */
const heroIn = () => gsap.from('.hero-txt > *, .hero-art', {y:50, opacity:0, duration:1.3, stagger:.1, ease:'power3.out'});
if (sessionStorage.getItem('bb-intro') || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('bb-intro', '1'); lenis && lenis.stop();
  fetch('img/mark.svg').then(r => r.text()).then(svg => {
    const d = (svg.match(/ d="([^"]+)"/) || [])[1] || '';
    const mark = $('#introMark');
    mark.innerHTML = d.split(/(?=M)/).map(p => `<path d="${p}"/>`).join('') + `<path class="fill" d="${d}" fill-rule="evenodd" style="fill:#C9A24A;stroke:none;opacity:0"/>`;
    const ps = $$('#introMark path:not(.fill)');
    ps.forEach(p => { const L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
    gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
      .to(ps, {strokeDashoffset:0, duration:1.8, stagger:.025, ease:'power2.inOut'})
      .to('#introMark .fill', {opacity:1, duration:.8}, '-=.3')
      .to(ps, {opacity:0, duration:.5}, '<')
      .to('.intro-word', {opacity:1, y:0, duration:.8}, '-=.4')
      .to('#intro', {clipPath:'circle(0% at 50% 42%)', duration:1.2, ease:'power3.inOut'}, '+=.5')
      .add(heroIn, '-=.8');
  }).catch(() => { $('#intro').remove(); lenis && lenis.start(); heroIn(); });
}

/* Header, Handy-Leiste */
ScrollTrigger.create({start:60, onToggle: s => $('#hdr').classList.toggle('solid', s.isActive)});
ScrollTrigger.create({trigger:'#ritual', start:'top 80%', endTrigger:'#kontakt', end:'top 70%', onToggle: s => $('.mbar').classList.toggle('hide', !s.isActive)});

/* Hero-Parallaxe */
if (!RM) {
  gsap.to('.hero-circle img', {yPercent:8, scale:1.06, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});
  gsap.to('.hero-oval', {yPercent:-18, ease:'none', scrollTrigger:{trigger:'.hero', start:'top top', end:'bottom top', scrub:true}});
}

/* Ritual: gepinnt, Goldring füllt sich, Bild & Schritt wechseln */
const steps = $$('.r-step'), pics = $$('.r-pic img');
const setStep = i => { steps.forEach((s, j) => s.classList.toggle('on', j === i)); pics.forEach((p, j) => p.classList.toggle('on', j === i)); };
ScrollTrigger.matchMedia({
  '(min-width: 1001px)': () => {
    gsap.set(steps, {position:'absolute', top:'50%', left:0, right:0, yPercent:-50, opacity:0});
    gsap.set('.r-steps', {minHeight:'48vh'}); gsap.set(steps[0], {opacity:1});
    let cur = 0;
    ScrollTrigger.create({trigger:'.ritual', start:'top top', end:'+=220%', pin:'.ritual-in', scrub:true,
      onUpdate: s => {
        $('#rProg').style.strokeDashoffset = 301.6 * (1 - s.progress);
        const i = Math.min(2, Math.floor(s.progress * 3));
        if (i !== cur) { gsap.to(steps[cur], {opacity:0, y:-30, duration:.4}); gsap.fromTo(steps[i], {opacity:0, y:30}, {opacity:1, y:0, duration:.6}); cur = i; setStep(i); }
      }});
    return () => gsap.set(steps, {clearProps:'all'});
  },
  '(max-width: 1000px)': () => {
    steps.forEach((s, i) => ScrollTrigger.create({trigger:s, start:'top 60%', onEnter:() => setStep(i), onEnterBack:() => setStep(i)}));
    gsap.to('#rProg', {strokeDashoffset:0, ease:'none', scrollTrigger:{trigger:'.r-steps', start:'top 70%', end:'bottom 60%', scrub:true}});
  }
});

/* Reveals */
$$('.preise .label, .preise .h2, .termin .label, .termin .h2, .anna-in > *, .facts li, .voices blockquote, .k-in > *, .philo .label, .philo .body').forEach(el =>
  gsap.from(el, {y:40, opacity:0, duration:1.1, ease:'power3.out', scrollTrigger:{trigger:el, start:'top 88%'}}));
gsap.to('#quote', {backgroundPosition:'0% 0', ease:'none', scrollTrigger:{trigger:'.quote', start:'top 80%', end:'bottom 40%', scrub:true}});
$$('.mood figure').forEach(f => gsap.fromTo(f, {yPercent:-f.dataset.s}, {yPercent:+f.dataset.s, ease:'none', scrollTrigger:{trigger:'.mood', start:'top bottom', end:'bottom top', scrub:true}}));

/* Preise: Tabs + aufklappbare Zeilen */
const row = k => { const [n, d, p, x] = T[k]; return `<li><button type="button" aria-expanded="false"><span class="pn">${n}</span><span class="pd">${d}</span><span class="pp">${p}</span></button><div class="px"><p>${x}</p></div></li>`; };
const line = $('.tab-line');
const showCat = i => {
  $$('.tabs button').forEach((b, j) => b.setAttribute('aria-selected', j === i));
  const b = $$('.tabs button')[i]; line.style.width = b.offsetWidth + 'px'; line.style.transform = `translateX(${b.offsetLeft}px)`;
  line.style.top = (b.offsetTop + b.offsetHeight) + 'px';
  $('#plist').innerHTML = CATS[i].k.map(row).join('');
  $('#pImg').src = CATS[i].img;
  gsap.from('#plist li', {y:20, opacity:0, stagger:.05, duration:.5, ease:'power2.out'});
};
$$('.tabs button').forEach(b => b.addEventListener('click', () => showCat(+b.dataset.t)));
$('#plist').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; const li = b.parentElement, o = !li.classList.contains('open'); li.classList.toggle('open', o); b.setAttribute('aria-expanded', o); setTimeout(() => ScrollTrigger.refresh(), 520); });
showCat(0); addEventListener('resize', () => showCat(+$('.tabs [aria-selected=true]').dataset.t));

/* Termin finden */
$$('#wish button').forEach(b => b.addEventListener('click', () => {
  $$('#wish button').forEach(x => x.setAttribute('aria-pressed', x === b));
  $('#match').innerHTML = WISH[b.dataset.w].map(k => { const [n, d, p, x] = T[k]; return `<article class="card"><h3>${n}</h3><p>${x}</p><div class="row"><span class="pp">${p}</span><a href="${BOOK}" target="_blank" rel="noopener">Termin buchen</a></div><p class="small">${d}</p></article>`; }).join('');
  gsap.from('#match .card', {y:30, opacity:0, stagger:.08, duration:.6, ease:'power3.out'});
}));
$$('#wish button').forEach(b => b.setAttribute('aria-pressed', 'false'));
$('#wish button').click();

addEventListener('load', () => { ScrollTrigger.refresh(); showCat(+$('.tabs [aria-selected=true]').dataset.t); });
})();
