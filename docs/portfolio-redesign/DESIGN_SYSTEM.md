# Design systems

Each direction has its own complete system. Tokens live at the top of `prototypes/src/{a,b,c}/{a,b,c}.css`. The shared base layer (`prototypes/src/shared/base.css`) contains no visual identity, only reset, accessibility primitives, reveal and lightbox skeletons.

## Fonts (all self-hosted, SIL Open Font License 1.1)
Installed from npm (Fontsource) and copied into `preview/shared/fonts/` by the build; licence notes are in `preview/shared/fonts/LICENSES.md`. Only the Latin subset is shipped.

| Direction | Display | Text / UI | Metadata | Rationale |
| --- | --- | --- | --- | --- |
| A | Archivo Variable, wdth 118–125 %, wght 300–500, uppercase | Archivo, wdth 100 %, 400 | IBM Plex Mono 400/500, 0.62–0.74 rem, +0.07–0.08 em, uppercase | One variable family covers display and text through the width axis; mono marks everything measured |
| B | Cormorant Variable 300 (italics for emphasis) | Jost Variable 300/400 | Jost 400, 0.6–0.7 rem, +0.22–0.34 em, uppercase | Light, high-contrast serif for atmosphere, set against a geometric sans that stays legible at small sizes |
| C | Instrument Serif 400 roman / italic | Instrument Sans Variable 400–600 | Instrument Sans 600 at wdth 85 %, 0.56–0.66 rem, +0.24–0.32 em | One superfamily — serif display, sans interface — gives one authorial voice |

### Type scale
| Role | A | B | C |
| --- | --- | --- | --- |
| Hero name | clamp(3.6rem, 10.4vw, 11.8rem) / .9 | clamp(4.2rem, 11.5vw, 12.5rem) / .82 | clamp(3.6rem, 10.5vw, 11rem) / .9 |
| Page title | clamp(3.4rem, 8.6vw, 9.6rem) | clamp(3rem, 7.2vw, 7.6rem) | clamp(3.6rem, 10vw, 10.5rem) |
| Section | clamp(1.7rem, 3.4vw, 3rem) | clamp(2.2rem, 4.6vw, 4.2rem) | (labels only; titles via reels) |
| Item title | clamp(1.5rem, 2.6vw, 2.4rem) | clamp(2rem, 3.6vw, 3.3rem) | clamp(2.4rem, 5vw, 4.8rem) |
| Body | 1rem / 1.62 | 1.04rem / 1.75 (300) | 1rem / 1.7 |
| Label | 0.7rem mono | 0.64–0.7rem tracked | 0.6–0.66rem condensed tracked |

## Colour and material
| Token | A | B | C |
| --- | --- | --- | --- |
| Ground | `#e6e9eb` concrete | `#070c11` abyss → `#1c2d39` mist | `#060708` carbon |
| Raised | `#eff1f2`, `#f7f8f8` | `#12202a` tide | `#0c0e10`, `#15181b` |
| Ink | `#101316` / `#3b4148` / `#6a727a` | `#e3edf2` / `#aebfc8` / `#7590a0` | `#ecedea` / `#b3b8ba` / `#7a8186` |
| Lines | ink at 13 % / 30 % | frost at 14 % / 30 % | white at 12 % / 26 % |
| Accent | cobalt `#2b45d8` (state only) | moonlight `#cfe7f2` | steel `#9db3bf` (focus only) |
| Card edge | champagne gold `#cdb98a`, roughness 0.28 | pale gold `#d8c18f`, 0.24 | aged gold `#cdb27c`, 0.44 |
| Inverted band | `#0e1114` (practice map, research extras) | — | — |

All three meet WCAG AA for body text. The lowest-contrast text used for prose is A's `#3b4148` on `#e6e9eb` (≈9:1), B's `#aebfc8` on `#070c11` (≈11:1) and C's `#b3b8ba` on `#060708` (≈11:1). Muted metadata tones (`--*-3`) are used only for labels at 0.56 rem and above with heavy tracking and are not used for essential information.

## Grid and spacing
- **A:** 12 columns, gutter clamp(14px, 1.6vw, 24px), outer margin clamp(20px, 4vw, 64px). Blocks are separated by hairlines, with vertical rhythm clamp(4rem, 10vh, 8rem).
- **B:** 12 columns used asymmetrically, margin clamp(22px, 5vw, 88px). Long vertical spacing (clamp(5rem, 14vh, 10rem)) and deliberate offsets of 3–8 vh between neighbours.
- **C:** centred compositions; frames span the content width at 2.39:1, 16:9 or 4:3. Very long spacing between scenes (clamp(7rem, 22vh, 13rem)).

## Components by direction
| Component | A | B | C |
| --- | --- | --- | --- |
| Navigation | Fixed bar with numbered mono links + left progress rail; mobile: clip-path drop-down index | Transparent top bar, tracked links with centre-out underline; mobile: blurred veil with serif links | Four corners + full-screen Index overlay |
| Buttons | Rectangular, 1 px ink border, fill sweeps from the left | Text links with growing rule; CV uses solid/ghost pills | Underlined tracked text with arrow; one solid variant |
| Project item | Dossier spread + spec table | "Tale": offset image + serif title + meta rule | 2.39:1 still + centred credits |
| Status | Square mono chip | Tracked label | Credit row |
| Filters | Sticky segmented mono buttons | Text toggles with diamond marker | Underlined text toggles |
| Art | Catalogue-numbered frames on light panels, spans by aspect ratio | Masonry with echo frames | One work per screen on black |
| Lightbox | Light | Dark tide | Black |
| Footer | Contact block on raised panel | Correspondence on fading veil | End credits |

## Interaction states
- Focus: a 2 px outline in each direction's accent, offset 3 px, never removed.
- Hover is never the only carrier of information. Legacy links (pages not rebuilt in a prototype) carry a title attribute and an alias cursor.
- Reduced motion: no intro choreography; the card renders one still frame; reveals show immediately; page transitions are reduced to near-instant.

## Page transitions
All three use cross-document View Transitions (`@view-transition { navigation: auto; }`), which are progressive and ignored where unsupported. The headers carry their own `view-transition-name` so they stay stable.
- **A:** the new page wipes up with `clip-path`.
- **B:** the old page blurs out and the new one rises in.
- **C:** fade to black, then fade in.
