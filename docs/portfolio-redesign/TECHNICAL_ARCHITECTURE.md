# Technical architecture

## Decision summary
| Question | Decision | Why |
| --- | --- | --- |
| Framework | **None.** A ~120-line Node generator renders static HTML from shared content plus per-direction templates | Pages are content, not app state. Static HTML is fastest, most accessible, simplest to maintain and works on GitHub Pages without a build server |
| 3D | **Three.js r187** (MIT), vendored ES modules + import map | Mature PBR, environment lighting and post-processing; no bundler needed |
| Animation library | **None** (GSAP evaluated) | Motion is a handful of eased values and a scroll progress; `requestAnimationFrame`, `IntersectionObserver` and View Transitions suffice |
| Fonts | Self-hosted woff2 from Fontsource (OFL) | No third-party requests, no tracking, stable rendering |
| Hosting | Unchanged: static GitHub Pages from `main` | No deployment change needed for the prototypes or a final build |
| Analytics / trackers | None | Not approved; none added |

React, Astro, Vite and React Three Fiber were considered. A component framework adds a runtime or a build pipeline without improving the result for a largely static, content-led site. If the chosen direction later needs many more pages, the generator can be moved to Astro with the same templates and content module.

## Layout in the repository
```
prototypes/                 tooling (not served as part of the site)
  package.json              deps: three, six @fontsource packages (no dev deps)
  build.mjs                 generator → ../preview
  src/content.mjs           single source of factual content (from main)
  src/shared/               tarot-engine.js, site.js, base.css
  src/a|b|c/                templates.mjs, <dir>.css, scene.js per direction
  src/card-backs/           concept SVG generator + 3D review studio
  src/compare/              comparison page
  tools/shots.mjs           visual QA capture (Edge/Chrome over CDP)
  tools/serve.mjs           local static server
preview/                    generated, static, committed
  index.html                A/B/C comparison
  a/ b/ c/                  eight pages each (home, game design, research, art,
                            community, CV, contact, projects/generate-deeplight-games)
  card-backs/               concepts (clearly labelled) + 3D studio
  shared/                   runtime JS/CSS, fonts, vendored three.js
```
All paths are relative, so `preview/` works from any sub-path, including `/preview/` on GitHub Pages. The original site at the repository root is untouched, and project pages that were not rebuilt link back to their current versions.

Rebuild: `cd prototypes && npm install && npm run build`. Serve: `npm run serve` (port 4190). QA: `node tools/shots.mjs <out> http://localhost:4190/preview/a/ 1440x900,390x844 index.html`.

## Tarot engine (`prototypes/src/shared/tarot-engine.js`)
- **Card mesh:** `ExtrudeGeometry` of a rounded rectangle matching the art's silhouette (4 px transparent margin, ~18–20 px corner radius measured from the image). Depth 0.011 plus a 0.0028 bevel, i.e. ≈1.6 % of the card width. Lid faces are split into front, back and edge groups, and their UVs are remapped onto the full artwork rectangle so the print registers exactly.
- **Materials:** the front is `MeshPhysicalMaterial` with the artwork as `map` and a roughness/metalness texture generated at load from the artwork's own pixels:
  - **Bright saturated gold** (hue 34–58°, saturation > 0.42, value > 0.62) gets metalness 0.35–0.9 and roughness 0.24–0.38.
  - **Gems** get roughness 0.14; **cream paper** 0.8.
  - **Clearcoat** 0.35–0.5 adds a laminated sheen.
  - The **edge** is a fully metallic gilded material; the **back** is a plain dark material that is never visible in the prototypes.
- **Lighting:** a `RoomEnvironment` PMREM for reflections (no HDRI download) plus 2–3 art-directed directional or spot lights per theme. Tone mapping is Neutral (A) or ACES (B, C).
- **Reveal:** an `onBeforeCompile` patch adds a noise and height threshold dissolve with an emissive edge glow ("summoning"), plus a slow specular sweep band.
- **Particles:** one `Points` system per layer with a custom shader and three motion modes (lateral current, helical vortex, beam-masked dust). A per-particle circle of confusion around a focal distance enlarges and dims out-of-focus particles; this is the same idea as a cheap DOF pass, done per point. Particle counts are halved on mobile.
- **Post-processing:** `EffectComposer` with an MSAA half-float render target, an optional `UnrealBloomPass` (desktop only), a custom grade pass (vignette, grain, lift) and `OutputPass`.
- **Choreography:** each theme supplies `camera.pose(k, state)`, `cardMotion`, `layout(viewport)` and an optional `extras` hook (rings, fog sheets, beam). Pointer parallax is damped. Rotation is clamped to ±0.36–0.46 rad, so the back is never presented.
- **Performance and safety:**
  - Rendering stops when the scene leaves the viewport (`IntersectionObserver`) or the tab is hidden.
  - Adaptive DPR: after sustained frames over 26 ms, the pixel ratio steps down to 1.
  - DPR is capped at 1.75 on desktop and 1.5 on mobile, and at 1.25 for B's background atmosphere.
- **Fallbacks:** without WebGL, or if anything throws, the poster `<img>` of the artwork stays visible. Under `prefers-reduced-motion` there is no intro, time is frozen and a single frame is rendered on resize and scroll.

## Site runtime (`prototypes/src/shared/site.js`)
- **Progressive enhancement:** every page is readable without it.
- **Features:** menu toggle (Esc closes and returns focus), reveal-on-scroll (content is visible by default and hidden only once JS is confirmed), image fade-in (dimensions are always in the markup, so there is no layout shift), hash-addressable tag filters with a live status region, a `<dialog>` lightbox (focus trap, Esc, arrow keys, focus returns to the opener), a scroll progress variable and the year.

## CV page
Each direction embeds `assets/cv/caiyi-shen-cv.pdf` with `<object type="application/pdf">` (`#view=FitH`). It provides a Download button (`download` attribute), an Open-in-new-tab button, and fallback content with both links inside the `<object>`. The original PDF is not modified.
