// Foil inspection: the real card mesh and C2 material under controllable view
// and light. Uses the same engine pieces as the homepage.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildCardGeometry, createCardMaterials, updateGrating, loadImage } from '../js/tarot-engine-c2.js';
import { theme } from '../js/scene.js?lab';

const U = p => new URL(p, import.meta.url).href;
const canvas = document.querySelector('.stage canvas'), stage = canvas.parentElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene(); scene.background = new THREE.Color('#050607');
const env = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environment = env;
const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50); camera.position.set(0, 0.05, 4.4);

const spot = new THREE.SpotLight('#eef3f6', 5.2, 0, 0.34, 0.95, 0); spot.position.set(0.2, 5.2, 1.6); scene.add(spot, spot.target);
const rimL = new THREE.DirectionalLight('#7f9aab', 1.1); rimL.position.set(-2.5, 1, -3); scene.add(rimL);
const key = new THREE.DirectionalLight('#ffffff', 0); key.position.set(-2, 2, 4); scene.add(key);
const hemi = new THREE.HemisphereLight('#20282e', '#000000', 0.25); scene.add(hemi);
const LIGHTS = {
  spot: () => { spot.intensity = 5.2; key.intensity = 0; scene.environmentIntensity = 0.32; hemi.intensity = 0.25; },
  studio: () => { spot.intensity = 1.5; key.intensity = 1.6; scene.environmentIntensity = 0.9; hemi.intensity = 0.4; },
  raking: () => { spot.intensity = 0.6; key.intensity = 2.4; scene.environmentIntensity = 0.2; hemi.intensity = 0.1; },
};

const [v2, base, surface, foil] = await Promise.all([theme.cardSrc, theme.cardMaps.base, theme.cardMaps.surface, theme.cardMaps.foil].map(loadImage));
const make = (b, withFoil) => createCardMaterials(v2, renderer, theme, { base: b, surface, foil: withFoil ? foil : null });
const sets = { neutral: make(base, true), v2: make(v2, true), neutralOff: make(base, false), v2Off: make(v2, false) };
const card = new THREE.Mesh(buildCardGeometry(), sets.neutral.materials); scene.add(card);

const st = { mode: 'full', base: 'neutral', yaw: 0, pitch: 0, light: 0, strength: 1, light0: 'spot' };
function applyMaterial() {
  const s = st.mode === 'off' ? sets[st.base + 'Off'] : sets[st.base];
  card.material = s.materials;
  const front = s.materials[0];
  if (st.mode !== 'off') { front.iridescence = 1; s.uniforms.uFoil.value = st.mode === 'full' ? st.strength : 0; front.iridescence = st.mode === 'off' ? 0 : Math.min(1, st.strength); }
}
const $ = id => document.getElementById(id);
const bind = (id, key, out, fmt) => $(id).addEventListener('input', e => { st[key] = +e.target.value; $(out).textContent = fmt(st[key]); applyMaterial(); });
bind('yaw', 'yaw', 'yo', v => v + '°'); bind('pitch', 'pitch', 'po', v => v + '°'); bind('light', 'light', 'lo', v => v + '°'); bind('strength', 'strength', 'so', v => v.toFixed(2));
for (const b of document.querySelectorAll('[data-mode]')) b.addEventListener('click', () => { st.mode = b.dataset.mode; document.querySelectorAll('[data-mode]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); applyMaterial(); });
for (const b of document.querySelectorAll('[data-light]')) b.addEventListener('click', () => { st.light0 = b.dataset.light; LIGHTS[st.light0](); document.querySelectorAll('[data-light]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); });
for (const b of document.querySelectorAll('[data-base]')) b.addEventListener('click', () => { st.base = b.dataset.base; document.querySelectorAll('[data-base]').forEach(o => o.setAttribute('aria-pressed', String(o === b))); applyMaterial(); });
let drag = null;
stage.addEventListener('pointerdown', e => { drag = [e.clientX, e.clientY, st.yaw, st.pitch]; stage.setPointerCapture(e.pointerId); });
stage.addEventListener('pointermove', e => { if (!drag) return; st.yaw = Math.max(-40, Math.min(40, drag[2] + (e.clientX - drag[0]) * 0.25)); st.pitch = Math.max(-25, Math.min(25, drag[3] + (e.clientY - drag[1]) * 0.2)); $('yaw').value = st.yaw; $('pitch').value = st.pitch; $('yo').textContent = st.yaw.toFixed(1) + '°'; $('po').textContent = st.pitch.toFixed(1) + '°'; });
stage.addEventListener('pointerup', () => { drag = null; });

function pose() {
  card.rotation.set(THREE.MathUtils.degToRad(st.pitch), THREE.MathUtils.degToRad(st.yaw), 0);
  const a = THREE.MathUtils.degToRad(st.light);
  spot.position.set(Math.sin(a) * 4.2, 5.2 * Math.cos(a * 0.5), 1.6); key.position.set(Math.sin(a) * 4 - 1, 2, 4 * Math.cos(a));
  for (const s of Object.values(sets)) updateGrating(s.uniforms, card, camera);
}
function resize() { const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(stage); resize();
LIGHTS.spot(); applyMaterial();
renderer.setAnimationLoop(() => { pose(); renderer.render(scene, camera); });

// Tight crop of the card from the current frame (for the strip and tests).
function crop() { const w = canvas.width, h = canvas.height, ch = Math.round(h * 0.86), cw = Math.round(ch * 0.62); const c = document.createElement('canvas'); c.width = cw; c.height = ch; c.getContext('2d').drawImage(canvas, (w - cw) / 2, (h - ch) / 2, cw, ch, 0, 0, cw, ch); return c.toDataURL('image/jpeg', 0.9); }
window.__lab = { st, sets, card, front: () => card.material[0], uniforms: () => (st.mode === 'off' ? sets[st.base + 'Off'] : sets[st.base]).uniforms, light: k => LIGHTS[k](), apply: applyMaterial,
  shot(yaw, pitch = 4) { Object.assign(st, { yaw, pitch }); pose(); renderer.render(scene, camera); return crop(); } };
// Angle comparison strip, rendered from the same view.
const shots = $('shots');
const save = { ...st };
for (const [yaw, label] of [[-30, 'Yaw −30°'], [-15, 'Yaw −15°'], [0, 'Facing'], [15, 'Yaw +15°'], [30, 'Yaw +30°']]) {
  Object.assign(st, { yaw, pitch: 4, mode: 'full', base: 'neutral', strength: 1 }); applyMaterial(); pose(); renderer.render(scene, camera);
  const fig = document.createElement('figure'); fig.innerHTML = `<img alt="Card at ${label}" src="${crop()}"><figcaption><b>${label}</b>Home spotlight, film + spectrum</figcaption>`; shots.append(fig);
}
Object.assign(st, save); applyMaterial();
