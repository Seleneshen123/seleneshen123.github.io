// Internal link check for a built site folder: every href/src/srcset/data
// target that is a relative URL must resolve to an existing file, and every
// #fragment on an internal page link must exist as an id on the target page.
// usage: node tools/linkcheck.mjs <siteDir> <repoRoot>
import fs from 'node:fs';
import path from 'node:path';
const [SITE, ROOT] = process.argv.slice(2).map(p => path.resolve(p));
const pages = [];
(function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) { if (!['vendor', 'fonts', 'textures', 'css', 'js'].includes(e.name)) walk(p); } else if (e.name.endsWith('.html')) pages.push(p); } })(SITE);
const ids = new Map();
const idsOf = f => { if (!ids.has(f)) { const s = fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : ''; ids.set(f, new Set([...s.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]))); } return ids.get(f); };
const bad = []; let n = 0;
for (const page of pages) {
  const html = fs.readFileSync(page, 'utf8');
  const urls = [];
  for (const m of html.matchAll(/\s(href|src|data-lightbox|data|poster)="([^"]*)"/g)) urls.push(m[2]);
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) m[1].split(',').forEach(x => urls.push(x.trim().split(/\s+/)[0]));
  for (const u of urls) {
    if (!u || /^(https?:|mailto:|tel:|data:|javascript:)/.test(u)) continue;
    n++;
    const [p0, frag] = u.split('#'); const p = p0.split('?')[0];
    const target = p ? path.resolve(path.dirname(page), decodeURIComponent(p)) : page;
    if (!fs.existsSync(target)) { bad.push(`${path.relative(SITE, page)} → ${u} (missing)`); continue; }
    if (frag && target.endsWith('.html') && !frag.startsWith('tag=') && !idsOf(target).has(frag)) bad.push(`${path.relative(SITE, page)} → ${u} (no #${frag})`);
  }
}
console.log(`${pages.length} pages, ${n} internal references, ${bad.length} broken`);
for (const b of bad) console.log('  ' + b);
process.exitCode = bad.length ? 1 : 0;
