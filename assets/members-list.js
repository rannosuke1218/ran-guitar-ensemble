(function(){
  var box=document.getElementById('member-list'); if(!box||!window.MEMBERS) return;
  window.MEMBERS.forEach(function(m,i){
    var a=document.createElement('a'); a.className='m-card'; a.href='member.html?m='+encodeURIComponent(m.id);
    var ph=document.createElement('div'); ph.className='m-photo';
    var img=document.createElement('img');
    if(m.photo){img.src=m.photo; img.className='photo'; img.alt=m.name; if(m.photoPos) img.style.objectPosition=m.photoPos;} else {img.src='assets/noct_head.png'; img.className='mark'; img.alt='';}
    ph.appendChild(img); a.appendChild(ph);
    var n=document.createElement('div'); n.className='m-name';
    if(m.name){n.textContent=m.name;} else {n.innerHTML='<span class="blank">メンバー'+(i+1)+'</span>';}
    var r=document.createElement('div'); r.className='m-role'; r.textContent=m.role||m.part||'　';
    a.appendChild(n); a.appendChild(r); box.appendChild(a);
  });
})();
