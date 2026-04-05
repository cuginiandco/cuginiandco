const toggle = document.querySelector('.nav-toggle');
const menu = document.querySelector('.nav-links');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    menu.classList.toggle('show');
  });
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('open');
      menu.classList.remove('show');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('in-view'));
}

const body = document.body;
const links = document.querySelectorAll('a[href]');
window.addEventListener('pageshow', () => {
  body.classList.add('transition-ready', 'page-enter');
  requestAnimationFrame(() => {
    body.classList.add('page-enter-active');
    setTimeout(() => body.classList.remove('page-enter', 'page-enter-active'), 500);
  });
});
links.forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#') || href.startsWith('http') || link.target === '_blank') return;
  link.addEventListener('click', (event) => {
    event.preventDefault();
    body.classList.add('transition-ready', 'page-leave');
    setTimeout(() => { window.location.href = href; }, 320);
  });
});
