/* Original, dependency-free WebGL artifact renderer.
   No tracking, CDN, external fonts or remote rendering. */
(() => {
  'use strict';
  const scene = document.querySelector('#tarot-scene');
  const canvas = document.querySelector('#tarot-canvas');
  const art = document.querySelector('#tarot-texture');
  const control = document.querySelector('#motion-control');
  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
  if (!scene || !canvas || !art || !control) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let gl;
  try { gl = canvas.getContext('webgl', {alpha:true, antialias:true, depth:true, premultipliedAlpha:false}); } catch (_) {}
  if (!gl) return;
  const projection = 'vec4 project(vec3 p){float z=uCamera.z-p.z;return vec4((p.x-uCamera.x)*uFocal/uAspect,(p.y-uCamera.y)*uFocal,1.004008*z-0.2004008,z);}';
  const meshVS = [
    'attribute vec3 aPos,aNormal;attribute vec2 aUV;uniform vec3 uCamera,uRotation;uniform float uAspect,uFocal,uLift;',
    'varying vec2 vUV;varying vec3 vNormal,vWorld;',
    projection,
    'vec3 rotate(vec3 p){float c=cos(uRotation.x),s=sin(uRotation.x);p=vec3(p.x,c*p.y-s*p.z,s*p.y+c*p.z);c=cos(uRotation.y);s=sin(uRotation.y);p=vec3(c*p.x+s*p.z,p.y,-s*p.x+c*p.z);c=cos(uRotation.z);s=sin(uRotation.z);return vec3(c*p.x-s*p.y,s*p.x+c*p.y,p.z);}',
    'void main(){vec3 p=rotate(aPos)+vec3(0.0,uLift,0.0);vUV=aUV;vNormal=rotate(aNormal);vWorld=p;gl_Position=project(p);}'
  ].join('\n');
  const meshFS = [
    'precision mediump float;uniform sampler2D uTexture;uniform float uMetal;uniform vec3 uCamera;varying vec2 vUV;varying vec3 vNormal,vWorld;',
    'void main(){vec3 n=normalize(vNormal);vec3 l=normalize(vec3(-0.55,0.8,1.1));vec3 v=normalize(uCamera-vWorld);vec3 h=normalize(l+v);float diffuse=max(dot(n,l),0.0);float fresnel=pow(1.0-max(dot(n,v),0.0),3.0);float spec=pow(max(dot(n,h),0.0),65.0);',
    'vec4 tex=texture2D(uTexture,vUV);if(uMetal<0.5&&tex.a<0.08)discard;vec3 base=mix(tex.rgb,vec3(0.63,0.50,0.27),uMetal);vec3 color=base*(0.78+0.25*diffuse)+vec3(0.76,0.84,1.0)*(spec*mix(0.19,0.7,uMetal)+fresnel*mix(0.035,0.25,uMetal));gl_FragColor=vec4(color,mix(tex.a,1.0,uMetal));}'
  ].join('\n');
  const particleVS = [
    'attribute vec4 aParticle;attribute vec2 aStyle;uniform vec3 uCamera;uniform float uAspect,uFocal,uTime,uDpr;',
    'varying float vAlpha,vHue,vKind;',
    projection,
    'void main(){vec3 p=aParticle.xyz;float seed=aParticle.w;float kind=aStyle.y;',
    'float t=uTime*(kind>0.5?0.065:0.024);float c=cos(t),s=sin(t);p=vec3(c*p.x-s*p.z,p.y,s*p.x+c*p.z);p.y+=sin(uTime*0.18+seed*6.283)*0.10;',
    'vec4 clip=project(p);gl_Position=clip;float dist=max(clip.w,0.4);gl_PointSize=clamp(aStyle.x*uDpr*7.5/dist,0.65*uDpr,11.0*uDpr);',
    'vAlpha=(0.34+0.66*pow(0.5+0.5*sin(seed*30.0+uTime*0.55),2.0))*smoothstep(0.3,1.0,dist)*mix(0.46,0.78,kind);vHue=seed;vKind=kind;}'
  ].join('\n');
  const particleFS = [
    'precision mediump float;varying float vAlpha,vHue,vKind;',
    'void main(){vec2 q=gl_PointCoord*2.0-1.0;float r=dot(q,q);if(r>1.0)discard;float core=exp(-r*13.0);float glow=exp(-r*3.7)*(1.0-smoothstep(0.6,1.0,r));',
    'vec3 cool=mix(vec3(0.38,0.51,0.82),vec3(0.89,0.93,1.0),smoothstep(0.1,0.8,vHue));vec3 color=mix(cool,vec3(0.97,0.84,0.59),step(0.92,vHue)*0.68);float alpha=(core*0.76+glow*0.29)*vAlpha;gl_FragColor=vec4(color,alpha);}'
  ].join('\n');
  function program(vs,fs) {
    const p=gl.createProgram();
    for(const [type,source] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
      const sh=gl.createShader(type);gl.shaderSource(sh,source);gl.compileShader(sh);
      if(!gl.getShaderParameter(sh,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(sh));
      gl.attachShader(p,sh);gl.deleteShader(sh);
    }
    gl.linkProgram(p);
    if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(p));
    return p;
  }
  function uniform(p,n){return gl.getUniformLocation(p,n);}
  function bind(p,n,size,stride,offset){const loc=gl.getAttribLocation(p,n);if(loc<0)return;gl.enableVertexAttribArray(loc);gl.vertexAttribPointer(loc,size,gl.FLOAT,false,stride,offset);}
  function buffer(data){const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);return b;}
  function texture(image){
    const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);
    gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);
    return t;
  }
  // New ornamental reverse, not represented as the artist's original work.
  function reverse(){
    const c=document.createElement('canvas');c.width=512;c.height=1000;const x=c.getContext('2d');
    const g=x.createRadialGradient(256,470,50,256,500,580);g.addColorStop(0,'#303d61');g.addColorStop(.57,'#152038');g.addColorStop(1,'#0b1222');x.fillStyle=g;x.fillRect(0,0,512,1000);
    x.strokeStyle='#a7b8d4';x.lineWidth=2;x.strokeRect(22,22,468,956);x.strokeStyle='#6b7f9d';x.lineWidth=1;x.strokeRect(35,35,442,930);
    x.translate(256,500);
    const circle=(r)=>{x.beginPath();x.arc(0,0,r,0,Math.PI*2);x.stroke();};
    x.strokeStyle='#c0cee2';circle(173);circle(153);x.setLineDash([2,8]);circle(188);x.setLineDash([]);
    for(let i=0;i<24;i++){const a=i*Math.PI/12;x.beginPath();x.moveTo(Math.cos(a)*143,Math.sin(a)*143);x.lineTo(Math.cos(a)*173,Math.sin(a)*173);x.stroke();}
    x.beginPath();x.moveTo(0,-205);x.lineTo(29,-33);x.lineTo(157,0);x.lineTo(29,33);x.lineTo(0,205);x.lineTo(-29,33);x.lineTo(-157,0);x.lineTo(-29,-33);x.closePath();x.stroke();
    x.beginPath();x.moveTo(0,-112);x.lineTo(112,0);x.lineTo(0,112);x.lineTo(-112,0);x.closePath();x.stroke();circle(32);circle(11);
    x.beginPath();x.moveTo(0,-420);x.lineTo(0,-240);x.moveTo(0,240);x.lineTo(0,420);x.stroke();
    x.fillStyle='#c9d3e8';for(const y of [-420,-240,240,420]){x.beginPath();x.arc(0,y,3,0,Math.PI*2);x.fill();}
    return c;
  }
  // Rounded front/back and chamfered metal edge: a physical mesh, not CSS planes.
  function makeCard(){
    const w=1.62,h=w*1476/758,depth=.065,bevel=.018;
    function outline(inset,z){
      const a=w/2-inset,b=h/2-inset,r=.065-inset/2,out=[];
      for(let q=0;q<4;q++){
        const sx=q===0||q===3?1:-1,sy=q<2?1:-1;
        for(let k=0;k<=6;k++){
          const t=q*Math.PI/2+k*Math.PI/12;
          out.push([sx*(a-r)+r*Math.cos(t),sy*(b-r)+r*Math.sin(t),z]);
        }
      }return out;
    }
    const front=outline(bevel,depth/2),back=outline(bevel,-depth/2),outerF=outline(0,depth/2-bevel),outerB=outline(0,-depth/2+bevel);
    const data=[];
    function vertex(p,n,flip=false){data.push(...p,...n,(flip?-p[0]:p[0])/w+.5,p[1]/h+.5);}
    const n=front.length;
    for(let i=0;i<n;i++){const j=(i+1)%n;vertex([0,0,depth/2],[0,0,1]);vertex(front[i],[0,0,1]);vertex(front[j],[0,0,1]);}
    const frontCount=data.length/8;
    for(let i=0;i<n;i++){const j=(i+1)%n;vertex([0,0,-depth/2],[0,0,-1],true);vertex(back[j],[0,0,-1],true);vertex(back[i],[0,0,-1],true);}
    const backCount=data.length/8-frontCount;
    function ring(a,b,nz){for(let i=0;i<n;i++){const j=(i+1)%n,dx=a[j][0]-a[i][0],dy=a[j][1]-a[i][1],len=Math.hypot(dx,dy)||1;const normal=[dy/len,-dx/len,nz];vertex(a[i],normal);vertex(b[i],normal);vertex(b[j],normal);vertex(a[i],normal);vertex(b[j],normal);vertex(a[j],normal);}}
    ring(front,outerF,.8);ring(outerF,outerB,0);ring(outerB,back,-.8);
    return {buffer:buffer(data),frontCount,backCount,edgeCount:data.length/8-frontCount-backCount};
  }
  function makeParticles(){
    let seed=7341;const rand=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
    const data=[],mobile=matchMedia('(max-width:760px)').matches;
    const count=mobile?650:1450;
    for(let i=0;i<count;i++){const k=rand(),z=rand()*16-12;data.push((rand()-.5)*16,(rand()-.5)*11,z,k,0.6+Math.pow(rand(),3)*2.5,0);}
    // Two loosely braided 3D dust streams, visible as the camera traverses depth.
    for(let j=0;j<2;j++){const count=mobile?210:430;for(let i=0;i<count;i++){
      const t=i/count*Math.PI*2,rad=2.65+(rand()-.5)*.23,tilt=j?-.67:.67;
      const x=Math.cos(t)*rad,y=Math.sin(t)*rad;
      data.push(x,y*Math.cos(tilt)+(rand()-.5)*.11,y*Math.sin(tilt)+(rand()-.5)*.28,rand(),.65+rand()*1.55,1);
    }}
    return {buffer:buffer(data),count:data.length/6};
  }
  let initialized=false,lost=false,paused=false,visible=true,raf=0,last=0,time=0,scroll=0,dpr=1,px=0,py=0,targetX=0,targetY=0,inspect=false,inspection=0,mesh,particles,mp,pp,frontTex,backTex;
  function resize(){
    const rect=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,matchMedia('(max-width:760px)').matches?1.5:2);
    const w=Math.max(1,Math.round(rect.width*dpr)),h=Math.max(1,Math.round(rect.height*dpr));
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
  }
  function view(p,camera,focal){gl.uniform3fv(uniform(p,'uCamera'),camera);gl.uniform1f(uniform(p,'uAspect'),canvas.width/canvas.height);gl.uniform1f(uniform(p,'uFocal'),focal);}
  function render(){
    const motion=reduced.matches;
    const reveal=motion?1:Math.min(time/3.8,1);
    const ease=1-Math.pow(1-reveal,3);
    const mobile=matchMedia('(max-width:760px)').matches;
    const camera=[(mobile?0:-.26)+px*.24,py*.13,11.8-4.3*ease-scroll*.85];
    const focal=mobile?2.26:2.48;
    const orbitAngle=motion?-.17:(1-ease)*1.35-.17+Math.max(0,time-3.8)*(Math.PI*2/26);
    const angle=orbitAngle-Math.atan2(Math.sin(orbitAngle+.10),Math.cos(orbitAngle+.10))*inspection;
    const lift=motion?0:Math.sin(time*.63)*.095;
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);gl.depthMask(true);gl.disable(gl.BLEND);
    gl.useProgram(mp);view(mp,camera,focal);gl.uniform3f(uniform(mp,'uRotation'),-.08+py*.10,angle+px*.13*(1-inspection),-.105*(1-inspection));gl.uniform1f(uniform(mp,'uLift'),lift);gl.bindBuffer(gl.ARRAY_BUFFER,mesh.buffer);
    bind(mp,'aPos',3,32,0);bind(mp,'aNormal',3,32,12);bind(mp,'aUV',2,32,24);
    gl.activeTexture(gl.TEXTURE0);gl.uniform1i(uniform(mp,'uTexture'),0);gl.uniform1f(uniform(mp,'uMetal'),0);
    gl.bindTexture(gl.TEXTURE_2D,frontTex);gl.drawArrays(gl.TRIANGLES,0,mesh.frontCount);
    gl.bindTexture(gl.TEXTURE_2D,backTex);gl.drawArrays(gl.TRIANGLES,mesh.frontCount,mesh.backCount);
    gl.uniform1f(uniform(mp,'uMetal'),1);gl.drawArrays(gl.TRIANGLES,mesh.frontCount+mesh.backCount,mesh.edgeCount);
    // Disable old vertex arrays before changing buffer layouts.
    for(const n of ['aPos','aNormal','aUV']){const loc=gl.getAttribLocation(mp,n);if(loc>=0)gl.disableVertexAttribArray(loc);}
    gl.useProgram(pp);view(pp,camera,focal);gl.uniform1f(uniform(pp,'uTime'),motion?0:time);gl.uniform1f(uniform(pp,'uDpr'),dpr);
    gl.bindBuffer(gl.ARRAY_BUFFER,particles.buffer);bind(pp,'aParticle',4,24,0);bind(pp,'aStyle',2,24,16);
    gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
    gl.drawArrays(gl.POINTS,0,particles.count);gl.depthMask(true);gl.disable(gl.BLEND);
    for(const n of ['aParticle','aStyle']){const loc=gl.getAttribLocation(pp,n);if(loc>=0)gl.disableVertexAttribArray(loc);}
  }
  function tick(now){
    raf=0;if(!initialized||lost||document.hidden||!visible)return;
    const dt=last?Math.min((now-last)/1000,.05):0;last=now;
    if(!paused&&!reduced.matches){time+=dt;px+=(targetX-px)*.045;py+=(targetY-py)*.045;inspection+=((inspect?1:0)-inspection)*.09;}
    render();if(!paused&&!reduced.matches)raf=requestAnimationFrame(tick);
  }
  function wake(){if(!initialized||lost||raf||document.hidden||!visible)return;last=0;raf=requestAnimationFrame(tick);}
  function stop(){if(raf)cancelAnimationFrame(raf);raf=0;last=0;}
  function updateScroll(){scroll=reduced.matches?0:Math.max(0,Math.min(1,window.scrollY/Math.max(scene.clientHeight,1)));wake();}
  function onResize(){if(!initialized||lost)return;resize();wake();}
  function start(){
    try{
      if(!art.complete||!art.naturalWidth)return;
      mp=program(meshVS,meshFS);pp=program(particleVS,particleFS);mesh=makeCard();particles=makeParticles();
      frontTex=texture(art);backTex=texture(reverse());
      initialized=true;resize();updateScroll();render();scene.classList.add('is-live');
      control.hidden=reduced.matches;wake();
    }catch(error){initialized=false;scene.classList.remove('is-live');control.hidden=true;console.warn('Static artwork fallback:',error);}
  }
  control.addEventListener('click',()=>{paused=!paused;control.setAttribute('aria-pressed',String(paused));control.textContent=paused?'Resume motion':'Pause motion';if(paused)stop();else wake();});
  scene.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const r=scene.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=.5-(e.clientY-r.top)/r.height;});
  scene.addEventListener('pointerleave',()=>{targetX=targetY=0;});
  const hotspot=scene.querySelector('.inspect-card');
  if(hotspot){hotspot.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')inspect=true;});hotspot.addEventListener('pointerleave',()=>{inspect=false;});hotspot.addEventListener('focus',()=>{inspect=true;});hotspot.addEventListener('blur',()=>{inspect=false;});}
  window.addEventListener('scroll',updateScroll,{passive:true});
  window.addEventListener('resize',onResize,{passive:true});
  if('ResizeObserver'in window)new ResizeObserver(onResize).observe(scene);
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)wake();else stop();},{threshold:.02}).observe(scene);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else wake();});
  reduced.addEventListener?.('change',()=>{control.hidden=reduced.matches;wake();});
  canvas.addEventListener('webglcontextlost',()=>{lost=true;stop();scene.classList.remove('is-live');control.hidden=true;});
  if(art.complete)start();else art.addEventListener('load',start,{once:true});
})();
