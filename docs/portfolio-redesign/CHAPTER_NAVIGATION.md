# Chapter navigation

Order (from main): **01 Home · 02 Research · 03 Game Design · 04 2D & 3D Art · 05 Community & Content · 06 CV · 07 Contact.**

## Model
Every chapter is its own page with its own URL (main's URLs, mirrored under `preview/c2/`). Moving between chapters is an ordinary navigation, so Back/Forward, bookmarks, deep links (`game-design.html#tag=tabletop`, `projects/...#tarot-card`) and opening in a new tab all behave normally. Project pages are independent and unchanged in URL. Nothing is concatenated into one long page.

Main's own "Next" link at the foot of each chapter is reused as the boundary target (Research → Game Design → Art → Community → CV → Contact); the cover links to Research.

## Boundary transition (`prototypes/src/c2/chapter.js`)
- **Cover:** a short deliberate scroll (≈520 px of wheel input), a 180-px touch pull, or PageDown/Space/↓ twice continues to Research. The "Scroll to continue · 02 Research" cue fills as you scroll.
- **Chapters:** reading scrolls normally. At the very end of a page the boundary is *disarmed*: it only arms after the wheel has been completely still for 650 ms while at the end, so the gesture (or trackpad momentum) that brought you to the end can never carry you on. After that, the same deliberate scroll fills a small "Next chapter" indicator; releasing early resets it (900 ms).
- **Keyboard:** at the end, two PageDown/Space/↓ presses continue. **Touch:** pull up 180 px beyond the end.
- **Never intercepted:** inside `object/iframe/video/audio/embed`, form fields, `<dialog>`, an open lightbox, the open mobile index, or any element marked `data-no-chapter` (the CV preview carries it).
- The explicit link and the chapter menu always work immediately; no animation has to finish first.
- **Reduced motion:** the same gestures work; the progress line has no easing and the page transition is near-instant.

## Persistent navigation
A fixed top bar with the seven numbered chapters (the current one lit by a small pool of gilt light, echoing the cover's spotlight), a mobile "Index" overlay (Esc closes and returns focus) and a right-hand chapter rail. Page changes use cross-document View Transitions (old page brightens and blurs out, new page rises in from darkness); unsupported browsers navigate normally.

## Tested (`prototypes/tools/chapter-test.mjs`, real input events)
| Case | Result |
| --- | --- |
| Cover: small scroll stays on Home | ✓ |
| Cover: deliberate scroll → Research | ✓ |
| History back → Home, forward → Research | ✓ |
| Long reading fling on Research reaches the end and **stays** | ✓ (fixed: the first version carried momentum into Game Design) |
| Pause at end, then deliberate scroll → Game Design | ✓ |
| Keyboard: one PageDown stays, two → next chapter | ✓ |
| Wheel with an open lightbox does not change chapter | ✓ |
| Deep link `game-design.html#tag=tabletop` filters to 2 projects | ✓ |
| Reduced motion: name visible immediately | ✓ |
| Console errors | none |
