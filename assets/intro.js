/* 開いたときのロゴの動き（その日初めて開いたときだけ。タップで飛ばせる）
   夜の緑の空に星がまたたく → 白い輪が描かれる → ギターのヘッドが立ち上がる
   → ピンクの流れ星が弧を描いて飛び、星がきらっ → NOCTÉLIE の文字 → 丸く閉じてページへ */
(function(){
  try{ if(sessionStorage.getItem('noctIntro')) return; sessionStorage.setItem('noctIntro','1'); }catch(e){}
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var css=document.createElement('style');
  css.textContent=
  'html.ri body *:not(#ran-intro):not(#ran-intro *){animation-play-state:paused!important}'+
  '#ran-intro{position:fixed;inset:0;z-index:100;background:radial-gradient(70% 55% at 50% 42%,rgba(14,42,35,.55),rgba(14,42,35,0) 70%),url(img/sky_tall.jpg) center/cover no-repeat,#17463a;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;transition:clip-path .9s cubic-bezier(.7,0,.2,1),opacity .4s;clip-path:circle(150% at 50% 50%);cursor:pointer}'+
  '@media (min-aspect-ratio:1/1){#ran-intro{background-image:radial-gradient(60% 60% at 50% 42%,rgba(14,42,35,.55),rgba(14,42,35,0) 70%),url(img/sky_wide.jpg)}}'+
  '#ran-intro.out{clip-path:circle(0% at 50% 42%)}'+
  '#ran-intro .dots{position:absolute;inset:0;pointer-events:none}'+
  '#ran-intro .dots i{position:absolute;width:2px;height:2px;border-radius:50%;background:#eef2f0;opacity:0;animation:riTw 2.4s ease-in-out infinite}'+
  '#ran-intro .disc{position:relative;width:min(300px,70vw);aspect-ratio:1;display:flex;align-items:center;justify-content:center}'+
  '#ran-intro svg.rings{position:absolute;inset:0;width:100%;height:100%;overflow:visible}'+
  '#ran-intro svg.rings circle{fill:none;stroke:#eef2f0;stroke-dasharray:1000;stroke-dashoffset:1000;animation:riDraw 1.2s cubic-bezier(.6,0,.2,1) forwards}'+
  '#ran-intro .r1{stroke-width:1.6}#ran-intro .r2{stroke-width:.45;animation-delay:.2s!important}'+
  '#ran-intro .arc{fill:none;stroke:url(#riG);stroke-width:1.5;stroke-linecap:round;stroke-dasharray:1000;stroke-dashoffset:1000;animation:riDraw .75s cubic-bezier(.5,0,.3,1) 1.35s forwards}'+
  '#ran-intro .star{fill:#e284a8;transform-box:fill-box;transform-origin:center;opacity:0;animation:riStar .9s cubic-bezier(.2,.8,.2,1) 2s forwards}'+
  '#ran-intro .ihead{position:relative;width:27.5%;margin-top:7.5%;animation:riHead 1.2s cubic-bezier(.3,.7,.2,1) .35s both}'+
  '#ran-intro .iword{width:min(300px,70vw);margin-top:26px;animation:riWord 1s ease 2.2s both}'+
  '@keyframes riDraw{to{stroke-dashoffset:0}}'+
  '@keyframes riTw{0%,100%{opacity:0}50%{opacity:.9}}'+
  '@keyframes riHead{from{clip-path:inset(100% 0 0 0);transform:translateY(16px)}to{clip-path:inset(0 0 0 0);transform:none}}'+
  '@keyframes riStar{0%{opacity:0;transform:scale(.2) rotate(-45deg)}55%{opacity:1;transform:scale(1.6) rotate(8deg)}100%{opacity:1;transform:scale(1) rotate(0)}}'+
  '@keyframes riWord{from{clip-path:inset(0 100% 0 0);opacity:.3;transform:translateY(6px)}to{clip-path:inset(0 0 0 0);opacity:1;transform:none}}';
  document.head.appendChild(css);
  document.documentElement.classList.add('ri');
  var o=document.createElement('div'); o.id='ran-intro';
  var dots='';
  for(var i=0;i<46;i++){ dots+='<i style="left:'+(Math.random()*100).toFixed(1)+'%;top:'+(Math.random()*100).toFixed(1)+'%;animation-delay:'+(Math.random()*2.4).toFixed(2)+'s'+(Math.random()<.12?';background:#e284a8':'')+'"></i>'; }
  /* 星の位置・弧はアイコンと同じ（中心から半径36、200°から40°へ） */
  o.innerHTML='<div class="dots">'+dots+'</div><div class="disc"><svg class="rings" viewBox="0 0 100 100" aria-hidden="true">'+
    '<defs><linearGradient id="riG" x1="16" y1="62" x2="78" y2="27" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#e284a8" stop-opacity="0"/><stop offset=".55" stop-color="#e284a8" stop-opacity=".45"/><stop offset="1" stop-color="#e284a8"/></linearGradient></defs>'+
    '<circle class="r1" cx="50" cy="50" r="47.5" transform="rotate(-90 50 50)" pathLength="1000"/><circle class="r2" cx="50" cy="50" r="45.4" transform="rotate(-90 50 50)" pathLength="1000"/>'+
    '<path class="arc" pathLength="1000" d="M16.2 62.4 A36 36 0 0 1 77.6 26.9"/>'+
    '<path class="star" d="M77.6 20.9Q77.6 26.9 83.6 26.9Q77.6 26.9 77.6 32.9Q77.6 26.9 71.6 26.9Q77.6 26.9 77.6 20.9Z"/>'+
    '</svg><img class="ihead" src="assets/noct_head.png" alt=""></div>'+
    '<img class="iword" src="assets/noct_word.png" alt="NOCTÉLIE Guitar Ensemble">';
  function close(){ if(o.classList.contains('out'))return; o.classList.add('out'); setTimeout(function(){document.documentElement.classList.remove('ri')},350); setTimeout(function(){o.remove()},1000); }
  o.addEventListener('click',close);
  (document.body||document.documentElement).appendChild(o);
  setTimeout(close,3900);
})();
