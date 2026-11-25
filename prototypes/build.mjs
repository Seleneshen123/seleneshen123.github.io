// Static generator for the three art-direction prototypes.
// Output: ../preview (plain static files with relative paths — GitHub Pages
// compatible, no runtime framework). Run: npm run build
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as content from './src/content.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');           // repository root
const OUT = path.join(ROOT, 'preview');
const NM = path.join(HERE, 'node_modules');

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const h = (strings, ...vals) => strings.reduce((acc, s, i) => acc + s + (i < vals.length ? (Array.isArray(vals[i]) ? vals[i].join('') : (vals[i] ?? '')) : ''), '');

const write = (file, data) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, data); };
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };

/* ---------- vendor: three.js (MIT) ---------- */
const threeFiles = [
  'build/three.module.js', 'build/three.core.js',
  'examples/jsm/postprocessing/EffectComposer.js', 'examples/jsm/postprocessing/RenderPass.js', 'examples/jsm/postprocessing/UnrealBloomPass.js',
  'examples/jsm/postprocessing/ShaderPass.js', 'examples/jsm/postprocessing/OutputPass.js', 'examples/jsm/postprocessing/MaskPass.js', 'examples/jsm/postprocessing/Pass.js',
  'examples/jsm/shaders/CopyShader.js', 'examples/jsm/shaders/LuminosityHighPassShader.js', 'examples/jsm/shaders/OutputShader.js',
  'examples/jsm/environments/RoomEnvironment.js',
];
for (const f of threeFiles) copy(path.join(NM, 'three', f), path.join(OUT, 'shared/vendor/three', f.replace(/^build\//, '').replace(/^examples\/jsm\//, 'addons/')));
copy(path.join(NM, 'three/LICENSE'), path.join(OUT, 'shared/vendor/three/LICENSE'));

/* ---------- fonts: self-hosted, SIL Open Font License ---------- */
const fonts = [
  // [family, package, file, weight range, stretch range, style]
  ['Archivo', '@fontsource-variable/archivo', 'archivo-latin-standard-normal.woff2', '100 900', '62% 125%', 'normal'],
  ['IBM Plex Mono', '@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-400-normal.woff2', '400', null, 'normal'],
  ['IBM Plex Mono', '@fontsource/ibm-plex-mono', 'ibm-plex-mono-latin-500-normal.woff2', '500', null, 'normal'],
  ['Cormorant', '@fontsource-variable/cormorant', 'cormorant-latin-wght-normal.woff2', '300 700', null, 'normal'],
  ['Cormorant', '@fontsource-variable/cormorant', 'cormorant-latin-wght-italic.woff2', '300 700', null, 'italic'],
  ['Jost', '@fontsource-variable/jost', 'jost-latin-wght-normal.woff2', '100 900', null, 'normal'],
  ['Instrument Serif', '@fontsource/instrument-serif', 'instrument-serif-latin-400-normal.woff2', '400', null, 'normal'],
  ['Instrument Serif', '@fontsource/instrument-serif', 'instrument-serif-latin-400-italic.woff2', '400', null, 'italic'],
  ['Instrument Sans', '@fontsource-variable/instrument-sans', 'instrument-sans-latin-standard-normal.woff2', '400 700', '75% 100%', 'normal'],
];
let fontCss = '/* Self-hosted fonts (SIL Open Font License 1.1) — see fonts/LICENSES.md */\n';
const licenses = new Set();
for (const [fam, pkg, file, wght, wdth, style] of fonts) {
  copy(path.join(NM, pkg, 'files', file), path.join(OUT, 'shared/fonts', file));
  licenses.add(pkg);
  fontCss += `@font-face{font-family:'${fam}';font-style:${style};font-display:swap;font-weight:${wght};${wdth ? `font-stretch:${wdth};` : ''}src:url(./fonts/${file}) format('woff2');}\n`;
}
write(path.join(OUT, 'shared/fonts.css'), fontCss);
write(path.join(OUT, 'shared/fonts/LICENSES.md'), '# Font licenses\n\nAll fonts are distributed under the SIL Open Font License 1.1, installed from npm (Fontsource).\n\n' +
  [...licenses].map(p => { const lic = fs.readFileSync(path.join(NM, p, 'LICENSE'), 'utf8').split('\n').slice(0, 3).join(' '); return `- \`${p}\`: ${lic.trim()}`; }).join('\n') + '\n');

/* ---------- shared runtime ---------- */
for (const f of ['site.js', 'tarot-engine.js', 'base.css']) copy(path.join(HERE, 'src/shared', f), path.join(OUT, 'shared', f));

/* ---------- pages ---------- */
// Page context: relative paths from a page to the repo root, the preview
// root, and the direction folder.
export function ctxFor(dir, file) {
  const depth = file.split('/').length - 1;        // inside direction folder
  const toDir = '../'.repeat(depth);
  const toPreview = dir ? toDir + '../' : toDir;   // dir '' = the preview root itself
  const toRoot = toPreview + '../';
  return {
    dir, file,
    asset: p => toRoot + p,                        // repository assets
    current: p => toRoot + p,                      // a page of the current live site
    page: p => toDir + p,                          // a page in this direction
    shared: p => toPreview + 'shared/' + p,
    // WebGL capability flag (hides the poster image before first paint when the
    // 3D card will replace it) + the import map for three.js.
    importMap: () => `<script>try{var gc=document.createElement('canvas');if(gc.getContext('webgl2')||gc.getContext('webgl'))document.documentElement.classList.add('gl')}catch(e){}</script>\n<script type="importmap">${JSON.stringify({ imports: { three: toPreview + 'shared/vendor/three/three.module.js', 'three/addons/': toPreview + 'shared/vendor/three/addons/' } })}</script>`,
    content, esc, h,
  };
}

const directions = ['a', 'b', 'c'];
let count = 0;
for (const d of directions) {
  if (!fs.existsSync(path.join(HERE, 'src', d, 'templates.mjs'))) continue;
  const mod = await import(`./src/${d}/templates.mjs`);
  for (const [file, render] of Object.entries(mod.pages)) { write(path.join(OUT, d, file), render(ctxFor(d, file))); count++; }
  for (const f of mod.static || []) copy(path.join(HERE, 'src', d, f), path.join(OUT, d, f));
}
for (const extra of ['compare', 'card-backs']) {
  const p = path.join(HERE, 'src', extra, 'templates.mjs');
  if (!fs.existsSync(p)) continue;
  const mod = await import(`./src/${extra}/templates.mjs`);
  const dir = extra === 'compare' ? '' : extra;
  for (const [file, render] of Object.entries(mod.pages)) { write(path.join(OUT, dir, file), render(ctxFor(dir, file))); count++; }
  for (const f of mod.static || []) copy(path.join(HERE, 'src', extra, f), path.join(OUT, extra === 'compare' ? '' : extra, f));
}
console.log(`built ${count} pages into ${path.relative(ROOT, OUT)}/`);
