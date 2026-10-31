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
(()=>{const d=new Date().getDay(),h=$('#todayHours');const open={1:'16:30',2:'16:30',3:'16:30',4:'16:30',5:'16:30',6:'11:30'};
  h.innerHTML=open[d]?`<i></i>Heute ab ${open[d]} Uhr geöffnet`:`<i class="off"></i>Heute Ruhetag – morgen ab 16:30 Uhr`})();

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
  $$('.split').forEach(el=>gsap.from($$('.ln>span',el),{yPercent:110,duration:1.15,ease:'expo.out',stagger:.04,scrollTrigger:{trigger:el,start:'top 86%'}}));
  $$('.rv,.body,.lead,.cite').filter(el=>!el.closest('.hero')).forEach(el=>gsap.from(el,{y:26,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
  $$('.op').forEach((el,i)=>{gsap.from(el,{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.oma-pics',start:'top 75%'},delay:i*.15});
    gsap.fromTo($('img',el),{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:'.oma',start:'top bottom',end:'bottom top',scrub:true}})});
  gsap.from('.flist li',{y:30,opacity:0,stagger:.08,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.flist',start:'top 85%'}});
  gsap.from('.dish',{y:24,opacity:0,stagger:.05,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.panels',start:'top 85%'}});
  gsap.from('.stop',{y:40,opacity:0,stagger:.12,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.stops',start:'top 85%'}});
  const rp=$('#routePath'),L=rp.getTotalLength();gsap.fromTo(rp,{strokeDasharray:L,strokeDashoffset:L},{strokeDashoffset:0,ease:'none',scrollTrigger:{trigger:'#route',start:'top 85%',end:'bottom 55%',scrub:true}});
  gsap.from('.rcard',{y:60,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:'.rcard',start:'top 85%'}});
  gsap.fromTo('.res-bg img',{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:'.res',start:'top bottom',end:'bottom top',scrub:true}});
  gsap.from('.cpic',{clipPath:'inset(0 0 100% 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.cpic',start:'top 80%'}});
  /* fine dining strip */
  const strip=$('#strip');gsap.to(strip,{x:()=>-(strip.scrollWidth-innerWidth*.9),ease:'none',scrollTrigger:{trigger:'.fine',start:'top bottom',end:'bottom top',scrub:true,invalidateOnRefresh:true}});
  /* press marquee */
  const mq=$('#mq');mq.innerHTML+=mq.innerHTML;let x=0;gsap.ticker.add(()=>{x-=.6;const h=mq.scrollWidth/2;if(-x>=h)x+=h;mq.style.transform=`translate3d(${x}px,0,0)`});
  /* flame section */
  const fc=fire($('#fire'),{x:.5,y:.72,w:.35,rate:5});
  ScrollTrigger.create({trigger:'.flame',start:'top 70%',end:'bottom 30%',onUpdate:s=>{fc.p=Math.sin(Math.min(1,s.progress)*Math.PI)*1.2+.2;fc.start()},onLeave:()=>fc.p=0,onLeaveBack:()=>fc.p=0});
  gsap.fromTo('.flame-pic img',{scale:1.2},{scale:1,ease:'none',scrollTrigger:{trigger:'.flame',start:'top bottom',end:'bottom top',scrub:true}});
}

/* hero */
function hero(){
  const tl=gsap.timeline();
  tl.from('.hero-pic',{clipPath:'inset(0 0 0 100%)',duration:1.6,ease:'expo.inOut'})
    .from('.hero-pic img',{scale:1.3,duration:2.2,ease:'expo.out'},'<')
    .from('.hero .eyebrow,.hero .lead,.hero .ctas,.hero .hours',{y:24,opacity:0,stagger:.1,duration:1,ease:'power3.out'},'-=1.6');
  gsap.to('.hero-pic img',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
  gsap.to('.hero-okto',{rotate:12,y:-80,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
}

/* intro */
async function intro(){
  let seen=false;try{seen=sessionStorage.getItem('kv-intro')==='1'}catch(e){}
  if(RM||seen){document.documentElement.classList.add('no-intro');hero();return}
  try{sessionStorage.setItem('kv-intro','1')}catch(e){}
  lenis&&lenis.stop();
  let svg='';try{svg=await(await fetch('img/logo.svg')).text()}catch(e){}
  const box=$('#introLogo');box.innerHTML=svg;const s=$('svg',box);const el=$('#intro');
  const done=()=>{gsap.to(el,{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'expo.inOut',onComplete:()=>{el.remove();lenis&&lenis.start();ScrollTrigger.refresh()}});hero()};
  if(!s){done();return}
  s.insertAdjacentHTML('afterbegin','<defs><linearGradient id="lg" x1="0" x2="1"><stop offset="0" stop-color="#E6C98E"/><stop offset="1" stop-color="#F2EDE4"/></linearGradient><clipPath id="lc"><rect id="lr" x="0" y="0" width="0" height="128"/></clipPath></defs>');
  const p=$('path',s);p.setAttribute('clip-path','url(#lc)');p.setAttribute('fill','url(#lg)');
  const f=fire($('#introFire'),{x:.5,y:1,w:.6,rate:4});
  const tl=gsap.timeline({onComplete:done});
  tl.to('#lr',{attr:{width:592},duration:1.3,ease:'power2.inOut'})
    .to('.intro-claim',{opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.3')
    .to('#introFire',{opacity:.9,duration:.4,onStart:()=>{f.p=1;f.start()}},'-=.5')
    .to({},{duration:.7})
    .add(()=>{f.p=0});
}

/* menu tabs */
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{
  $$('.tabs button').forEach(x=>x.setAttribute('aria-selected',x===b));
  $$('.panel').forEach(p=>p.classList.toggle('on',p.dataset.p===b.dataset.t));
  gsap.from($$(`.panel[data-p="${b.dataset.t}"] .dish`),{y:16,opacity:0,stagger:.04,duration:.6,ease:'power3.out'})}));

/* reservation */
(()=>{
  const MAIL='maria@kavos-restaurant.de',MON=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],WD=['So','Mo','Di','Mi','Do','Fr','Sa'];
  const OPEN={1:[16,30],2:[16,30],3:[16,30],4:[16,30],5:[16,30],6:[11,30]},LAST=[22,0];
  const today=new Date();today.setHours(0,0,0,0);const max=new Date(today);max.setDate(max.getDate()+90);
  let view=new Date(today.getFullYear(),today.getMonth(),1),sel=null,slot=null,guests=2,step=1;
  const cal=$('#cal'),title=$('#calTitle'),prev=$('#calPrev'),next=$('#calNext'),slots=$('#slots'),form=$('#rform');
  const fmt=d=>`${WD[d.getDay()]}, ${String(d.getDate()).padStart(2,'0')}.${String(d.getMonth()+1).padStart(2,'0')}.${d.getFullYear()}`;
  function go(n){step=n;$$('.rstep',form).forEach(s=>s.classList.toggle('on',+s.dataset.s===n));$$('.steps li',form).forEach((l,i)=>l.classList.toggle('on',i<Math.min(n,3)));
    if(n===3)$('#summary').innerHTML=`<b>${fmt(sel)}</b> · <b>${slot} Uhr</b> · <b>${guests} ${guests===1?'Person':'Personen'}</b>`;}
  function render(){title.textContent=`${MON[view.getMonth()]} ${view.getFullYear()}`;cal.innerHTML='';
    const first=(view.getDay()+6)%7,days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
    for(let i=0;i<first;i++)cal.insertAdjacentHTML('beforeend','<span class="pad"></span>');
    for(let d=1;d<=days;d++){const dt=new Date(view.getFullYear(),view.getMonth(),d);const b=document.createElement('button');b.type='button';b.textContent=d;
      const off=dt<today||dt>max||!OPEN[dt.getDay()]||(+dt===+today&&!daySlots(dt).length);b.disabled=off;
      if(+dt===+today)b.classList.add('today');if(sel&&+dt===+sel)b.classList.add('sel');
      b.setAttribute('aria-label',fmt(dt)+(off?' – nicht verfügbar':''));
      b.addEventListener('click',()=>{sel=dt;slot=null;render();buildSlots();go(2)});cal.appendChild(b)}
    prev.disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);next.disabled=new Date(view.getFullYear(),view.getMonth()+1,1)>max}
  function daySlots(dt){const o=OPEN[dt.getDay()];if(!o)return[];const out=[];let h=o[0],m=o[1];const now=new Date();
    while(h<LAST[0]||(h===LAST[0]&&m<=LAST[1])){const t=new Date(dt);t.setHours(h,m);if(t-now>60*60*1000)out.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);m+=30;if(m===60){m=0;h++}}return out}
  function buildSlots(){slots.innerHTML='';daySlots(sel).forEach(s=>{const b=document.createElement('button');b.type='button';b.textContent=s;if(s===slot)b.classList.add('sel');
    b.addEventListener('click',()=>{slot=s;$$('button',slots).forEach(x=>x.classList.toggle('sel',x===b))});slots.appendChild(b)})}
  prev.addEventListener('click',()=>{view.setMonth(view.getMonth()-1);render()});next.addEventListener('click',()=>{view.setMonth(view.getMonth()+1);render()});
  const gOut=$('#gOut'),big=$('#bigGroup');const setG=v=>{guests=Math.max(1,Math.min(8,v));gOut.textContent=guests;big.hidden=guests<8};
  $('#gMinus').addEventListener('click',()=>setG(guests-1));$('#gPlus').addEventListener('click',()=>{if(guests===8){big.hidden=false;return}setG(guests+1)});
  $$('[data-back]',form).forEach(b=>b.addEventListener('click',()=>go(step-1)));
  $('[data-next="3"]',form).addEventListener('click',()=>{if(!slot){slots.animate([{transform:'translateX(-6px)'},{transform:'translateX(6px)'},{transform:'none'}],{duration:300});return}go(3)});
  form.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(form),err=$('#err');
    const name=(f.get('name')||'').trim(),tel=(f.get('tel')||'').trim(),mail=(f.get('mail')||'').trim();
    if(name.length<2){err.textContent='Bitte geben Sie Ihren Namen an.';return}
    if(!/^[+\d][\d\s/()-]{5,}$/.test(tel)){err.textContent='Bitte geben Sie eine gültige Telefonnummer an.';return}
    if(mail&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail)){err.textContent='Bitte prüfen Sie Ihre E-Mail-Adresse.';return}
    err.textContent='';
    const subj=`Reservierungsanfrage – ${fmt(sel)}, ${slot} Uhr, ${guests} ${guests===1?'Person':'Personen'}`;
    const body=[`Liebes KAVOS-Team,`,``,`ich möchte gerne einen Tisch reservieren:`,``,`Datum: ${fmt(sel)}`,`Uhrzeit: ${slot} Uhr`,`Personen: ${guests}`,f.get('anlass')?`Anlass: ${f.get('anlass')}`:'',f.get('note')?`Anmerkung: ${f.get('note')}`:'',``,`Name: ${name}`,`Telefon: ${tel}`,mail?`E-Mail: ${mail}`:'',``,`Vielen Dank und bis bald!`].filter((l,i,a)=>l!==''||a[i-1]!=='').join('\n');
    const href=`mailto:${MAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
    $('#mailFallback').href=href;location.href=href;go(4)});
  $$('[data-res]').forEach(a=>a.addEventListener('click',()=>{if(step===4){form.reset();sel=null;slot=null;setG(2);render();go(1)}}));
  render();
})();

reveals();intro();
addEventListener('load',()=>ScrollTrigger.refresh());
})();
