// Handles scroll animations, navigation, and interactive elements

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all components
    initNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initTypingAnimation();
    initParallaxEffects();
    initSkillsAnimation();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Initialize active navigation link highlighting
    updateActiveNavLink();
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll reveal animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay * 1000);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('[class*="reveal-"]');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Typing animation for hero section
function initTypingAnimation() {
    const heroName = document.querySelector('.hero-name');
    if (!heroName) return;

    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.opacity = '1';

    let index = 0;
    const typingSpeed = 100;
    const startDelay = 500;

    setTimeout(() => {
        function typeChar() {
            if (index < text.length) {
                heroName.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typingSpeed);
            } else {
                // Add blinking cursor effect
                heroName.style.borderRight = '3px solid #6366F1';
                heroName.style.animation = 'blink 1s infinite';

                // Remove cursor after 3 seconds
                setTimeout(() => {
                    heroName.style.borderRight = 'none';
                    heroName.style.animation = 'none';
                }, 3000);
            }
        }
        typeChar();
    }, startDelay);

    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { border-color: #6366F1; }
            51%, 100% { border-color: transparent; }
        }
    `;
    document.head.appendChild(style);
}

// Parallax effects for enhanced visual appeal
function initParallaxEffects() {
    // Parallax logic moved to consolidated scroll handler
}

// Skills section animations
function initSkillsAnimation() {
    const skillCards = document.querySelectorAll('.skill-card');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';

                    // Add hover effect enhancement
                    entry.target.addEventListener('mouseenter', function () {
                        this.style.transform = 'translateY(-10px) scale(1.05)';
                    });

                    entry.target.addEventListener('mouseleave', function () {
                        this.style.transform = 'translateY(0) scale(1)';
                    });
                }, index * 100);

                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillCards.forEach(card => {
        card.style.transform = 'translateY(50px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        skillsObserver.observe(card);
    });
}

// Stats counter animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                const duration = 2000; // Animation duration in ms
                const increment = finalValue / (duration / 16); // 60fps
                let currentValue = 0;

                target.textContent = '0';

                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= finalValue) {
                        target.textContent = finalValue + '+';
                        clearInterval(counter);
                    } else {
                        target.textContent = Math.floor(currentValue);
                    }
                }, 16);

                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize stats animation
document.addEventListener('DOMContentLoaded', function () {
    initStatsAnimation();
});

// Project cards hover effects
function initProjectEffects() {
    const projectItems = document.querySelectorAll('.project-item');

    projectItems.forEach(item => {
        const projectImage = item.querySelector('.project-image img:not(.project-screenshot)');
        const projectScreenshot = item.querySelector('.project-screenshot');
        const projectContent = item.querySelector('.project-content');

        item.addEventListener('mouseenter', function () {
            // Apply effects to SVG project images
            if (projectImage) {
                projectImage.style.transform = 'scale(1.05) rotate(2deg)';
                projectImage.style.filter = 'brightness(1.1) drop-shadow(0 20px 40px rgba(99, 102, 241, 0.3))';
            }

            // Apply effects to project screenshots
            if (projectScreenshot) {
                projectScreenshot.style.transform = 'scale(1.02)';
                projectScreenshot.style.borderColor = '#6366F1';
                projectScreenshot.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
            }

            // Apply effects to project content
            if (projectContent) {
                projectContent.style.transform = 'translateY(-8px)';
                projectContent.style.filter = 'drop-shadow(0 4px 20px rgba(99, 102, 241, 0.15))';
            }
        });

        item.addEventListener('mouseleave', function () {
            // Reset SVG project images
            if (projectImage) {
                projectImage.style.transform = 'scale(1) rotate(0deg)';
                projectImage.style.filter = 'brightness(1) drop-shadow(0 8px 40px rgba(0, 0, 0, 0.3))';
            }

            // Reset project screenshots
            if (projectScreenshot) {
                projectScreenshot.style.transform = 'scale(1)';
                projectScreenshot.style.borderColor = '#333333';
                projectScreenshot.style.boxShadow = 'none';
            }

            // Reset project content
            if (projectContent) {
                projectContent.style.transform = 'translateY(0)';
                projectContent.style.filter = 'none';
            }
        });
    });
}

// Initialize project effects
document.addEventListener('DOMContentLoaded', function () {
    initProjectEffects();
});

// Timeline animation for experience section
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const content = item.querySelector('.timeline-content');
                const dot = item.querySelector('.timeline-dot');

                // Animate dot
                dot.style.transform = 'translateX(-50%) scale(1.5)';
                dot.style.background = '#6366F1';

                setTimeout(() => {
                    dot.style.transform = 'translateX(-50%) scale(1)';
                }, 300);

                // Animate content
                content.style.transform = 'translateY(0)';
                content.style.opacity = '1';

                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        content.style.transform = 'translateY(30px)';
        content.style.opacity = '0';
        content.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        timelineObserver.observe(item);
    });
}

// Initialize timeline animation
document.addEventListener('DOMContentLoaded', function () {
    initTimelineAnimation();
});

// Contact section interactions
function initContactEffects() {
    const contactMethods = document.querySelectorAll('.contact-method');

    contactMethods.forEach(method => {
        method.addEventListener('click', function () {
            const contactType = this.querySelector('h4').textContent.toLowerCase();
            const contactValue = this.querySelector('p').textContent;

            if (contactType === 'email') {
                window.location.href = `mailto:${contactValue}`;
            } else if (contactType === 'phone') {
                window.location.href = `tel:${contactValue.replace(/\D/g, '')}`;
            }
        });
    });

    // Add ripple effect to contact methods
    contactMethods.forEach(method => {
        method.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(99, 102, 241, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize contact effects
document.addEventListener('DOMContentLoaded', function () {
    initContactEffects();
});

// Scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366F1, #8B5CF6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.insertBefore(progressBar, document.body.firstChild);

    // Progress bar logic moved to consolidated scroll handler
    window.progressBar = progressBar; // Make accessible to consolidated handler
}

// Initialize scroll progress
document.addEventListener('DOMContentLoaded', function () {
    initScrollProgress();
});

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// CONSOLIDATED SCROLL HANDLER - All scroll effects in one optimized handler
window.addEventListener('scroll', throttle(function () {
    const scrolled = window.scrollY;
    const navbar = document.querySelector('.navbar');
    // Parallax elements removed to keep hero image in perfect position
    const progressBar = window.progressBar;

    // 1. Navbar background effect
    if (navbar) {
        if (scrolled > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }

    // 2. Active navigation highlighting
    updateActiveNavLink();

    // 3. Parallax effects - removed from hero image to keep it in perfect position

    // 4. Scroll progress bar
    if (progressBar) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrolled / maxScroll) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
}, 16)); // ~60fps for smooth performance

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        // Navigate sections with arrow keys
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            const sections = Array.from(document.querySelectorAll('section[id]'));
            const currentSection = sections.find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom > 100;
            });

            if (currentSection) {
                const currentIndex = sections.indexOf(currentSection);
                const nextIndex = e.key === 'ArrowDown' ?
                    Math.min(currentIndex + 1, sections.length - 1) :
                    Math.max(currentIndex - 1, 0);

                const targetSection = sections[nextIndex];
                const navbarHeight = document.querySelector('.navbar').offsetHeight;

                window.scrollTo({
                    top: targetSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', function () {
    initLazyLoading();
    initKeyboardNavigation();
});

// Error handling for failed image loads
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            console.warn('Failed to load image:', this.src);
        });
    });
});

// Accessibility enhancements
function initAccessibility() {
    // Add skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #6366F1;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
    `;

    skipLink.addEventListener('focus', function () {
        this.style.top = '6px';
    });

    skipLink.addEventListener('blur', function () {
        this.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    // Add main content landmark
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function () {
    initAccessibility();
});

// Console greeting for developers
console.log(`
    🚀 Welcome to my portfolio!
    
    Built with vanilla HTML, CSS, and JavaScript
    Featuring modern design and smooth animations
    
    Feel free to explore the code and get in touch!
    
    ---
    Portfolio by Soumyadip Saha
    📧 sahasoumyadip1802@gmail.com
`);