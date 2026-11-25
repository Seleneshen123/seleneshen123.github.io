# Visual QA

Every page was rendered with real assets in headless Edge with GPU rendering (ANGLE / Direct3D 11, NVIDIA RTX 3070 Ti) using `prototypes/tools/shots.mjs`. Screenshots were inspected visually before each fix (see DEVLOG.md for what each render revealed). The reproducible commands are below.

## Coverage (final pass, 2026-11-25)
- **3 directions × 8 pages** (home, game design, research, art, project: Generate / Deeplight, community, CV, contact) **× 4 viewports** (1920×1080, 1440×900, 820×1180 tablet, 390×844 mobile at 2× DPR) = **96 renders.** Full-page captures were also made at 1440 and 390 during iteration.
- **Result: 96/96 clean.** No horizontal overflow, no broken images, no console errors or warnings, no failed network requests. The only "off-right" elements reported are inside the intentionally horizontally scrolling art strips and mobile filter rows.
- **The tarot intro** was recorded as timed frames at 0.4 / 1.2 / 2.2 / 3.4 / 6.5 s for each direction (`screens/tarot-intro-filmstrip.png`).

## Interaction tests (`prototypes/tools/interact.mjs`)
| Check | A | B | C |
| --- | --- | --- | --- |
| Keyboard: first 14 tab stops all show a focus ring; first stop is the skip link | ✓ | ✓ | ✓ |
| Tag filter: Tabletop → 2 of 11, live status text, `#tag=` hash, restore all | ✓ | ✓ | ✓ |
| Lightbox: opens, → advances, full-size image loads, closes, focus returns | ✓ | ✓ | ✓ |
| CV: `<object>` PDF embed, 200 `application/pdf`, Download + Open-in-new-tab links, fallback links inside the object | ✓ | ✓ | ✓ |
| Mobile menu: opens, focus moves inside, Esc closes | ✓ | ✓ (fixed) | ✓ (fixed) |
| Reduced motion: scene renders one still frame; no content hidden | ✓ | ✓ | ✓ |
| External links use `rel="noopener"` | ✓ | ✓ | ✓ |
| No WebGL (`--disable-webgl`): the original artwork is shown as a static image in the composition | ✓ | ✓ | ✓ |

## Performance
Headless and uncapped, so these figures are relative, not absolute:
- **Frame rate:** about 160 fps on all three homes.
- **Worst frame over 3 s:** 6 ms (A), 19 ms (B, desktop with bloom), 13 ms (C).
- **Pixel ratio:** capped at 1.75 on desktop and 1.5 on mobile, and lowered automatically after sustained slow frames.
- **Rendering pauses** when the scene is off-screen or the tab is hidden.
- **B's subpage atmosphere** runs without post-processing at a pixel ratio of at most 1.25.

## Paths and hosting
- No root-absolute URLs in any generated page; everything is relative, so `/preview/` works as a GitHub Pages sub-path.
- **Fonts and Three.js are vendored** into `preview/shared/`, so no CDN is used.
- **The original site at the repository root is untouched.**

## Visual review — honest assessment per direction
- **A:** the strongest information hierarchy and the most "professional dossier" feel. The light palette is distinctive among game portfolios. Risk: it can read as corporate if the copy turns dry.
- **B:** the most atmospheric and the most continuous across pages, because the world persists. Risk: the dark, low-contrast mood may hide information density; images need their echo frames to separate from the ground.
- **C:** the most restrained and cinematic; original artwork reads best on black. Risk: long scroll lengths, since the spacing is deliberately generous.

## Known limitations
- Only one complete project page (Generate / Deeplight) is rebuilt per direction. Other project links go to the current live pages, marked with an alias cursor and tooltip.
- The embedded PDF depends on the browser's PDF viewer. Mobile browsers usually show the fallback links instead, which is intended.
- **Not cross-browser tested:** Safari and Firefox were not available in this environment. View Transitions degrade gracefully where unsupported.
- Bloom is disabled below 768 px for performance, so the mobile scenes are slightly flatter.
- Copy is factual from `main`, except one interpretive line in B (flagged in DEVLOG.md).

## Re-running
```
cd prototypes
npm install && npm run build
npm run serve                      # http://localhost:4190/preview/
node tools/shots.mjs ../.qa http://localhost:4190/preview/a/ 1920x1080,1440x900,820x1180,390x844 index.html game-design.html
node tools/interact.mjs http://localhost:4190/preview/a/
```

---

# Direction C revision (C2) — QA, 2026-11-25

Technical QA and content/visual QA were run as separate tasks.

## Technical QA
- **Render matrix:** all 25 C2 pages + the foil lab × 1920×1080, 1440×900, 820×1180, 390×844 = **104 renders, 104 clean** (no horizontal overflow, broken images, console errors or failed requests). The cover's WebGL scene is live at every size.
- **Interaction (main's own scripts running in C2):**
  - Lightbox: 12 items; opens the full-size file; Esc closes; focus returns.
  - Tag filter: Tabletop → 2 projects, `#tag=` hash set.
  - Mobile index: opens, focus moves in, Esc closes, focus returns.
  - CV: embedded PDF 774 px tall, 200 `application/pdf`; Download, Open-in-new-tab and fallback links present; no location labels.
- **Chapter navigation:** see CHAPTER_NAVIGATION.md (all cases pass, including the momentum case that failed on the first attempt).
- **Contrast on #0a0b0d:** body 5.7:1, metadata 7.7:1, navigation 5.7:1, labels 9.9:1, chips 11.9:1 (WCAG AA ≥ 4.5).
- **Reduced motion:** the name shows immediately, the scene renders a still frame, and transitions are near-instant.
- **Fallbacks:** without WebGL the original artwork image is shown; without JS every page is main's readable markup.

## Content regression QA
- **Automated:** `prototypes/tools/audit-content.mjs` inventories main and C2 and `parity-diff.mjs` compares them. **137 media elements across 24 pages: 0 regressions.** Two documented intentional differences (cover; CV preview and location labels). See CONTENT_PARITY_AUDIT.md and `audit/PARITY_RESULT.md`.
- **Visual:** full-page screenshots of main and C2 were placed side by side for 20 pages and inspected. Research, Game Design, Art, Cocoa Quest, Generate and BBPM were inspected closely. Image order, pairings, proportions, captions and groupings are identical to main; only colour, type and chrome differ. One regression was found this way that the automated diff could not see: the health-bar plate turned light under the inverted palette. It was fixed by pinning it to dark.

## Screenshots
`docs/portfolio-redesign/screens-c2/` contains:
- the cover at 1440, 1920, tablet and mobile;
- the opening filmstrip;
- the foil lab;
- main-vs-C2 side-by-side pages.
