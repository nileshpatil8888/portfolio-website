// This file contains JavaScript code for interactive features of the website, such as form validation, smooth scrolling, or any dynamic content updates.

document.addEventListener('DOMContentLoaded', function() {
    // Load header
    loadComponent('header', 'components/header.html');
    
    // Load navbar
    loadComponent('navbar', 'components/navbar.html');
    
    // Load footer
    loadComponent('footer', 'components/footer.html');

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
        });
    }

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 1s ease forwards';
            }
        });
    }, observerOptions);

    // Observe skill cards and project cards
    document.querySelectorAll('.tech-card, .project-card, .cert-card').forEach(el => {
        observer.observe(el);
    });

    console.log('Portfolio loaded successfully! ✨');
});

function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.log('Component not found:', filePath));
}