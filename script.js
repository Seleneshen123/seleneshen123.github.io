/* Caiyi Shen — Portfolio
   Small native JavaScript only. Every page renders and reads without it. */

/* Current year in footers. */
document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});

/* ---------------------------------------------------------------------------
   Tag routing
   Every chip is a link to game-design.html#tag=<slug>. Off the index that is
   a plain navigation and works with JS disabled. On the index we intercept
   it, filter in place, and keep the hash in sync so the filtered view is
   linkable, shareable, and survives back/forward.
   --------------------------------------------------------------------------- */
const TAG_PREFIX = '#tag=';

(() => {
  const bar = document.querySelector('[data-filterbar]');
  const chips = [...document.querySelectorAll('.chip[data-tag]')];
  if (!bar || !chips.length) return;

  const projects = [...document.querySelectorAll('[data-project]')];
  const bands = [...document.querySelectorAll('.band')];
  const countEl = bar.querySelector('[data-filter-count]');
  const nameEl = bar.querySelector('[data-filter-name]');
  const clearBtn = bar.querySelector('[data-filter-clear]');
  /* Valid tags come from the projects themselves, not from the browse rail —
     a detail page can link to a niche tag the rail does not list. */
  const known = new Set(
    projects.flatMap((p) => (p.dataset.tags || '').split(/\s+/).filter(Boolean))
  );
  const labels = new Map(chips.map((c) => [c.dataset.tag, c.textContent.trim()]));
  const labelFor = (tag) =>
    labels.get(tag) || tag.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
  let active = null;

  const apply = () => {
    let shown = 0;
    projects.forEach((p) => {
      const tags = (p.dataset.tags || '').split(/\s+/);
      const match = !active || tags.includes(active);
      p.hidden = !match;
      if (match) shown += 1;
    });

    /* While a filter is on, hide any band with nothing left to show —
       including Other Works, whose entries carry no tags. Never hide the
       band that holds the filter bar itself, or there is no way back. */
    bands.forEach((band) => {
      if (band.contains(bar)) return;
      const items = [...band.querySelectorAll('[data-project]')];
      band.hidden = active !== null && !items.some((i) => !i.hidden);
    });

    chips.forEach((c) => {
      if (c.dataset.tag === active) c.setAttribute('aria-current', 'true');
      else c.removeAttribute('aria-current');
    });
    bar.classList.toggle('is-on', active !== null);
    if (active !== null) {
      countEl.textContent = String(shown);
      nameEl.textContent = labelFor(active);
    }
  };

  const setTag = (tag, { push = true, scroll = false } = {}) => {
    active = tag && known.has(tag) ? tag : null;
    apply();
    const hash = active ? TAG_PREFIX + active : '';
    if (push && hash !== location.hash) {
      history.pushState(null, '', hash || location.pathname + location.search);
    }
    if (scroll && active) {
      bar.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  };

  const fromHash = () =>
    location.hash.startsWith(TAG_PREFIX)
      ? decodeURIComponent(location.hash.slice(TAG_PREFIX.length))
      : null;

  chips.forEach((chip) => {
    chip.addEventListener('click', (event) => {
      event.preventDefault();
      setTag(chip.dataset.tag === active ? null : chip.dataset.tag, { scroll: true });
    });
  });

  clearBtn.addEventListener('click', () => setTag(null));
  window.addEventListener('popstate', () => setTag(fromHash(), { push: false }));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && active !== null) setTag(null);
  });

  /* --- collapsed tag browser ------------------------------------------- */
  const toggle = document.querySelector('[data-tagtoggle]');
  const panel = document.querySelector('[data-tagpanel]');

  const openPanel = (open) => {
    if (!toggle || !panel) return;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) {
      panel.classList.remove('is-open');
      panel.hidden = false;
      /* Measure the real content height so the reveal ends exactly there. */
      panel.style.setProperty('--panel-h', `${panel.scrollHeight}px`);
      void panel.offsetHeight; /* restart the animation if it is re-opened */
      panel.classList.add('is-open');
    } else {
      panel.classList.remove('is-open');
      panel.hidden = true;
    }
  };

  if (toggle && panel) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () =>
      openPanel(toggle.getAttribute('aria-expanded') !== 'true')
    );
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        openPanel(false);
        toggle.focus();
      }
    });
  }

  /* Arriving with #tag=… (from a chip on a detail page) filters on load.
     Open the browser too, so the active tag is visible and clearable. */
  const initial = fromHash();
  setTag(initial, { push: false, scroll: true });
  if (initial && known.has(initial)) openPanel(true);
})();

/* ---------------------------------------------------------------------------
   Art lightbox
   Triggers are real <button>s, so this is keyboard-operable without extra
   work. Focus moves to the close button and returns to the trigger on exit.
   --------------------------------------------------------------------------- */
(() => {
  const root = document.querySelector('[data-lightbox-root]');
  if (!root) return;
  const img = root.querySelector('[data-lightbox-img]');
  const cap = root.querySelector('[data-lightbox-cap]');
  const closeBtn = root.querySelector('[data-lightbox-close]');
  const triggers = [...document.querySelectorAll('[data-lightbox]')];
  let lastFocused = null;

  const close = () => {
    root.hidden = true;
    document.body.style.removeProperty('overflow');
    img.src = '';
    if (lastFocused) lastFocused.focus();
  };

  const open = (trigger) => {
    lastFocused = trigger;
    const inner = trigger.querySelector('img');
    img.src = trigger.dataset.lightbox;
    img.alt = inner ? inner.alt : '';
    cap.textContent = trigger.dataset.caption || '';
    root.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  triggers.forEach((t) => t.addEventListener('click', () => open(t)));
  closeBtn.addEventListener('click', close);
  root.addEventListener('click', (event) => { if (event.target === root) close(); });

  document.addEventListener('keydown', (event) => {
    if (root.hidden) return;
    if (event.key === 'Escape') { close(); return; }
    /* Only two focusable things exist in here, so keep Tab inside. */
    if (event.key === 'Tab') { event.preventDefault(); closeBtn.focus(); }
  });
})();

/* ---------------------------------------------------------------------------
   Video facade
   The YouTube iframe is only created on click, so a detail page makes no
   third-party request unless the visitor asks to watch. The poster is a
   local image, never an external thumbnail.
   --------------------------------------------------------------------------- */
document.querySelectorAll('[data-video]').forEach((box) => {
  const button = box.querySelector('.videobtn');
  if (!button) return;
  button.addEventListener('click', () => {
    const id = box.dataset.video;
    const frame = document.createElement('iframe');
    frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    frame.title = box.dataset.videoTitle || 'Gameplay video';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture';
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    frame.allowFullscreen = true;
    box.replaceChildren(frame);
  });
});
