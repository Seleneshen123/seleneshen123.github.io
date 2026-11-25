// Direction C — Cinematic Minimalism ("Stills").
// Near-black, negative space, film-credit typography.
// Instrument Serif (display) + Instrument Sans (interface, condensed labels).

const NAV = [['index.html', 'Home', 'Opening'], ['research.html', 'Research', 'Psychology, HCI, player experience'], ['game-design.html', 'Game Design', 'Systems, gameplay, narrative'],
  ['art.html', '2D & 3D Art', 'Characters, concepts, environments'], ['community.html', 'Community', 'Creators, learners, players'], ['cv.html', 'CV', 'Curriculum vitae'], ['contact.html', 'Contact', 'Correspondence']];

function img(c, o, { cls = '', eager = false, alt } = {}) {
  return `<img class="${cls}" src="${c.asset(o.src)}" width="${o.w}" height="${o.h}" alt="${c.esc(alt ?? o.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fade>`;
}
const link = (c, href, rebuilt) => (rebuilt ? c.page(href) : c.current(href));
const legacy = rebuilt => (rebuilt ? '' : ' data-legacy title="Opens the current site version of this page (not rebuilt in this prototype)"');
const credits = rows => `<dl class="credits">${rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

function layout(c, { title, current, section, body, scene = false, description }) {
  const { site } = c.content;
  const idx = NAV.findIndex(([h]) => h === current);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.esc(title ? `${title} — ${site.name}` : `${site.name} — ${site.rolesShort}`)}</title>
<meta name="description" content="${c.esc(description || site.statement)}">
<meta name="theme-color" content="#060708">
<meta name="robots" content="noindex">
<link rel="icon" href="${c.asset('assets/icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.shared('fonts.css')}">
<link rel="stylesheet" href="${c.shared('base.css')}">
<link rel="stylesheet" href="${c.page('c.css')}">
${scene ? c.importMap() : ''}
<script src="${c.shared('site.js')}" defer></script>
${scene ? `<script type="module" src="${c.page('scene.js')}"></script>` : ''}
</head>
<body class="c">
<a class="skip" href="#main">Skip to content</a>
<header class="corners">
  <a class="corner tl" href="${c.page('index.html')}">Caiyi Shen</a>
  <nav class="corner-nav" aria-label="Primary">${NAV.slice(1).map(([h, l]) => `<a href="${c.page(h)}"${h === current ? ' aria-current="page"' : ''}>${l}</a>`).join('')}</nav>
  <button class="corner tr" type="button" data-menu-toggle aria-expanded="false" aria-controls="index"><span class="tr-open">Index</span><span class="tr-close">Close</span></button>
  <p class="corner bl" aria-hidden="true"><span>${String(Math.max(idx, 0)).padStart(2, '0')}</span>${section}</p>
  <p class="corner br" aria-hidden="true"><span class="prog"><span data-scroll-progress></span></span></p>
</header>
<div class="index" id="index" role="dialog" aria-label="Index">
  <nav aria-label="Index">${NAV.map(([h, l, d], i) => `<a href="${c.page(h)}"${h === current ? ' aria-current="page"' : ''}><span class="ix-n">${String(i).padStart(2, '0')}</span><span class="ix-t">${l}</span><span class="ix-d">${d}</span></a>`).join('')}</nav>
  <p class="index-foot"><a href="mailto:${site.email}">${site.email}</a></p>
</div>
<main id="main">
${body}
</main>
<footer class="end">
  <p class="end-k">Correspondence</p>
  <a class="end-mail" href="mailto:${site.email}">${site.email}</a>
  ${credits([['Curriculum vitae', `<a href="${c.page('cv.html')}">PDF</a>`], ['Games', `<a href="${site.itch.href}" target="_blank" rel="noopener">${site.itch.label}</a>`], ['Artwork', 'Original work by the artist']])}
  <p class="end-small">© <span data-year>${site.year}</span> ${site.name} <span>Prototype C — Cinematic Minimalism</span></p>
</footer>
</body>
</html>`;
}

const titleCard = (c, { part, title, lede, align = '', still }) => `
<header class="tcard ${align}${still ? ' has-still' : ''}">
  <p class="label" data-reveal>${part}</p>
  <h1 class="tcard-t" data-reveal style="--d:.08s">${title}</h1>
  ${lede ? `<p class="tcard-l" data-reveal style="--d:.18s">${lede}</p>` : ''}
  ${still ? `<figure class="tcard-still" data-reveal style="--d:.25s"><span class="frame">${img(c, still, { eager: true })}</span><figcaption>${still.credit}</figcaption></figure>` : ''}
</header>`;

/* ---------------- Home ---------------- */
function home(c) {
  const { site, tarot, featured, research, art, community, practice } = c.content;
  const reels = [
    { ...featured[0], href: link(c, featured[0].href), leg: legacy(false), focus: '50% 55%' },
    { ...featured[1], href: c.page(featured[1].href), leg: '', focus: '50% 40%' },
    { ...featured[2], href: link(c, featured[2].href), leg: legacy(false), focus: '50% 58%' },
    { title: research[0].title, subtitle: research[0].subtitle, kind: research[0].kind, role: 'Research Assistant / Programmer', context: 'QLAB, Northeastern University', period: research[0].period, img: research[0].img, href: c.current(research[0].href), leg: legacy(false), focus: '50% 50%' },
  ];
  const stills = [art[0], art[2], art[3], art[5], art[4], art[6], art[7]];
  const body = `
<section class="opening" aria-label="Introduction">
  <div class="stage scene"><canvas aria-hidden="true"></canvas><img class="scene-poster" src="${c.asset(tarot.src)}" width="${tarot.w}" height="${tarot.h}" alt="${c.esc(tarot.alt)}" fetchpriority="high"></div>
  <div class="opening-text">
    <p class="label" data-reveal style="--d:1.6s">Games · Research · Art</p>
    <h1 class="opening-name" data-reveal style="--d:2s">Caiyi Shen</h1>
    <p class="opening-roles" data-reveal style="--d:2.3s">${site.roles.join(' <i>/</i> ')}</p>
  </div>
  <a class="opening-card label" href="${c.page('projects/generate-deeplight-games.html')}#tarot" data-reveal style="--d:2.6s">Tarot card — original artwork, Deeplight Games</a>
</section>

<section class="statement" aria-label="Statement">
  <p class="statement-t" data-reveal>${site.statement}</p>
  ${credits(site.education.map(e => [e.degree.split('·')[0].trim(), `${e.school}`]))}
</section>

<section class="reels" aria-labelledby="sw-h">
  <h2 id="sw-h" class="label reels-h">Selected work</h2>
  ${reels.map((p, i) => `
  <article class="reel" data-reveal>
    <a class="frame frame-wide" href="${p.href}"${p.leg} tabindex="-1" aria-hidden="true"><img src="${c.asset(p.img.src)}" width="${p.img.w}" height="${p.img.h}" alt="" loading="lazy" decoding="async" data-fade style="object-position:${p.focus}"></a>
    <div class="reel-text">
      <p class="reel-n">${String(i + 1).padStart(2, '0')}</p>
      <h3 class="reel-t"><a href="${p.href}"${p.leg}>${p.title}</a></h3>
      <p class="reel-s">${p.subtitle}</p>
      ${credits([['Role', p.role], ['Context', p.context || ''], ['Period', p.period], ['Status', p.kind]].filter(r => r[1]))}
    </div>
  </article>`).join('')}
  <p class="center"><a class="cta" href="${c.page('game-design.html')}">All game design</a><a class="cta" href="${c.page('research.html')}">All research</a></p>
</section>

<section class="practice" aria-labelledby="pr-h">
  <h2 id="pr-h" class="label">Practice</h2>
  <ol class="practice-list" role="list">${practice.map((p, i) => `<li data-reveal><span class="pl-n">${String(i + 1).padStart(2, '0')}</span><span class="pl-t">${p.area}</span><span class="pl-e">${p.evidence.join(' · ')}</span></li>`).join('')}</ol>
</section>

<section class="stills" aria-labelledby="st-h">
  <h2 id="st-h" class="label">Stills — original artwork</h2>
  <ul class="stills-row" role="list">${stills.map(a => `<li><a href="${c.page('art.html')}#${a.id}"><span class="still-img">${img(c, a)}</span><span class="still-cap">${a.title}<i>${a.project}</i></span></a></li>`).join('')}</ul>
  <p class="center"><a class="cta" href="${c.page('art.html')}">Enter the gallery</a></p>
</section>

<section class="figures" aria-labelledby="fi-h">
  <h2 id="fi-h" class="label">Community</h2>
  <div class="figures-row">${community[0].stats.map(([v, k]) => `<p class="fig" data-reveal><span>${v}</span><i>${k}</i></p>`).join('')}</div>
  <p class="figures-note">Gaming content through the NetEase Blizzard China creator partnership · ${community[0].meta.split('·').pop().trim()}</p>
  <p class="center"><a class="cta" href="${c.page('community.html')}">Community &amp; content</a></p>
</section>`;
  return layout(c, { current: 'index.html', section: 'Opening', body, scene: true });
}

/* ---------------- Game Design ---------------- */
function gameDesign(c) {
  const { featured, games, caseStudies, archive, tags } = c.content;
  const body = `
${titleCard(c, { part: 'Part two', title: 'Game Design', still: { src: 'assets/games/dueling-duet/victory-western-1300.webp', w: 1300, h: 908, alt: 'Dueling Duet victory art: the Western-fantasy duellist in a gothic hall.', credit: 'Dueling Duet — victory illustration' }, lede: 'Systems, gameplay and narrative design. Client and studio work in development, playable games, documented case studies and earlier releases — each labelled by status.' })}
<div class="toggles" data-filter-root>
  <div class="toggles-row" role="group" aria-label="Filter projects by tag"><button type="button" data-filter="" aria-pressed="true">All</button>${tags.map(([id, label]) => `<button type="button" data-filter="${id}" aria-pressed="false">${label}</button>`).join('')}</div>
  <p class="toggles-status" data-filter-status aria-live="polite"></p>
</div>
<section class="reels" data-filter-group aria-labelledby="f-h">
  <h2 id="f-h" class="label reels-h">Featured</h2>
  ${featured.map((p, i) => `
  <article class="reel" data-tags="${p.tags.join(' ')}" data-reveal>
    <a class="frame frame-wide" href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)} tabindex="-1" aria-hidden="true">${img(c, p.img, { alt: '' })}</a>
    <div class="reel-text">
      <p class="reel-n">${p.n}</p>
      <h3 class="reel-t"><a href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)}>${p.title}</a></h3>
      <p class="reel-s">${p.subtitle}</p>
      <p class="reel-d">${p.summary}</p>
      ${credits([['Role', p.role], ['Context', p.context], ['Period', p.period], ['Status', p.kind]])}
    </div>
  </article>`).join('')}
</section>
<section class="pairs" data-filter-group aria-labelledby="g-h">
  <h2 id="g-h" class="label">Selected games</h2>
  <div class="pairs-grid">${games.map(g => `
    <article class="pair" data-tags="${g.tags.join(' ')}" data-reveal><a href="${c.current(g.href)}"${legacy(false)}>
      <span class="frame frame-169">${img(c, g.img)}</span>
      <span class="pair-t">${g.title}</span><span class="pair-m">${g.disciplines}</span><span class="pair-d">${g.summary}</span>${g.note ? `<span class="pair-m">${g.note}</span>` : ''}</a></article>`).join('')}</div>
</section>
<section class="ledger" data-filter-group aria-labelledby="c-h">
  <h2 id="c-h" class="label">Case studies</h2>
  ${caseStudies.map(p => `<a class="ledger-row" href="${c.current(p.href)}"${legacy(false)} data-tags="${p.tags.join(' ')}" data-reveal><span class="lr-n">${p.n}</span><span class="lr-t">${p.title}</span><span class="lr-m">${p.meta}</span><span class="lr-d">${p.summary}</span></a>`).join('')}
</section>
<section class="ledger" aria-labelledby="a-h">
  <h2 id="a-h" class="label">Earlier releases</h2>
  <p class="ledger-note">Kept for the record. Each opens on itch.io.</p>
  ${archive.map((a, i) => `<a class="ledger-row ledger-sm" href="${a.href}" target="_blank" rel="noopener"><span class="lr-n">${String(i + 1).padStart(2, '0')}</span><span class="lr-t">${a.title}</span><span class="lr-m">itch.io${a.note ? ' · ' + a.note : ''}</span></a>`).join('')}
</section>`;
  return layout(c, { title: 'Game Design', current: 'game-design.html', section: 'Game Design', body });
}

/* ---------------- Research ---------------- */
function researchPage(c) {
  const { research, otherResearch } = c.content;
  const body = `
${titleCard(c, { part: 'Part one', title: 'Research', still: { src: 'assets/research/neural-entrainment/psychopy-part1.jpg', w: 1500, h: 988, alt: 'The PsychoPy experiment instruction screen for Part 1: the jellyfish stimulus above the text Time to relax, with instructions to sit still and press Enter when ready.', credit: 'Neural Entrainment — PsychoPy experiment, Part 1 instructions' }, lede: 'Psychology, HCI and player-experience research. Each study is set out by its question, its methods and my contribution.' })}
<section class="inquiries" aria-label="Studies">
  ${research.map((r, i) => `
  <article class="inq" data-reveal>
    <p class="inq-n">${r.n}<span>${r.kind}</span></p>
    <div class="inq-body">
      <h2 class="inq-t"><a href="${c.current(r.href)}"${legacy(false)}>${r.title}</a><span>${r.subtitle}</span></h2>
      <p class="inq-q">${r.question}</p>
      <p class="inq-w">${r.work}</p>
      ${credits([['Lab', r.lab], ['Period', r.period], ['With', r.with], ['Methods', r.methods.join(', ')]])}
    </div>
    <figure class="inq-fig"><span class="frame frame-43">${img(c, r.img)}</span>${r.imgCredit ? `<figcaption>${r.imgCredit}</figcaption>` : ''}</figure>
  </article>`).join('')}
</section>
<section class="ledger" aria-labelledby="o-h">
  <h2 id="o-h" class="label">Further experience</h2>
  ${otherResearch.map((r, i) => `<div class="ledger-row"><span class="lr-n">${String(i + 1).padStart(2, '0')}</span><span class="lr-t">${r.title}</span><span class="lr-m">${r.org}${r.period ? ' · ' + r.period : ''}</span><span class="lr-d">${r.text}</span></div>`).join('')}
</section>`;
  return layout(c, { title: 'Research', current: 'research.html', section: 'Research', body });
}

/* ---------------- Art ---------------- */
function artPage(c) {
  const { art, art3d } = c.content;
  const still = (a, i, cls = '') => `<figure class="exhibit ${cls}" id="${a.id}" data-reveal><a href="${c.asset(a.full)}" data-lightbox data-caption="${c.esc(`${a.title} — ${a.project || a.medium}`)}">${img(c, a)}</a><figcaption><span class="ex-n">${String(i + 1).padStart(2, '0')}</span><span class="ex-t">${a.title}</span><span class="ex-m">${a.project ? a.project + ' · ' : ''}${a.medium}</span></figcaption></figure>`;
  const body = `
${titleCard(c, { part: 'Part three', title: 'Stills', still: { ...c.content.art[2], credit: 'Western-fantasy duellist — Dueling Duet' }, lede: 'Original character, concept, interface and environment art, shown one at a time. Select a work to view it at full size.' })}
<section class="exhibits" aria-label="2D artwork">${art.map((a, i) => still(a, i, a.w / a.h < 0.85 ? 'is-tall' : a.w / a.h > 1.3 ? 'is-wide' : '')).join('')}</section>
<section class="exhibits-3d" aria-labelledby="d3"><h2 id="d3" class="label">Three dimensions</h2><div class="ex3-row">${art3d.map((a, i) => still(a, i)).join('')}</div></section>`;
  return layout(c, { title: '2D & 3D Art', current: 'art.html', section: 'Stills', body });
}

/* ---------------- Community ---------------- */
function communityPage(c) {
  const { community } = c.content;
  const body = `
${titleCard(c, { part: 'Part four', title: 'Community', lede: 'Creator partnerships, an education community, and information design for players.' })}
<section class="scenes" aria-label="Entries">${community.map(e => `
  <article class="scn" data-reveal>
    <p class="inq-n">${e.n}<span>${e.meta}</span></p>
    <div><h2 class="inq-t">${e.title}<span>${e.subtitle}</span></h2>
    ${e.stats ? `<div class="figures-row figures-sm">${e.stats.map(([v, k]) => `<p class="fig"><span>${v}</span><i>${k}</i></p>`).join('')}</div>` : ''}
    <p class="inq-w">${e.text}</p>${e.href ? `<a class="cta" href="${e.href}" target="_blank" rel="noopener">Official event information</a>` : ''}</div>
  </article>`).join('')}</section>`;
  return layout(c, { title: 'Community & Content', current: 'community.html', section: 'Community', body });
}

/* ---------------- CV ---------------- */
function cvPage(c) {
  const { site, cv } = c.content;
  const pdf = c.asset(site.cv);
  const body = `
${titleCard(c, { part: 'Part five', title: 'Curriculum vitae', lede: 'The original PDF, followed by a short summary.' })}
<p class="center cv-btns"><a class="cta cta-solid" href="${pdf}" download>Download PDF</a><a class="cta" href="${pdf}" target="_blank" rel="noopener">Open in a new tab</a></p>
<section class="screen" aria-label="CV preview"><object class="pdf" data="${pdf}#view=FitH" type="application/pdf" aria-label="CV PDF preview"><p class="pdf-fallback">The PDF preview is not available in this browser. <a href="${pdf}" target="_blank" rel="noopener">Open the PDF</a> or <a href="${pdf}" download>download it</a>.</p></object></section>
<section class="summary" aria-labelledby="sm-h">
  <h2 id="sm-h" class="label">Summary</h2>
  <div class="summary-grid">
    <div><h3 class="sm-h">Education</h3>${cv.education.map(e => credits([[e.period, `${e.degree}<br><span>${e.school}</span>`]])).join('')}
      <h3 class="sm-h">Awards &amp; accomplishments</h3>${credits(cv.awards.map(([k, v]) => [v, k]))}
      <h3 class="sm-h">Skills</h3>${credits(cv.skills)}</div>
    <div><h3 class="sm-h">Research</h3>${credits(cv.research.map(r => [r.period, `${r.role}<br><span>${r.org}</span>`]))}
      <h3 class="sm-h">Experience</h3>${credits(cv.experience.map(r => [r.period, `${r.role}<br><span>${r.org}</span>`]))}</div>
  </div>
</section>`;
  return layout(c, { title: 'CV', current: 'cv.html', section: 'Curriculum vitae', body });
}

/* ---------------- Contact ---------------- */
function contactPage(c) {
  const { site } = c.content;
  const body = `
${titleCard(c, { part: 'Correspondence', title: 'Contact', lede: 'For design, research, collaboration and professional opportunities.', align: 'is-center' })}
<section class="finale"><a class="finale-mail" href="mailto:${site.email}" data-reveal>${site.email}</a>
${credits([['Games', `<a href="${site.itch.href}" target="_blank" rel="noopener">${site.itch.label}</a>`], ['CV', `<a href="${c.page('cv.html')}">PDF &amp; summary</a>`]])}</section>`;
  return layout(c, { title: 'Contact', current: 'contact.html', section: 'Contact', body });
}

/* ---------------- Project: Generate ---------------- */
function generatePage(c) {
  const { generate: g, tarot } = c.content;
  const body = `
<p class="back"><a href="${c.page('game-design.html')}">Game Design</a></p>
${titleCard(c, { part: 'Featured work · 02', title: 'Generate <i>/</i> Deeplight Games', lede: g.lede })}
<div class="center">${credits(g.facts)}</div>
<p class="center"><a class="cta" href="${g.website.href}" target="_blank" rel="noopener">${g.website.label}</a></p>
<figure class="frame frame-wide frame-bleed" data-reveal><a href="${c.asset(g.concepts.items[0].full)}" data-lightbox data-caption="Concept design 01 — Paper-cutting Witch">${img(c, g.concepts.items[0], { eager: true })}</a></figure>
<article class="prose">
  <section aria-labelledby="o-h"><h2 id="o-h" class="label">Overview</h2>${g.overview.map(p => `<p class="prose-lede">${p}</p>`).join('')}<figure class="logo">${img(c, g.logo)}</figure></section>
  <section aria-labelledby="u-h"><h2 id="u-h" class="label">${g.ui.title}</h2><p>${g.ui.text}</p></section>
</article>
<figure class="wide-fig" data-reveal><a href="${c.asset(g.ui.img.full)}" data-lightbox data-caption="Health bar UI — Generate / Deeplight Games">${img(c, g.ui.img)}</a><figcaption>Health bar UI</figcaption></figure>
<article class="prose prose-card" id="tarot">
  <section aria-labelledby="t-h"><h2 id="t-h" class="label">${g.card.title}</h2><p>${g.card.text}</p></section>
  <figure class="card-still"><a href="${c.asset('assets/projects/generate-deeplight-games/tarot-card-design-v2-838.webp')}" data-lightbox data-caption="Tarot card — Generate / Deeplight Games"><img src="${c.asset(tarot.src)}" width="${tarot.w}" height="${tarot.h}" alt="${c.esc(tarot.alt)}" loading="lazy" decoding="async" data-fade></a><figcaption>Card frame and face design</figcaption></figure>
</article>
<article class="prose"><section aria-labelledby="c-h"><h2 id="c-h" class="label">${g.concepts.title}</h2><p>${g.concepts.text}</p></section></article>
${g.concepts.items.map(it => `<figure class="wide-fig wide-fig-light" data-reveal><a href="${c.asset(it.full)}" data-lightbox data-caption="${c.esc(`Concept design ${it.n} — ${it.name}`)}">${img(c, it)}</a><figcaption>${it.n} — ${it.name}, character and corresponding map</figcaption></figure>`).join('')}
<article class="prose">
  <section aria-labelledby="k-h"><h2 id="k-h" class="label">My contribution</h2><ul class="dashes" role="list">${g.contribution.map(x => `<li>${x}</li>`).join('')}</ul><p class="prose-note">${g.shared}</p></section>
  <section aria-labelledby="s-h"><h2 id="s-h" class="label">Status</h2><p>${g.status}</p></section>
</article>
<a class="next" href="${c.current(g.next.href)}"${legacy(false)}><span class="label">Next</span><span class="next-t">${g.next.title}</span></a>`;
  return layout(c, { title: 'Generate / Deeplight Games', current: 'game-design.html', section: 'Game Design · 02', body });
}

export const pages = {
  'index.html': home, 'game-design.html': gameDesign, 'research.html': researchPage, 'art.html': artPage,
  'community.html': communityPage, 'cv.html': cvPage, 'contact.html': contactPage, 'projects/generate-deeplight-games.html': generatePage,
};
const static_ = ['c.css', 'scene.js'];
export { static_ as static };
