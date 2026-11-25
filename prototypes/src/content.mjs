// Shared, factual portfolio content for all three prototypes.
// Source of truth: the live site on `main` (f76c2fa) and its CV page.
// Personal location labels (city/state of residence or employment) are
// intentionally omitted; see docs/portfolio-redesign/DEVLOG.md.

export const site = {
  name: 'Caiyi Shen',
  roles: ['Game Designer', 'Player Experience Researcher', 'Artist'],
  rolesShort: 'Game Designer · Researcher · Artist',
  // Built only from verifiable facts (degrees, current roles).
  statement: 'Game design, player-experience research and original 2D/3D art — shaped by a background in psychology.',
  education: [
    { degree: 'M.S. Game Science and Design', school: 'Northeastern University', period: '09/2025 – 05/2027 (expected)' },
    { degree: 'B.A. Psychology · Certificate in Game Design', school: 'University of Wisconsin–Madison', period: '09/2021 – 08/2024' },
  ],
  email: 'shen.caiy@northeastern.edu',
  itch: { label: 'ca1y1.itch.io', href: 'https://ca1y1.itch.io/' },
  cv: 'assets/cv/caiyi-shen-cv.pdf',
  year: 2026,
};

export const tarot = {
  src: 'assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp',
  small: 'assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-400.webp',
  w: 758, h: 1476,
  alt: 'Original tarot card artwork by Caiyi Shen for Deeplight Games: an ornate gold frame with crescent moons and four-pointed stars around an arched compass-star panel, above a cream text panel.',
  credit: 'Tarot card design · Generate / Deeplight Games',
};

// Status vocabulary used consistently by every direction.
export const STATUS = {
  ongoing: 'Ongoing',
  development: 'In development',
  research: 'Research · ongoing',
  completed: 'Completed',
  upcoming: 'Upcoming',
  archive: 'Earlier release',
};

// Featured work keeps the order and importance of main's Game Design page.
export const featured = [
  {
    id: 'bbpm', n: '01', title: 'Boston Bilingual Pioneer Media', subtitle: 'Interactive Learning & Game-Based Education',
    kind: 'Professional · ongoing', status: 'ongoing',
    role: 'Project Lead / Game Designer / 3D Artist', context: 'Seven product directions', period: '03/2026 – Present',
    summary: 'Seven learning-product directions spanning interactive 3D education, AI-supported courseware and character-based learning. My work focuses on game and interaction design, visual development, and translating educational goals into meaningful activities.',
    facts: ['Case-based psychological assessment course with Prof. Chieh Li — 32-student pilot, mean rating 4.5/5', '3D learning activities designed and programmed on the Axis AI platform'],
    tags: ['game-design', 'gameplay-design', '3d', '2d'],
    img: { src: 'assets/projects/axis-ai/course-02.jpg', w: 1400, h: 851, alt: 'A 3D mathematics lesson with two balance scales weighing labelled sacks against numbered weights, teaching simultaneous equations.' },
    img2: { src: 'assets/projects/axis-ai/psych-assessment-vn-1200.webp', w: 1200, h: 1219, alt: 'The Jordan visual novel from the psychological assessment course: the supervising school psychologist in her office, with a line of dialogue and a case note.' },
    href: 'projects/boston-bilingual-pioneer-media.html',
  },
  {
    id: 'generate', n: '02', title: 'Generate / Deeplight Games', subtitle: '3D Action Roguelike — Concept Art & UI Design',
    kind: 'Client project · in development', status: 'development',
    role: 'Concept Artist & 2D Designer', context: 'Deeplight Games, Generate @ Northeastern University', period: '2026 – Present',
    summary: 'Concept and 2D art for a client-commissioned 3D action roguelike built by a multidisciplinary team: characters and the maps they belong to, combat UI, and the tarot card design.',
    facts: ['Three character-and-map concept sheets', 'Combat health bar UI', 'Tarot card design'],
    tags: ['2d', 'game-art'],
    img: { src: 'assets/projects/generate-deeplight-games/character-map-design-01-1400.webp', w: 1400, h: 919, alt: "Concept sheet: the 'Paper-cutting Witch' in a pale green outfit with paper-cut swallow headphones and giant scissors, beside a swallow-shaped map layout." },
    href: 'projects/generate-deeplight-games.html', rebuilt: true,
  },
  {
    id: 'cocoa', n: '03', title: 'Cocoa Quest', subtitle: 'Biomaterial Design & Educational Tabletop Game',
    kind: 'Team project · in development', status: 'development',
    role: 'Group Leader / Experiment Lead / Tabletop Game Designer', context: 'ARTG 5000 — Biodesign', period: '09/2026 – Present',
    summary: 'Began as an educational chocolate-making kit with experimental biomaterial packaging. As group leader I coordinated material experiments and helped lead its evolution toward an educational tabletop game about cocoa production, labor ethics and sustainability.',
    facts: ['Gelatin-based bioplastics and mycelium-related material options for physical components', 'Biodesign Challenge 2027 is a planned submission, not an award'],
    tags: ['game-design', 'tabletop'],
    img: { src: 'assets/projects/cocoa-quest/prototype-01-photo-960.webp', w: 960, h: 1280, alt: 'The opened Prototype 1 package: a dark biomaterial sheet with visible fibres and cacao nibs, holding a baking cup, wooden spoon and an ingredient pouch.' },
    img2: { src: 'assets/projects/cocoa-quest/cover-1280.webp', w: 1280, h: 956, alt: "Cocoa Quest title card: 'From Chocolate Waste to a Playful Biomaterial Experience'." },
    href: 'projects/cocoa-quest.html',
  },
  {
    id: 'schoolive', n: '04', title: 'Schoolive', subtitle: 'Narrative Management Game',
    kind: 'Studio project · ongoing', status: 'ongoing',
    role: 'Co-founder, Creative Director, Game Director', context: 'Schoolive Interactive Ltd.', period: '2022 – Present',
    summary: "A restaurant-management mystery where ingredients, cooking choices and customer memories are also the player's investigation tools.",
    tags: ['2d', 'game-design', 'gameplay-design', 'narrative-design', 'game-art'],
    img: { src: 'assets/projects/schoolive/game-cover-1600.webp', w: 1600, h: 900, alt: 'Schoolive key art.' },
    href: 'projects/schoolive.html',
  },
];

export const games = [
  { id: 'lunch', title: 'Lunch Hours', disciplines: 'Game Art · Game Design · Gameplay Design', tags: ['2d', 'game-design', 'gameplay-design', 'game-art'],
    summary: 'A lunchtime obstacle course built around the panic of beating the cafeteria queue. Dialogue boxes block the path, so a social interruption becomes speed and space pressure.',
    img: { src: 'assets/games/lunch-hours/cover.jpg', w: 811, h: 500, alt: 'Lunch Hours title art: a school corridor collaged from cut paper, with a lunch tray, scissors and paper-cut students.' }, href: 'games/lunch-hours.html' },
  { id: 'cena', title: 'Cena Floris', disciplines: 'Game Design · Narrative / Worldbuilding · Gameplay · Art', tags: ['2d', 'game-design', 'gameplay-design', 'narrative-design', 'game-art'],
    summary: 'A cooking-magic game where the recipe only becomes visible when you ask for it, and every second you look burns more of it away. Information itself is the resource.',
    img: { src: 'assets/games/cena-floris/cover-1152.webp', w: 1152, h: 648, alt: 'Cena Floris title art: the protagonist with long lilac hair against a field of painted flowers.' }, href: 'games/cena-floris.html' },
  { id: 'coworker', title: 'COWorker', disciplines: 'Game Design · Gameplay · Art', tags: ['2d', 'game-design', 'gameplay-design', 'game-art'],
    summary: 'An experimental feminist game about productivity, bodily control, and the fact that the player is also trapped inside the system.', note: '18+ content gate on itch.io',
    img: { src: 'assets/games/coworker/character-cow.png', w: 760, h: 698, alt: 'COWorker character art: a cow on a treadmill attached to a milking machine and IV stand.' }, href: 'games/coworker.html' },
  { id: 'duel', title: 'Dueling Duet', disciplines: 'Art · Character Design · Animation', tags: ['2d', 'game-art', 'animation'],
    summary: 'Two duellists from opposite mythologies and two instruments rebuilt as living monsters. Characters, instrument-monsters, Gothic letterforms and the hand-animated music-box opening.',
    img: { src: 'assets/games/dueling-duet/victory-western-1300.webp', w: 1300, h: 908, alt: 'Dueling Duet victory art: the Western-fantasy duellist standing in a gothic hall.' }, href: 'games/dueling-duet.html' },
];

export const caseStudies = [
  { n: '05', title: 'Night, Adios', meta: 'Unreal Engine 4 · 2024 · Side-scrolling roguelike bullet hell', tags: ['2d', '3d', 'game-design', 'gameplay-design', 'narrative-design', 'game-art'],
    summary: 'A neon subway shooter about a society that treats rest as weakness, and the design changes made when the original 3D version stopped being readable.',
    img: { src: 'assets/projects/night-adios/preview.jpg', w: 1400, h: 788, alt: 'Night, Adios title art: a pink pixel-art subway carriage.' }, href: 'works/night-adios.html' },
  { n: '06', title: 'Echoes of Chinese Characters', meta: 'Tabletop · Montessori-inspired learning tool · 2024 · Ages 3–5', tags: ['2d', 'game-design', 'game-art', 'tabletop'],
    summary: 'A tabletop language game that turns Chinese characters back into things children can build, move and tell stories with.',
    img: { src: 'assets/projects/echoes/preview.jpg', w: 1400, h: 787, alt: 'Pictogram tiles: painted sun, moon, mountain, water, fish and tree with matching characters.' }, href: 'works/echoes-of-chinese-characters.html' },
  { n: '07', title: 'Elixir Nomad', meta: 'Unreal Engine 4 · 2024 · Chemistry simulation / educational prototype', tags: ['2d', 'game-design', 'gameplay-design'],
    summary: "A travelling-alchemist prototype where potion crafting is driven by reagent combinations, temperature and a physical sensor input.",
    img: { src: 'assets/projects/elixir-nomad/preview.jpg', w: 1400, h: 788, alt: "Elixir Nomad title art: a painted view through a travelling alchemist's van window." }, href: 'works/elixir-nomad.html' },
];

export const archive = [
  { title: 'A Dungeon MONSTER', href: 'https://ca1y1.itch.io/a-dungeon-monster' },
  { title: 'Zombie Lab', href: 'https://ca1y1.itch.io/zombie-lab' },
  { title: 'One-year-old catch', href: 'https://ca1y1.itch.io/one-year-old-catch' },
  { title: 'Sewer Struggle', href: 'https://fedexodus.itch.io/sewer-struggle' },
  { title: 'We Happy, Were', href: 'https://wingmancover.itch.io/we-happy-were' },
  { title: "Pan's Labyrinth", href: 'https://ca1y1.itch.io/pans-labyrinth', note: 'Mature-content notice' },
  { title: 'JourNalism', href: 'https://wingmancover.itch.io/httpsyoutubeze-0f6euhm0', note: '18+ content gate' },
];

export const tags = [
  ['2d', '2D'], ['3d', '3D'], ['game-design', 'Game Design'], ['gameplay-design', 'Gameplay Design'],
  ['narrative-design', 'Narrative Design'], ['game-art', 'Game Art'], ['animation', 'Animation'], ['tabletop', 'Tabletop'],
];

export const research = [
  { n: '01', title: 'Neural Entrainment', subtitle: 'Child-Friendly EEG Adaptation', kind: 'Academic research · ongoing',
    lab: 'Language Acquisition and Brain Laboratory (QLAB), Northeastern University', period: '07/2026 – Present', with: 'Prof. Zhenghan Qi',
    question: 'How can child-friendly visual cycles, artificial-language speech, and EEG event markers remain synchronized during audiovisual learning experiments?',
    methods: ['EEG', 'Statistical learning', 'PsychoPy', 'Experimental design', 'Visual stimuli'],
    work: 'PsychoPy language-learning experiments for children: speech and visual cycles synchronized, EEG event markers via Lab Streaming Layer; timing, breaks and pauses validated; EEG session support.',
    img: { src: 'assets/research/neural-entrainment/stimulus.jpg', w: 1600, h: 900, alt: 'The child-facing visual stimulus: a softly glowing jellyfish with closed eyes in a dark blue field of small particles.' }, href: 'research/neural-entrainment.html' },
  { n: '02', title: 'BeforeHello', subtitle: 'Communication Support for Autistic Adults', kind: 'Academic research · ongoing',
    lab: 'Language Acquisition and Brain Laboratory (QLAB), Northeastern University', period: '2026 – Present', with: 'Dr. Katherine Trice',
    question: 'How can a personalized introduction tool support autistic adults before first meetings, and what usability needs emerge from think-aloud feedback?',
    methods: ['Autism', 'HCI', 'User testing', 'Think-aloud', 'Research software'],
    work: 'A tool helping autistic adults prepare personalized video introductions; think-aloud feedback synthesized into usability and accessibility needs.',
    img: { src: 'assets/research/mind-match-cloud/app-home.jpg', w: 760, h: 1645, alt: "The prototype's home screen: record a video with automatic captions, or write a message with an optional photo." }, href: 'research/beforehello.html' },
  { n: '03', title: '3D Astronomy Game-Based Learning', subtitle: 'Think-aloud playtesting study', kind: 'Academic research · completed',
    lab: 'Learning, Representations, & Technology Lab, UW–Madison', period: '07/2022 – 09/2022', with: 'Research Assistant',
    question: 'Where do learners get lost, spatially and conceptually, while learning astronomy inside a 3D game?',
    methods: ['Game-based learning', 'STEM education', 'Observation', 'UX research'],
    work: "Think-aloud playtesting documenting learners' navigation, verbal reasoning and interpretation of scientific representations, synthesized into usability barriers and learning-design opportunities.",
    img: { src: 'assets/research/astronomy/at-play-in-the-cosmos-star-chart.jpg', w: 1535, h: 858, alt: 'The in-game Interactive Star Chart: the Milky Way with named spiral arms marked as destinations.' },
    imgCredit: 'At Play in the Cosmos — Interactive Star Chart. Herder & Rau (2022), Frontiers in Education, CC BY.', href: 'research/astronomy-learning.html' },
  { n: '04', title: 'Boston Bilingual Pioneer Media', subtitle: 'Applied learning-product research', kind: 'Applied · ongoing',
    lab: 'Seven product directions, including the Axis AI platform', period: '2026 – Present', with: 'Prof. Chieh Li (assessment course)',
    question: 'How can learning material become something a learner acts on, across 3D lessons, university courseware, a character companion and conversation-practice tools?',
    methods: ['AI-supported learning', 'Educational games', 'Interactive systems', 'Companion design'],
    work: 'Game-based doctoral coursework with feedback analysed from a 32-student pilot (mean rating 4.5/5).',
    img: { src: 'assets/projects/axis-ai/psych-assessment-board-1200.webp', w: 1200, h: 1038, alt: 'The psychological assessment case board from the doctoral course.' }, href: 'projects/boston-bilingual-pioneer-media.html' },
];

export const otherResearch = [
  { title: 'Time2Learn', org: 'QLAB, Northeastern University', text: 'Language and literacy research preparation and documentation, including standardized assessments of language, literacy and cognitive skills.' },
  { title: 'Clinical Assistant', org: 'Psychology Clinic, Peking University Sixth Hospital', period: '06/2023 – 08/2023', text: 'Observed and practised TMS, rTMS, theta-burst stimulation and tDCS procedures under supervision; assisted EEG-based visual-stimulus experiments examining fear responses.' },
  { title: 'Field Observer', org: 'UW Child Development Lab', period: '09/2022 – 02/2023', text: 'Structured preschool observations of peer interaction, social communication, joint attention, turn-taking and cooperative play.' },
];

export const art = [
  { id: 'duel', title: 'Duel scene', project: 'Dueling Duet', medium: '2D game art', src: 'assets/art/2d-01-dueling-duet-duel-1400.webp', full: 'assets/art/2d-01-dueling-duet-duel-2000.webp', w: 1400, h: 978, alt: 'Dueling Duet duel scene: two duellists from opposite mythologies face each other in a vaulted gothic hall, each beside an instrument-monster, under ornate health bars, with seven coloured rune letterforms below.' },
  { id: 'tarot', title: 'Tarot card', project: 'Generate / Deeplight Games', medium: '2D game art', src: 'assets/projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp', full: 'assets/projects/generate-deeplight-games/tarot-card-design-v2-838.webp', w: 758, h: 1476, alt: 'The tarot card design: ornate gold frame, crescent moons, four-pointed stars and an arched compass-star panel above a cream text panel.' },
  { id: 'western', title: 'Western-fantasy duellist', project: 'Dueling Duet', medium: 'Character design', src: 'assets/art/2d-07-character-design-1102.webp', full: 'assets/art/2d-07-character-design-1102.webp', w: 1102, h: 1524, alt: 'Character art of the Western-fantasy duellist: short pale hair, black horns and spider-like limbs, a red gown hung with silver chains, one arm pointing ahead.' },
  { id: 'concept1', title: 'Paper-cutting Witch', project: 'Generate / Deeplight Games', medium: 'Character & map concept', src: 'assets/projects/generate-deeplight-games/character-map-design-01-1400.webp', full: 'assets/projects/generate-deeplight-games/character-map-design-01-2263.webp', w: 1400, h: 919, alt: 'Concept sheet pairing the Paper-cutting Witch with a swallow-shaped map layout.' },
  { id: 'musicbox', title: 'Music-box opening', project: 'Dueling Duet', medium: 'Title screen', src: 'assets/art/2d-02-music-box.jpg', full: 'assets/art/2d-02-music-box.jpg', w: 794, h: 563, alt: 'An open ornamented music box with the Dueling Duet title card and the two duellists as small figures, a golden winding key and a tag reading Game Start.' },
  { id: 'lunch', title: 'Lunch tray', project: 'Lunch Hours', medium: 'Illustration', src: 'assets/art/2d-08-illustration-1400.webp', full: 'assets/art/2d-08-illustration-2000.webp', w: 1400, h: 978, alt: 'A painted stainless-steel lunch tray with braised meat, greens, tomato and egg, white rice and wooden chopsticks.' },
  { id: 'cow', title: 'Cow on the treadmill', project: 'COWorker', medium: 'Character art', src: 'assets/art/2d-03-coworker-cow-1537.webp', full: 'assets/art/2d-03-coworker-cow-1537.webp', w: 1537, h: 1668, alt: 'Character art of a cow running on a treadmill, styled with a pink pacifier and bows, attached to a milking machine and an IV drip stand.' },
  { id: 'comic', title: 'Ink comic page', project: 'Personal work', medium: 'Ink', src: 'assets/art/2d-05-comic.jpg', full: 'assets/art/2d-05-comic.jpg', w: 1400, h: 1351, alt: 'A black-and-white ink comic page: a figure casts a spell with a balloon reading Fireball, beside a skeleton in a stone archway engulfed in flames.' },
  { id: 'assets', title: 'Asset sheet', project: 'Personal work', medium: 'Character & environment', src: 'assets/art/2d-04-asset-sheet.jpg', full: 'assets/art/2d-04-asset-sheet.jpg', w: 1261, h: 1159, alt: 'A 2D asset sheet: an NPC portrait icon, paper environment assets, a player character and walking animation frames.' },
  { id: 'woman', title: 'Woman with cow motifs', project: 'COWorker', medium: 'Character art', src: 'assets/art/2d-06-character-design-1037.webp', full: 'assets/art/2d-06-character-design-1037.webp', w: 1037, h: 1636, alt: 'Character art of a kneeling woman wearing cow horns, ears and cow-print sleeves, attached to the same milking machine and IV drip stand as the cow.' },
];

export const art3d = [
  { id: 'bee', title: 'Mechanical bee', medium: 'Model & materials', src: 'assets/art/3d-01-mechanical-bee.jpg', full: 'assets/art/3d-01-mechanical-bee.jpg', w: 1600, h: 945, alt: 'A rendered mechanical bee: a worn yellow and steel body with a mesh face plate, blue antennae and translucent wings.' },
  { id: 'weapon', title: 'Weapon', medium: 'Model & wireframe', src: 'assets/art/3d-03-weapon-model.jpg', full: 'assets/art/3d-03-weapon-model.jpg', w: 1063, h: 771, alt: 'A revolver in the modelling viewport: shaded reference above and the wireframe model below.' },
  { id: 'env', title: 'Environment', medium: 'Terrain, vegetation & lighting', src: 'assets/art/3d-02-environment.jpg', full: 'assets/art/3d-02-environment.jpg', w: 1800, h: 845, alt: 'A 3D environment at low sun: red rock terrain and scrub, a large autumn tree, a distant figure walking and water on the horizon.' },
];

export const community = [
  { n: '01', title: 'NetEase Blizzard China', subtitle: 'Gaming Content Creator', meta: 'Creator Partnership · 01/2024 – Present',
    stats: [['20K+', 'Douyin followers'], ['10M', 'views on one video']],
    text: 'Gaming content for Chinese audiences — Hearthstone and broader gaming, cosplay, livestream formats and short-form video, including creator collaborations with NetEase Blizzard China and Behavior Interactive. I run the production loop myself, and translate and adapt game-design and developer talks for Bilibili.' },
  { n: '02', title: 'Schoolive', subtitle: 'Education Community & Learning Platform', meta: 'Schoolive Interactive Ltd. · Co-founder / Creative Director · 08/2022 – Present',
    text: 'A free online education platform providing psychology, game design and interactive-media resources for Chinese-speaking students. The work is content architecture: how courses are organised and sequenced, driven by learner feedback.' },
  { n: '03', title: 'HEYBOX', subtitle: 'Rainbow Six Wiki & Player Community', meta: 'Community & Wiki Contributor',
    text: 'Information design for a live game: turning dense, fast-changing Rainbow Six Siege knowledge into entries players can search, scan and keep current.' },
  { n: '04', title: 'The Jam @ GDC 2027', subtitle: 'Global Game Jam GDC', meta: 'Selected · participation confirmed · upcoming',
    text: 'Selected for The Jam @ GDC 2027, part of the GDC Festival of Gaming. It has not happened yet, so there is no project to show.', href: 'https://globalgamejam.org/news/join-ggj-gdc-2027-game-jam-world-record-attempt' },
];

// The practice map ties each discipline to evidence that exists on the site.
export const practice = [
  { area: 'Game & Systems Design', evidence: ['Boston Bilingual Pioneer Media', 'Schoolive', 'Cocoa Quest', 'Elixir Nomad'] },
  { area: 'Gameplay Design', evidence: ['Lunch Hours', 'Cena Floris', 'COWorker', 'Night, Adios'] },
  { area: 'Player Experience Research', evidence: ['3D Astronomy think-aloud study', 'BeforeHello usability feedback'] },
  { area: 'Psychology', evidence: ['B.A. Psychology', 'QLAB — Neural Entrainment', 'Peking University Sixth Hospital'] },
  { area: 'HCI & UI/UX', evidence: ['BeforeHello', 'Combat UI — Deeplight', 'HEYBOX wiki structure'] },
  { area: '2D & 3D Art', evidence: ['Generate / Deeplight Games', 'Dueling Duet', '3D models & environments'] },
  { area: 'Educational Technology', evidence: ['Axis AI platform', 'Echoes of Chinese Characters', 'Schoolive platform'] },
  { area: 'Communities & Content', evidence: ['NetEase Blizzard China creator', 'Bilibili talk localisation', 'HEYBOX'] },
];

export const generate = {
  title: 'Generate / Deeplight Games',
  lede: 'Concept design and 2D art for a client-commissioned 3D action roguelike: characters and the maps they belong to, combat UI, and tarot card design.',
  facts: [['Role', 'Concept Artist & 2D Designer'], ['Context', 'Deeplight Games, Generate @ Northeastern University'], ['Period', '2026 – Present'], ['Status', 'In development']],
  tags: ['2D', 'Game Art'],
  website: { label: 'Generate website', href: 'https://generatenu.com/' },
  logo: { src: 'assets/projects/generate-deeplight-games/generate-logo.png', w: 1348, h: 444, alt: 'The Generate logo: a blue and black segmented circular mark beside the word GENERATE.' },
  overview: [
    'The project is a 3D action roguelike commissioned by a client and built by a multidisciplinary team. I work on how it looks, and on keeping the way it looks tied to how it plays.',
    'The work below is my own concept and design work for the project: a combat health bar, a tarot card design, and three character-and-map concepts.',
  ],
  ui: { title: 'Combat UI Design', text: "A compact health bar meant to stay readable in combat while matching the game's style: a clear status bar in a thin gold frame, anchored by a crystal emblem.",
    img: { src: 'assets/projects/generate-deeplight-games/health-bar-ui-1400.webp', full: 'assets/projects/generate-deeplight-games/health-bar-ui-2109.webp', w: 1400, h: 403, alt: 'A horizontal health bar in a thin gold frame fading from dark slate through teal to bright cyan, anchored by a faceted cyan gem in a gold compass-star emblem.' } },
  card: { title: 'Tarot Card Design', text: "A visual language for the game's card-based elements: a gold frame with crescent moons and stars around a compass-star panel, above space for the card's text." },
  concepts: {
    title: 'Character & Environment Concept Design',
    text: "These concept designs explore the relationship between character identity and environmental storytelling. Each composition pairs a character with its corresponding map, so the two share one visual language and the game's characters and spaces read as a consistent whole.",
    items: [
      { n: '01', name: 'Paper-cutting Witch', src: 'assets/projects/generate-deeplight-games/character-map-design-01-1400.webp', full: 'assets/projects/generate-deeplight-games/character-map-design-01-2263.webp', w: 1400, h: 919, alt: "Concept sheet. Left: a character in a pale green outfit annotated 'Qing Han + street style', with paper-cut swallow headphones and a large pair of scissors as a weapon. Right: a map shaped like a paper-cut swallow — line art, then a colour-coded layout with an entrance, central and wing arenas, a boss area and two exits." },
      { n: '02', name: 'Baking Witch', src: 'assets/projects/generate-deeplight-games/character-map-design-02-1400.webp', full: 'assets/projects/generate-deeplight-games/character-map-design-02-2107.webp', w: 1400, h: 947, alt: "Concept sheet. Left: a blonde character in a green outfit annotated 'yukata + JK + puffed skirt', with a chef hat and a mixer as a weapon. Right: two plans of a kitchen map tracing preparation, decoration, oven and storage zones, then enemy, relaxing, boss and reward areas." },
      { n: '03', name: 'Perfume Witch', src: 'assets/projects/generate-deeplight-games/character-map-design-03-1400.webp', full: 'assets/projects/generate-deeplight-games/character-map-design-03-2478.webp', w: 1400, h: 831, alt: 'Concept sheet. Left: a character with lilac ringlets and a pale blue military-style jacket, with a perfume bottle as a weapon. Right: an octagonal map ringed with diamond-shaped perfume bottles, with notes that the map can be scrolled to change the terrain.' },
    ],
  },
  contribution: ['Character concept design', 'Character-related map and environment concept design', 'Contributions to the overall visual style and art direction', 'Combat UI design, including the health bar', 'Tarot card artwork and visual design', '2D game art assets'],
  shared: 'The game is built by the whole team, and its visual development is shared. The work shown here is my concept and design work for it, not necessarily final in-game assets.',
  status: 'Client-commissioned work in development. The designs on this page are concepts, not final implemented assets.',
  next: { title: 'Cocoa Quest', href: 'projects/cocoa-quest.html' },
};

export const cv = {
  education: site.education,
  research: [
    { role: 'Research Assistant / Programmer', org: 'Language Acquisition and Brain Laboratory (QLAB), Northeastern University', period: '07/2026 – Present',
      points: ['BeforeHello — communication support with Dr. Katherine Trice: personalized video introductions for autistic adults; think-aloud feedback on usability and accessibility needs.',
        'Audiovisual Neural Entrainment with Prof. Zhenghan Qi: child-friendly PsychoPy language-learning experiments, synchronizing speech and visual cycles and integrating EEG event markers via Lab Streaming Layer.',
        'Time2Learn: language and literacy research preparation and documentation.'] },
    { role: 'Research Assistant', org: 'Learning, Representations, & Technology Lab, University of Wisconsin–Madison', period: '07/2022 – 09/2022',
      points: ["Think-aloud playtesting of a 3D astronomy game, documenting learners' navigation, reasoning and interpretation of scientific representations."] },
    { role: 'Clinical Assistant', org: 'Psychology Clinic, Peking University Sixth Hospital', period: '06/2023 – 08/2023', points: ['TMS, rTMS, theta-burst stimulation and tDCS procedures under supervision; EEG-based visual-stimulus experiments.'] },
    { role: 'Field Observer', org: 'UW Child Development Lab, University of Wisconsin–Madison', period: '09/2022 – 02/2023', points: ['Structured preschool observations of peer interaction and social communication.'] },
  ],
  experience: [
    { role: 'Concept Artist & 2D Designer', org: 'Deeplight Games, Generate @ Northeastern University', period: '09/2026 – Present' },
    { role: 'Project Lead / Game Designer / 3D Artist', org: 'Boston Bilingual Pioneer Media', period: '03/2026 – Present' },
    { role: 'Graduate Teaching Assistant — Game Design and Analysis', org: 'Northeastern University', period: '09/2026 – 11/2026' },
    { role: 'Teacher', org: 'If Montessori School, Bilingual Montessori Classroom', period: '08/2024 – 08/2025' },
    { role: 'Digital Media Content Creator', org: 'NetEase Blizzard China Creator Partnership', period: '01/2024 – Present' },
    { role: 'Co-founder & Creative Director', org: 'Schoolive Interactive', period: '08/2022 – Present' },
  ],
  skills: [
    ['Research & programming', 'R, R Studio, MATLAB, Python, HTML, PsychoPy, EEG session support, think-aloud testing'],
    ['Game development', 'Unity, Unreal Engine, Autodesk Maya, Blender, ZBrush, Substance Painter, QuadSpinner Gaea'],
    ['Design & media', 'Adobe Photoshop, Adobe Premiere Pro'],
    ['Languages', 'Mandarin (native), English (advanced), Japanese (advanced)'],
  ],
  awards: [
    ['American Montessori Society (AMS)-Certified Teaching Assistant', '2025'],
    ['IHESJR — Affiliated Graduate Student', '2026'],
    ['PEAK Fellowship — The Summit, Northeastern University', '2026'],
    ['The Jam @ GDC 2027 — selected, participation confirmed', '2027 (upcoming)'],
  ],
};
