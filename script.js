/* ===========================
   RADITYA NAUFAL IRSYAD
   Portfolio — script.js
   =========================== */

'use strict';

// ===========================
// PRELOADER
// ===========================
(function () {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloaderFill');
  const text = document.getElementById('preloaderText');
  const messages = ['Initializing system...', 'Loading assets...', 'Rendering interface...', 'Almost ready...'];
  let progress = 0;
  let msgIdx = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18 + 4;
    if (progress > 100) progress = 100;
    fill.style.width = progress + '%';

    const msgStep = Math.floor(progress / 25);
    if (msgStep < messages.length) {
      text.textContent = messages[msgStep];
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initReveal();
      }, 400);
    }
  }, 60);

  document.body.style.overflow = 'hidden';
})();

// ===========================
// CUSTOM CURSOR
// ===========================
(function () {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, .project-card, .service-card, .skill-category, .stat-card, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
})();

// ===========================
// SCROLL PROGRESS
// ===========================
(function () {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrollTop / docHeight * 100) + '%';
  }, { passive: true });
})();

// ===========================
// NAVBAR
// ===========================
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active nav tracking
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.id;
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
})();

// ===========================
// TYPING ANIMATION
// ===========================
(function () {
  const el = document.getElementById('typingText');
  if (!el) return;

  const words = ['Fullstack Developer', 'Security System Analyst', 'IT Student', 'Frontend & Backend Developer', 'UI/UX Enthusiast'];
  let wordIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let delay = 120;

  function type() {
    const current = words[wordIdx];

    if (isDeleting) {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      delay = 60;
    } else {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      delay = 100;
    }

    if (!isDeleting && charIdx === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      wordIdx = (wordIdx + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  setTimeout(type, 1200);
})();

// ===========================
// PARTICLE CANVAS
// ===========================
(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.width * canvas.height / 14000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0,212,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.opacity})`;
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
    });

    animId = requestAnimationFrame(drawParticles);
  }

  resize();
  createParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    createParticles();
    drawParticles();
  });
})();

// ===========================
// SCROLL REVEAL
// ===========================
function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));

  // Immediately reveal hero elements
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120 + 300);
  });
}

// ===========================
// ANIMATED COUNTERS
// ===========================
(function () {
  const counters = document.querySelectorAll('.stat-number');
  let observed = false;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + (target >= 10 && target < 100 ? '' : '');
    }, 16);
  }

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !observed) {
      observed = true;
      counters.forEach((el, i) => {
        setTimeout(() => animateCounter(el), i * 200);
      });
    }
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) observer.observe(aboutSection);
})();

// ===========================
// SKILL BARS ANIMATION
// ===========================
(function () {
  const skillBars = document.querySelectorAll('.skill-fill');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
      animated = true;
      skillBars.forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, i * 100 + 200);
      });
    }
  }, { threshold: 0.2 });

  const skillsSection = document.getElementById('skills');
  if (skillsSection) observer.observe(skillsSection);
})();

// ===========================
// MOUSE PARALLAX (HERO)
// ===========================
(function () {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;

  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    targetX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    targetY = (e.clientY - rect.top - rect.height / 2) / rect.height;
  });

  hero.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });

  function animateParallax() {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;

    const profileWrapper = document.querySelector('.profile-wrapper');
    const shapes = document.querySelector('.hero-floating-shapes');

    if (profileWrapper) {
      profileWrapper.style.transform = `translate(${currentX * 18}px, ${currentY * 12}px)`;
    }

    if (shapes) {
      shapes.style.transform = `translate(${currentX * -8}px, ${currentY * -6}px)`;
    }

    requestAnimationFrame(animateParallax);
  }

  animateParallax();
})();

// ===========================
// BACK TO TOP
// ===========================
(function () {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ===========================
// THEME TOGGLE
// ===========================
(function () {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const saved = localStorage.getItem('rni-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('rni-theme', next);
  });
})();

// ===========================
// CONTACT FORM
// ===========================
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"] span');
    const original = btn.textContent;

    btn.textContent = 'Sending...';
    form.querySelector('button').disabled = true;

    setTimeout(() => {
      btn.textContent = 'Message Sent! ✓';
      form.reset();
      setTimeout(() => {
        btn.textContent = original;
        form.querySelector('button').disabled = false;
      }, 3000);
    }, 1200);
  });
})();

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});

// ===========================
// FLOATING CARD TILT (Services)
// ===========================
(function () {
  const cards = document.querySelectorAll('.service-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

// ===========================
// GLITCH TEXT EFFECT (subtle)
// ===========================
(function () {
  const nameEl = document.querySelector('.hero-name .glow-text');
  if (!nameEl) return;

  setInterval(() => {
    if (Math.random() > 0.96) {
      nameEl.style.textShadow = `2px 0 rgba(0,212,255,0.3), -2px 0 rgba(0,82,212,0.3)`;
      setTimeout(() => { nameEl.style.textShadow = ''; }, 80);
    }
  }, 2000);
})();

console.log('%c⚡ Raditya Naufal Irsyad | Fullstack Developer & Security Analyst', 'color: #00d4ff; font-size: 14px; font-weight: bold; font-family: monospace;');
console.log('%cBuilt with HTML5 · CSS3 · Vanilla JS — No frameworks needed.', 'color: #4a6080; font-size: 11px; font-family: monospace;');
