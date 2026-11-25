// Review studio: the real card mesh with the original front and a selectable
// CONCEPT back. Drag to turn freely (only here — the prototypes never show a back).
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildCardGeometry, createCardMaterials, buildSurfaceMap, loadImage } from '../shared/tarot-engine.js';

const canvas = document.querySelector('.stage canvas');
const stage = canvas.parentElement;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.toneMapping = THREE.NeutralToneMapping;
const scene = new THREE.Scene(); scene.background = new THREE.Color('#16191c');
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.8;
const key = new THREE.DirectionalLight('#ffffff', 1.6); key.position.set(-2, 3, 4); scene.add(key);
const rim = new THREE.DirectionalLight('#cfe0ff', 1.4); rim.position.set(3, 1, -3); scene.add(rim);
const back = new THREE.DirectionalLight('#ffffff', 1.4); back.position.set(1, 2, -4); scene.add(back);
const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50); camera.position.set(0, 0, 4.6);

const front = await loadImage(new URL('../../assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp', import.meta.url).href);
const { materials } = createCardMaterials(front, renderer, { edge: '#d6bb82', envIntensity: 1 });
const card = new THREE.Mesh(buildCardGeometry(), materials); scene.add(card);

async function setBack(file) {
  const img = await loadImage(new URL(file, import.meta.url).href);
  const c = document.createElement('canvas'); c.width = 758; c.height = 1476; c.getContext('2d').drawImage(img, 0, 0, 758, 1476);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const surf = buildSurfaceMap(c);
  card.material[2] = new THREE.MeshPhysicalMaterial({ map: tex, roughnessMap: surf, metalnessMap: surf, roughness: 1, metalness: 1, clearcoat: 0.35, clearcoatRoughness: 0.3 });
}
await setBack('meridian.svg');

let yaw = 0.35, target = 0.35, dragging = false, lastX = 0, autoT = 0;
stage.addEventListener('pointerdown', e => { dragging = true; lastX = e.clientX; stage.setPointerCapture(e.pointerId); });
stage.addEventListener('pointermove', e => { if (!dragging) return; target += (e.clientX - lastX) * 0.012; lastX = e.clientX; });
stage.addEventListener('pointerup', () => { dragging = false; });
for (const b of document.querySelectorAll('[data-back]')) b.addEventListener('click', async () => {
  for (const o of document.querySelectorAll('[data-back]')) o.setAttribute('aria-pressed', String(o === b));
  await setBack(b.dataset.back); target = Math.PI + 0.2;
});
document.querySelector('[data-flip]').addEventListener('click', () => { target = Math.round((target - Math.PI / 2) / Math.PI) * Math.PI + Math.PI + 0.2; });

function resize() { const r = stage.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); camera.aspect = r.width / r.height; camera.updateProjectionMatrix(); }
new ResizeObserver(resize).observe(stage); resize();
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
renderer.setAnimationLoop(t => {
  yaw += (target - yaw) * (reduce ? 1 : 0.08); autoT = t / 1000;
  card.rotation.set(Math.sin(autoT * 0.5) * 0.04, yaw, 0);
  card.position.y = reduce ? 0 : Math.sin(autoT * 0.7) * 0.02;
  renderer.render(scene, camera);
});
