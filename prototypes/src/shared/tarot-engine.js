/* Tarot engine — shared WebGL renderer for the three art-direction prototypes.
 *
 * One physically built card (extruded rounded rectangle with a bevelled,
 * gilded edge) textured with the artist's original front artwork. Gold areas
 * of the artwork are detected and given metallic/low-roughness response so the
 * printed frame behaves like gold leaf; paper stays matte, gems stay glossy.
 *
 * Each direction supplies a `theme` describing its environment, lighting,
 * particles, camera choreography and scroll behaviour. The engine owns the
 * render loop, visibility pausing, reduced motion, adaptive resolution and the
 * no-WebGL fallback (the poster <img> simply stays visible).
 *
 * The card back is never shown here: no approved reverse exists, so rotation is
 * limited to a range where only the front faces the camera.
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export const ART_W = 758, ART_H = 1476;
export const CARD_W = 1, CARD_H = ART_H / ART_W;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
export const ease = {
  outExpo: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutCubic: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outCubic: t => 1 - Math.pow(1 - t, 3),
  inOutSine: t => -(Math.cos(Math.PI * t) - 1) / 2,
};
const seg = (t, a, b) => clamp((t - a) / (b - a), 0, 1);

/* ---------- material maps from the artwork ---------- */
// Packs roughness (G) and metalness (B) into one texture, as three.js expects.
function buildSurfaceMap(image) {
  const c = document.createElement('canvas');
  c.width = image.naturalWidth || image.width; c.height = image.naturalHeight || image.height;
  const x = c.getContext('2d', { willReadFrequently: true });
  x.drawImage(image, 0, 0);
  const id = x.getImageData(0, 0, c.width, c.height), d = id.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i] / 255, g = d[i + 1] / 255, b = d[i + 2] / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), v = mx, s = mx ? (mx - mn) / mx : 0;
    let h = 0;
    if (mx !== mn) { h = mx === r ? ((g - b) / (mx - mn)) % 6 : mx === g ? (b - r) / (mx - mn) + 2 : (r - g) / (mx - mn) + 4; h *= 60; if (h < 0) h += 360; }
    let rough = 0.58, metal = 0.0;
    if (h > 34 && h < 58 && s > 0.42 && v > 0.62) { // gold leaf only (bright, saturated)
      const k = clamp((s - 0.42) / 0.25, 0, 1) * clamp((v - 0.62) / 0.25, 0, 1);
      metal = 0.35 + 0.55 * k; rough = 0.38 - 0.14 * k;
    } else if (h > 165 && h < 215 && s > 0.3 && v > 0.45) { rough = 0.14; } // gems
    else if (s < 0.16 && v > 0.72) { rough = 0.8; } // cream paper
    else if (v < 0.16) { rough = 0.45; } // lacquered dark ground
    d[i] = 255; d[i + 1] = rough * 255; d[i + 2] = metal * 255; d[i + 3] = 255;
  }
  x.putImageData(id, 0, 0);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.NoColorSpace; t.flipY = true;
  return t;
}

/* ---------- reveal (summoning dissolve) shader patch ---------- */
const NOISE = /* glsl */`
float cardHash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float cardNoise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(cardHash(i), cardHash(i + vec2(1,0)), u.x), mix(cardHash(i + vec2(0,1)), cardHash(i + vec2(1,1)), u.x), u.y); }
float cardFbm(vec2 p){ return cardNoise(p) * 0.55 + cardNoise(p * 2.03 + 7.1) * 0.3 + cardNoise(p * 4.1 + 3.7) * 0.15; }`;

function patchReveal(material, uniforms) {
  material.onBeforeCompile = shader => {
    Object.assign(shader.uniforms, uniforms);
    shader.vertexShader = 'varying vec3 vCardPos;\n' + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n vCardPos = position;');
    shader.fragmentShader = `uniform float uReveal; uniform float uGlow; uniform vec3 uGlowColor; uniform float uSweep; varying vec3 vCardPos;\n${NOISE}\n` + shader.fragmentShader
      .replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
        float revealField = cardFbm(vCardPos.xy * 5.0) * 0.62 + (vCardPos.y / ${CARD_H.toFixed(4)} + 0.5) * 0.38;
        if (revealField > uReveal) discard;
        float revealEdge = smoothstep(uReveal - 0.08, uReveal, revealField);`)
      .replace('#include <emissivemap_fragment>', `#include <emissivemap_fragment>
        totalEmissiveRadiance += uGlowColor * revealEdge * uGlow;
        // A slow specular sweep across the surface (light catching the card).
        float sweepBand = exp(-pow((vCardPos.x * 0.9 + vCardPos.y * 0.35) - uSweep, 2.0) * 60.0);
        totalEmissiveRadiance += uGlowColor * sweepBand * 0.06;`);
  };
  material.customProgramCacheKey = () => 'tarot-reveal';
}

/* ---------- card geometry ---------- */
export function buildCardGeometry({ thickness = 0.011, bevel = 0.0028 } = {}) {
  const inset = 4 / ART_W + bevel;          // art has a 4px transparent margin
  const w = CARD_W - inset * 2, h = CARD_H - inset * 2, r = 18 / ART_W;
  const s = new THREE.Shape();
  const x0 = -w / 2, y0 = -h / 2;
  s.moveTo(x0 + r, y0);
  s.lineTo(x0 + w - r, y0); s.absarc(x0 + w - r, y0 + r, r, -Math.PI / 2, 0, false);
  s.lineTo(x0 + w, y0 + h - r); s.absarc(x0 + w - r, y0 + h - r, r, 0, Math.PI / 2, false);
  s.lineTo(x0 + r, y0 + h); s.absarc(x0 + r, y0 + h - r, r, Math.PI / 2, Math.PI, false);
  s.lineTo(x0, y0 + r); s.absarc(x0 + r, y0 + r, r, Math.PI, Math.PI * 1.5, false);
  const g = new THREE.ExtrudeGeometry(s, { depth: thickness, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 4, curveSegments: 16 });
  g.translate(0, 0, -thickness / 2);
  // Lid faces are one group (back half, then front half). Split them and map
  // their UVs onto the full artwork rectangle so the art registers exactly.
  const lid = g.groups[0], side = g.groups[1];
  const half = lid.count / 2;
  const pos = g.attributes.position, uv = g.attributes.uv;
  for (let i = lid.start; i < lid.start + lid.count; i++) {
    const u = pos.getX(i) / CARD_W + 0.5, v = pos.getY(i) / CARD_H + 0.5;
    uv.setXY(i, i < lid.start + half ? 1 - u : u, v);
  }
  uv.needsUpdate = true;
  g.clearGroups();
  g.addGroup(lid.start + half, half, 0);   // front  → material 0
  g.addGroup(side.start, side.count, 1);   // edge   → material 1
  g.addGroup(lid.start, half, 2);          // back   → material 2
  g.computeVertexNormals();
  return g;
}

/* ---------- particles ---------- */
const PARTICLE_VS = /* glsl */`
attribute vec4 aSeed;
uniform float uTime, uPR, uSize, uOpacity, uFocus, uDof, uSpeed, uIntro, uMaxSize;
uniform vec3 uExtent, uOffset; uniform int uMode; uniform vec2 uBeam;
varying float vAlpha; varying float vCoc;
void main(){
  vec3 p = position; float t = uTime * uSpeed;
  if (uMode == 0) {            // lateral current through an architectural volume
    p.x = mod(p.x + t * (0.25 + aSeed.x * 0.75) + 0.5, 1.0) - 0.5;
    p.y += sin(t * 1.3 + aSeed.y * 6.283 + p.x * 4.0) * 0.018;
    p.z += cos(t * 0.9 + aSeed.z * 6.283) * 0.02;
    p *= uExtent;
  } else if (uMode == 1) {     // helical rise: a slow summoning vortex
    float r = mix(0.18, 1.0, sqrt(aSeed.x));
    float h = mod(p.y + t * (0.06 + aSeed.y * 0.1) + 0.5, 1.0) - 0.5;
    float ang = aSeed.z * 6.2831 + t * (0.32 / (r + 0.25));
    float rr = r * mix(2.4, 1.0, uIntro);
    p = vec3(cos(ang) * rr * 0.5, h, sin(ang) * rr * 0.5) * uExtent;
    p.y += sin(t * 0.8 + aSeed.w * 12.0) * 0.04;
  } else {                     // dust sinking through a light beam
    p.y = mod(p.y - t * (0.05 + aSeed.x * 0.07) + 0.5, 1.0) - 0.5;
    p.x += sin(t * 0.7 + aSeed.y * 6.283) * 0.04;
    p.z += cos(t * 0.5 + aSeed.z * 6.283) * 0.04;
    p *= uExtent;
  }
  p += uOffset;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float dist = max(-mv.z, 0.05);
  float coc = abs(dist - uFocus) * uDof;
  vCoc = clamp(coc, 0.0, 1.0);
  float size = uSize * (0.35 + aSeed.w) * (1.0 + coc * 3.5);
  gl_PointSize = min(size * uPR * (220.0 / dist), uMaxSize * uPR);
  float tw = 0.65 + 0.35 * sin(uTime * (0.6 + aSeed.y * 1.7) + aSeed.x * 40.0);
  float a = uOpacity * tw / (1.0 + coc * coc * 7.0);
  if (uMode == 2) {            // brighter inside the beam cone
    float rad = mix(uBeam.x, uBeam.y, clamp(0.5 - p.y / max(uExtent.y, 0.001), 0.0, 1.0));
    float d = length(p.xz - uOffset.xz);
    a *= 0.18 + 0.82 * smoothstep(rad, rad * 0.35, d);
  }
  vAlpha = a * smoothstep(0.08, 0.6, dist);
  gl_Position = projectionMatrix * mv;
}`;
const PARTICLE_FS = /* glsl */`
uniform vec3 uColor; varying float vAlpha; varying float vCoc;
void main(){
  vec2 c = gl_PointCoord - 0.5; float d = length(c);
  float sharp = exp(-d * d * 22.0);
  float disc = smoothstep(0.5, 0.26, d) * (0.85 + 0.15 * smoothstep(0.15, 0.45, d));
  float m = mix(sharp, disc * 0.6, vCoc);
  if (m < 0.004) discard;
  gl_FragColor = vec4(uColor, m * vAlpha);
}`;

function makeParticles(layer, dprRef) {
  const n = layer.count;
  const pos = new Float32Array(n * 3), seed = new Float32Array(n * 4);
  let s = layer.seed || 1337; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = rnd() - 0.5; pos[i * 3 + 1] = rnd() - 0.5; pos[i * 3 + 2] = rnd() - 0.5;
    seed[i * 4] = rnd(); seed[i * 4 + 1] = rnd(); seed[i * 4 + 2] = rnd(); seed[i * 4 + 3] = Math.pow(rnd(), layer.sizeBias ?? 3);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e4);
  const m = new THREE.ShaderMaterial({
    vertexShader: PARTICLE_VS, fragmentShader: PARTICLE_FS, transparent: true, depthWrite: false,
    blending: layer.blending === 'normal' ? THREE.NormalBlending : THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 }, uPR: dprRef, uSize: { value: layer.size }, uOpacity: { value: layer.opacity },
      uFocus: { value: layer.focus ?? 5 }, uDof: { value: layer.dof ?? 0.25 }, uSpeed: { value: layer.speed ?? 1 },
      uIntro: { value: 1 }, uMaxSize: { value: layer.maxSize ?? 48 }, uExtent: { value: new THREE.Vector3(...layer.extent) },
      uOffset: { value: new THREE.Vector3(...(layer.offset || [0, 0, 0])) }, uMode: { value: layer.mode ?? 0 },
      uBeam: { value: new THREE.Vector2(...(layer.beam || [0.3, 1.2])) }, uColor: { value: new THREE.Color(layer.color) },
    },
  });
  const pts = new THREE.Points(g, m); pts.frustumCulled = false; pts.renderOrder = layer.renderOrder ?? 2;
  return pts;
}

/* ---------- final grade pass ---------- */
const GradeShader = {
  uniforms: { tDiffuse: { value: null }, uVignette: { value: 0.3 }, uGrain: { value: 0.03 }, uTime: { value: 0 }, uLift: { value: new THREE.Vector3(0, 0, 0) } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: /* glsl */`
    uniform sampler2D tDiffuse; uniform float uVignette, uGrain, uTime; uniform vec3 uLift; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      vec2 q = vUv - 0.5; float v = 1.0 - dot(q, q) * uVignette * 2.2;
      c.rgb *= clamp(v, 0.0, 1.0);
      c.rgb += uLift;
      c.rgb += (h(vUv * 1000.0 + uTime) - 0.5) * uGrain;
      gl_FragColor = c;
    }`,
};

/* ---------- main entry ---------- */
export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { return false; }
}

export function loadImage(src) {
  return new Promise((res, rej) => { const i = new Image(); i.decoding = 'async'; i.onload = () => res(i); i.onerror = rej; i.src = src; });
}

export function createCardMaterials(artImage, renderer, theme) {
  const uniforms = { uReveal: { value: 1.2 }, uGlow: { value: 0 }, uGlowColor: { value: new THREE.Color(theme.glow || '#cfe8ff') }, uSweep: { value: -2 } };
  const art = new THREE.Texture(artImage); art.colorSpace = THREE.SRGBColorSpace; art.anisotropy = renderer.capabilities.getMaxAnisotropy(); art.needsUpdate = true;
  const surface = buildSurfaceMap(artImage); surface.anisotropy = art.anisotropy;
  const front = new THREE.MeshPhysicalMaterial({
    map: art, roughnessMap: surface, metalnessMap: surface, roughness: 1, metalness: 1,
    clearcoat: theme.clearcoat ?? 0.35, clearcoatRoughness: 0.3, envMapIntensity: theme.envIntensity ?? 1, alphaTest: 0.5,
  });
  const edge = new THREE.MeshPhysicalMaterial({ color: theme.edge || '#d8b978', metalness: 1, roughness: theme.edgeRoughness ?? 0.32, envMapIntensity: (theme.envIntensity ?? 1) * 1.15 });
  const back = new THREE.MeshStandardMaterial({ color: theme.backColor || '#0c1117', roughness: 0.7, metalness: 0 });
  patchReveal(front, uniforms); patchReveal(edge, uniforms); patchReveal(back, uniforms);
  return { materials: [front, edge, back], uniforms, art };
}

export async function mountScene(root, theme) {
  const canvas = root.querySelector('canvas');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (!canvas || !webglAvailable()) { root.classList.add('no-webgl'); return null; }
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: !!theme.transparent, powerPreference: 'high-performance' });
  } catch (e) { root.classList.add('no-webgl'); return null; }
  const mobile = () => innerWidth < 768;
  const maxDpr = () => Math.min(devicePixelRatio || 1, theme.maxDpr ?? (mobile() ? 1.5 : 1.75));
  let dpr = maxDpr();
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = theme.toneMapping === 'aces' ? THREE.ACESFilmicToneMapping : THREE.NeutralToneMapping;
  renderer.toneMappingExposure = theme.exposure ?? 1;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const dprRef = { value: dpr };

  const scene = new THREE.Scene();
  if (!theme.transparent) scene.background = new THREE.Color(theme.background);
  if (theme.fog) scene.fog = new THREE.Fog(theme.fog.color, theme.fog.near, theme.fog.far);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = theme.environmentIntensity ?? 1;
  if (theme.environmentRotation) scene.environmentRotation.set(...theme.environmentRotation);

  const camera = new THREE.PerspectiveCamera(theme.camera.fov || 30, 1, 0.05, 200);
  const target = new THREE.Vector3();

  // Lights: a key, a cool rim and a soft fill, all art-directed per theme.
  for (const l of theme.lights || []) {
    const light = l.type === 'spot' ? new THREE.SpotLight(l.color, l.intensity, 0, l.angle ?? 0.4, l.penumbra ?? 0.8, 0)
      : l.type === 'point' ? new THREE.PointLight(l.color, l.intensity, 0, 0) : new THREE.DirectionalLight(l.color, l.intensity);
    light.position.set(...l.position); scene.add(light);
    if (light.target) { light.target.position.set(...(l.target || [0, 0, 0])); scene.add(light.target); }
  }
  if (theme.ambient) scene.add(new THREE.HemisphereLight(theme.ambient.sky, theme.ambient.ground, theme.ambient.intensity));

  const rig = new THREE.Group(); scene.add(rig);      // card + its local extras
  const cardPivot = new THREE.Group(); rig.add(cardPivot);
  let card = null, cardUniforms = null;
  if (theme.card !== false) {
    const img = await loadImage(theme.cardSrc);
    const built = createCardMaterials(img, renderer, theme);
    card = new THREE.Mesh(buildCardGeometry(theme.cardGeometry), built.materials);
    cardUniforms = built.uniforms;
    cardPivot.add(card);
  }

  const layers = (theme.particles || []).map(l => {
    const count = Math.round(l.count * (mobile() ? (l.mobileScale ?? 0.45) : 1));
    const p = makeParticles({ ...l, count }, dprRef); (l.space === 'rig' ? rig : scene).add(p); return p;
  });
  const extras = theme.extras ? theme.extras({ THREE, scene, rig, cardPivot, camera, theme }) : {};

  // Post-processing.
  let composer = null, grade = null, bloom = null;
  if (theme.post !== false) {
    composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { samples: mobile() ? 2 : 4, type: THREE.HalfFloatType }));
    composer.addPass(new RenderPass(scene, camera));
    if (theme.bloom && !mobile()) { bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), theme.bloom.strength, theme.bloom.radius, theme.bloom.threshold); composer.addPass(bloom); }
    grade = new ShaderPass(GradeShader);
    grade.uniforms.uVignette.value = theme.grade?.vignette ?? 0.3; grade.uniforms.uGrain.value = theme.grade?.grain ?? 0.025;
    if (theme.grade?.lift) grade.uniforms.uLift.value.set(...theme.grade.lift);
    composer.addPass(grade);
    composer.addPass(new OutputPass());
  }

  // State.
  const st = { t: 0, intro: reduce.matches ? 1 : 0, scroll: 0, px: 0, py: 0, tx: 0, ty: 0, aspect: 1, mobile: mobile(), running: false, visible: true };
  const pose = { pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 30 };

  function resize() {
    const r = root.getBoundingClientRect();
    const w = Math.max(1, Math.round(r.width)), h = Math.max(1, Math.round(r.height));
    st.aspect = w / h; st.mobile = mobile();
    renderer.setSize(w, h, false);
    if (composer) composer.setSize(w, h);
    if (bloom) bloom.resolution.set(w / 2, h / 2);
    camera.aspect = st.aspect; camera.updateProjectionMatrix();
  }

  function frame(dt) {
    const T = st.t;
    const lay = theme.layout(st);           // where the card sits for this viewport
    rig.position.set(lay.x, lay.y, 0); rig.scale.setScalar(lay.scale);
    // Intro choreography (also defines the camera when finished).
    const I = theme.intro;
    const k = reduce.matches ? 1 : clamp(st.t / I.duration, 0, 1);
    st.intro = k;
    theme.camera.pose(pose, k, st, lay);
    // Pointer parallax, damped.
    st.px = lerp(st.px, st.tx, 0.05); st.py = lerp(st.py, st.ty, 0.05);
    camera.position.copy(pose.pos);
    camera.position.x += st.px * (theme.parallax ?? 0.12); camera.position.y += st.py * (theme.parallax ?? 0.12) * 0.6;
    target.copy(pose.look); camera.lookAt(target);
    if (camera.fov !== pose.fov) { camera.fov = pose.fov; camera.updateProjectionMatrix(); }
    if (card) {
      const c = theme.cardMotion(st, k, T);
      // Rotation is limited: the reverse is never presented.
      const yawLimit = theme.yawLimit ?? 0.42;
      cardPivot.position.set(c.x || 0, c.y || 0, c.z || 0);
      cardPivot.rotation.set(clamp((c.pitch || 0) - st.py * 0.14, -0.35, 0.35), clamp((c.yaw || 0) + st.px * 0.22, -yawLimit, yawLimit), c.roll || 0);
      cardPivot.scale.setScalar(c.scale ?? 1);
      cardUniforms.uReveal.value = reduce.matches ? 1.2 : lerp(-0.05, 1.2, ease.inOutCubic(seg(T, I.revealStart ?? 0.2, I.revealEnd ?? 1.8)));
      cardUniforms.uGlow.value = reduce.matches ? 0 : (1 - seg(T, I.revealEnd ?? 1.8, (I.revealEnd ?? 1.8) + 0.6)) * (theme.glowStrength ?? 2.2);
      cardUniforms.uSweep.value = reduce.matches ? -3 : ((T * 0.22) % 4) - 2;
    }
    for (const l of layers) { l.material.uniforms.uTime.value = reduce.matches ? 12 : T + 12; l.material.uniforms.uIntro.value = theme.particleIntro ? ease.outExpo(seg(T, 0, I.duration * 1.2)) : 1; }
    if (extras.update) extras.update(st, k, T, dt);
    if (grade) grade.uniforms.uTime.value = T % 10;
    if (composer) composer.render(); else renderer.render(scene, camera);
  }

  // Adaptive resolution: if frames are slow, reduce the pixel ratio.
  let last = performance.now(), slow = 0, raf = 0;
  function loop(now) {
    raf = 0; if (!st.running) return;
    const dt = Math.min((now - last) / 1000, 0.05); last = now;
    if (!reduce.matches) st.t += dt;
    if (dt > 0.026) { if (++slow > 45 && dpr > 1) { dpr = Math.max(1, dpr - 0.25); renderer.setPixelRatio(dpr); dprRef.value = dpr; resize(); slow = 0; } } else slow = Math.max(0, slow - 1);
    frame(dt);
    if (!reduce.matches) raf = requestAnimationFrame(loop);
  }
  function start() { if (st.running) return; st.running = true; last = performance.now(); raf = requestAnimationFrame(loop); }
  function stop() { st.running = false; if (raf) cancelAnimationFrame(raf); raf = 0; }
  const updateRun = () => { if (st.visible && !document.hidden) start(); else stop(); };

  resize();
  new ResizeObserver(() => { resize(); if (reduce.matches) frame(0); }).observe(root);
  new IntersectionObserver(e => { st.visible = e[0].isIntersecting; updateRun(); }, { threshold: 0 }).observe(root);
  document.addEventListener('visibilitychange', updateRun);
  const onScroll = () => { const h = root.offsetHeight || innerHeight; st.scroll = clamp(scrollY / h, 0, 1); if (reduce.matches) frame(0); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (!reduce.matches) addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; st.tx = (e.clientX / innerWidth) * 2 - 1; st.ty = -((e.clientY / innerHeight) * 2 - 1); }, { passive: true });
  reduce.addEventListener?.('change', () => { stop(); updateRun(); frame(0); });

  frame(0);
  root.classList.add('is-live');
  updateRun();
  if (reduce.matches) frame(0);
  return { scene, camera, renderer, stop, start, state: st };
}
