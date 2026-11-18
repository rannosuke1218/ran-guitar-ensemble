/* スクロールに合わせて、ふわっと出す（動きを減らす設定の人には出さない） */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('motion');
  function setup(){
    var els=document.querySelectorAll('[data-reveal], .badge, .msg, .ens-grid p, .career li, .sns li, .m-card, .profile-grid dt, .profile-grid dd, .profile-text p, .links li, .head, .qa');
    els.forEach(function(el){
      el.classList.add('reveal');
      var sib=el.parentElement?Array.prototype.indexOf.call(el.parentElement.children,el):0;
      el.style.transitionDelay=(Math.min(sib,6)*0.09)+'s';
    });
    if(reduce||!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.15,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(e){io.observe(e)});
  }
  /* 弦の線と相談ボタン */
  function extras(){
    var s=document.createElement('div'); s.className='scroll-string'; s.innerHTML='<span></span>'; document.body.appendChild(s);
    var bar=s.firstChild, t=null;
    var a=document.createElement('a'); a.className='corner'; a.href='https://www.instagram.com/ran.guitar_ensemble/'; a.target='_blank'; a.rel='noopener';
    a.innerHTML='<span>ご連絡</span>'; document.body.appendChild(a);
    function on(){
      var h=document.documentElement.scrollHeight-innerHeight, p=h>0?scrollY/h:0;
      bar.style.height=(p*100)+'%';
      a.classList.toggle('show', scrollY>innerHeight*0.6);
      if(!reduce){ s.classList.remove('buzz'); void s.offsetWidth; s.classList.add('buzz'); }
    }
    addEventListener('scroll',on,{passive:true}); on();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',extras);else extras();
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(setup,0)});else setTimeout(setup,0);
})();
