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