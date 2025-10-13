document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.transition-navbar');
    const toggler = document.querySelector('.navbar-toggler');
    const MOBILE_BREAKPOINT = 992;
    const SCROLL_THRESHOLD = 10;
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const featureItems = document.querySelectorAll('.feature-item');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Set item indices for staggered animations
    featureItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });
    
    navItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
    });

    const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT;

    const updateNavbar = () => {
        const scrolled = window.scrollY > SCROLL_THRESHOLD;
        navbar.classList.toggle('navbar-scrolled', scrolled && !isMobile());
    };

    const resetNavbar = () => {
        if (!isMobile() && !navbar.classList.contains('navbar-scrolled')) {
            navbar.classList.remove('navbar-scrolled');
        }
    };

    toggler.addEventListener('click', () => {
        const isOpen = toggler.getAttribute('aria-expanded') === 'true';
        if (isOpen && !isMobile()) {
            navbar.classList.remove('navbar-scrolled');
        } else {
            updateNavbar();
        }
    });

    const checkFade = () => {
        const triggerPoint = window.innerHeight * 0.8;
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < triggerPoint && rect.bottom > 0) {
                element.classList.add('is-visible');
            }
        });
    };

    updateNavbar();
    checkFade();

    window.addEventListener('scroll', () => {
        updateNavbar();
        checkFade();
    });

    window.addEventListener('resize', () => {
        resetNavbar();
        updateNavbar();
        checkFade();
    });
});

// Override Bootstrap's navbar collapse behavior to ensure scrolling works
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth <= 991) {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarCollapse && navbarToggler) {
            // Override Bootstrap's collapse behavior
            navbarToggler.addEventListener('click', () => {
                setTimeout(() => {
                    // Force remove height restrictions after Bootstrap applies them
                    navbarCollapse.style.height = 'auto';
                    navbarCollapse.style.maxHeight = 'none';
                    navbarCollapse.style.overflow = 'visible';
                    
                    // Ensure body can scroll
                    document.body.style.overflow = 'auto';
                    document.documentElement.style.overflow = 'auto';
                }, 10);
            });
        }
    }
});

// Add to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // Get current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Find all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Check if this link matches current page
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === './')) {
            
            link.classList.add('active');
        }
        
        // Remove active class from other links when clicked
        link.addEventListener('click', () => {
            navLinks.forEach(otherLink => otherLink.classList.remove('active'));
            link.classList.add('active');
        });
    });
});

