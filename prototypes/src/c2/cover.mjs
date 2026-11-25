// The homepage: a cinematic cover, not a summary of the portfolio.
// Name, identity, one-line introduction, the tarot scene, navigation and the
// way on to chapter 02.
export function cover({ header, head, assets = '../../assets/' }) {
  const tarot = assets + 'projects/generate-deeplight-games/tarot-card-design-v2-tight-758.webp';
  const extra = `<script>document.documentElement.classList.add('js-anim');try{var gc=document.createElement('canvas');if(gc.getContext('webgl2')||gc.getContext('webgl'))document.documentElement.classList.add('gl')}catch(e){}</script>
<script type="importmap">{"imports":{"three":"./vendor/three/three.module.js","three/addons/":"./vendor/three/addons/"}}</script>
<script type="module" src="js/scene.js"></script>
<link rel="modulepreload" href="js/tarot-engine-c2.js">
<link rel="modulepreload" href="vendor/three/three.module.js">
<link rel="modulepreload" href="vendor/three/three.core.js">
<link rel="preload" as="image" href="textures/tarot-base-neutral.webp">
<link rel="preload" as="image" href="textures/tarot-surface.png">
<link rel="preload" as="image" href="textures/tarot-foil.png">`;
  return `<!doctype html>
<html lang="en">
${head(extra)}
<body class="c2 is-chapter is-cover ch-01" data-chapter-index="0" data-chapter-name="Home">
${header}
<main id="main" class="cover">
  <div class="stage scene"><canvas aria-hidden="true"></canvas><img class="scene-poster" src="${tarot}" width="758" height="1476" alt="The tarot card designed by Caiyi Shen for Generate / Deeplight Games: an ornate gold frame with crescent moons and four-pointed stars around an arched compass-star panel above a cream text panel." fetchpriority="high"></div>
  <h1 class="cover-name"><span class="w w1">Caiyi</span> <span class="w w2">Shen</span></h1>
  <div class="cover-meta">
    <p class="cover-role">Game Designer<i>·</i>Player Experience Researcher<i>·</i>Artist</p>
  </div>
  <a class="cover-credit" href="projects/generate-deeplight-games.html#tarot-card">Tarot card<br>original artwork · Deeplight Games</a>
  <a class="c2-next" data-next-chapter href="research.html"><span class="nl">Scroll to continue</span><span class="nt"><b>02</b>Research</span><span class="np"><i></i></span></a>
</main>
</body>
</html>
`;
}
