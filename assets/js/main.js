/* ==========================================================================
   Mohamed Radhuwan Portfolio - Interactive Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initProjectFilter();
  initCopyEmail();
  initMobileMenu();
  initSmoothScroll();
});

/* ─── Theme Toggler ─────────────────────────────────────────────────────── */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeBtn) return;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = 'light_mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) themeIcon.textContent = 'dark_mode';
  }

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);

    if (themeIcon) {
      themeIcon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  });
}

/* ─── Project Filtering ─────────────────────────────────────────────────── */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ─── Copy Email Widget ───────────────────────────────────────────────── */
function initCopyEmail() {
  const copyBtns = document.querySelectorAll('.copy-email-btn');
  const toast = document.getElementById('toast');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'mohamedradhuwan07@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy email: ', err);
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* ─── Mobile Navigation Drawer ─────────────────────────────────────────── */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });

  // Close menu when link clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
    });
  });
}

/* ─── Smooth Scrolling & Active State ───────────────────────────────────── */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
