/* Hybrid flagship: native WebGL geometry and a seek-coalesced eight-scene story. */
(() => {
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = n => Math.max(0, Math.min(1, n));
  const cinema = document.querySelector('#cinema');
  const sticky = cinema.querySelector('.cinema-sticky');
  const film = document.querySelector('#trustFilm');
  const chapters = [...document.querySelectorAll('.cinema-chapter')];
  const buttons = [...document.querySelectorAll('.chapter-jump')];
  let targetTime = 0, scrollPending = false, previousChapter = -1, lastSeek = -1;
  function seekFilm() {
    if (reduced.matches || film.seeking || film.readyState < 2 || !Number.isFinite(film.duration)) return;
    if (!film.seekable.length || targetTime > film.seekable.end(film.seekable.length - 1)) return;
    if (Math.abs(film.currentTime - targetTime) > .08 && Math.abs(lastSeek-targetTime) > .04) { lastSeek=targetTime; film.currentTime = targetTime; }
  }
  function story() {
    scrollPending = false;
    if (reduced.matches) return;
    const p = clamp(-cinema.getBoundingClientRect().top / Math.max(1, cinema.offsetHeight - innerHeight));
    const chapter = Math.min(7, Math.floor(p * 8));
    chapters.forEach((el, i) => { el.classList.toggle('active', i === chapter); el.setAttribute('aria-hidden', String(i !== chapter)); });
    buttons.forEach((el, i) => { el.classList.toggle('active', i === chapter); if (i === chapter) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); });
    const scene = chapters[chapter].dataset.scene;
    if(chapter!==previousChapter){previousChapter=chapter;document.dispatchEvent(new Event('ghscl:chapter'));}
    sticky.dataset.scene = scene;
    document.querySelectorAll('[data-still]').forEach(el => el.classList.toggle('active', el.dataset.still === scene));
    document.querySelector('#cinemaProgress').style.height = `${p * 100}%`;
    if (Number.isFinite(film.duration)) { targetTime = p * Math.max(0, film.duration - .12); film.dataset.timelineSeconds=targetTime.toFixed(2); seekFilm(); }
  }
  function queueStory() { if (!scrollPending) { scrollPending = true; requestAnimationFrame(story); } }
  addEventListener('scroll', queueStory, { passive: true });
  addEventListener('resize', queueStory);
  film.addEventListener('loadedmetadata', story);
  film.addEventListener('canplay', () => { lastSeek=-1; story(); });
  film.addEventListener('progress', seekFilm);
  film.addEventListener('seeked', () => { film.dataset.currentSeconds=film.currentTime.toFixed(2); seekFilm(); });
  film.addEventListener('error', () => sticky.classList.add('film-unavailable'));
  buttons.forEach((el, i) => el.addEventListener('click', () => scrollTo({ top: scrollY + cinema.getBoundingClientRect().top + (i + .25) / 8 * (cinema.offsetHeight - innerHeight), behavior: reduced.matches ? 'instant' : 'smooth' })));
  reduced.addEventListener('change', () => { chapters.forEach(el => el.removeAttribute('aria-hidden')); queueStory(); });
  story();

  const canvas = document.querySelector('#webglHero');
  const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!gl) { canvas.classList.add('fallback'); return; }
  const vert = `attribute vec3 position; uniform float angle; uniform float aspect; uniform float mobile; varying vec3 normal; varying float depth; void main(){float c=cos(angle),s=sin(angle);vec3 q=vec3(c*position.x+s*position.z,position.y,-s*position.x+c*position.z);normal=normalize(q);q.yz=mat2(.98,-.2,.2,.98)*q.yz;depth=q.z;float z=3.4-q.z;vec2 centre=mix(vec2(.53,-.04),vec2(0.,-.44),mobile);gl_Position=vec4(q.x*2.5/aspect+centre.x*z,q.y*2.5+centre.y*z,(z-2.3)*.35,z);gl_PointSize=2.5;}`;
  const frag = `precision mediump float;uniform vec3 color;uniform float opacity;uniform float surface;varying vec3 normal;varying float depth;void main(){float light=.22+.78*max(0.,dot(normal,normalize(vec3(-.7,.6,1.))));float rim=pow(1.-abs(normal.z),3.);float fade=smoothstep(-1.2,.2,depth);gl_FragColor=vec4(color*(mix(1.,light,surface)+rim*.25),opacity*mix(fade,1.,surface));}`;
  function shader(type, source) { const s = gl.createShader(type); gl.shaderSource(s, source); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error('Shader unavailable'); return s; }
  let program;
  try { program = gl.createProgram(); gl.attachShader(program, shader(gl.VERTEX_SHADER, vert)); gl.attachShader(program, shader(gl.FRAGMENT_SHADER, frag)); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('WebGL link unavailable'); }
  catch { canvas.classList.add('fallback'); return; }
  gl.useProgram(program);
  const uniforms = Object.fromEntries(['angle','aspect','mobile','color','opacity','surface'].map(k => [k, gl.getUniformLocation(program, k)]));
  const pos = gl.getAttribLocation(program, 'position');
  const spherePoint = (lat, lon, r = 1) => { const a = lat * Math.PI / 180, b = lon * Math.PI / 180; return [r * Math.cos(a) * Math.sin(b), r * Math.sin(a), r * Math.cos(a) * Math.cos(b)]; };
  const surface = [], grid = [], arcs = [], nodes = [], coasts = [];
  // Coarse authored outlines: a labelled schematic, not a cartographic dataset.
  const continents = [
    [[36,-10],[44,-9],[49,-5],[58,-7],[64,10],[70,25],[70,70],[60,130],[55,160],[48,145],[42,140],[35,130],[24,122],[10,108],[1,103],[8,98],[22,90],[8,78],[22,70],[25,56],[12,45],[30,34],[36,26],[40,15],[36,-10]],
    [[36,-6],[32,12],[31,32],[15,43],[10,51],[-12,40],[-25,35],[-35,18],[-25,13],[-10,12],[5,9],[5,-6],[15,-17],[28,-14],[36,-6]],
    [[70,-165],[70,-130],[60,-125],[50,-125],[32,-117],[22,-107],[15,-92],[20,-87],[28,-82],[45,-65],[53,-55],[63,-65],[70,-95],[70,-165]],
    [[12,-72],[8,-50],[-5,-35],[-23,-42],[-40,-63],[-55,-68],[-35,-73],[-5,-80],[12,-72]],
    [[-11,132],[-14,145],[-27,153],[-39,146],[-35,116],[-22,113],[-11,132]]
  ];
  continents.forEach(polygon=>polygon.slice(1).forEach((b,i)=>{const a=polygon[i];for(let n=0;n<12;n++)coasts.push(...spherePoint(a[0]+(b[0]-a[0])*n/12,a[1]+(b[1]-a[1])*n/12,1.015),...spherePoint(a[0]+(b[0]-a[0])*(n+1)/12,a[1]+(b[1]-a[1])*(n+1)/12,1.015));}));
  for (let lat = -90; lat < 90; lat += 6) for (let lon = -180; lon < 180; lon += 6) {
    const a = spherePoint(lat, lon), b = spherePoint(lat + 6, lon), c = spherePoint(lat, lon + 6), d = spherePoint(lat + 6, lon + 6);
    surface.push(...a,...b,...c,...c,...b,...d);
  }
  for (let lat = -75; lat <= 75; lat += 15) for (let lon = -180; lon < 180; lon += 3) grid.push(...spherePoint(lat,lon,1.008),...spherePoint(lat,lon+3,1.008));
  for (let lon = -180; lon < 180; lon += 15) for (let lat = -90; lat < 90; lat += 3) grid.push(...spherePoint(lat,lon,1.008),...spherePoint(lat+3,lon,1.008));
  // Illustrative endpoints. Curves are schematic, not an asserted shipping route.
  const locations = [[22.3,114.2],[31.2,121.5],[25.2,55.3],[24.5,54.4],[21.5,39.2],[3.1,101.7]];
  locations.forEach(p => nodes.push(...spherePoint(...p,1.04)));
  [[0,2],[1,3],[0,4],[0,5]].forEach(([from,to]) => {
    const a=spherePoint(...locations[from]),b=spherePoint(...locations[to]);
    const curve=t=>{const q=a.map((v,i)=>v*(1-t)+b[i]*t),len=Math.hypot(...q),radius=1.03+Math.sin(t*Math.PI)*.32;return q.map(v=>v/len*radius);};
    for(let i=0;i<80;i++)arcs.push(...curve(i/80),...curve((i+1)/80));
  });
  // Orbit frames extend the globe into a 3D trust-network object.
  for(let ring=0;ring<3;ring++)for(let i=0;i<180;i++){const point=n=>{const a=n/180*Math.PI*2,r=1.25+ring*.13;return [Math.cos(a)*r,Math.sin(a)*r*Math.sin(ring*.5+.15),Math.sin(a)*r*Math.cos(ring*.5+.15)];};grid.push(...point(i),...point(i+1));}
  function mesh(data, mode, color, opacity, solid=0) { const buffer=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buffer); gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW); return {buffer,count:data.length/3,mode,color,opacity,solid}; }
  const meshes=[mesh(surface,gl.TRIANGLES,[.12,.14,.18],1,1),mesh(grid,gl.LINES,[.65,.67,.72],.23),mesh(coasts,gl.LINES,[.8,.8,.78],.8),mesh(arcs,gl.LINES,[.82,.69,.44],.95),mesh(nodes,gl.POINTS,[1,.88,.64],1)];
  let visible=true, alive=true, rotation=0, pointer=0, last=0;
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;}).observe(canvas);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();alive=false;canvas.classList.add('fallback');});
  canvas.addEventListener('webglcontextrestored',()=>location.reload());
  addEventListener('pointermove',event=>{pointer=(event.clientX/innerWidth-.5)*.16;},{passive:true});
  function draw(time) {
    if (!alive) return;
    requestAnimationFrame(draw);
    if (document.hidden || !visible || reduced.matches || time-last<32) return;
    last=time;rotation+=.00045;
    const d=Math.min(devicePixelRatio||1,1.5),w=Math.round(canvas.clientWidth*d),h=Math.round(canvas.clientHeight*d);
    if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;gl.viewport(0,0,w,h);}
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(uniforms.angle,-1.3+rotation+pointer);gl.uniform1f(uniforms.aspect,w/h);gl.uniform1f(uniforms.mobile,innerWidth<760?1:0);
    gl.enableVertexAttribArray(pos);
    meshes.forEach(m=>{gl.bindBuffer(gl.ARRAY_BUFFER,m.buffer);gl.vertexAttribPointer(pos,3,gl.FLOAT,false,0,0);gl.uniform3fv(uniforms.color,m.color);gl.uniform1f(uniforms.opacity,m.opacity);gl.uniform1f(uniforms.surface,m.solid);gl.drawArrays(m.mode,0,m.count);});
    canvas.dataset.renderer='webgl';
  }
  requestAnimationFrame(draw);
})();
