(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);

/* split headlines into word masks */
$$('.split').forEach(el=>{const t=document.createElement('div');t.innerHTML=el.innerHTML;const out=[];
  t.childNodes.forEach(n=>{const em=n.nodeType===1&&n.tagName==='EM';n.textContent.split(/\s+/).filter(Boolean).forEach(w=>out.push(em?`<em>${w}</em>`:w))});
  el.innerHTML=out.map(w=>`<span class="ln"><span>${w}</span></span>`).join(' ')});

/* smooth scroll */
let lenis=null;
if(!RM&&window.Lenis){lenis=new Lenis({duration:1.15});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0)}
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');const t=id.length>1&&$(id);if(!t)return;e.preventDefault();lenis?lenis.scrollTo(id==='#top'?0:t,{offset:-60}):t.scrollIntoView({behavior:'smooth'})}));

/* header + mobile bar */
const hdr=$('#hdr'),mbar=$('.mbar');
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>hdr.classList.toggle('solid',s.scroll()>60)});
const mb=()=>{if(!mbar)return;const y=scrollY,r=$('#reservieren').getBoundingClientRect();mbar.classList.toggle('hide',y<innerHeight*.7||(r.top<innerHeight*.8&&r.bottom>innerHeight*.2))};mb();ScrollTrigger.create({start:0,end:'max',onUpdate:mb});

/* today's opening hours */
(()=>{const d=new Date().getDay(),h=$('#todayHours');const open={2:'16:30',3:'16:30',4:'16:30',5:'16:30',6:'11:30'};
  h.innerHTML=open[d]?`<i></i>Heute ab ${open[d]} Uhr geöffnet`:`<i class="off"></i>Heute Ruhetag – wir freuen uns auf Ihre Reservierung`})();

/* fire particles */
function fire(canvas,opts){const ctx=canvas.getContext('2d');let W,H,parts=[],pow=opts.pow||0;
  const size=()=>{const r=canvas.getBoundingClientRect(),d=Math.min(devicePixelRatio,2);W=canvas.width=r.width*d;H=canvas.height=r.height*d};size();addEventListener('resize',size);
  const api={set p(v){pow=v},get p(){return pow}};
  const tick=()=>{ctx.globalCompositeOperation='source-over';ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
    const n=Math.round(pow*opts.rate);for(let i=0;i<n;i++){const x=W*(opts.x+(Math.random()-.5)*opts.w);parts.push({x,y:H*opts.y,vx:(Math.random()-.5)*1.2,vy:-(2+Math.random()*3.5)*(H/900),r:(18+Math.random()*34)*(W/900),l:1})}
    parts=parts.filter(p=>p.l>0);for(const p of parts){p.x+=p.vx+Math.sin(p.y*.012)*.6;p.y+=p.vy;p.l-=.016;p.r*=.985;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);const a=Math.max(0,p.l);
      g.addColorStop(0,`rgba(255,${180+70*a|0},${90*a|0},${.55*a})`);g.addColorStop(.4,`rgba(240,${100+60*a|0},30,${.32*a})`);g.addColorStop(1,'rgba(200,60,10,0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill()}
    if(pow>0||parts.length)requestAnimationFrame(tick);else running=false};
  let running=false;api.start=()=>{if(!running){running=true;requestAnimationFrame(tick)}};return api}

/* reveals */
function reveals(){
  $$('.split').filter(el=>!el.closest('.hero')).forEach(el=>gsap.from($$('.ln>span',el),{yPercent:110,duration:1.15,ease:'expo.out',stagger:.035,scrollTrigger:{trigger:el,start:'top 86%'}}));
  $$('.body,.cite,.eyebrow').filter(el=>!el.closest('.hero')&&!el.closest('.season')).forEach(el=>gsap.from(el,{y:24,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 92%'}}));
  gsap.from('.card',{y:70,opacity:0,stagger:.1,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:'.cards',start:'top 85%'}});
  gsap.from('.parfait figure',{clipPath:'inset(0 100% 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.parfait',start:'top 80%'}});
  gsap.fromTo('.parfait img',{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:'.parfait',start:'top bottom',end:'bottom top',scrub:true}});
  $$('.count b').forEach(b=>{const n=+b.dataset.n,o={v:0};gsap.to(o,{v:n,duration:2,ease:'power3.out',scrollTrigger:{trigger:b,start:'top 88%'},onUpdate:()=>b.textContent=Math.round(o.v)})});
  const it=$('#interior');gsap.to(it,{x:()=>-(it.scrollWidth-innerWidth*.92),ease:'none',scrollTrigger:{trigger:it,start:'top bottom',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
  gsap.from('.gin-pic',{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.gin',start:'top 75%'}});
  gsap.from('.gin-glass',{y:120,opacity:0,duration:1.4,ease:'expo.out',scrollTrigger:{trigger:'.gin',start:'top 70%'}});
  gsap.from('.notes span',{y:20,opacity:0,stagger:.08,duration:.8,scrollTrigger:{trigger:'.notes',start:'top 92%'}});
  gsap.from('.rcard',{y:60,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.rcard',start:'top 85%'}});
  gsap.fromTo('.res-bg img',{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:'.res',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.from('.cpic',{clipPath:'inset(0 0 100% 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.cpic',start:'top 80%'}});
  /* season: fire + switch */
  const seas=$('#season'),fc=fire($('#fire'),{x:.62,y:.86,w:.32,rate:5});
  ScrollTrigger.create({trigger:seas,start:'top 80%',end:'bottom 10%',onUpdate:s=>{fc.p=seas.dataset.s==='winter'?Math.sin(Math.min(1,s.progress)*Math.PI)*1+.25:0;fc.start()},onLeave:()=>fc.p=0,onLeaveBack:()=>fc.p=0});
  $$('.switch button').forEach(b=>b.addEventListener('click',()=>{seas.dataset.s=b.dataset.v;$$('.switch button').forEach(x=>x.setAttribute('aria-selected',x===b));
    $$('.st').forEach(t=>t.classList.toggle('on',t.classList.contains(b.dataset.v==='winter'?'st-w':'st-s')));fc.p=b.dataset.v==='winter'?1:0;fc.start()}));
  gsap.fromTo('.sp img',{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:seas,start:'top bottom',end:'bottom top',scrub:true}});
}

/* smoke above the hot stone */
function smoke(c){const ctx=c.getContext('2d');let W,H,ps=[];const sz=()=>{const r=c.getBoundingClientRect(),d=Math.min(devicePixelRatio,2);W=c.width=r.width*d;H=c.height=r.height*d};sz();addEventListener('resize',sz);
  let on=true;ScrollTrigger.create({trigger:'.hero',start:'top top',end:'bottom top',onLeave:()=>on=false,onEnterBack:()=>{on=true;requestAnimationFrame(t)}});
  const t=()=>{ctx.clearRect(0,0,W,H);if(ps.length<70&&Math.random()<.5)ps.push({x:W*(.6+Math.random()*.22),y:H*(.62+Math.random()*.08),r:(30+Math.random()*50)*(W/1400),vx:(Math.random()-.4)*.4,vy:-(.5+Math.random()*.8)*(H/900),l:0,m:220+Math.random()*160});
    for(const p of ps){p.l++;p.x+=p.vx+Math.sin((p.y+p.l)*.01)*.4;p.y+=p.vy;p.r*=1.006;const a=Math.sin(Math.min(1,p.l/p.m)*Math.PI)*.11;
      const g=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r);g.addColorStop(0,`rgba(240,232,220,${a})`);g.addColorStop(1,'rgba(240,232,220,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,7);ctx.fill()}
    ps=ps.filter(p=>p.l<p.m);if(on)requestAnimationFrame(t)};if(!RM)requestAnimationFrame(t)}

/* hero */
function hero(){
  const tl=gsap.timeline();
  tl.from('.hero-pic img',{scale:1.25,duration:2.4,ease:'expo.out'})
    .from('.hero .eyebrow,.hero .lead,.hero .ctas,.hero .hours',{y:24,opacity:0,stagger:.1,duration:1,ease:'power3.out'},'-=1.9')
    .from($$('.hero .ln>span'),{yPercent:110,duration:1.2,ease:'expo.out',stagger:.05},'-=1.9');
  gsap.to('.hero-pic img',{yPercent:10,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  smoke($('#smoke'));
}

/* intro */
async function intro(){
  let seen=false;try{seen=sessionStorage.getItem('ww-intro')==='1'}catch(e){}
  if(RM||seen){document.documentElement.classList.add('no-intro');hero();return}
  try{sessionStorage.setItem('ww-intro','1')}catch(e){}
  lenis&&lenis.stop();
  let svg='';try{svg=await(await fetch('img/logo.svg')).text()}catch(e){}
  const box=$('#introLogo');box.innerHTML=svg;const s=$('svg',box);const el=$('#intro');
  const done=()=>{gsap.to(el,{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'expo.inOut',onComplete:()=>{el.remove();lenis&&lenis.start();ScrollTrigger.refresh()}});hero()};
  if(!s){done();return}
  s.insertAdjacentHTML('afterbegin','<defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#E3C890"/><stop offset="1" stop-color="#F1EBE1"/></linearGradient><clipPath id="lc"><rect id="lr" x="0" y="717" width="1169" height="0"/></clipPath></defs>');
  const p=$('path',s);p.setAttribute('clip-path','url(#lc)');p.setAttribute('fill','url(#lg)');
  const f=fire($('#introFire'),{x:.5,y:1,w:.6,rate:4});
  const tl=gsap.timeline({onComplete:done});
  tl.to('#lr',{attr:{y:0,height:717},duration:1.4,ease:'power2.inOut'})
    .to('.intro-claim',{opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.3')
    .to('#introFire',{opacity:.9,duration:.4,onStart:()=>{f.p=1;f.start()}},'-=.5')
    .to({},{duration:.7})
    .add(()=>{f.p=0});
}

/* reservation */
(()=>{
  const MAIL='info@webers-wikinger.de',MON=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],WD=['So','Mo','Di','Mi','Do','Fr','Sa'];
  const OPEN={2:[16,30],3:[16,30],4:[16,30],5:[16,30],6:[11,30]},LAST=[21,30],LEAD=24*60*60*1000;
  const today=new Date();today.setHours(0,0,0,0);const max=new Date(today);max.setDate(max.getDate()+90);
  let view=new Date(today.getFullYear(),today.getMonth(),1),sel=null,slot=null,guests=2,step=1,area='egal';
  $$('#area button').forEach(b=>b.addEventListener('click',()=>{area=b.dataset.a;$$('#area button').forEach(x=>x.classList.toggle('sel',x===b))}));
  const cal=$('#cal'),title=$('#calTitle'),prev=$('#calPrev'),next=$('#calNext'),slots=$('#slots'),form=$('#rform');
  const fmt=d=>`${WD[d.getDay()]}, ${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
  function go(n){step=n;$$('.rstep',form).forEach(s=>s.classList.toggle('on',+s.dataset.s===n));$$('.steps li',form).forEach((l,i)=>l.classList.toggle('on',i<Math.min(n,3)));
    if(n===3)$('#summary').innerHTML=`<b>${fmt(sel)}</b> · <b>${slot} Uhr</b> · <b>${guests} ${guests===1?'Person':'Personen'}</b>${area!=='egal'?` · Wunsch: <b>${area}</b>`:''}`;}
  function render(){title.textContent=`${MON[view.getMonth()]} ${view.getFullYear()}`;cal.innerHTML='';
    const first=(view.getDay()+6)%7,days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    for(let i=0;i<first;i++)cal.insertAdjacentHTML('beforeend','<span class="pad"></span>');
    for(let d=1;d<=days;d++){const dt=new Date(view.getFullYear(),view.getMonth(),d);const b=document.createElement('button');b.type='button';b.textContent=d;
      const off=dt<today||dt>max||!OPEN[dt.getDay()]||!daySlots(dt).length;b.disabled=off;
      if(+dt===+today)b.classList.add('today');if(sel&&+dt===+sel)b.classList.add('sel');
      b.setAttribute('aria-label',fmt(dt)+(off?' – nicht verfügbar':''));
      b.addEventListener('click',()=>{sel=dt;slot=null;render();buildSlots();go(2)});cal.appendChild(b)}
    prev.disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);next.disabled=new Date(view.getFullYear(),view.getMonth()+1,1)>max}
  function daySlots(dt){const o=OPEN[dt.getDay()];if(!o)return[];const out=[];let h=o[0],m=o[1];const now=new Date();
    while(h<LAST[0]||(h===LAST[0]&&m<=LAST[1])){const t=new Date(dt);t.setHours(h,m);if(t-now>=LEAD)out.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);m+=30;if(m===60){m=0;h++}}return out}
  function buildSlots(){slots.innerHTML='';daySlots(sel).forEach(s=>{const b=document.createElement('button');b.type='button';b.textContent=s;if(s===slot)b.classList.add('sel');
    b.addEventListener('click',()=>{slot=s;$$('button',slots).forEach(x=>x.classList.toggle('sel',x===b))});slots.appendChild(b)})}
  prev.addEventListener('click',()=>{view.setMonth(view.getMonth()-1);render()});next.addEventListener('click',()=>{view.setMonth(view.getMonth()+1);render()});
  const gOut=$('#gOut'),big=$('#bigGroup');const setG=v=>{guests=Math.max(1,Math.min(10,v));gOut.textContent=guests;big.hidden=guests<10};
  $('#gMinus').addEventListener('click',()=>setG(guests-1));$('#gPlus').addEventListener('click',()=>{if(guests===10){big.hidden=false;return}setG(guests+1)});
  $$('[data-back]',form).forEach(b=>b.addEventListener('click',()=>go(step-1)));
  $('[data-next="3"]',form).addEventListener('click',()=>{if(!slot){slots.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}go(3)});
  form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form),err=$('#err');
    const name=(f.get('name')||'').trim(),tel=(f.get('tel')||'').trim(),mail=(f.get('mail')||'').trim();
    if(name.length<2){err.textContent='Bitte geben Sie Ihren Namen an.';return}
    if(!/^[+\d][\d\s/()-]{5,}$/.test(tel)){err.textContent='Bitte geben Sie eine gültige Telefonnummer an.';return}
    if(mail&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)){err.textContent='Bitte prüfen Sie Ihre E-Mail-Adresse.';return}
    err.textContent='';
    const subj=`Reservierungsanfrage – ${fmt(sel)}, ${slot} Uhr, ${guests} ${guests===1?'Person':'Personen'}`;
    const body=[`Liebes Team vom Webers Wikinger,`,``,`ich möchte gerne einen Tisch reservieren:`,``,`Datum: ${fmt(sel)}`,`Uhrzeit: ${slot} Uhr`,`Personen: ${guests}`,area!=='egal'?`Platzwunsch: ${area}`:'',f.get('anlass')?`Anlass: ${f.get('anlass')}`:'',f.get('note')?`Anmerkung: ${f.get('note')}`:'',``,`Name: ${name}`,`Telefon: ${tel}`,mail?`E-Mail: ${mail}`:'',``,`Vielen Dank und bis bald!`].filter((l,i,a)=>l!==''||a[i-1]!=='').join('\n');
    const href=`mailto:${MAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    $('#mailFallback').href=href;location.href=href;go(4)});
  $$('[data-res]').forEach(a=>a.addEventListener('click',()=>{if(step===4){form.reset();sel=null;slot=null;setG(2);render();go(1)}}));
  if(![...Array(40)].some((_,i)=>{const d=new Date(today);d.setDate(d.getDate()+i);return d.getMonth()===today.getMonth()&&OPEN[d.getDay()]&&daySlots(d).length}))view.setMonth(view.getMonth()+1);
  render();
})();

reveals();intro();
addEventListener('load',()=>ScrollTrigger.refresh());
})();
