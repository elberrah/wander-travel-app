(function(){
  const $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const groups=['.kids-gallery figure','.eng-card','.kids-trust-item','.kids-pole','.kids-age','.quick-stats-card','.filter-hub','.op-pic','.op-book','.op-simgrid a','.how-step','.benefit-card','.why-stat','.testimonial-card','.faq-item','.contact-card'];
  groups.forEach(g=>{
    $$(g).forEach((el,i)=>{el.setAttribute('data-stg','');el.style.setProperty('--i',i%6)});
  });
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.classList.add('in');io.unobserve(e.target);
    const n=e.target.querySelector('.why-num');if(n)count(n);
  }),{threshold:.2});
  $$('[data-stg]').forEach(el=>io.observe(el));

  function count(el){
    if(el.dataset.done)return;el.dataset.done=1;
    const t=el.textContent.trim(),m=t.match(/^([\d\s\u202f\u00a0]+)(.*)$/);if(!m)return;
    const end=parseInt(m[1].replace(/\D/g,''),10),suf=m[2];
    if(!end)return;
    const fmt=v=>v.toLocaleString('fr-FR')+suf,dur=1400,t0=performance.now();
    (function tick(now){
      const p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);
      el.textContent=fmt(Math.round(end*e));
      if(p<1)requestAnimationFrame(tick);else el.textContent=t;
    })(t0);
  }

  $$('.how-step,.benefit-card').forEach(c=>c.addEventListener('pointermove',e=>{
    const r=c.getBoundingClientRect();
    c.style.setProperty('--mx',(e.clientX-r.left)+'px');
    c.style.setProperty('--my',(e.clientY-r.top)+'px');
  }));
})();

(function(){
  // cartes générées dynamiquement (catalogue, page offre)
  const seen=new WeakSet();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
  function scan(){
    document.querySelectorAll('.offer-card,.op-h,.op-desc').forEach(el=>{
      if(seen.has(el))return;seen.add(el);
      if(!el.hasAttribute('data-stg')){el.setAttribute('data-stg','');el.style.setProperty('--i',(el.parentElement&&[...el.parentElement.children].indexOf(el))%6||0)}
      io.observe(el);
    });
  }
  scan();
  new MutationObserver(scan).observe(document.body,{childList:true,subtree:true});
  // header : ombre au scroll
  const h=document.querySelector('.main-header');
  if(h)addEventListener('scroll',()=>h.style.boxShadow=scrollY>10?'0 10px 30px -18px rgba(0,0,0,.4)':'none',{passive:true});
})();

(function(){
  const d=document.getElementById('fl-d');if(!d)return;
  const p=n=>String(n).padStart(2,'0'),g=i=>document.getElementById(i);
  function tick(){
    const now=new Date(),t=new Date(now);
    t.setHours(0,0,0,0);
    t.setDate(t.getDate()+((4-t.getDay()+7)%7));
    if(t<=now)t.setDate(t.getDate()+7);
    let s=Math.floor((t-now)/1000);
    const D=Math.floor(s/86400);s%=86400;const H=Math.floor(s/3600);s%=3600;
    d.textContent=p(D);g('fl-h').textContent=p(H);g('fl-m').textContent=p(Math.floor(s/60));g('fl-s').textContent=p(s%60);
  }
  tick();setInterval(tick,1000);
})();
