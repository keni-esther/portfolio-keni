/* ===== LOADER ===== */
const loaderProgress = document.getElementById('loaderProgress');
const loader = document.getElementById('loader');

let progress = 0;
const interval = setInterval(() => {
  progress += Math.random() * 18 + 5;
  if (progress >= 100) {
    progress = 100;
    loaderProgress.style.width = '100%';
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      startAnimations();
    }, 400);
  } else {
    loaderProgress.style.width = progress + '%';
  }
}, 120);

document.body.style.overflow = 'hidden';

/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .project-card, .skill-category, .contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hover');
    cursorFollower.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover');
    cursorFollower.classList.remove('hover');
  });
});

/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* ===== BURGER MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ===== TYPEWRITER EFFECT ===== */
const roles = [
  'Développeuse Front-end',
  'Designer UX/UI',
  'Développeuse Web & Mobile',
  'Data & IA Apprante',
  'Automatisation No-Code'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('roleText');

function typeRole() {
  const current = roles[roleIndex];
  if (!isDeleting) {
    roleEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 55 : 85);
}

function startAnimations() {
  typeRole();
  initParticles();
}

/* ===== PARTICLES ===== */
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.6 ? '#8b5cf6' : '#06b6d4';
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 120) * 0.08;
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ===== CONTACT FORM — Formspree ===== */
// ⚠️  Remplace FORMSPREE_ID par ton vrai ID (ex: xyzabcde)
// Crée ton compte sur https://formspree.io et copie l'ID ici
const FORMSPREE_ID = 'myeggono';

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const btn     = contactForm.querySelector('button[type="submit"]');
  const btnSpan = btn.querySelector('span');

  // État chargement
  btn.disabled    = true;
  btnSpan.textContent = 'Envoi en cours...';
  formSuccess.classList.remove('show');
  formError.classList.remove('show');

  const data = {
    name:    contactForm.name.value,
    email:   contactForm.email.value,
    subject: contactForm.subject.value,
    message: contactForm.message.value,
  };

  try {
    const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body:    JSON.stringify(data),
    });

    if (res.ok) {
      contactForm.reset();
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 6000);
    } else {
      formError.classList.add('show');
      setTimeout(() => formError.classList.remove('show'), 6000);
    }
  } catch {
    formError.classList.add('show');
    setTimeout(() => formError.classList.remove('show'), 6000);
  } finally {
    btn.disabled = false;
    btnSpan.textContent = 'Envoyer le message';
  }
});

/* ===== SMOOTH ACTIVE NAV ===== */
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        link.style.color = 'var(--purple-light)';
      } else {
        link.style.color = '';
      }
    }
  });
});

/* ===== POWER BI GALLERY ===== */
function switchPBI(index) {
  const imgs = document.querySelectorAll('.gallery-img');
  const thumbs = document.querySelectorAll('.thumb');
  imgs.forEach((img, i) => img.classList.toggle('active', i === index));
  thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
}

// Auto-slide toutes les 3 secondes
let pbiIndex = 0;
const totalPBI = document.querySelectorAll('.gallery-img').length;
if (totalPBI > 0) {
  setInterval(() => {
    pbiIndex = (pbiIndex + 1) % totalPBI;
    switchPBI(pbiIndex);
  }, 3000);
}

/* ===== LIGHTBOX ===== */
const pbiSrcs = [
  'assets/powerbi-1.png',
  'assets/powerbi-2.png',
  'assets/powerbi-3.png',
  'assets/powerbi-4.png'
];
let lightboxIndex = 0;

function openLightbox(index) {
  lightboxIndex = index;
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const counter = document.getElementById('lightboxCounter');
  img.src = pbiSrcs[index];
  img.alt = `Dashboard Power BI - Vue ${index + 1}`;
  counter.textContent = `${index + 1} / ${pbiSrcs.length}`;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = 'auto';
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + pbiSrcs.length) % pbiSrcs.length;
  openLightbox(lightboxIndex);
}

// Fermer avec Echap, naviguer avec flèches clavier
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') lightboxNav(1);
  if (e.key === 'ArrowLeft')  lightboxNav(-1);
});
