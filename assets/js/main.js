// ============================================
// Dark Mode Toggle
// ============================================

(function() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Default to dark mode if no preference saved
    if (!savedTheme) {
        document.documentElement.classList.remove('light-mode');
    } else if (savedTheme === 'light') {
        document.documentElement.classList.add('light-mode');
    }
    
    // Initialize theme toggle button
    function initThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        // Set initial icon
        updateThemeIcon();
        
        themeToggle.addEventListener('click', function() {
            const isLight = document.documentElement.classList.toggle('light-mode');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            updateThemeIcon();
        });
    }
    
    function updateThemeIcon() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;
        
        const isLight = document.documentElement.classList.contains('light-mode');
        const icon = themeToggle.querySelector('svg');
        
        if (icon) {
            if (isLight) {
                // Show moon icon (switch to dark)
                icon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
            } else {
                // Show sun icon (switch to light)
                icon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            }
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThemeToggle);
    } else {
        initThemeToggle();
    }
})();

// ============================================
// Smooth Scroll
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for sticky navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Navbar Scroll Effect
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    }
});

// ============================================
// Fade-in Animation on Scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.project-card, .experience-item, .skill-category, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ============================================
// Active Section Highlighting
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    
    function updateActiveSection() {
        const scrollPosition = window.scrollY + 150; // Offset for navbar
        
        // If at top, remove all active states
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove('active'));
            return;
        }
        
        // Find the current section
        let currentSection = '';
        let lastSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop) {
                lastSection = sectionId;
            }
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = sectionId;
            }
        });
        
        // If we're past all sections but still scrolling, highlight the last one
        if (!currentSection && lastSection) {
            currentSection = lastSection;
        }
        
        // Special handling for contact section - if near bottom of page, highlight contact
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const scrollBottom = window.scrollY + windowHeight;
        
        if (scrollBottom >= documentHeight - 50) {
            currentSection = 'contact';
        }
        
        // Update active state
        navLinks.forEach(link => {
            const section = link.getAttribute('data-section');
            if (section === currentSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', debounce(updateActiveSection, 10));
    updateActiveSection(); // Initial check
});

// ============================================
// Back to Top Button
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
    const heroSection = document.getElementById('top');
    
    if (!backToTopButton || !heroSection) return;
    
    function toggleBackToTop() {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (window.scrollY > heroBottom) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', debounce(toggleBackToTop, 10));
    toggleBackToTop(); // Initial check
});

// ============================================
// Resume Toggle
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const toggleResumeBtn = document.getElementById('toggleResume');
    const resumeContent = document.getElementById('resume-content');
    
    if (!toggleResumeBtn || !resumeContent) return;

    toggleResumeBtn.addEventListener('click', function() {
        const isVisible = resumeContent.style.display !== 'none';
        
        if (isVisible) {
            resumeContent.style.display = 'none';
            toggleResumeBtn.textContent = 'View Resume';
        } else {
            resumeContent.style.display = 'block';
            toggleResumeBtn.textContent = 'Hide Resume';
            
            // Scroll to resume content smoothly
            setTimeout(() => {
                resumeContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        }
    });
});

// ============================================
// Mobile Prank Popup (Temporary)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('pranavPopup');
    if (!popup) return;

    // Only show on mobile widths
    if (window.innerWidth > 768) {
        return;
    }

    const closeBtn = popup.querySelector('.prank-close');

    function hidePopup() {
        popup.style.display = 'none';
        popup.setAttribute('aria-hidden', 'true');
    }

    // Show on load
    popup.style.display = 'flex';
    popup.setAttribute('aria-hidden', 'false');

    popup.addEventListener('click', hidePopup);
    if (closeBtn) {
        closeBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            hidePopup();
        });
    }
});

// ============================================
// Form Validation (for contact page if needed)
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ============================================
// Utility: Debounce function
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Performance: Lazy load images (if needed)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    });
}

