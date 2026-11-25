# Content parity: main vs C2 (automated)

Compared per page, in DOM order: media source, srcset, sizes, intrinsic dimensions, alt text, caption, click/lightbox target and grouping context; heading outline; links (as a set, excluding main's masthead which is replaced by the chapter navigation); embeds; content warnings. 137 media elements checked.

| Page | Result | Media main/C2 | Links main/C2 | Notes |
| --- | --- | --- | --- | --- |
| `art.html` | match | 12/12 | 7/7 |  |
| `community.html` | match | 0/0 | 2/2 |  |
| `contact.html` | intentional |  |  | Page removed (requested); its public contact details (email with copy button; https://ca1y1.itch.io/) are at the foot of cv.html. |
| `cv.html` | match + intentional | 0/1 | 11/13 | intentional: media count 0 → 1 · intentional: embeds  → assets/cv/caiyi-shen-cv.pdf · intentional: heading outline differs |
| `game-design.html` | match | 22/22 | 68/68 |  |
| `games/cena-floris.html` | match | 7/7 | 11/11 |  |
| `games/coworker.html` | match | 5/5 | 10/10 |  |
| `games/dueling-duet.html` | match | 11/11 | 9/9 |  |
| `games/lunch-hours.html` | match | 9/9 | 10/10 |  |
| `index.html` | intentional |  |  | Homepage replaced by the cinematic cover (requested). main's index has no media. |
| `projects/astronomy-playtesting.html` | match | 0/0 | 2/2 |  |
| `projects/axis-ai.html` | match | 2/2 | 10/10 |  |
| `projects/boston-bilingual-pioneer-media.html` | match | 10/10 | 28/28 |  |
| `projects/chinese-character-learning.html` | match | 0/0 | 2/2 |  |
| `projects/cocoa-quest.html` | match | 8/8 | 9/9 |  |
| `projects/generate-deeplight-games.html` | match | 6/6 | 15/15 |  |
| `projects/schoolive.html` | match | 6/6 | 7/7 |  |
| `research.html` | match | 4/4 | 4/4 |  |
| `research/astronomy-learning.html` | match | 1/1 | 3/3 |  |
| `research/beforehello.html` | match | 1/1 | 2/2 |  |
| `research/mind-match-cloud.html` | match | 0/0 | 1/1 |  |
| `research/neural-entrainment.html` | match | 2/2 | 2/2 |  |
| `works/echoes-of-chinese-characters.html` | match | 9/9 | 6/6 |  |
| `works/elixir-nomad.html` | match | 9/9 | 5/5 |  |
| `works/night-adios.html` | match | 13/13 | 9/9 |  |

**Regressions: 0.**
