// Direction A scene: the card suspended in a cold, pale volume — like a
// specimen in a clean-room. Fine dark dust drifts laterally through the space;
// thin orbital rings and tick marks give it a measured, architectural frame.
import { mountScene, ease } from '../shared/tarot-engine.js';

const lerp = (a, b, t) => a + (b - a) * t;
const visibleWidth = (d, fov, aspect) => 2 * d * Math.tan((fov * Math.PI) / 360) * aspect;

const theme = {
  cardSrc: new URL('../../assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp', import.meta.url).href,
  background: '#e6e9eb',
  fog: { color: '#e6e9eb', near: 6.5, far: 17 },
  exposure: 1.0,
  environmentIntensity: 0.9,
  envIntensity: 1.05,
  edge: '#cdb98a', edgeRoughness: 0.28,
  glow: '#2b45d8', glowStrength: 1.6,
  clearcoat: 0.4,
  lights: [
    { type: 'dir', color: '#ffffff', intensity: 1.75, position: [-2.5, 3.2, 4.5] },
    { type: 'dir', color: '#d9e6ff', intensity: 1.8, position: [3.5, 1.2, -2.5] },
  ],
  ambient: { sky: '#f3f6f8', ground: '#8f979f', intensity: 0.7 },
  bloom: null,
  grade: { vignette: 0.0, grain: 0.018 },
  camera: {
    fov: 30,
    pose(p, k, st, lay) {
      const e = ease.inOutCubic(k), t = st.t;
      p.pos.set(lerp(lay.x + 0.7, 0, e), lerp(0.32, 0.04, e), lerp(3.4, 5.6, e));
      p.pos.x += Math.sin(t * 0.13) * 0.05; p.pos.y += Math.sin(t * 0.11) * 0.03 - st.scroll * 0.45;
      p.pos.z += st.scroll * 0.9;
      p.look.set(lerp(lay.x, 0, e), -st.scroll * 0.25, 0);
      p.fov = lerp(25, 30, e);
    },
  },
  layout(st) {
    if (st.mobile || st.aspect < 0.9) return { x: 0, y: 0.04, scale: 0.68 };
    const w = visibleWidth(5.6, 30, st.aspect);
    return { x: w * 0.205, y: 0.0, scale: st.aspect > 1.7 ? 0.74 : 0.66 };
  },
  intro: { duration: 3.2, revealStart: 0.25, revealEnd: 2.1 },
  yawLimit: 0.46,
  cardMotion(st, k, T) {
    const e = ease.outCubic(k);
    return { y: Math.sin(T * 0.7) * 0.022, z: lerp(-0.5, 0, e), yaw: -0.3 + Math.sin(T * 0.21) * 0.1 + (1 - ease.outExpo(k)) * 0.25, pitch: Math.sin(T * 0.17) * 0.035, roll: -0.03 };
  },
  parallax: 0.1,
  particles: [
    { count: 9000, mode: 0, extent: [17, 8, 12], offset: [0, 0, -1], size: 0.5, opacity: 0.55, color: '#1a1f25', blending: 'normal', dof: 0.13, focus: 5.6, speed: 0.07, maxSize: 9, sizeBias: 3.2, seed: 11 },
    { count: 700, mode: 0, extent: [11, 6.5, 2.6], offset: [0, 0, 2.6], size: 1.1, opacity: 0.3, color: '#1a1f25', blending: 'normal', dof: 0.55, focus: 5.6, speed: 0.1, maxSize: 34, seed: 23, mobileScale: 0.35 },
  ],
  extras({ THREE, rig, scene }) {
    const group = new THREE.Group(); rig.add(group);
    const ink = new THREE.LineBasicMaterial({ color: '#2a3138', transparent: true, opacity: 0.22, fog: true });
    const signal = new THREE.LineBasicMaterial({ color: '#2b45d8', transparent: true, opacity: 0.55, fog: true });
    const circle = (r, seg = 160, from = 0, to = Math.PI * 2) => { const pts = []; for (let i = 0; i <= seg; i++) { const a = from + (to - from) * (i / seg); pts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r, 0)); } return new THREE.BufferGeometry().setFromPoints(pts); };
    const ringA = new THREE.Line(circle(1.62), ink); ringA.rotation.x = Math.PI * 0.5 - 0.22; group.add(ringA);
    const ringB = new THREE.Line(circle(1.38), ink); ringB.rotation.y = 0.5; group.add(ringB);
    const arc = new THREE.Line(circle(1.38, 40, 0.3, 1.05), signal); ringB.add(arc);
    // Tick marks on the vertical ring: minor every 5°, major every 30°.
    const tick = []; for (let i = 0; i < 72; i++) { const a = (i / 72) * Math.PI * 2, r0 = 1.38, r1 = i % 6 === 0 ? 1.47 : 1.42; tick.push(new THREE.Vector3(Math.cos(a) * r0, Math.sin(a) * r0, 0), new THREE.Vector3(Math.cos(a) * r1, Math.sin(a) * r1, 0)); }
    const ticks = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(tick), ink); ringB.add(ticks);
    // A luminous aperture behind the card (brighter than the room).
    const ap = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 6), new THREE.ShaderMaterial({ transparent: true, depthWrite: false,
      uniforms: { uA: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: 'uniform float uA; varying vec2 vUv; void main(){ float x = 1.0 - abs(vUv.x - 0.5) * 2.0; float y = smoothstep(0.0, 0.35, vUv.y) * smoothstep(1.0, 0.6, vUv.y); gl_FragColor = vec4(vec3(1.0), pow(x, 2.2) * y * 0.85 * uA); }' }));
    ap.position.set(0, 0.2, -1.6); rig.add(ap);
    // Receding floor grid fading into the fog.
    const grid = new THREE.GridHelper(40, 80, '#8e969d', '#8e969d'); grid.material.transparent = true; grid.material.opacity = 0.22; grid.position.y = -1.55; grid.material.fog = true; rig.add(grid);
    return {
      update(st, k, T) {
        const e = ease.outCubic(k);
        group.scale.setScalar(lerp(0.7, 1, e)); ink.opacity = 0.22 * e; signal.opacity = 0.55 * e;
        ringA.rotation.z = T * 0.05; ringB.rotation.z = -T * 0.035;
        ap.material.uniforms.uA.value = e;
        grid.material.opacity = 0.11 * e;
      },
    };
  },
};

const root = document.querySelector('.hero .stage');
if (root) mountScene(root, theme).catch(err => { console.warn('Tarot scene unavailable, showing artwork image.', err); root.classList.add('no-webgl'); });
