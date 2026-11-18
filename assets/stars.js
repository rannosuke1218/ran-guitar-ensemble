/* 星の演出（Noctélie）
   ・data-stars の付いた場所に、またたく星空を敷く（白い星＋ときどきピンクの星）
   ・data-stars="shoot" の場所には、ロゴと同じ「丸い弧のピンクの流れ星」がときどき流れる
   ・タップ／クリックした所に、ロゴと同じ4つ角の星がきらっと出る
   ・弦の線（左端のスクロールの線）の先にピンクの星
   動きを減らす設定の人には、止まった星空だけを出す */
(function(){
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var PINK='226,132,168', WHITE='236,242,240';

  function starPath(ctx,x,y,L){ /* ロゴと同じ、細い4つ角の星 */
    ctx.beginPath(); ctx.moveTo(x,y-L);
    ctx.quadraticCurveTo(x,y,x+L,y); ctx.quadraticCurveTo(x,y,x,y+L);
    ctx.quadraticCurveTo(x,y,x-L,y); ctx.quadraticCurveTo(x,y,x,y-L); ctx.closePath();
  }

  function sky(host){
    var cv=document.createElement('canvas'); cv.className='starfield'; cv.setAttribute('aria-hidden','true');
    host.insertBefore(cv,host.firstChild);
    var ctx=cv.getContext('2d'), dpr=Math.min(2,window.devicePixelRatio||1), W=0,H=0, stars=[], shots=[], next=2500+Math.random()*2500;
    var shoot=host.getAttribute('data-stars')==='shoot';
    function build(){
      var r=host.getBoundingClientRect(); W=r.width; H=r.height; if(!W||!H) return;
      cv.width=W*dpr; cv.height=H*dpr; cv.style.width=W+'px'; cv.style.height=H+'px'; ctx.setTransform(dpr,0,0,dpr,0,0);
      var n=Math.round(W*H/2600*(parseFloat(host.getAttribute('data-density'))||1)); stars=[];
      for(var i=0;i<n;i++){
        var big=Math.random()<.035;
        stars.push({x:Math.random()*W,y:Math.random()*H,r:big?1.3:Math.random()*0.9+0.25,
          pink:Math.random()<.07,cross:big,ph:Math.random()*6.28,sp:.6+Math.random()*1.6,base:.35+Math.random()*.5});
      }
      if(reduce) draw(0);
    }
    function newShot(){ /* 円の一部を、左下から上を通って右へ（アイコンの流れ星と同じ向き） */
      var R=Math.max(W,H)*(0.35+Math.random()*0.35);
      var cx=W*(0.3+Math.random()*0.5), cy=H*(0.55+Math.random()*0.5)+R*0.35;
      var a1=(150+Math.random()*25)*Math.PI/180, len=(35+Math.random()*25)*Math.PI/180;
      shots.push({cx:cx,cy:cy,R:R,a1:a1,a2:a1-len,t:0,dur:1100+Math.random()*500});
    }
    function draw(t){
      ctx.clearRect(0,0,W,H);
      for(var i=0;i<stars.length;i++){
        var s=stars[i], a=reduce?s.base:s.base*(0.55+0.45*Math.sin(t/1000*s.sp+s.ph));
        ctx.fillStyle='rgba('+(s.pink?PINK:WHITE)+','+a.toFixed(3)+')';
        if(s.cross){ starPath(ctx,s.x,s.y,4.2); ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(s.x,s.y,s.r,0,6.283); ctx.fill(); }
      }
      for(var k=shots.length-1;k>=0;k--){
        var sh=shots[k], p=Math.min(1,sh.t/sh.dur), head=sh.a1+(sh.a2-sh.a1)*Math.min(1,p*1.25);
        var tail=sh.a1+(sh.a2-sh.a1)*Math.max(0,p*1.25-0.55), fade=p>0.8?(1-p)/0.2:1, N=26;
        for(var j=0;j<N;j++){
          var u0=j/N,u1=(j+1)/N, b0=tail+(head-tail)*u0, b1=tail+(head-tail)*u1;
          ctx.strokeStyle='rgba('+PINK+','+(fade*Math.pow(u1,1.3)).toFixed(3)+')'; ctx.lineWidth=0.4+2.2*Math.pow(u1,1.5);
          ctx.beginPath(); ctx.moveTo(sh.cx+sh.R*Math.cos(b0),sh.cy-sh.R*Math.sin(b0)); ctx.lineTo(sh.cx+sh.R*Math.cos(b1),sh.cy-sh.R*Math.sin(b1)); ctx.stroke();
        }
        var hx=sh.cx+sh.R*Math.cos(head), hy=sh.cy-sh.R*Math.sin(head);
        ctx.fillStyle='rgba('+PINK+','+fade.toFixed(3)+')'; starPath(ctx,hx,hy,7+3*Math.sin(p*Math.PI)); ctx.fill();
        if(p>=1) shots.splice(k,1);
      }
    }
    var last=0, vis=true;
    function loop(t){
      if(vis){
        var dt=last?t-last:16; last=t;
        if(shoot){ next-=dt; if(next<=0){ newShot(); next=5000+Math.random()*5000; } }
        for(var k=0;k<shots.length;k++) shots[k].t+=dt;
        draw(t);
      } else last=0;
      requestAnimationFrame(loop);
    }
    build(); addEventListener('resize',function(){ clearTimeout(host._st); host._st=setTimeout(build,150); });
    if('IntersectionObserver' in window) new IntersectionObserver(function(es){vis=es[0].isIntersecting;}).observe(host);
    if(!reduce) requestAnimationFrame(loop);
  }

  function sparkle(e){ /* タップした所にきらっ */
    if(reduce) return;
    var n=3+Math.floor(Math.random()*2);
    for(var i=0;i<n;i++){
      var s=document.createElement('span'); s.className='tap-star'+(i?'':' main');
      var ang=Math.random()*6.283, d=i?14+Math.random()*22:0;
      s.style.left=(e.clientX+Math.cos(ang)*d)+'px'; s.style.top=(e.clientY+Math.sin(ang)*d)+'px';
      s.style.animationDelay=(i*0.06)+'s'; document.body.appendChild(s);
      setTimeout(function(el){return function(){el.remove();};}(s),1100);
    }
  }

  function init(){
    document.querySelectorAll('[data-stars]').forEach(sky);
    document.addEventListener('pointerdown',sparkle,{passive:true});
    /* 弦の線の先に星（motion.js が作る線を待つ） */
    var tries=0;
    (function f(){
      var s=document.querySelector('.scroll-string span');
      if(s){ var st=document.createElement('i'); st.className='string-star'; s.appendChild(st); }
      else if(tries++<20) setTimeout(f,100);
    })();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
