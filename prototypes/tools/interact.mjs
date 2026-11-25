// Interaction QA for one direction: keyboard focus, filters, lightbox, PDF
// embed, mobile menu, reduced motion and external-link hygiene.
// usage: node tools/interact.mjs <base-url-of-direction>   e.g. http://localhost:4190/preview/a/
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const EXE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome'].find(p => fs.existsSync(p));
const BASE = process.argv[2]; const PORT = 9800 + Math.floor(Math.random() * 150);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const prof = path.resolve('.qa-profile-' + Date.now());
const proc = spawn(EXE, ['--headless=new', '--enable-gpu', '--use-angle=d3d11', '--no-first-run', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, 'about:blank'], { stdio: 'ignore' });
let t; for (let i = 0; i < 200 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(x => x.type === 'page' && x.url === 'about:blank'); } catch {} await sleep(150); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pend = new Map(); let errors = [];
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result ?? { error: m.error }); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 200)); });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true }); return r.result?.value ?? r.exceptionDetails?.exception?.description; };
const key = async (k, code, keyCode, shift = false) => { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: k, code, windowsVirtualKeyCode: keyCode, modifiers: shift ? 8 : 0 }); };
const go = async (p, w = 1440, h = 900, mobile = false) => { await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile }); await send('Page.navigate', { url: BASE + p }); await sleep(2200); };
await send('Page.enable'); await send('Runtime.enable');
const R = {};

// 1. Keyboard: tab through the first 14 stops on home; every stop must show a focus indicator.
await go('index.html');
const stops = [];
for (let i = 0; i < 14; i++) { await key('Tab', 'Tab', 9); stops.push(await ev(`(() => { const a = document.activeElement; if (!a || a === document.body) return null; const s = getComputedStyle(a); const ring = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0; const r = a.getBoundingClientRect(); return { el: a.tagName + (a.className ? '.' + String(a.className).split(' ')[0] : ''), text: (a.textContent || a.getAttribute('aria-label') || '').trim().slice(0, 28), ring, visible: r.width > 0 && r.height > 0 }; })()`)); }
R.keyboard = { stops: stops.filter(Boolean).length, noRing: stops.filter(s => s && !s.ring).map(s => s.el + ' ' + s.text), skipFirst: stops[0]?.el };

// 2. Filters on Game Design.
await go('game-design.html');
R.filter = await ev(`(async () => { const all = document.querySelectorAll('[data-tags]').length; const b = document.querySelector('[data-filter="tabletop"]'); b.click(); await new Promise(r => setTimeout(r, 200));
  const shown = [...document.querySelectorAll('[data-tags]')].filter(e => !e.hidden).length; const status = document.querySelector('[data-filter-status]')?.textContent; const hash = location.hash;
  document.querySelector('[data-filter=""]').click(); await new Promise(r => setTimeout(r, 100)); const back = [...document.querySelectorAll('[data-tags]')].filter(e => !e.hidden).length; return { all, tabletop: shown, status, hash, restored: back === all }; })()`);

// 3. Lightbox on Art: open with click, arrow to next, Esc to close, focus returns.
await go('art.html');
R.lightbox = await ev(`(async () => { const a = document.querySelector('[data-lightbox]'); a.focus(); a.click(); await new Promise(r => setTimeout(r, 600)); const d = document.querySelector('dialog.lightbox'); const open = d.open; const img1 = d.querySelector('img').getAttribute('src');
  d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true })); await new Promise(r => setTimeout(r, 300)); const img2 = d.querySelector('img').getAttribute('src');
  const loaded = await new Promise(r => { const im = d.querySelector('img'); if (im.complete && im.naturalWidth) r(im.naturalWidth); else { im.onload = () => r(im.naturalWidth); setTimeout(() => r(0), 4000); } });
  d.close(); await new Promise(r => setTimeout(r, 100)); return { items: document.querySelectorAll('[data-lightbox]').length, open, advanced: img1 !== img2, loadedWidth: loaded, closed: !d.open, focusReturned: document.activeElement === a }; })()`);

// 4. CV: embedded PDF, download and open links, fallback content.
await go('cv.html');
R.cv = await ev(`(async () => { const o = document.querySelector('object[type="application/pdf"]'); const r = o.getBoundingClientRect(); const res = await fetch(o.data.split('#')[0]);
  return { object: !!o, size: Math.round(r.width) + 'x' + Math.round(r.height), status: res.status, type: res.headers.get('content-type'), download: !!document.querySelector('a[download][href$=".pdf"]'), openNew: !!document.querySelector('a[target=_blank][href$=".pdf"]'), fallbackLinks: o.querySelectorAll('a').length }; })()`);

// 5. Mobile menu.
await go('index.html', 390, 844, true);
R.menu = await ev(`(async () => { const b = document.querySelector('[data-menu-toggle]'); if (!b) return 'none'; const vis = getComputedStyle(b).display !== 'none'; b.click(); await new Promise(r => setTimeout(r, 700)); const p = document.getElementById(b.getAttribute('aria-controls'));
  const open = b.getAttribute('aria-expanded') === 'true' && p.hasAttribute('data-open'); const links = p.querySelectorAll('a').length; const focusIn = p.contains(document.activeElement);
  document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await new Promise(r => setTimeout(r, 300));
  return { buttonVisible: vis, open, links, focusIn, closedByEsc: b.getAttribute('aria-expanded') === 'false' }; })()`);

// 6. Reduced motion: scene renders a still frame, nothing hidden.
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await go('index.html');
R.reducedMotion = await ev(`(() => { const s = document.querySelector('.scene'); const hidden = [...document.querySelectorAll('[data-reveal]')].filter(e => getComputedStyle(e).opacity === '0').length; return { scene: s ? (s.classList.contains('is-live') ? 'live (still frame)' : s.classList.contains('no-webgl') ? 'fallback' : 'pending') : 'none', hiddenReveals: hidden }; })()`);
await send('Emulation.setEmulatedMedia', { features: [] });

// 7. External links on every page open safely.
R.external = [];
for (const p of ['index.html', 'game-design.html', 'research.html', 'community.html', 'contact.html', 'projects/generate-deeplight-games.html']) {
  await go(p);
  R.external.push(await ev(`(() => { const ext = [...document.querySelectorAll('a[href^="http"]')]; return { page: '${p}', count: ext.length, unsafe: ext.filter(a => a.target === '_blank' && !/noopener/.test(a.rel)).length }; })()`));
}
R.errors = errors.filter(Boolean);
console.log(JSON.stringify(R, null, 1));
try { await Promise.race([send('Browser.close'), sleep(3000)]); } catch {}
ws.close(); proc.kill(); await sleep(500); try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
