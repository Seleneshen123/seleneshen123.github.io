// Direction B scene: a persistent night-tide atmosphere behind every page.
// Home: the card is summoned — it rises with a slow in-plane turn while a helix
// of luminous motes converges around it; scrolling carries the camera up
// through the particles. Subpages: the same air, without the card.
import { mountScene, ease } from '../shared/tarot-engine.js';

const lerp = (a, b, t) => a + (b - a) * t;
const visibleWidth = (d, fov, aspect) => 2 * d * Math.tan((fov * Math.PI) / 360) * aspect;
const root = document.querySelector('.sky.scene');
const home = root?.dataset.scene === 'home';

const fogSheets = ({ THREE, scene }) => {
  const mat = (color, alpha, scale, speed) => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uAlpha: { value: alpha }, uScale: { value: scale }, uSpeed: { value: speed } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `uniform float uTime, uAlpha, uScale, uSpeed; uniform vec3 uColor; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1,0)), f.x), mix(h(i + vec2(0,1)), h(i + vec2(1,1)), f.x), f.y); }
      float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { v += a * n(p); p = p * 2.02 + 3.1; a *= 0.5; } return v; }
      void main(){ vec2 p = vUv * uScale + vec2(uTime * uSpeed, uTime * uSpeed * 0.3);
        float f = fbm(p + fbm(p * 0.7 + uTime * 0.01));
        float edge = smoothstep(0.0, 0.25, vUv.x) * smoothstep(1.0, 0.75, vUv.x) * smoothstep(0.0, 0.3, vUv.y) * smoothstep(1.0, 0.7, vUv.y);
        gl_FragColor = vec4(uColor, smoothstep(0.42, 0.85, f) * uAlpha * edge); }`,
  });
  const sheets = [
    [new THREE.PlaneGeometry(26, 12), mat('#3d6a82', 0.16, 3.0, 0.012), [0, -1.2, -6]],
    [new THREE.PlaneGeometry(20, 9), mat('#5a8aa2', 0.1, 2.2, -0.018), [1, 0.6, -2.5]],
    [new THREE.PlaneGeometry(16, 6), mat('#8fb9cc', 0.05, 2.6, 0.025), [-1, -1.6, 1.2]],
  ].map(([g, m, p]) => { const mesh = new THREE.Mesh(g, m); mesh.position.set(...p); mesh.renderOrder = 1; scene.add(mesh); return mesh; });
  return sheets;
};

const common = {
  background: '#070c11',
  fog: { color: '#080e14', near: 5, far: 16 },
  toneMapping: 'aces', exposure: 0.92,
  environmentIntensity: 0.5, envIntensity: 0.95,
  edge: '#d8c18f', edgeRoughness: 0.4, clearcoat: 0.45,
  glow: '#9fd8ff', glowStrength: 1.8,
  lights: [
    { type: 'dir', color: '#d4e6ff', intensity: 1.55, position: [2.6, 4, 3.2] },
    { type: 'dir', color: '#7fc6ff', intensity: 2.4, position: [-3.5, 1, -2.5] },
    { type: 'dir', color: '#ffe2c0', intensity: 0.25, position: [0, -2, 4] },
  ],
  ambient: { sky: '#3c5a6c', ground: '#05080b', intensity: 0.5 },
  grade: { vignette: 0.6, grain: 0.022, lift: [0.004, 0.008, 0.012] },
};

const homeTheme = {
  ...common,
  cardSrc: new URL('../../assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp', import.meta.url).href,
  bloom: { strength: 0.42, radius: 0.5, threshold: 0.88 },
  particleIntro: true,
  camera: {
    fov: 32,
    pose(p, k, st, lay) {
      const e = ease.inOutCubic(k), t = st.t, s = st.scroll;
      p.pos.set(lerp(0.2, 0, e) + Math.sin(t * 0.08) * 0.22, lerp(-0.6, 0.05, e) + s * 1.5, lerp(7.8, 5.4, e) - s * 2.4);
      p.look.set(lay.x * 0.25, lerp(-0.2, 0, e) + s * 1.2, 0);
      p.fov = lerp(36, 32, e);
    },
  },
  layout(st) {
    if (st.mobile || st.aspect < 0.9) return { x: 0, y: 0.5, scale: 0.5 };
    return { x: visibleWidth(5.4, 32, st.aspect) * 0.235, y: 0.08, scale: 0.7 };
  },
  intro: { duration: 3.8, revealStart: 0.35, revealEnd: 2.4 },
  yawLimit: 0.4,
  cardMotion(st, k, T) {
    const e = ease.outCubic(k), rise = ease.inOutCubic(Math.min(1, T / 3.4));
    return { y: lerp(-1.1, 0, rise) + Math.sin(T * 0.6) * 0.04, z: 0, yaw: Math.sin(T * 0.19) * 0.14 - 0.06, pitch: Math.sin(T * 0.15) * 0.04, roll: lerp(-0.55, -0.05, ease.outExpo(k)) + Math.sin(T * 0.23) * 0.015 };
  },
  parallax: 0.16,
  particles: [
    { count: 1300, mode: 1, space: 'rig', extent: [3.3, 4.8, 3.3], size: 0.36, opacity: 0.9, color: '#d6efff', dof: 0.07, focus: 5.4, speed: 0.55, maxSize: 7, seed: 7 },
    { count: 4200, mode: 0, extent: [24, 13, 12], offset: [0, 0, -6], size: 0.42, opacity: 0.5, color: '#8fbad3', dof: 0.05, focus: 5.4, speed: 0.012, maxSize: 8, seed: 19 },
    { count: 34, mode: 0, extent: [10, 6, 2.0], offset: [0, 0, 3.0], size: 2.2, opacity: 0.12, color: '#bfe4ff', dof: 0.6, focus: 5.4, speed: 0.02, maxSize: 60, seed: 31, mobileScale: 0.5 },
  ],
  extras(ctx) {
    const sheets = fogSheets(ctx);
    const { THREE, rig } = ctx;
    const halo = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 4.2), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uA: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uA; varying vec2 vUv; void main(){ float d = length(vUv - 0.5) * 2.0; gl_FragColor = vec4(vec3(0.45, 0.68, 0.82), pow(max(0.0, 1.0 - d), 3.0) * 0.16 * uA); }' }));
    halo.position.z = -0.8; rig.add(halo);
    return { update(st, k, T) { for (const s of sheets) s.material.uniforms.uTime.value = T + 20; halo.material.uniforms.uA.value = ease.outCubic(k); } };
  },
};

const atmosphereTheme = {
  ...common,
  card: false,
  post: false,
  maxDpr: 1.25,
  camera: { fov: 34, pose(p, k, st) { const t = st.t; p.pos.set(Math.sin(t * 0.05) * 0.3, Math.sin(t * 0.04) * 0.15, 6); p.look.set(0, 0, 0); p.fov = 34; } },
  layout: () => ({ x: 0, y: 0, scale: 1 }),
  intro: { duration: 0.1 },
  parallax: 0.2,
  particles: [
    { count: 1400, mode: 1, extent: [9, 9, 6], offset: [2.5, 0, -1], size: 0.7, opacity: 0.45, color: '#cfeaff', dof: 0.15, focus: 6, speed: 0.25, maxSize: 18, seed: 5 },
    { count: 3600, mode: 0, extent: [24, 13, 12], offset: [0, 0, -6], size: 0.5, opacity: 0.45, color: '#8fbad3', dof: 0.05, focus: 6, speed: 0.01, maxSize: 7, seed: 13 },
  ],
  extras(ctx) { const sheets = fogSheets(ctx); return { update(st, k, T) { for (const s of sheets) s.material.uniforms.uTime.value = T + 20; } }; },
};

if (root) mountScene(root, home ? homeTheme : atmosphereTheme).catch(err => { console.warn('Scene unavailable; static background shown.', err); root.classList.add('no-webgl'); });
