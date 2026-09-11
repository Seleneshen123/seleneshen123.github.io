document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');

function updateHeader() {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 10);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menuToggle && nav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('is-open', opening);
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (event) => {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(event.target) || menuToggle.contains(event.target)) return;
    closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) closeMenu();
  });
}

const categoryFrame = document.querySelector('[data-spotlight]');
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (categoryFrame && canHover.matches && !reduceMotion.matches) {
  categoryFrame.addEventListener('pointermove', (event) => {
    const rect = categoryFrame.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, event.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, event.clientY - rect.top));
    categoryFrame.style.setProperty('--spot-x', `${x}px`);
    categoryFrame.style.setProperty('--spot-y', `${y}px`);
  });

  categoryFrame.addEventListener('pointerleave', () => {
    categoryFrame.style.setProperty('--spot-x', '50%');
    categoryFrame.style.setProperty('--spot-y', '46%');
  });
}

const copyButton = document.querySelector('[data-copy-email]');
const email = 'shen.caiy@northeastern.edu';

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  const successful = document.execCommand('copy');
  textarea.remove();
  if (!successful) throw new Error('Copy command failed');
}

if (copyButton) {
  copyButton.addEventListener('click', async () => {
    const original = copyButton.textContent;
    try {
      await copyText(email);
      copyButton.textContent = 'Copied';
      copyButton.setAttribute('aria-label', 'Email address copied');
    } catch (error) {
      copyButton.textContent = 'Select email';
      const emailLink = document.querySelector('[data-email-link]');
      if (emailLink) {
        const range = document.createRange();
        range.selectNodeContents(emailLink);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    window.setTimeout(() => {
      copyButton.textContent = original;
      copyButton.setAttribute('aria-label', 'Copy email address');
    }, 1800);
  });
}

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = String(new Date().getFullYear());
});
