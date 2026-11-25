// Content inventory of a set of HTML pages (no dependencies).
// Records, in DOM order: media (img/video/iframe/object/source) with grouping
// context, captions, lightbox/full-size targets, srcset variants and real file
// dimensions; headings; links; embeds; content warnings; layout classes.
// usage: node tools/audit-content.mjs <siteRoot> <out.json> [pagePrefix]
//   pagePrefix: inventory pages under <siteRoot>/<pagePrefix> but resolve asset
//   paths relative to each page (used for comparing a rebuilt copy).
import fs from 'node:fs';
import path from 'node:path';

const [ROOT, OUT, PREFIX = ''] = process.argv.slice(2);
const VOID = new Set(['img', 'br', 'hr', 'meta', 'link', 'input', 'source', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr']);
const attrs = s => { const o = {}; for (const m of s.matchAll(/([:\w-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) o[m[1].toLowerCase()] = m[3] ?? m[4] ?? m[5] ?? ''; return o; };
const decode = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&rsquo;|&#8217;/g, "'").replace(/&lsquo;/g, "'").replace(/&ldquo;|&rdquo;/g, '"').replace(/&mdash;|&#8212;/g, '—').replace(/&ndash;|&#8211;/g, '–').replace(/&middot;|&#183;/g, '·').replace(/&nbsp;/g, ' ').replace(/&#8599;/g, '↗').replace(/&rarr;/g, '→').replace(/&larr;/g, '←').replace(/&[a-z]+;|&#\d+;/g, '');
const clean = s => decode(s).replace(/\s+/g, ' ').trim();

function dims(file) {
  try {
    const b = fs.readFileSync(file);
    if (b[0] === 0x89) return [b.readUInt32BE(16), b.readUInt32BE(20)];
    if (b[0] === 0xff) { let i = 2; while (i < b.length) { if (b[i] !== 0xff) { i++; continue; } const m = b[i + 1]; if (m >= 0xc0 && m <= 0xc3) return [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; i += 2 + b.readUInt16BE(i + 2); } }
    if (b.toString('latin1', 8, 12) === 'WEBP') { const t = b.toString('latin1', 12, 16); if (t === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]; if (t === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]; if (t === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; } }
  } catch {}
  return null;
}

function inventory(pageRel) {
  const file = path.join(ROOT, PREFIX, pageRel);
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.posix.dirname(pageRel);
  const resolve = p => { if (!p || /^(https?:|mailto:|data:|#)/.test(p)) return p; const clean = p.split('#')[0].split('?')[0]; const abs = path.posix.normalize(path.posix.join(PREFIX ? path.posix.join(PREFIX, dir) : dir, clean)); return abs; };
  const toRepo = abs => abs ? abs.replace(/^(\.\.\/)+/, '') : abs; // normalised repo path
  const mainStart = html.search(/<main[\s>]/i), mainEnd = html.search(/<\/main>/i);
  const body = mainStart >= 0 ? html.slice(mainStart, mainEnd + 7) : html;
  const stack = []; const media = []; const headings = []; const links = []; const warnings = []; const classes = new Set(); const embeds = [];
  let section = null, heading = null;
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w-]*)([^>]*)>|([^<]+)/g; let m;
  while ((m = re.exec(body))) {
    if (m[0].startsWith('<!--')) continue;
    if (m[4] !== undefined) { const txt = m[4]; for (const el of stack) if (el.capture) el.text += txt; continue; }
    const closing = m[1] === '/', tag = m[2].toLowerCase(), a = closing ? {} : attrs(m[3]);
    if (!closing) {
      (a.class || '').split(/\s+/).filter(Boolean).forEach(c => classes.add(c));
      const el = { tag, a, text: '', capture: ['figcaption', 'h1', 'h2', 'h3', 'a', 'p', 'button', 'span', 'li', 'dd', 'dt'].includes(tag), media: [] };
      if (tag === 'section' || (tag === 'article' && a.id)) section = a.id || section;
      const ctx = () => stack.filter(e => e.a.class || e.a.id).slice(-4).map(e => e.tag + (e.a.id ? '#' + e.a.id : '') + (e.a.class ? '.' + e.a.class.trim().split(/\s+/).join('.') : '')).join(' > ');
      if (['img', 'video', 'iframe', 'object', 'source'].includes(tag)) {
        const src = a.src || a.data || '';
        const anchor = [...stack].reverse().find(e => e.tag === 'a' || (e.tag === 'button' && e.a['data-lightbox']));
        const fig = [...stack].reverse().find(e => e.tag === 'figure');
        const rec = { type: tag, src: toRepo(resolve(src)), srcset: (a.srcset || '').split(',').map(s => s.trim().split(/\s+/)).filter(x => x[0]).map(([u, w]) => [toRepo(resolve(u)), w]), sizes: a.sizes || '',
          w: +a.width || null, h: +a.height || null, alt: a.alt ?? null, loading: a.loading || '', poster: a.poster ? toRepo(resolve(a.poster)) : '',
          link: anchor ? toRepo(resolve(anchor.a.href || anchor.a['data-lightbox'])) : '', linkKind: anchor ? (anchor.a['data-lightbox'] !== undefined ? 'lightbox' : anchor.a.target === '_blank' ? 'new-tab' : 'link') : '',
          context: ctx(), section, heading, figure: fig || null, title: a.title || '' };
        if (!/^https?:/.test(rec.src) && rec.src) { const d = dims(path.join(ROOT, rec.src)); rec.file = d ? `${d[0]}x${d[1]}` : 'MISSING'; rec.ratio = d ? +(d[0] / d[1]).toFixed(3) : null; }
        if (tag === 'iframe' || tag === 'object') embeds.push({ type: tag, src: rec.src, title: a.title || a['aria-label'] || '' });
        if (tag !== 'source' || !stack.some(e => e.tag === 'picture')) media.push(rec);
        if (fig) fig.media.push(rec);
      }
      if (tag === 'a' && a.href) el.link = { href: a.href, target: a.target || '', rel: a.rel || '' };
      if (!VOID.has(tag)) stack.push(el);
    } else {
      let i = stack.length - 1; while (i >= 0 && stack[i].tag !== tag) i--; if (i < 0) continue;
      const el = stack[i]; stack.length = i;
      const text = clean(el.text);
      if (/^h[1-3]$/.test(tag)) { headings.push(tag + ': ' + text); heading = text; }
      if (tag === 'figure') { const cap = /<figcaption/.test('') ? '' : null; }
      if (tag === 'figcaption') { const fig = [...stack].reverse().find(e => e.tag === 'figure'); if (fig) fig.caption = text; }
      if (tag === 'figure') for (const r of el.media) r.caption = el.caption || '';
      if (tag === 'a' && el.link) { const ext = /^https?:/.test(el.link.href); links.push({ href: ext ? el.link.href : toRepo(resolve(el.link.href)) + (el.link.href.includes('#') ? '#' + el.link.href.split('#')[1] : ''), text: text.slice(0, 80), external: ext, newTab: el.link.target === '_blank', rel: el.link.rel }); }
      if (/(18\+|mature|content (gate|warning|notice)|trigger warning|content note)/i.test(text) && ['p', 'span', 'li', 'dd', 'a'].includes(tag)) warnings.push(text.slice(0, 160));
    }
  }
  for (const r of media) { delete r.figure; }
  const title = clean((html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '');
  return { page: pageRel, title, headings, media, embeds, links, warnings: [...new Set(warnings)], classes: [...classes].sort() };
}

const pages = [];
(function walk(d) { for (const e of fs.readdirSync(path.join(ROOT, PREFIX, d), { withFileTypes: true })) { const rel = d ? d + '/' + e.name : e.name; if (e.isDirectory()) { if (!['assets', 'node_modules', 'preview', 'prototypes', 'docs', '.git', 'source_materials', 'shared', 'textures'].includes(e.name)) walk(rel); } else if (e.name.endsWith('.html') && !rel.startsWith('lab') && !rel.includes('foil-lab')) pages.push(rel); } })('');
pages.sort();
const result = pages.map(inventory);
fs.writeFileSync(OUT, JSON.stringify(result, null, 1));
console.log(`${result.length} pages, ${result.reduce((s, p) => s + p.media.length, 0)} media, ${result.reduce((s, p) => s + p.links.filter(l => l.external).length, 0)} external links, ${result.reduce((s, p) => s + p.embeds.length, 0)} embeds, ${result.reduce((s, p) => s + p.warnings.length, 0)} warnings`);
