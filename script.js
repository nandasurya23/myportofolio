// Mobile Navigation
const mobileNav = document.getElementById("mobileNav");
const openMobileNav = document.getElementById("openMobileNav");
const closeMobileNav = document.getElementById("closeMobileNav");

function openMobileMenu() {
    mobileNav.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeMobileMenu() {
    mobileNav.classList.remove("open");
    document.body.style.overflow = "auto";
}

openMobileNav.addEventListener("click", openMobileMenu);
closeMobileNav.addEventListener("click", closeMobileMenu);

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

// Generate floating particles - Responsive
function createParticles() {
    const particlesContainer = document.getElementById("particles");
    const particleCount = window.innerWidth < 640 ? 8 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        // Random properties
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        // Random color
        const colors = [
            "rgba(59, 130, 246, 0.3)",
            "rgba(139, 92, 246, 0.3)",
            "rgba(236, 72, 153, 0.3)",
        ];
        particle.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }
}

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        backToTop.style.opacity = "1";
        backToTop.style.transform = "translateY(0)";
    } else {
        backToTop.style.opacity = "0";
        backToTop.style.transform = "translateY(20px)";
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form submission
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Add success animation
    const button = form.querySelector("button");
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    button.classList.remove("shimmer-btn");
    button.classList.add("bg-green-500", "hover:bg-green-600");

    setTimeout(() => {
        button.innerHTML = originalText;
        button.classList.add("shimmer-btn");
        button.classList.remove("bg-green-500", "hover:bg-green-600");
        form.reset();
    }, 2000);
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add animation class based on existing class
            if (entry.target.classList.contains("card-entrance")) {
                const delay = entry.target.style.animationDelay || "0s";
                entry.target.style.animation = `cardEntrance 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${delay} forwards`;
            } else if (entry.target.classList.contains("section-entrance")) {
                entry.target.style.animation =
                    "sectionEntrance 1s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            }

            // Animate progress bars
            if (entry.target.classList.contains("skill-bubble")) {
                const progressBars =
                    entry.target.querySelectorAll(".progress-bar");
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.width =
                            bar.style.getPropertyValue("--progress-width");
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document
    .querySelectorAll(".card-entrance, .section-entrance")
    .forEach((el) => {
        observer.observe(el);
    });

// Touch-friendly hover effects for mobile
function setupTouchInteractions() {
    const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) {
        // Add active states for touch devices
        document.querySelectorAll(".touch-button").forEach((button) => {
            button.addEventListener("touchstart", function () {
                this.style.transform = "scale(0.95)";
            });

            button.addEventListener("touchend", function () {
                this.style.transform = "";
            });
        });

        // Disable hover animations on touch devices
        document.querySelectorAll(".skill-bubble").forEach((bubble) => {
            bubble.classList.remove("skill-bubble");
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: "smooth",
            });
        }
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recreate particles on resize
        document.getElementById("particles").innerHTML = "";
        createParticles();
    }, 250);
});

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    setupTouchInteractions();

    // Add typing animation to hero text
    const typewriter = document.querySelector(".typewriter");
    if (typewriter && window.innerWidth > 640) {
        setTimeout(() => {
            typewriter.style.borderRight = "none";
        }, 3500);
    } else if (typewriter) {
        typewriter.style.borderRight = "none";
    }

    // Animate page load elements with delay
    document.querySelectorAll(".page-load").forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });

    // Download CV button
    const downloadBtn = document.querySelector(".download-btn");

    if (downloadBtn) {
        downloadBtn.addEventListener("click", (e) => {
            e.preventDefault();  
            alert("CV download will start now.");
            window.location.href = downloadBtn.getAttribute("href");
        });
    }
});