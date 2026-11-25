// C2 cover scene. Camera choreography, spotlight, beam, pool of light, dust
// and float are carried over unchanged from the approved Direction C scene
// (tag c-scene-checkpoint). Changes: the card now uses the neutral-grey base
// texture with a holographic foil material, and the name is lit in sync.
import { mountScene, ease } from './tarot-engine-c2.js';

const lerp = (a, b, t) => a + (b - a) * t;
const clamp01 = v => Math.min(1, Math.max(0, v));

/* One opening timeline. T = 0 is the scene's first frame; the spotlight, the
 * name and the card all start there and share REVEAL and the same ease, so
 * they read as one shot. The camera push-in (4.6 s) starts at the same T = 0
 * and simply runs a little longer, settling after the reveal. */
export const REVEAL = 2.2;
export const APPROACH = 1.8;   // camera push-in + entrance turn (was 2.4 s, originally 4.6 s)
const approachEase = t => 1 - Math.pow(1 - t, 2.6);
const introEase = ease.inOutSine;
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
      const e = approachEase(clamp01(st.t / APPROACH)), t = st.t, s = st.scroll;
      p.pos.set(Math.sin(t * 0.06) * 0.06, lerp(0.35, 0.12, e) + s * 0.9, lerp(10.5, 6.4, e) + s * 2.6);
      p.look.set(0, lerp(0.2, 0.18, e) + s * 1.3, 0);
      p.fov = lerp(24, 28, e);
    },
  },
  layout(st) {
    if (st.mobile || st.aspect < 0.9) return { x: 0, y: 0.78, scale: 0.6 };
    return { x: 0, y: 0.38, scale: 0.62 };
  },
  intro: { duration: 4.6, revealStart: 0, revealEnd: REVEAL, revealEase: introEase, revealFrom: 0.13 },
  yawLimit: 0.36,
  cardMotion(st, k, T) {
    return { y: Math.sin(T * 0.45) * 0.03, yaw: Math.sin(T * 0.11) * 0.16 + (1 - approachEase(clamp01(T / APPROACH))) * 0.2, pitch: 0.02 + Math.sin(T * 0.09) * 0.02, roll: 0 };
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
    // The real lights come up with the beam (from a faint ambient floor, so
    // the frame is never black and nothing flashes).
    const lights = []; scene.traverse(o => { if (o.isLight) lights.push([o, o.intensity]); });
    const dust = []; scene.traverse(o => { if (o.isPoints && o.material.uniforms?.uOpacity) dust.push([o.material.uniforms.uOpacity, o.material.uniforms.uOpacity.value]); });
    const SPOT_GAMMA = 0.72;  // tuned against frame measurements (see DEVLOG)
    const cover = document.querySelector('.cover');
    const words = cover ? [...cover.querySelectorAll('.cover-name .w')] : [];
    const meta = cover ? [...cover.querySelectorAll('.cover-meta, .c2-next, .cover-credit')] : [];
    const portrait = matchMedia('(max-aspect-ratio: 1/1), (max-width: 760px)');
    const reducedMQ = matchMedia('(prefers-reduced-motion: reduce)');
    let done = false;
    const M0 = 4;            // mask edge just above the cap height: letters begin to show at once
    if (cover) document.documentElement.classList.add('tl-driven');
    return { update(st, k, T) {
      const a = reducedMQ.matches ? 1 : introEase(clamp01(T / REVEAL));
      const v = Math.pow(a, SPOT_GAMMA);
      beam.material.uniforms.uA.value = v * (1 - st.scroll * 0.6);
      pool.material.uniforms.uA.value = v;
      for (const [u, base] of dust) u.value = base * v;
      // The light on the card itself has a higher floor, so the card's first fragments are visible as soon as they form.
      for (const [l, base] of lights) l.intensity = base * (0.5 + 0.5 * a);
      if (done || !cover) return;
      // Name: lit from above as the light comes up, tracking settling — same clock, same ease.
      const ls0 = portrait.matches ? 0.5 : 0.62, ls1 = portrait.matches ? 0.22 : 0.3;
      for (const w of words) { w.style.setProperty('--m', (M0 + (100 - M0) * a).toFixed(2) + '%'); w.style.setProperty('--ls', (ls0 + (ls1 - ls0) * a).toFixed(4) + 'em'); w.style.opacity = String(clamp01(a / 0.12)); }
      meta.forEach((m, i) => { m.style.opacity = String(Math.pow(a, 1.6 + i * 0.8)); });
      if (a >= 1) { done = true; for (const w of words) { w.style.removeProperty('--m'); w.style.removeProperty('--ls'); } document.documentElement.classList.add('scene-lit'); }
    } };
  },
};

const root = import.meta.url.includes('?lab') ? null : document.querySelector('.cover .stage');
const lit = () => document.documentElement.classList.add('scene-lit');
if (root) {
  // The name is lit as the spotlight comes up (~0.5 s after the scene is live).
  mountScene(root, theme).then(r => { if (!r) { document.documentElement.classList.remove('tl-driven'); lit(); } })
    .catch(err => { console.warn('Tarot scene unavailable, showing artwork image.', err); root.classList.add('no-webgl'); document.documentElement.classList.remove('tl-driven'); lit(); });
  // Depth: the name drifts against the pointer, opposite to the camera parallax.
  const cover = document.querySelector('.cover');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    cover.style.setProperty('--px', ((e.clientX / innerWidth) * 2 - 1).toFixed(3));
    cover.style.setProperty('--py', ((e.clientY / innerHeight) * 2 - 1).toFixed(3));
  }, { passive: true });
} else if (!import.meta.url.includes('?lab')) lit();
if (!import.meta.url.includes('?lab')) setTimeout(lit, 6000); // never leave the name hidden
