// Card-back CONCEPTS for review. Newly created by Claude (AI assistant) —
// not the artist's original work, and not integrated into any prototype.
// Each concept is 180°-rotationally symmetric (a card back must not reveal
// orientation) and reuses the front's vocabulary: gold rim, crescents,
// four-pointed stars, compass rays and the cyan gem.
const W = 758, H = 1476, CX = W / 2, CY = H / 2;
const f = n => +n.toFixed(2);

const defs = ground => `<defs>
  <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6e8b8"/><stop offset=".32" stop-color="#d8b764"/><stop offset=".58" stop-color="#9b7431"/><stop offset=".8" stop-color="#ecd48e"/><stop offset="1" stop-color="#b48d3d"/></linearGradient>
  <linearGradient id="goldV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efd998"/><stop offset=".5" stop-color="#b38b3b"/><stop offset="1" stop-color="#efd998"/></linearGradient>
  <radialGradient id="gem" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#e9fdff"/><stop offset=".35" stop-color="#6fd6e6"/><stop offset=".8" stop-color="#1e7f97"/><stop offset="1" stop-color="#0f4b5d"/></radialGradient>
  ${ground}
  <clipPath id="card"><rect x="4" y="4" width="${W - 8}" height="${H - 8}" rx="20"/></clipPath>
</defs>`;

const star4 = (x, y, r, k = 0.18) => { const q = r * k; return `M${f(x)} ${f(y - r)}Q${f(x + q)} ${f(y - q)} ${f(x + r)} ${f(y)}Q${f(x + q)} ${f(y + q)} ${f(x)} ${f(y + r)}Q${f(x - q)} ${f(y + q)} ${f(x - r)} ${f(y)}Q${f(x - q)} ${f(y - q)} ${f(x)} ${f(y - r)}Z`; };
// Crescent opening away from the centre: dir = -1 (top, opens up) or 1 (bottom, opens down).
const crescent = (x, y, r, dir) => { const t = r * 0.62; return `M${f(x - r)} ${f(y)}A${r} ${r} 0 0 ${dir < 0 ? 0 : 1} ${f(x + r)} ${f(y)}A${r} ${f(t)} 0 0 ${dir < 0 ? 1 : 0} ${f(x - r)} ${f(y)}Z`; };
const sym = (x, y) => [[x, y], [W - x, H - y]];

const rim = () => `
  <rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="18" fill="none" stroke="url(#gold)" stroke-width="11"/>
  <rect x="34" y="34" width="${W - 68}" height="${H - 68}" rx="10" fill="none" stroke="url(#gold)" stroke-width="2"/>
  <rect x="44" y="44" width="${W - 88}" height="${H - 88}" rx="6" fill="none" stroke="#d8b764" stroke-opacity=".45" stroke-width="1"/>`;

const corners = () => [[44, 44, 1, 1], [W - 44, 44, -1, 1], [44, H - 44, 1, -1], [W - 44, H - 44, -1, -1]].map(([x, y, sx, sy]) =>
  `<path d="M${x} ${y + sy * 92}A92 92 0 0 ${sx * sy > 0 ? 1 : 0} ${x + sx * 92} ${y}" fill="none" stroke="url(#gold)" stroke-width="2"/>
   <path d="${star4(x + sx * 40, y + sy * 40, 22)}" fill="url(#gold)"/>`).join('');

const gemAt = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r + 7}" fill="none" stroke="url(#gold)" stroke-width="3"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#gem)"/>`;

function svg(body, ground) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<!-- CONCEPT — created by Claude (AI) for the artist's review. Not original artwork. -->
${defs(ground)}
<g clip-path="url(#card)">${body}</g>
</svg>`;
}

/* 1. Meridian — the front's compass, re-centred and mirrored. */
function meridian() {
  const rays = []; for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2, L = i % 2 ? 150 : 236, l0 = 66; rays.push(`<line x1="${f(CX + Math.cos(a) * l0)}" y1="${f(CY + Math.sin(a) * l0)}" x2="${f(CX + Math.cos(a) * L)}" y2="${f(CY + Math.sin(a) * L)}" stroke="#e6cd8a" stroke-opacity="${i % 2 ? .5 : .9}" stroke-width="${i % 2 ? 1 : 1.6}"/>`); }
  const ticks = []; for (let i = 0; i < 72; i++) { const a = (i / 72) * Math.PI * 2, r0 = 196, r1 = i % 6 ? 203 : 212; ticks.push(`<line x1="${f(CX + Math.cos(a) * r0)}" y1="${f(CY + Math.sin(a) * r0)}" x2="${f(CX + Math.cos(a) * r1)}" y2="${f(CY + Math.sin(a) * r1)}" stroke="#d8b764" stroke-opacity=".7" stroke-width="1"/>`); }
  const ground = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101d27"/><stop offset=".5" stop-color="#1b3340"/><stop offset="1" stop-color="#101d27"/></linearGradient>
    <radialGradient id="glow" cx=".5" cy=".5" r=".42"><stop offset="0" stop-color="#3f6c7a" stop-opacity=".55"/><stop offset="1" stop-color="#3f6c7a" stop-opacity="0"/></radialGradient>`;
  return svg(`<rect width="${W}" height="${H}" fill="url(#g)"/><rect width="${W}" height="${H}" fill="url(#glow)"/>
    ${rim()}${corners()}
    <line x1="${CX}" y1="250" x2="${CX}" y2="${CY - 240}" stroke="#d8b764" stroke-opacity=".55" stroke-dasharray="2 9"/>
    <line x1="${CX}" y1="${CY + 240}" x2="${CX}" y2="${H - 250}" stroke="#d8b764" stroke-opacity=".55" stroke-dasharray="2 9"/>
    <circle cx="${CX}" cy="${CY}" r="186" fill="none" stroke="url(#gold)" stroke-width="2.5"/><circle cx="${CX}" cy="${CY}" r="174" fill="none" stroke="#d8b764" stroke-opacity=".5"/>
    <circle cx="${CX}" cy="${CY}" r="248" fill="none" stroke="#d8b764" stroke-opacity=".28"/>
    ${ticks.join('')}${rays.join('')}
    <path d="${star4(CX, CY, 120, 0.12)}" fill="url(#gold)" fill-opacity=".9"/>
    ${gemAt(CX, CY, 22)}
    <path d="${crescent(CX, 196, 62, -1)}" fill="url(#gold)"/><path d="${crescent(CX, H - 196, 62, 1)}" fill="url(#gold)"/>
    ${[...sym(150, 330), ...sym(W - 150, 330)].map(([x, y]) => `<path d="${star4(x, y, 16)}" fill="#efd998"/>`).join('')}`, ground);
}

/* 2. Twin Crescents — an eclipse: two moons meeting at the centre. */
function twinCrescents() {
  let s = 17; const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
  const stars = []; for (let i = 0; i < 46; i++) { const x = 70 + rnd() * (W - 140), y = 70 + rnd() * (CY - 300), r = 1 + rnd() * 2.4; for (const [px, py] of sym(x, y)) stars.push(`<circle cx="${f(px)}" cy="${f(py)}" r="${f(r)}" fill="#f2e3b0" fill-opacity="${f(.4 + rnd() * .6)}"/>`); }
  const ground = `<radialGradient id="g" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#1d3a44"/><stop offset=".6" stop-color="#11232b"/><stop offset="1" stop-color="#0a151b"/></radialGradient>`;
  const chain = []; for (let i = 1; i <= 5; i++) { for (const d of [-1, 1]) { const y = CY + d * (262 + i * 56); chain.push(`<path d="${star4(CX, y, 9 + (i % 2) * 5, 0.3)}" fill="url(#gold)"/>`); } }
  return svg(`<rect width="${W}" height="${H}" fill="url(#g)"/>${stars.join('')}${rim()}${corners()}
    <circle cx="${CX}" cy="${CY}" r="232" fill="none" stroke="url(#gold)" stroke-width="2"/>
    <circle cx="${CX}" cy="${CY}" r="242" fill="none" stroke="#d8b764" stroke-opacity=".4"/>
    <path d="${crescent(CX, CY - 112, 88, -1)}" fill="url(#gold)"/><path d="${crescent(CX, CY + 112, 88, 1)}" fill="url(#gold)"/>
    <line x1="${CX - 200}" y1="${CY}" x2="${CX + 200}" y2="${CY}" stroke="#d8b764" stroke-opacity=".6"/>
    ${gemAt(CX, CY, 18)}${chain.join('')}`, ground);
}

/* 3. Lattice — a classic card-back field of four-pointed stars. */
function lattice() {
  const x0 = 64, y0 = 64, x1 = W - 64, y1 = H - 64, step = 58;
  const lines = []; for (let k = -30; k <= 60; k++) { const o = k * step; lines.push(`<line x1="${x0 + o}" y1="${y0}" x2="${x0 + o - (y1 - y0)}" y2="${y1}" /><line x1="${x0 + o}" y1="${y0}" x2="${x0 + o + (y1 - y0)}" y2="${y1}" />`); }
  const pts = []; for (let i = 0; i * step / 2 <= x1 - x0; i++) for (let j = 0; j * step / 2 <= y1 - y0; j++) { if ((i + j) % 2) continue; const x = x0 + i * step / 2, y = y0 + j * step / 2; pts.push(`<path d="${star4(x, y, (i + j) % 4 ? 5 : 9, 0.25)}"/>`); }
  const ground = `<linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#14212d"/><stop offset=".5" stop-color="#1a2d3a"/><stop offset="1" stop-color="#14212d"/></linearGradient><clipPath id="field"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="6"/></clipPath>`;
  const rays = []; for (let i = 0; i < 8; i++) { const a = (i / 8) * Math.PI * 2; rays.push(`<line x1="${CX}" y1="${CY}" x2="${f(CX + Math.cos(a) * 80)}" y2="${f(CY + Math.sin(a) * 120)}" stroke="#e6cd8a" stroke-opacity=".7"/>`); }
  return svg(`<rect width="${W}" height="${H}" fill="url(#g)"/>
    <g clip-path="url(#field)"><g stroke="#cfae5f" stroke-opacity=".32" stroke-width="1">${lines.join('')}</g><g fill="#e0c47c" fill-opacity=".78">${pts.join('')}</g></g>
    ${rim()}
    <ellipse cx="${CX}" cy="${CY}" rx="168" ry="250" fill="#0f1b25" stroke="url(#gold)" stroke-width="3"/>
    <ellipse cx="${CX}" cy="${CY}" rx="150" ry="230" fill="none" stroke="#d8b764" stroke-opacity=".5"/>
    ${rays.join('')}<path d="${star4(CX, CY, 92, 0.14)}" fill="url(#gold)"/>${gemAt(CX, CY, 16)}
    <path d="${crescent(CX, CY - 172, 34, -1)}" fill="url(#gold)"/><path d="${crescent(CX, CY + 172, 34, 1)}" fill="url(#gold)"/>`, ground);
}

/* 4. Orrery — the most restrained: orbits around an eclipsed sun. */
function orrery() {
  const ground = `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c131b"/><stop offset=".5" stop-color="#132029"/><stop offset="1" stop-color="#0c131b"/></linearGradient>
    <radialGradient id="sun" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fff2c4"/><stop offset=".5" stop-color="#ddb965"/><stop offset="1" stop-color="#8f6a2a"/></radialGradient>`;
  const orbits = [[110, 300, 0.42], [170, 430, -0.42], [240, 560, 0]].map(([rx, ry, rot]) => `<ellipse cx="${CX}" cy="${CY}" rx="${rx}" ry="${ry}" transform="rotate(${f(rot * 57.3)} ${CX} ${CY})" fill="none" stroke="#d8b764" stroke-opacity=".55" stroke-width="1.2"/>`).join('');
  const planets = [[CX + 110 * 0.7, CY - 300 * 0.71, 7], [CX - 238, CY + 30, 5], [CX + 70, CY + 420, 4]].flatMap(([x, y, r]) => sym(x, y).map(([px, py]) => `<circle cx="${f(px)}" cy="${f(py)}" r="${r}" fill="url(#gold)"/>`)).join('');
  return svg(`<rect width="${W}" height="${H}" fill="url(#g)"/>${rim()}
    ${orbits}${planets}
    <circle cx="${CX}" cy="${CY}" r="46" fill="url(#sun)"/><circle cx="${CX + 16}" cy="${CY - 10}" r="40" fill="#101b24"/>
    <circle cx="${CX}" cy="${CY}" r="60" fill="none" stroke="#d8b764" stroke-opacity=".6"/>
    ${[...sym(120, 150), ...sym(W - 120, 150)].map(([x, y]) => `<path d="${star4(x, y, 14)}" fill="#efd998"/>`).join('')}
    ${gemAt(CX, 120, 12)}${gemAt(CX, H - 120, 12)}`, ground);
}

const CONCEPTS = [
  { id: 'meridian', name: 'Meridian', render: meridian, note: "Re-centres the front's compass star inside a measured ring, with mirrored crescents at top and bottom. The closest continuation of the front design." },
  { id: 'twin-crescents', name: 'Twin Crescents', render: twinCrescents, note: 'Two crescents meet at the centre as an eclipse, with a fixed, symmetric star field. More pictorial; reads at a distance.' },
  { id: 'lattice', name: 'Lattice', render: lattice, note: 'A traditional card-back field of four-pointed stars around an oval cartouche. Hides orientation best and suits being seen many times in play.' },
  { id: 'orrery', name: 'Orrery', render: orrery, note: 'The most restrained: three orbits around an eclipsed sun. Quiet enough not to compete with the front.' },
];

function page(c) {
  const front = c.asset('assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp');
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Card-back concepts — for review</title><meta name="robots" content="noindex"><link rel="icon" href="${c.asset('assets/icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.shared('fonts.css')}"><link rel="stylesheet" href="${c.shared('base.css')}"><link rel="stylesheet" href="studio.css">
${c.importMap()}<script type="module" src="studio.js"></script></head>
<body>
<header class="head">
  <p class="k">Tarot card · reverse</p>
  <h1>Card-back concepts</h1>
  <p class="warn"><strong>Concepts for review — not original artwork.</strong> These four designs were newly created by Claude (AI assistant) to be visually compatible with the artist's original front. They are not the artist's work, are not used in any of the three prototypes, and nothing here should be published as the artist's own design unless the artist approves, revises or replaces it.</p>
</header>
<section class="viewer" aria-label="3D preview">
  <div class="stage"><canvas aria-label="3D card preview. Drag to turn the card." role="img"></canvas><p class="hint">Drag to turn · the front is the original artwork</p></div>
  <div class="controls" role="group" aria-label="Choose a back concept">${CONCEPTS.map((k, i) => `<button type="button" data-back="${k.id}.svg" aria-pressed="${i === 0}">${String(i + 1).padStart(2, '0')} ${k.name}</button>`).join('')}<button type="button" data-flip>Show back / front</button></div>
</section>
<section class="sheet" aria-label="Concepts">
  <figure class="item"><img src="${front}" width="758" height="1476" alt="The original tarot card front by the artist."><figcaption><b>Original front</b><span>Artist's artwork — reference</span></figcaption></figure>
  ${CONCEPTS.map((k, i) => `<figure class="item"><img src="${k.id}.svg" width="758" height="1476" alt="Card-back concept ${i + 1}, ${k.name} (AI-created concept)."><figcaption><b>${String(i + 1).padStart(2, '0')} ${k.name}</b><span class="tagline">Concept · created by Claude</span><span>${k.note}</span></figcaption></figure>`).join('')}
</section>
<footer class="foot"><p>All four concepts are 180° rotationally symmetric so a card's orientation cannot be read from its back. Vector source files: ${CONCEPTS.map(k => `<a href="${k.id}.svg">${k.id}.svg</a>`).join(', ')}.</p><p><a href="../index.html">← Back to the prototype comparison</a></p></footer>
</body></html>`;
}

export const pages = Object.fromEntries([['index.html', page], ...CONCEPTS.map(k => [`${k.id}.svg`, () => k.render()])]);
const static_ = ['studio.css', 'studio.js'];
export { static_ as static };
