// C2 cover scene. Camera choreography, spotlight, beam, pool of light, dust
// and float are carried over unchanged from the approved Direction C scene
// (tag c-scene-checkpoint). Changes: the card now uses the neutral-grey base
// texture with a holographic foil material, and the name is lit in sync.
import { mountScene, ease } from './tarot-engine-c2.js';

const lerp = (a, b, t) => a + (b - a) * t;
const A = p => new URL(p, import.meta.url).href;

export const theme = {
  cardSrc: A('../../../assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp'),
  cardMaps: { base: A('../textures/tarot-base-neutral.png'), surface: A('../textures/tarot-surface.png'), foil: A('../textures/tarot-foil.png') },
  foil: { strength: 0.85, gain: 1.4, floor: 0.003, saturation: 0.6, bandFreq: 3.0, thickPhase: 0.35, bandsAcross: 2.2, iridescence: 0.4, ior: 1.5, thicknessRange: [240, 520], clearcoatRoughness: 0.16 },
  sweep: false,
  background: '#050607',
  fog: { color: '#050607', near: 5.5, far: 15 },
  toneMapping: 'aces', exposure: 1.0,
  environmentIntensity: 0.32, envIntensity: 0.85,
  edge: '#cdb27c', edgeRoughness: 0.44, clearcoat: 0.55,
  glow: '#e9f1f5', glowStrength: 1.4, revealNoise: 0.35,
  lights: [
    { type: 'spot', color: '#eef3f6', intensity: 5.2, position: [0.2, 5.2, 1.6], target: [0, 0, 0], angle: 0.34, penumbra: 0.95 },
    { type: 'dir', color: '#7f9aab', intensity: 1.1, position: [-2.5, 1, -3] },
  ],
  ambient: { sky: '#20282e', ground: '#000000', intensity: 0.25 },
  bloom: { strength: 0.3, radius: 0.45, threshold: 0.9 },
  grade: { vignette: 0.95, grain: 0.034 },
  camera: {
    fov: 28,
    pose(p, k, st) {
      const e = ease.inOutSine(k), t = st.t, s = st.scroll;
      p.pos.set(Math.sin(t * 0.06) * 0.06, lerp(0.35, 0.12, e) + s * 0.9, lerp(10.5, 6.4, e) + s * 2.6);
      p.look.set(0, lerp(0.2, 0.18, e) + s * 1.3, 0);
      p.fov = lerp(24, 28, e);
    },
  },
  layout(st) {
    if (st.mobile || st.aspect < 0.9) return { x: 0, y: 0.78, scale: 0.6 };
    return { x: 0, y: 0.38, scale: 0.62 };
  },
  intro: { duration: 4.6, revealStart: 0.9, revealEnd: 3.0 },
  yawLimit: 0.36,
  cardMotion(st, k, T) {
    return { y: Math.sin(T * 0.45) * 0.03, yaw: Math.sin(T * 0.11) * 0.16 + (1 - ease.outCubic(k)) * 0.2, pitch: 0.02 + Math.sin(T * 0.09) * 0.02, roll: 0 };
  },
  parallax: 0.06,
  particles: [
    { count: 3000, mode: 2, extent: [3.6, 6.6, 3.6], offset: [0, 1.3, 0], beam: [0.3, 1.75], size: 0.34, opacity: 0.85, color: '#e3eaee', dof: 0.12, focus: 6.4, speed: 0.22, maxSize: 9, seed: 3 },
    { count: 900, mode: 0, extent: [16, 9, 10], offset: [0, 0, -2], size: 0.26, opacity: 0.06, color: '#aab6bd', dof: 0.05, focus: 6.4, speed: 0.01, maxSize: 5, seed: 9 },
  ],
  extras({ THREE, scene }) {
    const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 1.8, 6.6, 64, 1, true), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, uniforms: { uA: { value: 0 } },
      vertexShader: 'varying vec3 vN; varying vec3 vV; varying float vY; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vY = uv.y; gl_Position = projectionMatrix * mv; }',
      fragmentShader: 'uniform float uA; varying vec3 vN; varying vec3 vV; varying float vY; void main(){ float f = pow(abs(dot(vN, vV)), 3.0); float y = smoothstep(0.0, 0.55, vY) * (0.35 + 0.65 * vY); gl_FragColor = vec4(vec3(0.86, 0.92, 0.95), f * y * 0.16 * uA); }',
    }));
    beam.position.set(0.1, 1.85, 0); scene.add(beam);
    const pool = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uA: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uA; varying vec2 vUv; void main(){ float d = length((vUv - 0.5) * vec2(1.0, 1.6)) * 2.0; gl_FragColor = vec4(vec3(0.8, 0.86, 0.9), pow(max(0.0, 1.0 - d), 2.2) * 0.22 * uA); }',
    }));
    pool.rotation.x = -Math.PI / 2; pool.position.y = -1.45; scene.add(pool);
    return { update(st, k, T) { const a = ease.inOutSine(Math.min(1, T / 1.6)); beam.material.uniforms.uA.value = a * (1 - st.scroll * 0.6); pool.material.uniforms.uA.value = a; } };
  },
};

const root = import.meta.url.includes('?lab') ? null : document.querySelector('.cover .stage');
const lit = () => document.documentElement.classList.add('scene-lit');
if (root) {
  // The name is lit as the spotlight comes up (~0.5 s after the scene is live).
  mountScene(root, theme).then(r => { if (!r) { lit(); return; } setTimeout(lit, 1250); })
    .catch(err => { console.warn('Tarot scene unavailable, showing artwork image.', err); root.classList.add('no-webgl'); lit(); });
  // Depth: the name drifts against the pointer, opposite to the camera parallax.
  const cover = document.querySelector('.cover');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    cover.style.setProperty('--px', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
    cover.style.setProperty('--py', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
  }, { passive: true });
} else if (!import.meta.url.includes('?lab')) lit();
if (!import.meta.url.includes('?lab')) setTimeout(lit, 6000); // never leave the name hidden
