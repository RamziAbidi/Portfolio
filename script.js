document.getElementById('yr').textContent=new Date().getFullYear();
document.querySelectorAll('[data-slider]').forEach(function(sl){
  var imgs=Array.prototype.slice.call(sl.querySelectorAll('img')),i=0,gone=false;
  var prev=sl.querySelector('.prev'),next=sl.querySelector('.next'),dots=sl.querySelector('.dots');
  function show(n){
    imgs=imgs.filter(function(im){return im.isConnected});
    if(!imgs.length){if(!gone){gone=true;sl.remove()}return}
    i=(n+imgs.length)%imgs.length;
    imgs.forEach(function(im,k){im.classList.toggle('on',k===i)});
    dots.innerHTML='';
    imgs.forEach(function(im,k){
      var d=document.createElement('button');
      d.type='button';d.className='dot'+(k===i?' on':'');d.setAttribute('aria-label','Photo '+(k+1));
      d.onclick=function(){show(k)};dots.appendChild(d);
    });
    prev.hidden=next.hidden=dots.hidden=imgs.length<2;
  }
  imgs.forEach(function(im){
    if(im.complete&&!im.naturalWidth){im.remove()}
    else im.addEventListener('error',function(){im.remove();show(i)});
  });
  prev.onclick=function(){show(i-1)};next.onclick=function(){show(i+1)};
  var x0=null;
  sl.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  sl.addEventListener('touchend',function(e){
    if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;
    if(Math.abs(dx)>40)show(dx<0?i+1:i-1);
  });
  show(0);
});
