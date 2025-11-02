// Theme toggle (light default)
const rootEl = document.documentElement;
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const header = document.getElementById('site-header');
const yearEl = document.getElementById('year');

yearEl.textContent = new Date().getFullYear();

let isDark = localStorage.getItem('theme') === 'dark' ? true : false;
// keep light as default unless user explicitly set dark
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    body.classList.remove('light');
    themeToggle.textContent = '☀️';
} else {
    body.classList.add('light');
    themeToggle.textContent = '🌙';
}

themeToggle.addEventListener('click', () => {
    isDark = !isDark;
    if (isDark) {
        body.classList.remove('light');
        body.classList.add('dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
});

// solid navbar on scroll + smooth scroll behaviour
const navWrap = document.querySelector('.nav-wrap');
const hero = document.getElementById('hero');
window.addEventListener('scroll', () => {
    if (window.scrollY > (hero.clientHeight - 120)) {
        navWrap.classList.add('solid');
    } else {
        navWrap.classList.remove('solid');
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        // allow standard behavior for external links (skip if href is only '#')
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const y = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// Reveal on scroll using IntersectionObserver
const obs = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('inview');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));

// Mobile menu simple toggle (expand nav links)
const menuToggle = document.getElementById('menu-toggle');
menuToggle && menuToggle.addEventListener('click', () => {
    // small, simple mobile menu: toggle visibility of links
    document.querySelectorAll('.nav-link').forEach(l => {
        l.style.display = l.style.display === 'inline-block' ? 'none' : 'inline-block';
    });
});
// Hide mobile menu links on click
document.querySelectorAll('.nav-link').forEach(link => {   
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            link.style.display = 'none';
        }
    });
});