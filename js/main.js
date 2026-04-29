/* ============================================================
   Portfolio — Thiago Lyra
   main.js
   ============================================================ */

// ── Navigation scroll effect ──
const navbar   = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

let _navTimer;
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  clearTimeout(_navTimer);
  _navTimer = setTimeout(highlightActiveNav, 50);
}, { passive: true });

// ── Mobile menu ──
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});

// ── Typed text ──
const lines = [
  'Full Stack Developer',
  'Python / Django Dev',
  'TypeScript Enthusiast',
  'Angular & React Dev',
  'Java / Spring Dev',
  'IA & ML Student'
];

let lineIdx = 0;
let charIdx = 0;
let deleting = false;
const typedEl = document.getElementById('typedText');

function tick() {
  if (!typedEl) return;
  const str  = lines[lineIdx];
  const next = deleting
    ? str.slice(0, charIdx - 1)
    : str.slice(0, charIdx + 1);

  typedEl.textContent = next;
  deleting ? charIdx-- : charIdx++;

  let delay = deleting ? 55 : 95;

  if (!deleting && charIdx === str.length) {
    delay    = 2200;
    deleting = true;
  } else if (deleting && charIdx === 0) {
    deleting = false;
    lineIdx  = (lineIdx + 1) % lines.length;
    delay    = 350;
  }

  setTimeout(tick, delay);
}

tick();

// ── Scroll reveal (Intersection Observer) ──
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    io.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => io.observe(el));

// Stagger children inside grids
document.querySelectorAll('.skills__grid, .projects__grid').forEach(grid => {
  grid.querySelectorAll('.reveal').forEach((child, i) => {
    child.style.transitionDelay = `${i * 80}ms`;
  });
});

// ── Active nav link ──
function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.id;
    }
  });

  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ── Contact form ── mailto fallback ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name    = (document.getElementById('name')?.value    || '').trim();
    const subject = (document.getElementById('subject')?.value || '').trim();
    const message = (document.getElementById('message')?.value || '').trim();

    const subj = encodeURIComponent(subject || 'Contato pelo Portfólio');
    const body = encodeURIComponent(
      (name ? `Nome: ${name}\n\n` : '') + (message || '')
    );
    window.location.href = `mailto:thiagolyra1@gmail.com?subject=${subj}&body=${body}`;
  });
}
