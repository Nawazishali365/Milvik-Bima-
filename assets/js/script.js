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

// Unified Single Site Footer Renderer
function renderUnifiedFooter() {
    const footers = document.querySelectorAll('footer.footer, #site-footer');
    if (footers.length === 0) return;

    const footerTemplate = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="logo">
                        <a href="index.html"><img src="assets/img/logo.png" alt="BIMA" class="logo-img"></a>
                    </div>
                    <p>Your trusted partner in health and life insurance. Protecting families since 2010.</p>
                    <div class="social-links">
                        <a href="https://www.facebook.com/bimapakistan/" target="_blank" aria-label="Facebook">f</a>
                        <a href="https://www.youtube.com/@BIMAPakistan" target="_blank" aria-label="Youtube">y</a>
                        <a href="https://www.instagram.com/bimapakistan/" target="_blank" aria-label="Instagram">i</a>
                        <a href="https://www.linkedin.com/company/milvik-bima-mobile-pakistan/mycompany/" target="_blank" aria-label="LinkedIn">in</a>
                    </div>
                </div>

                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="doctors.html">Our Doctors</a></li>
                        <li><a href="careers.html">Careers</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#">Life Insurance</a></li>
                        <li><a href="bima-sehat.html">Health Insurance</a></li>
                        <li><a href="bundle-insurance.html">Bundle Insurance</a></li>
                        <li><a href="personal-accident-insurance.html">Claims</a></li>
                        <li><a href="refund-policy.html">Refund Policy</a></li>
                    </ul>
                </div>

                <div class="footer-section">
                    <h4>Contact Us</h4>
                    <ul class="contact-info">
                        <li>📞 <a href="tel:+9242111119878" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">042 111 119 878</a></li>
                        <li>✉️ <a href="mailto:Customer.Care@milvikpakistan.com" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Customer.Care@milvikpakistan.com</a></li>
                        <li>📍 <a href="https://www.google.com/maps/search/?api=1&query=New,+Liberty+Towers,+Model+Town+Link+Rd,+Bhatti+Colony,+Lahore" target="_blank" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">New, Liberty Towers, Model Town Link Rd, Lahore</a></li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; <span id="currentYear">${new Date().getFullYear()}</span> Bima Insurance. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a> | <a href="refund-policy.html">Refund Policy</a></p>
            </div>
        </div>
    `;

    const applyFooter = (html) => {
        footers.forEach(footer => {
            footer.innerHTML = html;
        });

        // Highlight active page link in footer
        const pageName = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.footer a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === pageName) {
                link.classList.add('active');
            }
        });

        const yearSpan = document.getElementById('currentYear');
        if (yearSpan) {
            yearSpan.textContent = new Date().getFullYear();
        }
    };

    applyFooter(footerTemplate);
}

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    // Render Unified Site Footer
    renderUnifiedFooter();

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
