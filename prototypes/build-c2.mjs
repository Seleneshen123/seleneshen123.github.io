// Direction C revision ("C2") generator.
// Every page is built FROM MAIN'S OWN HTML: each page's body is carried over
// verbatim (image order, pairings, captions, lightboxes, videos, links and
// content warnings are untouched); only the masthead is replaced by the C2
// chapter navigation and asset paths are rebased for the /preview/c2/ folder.
// Layout geometry comes from main's styles.css; c2.css re-themes it.
// The homepage is the only newly authored page (a cinematic cover).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..');
const OUT = path.join(ROOT, 'preview', 'c2');
const NM = path.join(HERE, 'node_modules');
const SRC = path.join(HERE, 'src', 'c2');
const P = path.posix;
const write = (f, d) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, d); };
const copy = (a, b) => { fs.mkdirSync(path.dirname(b), { recursive: true }); fs.copyFileSync(a, b); };

export const CHAPTERS = [
  ['index.html', 'Home', '01'], ['research.html', 'Research', '02'], ['game-design.html', 'Game Design', '03'],
  ['art.html', '2D & 3D Art', '04'], ['community.html', 'Community & Content', '05'], ['cv.html', 'CV', '06'], ['contact.html', 'Contact', '07'],
];
const chapterOfHref = href => CHAPTERS.findIndex(([h]) => h === href);

/* ---------- pages on main ---------- */
const SKIP_DIRS = new Set(['assets', 'node_modules', 'preview', 'prototypes', 'docs', '.git', 'source_materials', '.claude']);
const pages = [];
(function walk(d) { for (const e of fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })) { const rel = d ? d + '/' + e.name : e.name; if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) walk(rel); } else if (e.name.endsWith('.html')) pages.push(rel); } })('');

/* ---------- path rebasing ---------- */
// A relative URL in an original page at `pageRel` → the same target from the
// rebuilt page at preview/c2/<pageRel>. Pages (.html) keep their relative
// form, because the folder structure is mirrored; everything else (assets,
// the CV PDF, favicon) is rebased onto the repository root.
function rebase(url, pageRel) {
  if (!url || /^(https?:|mailto:|tel:|data:|javascript:|#)/i.test(url)) return url;
  const m = url.match(/^([^#?]*)(.*)$/); const p = m[1], tail = m[2];
  if (!p) return url;
  const target = P.normalize(P.join(P.dirname(pageRel), p));
  if (/\.html$/i.test(p) || p.endsWith('/')) return url;
  const from = P.join('preview/c2', P.dirname(pageRel));
  return P.relative(from, target) + tail;
}
const rebaseSrcset = (v, pageRel) => v.split(',').map(s => { const [u, ...rest] = s.trim().split(/\s+/); return [rebase(u, pageRel), ...rest].join(' '); }).join(', ');
function rebaseHtml(html, pageRel) {
  return html
    .replace(/(\s(?:src|href|data-lightbox|poster|data|data-src|data-full))="([^"]*)"/gi, (_, a, v) => `${a}="${rebase(v, pageRel)}"`)
    .replace(/(\ssrcset)="([^"]*)"/gi, (_, a, v) => `${a}="${rebaseSrcset(v, pageRel)}"`)
    .replace(/url\((['"]?)([^'")]+)\1\)/g, (_, q, v) => `url(${q}${rebase(v, pageRel)}${q})`);
}

/* ---------- chrome ---------- */
const depthPrefix = pageRel => '../'.repeat(pageRel.split('/').length - 1);
function header(pageRel, currentIdx) {
  const up = depthPrefix(pageRel);
  const nav = CHAPTERS.map(([h, label, n], i) => `<a href="${up}${h}" data-chapter="${n}"${i === currentIdx ? ' aria-current="page"' : ''}><span class="cn">${n}</span><span class="cl">${label}</span></a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
<header class="c2-bar">
  <a class="c2-mark" href="${up}index.html"><span class="c2-mark-n">Caiyi Shen</span></a>
  <nav class="c2-nav" aria-label="Chapters">${nav}</nav>
  <button class="c2-menu" type="button" data-c2-menu aria-expanded="false" aria-controls="c2-index"><span>Index</span></button>
</header>
<div class="c2-index" id="c2-index" hidden>
  <nav aria-label="Chapters (menu)">${CHAPTERS.map(([h, label, n], i) => `<a href="${up}${h}"${i === currentIdx ? ' aria-current="page"' : ''}><span class="cn">${n}</span><span class="cl">${label}</span></a>`).join('')}</nav>
</div>
<div class="c2-rail" aria-hidden="true">${CHAPTERS.map((c, i) => `<i${i === currentIdx ? ' class="is-on"' : ''}></i>`).join('')}</div>
<div class="c2-atmos" aria-hidden="true"></div>`;
}

function headFor(original, pageRel, extra = '') {
  const up = depthPrefix(pageRel);
  const title = (original.match(/<title>[\s\S]*?<\/title>/i) || ['<title>Caiyi Shen</title>'])[0];
  const desc = (original.match(/<meta name="description"[^>]*>/i) || [''])[0];
  const refresh = (original.match(/<meta http-equiv="refresh"[^>]*>/i) || [''])[0];
  const canonical = (original.match(/<link rel="canonical"[^>]*>/i) || [''])[0];
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${refresh}
${title}
${desc}
${canonical}
<meta name="theme-color" content="#0a0b0d">
<meta name="robots" content="noindex">
<link rel="icon" href="${P.relative(P.join('preview/c2', P.dirname(pageRel)), 'assets/icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${up}css/fonts.css">
<link rel="stylesheet" href="${up}css/layout.css">
<link rel="stylesheet" href="${up}css/c2.css">
<script src="${up}js/site.js" defer></script>
<script src="${up}js/chapter.js" defer></script>
${extra}
</head>`;
}

/* ---------- build each page from main ---------- */
let built = 0;
const manifest = [];
for (const pageRel of pages) {
  if (pageRel === 'index.html') continue;              // the cover is authored separately
  const orig = fs.readFileSync(path.join(ROOT, pageRel), 'utf8');
  const bodyMatch = orig.match(/<body([^>]*)>([\s\S]*)<\/body>/i);
  if (!bodyMatch) continue;
  let body = bodyMatch[2];
  // Which chapter does this page belong to? Use main's own aria-current.
  const cur = (body.match(/<header class="masthead">[\s\S]*?aria-current="page"[^>]*>|<a href="([^"]+)" aria-current="page"/) || []);
  const curHref = (body.match(/<a href="([^"]+)" aria-current="page"/) || [])[1] || '';
  const currentIdx = chapterOfHref(P.basename(curHref));
  const isChapter = CHAPTERS.some(([h]) => h === pageRel);
  body = body.replace(/\s*<a class="skip-link"[^>]*>[\s\S]*?<\/a>/i, '').replace(/\s*<header class="masthead">[\s\S]*?<\/header>/i, '');
  body = rebaseHtml(body, pageRel);
  // --- Documented, intentional departures from main (see CONTENT_PARITY_AUDIT.md) ---
  // 1. Privacy: no personal location labels on institution / employer lines.
  //    (Event venues such as the GDC jam in San Francisco are event facts, not personal
  //    location, and are kept.)
  body = body.replace(/\s*<span class="dot">·<\/span>\s*(Boston, MA|Madison, WI|Houston, TX|Beijing, China)/g, '');
  // 2. CV: embedded PDF preview with a readable fallback, after main's own
  //    Download / Open links (which are kept unchanged).
  if (pageRel === 'cv.html') {
    const pdf = rebase('assets/cv/caiyi-shen-cv.pdf', pageRel);
    body = body.replace(/(<\/header>\s*<div class="cv-body">)/, `</header>
    <section class="c2-pdf" aria-labelledby="cv-preview-title">
      <div class="c2-pdf-bar"><h2 id="cv-preview-title">Preview</h2><span>caiyi-shen-cv.pdf</span></div>
      <object class="c2-pdf-frame" data="${pdf}#view=FitH" type="application/pdf" aria-label="CV PDF preview" data-no-chapter>
        <div class="c2-pdf-fallback"><p>The PDF preview is not available in this browser.</p><p><a href="${pdf}" target="_blank" rel="noopener">Open the PDF</a> or <a href="${pdf}" download>download it</a>.</p></div>
      </object>
    </section>
    <div class="cv-body">`);
  }
  // Mark the chapter's onward link so chapter.js can use it for the boundary transition.
  if (isChapter) body = body.replace(/<a class="onward-link" href="([^"]+)"/, (m, h) => `<a class="onward-link" data-next-chapter href="${h}"`);
  const chapterName = currentIdx >= 0 ? CHAPTERS[currentIdx][1] : '';
  const slug = pageRel.replace(/\.html$/, '').replace(/\//g, '-');
  const html = `<!doctype html>
<html lang="en">
${headFor(orig, pageRel)}
<body class="c2 ${isChapter ? 'is-chapter' : 'is-detail'} ch-${currentIdx >= 0 ? CHAPTERS[currentIdx][2] : '00'} pg-${slug}" data-chapter-index="${currentIdx}" data-chapter-name="${chapterName}">
${header(pageRel, currentIdx)}
${body.trim()}
</body>
</html>
`;
  write(path.join(OUT, pageRel), html); built++;
  manifest.push({ page: pageRel, chapter: chapterName, isChapter });
}

/* ---------- cover (home) ---------- */
const { cover } = await import('./src/c2/cover.mjs');
write(path.join(OUT, 'index.html'), cover({ header: header('index.html', 0), head: x => headFor('<title>Caiyi Shen — Game Designer · Researcher · Artist</title><meta name="description" content="Caiyi Shen — game design, player-experience research and original 2D/3D art.">', 'index.html', x) }));
built++;

/* ---------- static runtime ---------- */
copy(path.join(ROOT, 'styles.css'), path.join(OUT, 'css/layout.css'));           // main's approved layout, unmodified
copy(path.join(ROOT, 'script.js'), path.join(OUT, 'js/site.js'));                 // main's behaviour: filters, lightbox, video, copy
for (const f of ['c2.css']) copy(path.join(SRC, f), path.join(OUT, 'css', f));
for (const f of ['chapter.js', 'scene.js', 'tarot-engine-c2.js']) copy(path.join(SRC, f), path.join(OUT, 'js', f));
for (const f of fs.readdirSync(path.join(SRC, 'lab'))) copy(path.join(SRC, 'lab', f), path.join(OUT, 'lab', f));
// three.js (MIT) — shared with the other prototypes
const threeFiles = ['build/three.module.js', 'build/three.core.js', 'examples/jsm/postprocessing/EffectComposer.js', 'examples/jsm/postprocessing/RenderPass.js', 'examples/jsm/postprocessing/UnrealBloomPass.js', 'examples/jsm/postprocessing/ShaderPass.js', 'examples/jsm/postprocessing/OutputPass.js', 'examples/jsm/postprocessing/MaskPass.js', 'examples/jsm/postprocessing/Pass.js', 'examples/jsm/shaders/CopyShader.js', 'examples/jsm/shaders/LuminosityHighPassShader.js', 'examples/jsm/shaders/OutputShader.js', 'examples/jsm/environments/RoomEnvironment.js'];
for (const f of threeFiles) copy(path.join(NM, 'three', f), path.join(OUT, 'vendor/three', f.replace(/^build\//, '').replace(/^examples\/jsm\//, 'addons/')));
copy(path.join(NM, 'three/LICENSE'), path.join(OUT, 'vendor/three/LICENSE'));
// fonts (SIL OFL 1.1)
const fonts = [['Tenor Sans', '@fontsource/tenor-sans', 'tenor-sans-latin-400-normal.woff2', '400'], ['Geist', '@fontsource-variable/geist', 'geist-latin-wght-normal.woff2', '100 900'], ['Geist Mono', '@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2', '100 900']];
let css = '/* Self-hosted fonts, SIL Open Font License 1.1 (Fontsource) */\n';
for (const [fam, pkg, file, w] of fonts) { copy(path.join(NM, pkg, 'files', file), path.join(OUT, 'fonts', file)); copy(path.join(NM, pkg, 'LICENSE'), path.join(OUT, 'fonts', pkg.split('/').pop() + '-LICENSE.txt')); css += `@font-face{font-family:'${fam}';font-style:normal;font-display:swap;font-weight:${w};src:url(../fonts/${file}) format('woff2');}\n`; }
write(path.join(OUT, 'css/fonts.css'), css);
write(path.join(OUT, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`C2: built ${built} pages into preview/c2/`);
