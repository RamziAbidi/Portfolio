(function(){
  document.getElementById('yr').textContent=new Date().getFullYear();
  var svg=document.getElementById('arm');
  var $=function(i){return document.getElementById(i)};
  var bx=200,by=235,L1=115,L2=90;
  var tx=290,ty=110;
  function draw(x,y){
    var dx=x-bx,dy=y-by,d=Math.hypot(dx,dy);
    d=Math.min(Math.max(d,Math.abs(L1-L2)+1),L1+L2-1);
    var a=Math.atan2(dy,dx);
    var c=(L1*L1+d*d-L2*L2)/(2*L1*d);
    var s=a+Math.acos(Math.max(-1,Math.min(1,c)));
    var ex=bx+L1*Math.cos(s),ey=by+L1*Math.sin(s);
    var hx=bx+d*Math.cos(a),hy=by+d*Math.sin(a);
    var ang=Math.atan2(hy-ey,hx-ex);
    var fx=ex+L2*Math.cos(ang),fy=ey+L2*Math.sin(ang);
    set('l1',bx,by,ex,ey);set('l2',ex,ey,fx,fy);
    pos('j0',bx,by);pos('j1',ex,ey);pos('tip',fx,fy);
  }
  function set(i,a,b,c,d){var e=$(i);e.setAttribute('x1',a);e.setAttribute('y1',b);e.setAttribute('x2',c);e.setAttribute('y2',d)}
  function pos(i,x,y){var e=$(i);e.setAttribute('cx',x);e.setAttribute('cy',y)}
  function move(cx,cy){
    var r=svg.getBoundingClientRect();
    draw((cx-r.left)/r.width*400,(cy-r.top)/r.height*320);
  }
  draw(tx,ty);
  window.addEventListener('pointermove',function(e){move(e.clientX,e.clientY)});
})();
