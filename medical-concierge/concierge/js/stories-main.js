// Patient Stories Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel
    initCarousel();
    
    // Initialize filters
    initFilters();
    
    // Initialize modals
    initModals();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Carousel Functionality
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const cards = document.querySelectorAll('.story-card.featured');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0]?.offsetWidth + 32; // card width + gap
    
    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        track.style.transform = `translateX(${offset}px)`;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Auto-scroll every 5 seconds
    setInterval(() => {
        const visibleCards = Math.floor(track.parentElement.offsetWidth / cardWidth);
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }, 5000);
    
    // Handle resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateCarousel();
    });
}

// Filter Functionality
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.story-card:not(.featured)');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter cards
            storyCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal Functionality
function initModals() {
    const modal = document.getElementById('storyModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = modal?.querySelector('.modal-close');
    
    if (!modal || !modalBody) return;
    
    // Story data
    const stories = {
        story1: {
            title: 'Emergency Appendectomy at 3 AM',
            author: 'James M.',
            date: 'British Expat, 3 years in Beijing',
            hospital: 'PUMC Hospital',
            dateOfService: 'March 2025',
            content: `
                <p>It started with what I thought was just bad 麻辣烫 from a roadside stall near my apartment in Sanlitun. Around midnight, my stomach started cramping badly. Being someone who's lived in India before moving to Beijing, I thought I could ride it out like I had done with countless stomach bugs before.</p>
                
                <p>But by 3 AM, the pain was unbearable. My girlfriend forced me into a taxi and we headed to the nearest hospital. I was wearing my pajamas, barely able to walk, and completely panicked about what was about to happen.</p>
                
                <blockquote>"I don't speak Chinese. The doctors don't speak English. I'm in excruciating pain. This was my nightmare scenario."</blockquote>
                
                <p>That's when I remembered the medical concierge service my colleague had mentioned. I sent a desperate WhatsApp message at 3:15 AM, not expecting any response until morning.</p>
                
                <div class="modal-timeline">
                    <h4>📋 Timeline of Events</h4>
                    <div class="timeline-item">
                        <span class="timeline-time">3:15 AM</span>
                        <span>Sent emergency message to concierge</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">3:22 AM</span>
                        <span>Received call back from on-call coordinator</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">3:45 AM</span>
                        <span>Concierge representative arrived at hospital</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">4:00 AM</span>
                        <span>Diagnosis confirmed: Acute appendicitis</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">4:30 AM</span>
                        <span>Surgery began</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">6:00 AM</span>
                        <span>Surgery completed successfully</span>
                    </div>
                </div>
                
                <p>The concierge representative, Li Wei, arrived before I even finished registration. She handled everything - the paperwork, the communication with doctors, explaining the procedure to me, and even coordinating with my insurance company.</p>
                
                <p>During surgery prep, the medical team discovered my appendix was severely inflamed and could have ruptured within hours. Li Wei translated everything clearly and helped me understand the urgency.</p>
                
                <p>The surgery went smoothly. When I woke up, Li Wei was still there - she had stayed the entire night. She explained what the surgeon had done, showed me the removed appendix (yes, they do that in China!), and helped me understand the recovery process.</p>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ Successful appendectomy with no complications</li>
                        <li>✓ Total hospital cost: ¥1,800 (including surgery)</li>
                        <li>✓ Concierge service: ¥1,500 (full-day emergency rate)</li>
                        <li>✓ 5-day hospital stay with daily check-ins</li>
                        <li>✓ Full insurance documentation provided</li>
                        <li>✓ Follow-up appointment scheduled and attended</li>
                    </ul>
                </div>
                
                <p>Three weeks later, I was back to work. Without the concierge service, I honestly don't know how I would have navigated that situation. The language barrier, the unfamiliar hospital system, the stress of a medical emergency in a foreign country - they handled it all.</p>
                
                <p><strong>Would I recommend this service? Absolutely. It's not just about translation - it's about having someone who knows the system fight for you when you're at your most vulnerable.</strong></p>
            `
        },
        story2: {
            title: 'Complete Prenatal Care Journey',
            author: 'Sarah L.',
            date: 'American Expat, Expecting Mother',
            hospital: 'Beijing United Family Hospital',
            dateOfService: 'January - October 2025',
            content: `
                <p>When I found out I was pregnant, my first thought wasn't joy - it was panic. I'm an American living in Beijing, and the idea of navigating prenatal care and childbirth in a foreign hospital system was terrifying.</p>
                
                <blockquote>"I wanted quality care, but I also wanted to understand everything. I didn't want to be just another patient who nods along without understanding what's happening."</blockquote>
                
                <p>A friend from the expat moms group recommended the medical concierge service. They had used it for their pregnancy and couldn't speak highly enough of the support they received.</p>
                
                <div class="modal-timeline">
                    <h4>📋 Service Timeline</h4>
                    <div class="timeline-item">
                        <span class="timeline-time">Week 8</span>
                        <span>Initial consultation and hospital selection</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">Week 12</span>
                        <span>First prenatal visit with concierge accompaniment</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">Week 16-36</span>
                        <span>Monthly checkups with translation support</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">Week 36-40</span>
                        <span>Weekly monitoring and birth plan preparation</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">Week 40</span>
                        <span>Delivery support and postpartum care coordination</span>
                    </div>
                </div>
                
                <p>My concierge coordinator, Mei, became like family over those 9 months. She helped me:</p>
                
                <ul>
                    <li>Choose the right hospital (UFH for their international standards)</li>
                    <li>Understand every test result and ultrasound</li>
                    <li>Communicate with my OB-GYN about my birth preferences</li>
                    <li>File insurance claims (all 12 appointments were reimbursed!)</li>
                    <li>Prepare a birth plan that respected both Western and Chinese practices</li>
                </ul>
                
                <p>The delivery itself was a team effort. Mei was there for 18 hours, translating between me, my husband, and the medical team. When complications arose and I needed an emergency C-section, she was the one who explained everything calmly while I was panicking.</p>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ Healthy baby boy born, 3.8kg</li>
                        <li>✓ Successful C-section with no complications</li>
                        <li>✓ 100% insurance reimbursement (¥45,000 total)</li>
                        <li>✓ Complete medical records translated to English</li>
                        <li>✓ Postpartum care plan established</li>
                        <li>✓ Pediatrician referral and first appointment scheduled</li>
                    </ul>
                </div>
                
                <p>Today, my son is 6 months old and thriving. Looking back, the concierge service wasn't just helpful - it was essential. They gave me confidence in a system I didn't understand, and peace of mind during the most important journey of my life.</p>
                
                <p><strong>To other expat moms: Don't try to do this alone. Get the support you deserve.</strong></p>
            `
        },
        story3: {
            title: 'Broken Toe to Full Recovery',
            author: 'Michael K.',
            date: 'German Expat, 5 years in Beijing',
            hospital: 'Beijing Chaoyang Hospital',
            dateOfService: 'February 2025',
            content: `
                <p>It was the stupidest accident imaginable. I was cleaning my apartment before guests came over, running around like a madman, and smashed my bare foot into a door frame.</p>
                
                <blockquote>"My pinky toe was literally pointing in the wrong direction. I knew it was bad, but I had no idea what to do."</blockquote>
                
                <p>I'd heard horror stories about Chinese hospitals - the crowds, the confusion, the language barrier. As a foreigner without Chinese health insurance, I was also worried about costs.</p>
                
                <p>I contacted the concierge service at 9 AM. By 10:30 AM, they had:</p>
                
                <div class="modal-timeline">
                    <h4>📋 Same-Day Service Timeline</h4>
                    <div class="timeline-item">
                        <span class="timeline-time">9:00 AM</span>
                        <span>Contacted concierge service</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">9:30 AM</span>
                        <span>Received hospital recommendation and appointment confirmation</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">10:30 AM</span>
                        <span>Concierge met me at my apartment</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">11:00 AM</span>
                        <span>Arrived at hospital, immediate registration</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">11:30 AM</span>
                        <span>X-ray completed and reviewed</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">12:00 PM</span>
                        <span>Toe reduction and splinting</span>
                    </div>
                    <div class="timeline-item">
                        <span class="timeline-time">1:00 PM</span>
                        <span>Prescription filled, heading home</span>
                    </div>
                </div>
                
                <p>The whole process took less than 3 hours from my apartment to back home. Without the concierge, my colleague told me it would have been 4-5 hours minimum just waiting in lines.</p>
                
                <p>The orthopedic doctor was excellent - young, spoke some English, but the concierge still translated all the important details. They explained the injury (displaced fracture), the treatment (manual reduction and buddy taping), and the recovery timeline (4-6 weeks).</p>
                
                <p>What impressed me most was the follow-up. The concierge didn't just disappear after the appointment. They:</p>
                
                <ul>
                    <li>Checked in via WeChat daily for the first week</li>
                    <li>Scheduled and accompanied me to all 3 follow-up appointments</li>
                    <li>Helped me get a medical certificate for work</li>
                    <li>Translated the prescription and explained dosage</li>
                    <li>Even helped me find a pharmacy that had the specific pain medication I needed</li>
                </ul>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ Toe healed perfectly with no deformity</li>
                        <li>✓ Total hospital cost: ¥650 (X-ray + treatment + meds)</li>
                        <li>✓ Concierge service: ¥950 (initial + 3 follow-ups)</li>
                        <li>✓ Full recovery in 5 weeks</li>
                        <li>✓ No complications or infections</li>
                        <li>✓ Back to normal activities including sports</li>
                    </ul>
                </div>
                
                <p>Six months later, my toe is perfect. You'd never know it was broken. The concierge service made what could have been a nightmare experience into something manageable.</p>
                
                <p><strong>For minor injuries, you might think you don't need help. Trust me, you do. The time saved and stress avoided is worth every yuan.</strong></p>
            `
        },
        story4: {
            title: 'ER Visit for Abdominal Pain',
            author: 'David R.',
            date: 'Australian Expat, 2 years in Beijing',
            hospital: 'Shanghai Public Hospital',
            dateOfService: 'December 2024',
            content: `
                <p>Sudden abdominal pain on a Saturday night. No idea what was wrong. No idea which hospital to go to. Classic expat panic mode.</p>
                
                <blockquote>"I was ready to just go to the nearest hospital and hope for the best. Thank god I called the concierge first."</blockquote>
                
                <p>They recommended a public hospital with a good emergency department, not the expensive international one. Said it would be faster and just as good for emergency care.</p>
                
                <p>They were right. The ER was busy but efficient. With the concierge handling registration and communication, I was seeing a doctor within 20 minutes.</p>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ Diagnosis: Severe gastroenteritis (food poisoning)</li>
                        <li>✓ Treated and released within 3 hours</li>
                        <li>✓ Total cost: ¥450 (very affordable)</li>
                        <li>✓ IV fluids and medication provided</li>
                        <li>✓ Full recovery in 2 days</li>
                    </ul>
                </div>
                
                <p><strong>Sometimes you don't need the fancy international hospital. You need someone who knows which public hospital has the shortest wait times and best emergency care.</strong></p>
            `
        },
        story5: {
            title: 'Chronic Condition Management',
            author: 'Elena P.',
            date: 'Spanish Expat, 4 years in Beijing',
            hospital: 'China-Japan Friendship Hospital',
            dateOfService: 'Ongoing since 2024',
            content: `
                <p>I have Type 2 diabetes. Managing it in a foreign country where I couldn't read prescription labels or understand doctor's instructions was a nightmare.</p>
                
                <blockquote>"One wrong dosage could be dangerous. I needed to understand everything perfectly."</blockquote>
                
                <p>The concierge service has been managing my care for over a year now. They:</p>
                
                <ul>
                    <li>Accompany me to quarterly checkups</li>
                    <li>Translate all lab results and explain trends</li>
                    <li>Help me communicate any symptoms or concerns to my doctor</li>
                    <li>Translate medication instructions and check for interactions</li>
                    <li>Coordinate with my endocrinologist in Spain for second opinions</li>
                </ul>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ HbA1c reduced from 8.2% to 6.5%</li>
                        <li>✓ Medication properly managed with no errors</li>
                        <li>✓ No diabetes-related complications</li>
                        <li>✓ Peace of mind for me and my family back home</li>
                    </ul>
                </div>
                
                <p><strong>For chronic conditions, having consistent support is invaluable. My health has never been better.</strong></p>
            `
        },
        story6: {
            title: 'Minor Surgery Procedure',
            author: 'Thomas B.',
            date: 'Canadian Expat, 1 year in Beijing',
            hospital: 'Beijing United Family Hospital',
            dateOfService: 'November 2024',
            content: `
                <p>I needed a cyst removed from my back. Nothing major, but it required local anesthesia and a minor surgical procedure.</p>
                
                <blockquote>"I was nervous about the procedure itself, but also about explaining my medical history and allergies correctly."</blockquote>
                
                <p>The concierge helped me prepare a complete medical history document in Chinese, accompanied me to the pre-op consultation, and was there on the day of the procedure.</p>
                
                <div class="modal-outcome">
                    <h4>✅ Outcome</h4>
                    <ul>
                        <li>✓ Successful cyst removal (day procedure)</li>
                        <li>✓ No complications or infections</li>
                        <li>✓ Clear post-op care instructions</li>
                        <li>✓ Follow-up wound check scheduled and attended</li>
                        <li>✓ Total cost: ¥2,800 (procedure + pathology)</li>
                        <li>✓ Stitches removed after 10 days, healing perfectly</li>
                    </ul>
                </div>
                
                <p><strong>Even for minor procedures, having professional support ensures nothing gets lost in translation.</strong></p>
            `
        }
    };
    
    // Add click handlers to all story buttons
    document.querySelectorAll('[data-story]').forEach(btn => {
        btn.addEventListener('click', () => {
            const storyId = btn.dataset.story;
            const story = stories[storyId];
            
            if (!story) return;
            
            modalBody.innerHTML = `
                <div class="modal-header">
                    <h2>${story.title}</h2>
                    <div class="modal-meta">
                        <div class="modal-meta-item">
                            <span>👤</span>
                            <span>${story.author}</span>
                        </div>
                        <div class="modal-meta-item">
                            <span>📍</span>
                            <span>${story.hospital}</span>
                        </div>
                        <div class="modal-meta-item">
                            <span>📅</span>
                            <span>${story.dateOfService}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-story-content">
                    ${story.content}
                </div>
            `;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) return;
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
