// Beijing Medical Concierge - Interactive Features

// Scroll Animation Observer
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in, .service-card, .pricing-card, .testimonial-card, .faq-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize scroll animations
    initScrollAnimations();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });
    
    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Form Validation & Price Calculator
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Price calculation function
        function calculateEstimatedPrice() {
            const service = document.getElementById('service').value;
            const tier = document.getElementById('service-tier').value;
            const urgent = document.getElementById('urgent-service').checked;
            const night = document.getElementById('night-service').checked;
            const weekend = document.getElementById('weekend-service').checked;
            
            // Base prices per hour
            let basePrice = 0;
            switch(service) {
                case 'consultation': basePrice = 2.50; break;
                case 'half-day': basePrice = 27.50; break;
                case 'full-day': basePrice = 25; break;
                case 'translation': basePrice = 55; break;
                default: basePrice = 0;
            }
            
            // Service tier add-ons
            let tierAddOn = 0;
            switch(tier) {
                case 'professional': tierAddOn = 20; break;
                case 'premium': tierAddOn = 40; break;
            }
            
            // Calculate subtotal
            let subtotal = basePrice + tierAddOn;
            
            // Apply premium options (multipliers)
            let multiplier = 1;
            if (urgent) multiplier += 1.0; // +100%
            if (night) multiplier += 0.5; // +50%
            if (weekend) multiplier += 0.3; // +30%
            
            let total = subtotal * multiplier;
            
            return total.toFixed(2);
        }
        
        // Update price display (if price calculator element exists)
        function updatePriceDisplay() {
            const priceDisplay = document.getElementById('estimated-price');
            if (priceDisplay) {
                const price = calculateEstimatedPrice();
                if (price > 0) {
                    priceDisplay.textContent = `$${price}`;
                    priceDisplay.parentElement.style.display = 'block';
                } else {
                    priceDisplay.parentElement.style.display = 'none';
                }
            }
        }
        
        // Add event listeners for price calculation
        const serviceSelect = document.getElementById('service');
        const tierSelect = document.getElementById('service-tier');
        const urgentCheckbox = document.getElementById('urgent-service');
        const nightCheckbox = document.getElementById('night-service');
        const weekendCheckbox = document.getElementById('weekend-service');
        
        [serviceSelect, tierSelect, urgentCheckbox, nightCheckbox, weekendCheckbox].forEach(el => {
            if (el) {
                el.addEventListener('change', updatePriceDisplay);
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const serviceTier = document.getElementById('service-tier').value;
            const message = document.getElementById('message').value.trim();
            const termsAgree = document.getElementById('terms-agree').checked;
            
            if (!name || !email || !service || !serviceTier || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!termsAgree) {
                e.preventDefault();
                alert('You must agree to the Terms of Service, Refund Policy, and Privacy Policy to continue.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return;
            }
            
            // Collect premium options
            const premiumOptions = [];
            if (document.getElementById('urgent-service').checked) premiumOptions.push('Urgent Service (+100%)');
            if (document.getElementById('night-service').checked) premiumOptions.push('Night Service (+50%)');
            if (document.getElementById('weekend-service').checked) premiumOptions.push('Weekend/Holiday (+30%)');
            
            // Add hidden fields for form submission
            let hiddenFields = document.createElement('input');
            hiddenFields.type = 'hidden';
            hiddenFields.name = 'service_tier_label';
            hiddenFields.value = document.getElementById('service-tier').options[document.getElementById('service-tier').selectedIndex].text;
            contactForm.appendChild(hiddenFields);
            
            if (premiumOptions.length > 0) {
                let premiumField = document.createElement('input');
                premiumField.type = 'hidden';
                premiumField.name = 'premium_options';
                premiumField.value = premiumOptions.join(', ');
                contactForm.appendChild(premiumField);
            }
            
            // Show success message (will be replaced by Formspree redirect)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }
    
    // Animate Elements on Scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .hospital-card, .pricing-card, .testimonial-card, .process-step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const animatedElements = document.querySelectorAll('.service-card, .hospital-card, .pricing-card, .testimonial-card, .process-step');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Check on load
    
    // Pricing Card Highlight on Hover
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => {
                if (c !== card && !c.classList.contains('featured')) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // Service Card Click (Optional - for future expansion)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            // Could open detailed modal or navigate to contact with pre-selected service
            console.log('Service selected:', this.querySelector('h3').textContent);
        });
    });
    
    // Add current year to footer
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = `© ${currentYear} Beijing Medical Concierge. All rights reserved.`;
    }
    
    // Console welcome message
    console.log('%c🏥 Beijing Medical Concierge', 'font-size: 20px; font-weight: bold; color: #667eea;');
    console.log('%cProfessional Healthcare Assistance for Expats in Beijing', 'font-size: 12px; color: #666;');
    console.log('%cContact: baroqueliu6@gmail.com', 'font-size: 12px; color: #666;');
});

// Service Selection Helper (for future use)
function selectService(serviceType) {
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.value = serviceType;
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
}

// Emergency Contact Helper
function emergencyContact() {
    alert('For medical emergencies, please call 120 (China emergency medical number) immediately.\n\nAfter calling, contact us at baroqueliu6@gmail.com and we will meet you at the hospital to assist.');
}
