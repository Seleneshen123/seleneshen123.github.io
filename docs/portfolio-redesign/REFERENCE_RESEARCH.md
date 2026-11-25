# Reference research

Captured 2026-11-25 by rendering each site in headless Edge (GPU on, 1440×900), at load and after one and two viewport scrolls, and recording a technical fingerprint (loaded fonts, canvases, scripts). Screenshots were reviewed visually; nothing was copied. No artwork, branding, characters or code from these sites is used in the prototypes.

## Primary references

### hj.qq.com (灰境行者 / Grey Realm)
- **What it shows:** a pale grey, almost paper-white field; tens of thousands of fine dark particles form a slow galactic vortex. UI is reduced to corner marks: logo top-left, account top-right, four small links bottom-right, a single centred "进入灰境 / ENTER".
- **Technique:** one full-viewport canvas (WebGL, Vite-built bundle), Source Han Sans throughout. The effect comes from particle *count and fineness* (sub-pixel to 2px points with soft alpha), not from colour. Depth is read through density and blur, not lighting.
- **Principles taken:** monochrome particles can feel luxurious when they are tiny and numerous; the UI can almost disappear if the scene carries the identity; a light ground avoids the "dark-mode default" look. → Direction A's light volume and fine dark dust; the four-corner idea in C.

### Bruno Simon — bruno-simon.com, folio-2025 (MIT, github.com/brunosimon/folio-2025)
- **What it shows:** a playful driveable world; strong personality, toy-like materials, Amatic SC + Nunito.
- **Technique (from source):** Vite + Three.js r187 using `three/webgpu` and TSL; post-processing via a node pipeline with `BloomNode` and a custom `cheapDOF` pass; Rapier physics; glTF-transform for assets; ordered render lists for transparency; a single ticker driving the renderer.
- **Principles taken:** cheap depth-of-field is enough — blur by distance from a focal plane rather than true bokeh; drive everything from one loop and stop it when not needed; tone and post are art direction, not afterthoughts. → The shared engine's per-particle circle-of-confusion and single adaptive loop. (Its toy aesthetic was deliberately not followed.)

### Arknights: Endfield (endfield.gryphline.com)
- **What it shows:** large key art in the hero, then white industrial panels: black type, a saturated yellow block, bracketed labels `[ Kay ]`, small metadata, a left icon rail, and a lore section where a spacecraft is drawn as a white point cloud inside thin circular rings with tick marks.
- **Technique:** Next.js; fonts Novecento Sans Wide (Bold/DemiBold/Medium), Gilroy, Space Grotesk, HarmonyOS Sans; video and a canvas for the point-cloud section.
- **Principles taken:** a wide, technical display face gives instant authority; precision comes from small consistent metadata and hairlines; a point cloud plus thin rings reads as "engineered" without neon. → Direction A: Archivo at 118–125 % width (an open-source counterpart to Novecento Wide), Plex Mono labels, ring + tick geometry in 3D, a left progress rail.

### Wuthering Waves (wutheringwaves.kurogames.com)
- **What it shows:** full-bleed cinematic video of a luminous fantasy landscape; UI is a thin top bar and a few overlays. The atmosphere is the brand.
- **Technique:** Vue + Swiper, custom game font, two background videos.
- **Principles taken:** atmosphere should persist rather than be a one-off hero; restraint in UI lets the world breathe. → Direction B's fixed, site-wide WebGL atmosphere and very light chrome.

### Death Stranding 2 (kojimaproductions.jp/en/death-stranding-2)
- **What it shows:** a cinematic photograph with extremely letter-spaced uppercase title type ("D E A T H  S T R A N D I N G"), product facts set like credits, plenty of black.
- **Technique:** static page; fonts geom-graphic and Rajdhani.
- **Principles taken:** letter-spacing and scale do the work; facts presented as credits feel authored; black space is a material. → Direction C's tracked labels, credits blocks and letterboxed frames.

### Returnal (playstation.com/en-us/games/returnal)
- **What it shows:** dark key art, Sony's SST type family, a conventional store layout below.
- **Principles taken (and limits):** dark cinematic key art carries the mood instantly, but the store template below shows how a strong hero is undermined by generic sections — a cautionary example for "homepage-only" design.

### Cardcaptor Sakura (motion reference)
- Cards are *summoned*: they rise, turn in their own plane, and arrive inside a swirl of light; the magic is the choreography, not the decoration. → Direction B's intro: the card rises from below with an in-plane turn while a helix of motes converges, then settles into a slow float. Rotation stays front-facing.

## Technical references
- **Three.js examples / addons** (threejs.org/examples): `EffectComposer`, `UnrealBloomPass`, `OutputPass`, `RoomEnvironment` + `PMREMGenerator` for image-based lighting without downloading an HDRI, `MeshPhysicalMaterial` (clearcoat, metalness/roughness maps), `ExtrudeGeometry` with bevels.
- **Codrops / Awwwards patterns** (well-known techniques, no code copied): noise-threshold dissolve reveals; soft-particle sprites with distance-based size; scroll-linked camera choreography; cross-document page transitions.
- **GSAP / ScrollTrigger:** evaluated and not used. The choreography needed here is a handful of eased values and one scroll progress value; native `requestAnimationFrame`, `IntersectionObserver` and the CSS View Transitions API cover it with no dependency.

## What the previous five redesigns got wrong (and the response)
| Problem | Response in these prototypes |
| --- | --- |
| Generic gradients and plastic lighting | Image-based lighting, physically based card materials; gold detected in the artwork and given metallic response; no decorative gradient fills |
| Weak, inconsistent type | One deliberate pairing per direction, self-hosted (OFL), with a documented scale |
| Rounded cards and generic UI | Hairlines, frames, spec tables, credits — no rounded card components |
| Homepage = one rotating card | Each home has five or more content sections: practice map, current work, research, art, community |
| Procedural card back | Never shown; rotation limited. Separate concept studio for approval |
| Arbitrary old projects featured | Featured order follows main's existing hierarchy (BBPM, Generate, Cocoa Quest, Schoolive) |
| Code-only iteration | Every page rendered and inspected at 1920, 1440, tablet and 390 before presenting (see VISUAL_QA.md) |
