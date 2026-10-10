const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const themeToggle = document.getElementById('themeToggle');

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  });
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const lightMode = document.body.classList.contains('light');
  themeToggle.textContent = lightMode ? '☾' : '☼';
  themeToggle.setAttribute('aria-label', lightMode ? 'Switch to dark theme' : 'Switch to light theme');
});

document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const email = form.get('email').trim();
  const topic = form.get('topic');
  const message = form.get('message').trim();
  const subject = encodeURIComponent(`Portfolio contact: ${topic}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
  document.getElementById('formStatus').textContent = 'Opening your email app. Add your real email address in script.js if you want this to work.';
  // Replace the placeholder address below with your real email before publishing.
  window.location.href = `mailto:your-email@example.com?subject=${subject}&body=${body}`;
});

const sections = [...document.querySelectorAll('main section[id]')];
const navAnchors = [...document.querySelectorAll('.nav-links a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));
}
