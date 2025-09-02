// Content script for IMDb pages
(function() {
    'use strict';

    // Function to extract IMDb ID from the current page
    function getImdbId() {
        const url = window.location.href;
        const match = url.match(/\/title\/(tt\d+)/);
        return match ? match[1] : null;
    }

    // Function to create the streaming button
    function createStreamingButton() {
        const button = document.createElement('button');
        button.id = 'playit-button';
        button.className = 'playit-stream-button';
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3l14 9-14 9V3z"/>
            </svg>
            Play It
        `;
        button.title = 'Play this title with Play It';
        
        button.addEventListener('click', openStreamingInterface);
        return button;
    }

    // Function to open the streaming interface
    function openStreamingInterface() {
        const imdbId = getImdbId();
        if (!imdbId) {
            alert('Could not find IMDb ID for this page.');
            return;
        }

        // Create a new window with the hosted streaming interface
        const streamingUrl = `https://playitt.netlify.app/?id=${imdbId}`;
        const width = 1200;
        const height = 800;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;

        window.open(streamingUrl, 'playit-window', 
            `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
        );
    }

    // Function to inject the button
    function injectStreamingButton() {
        console.log('🔍 Play It: Looking for watchlist button...');
        
        // Look for the watchlist button area with multiple selectors
        const watchlistButton = document.querySelector('[data-testid="add-to-watchlist-button"]') || 
                               document.querySelector('.ipc-button--watchlist') ||
                               document.querySelector('[data-testid="title-pc-watchlist-button"]') ||
                               document.querySelector('button[aria-label*="watchlist"]') ||
                               document.querySelector('button[class*="watchlist"]') ||
                               document.querySelector('button[class*="Watchlist"]') ||
                               // More specific selectors for current IMDb structure
                               document.querySelector('button[class*="ipc-button"]') ||
                               document.querySelector('button[class*="Button"]') ||
                               // Look for any button containing specific text
                               Array.from(document.querySelectorAll('button')).find(btn => 
                                   btn.textContent && btn.textContent.includes('Add to Watchlist')
                               );
        
        if (watchlistButton) {
            console.log('✅ Play It: Found watchlist button:', watchlistButton);
            
            // Check if we already injected the button
            if (document.getElementById('playit-button')) {
                console.log('ℹ️ Play It: Button already exists');
                return;
            }

            const streamingButton = createStreamingButton();
            console.log('🎬 Play It: Created streaming button');
            
            // Insert the button before the watchlist button
            watchlistButton.parentNode.insertBefore(streamingButton, watchlistButton);
            console.log('✅ Play It: Button injected successfully!');
        } else {
            console.log('❌ Play It: Could not find watchlist button');
            console.log('🔍 Play It: Available buttons on page:', document.querySelectorAll('button'));
            
            // Try alternative injection method - look for any button with "watchlist" text
            const allButtons = document.querySelectorAll('button');
            for (let button of allButtons) {
                if (button.textContent.toLowerCase().includes('watchlist')) {
                    console.log('🎯 Play It: Found button with watchlist text:', button);
                    if (!document.getElementById('playit-button')) {
                        const streamingButton = createStreamingButton();
                        button.parentNode.insertBefore(streamingButton, button);
                        console.log('✅ Play It: Button injected using alternative method!');
                        return;
                    }
                    break;
                }
            }
            
            // If still no button found, try looking for any element with "Add to Watchlist" text
            if (!document.getElementById('playit-button')) {
                console.log('🔍 Play It: Trying to find any element with watchlist text...');
                const allElements = document.querySelectorAll('button');
                for (let element of allElements) {
                    if (element.textContent && element.textContent.includes('Add to Watchlist')) {
                        console.log('🎯 Play It: Found element with watchlist text:', element);
                        // Try to find the closest button or create one
                        const closestButton = element.closest('button') || element;
                        if (closestButton && !document.getElementById('playit-button')) {
                            const streamingButton = createStreamingButton();
                            closestButton.parentNode.insertBefore(streamingButton, closestButton);
                            console.log('✅ Play It: Button injected using text search method!');
                            return;
                        }
                        break;
                    }
                }
            }
            
            // Final fallback: try to find any button that might be the watchlist button
            if (!document.getElementById('playit-button')) {
                console.log('🔍 Play It: Final fallback - looking for any button that might be watchlist...');
                const allButtons = Array.from(document.querySelectorAll('button'));
                const watchlistCandidates = allButtons.filter(btn => {
                    const text = btn.textContent || '';
                    return text.toLowerCase().includes('add') || 
                           text.toLowerCase().includes('watchlist') ||
                           text.toLowerCase().includes('list');
                });
                
                if (watchlistCandidates.length > 0) {
                    console.log('🎯 Play It: Found potential watchlist buttons:', watchlistCandidates);
                    const targetButton = watchlistCandidates[0];
                    const streamingButton = createStreamingButton();
                    targetButton.parentNode.insertBefore(streamingButton, targetButton);
                    console.log('✅ Play It: Button injected using fallback method!');
                    return;
                } else {
                    console.log('❌ Play It: No suitable injection point found');
                }
            }
        }
    }

    // Function to handle dynamic content loading
    function observePageChanges() {
        const observer = new MutationObserver(function(mutations) {
            let shouldInject = false;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any new nodes contain watchlist-related elements
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.querySelector && (
                                node.querySelector('[data-testid="add-to-watchlist-button"]') ||
                                node.querySelector('.ipc-button--watchlist') ||
                                node.querySelector('[data-testid="title-pc-watchlist-button"]')
                            )) {
                                shouldInject = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldInject) {
                setTimeout(injectStreamingButton, 100);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Main initialization
    function init() {
        console.log('🚀 Play It: Extension initialized');
        
        // Wait for the page to load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                console.log('📄 Play It: DOM loaded, waiting for content...');
                setTimeout(injectStreamingButton, 1000);
                setTimeout(injectStreamingButton, 3000); // Try again after 3 seconds
                setTimeout(injectStreamingButton, 5000); // Try again after 5 seconds
                observePageChanges();
            });
        } else {
            console.log('📄 Play It: DOM already loaded, injecting...');
            setTimeout(injectStreamingButton, 1000);
            setTimeout(injectStreamingButton, 1000);
            setTimeout(injectStreamingButton, 3000); // Try again after 3 seconds
            setTimeout(injectStreamingButton, 5000); // Try again after 5 seconds
            observePageChanges();
        }
        
        // Also try injection when the page is fully loaded
        window.addEventListener('load', function() {
            console.log('🌐 Play It: Page fully loaded, trying injection...');
            setTimeout(injectStreamingButton, 1000);
        });
    }

    // Start the script
    init();
    
    // Add keyboard shortcut for manual testing (Ctrl+Shift+S)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'S') {
            console.log('🎯 Play It: Manual injection triggered!');
            injectStreamingButton();
        }
    });
    
    // Add a minimalist right-edge vertical indicator
    const indicator = document.createElement('div');
    indicator.id = 'playit-indicator';
    indicator.setAttribute('aria-label', 'Play It loaded - click to inject');
    indicator.style.cssText = `
        position: fixed;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        background: rgba(17,17,17,0.75);
        color: #ffffff;
        padding: 6px 4px;
        border-radius: 6px 0 0 6px;
        font-size: 11px;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        z-index: 9999;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0,0,0,0.25);
        writing-mode: vertical-rl;
        text-orientation: upright;
        letter-spacing: 1px;
        user-select: none;
        opacity: 0.85;
        transition: opacity 0.2s ease, background 0.2s ease;
    `;
    indicator.textContent = 'PLAY IT LOADED';
    indicator.title = 'Click to inject Play It (or use Ctrl+Shift+S)';
    indicator.onclick = function() {
        console.log('🎯 Play It: Manual injection via click!');
        injectStreamingButton();
    };
    indicator.addEventListener('mouseenter', () => { indicator.style.opacity = '1'; indicator.style.background = 'rgba(17,17,17,0.92)'; });
    indicator.addEventListener('mouseleave', () => { indicator.style.opacity = '0.85'; indicator.style.background = 'rgba(17,17,17,0.75)'; });
    document.body.appendChild(indicator);
    
    console.log('🎬 Play It: Extension fully loaded! Use Ctrl+Shift+S to manually inject button.');
})(); 