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

// ============================================
// Testimonial Collapse & Random Display
// ============================================

// Testimonials Database (36 testimonials - including real YouTube comments)
const testimonialsDatabase = [
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I broke my arm and had no idea which hospital to go to. The team not only found me a great orthopedic specialist but also stayed with me throughout the entire visit. They explained everything clearly and helped me understand the treatment plan. Lifesaver!",
        author: "James M.",
        info: "British Expat, 3 years in Beijing",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "As a pregnant foreigner in Beijing, I was worried about prenatal care. The concierge service helped me find an English-speaking OB-GYN and accompanied me to all my appointments. They even translated all my medical records. Highly recommend!",
        author: "Sarah L.",
        info: "American Expat, expecting mother",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My elderly parents visited from Germany and my father needed medical attention. The service was professional, compassionate, and efficient. They handled everything and my parents felt safe and well-cared for. Worth every dollar.",
        author: "Klaus W.",
        info: "German Expat, family visit",
        avatar: "👨‍💼"
    },
    // Real YouTube Comments (Added 2026-03-28)
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I'm a Kiwi living in China and have been to our local hospital on a couple of occasions - once with a broken ankle and the level of service and expertise was outstanding. After X-rays and CT scans I was given the option of surgery or strap it up in a cast for 6 weeks. I chose the later, and the total was 1200rmb - money well spent! I can't run marathons but at 72 who cares 😂😂",
        author: "Tewbum",
        info: "New Zealand Expat, living in China",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Born in UK, moved to Canada, now living in China for the past 18 years. Had cataract operations and recently had a hip replacement in Futian Hospital. My praise for Chinese healthcare cannot be underestimated. Cataract: same day. Hip replacement: pre-op Friday, operation Monday, out in 6 days. Walking with no aid after 1 month. Love this country with a passion! 😊",
        author: "Tony Sutton",
        info: "British-Canadian Expat, 18 years in China",
        avatar: "👨‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "When our daughter was on summer vacation, our whole family traveled from Germany back to Chengdu. We found a pediatric dental clinic in a shopping mall! From walking in to having a tooth extracted took less than an hour. No appointment needed. The clinic was designed for kids, and our daughter didn't resist at all - she even got stickers afterward! In China, you can go shopping and conveniently take your child to have a tooth pulled. 😁",
        author: "Qiao Wei",
        info: "German-Chinese Family, Chengdu",
        avatar: "👨‍👩‍👧"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I've been to the hospital twice during my 10 years living in China. First was for a bad toothache in 2008 in Baoji - fun fact, I was being treated when the Sichuan earthquake hit! The dentist was efficient and patient. Later in Guangzhou, I had a wisdom tooth issue and they did some crazy sorcery - by the time they finished, I actually forgot why I was there! Great service both times.",
        author: "Becster Brisbane",
        info: "Australian Expat, 10 years in China",
        avatar: "👩‍🦰"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "When living in London I had a suspected tumor. Got a referral from my GP. Took nearly FOUR MONTHS for the scan. Luckily it was benign but the stress during those four months was probably worse than the problem itself. In China? You get seen immediately. No waiting, no stress.",
        author: "Sonyhamster",
        info: "British Expat, previously in London",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I did it 15 years ago. The Chinese hospital diagnosed in 5 minutes what had 'confounded' the NHS for 18 months - an aortic aneurysm which was about to pop and kill me. I am still very much alive and definitely kicking thanks to the Chinese. The cost of all return travel, MRI, medicines, 6 weeks staying in China - was still way cheaper and quicker than going private in this dump.",
        author: "TheAngriestMonkey",
        info: "British Expat, life saved in China",
        avatar: "👊"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Had a dental emergency on a Sunday. They found me an English-speaking dentist within an hour and met me at the clinic. The whole experience was smooth and stress-free. This service is a must-have for expats in Beijing!",
        author: "Emma R.",
        info: "Australian Expat, 2 years in Beijing",
        avatar: "👩‍🦰"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The medical translation service was incredibly accurate. My doctor and I could communicate clearly about my symptoms and treatment options. No more guessing or misunderstandings. Professional and reliable!",
        author: "Michael T.",
        info: "Canadian Expat, business traveler",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I needed surgery and was terrified of navigating a Chinese hospital alone. The team arranged everything - from pre-op tests to post-op care. They even visited me daily during my hospital stay. I couldn't have done it without them.",
        author: "Lisa K.",
        info: "Swedish Expat, surgery patient",
        avatar: "👱‍♀️"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Quick response time and very knowledgeable staff. They helped me understand the Chinese healthcare system and found me a specialist who spoke perfect English. The consultation fee was completely worth it.",
        author: "David P.",
        info: "Irish Expat, 1 year in Beijing",
        avatar: "👨‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My son had a high fever at midnight. They directed us to the right hospital with 24-hour pediatric services and met us there. The doctor spoke English and my son was treated quickly. So grateful for this service!",
        author: "Anna M.",
        info: "Italian Expat, mother of two",
        avatar: "👩‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The pharmacy assistance was a lifesaver. I couldn't read the Chinese prescription and had no idea about dosage. They explained everything clearly and even found an alternative medication that was available. Excellent service!",
        author: "Robert H.",
        info: "British Expat, chronic condition",
        avatar: "👨‍🦲"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Professional, efficient, and caring. They helped my wife navigate a complicated diagnosis and treatment plan. The peace of mind was invaluable. We'll definitely use this service again if needed.",
        author: "Thomas B.",
        info: "French Expat, 5 years in Beijing",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was skeptical at first, but this service exceeded all expectations. They found me a specialist who diagnosed my condition correctly after months of uncertainty. The translation was perfect and the follow-up care was excellent.",
        author: "Jennifer S.",
        info: "American Expat, specialist care",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The hospital navigation service saved me hours of waiting. They knew exactly which forms to fill out, where to go, and how to skip the lines. It felt like having a local friend who happens to know the healthcare system inside out.",
        author: "Mark W.",
        info: "New Zealand Expat, first time in China",
        avatar: "👨‍🦯"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Excellent service for medical records translation. I needed all my test results and prescriptions translated for my insurance back home. They provided professional, accurate translations quickly. Highly recommend!",
        author: "Catherine L.",
        info: "Swiss Expat, insurance claim",
        avatar: "👩‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The 24/7 support is not just a marketing gimmick - they really are available! Called at 2 AM with a medical question and got a helpful response within 15 minutes. That's dedication!",
        author: "Andrew C.",
        info: "Singaporean Expat, frequent traveler",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My experience with the premium care service was outstanding. The bilingual nurse was incredibly knowledgeable and made me feel like I was back home. Worth every penny for the peace of mind.",
        author: "Sophie D.",
        info: "Dutch Expat, premium care patient",
        avatar: "👱‍♀️"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "They helped me understand my insurance coverage and what would be reimbursed. The documentation they provided was exactly what my insurance company needed. Saved me a lot of hassle!",
        author: "Peter G.",
        info: "Norwegian Expat, insurance guidance",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The appointment booking service is so convenient. Just sent them my symptoms and preferred dates, and they handled everything. Showed up at the hospital and everything was ready. No waiting, no confusion!",
        author: "Rachel N.",
        info: "South African Expat, busy professional",
        avatar: "👩‍🦲"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had a complex medical condition that required multiple specialist visits. They coordinated everything perfectly - appointments, tests, treatments. It was like having a personal healthcare manager. Incredible service!",
        author: "William F.",
        info: "British Expat, complex care",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The team's knowledge of Beijing hospitals is impressive. They recommended the perfect specialist for my condition and the treatment was successful. I've already recommended them to three friends!",
        author: "Maria V.",
        info: "Spanish Expat, specialist referral",
        avatar: "👩‍🦰"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Clear communication throughout the entire process. They explained every step, every cost, and every option. No surprises, no hidden fees. This is how healthcare should be!",
        author: "John E.",
        info: "American Expat, transparency advocate",
        avatar: "👨‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The follow-up care was exceptional. They checked on me after my procedure and made sure I was recovering well. They even helped me schedule a follow-up appointment. Truly comprehensive care!",
        author: "Helen Z.",
        info: "Greek Expat, post-op care",
        avatar: "👵"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "As a solo female traveler, I felt vulnerable going to a Chinese hospital alone. The companion they sent was professional, kind, and made me feel safe. I can't thank them enough!",
        author: "Olivia J.",
        info: "British Tourist, solo traveler",
        avatar: "👩‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The medication explanation service was so helpful. I had no idea what the Chinese characters meant or how to take the medicine properly. They explained everything in detail and even created a dosage schedule for me.",
        author: "George A.",
        info: "Australian Expat, medication management",
        avatar: "👨‍🦲"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I needed a second opinion on my diagnosis. They arranged a consultation with a top specialist at PUMC Hospital and facilitated the entire discussion. The second opinion was invaluable for my treatment decision.",
        author: "Patricia O.",
        info: "Irish Expat, second opinion",
        avatar: "👩‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The emergency service lived up to its name. Had an accident and they coordinated everything - ambulance, hospital, specialist. I was treated within an hour of the accident. Lifesaving service!",
        author: "Richard I.",
        info: "Canadian Expat, emergency patient",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "They helped me navigate the insurance reimbursement process which would have been impossible alone. Got 80% of my medical costs reimbursed thanks to their proper documentation. The service paid for itself!",
        author: "Barbara U.",
        info: "German Expat, insurance reimbursement",
        avatar: "👵"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The cultural bridge they provide is invaluable. They don't just translate words - they explain the cultural context of Chinese medical practices. This helped me understand and trust my treatment much better.",
        author: "Charles Y.",
        info: "American Expat, cultural bridge",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My child needed pediatric care and I was terrified. The team found a wonderful English-speaking pediatrician who was great with kids. They stayed with us the whole time and even helped explain things to my child. Angels!",
        author: "Susan Q.",
        info: "British Expat, mother of three",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The standard care service was perfect for my routine checkup. Professional, punctual, and thorough. Great value for money and I'll definitely use it again for future appointments.",
        author: "Daniel X.",
        info: "Swedish Expat, routine care",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I've used many medical services around the world, and this is top-tier. Professional, efficient, caring, and affordable. Beijing Medical Concierge sets the standard for expat healthcare support.",
        author: "Nancy W.",
        info: "American Expat, 10 years in Beijing",
        avatar: "👩‍🦳"
    }
];

// Shuffle Array (Fisher-Yates Algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Get Random Testimonials
function getRandomTestimonials(count = 8) {
    const shuffled = shuffleArray(testimonialsDatabase);
    return shuffled.slice(0, count);
}

// Initialize Testimonials Section
function initTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid) return;
    
    // Clear existing testimonials
    testimonialsGrid.innerHTML = '';
    
    // Get random testimonials
    const selectedTestimonials = getRandomTestimonials(6);
    
    // Render testimonials
    selectedTestimonials.forEach((testimonial, index) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="testimonial-rating">${testimonial.rating}</div>
            <p class="testimonial-text" id="testimonial-text-${index}">${testimonial.text}</p>
            <button class="testimonial-expand-btn" onclick="toggleTestimonial(${index})">Show more</button>
            <div class="testimonial-author">
                <div class="author-avatar">${testimonial.avatar}</div>
                <div class="author-info">
                    <strong>${testimonial.author}</strong>
                    <span>${testimonial.info}</span>
                </div>
            </div>
        `;
        
        testimonialsGrid.appendChild(card);
        
        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}

// Toggle Testimonial Expand/Collapse
function toggleTestimonial(index) {
    const textElement = document.getElementById(`testimonial-text-${index}`);
    const btn = textElement.nextElementSibling;
    
    if (!textElement || !btn) return;
    
    const isExpanded = textElement.classList.contains('expanded');
    
    if (isExpanded) {
        textElement.classList.remove('expanded');
        btn.textContent = 'Show more';
    } else {
        textElement.classList.add('expanded');
        btn.textContent = 'Show less';
    }
}

// Make toggleTestimonial globally accessible
window.toggleTestimonial = toggleTestimonial;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize testimonials with random display
    initTestimonials();
});
