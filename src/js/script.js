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

    // Display Medium articles
    displayStaticMediumArticles();

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

// Display static Medium articles
function displayStaticMediumArticles() {
    const articles = [
        {
            title: "How Java's Core Concepts Empower Your Code: Unlocking the Essentials for Masterful Development",
            excerpt: "Java is a widely-used programming language expressly designed for use in the distributed environment of the internet. Let's dive into some...",
            date: "Apr 15, 2024",
            readTime: 5,
            link: "https://medium.com/@bugslife_dev.in"
        },
        {
            title: "Mostly asked and Common Topics Of Java Backend Interview (4+ Years of experience)",
            excerpt: "Java Memory Management, Concurrency, Spring Boot, Microservices, and other essential topics for backend interviews...",
            date: "Apr 10, 2024",
            readTime: 8,
            link: "https://medium.com/@bugslife_dev.in"
        },
        {
            title: "Preparing for a Java Interview as an Experienced Professional (3+ Years)",
            excerpt: "Java, a versatile and widely-used programming language, is a common requirement for many software development roles. If you're an...",
            date: "Apr 12, 2024",
            readTime: 6,
            link: "https://medium.com/@bugslife_dev.in"
        }
    ];

    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';

    articles.forEach(article => {
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <h3>${article.title}</h3>
            <p class="blog-excerpt">${article.excerpt}</p>
            <div class="blog-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${article.date}
                </span>
                <span class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${article.readTime} min read
                </span>
            </div>
            <a href="${article.link}" target="_blank" class="blog-link">
                Read on Medium <i class="fas fa-arrow-right"></i>
            </a>
        `;
        blogGrid.appendChild(blogCard);
    });

    // Add view all button
    const viewAllContainer = document.createElement('div');
    viewAllContainer.style.gridColumn = '1 / -1';
    viewAllContainer.style.textAlign = 'center';
    viewAllContainer.style.marginTop = '20px';
    viewAllContainer.innerHTML = `
        <a href="https://medium.com/@bugslife_dev.in" target="_blank" class="btn btn-secondary">View All Articles on Medium</a>
    `;
    blogGrid.parentElement.appendChild(viewAllContainer);
}

// Old fetch function - removed
/*
// Fetch Medium articles
function fetchMediumArticles(username) {
    const mediumRssUrl = `https://rss2json.com/api.json?rss_url=https://medium.com/feed/@${username}`;
    
    fetch(mediumRssUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok' && data.items && data.items.length > 0) {
                displayMediumArticles(data.items.slice(0, 3)); // Show top 3 articles
            } else {
                showBlogError('No articles found. Check the Medium username.');
            }
        })
        .catch(error => {
            console.error('Error fetching Medium articles:', error);
            showBlogError('Unable to fetch Medium articles. Please try again later.');
        });
}

function displayMediumArticles(articles) {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = '';

    articles.forEach(article => {
        const pubDate = new Date(article.pubDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        // Extract excerpt (first 150 characters of content)
        const excerpt = article.description
            .replace(/<[^>]*>/g, '') // Remove HTML tags
            .substring(0, 150)
            .trim() + '...';

        // Estimate reading time
        const readingTime = Math.ceil(article.content.split(/\s+/).length / 200);

        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.innerHTML = `
            <h3>${article.title}</h3>
            <p class="blog-excerpt">${excerpt}</p>
            <div class="blog-meta">
                <span class="blog-date">
                    <i class="fas fa-calendar"></i>
                    ${pubDate}
                </span>
                <span class="blog-read-time">
                    <i class="fas fa-clock"></i>
                    ${readingTime} min read
                </span>
            </div>
            <a href="${article.link}" target="_blank" class="blog-link">
                Read on Medium <i class="fas fa-arrow-right"></i>
            </a>
        `;

        blogGrid.appendChild(blogCard);
    });
}

function showBlogError(message) {
    const blogGrid = document.getElementById('blogGrid');
    blogGrid.innerHTML = `<div class="blog-error">${message}</div>`;
}
*/