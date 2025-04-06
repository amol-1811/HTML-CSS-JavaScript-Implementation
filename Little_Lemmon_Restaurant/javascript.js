// Smooth scroll effect and active nav styling
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-item a');

    // Scroll smoothly
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href').trim());
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Highlight current section in navbar
    const sections = document.querySelectorAll('main > div');
    const options = {
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href').trim().substring(1) === entry.target.id.trim()) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));
});
