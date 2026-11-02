(() => {
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const MAIL = 'info@autolackiererei-wiesbaden.de';
const TONES = [['Götter-Gelb','#FCDB00','#FFF3A0'],['Signalrot','#B5140F','#FF6A5F'],['Anthrazit','#383330','#BEBAB8'],['Silbergrau','#737070','#E6E4E3'],['Tiefseeblau','#1F3A5F','#8DB4E8'],['Polarweiß','#E9E7E1','#FFFFFF']];

/* Smooth Scroll */
gsap.registerPlugin(ScrollTrigger);
let lenis;
if (!RM) { lenis = new Lenis({lerp:.09}); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t*1000)); gsap.ticker.lagSmoothing(0); }
$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => { const t = $(a.getAttribute('href')); if (!t) return; e.preventDefault(); lenis ? lenis.scrollTo(t, {offset:-60, duration:1.3}) : t.scrollIntoView(); }));

/* Intro: Spritzgang lackiert die Wortmarke */
const heroIn = () => {
  gsap.from('.hero-txt > *', {y:40, opacity:0, duration:1.1, stagger:.1, ease:'power3.out'});
  gsap.from('#paint', {opacity:0, scale:1.08, duration:1.8, ease:'power2.out'});
  gsap.from('.tones', {x:20, opacity:0, duration:1, delay:.6});
  gsap.from('.facts li', {y:24, opacity:0, stagger:.07, duration:.8, delay:.5});
};
if (sessionStorage.getItem('gt-intro') || RM) { document.documentElement.classList.add('no-intro'); heroIn(); }
else {
  sessionStorage.setItem('gt-intro', '1'); lenis && lenis.stop();
  gsap.timeline({onComplete(){ $('#intro').remove(); lenis && lenis.start(); }})
    .to('.i-mist', {x:'160vw', duration:1.5, ease:'power2.inOut'})
    .to('.i-logo', {clipPath:'inset(0 0% 0 0)', duration:1.25, ease:'power2.inOut'}, .15)
    .to('.i-bar', {scaleX:1, duration:.7, ease:'power3.inOut'}, '-=.35')
    .to('#intro', {clipPath:'inset(0 0 100% 0)', duration:.9, ease:'power4.inOut'}, '+=.35')
    .add(heroIn, '-=.5');
}

/* Kopfleiste & Handy-Leiste */
const onS = () => $('#hdr').classList.toggle('solid', scrollY > 60); addEventListener('scroll', onS, {passive:true}); onS();
const mbar = $('#mbar');
const mb = () => { const st = ScrollTrigger.getById('dmgS'); mbar.classList.toggle('hide', scrollY < innerHeight*.6 || (st && st.isActive)); };
ScrollTrigger.create({id:'dmgS', trigger:'#schaden', start:'top 80%', end:'bottom 30%', onToggle: mb});
addEventListener('scroll', mb, {passive:true}); mb();

/* Lackfläche: animierter Metallic-Lack mit Klarlack-Reflexen (WebGL), Licht folgt Finger/Maus */
const hex = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16)/255);
const cv = $('#paint'), gl = cv.getContext('webgl', {antialias:false, premultipliedAlpha:false});
const col = {r:0, g:0, b:0}, mouse = {x:.65, y:.6};
$('#chips').innerHTML = TONES.map(([n, c], i) => `<button type="button" role="radio" aria-checked="${!i}" aria-label="${n}" style="background:${c}"></button>`).join('');
let cur = 0;
const setTone = (i, now) => {
  cur = i; const [n, c, h] = TONES[i], [r, g, b] = hex(c);
  document.documentElement.style.setProperty('--hl', h);
  $('#swName').textContent = n;
  $$('#chips button').forEach((x, j) => x.setAttribute('aria-checked', i === j));
  gsap.to(col, {r, g, b, duration:now ? 0 : 1.6, ease:'power2.inOut'});
};
$$('#chips button').forEach((x, i) => x.addEventListener('click', () => { setTone(i); auto && auto.kill(); auto = null; }));
setTone(0, true);
let auto = RM ? null : gsap.delayedCall(8, function cyc(){ setTone((cur + 1) % TONES.length); auto = gsap.delayedCall(7, cyc); });
const mv = e => { const r = cv.getBoundingClientRect(), p = e.touches ? e.touches[0] : e; gsap.to(mouse, {x:(p.clientX - r.left)/r.width, y:1 - (p.clientY - r.top)/r.height, duration:1.2, ease:'power3.out'}); };
$('.hero').addEventListener('pointermove', mv); $('.hero').addEventListener('touchmove', mv, {passive:true});
if (gl) {
  const FS = `precision highp float;uniform vec2 R;uniform float T;uniform vec3 C;uniform vec2 M;
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+1.),f.x),f.y);}
float fb(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n(p);p*=2.03;a*=.5;}return s;}
float H(vec2 p){float t=T*.09;return .55*sin(p.x*1.3+t+sin(p.y*.9-t*.7)*1.2)+.35*sin(p.y*1.7-t*.8+sin(p.x*1.1+t)*.9)+.22*sin((p.x+p.y)*2.3+t*1.3)+.06*fb(p*1.4+t);}
void main(){vec2 uv=gl_FragCoord.xy/R.y,p=uv*1.25;float e=.01;
float hx=H(p+vec2(e,0))-H(p-vec2(e,0)),hy=H(p+vec2(0,e))-H(p-vec2(0,e));
vec3 N=normalize(vec3(-hx/(2.*e)*.5,-hy/(2.*e)*.5,1.));vec3 V=vec3(0,0,1);vec3 r=reflect(-V,N);
vec2 m=M-.5;vec3 L=normalize(vec3(m.x*1.6,m.y*1.6+.35,.75));
float dif=max(dot(N,L),0.);float sp=pow(max(dot(reflect(-L,N),V),0.),48.);
float env=smoothstep(.035,0.,abs(r.y-.30-m.y*.5))*1.5+smoothstep(.22,0.,abs(r.y-.30-m.y*.5))*.35+smoothstep(.18,0.,abs(r.y+.32))*.3+smoothstep(.03,0.,abs(r.x-.36-m.x*.7))*.7;
float fr=.18+.82*pow(1.-N.z,2.5);
float fl=step(.96,h(floor(gl_FragCoord.xy*.9)))*pow(dif,8.)*.22;
vec3 c=C*(.2+.72*dif)+C*sp*.9+vec3(1.)*sp*.45+vec3(env*fr)+C*fl+vec3(fl*.4);
c=c/(1.+c*.22);gl_FragColor=vec4(c,1.);}`;
  const sh = (t, src) => { const s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const pr = gl.createProgram();
  gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 a;void main(){gl_Position=vec4(a,0,1);}')); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(pr); gl.useProgram(pr);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = k => gl.getUniformLocation(pr, k), uR = U('R'), uT = U('T'), uC = U('C'), uM = U('M');
  const DPR = Math.min(devicePixelRatio || 1, 1.25);
  const size = () => { cv.width = cv.clientWidth*DPR; cv.height = cv.clientHeight*DPR; gl.viewport(0, 0, cv.width, cv.height); };
  size(); new ResizeObserver(size).observe(cv);
  let vis = true; new IntersectionObserver(es => vis = es[0].isIntersecting).observe(cv);
  const draw = ms => {
    if (vis) { gl.uniform2f(uR, cv.width, cv.height); gl.uniform1f(uT, RM ? 8 : ms/1000); gl.uniform3f(uC, col.r, col.g, col.b); gl.uniform2f(uM, mouse.x, mouse.y); gl.drawArrays(gl.TRIANGLES, 0, 3); }
    if (!RM) requestAnimationFrame(draw);
  };
  requestAnimationFrame(draw); if (RM) gsap.delayedCall(.1, () => draw(8000));
}

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
$('#strip').innerHTML = [1,2,3,16,4,5,17,6,7,18,8,19].map(i => `<figure><img src="img/w${i}.webp" width="1050" height="700" alt="Aus der Werkstatt der Autolackiererei Götter" loading="lazy"></figure>`).join('');
ScrollTrigger.matchMedia({'(min-width: 1001px)': () => {
  const st = $('#strip');
  gsap.to(st, {x:() => -(st.scrollWidth - innerWidth + 48), ease:'none', scrollTrigger:{trigger:'.shop', start:'top top', end:() => '+=' + (st.scrollWidth - innerWidth)*.7, pin:true, scrub:.6, invalidateOnRefresh:true}});
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
