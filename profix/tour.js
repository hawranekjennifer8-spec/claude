/* Profix · 3D-Gebäude (Architekturmodell) mit Wisch-Shader und Rundgang
   three.js r134 (lokal), GSAP ScrollTrigger. Keine externen Assets. */
(function () {
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.getElementById('gl');
  if (!cv || !window.THREE) { document.documentElement.classList.add('nogl'); return; }
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: 'high-performance' }); }
  catch (e) { document.documentElement.classList.add('nogl'); return; }
  const MOB = () => innerWidth <= 960;
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, MOB() ? 1.25 : 1.75));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.5, 400);

  /* Umgebung für Spiegelungen (Glas, Edelstahl) */
  const pm = new THREE.PMREMGenerator(renderer);
  const es = new THREE.Scene();
  es.add(new THREE.Mesh(new THREE.BoxGeometry(60, 30, 60), new THREE.MeshBasicMaterial({ color: 0xcfe0ec, side: THREE.BackSide })));
  [[0, 14, 0, 30, 30, -Math.PI / 2, 0, 2.6], [-29, 6, 0, 18, 8, 0, Math.PI / 2, 1.6], [0, 6, -29, 24, 8, 0, 0, 1.3], [29, 4, 8, 10, 6, 0, -Math.PI / 2, 2.2]].forEach(([x, y, z, w, h, rx, ry, k]) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(k) }));
    m.position.set(x, y, z); m.rotation.set(rx, ry, 0); es.add(m);
  });
  scene.environment = pm.fromScene(es, 0.035).texture;

  scene.add(new THREE.HemisphereLight(0xffffff, 0x8fb4cf, 0.55));
  const sun = new THREE.DirectionalLight(0xfff4e6, 1.25);
  sun.castShadow = true;
  sun.shadow.mapSize.set(MOB() ? 1024 : 2048, MOB() ? 1024 : 2048);
  sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.03; sun.shadow.radius = 4;
  const sc = sun.shadow.camera; sc.left = -22; sc.right = 22; sc.top = 22; sc.bottom = -22; sc.near = 1; sc.far = 90;
  scene.add(sun, sun.target);

  /* Räume und ihr Schmutz-Zustand */
  const ROOMS = [
    { id: 'buero', x0: -8.2, x1: 8.2, T: [0.6, 6.0, 0], d: 38, e: 0.22, fy: 4.2 },
    { id: 'treppe', x0: 7.8, x1: 13.4, T: [9.6, 6.6, 0], d: 46, e: 0.3, fy: 0 },
    { id: 'glas', x0: -8.2, x1: 8.2, T: [0.6, 10.6, -0.4], d: 38, e: 0.42, fy: 8.4 },
    { id: 'halle', x0: -8.2, x1: 8.2, T: [0.6, 2.0, 0], d: 38, e: 0.15, fy: 0 },
    { id: 'winter', x0: -11, x1: 15, T: [2.4, 1.2, 5.6], d: 40, e: 0.36, fy: 0 }
  ];
  const U = ROOMS.map(() => ({ uWipe: { value: 100 }, uDirt: { value: 0 }, uGhost: { value: 0 } })); const ghostT = [0, 0, 0, 0, 0];
  const DUST = new THREE.Color(0.6, 0.57, 0.52), SNOW = new THREE.Color(0.97, 0.98, 1);

  function dirty(m, r, dustCol) {
    const u = U[r], dc = { value: dustCol || DUST };
    m.onBeforeCompile = sh => {
      sh.uniforms.uWipe = u.uWipe; sh.uniforms.uDirt = u.uDirt; sh.uniforms.uDC = dc; sh.uniforms.uGhost = u.uGhost;
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nvarying vec3 vWP;')
        .replace('#include <project_vertex>', '#include <project_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', `#include <common>
varying vec3 vWP;uniform float uWipe;uniform float uDirt;uniform vec3 uDC;uniform float uGhost;
float hh(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh(i),hh(i+vec2(1,0)),f.x),mix(hh(i+vec2(0,1)),hh(i+vec2(1,1)),f.x),f.y);}`)
        .replace('#include <color_fragment>', `#include <color_fragment>
float dz=smoothstep(uWipe-.22,uWipe+.22,vWP.x)*uDirt;
float gn=vn(vWP.xz*.9+vWP.y*.7)*.7+vn(vWP.xy*3.1+vWP.z*2.3)*.3;
vec3 dusty=mix(uDC*1.02,uDC*.8,gn);
float lum=dot(diffuseColor.rgb,vec3(.299,.587,.114));
diffuseColor.rgb=mix(diffuseColor.rgb,mix(vec3(lum)*.86,dusty,.7),dz*(.58+.22*gn));
diffuseColor.rgb=mix(diffuseColor.rgb,vec3(.96,.975,.99),uGhost*.62);`)
        .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
float gl=exp(-pow((vWP.x-uWipe)*4.2,2.))*uDirt;totalEmissiveRadiance+=vec3(.6,.82,1.)*gl*.85;`);
    };
    m.customProgramCacheKey = () => 'dirt' + (m.isMeshPhysicalMaterial ? 'p' : 's');
    return m;
  }
  const M = {}; // Material-Cache je Raum+Farbe
  function mat(r, hex, o = {}) {
    const k = r + '|' + hex + '|' + JSON.stringify(o);
    if (M[k]) return M[k];
    const m = o.glass
      ? new THREE.MeshPhysicalMaterial({ color: hex, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.34, clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 1.6, depthWrite: false })
      : new THREE.MeshStandardMaterial({ color: hex, roughness: o.rough ?? 0.82, metalness: o.metal ?? 0, envMapIntensity: o.env ?? 0.12, flatShading: !!o.flat });
    return (M[k] = dirty(m, r, o.snow ? SNOW : null));
  }
  const root = new THREE.Group(); scene.add(root);
  const EDGE = new THREE.LineBasicMaterial({ color: 0x0b1a26, transparent: true, opacity: 0.22 }), EDGEG = new THREE.LineBasicMaterial({ color: 0x2f86c4, transparent: true, opacity: 0.5 });
  function box(r, w, h, d, hex, x, y, z, o = {}) {
    const g = new THREE.BoxGeometry(w, h, d);
    const m = new THREE.Mesh(g, mat(r, hex, o));
    m.position.set(x, y, z); if (o.ry) m.rotation.y = o.ry; if (o.rz) m.rotation.z = o.rz; if (o.rx) m.rotation.x = o.rx;
    m.castShadow = o.cast !== false && !o.glass; m.receiveShadow = true; (o.parent || root).add(m);
    if (!o.noEdge && Math.max(w, h, d) > 0.15) { const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), o.glass ? EDGEG : EDGE); m.add(e); }
    return m;
  }
  function cyl(r, rt, rb, h, hex, x, y, z, o = {}) {
    const m = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, o.seg || 28), mat(r, hex, o));
    m.position.set(x, y, z); if (o.rz) m.rotation.z = o.rz; if (o.rx) m.rotation.x = o.rx;
    m.castShadow = true; m.receiveShadow = true; (o.parent || root).add(m); return m;
  }
  const WALL = 0xf6f9fb, FLOOR = 0xcfe3f2, PLINTH = 0x67bffd, INK = 0x0b1a26, BLUE = 0x67bffd, BLUE2 = 0x2f86c4, GREEN = 0x2bd35a, LEAF = 0x46b06a, TAUPE = 0x74655f, STEEL = 0xc8d3dc, WHITE = 0xfbfdff, GLASS = 0xbfe6ff, FRAME = 0x2d3e4c;
  const H = 4.2;

  /* Sockel des Modells */
  box(4, 32, 0.9, 22, PLINTH, 2.5, -0.7, 3, { cast: false, rough: 0.6 });

  /* ===== Erdgeschoss: Industriehalle (Raum 3) ===== */
  const R3 = 3;
  box(R3, 16.4, 0.3, 8.4, 0xe6ddd0, 0, -0.1, 0);
  box(R3, 16.4, H, 0.3, WALL, 0, H / 2, -4.05); box(R3, 0.3, H, 8.4, WALL, -8.05, H / 2, 0);
  for (let i = -6; i <= 6; i += 3) box(R3, 2.2, 0.03, 0.12, GREEN, i, 0.06, 2.6, { cast: false });
  // Maschine
  box(R3, 3.6, 1.7, 2, BLUE2, -4.6, 0.9, -1.8, { rough: 0.5 }); box(R3, 1.2, 0.9, 0.08, INK, -4.2, 1.2, -0.78, { rough: 0.3 });
  box(R3, 0.32, 0.32, 0.06, GREEN, -3.4, 1.25, -0.76, { rough: 0.3 });
  cyl(R3, 0.55, 0.55, 2.6, WHITE, -1.4, 1.3, -2.8, { rough: 0.35, metal: 0.1 }); cyl(R3, 0.55, 0.55, 2.6, WHITE, -0.1, 1.3, -2.8, { rough: 0.35, metal: 0.1 });
  cyl(R3, 0.6, 0.6, 0.15, STEEL, -1.4, 2.65, -2.8, { metal: 0.9, rough: 0.3 }); cyl(R3, 0.6, 0.6, 0.15, STEEL, -0.1, 2.65, -2.8, { metal: 0.9, rough: 0.3 });
  cyl(R3, 0.12, 0.12, 12, STEEL, 1.5, 3.5, -3.6, { rz: Math.PI / 2, metal: 0.9, rough: 0.3 }); cyl(R3, 0.09, 0.09, 12, BLUE, 1.5, 3.1, -3.6, { rz: Math.PI / 2, rough: 0.4 });
  // Regal mit Kartons
  for (const x of [3.2, 6.8]) for (const z of [-3.6, -2.4]) box(R3, 0.1, 3, 0.1, FRAME, x, 1.5, z);
  for (const y of [0.3, 1.3, 2.3]) {
    box(R3, 3.7, 0.08, 1.3, STEEL, 5, y, -3, { metal: 0.6, rough: 0.4 });
    for (let k = 0; k < 3; k++) box(R3, 0.9, 0.6, 0.9, 0xb9a48f, 3.8 + k * 1.2, y + 0.34, -3);
  }
  box(R3, 1.4, 0.18, 1.1, 0xc9b08f, 4.5, 0.1, 1); box(R3, 1, 0.8, 0.8, 0xb9a48f, 4.5, 0.6, 1);

  /* ===== 1. OG: Büro (Raum 0) ===== */
  const R0 = 0, y1 = H;
  box(R0, 16.4, 0.3, 8.4, FLOOR, 0, y1 - 0.15, 0);
  box(R0, 16.4, H, 0.3, WALL, 0, y1 + H / 2, -4.05); box(R0, 0.3, H, 8.4, WALL, -8.05, y1 + H / 2, 0);
  // Fensterband
  for (const x of [-5, 0, 5]) { box(R0, 3.6, 1.8, 0.06, GLASS, x, y1 + 2.4, -3.88, { glass: true }); box(R0, 3.8, 0.1, 0.12, FRAME, x, y1 + 1.45, -3.85); box(R0, 3.8, 0.1, 0.12, FRAME, x, y1 + 3.35, -3.85); }
  box(R0, 9, 0.02, 4.6, 0xd2e8f8, -1.5, y1 + 0.02, 0.2, { cast: false });
  function desk(x, z) {
    box(R0, 2.4, 0.08, 1.1, WHITE, x, y1 + 0.78, z, { rough: 0.5 });
    for (const dx of [-1.1, 1.1]) for (const dz of [-0.45, 0.45]) box(R0, 0.06, 0.76, 0.06, STEEL, x + dx, y1 + 0.39, z + dz, { metal: 0.8, rough: 0.35 });
    box(R0, 1, 0.6, 0.05, INK, x, y1 + 1.25, z - 0.3, { rough: 0.25 }); box(R0, 0.08, 0.36, 0.08, STEEL, x, y1 + 0.98, z - 0.3, { metal: 0.8 });
    box(R0, 0.7, 0.03, 0.24, 0xe9eff4, x, y1 + 0.84, z + 0.1);
    box(R0, 0.6, 0.08, 0.6, BLUE, x, y1 + 0.5, z + 0.95); box(R0, 0.6, 0.62, 0.08, BLUE, x, y1 + 0.85, z + 1.25); cyl(R0, 0.04, 0.04, 0.42, STEEL, x, y1 + 0.25, z + 0.95, { metal: 0.8 });
  }
  desk(-5, -1.6); desk(-1.6, -1.6); desk(-5, 1.6, 0);
  // Papierkorb, Pflanze
  cyl(R0, 0.2, 0.17, 0.45, BLUE2, -6.9, y1 + 0.23, -2.8, { rough: 0.5 });
  cyl(R0, 0.26, 0.2, 0.5, TAUPE, -7.1, y1 + 0.25, 3.2); const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), mat(R0, LEAF, { flat: true })); leaf.position.set(-7.1, y1 + 1.05, 3.2); leaf.castShadow = true; root.add(leaf);
  // Glastrennwand 1,80 m mit Maßlinie
  box(R0, 0.05, 1.8, 3.6, GLASS, 1.6, y1 + 0.9, 1.4, { glass: true }); box(R0, 0.09, 0.08, 3.7, FRAME, 1.6, y1 + 1.82, 1.4); box(R0, 0.09, 0.06, 3.7, FRAME, 1.6, y1 + 0.03, 1.4);
  box(R0, 0.03, 1.8, 0.03, BLUE2, 1.6, y1 + 0.9, 3.45, { cast: false }); box(R0, 0.25, 0.03, 0.03, BLUE2, 1.6, y1 + 1.8, 3.45, { cast: false, ry: Math.PI / 2 }); box(R0, 0.25, 0.03, 0.03, BLUE2, 1.6, y1 + 0.01, 3.45, { cast: false, ry: Math.PI / 2 });
  (function () {
    const c = document.createElement('canvas'); c.width = 256; c.height = 96; const g = c.getContext('2d');
    g.fillStyle = '#2f86c4'; g.beginPath(); g.roundRect ? g.roundRect(8, 14, 240, 68, 34) : g.rect(8, 14, 240, 68); g.fill();
    g.fillStyle = '#fff'; g.font = '800 44px "Plus Jakarta Sans", system-ui, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText('1,80 m', 128, 50);
    const t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding;
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: t, depthTest: false })); s.scale.set(1.1, 0.41, 1); s.position.set(1.6, y1 + 2.25, 3.45); s.renderOrder = 5; root.add(s);
  })();
  // Besprechung rechts
  box(R0, 2.6, 0.08, 1.4, WHITE, 5.2, y1 + 0.76, 1.2, { rough: 0.5 }); cyl(R0, 0.08, 0.3, 0.74, STEEL, 5.2, y1 + 0.37, 1.2, { metal: 0.8 });
  for (const dx of [-0.8, 0.8]) for (const dz of [-1.05, 1.05]) { box(R0, 0.52, 0.08, 0.52, GREEN, 5.2 + dx, y1 + 0.5, 1.2 + dz, { rough: 0.6 }); }

  /* ===== 2. OG: Glas (Raum 2) ===== */
  const R2 = 2, y2 = 2 * H;
  box(R2, 16.4, 0.3, 8.4, 0xd6f1e0, 0, y2 - 0.15, 0);
  box(R2, 0.3, H, 8.4, WALL, -8.05, y2 + H / 2, 0);
  // Glasfassade (Pfosten-Riegel)
  for (let i = 0; i <= 4; i++) box(R2, 0.14, H, 0.2, FRAME, -8 + i * 4, y2 + H / 2, -4.05);
  for (const yy of [0.05, H / 2, H - 0.05]) box(R2, 16.2, 0.12, 0.2, FRAME, 0, y2 + yy, -4.05);
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) box(R2, 3.86, H / 2 - 0.12, 0.05, GLASS, -6 + i * 4, y2 + H / 4 + j * H / 2, -4.05, { glass: true });
  // Glasdach-Reihe auf dem Dach (wie das Einsatzfoto)
  const y3 = 3 * H;
  box(R2, 16.4, 0.3, 8.4, 0xdfe7ed, 0, y3 - 0.15, 0);
  box(R2, 12.4, 0.35, 2.6, 0xd4dde4, -0.5, y3 + 0.17, 0);
  for (let i = 0; i < 6; i++) {
    const x = -6 + i * 2.2;
    for (const s of [-1, 1]) { const p = box(R2, 2.1, 0.04, 1.55, GLASS, x + 0.4, y3 + 0.85, s * 0.62, { glass: true }); p.rotation.x = s * 0.62; }
    box(R2, 0.08, 0.1, 2.6, STEEL, x - 0.65, y3 + 0.8, 0, { metal: 0.9, rough: 0.3 });
  }
  box(R2, 13.2, 0.1, 0.1, STEEL, -0.2, y3 + 1.32, 0, { metal: 0.9, rough: 0.3 });
  // Innen: Lounge
  box(R2, 3.4, 0.5, 1.2, BLUE, -3.5, y2 + 0.25, 1.6, { rough: 0.7 }); box(R2, 3.4, 0.6, 0.3, BLUE, -3.5, y2 + 0.7, 2.1, { rough: 0.7 });
  cyl(R2, 0.6, 0.6, 0.06, WHITE, -3.5, y2 + 0.42, -0.2); cyl(R2, 0.06, 0.06, 0.4, STEEL, -3.5, y2 + 0.2, -0.2, { metal: 0.8 });
  cyl(R2, 0.3, 0.24, 0.6, TAUPE, 4.8, y2 + 0.3, -2.6); const leaf2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.8, 1), mat(R2, LEAF, { flat: true })); leaf2.position.set(4.8, y2 + 1.3, -2.6); leaf2.castShadow = true; root.add(leaf2);
  box(R2, 2.2, 0.06, 1.2, WHITE, 3, y2 + 0.74, 1.4, { rough: 0.5 }); cyl(R2, 0.05, 0.05, 0.72, STEEL, 3, y2 + 0.37, 1.4, { metal: 0.8 });

  /* ===== Treppenhaus (Raum 1) ===== */
  const R1 = 1;
  box(R1, 5.4, 3 * H + 0.3, 0.3, WALL, 10.6, (3 * H) / 2, -4.05); 
  for (let f = 0; f < 3; f++) {
    const yb = f * H;
    box(R1, 5.4, 0.3, 2.6, FLOOR, 10.6, yb + H - 0.15, -2.8); // Podest oben
    for (let s = 0; s < 10; s++) { // Lauf 1: vorn, steigt nach hinten
      box(R1, 2.2, 0.21 * (s + 1), 0.38, 0xd5e4ef, 9.4, yb + 0.105 * (s + 1), 3.6 - s * 0.38 - 0.19);
    }
    for (let s = 0; s < 10; s++) { // Lauf 2 rechts zurück nach vorn
      box(R1, 2.2, 0.21, 0.38, 0xd5e4ef, 11.9, yb + 2.1 + 0.21 * s + 0.105, -1.5 + s * 0.38 + 0.19);
    }
    // Geländer
    box(R1, 0.06, 0.06, 4.2, BLUE2, 10.65, yb + 1.9, 1.5, { rx: -0.5, rough: 0.4 });
    for (let k = 0; k < 6; k++) box(R1, 0.04, 0.9, 0.04, STEEL, 10.65, yb + 0.7 + k * 0.3, 3.4 - k * 0.72, { metal: 0.8 });
    box(R1, 0.9, 1.6, 0.06, GLASS, 13.3, yb + 2.6, -2.8, { glass: true, ry: Math.PI / 2 });
  }

  /* ===== Draußen: Winterdienst (Raum 4) ===== */
  const R4 = 4;
  const ground = box(R4, 31, 0.1, 8.6, 0xffffff, 2.5, -0.2, 8.6, { cast: false });
  const path = box(R4, 26, 0.06, 2, 0x8c98a2, 2.5, -0.12, 7.2, { cast: false, snow: true, rough: 0.9 });
  box(R4, 26, 0.12, 0.22, 0xb7c3cc, 2.5, -0.1, 6.1, { cast: false }); box(R4, 26, 0.12, 0.22, 0xb7c3cc, 2.5, -0.1, 8.3, { cast: false });
  function tree(x, z, s) {
    cyl(R4, 0.12 * s, 0.16 * s, 0.9 * s, TAUPE, x, 0.3 * s, z);
    const c = new THREE.Mesh(new THREE.ConeGeometry(0.95 * s, 2.3 * s, 7), mat(R4, 0x2f7a57, { flat: true })); c.position.set(x, 1.8 * s, z); c.castShadow = true; root.add(c);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.5 * s, 0.9 * s, 7), mat(R4, 0xffffff, { flat: true })); cap.position.set(x, 2.55 * s, z); root.add(cap);
  }
  tree(-10, 10.5, 1.1); tree(-7.4, 11.6, 0.8); tree(14.6, 10.2, 1.2); tree(11.8, 11.8, 0.85);
  for (const x of [-9.5, 15.5]) { const p = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(R4, 0xffffff)); p.position.set(x, -0.15, 7.2); p.scale.y = 0.55; root.add(p); }
  // Laternen
  for (const x of [-3, 9]) { cyl(R4, 0.05, 0.07, 3, FRAME, x, 1.35, 8.8, { metal: 0.6 }); box(R4, 0.5, 0.18, 0.3, FRAME, x, 2.9, 8.8); }

  /* ===== 3D-Abzieher (fährt über die Wischkante) ===== */
  const sq = new THREE.Group();
  const steel = new THREE.MeshStandardMaterial({ color: 0xdfe6ea, metalness: 1, roughness: 0.22, envMapIntensity: 1.4 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x15191c, roughness: 0.6 });
  const grip = new THREE.MeshStandardMaterial({ color: GREEN, roughness: 0.45 }), grip2 = new THREE.MeshStandardMaterial({ color: 0x1d9e42, roughness: 0.5 });
  const bl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 1), rubber); bl.position.y = -0.09; sq.add(bl);
  const ch = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.2, 1.04), steel); ch.position.y = 0.08; sq.add(ch);
  const hd = new THREE.Group(); hd.position.set(-0.05, 0.2, 0); hd.rotation.z = 0.55; sq.add(hd);
  const h1 = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 2.6, 24), grip); h1.position.y = 1.3; hd.add(h1);
  const h2 = new THREE.Mesh(new THREE.CylinderGeometry(0.125, 0.125, 1.1, 24), grip2); h2.position.y = 1.7; hd.add(h2);
  const h3 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.35, 24), steel); h3.position.y = 0.1; hd.add(h3);
  sq.traverse(o => { if (o.isMesh) o.castShadow = true; });
  sq.visible = false; scene.add(sq);

  /* Lichtschleier an der Wischkante */
  const sheet = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xbfe6ff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
  sheet.rotation.y = Math.PI / 2; scene.add(sheet);

  /* Staub und Funkeln */
  const N = 1400, pos = new Float32Array(N * 3), aT = new Float32Array(N), aR = new Float32Array(N), aRm = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const r = i % 5, R = ROOMS[r], base = r === 0 ? H : r === 2 ? 2 * H : r === 3 ? 0 : r === 1 ? (i % 3) * H : 0;
    const x = R.x0 + Math.random() * (R.x1 - R.x0), y = base + 0.2 + Math.random() * (r === 4 ? 3 : 3.6), z = r === 4 ? 6 + Math.random() * 3 : -3.8 + Math.random() * 7.6;
    pos.set([x, y, z], i * 3); aT[i] = Math.random() < 0.72 ? 0 : 1; aR[i] = Math.random(); aRm[i] = r;
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute('position', new THREE.BufferAttribute(pos, 3)); pg.setAttribute('aT', new THREE.BufferAttribute(aT, 1)); pg.setAttribute('aR', new THREE.BufferAttribute(aR, 1)); pg.setAttribute('aRm', new THREE.BufferAttribute(aRm, 1));
  const PU = { uTime: { value: 0 }, uPx: { value: renderer.getPixelRatio() * innerHeight / 2 }, uW: { value: new Float32Array(5) }, uD: { value: new Float32Array(5) }, uS: { value: new Float32Array(5) } };
  const pmat = new THREE.ShaderMaterial({
    uniforms: PU, transparent: true, depthWrite: false,
    vertexShader: `attribute float aT,aR,aRm;uniform float uTime,uPx;uniform float uW[5],uD[5],uS[5];varying float vA,vT;
void main(){int r=int(aRm+.5);float w=uW[0],d=uD[0],s=uS[0];
if(r==1){w=uW[1];d=uD[1];s=uS[1];}else if(r==2){w=uW[2];d=uD[2];s=uS[2];}else if(r==3){w=uW[3];d=uD[3];s=uS[3];}else if(r==4){w=uW[4];d=uD[4];s=uS[4];}
vec3 p=position+vec3(sin(uTime*.25+aR*31.)*.18,sin(uTime*.33+aR*17.)*.14,cos(uTime*.21+aR*23.)*.18);
float dirty=step(w,p.x)*d;vT=aT;vec4 mv=modelViewMatrix*vec4(p,1.);
if(aT<.5){vA=dirty*.5;gl_PointSize=uPx*(.035+.05*aR)/-mv.z;}
else{float tw=pow(max(0.,sin(uTime*1.7+aR*60.)),10.);vA=(1.-step(w,p.x))*tw*s;gl_PointSize=uPx*(.16+.18*aR)/-mv.z;}
gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vA,vT;void main(){vec2 c=gl_PointCoord-.5;float l=length(c);
if(vT<.5){float a=vA*smoothstep(.5,.05,l);gl_FragColor=vec4(.55,.52,.47,a);}
else{float st=max(0.,1.-abs(c.x*c.y)*90.)*smoothstep(.5,0.,l)+smoothstep(.12,0.,l);gl_FragColor=vec4(1.,1.,1.,vA*st);}
if(gl_FragColor.a<.01)discard;}`
  });
  const pts = new THREE.Points(pg, pmat); pts.frustumCulled = false; scene.add(pts);

  /* Schneefall */
  const SN = 700, sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) sp.set([-12 + Math.random() * 30, Math.random() * 14, 2 + Math.random() * 12], i * 3);
  const sg = new THREE.BufferGeometry(); sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  const snow = new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xffffff, size: 0.09, transparent: true, opacity: 0, depthWrite: false }));
  scene.add(snow);

  /* ===== Kamera, Rundgang ===== */
  const OV = { T: new THREE.Vector3(2.6, 5.6, 1.6), d: 74, e: 0.3 };
  const DIR = new THREE.Vector3();
  const cur = { T: OV.T.clone(), d: OV.d, e: OV.e }, goal = { T: OV.T.clone(), d: OV.d, e: OV.e };
  let W = 1, Hh = 1, mx = 0, my = 0, hero = 1, tourP = -1, visible = true, t0 = performance.now();
  function resize() {
    W = cv.clientWidth; Hh = cv.clientHeight; renderer.setSize(W, Hh, false); camera.aspect = W / Hh; camera.updateProjectionMatrix();
    PU.uPx.value = renderer.getPixelRatio() * Hh / 2 / Math.tan(camera.fov * Math.PI / 360);
  }
  resize(); addEventListener('resize', resize);
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; }, { passive: true });
  const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const lists = [...document.querySelectorAll('.tour-step')];
  const rail = [...document.querySelectorAll('.rail button')];

  function setTour(p) { // p 0..1 über den Rundgang
    tourP = p;
    const n = ROOMS.length, f = Math.min(n - 1e-4, Math.max(0, p * n)), i = Math.floor(f), q = f - i;
    for (let r = 0; r < n; r++) {
      if (r < i) { U[r].uDirt.value = 0; U[r].uWipe.value = 100; PU.uniforms; PU.uS.value[r] = 1; }
      else if (r > i) { U[r].uDirt.value = 0; U[r].uWipe.value = -100; PU.uS.value[r] = 0; }
    }
    const R = ROOMS[i], fly = Math.min(1, q / 0.22), wp = Math.min(1, Math.max(0, (q - 0.22) / 0.56));
    U[i].uDirt.value = Math.min(1, fly * 1.4); U[i].uWipe.value = R.x0 - 0.8 + (R.x1 - R.x0 + 1.6) * ease(wp);
    PU.uS.value[i] = wp;
    for (let r = 0; r < n; r++) { PU.uW.value[r] = U[r].uWipe.value; PU.uD.value[r] = U[r].uDirt.value; ghostT[r] = r === i ? 0 : 1; }
    const prev = i === 0 ? OV : { T: new THREE.Vector3(...ROOMS[i - 1].T), d: ROOMS[i - 1].d, e: ROOMS[i - 1].e };
    const e = ease(fly), T = new THREE.Vector3(...R.T);
    goal.T.copy(prev.T).lerp(T, e); goal.d = prev.d + (R.d * (MOB() ? 1.35 : 1) - prev.d) * e; goal.e = prev.e + (R.e - prev.e) * e;
    // Abzieher auf der Wischkante
    const on = wp > 0 && wp < 1 && U[i].uDirt.value > 0.5;
    sq.visible = on; sheet.material.opacity = on ? 0.16 : 0;
    if (on) {
      const top = i === 4 ? 0.12 : i === 1 ? 3 * H + 0.2 : i === 2 ? 3 * H + 1.6 : R.fy + H - 0.05;
      const zc = i === 4 ? 7.2 : 0.2, len = i === 4 ? 2.4 : 8.6;
      sq.position.set(U[i].uWipe.value, top, zc); sq.scale.set(1.7, 1.7, len);
      hd.scale.set(1, 1, 1.7 / len);
      sheet.position.set(U[i].uWipe.value, (i === 4 ? 1.5 : R.T[1]), zc); sheet.scale.set(len, i === 1 ? 13 : 4.4, 1);
    }
    snow.material.opacity = i === 4 ? Math.min(0.9, fly) : 0;
    lists.forEach((el, k) => {
      el.classList.toggle('on', k === i);
      el.querySelectorAll('li').forEach((li, j, all) => li.classList.toggle('done', k < i || (k === i && wp >= (j + 1) / (all.length + 1))));
    });
    rail.forEach((b, k) => b.classList.toggle('on', k === i));
  }
  function setHero() { tourP = -1; for (let r = 0; r < 5; r++) { ghostT[r] = 0; U[r].uDirt.value = 0; PU.uD.value[r] = 0; PU.uS.value[r] = 0.35; } sq.visible = false; sheet.material.opacity = 0; snow.material.opacity = 0; goal.T.copy(OV.T); goal.d = OV.d * (MOB() ? 1.55 : 1); goal.e = OV.e; }
  setHero();
  window.ProfixTour = { setTour, setHero, rooms: ROOMS.length, snap() { cur.T.copy(goal.T); cur.d = goal.d; cur.e = goal.e; }, get visible() { return visible; }, set visible(v) { visible = v; } };

  function frame(now) {
    requestAnimationFrame(frame);
    if (!visible) return;
    const t = (now - t0) / 1000; PU.uTime.value = t;
    const dt = Math.min(0.1, (now - (frame.l || now)) / 1000); frame.l = now; const k = RM ? 1 : 1 - Math.exp(-dt * 4.2);
    for (let r = 0; r < 5; r++) U[r].uGhost.value += (ghostT[r] - U[r].uGhost.value) * k;
    cur.T.lerp(goal.T, k); cur.d += (goal.d - cur.d) * k; cur.e += (goal.e - cur.e) * k; DIR.set(1, cur.e * 2.1, 1.32).normalize();
    const heroF = tourP < 0 ? 1 : 0;
    const par = new THREE.Vector3(mx * 3.5, -my * 2, 0).multiplyScalar(heroF + 0.35);
    const camPos = cur.T.clone().add(DIR.clone().multiplyScalar(cur.d)).add(par);
    camera.position.copy(camPos); camera.lookAt(cur.T);
    // Bildausschnitt: Text links (Desktop) bzw. oben (Handy)
    const mob = MOB();
    camera.setViewOffset(W, Hh, mob ? 0 : -W * (tourP < 0 ? 0.25 : 0.19), mob ? (tourP < 0 ? -Hh * 0.36 : Hh * 0.24) : 0, W, Hh);
    root.position.y = heroF * Math.sin(t * 0.6) * 0.18; root.rotation.y = heroF * Math.sin(t * 0.25) * 0.04;
    sun.position.copy(cur.T).add(new THREE.Vector3(10, 18, 12)); sun.target.position.copy(cur.T);
    const a = snow.geometry.attributes.position;
    if (snow.material.opacity > 0) { for (let i = 0; i < SN; i++) { let y = a.array[i * 3 + 1] - 0.025; if (y < 0) y = 14; a.array[i * 3 + 1] = y; a.array[i * 3] += Math.sin(t + i) * 0.004; } a.needsUpdate = true; }
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
})();

/* ===== Object Breakdown: der Profix-Tropfen in drei Segmenten ===== */
(function () {
  const cv = document.getElementById('drop3d');
  if (!cv || !window.THREE) return;
  let r; try { r = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true }); } catch (e) { return; }
  r.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75)); r.outputEncoding = THREE.sRGBEncoding;
  const s = new THREE.Scene(), cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100); cam.position.set(0, 0.6, 13.5);
  const pm = new THREE.PMREMGenerator(r), es = new THREE.Scene();
  es.add(new THREE.Mesh(new THREE.BoxGeometry(30, 20, 30), new THREE.MeshBasicMaterial({ color: 0x8fa9bb, side: THREE.BackSide })));
  [[0, 9, 0, -Math.PI / 2, 0, 3], [-14, 2, 4, 0, Math.PI / 2, 2.2], [12, -2, 6, 0, -Math.PI / 2, 1.2]].forEach(([x, y, z, rx, ry, k]) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 1, 1).multiplyScalar(k) })); m.position.set(x, y, z); m.rotation.set(rx, ry, 0); es.add(m); });
  s.environment = pm.fromScene(es, 0.03).texture;
  s.add(new THREE.HemisphereLight(0xffffff, 0xcfe0ec, 0.6)); const d = new THREE.DirectionalLight(0xffffff, 1.2); d.position.set(4, 6, 8); s.add(d);
  // Profil des Tropfens (r, y): Spitze oben, runder Bauch unten
  const P = [];
  for (let i = 0; i <= 40; i++) { const t = i / 40, y = 2.4 - t * 2.4; P.push(new THREE.Vector2(Math.max(0.001, t * 1.32), y)); }      // Kegel
  for (let i = 1; i <= 48; i++) { const a = (i / 48) * Math.PI * 0.92, y = -Math.sin(a) * 1.55 * 0.98 + 0, rr = Math.cos(a) * 1.55; P.push(new THREE.Vector2(Math.max(0.001, rr), y - 0.02)); }
  const cut = 41; // Index, an dem der Kegel endet
  const mk = (hex, rough) => new THREE.MeshPhysicalMaterial({ color: hex, roughness: rough + 0.15, metalness: 0, clearcoat: 0.8, clearcoatRoughness: 0.12, envMapIntensity: 0.45, side: THREE.DoubleSide });
  const top = new THREE.Mesh(new THREE.LatheGeometry(P.slice(0, cut), 72), mk(0x74655f, 0.35));
  const bot = P.slice(cut - 1);
  const left = new THREE.Mesh(new THREE.LatheGeometry(bot, 48, Math.PI, Math.PI), mk(0x67bffd, 0.18));
  const right = new THREE.Mesh(new THREE.LatheGeometry(bot, 48, 0, Math.PI), mk(0x2bd35a, 0.22));
  // Schnittflächen der Hälften
  const sh = new THREE.Shape(); sh.moveTo(0, bot[0].y); bot.forEach(v => sh.lineTo(v.x, v.y)); sh.lineTo(0, bot[bot.length - 1].y); sh.lineTo(0, bot[0].y);
  const capG = new THREE.ShapeGeometry(sh, 24);
  const capL = new THREE.Mesh(capG, mk(0x67bffd, 0.18)); capL.rotation.y = -Math.PI / 2; left.add(capL);
  const capL2 = new THREE.Mesh(capG, mk(0x67bffd, 0.18)); capL2.rotation.y = Math.PI / 2; left.add(capL2);
  const capR = new THREE.Mesh(capG, mk(0x2bd35a, 0.22)); capR.rotation.y = -Math.PI / 2; right.add(capR);
  const capR2 = new THREE.Mesh(capG, mk(0x2bd35a, 0.22)); capR2.rotation.y = Math.PI / 2; right.add(capR2);
  const capT = new THREE.Mesh(new THREE.CircleGeometry(1.32, 72), mk(0x74655f, 0.35)); capT.rotation.x = Math.PI / 2; top.add(capT);
  const g = new THREE.Group(); g.add(top, left, right); g.rotation.y = -0.5; s.add(g);
  let split = 0, vis = false, W = 1, H = 1;
  const size = () => { W = cv.clientWidth; H = cv.clientHeight; r.setSize(W, H, false); cam.aspect = W / H; cam.updateProjectionMatrix(); };
  size(); addEventListener('resize', size);
  new IntersectionObserver(es => es.forEach(e => vis = e.isIntersecting)).observe(cv);
  window.ProfixDrop = { set: v => split = v };
  const t0 = performance.now();
  (function f(now) {
    requestAnimationFrame(f); if (!vis) return;
    const t = (now - t0) / 1000, e = split;
    top.position.set(0, 0.2 + e * 1.5, 0); top.rotation.set(0, 0, e * 0.25);
    left.position.set(-e * 1.7, -e * 0.4, e * 0.4); left.rotation.set(0, 0, -e * 0.3);
    right.position.set(e * 1.7, -e * 0.4, -e * 0.2); right.rotation.set(0, 0, e * 0.3);
    g.rotation.y = -0.5 + Math.sin(t * 0.4) * 0.35 + e * 0.6; g.position.y = Math.sin(t * 0.8) * 0.08 + 0.35;
    r.render(s, cam);
  })(t0);
})();
