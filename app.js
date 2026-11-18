/* LUMINOSO – Relaunch-Prototyp (J.H. Digital Atelier) */
const SHOP='https://luminosojewelry.de';
const fmt=n=>n.toLocaleString('de-DE',{minimumFractionDigits:2,maximumFractionDigits:2})+' €';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const img=(u,w)=>u+(u.includes('?')?'&':'?')+'width='+w;
const isGold=p=>/\b(333|375|585|750)\b/.test(p.t);
const isSilver=p=>/\b925\b/.test(p.t);
const has=(p,re)=>re.test(p.ty);
const tag=(p,t)=>p.tg.includes(t);

const CATS={
 'ohrringe':{n:'Ohrringe',kind:'Schmuck',test:p=>has(p,/Ohr|Creol/),hero:'img/silk_perla.jpg',h1:'Ohrringe, die <i>Licht</i> einfangen.',intro:'Ohrstecker, Creolen und Ohrhänger aus echtem Gold und 925 Sterlingsilber – vom feinen Alltagsstück bis zur Perle für besondere Abende.',
  subs:[['ohrstecker','Ohrstecker',p=>has(p,/Ohrstecker/)],['creolen','Creolen',p=>has(p,/Creol/)],['ohrhaenger','Ohrhänger',p=>has(p,/Ohrhänger|Durchzieh|Ohrclip|^Ohrringe$/)]],
  seo:['Ohrringe kaufen: Gold oder Silber?','Ohrringe begleiten dich jeden Tag – deshalb zählen Material und Verschluss. Bei LUMINOSO findest du Ohrstecker, Creolen und Ohrhänger aus 333, 375 und 585 Gold sowie aus 925 Sterlingsilber, rhodiniert oder vergoldet.','Ohrstecker sitzen dicht am Ohr und eignen sich für jeden Tag. Creolen sind der Klassiker mit Bewegung, Klappcreolen schließen besonders sicher. Ohrhänger mit Perle oder Zirkonia setzen Akzente am Abend.']},
 'ketten-anhaenger':{n:'Ketten & Anhänger',kind:'Schmuck',test:p=>has(p,/Anhänger|Collier|Kette|Halskette|Magnet/)&&!has(p,/Fu(ß|ss)kette/)&&!has(p,/^Set/),hero:'img/linen_collier.jpg',h1:'Ketten & Anhänger, <i>nah am Herzen.</i>',intro:'Feine Colliers, Ketten mit Anhänger und einzelne Anhänger – als Zeichen, Erinnerung oder Geschenk.',
  subs:[['anhaenger','Anhänger',p=>p.ty==='Anhänger'],['anhaenger-mit-kette','Anhänger mit Kette',p=>p.ty==='Anhänger mit Kette'],['ketten','Ketten & Colliers',p=>has(p,/Collier|^Kette|Halskette|Magnet/)]],
  seo:['Kette mit Anhänger aus Gold und Silber','Eine Kette mit Anhänger ist eines der persönlichsten Schmuckstücke – ob Herz, Perle oder Zirkonia. Unsere Anhänger aus 333, 375 und 585 Gelbgold sowie 925 Sterlingsilber kannst du einzeln oder direkt mit passender Kette wählen.','Colliers sind fest mit dem Anhänger verbunden und liegen besonders ruhig. Achte bei der Länge auf deinen Ausschnitt: kürzere Ketten betonen das Schlüsselbein, längere wirken entspannter.']},
 'armbaender':{n:'Armbänder',kind:'Schmuck',test:p=>has(p,/Armband/),hero:'img/set_sand.jpg',h1:'Armbänder mit <i>leisem Glanz.</i>',intro:'Feine Armbänder aus Gold, Silber und Edelstahl – zum Kombinieren oder als einzelnes Statement.',subs:[]},
 'ringe':{n:'Ringe',kind:'Schmuck',test:p=>has(p,/^Ring/),hero:'img/niche_ring.jpg',h1:'Ringe für <i>Momente, die bleiben.</i>',intro:'Ringe mit Smaragd, Rubin oder Zirkonia in 375 und 585 Gold – zeitlos gefasst.',subs:[]},
 'fussketten':{n:'Fußketten',kind:'Schmuck',test:p=>has(p,/Fu(ß|ss)kette/),hero:'img/set_sand.jpg',h1:'Fußketten für <i>helle Tage.</i>',intro:'Zarte Fußketten aus Gold und Silber – für Sommer, Strand und barfuß im Garten.',subs:[]},
 'sets':{n:'Schmuck-Sets',kind:'Schmuck',test:p=>has(p,/^Set/),hero:'img/set_silk.jpg',h1:'Sets, die <i>zusammengehören.</i>',intro:'Kette und Ohrstecker im Duo – aufeinander abgestimmt und bereit zum Verschenken.',subs:[]},
 'gold':{n:'Goldschmuck',kind:'Material',test:isGold,hero:'img/niche_ring.jpg',h1:'Gold, das <i>Generationen</i> überdauert.',intro:'Schmuck aus 333, 375 und 585 Gold. Die Zahl nennt den Feingoldanteil in Promille.',
  subs:[['333','333 Gold',p=>/\b333\b/.test(p.t)],['375','375 Gold',p=>/\b375\b/.test(p.t)],['585','585 Gold',p=>/\b585\b/.test(p.t)]],
  seo:['333, 375 oder 585 Gold – was ist der Unterschied?','333 Gold enthält 33,3 % Feingold, 375 Gold 37,5 % und 585 Gold 58,5 %. Je höher der Anteil, desto satter die Farbe und desto höher der Materialwert.','Alle Legierungen sind für den Alltag gemacht. 585 Gold gilt als klassische Wahl für Ringe und Erbstücke, 333 und 375 Gold sind etwas härter und besonders robust.']},
 'silber':{n:'Silberschmuck',kind:'Material',test:isSilver,hero:'img/set_silk.jpg',h1:'925 Sterlingsilber, <i>hell wie Mondlicht.</i>',intro:'Sterlingsilber besteht zu 92,5 % aus reinem Silber – rhodiniert, vergoldet oder rosévergoldet.',
  subs:[['rhodiniert','Rhodiniert',p=>/rhodiniert/i.test(p.t)],['vergoldet','Vergoldet',p=>/(?<!ros[ée])vergoldet/i.test(p.t)&&!/rosévergoldet/i.test(p.t)],['rose','Rosévergoldet',p=>/rosévergoldet/i.test(p.t)]],
  seo:['925 Sterlingsilber – rhodiniert, vergoldet oder rosé','925 Sterlingsilber enthält 92,5 % Feinsilber. Rhodiniertes Silber bekommt eine Schicht aus Rhodium: sie lässt das Stück heller glänzen und schützt vor dem Anlaufen.','Vergoldetes und rosévergoldetes Silber verbindet den warmen Ton von Gold mit dem Preis von Silber – ideal zum Kombinieren.']},
 'edelstahl':{n:'Edelstahl',kind:'Material',test:p=>/Edelstahl/i.test(p.t),hero:'img/set_trav.jpg',h1:'Edelstahl, <i>gemacht für jeden Tag.</i>',intro:'Robuste Schmuckstücke aus Edelstahl – pflegeleicht und widerstandsfähig.',subs:[]},
 'echtsteine-perlen':{n:'Echtsteine & Perlen',kind:'Welt',test:p=>tag(p,'Echtstein')||/Perle/.test(p.t),hero:'img/silk_perla.jpg',h1:'Echtsteine & <i>Perlen.</i>',intro:'Süßwasserperlen, Smaragd, Rubin, Saphir und Topas – jeder Stein mit eigener Zeichnung.',subs:[['perlen','Perlen',p=>/Perle/.test(p.t)],['steine','Edelsteine',p=>tag(p,'Echtstein')&&!/Perle/.test(p.t)]]},
 'kinderschmuck':{n:'Kinderschmuck',kind:'Welt',test:p=>tag(p,'Kinder'),hero:'img/set_linen.jpg',h1:'Kinderschmuck, <i>der mitwächst.</i>',intro:'Kleine Ohrstecker und Anhänger aus Silber und Gold – zur Geburt, Taufe oder Einschulung.',subs:[]},
 'herren-unisex':{n:'Herren & Unisex',kind:'Welt',test:p=>tag(p,'Unisex')||tag(p,'Herren'),hero:'img/set_niche.jpg',h1:'Herren & <i>Unisex.</i>',intro:'Klare Formen in Edelstahl, Silber und Gold.',subs:[]},
 'geschenke':{n:'Geschenke',kind:'Geschenke',test:p=>true,hero:'img/brass_creolen.jpg',h1:'Geschenke, die man <i>nie vergisst.</i>',intro:'Nach Budget sortiert – liebevoll verpackt und bereit zum Verschenken.',
  subs:[['bis-50','Bis 50 €',p=>p.p<=50],['50-150','50 – 150 €',p=>p.p>50&&p.p<=150],['150-300','150 – 300 €',p=>p.p>150&&p.p<=300],['ueber-300','Über 300 €',p=>p.p>300]]}
};
const NAV=[['Schmuck',['ohrringe','ketten-anhaenger','armbaender','ringe','fussketten','sets']],['Material',['gold','silber','edelstahl']],['Welten',['echtsteine-perlen','kinderschmuck','herren-unisex']],['Geschenke',['geschenke']]];

let DATA=null;
async function data(){if(DATA)return DATA;const r=await fetch('products.json');DATA=await r.json();
 DATA.forEach(p=>{const m=p.t.split(' – ');p.named=m.length>1;p.name=p.named?m[0]:p.t;p.mat=p.named?m.slice(1).join(' – '):'';
  p.score=(p.named?3:0)+(p.im.length>1?1:0)+(isGold(p)?1:0)});return DATA}
const nameOf=p=>p.name, matOf=p=>p.mat||materialFrom(p);
function materialFrom(p){const m=p.t.match(/(\d{3}\/?-?\s*(Sterling )?(Silber|Gold|Gelbgold|Weißgold)[^,]*)/i);return m?m[1]:''}

function card(p){const two=p.im.length>1;const b=two?`<img class="b" src="${img(p.im[1],700)}" alt="" loading="lazy">`:'';
 const t=isGold(p)?'Gold':(/Perle/.test(p.t)?'Perle':'');
 return `<a class="card ${two?'two':''}" href="produkt.html?h=${encodeURIComponent(p.h)}"><div class="ph"><img class="a" src="${img(p.im[0],700)}" alt="${esc(p.t)}" loading="lazy">${b}${t?`<span class="tag">${t}</span>`:''}</div><div class="nm">${esc(nameOf(p))}</div><div class="mt">${esc(matOf(p))}</div><div class="pr">${p.pmax>p.p?'ab ':''}${fmt(p.p)}</div></a>`}

function header(active){const counts=k=>DATA?DATA.filter(CATS[k].test).length:'';
 const col=(t,ks)=>`<div><h4>${t}</h4>${ks.map(k=>`<a href="kollektion.html?k=${k}">${CATS[k].n}<small>${counts(k)}</small></a>`).join('')}</div>`;
 return `<div class="topbar"><span>Kostenloser Versand ab 29 €</span><i class="dot"></i><span>14 Tage Widerrufsrecht</span><i class="dot opt2"></i><span class="opt2">Echtes Gold & 925 Sterlingsilber</span></div>
<header class="site" id="hdr"><div class="hbar"><nav class="nav" aria-label="Hauptnavigation"><button id="megaBtn" aria-expanded="false">Schmuck</button><a href="kollektion.html?k=gold" class="${active==='gold'?'act':''}">Gold</a><a href="kollektion.html?k=silber" class="${active==='silber'?'act':''}">Silber</a><a href="kollektion.html?k=geschenke" class="${active==='geschenke'?'act':''}">Geschenke</a></nav>
<a class="logo" href="index.html" aria-label="LUMINOSO Jewelry – Startseite"><img class="d" src="img/logo-dark.png" alt="LUMINOSO Jewelry" width="160" height="80"><img class="l" src="img/logo-light.png" alt="" width="160" height="80"></a>
<div class="hact"><a class="t" href="index.html#ratgeber">Ratgeber</a><a class="t" href="${SHOP}/pages/contact">Kontakt</a><a href="${SHOP}/cart" aria-label="Warenkorb"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M6 7h12l-1 13H7z"/><path d="M9 7a3 3 0 0 1 6 0"/></svg></a><button class="burger" id="burger" aria-label="Menü öffnen">Menü</button></div></div>
<div class="mega" id="mega">${col('Schmuck',NAV[0][1])}${col('Material',NAV[1][1])}${col('Welten',NAV[2][1])}<div><h4>Geschenke</h4>${CATS.geschenke.subs.map(s=>`<a href="kollektion.html?k=geschenke&s=${s[0]}">${s[1]}</a>`).join('')}</div><figure><img src="img/niche_ring.jpg" alt="Goldring mit Zirkonia auf Steinsockel im Spotlicht"><figcaption>Gold, das bleibt.</figcaption></figure></div></header>
<div class="mmenu" id="mmenu" aria-hidden="true"><button class="x" id="mclose">Schließen</button><img src="img/logo-dark.png" alt="LUMINOSO" style="height:32px">${NAV.map(([t,ks])=>`<h4>${t}</h4>${ks.map(k=>`<a href="kollektion.html?k=${k}">${CATS[k].n}</a>`).join('')}`).join('')}<h4>Service</h4><a href="index.html#ratgeber">Ratgeber</a><a href="${SHOP}/pages/contact">Kontakt</a></div>`}

function footer(){return `<footer><div class="fgrid"><div><a class="logo-f" href="index.html"><img src="img/logo-light.png" alt="LUMINOSO Jewelry"></a><p style="max-width:300px;margin:0">Schmuck aus echtem Gold und 925 Sterlingsilber – für Momente, die bleiben.</p><a class="widerruf" href="${SHOP}/pages/widerruf">Vertrag widerrufen</a></div>
<div><h5>Schmuck</h5>${NAV[0][1].map(k=>`<a href="kollektion.html?k=${k}">${CATS[k].n}</a>`).join('')}</div>
<div><h5>Material & Welten</h5>${[...NAV[1][1],...NAV[2][1]].map(k=>`<a href="kollektion.html?k=${k}">${CATS[k].n}</a>`).join('')}</div>
<div><h5>Service</h5><a href="${SHOP}/pages/versand">Versand & Lieferung</a><a href="${SHOP}/pages/retouren">Rückgabe & Umtausch</a><a href="${SHOP}/pages/widerruf">Widerrufsrecht</a><a href="${SHOP}/pages/uber-uns">Über uns</a><a href="${SHOP}/pages/contact">Kontakt</a><a href="mailto:info@luminosojewelry.de">info@luminosojewelry.de</a></div></div>
<div class="legal"><span>© 2026 LUMINOSO JEWELRY</span><nav><a href="${SHOP}/pages/rechtliches">Impressum</a><a href="${SHOP}/pages/datenschutzerklarung">Datenschutz</a><a href="${SHOP}/pages/agb">AGB</a><a href="${SHOP}/pages/widerruf">Widerrufsrecht</a></nav></div></footer>`}

function wire(darkHero){
 const h=document.getElementById('hdr'),mega=document.getElementById('mega'),mb=document.getElementById('megaBtn');
 let t;const open=v=>{mega.classList.toggle('open',v);mb.setAttribute('aria-expanded',v);if(darkHero)setDark()};
 mb.addEventListener('mouseenter',()=>{clearTimeout(t);open(true)});mb.addEventListener('click',()=>open(!mega.classList.contains('open')));
 mega.addEventListener('mouseenter',()=>clearTimeout(t));[mb,mega].forEach(e=>e.addEventListener('mouseleave',()=>{t=setTimeout(()=>open(false),220)}));
 const mm=document.getElementById('mmenu');document.getElementById('burger').onclick=()=>{mm.classList.add('open');mm.setAttribute('aria-hidden','false')};document.getElementById('mclose').onclick=()=>{mm.classList.remove('open');mm.setAttribute('aria-hidden','true')};
 function setDark(){const on=darkHero&&scrollY<innerHeight*.72&&!mega.classList.contains('open');h.classList.toggle('on-dark',on)}
 if(darkHero){setDark();addEventListener('scroll',setDark,{passive:true})}
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 if(reduced){document.documentElement.classList.add('reduced');return}
 const lenis=new Lenis({lerp:.085,smoothWheel:true});window.__lenis=lenis;
 gsap.registerPlugin(ScrollTrigger);lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
 document.querySelectorAll('.rv').forEach(el=>gsap.to(el,{opacity:1,y:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}}));
 document.querySelectorAll('.media img').forEach(el=>gsap.fromTo(el,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:el.parentNode,start:'top bottom',end:'bottom top',scrub:true}}));
}
function ld(o){const s=document.createElement('script');s.type='application/ld+json';s.textContent=JSON.stringify(o);document.head.appendChild(s)}
