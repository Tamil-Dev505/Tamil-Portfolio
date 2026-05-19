/* =================================
   MAIN JAVASCRIPT
   Interactions, Animations & Utilities
   ================================= */

class Portfolio {
    constructor() {
        this.menuBtn = document.getElementById('menu-btn');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navbar = document.getElementById('navbar');
        this.contactForm = document.getElementById('contact-form');

        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupNavbarScroll();
        this.setupFormSubmission();
        this.setupScrollAnimations();
    }

    // Mobile menu toggle
    setupMobileMenu() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close menu when link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    toggleMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.toggle('active');
            this.menuBtn.classList.toggle('active');
        }
    }

    closeMobileMenu() {
        if (this.navMenu) {
            this.navMenu.classList.remove('active');
            this.menuBtn.classList.remove('active');
        }
    }

    // Smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                
                if (!href || href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    this.closeMobileMenu();
                }
            });
        });
    }

    // Navbar scroll effect
    setupNavbarScroll() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }

    // Form submission
    setupFormSubmission() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Collect form data
                const formData = new FormData(this.contactForm);
                console.log('Form submitted:', Object.fromEntries(formData));
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                this.contactForm.reset();
            });
        }
    }

    // Scroll animations
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        document.querySelectorAll('.project-card, .service-card, .stat-box').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    }
}

// Initialize portfolio on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Portfolio();
    });
} else {
    new Portfolio();
}

