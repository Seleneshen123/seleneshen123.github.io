/* Chapter navigation for C2.
 * Each chapter is its own page and URL. When a visitor reaches the end of a
 * chapter and keeps scrolling deliberately, a progress line fills and the next
 * chapter loads (a normal navigation, so Back/Forward work). Nothing is
 * intercepted while reading, inside PDFs, lightboxes, videos or form fields,
 * and the next chapter is always reachable by its link or the menu.
 */
(() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Menu (mobile index) */
  const btn = document.querySelector('[data-c2-menu]'), panel = document.getElementById('c2-index');
  if (btn && panel) {
    const set = open => { btn.setAttribute('aria-expanded', String(open)); panel.hidden = !open; btn.querySelector('span').textContent = open ? 'Close' : 'Index'; document.documentElement.style.overflow = open ? 'hidden' : ''; if (open) requestAnimationFrame(() => panel.querySelector('a')?.focus()); };
    btn.addEventListener('click', () => set(panel.hidden));
    addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) { set(false); btn.focus(); } });
  }

  const link = document.querySelector('[data-next-chapter]');
  if (!link) return;
  const isCover = document.body.classList.contains('is-cover');
  const NEXT = { 'research.html': ['02', 'Research'], 'game-design.html': ['03', 'Game Design'], 'art.html': ['04', '2D & 3D Art'], 'community.html': ['05', 'Community & Content'], 'cv.html': ['06', 'CV'], 'contact.html': ['07', 'Contact'] };
  const target = link.getAttribute('href'); const meta = NEXT[target.split('/').pop()];
  if (!meta) return;

  // Progress UI: the cover has its own; chapters get a floating hint.
  let bar = link.querySelector('.np i');
  let hint = null;
  if (!isCover) {
    hint = document.createElement('div'); hint.className = 'chapter-hint'; hint.setAttribute('aria-hidden', 'true');
    hint.innerHTML = `<span class="c2-next"><span class="nl">Next chapter</span><span class="nt"><b>${meta[0]}</b>${meta[1]}</span><span class="np"><i></i></span></span>`;
    document.body.append(hint); bar = hint.querySelector('.np i');
  }
  const THRESHOLD = 520;           // px of deliberate scroll beyond the end
  let intent = 0, atEndSince = 0, idle = 0, going = false;
  const atEnd = () => innerHeight + scrollY >= document.documentElement.scrollHeight - 4;
  const setP = p => { const v = Math.max(0, Math.min(1, p)); (hint || link).style.setProperty('--progress', v.toFixed(3)); if (bar) bar.parentElement.style.setProperty('--progress', v.toFixed(3)); if (hint) hint.classList.toggle('is-on', v > 0.02 || (atEnd() && document.documentElement.scrollHeight > innerHeight * 1.2)); };
  const blocked = el => !!(el && el.closest && el.closest('object, iframe, video, audio, embed, input, textarea, select, dialog, [data-lightbox-root]:not([hidden]), .c2-index:not([hidden]), [data-no-chapter]')) || !!document.querySelector('[data-lightbox-root]:not([hidden])') || (panel && !panel.hidden);
  const go = () => { if (going) return; going = true; setP(1); location.href = target; };
  const relax = () => { clearTimeout(idle); idle = setTimeout(() => { intent = 0; setP(0); }, 900); };
  const onScroll = () => { if (atEnd()) { if (!atEndSince) atEndSince = performance.now(); } else { atEndSince = 0; intent = 0; setP(0); } };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (isCover) atEndSince = performance.now() - 200;

  // Wheel / trackpad: only counts after the visitor has rested at the end,
  // so momentum from reading never carries straight into the next chapter.
  addEventListener('wheel', e => {
    if (going || e.deltaY <= 0 || blocked(e.target) || !atEnd()) return;
    if (performance.now() - atEndSince < (isCover ? 250 : 450)) return;
    const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
    intent += Math.min(dy, 120); setP(intent / THRESHOLD); relax();
    if (intent >= THRESHOLD) go();
  }, { passive: true });

  // Touch: pull up beyond the end.
  let y0 = null;
  addEventListener('touchstart', e => { y0 = atEnd() && !blocked(e.target) ? e.touches[0].clientY : null; }, { passive: true });
  addEventListener('touchmove', e => { if (y0 == null || going) return; const pull = y0 - e.touches[0].clientY; if (pull > 0) setP(pull / 180); }, { passive: true });
  addEventListener('touchend', e => { if (y0 == null) return; const pull = y0 - (e.changedTouches[0]?.clientY ?? y0); y0 = null; if (pull >= 180) go(); else setP(0); });

  // Keyboard: at the end, PageDown / Space / ↓ twice continues.
  let presses = 0;
  addEventListener('keydown', e => {
    if (going || blocked(document.activeElement) || e.altKey || e.ctrlKey || e.metaKey) return;
    if (!['PageDown', ' ', 'ArrowDown', 'Spacebar'].includes(e.key) || !atEnd()) { presses = 0; return; }
    if (performance.now() - atEndSince < 300) return;
    presses++; setP(presses / 2); relax(); if (presses >= 2) go();
  });

  // The explicit link always works immediately.
  link.addEventListener('click', () => { going = true; });
  if (reduce && bar) bar.style.transition = 'none';
})();
