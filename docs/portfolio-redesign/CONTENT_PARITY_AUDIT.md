# Content parity audit — source of truth: `main` (f76c2fa)

Generated from the original HTML of every page on `main` by `prototypes/tools/audit-content.mjs` → `docs/portfolio-redesign/audit/main-inventory.json`, rendered by `audit-report.mjs`. The prototype content module (`prototypes/src/content.mjs`) is **not** used as a source here.

**Totals:** 25 pages · 137 media elements · 1 embedded players/documents · 35 external links · 7 content-warning strings.

## How the revision uses this audit
The rebuilt Direction C pages are generated **from main's own page markup** (each page's `<main>` is carried over verbatim with only asset paths rebased). Image order, pairings, groupings, captions, lightbox targets, srcset variants, videos, links and warnings therefore come from the approved source rather than from a re-typed copy, and the same inventory run on the rebuilt pages is diffed against this one (see VISUAL_QA.md).


## Result for the C revision (automated, see `audit/PARITY_RESULT.md`)
Running the same inventory over `preview/c2/` and diffing it against main, page by page: **24 of 24 rebuilt pages match; 137 media elements checked; 0 regressions.** Compared per media element in DOM order: source, srcset, sizes, intrinsic width/height, alt text, caption, lightbox / full-size target and grouping context (the chain of layout classes it sits in); per page: heading outline, links, embeds and content warnings.

The specific approved requirements are therefore inherited from main rather than re-implemented:
- Game Design order: Featured Work 01 Boston Bilingual Pioneer Media → 02 Generate / Deeplight Games → 03 Cocoa Quest (each `.feature--editorial`: text left, two-image media right, consistent, not alternating), then Selected Games, More Featured Work (Schoolive), Case Studies, Other Works.
- Image pairings: BBPM `course-02.jpg` + `psych-assessment-vn`; Generate `character-map-design-01` + `tarot-card-design-v2-tight`; Cocoa `cover` + `prototype-01-photo`.
- Art: the approved 2D trio row (asset sheet · tarot · comic) and later rows with native proportions, 3D layout, every lightbox to its full-size file; the tarot uses the same V2 file as the Generate page.
- BeforeHello naming and page (`research/beforehello.html`; `research/mind-match-cloud.html` kept as its redirect).
- BBPM's seven modules in order: Middle School Mathematics, XiaoMiao Learning Companion, Wellness & Reflection, Psychological Assessment, Axis AI (Zhongmiao Academy), IELTS Preparation, XiaoMiao Gen Z.
- Content warnings (COWorker 18+ gate, Pan's Labyrinth mature notice, JourNalism 18+ gate) and every external link.
- No image is re-cropped: layout geometry is main's own stylesheet, copied verbatim as `preview/c2/css/layout.css`.

## Intentional differences from main (documented)
| Page | Difference | Justification |
| --- | --- | --- |
| `index.html` | Replaced by the cinematic cover (name, identity, one-line introduction, tarot scene, navigation, continue cue). | Requested. main's homepage has no media or project content, so nothing is lost. |
| `cv.html` | Embedded PDF preview added (`<object>` with fallback links) above the CV text; main's Download and Open-in-browser links are kept unchanged. | Required ("CV page must include an embedded PDF preview"). main's heading order is preserved as a subsequence (checked automatically). |
| `cv.html` | City/state labels removed from institution and employer lines (Boston, MA · Madison, WI · Houston, TX · Beijing, China). | Approved privacy rule: no personal location labels. The CV PDF itself is unchanged. |
| `contact.html` | Page removed; Contact no longer appears in the navigation, chapter indicators or scroll transitions. Its public details (email with main's copy button; ca1y1.itch.io) are reproduced from main's markup in a compact row at the foot of `cv.html`, which is now the final chapter. | Requested. Checked automatically: the CV must contain the email copy button and every external link from main's contact page. |
| all pages | main's masthead replaced by the chapter navigation; colour, typography and chrome re-themed. | The redesign. Links in the masthead are replaced one-for-one by the chapter links. |
| `community.html` | *Not changed:* "San Francisco, California · February 28 – March 1, 2027" for The Jam @ GDC 2027 is kept. | This is the event's venue and date, not personal location. Flagged here in case you prefer it removed. |

## Pages and URLs
| Page | Title | Media | Embeds | External links | Warnings |
| --- | --- | ---: | ---: | ---: | ---: |
| `art.html` | 2D & 3D Art — Caiyi Shen | 12 | 0 | 0 | 0 |
| `community.html` | Community & Content — Caiyi Shen | 0 | 0 | 1 | 0 |
| `contact.html` | Contact — Caiyi Shen | 0 | 0 | 1 | 0 |
| `cv.html` | CV — Caiyi Shen | 0 | 0 | 0 | 0 |
| `game-design.html` | Game Design — Caiyi Shen | 22 | 0 | 7 | 6 |
| `games/cena-floris.html` | Cena Floris — Caiyi Shen | 7 | 0 | 4 | 0 |
| `games/coworker.html` | COWorker — Caiyi Shen | 5 | 0 | 4 | 1 |
| `games/dueling-duet.html` | Dueling Duet — Caiyi Shen | 11 | 0 | 4 | 0 |
| `games/lunch-hours.html` | Lunch Hours — Caiyi Shen | 9 | 0 | 4 | 0 |
| `index.html` | Caiyi Shen — Game Designer · Researcher · Artist | 0 | 0 | 0 | 0 |
| `projects/astronomy-playtesting.html` | Moved — 3D Astronomy Game-Based Learning Study | 0 | 0 | 0 | 0 |
| `projects/axis-ai.html` | Axis AI — Caiyi Shen | 2 | 0 | 1 | 0 |
| `projects/boston-bilingual-pioneer-media.html` | Boston Bilingual Pioneer Media — Caiyi Shen | 10 | 0 | 5 | 0 |
| `projects/chinese-character-learning.html` | Moved — Play-based Chinese Character Learning | 0 | 0 | 0 | 0 |
| `projects/cocoa-quest.html` | Cocoa Quest — Caiyi Shen | 8 | 1 | 1 | 0 |
| `projects/generate-deeplight-games.html` | Generate / Deeplight Games — Caiyi Shen | 6 | 0 | 1 | 0 |
| `projects/schoolive.html` | Schoolive — Caiyi Shen | 6 | 0 | 0 | 0 |
| `research.html` | Research — Caiyi Shen | 4 | 0 | 0 | 0 |
| `research/astronomy-learning.html` | 3D Astronomy Game-Based Learning Study — Caiyi Shen | 1 | 0 | 1 | 0 |
| `research/beforehello.html` | BeforeHello — Caiyi Shen | 1 | 0 | 0 | 0 |
| `research/mind-match-cloud.html` | BeforeHello — Caiyi Shen | 0 | 0 | 0 | 0 |
| `research/neural-entrainment.html` | Neural Entrainment — Caiyi Shen | 2 | 0 | 0 | 0 |
| `works/echoes-of-chinese-characters.html` | Echoes of Chinese Characters — Caiyi Shen | 9 | 0 | 0 | 0 |
| `works/elixir-nomad.html` | Elixir Nomad — Caiyi Shen | 9 | 0 | 0 | 0 |
| `works/night-adios.html` | Night, Adios — Caiyi Shen | 13 | 0 | 1 | 0 |

## Approved hierarchy (from main)
**Game Design** heading order: `Game Design` → `Featured Work` → `Boston Bilingual Pioneer Media Interactive Lear…` → `Generate / Deeplight Games 3D Action Roguelike …` → `Cocoa Quest Biomaterial Design & Educational Ta…` → `Selected Games` → `Lunch Hours` → `Cena Floris` → `COWorker` → `Dueling Duet` → `More Featured Work` → `Schoolive Narrative Management Game` → `Case Studies` → `Night, Adios` → `Echoes of Chinese Characters` → `Elixir Nomad` → `Other Works`

**Research** heading order: `Research` → `Selected Research` → `Neural Entrainment Child-Friendly EEG Adaptation` → `BeforeHello Communication Support for Autistic …` → `3D Astronomy Game-Based Learning Study` → `Boston Bilingual Pioneer Media Applied Learning…`

**Art** order: 1. `2d-04-asset-sheet.jpg` · 2. `tarot-card-design-v2-tight-400.webp` · 3. `2d-05-comic-800.webp` · 4. `2d-01-dueling-duet-duel-1400.webp` · 5. `2d-07-character-design-550.webp` · 6. `2d-02-music-box.jpg` · 7. `2d-03-coworker-cow-700.webp` · 8. `2d-06-character-design-500.webp` · 9. `2d-08-illustration-1400.webp` · 10. `3d-01-mechanical-bee.jpg` · 11. `3d-03-weapon-model.jpg` · 12. `3d-02-environment.jpg`

## Project-specific layout rules on main
Classes that appear on only one or two pages, with the stylesheet rules that define them. These encode manually approved layouts (featured editorial rows, the 2D art rows, the Generate art duo, etc.) and are carried into the revision unchanged; the revision only re-themes colour, type and spacing around them.

- `.art-duo` — `projects/generate-deeplight-games.html`
  - `be seen at in a game. Panels hug the artwork (fit-content) instead of stretching to the column. */ .work-body > .art-duo { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(2.4rem, 6vh, 3.2rem) clamp(2.5rem, 5vw, 4rem); padding-block: clamp(2rem, 5vh, 3.2rem); border-… }`
  - `.art-duo .art-piece { margin: 0; max-width: 100%; }`
  - `.art-duo a.art-plate { display: grid; place-items: center; width: fit-content; max-width: 100%; }`
  - `.art-duo .art-plate--dark { padding: 0.9rem 1.1rem; }`
  - `.art-duo .art-plate--dark img { width: 380px; max-width: 100%; height: auto; }`
  - `.art-duo .art-plate--card { padding: 0.9rem 1.4rem; }`
- `.art-duo-item` — `projects/generate-deeplight-games.html`
  - `.art-duo-item { display: grid; gap: 0.9rem; align-content: start; justify-items: start; min-width: 0; }`
  - `.work-body .art-duo-item h2 { margin: 0 0 0.2rem; }`
- `.art-duo-text` — `projects/generate-deeplight-games.html`
  - `.art-duo-text { max-width: 46ch; margin: 0; color: var(--ink-soft); font-size: clamp(0.93rem, 1vw, 1rem); line-height: 1.62; }`
- `.art-label` — `projects/generate-deeplight-games.html`
  - `.art-label { margin-right: 0.6em; color: var(--ink); font-family: var(--font-mono); font-size: 0.64rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;… }`
- `.art-piece` — `projects/generate-deeplight-games.html`
  - `.art-piece img { width: 100%; height: auto; display: block; }`
  - `.art-duo .art-piece { margin: 0; max-width: 100%; }`
- `.art-plate` — `projects/generate-deeplight-games.html`
  - `.art-duo a.art-plate { display: grid; place-items: center; width: fit-content; max-width: 100%; }`
- `.art-plate--card` — `projects/generate-deeplight-games.html`
  - `.media-frame.art-plate--card { border: 1px solid var(--line); }`
  - `.art-duo .art-plate--card { padding: 0.9rem 1.4rem; }`
  - `.art-duo .art-plate--card img { width: 150px; max-width: 100%; height: auto; }`
- `.art-plate--dark` — `projects/generate-deeplight-games.html`
  - ` so it needs a dark ground; the card's drop shadow reads on the page's own raised paper. */ .media-frame.art-plate--dark { background: var(--ink); }`
  - `.art-duo .art-plate--dark { padding: 0.9rem 1.1rem; }`
  - `.art-duo .art-plate--dark img { width: 380px; max-width: 100%; height: auto; }`
- `.art-stack` — `projects/generate-deeplight-games.html`
  - `hell width, one per row, with generous space between them; nothing is cropped and each opens at full size. */ .art-stack { display: grid; gap: clamp(2.6rem, 7vh, 4.5rem); margin-top: clamp(1.6rem, 4vh, 2.4rem); min-width: 0; }`
  - `.art-stack > .media { margin-top: 0; }`
  - `t a reading size (750px) rather than the full shell; the Full size links carry the detail. */ .page--generate .art-stack { gap: clamp(2rem, 5vh, 3rem); width: 100%; max-width: 750px; margin-inline: auto; }`
  - `.section--railed > .art-stack { grid-column: 1 / -1; }`
- `.artshot` — `art.html`
  - `.gallery--pair .artshot { aspect-ratio: var(--pair-ratio, 3 / 2); }`
  - `.gallery--pair .artshot img { width: 100%; height: 100%; object-fit: cover; object-position: var(--focus, center); }`
  - `.artshot { display: block; width: 100%; padding: 0; border: 0; background: var(--paper-raised); overflow: hidden; cursor: zoom-in; }`
  - `.artshot img { width: 100%; height: auto; transition: transform var(--dur-slow) var(--ease); }`
  - `.artshot:hover img { transform: scale(1.012); }`
  - `.gallery.gallery--trio .artshot:not(.artshot--contain) { width: calc(var(--row-h) * (var(--pair-ratio, 12 / 11))); height: var(--row-h); aspect-ratio: auto; }`
- `.artshot--contain` — `art.html`
  - ` for 44px in gaps and ~9.7px of card padding beyond its aspect-scaled width. */ .gallery.gallery--trio .artshot--contain { width: fit-content; max-width: 100%; margin-inline: auto; padding: 10px; aspect-ratio: auto; }`
  - `.gallery.gallery--trio .artshot--contain img { display: block; width: auto; max-width: 100%; object-fit: fill; }`
  - `.gallery.gallery--trio .artshot:not(.artshot--contain) { width: calc(var(--row-h) * (var(--pair-ratio, 12 / 11))); height: var(--row-h); aspect-ratio: auto; }`
  - `.gallery.gallery--trio .artshot--contain { max-width: none; }`
  - `.gallery.gallery--trio .artshot--contain img { height: calc(var(--row-h) - 20px); max-width: none; }`
  - `/* Stacked on a phone: a modest tarot card, not a full-width poster. */ .gallery.gallery--trio .artshot--contain img { height: auto; max-height: 400px; }`
- `.artwork` — `art.html`
  - `.artwork { margin: 0; }`
  - `.artwork figcaption { margin-top: 0.7rem; display: flex; flex-wrap: wrap; gap: 0.2rem 0.8rem; color: var(--ink-muted); font-family: var(--font-mono); font-size: 0.64rem; font-weight:… }`
  - `.artwork figcaption .t { color: var(--ink); }`
  - `.artwork figcaption a { color: inherit; text-decoration: underline; text-decoration-color: var(--line-strong); text-underline-offset: 0.2em; }`
  - `.artwork figcaption a:hover, .artwork figcaption a:focus-visible { color: var(--accent); text-decoration-color: var(--accent); }`
  - `.gallery--trio > .artwork { width: min-content; }`
- `.artwork--card` — `art.html`
  - `.gallery--trio > .artwork--card figcaption { justify-content: center; }`
  - `lows suit (it stays centred on a phone, where the card itself is centred). */ .gallery--trio > .artwork--card figcaption { justify-content: flex-start; }`
- `.case` — `game-design.html`
  - `.case { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); row-gap: 1.1rem; align-items: start; padding-b… }`
  - `.case:last-child { border-bottom: 1px solid var(--line); }`
  - `.case .idx { grid-column: 1 / span 1; padding-top: 0.35rem; }`
  - `.case:hover .case-media img { transform: scale(1.015); }`
  - `.case:hover .cta .arrow { transform: translateX(5px); }`
  - `.case .idx { grid-column: 1 / -1; padding-top: 0; }`
- `.case-media` — `game-design.html`
  - `eps its own proportions: these crops carry labels and tile detail that a uniform frame would cut off. */ .case-media img { width: 100%; height: auto; transition: transform var(--dur-slow) var(--ease); }`
  - `.case-media { grid-column: 2 / span 5; margin: 0; overflow: hidden; background: var(--paper-raised); }`
  - `.case:hover .case-media img { transform: scale(1.015); }`
  - `.case-media { grid-column: 1 / span 6; }`
  - `.case-media { grid-column: 1 / -1; }`
  - `edia img, .game:hover .game-media img, a.work-hero:hover img, a.work-head-media:hover img, .early:hover .early-media img { transform: none; }`
- `.case-text` — `game-design.html`
  - `.case-text { grid-column: 8 / -1; display: flex; flex-direction: column; gap: 0.75rem; align-items: start; }`
  - `.case-text h3 { margin: 0; font-size: clamp(1.4rem, 2.3vw, 2rem); letter-spacing: -0.028em; }`
  - `.case-text h3 a { color: inherit; }`
  - `.case-text .line { max-width: 46ch; }`
  - `.case-text { grid-column: 7 / -1; }`
  - `.case-text { grid-column: 1 / -1; }`
- `.cases` — `game-design.html`
  - `/* Case studies — an editorial list, not a card grid */ .cases { margin: 0; padding: 0; list-style: none; }`
- `.centry` — `community.html`
  - ` now runs as a single vertical column with its measure capped so the lines stay readable inside a wide track. */ .centry { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); row-gap: clamp(1.6rem, 3.5vh, 2.2rem); align-items: start; padding… }`
  - `.centry:last-child { border-bottom: 1px solid var(--line); }`
  - `/* Index, title, role, facts, then summary, then body: one column. */ .centry > * { grid-column: 1 / -1; }`
- `.centry-body` — `community.html`
  - `ummary above does reach the edge, so the inset reads as a measure rather than as an unfinished column. */ .centry-body p { max-width: 78ch; }`
  - `.centry-body p { max-width: none; }`
- `.centry-facts` — `community.html`
  - `he role line, stacked and subordinate, rather than as a full-width band across the bottom of the entry. */ .centry-facts { display: grid; gap: 0.85rem; margin: 0.9rem 0 0; padding-top: 1.1rem; border-top: 1px solid var(--line); }`
  - `.centry-facts dt { margin-bottom: 0.25rem; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.13em; text-transform: up… }`
  - `.centry-facts dd { margin: 0; color: var(--ink-soft); font-size: 0.88rem; line-height: 1.55; }`
- `.centry-id` — `community.html`
  - `/* Left: who, what, when. */ .centry-id { display: flex; flex-direction: column; gap: 0.55rem; }`
  - `.centry-id .idx { padding-top: 0.2rem; }`
  - `.centry-id h3 { margin: 0; font-size: clamp(1.3rem, 1.9vw, 1.72rem); letter-spacing: -0.026em; }`
  - `.centry-id .meta { margin: 0; }`
  - `.centry-id { grid-column: 1 / span 4; }`
- `.centry-main` — `community.html`
  - `/* Right: the statement, then the explanation under it. */ .centry-main { display: flex; flex-direction: column; gap: clamp(1.1rem, 2.4vh, 1.6rem); }`
  - `.centry-main { grid-column: 5 / -1; }`
- `.centry-summary` — `community.html`
  - `.centry-summary { margin: 0; color: var(--ink); font-size: clamp(1.1rem, 1.55vw, 1.4rem); line-height: 1.42; letter-spacing: -0.014em; }`
- `.cite-link` — `research/astronomy-learning.html`
  - `rlined rather than coloured, so it stays as quiet as the caption it sits in while still reading as a link. */ .cite-link { text-decoration: underline; text-underline-offset: 0.18em; text-decoration-color: var(--line-strong); transition: color var(--dur) var(--ease), text-decoration-… }`
  - `.cite-link:hover, .cite-link:focus-visible { color: var(--accent); text-decoration-color: var(--accent); }`
- `.compare` — `games/dueling-duet.html`
  - `h: these are portrait cut-outs, and a half-empty plate stretched across the shell reads as a layout mistake. */ .compare { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.2rem, 2.5vw, 2rem); max-width: 760px; }`
  - `.compare .plate { padding: clamp(0.9rem, 2vw, 1.4rem); }`
  - `.compare .plate img { max-height: 440px; }`
  - `/* Portrait cut-outs presented as a pair, kept off full width for the same reason as .compare. */ .duo--portrait { max-width: 860px; }`
  - `.compare, .duo--portrait { max-width: none; }`
  - `.duo, .trio, .compare { grid-template-columns: 1fr; }`
- `.contact-copied` — `contact.html`
  - `.contact-copied { color: var(--accent); font-family: var(--font-mono); font-size: 0.6rem; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; opacity: 0; transit… }`
  - `.contact-copied.is-on { opacity: 1; }`
- `.contact-copy` — `contact.html`
  - ` machine happens to have registered. Same row geometry as the links so the list still reads as one set. */ .contact-copy { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: baseline; gap: 1rem; width: 100%; margin: 0; padding: 0.95rem 0; border: 0; background… }`
  - `.contact-copy .contact-val { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.15rem 0.6rem; }`
  - `ntact-copy:focus-visible .contact-copyicon, .contact-copy:hover .contact-kind, .contact-copy:focus-visible .contact-kind { color: var(--accent); }`
  - `.contact-list a, .contact-copy { grid-template-columns: 4.6rem minmax(0, 1fr); gap: 0.7rem; }`
- `.contact-copyicon` — `contact.html`
  - `.contact-copyicon { display: inline-grid; place-items: center; color: var(--ink-faint); transition: color var(--dur) var(--ease); }`
  - `ntact-copy:focus-visible .contact-copyicon, .contact-copy:hover .contact-kind, .contact-copy:focus-visible .contact-kind { color: var(--accent); }`
- `.contact-kind` — `contact.html`
  - `.contact-kind { color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase; transition: col… }`
  - `.contact-list a:hover .contact-kind, .contact-list a:focus-visible .contact-kind { color: var(--accent); }`
  - `ntact-copy:focus-visible .contact-copyicon, .contact-copy:hover .contact-kind, .contact-copy:focus-visible .contact-kind { color: var(--accent); }`
- `.contact-list` — `contact.html`
  - `.contact-list { grid-column: 8 / -1; margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }`
  - `.contact-list li { border-bottom: 1px solid var(--line); }`
  - `.contact-list a { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr); align-items: baseline; gap: 1rem; padding-block: 0.95rem; text-decoration: none; }`
  - `.contact-list a:hover .contact-val, .contact-list a:focus-visible .contact-val { transform: translateX(6px); }`
  - `.contact-list a:hover .contact-kind, .contact-list a:focus-visible .contact-kind { color: var(--accent); }`
  - `.contact-lede, .contact-list { grid-column: 1 / -1; }`
- `.contact-val` — `contact.html`
  - `.contact-val { position: relative; justify-self: start; font-size: clamp(0.98rem, 1.15vw, 1.14rem); font-weight: 500; letter-spacing: -0.008em; transition: transform var(--dur… }`
  - `.contact-list a:hover .contact-val, .contact-list a:focus-visible .contact-val { transform: translateX(6px); }`
  - `.contact-copy .contact-val { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.15rem 0.6rem; }`
  - `ry-media img, .artshot:hover img, a.work-hero:hover img, a.work-head-media:hover img, .contact-list a:hover .contact-val { transform: none; }`
- `.cta` — `game-design.html`, `research.html`
  - `.cta { margin: 0; color: var(--accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;… }`
  - `.cta .arrow { display: inline-block; margin-left: 0.15em; transition: transform var(--dur) var(--ease); }`
  - `.feature:hover .cta .arrow { transform: translateX(5px); }`
  - `.feature--editorial > .cta { grid-area: cta; margin-top: 1rem; }`
  - `.case:hover .cta .arrow { transform: translateX(5px); }`
  - `.game:hover .cta .arrow { transform: translate(4px, -4px); }`
- `.cv-body` — `cv.html`
  - `/* 13. CV --------------------------------------------------------------------- */ .cv-body { width: var(--shell); margin-inline: auto; padding-bottom: clamp(3rem, 8vh, 5rem); }`
- `.cv-entry` — `cv.html`
  - `.cv-entry { display: grid; grid-template-columns: minmax(0, 1fr) minmax(150px, 0.26fr); gap: 0.3rem clamp(1.5rem, 4vw, 3rem); padding-block: 0.9rem; }`
  - `.cv-entry + .cv-entry { border-top: 1px solid var(--line); }`
  - `.cv-entry { grid-template-columns: 1fr; }`
- `.cv-notes` — `cv.html`
  - `.cv-notes { grid-column: 1 / -1; margin: 0.5rem 0 0; padding-left: 1.05rem; }`
  - `.cv-notes li { margin-bottom: 0.35rem; color: var(--ink-soft); font-size: 0.93rem; line-height: 1.58; }`
- `.cv-org` — `cv.html`
  - `.cv-org { margin: 0; color: var(--ink-muted); font-size: 0.9rem; }`
- `.cv-role` — `cv.html`
  - `.cv-role { margin: 0; font-size: 1.02rem; font-weight: 600; color: var(--ink); letter-spacing: -0.012em; }`
  - `.cv-role a { color: inherit; text-decoration: underline; text-underline-offset: 0.22em; text-decoration-color: var(--line-strong); }`
  - `.cv-role a:hover { color: var(--accent); text-decoration-color: var(--accent); }`
- `.cv-section` — `cv.html`
  - `.cv-section { padding-block: clamp(1.8rem, 4.5vh, 2.8rem); border-top: 1px solid var(--line); }`
  - `.cv-section > h2 { margin: 0 0 1.4rem; font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: var(--accent);… }`
- `.cv-skills` — `cv.html`
  - `.cv-skills { display: grid; gap: 0.9rem; margin: 0; }`
  - `.cv-skills > div { display: grid; grid-template-columns: minmax(150px, 0.22fr) minmax(0, 1fr); gap: 0.3rem 1.4rem; }`
  - `.cv-skills dt { color: var(--accent); font-family: var(--font-mono); font-size: 0.63rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; padding-top: 0.2em;… }`
  - `.cv-skills dd { margin: 0; color: var(--ink-soft); font-size: 0.95rem; line-height: 1.6; }`
  - `.deflist > div, .cv-skills > div { grid-template-columns: 1fr; }`
- `.cv-when` — `cv.html`
  - `.cv-when { grid-row: 1 / span 2; grid-column: 2; margin: 0; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0… }`
  - `.cv-when { grid-row: auto; grid-column: 1; text-align: left; }`
- `.deflist` — `research/astronomy-learning.html`, `research/neural-entrainment.html`
  - `ailed > .media, .section--railed > .deck, .section--railed > .figcap, .section--railed > .deflist, .section--railed > h3 { grid-column: 1 / -1; }`
  - `/* Labelled constraint / method rows */ .deflist { margin: 0; display: grid; gap: 1.1rem; }`
  - `.deflist > div { display: grid; grid-template-columns: minmax(120px, 0.24fr) minmax(0, 1fr); gap: 0.4rem 1.4rem; padding-top: 0.9rem; border-top: 1px solid var(--line);… }`
  - `.deflist dt { margin: 0; color: var(--accent); font-family: var(--font-mono); font-size: 0.63rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; padding… }`
  - `.deflist dd { margin: 0; color: var(--ink-soft); font-size: clamp(0.93rem, 1vw, 1.01rem); line-height: 1.62; }`
  - `.deflist > div, .cv-skills > div { grid-template-columns: 1fr; }`
- `.duo--portrait` — `games/dueling-duet.html`
  - `/* Portrait cut-outs presented as a pair, kept off full width for the same reason as .compare. */ .duo--portrait { max-width: 860px; }`
  - `.duo--portrait .plate img { max-height: 470px; }`
  - `.compare, .duo--portrait { max-width: none; }`
- `.earlier` — `game-design.html`
  - `es together on a final row of their own instead of letting them ride at the end of a single seven-wide line. */ .earlier { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: clamp(1.4rem, 2.6vw, 2.2rem) var(--col-gap); margin: 0; padding: 0; list-style: none;… }`
  - `.earlier { grid-template-columns: repeat(4, minmax(0, 1fr)); }`
  - `.earlier { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.6rem 1.1rem; }`
- `.early` — `game-design.html`
  - `.early { display: flex; flex-direction: column; gap: 0.45rem; text-decoration: none; }`
  - `.early:hover .early-media img { transform: scale(1.02); }`
  - `.early:hover .early-link { color: var(--accent); }`
  - `edia img, .game:hover .game-media img, a.work-hero:hover img, a.work-head-media:hover img, .early:hover .early-media img { transform: none; }`
  - `a .arrow, .case:hover .cta .arrow, .game:hover .cta .arrow, .onward-link:hover .arrow, .onward-link:focus-visible .arrow { transform: none; }`
- `.early-link` — `game-design.html`
  - `.early-link { color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; transition: colo… }`
  - `.early:hover .early-link { color: var(--accent); }`
- `.early-media` — `game-design.html`
  - `never cropped — it sizes naturally and the inset bottom-aligns to the hero instead. */ .game-media img, .early-media img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease); }`
  - `.early-media { display: block; overflow: hidden; aspect-ratio: 4 / 3; margin-bottom: 0.15rem; background: var(--paper-raised); }`
  - `.early:hover .early-media img { transform: scale(1.02); }`
  - `edia img, .game:hover .game-media img, a.work-hero:hover img, a.work-head-media:hover img, .early:hover .early-media img { transform: none; }`
  - `a .arrow, .case:hover .cta .arrow, .game:hover .cta .arrow, .onward-link:hover .arrow, .onward-link:focus-visible .arrow { transform: none; }`
- `.early-note` — `game-design.html`
  - `.early-note { color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.58rem; font-weight: 500; letter-spacing: 0.07em; text-transform: uppercase; }`
- `.early-title` — `game-design.html`
  - `.early-title { font-size: 0.9rem; font-weight: 500; letter-spacing: -0.012em; line-height: 1.35; }`
  - `.early-title { font-size: 0.82rem; }`
- `.fe-media` — `game-design.html`
  - `.feature--editorial > .fe-media { grid-area: media; margin-top: 1.4rem; }`
  - `.fe-media { display: grid; grid-template-columns: minmax(0, 2.08fr) minmax(0, 1fr); gap: 12px; aspect-ratio: 1.92 / 1; min-width: 0; }`
  - `.fe-media > figure { position: relative; min-width: 0; min-height: 0; margin: 0; overflow: hidden; background: var(--paper-raised); }`
  - `the panel so the panel, not the image, sets the size; contain keeps every image whole at its own ratio. */ .fe-media img { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: contain; }`
  - ` its shape but stops at 760px so it never turns into a full-width banner on a tablet. */ .feature--editorial > .fe-media { width: 100%; max-width: 760px; }`
  - `.feature--editorial > .fe-media { max-width: none; margin-top: 0; align-self: start; }`
- `.feature` — `game-design.html`
  - `ifferent compositions on purpose. -------------------------------------------------------------------------- */ .feature { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); row-gap: clamp(1.5rem, 3.5vh, 2.4rem);… }`
  - `.feature + .feature { margin-top: clamp(4rem, 10vh, 7rem); }`
  - `.feature:hover .cta .arrow { transform: translateX(5px); }`
  - `a .arrow, .case:hover .cta .arrow, .game:hover .cta .arrow, .onward-link:hover .arrow, .onward-link:focus-visible .arrow { transform: none; }`
- `.feature--editorial` — `game-design.html`
  - `ject" to its bottom edge. Below 1280px rows stack: number, title, meta, text, images, tags, link. */ .feature--editorial { grid-template-columns: minmax(0, 1fr); grid-template-areas: "idx" "title" "meta" "line" "media" "chips" "cta"; row-gap: 0; padding-block: clamp(2rem, 4.5vh, 2.8… }`
  - `.feature--editorial + .feature--editorial { margin-top: 0; border-top: 1px solid var(--line); }`
  - `.feature--editorial > .idx { grid-area: idx; margin: 0 0 0.85rem; }`
  - `.feature--editorial > .feature-title { grid-area: title; margin: 0; font-size: clamp(1.7rem, 2.5vw, 2.4rem); line-height: 1.06; }`
  - `.feature--editorial .feature-title .sub { margin-top: 0.55em; font-size: 0.44em; line-height: 1.35; }`
  - `.feature--editorial > .meta { grid-area: meta; margin-top: 0.85rem; }`
- `.feature--pair` — `game-design.html`
  - `.feature--pair .feature-pair { grid-row: 2; grid-column: 1 / span 7; }`
  - `.feature--pair .feature-text { grid-row: 2; grid-column: 9 / -1; align-self: start; }`
- `.feature-head` — `game-design.html`
  - `.feature-head { grid-column: 1 / -1; }`
  - `.feature-head .idx { margin-bottom: 0.9rem; }`
  - `.feature-head { grid-row: 1; }`
- `.feature-pair` — `game-design.html`
  - ` The copy moves up beside them so the row does not leave a tall empty block to the right of the images. */ .feature-pair { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2.2vw, 1.7rem); align-items: start; }`
  - `.feature-pair > figure { margin: 0; }`
  - `ight-capped so a 754x1194 sheet cannot run away with the page. width:auto keeps the ratio exact. */ .feature-pair .plate { padding: clamp(0.7rem, 1.4vw, 1.1rem); }`
  - `.feature-pair .plate img { max-height: var(--sheet-h, 460px); }`
  - `.feature-pair figcaption { margin-top: 0.7rem; display: flex; flex-direction: column; gap: 0.15rem; }`
  - `/* Stacked, at natural size, so the construction notes stay legible. */ .feature-pair { grid-template-columns: 1fr; gap: 1.8rem; }`
- `.feature-text` — `game-design.html`
  - `.feature-text { display: flex; flex-direction: column; gap: 1.1rem; align-items: start; }`
  - ` sparse auto-placement will not backtrack to fill columns to the left of an item it has already placed. */ .feature-text { grid-column: 1 / -1; }`
  - `.feature-text { grid-row: 3; grid-column: 5 / span 6; }`
  - `.feature--pair .feature-text { grid-row: 2; grid-column: 9 / -1; align-self: start; }`
- `.feature-title` — `game-design.html`
  - `.feature-title { margin: 0 0 0.7rem; font-size: clamp(1.9rem, 3.9vw, 3.4rem); line-height: 1.02; letter-spacing: -0.032em; }`
  - `.feature-title a { color: inherit; }`
  - `.feature-title .sub { display: block; margin-top: 0.4em; color: var(--ink-muted); font-family: var(--font-sans); font-size: 0.33em; font-weight: 400; letter-spacing: 0.005em;… }`
  - `.feature--editorial > .feature-title { grid-area: title; margin: 0; font-size: clamp(1.7rem, 2.5vw, 2.4rem); line-height: 1.06; }`
  - `.feature--editorial .feature-title .sub { margin-top: 0.55em; font-size: 0.44em; line-height: 1.35; }`
- `.filter-clear` — `game-design.html`
  - `.filter-clear { padding: 0; border: 0; background: none; color: var(--accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text… }`
- `.filterbar` — `game-design.html`
  - `/* Filter status bar */ .filterbar { display: none; align-items: baseline; flex-wrap: wrap; gap: 0.4rem 1rem; margin-bottom: clamp(1.6rem, 3.5vh, 2.4rem); padding-bottom: 0.9rem; border-bottom: 1px… }`
  - `.filterbar.is-on { display: flex; }`
  - `.filterbar p { margin: 0; color: var(--ink-muted); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;… }`
- `.gallery` — `art.html`
  - `/* 12. Art gallery + lightbox ------------------------------------------------ */ .gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.2rem, 3vw, 2.6rem); align-items: start; }`
  - ` for 44px in gaps and ~9.7px of card padding beyond its aspect-scaled width. */ .gallery.gallery--trio .artshot--contain { width: fit-content; max-width: 100%; margin-inline: auto; padding: 10px; aspect-ratio: auto; }`
  - `.gallery.gallery--trio .artshot--contain img { display: block; width: auto; max-width: 100%; object-fit: fill; }`
  - `.gallery.gallery--trio, .gallery.gallery--row { width: 100%; column-gap: 22px; container-type: inline-size; }`
  - `.gallery.gallery--trio { --row-h: calc((100cqw - 54px) / 2.6953); grid-template-columns: repeat(3, max-content); justify-content: center; }`
  - `.gallery.gallery--trio .artshot:not(.artshot--contain) { width: calc(var(--row-h) * (var(--pair-ratio, 12 / 11))); height: var(--row-h); aspect-ratio: auto; }`
- `.gallery--pair` — `art.html`
  - `e picture. The lightbox always opens the uncropped file, so nothing is actually lost. */ .gallery--pair + .gallery--pair { margin-top: clamp(1.2rem, 3vw, 2.6rem); }`
  - `.gallery--pair .artshot { aspect-ratio: var(--pair-ratio, 3 / 2); }`
  - `.gallery--pair .artshot img { width: 100%; height: 100%; object-fit: cover; object-position: var(--focus, center); }`
  - `: there is no neighbour to match a height with, so show the whole picture rather than a crop. */ .gallery--pair .artshot { aspect-ratio: auto; }`
  - `.gallery--pair .artshot img { height: auto; object-fit: contain; }`
- `.gallery--row` — `art.html`
  - `.gallery.gallery--trio, .gallery.gallery--row { width: 100%; column-gap: 22px; container-type: inline-size; }`
  - `ges align with row 1 without stretching, artificial panel backgrounds, or arbitrary 366px caps. */ .gallery.gallery--row { display: flex; justify-content: center; }`
  - `.gallery--row > .artwork { --row-h: calc((100cqw - 44px) / var(--ar-sum)); flex: none; width: calc(var(--row-h) * var(--ar)); }`
  - `.gallery.gallery--row .artshot { height: var(--row-h); aspect-ratio: auto; }`
- `.gallery--trio` — `art.html`
  - ` for 44px in gaps and ~9.7px of card padding beyond its aspect-scaled width. */ .gallery.gallery--trio .artshot--contain { width: fit-content; max-width: 100%; margin-inline: auto; padding: 10px; aspect-ratio: auto; }`
  - `.gallery.gallery--trio .artshot--contain img { display: block; width: auto; max-width: 100%; object-fit: fill; }`
  - `.gallery--trio > .artwork--card figcaption { justify-content: center; }`
  - `.gallery.gallery--trio, .gallery.gallery--row { width: 100%; column-gap: 22px; container-type: inline-size; }`
  - `.gallery.gallery--trio { --row-h: calc((100cqw - 54px) / 2.6953); grid-template-columns: repeat(3, max-content); justify-content: center; }`
  - `.gallery--trio > .artwork { width: min-content; }`
- `.gallery--wide` — `art.html`
  - `.gallery--wide { grid-template-columns: minmax(0, 1fr); }`
- `.game` — `game-design.html`
  - `.game { position: relative; display: flex; flex-direction: column; align-items: start; gap: 0.7rem; }`
  - `.game h3 { margin: 0; font-size: clamp(1.25rem, 1.9vw, 1.6rem); letter-spacing: -0.025em; }`
  - `.game h3 a { color: inherit; }`
  - `.game .line { max-width: 48ch; font-size: 0.95rem; }`
  - `.game:hover .game-media img { transform: scale(1.015); }`
  - `.game:hover .cta .arrow { transform: translate(4px, -4px); }`
- `.game-media` — `game-design.html`
  - `never cropped — it sizes naturally and the inset bottom-aligns to the hero instead. */ .game-media img, .early-media img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease); }`
  - `.game-media { width: 100%; margin: 0 0 0.5rem; overflow: hidden; aspect-ratio: 16 / 10; background: var(--paper-raised); }`
  - `.game:hover .game-media img { transform: scale(1.015); }`
  - `.game-media { aspect-ratio: 16 / 10; }`
  - `edia img, .game:hover .game-media img, a.work-hero:hover img, a.work-head-media:hover img, .early:hover .early-media img { transform: none; }`
  - `a .arrow, .case:hover .cta .arrow, .game:hover .cta .arrow, .onward-link:hover .arrow, .onward-link:focus-visible .arrow { transform: none; }`
- `.games` — `game-design.html`
  - `/* Selected games — image-led, two up */ .games { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(2.2rem, 5vw, 4rem) var(--col-gap); margin: 0; padding: 0; list-style: none;… }`
  - `.games { grid-template-columns: 1fr; gap: 2.6rem; }`
- `.group-note` — `game-design.html`
  - `.group-note { max-width: 46ch; margin: 0 0 clamp(2rem, 4vh, 2.8rem); color: var(--ink-muted); font-size: 0.88rem; }`
  - `.group-label + :not(.group-note) { margin-top: clamp(2.2rem, 5vh, 3.4rem); }`
- `.home-identity` — `index.html`
  - `.home-identity { grid-column: 1 / span 7; }`
  - `.home-identity { grid-column: 1 / -1; }`
- `.home-main` — `index.html`
  - `100svh box overflows whenever the toolbar is showing. Identical to vh on desktop, where the two are equal. */ .home-main { flex: 1; display: flex; align-items: center; padding-block: clamp(4rem, 14vh, 8rem); padding-block: clamp(4rem, 14svh, 8rem); }`
  - `.home-main { flex: none; display: block; padding-block: 18vh clamp(2.5rem, 7.5vh, 4rem); padding-block: 18svh clamp(2.5rem, 7.5svh, 4rem); }`
- `.home-name` — `index.html`
  - `.home-name { margin: 0 0 clamp(1.75rem, 3.2vw, 2.9rem); font-size: clamp(3.75rem, 11vw, 10rem); font-weight: 500; line-height: 0.94; letter-spacing: -0.042em; }`
- `.home-nav` — `index.html`
  - `.home-nav { --rise-delay: 180ms; }`
  - `/* Navigation — an editorial contents list. */ .home-nav { grid-column: 9 / -1; }`
  - `.home-nav { grid-column: 1 / -1; max-width: 30rem; }`
  - `.home-nav { max-width: none; }`
- `.home-nav-list` — `index.html`
  - `.home-nav-list { counter-reset: nav; margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }`
  - `.home-nav-list > li { counter-increment: nav; border-bottom: 1px solid var(--line); }`
- `.home-role` — `index.html`
  - `/* Load stagger. Short, one pass, no scroll-triggered motion anywhere. */ .home-role { --rise-delay: 90ms; }`
  - `e. Colour is --ink-soft desaturated (H42 S10%→S5%, same lightness), so it sits back by a hair, not a step. */ .home-role { margin: 0; color: #383733; font-family: var(--font-mono); font-size: clamp(0.78rem, 0.92vw, 0.94rem); font-weight: 500; letter-spacing: 0.075em; }`
- `.home-sep` — `index.html`
  - `.home-sep { margin-inline: 0.3em; color: var(--accent); }`
- `.home-shell` — `index.html`
  - `.home-shell { width: var(--shell); margin-inline: auto; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); row-gap: clamp(3rem, 9vh… }`
  - `.home-shell { row-gap: clamp(2.5rem, 7vh, 4rem); row-gap: clamp(2.5rem, 7svh, 4rem); }`
  - `.home-shell { row-gap: clamp(2rem, 5vh, 2.75rem); row-gap: clamp(2rem, 5svh, 2.75rem); }`
- `.jrow` — `projects/boston-bilingual-pioneer-media.html`, `projects/cocoa-quest.html`
  - `/* The figure caption stays tight to the row of figures it describes. */ .module-body > .jrow + .figcap { margin-top: calc(-1 * clamp(0.6rem, 1.6vh, 1rem)); }`
  - `rows in proportion to its aspect ratio (--ar), so the heights come out equal with nothing cropped or stretched. */ .jrow { display: flex; gap: clamp(0.8rem, 1.6vw, 1.4rem); }`
  - `.jrow > figure { flex: var(--ar, 1) 1 0; min-width: 0; }`
  - `.jrow img { width: 100%; height: auto; display: block; }`
  - `.jrow { flex-direction: column; }`
  - `.jrow > figure { flex: none; }`
- `.line` — `game-design.html`
  - `.line { margin: 0; color: var(--ink-soft); font-size: clamp(0.95rem, 1.02vw, 1.04rem); line-height: 1.62; }`
  - `.feature--editorial > .line { grid-area: line; max-width: 56ch; margin-top: 1rem; }`
  - `.case-text .line { max-width: 46ch; }`
  - `.game .line { max-width: 48ch; font-size: 0.95rem; }`
- `.logo-plate` — `projects/generate-deeplight-games.html`
  - `hairline frame and generous margins; the logo is centred at a modest size and its ratio is never touched. */ .logo-plate { display: grid; place-items: center; aspect-ratio: 16 / 9; padding: clamp(1.5rem, 5vw, 4rem); background: #fff; border: 1px solid var(--line); }`
  - `.logo-plate img { width: 100%; max-width: 520px; height: auto; display: block; }`
- `.logo-plate--hero` — `projects/generate-deeplight-games.html`
  - `content width, with the mark shown large; height follows the logo rather than a 16:9 box. */ .work-hero.logo-plate--hero { aspect-ratio: auto; padding: clamp(1.8rem, 4.5vw, 4rem) clamp(1rem, 3vw, 3rem); }`
  - `.work-hero.logo-plate--hero img { width: 100%; max-width: 1000px; height: auto; }`
- `.media--phone` — `research.html`, `research/beforehello.html`
  - `h keeps the ratio exact and nothing is cropped; the panel it sits in becomes a frame around the device. */ .media--phone { display: grid; place-items: center; padding: clamp(1rem, 2.2vw, 1.8rem); }`
  - `.media--phone img { width: auto; max-width: 100%; height: auto; max-height: var(--phone-h, 580px); }`
  - `.media--phone { --phone-h: 480px; }`
  - `.media--phone { --phone-h: 440px; }`
  - `with an explicit width, a max-height squashes the picture instead of scaling it. */ .rentry-media:not(.media--phone) img { width: 100%; }`
- `.media--portrait` — `projects/cocoa-quest.html`
  - `ide a full-width frame: centred at a capped height, exact ratio, nothing cropped. */ .media.media--portrait .media-frame { display: grid; place-items: center; padding: clamp(0.8rem, 2vw, 1.6rem); }`
  - `.media.media--portrait img { width: auto; max-width: 100%; max-height: var(--portrait-h, 720px); }`
- `.media--track` — `projects/axis-ai.html`, `projects/cocoa-quest.html`
  - `/* A figure that belongs to the text track rather than the full width. */ .section--railed > .media.media--track { grid-column: 5 / -1; }`
- `.media-frame--line` — `projects/cocoa-quest.html`, `projects/generate-deeplight-games.html`
  - `.media-frame--line { border: 1px solid var(--line); }`
- `.modnav` — `projects/boston-bilingual-pioneer-media.html`
  - `/* In-page index directly under the overview. */ .work-body > .modnav { padding-block: clamp(1.8rem, 4vh, 2.6rem); border-top: 1px solid var(--line); }`
  - `.modnav { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); align-items: start; }`
- `.modnav-label` — `projects/boston-bilingual-pioneer-media.html`
  - `.modnav-label { margin: 0 0 1rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.7rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase;… }`
  - `.modnav-label { grid-column: 1 / span 3; margin: 0; padding-top: 0.85rem; }`
- `.modnav-list` — `projects/boston-bilingual-pioneer-media.html`
  - `.modnav-list { display: grid; grid-template-columns: minmax(0, 1fr); margin: 0; padding: 0; list-style: none; border-top: 1px solid var(--line); }`
  - `.modnav-list a { display: flex; align-items: baseline; gap: 1rem; min-height: 44px; padding: 0.7rem 0; border-bottom: 1px solid var(--line); color: var(--ink); text-decoration: … }`
  - `.modnav-list a:hover, .modnav-list a:focus-visible { color: var(--accent); }`
  - `.modnav-list a:hover .modnav-title { transform: translateX(4px); }`
  - `/* Two columns read down, 01–04 then 05–07. */ .modnav-list { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(4, auto); grid-auto-flow: column; column-gap: var(--col-gap); border-top: 0;… }`
  - `.modnav-list li:nth-child(1) a, .modnav-list li:nth-child(5) a { border-top: 1px solid var(--line); }`
- `.modnav-num` — `projects/boston-bilingual-pioneer-media.html`
  - `.modnav-num { flex: none; color: var(--accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.12em; }`
- `.modnav-title` — `projects/boston-bilingual-pioneer-media.html`
  - `.modnav-title { font-size: 0.98rem; line-height: 1.4; transition: transform var(--dur) var(--ease); }`
  - `.modnav-list a:hover .modnav-title { transform: translateX(4px); }`
- `.module` — `projects/boston-bilingual-pioneer-media.html`
  - `/* A jump lands with a little air above the module rule. */ .module { scroll-margin-top: 1.5rem; }`
  - `.work-body > .module { display: grid; grid-template-columns: minmax(0, 1fr); row-gap: clamp(1.6rem, 3.5vh, 2.2rem); padding-block: clamp(2.6rem, 6vh, 4rem); }`
  - `.work-body > .module { grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); align-items: start; }`
  - `.work-body > .module > .module-steps, .work-body > .module > .module-body--after { grid-column: 5 / -1; }`
  - `.work-body > .module > .module-steps { grid-column: 1 / -1; }`
- `.module-body` — `projects/boston-bilingual-pioneer-media.html`
  - `/* Body: a lead, then the parts of the design, then role and status. */ .module-body, .module-text { display: flex; flex-direction: column; gap: clamp(1.4rem, 3vh, 1.9rem); min-width: 0; }`
  - `.module-body > *, .module-text > * { margin: 0; }`
  - `.module-visual .figcap, .module-body > .figcap { max-width: 68ch; }`
  - `/* The figure caption stays tight to the row of figures it describes. */ .module-body > .jrow + .figcap { margin-top: calc(-1 * clamp(0.6rem, 1.6vh, 1rem)); }`
  - `.module-body { grid-column: 5 / -1; }`
- `.module-body--after` — `projects/boston-bilingual-pioneer-media.html`
  - `.work-body > .module > .module-steps, .work-body > .module > .module-body--after { grid-column: 5 / -1; }`
- `.module-group` — `projects/boston-bilingual-pioneer-media.html`
  - `/* "Existing" and "My proposal" labels: the line between built and proposed. */ .module-text > .module-group { margin-bottom: -0.9rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.13em; text-transform: upper… }`
- `.module-head` — `projects/boston-bilingual-pioneer-media.html`
  - `.work-body .module-head h2 { max-width: 16ch; margin: 0 0 0.55rem; font-size: clamp(1.6rem, 2.6vw, 2.25rem); line-height: 1.08; }`
  - `.module-head { grid-column: 1 / span 3; }`
- `.module-lead` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-lead { max-width: 70ch; color: var(--ink); font-size: clamp(1.04rem, 1.28vw, 1.22rem); line-height: 1.56; }`
- `.module-linknote` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-linknote { flex-basis: 100%; color: var(--ink-faint); font-size: 0.76rem; line-height: 1.5; }`
- `.module-links` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-links { display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem 1rem; margin: 1.4rem 0 0; }`
- `.module-meta` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-meta { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.8rem var(--col-gap); margin: 1.4rem 0 0; padding-top: 1rem; border-top: 1px s… }`
  - `.module-meta dt { margin-bottom: 0.25rem; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.13em; text-transform: up… }`
  - `.module-meta dd { margin: 0; color: var(--ink-soft); font-size: 0.88rem; line-height: 1.5; }`
- `.module-num` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-num { margin: 0 0 0.8rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.72rem; font-weight: 500; letter-spacing: 0.14em; }`
- `.module-para` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-para { max-width: 68ch; color: var(--ink-soft); font-size: clamp(0.95rem, 1.02vw, 1.04rem); line-height: 1.68; }`
- `.module-points` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-points { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.2rem var(--col-gap); padding: 0; list-style: none; }`
  - `.module-points > li { max-width: 68ch; padding-top: 0.9rem; border-top: 1px solid var(--line-strong); color: var(--ink-soft); font-size: clamp(0.93rem, 1vw, 1.01rem); line-height: 1.… }`
  - `.module-points strong { display: block; margin-bottom: 0.3rem; color: var(--ink); font-weight: 600; }`
  - `.module-points { grid-template-columns: repeat(2, minmax(0, 1fr)); }`
  - `.module-points > li { max-width: none; }`
- `.module-points--flow` — `projects/boston-bilingual-pioneer-media.html`
  - `/* A sequence (A, B, C) rather than a set: the letter sits in its own gutter. */ .module-points--flow { counter-reset: flow; }`
  - `.module-points--flow > li { counter-increment: flow; display: grid; grid-template-columns: 2rem minmax(0, 1fr); }`
  - `.module-points--flow > li::before { content: counter(flow, upper-alpha); grid-row: 1 / span 2; padding-top: 0.2rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.7rem; font-wei… }`
  - `.module-points--flow { grid-template-columns: minmax(0, 1fr); }`
  - `.module-points--flow > li { max-width: 70ch; }`
- `.module-points--three` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-points--three { grid-template-columns: minmax(0, 1fr); }`
  - `.module-points--three > li { max-width: 70ch; }`
  - `.module-points--three { grid-template-columns: repeat(3, minmax(0, 1fr)); }`
- `.module-role` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-role { display: grid; gap: 0.45rem; padding-left: 1rem; border-left: 1px solid var(--line-strong); }`
  - `.module-role p:not(.module-role-label) { max-width: 70ch; margin: 0; color: var(--ink-soft); font-size: clamp(0.93rem, 1vw, 1.01rem); line-height: 1.66; }`
- `.module-role-label` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-role-label { margin: 0; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.63rem; font-weight: 500; letter-spacing: 0.13em; text-transform: uppercase;… }`
  - `.module-role p:not(.module-role-label) { max-width: 70ch; margin: 0; color: var(--ink-soft); font-size: clamp(0.93rem, 1vw, 1.01rem); line-height: 1.66; }`
- `.module-step` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1.1rem; min-width: 0; padding-top: 1.3rem; border-top: 1px solid var(--line); }`
  - `.work-body .module-step h3 { margin: 0; font-size: clamp(1.25rem, 1.9vw, 1.6rem); }`
  - `.module-step { grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: auto 1fr; column-gap: var(--col-gap); row-gap: 1.2rem; align-items: start;… }`
- `.module-step-goal` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-text .module-step-goal { padding-left: 1rem; border-left: 1px solid var(--accent); }`
- `.module-step-head` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-head { grid-column: 1 / span 3; grid-row: 1; }`
- `.module-step-label` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-label { display: block; margin-bottom: 0.3rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.63rem; font-weight: 500; letter-spacing: 0.13em; text-t… }`
- `.module-step-num` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-num { margin: 0 0 0.5rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.14em; }`
- `.module-step-shot` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-shot > a.media-frame { display: block; border: 1px solid var(--line); }`
  - `.module-step-shot img { width: 100%; height: auto; display: block; }`
  - `.module-step-shot .figcap { max-width: 68ch; }`
  - `.module-step-shot { grid-column: 5 / -1; grid-row: 1 / span 2; }`
- `.module-step-text` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-step-text { display: grid; gap: 0.9rem; }`
  - `.module-step-text p { max-width: 62ch; margin: 0; color: var(--ink-soft); font-size: clamp(0.95rem, 1.02vw, 1.04rem); line-height: 1.66; }`
  - `.module-step-text .module-step-goal { padding-left: 1rem; border-left: 1px solid var(--accent); }`
  - `.module-step-text { grid-column: 1 / span 3; grid-row: 2; }`
- `.module-steps` — `projects/boston-bilingual-pioneer-media.html`
  - `tays legible rather than shrinking into three equal cards. Each screenshot links to its full-size file. */ .module-steps { display: grid; gap: clamp(2.4rem, 6vh, 3.6rem); min-width: 0; margin: 0; padding: 0; list-style: none; }`
  - `.work-body > .module > .module-steps, .work-body > .module > .module-body--after { grid-column: 5 / -1; }`
  - `.work-body > .module > .module-steps { grid-column: 1 / -1; }`
- `.module-sub` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-sub { margin: 0; color: var(--ink-muted); font-size: clamp(0.95rem, 1.1vw, 1.05rem); line-height: 1.45; }`
- `.module-sub-zh` — `projects/boston-bilingual-pioneer-media.html`
  - `.module-sub-zh { display: block; margin-top: 0.2rem; color: var(--ink-faint); font-size: 0.9em; }`
- `.module-text` — `projects/boston-bilingual-pioneer-media.html`
  - `/* Body: a lead, then the parts of the design, then role and status. */ .module-body, .module-text { display: flex; flex-direction: column; gap: clamp(1.4rem, 3vh, 1.9rem); min-width: 0; }`
  - `.module-body > *, .module-text > * { margin: 0; }`
  - `/* "Existing" and "My proposal" labels: the line between built and proposed. */ .module-text > .module-group { margin-bottom: -0.9rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.13em; text-transform: upper… }`
- `.module-visual` — `projects/boston-bilingual-pioneer-media.html`
  - `isual at the top of the body track: beside the title rail on desktop, directly under it on mobile. */ .module-visual img { width: 100%; height: auto; display: block; }`
  - `.module-visual .figcap, .module-body > .figcap { max-width: 68ch; }`
- `.module-visual--card` — `projects/boston-bilingual-pioneer-media.html`
  - `al size so its text reads at the same scale as the page rather than at poster size. */ .module-visual--card .media-frame { display: grid; place-items: center; padding: clamp(1rem, 2.4vw, 2rem); }`
  - `.module-visual--card img { width: 100%; max-width: 460px; }`
- `.module-visual--portrait` — `projects/boston-bilingual-pioneer-media.html`
  - `the length of the text beside it and still lines up with the landscape visuals. */ .module-visual--portrait .media-frame { display: grid; place-items: center; padding: clamp(1rem, 2.4vw, 2rem); }`
  - `.module-visual--portrait img { width: auto; max-width: 100%; max-height: 560px; }`
- `.nav-label` — `index.html`
  - `.nav-label { position: relative; justify-self: start; font-size: clamp(1rem, 1.15vw, 1.22rem); font-weight: 500; letter-spacing: -0.008em; transition: transform var(--dur) v… }`
  - `.nav-label::after { content: ""; position: absolute; left: 0; right: 0; bottom: -0.18em; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transi… }`
  - `.nav-link:hover .nav-label, .nav-link:focus-visible .nav-label { transform: translateX(6px); }`
  - `.nav-link:hover .nav-label::after, .nav-link:focus-visible .nav-label::after { transform: scaleX(1); }`
  - `.nav-link[aria-current="page"]:hover .nav-label { transform: none; }`
  - `.nav-link[aria-current="page"]:hover .nav-label::after { transform: scaleX(0); }`
- `.nav-link` — `index.html`
  - `.nav-link { display: grid; grid-template-columns: 2.9rem minmax(0, 1fr); align-items: baseline; padding-block: clamp(0.7rem, 1.1vh, 0.95rem); color: var(--ink); text-decora… }`
  - `.nav-link::before { content: counter(nav, decimal-leading-zero); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; color: var(--ink-faint)… }`
  - `.nav-link:hover .nav-label, .nav-link:focus-visible .nav-label { transform: translateX(6px); }`
  - `.nav-link:hover .nav-label::after, .nav-link:focus-visible .nav-label::after { transform: scaleX(1); }`
  - `.nav-link:hover::before, .nav-link:focus-visible::before { color: var(--accent); }`
  - `.nav-link:focus-visible { outline-offset: 1px; }`
- `.nextstep-idx` — `games/lunch-hours.html`
  - `.nextstep-idx { margin: 0 0 0.7rem; color: var(--accent); font-family: var(--font-mono); font-size: 0.68rem; font-weight: 500; letter-spacing: 0.13em; }`
- `.nextsteps` — `games/lunch-hours.html`
  - ` its own and the row reaches both edges of the shell, instead of three short blocks stacked down the left. */ .nextsteps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.8rem, 3vw, 2.6rem) var(--col-gap); margin: 0; padding: 0; list-style: none;… }`
  - `.nextsteps > li { padding-top: 1.1rem; border-top: 1px solid var(--line-strong); }`
  - `.nextsteps h3 { margin: 0 0 0.7rem; }`
  - `.nextsteps .prose { max-width: none; }`
  - `4-character columns stop being readable below this width, so the findings stack and keep the full measure. */ .nextsteps { grid-template-columns: 1fr; gap: 1.8rem; }`
- `.note` — `game-design.html`
  - `.note { margin: 0; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.64rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;… }`
- `.notice--compact` — `projects/schoolive.html`
  - `/* One-line variant for sitting directly under a single image. */ .notice--compact { margin-top: 0.7rem; padding: 0.5rem 0 0.5rem 0.8rem; background: none; gap: 0.15rem 0.6rem; }`
  - `.notice--compact p:not(.notice-label) { font-size: 0.76rem; }`
- `.page--cocoa` — `projects/cocoa-quest.html`
  - `.page--generate .section--railed > .prose + .prose, .page--cocoa .section--railed > .prose + .prose { margin-top: 1em; }`
- `.page--generate` — `projects/generate-deeplight-games.html`
  - `t a reading size (750px) rather than the full shell; the Full size links carry the detail. */ .page--generate .art-stack { gap: clamp(2rem, 5vh, 3rem); width: 100%; max-width: 750px; margin-inline: auto; }`
  - `.page--generate .section--railed > .prose + .prose, .page--cocoa .section--railed > .prose + .prose { margin-top: 1em; }`
- `.pair-name` — `game-design.html`
  - `.pair-name { color: var(--ink); font-size: 0.92rem; font-weight: 600; letter-spacing: -0.01em; }`
- `.pair-role` — `game-design.html`
  - `.pair-role { color: var(--ink-muted); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; }`
- `.plate--tall` — `games/dueling-duet.html`
  - `.plate--tall img { max-height: 560px; }`
- `.pullquote--inline` — `games/coworker.html`, `games/lunch-hours.html`
  - `its with the body copy instead of competing with the project title from a full-height side column. */ .pullquote--inline { max-width: 56ch; margin: 1.6rem 0 0; padding-left: 1.1rem; border-left: 2px solid var(--accent); font-size: clamp(1.05rem, 1.5vw, 1.28rem); line-height: 1.42; c… }`
- `.pullquote--lede` — `games/cena-floris.html`, `games/dueling-duet.html`
  - `ragraphs so it joins the hierarchy instead of floating as an isolated block further down the column. */ .pullquote--lede { max-width: 42ch; margin: -0.3rem 0 1.5rem; padding-bottom: 1.3rem; border-bottom: 1px solid var(--line); font-size: clamp(1.14rem, 1.7vw, 1.46rem); line-height:… }`
- `.rentry` — `research.html`
  - `.rentry { position: relative; display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); row-gap: 1.2rem; align-items: start; padding-b… }`
  - `.rentry:last-child { border-bottom: 1px solid var(--line); }`
  - `.rentry .idx { grid-column: 1 / span 1; padding-top: 0.35rem; }`
  - `.rentry:hover .rentry-media img { transform: scale(1.015); }`
  - `.rentry .idx { grid-column: 1 / -1; padding-top: 0; }`
  - `ry-media img, .artshot:hover img, a.work-hero:hover img, a.work-head-media:hover img, .contact-list a:hover .contact-val { transform: none; }`
- `.rentry-credit` — `research.html`
  - `d by a stretched link, so this stays plain text and the full linked citation lives on the detail page. */ .rentry-credit { padding: 0.6rem clamp(0.7rem, 1.4vw, 1rem) 0.7rem; color: var(--ink-faint); font-size: 0.7rem; line-height: 1.5; }`
- `.rentry-media` — `research.html`
  - `.rentry-media { grid-column: 2 / span 5; margin: 0; overflow: hidden; background: var(--paper-raised); }`
  - `.rentry-media img { height: auto; transition: transform var(--dur-slow) var(--ease); }`
  - `with an explicit width, a max-height squashes the picture instead of scaling it. */ .rentry-media:not(.media--phone) img { width: 100%; }`
  - `.rentry:hover .rentry-media img { transform: scale(1.015); }`
  - `.rentry-media { grid-column: 1 / span 6; }`
  - `.rentry-media, .rentry-text { grid-column: 1 / -1; }`
- `.rentry-text` — `research.html`
  - `.rentry-text { grid-column: 8 / -1; display: flex; flex-direction: column; gap: 0.8rem; align-items: start; }`
  - `.rentry-text h3 { margin: 0; font-size: clamp(1.35rem, 2.1vw, 1.85rem); letter-spacing: -0.026em; }`
  - `.rentry-text h3 a { color: inherit; }`
  - `.rentry-text { grid-column: 7 / -1; }`
  - `.rentry-media, .rentry-text { grid-column: 1 / -1; }`
- `.rlist` — `community.html`, `research.html`
  - `but the same paper and type system. -------------------------------------------------------------------------- */ .rlist { margin: 0; padding: 0; list-style: none; }`
- `.role` — `game-design.html`
  - `.role { margin: 0; color: var(--ink-muted); font-family: var(--font-mono); font-size: 0.67rem; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase;… }`
- `.scraps` — `games/lunch-hours.html`
  - `.scraps { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); align-items: center; gap: clamp(1.4rem, 3.5vw, 2.8rem); }`
  - `.scraps img { width: 100%; height: auto; }`
  - `.scraps figure:nth-child(1) { transform: rotate(-1.1deg); }`
  - `.scraps figure:nth-child(2) { transform: rotate(0.8deg); }`
  - `.scraps figure:nth-child(3) { transform: rotate(-0.5deg); }`
  - `.scraps { grid-template-columns: 1fr; }`
- `.sechead` — `games/lunch-hours.html`
  - `nd third of the section empty; pairing the two fills the grid and gives the section a horizon to start from. */ .sechead { margin-bottom: clamp(1.8rem, 4vh, 2.8rem); }`
  - `.sechead { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: var(--col-gap); align-items: start; }`
- `.sechead-intro` — `games/lunch-hours.html`
  - `.sechead-intro { max-width: none; }`
  - `.sechead-intro { grid-column: 6 / -1; }`
- `.sechead-title` — `games/lunch-hours.html`
  - `.sechead-title h2 { max-width: none; margin-bottom: 0.8rem; }`
  - ` the spacing, so drop the pull-up this uses when it sits directly under a full-width heading. */ .sechead-title .showing { margin: 0; }`
  - `.sechead-title { grid-column: 1 / span 4; }`
- `.showing` — `games/lunch-hours.html`
  - `ing, so drop the pull-up this carries when it sits directly beneath a full-width heading. */ .section--railed > .showing { margin: 0; }`
  - ` the spacing, so drop the pull-up this uses when it sits directly under a full-width heading. */ .sechead-title .showing { margin: 0; }`
  - `pulls it up against the h2 so the two read as one unit rather than as a heading and a stray first paragraph. */ .showing { margin: -0.7rem 0 1.5rem; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.66rem; font-weight: 500; letter-spacing: 0.11em; text-transform: … }`
- `.split--art` — `games/coworker.html`
  - `/* Explanation left, a pair of artworks right. */ .split--art > .prose { grid-column: 1 / span 5; }`
  - `.split--art > .aside { grid-column: 7 / -1; align-self: start; }`
  - `art > .aside, .split--evidence > .prose, .split--evidence > .aside, .split--overview > .prose, .split--overview > .aside { grid-column: 1 / -1; }`
- `.split--media-left` — `games/lunch-hours.html`
  - ` The figure is written first in the source so the reading order matches the visual order. */ .split--media-left > .aside { grid-column: 1 / span 5; }`
  - `.split--media-left > .prose { grid-column: 7 / -1; }`
  - `art > .aside, .split--evidence > .prose, .split--evidence > .aside, .split--overview > .prose, .split--overview > .aside { grid-column: 1 / -1; }`
- `.split--wide-media` — `games/dueling-duet.html`, `games/lunch-hours.html`
  - `ns the explanation was down to a 47-character measure while the figure had room to spare. */ .split--wide-media > .aside { grid-column: 1 / span 6; }`
  - `.split--wide-media > .prose { grid-column: 8 / -1; align-self: center; }`
  - `art > .aside, .split--evidence > .prose, .split--evidence > .aside, .split--overview > .prose, .split--overview > .aside { grid-column: 1 / -1; }`
- `.stack` — `games/coworker.html`
  - `column, bottom-aligned so a landscape and a portrait piece read as a pair rather than as two unrelated blocks. */ .stack { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 1.6rem); align-items: end; }`
  - `.stack .plate { padding: clamp(0.8rem, 1.6vw, 1.2rem); }`
  - `.stack .plate img { max-height: 330px; }`
  - `.stack { grid-template-columns: 1fr; }`
  - `.stack .plate img { max-height: 300px; }`
- `.standee-media` — `games/lunch-hours.html`
  - `.standee-media { display: flex; align-items: flex-end; justify-content: center; height: clamp(190px, 26vw, 360px); }`
  - `.standee-media img { width: auto; max-width: 100%; height: 100%; object-fit: contain; object-position: bottom; }`
- `.standees` — `games/lunch-hours.html`
  - `s inside it (width:auto, so proportions hold); the figures differ in width, which is what real standees do. */ .standees { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: end; gap: clamp(0.7rem, 2.5vw, 2rem); }`
  - `.standees figure { text-align: center; }`
  - `.standees figcaption { margin-top: 0.8rem; }`
- `.steplabel` — `games/dueling-duet.html`, `projects/schoolive.html`
  - `.steplabel { display: block; margin-bottom: 0.6rem; color: var(--ink-faint); font-family: var(--font-mono); font-size: 0.62rem; font-weight: 500; letter-spacing: 0.13em; tex… }`
- `.stretch` — `game-design.html`, `research.html`
  - `/* Whole-block link: the anchor covers its positioned ancestor. */ .stretch { text-decoration: none; }`
  - `.stretch::after { content: ""; position: absolute; inset: 0; z-index: 2; }`
- `.tagbrowse` — `game-design.html`
  - `/* Browse by tag — collapsed by default, so the index opens on the work rather than on a filter panel. */ .tagbrowse { width: var(--shell); margin-inline: auto; padding-bottom: clamp(1.4rem, 3.5vh, 2.2rem); }`
- `.tagbrowse-icon` — `game-design.html`
  - `/* A chevron rather than a plus/minus: quieter, and it reads as "more below". */ .tagbrowse-icon { width: 0.44rem; height: 0.44rem; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: translateY(-0.12em) rotate(45deg); tran… }`
  - `.tagbrowse-toggle[aria-expanded="true"] .tagbrowse-icon { transform: translateY(0.08em) rotate(225deg); }`
- `.tagbrowse-panel` — `game-design.html`
  - `stuck at zero. JS measures the content into --panel-h so the growth ends exactly on the real height. */ .tagbrowse-panel { overflow: hidden; }`
  - `.tagbrowse-panel.is-open { animation: tagreveal var(--dur-slow) var(--ease); }`
  - `.tagbrowse-panel .chips { padding-top: 0.9rem; }`
- `.tagbrowse-toggle` — `game-design.html`
  - `.tagbrowse-toggle { display: inline-flex; align-items: center; min-height: 24px; gap: 0.55rem; padding: 0.2rem 0; border: 0; background: none; color: var(--ink-faint); font-family:… }`
  - `.tagbrowse-toggle:hover { color: var(--accent); }`
  - `.tagbrowse-toggle[aria-expanded="true"] { color: var(--accent); }`
  - `.tagbrowse-toggle[aria-expanded="true"] .tagbrowse-icon { transform: translateY(0.08em) rotate(225deg); }`
  - `.tagbrowse-toggle { min-height: 40px; padding-block: 0.55rem; }`
- `.videobox--embed` — `projects/cocoa-quest.html`
  - `/* Embedded player sized to the source video (4:3), so it is not letterboxed. */ .videobox.videobox--embed { aspect-ratio: 4 / 3; }`

## Per-page inventory

### `art.html` — 2D & 3D Art — Caiyi Shen
Outline: h1: 2D & 3D Art / h2: 2D / h2: 3D

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/art/2d-04-asset-sheet.jpg` | 1261x1159 | 1.088 | — | A 2D asset sheet: an NPC portrait icon, paper environment assets, a p… | lightbox: `assets/art/2d-04-asset-sheet.jpg` | section#two-d.band > div.gallery.gallery--pair.gallery--trio > figure.artwork > button.ar… |
| 2 | img | `assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-400.webp` | 400x779 | 0.513 | 400w 758w | A tall tarot card: an ornate gold frame with crescent moons and four-… — *Generate / Deeplight Games* | lightbox: `assets/projects/generate-deeplight-games/tarot-card-design-…` | section#two-d.band > div.gallery.gallery--pair.gallery--trio > figure.artwork.artwork--ca… |
| 3 | img | `assets/art/2d-05-comic-800.webp` | 800x772 | 1.036 | 800w 1400w | A black-and-white ink comic page: a long-haired figure casts a spell … | lightbox: `assets/art/2d-05-comic.jpg` | section#two-d.band > div.gallery.gallery--pair.gallery--trio > figure.artwork > button.ar… |
| 4 | img | `assets/art/2d-01-dueling-duet-duel-1400.webp` | 1400x978 | 1.431 | 800w 1400w 2000w | Dueling Duet duel scene in a vaulted gothic hall: the pale-haired Wes… — *Dueling Duet* | lightbox: `assets/art/2d-01-dueling-duet-duel-2000.webp` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 5 | img | `assets/art/2d-07-character-design-550.webp` | 550x761 | 0.723 | 550w 1102w | Character art of the Western-fantasy duellist on a dark ground: short… — *Dueling Duet* | lightbox: `assets/art/2d-07-character-design-1102.webp` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 6 | img | `assets/art/2d-02-music-box.jpg` | 794x563 | 1.41 | — | An open ornamented music box with the Dueling Duet title card inside … — *Dueling Duet* | lightbox: `assets/art/2d-02-music-box.jpg` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 7 | img | `assets/art/2d-03-coworker-cow-700.webp` | 700x760 | 0.921 | 700w 1537w | Character art of a Holstein cow running on a treadmill, styled with a… — *COWorker* | lightbox: `assets/art/2d-03-coworker-cow-1537.webp` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 8 | img | `assets/art/2d-06-character-design-500.webp` | 500x789 | 0.634 | 500w 1037w | Character art of a woman kneeling with her arms behind her back, wear… — *COWorker* | lightbox: `assets/art/2d-06-character-design-1037.webp` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 9 | img | `assets/art/2d-08-illustration-1400.webp` | 1400x978 | 1.431 | 800w 1400w 2000w | A painted stainless-steel lunch tray: braised meat with green pepper … — *Lunch Hours* | lightbox: `assets/art/2d-08-illustration-2000.webp` | section#two-d.band > div.gallery.gallery--pair.gallery--row > figure.artwork > button.art… |
| 10 | img | `assets/art/3d-01-mechanical-bee.jpg` | 1600x945 | 1.693 | — | A rendered mechanical bee: a worn yellow and steel body with a mesh f… | lightbox: `assets/art/3d-01-mechanical-bee.jpg` | section#three-d.band.band--last > div.gallery.gallery--pair > figure.artwork > button.art… |
| 11 | img | `assets/art/3d-03-weapon-model.jpg` | 1063x771 | 1.379 | — | A revolver in the modelling viewport: the shaded reference above and … | lightbox: `assets/art/3d-03-weapon-model.jpg` | section#three-d.band.band--last > div.gallery.gallery--pair > figure.artwork > button.art… |
| 12 | img | `assets/art/3d-02-environment.jpg` | 1800x845 | 2.13 | — | A 3D environment at low sun: red rock terrain and scrub, a large autu… | lightbox: `assets/art/3d-02-environment.jpg` | section#three-d.band.band--last > div.gallery.gallery--wide > figure.artwork > button.art… |

### `community.html` — Community & Content — Caiyi Shen
Outline: h1: Community & Content / h2: Selected Work / h3: NetEase Blizzard China Gaming Content Creator / h3: Schoolive Education Community & Learning Platform / h3: HEYBOX Rainbow Six Wiki & Player Community / h3: The Jam @ GDC 2027 Global Game Jam GDC


External links: [Official event information ↗](https://globalgamejam.org/news/join-ggj-gdc-2027-game-jam-world-record-attempt)

### `contact.html` — Contact — Caiyi Shen
Outline: h1: Contact


External links: [itch.io ca1y1.itch.io ↗](https://ca1y1.itch.io/)

### `cv.html` — CV — Caiyi Shen
Outline: h1: CV / h2: Education / h2: Research / h2: Projects / h2: Experience / h2: Skills / h2: Awards & Accomplishments


### `game-design.html` — Game Design — Caiyi Shen
Outline: h1: Game Design / h2: Featured Work / h3: Boston Bilingual Pioneer Media Interactive Learning & G… / h3: Generate / Deeplight Games 3D Action Roguelike — Concep… / h3: Cocoa Quest Biomaterial Design & Educational Tabletop G… / h2: Selected Games / h3: Lunch Hours / h3: Cena Floris / h3: COWorker / h3: Dueling Duet / h2: More Featured Work / h3: Schoolive Narrative Management Game / h2: Case Studies / h3: Night, Adios / h3: Echoes of Chinese Characters / h3: Elixir Nomad / h2: Other Works

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/axis-ai/course-02.jpg` | 1400x851 | 1.645 | — | A 3D mathematics lesson with two balance scales weighing labelled sac… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-main |
| 2 | img | `assets/projects/axis-ai/psych-assessment-vn-800.webp` | 800x813 | 0.984 | 800w 1200w | The Jordan visual novel from the psychological assessment course: the… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-side |
| 3 | img | `assets/projects/generate-deeplight-games/character-map-design-01-800.webp` | 800x525 | 1.524 | 800w 1400w | Concept sheet: a character in a pale green outfit with paper-cut swal… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-main |
| 4 | img | `assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-400.webp` | 400x779 | 0.513 | 400w 758w | A tarot card design: an ornate gold frame with crescent moons and sta… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-side |
| 5 | img | `assets/projects/cocoa-quest/cover-960.webp` | 960x717 | 1.339 | 640w 960w 1280w | Cocoa Quest title card: the title in golden-brown rounded letters, th… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-main |
| 6 | img | `assets/projects/cocoa-quest/prototype-01-photo-480.webp` | 480x640 | 0.75 | 480w 960w | The opened Prototype 1 package: a dark biomaterial sheet with visible… | — | section#featured.band > article.feature.feature--editorial > div.fe-media > figure.fe-side |
| 7 | img | `assets/games/lunch-hours/cover.jpg` | 811x500 | 1.622 | — | Lunch Hours title art: a school corridor collaged from cut paper, wit… | — | section#selected-games.band > ul.games > li.game > figure.game-media |
| 8 | img | `assets/games/cena-floris/cover-700.webp` | 700x394 | 1.777 | 700w 1152w | Cena Floris title art: the protagonist with long lilac hair against a… | — | section#selected-games.band > ul.games > li.game > figure.game-media |
| 9 | img | `assets/games/coworker.png` | 315x250 | 1.26 | — | COWorker cover art: a cow seen through a retro CRT monitor. | — | section#selected-games.band > ul.games > li.game > figure.game-media |
| 10 | img | `assets/games/dueling-duet/victory-western-700.webp` | 700x489 | 1.431 | 700w 1300w | Dueling Duet victory art: the Western-fantasy duellist standing in a … | — | section#selected-games.band > ul.games > li.game > figure.game-media |
| 11 | img | `assets/projects/schoolive/character-amelia.jpg` | 754x1194 | 0.631 | — | Annotated character design sheet for Amelia: a figure in a black laye… — *AmeliaOriginal Character Design* | — | section#featured-more.band > article.feature.feature--pair > div.feature-pair > div.plate |
| 12 | img | `assets/projects/schoolive/character-kagami.jpg` | 754x1194 | 0.631 | — | Annotated character design sheet for Kagami: a figure in a white and … — *KagamiOriginal Character Design* | — | section#featured-more.band > article.feature.feature--pair > div.feature-pair > div.plate |
| 13 | img | `assets/projects/night-adios/preview.jpg` | 1400x788 | 1.777 | — | Night, Adios title art: a pink pixel-art subway carriage with the tit… | — | section#case-studies.band > ol.cases > li.case > figure.case-media |
| 14 | img | `assets/projects/echoes/preview.jpg` | 1400x787 | 1.779 | — | Pictogram tiles: painted sun, moon, mountain, water, fish and tree on… | — | section#case-studies.band > ol.cases > li.case > figure.case-media |
| 15 | img | `assets/projects/elixir-nomad/preview.jpg` | 1400x788 | 1.777 | — | Elixir Nomad title art: a painted view through the wooden window of a… | — | section#case-studies.band > ol.cases > li.case > figure.case-media |
| 16 | img | `assets/games/dungeon-monster.webp` | 347x220 | 1.577 | — |  | new-tab: `https://ca1y1.itch.io/a-dungeon-monster` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 17 | img | `assets/games/zombie-lab.webp` | 347x192 | 1.807 | — |  | new-tab: `https://ca1y1.itch.io/zombie-lab` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 18 | img | `assets/games/one-year-old-catch.webp` | 347x324 | 1.071 | — |  | new-tab: `https://ca1y1.itch.io/one-year-old-catch` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 19 | img | `assets/games/sewer-struggle.png` | 315x250 | 1.26 | — |  | new-tab: `https://fedexodus.itch.io/sewer-struggle` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 20 | img | `assets/games/we-happy-were.png` | 315x250 | 1.26 | — |  | new-tab: `https://wingmancover.itch.io/we-happy-were` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 21 | img | `assets/games/pans-labyrinth.png` | 315x250 | 1.26 | — |  | new-tab: `https://ca1y1.itch.io/pans-labyrinth` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |
| 22 | img | `assets/games/journalism.png` | 315x250 | 1.26 | — |  | new-tab: `https://wingmancover.itch.io/httpsyoutubeze-0f6euhm0` | section#other-works.band.band--last > ul.earlier > a.early > span.early-media |

External links: [A Dungeon MONSTER itch.io ↗](https://ca1y1.itch.io/a-dungeon-monster) · [Zombie Lab itch.io ↗](https://ca1y1.itch.io/zombie-lab) · [One-year-old catch itch.io ↗](https://ca1y1.itch.io/one-year-old-catch) · [Sewer Struggle itch.io ↗](https://fedexodus.itch.io/sewer-struggle) · [We Happy, Were itch.io ↗](https://wingmancover.itch.io/we-happy-were) · [Pan's Labyrinth itch.io ↗ Mature-conten…](https://ca1y1.itch.io/pans-labyrinth) · [JourNalism itch.io ↗ 18+ content gate](https://wingmancover.itch.io/httpsyoutubeze-0f6euhm0)

Content warnings: “18+ content gate on itch.io” · “COWorker Game Design · Gameplay · Art 2D Game Design Gameplay Design Game Art An experimental feminist game about productivity, bodily control, and the fact tha” · “Mature-content notice” · “Pan's Labyrinth itch.io ↗ Mature-content notice” · “18+ content gate” · “JourNalism itch.io ↗ 18+ content gate”

### `games/cena-floris.html` — Cena Floris — Caiyi Shen
Outline: h1: Cena Floris / h2: Overview / h2: The core mechanic: information as a resource / h2: Four endings / h2: Gameplay

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/games/cena-floris/cover.jpg` | 1152x648 | 1.778 | — | Cena Floris title art: the protagonist with long lilac hair, hands ra… | new-tab: `https://pepeko.itch.io/cena-floris` | main#main > header.work-head.work-head--split > a.work-head-media |
| 2 | img | `assets/games/cena-floris/story-comic.jpg` | 1152x648 | 1.778 | — | A six-panel comic: the grandmother in bed with the recipe, the girl s… | — | section#world > div.split.split--overview > div.aside > figure.media-frame |
| 3 | img | `assets/games/cena-floris/ending-01.png` | 620x386 | 1.606 | — | Ending illustration: the girl watches as the witch eats a plate of no… | — | div.work-body > section#endings.section--railed > div.media.duo > figure.plate |
| 4 | img | `assets/games/cena-floris/ending-02.png` | 620x328 | 1.89 | — | Ending illustration: the girl sits with folded arms and a tangled tho… | — | div.work-body > section#endings.section--railed > div.media.duo > figure.plate |
| 5 | img | `assets/games/cena-floris/ending-03.png` | 620x323 | 1.92 | — | Ending illustration: the girl looks alarmed as small coloured spirits… | — | div.work-body > section#endings.section--railed > div.media.duo > figure.plate |
| 6 | img | `assets/games/cena-floris/ending-04.png` | 620x414 | 1.498 | — | Ending illustration: the girl sits in a glow of violet light beside a… | — | div.work-body > section#endings.section--railed > div.media.duo > figure.plate |
| 7 | img | `assets/games/cena-floris/cover.jpg` | 1152x648 | 1.778 | — |  | — | div.work-body > section#video > div.media > div.videobox |

External links: [https://pepeko.itch.io/cena-floris](https://pepeko.itch.io/cena-floris) · [Watch on YouTube ↗](https://www.youtube.com/watch?v=tDfBk5uxo4U)

### `games/coworker.html` — COWorker — Caiyi Shen
Outline: h1: COWorker / h2: Overview / h2: Drawing the body as equipment / h2: The player is inside the system / h2: Gameplay

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/games/coworker.png` | 315x250 | 1.26 | — | COWorker cover art: a cow viewed through the curved glass of a retro … | new-tab: `https://billyyi.itch.io/coworker` | main#main > header.work-head.work-head--split > a.work-head-media |
| 2 | img | `assets/games/coworker/character-cow.png` | 760x698 | 1.089 | — | Character art: a cow running on a treadmill, wearing a pink bow, atta… | — | section#premise > div.split.split--overview > div.aside > figure.plate |
| 3 | img | `assets/games/coworker/character-cow.png` | 760x698 | 1.089 | — | Character art: a cow running on a treadmill, wearing a pink bow, atta… — *The cow: treadmill, milking machine, IV stand, and decorati…* | — | div.split.split--art > div.aside > div.stack > figure.plate |
| 4 | img | `assets/games/coworker/character-human.png` | 560x917 | 0.611 | — | Character art: a woman kneeling, wearing cow-patterned clothing and h… — *The woman: the same apparatus, with the cow motifs carried …* | — | div.split.split--art > div.aside > div.stack > figure.plate |
| 5 | img | `assets/games/coworker.png` | 315x250 | 1.26 | — |  | — | div.work-body > section#video > div.media > div.videobox |

External links: [https://billyyi.itch.io/coworker](https://billyyi.itch.io/coworker) · [Watch on YouTube ↗](https://www.youtube.com/watch?v=hluB7LA2LEA)

Content warnings: “18+ content gate on itch.io”

### `games/dueling-duet.html` — Dueling Duet — Caiyi Shen
Outline: h1: Dueling Duet / h2: Overview / h2: The music-box opening / h2: Two characters, two mythologies / h3: Western fantasy / h3: Eastern mythology / h2: Gothic letterforms / h2: The instruments are monsters / h2: Teaser

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/games/dueling-duet/victory-western.jpg` | 1500x1048 | 1.431 | — | Victory illustration: the Western-fantasy duellist with dark wings an… | new-tab: `https://santi5578.itch.io/dueling-duet` | main#main > header.work-head.work-head--split > a.work-head-media |
| 2 | img | `assets/games/dueling-duet/victory-eastern.jpg` | 1500x1048 | 1.431 | — | Victory illustration for the Eastern-mythology duellist, hands on hip… | — | section#scope > div.split.split--overview > div.aside > figure.media-frame |
| 3 | img | `assets/art/2d-02-music-box.jpg` | 794x563 | 1.41 | — | An open ornamented music box containing two small figures, with a gol… | — | section#opening > div.split.split--overview > div.aside > figure.media-frame |
| 4 | img | `assets/games/dueling-duet/sketch-western.png` | 460x674 | 0.682 | — | Process sketch of the Western-fantasy character: loose red and black … | — | div.work-body > section#characters.section--railed > div.media.compare > div.plate |
| 5 | img | `assets/games/dueling-duet/final-western.png` | 460x656 | 0.701 | — | Final character art of the Western-fantasy duellist: dark wings, red … | — | div.work-body > section#characters.section--railed > div.media.compare > div.plate |
| 6 | img | `assets/games/dueling-duet/sketch-eastern.png` | 460x737 | 0.624 | — | Process sketch of the Eastern-mythology character: loose blue lines w… | — | div.work-body > section#characters.section--railed > div.media.compare > div.plate |
| 7 | img | `assets/games/dueling-duet/final-eastern.png` | 678x1094 | 0.62 | — | Final character art of the Eastern-mythology duellist: a gold and cre… | — | div.work-body > section#characters.section--railed > div.media.compare > div.plate.plate-… |
| 8 | img | `assets/games/dueling-duet/gothic-ui.jpg` | 1500x1048 | 1.431 | — | In-game interface: an ornamented duel bar across the top of a gothic … — *The letterform set in place, along the bottom of the duel s…* | — | section#typography > div.split.split--wide-media > div.aside > figure.media-frame |
| 9 | img | `assets/games/dueling-duet/monster-organ.png` | 540x654 | 0.826 | — | Instrument-monster design: a pipe organ whose case has become a ribca… — *Pipe organ. The case becomes a ribcage; the base becomes li…* | — | div.work-body > section#monsters.section--railed > div.media.duo.duo--portrait > figure.p… |
| 10 | img | `assets/games/dueling-duet/monster-shamisen.png` | 540x782 | 0.691 | — | Instrument-monster design: a shamisen whose tuning peg has become a l… — *Shamisen. The tuning peg becomes an eye; the plectrum becom…* | — | div.work-body > section#monsters.section--railed > div.media.duo.duo--portrait > figure.p… |
| 11 | img | `assets/games/dueling-duet/victory-eastern.jpg` | 1500x1048 | 1.431 | — |  | — | div.work-body > section#video > div.media > div.videobox |

External links: [https://santi5578.itch.io/dueling-duet](https://santi5578.itch.io/dueling-duet) · [Watch the teaser ↗](https://www.youtube.com/watch?v=XcNji5XGJ7g)

### `games/lunch-hours.html` — Lunch Hours — Caiyi Shen
Outline: h1: Lunch Hours / h2: Overview / h2: Dialogue as a physical obstacle / h2: No tutorial level / h2: Why it is made of paper / h2: Festival Playtest & Next Iteration / h3: A Narrower Corridor / h3: Controls and Ergonomics / h3: Collision and Spatial Control / h2: Gameplay

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/games/lunch-hours/cover.jpg` | 811x500 | 1.622 | — | Lunch Hours title art: a school corridor collaged from cut paper, wit… | new-tab: `https://wingmancover.itch.io/lunch-hours` | main#main > header.work-head.work-head--split > a.work-head-media |
| 2 | img | `assets/games/lunch-hours/cg-lunch.jpg` | 1400x978 | 1.431 | — | A painted lunch tray on a metal counter: rice, stir-fried greens, tom… | — | section#overview > div.split.split--overview > div.aside > figure.media-frame |
| 3 | img | `assets/games/lunch-hours/note-02.png` | 560x298 | 1.879 | — | A torn scrap of lined paper with hand-lettered text reading &quot;Wat… | — | main#main > div.work-body > section#mechanic.section--railed > div.media.scraps |
| 4 | img | `assets/games/lunch-hours/note-03.png` | 560x282 | 1.986 | — | A torn scrap of paper with hand-lettered text reading &quot;Who shove… | — | main#main > div.work-body > section#mechanic.section--railed > div.media.scraps |
| 5 | img | `assets/games/lunch-hours/note-01.png` | 560x476 | 1.176 | — | The opening instruction note: a stick figure drawn on lined paper bes… — *The opening instruction note, which is the entire tutorial.* | — | div.work-body > section#tutorial > div.split.split--media-left > div.aside |
| 6 | img | `assets/games/lunch-hours/character-01.png` | 400x885 | 0.452 | — | Paper-cut character standee: a student in a blue tracksuit with purpl… | — | div.split.split--wide-media > div.aside > div.standees > span.standee-media |
| 7 | img | `assets/games/lunch-hours/character-02.png` | 400x856 | 0.467 | — | Paper-cut character standee: a student in a blue tracksuit holding a … | — | div.split.split--wide-media > div.aside > div.standees > span.standee-media |
| 8 | img | `assets/games/lunch-hours/character-03.png` | 400x1076 | 0.372 | — | Paper-cut character standee: a student in a blue tracksuit with green… | — | div.split.split--wide-media > div.aside > div.standees > span.standee-media |
| 9 | img | `assets/games/lunch-hours/cover.jpg` | 811x500 | 1.622 | — |  | — | div.work-body > section#video > div.media > div.videobox |

External links: [https://wingmancover.itch.io/lunch-hours](https://wingmancover.itch.io/lunch-hours) · [Watch on YouTube ↗](https://www.youtube.com/watch?v=AWiWUBo8hog)

### `index.html` — Caiyi Shen — Game Designer · Researcher · Artist
Outline: h1: Caiyi Shen


### `projects/astronomy-playtesting.html` — Moved — 3D Astronomy Game-Based Learning Study
Outline: h1: 3D Astronomy Study


### `projects/axis-ai.html` — Axis AI — Caiyi Shen
Outline: h1: Axis AI / h2: Overview / h2: Courseware from existing material / h2: Interactive scenarios / h2: Learning and feedback flows / h2: Production and iteration / h2: My Contribution

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/axis-ai/axis-university.jpg` | 1400x958 | 1.461 | — | The public Axis University entry screen in Chinese, signed out: the h… — *The public Axis University entry, signed out. Instructors e…* | — | main#main > figure.work-hero.work-hero--compact |
| 2 | img | `assets/projects/axis-ai/simulation-arena.jpg` | 1400x858 | 1.632 | — | The public Simulation Arena page in English, signed out: the heading … — *The public Simulation Arena, signed out, in its English vie…* | — | div.work-body > section#scenarios.section--railed > figure.media.media--track > div.media… |

External links: [Visit Axis University ↗](https://zhongmiao-ai.com/college)

### `projects/boston-bilingual-pioneer-media.html` — Boston Bilingual Pioneer Media — Caiyi Shen
Outline: h1: Boston Bilingual Pioneer Media / h2: Overview / h2: My Contributions / h2: Middle School Mathematics / h2: XiaoMiao Learning Companion / h2: Wellness & Reflection / h2: Psychological Assessment / h3: Jordan visual novel / h3: Evidence board / h3: Report & reflection / h2: Axis AI / h2: IELTS Preparation / h2: XiaoMiao Gen Z / h2: Project Support

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/axis-ai/course-02.jpg` | 1400x851 | 1.645 | — | A 3D lesson scene with two balance scales weighing labelled sacks aga… — *Paired balance scales. Both have to agree before the answer…* | — | section#middle-school-mathematics.module > div.module-body > figure.module-visual > div.m… |
| 2 | img | `assets/projects/axis-ai/course-01.jpg` | 1400x1015 | 1.379 | — | A 3D lever-and-fulcrum scene under a pink sky, with weighted pans and… | — | section#middle-school-mathematics.module > div.module-body > div.jrow > figure.media-frame |
| 3 | img | `assets/projects/axis-ai/course-03.jpg` | 1400x1193 | 1.174 | — | A 3D geometry lesson: a rotating beam of light on a protractor showin… | — | section#middle-school-mathematics.module > div.module-body > div.jrow > figure.media-frame |
| 4 | img | `assets/projects/axis-ai/companion-plaza.jpg` | 1400x906 | 1.545 | — | The companion platform's public character plaza in Chinese, signed ou… — *The public character plaza, signed out. Official characters…* | — | section#xiaomiao-learning-companion.module > div.module-body > figure.module-visual > div… |
| 5 | img | `assets/projects/axis-ai/psych-assessment-vn-1200.webp` | 1200x1219 | 0.984 | 800w 1200w 1770w | The Context Introduction stage of the course 'Crafting Insightful Rep… — *Context Introduction. Dr. Reyes takes the student through J…* | new-tab: `assets/projects/axis-ai/psych-assessment-vn.png` | ol.module-steps > li.module-step > figure.module-step-shot > a.media-frame |
| 6 | img | `assets/projects/axis-ai/psych-assessment-board-1200.webp` | 1200x1038 | 1.156 | 800w 1200w 1588w | The 'Connect the evidence' board. Six clue cards from the referral, J… — *All three patterns found. Each one joins two clues from dif…* | new-tab: `assets/projects/axis-ai/psych-assessment-board.png` | ol.module-steps > li.module-step > figure.module-step-shot > a.media-frame |
| 7 | img | `assets/projects/axis-ai/psych-assessment-report-1200.webp` | 1200x1276 | 0.94 | 800w 1200w 1705w | The 'Improve Jordan's report' activity, in three parts: check the dra… — *The checklist stage, completed. Each draft sentence is matc…* | new-tab: `assets/projects/axis-ai/psych-assessment-report.png` | ol.module-steps > li.module-step > figure.module-step-shot > a.media-frame |
| 8 | img | `assets/projects/axis-ai/axis-university.jpg` | 1400x958 | 1.461 | — | The public Axis University entry screen in Chinese, signed out: the h… — *The public Axis University entry, signed out. Instructors e…* | — | section#axis-ai.module > div.module-body > figure.module-visual > div.media-frame |
| 9 | img | `assets/projects/axis-ai/ielts-module.jpg` | 1215x936 | 1.298 | — | The IELTS card in the public Simulation Arena, in English: Listening,… — *The existing IELTS module as it appears in the platform's p…* | — | section#ielts-preparation.module > div.module-body > figure.module-visual.module-visual--… |
| 10 | img | `assets/projects/axis-ai/genz-home.jpg` | 1000x1248 | 0.801 | — | The public XiaoMiao Gen Z entry screen in Chinese, signed out: the he… — *The public entry screen, signed out, with a button to recor…* | — | section#xiaomiao-gen-z.module > div.module-body > figure.module-visual.module-visual--por… |

External links: [Organisation profile ↗](https://www.idealist.org/en/nonprofit/d25bca7c37c84d3ab808de3879cde134-boston-bilingual-pioneer-media-medford) · [Companion platform ↗](https://www.zhongmiao-ai.com/companion) · [Open Wellness & Reflection ↗](https://zhongmiao-ai.com/gemini) · [Axis University ↗](https://zhongmiao-ai.com/college) · [Try XiaoMiao Gen Z ↗](https://zhongmiao-ai.com/genz/)

### `projects/chinese-character-learning.html` — Moved — Play-based Chinese Character Learning
Outline: h1: Chinese Character Learning


### `projects/cocoa-quest.html` — Cocoa Quest — Caiyi Shen
Outline: h1: Cocoa Quest / h2: Overview / h2: My Contribution / h2: Prototype 1 — Biomaterial Packaging / h3: Design / h3: Physical prototype / h3: Instructions / h3: Prototype 1 — Initial Prototype / h2: Design Iteration / h2: Prototype 2 — Educational Tabletop Game / h2: Biodesign Challenge

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/cocoa-quest/cover-960.webp` | 960x717 | 1.339 | 640w 960w 1280w 1823w | Cocoa Quest title card: the title in golden-brown rounded letters, th… | — | main#main.page--cocoa > figure.work-hero.work-hero--compact |
| 2 | img | `assets/projects/cocoa-quest/prototype-01-design-01-1200.webp` | 1200x838 | 1.432 | 640w 1200w 1800w | An annotated sketch of the kit as an open, cocoa-shell-shaped case. T… | — | section#prototype-1.section--railed > figure.media.media--track > div.jrow > figure.media… |
| 3 | img | `assets/projects/cocoa-quest/prototype-01-design-02-800.webp` | 800x1145 | 0.699 | 400w 800w 1200w | A sketch of the box structure: a cross-shaped board net folds into a … | — | section#prototype-1.section--railed > figure.media.media--track > div.jrow > figure.media… |
| 4 | img | `assets/projects/cocoa-quest/prototype-01-photo-960.webp` | 960x1280 | 0.75 | 480w 960w 1440w | Gloved hands holding the opened Prototype 1 package: a dark brown, gl… — *Prototype 1, opened, with the kit's paper mold, wooden spoo…* | — | div.work-body > section#prototype-1.section--railed > figure.media.media--track.media--po… |
| 5 | img | `assets/projects/cocoa-quest/prototype-01-instructions-01-1400.webp` | 1400x897 | 1.561 | 800w 1400w 2000w 2600w | An illustrated instruction sheet. Safety warnings: adult supervision … — *Prototype instruction sheet 1: safety, kit contents, and th…* | new-tab: `assets/projects/cocoa-quest/prototype-01-instructions-01.jpg` | div.work-body > section#prototype-1.section--railed > figure.media > a.media-frame.media-… |
| 6 | img | `assets/projects/cocoa-quest/prototype-01-instructions-02-1300.webp` | 1300x1276 | 1.019 | 700w 1300w 1900w | The second instruction sheet. A sample nutrition facts panel with ing… — *Prototype instruction sheet 2: product information, cocoa f…* | new-tab: `assets/projects/cocoa-quest/prototype-01-instructions-02.jpg` | div.work-body > section#prototype-1.section--railed > figure.media.media--portrait > a.me… |
| 7 | iframe | `https://drive.google.com/file/d/1WhAIUnlOQIHVuqQGKLFQDgB-CMQ8lAii/preview` | external |  | — |  — *Prototype 1 — Initial Prototype. The first stage of the pro…* | — | div.work-body > section#prototype-1.section--railed > figure.media.media--track > div.vid… |
| 8 | img | `assets/projects/cocoa-quest/child-labor-story-comic-1400.webp` | 1400x545 | 2.569 | 800w 1400w 2000w 2878w | A four-panel comic. A child is led away from their family by a man. T… — *A story about child labor in cocoa production, used as desi…* | — | div.work-body > section#iteration.section--railed > figure.media > div.media-frame |

Embeds: iframe `https://drive.google.com/file/d/1WhAIUnlOQIHVuqQGKLFQDgB-CMQ8lAii/preview` ("Cocoa Quest, Prototype 1: initial prototype video")

External links: [Watch on Google Drive ↗](https://drive.google.com/file/d/1WhAIUnlOQIHVuqQGKLFQDgB-CMQ8lAii/view?usp=sharing)

### `projects/generate-deeplight-games.html` — Generate / Deeplight Games — Caiyi Shen
Outline: h1: Generate / Deeplight Games / h2: Overview / h2: Combat UI Design / h2: Tarot Card Design / h2: Character & Environment Concept Design / h2: My Contribution / h2: Status

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/generate-deeplight-games/generate-logo.png` | 1348x444 | 3.036 | — | The Generate logo: a blue and black segmented circular mark beside th… | — | main#main.page--generate > figure.work-hero.logo-plate.logo-plate--hero |
| 2 | img | `assets/projects/generate-deeplight-games/health-bar-ui-1400.webp` | 1400x403 | 3.474 | 800w 1400w 2109w | A horizontal health bar: a thin gold frame around a bar that fades fr… — *Health Bar UI Shown on a dark ground so its light end stays…* | new-tab: `assets/projects/generate-deeplight-games/health-bar-ui.png` | div.art-duo > section#combat-ui.art-duo-item.art-duo-item--ui > figure.art-piece > a.medi… |
| 3 | img | `assets/projects/generate-deeplight-games/tarot-card-design-v2-838.webp` | 838x1556 | 0.539 | 420w 838w | A tall tarot card: an ornate gold frame with crescent moons and four-… — *Tarot Card Card frame and face design. Full size ↗* | new-tab: `assets/projects/generate-deeplight-games/tarot-card-design-…` | div.art-duo > section#tarot-card.art-duo-item.art-duo-item--card > figure.art-piece > a.m… |
| 4 | img | `assets/projects/generate-deeplight-games/character-map-design-01-1400.webp` | 1400x919 | 1.523 | 800w 1400w 2000w 2263w | Concept sheet. Left: a character in a pale green outfit annotated 'Qi… — *Concept Design 01 Character and corresponding map. Full siz…* | new-tab: `assets/projects/generate-deeplight-games/character-map-desi…` | section#concept-design.section--railed > div.art-stack > figure.media.art-piece > a.media… |
| 5 | img | `assets/projects/generate-deeplight-games/character-map-design-02-1400.webp` | 1400x947 | 1.478 | 800w 1400w 2107w | Concept sheet. Left: a blonde character in a green outfit annotated '… — *Concept Design 02 Character and corresponding map. Full siz…* | new-tab: `assets/projects/generate-deeplight-games/character-map-desi…` | section#concept-design.section--railed > div.art-stack > figure.media.art-piece > a.media… |
| 6 | img | `assets/projects/generate-deeplight-games/character-map-design-03-1400.webp` | 1400x831 | 1.685 | 800w 1400w 2000w 2478w | Concept sheet. Left: a character with lilac ringlets, black ribbons a… — *Concept Design 03 Character and corresponding map. Full siz…* | new-tab: `assets/projects/generate-deeplight-games/character-map-desi…` | section#concept-design.section--railed > div.art-stack > figure.media.art-piece > a.media… |

External links: [Generate website ↗](https://generatenu.com/)

### `projects/schoolive.html` — Schoolive — Caiyi Shen
Outline: h1: Schoolive / h2: Overview / h2: Design challenge / h2: Core loop / h2: Key design decisions / h2: Working the loop on paper first / h2: Character design

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/schoolive/game-cover-1200.webp` | 1200x675 | 1.778 | 800w 1200w 1600w | The restaurant at night: two characters behind the counter, the day's… | — | main#main > figure.work-hero |
| 2 | img | `assets/projects/schoolive/cooking-1200.webp` | 1200x675 | 1.778 | 800w 1200w 1600w | The cooking interface: choosing a tagged ingredient, then a cooking m… | — | div.work-body > section#loop.section--railed > div.media > figure.media-frame |
| 3 | img | `assets/projects/schoolive/gameplay-02-1200.webp` | 1200x675 | 1.778 | 800w 1200w 1600w | A second view of the restaurant during service, showing the day's men… | — | div.work-body > section#decisions.section--railed > div.media > figure.media-frame |
| 4 | img | `assets/projects/schoolive/systems-sketch.jpg` | 1300x908 | 1.432 | — | Hand-drawn systems sketch mapping the restaurant loop: wholesale, sto… | — | section#systems > div.split > div.aside > figure.media-frame |
| 5 | img | `assets/projects/schoolive/character-amelia.jpg` | 754x1194 | 0.631 | — | Annotated character design sheet for Amelia: a figure in a black laye… — *Amelia. The design leans on her mysterious background and a…* | — | div.work-body > section#characters.section--railed > div.media.duo > div.media-frame |
| 6 | img | `assets/projects/schoolive/character-kagami.jpg` | 754x1194 | 0.631 | — | Annotated character design sheet for Kagami: a figure in a white and … — *Kagami. A Japanese character in an alternate-world setting:…* | — | div.work-body > section#characters.section--railed > div.media.duo > div.media-frame |

### `research.html` — Research — Caiyi Shen
Outline: h1: Research / h2: Selected Research / h3: Neural Entrainment Child-Friendly EEG Adaptation / h3: BeforeHello Communication Support for Autistic Adults / h3: 3D Astronomy Game-Based Learning Study / h3: Boston Bilingual Pioneer Media Applied Learning-Product…

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/research/neural-entrainment/stimulus.jpg` | 1600x900 | 1.778 | — | The child-facing visual stimulus: a softly glowing jellyfish with clo… | — | section#projects.band.band--last > ol.rlist > li.rentry > figure.rentry-media |
| 2 | img | `assets/research/mind-match-cloud/app-home.jpg` | 760x1645 | 0.462 | — | The prototype's home screen on a phone, offering two ways to share: r… | — | section#projects.band.band--last > ol.rlist > li.rentry > figure.rentry-media.media--phone |
| 3 | img | `assets/research/astronomy/at-play-in-the-cosmos-star-chart.jpg` | 1535x858 | 1.789 | — | The in-game Interactive Star Chart: a view of the Milky Way with the … — *At Play in the Cosmos — Interactive Star Chart. Herder & Ra…* | — | section#projects.band.band--last > ol.rlist > li.rentry > figure.rentry-media |
| 4 | img | `assets/projects/axis-ai/course-02.jpg` | 1400x851 | 1.645 | — | A 3D mathematics lesson with two balance scales weighing labelled sac… | — | section#projects.band.band--last > ol.rlist > li#boston-bilingual-pioneer-media.rentry > … |

### `research/astronomy-learning.html` — 3D Astronomy Game-Based Learning Study — Caiyi Shen
Outline: h1: 3D Astronomy Game-Based Learning Study / h2: Research question / h2: Method and my role / h2: From observation notes to something the team could act … / h2: Output

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/research/astronomy/at-play-in-the-cosmos-star-chart.jpg` | 1535x858 | 1.789 | — | The in-game Interactive Star Chart: a view of the Milky Way with the … | — | section#question > div.split.split--overview > div.aside > figure.media-frame |

External links: [Herder & Rau (2022), Frontiers in Educa…](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2022.919645/full)

### `research/beforehello.html` — BeforeHello — Caiyi Shen
Outline: h1: BeforeHello / h2: How the project is framed / h2: Participants in the loop / h2: My involvement / h2: Current status

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/research/mind-match-cloud/app-home.jpg` | 760x1645 | 0.462 | — | The prototype's home screen on a phone: a greeting, a card to record … | — | section#framing > div.split.split--overview > div.aside > figure.media-frame.media--phone |

### `research/mind-match-cloud.html` — BeforeHello — Caiyi Shen
Outline: —


### `research/neural-entrainment.html` — Neural Entrainment — Caiyi Shen
Outline: h1: Neural Entrainment / h2: Research question / h2: Engagement cannot break timing / h2: Stimulus directions and tradeoffs / h2: Implementation and synchronization / h2: Current status

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/research/neural-entrainment/stimulus.jpg` | 1600x900 | 1.778 | — | The child-facing visual stimulus: a softly glowing jellyfish with clo… — *The current stimulus direction. Calm enough to watch for se…* | — | main#main > figure.work-hero.work-hero--compact |
| 2 | img | `assets/research/neural-entrainment/psychopy-part1.jpg` | 1500x988 | 1.518 | — | The PsychoPy instruction screen for Part 1, showing the jellyfish sti… | — | section#directions > div.split.split--overview > div.aside > figure.media-frame |

### `works/echoes-of-chinese-characters.html` — Echoes of Chinese Characters — Caiyi Shen
Outline: h1: Echoes of Chinese Characters / h2: Why I made it / h2: Core loop / h2: Iteration, the strongest part of the project / h2: Project materials

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/echoes/preview.jpg` | 1400x787 | 1.779 | — | The pictogram tile set: painted sun, moon, mountain, water, fish and … | — | main#main > figure.work-hero |
| 2 | img | `assets/projects/echoes/slide-01-basics.jpg` | 1333x750 | 1.777 | — | Deck page: basic info, covering game type, date, tags, and the backgr… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 3 | img | `assets/projects/echoes/slide-02-inspiration.jpg` | 1333x750 | 1.777 | — | Deck page: inspiration, covering playing Dixit, observation at a Mont… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 4 | img | `assets/projects/echoes/slide-03-why.jpg` | 1333x750 | 1.777 | — | Deck page: why I made this game, on teaching Chinese characters to Am… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 5 | img | `assets/projects/echoes/slide-04-elements.jpg` | 1333x750 | 1.777 | — | Deck page: game elements, covering pictogram tiles, prompt cards, and… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 6 | img | `assets/projects/echoes/slide-05-gameplay.jpg` | 1333x750 | 1.777 | — | Deck page: game play, covering setup, draw phase, build phase, guess … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 7 | img | `assets/projects/echoes/slide-06-iteration.jpg` | 1333x750 | 1.777 | — | Deck page: design iteration, with a photograph of early card versions… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 8 | img | `assets/projects/echoes/slide-07-art.jpg` | 1333x750 | 1.777 | — | Deck page: game art development process, showing the six pictogram ti… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 9 | img | `assets/projects/echoes/slide-08-vision.jpg` | 1333x750 | 1.777 | — | Deck page: final vision, covering expanding age groups, customization… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |

### `works/elixir-nomad.html` — Elixir Nomad — Caiyi Shen
Outline: h1: Elixir Nomad / h2: Overview / h2: How the crafting system works / h2: Art / h2: Project deck

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/elixir-nomad/preview.jpg` | 1400x788 | 1.777 | — | Elixir Nomad title art: a painted view through the wooden window of a… | — | main#main > figure.work-hero |
| 2 | img | `assets/projects/elixir-nomad/deck-01.jpg` | 1300x731 | 1.778 | — | Deck page: Elixir Nomad title page. | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 3 | img | `assets/projects/elixir-nomad/deck-02.jpg` | 1300x731 | 1.778 | — | Deck page: basic info, covering engine, date, tags, and the backgroun… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 4 | img | `assets/projects/elixir-nomad/deck-03.jpg` | 1300x731 | 1.778 | — | Deck page: game play, covering the alchemy crafting system, open expl… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 5 | img | `assets/projects/elixir-nomad/deck-04.jpg` | 1300x731 | 1.778 | — | Deck page: function, covering educational value, engagement, and envi… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 6 | img | `assets/projects/elixir-nomad/deck-05.jpg` | 1300x731 | 1.778 | — | Deck page: chemistry research notes behind the reagent and synthesis … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 7 | img | `assets/projects/elixir-nomad/deck-06.jpg` | 1300x731 | 1.778 | — | Deck page: programming development process, showing Blueprint graphs … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 8 | img | `assets/projects/elixir-nomad/deck-07.jpg` | 1300x731 | 1.778 | — | Deck page: game art development process, showing the NPC figure, mate… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 9 | img | `assets/projects/elixir-nomad/deck-08.jpg` | 1300x731 | 1.778 | — | Deck page: Arduino development process, showing the sensor board and … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |

### `works/night-adios.html` — Night, Adios — Caiyi Shen
Outline: h1: Night, Adios / h2: The world / h2: Iteration / h2: Project deck / h2: Art and implementation

| # | Type | Asset | File | Ratio | srcset | Alt / caption | Click target | Context (grouping) |
| ---: | --- | --- | --- | ---: | --- | --- | --- | --- |
| 1 | img | `assets/projects/night-adios/preview.jpg` | 1400x788 | 1.777 | — | Night, Adios title art: a pink pixel-art subway carriage with the tit… | — | main#main > figure.work-hero |
| 2 | img | `assets/projects/night-adios/deck-01.jpg` | 1300x731 | 1.778 | — | Deck page: Night, Adios title page with the game's tagline. | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 3 | img | `assets/projects/night-adios/deck-02.jpg` | 1300x731 | 1.778 | — | Deck page: basic info, covering engine, date, tags, and the backgroun… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 4 | img | `assets/projects/night-adios/deck-03.jpg` | 1300x731 | 1.778 | — | Deck page: the New York subway as inspiration, with reference photogr… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 5 | img | `assets/projects/night-adios/deck-04.jpg` | 1300x731 | 1.778 | — | Deck page: why I made this game, covering the city as a microcosm, so… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 6 | img | `assets/projects/night-adios/deck-05.jpg` | 1300x731 | 1.778 | — | Deck page: game play, covering NPC interactions, strategic management… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 7 | img | `assets/projects/night-adios/deck-06.jpg` | 1300x731 | 1.778 | — | Deck page: design iteration, covering the 3D to 2D transition, resour… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 8 | img | `assets/projects/night-adios/deck-07.jpg` | 1300x731 | 1.778 | — | Deck page: character design for Hiroshi, with background story and ab… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 9 | img | `assets/projects/night-adios/deck-08.jpg` | 1300x731 | 1.778 | — | Deck page: character design for Mia, with background story and abilit… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 10 | img | `assets/projects/night-adios/deck-09.jpg` | 1300x731 | 1.778 | — | Deck page: programming development process, showing Unreal Blueprint … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 11 | img | `assets/projects/night-adios/deck-10.jpg` | 1300x731 | 1.778 | — | Deck page: game art development process, showing 2D assets, player wa… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 12 | img | `assets/projects/night-adios/deck-11.jpg` | 1300x731 | 1.778 | — | Deck page: the 2D and 3D application pipeline, listing Aseprite, Proc… | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |
| 13 | img | `assets/projects/night-adios/deck-12.jpg` | 1300x731 | 1.778 | — | Deck page: final vision, covering narrative depth, social impact and … | — | main#main > div.work-body > section#materials.section--railed > div.media.deck |

External links: [Watch it in play ↗](https://vimeo.com/1029931625)
