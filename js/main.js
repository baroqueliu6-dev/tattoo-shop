// Main JavaScript for Chinese Character Tattoo Shop

// Hero Carousel Functionality
function initHeroCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    if (!track || dots.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = dots.length;
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }
    
    // Auto-advance every 3 seconds
    let carouselInterval = setInterval(nextSlide, 3000);
    
    // Click on dots to navigate
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
            // Reset interval on manual navigation
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 3000);
        });
    });
    
    // Pause on hover
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carousel.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 3000);
        });
    }
}

// Product Search Functionality
function initProductSearch() {
    const searchInput = document.getElementById('product-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.product-desc').textContent.toLowerCase();
            const matches = title.includes(searchTerm) || desc.includes(searchTerm);
            
            if (searchTerm === '' || matches) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
            }
        });
        
        // Update search result count
        const visibleCount = Array.from(productCards).filter(card => 
            card.style.display !== 'none'
        ).length;
        
        const resultText = document.getElementById('search-result-count');
        if (resultText) {
            if (searchTerm === '') {
                resultText.textContent = '';
            } else {
                resultText.textContent = `${visibleCount} design${visibleCount !== 1 ? 's' : ''} found`;
            }
        }
    });
}

// Smooth scroll for navigation links
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

// Initialize PayPal buttons when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 Oriental Symbols Tattoo Shop loaded');
    
    // Initialize carousel
    initHeroCarousel();
    
    // Initialize search functionality
    initProductSearch();
    
    // PayPal buttons are initialized by the SDK automatically
    // based on the hosted button IDs in the HTML
    
    // Add loading state to buttons
    const buttonContainers = document.querySelectorAll('.paypal-button-container');
    buttonContainers.forEach(container => {
        // Add a subtle loading indicator
        container.style.opacity = '0.8';
    });
    
    // Track page views (optional analytics)
    console.log('📊 Gallery section:', document.querySelectorAll('.product-card').length, 'products');
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Add entrance animations
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

// Observe product cards for animation
document.querySelectorAll('.product-card, .feature, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// FAQ Accordion Functionality
function initFAQAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('.faq-icon');
            
            // Toggle current item
            const isOpen = faqItem.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-answer').style.maxHeight = '0';
                item.querySelector('.faq-icon').textContent = '+';
            });
            
            // Open clicked item if it wasn't open
            if (!isOpen) {
                faqItem.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.textContent = '−';
            }
        });
    });
}

// Initialize FAQ accordion when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initFAQAccordion();
});

// Console message for developers
console.log('%c🎨 Oriental Symbols Tattoo Designs', 'font-size: 20px; font-weight: bold; color: #e94560;');
console.log('%cBuilt with ❤️ for authentic cultural expression', 'font-size: 12px; color: #666;');
