// Direction B — Ethereal Fantasy ("Night Tide").
// Atmospheric, layered, luminous. Cormorant (display) + Jost (interface).

const NAV = [['index.html', 'Home'], ['research.html', 'Research'], ['game-design.html', 'Game Design'], ['art.html', 'Art'], ['community.html', 'Community'], ['cv.html', 'CV'], ['contact.html', 'Contact']];
const ROMAN = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];

function img(c, o, { cls = '', eager = false, alt } = {}) {
  return `<img class="${cls}" src="${c.asset(o.src)}" width="${o.w}" height="${o.h}" alt="${c.esc(alt ?? o.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" data-fade>`;
}
const link = (c, href, rebuilt) => (rebuilt ? c.page(href) : c.current(href));
const legacy = rebuilt => (rebuilt ? '' : ' data-legacy title="Opens the current site version of this page (not rebuilt in this prototype)"');
const frame = (inner, cls = '') => `<span class="echo ${cls}">${inner}</span>`;

function layout(c, { title, current, body, home = false, description, chapter }) {
  const { site } = c.content;
  const nav = NAV.map(([href, label]) => `<a href="${c.page(href)}"${href === current ? ' aria-current="page"' : ''}>${label}</a>`).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${c.esc(title ? `${title} — ${site.name}` : `${site.name} — ${site.rolesShort}`)}</title>
<meta name="description" content="${c.esc(description || site.statement)}">
<meta name="theme-color" content="#070c11">
<meta name="robots" content="noindex">
<link rel="icon" href="${c.asset('assets/icons/favicon.svg')}" type="image/svg+xml">
<link rel="stylesheet" href="${c.shared('fonts.css')}">
<link rel="stylesheet" href="${c.shared('base.css')}">
<link rel="stylesheet" href="${c.page('b.css')}">
${c.importMap()}
<script src="${c.shared('site.js')}" defer></script>
<script type="module" src="${c.page('scene.js')}"></script>
</head>
<body class="b${home ? ' is-home' : ''}">
<a class="skip" href="#main">Skip to content</a>
<div class="sky scene" data-scene="${home ? 'home' : 'atmosphere'}" aria-hidden="true"><canvas></canvas>${home ? `<img class="scene-poster" src="${c.asset(c.content.tarot.src)}" width="${c.content.tarot.w}" height="${c.content.tarot.h}" alt="">` : ''}</div>
<div class="veil" aria-hidden="true"></div>
<header class="top">
  <a class="sig" href="${c.page('index.html')}"><span class="sig-mark" aria-hidden="true">C<i>S</i></span><span class="sig-name">Caiyi Shen</span></a>
  <nav class="top-nav" aria-label="Primary">${nav}</nav>
  <button class="top-menu" type="button" data-menu-toggle aria-expanded="false" aria-controls="menu"><span>Menu</span></button>
</header>
<div class="menu" id="menu" role="dialog" aria-label="Site navigation">
  <nav aria-label="Site navigation (mobile)">${NAV.map(([href, label], i) => `<a href="${c.page(href)}"${href === current ? ' aria-current="page"' : ''}><i>${ROMAN[i]}</i>${label}</a>`).join('')}</nav>
</div>
<main id="main">
${body}
</main>
<footer class="foot">
  <p class="foot-k">Correspondence</p>
  <a class="foot-mail" href="mailto:${site.email}">${site.email}</a>
  <nav class="foot-nav" aria-label="Footer">${NAV.slice(1).map(([href, label]) => `<a href="${c.page(href)}">${label}</a>`).join('')}<a href="${site.itch.href}" target="_blank" rel="noopener">itch.io ↗</a></nav>
  <p class="foot-small">© <span data-year>${site.year}</span> ${site.name} · All artwork shown is original work by the artist · <span>Prototype B — Ethereal Fantasy</span></p>
</footer>
</body>
</html>`;
}

const chapterHead = (c, { roman, label, title, lede, art }) => `
<header class="chead">
  <p class="kicker" data-reveal><i>${roman}</i><span>${label}</span></p>
  <h1 class="chead-t" data-reveal style="--d:.06s">${title}</h1>
  ${lede ? `<p class="chead-l" data-reveal style="--d:.14s">${lede}</p>` : ''}
  ${art ? `<figure class="chead-art" data-reveal style="--d:.2s">${frame(img(c, art, { eager: true }))}<figcaption>${art.credit}</figcaption></figure>` : ''}
</header>`;

const kind = k => `<span class="kind">${k}</span>`;

/* ---------------- Home ---------------- */
function home(c) {
  const { site, tarot, featured, research, art, community } = c.content;
  const pillars = [
    ['Game Design', 'Systems, gameplay and narrative — from a client roguelike and a studio management game to tabletop learning.', 'game-design.html', featured[1].img],
    ['Research', 'Psychology and HCI: child-friendly EEG experiments, communication support for autistic adults, think-aloud playtesting.', 'research.html', research[0].img],
    ['Art', 'Characters, concepts, interface and environments, in 2D and 3D.', 'art.html', art[2]],
  ];
  const chapters = [featured[0], featured[1], featured[2]];
  const gallery = [art[0], art[2], art[3], art[5], art[4], art[6]];
  const body = `
<section class="hero" aria-label="Introduction">
  <p class="hero-cap" data-reveal style="--d:1.4s"><a href="${c.page('projects/generate-deeplight-games.html')}#tarot">The tarot card<span>Original artwork · Deeplight Games</span></a></p>
  <div class="hero-text">
    <h1 class="hero-name" data-reveal style="--d:.3s"><span>Caiyi</span> <em>Shen</em></h1>
    <p class="hero-roles" data-reveal style="--d:.5s">${site.roles.join('<i aria-hidden="true"></i>')}</p>
    <p class="hero-statement" data-reveal style="--d:.62s">${site.statement}</p>
    <p class="hero-links" data-reveal style="--d:.74s"><a class="line-link" href="#chapters">Enter the work</a><a class="line-link" href="${c.page('cv.html')}">Curriculum vitae</a></p>
  </div>
  <p class="hero-scroll" aria-hidden="true"><span></span></p>
</section>

<section class="prologue" aria-labelledby="pro-h">
  <h2 id="pro-h" class="sr-only">Practice</h2>
  <p class="prologue-t" data-reveal>Three practices, <em>one way of looking:</em> how people play, learn and feel inside the systems we make for them.</p>
  <div class="pillars">
    ${pillars.map(([t, d, href, im], i) => `
    <a class="pillar" href="${c.page(href)}" data-reveal style="--d:${i * 0.1}s">
      <span class="pillar-n">${ROMAN[i]}.</span>
      <span class="pillar-img">${frame(`<img src="${c.asset(im.src)}" width="${im.w}" height="${im.h}" alt="" loading="lazy" decoding="async" data-fade>`)}</span>
      <span class="pillar-t">${t}</span><span class="pillar-d">${d}</span>
    </a>`).join('')}
  </div>
</section>

<section class="chapters" id="chapters" aria-labelledby="ch-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Current chapters</span></p><h2 id="ch-h" class="sect-t">Work in progress</h2></header>
  ${chapters.map((p, i) => `
  <article class="tale tale-${i}" data-reveal>
    <a class="tale-img" href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)} tabindex="-1" aria-hidden="true">${frame(img(c, p.img, { alt: '' }))}</a>
    <div class="tale-text">
      <p class="tale-n"><i>${ROMAN[i]}.</i>${kind(p.kind)}</p>
      <h3 class="tale-t"><a href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)}>${p.title}</a></h3>
      <p class="tale-s">${p.subtitle}</p>
      <p class="tale-d">${p.summary}</p>
      <p class="tale-m">${p.role}<span>${p.period}</span></p>
    </div>
  </article>`).join('')}
</section>

<section class="inquiry" aria-labelledby="in-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Research</span></p><h2 id="in-h" class="sect-t">Questions I am working on</h2></header>
  <div class="inquiry-list">
    ${research.slice(0, 2).map(r => `
    <a class="question" href="${c.current(r.href)}"${legacy(false)} data-reveal>
      <q>${r.question}</q>
      <span class="question-m">${r.title} — ${r.subtitle}<span>${r.lab.split(',')[0]} · ${r.period}</span></span>
    </a>`).join('')}
  </div>
  <a class="line-link" href="${c.page('research.html')}">All research</a>
</section>

<section class="constellation" aria-labelledby="ga-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Gallery</span></p><h2 id="ga-h" class="sect-t">Original artwork</h2></header>
  <div class="float-grid">
    ${gallery.map((a, i) => `<a class="float f${i}" href="${c.page('art.html')}#${a.id}" data-reveal style="--d:${(i % 3) * 0.1}s">${frame(`<img src="${c.asset(a.src)}" width="${a.w}" height="${a.h}" alt="${c.esc(a.alt)}" loading="lazy" decoding="async" data-fade>`)}<span class="float-cap">${a.title}<i>${a.project}</i></span></a>`).join('')}
  </div>
  <a class="line-link" href="${c.page('art.html')}">Enter the gallery</a>
</section>

<section class="echoes" aria-labelledby="co-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Community</span></p><h2 id="co-h" class="sect-t">Among players</h2></header>
  <div class="figures">${community[0].stats.map(([v, k]) => `<p class="figure" data-reveal><span>${v}</span><i>${k}</i></p>`).join('')}
  <p class="figures-note">Gaming content created through the NetEase Blizzard China creator partnership, plus a free learning community and a player wiki.</p></div>
  <a class="line-link" href="${c.page('community.html')}">Community &amp; content</a>
</section>`;
  return layout(c, { current: 'index.html', body, home: true });
}

/* ---------------- Game Design ---------------- */
function gameDesign(c) {
  const { featured, games, caseStudies, archive, tags } = c.content;
  const body = `
${chapterHead(c, { roman: 'ii', label: 'Game Design', title: 'Worlds that <em>play back</em>', lede: 'Systems, gameplay and narrative design — client and studio work in development, playable games, documented case studies and earlier releases.', art: { ...featured[1].img, credit: 'Concept & map design · Generate / Deeplight Games' } })}
<div class="sift" data-filter-root>
  <div class="sift-row" role="group" aria-label="Filter projects by tag">
    <button type="button" data-filter="" aria-pressed="true">All</button>
    ${tags.map(([id, label]) => `<button type="button" data-filter="${id}" aria-pressed="false">${label}</button>`).join('')}
  </div>
  <p class="sift-status" data-filter-status aria-live="polite"></p>
</div>
<section class="chapters" data-filter-group aria-labelledby="f-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Featured</span></p><h2 id="f-h" class="sect-t">Professional &amp; ongoing</h2></header>
  ${featured.map((p, i) => `
  <article class="tale tale-${i % 3}" data-tags="${p.tags.join(' ')}" data-reveal>
    <a class="tale-img" href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)} tabindex="-1" aria-hidden="true">${frame(img(c, p.img, { alt: '' }))}</a>
    <div class="tale-text">
      <p class="tale-n"><i>${ROMAN[i]}.</i>${kind(p.kind)}</p>
      <h3 class="tale-t"><a href="${link(c, p.href, p.rebuilt)}"${legacy(p.rebuilt)}>${p.title}</a></h3>
      <p class="tale-s">${p.subtitle}</p>
      <p class="tale-d">${p.summary}</p>
      <p class="tale-m">${p.role}<span>${p.context} · ${p.period}</span></p>
    </div>
  </article>`).join('')}
</section>
<section class="playables" data-filter-group aria-labelledby="g-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Selected games</span></p><h2 id="g-h" class="sect-t">Playable work</h2></header>
  <div class="duo-grid">
  ${games.map((g, i) => `
    <article class="playable" data-tags="${g.tags.join(' ')}" data-reveal style="--d:${(i % 2) * 0.1}s">
      <a href="${c.current(g.href)}"${legacy(false)}>${frame(img(c, g.img))}
      <span class="playable-t">${g.title}</span><span class="playable-m">${g.disciplines}</span><span class="playable-d">${g.summary}</span>${g.note ? `<span class="playable-note">${g.note}</span>` : ''}</a>
    </article>`).join('')}
  </div>
</section>
<section class="studies" data-filter-group aria-labelledby="s-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Case studies</span></p><h2 id="s-h" class="sect-t">Process, written down</h2></header>
  ${caseStudies.map(p => `<a class="study" href="${c.current(p.href)}"${legacy(false)} data-tags="${p.tags.join(' ')}" data-reveal>
    <span class="study-img">${img(c, p.img)}</span><span class="study-t">${p.title}</span><span class="study-m">${p.meta}</span><span class="study-d">${p.summary}</span></a>`).join('')}
</section>
<section class="archive" aria-labelledby="a-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Archive</span></p><h2 id="a-h" class="sect-t">Earlier releases</h2></header>
  <p class="archive-note">Kept for the record. Each opens on itch.io.</p>
  <ul class="archive-list" role="list">${archive.map(a => `<li><a href="${a.href}" target="_blank" rel="noopener">${a.title}</a>${a.note ? `<span>${a.note}</span>` : ''}</li>`).join('')}</ul>
</section>`;
  return layout(c, { title: 'Game Design', current: 'game-design.html', body });
}

/* ---------------- Research ---------------- */
function researchPage(c) {
  const { research, otherResearch } = c.content;
  const body = `
${chapterHead(c, { roman: 'i', label: 'Research', title: 'How people <em>learn, speak</em> and find their way', lede: 'Psychology, HCI and player-experience research — each study framed by its question, method and my contribution.' })}
<section class="studies-r" aria-label="Studies">
  ${research.map((r, i) => `
  <article class="inquest${i % 2 ? ' is-alt' : ''}" data-reveal>
    <figure class="inquest-fig">${frame(img(c, r.img))}${r.imgCredit ? `<figcaption>${r.imgCredit}</figcaption>` : ''}</figure>
    <div class="inquest-text">
      <p class="tale-n"><i>${ROMAN[i]}.</i>${kind(r.kind)}</p>
      <h2 class="inquest-t"><a href="${c.current(r.href)}"${legacy(false)}>${r.title}</a></h2>
      <p class="tale-s">${r.subtitle}</p>
      <blockquote class="inquest-q"><p>${r.question}</p></blockquote>
      <dl class="facts"><div><dt>Lab</dt><dd>${r.lab}</dd></div><div><dt>Period</dt><dd>${r.period}</dd></div><div><dt>With</dt><dd>${r.with}</dd></div><div><dt>Methods</dt><dd>${r.methods.join(' · ')}</dd></div></dl>
      <p class="tale-d">${r.work}</p>
    </div>
  </article>`).join('')}
</section>
<section class="more" aria-labelledby="m-h">
  <header class="sect"><p class="kicker"><i>—</i><span>Further experience</span></p><h2 id="m-h" class="sect-t">Labs &amp; clinical training</h2></header>
  <div class="trio">${otherResearch.map(r => `<article class="note-card" data-reveal><h3>${r.title}</h3><p class="note-m">${r.org}${r.period ? ' · ' + r.period : ''}</p><p>${r.text}</p></article>`).join('')}</div>
</section>`;
  return layout(c, { title: 'Research', current: 'research.html', body });
}

/* ---------------- Art ---------------- */
function artPage(c) {
  const { art, art3d } = c.content;
  const piece = (a, i) => `<figure class="piece" id="${a.id}" data-reveal style="--d:${(i % 3) * 0.08}s"><a href="${c.asset(a.full)}" data-lightbox data-caption="${c.esc(`${a.title} — ${a.project || a.medium}`)}">${frame(img(c, a))}</a><figcaption><span>${a.title}</span><i>${a.project ? a.project + ' · ' : ''}${a.medium}</i></figcaption></figure>`;
  const body = `
${chapterHead(c, { roman: 'iii', label: 'Art', title: 'A gallery of <em>original work</em>', lede: 'Character, concept, interface and environment art. Select any piece to view it at full size.' })}
<section class="gallery" aria-labelledby="g2"><h2 id="g2" class="gallery-h">Two dimensions</h2><div class="masonry">${art.map(piece).join('')}</div></section>
<section class="gallery" aria-labelledby="g3"><h2 id="g3" class="gallery-h">Three dimensions</h2><div class="masonry masonry-3d">${art3d.map(piece).join('')}</div></section>`;
  return layout(c, { title: 'Art', current: 'art.html', body });
}

/* ---------------- Community ---------------- */
function communityPage(c) {
  const { community } = c.content;
  const body = `
${chapterHead(c, { roman: 'iv', label: 'Community & Content', title: 'Among <em>players</em> and learners', lede: 'Creator partnerships, an education community, and information design for a live game.' })}
<section class="annals" aria-label="Entries">
  ${community.map((e, i) => `
  <article class="annal" data-reveal>
    <p class="tale-n"><i>${ROMAN[i]}.</i><span class="kind">${e.meta}</span></p>
    <h2 class="annal-t">${e.title}<span>${e.subtitle}</span></h2>
    ${e.stats ? `<div class="figures figures-sm">${e.stats.map(([v, k]) => `<p class="figure"><span>${v}</span><i>${k}</i></p>`).join('')}</div>` : ''}
    <p class="tale-d">${e.text}</p>
    ${e.href ? `<a class="line-link" href="${e.href}" target="_blank" rel="noopener">Official event information</a>` : ''}
  </article>`).join('')}
</section>`;
  return layout(c, { title: 'Community & Content', current: 'community.html', body });
}

/* ---------------- CV ---------------- */
function cvPage(c) {
  const { site, cv } = c.content;
  const pdf = c.asset(site.cv);
  const body = `
${chapterHead(c, { roman: 'v', label: 'Curriculum vitae', title: 'Curriculum <em>vitae</em>', lede: 'The original PDF, with a short summary beneath it.' })}
<div class="cv-act"><a class="pill" href="${pdf}" download>Download PDF</a><a class="pill pill-ghost" href="${pdf}" target="_blank" rel="noopener">Open in a new tab ↗</a></div>
<section class="pdfwrap" aria-label="CV preview">
  ${frame(`<object class="pdf" data="${pdf}#view=FitH" type="application/pdf" aria-label="CV PDF preview"><span class="pdf-fallback">The PDF preview is not available in this browser. <a href="${pdf}" target="_blank" rel="noopener">Open the PDF</a> or <a href="${pdf}" download>download it</a>.</span></object>`, 'echo-pdf')}
</section>
<section class="cvsum" aria-labelledby="cs-h">
  <h2 id="cs-h" class="sect-t">In brief</h2>
  <div class="cvsum-grid">
    <div><h3 class="cv-h">Education</h3>${cv.education.map(e => `<p class="cv-i"><b>${e.degree}</b><span>${e.school}</span><i>${e.period}</i></p>`).join('')}
      <h3 class="cv-h">Awards &amp; accomplishments</h3>${cv.awards.map(([k, v]) => `<p class="cv-i"><span>${k}</span><i>${v}</i></p>`).join('')}
      <h3 class="cv-h">Skills</h3>${cv.skills.map(([k, v]) => `<p class="cv-i"><b>${k}</b><span>${v}</span></p>`).join('')}</div>
    <div><h3 class="cv-h">Research</h3>${cv.research.map(r => `<p class="cv-i"><b>${r.role}</b><span>${r.org}</span><i>${r.period}</i></p>`).join('')}
      <h3 class="cv-h">Experience</h3>${cv.experience.map(r => `<p class="cv-i"><b>${r.role}</b><span>${r.org}</span><i>${r.period}</i></p>`).join('')}</div>
  </div>
</section>`;
  return layout(c, { title: 'CV', current: 'cv.html', body });
}

/* ---------------- Contact ---------------- */
function contactPage(c) {
  const { site } = c.content;
  const body = `
${chapterHead(c, { roman: 'vi', label: 'Contact', title: 'Write to <em>me</em>', lede: 'For design, research, collaboration and professional opportunities.' })}
<section class="letter">
  <a class="letter-mail" href="mailto:${site.email}" data-reveal>${site.email}</a>
  <p class="letter-alt" data-reveal>Games are published at <a href="${site.itch.href}" target="_blank" rel="noopener">${site.itch.label}</a>. The <a href="${c.page('cv.html')}">CV</a> is available as a PDF.</p>
</section>`;
  return layout(c, { title: 'Contact', current: 'contact.html', body });
}

/* ---------------- Project: Generate ---------------- */
function generatePage(c) {
  const { generate: g, tarot } = c.content;
  const body = `
<p class="crumb"><a href="${c.page('game-design.html')}">← Game Design</a></p>
<header class="phero">
  <p class="kicker" data-reveal><i>ii.</i><span>Featured work · Client project · In development</span></p>
  <h1 class="chead-t" data-reveal style="--d:.06s">Generate <em>/ Deeplight Games</em></h1>
  <p class="chead-l" data-reveal style="--d:.12s">${g.lede}</p>
  <dl class="facts facts-row" data-reveal style="--d:.18s">${g.facts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  <a class="line-link" href="${g.website.href}" target="_blank" rel="noopener">${g.website.label}</a>
</header>
<figure class="bleed" data-reveal><a href="${c.asset(g.concepts.items[0].full)}" data-lightbox data-caption="Concept design 01 — Paper-cutting Witch">${img(c, g.concepts.items[0], { eager: true })}</a></figure>
<article class="read">
  <section aria-labelledby="o-h"><h2 id="o-h" class="read-h"><i>i.</i>Overview</h2>${g.overview.map(p => `<p class="read-lede">${p}</p>`).join('')}
    <figure class="logo-plate">${img(c, g.logo)}</figure></section>
  <section aria-labelledby="u-h"><h2 id="u-h" class="read-h"><i>ii.</i>${g.ui.title}</h2><p>${g.ui.text}</p>
    <figure class="read-fig"><a href="${c.asset(g.ui.img.full)}" data-lightbox data-caption="Health bar UI — Generate / Deeplight Games">${frame(img(c, g.ui.img))}</a><figcaption>Health bar UI, shown on a dark ground so its light end stays visible.</figcaption></figure></section>
  <section id="tarot" aria-labelledby="t-h" class="read-card"><div><h2 id="t-h" class="read-h"><i>iii.</i>${g.card.title}</h2><p>${g.card.text}</p></div>
    <figure class="read-fig card-fig"><a href="${c.asset('assets/projects/generate-deeplight-games/tarot-card-design-v2-838.webp')}" data-lightbox data-caption="Tarot card — Generate / Deeplight Games">${frame(`<img src="${c.asset(tarot.src)}" width="${tarot.w}" height="${tarot.h}" alt="${c.esc(tarot.alt)}" loading="lazy" decoding="async" data-fade>`)}</a><figcaption>Card frame and face design.</figcaption></figure></section>
  <section aria-labelledby="c-h"><h2 id="c-h" class="read-h"><i>iv.</i>${g.concepts.title}</h2><p>${g.concepts.text}</p></section>
</article>
<div class="concepts">${g.concepts.items.map((it, i) => `<figure class="concept c${i}" data-reveal><a href="${c.asset(it.full)}" data-lightbox data-caption="${c.esc(`Concept design ${it.n} — ${it.name}`)}">${frame(img(c, it))}</a><figcaption><i>${ROMAN[i]}.</i> ${it.name} — character and corresponding map</figcaption></figure>`).join('')}</div>
<article class="read">
  <section aria-labelledby="k-h"><h2 id="k-h" class="read-h"><i>v.</i>My contribution</h2><ul class="petals" role="list">${g.contribution.map(x => `<li>${x}</li>`).join('')}</ul><p class="read-note">${g.shared}</p></section>
  <section aria-labelledby="s-h"><h2 id="s-h" class="read-h"><i>vi.</i>Status</h2><p>${g.status}</p></section>
</article>
<a class="onward" href="${c.current(g.next.href)}"${legacy(false)}><span>Next chapter</span><em>${g.next.title}</em></a>`;
  return layout(c, { title: 'Generate / Deeplight Games', current: 'game-design.html', body });
}

export const pages = {
  'index.html': home, 'game-design.html': gameDesign, 'research.html': researchPage, 'art.html': artPage,
  'community.html': communityPage, 'cv.html': cvPage, 'contact.html': contactPage, 'projects/generate-deeplight-games.html': generatePage,
};
const static_ = ['b.css', 'scene.js'];
export { static_ as static };
