/**
 * Typewriter Hero Effect
 * Displays rotating advantage statements with typewriter animation
 * Keywords are highlighted with gradient colors
 */

(function() {
    'use strict';

    // Configuration - Optimized per Canmou's design plan
    const CONFIG = {
        typingSpeed: 60,        // ms per character (desktop standard)
        deletingSpeed: 30,      // ms per character (faster deletion)
        pauseTime: 2000,        // ms to wait after completing a phrase
        deletePause: 500,       // ms to wait before deleting
        mobileBreakpoint: 768,  // disable typewriter on small screens
        mobileSpeed: 80         // ms per character on mobile
    };

    // Advantage phrases with keywords marked for gradient highlighting
    // Format: Full sentence with HTML for gradient keyword
    const phrases = [
        { 
            html: '<span class="gradient-text">24/7 Available</span> — Whenever you need us, we\'re here.',
            plain: '24/7 Available — Whenever you need us, we\'re here.'
        },
        { 
            html: '<span class="gradient-text">English-Speaking Doctors</span> — No language barriers, ever.',
            plain: 'English-Speaking Doctors — No language barriers, ever.'
        },
        { 
            html: '<span class="gradient-text">Same-Day Appointments</span> — Skip the wait, see a doctor today.',
            plain: 'Same-Day Appointments — Skip the wait, see a doctor today.'
        },
        { 
            html: '<span class="gradient-text">100% Satisfaction Guarantee</span> — Not happy? Full refund.',
            plain: '100% Satisfaction Guarantee — Not happy? Full refund.'
        },
        { 
            html: '<span class="gradient-text">500+ Expats Served</span> — Trusted by Beijing\'s international community.',
            plain: '500+ Expats Served — Trusted by Beijing\'s international community.'
        }
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
        const phrase = phrases[0];
        const html = formatPhrase(phrase);
        typewriterElement.innerHTML = html;
        if (cursorElement) cursorElement.style.display = 'none';
    }

    /**
     * Format phrase with gradient keyword highlighting
     */
    function formatPhrase(phrase) {
        const { text, keyword } = phrase;
        const keywordIndex = text.indexOf(keyword);
        
        if (keywordIndex === -1) {
            return `<span class="typewriter-word">${text}</span>`;
        }

        const before = text.substring(0, keywordIndex);
        const match = text.substring(keywordIndex, keywordIndex + keyword.length);
        const after = text.substring(keywordIndex + keyword.length);

        return `
            <span class="typewriter-word">${before}</span>
            <span class="typewriter-word"><span class="gradient-text">${match}</span></span>
            <span class="typewriter-word">${after}</span>
        `.trim();
    }

    /**
     * Smart HTML insertion - handles HTML tags correctly during typing
     * Shows HTML up to the given plain text position
     */
    function insertHtmlAtPosition(fullHtml, plainText, position) {
        if (position >= plainText.length) {
            return fullHtml; // Show complete HTML
        }
        
        let result = '';
        let plainIndex = 0;
        let i = 0;
        
        while (i < fullHtml.length && plainIndex < position) {
            const char = fullHtml[i];
            
            if (char === '<') {
                // Found opening bracket - extract full tag
                const tagEnd = fullHtml.indexOf('>', i);
                if (tagEnd === -1) break; // Malformed HTML
                
                const tag = fullHtml.substring(i, tagEnd + 1);
                result += tag;
                i = tagEnd + 1;
            } else {
                // Regular character
                result += char;
                plainIndex++;
                i++;
            }
        }
        
        return result;
    }

    /**
     * Type the next character - Smart HTML handling
     */
    function type() {
        if (isPaused) return;

        const currentPhrase = phrases[currentPhraseIndex];
        const currentSpeed = window.innerWidth <= CONFIG.mobileBreakpoint 
            ? CONFIG.mobileSpeed 
            : CONFIG.typingSpeed;
        
        if (!isDeleting) {
            // Typing forward
            if (currentCharIndex <= currentPhrase.plain.length) {
                const htmlToShow = insertHtmlAtPosition(
                    currentPhrase.html, 
                    currentPhrase.plain, 
                    currentCharIndex
                );
                typewriterElement.innerHTML = `<span class="typewriter-word">${htmlToShow}</span>`;
                currentCharIndex++;
                setTimeout(type, currentSpeed);
            } else {
                // Finished typing, pause then start deleting
                isPaused = true;
                
                // Render with gradient highlighting when complete
                typewriterElement.innerHTML = currentPhrase.html;
                
                setTimeout(() => {
                    isPaused = false;
                    isDeleting = true;
                    currentCharIndex = currentPhrase.plain.length;
                    setTimeout(type, CONFIG.deletePause);
                }, CONFIG.pauseTime);
            }
        } else {
            // Deleting
            if (currentCharIndex >= 0) {
                const htmlToShow = insertHtmlAtPosition(
                    currentPhrase.html, 
                    currentPhrase.plain, 
                    currentCharIndex
                );
                typewriterElement.innerHTML = `<span class="typewriter-word">${htmlToShow}</span>`;
                currentCharIndex--;
                setTimeout(type, CONFIG.deletingSpeed);
            } else {
                // Finished deleting, move to next phrase
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
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
