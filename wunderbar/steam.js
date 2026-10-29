/* Café wunderbar · Dampf über dem echten Foto (WebGL, läuft endlos ohne Video) */
window.Steam = function (canvas, alpha) {
  const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
  if (!gl) return null;
  const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fs = `precision highp float;uniform vec2 uRes;uniform float uT;uniform vec2 uCup;uniform float uW;uniform float uA;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){vec2 px=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y);vec2 q=(px-uCup)/uW;float up=-q.y;
if(up<-.05||up>1.8||abs(q.x)>1.){gl_FragColor=vec4(0.);return;}up=max(up,0.);
float sway=sin(up*2.2-uT*.5)*.05*up+(fbm(vec2(up*1.1,uT*.1))-.5)*.38*up;
float x=q.x-sway;float width=.11+.27*up;float col=exp(-pow(x/width,2.)*1.3);
vec2 sp=vec2(x*2.6,up*1.9-uT*.27);float warp=fbm(sp*1.4+vec2(0.,-uT*.09));
float d=fbm(sp+vec2(warp*1.3,warp*.6));
float r1=pow(1.-abs(d*2.-1.),7.);float d2=fbm(sp*1.7+vec2(3.1,-uT*.17)+warp);float r2=pow(1.-abs(d2*2.-1.),9.);
float wisps=r1*.9+r2*.6+smoothstep(.35,.7,d)*.14;
float fin=smoothstep(.05,.22,up),fout=1.-smoothstep(.7,1.5,up);
float a=clamp(col*wisps*fin*fout*uA,0.,1.);
gl_FragColor=vec4(vec3(1.,.99,.97)*a,a);}`;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
  gl.useProgram(pr);
  const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = k => gl.getUniformLocation(pr, k), uRes = U('uRes'), uT = U('uT'), uCup = U('uCup'), uW = U('uW'), uA = U('uA');
  return {
    draw(t, cx, cy, w) {
      const W = canvas.width, H = canvas.height; gl.viewport(0, 0, W, H); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, W, H); gl.uniform1f(uT, t); gl.uniform2f(uCup, cx, cy); gl.uniform1f(uW, w); gl.uniform1f(uA, alpha || 1);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
  };
};
