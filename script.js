// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.getAttribute('data-filter');
        let visibleIndex = 0;
        portfolioItems.forEach(item => {
            const matches = filterValue === 'all' || item.getAttribute('data-category') === filterValue;
            if (matches) {
                item.style.display = 'block';
                item.style.animation = 'none';
                // reflow to restart animation
                void item.offsetWidth;
                item.style.animation = `fadeInUp 0.45s ease forwards`;
                item.style.animationDelay = `${visibleIndex * 60}ms`;
                visibleIndex += 1;
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// FAQ Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show success message (in a real application, you would send this to a server)
        showNotification('Thank you for your message! We will get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .service-item, .portfolio-item, .case-study, .testimonial, .team-member, .value-card, .step, .pricing-card, .award-item, .stat-item, .footer-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        observer.observe(el);
    });

    function applyStagger(containerSelector, itemSelector, baseDelay = 0, step = 80) {
        const container = document.querySelector(containerSelector);
        if (!container) return;
        const items = container.querySelectorAll(itemSelector);
        items.forEach((item, index) => {
            item.style.transitionDelay = `${baseDelay + index * step}ms`;
        });
    }

    applyStagger('.features-grid', '.feature-card');
    applyStagger('.services-grid', '.service-card, .service-item');
    applyStagger('.portfolio-grid', '.portfolio-item');
    applyStagger('.case-studies-grid', '.case-study');
    applyStagger('.testimonials-grid', '.testimonial');
    applyStagger('.values-grid', '.value-card');
    applyStagger('.team-grid', '.team-member');
    applyStagger('.process-steps', '.step');
    applyStagger('.pricing-grid', '.pricing-card');
    applyStagger('.awards-grid', '.award-item');
    applyStagger('.stats-grid', '.stat-item');
    applyStagger('.footer-content', '.footer-section', 150);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const target = parseInt(statNumber.textContent.replace(/\D/g, ''));
                animateCounter(statNumber, target);
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#e74c3c';
            input.placeholder = 'This field is required';
        } else {
            input.style.borderColor = '#3498db';
        }
    });
    
    // Email validation
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            isValid = false;
            emailInput.style.borderColor = '#e74c3c';
            showNotification('Please enter a valid email address', 'error');
        }
    }
    
    return isValid;
}

// Enhanced form submission with validation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm(this)) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                showNotification('Thank you for your message! We will get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            showNotification('Please fill in all required fields correctly.', 'error');
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.1;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Cursor motion parallax for About story image
const storyImg = document.querySelector('.story-banner-img');
if (storyImg) {
    const parent = storyImg.closest('.story-graphic');
    parent.style.perspective = '800px';
    parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        storyImg.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.03)`;
        storyImg.style.transition = 'transform 0.12s ease';
    });
    parent.addEventListener('mouseleave', () => {
        storyImg.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
}

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 1.2rem;
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
        backToTopBtn.classList.add('is-visible');
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
        backToTopBtn.classList.remove('is-visible');
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = '#2980b9';
    backToTopBtn.style.transform = 'translateY(-3px) scale(1.05)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = '#3498db';
    backToTopBtn.style.transform = 'translateY(0) scale(1)';
});

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Navigate FAQ with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeFaq = document.querySelector('.faq-item.active');
        if (activeFaq) {
            const allFaqs = Array.from(faqItems);
            const currentIndex = allFaqs.indexOf(activeFaq);
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = currentIndex + 1;
                if (nextIndex >= allFaqs.length) nextIndex = 0;
            } else {
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) nextIndex = allFaqs.length - 1;
            }
            
            allFaqs.forEach(item => item.classList.remove('active'));
            allFaqs[nextIndex].classList.add('active');
        }
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Clients carousel: ensure seamless marquee by duplicating track content once
(function() {
	const track = document.querySelector('.clients-track');
	if (!track) return;
	const items = track.querySelectorAll('.client-logo-item');
	if (items.length >= 20) return; // already duplicated in markup
	if (!track.dataset.duplicated) {
		items.forEach((node, idx) => {
			if (idx < 10) {
				track.appendChild(node.cloneNode(true));
			}
		});
		track.dataset.duplicated = 'true';
	}
})();

// Clients logo image extension fallback (.png -> .jpg/.jpeg/.webp/.svg)
(function() {
	const imgs = document.querySelectorAll('.client-logo-img');
	if (!imgs.length) return;
	const defaultExts = ['png','jpg','jpeg','webp','svg'];
	imgs.forEach(img => {
		const original = img.getAttribute('src');
		if (!original) return;
		const match = original.match(/^(.*)\.([a-zA-Z0-9]+)$/);
		if (!match) return;
		const base = match[1];
		const initial = match[2].toLowerCase();
		const exts = (img.dataset.exts ? img.dataset.exts.split(',') : defaultExts).map(e => e.trim().toLowerCase());
		let startIdx = exts.indexOf(initial);
		if (startIdx === -1) startIdx = 0;
		let candIdx = (startIdx + 1) % exts.length;
		function tryNext() {
			if (candIdx === startIdx) return; // tried all
			const nextExt = exts[candIdx];
			candIdx = (candIdx + 1) % exts.length;
			img.src = `${base}.${nextExt}`;
		}
		img.addEventListener('error', tryNext);
	});
})();

console.log('Fulrani website loaded successfully! 🚀');
