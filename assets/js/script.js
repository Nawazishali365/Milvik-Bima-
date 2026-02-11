document.addEventListener('DOMContentLoaded', () => {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        // Prevent body scroll when menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Mobile Dropdown Toggle
const dropdowns = document.querySelectorAll('.nav-menu .dropdown');
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Hero Slider Functionality
function initHeroSlider() {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) return;

    const slides = sliderContainer.querySelectorAll('.slide');
    if (slides.length <= 1) return;

    let currentSlide = 0;
    const slideCount = slides.length;
    const intervalTime = 6000; // 6 seconds delay

    function nextSlide() {
        // Find current and next indices
        const prevIndex = currentSlide;
        currentSlide = (currentSlide + 1) % slideCount;

        // Reset classes for all slides
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev');
        });

        // Add prev class to the slide that is sliding out
        slides[prevIndex].classList.add('prev');

        // Add active class to the slide that is sliding in
        slides[currentSlide].classList.add('active');
    }

    // Set interval for slider
    setInterval(nextSlide, intervalTime);
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const updateCopyrightYear = () => {
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    // Terms and Conditions Toggle
    const toggleTermsBtn = document.getElementById('toggleTermsBtn');
    const termsContent = document.getElementById('termsContent');

    if (toggleTermsBtn && termsContent) {
        toggleTermsBtn.addEventListener('click', () => {
            const isHidden = termsContent.style.display === 'none';
            termsContent.style.display = isHidden ? 'block' : 'none';
            toggleTermsBtn.textContent = isHidden ? 'Hide Full Terms & Conditions' : 'Read Full Terms & Conditions';
        });
    }

    // Run immediately
    updateCopyrightYear();

    // Existing initializations
    initHeroSlider();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.offer-card, .plan-card, .benefit-card, .testimonial-card, .step-card, .blog-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

// Counter Animation for Stats (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Add hover effects for cards
document.querySelectorAll('.offer-card, .plan-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation (if forms are added)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// CTA Button Click Handlers
document.querySelectorAll('.cta-button, .cta-button-secondary, .learn-more-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'ripple 0.6s ease-out';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Bima Health Insurance - Landing Page Loaded Successfully');
