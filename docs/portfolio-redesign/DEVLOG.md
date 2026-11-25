# Development log — creative rebuild

Branch `redesign/creative-rebuild`, worktree `portfolio_site-creative-rebuild`, created 2026-11-25 from `origin/main` at `f76c2fa` after verifying that `index.html`, `game-design.html` and `styles.css` on `main` are byte-identical to the live site. The upstream link is removed; nothing has been pushed. The five earlier redesign branches and their worktrees are untouched.

## Milestones (local commits)
1. Prototype toolchain, shared tarot engine, Direction A.
2. Direction B.
3. Direction C.
4. Card-back concept studio and the A/B/C comparison page.
5. QA fixes, documentation.

## Iteration notes (what the renders showed, and the fix)
- **A, first render:** the card sat mid-screen and collided with the name (the camera was looking at the card), and a dark smudge appeared in the panel's olive-brown area. The gold detector was classifying the brown panel as metal. → The camera now looks at the origin while the card sits at about 70 % of the width, and gold detection is limited to bright, saturated gold.
- **A, mobile:** the card was stretched because the canvas was CSS-shrunk while the renderer measured the full hero. → The scene moved into its own `.stage` element, sized per breakpoint and measured by the engine.
- **A:** CSS corner brackets could not stay aligned with a 3D object across aspect ratios → removed. Division titles wrapped → set to no-wrap at a smaller scale. The 2×2 "current work" grid felt templated → changed to an asymmetric 7/5 / 5/7 rhythm with offsets.
- **B, first render:** a snowstorm of oversized, defocused motes and a blown-out card (bloom, exposure and halo combined). → Motes reduced to 1,300 small, sharp points in a tight helix; exposure 0.92; bloom threshold 0.88; halo halved; card moved right of the name.
- **B, tablet:** the page was 15,000 px tall because every grid collapsed to one column below 900 px → multi-column layouts kept to 640 px. The card sat too high in portrait → lowered and scaled. The caption overlapped the card → moved into the text flow on small screens. The edge highlight bloomed → edge roughness raised.
- **C, first render:** the corner navigation was invisible over the canvas (`view-transition-name` made the header a stacking context beneath the stage) → the header now has its own z-index. Dust filled the whole frame, too close to B → masked to the beam, with a stronger cone. Title cards were empty → each now has a still. The Research still duplicated the first study's image → swapped for the PsychoPy instruction screen. The Cocoa Quest frame cropped the title card mid-word → swapped for the prototype photograph.
- **All, intro:** the poster image ghosted for about 0.4 s before the 3D card summoned → a pre-paint WebGL flag now hides the poster whenever the card will replace it. A's dissolve looked "magical" (wrong for an engineered aesthetic) → added a per-theme reveal noise mix: A uses a precise scan, B noise, C in between.
- **All:** the post-processing chain had no MSAA → 4× MSAA render target (2× on mobile). Foreground bokeh rendered as hollow rings → filled soft discs.
- **B and C mobile menu:** focus did not move into the menu, because a visibility transition made the links unfocusable at the instant of opening → focus is deferred by one frame.

## Content decisions
- All facts come from `main`. Featured order keeps main's hierarchy: BBPM 01, Generate 02, Cocoa Quest 03, Schoolive 04. Research order is as on main. Earlier itch.io releases stay in an "archive", labelled as earlier work.
- **Status labels** are consistent: Professional · ongoing; Client project · in development; Team project · in development; Studio project · ongoing; Academic research · ongoing / completed; Earlier release.
- **The statement** ("Game design, player-experience research and original 2D/3D art — shaped by a background in psychology") is built only from the degrees and current roles. B's prologue line ("Three practices, one way of looking…") is interpretive copywriting and is marked here as **draft copy for approval**.
- **Practice map:** each discipline lists only projects and roles that exist on the site.
- **Removed from prototypes:** personal location labels (Boston/Madison/Houston/Beijing on institution lines) and the GDC jam's city and dates. The jam keeps "selected, participation confirmed, upcoming".
- **Not changed:** the CV PDF, every project claim, and the 4.5/5 pilot rating (kept as stated on main's CV page).
- Only the Generate / Deeplight project page is rebuilt in each prototype. Other project links open the current live-site page and are marked with `data-legacy` (alias cursor and tooltip).

## Privacy audit — items for the artist to decide (not changed)
1. **CV PDF (`assets/cv/caiyi-shen-cv.pdf`, 13 Nov 2026 version):** it contains "Boston, MA, United States", "Madison, WI, United States" and "Houston, TX, United States" beside entries, plus a personal email (`seleneshen123@outlook.com`) in the header. It is embedded on every CV page as required and has not been modified. Removing the location lines would need a new PDF from the artist.
2. **The current live site (`main`)** still shows city labels on `cv.html` (e.g. "Northeastern University · Boston, MA", "Peking University Sixth Hospital · Beijing, China") and "San Francisco, California · February 28 – March 1, 2027" on `community.html`. These are fixed in all three prototypes but **not on main**, because main must not be changed during the prototype phase.
3. No trackers, analytics, cookies or third-party font or CDN requests exist in any prototype. External links are limited to itch.io, generatenu.com and the Global Game Jam announcement, all `rel="noopener"`.

## Card back
No reverse is shown in any prototype: rotation is clamped to ±0.36–0.46 rad and the back material is never presented. Four **concepts created by Claude** (Meridian, Twin Crescents, Lattice, Orrery) are on the separate review page `preview/card-backs/`. They are labelled as AI-created and not the artist's work, and are not integrated anywhere.

---

# Direction C revision (C2) — 2026-11-25

Feedback: keep C's tarot rendering, lighting, camera and opening; reject C's typography, homepage, page structure, image cropping and identity; restore main's content and approved layouts.

**Safety.** Tag `c-scene-checkpoint` on `c78161c` preserves the reviewed C scene. New branch `redesign/c-revision` in worktree `portfolio_site-c-revision`. `redesign/creative-rebuild` (A, B, C) and the five earlier branches are untouched; the old C preview still runs at http://localhost:4190/preview/c/.

**Approach.** Instead of re-typing content (the cause of the earlier image regressions), `prototypes/build-c2.mjs` builds every page from main's own HTML. Each body is carried verbatim, asset paths are rebased, main's `styles.css` and `script.js` are used unchanged for layout and behaviour (filters, lightbox, video, copy buttons), and a separate identity layer (`c2.css`) changes only tokens, type, colour, light and chrome. Content parity is then *measured* (audit → diff), not assumed.

**Iteration notes (what the renders showed):**
- **Typography:** five compositions were rendered over the real scene (Bodoni Moda, Syne, Geist hairline caps, Fraunces, Tenor Sans). Chosen: **Tenor Sans**, a humanist, slightly flared capital face, widely tracked; it reads as engraved title lettering and echoes the card's fine linework without being a conventional serif headline. Body text is **Geist**, metadata **Geist Mono**; all OFL, self-hosted. The name flanks the card ("CAIYI · card · SHEN") on landscape screens and sits as one centred line beneath it on portrait screens.
- **Name animation:** a light-driven mask reveal from the top (in the spotlight's direction) while the tracking settles from 0.62 em to 0.30 em. It starts 1.25 s after the scene is live, so the name settles as the card finishes dissolving in. The first timing (0.42 s) let the name upstage the card. Final state is static; reduced motion shows it immediately; a 6 s failsafe guarantees visibility.
- **Foil:** physical thin-film iridescence alone produced blotchy oil-film patches (thickness noise too high-frequency) and a full-panel white flash at grazing angles. Fixed with coherent diagonal diffraction bands in card space that travel with the reflection angle, a smoother thickness map, a less mirror-like panel (metalness 0.36, roughness 0.32), and redistribution of the reflected light instead of added light.
- **Dark theme over main's CSS:** main used `--ink` as a background in five places (health-bar plate, skip link, video box, chip states). Inverting the tokens turned the approved dark health-bar plate light; each was pinned to its intended colour. Group labels (`h2.group-label`) inherited the new heading size and were restored to main's small mono label.
- **Chapter boundary:** the first version let a long reading fling on Research carry straight into Game Design. The boundary now arms only after 650 ms of wheel stillness at the end.
- **Mobile cover:** "SHEN" was pushed off-screen by a later desktop rule; the 820 px portrait tablet crowded "CAIYI" against the card. Both fixed with the portrait stacked layout.

**Open questions for the artist:** keep or remove the GDC jam venue line; whether pages that still use main's light-ground artwork plates should keep them (they do now, to avoid altering artwork presentation).

## Cover revision — introduction removed
- Removed the sentence "Game design, player-experience research and original 2D/3D art — shaped by a background in psychology." from the cover entirely, without a replacement.
- Rebalanced the composition. The roles line now sits directly beneath the card as the name's caption, joined by a short gilt hairline, so name, card and roles read as one centred title block. Below it is deliberate negative space, then the chapter cue alone at the foot.
- **Portrait screens:** the roles follow the single-line name; they wrap only on phones.
- **Checks:** parity re-run (137 media, 0 regressions); chapter tests all pass; cover renders clean at 1920, 1440, 820 and 390.

## Opening sequence — one timeline
- Previously the scene, the name and the card ran on separate clocks. The name started on a CSS timer 1.25 s after the scene, the card dissolve began at 0.9 s, and only the visible beam faded in while the actual lights were at full strength from the first frame.
- Now one clock (the scene's own frame time; T = 0 is its first rendered frame) drives everything:
  - **Spotlight:** the beam, the light pool and every real light (spot, rim, hemisphere) rise from a 14 % floor to full, so the frame is never black and nothing flashes.
  - **Name:** a top-down mask reveal while the tracking settles from 0.62 em to 0.30 em (0.50 em to 0.22 em on portrait), set per frame from the same value.
  - **Card:** the dissolve reveal (start 0) and its entrance rotation.
  All three share REVEAL = 2.8 s and the same in-out sine ease, and all reach their resting state on the same frame. The roles and chapter cue fade in on the same curve, a touch later in the curve. The camera push-in starts at T = 0 and settles at 4.6 s, unchanged from Direction C.
- **Measured** (`filmstrip2.js`): mask −29 % / 0.618 em at 0.08 s · 10.7 % / 0.520 em at 1.0 s · 46.6 % / 0.432 em at 1.5 s · 100 % / 0.30 em at 2.8 s, with the card dissolve and light level tracking the same curve.
- **Fallbacks:** without WebGL the original CSS sequence plays over the artwork image. With reduced motion the timeline resolves to its final frame immediately. A 6 s failsafe keeps the name visible.

## Opening sequence — perceptual synchronization
Identical start times did not mean the three appeared together. Frames were rendered with the opening clock frozen at exact times (QA hook `?freeze=<s>`) and the visible brightness was measured in three regions: name, card footprint, and beam/dust around them, each normalised from black to its final value.

**Before:**
- At T = 0 the dust column inside the beam was already visible; its particles were never faded, so the light shaped an empty frame.
- At 0.75 s the beam was at 16 % while the card was at 8 % and the name at 3 %.
- The name's mask started about 26 % above the letters, so the first ~0.7 s of its reveal was invisible.
- The card started small and far away (a 4.6 s approach), so it read late.

**Changes (the name effect, the dissolve effect and both 2.8 s durations unchanged):**
- **Name:** the mask now starts at the top edge of the letters (M0 = 4 % instead of −30 %), removing only the invisible lead-in.
- **Card:** the dissolve starts at its first readable fragment (reveal threshold 0.13 instead of −0.05).
- **Entrance:** the camera push-in and the entrance turn settle in 2.4 s (was 4.6 s) on a decelerating ease, so the card reaches its position as the reveal completes. The slow idle rotation afterwards is unchanged, and so is the final composition.
- **Spotlight:** the beam cone, the light pool and the beam dust now share one visibility curve, tuned against the measurements: (reveal progress)^0.72. The lights on the card start at 50 % so its first fragments are visible as soon as they form.

**After (frozen frames, normalised):**

| T | name | card | beam |
| --- | --- | --- | --- |
| 0.25 s | ~0 % (tops visible) | 1.5 % | 1.5 % |
| 0.35 s | 1.4 % | 7.3 % | 6.2 % |
| 0.45 s | 4.7 % | 14.8 % | 11.5 % |
| 1.0 s | 34 % | 53 % | 40 % |
| 2.8 s | 100 % | 100 % | 100 % |

Visually, the tops of the letters, the card's first fragments and a faint beam surface together at about 0.3 s, both in frozen frames and in real-time playback. The spotlight is never visible before the name and card. (The name's measured brightness is lower than its visibility because only the tops of thin letters are lit at first; frames were judged by eye as well as by measurement.)

## Opening sequence — faster
- The shared reveal (spotlight, name, card dissolve) is now 2.2 s (was 2.8 s). The camera approach and entrance turn take 1.8 s (was 2.4 s).
- Easing curves, onset offsets, the spotlight curve, the final composition and the idle float/rotation speeds are unchanged.
- **Synchronization re-measured on frozen frames:** the letter tops, the card's first fragments and the beam surface together at about 0.25 s; the card is in place at 1.8 s; everything rests at 2.2 s.
