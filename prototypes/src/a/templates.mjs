// Direction A — Cinematic Futurism ("Frontier Dossier").
// Light, architectural, precise. Archivo (expanded) + IBM Plex Mono.

const NAV = [
  ['index.html', 'Index', '00'], ['research.html', 'Research', '01'], ['game-design.html', 'Game Design', '02'],
  ['art.html', '2D & 3D Art', '03'], ['community.html', 'Community', '04'], ['cv.html', 'CV', '05'], ['contact.html', 'Contact', '06'],
];

function img(c, o, { sizes = '100vw', cls = '', eager = false, alt } = {}) {
  return `<img class="${cls}" src="${c.asset(o.src)}" width="${o.w}" height="${o.h}" alt="${c.esc(alt ?? o.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fade>`;
}
const link = (c, href, rebuilt) => (rebuilt ? c.page(href) : c.current(href));
const legacy = rebuilt => (rebuilt ? '' : ' data-legacy title="Opens the current site version of this page (not rebuilt in this prototype)"');

function layout(c, { title, code, current, body, scene = false, description }) {
  const { site } = c.content;
  const nav = NAV.map(([href, label, n]) => `<a href="${c.page(href)}"${href === current ? ' aria-current="page"' : ''}><span class="n">${n}</span>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.esc(title ? `${title} — ${site.name}` : `${site.name} — ${site.rolesShort}`)}</title>
<meta name="description" content="${c.esc(description || site.statement)}">
<meta name="theme-color" content="#e6e9eb">
<meta name="robots" content="noindex">
<link rel="icon" href="${c.asset('assets/icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.shared('fonts.css')}">
<link rel="stylesheet" href="${c.shared('base.css')}">
<link rel="stylesheet" href="${c.page('a.css')}">
${scene ? c.importMap() : ''}
<script src="${c.shared('site.js')}" defer></script>
${scene ? `<script type="module" src="${c.page('scene.js')}"></script>` : ''}
</head>
<body class="a" data-code="${code}">
<a class="skip" href="#main">Skip to content</a>
<header class="bar">
  <a class="bar-mark" href="${c.page('index.html')}"><span class="mark-glyph" aria-hidden="true"></span><span>Caiyi Shen</span></a>
  <nav class="bar-nav" aria-label="Primary">${nav}</nav>
  <span class="bar-code mono" aria-hidden="true">${code}</span>
  <button class="bar-menu mono" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu">Menu</button>
</header>
<div class="menu" id="menu" role="dialog" aria-label="Site index">
  <nav aria-label="Site index (mobile)">${NAV.map(([href, label, n]) => `<a href="${c.page(href)}"${href === current ? ' aria-current="page"' : ''}><span class="mono">${n}</span>${label}</a>`).join('')}</nav>
  <p class="mono menu-foot">${c.esc(site.email)}</p>
</div>
<aside class="rail" aria-hidden="true"><span class="rail-code mono">${code}</span><span class="rail-track"><span class="rail-fill" data-scroll-progress></span></span></aside>
<main id="main">
${body}
</main>
<footer class="foot">
  <div class="foot-grid">
    <p class="mono foot-label">[ Contact ]</p>
    <a class="foot-mail" href="mailto:${site.email}">${site.email}</a>
    <ul class="foot-links mono" role="list">
      <li><a href="${c.page('cv.html')}">CV / PDF</a></li>
      <li><a href="${site.itch.href}" rel="noopener" target="_blank">itch.io ↗</a></li>
      <li><a href="${c.page('contact.html')}">Contact</a></li>
    </ul>
    <p class="mono foot-small">© <span data-year>${site.year}</span> ${site.name}. Original artwork © the artist. <span class="foot-proto">Prototype A — Cinematic Futurism</span></p>
  </div>
</footer>
</body>
</html>`;
}

const pageHead = (c, { n, label, title, lede, meta = [] }) => `
<header class="phead">
  <p class="mono eyebrow" data-reveal>[ ${n} ] ${label}</p>
  <h1 class="display" data-reveal style="--d:.05s">${title}</h1>
  <div class="phead-side" data-reveal style="--d:.12s">
    ${lede ? `<p class="lede">${lede}</p>` : ''}
    ${meta.length ? `<dl class="spec mono">${meta.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
  </div>
</header>`;

const status = s => `<span class="chip mono">${s}</span>`;

/* ---------------- Home ---------------- */
function home(c) {
  const { site, tarot, featured, research, art, community, practice } = c.content;
  const current = [
    { ...featured[0], href: link(c, featured[0].href), leg: legacy(false) },
    { ...featured[1], href: c.page(featured[1].href), leg: '' },
    { id: 'ne', title: research[0].title, subtitle: research[0].subtitle, kind: research[0].kind, role: 'Research Assistant / Programmer', period: research[0].period, img: research[0].img, href: c.current(research[0].href), leg: legacy(false) },
    { ...featured[2], href: link(c, featured[2].href), leg: legacy(false) },
  ];
  const divisions = [
    ['01', 'Research', 'Psychology, HCI and player-experience research', 'research.html', `${research.length} studies`, [research[0].img, research[2].img]],
    ['02', 'Game Design', 'Systems, gameplay and narrative design across shipped games and ongoing projects', 'game-design.html', `${featured.length + 7} projects`, [featured[1].img, featured[0].img]],
    ['03', '2D & 3D Art', 'Character, concept, UI and environment art', 'art.html', `${art.length + 3} works`, [art[0], art[3]]],
    ['04', 'Community', 'Creator partnerships, education communities and player knowledge', 'community.html', `${community.length} entries`, []],
  ];
  const exhibit = [art[0], art[2], art[3], art[5], art[6], art[4]];
  const body = `
<section class="hero" id="hero" aria-label="Introduction">
  <div class="stage scene"><canvas aria-hidden="true"></canvas>
  <img class="scene-poster" src="${c.asset(tarot.src)}" width="${tarot.w}" height="${tarot.h}" alt="${c.esc(tarot.alt)}" fetchpriority="high"></div>
  <div class="hero-grid">
    <p class="mono hero-tag" data-reveal>[ Portfolio · <span data-year>${site.year}</span> ]</p>
    <h1 class="hero-name display" data-reveal style="--d:.05s"><span>Caiyi</span><span>Shen</span></h1>
    <div class="hero-copy" data-reveal style="--d:.15s">
      <p class="mono hero-roles">${site.roles.map(r => `<span>${r}</span>`).join('')}</p>
      <p class="hero-statement">${site.statement}</p>
      <div class="hero-cta">
        <a class="btn btn-solid" href="${c.page('game-design.html')}"><span>View work</span><span aria-hidden="true">→</span></a>
        <a class="btn" href="${c.page('cv.html')}"><span>CV / PDF</span><span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <a class="hud mono" href="${c.page('projects/generate-deeplight-games.html')}#tarot">
      <span class="hud-k">Specimen 01</span><span class="hud-v">Tarot card — original artwork</span><span class="hud-v hud-dim">Generate / Deeplight Games</span>
    </a>
    <p class="mono hero-scroll" aria-hidden="true"><span class="scroll-line"></span>Scroll</p>
  </div>
</section>

<section class="block" aria-labelledby="div-h">
  <div class="block-head"><p class="mono eyebrow">[ 00 ] Index</p><h2 id="div-h" class="h2">One practice, four divisions.</h2>
  <p class="block-note">Game design, research, art and community work are presented together, with each project labelled by type and status.</p></div>
  <ol class="divisions" role="list">
    ${divisions.map(([n, t, d, href, count, imgs], i) => `
    <li data-reveal style="--d:${i * 0.06}s"><a class="division" href="${c.page(href)}">
      <span class="mono division-n">${n}</span>
      <span class="division-t display">${t}</span>
      <span class="division-d">${d}</span>
      <span class="mono division-c">${count}</span>
      <span class="division-imgs" aria-hidden="true">${imgs.map(o => `<img src="${c.asset(o.src)}" width="${o.w}" height="${o.h}" alt="" loading="lazy" decoding="async">`).join('')}</span>
      <span class="division-arrow" aria-hidden="true">→</span>
    </a></li>`).join('')}
  </ol>
</section>

<section class="block" aria-labelledby="cur-h">
  <div class="block-head"><p class="mono eyebrow">[ 01 ] Current work</p><h2 id="cur-h" class="h2">In progress, 2026.</h2></div>
  <div class="sheets">
    ${current.map((p, i) => `
    <article class="sheet sheet-${i}" data-reveal style="--d:${(i % 2) * 0.08}s">
      <a class="sheet-link" href="${p.href}"${p.leg}>
        <div class="sheet-media">${img(c, p.img, { sizes: '(min-width: 900px) 46vw, 100vw' })}</div>
        <div class="sheet-body">
          <p class="mono sheet-top"><span>${String(i + 1).padStart(2, '0')}</span>${status(p.kind)}</p>
          <h3 class="sheet-title">${p.title}</h3>
          <p class="sheet-sub">${p.subtitle}</p>
          <dl class="spec mono"><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Period</dt><dd>${p.period}</dd></div></dl>
        </div>
      </a>
    </article>`).join('')}
  </div>
</section>

<section class="block block-dark" aria-labelledby="pr-h">
  <div class="block-head"><p class="mono eyebrow">[ 02 ] Practice map</p><h2 id="pr-h" class="h2">Where the disciplines meet.</h2>
  <p class="block-note">Each discipline is listed with the projects and roles on this site that show it.</p></div>
  <table class="matrix">
    <thead class="sr-only"><tr><th>Discipline</th><th>Evidence</th></tr></thead>
    <tbody>${practice.map((p, i) => `<tr data-reveal style="--d:${i * 0.03}s"><th scope="row"><span class="mono">${String(i + 1).padStart(2, '0')}</span>${p.area}</th><td>${p.evidence.map(e => `<span class="tag mono">${e}</span>`).join('')}</td></tr>`).join('')}</tbody>
  </table>
</section>

<section class="block" aria-labelledby="ex-h">
  <div class="block-head"><p class="mono eyebrow">[ 03 ] Exhibit</p><h2 id="ex-h" class="h2">Original artwork.</h2><a class="btn" href="${c.page('art.html')}"><span>Full exhibit</span><span aria-hidden="true">→</span></a></div>
  <ul class="strip" role="list">${exhibit.map((a, i) => `<li data-reveal style="--d:${i * 0.05}s"><a href="${c.page('art.html')}#${a.id}"><span class="strip-frame">${img(c, a, { sizes: '30vw' })}</span><span class="mono strip-cap"><b>A-${String(i + 1).padStart(2, '0')}</b> ${a.title} · ${a.project}</span></a></li>`).join('')}</ul>
</section>

<section class="block" aria-labelledby="co-h">
  <div class="block-head"><p class="mono eyebrow">[ 04 ] Community</p><h2 id="co-h" class="h2">Players, creators, learners.</h2></div>
  <div class="stats">
    ${community[0].stats.map(([v, k]) => `<p class="stat" data-reveal><span class="stat-v display">${v}</span><span class="mono stat-k">${k}</span></p>`).join('')}
    <p class="stat-note">${community[0].title} creator partnership · ${community[0].meta.split('·').pop().trim()}</p>
  </div>
  <a class="btn" href="${c.page('community.html')}"><span>All community work</span><span aria-hidden="true">→</span></a>
</section>`;
  return layout(c, { code: 'IDX-00', current: 'index.html', body, scene: true });
}

/* ---------------- Game Design ---------------- */
function gameDesign(c) {
  const { featured, games, caseStudies, archive, tags } = c.content;
  const body = `
${pageHead(c, { n: '02', label: 'Game Design', title: 'Game<br>Design', lede: 'Systems, gameplay and narrative design — from client and studio work in development to earlier releases, labelled by status.', meta: [['Featured', featured.length], ['Selected games', games.length], ['Case studies', caseStudies.length], ['Earlier releases', archive.length]] })}
<div class="filters" data-filter-root>
  <p class="mono filters-k">Filter</p>
  <div class="filters-row" role="group" aria-label="Filter projects by tag">
    <button type="button" class="mono" data-filter="" aria-pressed="true">All</button>
    ${tags.map(([id, label]) => `<button type="button" class="mono" data-filter="${id}" aria-pressed="false">${label}</button>`).join('')}
  </div>
  <p class="mono filters-status" data-filter-status aria-live="polite"></p>
</div>
<section class="block" data-filter-group aria-labelledby="fw-h">
  <div class="block-head"><p class="mono eyebrow">[ A ] Featured work</p><h2 id="fw-h" class="h2">Professional & ongoing.</h2></div>
  ${featured.map((p, i) => `
  <article class="dossier${i % 2 ? ' is-flip' : ''}" data-tags="${p.tags.join(' ')}" data-reveal>
    <a class="dossier-media" href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)} tabindex="-1" aria-hidden="true">${img(c, p.img, { sizes: '(min-width: 900px) 58vw, 100vw', alt: '' })}</a>
    <div class="dossier-body">
      <p class="mono dossier-n"><span>${p.n}</span>${status(p.kind)}</p>
      <h3 class="dossier-title"><a href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)}>${p.title}</a></h3>
      <p class="dossier-sub">${p.subtitle}</p>
      <p class="dossier-text">${p.summary}</p>
      <dl class="spec mono"><div><dt>Role</dt><dd>${p.role}</dd></div><div><dt>Context</dt><dd>${p.context}</dd></div><div><dt>Period</dt><dd>${p.period}</dd></div></dl>
      <a class="btn" href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)}><span>${p.rebuilt ? 'Open project' : 'Open project (current site)'}</span><span aria-hidden="true">→</span></a>
    </div>
  </article>`).join('')}
</section>
<section class="block" data-filter-group aria-labelledby="sg-h">
  <div class="block-head"><p class="mono eyebrow">[ B ] Selected games</p><h2 id="sg-h" class="h2">Playable work.</h2></div>
  <div class="cells">
    ${games.map((g, i) => `
    <article class="cell" data-tags="${g.tags.join(' ')}" data-reveal style="--d:${i * 0.05}s">
      <a href="${c.current(g.href)}"${legacy(false)}>
        <span class="cell-media">${img(c, g.img, { sizes: '(min-width: 900px) 24vw, 50vw' })}</span>
        <span class="mono cell-n">G-${String(i + 1).padStart(2, '0')}</span>
        <span class="cell-title">${g.title}</span>
        <span class="mono cell-meta">${g.disciplines}</span>
        <span class="cell-text">${g.summary}</span>
        ${g.note ? `<span class="mono cell-note">${g.note}</span>` : ''}
      </a>
    </article>`).join('')}
  </div>
</section>
<section class="block" data-filter-group aria-labelledby="cs-h">
  <div class="block-head"><p class="mono eyebrow">[ C ] Case studies</p><h2 id="cs-h" class="h2">Process, documented.</h2></div>
  <ol class="rows" role="list">
    ${caseStudies.map(p => `
    <li class="row" data-tags="${p.tags.join(' ')}" data-reveal><a href="${c.current(p.href)}"${legacy(false)}>
      <span class="mono row-n">${p.n}</span><span class="row-media">${img(c, p.img, { sizes: '20vw' })}</span>
      <span class="row-title">${p.title}</span><span class="mono row-meta">${p.meta}</span><span class="row-text">${p.summary}</span><span class="row-arrow" aria-hidden="true">→</span>
    </a></li>`).join('')}
  </ol>
</section>
<section class="block" aria-labelledby="ar-h">
  <div class="block-head"><p class="mono eyebrow">[ D ] Archive</p><h2 id="ar-h" class="h2">Earlier releases.</h2><p class="block-note">Kept for the record. External links open itch.io.</p></div>
  <table class="archive mono"><thead><tr><th scope="col">Title</th><th scope="col">Platform</th><th scope="col">Note</th></tr></thead>
  <tbody>${archive.map(a => `<tr><td><a href="${a.href}" target="_blank" rel="noopener">${a.title} ↗</a></td><td>itch.io</td><td>${a.note || '—'}</td></tr>`).join('')}</tbody></table>
</section>`;
  return layout(c, { title: 'Game Design', code: 'GD-02', current: 'game-design.html', body });
}

/* ---------------- Research ---------------- */
function researchPage(c) {
  const { research, otherResearch } = c.content;
  const methods = [...new Set(research.flatMap(r => r.methods))];
  const body = `
${pageHead(c, { n: '01', label: 'Research', title: 'Research', lede: 'Psychology, HCI and player-experience research: how people learn, communicate and find their way through interactive systems.', meta: [['Studies', research.length], ['Labs', 'QLAB · LRT Lab · UW Child Development Lab'], ['Methods', methods.length]] })}
<section class="block" aria-labelledby="rs-h">
  <h2 id="rs-h" class="sr-only">Studies</h2>
  ${research.map((r, i) => `
  <article class="protocol" data-reveal>
    <div class="protocol-id"><span class="mono">R-${r.n}</span>${status(r.kind)}</div>
    <div class="protocol-head">
      <h3 class="protocol-title"><a href="${c.current(r.href)}"${legacy(false)}>${r.title}</a></h3>
      <p class="protocol-sub">${r.subtitle}</p>
      <dl class="spec mono"><div><dt>Lab</dt><dd>${r.lab}</dd></div><div><dt>Period</dt><dd>${r.period}</dd></div><div><dt>With</dt><dd>${r.with}</dd></div></dl>
    </div>
    <div class="protocol-q"><p class="mono protocol-k">Research question</p><p class="protocol-qt">${r.question}</p>
      <p class="mono protocol-k">Contribution</p><p class="protocol-w">${r.work}</p>
      <ul class="tags" role="list">${r.methods.map(m => `<li class="tag mono">${m}</li>`).join('')}</ul>
    </div>
    <figure class="protocol-fig">${img(c, r.img, { sizes: '(min-width: 900px) 30vw, 100vw' })}${r.imgCredit ? `<figcaption class="mono">${r.imgCredit}</figcaption>` : ''}</figure>
  </article>`).join('')}
</section>
<section class="block block-dark" aria-labelledby="ro-h">
  <div class="block-head"><p class="mono eyebrow">[ + ] Further experience</p><h2 id="ro-h" class="h2">Labs & clinical training.</h2></div>
  <ol class="rows rows-text" role="list">${otherResearch.map((r, i) => `<li class="row"><div><span class="mono row-n">${String(i + 1).padStart(2, '0')}</span><span class="row-title">${r.title}</span><span class="mono row-meta">${r.org}${r.period ? ' · ' + r.period : ''}</span><span class="row-text">${r.text}</span></div></li>`).join('')}</ol>
</section>
<section class="block" aria-labelledby="mi-h">
  <div class="block-head"><p class="mono eyebrow">[ M ] Methods index</p><h2 id="mi-h" class="h2">Methods in use.</h2></div>
  <ul class="tags tags-lg" role="list">${methods.map(m => `<li class="tag mono">${m}</li>`).join('')}</ul>
</section>`;
  return layout(c, { title: 'Research', code: 'RS-01', current: 'research.html', body });
}

/* ---------------- Art ---------------- */
function artPage(c) {
  const { art, art3d } = c.content;
  const span = a => { const r = a.w / a.h; return r > 1.6 ? 'w8' : r > 1.15 ? 'w6' : r > 0.8 ? 'w5' : 'w4'; };
  const card = (a, i, pre) => `<figure class="work ${span(a)}" id="${a.id}" data-reveal style="--d:${(i % 3) * 0.05}s">
    <a class="work-frame" href="${c.asset(a.full)}" data-lightbox data-caption="${c.esc(`${a.title} — ${a.project || a.medium}`)}">${img(c, a, { sizes: '(min-width: 900px) 40vw, 100vw' })}</a>
    <figcaption class="mono"><b>${pre}-${String(i + 1).padStart(2, '0')}</b><span>${a.title}</span><span class="dim">${a.project ? a.project + ' · ' : ''}${a.medium}</span></figcaption></figure>`;
  const body = `
${pageHead(c, { n: '03', label: '2D & 3D Art', title: 'Exhibit', lede: 'Original character, concept, UI and environment art. Select a work to view it at full size.', meta: [['2D works', art.length], ['3D works', art3d.length]] })}
<section class="block" aria-labelledby="a2-h"><div class="block-head"><p class="mono eyebrow">[ 2D ]</p><h2 id="a2-h" class="h2">Drawn & painted.</h2></div>
<div class="gallery">${art.map((a, i) => card(a, i, 'A')).join('')}</div></section>
<section class="block" aria-labelledby="a3-h"><div class="block-head"><p class="mono eyebrow">[ 3D ]</p><h2 id="a3-h" class="h2">Modelled & lit.</h2></div>
<div class="gallery">${art3d.map((a, i) => card(a, i, 'M')).join('')}</div></section>`;
  return layout(c, { title: '2D & 3D Art', code: 'AR-03', current: 'art.html', body });
}

/* ---------------- Community ---------------- */
function communityPage(c) {
  const { community } = c.content;
  const body = `
${pageHead(c, { n: '04', label: 'Community & Content', title: 'Community', lede: 'Creator partnerships, an education community and information design for players.' })}
<section class="block" aria-label="Entries">
  ${community.map(e => `
  <article class="entry" data-reveal>
    <p class="mono entry-n">${e.n}</p>
    <div class="entry-head"><h2 class="entry-title">${e.title}</h2><p class="entry-sub">${e.subtitle}</p><p class="mono entry-meta">${e.meta}</p></div>
    <div class="entry-body">
      ${e.stats ? `<div class="stats stats-inline">${e.stats.map(([v, k]) => `<p class="stat"><span class="stat-v display">${v}</span><span class="mono stat-k">${k}</span></p>`).join('')}</div>` : ''}
      <p>${e.text}</p>
      ${e.href ? `<a class="btn" href="${e.href}" target="_blank" rel="noopener"><span>Official event information</span><span aria-hidden="true">↗</span></a>` : ''}
    </div>
  </article>`).join('')}
</section>`;
  return layout(c, { title: 'Community & Content', code: 'CM-04', current: 'community.html', body });
}

/* ---------------- CV ---------------- */
function cvPage(c) {
  const { site, cv } = c.content;
  const pdf = c.asset(site.cv);
  const body = `
${pageHead(c, { n: '05', label: 'Curriculum Vitae', title: 'CV', lede: 'The PDF below is the original document. A structured summary follows for quick reading.' })}
<div class="cv-actions">
  <a class="btn btn-solid" href="${pdf}" download><span>Download PDF</span><span aria-hidden="true">↓</span></a>
  <a class="btn" href="${pdf}" target="_blank" rel="noopener"><span>Open in new tab</span><span aria-hidden="true">↗</span></a>
</div>
<section class="block" aria-labelledby="pdf-h">
  <h2 id="pdf-h" class="sr-only">CV preview</h2>
  <div class="pdf">
    <p class="mono pdf-bar"><span>caiyi-shen-cv.pdf</span><span>Preview</span></p>
    <object class="pdf-frame" data="${pdf}#view=FitH" type="application/pdf" aria-label="CV PDF preview">
      <div class="pdf-fallback"><p>The PDF preview is not available in this browser.</p><p><a href="${pdf}" target="_blank" rel="noopener">Open the PDF</a> or <a href="${pdf}" download>download it</a>.</p></div>
    </object>
  </div>
</section>
<section class="block cv" aria-labelledby="cvs-h">
  <h2 id="cvs-h" class="sr-only">Summary</h2>
  <div class="cv-col"><p class="mono eyebrow">Education</p>${cv.education.map(e => `<div class="cv-item"><p class="cv-role">${e.degree}</p><p class="cv-org">${e.school}</p><p class="mono cv-when">${e.period}</p></div>`).join('')}
  <p class="mono eyebrow">Skills</p>${cv.skills.map(([k, v]) => `<div class="cv-item"><p class="cv-role">${k}</p><p class="cv-org">${v}</p></div>`).join('')}
  <p class="mono eyebrow">Awards & accomplishments</p>${cv.awards.map(([k, v]) => `<div class="cv-item"><p class="cv-org">${k}</p><p class="mono cv-when">${v}</p></div>`).join('')}</div>
  <div class="cv-col"><p class="mono eyebrow">Research</p>${cv.research.map(r => `<div class="cv-item"><p class="cv-role">${r.role}</p><p class="cv-org">${r.org}</p><p class="mono cv-when">${r.period}</p><ul>${r.points.map(p => `<li>${p}</li>`).join('')}</ul></div>`).join('')}
  <p class="mono eyebrow">Experience</p>${cv.experience.map(r => `<div class="cv-item"><p class="cv-role">${r.role}</p><p class="cv-org">${r.org}</p><p class="mono cv-when">${r.period}</p></div>`).join('')}</div>
</section>`;
  return layout(c, { title: 'CV', code: 'CV-05', current: 'cv.html', body });
}

/* ---------------- Contact ---------------- */
function contactPage(c) {
  const { site } = c.content;
  const body = `
${pageHead(c, { n: '06', label: 'Contact', title: 'Contact', lede: 'For design, research, collaboration and professional opportunities.' })}
<section class="block contact">
  <a class="contact-mail display" href="mailto:${site.email}" data-reveal>${site.email}</a>
  <dl class="spec mono" data-reveal><div><dt>Email</dt><dd><a href="mailto:${site.email}">${site.email}</a></dd></div><div><dt>Games</dt><dd><a href="${site.itch.href}" target="_blank" rel="noopener">${site.itch.label} ↗</a></dd></div><div><dt>CV</dt><dd><a href="${c.page('cv.html')}">PDF & summary</a></dd></div></dl>
</section>`;
  return layout(c, { title: 'Contact', code: 'CT-06', current: 'contact.html', body });
}

/* ---------------- Project: Generate / Deeplight ---------------- */
function generatePage(c) {
  const { generate: g, tarot } = c.content;
  const body = `
<p class="mono back"><a href="${c.page('game-design.html')}">← Game Design</a></p>
${pageHead(c, { n: 'P-02', label: 'Featured work · Client project', title: 'Generate<span class="slash">/</span><br>Deeplight', lede: g.lede, meta: g.facts })}
<div class="cv-actions"><a class="btn" href="${g.website.href}" target="_blank" rel="noopener"><span>${g.website.label}</span><span aria-hidden="true">↗</span></a></div>
<section class="block proj" aria-labelledby="p1">
  <div class="proj-side"><p class="mono eyebrow">01</p><h2 id="p1" class="h3">Overview</h2></div>
  <div class="proj-main">${g.overview.map(p => `<p class="proj-lede">${p}</p>`).join('')}
    <figure class="plate plate-light">${img(c, g.logo, { sizes: '40vw' })}</figure></div>
</section>
<section class="block proj" aria-labelledby="p2">
  <div class="proj-side"><p class="mono eyebrow">02</p><h2 id="p2" class="h3">${g.ui.title}</h2></div>
  <div class="proj-main"><p>${g.ui.text}</p>
    <figure class="plate plate-dark"><a href="${c.asset(g.ui.img.full)}" data-lightbox data-caption="Health bar UI — Generate / Deeplight Games">${img(c, g.ui.img, { sizes: '60vw' })}</a><figcaption class="mono">Health bar UI · shown on a dark ground so its light end stays visible</figcaption></figure></div>
</section>
<section class="block proj" id="tarot" aria-labelledby="p3">
  <div class="proj-side"><p class="mono eyebrow">03</p><h2 id="p3" class="h3">${g.card.title}</h2></div>
  <div class="proj-main proj-card"><p>${g.card.text}</p>
    <figure class="plate plate-light plate-card"><a href="${c.asset('assets/projects/generate-deeplight-games/tarot-card-design-v2-838.webp')}" data-lightbox data-caption="Tarot card — Generate / Deeplight Games"><img src="${c.asset(tarot.src)}" width="${tarot.w}" height="${tarot.h}" alt="${c.esc(tarot.alt)}" loading="lazy" decoding="async" data-fade></a><figcaption class="mono">Card frame and face design · front artwork</figcaption></figure></div>
</section>
<section class="block proj" aria-labelledby="p4">
  <div class="proj-side"><p class="mono eyebrow">04</p><h2 id="p4" class="h3">${g.concepts.title}</h2></div>
  <div class="proj-main"><p>${g.concepts.text}</p></div>
  <div class="proj-wide">${g.concepts.items.map(it => `<figure class="plate plate-light" data-reveal><a href="${c.asset(it.full)}" data-lightbox data-caption="${c.esc(`Concept design ${it.n} — ${it.name}`)}">${img(c, it, { sizes: '92vw' })}</a><figcaption class="mono"><b>C-${it.n}</b> ${it.name} · character and corresponding map</figcaption></figure>`).join('')}</div>
</section>
<section class="block proj" aria-labelledby="p5">
  <div class="proj-side"><p class="mono eyebrow">05</p><h2 id="p5" class="h3">My contribution</h2></div>
  <div class="proj-main"><ol class="checklist" role="list">${g.contribution.map((x, i) => `<li><span class="mono">${String(i + 1).padStart(2, '0')}</span>${x}</li>`).join('')}</ol><p class="note">${g.shared}</p></div>
</section>
<section class="block proj" aria-labelledby="p6">
  <div class="proj-side"><p class="mono eyebrow">06</p><h2 id="p6" class="h3">Status</h2></div>
  <div class="proj-main"><p class="statusline mono">${status('In development')} ${g.status}</p></div>
</section>
<a class="next" href="${c.current(g.next.href)}"${legacy(false)}><span class="mono">Next project</span><span class="display next-t">${g.next.title}</span><span class="next-arrow" aria-hidden="true">→</span></a>`;
  return layout(c, { title: 'Generate / Deeplight Games', code: 'P-02', current: 'game-design.html', body });
}

export const pages = {
  'index.html': home, 'game-design.html': gameDesign, 'research.html': researchPage, 'art.html': artPage,
  'community.html': communityPage, 'cv.html': cvPage, 'contact.html': contactPage, 'projects/generate-deeplight-games.html': generatePage,
};
export const static_ = ['a.css', 'scene.js'];
export { static_ as static };
