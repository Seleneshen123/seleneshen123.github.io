# Art direction — three independent concepts

All three share the same factual content (`prototypes/src/content.mjs`), the same original artwork and the same tarot engine. They do **not** share layouts, type, colour, materials, motion or navigation.

The tarot card is one signature element in each, not the brand. Every homepage also carries the practice areas, current work, research, art and community, so the site works for game-design, research and art applications alike.

---

## A — Cinematic Futurism · "Frontier Dossier"
**Reference:** Arknights: Endfield. **Mood:** a clean-room specimen archive — cold light, measured, authored.

- **Ground:** cold concrete (`#e6e9eb`), graphite ink, and one cobalt "signal" (`#2b45d8`) used only for active states, focus and a single ring arc.
- **Type:** Archivo at 118–125 % width for display (uppercase, light weights, with an outline treatment for the surname). Archivo at 100 % for text. IBM Plex Mono for every piece of metadata: index numbers, `[ 02 ] Game Design`, spec labels.
- **Composition:** a strict 12-column grid with hairline dividers. Pages read as documents: a numbered index of four divisions, dossier spreads (image 7 cols / spec 5 cols, alternating), spec tables (Role / Context / Period / Status), and a dark "practice map" table. A fixed left rail shows the page code and scroll progress.
- **The card:** suspended at the right of a pale, foggy volume. A luminous vertical aperture sits behind it, two thin orbital rings with 5° tick marks and one cobalt arc surround it, and a faint floor grid recedes into fog. About 9,000 fine dark particles drift laterally like air in a wind tunnel, plus a few defocused foreground specks. The entrance is a precise mechanical dolly with a cobalt-edged dissolve reveal.
- **Motion:** short and engineered — wipe-up page transitions (clip-path), buttons that fill from one side, rows that shift 0.6 rem on hover.
- **Risk to watch:** the light palette could tip into "corporate". It is kept from that by the specimen scene, the outline display type and the dossier tone.

## B — Ethereal Fantasy · "Night Tide"
**References:** Wuthering Waves, Cardcaptor Sakura. **Mood:** a quiet, luminous night by the sea; magic as choreography, not ornament.

- **Ground:** deep tide blues (`#070c11` → `#1c2d39`), frost text, and moonlight (`#cfe7f2`) as the only accent. There is no gold in the UI — the only warm metal on the page is the artwork itself.
- **Type:** Cormorant Light (with italics for emphasis) for display. Jost at small sizes with wide tracking (0.26–0.34 em) for navigation and labels. Roman numerals in italic serif number the chapters.
- **Composition:** asymmetric and layered. "Tales" alternate image and text with deliberate vertical offsets, and a floating gallery staggers artworks at different heights. An "echo" frame — a second hairline offset by 10 px — recurs around images as a quiet depth motif.
- **The card:** summoned. It rises from below with an in-plane turn while a helix of about 1,300 fine motes converges around it (mode 1 particles in the card's local space), over three drifting fbm fog sheets and a faint halo. Bloom is subtle and the exposure is kept low enough that the art stays legible. Scrolling lifts the camera up and through the motes.
- **Site-wide world:** a lighter version of the same atmosphere (no card, no post-processing, pixel ratio capped at 1.25) sits fixed behind every subpage, so the whole site lives in one place.
- **Motion:** slow — blur-and-rise page transitions, underlines that grow from the centre, echo frames that open on hover.
- **Risk to watch:** fantasy clichés. Magic circles, gothic ornament and gold UI were explicitly avoided.

## C — Cinematic Minimalism · "Stills"
**References:** Death Stranding 2, premium editorial game sites. **Mood:** patient and adult; the work is framed like film.

- **Ground:** carbon black (`#060708`) and cold paper white, with a steel-blue tint (`#9db3bf`) reserved for focus.
- **Type:** Instrument Serif for display (single weight, roman and italic). Instrument Sans for interface, set condensed (85 % width) and tracked 0.3 em for labels. One superfamily gives one voice.
- **Composition:** four-corner navigation: the name top-left, a full-screen **Index** top-right, the section top-left, and a scroll progress line bottom-right. Featured work appears as 2.39:1 letterboxed stills with centred film-credit blocks. Subpages open with a title card ("Part two — Game Design") beside a single still, and the art page shows one work at a time on black.
- **The card:** small and alone in a void, lit by one cold overhead spotlight. An additive cone suggests the beam, dust is visible only inside it, and a faint pool of light sits on an unseen floor. The camera makes a slow 4.6 s push-in, then barely drifts. Scrolling pulls back and up as the beam dims.
- **Motion:** almost none — fade-to-black cuts between pages, slow opacity reveals, italic shifts on hover.
- **Risk to watch:** emptiness. Each page has a clear focal image, and the home sequence carries five content sections.

---

## Shared principles
- Original artwork is always the focal point. Previews never crop the artwork itself (`object-fit: contain` on art); only project screenshots are cropped for frames.
- Statuses are always visible and consistent: *Professional · ongoing*, *Client project · in development*, *Team project · in development*, *Academic research · ongoing / completed*, *Earlier release*.
- Location labels (city/state of residence or workplace) are removed everywhere.
