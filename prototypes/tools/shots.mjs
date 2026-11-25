// Visual QA capture (no dependencies): drives a locally installed Edge/Chrome
// over the DevTools protocol with GPU rendering enabled.
// usage: node tools/shots.mjs <outDir> <base-url> <WxH[,WxH...]> <page> [page...]
//   env FULL=1   also capture full-page screenshots (scaled 0.5)
//   env WAIT=ms  wait after load (default 3800, lets the intro finish)
//   env RM=1     emulate prefers-reduced-motion: reduce
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const BROWSERS = ['C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe', 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', '/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
const EXE = BROWSERS.find(p => fs.existsSync(p));
const [OUT, BASE, SIZES, ...PAGES] = process.argv.slice(2);
const PORT = 9400 + Math.floor(Math.random() * 400);
const sleep = ms => new Promise(r => setTimeout(r, ms));
fs.mkdirSync(OUT, { recursive: true });

const prof = path.resolve(OUT, '.profile-' + Date.now());
const proc = spawn(EXE, ['--headless=new', '--enable-gpu', '--use-angle=d3d11', '--ignore-gpu-blocklist', '--hide-scrollbars', '--no-first-run', '--no-default-browser-check', `--remote-debugging-port=${PORT}`, `--user-data-dir=${prof}`, ...(process.env.ARGS ? process.env.ARGS.split(' ') : []), 'about:blank'], { stdio: 'ignore' });
let target; for (let i = 0; i < 200 && !target; i++) { try { target = (await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json()).find(t => t.type === 'page' && t.url === 'about:blank'); } catch {} await sleep(150); }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r));
let id = 0; const pend = new Map(); let logs = [], failed = [];
ws.addEventListener('message', e => { const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result ?? { error: m.error }); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') logs.push('exception: ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 300));
  if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) logs.push(m.params.type + ': ' + m.params.args.map(a => a.value ?? a.description).join(' ').slice(0, 300));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') logs.push('log: ' + m.params.entry.text + ' ' + (m.params.entry.url || ''));
  if (m.method === 'Network.responseReceived' && m.params.response.status >= 400) failed.push(m.params.response.status + ' ' + m.params.response.url);
  if (m.method === 'Network.loadingFailed' && !m.params.canceled) failed.push('FAILED ' + m.params.errorText); });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async x => { const r = await send('Runtime.evaluate', { expression: x, awaitPromise: true, returnByValue: true }); return r.result?.value ?? r.exceptionDetails?.text; };
for (const d of ['Page', 'Runtime', 'Network', 'Log']) await send(d + '.enable');
await send('Network.setCacheDisabled', { cacheDisabled: true });
if (process.env.RM) await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });

const report = [];
for (const size of SIZES.split(',')) {
  const [W, H] = size.split('x').map(Number); const mobile = W < 768;
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: mobile ? 2 : 1, mobile });
  for (const p of PAGES) {
    logs = []; failed = [];
    await send('Page.navigate', { url: BASE + p + (p.includes('?') ? '&' : '?') + 'r=' + Date.now() });
    await sleep(+(process.env.WAIT || 3800));
    const name = `${W}x${H}-${p.replace(/[\\/?.=&]/g, '_').replace(/_html.*$/, '')}`;
    let s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
    fs.writeFileSync(path.join(OUT, name + '.jpg'), Buffer.from(s.data, 'base64'));
    const info = await ev(`(async () => {
      document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
      const H = document.documentElement.scrollHeight;
      for (let y = 0; y < H; y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 400));
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 6000); })));
      document.querySelectorAll('[data-reveal]').forEach(e => e.classList.add('is-in'));
      const imgs = [...document.images];
      return { title: document.title, height: document.documentElement.scrollHeight, overflowX: document.documentElement.scrollWidth > innerWidth + 1,
        broken: imgs.filter(i => i.getAttribute('src') && !(i.complete && i.naturalWidth)).map(i => i.getAttribute('src')),
        scene: (() => { const s = document.querySelector('.scene'); return s ? (s.classList.contains('is-live') ? 'live' : s.classList.contains('no-webgl') ? 'fallback' : 'pending') : 'none'; })(),
        offRight: [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 2 && getComputedStyle(e).position !== 'fixed'; }).slice(0, 4).map(e => e.tagName + '.' + String(e.className).slice(0, 30)) };
    })()`);
    if (process.env.FULL) {
      const h = Math.min(info.height, 16000);
      await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: mobile ? 2 : 1, mobile });
      s = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70, captureBeyondViewport: true, clip: { x: 0, y: 0, width: W, height: h, scale: mobile ? 0.5 : 0.5 } });
      if (s.data) fs.writeFileSync(path.join(OUT, name + '-full.jpg'), Buffer.from(s.data, 'base64'));
    }
    const row = { page: p, size, ...info, console: [...new Set(logs)], failed: [...new Set(failed)] };
    report.push(row);
    const issues = [row.overflowX && 'OVERFLOW', row.broken?.length && 'BROKEN ' + row.broken.join(' '), row.console.length && 'CONSOLE ' + row.console.join(' | '), row.failed.length && 'FAILED ' + row.failed.join(' | '), row.offRight?.length && 'offRight ' + row.offRight.join(',')].filter(Boolean);
    console.log(`${size.padEnd(9)} ${p.padEnd(42)} scene:${row.scene.padEnd(8)} h:${String(row.height).padEnd(6)} ${issues.join('  ') || 'ok'}`);
  }
}
fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 1));
try { await Promise.race([send('Browser.close'), sleep(3000)]); } catch {}
ws.close(); proc.kill(); await sleep(600); try { fs.rmSync(prof, { recursive: true, force: true }); } catch {}
