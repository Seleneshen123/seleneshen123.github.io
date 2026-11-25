/* Shared site behaviour for all prototypes. Progressive enhancement only:
 * every page is fully readable without this script. */
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Menu (overlay or drawer, depending on the direction's CSS). */
for (const btn of document.querySelectorAll('[data-menu-toggle]')) {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  const set = open => {
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.classList.toggle('menu-open', open);
    if (panel) panel.toggleAttribute('data-open', open);
    if (open) panel?.querySelector('a')?.focus();
  };
  btn.addEventListener('click', () => set(btn.getAttribute('aria-expanded') !== 'true'));
  addEventListener('keydown', e => { if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); } });
}

/* Reveal on scroll. Content is visible by default; only hidden once JS runs. */
const revealables = document.querySelectorAll('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) revealables.forEach(el => el.classList.add('is-in'));
else {
  const io = new IntersectionObserver(entries => { for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealables.forEach(el => io.observe(el));
}

/* Images fade in once decoded (no layout shift: dimensions are in the markup). */
for (const img of document.querySelectorAll('img[data-fade]')) {
  const done = () => img.classList.add('is-loaded');
  if (img.complete && img.naturalWidth) done(); else { img.addEventListener('load', done, { once: true }); img.addEventListener('error', done, { once: true }); }
}

/* Tag filtering (Game Design index). Hash-addressable: #tag=game-art */
const filterRoot = document.querySelector('[data-filter-root]');
if (filterRoot) {
  const buttons = [...filterRoot.querySelectorAll('[data-filter]')];
  const items = [...document.querySelectorAll('[data-tags]')];
  const status = document.querySelector('[data-filter-status]');
  const apply = tag => {
    let shown = 0;
    for (const it of items) { const ok = !tag || it.dataset.tags.split(' ').includes(tag); it.hidden = !ok; if (ok) shown++; }
    for (const b of buttons) b.setAttribute('aria-pressed', String((b.dataset.filter || '') === (tag || '')));
    for (const group of document.querySelectorAll('[data-filter-group]')) group.hidden = !group.querySelector('[data-tags]:not([hidden])');
    if (status) status.textContent = tag ? `${shown} project${shown === 1 ? '' : 's'} tagged ${buttons.find(b => b.dataset.filter === tag)?.textContent.trim()}` : `${items.length} projects`;
  };
  for (const b of buttons) b.addEventListener('click', () => { const t = b.dataset.filter || ''; history.replaceState(null, '', t ? `#tag=${t}` : location.pathname); apply(t); });
  const fromHash = () => { const m = location.hash.match(/tag=([\w-]+)/); apply(m ? m[1] : ''); };
  addEventListener('hashchange', fromHash); fromHash();
}

/* Lightbox for artwork. Uses <dialog> for focus trapping and Esc handling. */
const lbItems = [...document.querySelectorAll('[data-lightbox]')];
if (lbItems.length) {
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Artwork viewer');
  dlg.innerHTML = '<figure class="lightbox-figure"><img alt=""><figcaption class="lightbox-caption"></figcaption></figure>' +
    '<button class="lightbox-btn lightbox-prev" type="button" aria-label="Previous artwork">&#8592;</button>' +
    '<button class="lightbox-btn lightbox-next" type="button" aria-label="Next artwork">&#8594;</button>' +
    '<button class="lightbox-btn lightbox-close" type="button" aria-label="Close viewer">&#10005;</button>';
  document.body.append(dlg);
  const img = dlg.querySelector('img'), cap = dlg.querySelector('figcaption');
  let idx = 0, opener = null;
  const show = i => {
    idx = (i + lbItems.length) % lbItems.length; const a = lbItems[idx]; const thumb = a.querySelector('img');
    img.classList.remove('is-loaded'); img.src = a.getAttribute('href'); img.alt = thumb ? thumb.alt : '';
    img.onload = () => img.classList.add('is-loaded');
    cap.textContent = a.dataset.caption || '';
  };
  for (const [i, a] of lbItems.entries()) a.addEventListener('click', e => { e.preventDefault(); opener = a; show(i); dlg.showModal(); });
  dlg.querySelector('.lightbox-close').addEventListener('click', () => dlg.close());
  dlg.querySelector('.lightbox-prev').addEventListener('click', () => show(idx - 1));
  dlg.querySelector('.lightbox-next').addEventListener('click', () => show(idx + 1));
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); });
  dlg.addEventListener('close', () => { img.removeAttribute('src'); opener?.focus(); });
}

/* Scroll progress (used by some directions for a rail / timecode). */
const progress = document.querySelectorAll('[data-scroll-progress]');
if (progress.length) {
  const upd = () => { const max = document.documentElement.scrollHeight - innerHeight; const p = max > 0 ? scrollY / max : 0; for (const el of progress) el.style.setProperty('--p', p.toFixed(4)); };
  addEventListener('scroll', upd, { passive: true }); upd();
}

/* Year */
for (const el of document.querySelectorAll('[data-year]')) el.textContent = String(new Date().getFullYear());
