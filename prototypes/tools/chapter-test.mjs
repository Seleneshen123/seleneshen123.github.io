// Chapter navigation test (real input events through DevTools).
// usage: node tools/chapter-test.mjs <base>   e.g. http://localhost:4191/preview/c2/
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const BASE = process.argv[2];
const EXE = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'].find(p => fs.existsSync(p));
const PORT = 9960; const sleep = ms => new Promise(r => setTimeout(r, ms));
const prof = path.resolve('.qa-profile-ch-' + Date.now());
const proc = spawn(EXE, ['--headless=new', '--enable-gpu', '--use-angle=d3d11', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
let t; for (let i = 0; i < 200 && !t; i++) { try { t = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(x => x.type === 'page' && x.url === 'about:blank'); } catch {} await sleep(150); }
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pend = new Map(); const errors = [];
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result ?? { error: m.error }); pend.delete(m.id); } if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description?.slice(0, 160)); });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async x => (await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true })).result?.value;
const url = async () => (await ev('location.pathname')).split('/').pop();
const wheel = async (n, dy = 100, gap = 40) => { for (let i = 0; i < n; i++) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: 700, y: 450, deltaX: 0, deltaY: dy }); await sleep(gap); } };
const key = async k => { const code = { PageDown: 'PageDown', ArrowDown: 'ArrowDown', ' ': 'Space' }[k]; const vk = { PageDown: 34, ArrowDown: 40, ' ': 32 }[k]; for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: k, code, windowsVirtualKeyCode: vk }); };
const go = async p => { await send('Page.navigate', { url: BASE + p }); await sleep(2500); };
for (const d of ['Page', 'Runtime']) await send(d + '.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
const R = {};

// 1. Cover → Research by deliberate scroll.
await go('index.html'); await wheel(3); await sleep(300); R.coverSmallScroll = await url();   // a little scrolling does nothing
await sleep(1200); await wheel(9); await sleep(2200); R.coverDeliberate = await url();
// 2. Back / forward.
await send('Runtime.evaluate', { expression: 'history.back()' }); await sleep(2200); R.back = await url();
await send('Runtime.evaluate', { expression: 'history.forward()' }); await sleep(2200); R.forward = await url();
// 3. Reading momentum: scroll research from top to the end in one long fling — must NOT leave the page.
await go('research.html');
await wheel(90, 120, 16); for (let i = 0; i < 40; i++) await wheel(1, Math.max(4, 120 - i * 3), 22); await sleep(300); R.momentumStays = await url();
R.reachedEnd = await ev('innerHeight + scrollY >= document.documentElement.scrollHeight - 4');
// 4. Pause at the end, then a deliberate scroll → Game Design.
await sleep(1000); await wheel(8, 100, 50); await sleep(2400); R.boundary = await url();
// 5. Keyboard at the end.
await go('community.html'); await ev('scrollTo(0, document.documentElement.scrollHeight)'); await sleep(900);
await key('PageDown'); await sleep(200); R.keyOnce = await url(); await key('PageDown'); await sleep(2400); R.keyTwice = await url();
// 6. Inside the CV PDF the wheel is never intercepted.
await go('cv.html'); await ev('scrollTo(0, document.documentElement.scrollHeight)'); await sleep(900);
const o = await ev(`(() => { const r = document.querySelector('object').getBoundingClientRect(); return { y: r.top + Math.min(r.height / 2, 200), vis: r.bottom > 0 && r.top < innerHeight }; })()`);
R.pdfVisibleAtEnd = o.vis;
// 7. Lightbox open: no chapter change.
await go('art.html'); await ev('scrollTo(0, document.documentElement.scrollHeight)'); await sleep(900);
await ev(`document.querySelector('[data-lightbox]').click()`); await sleep(400); await wheel(10, 100, 50); await sleep(1500);
R.lightboxBlocks = await url(); await ev(`document.querySelector('[data-lightbox-close]')?.click()`);
// 8. Menu links + direct URL.
await go('game-design.html#tag=tabletop'); R.directWithHash = await ev(`location.hash + ' / shown ' + [...document.querySelectorAll('[data-project]')].filter(e => !e.hidden && e.offsetParent).length`);
// 9. Reduced motion: name visible immediately, scene still.
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
await go('index.html'); R.reducedName = await ev(`getComputedStyle(document.querySelector('.cover-name .w1')).opacity`);
R.errors = errors;
console.log(JSON.stringify(R, null, 1));
try { await send('Browser.close'); } catch {}
ws.close(); proc.kill(); await sleep(500); try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
