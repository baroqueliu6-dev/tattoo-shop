/**
 * Typewriter Hero Effect
 * Displays rotating advantage statements with typewriter animation
 * Friend-to-friend conversational style with rhyming punchlines
 */

(function() {
    'use strict';

    // Configuration - Fast typewriter speed per Boss's requirement
    const CONFIG = {
        typingSpeed: 45,        // ms per character (FAST - 40-50ms range)
        deletingSpeed: 25,      // ms per character (faster deletion)
        pauseTime: 2000,        // ms to wait after completing a phrase
        deletePause: 500,       // ms to wait before deleting
        mobileBreakpoint: 768,  // disable typewriter on small screens
        mobileSpeed: 50         // ms per character on mobile (also fast)
    };

    // Advantage phrases - Friend-to-friend conversational style with rhyming punchlines
    const lines = [
        "Same doctors, same care — way less than the US, honestly. Care can wait, your health can't. See someone today, not next month.",
        "Why pay more? Why wait longer? Doctors rest, pain doesn't. Get checked this week, not in 3 months.",
        "So many folks come here now. They get it: care waits, health doesn't. Top hospitals, fraction of cost. Done."
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
            console.warn('Typewriter element not found');
            return;
        }

        // Check if mobile - simplify animation
        if (window.innerWidth <= CONFIG.mobileBreakpoint) {
            renderStaticPhrase();
            return;
        }

        // Start the typewriter loop
        setTimeout(type, 500);
    }

    /**
     * Render a static phrase on mobile (no animation)
     */
    function renderStaticPhrase() {
        // Mobile: Show first phrase statically (no typewriter animation)
        typewriterElement.innerHTML = `<span class="typewriter-word">${lines[0]}</span>`;
        typewriterElement.style.display = 'block';
        typewriterElement.style.opacity = '1';
        typewriterElement.style.visibility = 'visible';
        if (cursorElement) cursorElement.style.display = 'none';
        
        // Force reflow to ensure visibility
        void typewriterElement.offsetWidth;
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
