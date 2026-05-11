const WPP = 'https://wa.me/5491127704144?text=' +
  encodeURIComponent('¡Hola Experiencia Guau! 🐾 Quiero reservar un turno para mi perro.');

document.querySelectorAll('[data-wpp]').forEach(el => { el.href = WPP; });

// ---- Menú móvil ----
const hamburger   = document.querySelector('.hamburger');
const mobileMenu  = document.querySelector('.mobile-menu');
const mobileClose = document.querySelector('.mobile-close');

hamburger?.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose?.addEventListener('click', closeMobile);
document.querySelectorAll('.mobile-menu a').forEach(a => a.addEventListener('click', closeMobile));

function closeMobile() {
  mobileMenu?.classList.remove('open');
  document.body.style.overflow = '';
}

// ---- Navbar sombra al scroll ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.08)' : '';
});

// ---- Nav activo según scroll (single-page) ----
const sectionIds = ['inicio', 'servicios', 'nosotros', 'galeria', 'contacto'];
function updateActiveNav() {
  let current = sectionIds[0];
  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= 90) current = id;
  });
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();

// ---- Animaciones scroll ----
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- Lightbox ----
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbClose  = document.getElementById('lb-close');

document.querySelectorAll('.gal-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img')?.src;
    if (lightbox && src) {
      lbImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });
});
lbClose?.addEventListener('click', closeLb);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLb(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

function closeLb() {
  lightbox?.classList.remove('open');
  document.body.style.overflow = '';
}
