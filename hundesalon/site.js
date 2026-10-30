(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
gsap.registerPlugin(ScrollTrigger);

/* ---------- split headlines into masked lines (by words) ---------- */
$$('.split').forEach(el=>{
  const html=el.innerHTML;const tmp=document.createElement('div');tmp.innerHTML=html;const parts=[];
  tmp.childNodes.forEach(n=>{const em=n.nodeType===1&&n.tagName==='EM';(n.textContent).split(/\s+/).filter(Boolean).forEach(w=>parts.push(em?`<em>${w}</em>`:w))});
  el.innerHTML=parts.map(w=>`<span class="ln" style="display:inline-block;vertical-align:top"><span>${w}</span></span>`).join(' ');
});

/* ---------- smooth scroll ---------- */
let lenis=null;
if(!RM&&window.Lenis){lenis=new Lenis({duration:1.15,smoothWheel:true});lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(t=>lenis.raf(t*1000));gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const id=a.getAttribute('href');if(id.length>1&&$(id)){e.preventDefault();lenis.scrollTo(id==='#top'?0:$(id),{offset:id==='#top'?0:-70})}}));}

/* ---------- header ---------- */
const hdr=$('#hdr');ScrollTrigger.create({start:60,onUpdate:s=>hdr.classList.toggle('solid',s.scroll()>60)});

/* ---------- progress: cut line + scissors ---------- */
const sc=$('#scissors'),cd=$('#cutDone');
ScrollTrigger.create({start:0,end:'max',onUpdate:s=>{const p=s.progress;sc.style.top=(p*100)+'%';cd.style.transform=`scaleY(${p})`;sc.style.rotate=(180+Math.sin(s.scroll()/40)*14)+'deg'}});

/* ---------- reveals ---------- */
function reveals(){
  $$('.split').forEach(el=>{gsap.from($$('.ln>span',el),{yPercent:110,duration:1.1,ease:'expo.out',stagger:.045,scrollTrigger:{trigger:el,start:'top 86%'}})});
  $$('.rv').forEach(el=>gsap.from(el,{y:28,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}}));
  $$('.fact').forEach(el=>{gsap.from($$('.n,.t',el),{y:40,opacity:0,duration:.9,ease:'expo.out',stagger:.08,scrollTrigger:{trigger:el,start:'top 84%',onEnter:()=>el.classList.add('on')}})});
  // underline draw via pseudo: use keyframe on class
  const st=document.createElement('style');st.textContent='.fact.on::after{transform:scaleX(1);transition:transform 1.4s cubic-bezier(.7,0,.2,1)}';document.head.appendChild(st);
  // philosophy words
  $$('.word').forEach(w=>gsap.from(w.children,{yPercent:60,opacity:0,duration:1.1,ease:'expo.out',stagger:.1,scrollTrigger:{trigger:w,start:'top 85%'}}));
  gsap.from('.portrait',{clipPath:'inset(100% 0 0 0)',duration:1.4,ease:'expo.inOut',scrollTrigger:{trigger:'.portrait',start:'top 80%'}});
  gsap.fromTo('.portrait img',{scale:1.25},{scale:1,ease:'none',scrollTrigger:{trigger:'.philo',start:'top bottom',end:'bottom top',scrub:true}});
}

/* ---------- hero parallax ---------- */
function hero(){
  const tl=gsap.timeline();
  tl.from('.hp',{clipPath:'inset(100% 0 0 0)',duration:1.5,ease:'expo.inOut',stagger:.12})
    .from('.hp img',{scale:1.35,duration:2,ease:'expo.out',stagger:.12},'<')
    .from('.orn path',{strokeDasharray:600,strokeDashoffset:600,duration:2,ease:'power2.inOut'},'-=1.6');
  $$('.hp').forEach(el=>gsap.to(el,{yPercent:parseFloat(el.dataset.speed)*-120,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}}));
  if(matchMedia('(pointer:fine)').matches){const pics=$('.hero-pics');window.addEventListener('mousemove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;$$('.hp',pics).forEach((el,i)=>gsap.to(el,{x:x*(10+i*12),y:y*(8+i*10),duration:1.2,ease:'power3.out'}))})}
}

/* ---------- story: horizontal pin ---------- */
function story(){
  const track=$('#track'),fill=$('#combFill');
  const mm=gsap.matchMedia();
  mm.add('(min-width:900px)',()=>{
    const dist=()=>track.scrollWidth-innerWidth;
    const tw=gsap.to(track,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:'.story',start:'top top',end:()=>'+='+dist(),pin:true,scrub:.8,invalidateOnRefresh:true,onUpdate:s=>fill.style.transform=`scaleX(${s.progress})`}});
    $$('.panel.st,.p-end',track).forEach(p=>{
      const img=$('img',p),arch=$('.arch',p),txt=$('.st-txt',p);
      gsap.fromTo(arch,{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)',ease:'expo.out',scrollTrigger:{trigger:p,containerAnimation:tw,start:'left 85%',end:'left 35%',scrub:true}});
      gsap.fromTo(img,{scale:1.35},{scale:1.05,ease:'none',scrollTrigger:{trigger:p,containerAnimation:tw,start:'left right',end:'right left',scrub:true}});
      gsap.from(txt.children,{x:80,opacity:0,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:p,containerAnimation:tw,start:'left 70%',end:'left 30%',scrub:true}});
    });
    return()=>{gsap.set(track,{x:0})};
  });
  mm.add('(max-width:899px)',()=>{
    $$('.panel.st,.p-end',track).forEach(p=>{gsap.from($('.arch',p),{clipPath:'inset(0 0 100% 0)',duration:1.3,ease:'expo.inOut',scrollTrigger:{trigger:p,start:'top 80%'}});gsap.from($('.st-txt',p).children,{y:30,opacity:0,stagger:.08,duration:.9,ease:'power3.out',scrollTrigger:{trigger:p,start:'top 70%'}})});
  });
}

/* ---------- certificates fan ---------- */
function fan(){
  const pos=[{r:-12,x:-78,y:-48},{r:7,x:-12,y:-56},{r:-2,x:-40,y:10}];
  $$('.cert').forEach((c,i)=>{gsap.set(c,{xPercent:pos[i].x,yPercent:pos[i].y,rotate:0,y:200,opacity:0});
    gsap.to(c,{y:0,opacity:1,rotate:pos[i].r,duration:1.3,ease:'expo.out',delay:i*.12,scrollTrigger:{trigger:'#fan',start:'top 78%'}});
    c.addEventListener('mouseenter',()=>gsap.to(c,{rotate:0,scale:1.08,duration:.5,ease:'power3.out'}));
    c.addEventListener('mouseleave',()=>gsap.to(c,{rotate:pos[i].r,scale:1,duration:.6,ease:'power3.out'}));});
}

/* ---------- gallery bands ---------- */
function gallery(){
  const N=17,ids=[...Array(N)].map((_,i)=>'g'+String(i+1).padStart(2,'0'));
  const alt='Hund nach der Pflege im HundeSalon & mehr';
  const mk=list=>list.concat(list).map(id=>`<button type="button" data-src="img/${id}.webp" aria-label="Bild vergrößern"><img src="img/${id}.webp" alt="${alt}" loading="lazy" width="800" height="800"></button>`).join('');
  const b1=$('#band1'),b2=$('#band2');b1.innerHTML=mk(ids.slice(0,9));b2.innerHTML=mk(ids.slice(8));
  if(!RM){[[b1,-1],[b2,1]].forEach(([b,d])=>{const half=()=>b.scrollWidth/2;let x=d>0?-half():0;let v=0;
    gsap.ticker.add(()=>{const sp=.45+Math.min(6,Math.abs(v));x+=d*sp;const h=half();if(x<=-h)x+=h;if(x>0)x-=h;b.style.transform=`translate3d(${x}px,0,0)`;v*=.92});
    ScrollTrigger.create({trigger:'.gallery',start:'top bottom',end:'bottom top',onUpdate:s=>{v=s.getVelocity()/300}});});}
  const lb=$('#lb'),li=$('img',lb);
  document.addEventListener('click',e=>{const bt=e.target.closest('.band button');if(bt){li.src=bt.dataset.src;li.alt=alt;lb.hidden=false;lenis&&lenis.stop();$('.lb-x').focus()}});
  const close=()=>{lb.hidden=true;lenis&&lenis.start()};
  $('.lb-x').addEventListener('click',close);lb.addEventListener('click',e=>{if(e.target===lb)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)close()});
}

/* ---------- intro: der erste Schnitt ---------- */
async function intro(){
  const el=$('#intro');let seen=false;try{seen=sessionStorage.getItem('hs-intro')==='1'}catch(e){}
  if(RM||seen){document.documentElement.classList.add('no-intro');return}
  try{sessionStorage.setItem('hs-intro','1')}catch(e){}
  if(lenis)lenis.stop();
  let svg='';try{svg=await (await fetch('img/crest.svg')).text()}catch(e){}
  const box=$('#introCrest');box.innerHTML=svg;const s=$('svg',box);
  const done=()=>{gsap.to(el,{clipPath:'inset(0 0 100% 0)',duration:1.1,ease:'expo.inOut',onComplete:()=>{el.remove();lenis&&lenis.start();ScrollTrigger.refresh()}});hero()};
  if(!s){done();return}
  s.insertAdjacentHTML('afterbegin','<defs><clipPath id="cut"><rect id="cutR" x="0" y="0" width="0" height="484"/></clipPath></defs>');
  const lf=$('.lf',s),lg=$('.lg',s);lg.setAttribute('clip-path','url(#cut)');
  const clip=$('#clipper'),fl=$('#flecks');
  const tl=gsap.timeline({onComplete:done});
  tl.from(lf,{opacity:0,scale:.96,transformOrigin:'50% 50%',duration:.9,ease:'power2.out'})
    .set(clip,{opacity:1},'-=.35')
    .fromTo(clip,{left:'-30%',top:'30%',rotate:12},{left:'92%',top:'52%',rotate:4,duration:1.15,ease:'power2.inOut'},'-=.35')
    .fromTo('#cutR',{attr:{width:0}},{attr:{width:686},duration:1.15,ease:'power2.inOut'},'<')
    .to(clip,{opacity:0,duration:.2},'-=.1')
    .to('.intro-wm',{opacity:1,y:0,duration:.7,ease:'power3.out'},'-=.35')
    .to({},{duration:.35});
  // falling gold flecks along the cut
  for(let i=0;i<34;i++){const f=document.createElement('i');f.className='fleck';fl.appendChild(f);
    const t0=.55+i*.032;tl.fromTo(f,{left:(30+i*1.25)+'%',top:(44+i*.25)+'%',opacity:0,rotate:Math.random()*180},{opacity:.9,duration:.05},t0).to(f,{y:120+Math.random()*160,x:(Math.random()-.5)*60,rotate:'+=200',opacity:0,duration:1+Math.random()*.6,ease:'power1.in'},t0+.05)}
}

/* ---------- boot ---------- */
reveals();story();fan();gallery();
intro().then(()=>{if(document.documentElement.classList.contains('no-intro'))hero()});
window.addEventListener('load',()=>ScrollTrigger.refresh());
})();
