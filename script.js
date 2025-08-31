

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Check if video element exists and handle it
    const videoElement = document.querySelector('.video-element');
    if (videoElement) {
        // Preload video data
        videoElement.preload = 'auto';
        
        // Hide fallback when video loads
        videoElement.addEventListener('loadeddata', function() {
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'none';
            }
        });
        
        // Show fallback if video fails to load
        videoElement.addEventListener('error', function() {
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
            }
        });
        
        // Handle video loading progress
        videoElement.addEventListener('loadstart', function() {
            console.log('Video loading started');
        });
        
        videoElement.addEventListener('canplay', function() {
            console.log('Video can start playing');
        });
        
        videoElement.addEventListener('canplaythrough', function() {
            console.log('Video can play through without stopping');
        });
    }
    
    // Tab functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Function to switch tabs
    function switchTab(targetTab) {
        // Remove active class from all triggers and contents
        tabTriggers.forEach(trigger => trigger.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked trigger
        const clickedTrigger = document.querySelector(`[data-tab="${targetTab}"]`);
        if (clickedTrigger) {
            clickedTrigger.classList.add('active');
        }
        
        // Show corresponding content
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }
    
    // Add click event listeners to tab triggers
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Set initial active tab (demo)
    switchTab('demo');
    
    // Anatomy Sub-tabs functionality
    const anatomySubtabs = document.querySelectorAll('.anatomy-subtab');
    const anatomySubcontents = document.querySelectorAll('.anatomy-subcontent');
    
    function switchAnatomySubtab(targetSubtab) {
        // Remove active class from all sub-tabs and sub-contents
        anatomySubtabs.forEach(subtab => subtab.classList.remove('active'));
        anatomySubcontents.forEach(subcontent => subcontent.classList.remove('active'));
        
        // Add active class to clicked sub-tab
        const clickedSubtab = document.querySelector(`[data-subtab="${targetSubtab}"]`);
        if (clickedSubtab) {
            clickedSubtab.classList.add('active');
        }
        
        // Show corresponding sub-content
        const targetSubcontent = document.getElementById(targetSubtab);
        if (targetSubcontent) {
            targetSubcontent.classList.add('active');
        }
    }
    
    // Add click event listeners to anatomy sub-tabs
    anatomySubtabs.forEach(subtab => {
        subtab.addEventListener('click', function() {
            const targetSubtab = this.getAttribute('data-subtab');
            switchAnatomySubtab(targetSubtab);
        });
    });
    
    // Q&A Accordion functionality is handled by inline onclick functions in HTML
    // This prevents conflicts with the working accordion system
    
    // Smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add some interactive feedback for buttons
    tabTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = 'rgba(236, 72, 153, 0.1)';
            }
        });
        
        trigger.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });
    
    // Add keyboard navigation
    tabTriggers.forEach((trigger, index) => {
        trigger.addEventListener('keydown', function(e) {
            let newIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = index > 0 ? index - 1 : tabTriggers.length - 1;
                    tabTriggers[newIndex].focus();
                    tabTriggers[newIndex].click();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = index < tabTriggers.length - 1 ? index + 1 : 0;
                    tabTriggers[newIndex].focus();
                    tabTriggers[newIndex].click();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    this.click();
                    break;
            }
        });
        
        // Make tabs focusable
        trigger.setAttribute('tabindex', '0');
        trigger.setAttribute('role', 'tab');
    });
    
    // Add ARIA attributes for accessibility
    tabContents.forEach(content => {
        content.setAttribute('role', 'tabpanel');
    });
    
    // Add a simple animation when switching tabs
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                // Add fade-in effect for newly active content
                if (mutation.target.classList.contains('active')) {
                    mutation.target.style.opacity = '0';
                    mutation.target.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        mutation.target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        mutation.target.style.opacity = '1';
                        mutation.target.style.transform = 'translateY(0)';
                    }, 50);
                }
            }
        });
    });
    
    // Observe all tab contents for class changes
    tabContents.forEach(content => {
        observer.observe(content, { attributes: true });
    });
    
    // Console log for debugging
    console.log('MenstruationEdu website initialized successfully!');
    console.log('Available tabs:', Array.from(tabTriggers).map(t => t.getAttribute('data-tab')));
});
