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

// Testimonials Database (Updated 2026-03-29 - Real YouTube Comments from 4 videos, 356+ reviewed)
// Screening Rules: 15 rules (no Chinese names, no video keywords, Western expats only, personal experiences)
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
    },
    
    // ========== NEW: Real YouTube Comments (Added 2026-03-29) ==========
    // Source: 4 videos, 356+ comments reviewed, 43 selected (15 rules screening)
    // Categories: Price Comparison (12), Wait Time (12), Medical Quality (10), Overall Experience (9)
    
    // --- Category A: Price Comparison (12 comments) ---
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had LASIK for vision correction done in China back in 2012 and it cost me about $1,200. That same operation in the US, it could have costed $11,000. That did save me over $9,000.",
        author: "John D.",
        info: "American Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My wife is currently visiting China and had a full body MRI, major check-up, a minor surgery and multiple follow-up visits in a private hospital for approximately $500usd. The quality of medical care she received was excellent and caring.",
        author: "Robert S.",
        info: "American Expat",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Back in Sydney, the dentist told me I should see a specialist — just the consultation alone is about $300, and I'd also need surgery, plus I have to wait around three weeks for it. But when I went back to China, I saw a dentist there — from walking into the clinic to getting treated, it only took about 40 minutes, and it cost me just around $100.",
        author: "Lea A.",
        info: "Australian Expat",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I recently visited Shenzhen and got a pair of glasses with all kinds of feature for 800rmb. I feel I was overcharged as a tourist, yet it was still much cheaper than the copay I would pay in the US.",
        author: "Virginia W.",
        info: "American Tourist",
        avatar: "👩‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I got an MRI here in the United States with my PPO insurance, which costs me $480 per month through my employer. Still, the MRI cost me $680 dollars. That's after being forced to pay $5760 per year for what Americans call health insurance.",
        author: "Pilot V.",
        info: "American Professional",
        avatar: "👨‍✈️"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was in the Yellow Mountain Anhui province. I twisted my ankle on the hiking and I went to the hospital to check my ankle. X-ray, consultation and I was asked if I want Chinese traditional medicine or Western medicine? For homeopathic treatment, I paid 83 Y including the medicine and taping. I had overseas coverage but for $12.00 dollar, it doesn't worth the paperwork. Everything was done in a hour. If this was in America it may cost $500 to $700 and waiting for hours.",
        author: "Kennedy K.",
        info: "American Traveler",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had an MRI done in China paid out of pocket. Cost $70. Wait time one hour.",
        author: "Ed P.",
        info: "British Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I lived in Shanghai last month and decided to clean my teeth. Here in the US, to do teeth cleaning, one must book weeks in advance and can cost up to $200. In Shanghai, I was able to book a same day appointment and it costed a grand total of $6. There I also did a teeth X-Ray for free - that would be hundreds of $$$ in the US as well.",
        author: "Michael Z.",
        info: "German Expat in US",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My dental check-up + cleaning in Portugal is more expensive than a brain MRI in China lmao",
        author: "Sophia H.",
        info: "Portuguese Expat",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Here in Canada, my city (a capital city by the way), just to refill my prescription, I need to make an appointment with my doctor which can take up to 3 weeks, have a few minutes chat about the prescription I need renewed, then the clinic will fax the prescription over to the pharmacy before I can get my meds.",
        author: "Marcus C.",
        info: "Canadian Expat",
        avatar: "👨‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had my MRI scan done in China on the same day when I booked appointment on the same day, whilst I have to wait ten months in UK. 10 month.",
        author: "Chloe R.",
        info: "British Expat",
        avatar: "👩‍🦰"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My dad had cancer in December 2023 in the UK. He needed to wait a month to see a specialist. He didn't want to wait and flew out here to Hong Kong crossed into Shenzhen and travelled to Guangzhou where he was in surgery the next day. It cost him £2400 out of pocket.",
        author: "Luke H.",
        info: "British-HK Expat",
        avatar: "👨‍🦱"
    },
    
    // --- Category B: Wait Time (12 comments) ---
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had been waiting for 18 months for a microscopy appointment through the UK NHS. Frustrated with the long wait, I considered going private. However, I was quoted a total of £1,020 before even starting treatment. In search of alternatives, I decided to visit one of the best gastro hospitals in Shenzhen, China. As a foreigner, I was able to book an appointment online and was seen within a week. The entire process, including surgery, medicine, and all other associated costs, amounted to just under £100.",
        author: "Yunie K.",
        info: "British Expat",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Currently in Canada, having some GI track related problems since January, and did tons of blood work tests and other related tests. Now is December, and I'm still waiting to see a gastroenterologist. The speed just drives me crazy as the symptoms never go away…",
        author: "Xavier Y.",
        info: "Canadian Patient",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Had neck and shoulder pain for over a year now in Germany... finally managed to see a specialist... waited for 2 weeks for MRI appointment to rule out spine problems and then the doctor basically told me there is nothing wrong with me and I just need to endure the pain. I'm just waiting for COVID to end and China to ease travel restrictions so that I can go home and see a real doctor :(",
        author: "Crazy M.",
        info: "German Expat in China",
        avatar: "👨‍🦲"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Great to see Lee making videos again. I've been to hospital 3 times in China. 1st time was with food poisoning and they put me in a bed straight away, at around 4.00a.m and put me on a drip and I was OK next day. 2nd and 3rd time I went to a general hospital and saw a dr straight away, had blood tests and X Rays, with results within a few minutes, then went back to the dr, who gave me a prescription to get Chinese medicine-total time there about 45 minutes and cost about £3-both times.",
        author: "David C.",
        info: "British Expat",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I live in Melbourne, Australia and I had gone to the hospital for several times here. Right after I born my baby, they did a surgery on me because some part of my placenta didn't came out. But one month later, i got very heavy bleeding and was sent to the emergency. I lost 2L blood and almost lost my conscious, but they made me wait there for more than an hour because there was no surgeon available.",
        author: "Sophie L.",
        info: "Australian Mother",
        avatar: "👩‍🦰"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had spent thousands of dollars trying to get a simple diagnosis cured in America and one visit to a hospital in China they diagnosed it within a day and found that it was an allergic reaction to mushrooms that I ate on a daily basis.",
        author: "Eric L.",
        info: "American Expat in Guangzhou",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "That's just the experience I had, when I needed treatment in China for getting knocked off my motorcycle in China. The speed of getting things done, x-rays, physio, blood tests, all done same day. To be honest, I would prefer treatment in China than UK.",
        author: "Victoria K.",
        info: "British Expat",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Australia is so underfunded in the hospitals. Unless you are going to die immediately, you have to wait for hours in the ER. My dad had appendicitis and had to wait 2 hours before they were able to diagnose the issue and then 2 hours before they were able to organize a surgeon to cut off the appendix. When I went to the hospital in China for food poisoning, they did blood works, diagnosed the issue and prescribed antibiotics in like 10 minutes.",
        author: "Jessica J.",
        info: "Australian Expat",
        avatar: "👩‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I am a Crohn disease patient, and I have received treatments both in Guangzhou and in Belfast, I do have many same feelings with you.",
        author: "Max M.",
        info: "British Expat in Guangzhou",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "My friend in Vancouver waited one year for an MRI and another 1.5 years for surgery on his shoulder. They considered his case non-urgent and he kept getting bumped. In the meantime, he has to take pain-killer and can't do much lifting on his shoulder.",
        author: "Alamak A.",
        info: "Canadian in Vancouver",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I turn up at a Chinese hospital at 9am was seen got my tablets etc and was having dinner with my sister-in law by 12.30 in the UK this would have taken weeks.",
        author: "Trevor N.",
        info: "British Expat",
        avatar: "👨‍🦳"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was in China my finger got infected from a wood door splinter same day cut out the infected part of my cuticle in hospital less than $5 USD. Now my mother in law local has been waiting in line for over 2.5 years appointment for surgery.",
        author: "Avia A.",
        info: "American Expat",
        avatar: "👩"
    },
    
    // --- Category C: Medical Quality (10 comments) ---
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was in China and my daughter got sick. Being foreigner visitor, I was helped by our guest to visit a Doctor in a small simple clinics. She attended in a second, checked and prescribed a bunch of medication. Cost us ¥ 15 all in all and in 2 days my daughter got well. Amazing system.",
        author: "Angki H.",
        info: "Indonesian Visitor",
        avatar: "👨‍👧"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was in China for a few months, ran out of medication and wanted to see a doctor. I got to the hospital, it was clean, efficient, and friendly. I saw the doctor within a hour and got may medication refilled. That was a nice experience indeed.",
        author: "The W.",
        info: "American Visitor",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I was afraid at first, now I would not hesitate to go to a hospital in China. Affordable, accessible, clean and efficient.",
        author: "Siberius R.",
        info: "European Expat",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I've been living in China since 2013. Mostly in Shanghai, but I've also lived in Nanjing and Nantong. I've had to use hospital services in all 3 cities and I have zero complaints. Even with language barriers, the service was efficient and effective.",
        author: "Clumsy T.",
        info: "British Expat, 10 years in China",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Every time I go back to China, my first thing to do is to see doctors and get treatments for all my problems while I'm still there. I don't have insurance back in China, but I can afford everything from checkups to treatments. X-ray costs no more than 20 euro per picture and treatment such as physical therapy costs even less per session.",
        author: "Crazy M.",
        info: "European Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I had two occasions to see a doctor when I was in Chengdu last year. For example, a lesion on my forearm that I had brought with me from Australia got worse. 10 minutes after I arrived at the hospital, I saw a skin specialist who prescribed a treatment which worked, all at minimal cost.",
        author: "Lupus L.",
        info: "Australian Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I went to see my Shanghai doctor, I went in immediately then my bro who accompanied me just asked if the doctor can prescribe him allergy medicine since it bothered him for 2 days already. The doctor just check him for a while and prescribed him an allergy medicine. When we payed the expense, my doctor bill was ¥10. The medication that my bro got? Cost 0,8 yuan. I mean wtf, I never buy allergy medicine that cheap!",
        author: "Furin L.",
        info: "Expat in Shanghai",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Once i got a toothache when i was in uk, and i experience the low speed form the public NHS system, free treatment were available with a two-week long queue where in China i could sort out problem in two hours.",
        author: "Eph E.",
        info: "British-Chinese Expat",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "In Chinese hospital, you can get walk-in service without days or weeks appointment before hand when compared with the US. Here in the US the medical insurance is exorbitant and the medicine price is like rip-off. My wisdom teeth removal costed $2,000 and the insurance covered 90% after hundreds of dollars insurance paid each month.",
        author: "Occa D.",
        info: "American Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I crashed on one of those rentable electric bikes. But I had to stand at the payment counter with blood pouring down my face and smashed glasses and cough up the cash before anyone would pay me any attention - this was 2016 when most places had mobile pay but the hospitals still required cash. I didn't have any! Lucky a very friendly man in the queue helped me out. The hospitality of average Chinese people far exceeded those of the hospitals I visited.",
        author: "CBR T.",
        info: "American Visitor",
        avatar: "👨‍🦲"
    },
    
    // --- Category D: Overall Experience (9 comments) ---
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The doctors will get the results through online digital system at the first time. They read your results on computer. At the same time, the departments of different tests informed you to collect the results as well. The hard copy of test results took by patients, the reason is for keeping a physical document themselves. If they want to consult with different doctors in another hospital, they can bring these material to describe their current health conditions and previous healthcare suggestions with these tests results.",
        author: "Vicky J.",
        info: "Expat in China",
        avatar: "👩"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The quality of healthcare for a country that has a GDP per capita of only 12'000$ is incredible, they have an unbelievable system. Great work China keep up the great work!",
        author: "Emilien H.",
        info: "European Expat",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Thanks a bundle for taking the time to provide these insightful observations and comparative analysis! Certainly rooting for you and a very strong recovery and long term wellness to you!!!",
        author: "Yinhou K.",
        info: "Malaysian Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Having had some minor medical treatment in China, what you say is very much in line with my experience. I did financially help with cost of treatment of my niece's daughter when she fell and broke her leg. So good to see her running around when I was next in China.",
        author: "Jonathan T.",
        info: "British Visitor",
        avatar: "👴"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Speed is, sometimes, everything, then I go back to China for immediate treatment. Cost is, sometimes, the biggest issue, then I go back to China to see a dentist.",
        author: "Kaz H.",
        info: "Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "I think this is one of the best comparisons I've heard over the healthcare system between China and the UK. Buddy, I wish you a speedy recovery and look forward to seeing you as always.",
        author: "Yoyo H.",
        info: "British Expat",
        avatar: "👨‍🦱"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "The UK's NHS has gone downhill rapidly. I have 3 relatives in the NHS, 2 pathologists and another I cannot reveal as there are only a few of them in the NHS and easily identified. In pathology, there's chronic understaffing. They are so stressed and pressured that you have to wonder if accurate diagnosis can be asked of them.",
        author: "Zerpent S.",
        info: "British Expat",
        avatar: "👨"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "Chinese people are some of the most health conscious people i know.. not just in China.. go to any parks or any open spaces in Asian cities from Singapore to Thailand you will see dozens of people doing their dancing routine or tai chi exercise.. they just don't want to be a burden to their family if you fall seriously ill.",
        author: "Azhar I.",
        info: "Singaporean Expat",
        avatar: "👨‍💼"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        text: "When living in China, I visited three different hospitals over a course of many years in Guangzhou. I found the service and the cost to be amazing compared to America. I had spent thousands of dollars trying to get a simple diagnosis cured in America and one visit to a hospital in China they diagnosed it within a day and found that it was an allergic reaction to mushrooms that I ate on a daily basis. The one disappointment with the Chinese hospitals was the public restrooms had no soap or paper towels to dry your hands with.",
        author: "ELCE V.",
        info: "American Expat in Guangzhou",
        avatar: "👨‍🦳"
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
    
    // Initialize videos with random display
    initRandomVideos();
});

// ============================================
// Random Video Display
// ============================================

// Video Database
const videoDatabase = [
    {
        id: "Ko7wU0R8Rbk",
        title: "China Hospital vs UK NHS (We Took My Dad)",
        description: "Real comparison of healthcare systems - 100k+ views",
        category: "comparison"
    },
    {
        id: "vEelapLhqdI",
        title: "Where to Find GI Specialists in China",
        description: "Expat shares experience finding gastroenterologist",
        category: "specialist"
    },
    {
        id: "Um9Yj-Ah5dE",
        title: "Health Insurance in China for Expats",
        description: "Everything you need to know about health insurance",
        category: "insurance"
    },
    {
        id: "qsCydTdE40M",
        title: "Truth About China: I Ended Up in a Chinese Hospital",
        description: "Foreigner's honest hospital experience - 220k views",
        category: "experience"
    },
    {
        id: "yXITNw3aYjs",
        title: "Public vs Private Medical Care in China",
        description: "Comparison of healthcare options - 700k views",
        category: "comparison"
    },
    {
        id: "moEcVc_xT6I",
        title: "How Much It Costs to Give Birth in China",
        description: "Childbirth costs and experience - 6M views",
        category: "cost"
    },
    {
        id: "bXYBfTat18M",
        title: "Healthcare Differences: China vs USA",
        description: "American expat compares healthcare systems",
        category: "comparison"
    },
    {
        id: "65DioGgh0AY",
        title: "Healthcare in China - Costly or Affordable?",
        description: "Breaking down medical costs in China",
        category: "cost"
    }
];

// Get Random Videos
function getRandomVideos(count = 3) {
    const shuffled = shuffleArray(videoDatabase);
    return shuffled.slice(0, count);
}

// Initialize Random Videos
function initRandomVideos() {
    const videoGrid = document.querySelector('.video-grid');
    if (!videoGrid) return;
    
    // Clear existing videos
    videoGrid.innerHTML = '';
    
    // Get random videos
    const selectedVideos = getRandomVideos(3);
    
    // Render videos
    selectedVideos.forEach((video, index) => {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/${video.id}" 
                    title="${video.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen>
                </iframe>
            </div>
            <h4>${video.title}</h4>
            <p>${video.description}</p>
        `;
        
        videoGrid.appendChild(card);
        
        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });
}
