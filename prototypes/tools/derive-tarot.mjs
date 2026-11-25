// Derive non-destructive material textures for the 3D tarot card from the
// artist's V2 front. The originals are only read, never written.
//   base-neutral : V2 with the baked rainbow gradient in the arched panel
//                  replaced by a neutral grey of the same luminance
//                  (tint sampled from the earlier tight-755 artwork)
//   surface      : G = roughness, B = metalness   (three.js packing)
//   foil         : R = foil strength, G = thin-film thickness variation
//   panel-mask   : the detected arched panel (documentation / QA)
// usage: node tools/derive-tarot.mjs <server-origin> <outDir>
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const [ORIGIN, OUT] = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });
const EXE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'].find(p => fs.existsSync(p));
const PORT = 9950; const sleep = ms => new Promise(r => setTimeout(r, ms));
const prof = path.resolve(OUT, '.prof-' + Date.now());
const proc = spawn(EXE, ['--headless=new', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--no-first-run', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });
let t; for (let i = 0; i < 200 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(x => x.type === 'page'); } catch {} await sleep(150); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pend = new Map(); ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await send('Page.navigate', { url: ORIGIN + '/index.html' }); await sleep(1200);

const expr = `(async () => {
  const load = src => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  const v2 = await load('/assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp');
  const v1 = await load('/assets/projects/generate-deeplight-games/tarot-card-design-tight-755.webp');
  const W = v2.naturalWidth, H = v2.naturalHeight;
  const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const read = (img, w, h) => { const c = cv(w, h); const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, w, h); return x.getImageData(0, 0, w, h); };
  const A = read(v2, W, H), d = A.data;
  const B = read(v1, W, H), r1 = B.data;                // earlier art, resampled to V2 size
  const hsv = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), v = mx, s = mx ? (mx - mn) / mx : 0; let h = 0; if (mx !== mn) { h = mx === r ? ((g - b) / (mx - mn)) % 6 : mx === g ? (b - r) / (mx - mn) + 2 : (r - g) / (mx - mn) + 4; h *= 60; if (h < 0) h += 360; } return [h, s, v]; };
  const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
  const isGold = (h, s, v) => h > 28 && h < 64 && s > 0.36 && v > 0.42;
  const isGem = (h, s, v) => h > 160 && h < 220 && s > 0.32 && v > 0.45;

  // 1. Top of the cream text panel: first row (scanning down the centre) where
  //    most of the inner width is cream.
  let creamTop = H;
  for (let y = Math.floor(H * 0.6); y < H; y++) { let n = 0, tot = 0; for (let x = Math.floor(W * 0.2); x < W * 0.8; x += 2) { const k = (y * W + x) * 4; const [h, s, v] = hsv(d[k], d[k + 1], d[k + 2]); tot++; if (s < 0.2 && v > 0.72) n++; } if (n / tot > 0.7) { creamTop = y; break; } }

  // 2. Flood fill the arched panel from interior seeds.
  const mask = new Uint8Array(W * H);
  const ok = i => { const k = i * 4; if (d[k + 3] < 200) return false; const y = (i / W) | 0; if (y >= creamTop - 6) return false; const [h, s, v] = hsv(d[k], d[k + 1], d[k + 2]); if (v < 0.17) return false; if (isGold(h, s, v)) return false; if (isGem(h, s, v)) return false; return true; };
  const seeds = [[W >> 1, Math.round(H * 0.3)], [Math.round(W * 0.3), Math.round(H * 0.45)], [Math.round(W * 0.7), Math.round(H * 0.45)], [Math.round(W * 0.35), Math.round(H * 0.68)], [Math.round(W * 0.65), Math.round(H * 0.68)]];
  const stack = [];
  for (const [x, y] of seeds) { const i = y * W + x; if (ok(i)) stack.push(i); }
  while (stack.length) { const i = stack.pop(); if (mask[i]) continue; if (!ok(i)) continue; mask[i] = 255; const x = i % W; if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1); if (i >= W) stack.push(i - W); if (i < W * (H - 1)) stack.push(i + W); }
  // close tiny holes (fine linework bridges) with a 1px dilation inside the panel bounds
  const m2 = mask.slice(); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!mask[i]) { let n = 0; n += mask[i - 1] ? 1 : 0; n += mask[i + 1] ? 1 : 0; n += mask[i - W] ? 1 : 0; n += mask[i + W] ? 1 : 0; if (n >= 3) { const k = i * 4; const [h, s, v] = hsv(d[k], d[k + 1], d[k + 2]); if (!isGold(h, s, v) && !isGem(h, s, v)) m2[i] = 255; } } }
  // soft edge: 1px feather
  const soft = new Float32Array(W * H); for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; soft[i] = (m2[i] * 4 + m2[i - 1] + m2[i + 1] + m2[i - W] + m2[i + W]) / (8 * 255); }

  // 3. Grey tint from the earlier artwork's panel (same mask, resampled).
  let tr = 0, tg = 0, tb = 0, tn = 0;
  for (let i = 0; i < W * H; i++) if (m2[i]) { const k = i * 4; const l = lum(r1[k], r1[k + 1], r1[k + 2]); if (l < 40 || l > 200) continue; tr += r1[k] / l; tg += r1[k + 1] / l; tb += r1[k + 2] / l; tn++; }
  let tint = tn ? [tr / tn, tg / tn, tb / tn] : [1, 1, 1];
  const tl = lum(...tint); tint = tint.map(c => c / tl);
  // keep it a neutral grey: limit chroma to a whisper
  tint = tint.map(c => 1 + Math.max(-0.035, Math.min(0.035, c - 1)));

  // 4. Base colour: replace hue/saturation in the panel, keep luminance.
  const base = new ImageData(new Uint8ClampedArray(d), W, H), bd = base.data;
  let panelPx = 0; const before = [0, 0, 0], after = [0, 0, 0];
  for (let i = 0; i < W * H; i++) { const a = soft[i]; if (a <= 0) continue; const k = i * 4; const l = lum(d[k], d[k + 1], d[k + 2]);
    const g = [l * tint[0], l * tint[1], l * tint[2]];
    for (let c = 0; c < 3; c++) bd[k + c] = d[k + c] * (1 - a) + g[c] * a;
    if (m2[i]) { panelPx++; for (let c = 0; c < 3; c++) { before[c] += d[k + c]; after[c] += bd[k + c]; } } }

  // 5. Surface (roughness G, metalness B) and foil (strength R, thickness G).
  const surf = new ImageData(W, H), sd = surf.data; const foil = new ImageData(W, H), fd = foil.data;
  const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };
  const vnoise = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi; const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), e = hash(xi + 1, yi + 1); return a + (b - a) * u + (c - a) * v + (a - b - c + e) * u * v; };
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x, k = i * 4; const [h, s, v] = hsv(bd[k], bd[k + 1], bd[k + 2]);
    let rough = 0.5, metal = 0, foilS = 0.4;
    if (isGold(h, s, v) && v > 0.55) { const q = Math.min(1, (s - 0.36) / 0.3) * Math.min(1, (v - 0.55) / 0.3); metal = 0.45 + 0.5 * q; rough = 0.34 - 0.12 * q; foilS = 0.42; }
    else if (isGem(h, s, v)) { rough = 0.12; foilS = 0.22; }
    else if (y >= creamTop - 4 && s < 0.22 && v > 0.66) { rough = 0.74; foilS = 0.16; }   // matte text panel
    else if (v < 0.18) { rough = 0.42; foilS = 0.55; }                                    // lacquered dark frame
    if (m2[i]) { rough = 0.32; foilS = 1.0; metal = Math.max(metal, 0.36); }                // the foil-stamped panel
    sd[k] = 255; sd[k + 1] = rough * 255; sd[k + 2] = metal * 255; sd[k + 3] = 255;
    // thickness: low-frequency noise + a gentle diagonal, like a stamped holographic master
    const nx = x / W, ny = y / H;
    const th = 0.6 * vnoise(nx * 2.2, ny * 3.4) + 0.4 * (0.5 + 0.5 * Math.sin((nx * 0.6 + ny * 0.8) * 6.2831 * 1.2));
    fd[k] = Math.round(foilS * 255); fd[k + 1] = Math.round(Math.min(1, Math.max(0, th)) * 255); fd[k + 2] = 0; fd[k + 3] = 255; }
  const pm = new ImageData(W, H); for (let i = 0; i < W * H; i++) { const k = i * 4; pm.data[k] = pm.data[k + 1] = pm.data[k + 2] = m2[i]; pm.data[k + 3] = 255; }
  const png = im => { const c = cv(W, H); c.getContext('2d').putImageData(im, 0, 0); return c.toDataURL('image/png'); };
  return { W, H, creamTop, panelPx, tint, meanBefore: before.map(c => Math.round(c / panelPx)), meanAfter: after.map(c => Math.round(c / panelPx)),
    base: png(base), surface: png(surf), foil: png(foil), mask: png(pm) };
})()`;
const r = (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result.value;
for (const k of ['base', 'surface', 'foil', 'mask']) fs.writeFileSync(path.join(OUT, `tarot-${k === 'base' ? 'base-neutral' : k === 'mask' ? 'panel-mask' : k}.png`), Buffer.from(r[k].split(',')[1], 'base64'));
const meta = { source: 'assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp', tintReference: 'assets/projects/generate-deeplight-games/tarot-card-design-tight-755.webp', size: [r.W, r.H], creamTop: r.creamTop, panelPixels: r.panelPx, tint: r.tint.map(v => +v.toFixed(4)), panelMeanRGB: { before: r.meanBefore, after: r.meanAfter }, generated: new Date().toISOString() };
fs.writeFileSync(path.join(OUT, 'tarot-textures.json'), JSON.stringify(meta, null, 1));
console.log(JSON.stringify(meta));
try { await send('Browser.close'); } catch {}
ws.close(); proc.kill(); await sleep(400); try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
