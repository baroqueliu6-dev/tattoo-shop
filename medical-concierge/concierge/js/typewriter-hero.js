/**
 * Typewriter Hero Effect
 * Displays rotating advantage statements with typewriter animation
 * Friend-to-friend conversational style with rhyming punchlines
 */

(function() {
    'use strict';

    // Configuration - Fast typewriter speed per Boss's requirement
    const CONFIG = {
        typingSpeed: 35,        // ms per character (FAST - 35-45ms range)
        deletingSpeed: 20,      // ms per character (faster deletion)
        pauseTime: 2500,        // ms to wait after completing a phrase
        deletePause: 800,       // ms to wait before deleting
        mobileBreakpoint: 768,  // disable typewriter on small screens
        mobileSpeed: 40         // ms per character on mobile (also fast)
    };

    // Advantage phrases - Highlighting "Three Unfamiliar Difficulties" + Price Advantage
    const lines = [
        "80% Cheaper Than US Healthcare.",
        "Same Expert Doctors.",
        "Zero Language Barriers.",
        "Unfamiliar Hospital? Unfamiliar System? Unfamiliar Medical Terms?",
        "We Handle All Three.",
        "500+ International Patients Treated.",
        "100% Satisfaction.",
        "You're Never Alone in Beijing."
    ];

    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let isPaused = false;
    let typewriterElement = null;
    let cursorElement = null;

    /**
     * Initialize the typewriter effect
     */
    function init() {
        typewriterElement = document.querySelector('.typewriter-text');
        cursorElement = document.querySelector('.typewriter-cursor');

        if (!typewriterElement) {
            console.error('[Typewriter] ERROR: Element not found!');
            return;
        }

        console.log('[Typewriter] Initializing...');
        console.log('[Typewriter] Window width:', window.innerWidth);
        console.log('[Typewriter] Mobile breakpoint:', CONFIG.mobileBreakpoint);
        
        // CRITICAL: ALWAYS render static phrase first to ensure content is visible on mobile
        renderStaticPhrase();
        
        // Only start typewriter animation on desktop
        if (window.innerWidth > CONFIG.mobileBreakpoint) {
            console.log('[Typewriter] Desktop detected (>768px), starting animation');
            setTimeout(() => {
                currentCharIndex = 0;
                isDeleting = false;
                isPaused = false;
                type();
            }, 1000);
        } else {
            console.log('[Typewriter] Mobile detected (≤768px), keeping static display');
            console.log('[Typewriter] Static content should be visible now');
        }
    }

    /**
     * Render a static phrase on mobile (no animation)
     */
    function renderStaticPhrase() {
        // Mobile: Show first phrase statically (no typewriter animation)
        console.log('[Typewriter] Mobile detected, rendering static phrase');
        typewriterElement.innerHTML = `<span class="typewriter-word" style="display: inline; opacity: 1; visibility: visible;">${lines[0]}</span>`;
        typewriterElement.style.cssText = 'display: block !important; opacity: 1 !important; visibility: visible !important; height: auto !important;';
        if (cursorElement) cursorElement.style.display = 'none';
        
        // Force reflow to ensure visibility
        void typewriterElement.offsetWidth;
        console.log('[Typewriter] Static phrase rendered successfully');
    }

    /**
     * Type the next character
     */
    function type() {
        if (isPaused) return;

        const currentLine = lines[currentPhraseIndex];
        const currentSpeed = window.innerWidth <= CONFIG.mobileBreakpoint 
            ? CONFIG.mobileSpeed 
            : CONFIG.typingSpeed;
        
        if (!isDeleting) {
            // Typing forward
            if (currentCharIndex <= currentLine.length) {
                typewriterElement.innerHTML = `<span class="typewriter-word">${currentLine.substring(0, currentCharIndex)}</span>`;
                currentCharIndex++;
                setTimeout(type, currentSpeed);
            } else {
                // Finished typing, pause then start deleting
                isPaused = true;
                
                // Show complete line when done
                typewriterElement.innerHTML = `<span class="typewriter-word">${currentLine}</span>`;
                
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    currentCharIndex = currentLine.length;
                    setTimeout(type, CONFIG.deletePause);
                }, CONFIG.pauseTime);
            }
        } else {
            // Deleting
            if (currentCharIndex >= 0) {
                typewriterElement.innerHTML = `<span class="typewriter-word">${currentLine.substring(0, currentCharIndex)}</span>`;
                currentCharIndex--;
                setTimeout(type, CONFIG.deletingSpeed);
            } else {
                // Finished deleting, move to next phrase
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % lines.length;
                setTimeout(type, 300);
            }
        }
    }

    /**
     * Handle window resize
     */
    function handleResize() {
        if (window.innerWidth <= CONFIG.mobileBreakpoint) {
            renderStaticPhrase();
        } else {
            // Re-initialize on resize to desktop
            currentCharIndex = 0;
            isDeleting = false;
            isPaused = false;
            setTimeout(type, 500);
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Handle resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 250);
    });

})();
