// Beijing Medical Concierge - Interactive Features (Updated for Session-Based Pricing)

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

// Time Slot Selector
function initTimeSlotSelector() {
    const timeSlotOptions = document.querySelectorAll('.time-slot-option');
    const timeSlotInput = document.getElementById('time-slot');
    
    if (!timeSlotOptions.length || !timeSlotInput) return;
    
    timeSlotOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected from all
            timeSlotOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected to clicked
            this.classList.add('selected');
            
            // Update hidden input
            timeSlotInput.value = this.dataset.value;
            
            // Update price calculation
            updatePriceCalculation();
        });
    });
}

// Price Calculation
function updatePriceCalculation() {
    const service = document.getElementById('service');
    const timeSlotInput = document.getElementById('time-slot');
    const urgentCheckbox = document.getElementById('urgent-service');
    
    if (!service || !timeSlotInput) return;
    
    const selectedOption = service.options[service.selectedIndex];
    const timeSlot = timeSlotInput.value;
    const isUrgent = urgentCheckbox ? urgentCheckbox.checked : false;
    
    // Base prices by service level (weekday rates)
    const basePrices = {
        'standard': 100,
        'professional': 180,
        'premium': 320,
        'consultation': 2.50
    };
    
    let basePrice = basePrices[service.value] || 0;
    
    // Time slot modifiers
    let timeSlotMultiplier = 1;
    if (timeSlot === 'evening') {
        timeSlotMultiplier = 1.4; // +40%
    }
    // Weekend would be +25% but we handle that separately
    
    // Calculate subtotal
    let subtotal = basePrice * timeSlotMultiplier;
    
    // Emergency service +50%
    if (isUrgent) {
        subtotal *= 1.5;
    }
    
    // Display estimated price (if price display element exists)
    const priceDisplay = document.getElementById('estimated-price-display');
    if (priceDisplay && subtotal > 0) {
        priceDisplay.textContent = `Estimated: $${subtotal.toFixed(2)}`;
        priceDisplay.style.display = 'block';
    }
    
    return subtotal;
}

// FAQ Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize time slot selector
    initTimeSlotSelector();
    
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
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuBtn.textContent = navLinksContainer.classList.contains('active') ? '✕' : '☰';
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
        // Add event listeners for price calculation
        const serviceSelect = document.getElementById('service');
        const timeSlotInput = document.getElementById('time-slot');
        const urgentCheckbox = document.getElementById('urgent-service');
        
        if (serviceSelect) {
            serviceSelect.addEventListener('change', updatePriceCalculation);
        }
        
        if (urgentCheckbox) {
            urgentCheckbox.addEventListener('change', updatePriceCalculation);
        }
        
        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const service = document.getElementById('service').value;
            const timeSlot = document.getElementById('time-slot').value;
            const message = document.getElementById('message').value.trim();
            const termsAgree = document.getElementById('terms-agree').checked;
            
            if (!name || !email || !service || !message) {
                e.preventDefault();
                alert('Please fill in all required fields.');
                return;
            }
            
            if (!timeSlot) {
                e.preventDefault();
                alert('Please select a preferred time slot.');
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
            
            // Get service label
            const serviceLabel = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            // Get time slot label
            const timeSlotElement = document.querySelector(`.time-slot-option[data-value="${timeSlot}"]`);
            const timeSlotLabel = timeSlotElement ? timeSlotElement.querySelector('.time-slot-name').textContent : timeSlot;
            
            // Add hidden fields for form submission
            let hiddenFields = document.createElement('input');
            hiddenFields.type = 'hidden';
            hiddenFields.name = 'service_label';
            hiddenFields.value = serviceLabel;
            contactForm.appendChild(hiddenFields);
            
            let timeSlotField = document.createElement('input');
            timeSlotField.type = 'hidden';
            timeSlotField.name = 'time_slot_label';
            timeSlotField.value = timeSlotLabel;
            contactForm.appendChild(timeSlotField);
            
            // Add premium options
            const premiumOptions = [];
            if (urgentCheckbox && urgentCheckbox.checked) {
                premiumOptions.push('Emergency Service (+50%)');
                let urgentField = document.createElement('input');
                urgentField.type = 'hidden';
                urgentField.name = 'urgent_service';
                urgentField.value = 'yes';
                contactForm.appendChild(urgentField);
            }
            
            if (premiumOptions.length > 0) {
                let premiumField = document.createElement('input');
                premiumField.type = 'hidden';
                premiumField.name = 'premium_options';
                premiumField.value = premiumOptions.join(', ');
                contactForm.appendChild(premiumField);
            }
            
            // Calculate estimated price
            const estimatedPrice = updatePriceCalculation();
            if (estimatedPrice > 0) {
                let priceField = document.createElement('input');
                priceField.type = 'hidden';
                priceField.name = 'estimated_price';
                priceField.value = `$${estimatedPrice.toFixed(2)}`;
                contactForm.appendChild(priceField);
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
    console.log('%cPricing: Session-based (4-hour blocks) - Updated 2026-03-25', 'font-size: 12px; color: #666;');
});

// Service Selection Helper
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
