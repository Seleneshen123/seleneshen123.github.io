// Render the content inventory (audit-content.mjs output) as Markdown and list
// the page-specific layout rules found in main's stylesheet.
// usage: node tools/audit-report.mjs <inventory.json> <styles.css> <out.md>
import fs from 'node:fs';
const [INV, CSS, OUT] = process.argv.slice(2);
const inv = JSON.parse(fs.readFileSync(INV, 'utf8'));
const css = fs.readFileSync(CSS, 'utf8');

// Which classes are used on only one or two pages (project-specific layouts)?
const usage = {}; for (const p of inv) for (const c of p.classes) (usage[c] = usage[c] || []).push(p.page);
const ruleFor = cls => { const out = []; const re = new RegExp(`([^{}]*\\.${cls.replace(/[-]/g, '\\-')}(?![\\w-])[^{}]*)\\{([^{}]*)\\}`, 'g'); let m; while ((m = re.exec(css)) && out.length < 6) out.push(m[1].trim().replace(/\s+/g, ' ').slice(-120) + ' { ' + m[2].trim().replace(/\s+/g, ' ').slice(0, 160) + (m[2].length > 160 ? '…' : '') + ' }'); return out; };
const esc = s => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const short = (s, n) => { s = String(s ?? ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };
const wlist = srcset => srcset.length ? srcset.map(([, w]) => w).join(' ') : '—';

let md = `# Content parity audit — source of truth: \`main\` (f76c2fa)

Generated from the original HTML of every page on \`main\` by \`prototypes/tools/audit-content.mjs\` → \`docs/portfolio-redesign/audit/main-inventory.json\`, rendered by \`audit-report.mjs\`. The prototype content module (\`prototypes/src/content.mjs\`) is **not** used as a source here.

**Totals:** ${inv.length} pages · ${inv.reduce((s, p) => s + p.media.length, 0)} media elements · ${inv.reduce((s, p) => s + p.embeds.length, 0)} embedded players/documents · ${inv.reduce((s, p) => s + p.links.filter(l => l.external).length, 0)} external links · ${inv.reduce((s, p) => s + p.warnings.length, 0)} content-warning strings.

## How the revision uses this audit
The rebuilt Direction C pages are generated **from main's own page markup** (each page's \`<main>\` is carried over verbatim with only asset paths rebased). Image order, pairings, groupings, captions, lightbox targets, srcset variants, videos, links and warnings therefore come from the approved source rather than from a re-typed copy, and the same inventory run on the rebuilt pages is diffed against this one (see VISUAL_QA.md).

## Pages and URLs
| Page | Title | Media | Embeds | External links | Warnings |
| --- | --- | ---: | ---: | ---: | ---: |
${inv.map(p => `| \`${p.page}\` | ${esc(p.title)} | ${p.media.length} | ${p.embeds.length} | ${p.links.filter(l => l.external).length} | ${p.warnings.length} |`).join('\n')}

## Approved hierarchy (from main)
`;
const gd = inv.find(p => p.page === 'game-design.html');
md += `**Game Design** heading order: ${gd.headings.map(h => '`' + short(h.replace(/^h\d: /, ''), 48) + '`').join(' → ')}\n\n`;
const rs = inv.find(p => p.page === 'research.html');
md += `**Research** heading order: ${rs.headings.map(h => '`' + short(h.replace(/^h\d: /, ''), 48) + '`').join(' → ')}\n\n`;
const ar = inv.find(p => p.page === 'art.html');
md += `**Art** order: ${ar.media.map((m, i) => `${i + 1}. \`${m.src.split('/').pop()}\``).join(' · ')}\n\n`;

md += `## Project-specific layout rules on main
Classes that appear on only one or two pages, with the stylesheet rules that define them. These encode manually approved layouts (featured editorial rows, the 2D art rows, the Generate art duo, etc.) and are carried into the revision unchanged; the revision only re-themes colour, type and spacing around them.

`;
const specific = Object.entries(usage).filter(([c, pages]) => pages.length <= 2 && ruleFor(c).length).sort();
for (const [c, pages] of specific) md += `- \`.${c}\` — ${pages.map(p => '`' + p + '`').join(', ')}\n${ruleFor(c).map(r => `  - \`${esc(r)}\``).join('\n')}\n`;

md += `\n## Per-page inventory\n`;
for (const p of inv) {
  md += `\n### \`${p.page}\` — ${esc(p.title)}\n`;
  md += `Outline: ${p.headings.length ? p.headings.map(h => esc(short(h, 60))).join(' / ') : '—'}\n\n`;
  if (p.media.length) {
    md += `| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |\n| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |\n`;
    p.media.forEach((m, i) => { md += `| ${i + 1} | ${m.type} | \`${esc(m.src)}\` | ${m.file || 'external'} | ${m.ratio ?? ''} | ${wlist(m.srcset)} | ${esc(short(m.alt, 70))}${m.caption ? ' — *' + esc(short(m.caption, 60)) + '*' : ''} | ${m.link ? m.linkKind + ': `' + esc(short(m.link, 60)) + '`' : '—'} | ${esc(short(m.context, 90))} |\n`; });
  }
  if (p.embeds.length) md += `\nEmbeds: ${p.embeds.map(e => `${e.type} \`${e.src}\`${e.title ? ' ("' + esc(e.title) + '")' : ''}`).join('; ')}\n`;
  const ext = p.links.filter(l => l.external);
  if (ext.length) md += `\nExternal links: ${[...new Map(ext.map(l => [l.href, l])).values()].map(l => `[${esc(short(l.text || l.href, 40))}](${l.href})${l.newTab ? '' : ' (same tab)'}`).join(' · ')}\n`;
  if (p.warnings.length) md += `\nContent warnings: ${p.warnings.map(w => '“' + esc(w) + '”').join(' · ')}\n`;
}
fs.writeFileSync(OUT, md);
console.log('wrote', OUT, md.length, 'chars;', specific.length, 'page-specific classes');
