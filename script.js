/* --- ANIMATION ON SCROLL LOGIC --- */
console.log("Portfolio loaded successfully.");

const elementsToAnimate = document.querySelectorAll(
    'section h2, .timeline-item, .project-card, .about-text, .skills-list li, .hero p, .hero a'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

elementsToAnimate.forEach((el) => {
    el.classList.add('hidden-animate');
    observer.observe(el);
});

/* --- SLIDING NAV BUBBLE LOGIC --- */
const bubble = document.querySelector('.nav-bubble');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

function moveBubble(e) {
    // 1. Calculate standard position
    // offsetLeft = how far the link is from the left edge of the container
    // offsetWidth = how wide the link is
    let leftPosition = e.target.offsetLeft;
    let width = e.target.offsetWidth;

    // 2. Apply to bubble
    bubble.style.left = leftPosition + 'px';
    bubble.style.width = width + 'px';
    bubble.style.opacity = '1'; // Make it visible
    bubble.style.height = e.target.offsetHeight + 'px'; // Match link height
    // Center it vertically just in case
    bubble.style.top = e.target.offsetTop + 'px';
}

// Attach the hover listener to all standard links
navLinks.forEach(link => {
    link.addEventListener('mouseenter', moveBubble);
});

// Optional: Hide bubble when leaving the entire nav area
navLinksContainer.addEventListener('mouseleave', () => {
    bubble.style.opacity = '0';
});

/* --- MOBILE MENU TOGGLE --- */
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

// Toggle menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Optional: Toggle between 'bars' and 'X' icon
    const icon = hamburger.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times'); // Changes to an 'X'
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');  // Changes back to bars
    }
});

// Close menu when a link is clicked (crucial for single-page apps!)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        // Reset icon to bars
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

/* --- STICKY NAV BUTTON LOGIC --- */
const nav = document.querySelector('nav');
const heroSection = document.querySelector('.hero');

// This observer will watch the hero section
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Hero is OFF screen, so show the button
            nav.classList.add('nav-scrolled');
        } else {
            // Hero is ON screen, so hide the button
            nav.classList.remove('nav-scrolled');
        }
    });
}, { 
    threshold: 0,
    rootMargin: "-100px 0px 0px 0px" /* Triggers 100px *before* hero is fully gone */
});

// Tell the observer to watch the hero section
navObserver.observe(heroSection);