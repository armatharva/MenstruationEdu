
// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
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
                const target = mutation.target;
                if (target.classList.contains('tab-content') && target.classList.contains('active')) {
                    target.style.opacity = '0';
                    target.style.transform = 'translateY(10px)';
                    
                    // Force reflow
                    target.offsetHeight;
                    
                    target.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            }
        });
    });
    
    tabContents.forEach(content => {
        observer.observe(content, { attributes: true, attributeFilter: ['class'] });
    });
    
    // Console log for debugging
    console.log('MenstruationEdu website initialized successfully!');
    console.log('Available tabs:', Array.from(tabTriggers).map(t => t.getAttribute('data-tab')));
});
