/* Huniek – Konzeptseite · J.H. Digital Atelier */
(function(){
const RM=document.documentElement.classList.contains('reduced');
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);
const C={yellow:'#F2B705',red:'#D3262D',blue:'#1D4FA0',green:'#1E9A4B',ink:'#1C1B19'};

/* ---------- Leistungen (Originaltexte von huniek.de) ---------- */
const S=[
 {t:'Maler- und Lackiererarbeiten',c:C.blue,k:'Schutz und Schmuck am Bau, im Raum und am Gegenstand.',b:['In der Anwendung bedeutet das auf der einen Seite Schutz, auf der anderen Schmuck am Bau, im Raum und am Gegenstand.','Unsere Aufgabe verstehen wir nicht in der technisch-mechanischen Dienstleistung allein, sondern in der Auseinandersetzung der gestaltenden Hand mit Werkstoff und Werkzeug. Kein anderes Handwerk verfügt über so viele Bearbeitungsmöglichkeiten wie das des Malers.','Eine reiche Auswahl an Farbtönen, von matt bis hochglänzend, ergänzt die vielfältigen Gestaltungsmöglichkeiten. Wir beraten Sie kompetent bei der Außen- und Innenbehandlung von Oberflächen, bei anstrichtechnischen und material-ästhetischen Fragen.','Die Verwendung von umweltfreundlichen Materialien wird bei uns bevorzugt!']},
 {t:'Tapezierarbeiten',c:C.red,k:'Grenzenlos ist die Phantasie und die Möglichkeit der Gestaltung mit Tapeten.',b:['Grenzenlos ist die Phantasie und die Möglichkeit der Gestaltung mit Tapeten. Ein Angebot unterschiedlichster Materialien für die vielfältigen Untergründe und Verwendungszwecke steht zur Verfügung.','Wir beraten Sie und unterbreiten Ihnen die Möglichkeiten Ihrer individuellen Raumgestaltung. In Zusammenarbeit mit unserer Maler-Einkauf Süd-West eG halten wir eine umfassende Tapetenkollektion für Sie bereit.','Sie werden erstaunt sein über die Vielfalt der Möglichkeiten. Selbstverständlich gibt es zu allen Tapeten passende Stoffe und Teppichböden.']},
 {t:'Fliesenverlegung',c:C.yellow,k:'Umbau und Gestaltung in einer Hand von Ihrem Meisterbetrieb.',b:['Keramik ist ein unübertroffener Werkstoff. Fliesen zeichnen sich durch eine lange Lebensdauer aus, lassen sich leicht sauber halten und sind hygienisch absolut einwandfrei.','Ob für das Bad, die Küche oder den Fußboden: Vielleicht eine weiße Fliese mit einem geschmackvoll ausgesuchten Schmuckfries? Vielleicht diagonal verlegte Bodenfliesen mit einer Bodenheizung? Wir helfen, diesen Traum zu verwirklichen.','Wir zeigen Ihnen die Möglichkeiten in Koordination mit dem Installateur- und Elektromeister. Umbau und Gestaltung in einer Hand von Ihrem Meisterbetrieb!']},
 {t:'Bodenbeläge',c:C.green,k:'PVC, Teppich, Kork, Fertigparkett und Laminat – fachgerecht verlegt.',b:['Ein breites Spektrum unterschiedlichster Bodenbeläge und -beschichtungen steht zur Verfügung: vom gemütlichen und pflegeleichten Teppichboden im Wohnbereich über PVC- und Korkbeläge bis hin zur industriellen Fußbodenbeschichtung.','Ob Sie sich für Teppichboden, Kork, Laminat oder Kunststoff entscheiden – wir verlegen jeden Belag aus unserem Sortiment fachgerecht und führen die hierfür erforderlichen Untergrundvorarbeiten aus.','Wir beraten Sie gerne bei Ihnen zu Hause und bringen einen Schwung von Ideen mit. In Zusammenarbeit mit der Maler-Einkauf Süd-West eG halten wir eine umfassende Bodenbelagskollektion bereit.']},
 {t:'Teppichreinigung',c:C.ink,k:'Vertrauen Sie uns und lassen Sie uns beurteilen, was Ihrem Teppich gut tut.',b:['<strong>Shamponieren und Extrahieren:</strong> die klassische Nassreinigungsmethode. Wir bevorzugen das sprühextrahierende Verfahren, weil dabei die geringste mechanische Einwirkung stattfindet.','<strong>Pulverreinigung:</strong> Ein Reinigungsgranulat wird eingearbeitet und abgesaugt – trocken und sofort begehbar, aber nicht für jeden Teppich geeignet.','<strong>Padreinigung:</strong> Der Teppich wird vorgesprüht und mit speziellen Stoffscheiben bearbeitet.','Vertrauen Sie uns einfach und lassen Sie uns beurteilen, was Ihrem Teppich gut tut!']},
 {t:'Trockenbau',c:C.blue,k:'Schnell, sauber und sofort bezugsfertig.',b:['Beim Trockenbau werden ausschließlich Materialien verwendet, die ohne Wasser verarbeitet werden. Trockenzeiten müssen daher nicht beachtet werden.','Mit einer Trennwand aus tragender Unterkonstruktion und beidseitiger Beplankung mit Gipskartonplatten lässt sich ein großes Zimmer schnell in zwei Jugend- oder Arbeitszimmer aufteilen – inklusive Schalldämmung, Tür mit Rahmen, Elektro- und Sanitäranschlüssen.','Mit dem Einbau einer abgehängten Decke ist die technisch notwendige wie auch die gestalterische Variante möglich. Die Materialien sind baubiologisch empfehlenswert.']},
 {t:'Wärmedämmung',c:C.red,k:'Heizkosten sparen und die Wohnbehaglichkeit steigern.',b:['Mit der Dämmung eines Hauses werden nicht nur Heizkosten gespart, sondern auch die Wohnbehaglichkeit gesteigert. Rund ums Haus entsteht ein warmer „Mantel“.','Mit dem richtigen System sparen Sie Geld, schonen die Umwelt und sichern den Wert Ihres Hauses.','Wir verfügen über eine lange Erfahrung in der Keller- und Fußbodendämmung sowie der Wärmedämmung auf den Außenwänden. Lassen Sie sich ausführlich von Ihrem Malermeister und Gebäudeenergieberater I. Schnurr beraten.']},
 {t:'Ein Herz für Senioren',c:C.yellow,k:'Mithilfe bei Räumungsarbeiten und Renovierung auch bei Abwesenheit.',b:['Wir haben ein Herz für Senioren! Extra für Senioren bieten wir an:','<ul><li>Mithilfe bei Räumungsarbeiten</li><li>Renovierung auch bei Abwesenheit des Kunden</li><li>Beseitigung des angefallenen Abfalls</li></ul>']},
 {t:'Business-Ergonomik-Methode',c:C.green,k:'Farbe, Gestaltung, Bautenschutz – für eine menschlichere Arbeitswelt.',b:['Im Vorfeld jeglicher Planung steht der Mensch. Ziel ist es, den grauen Arbeitsalltag mit einer systematisch geplanten Vorgehensweise freundlicher und humaner zu gestalten.','<strong>Farbe · Gestaltung · Bautenschutz:</strong> Diese drei Betätigungsfelder beinhalten den Erhalt und die Verschönerung Ihrer wertvollen Bausubstanz und Einrichtung. Wohlbefinden, Konzentrations- und Leistungsfähigkeit können gesteigert werden.','Ein Beispiel gelungener Durchführung: das Casino im Haus der Sparkassenversicherung in Wiesbaden – Akustikdecke, Wände, Fußboden, Mobiliar und Polsteroberflächen.']},
];

/* ---------- inline SVGs ---------- */
const svgs={};
async function loadSvg(n){if(!svgs[n]){const r=await fetch('img/'+n+'.svg');svgs[n]=await r.text()}return svgs[n]}

/* ---------- split headings into masked words ---------- */
function splitEl(el){
  [...el.childNodes].forEach(n=>{
    if(n.nodeType===3){
      const parts=n.textContent.split(/(\s+)/);const f=document.createDocumentFragment();
      parts.forEach(p=>{if(!p)return;if(/^\s+$/.test(p)){f.appendChild(document.createTextNode(' '));return}const w=document.createElement('span');w.className='w';w.innerHTML='<span>'+p+'</span>';f.appendChild(w)});
      n.replaceWith(f);
    }else if(n.nodeType===1){
      if(n.querySelector('svg')||n.tagName==='svg'){const w=document.createElement('span');w.className='w';const i=document.createElement('span');n.replaceWith(w);i.appendChild(n);w.appendChild(i)}
      else splitEl(n);
    }
  });
}
$$('.split').forEach(splitEl);

/* ---------- marquee ---------- */
const track=$('#track');const MQ=['Maler- und Lackiererarbeiten','Tapezierarbeiten','Fliesenverlegung','Bodenbeläge','Teppichreinigung','Trockenbau','Wärmedämmung','Ein Herz für Senioren'];
const cols=[C.yellow,C.red,C.blue,C.green];
track.innerHTML=[0,1].map(()=>MQ.map((m,i)=>`<span style="--c:${cols[i%4]}">${m}</span>`).join('')).join('');

/* ---------- fan deck ---------- */
const fan=$('#fan');
S.forEach((s,i)=>{const b=document.createElement('button');b.className='card';b.style.setProperty('--c',s.c);b.type='button';
  b.innerHTML=`<div class="sw"><span class="num">HU ${String(i+1).padStart(2,'0')}</span></div><div class="bd"><h3>${s.t}</h3><p>${s.k}</p><span class="more">Mehr erfahren</span></div>`;
  b.addEventListener('click',()=>openDlg(i));fan.appendChild(b)});
const dlg=$('#dlg');
function openDlg(i){const s=S[i];$('#dlgT').textContent=s.t;$('#dlgBar').style.setProperty('--c',s.c);$('#dlgB').innerHTML=s.b.map(p=>p.startsWith('<ul')?p:'<p>'+p+'</p>').join('');dlg.classList.add('on');document.body.classList.add('locked');lenis&&lenis.stop();$('#dlgX').focus();buddy&&gsap.to(buddy,{opacity:0,duration:.3})}
function closeDlg(){dlg.classList.remove('on');document.body.classList.remove('locked');lenis&&lenis.start();buddy&&gsap.to(buddy,{opacity:1,duration:.4})}
$('#dlgX').onclick=closeDlg;dlg.addEventListener('click',e=>{if(e.target===dlg)closeDlg()});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeDlg();lb.classList.remove('on')}});

/* ---------- lightbox ---------- */
const lb=$('#lb');$$('#gal figure').forEach(f=>f.addEventListener('click',()=>{const im=f.querySelector('img');lb.querySelector('img').src=im.currentSrc||im.src;lb.querySelector('img').alt=im.alt;lb.classList.add('on')}));
lb.addEventListener('click',()=>lb.classList.remove('on'));

/* ---------- paint reveal (before → after) ---------- */
const BRUSH='<svg viewBox="0 0 100 100"><g transform="rotate(-35 50 50)"><rect x="42" y="2" width="16" height="44" rx="7" fill="#7a4a24"/><rect x="40" y="44" width="20" height="12" rx="2" fill="#c9c4bb"/><path d="M38 56 h24 l4 30 q-16 10 -32 0z" fill="#FAF8F4" stroke="#1C1B19" stroke-width="2"/></g></svg>';
function buildPR(el,id){
  const b=el.dataset.before,a=el.dataset.after;
  el.innerHTML=`<svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Vorher-Nachher-Vergleich"><defs>
   <filter id="rough${id}" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="${id*7}"/><feDisplacementMap in="SourceGraphic" scale="46"/></filter>
   <mask id="m${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="800"><path class="mp" d="M-80 70 L680 140 L-80 300 L680 380 L-80 540 L680 610 L-80 760 L680 840" fill="none" stroke="#fff" stroke-width="250" stroke-linecap="round" stroke-linejoin="round" filter="url(#rough${id})" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></mask></defs>
   <image href="${b}" width="600" height="800" preserveAspectRatio="xMidYMid slice"/><image href="${a}" width="600" height="800" preserveAspectRatio="xMidYMid slice" mask="url(#m${id})"/>
   <path class="guide" d="M-80 70 L680 140 L-80 300 L680 380 L-80 540 L680 610 L-80 760 L680 840" fill="none" stroke="none"/></svg>
   <span class="chip b">${el.dataset.lb}</span><span class="chip a">${el.dataset.la}</span><div class="brush">${BRUSH}</div>`;
  const mp=el.querySelector('.mp'),g=el.querySelector('.guide'),br=el.querySelector('.brush'),L=g.getTotalLength();
  const set=p=>{mp.setAttribute('stroke-dashoffset',String(1-p));const pt=g.getPointAtLength(L*p);const r=el.getBoundingClientRect();const sc=Math.max(r.width/600,r.height/800);const ox=(r.width-600*sc)/2,oy=(r.height-800*sc)/2;br.style.transform=`translate(${Math.min(r.width-30,Math.max(30,ox+pt.x*sc))}px,${Math.min(r.height-30,Math.max(30,oy+pt.y*sc))}px)`;br.style.opacity=(p>0.01&&p<0.98)?1:0;el.querySelector('.chip.b').style.opacity=p<.55?1:0;el.querySelector('.chip.a').style.opacity=p>.55?1:0;};
  if(RM){set(1);return}
  set(0);
  ScrollTrigger.create({trigger:el,start:'top 75%',end:'bottom 25%',scrub:.6,onUpdate:s=>set(s.progress)});
}

/* ---------- lenis ---------- */
let lenis=null;
if(!RM){lenis=new Lenis({duration:1.15,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:true});
  lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(!t)return;e.preventDefault();lenis?lenis.scrollTo(t,{offset:-70,duration:1.4}):t.scrollIntoView()}));

/* ---------- header ---------- */
const hdr=$('#hdr');let lastY=0;
addEventListener('scroll',()=>{const y=scrollY;hdr.classList.toggle('solid',y>40);hdr.classList.toggle('hide',y>lastY&&y>400&&!dlg.classList.contains('on'));lastY=y},{passive:true});

/* ---------- logo animation ---------- */
function logoTL(root,delay=0,fast=false){
  const bars=$$('.bar',root),cham=$('.cham',root),word=$$('.word path',root);
  const tl=gsap.timeline({delay});
  gsap.set(bars,{scaleY:0});gsap.set(cham,{opacity:0,x:-24});gsap.set(word,{opacity:0,y:34});
  tl.to(bars,{scaleY:1,duration:fast?.45:.6,ease:'power3.out',stagger:{each:fast?.07:.11,from:'start'}},0)
    .to(cham,{opacity:1,x:0,duration:.7,ease:'expo.out'},fast?.35:.75)
    .to(word,{opacity:1,y:0,duration:.55,ease:'back.out(1.7)',stagger:.06},fast?.5:1.15);
  return tl;
}

/* ---------- reveals ---------- */
function setupReveals(){
  if(RM){gsap.set('.rv',{opacity:1,y:0});return}
  ScrollTrigger.batch('.rv:not(.hero .rv)',{start:'top 88%',onEnter:b=>gsap.to(b,{opacity:1,y:0,duration:1.1,ease:'expo.out',stagger:.08,overwrite:true})});
  $$('.split').forEach(h=>{if(h.closest('.hero'))return;const w=$$('.w>span',h);gsap.set(w,{yPercent:115});
    ScrollTrigger.create({trigger:h,start:'top 85%',once:true,onEnter:()=>gsap.to(w,{yPercent:0,duration:1.15,ease:'expo.out',stagger:.06})})});
  // marquee
  const mq=gsap.to(track,{xPercent:-50,duration:38,ease:'none',repeat:-1});
  if(lenis)lenis.on('scroll',e=>{gsap.to(mq,{timeScale:1+Math.min(4,Math.abs(e.velocity)/8),duration:.3,overwrite:true});});
  // fan deck (desktop)
  const mm=gsap.matchMedia();
  mm.add('(min-width:981px)',()=>{
    const cards=$$('.card',fan),n=cards.length;
    gsap.set(cards,{rotation:0,y:0});
    const tl=gsap.timeline({scrollTrigger:{trigger:'#leistungen',start:'top top',end:'+=120%',pin:true,scrub:.7,anticipatePin:1}});
    cards.forEach((c,i)=>{const d=i-(n-1)/2;tl.to(c,{rotation:d*9.4,y:Math.abs(d)*14,ease:'power2.out',duration:1},0)});
    cards.forEach(c=>{c.addEventListener('mouseenter',()=>gsap.to(c,{scale:1.05,zIndex:20,duration:.4,ease:'power3.out'}));c.addEventListener('mouseleave',()=>gsap.to(c,{scale:1,zIndex:1,duration:.5,ease:'power3.out'}))});
    return ()=>gsap.set(cards,{clearProps:'all'});
  });
  // timeline line
  const tlEl=$('#tl'),tp=$('#tlPath'),svg=$('#tlLine');
  function drawLine(){const r=tlEl.getBoundingClientRect();const vert=innerWidth<=980;
    if(vert){const h=r.height;svg.setAttribute('viewBox',`0 0 6 ${h}`);tp.setAttribute('d',`M3 0 L3 ${h}`)}else{svg.setAttribute('viewBox',`0 0 ${r.width} 6`);tp.setAttribute('d',`M0 3 L${r.width} 3`)}
    tp.setAttribute('pathLength','1');tp.style.strokeDasharray='1';}
  drawLine();addEventListener('resize',drawLine);
  gsap.fromTo(tp,{strokeDashoffset:1},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:tlEl,start:'top 80%',end:'bottom 55%',scrub:.6}});
  $$('#tl .yr').forEach((y,i)=>gsap.from(y,{yPercent:40,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:y,start:'top 85%'}}));
  // underline strokes
  $$('.vals .big path, .hl path').forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;
    if(p.closest('.hl'))return;gsap.to(p,{strokeDashoffset:0,duration:1.1,ease:'power3.inOut',scrollTrigger:{trigger:p.closest('.big'),start:'top 80%'}})});
  // heart
  const hp=$('#heartPath'),HL=hp.getTotalLength();hp.style.strokeDasharray=HL;hp.style.strokeDashoffset=HL;
  gsap.to(hp,{strokeDashoffset:0,duration:2,ease:'power2.inOut',scrollTrigger:{trigger:'#senioren',start:'top 70%'}});
  gsap.to(hp,{scale:1.06,transformOrigin:'50% 55%',duration:.5,repeat:-1,yoyo:true,ease:'sine.inOut',delay:2.2});
  // contact tel
  gsap.from('.tel',{yPercent:30,opacity:0,duration:1.3,ease:'expo.out',scrollTrigger:{trigger:'.tel',start:'top 90%'}});
  // gallery parallax
  $$('#gal img').forEach(im=>gsap.fromTo(im,{yPercent:-4},{yPercent:4,ease:'none',scrollTrigger:{trigger:im,start:'top bottom',end:'bottom top',scrub:true}}));
}

/* ---------- chameleon buddy ---------- */
let buddy=null;
async function setupBuddy(){
  buddy=$('#buddy');buddy.innerHTML=await loadSvg('cham');
  const sv=$('svg',buddy);
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.setAttribute('class','bob');while(sv.firstChild)g.appendChild(sv.firstChild);sv.appendChild(g);
  const lid=document.createElementNS('http://www.w3.org/2000/svg','ellipse');lid.setAttribute('class','lid');lid.setAttribute('cx','29');lid.setAttribute('cy','116');lid.setAttribute('rx','11');lid.setAttribute('ry','12');g.appendChild(lid);
  gsap.to(buddy,{opacity:1,y:0,duration:.9,ease:'expo.out'});
  if(RM)return;
  const blink=()=>{gsap.timeline().to(lid,{scaleY:1,duration:.09}).to(lid,{scaleY:0,duration:.12,delay:.06});gsap.delayedCall(2.5+Math.random()*3.5,blink)};gsap.delayedCall(2,blink);
  $$('[data-cham]').forEach(s=>ScrollTrigger.create({trigger:s,start:'top 60%',end:'bottom 60%',onToggle:st=>{if(st.isActive){buddy.style.setProperty('--cham',s.dataset.cham);gsap.fromTo(g,{scale:1},{scale:1.12,duration:.25,yoyo:true,repeat:1,ease:'power2.out',transformOrigin:'50% 100%'})}}}));
  if(lenis)lenis.on('scroll',e=>{const v=Math.max(-12,Math.min(12,e.velocity));gsap.to(g,{rotation:-v*.35,x:Math.min(14,Math.abs(v)*1.2),duration:.4,overwrite:'auto'})});
}

/* ---------- intro + hero start ---------- */
async function start(){
  const logo=await loadSvg('logo');
  $('#heroLogo').innerHTML=logo;
  const intro=$('#intro');
  const heroIn=()=>{
    const hw=$$('.hero .split .w>span');
    gsap.fromTo(hw,{yPercent:115},{yPercent:0,duration:1.25,ease:'expo.out',stagger:.07});
    gsap.to('.hero .rv',{opacity:1,y:0,duration:1.1,ease:'expo.out',stagger:.09,delay:.35});
    const hp=$('.hl path');gsap.to(hp,{strokeDashoffset:0,duration:.9,ease:'power3.inOut',delay:.9});
    logoTL($('#heroLogo'),.3,true);
    setupBuddy();
  };
  if(RM||!intro){intro&&intro.remove();gsap.set('.hero .rv',{opacity:1,y:0});$$('.hl path').forEach(p=>p.style.strokeDashoffset=0);setupBuddy();return}
  $('#introLogo').innerHTML=logo;gsap.set(intro,{clipPath:'inset(0% 0% 0% 0%)'});document.body.classList.add('locked');lenis&&lenis.stop();
  gsap.set($$('.hero .split .w>span'),{yPercent:115});
  const tl=logoTL($('#introLogo'),.2);
  tl.to('#introLogo',{scale:.96,duration:.4,ease:'power2.inOut'},2.35)
    .to('#intro .roller',{y:()=>-innerHeight-22,duration:.95,ease:'power3.inOut'},2.55)
    .to(intro,{clipPath:'inset(0% 0% 100% 0%)',duration:.95,ease:'power3.inOut'},2.55)
    .add(()=>{intro.remove();document.body.classList.remove('locked');lenis&&lenis.start();ScrollTrigger.refresh()},3.5);
  tl.add(heroIn,2.9);
  const skip=()=>{if(tl.progress()<.7)tl.seek(2.5)};
  intro.addEventListener('click',skip);addEventListener('wheel',skip,{once:true,passive:true});addEventListener('touchstart',skip,{once:true,passive:true});addEventListener('keydown',skip,{once:true});
}

buildPR($('#pr1'),1);buildPR($('#pr2'),2);
setupReveals();
(document.fonts?document.fonts.ready:Promise.resolve()).then(()=>{start();ScrollTrigger.refresh()});
})();
