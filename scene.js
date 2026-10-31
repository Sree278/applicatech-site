/* Aplica's original, dependency-free WebGL framework study.
   Conceptual geometry only; no customer architecture or product UI is implied. */
(()=>{
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),low=(navigator.deviceMemory&&navigator.deviceMemory<=4)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4);let ambientPaused=reduced.matches;const engines=[];
 const themes={finance:{rgb:[.45,.66,1],index:0},operations:{rgb:[.37,.77,.82],index:1},rental:{rgb:[.92,.68,.45],index:2},existing:{rgb:[.69,.64,.96],index:3}};
 function engine(canvas,isHero){
  const gl=canvas.getContext('webgl',{alpha:true,antialias:!low,powerPreference:'low-power'});if(!gl){canvas.parentElement.classList.add('no-webgl');if(isHero)document.body.classList.add('no-webgl');return}
  const vs=`attribute vec3 a_pos;attribute vec4 a_color;uniform float u_aspect;uniform float u_dpr;varying vec4 v_color;void main(){float depth=8.4-a_pos.z;gl_Position=vec4(a_pos.x*1.9/u_aspect,a_pos.y*1.9,0.,depth);gl_PointSize=clamp(17./depth,1.5,4.)*u_dpr;v_color=a_color;}`;
  const fs=`precision mediump float;varying vec4 v_color;uniform bool u_point;void main(){if(u_point){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(v_color.rgb,v_color.a*smoothstep(.5,.15,d));}else gl_FragColor=v_color;}`;
  function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader compilation failed');return s}
  let program;try{program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error('Shader link failed')}catch(e){canvas.parentElement.classList.add('no-webgl');if(isHero)document.body.classList.add('no-webgl');return}
  gl.useProgram(program);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);const pos=gl.getAttribLocation(program,'a_pos'),color=gl.getAttribLocation(program,'a_color');gl.enableVertexAttribArray(pos);gl.enableVertexAttribArray(color);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,28,0);gl.vertexAttribPointer(color,4,gl.FLOAT,false,28,12);const aspect=gl.getUniformLocation(program,'u_aspect'),dpr=gl.getUniformLocation(program,'u_dpr'),point=gl.getUniformLocation(program,'u_point');
  let width=0,height=0,raf=0,visible=false,last=0,tick=0,scenario='finance',blend=0,targetBlend=0,rxMouse=0,ryMouse=0,px=0,py=0;
  const corners=Array.from({length:8},(_,i)=>[(i&1)?1:-1,(i&2)?1:-1,(i&4)?1:-1]),edges=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]],faces=[[0,1,3,2],[4,6,7,5],[0,4,5,1],[2,3,7,6]];
  const current=[...themes.finance.rgb];
  function rot([x,y,z],a,b,c){let co=Math.cos(a),si=Math.sin(a);[y,z]=[y*co-z*si,y*si+z*co];co=Math.cos(b);si=Math.sin(b);[x,z]=[x*co+z*si,-x*si+z*co];co=Math.cos(c);si=Math.sin(c);return[x*co-y*si,x*si+y*co,z]}
  function resize(){width=canvas.clientWidth;height=canvas.clientHeight;const pixelRatio=Math.min(devicePixelRatio||1,low?1.15:width<650?1.35:1.6);canvas.width=Math.max(1,Math.round(width*pixelRatio));canvas.height=Math.max(1,Math.round(height*pixelRatio));gl.viewport(0,0,canvas.width,canvas.height);gl.uniform1f(aspect,width/Math.max(1,height));gl.uniform1f(dpr,pixelRatio)}
  function draw(mode,data){gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.DYNAMIC_DRAW);gl.uniform1i(point,mode===gl.POINTS?1:0);gl.drawArrays(mode,0,data.length/7)}
  function request(){if(visible&&!raf&&!document.hidden)raf=requestAnimationFrame(render)}
  function render(now){raf=0;if(!visible||document.hidden)return;const budget=low?50:33;if(!ambientPaused&&now-last<budget){request();return}const delta=last?Math.min(60,now-last):16;last=now;if(!ambientPaused)tick+=delta*.00012;
   const hero=document.querySelector('.opening'),rect=hero?.getBoundingClientRect(),merge=isHero?(reduced.matches||innerWidth<=640?.38:Math.max(0,Math.min(1,-rect.top/Math.max(1,hero.offsetHeight-innerHeight)))):1;
   const theme=themes[scenario];current.forEach((v,i)=>current[i]+=(theme.rgb[i]-v)*.09);blend+=(targetBlend-blend)*.08;rxMouse+=(py-rxMouse)*.06;ryMouse+=(px-ryMouse)*.06;
   const turn=(ambientPaused?0:tick*.14),rotation=[.31+rxMouse*.1,-.5+turn+merge*.4+ryMouse*.14,-.15+merge*.15],mobile=isHero&&innerWidth<=640,n=low||mobile?9:13;
   function project(v){const q=rot(v,...rotation);const scale=isHero?1.05:(innerWidth<=640?1.05:1.3);return[q[0]*scale+(isHero?(mobile?.5:1.75):0),q[1]*scale+(mobile?-.4:0),q[2]*scale]}
   function push(data,v,c){data.push(...project(v),...c)}
   const lines=[],dots=[],planes=[],centers=[];
   for(let j=0;j<n;j++){
    const t=j/(n-1),angle=t*Math.PI*2.2+blend*.6,spread=1-merge;
    const center=[Math.cos(angle)*1.9*spread+Math.sin(t*Math.PI*1.5+blend)*.65*merge,(t-.5)*3.8,Math.sin(angle)*1.4*spread];centers.push(center);
    const twist=(t-.5)*(.75+blend*.4)*merge+angle*.25*spread,depth=.14+Math.sin(t*Math.PI)*.09,wide=1.2+Math.sin(t*Math.PI)*.3;
    const verts=corners.map(v=>{const q=rot([v[0]*wide,v[1]*depth,v[2]*(.85+blend*.15)],0,twist,(t-.5)*.2);return q.map((x,k)=>x+center[k])});
    const selected=j%4===theme.index,edgeColor=selected?[...current,.85]:[.49,.65,.84,.32+Math.sin(t*Math.PI)*.2];
    edges.forEach(([a,b])=>{push(lines,verts[a],edgeColor);push(lines,verts[b],edgeColor)});
    if(selected||j===0||j===n-1)verts.forEach((v,k)=>{if(k%2===0)push(dots,v,[...current,.95])});
    faces.forEach((f,k)=>{const shade=.5+k*.11,alpha=selected?.16:.045;planes.push({z:f.reduce((sum,i)=>sum+project(verts[i])[2],0)/4,vertices:f.map(i=>verts[i]),color:[current[0]*shade,current[1]*shade,current[2]*shade,alpha]})});
   }
   // A continuous route links the tiers. Highlighting changes emphasis, not business claims.
   for(let j=0;j<n-1;j++){const a=[centers[j][0]-.95,centers[j][1],centers[j][2]+.9],b=[centers[j+1][0]-.95,centers[j+1][1],centers[j+1][2]+.9];push(lines,a,[.92,.7,.5,.8]);push(lines,b,[.92,.7,.5,.8]);if(j%3===0)push(dots,a,[1,.79,.59,1])}
   planes.sort((a,b)=>a.z-b.z);const tris=[];planes.forEach(f=>[0,1,2,0,2,3].forEach(i=>push(tris,f.vertices[i],f.color)));
   gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);draw(gl.TRIANGLES,tris);draw(gl.LINES,lines);draw(gl.POINTS,dots);
   const settling=Math.abs(blend-targetBlend)>.005||current.some((v,i)=>Math.abs(v-theme.rgb[i])>.005);
   if(!ambientPaused||settling)request();
  }
  const host=isHero?document.querySelector('.opening'):canvas.parentElement;
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible){last=0;request()}else if(raf){cancelAnimationFrame(raf);raf=0}},{threshold:0}).observe(host);else visible=true;
  addEventListener('pointermove',e=>{if(ambientPaused||e.pointerType!=='mouse'||!visible)return;const r=canvas.getBoundingClientRect();if(e.clientY>=r.top&&e.clientY<=r.bottom){px=(e.clientX-r.left)/r.width-.5;py=(e.clientY-r.top)/r.height-.5}},{passive:true});
  addEventListener('resize',()=>{resize();request()},{passive:true});addEventListener('scroll',()=>{if(isHero)request()},{passive:true});document.addEventListener('visibilitychange',()=>{last=0;if(!document.hidden)request()});
  addEventListener('aplica-scenario',e=>{if(!themes[e.detail.key])return;scenario=e.detail.key;targetBlend=themes[scenario].index/3;if(reduced.matches){blend=targetBlend;current.splice(0,3,...themes[scenario].rgb)}request()});
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();if(raf)cancelAnimationFrame(raf);canvas.parentElement.classList.add('no-webgl');if(isHero)document.body.classList.add('no-webgl')});
  engines.push({request,pause(){last=0;request()}});if('ResizeObserver'in window)new ResizeObserver(()=>{resize();request()}).observe(canvas);resize();request();
 }
 const hero=document.getElementById('system-scene'),explorer=document.getElementById('explorer-scene');if(hero)engine(hero,true);if(explorer)engine(explorer,false);
 window.AplicaScene={pause(value){ambientPaused=value||reduced.matches;engines.forEach(e=>e.pause())},render(){engines.forEach(e=>e.request())}};
 reduced.addEventListener('change',()=>window.AplicaScene.pause(reduced.matches));
})();