/*
   Premium Portfolio JavaScript
   Author: Kuski Gupta
   Handles smooth scrolling, active nav highlighting, and interactive features
*/

// ===== DOM Elements =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// ===== Mobile Menu Toggle =====
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===== Active Link Highlighting on Scroll =====
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Smooth Scroll on Navigation Click =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Animation for Elements =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.8s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animation to skill and tool cards
document.querySelectorAll('.skill-card, .tool-card, .highlight-card').forEach(el => {
    el.style.opacity = '0';
    el.style.animation = 'none';
    observer.observe(el);
});

// Define the slideInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===== Prevent Default Anchor Behavior =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
        }
    });
});

// ===== Add Loading Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== Click Effects on Buttons =====
const buttons = document.querySelectorAll('.cta-btn, .nav-link');
buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        // Optional: Add ripple styling
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
    });
});

// ===== Cursor Position Tracking =====
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// ===== Parallax Effect for Hero =====
const heroImage = document.querySelector('.image-placeholder');
if (heroImage) {
    window.addEventListener('mousemove', (e) => {
        const rect = heroImage.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const rotateX = (e.clientY - centerY) / 20;
        const rotateY = (centerX - e.clientX) / 20;

        // Subtle effect on hover
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            heroImage.style.transform = `perspective(1000px) rotateX(${rotateX * 0.3}deg) rotateY(${rotateY * 0.3}deg)`;
        }
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
}

// ===== Tooltip Functionality =====
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        const title = this.getAttribute('title');
        // Title attribute already provides tooltip in browsers
    });
});

// ===== Form Simulation (for contact links) =====
const emailLink = document.querySelector('a[href^="mailto:"]');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        // Allow default behavior for mailto
    });
}

// ===== Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ===== Tab Navigation =====
let currentNavIndex = -1;
navLinks.forEach((link, index) => {
    link.setAttribute('data-index', index);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const direction = e.key === 'ArrowRight' ? 1 : -1;
        currentNavIndex += direction;

        if (currentNavIndex < 0) currentNavIndex = navLinks.length - 1;
        if (currentNavIndex >= navLinks.length) currentNavIndex = 0;

        navLinks[currentNavIndex].focus();
    }
});

// ===== Scroll Progress Indicator =====
const createProgressBar = () => {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 70px;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #64B5F6, #FF6B6B);
        z-index: 999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
};

createProgressBar();

// ===== Print Friendly Styles =====
const addPrintStyles = () => {
    const printStyle = document.createElement('style');
    printStyle.media = 'print';
    printStyle.textContent = `
        .navbar {
            position: static;
            background: white;
            color: black;
        }
        section {
            page-break-inside: avoid;
        }
        body {
            background: white;
            color: black;
        }
    `;
    document.head.appendChild(printStyle);
};

addPrintStyles();

// ===== Performance: Lazy Load Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Dark Mode Toggle (Optional) =====
const isDarkMode = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // All elements are ready
    console.log('Portfolio loaded successfully!');
});

// ===== Accessibility: Focus Management =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});
