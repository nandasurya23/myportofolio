// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Show splash screen first
    showSplashScreen();
    
    // Then initialize everything else after splash
    setTimeout(() => {
        initTheme();
        initMobileMenu();
        initParticles();
        initScrollAnimations();
        initSkillBars();
        initContactForm();
        initBackToTop();
        initSmoothScroll();
        initLazyLoading();
        initHoverEffects();
        initScrollProgress();
        initCVDownload();
        
        // Hide splash screen after everything is loaded
        hideSplashScreen();
        
        // Ensure modal is hidden on initial load
        ensureModalHidden();
    }, 1500); // 1.5 second splash screen
});

// ===== SPLASH SCREEN FUNCTIONS =====
function showSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.classList.remove('hidden');
        splashScreen.style.display = 'flex';
    }
}

function hideSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        splashScreen.classList.add('fade-out');
        
        // Remove from DOM after animation
        setTimeout(() => {
            splashScreen.style.display = 'none';
            document.body.classList.add('loaded');
            
            // Enable scroll after splash screen
            document.body.style.overflow = 'auto';
        }, 500);
    }
}

// ===== MODAL FIX =====
function ensureModalHidden() {
    const modal = document.getElementById('project-modal');
    if (modal && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// ===== THEME MANAGEMENT =====
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    // Set initial theme - prioritize saved theme
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    } else if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
    
    // Theme toggle function
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        if (isDark) {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        
        // Update icons
        updateThemeIcons();
    };
    
    // Update theme icons
    const updateThemeIcons = () => {
        const isDark = document.documentElement.classList.contains('dark');
        
        // Set single icon for desktop theme toggle
        if (themeIcon) {
            themeIcon.innerHTML = isDark ? 
                '<i class="fas fa-sun"></i>' : 
                '<i class="fas fa-moon"></i>';
        }
        
        // Set single icon for mobile theme toggle
        if (mobileThemeIcon) {
            mobileThemeIcon.innerHTML = isDark ? 
                '<i class="fas fa-sun mr-2"></i>' : 
                '<i class="fas fa-moon mr-2"></i>';
        }
    };
    
    // Set initial icons
    updateThemeIcons();
    
    // Event listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            toggleTheme();
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) mobileMenu.classList.add('hidden');
            const menuBtn = document.getElementById('mobile-menu-btn');
            if (menuBtn) menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.documentElement.classList.remove('light');
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
            }
            updateThemeIcons();
        }
    });
}

// ===== CV DOWNLOAD HANDLER =====
function initCVDownload() {
    const cvDownloadBtn = document.querySelector('a[href="cv.pdf"]');
    const cvPreviewBtn = document.querySelector('a[href*="drive.google.com"]');
    
    if (cvDownloadBtn) {
        cvDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Simulate download
            const link = document.createElement('a');
            link.href = 'cv.pdf';
            link.download = 'Nanda_Surya_CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show download notification
            showNotification('CV download started!', 'success');
        });
    }
    
    if (cvPreviewBtn) {
        cvPreviewBtn.addEventListener('click', (e) => {
            // Analytics tracking could be added here
            console.log('Opening CV preview');
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-4 z-[1000] px-6 py-4 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    // Position it off-screen initially
    notification.style.transform = 'translateX(100%)';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;
    
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
        
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars';
        } else {
            icon.className = 'fas fa-times';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && menuBtn && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
            if (menuBtn.querySelector('i')) {
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
    
    // Close menu when clicking links
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if (menuBtn.querySelector('i')) {
                    menuBtn.querySelector('i').className = 'fas fa-bars';
                }
            });
        });
    }
}

// ===== PARTICLES BACKGROUND =====
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    
    // Clear existing particles
    container.innerHTML = '';
    
    const isDark = document.documentElement.classList.contains('dark');
    const particleCount = window.innerWidth < 768 ? 8 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full animate-float';
        
        // Random properties
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;
        const opacity = Math.random() * 0.2 + 0.1;
        
        // Color based on theme
        let color;
        if (isDark) {
            const colors = [
                'rgba(0, 102, 255, VAR_OPACITY)',
                'rgba(139, 92, 246, VAR_OPACITY)',
                'rgba(236, 72, 153, VAR_OPACITY)'
            ];
            color = colors[Math.floor(Math.random() * colors.length)].replace('VAR_OPACITY', opacity);
        } else {
            const colors = [
                'rgba(37, 99, 235, VAR_OPACITY)',
                'rgba(124, 58, 237, VAR_OPACITY)',
                'rgba(219, 39, 119, VAR_OPACITY)'
            ];
            color = colors[Math.floor(Math.random() * colors.length)].replace('VAR_OPACITY', opacity);
        }
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${left}%;
            top: ${top}%;
            background: ${color};
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
            filter: blur(1px);
            z-index: 0;
        `;
        
        container.appendChild(particle);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-item')) {
                    const percent = entry.target.dataset.percent;
                    const progressBar = entry.target.querySelector('.skill-progress');
                    if (progressBar) {
                        setTimeout(() => {
                            progressBar.style.width = `${percent}%`;
                        }, 300);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.animate-slide-up, .skill-item').forEach(el => {
        observer.observe(el);
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const percent = item.dataset.percent;
        const progressBar = item.querySelector('.skill-progress');
        
        if (progressBar) {
            // Set initial width to 0
            progressBar.style.width = '0%';
            
            // Animate on hover
            item.addEventListener('mouseenter', () => {
                progressBar.style.transition = 'width 0.5s ease';
                progressBar.style.width = `${percent}%`;
            });
            
            item.addEventListener('mouseleave', () => {
                progressBar.style.width = `${percent}%`;
            });
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success
        submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== LAZY LOADING =====
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// ===== HOVER EFFECTS =====
function initHoverEffects() {
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('button, .btn-primary-light, .btn-primary-dark, .btn-secondary-light, .btn-secondary-dark');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style ripple
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.remove();
                }
            }, 600);
        });
    });
}

// ===== SCROLL PROGRESS =====
function initScrollProgress() {
    // Remove existing progress bar if any
    const existingProgress = document.getElementById('scroll-progress');
    if (existingProgress) {
        existingProgress.remove();
    }
    
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        z-index: 1000;
        transition: width 0.3s ease;
        width: 0%;
    `;
    
    // Set color based on theme
    if (document.documentElement.classList.contains('dark')) {
        progressBar.style.background = 'linear-gradient(90deg, #0066ff, #8b5cf6)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #2563eb, #7c3aed)';
    }
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = `${scrolled}%`;
    });
}

// ===== DEBOUNCE UTILITY =====
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

// ===== THROTTLE UTILITY =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener('resize', debounce(() => {
    // Re-initialize particles on resize
    initParticles();
}, 250));

// ===== PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden
        console.log('Page is hidden');
    } else {
        // Page is visible
        console.log('Page is visible');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // You could send this to an error tracking service
});

// ===== PERFORMANCE MONITORING =====
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfEntries = performance.getEntriesByType('navigation');
            if (perfEntries.length > 0) {
                const navTiming = perfEntries[0];
                console.log('Page loaded in:', navTiming.loadEventEnd - navTiming.loadEventStart, 'ms');
            }
        }, 0);
    });
}