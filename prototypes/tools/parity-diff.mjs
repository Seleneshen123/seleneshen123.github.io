// Compare two content inventories (main vs rebuilt). Media are compared in
// order, per page: source, srcset variants, dimensions, alt text, caption,
// click target and grouping context. Links, embeds and warnings are compared
// as sets. Exit code 1 if any regression is found.
// usage: node tools/parity-diff.mjs <main.json> <rebuilt.json> <out.md>
import fs from 'node:fs';
const [A, B, OUT] = process.argv.slice(2);
const main = JSON.parse(fs.readFileSync(A, 'utf8')), rebuilt = JSON.parse(fs.readFileSync(B, 'utf8'));
const byPage = Object.fromEntries(rebuilt.map(p => [p.page, p]));
// The rebuilt pages sit one folder deeper (preview/c2/...), so normalise any
// relative asset path to its repository path before comparing.
const norm = s => String(s || '').replace(/^(\.\.\/)+/, '').replace(/^preview\/c2\//, '');
const ctxShape = c => String(c || '').replace(/#[\w-]+/g, '').replace(/\s+/g, ' ');
// Documented, intentional departures (CONTENT_PARITY_AUDIT.md → "Intentional differences").
const ALLOWED = {
  'cv.html': [/^media count 0 → 1$/, /^embeds  → assets\/cv\/caiyi-shen-cv\.pdf$/, /^heading outline differs$/],
};
const rows = []; let issues = 0; let checked = 0;
for (const p of main) {
  if (p.page === 'index.html') { rows.push({ page: p.page, status: 'intentional', note: 'Homepage replaced by the cinematic cover (requested). main\'s index has no media.' }); continue; }
  if (p.page === 'contact.html') {
    // Contact removed (requested); its public details must appear at the foot of the CV.
    // The contact row sits in the CV's footer (outside <main>), so check the built page itself.
    const cvFile = process.env.CV_FILE || new URL('../../preview/c2/cv.html', import.meta.url);
    const cvHtml = fs.existsSync(cvFile) ? fs.readFileSync(cvFile, 'utf8') : '';
    const ext = p.links.filter(l => l.external).map(l => l.href);
    const ok = ext.every(h => cvHtml.includes(`href="${h}"`)) && cvHtml.includes('data-copy="shen.caiy@northeastern.edu"');
    rows.push({ page: p.page, status: ok ? 'intentional' : 'REGRESSION', note: ok ? `Page removed (requested); its public contact details (email with copy button; ${ext.join(', ')}) are at the foot of cv.html.` : 'contact details missing from cv.html' });
    if (!ok) issues++; continue;
  }
  const r = byPage[p.page];
  if (!r) { rows.push({ page: p.page, status: 'MISSING PAGE' }); issues++; continue; }
  const probs = [];
  if (p.media.length !== r.media.length) probs.push(`media count ${p.media.length} → ${r.media.length}`);
  p.media.forEach((m, i) => {
    const n = r.media[i]; checked++;
    if (!n) return;
    const d = [];
    if (norm(m.src) !== norm(n.src)) d.push(`src ${m.src} → ${n.src}`);
    if (m.srcset.map(x => norm(x[0]) + ' ' + x[1]).join(',') !== n.srcset.map(x => norm(x[0]) + ' ' + x[1]).join(',')) d.push('srcset differs');
    if ((m.sizes || '') !== (n.sizes || '')) d.push('sizes differs');
    if (m.w !== n.w || m.h !== n.h) d.push(`dims ${m.w}x${m.h} → ${n.w}x${n.h}`);
    if ((m.alt ?? '') !== (n.alt ?? '')) d.push('alt differs');
    if ((m.caption || '') !== (n.caption || '')) d.push('caption differs');
    if (norm(m.link) !== norm(n.link) || m.linkKind !== n.linkKind) d.push(`target ${m.linkKind}:${m.link} → ${n.linkKind}:${n.link}`);
    if (ctxShape(m.context) !== ctxShape(n.context)) d.push(`grouping ${m.context} → ${n.context}`);
    if (n.file === 'MISSING') d.push('FILE MISSING');
    if (d.length) probs.push(`#${i + 1} ${m.src.split('/').pop()}: ${d.join('; ')}`);
  });
  const key = l => (l.external ? l.href : norm(l.href)) + '|' + l.newTab;
  const la = new Set(p.links.map(key)), lb = new Set(r.links.map(key));
  const lostLinks = [...la].filter(x => !lb.has(x) && !/\|false$/.test(x) || (!lb.has(x) && /^https?:/.test(x)));
  const lost = [...la].filter(x => !lb.has(x));
  // Links that belonged to main's masthead are replaced by the chapter nav.
  const navNames = ['index.html', 'research.html', 'game-design.html', 'art.html', 'community.html', 'cv.html', 'contact.html'];
  const realLost = lost.filter(x => !navNames.some(n => x.split('|')[0].endsWith(n)) && !x.startsWith('#main'));
  if (realLost.length) probs.push(`links lost: ${realLost.join(', ')}`);
  const ea = p.embeds.map(e => norm(e.src)).join(','), eb = r.embeds.map(e => norm(e.src)).join(',');
  if (ea !== eb) probs.push(`embeds ${ea} → ${eb}`);
  const wa = p.warnings.join('|'), wb = r.warnings.join('|');
  if (wa !== wb) probs.push(`warnings differ: ${wa} → ${wb}`);
  const ha = p.headings.join('|'), hb = r.headings.join('|');
  if (ha !== hb) probs.push('heading outline differs');
  const allowed = (ALLOWED[p.page] || []); const accepted = probs.filter(x => allowed.some(re => re.test(x))); const real = probs.filter(x => !accepted.includes(x));
  // For an accepted heading change, require main's outline to be preserved as a subsequence.
  if (accepted.includes('heading outline differs')) { let j = 0; for (const h of r.headings) if (h === p.headings[j]) j++; if (j !== p.headings.length) real.push('main heading order not preserved'); }
  if (real.length) issues += real.length;
  probs.length = 0; probs.push(...real, ...accepted.map(a => 'intentional: ' + a));
  rows.push({ page: p.page, status: real.length ? 'REGRESSION' : accepted.length ? 'match + intentional' : 'match', media: `${p.media.length}/${r.media.length}`, links: `${p.links.length}/${r.links.length}`, note: probs.join(' · ') });
}
const md = `# Content parity: main vs C2 (automated)\n\nCompared per page, in DOM order: media source, srcset, sizes, intrinsic dimensions, alt text, caption, click/lightbox target and grouping context; heading outline; links (as a set, excluding main's masthead which is replaced by the chapter navigation); embeds; content warnings. ${checked} media elements checked.\n\n| Page | Result | Media main/C2 | Links main/C2 | Notes |\n| --- | --- | --- | --- | --- |\n${rows.map(r => `| \`${r.page}\` | ${r.status} | ${r.media || ''} | ${r.links || ''} | ${(r.note || '').replace(/\|/g, '\\|')} |`).join('\n')}\n\n**Regressions: ${issues}.**\n`;
fs.writeFileSync(OUT, md);
console.log(rows.map(r => `${r.status.padEnd(12)} ${r.page}${r.note && r.status !== 'match' ? '  ' + r.note.slice(0, 300) : ''}`).join('\n'));
console.log(`\n${checked} media checked; regressions: ${issues}`);
process.exitCode = issues ? 1 : 0;
