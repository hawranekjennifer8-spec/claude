/* LUMINOSO Theme – J.H. Digital Atelier */
(function(){
 var h=document.getElementById('hdr'),mega=document.getElementById('mega'),mb=document.getElementById('megaBtn');
 var dark=h&&h.dataset.dark==='true',t;
 function setDark(){if(!h)return;var on=dark&&scrollY<innerHeight*.5&&!(mega&&mega.classList.contains('open'));h.classList.toggle('on-dark',on)}
 function open(v){if(!mega)return;mega.classList.toggle('open',v);mb.setAttribute('aria-expanded',v);setDark()}
 if(mb){mb.addEventListener('mouseenter',function(){clearTimeout(t);open(true)});mb.addEventListener('click',function(){open(!mega.classList.contains('open'))});
  mega.addEventListener('mouseenter',function(){clearTimeout(t)});[mb,mega].forEach(function(e){e.addEventListener('mouseleave',function(){t=setTimeout(function(){open(false)},220)})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')open(false)})}
 var mm=document.getElementById('mmenu');
 if(mm){document.getElementById('burger').onclick=function(){mm.classList.add('open');mm.setAttribute('aria-hidden','false')};document.getElementById('mclose').onclick=function(){mm.classList.remove('open');mm.setAttribute('aria-hidden','true')}}
 if(dark){setDark();addEventListener('scroll',setDark,{passive:true})}

 /* Preisfilter (Shopify-Standardfilter) */
 var ps=document.querySelector('[data-price]');
 if(ps)ps.addEventListener('change',function(){var u=new URL(location.href);u.searchParams.delete('filter.v.price.gte');u.searchParams.delete('filter.v.price.lte');u.searchParams.delete('page');
  if(ps.value){var r=ps.value.split('-');if(r[0])u.searchParams.set('filter.v.price.gte',r[0]);if(r[1])u.searchParams.set('filter.v.price.lte',r[1])}location.href=u.toString()});

 /* Mehr laden ohne Seitenwechsel */
 var more=document.getElementById('more'),grid=document.getElementById('grid');
 if(more&&grid)more.addEventListener('click',function(e){e.preventDefault();more.textContent='Lädt …';
  fetch(more.href).then(function(r){return r.text()}).then(function(html){var d=new DOMParser().parseFromString(html,'text/html');
   d.querySelectorAll('#grid .card').forEach(function(c){grid.appendChild(c)});var n=d.getElementById('more');
   if(n){more.href=n.href;more.textContent='Mehr anzeigen'}else more.parentNode.remove();if(window.ScrollTrigger)ScrollTrigger.refresh()})});

 /* Produktgalerie */
 var th=document.querySelectorAll('#th button'),mi=document.getElementById('mainImg');
 if(mi){th.forEach(function(b){b.onclick=function(){th.forEach(function(x){x.classList.toggle('on',x===b)});mi.classList.toggle('scene',!!b.dataset.scene);mi.classList.remove('zoom');var im=mi.querySelector('img');im.style.opacity=0;setTimeout(function(){im.src=b.dataset.src;im.style.opacity=1},180)}});
  mi.onclick=function(){mi.classList.toggle('zoom')};
  mi.onmousemove=function(e){if(!mi.classList.contains('zoom'))return;var r=mi.getBoundingClientRect();mi.querySelector('img').style.transformOrigin=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%'}}
 /* Varianten + Menge */
 var vid=document.getElementById('vid'),pr=document.getElementById('pr'),qv=document.getElementById('qv'),qn=document.getElementById('qn');
 document.querySelectorAll('.opt .chip').forEach(function(c){c.onclick=function(){if(c.disabled)return;document.querySelectorAll('.opt .chip').forEach(function(x){x.classList.toggle('on',x===c)});vid.value=c.dataset.id;pr.textContent=c.dataset.price;
  var u=new URL(location.href);u.searchParams.set('variant',c.dataset.id);history.replaceState(null,'',u)}});
 if(qn){var q=1;var set=function(){qn.textContent=q;qv.value=q};document.getElementById('qm').onclick=function(){q=Math.max(1,q-1);set()};document.getElementById('qp').onclick=function(){q=Math.min(9,q+1);set()}}

 /* Motion */
 var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 function motion(){
  if(reduced||!window.gsap||!window.Lenis){document.documentElement.classList.add('reduced');return}
  var lenis=new Lenis({lerp:.085,smoothWheel:true});window.__lenis=lenis;
  gsap.registerPlugin(ScrollTrigger);lenis.on('scroll',ScrollTrigger.update);gsap.ticker.add(function(t){lenis.raf(t*1000)});gsap.ticker.lagSmoothing(0);
  document.querySelectorAll('.rv').forEach(function(el){gsap.to(el,{opacity:1,y:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}})});
  document.querySelectorAll('.media img').forEach(function(el){gsap.fromTo(el,{yPercent:-6},{yPercent:6,ease:'none',scrollTrigger:{trigger:el.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
  if(document.querySelector('.hero')){gsap.from('.hero h1 .ln span',{yPercent:110,duration:1.4,ease:'expo.out',stagger:.12,delay:.15});gsap.from('.hero .label,.hero p,.hero .ctas',{opacity:0,y:20,duration:1.2,ease:'expo.out',stagger:.1,delay:.5});gsap.fromTo('#heroImg',{scale:1.14},{scale:1.04,duration:2.6,ease:'expo.out'});gsap.to('.hero .bg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})}
  if(document.querySelector('.chero')){gsap.from('.chero h1,.chero p,.chero .label',{y:30,opacity:0,duration:1.3,ease:'expo.out',stagger:.1});gsap.fromTo('.chero img',{scale:1.12},{scale:1,duration:2.4,ease:'expo.out'})}
 }
 motion();
})();
