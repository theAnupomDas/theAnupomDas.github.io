
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    // If we scroll down more than 50 pixels, add the 'scrolled' class
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Elegant Fade-In Animation on Scroll
const faders = document.querySelectorAll('.fade-in');

// Options for the Intersection Observer
const appearOptions = {
    threshold: 0.2, // Trigger when 20% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
};

// Create the observer
const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add the class that handles the CSS transition
            entry.target.classList.add('appear');
            // Stop observing once it has faded in
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// Tell the observer to watch all elements with the 'fade-in' class
faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// 3. Expand/Collapse "See More" Logic
const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Find the closest wrapper to this specific button
        const container = this.closest('.list-container');
        // Find all items within this container that are meant to be expandable
        const expandableItems = container.querySelectorAll('.expandable');
        
        let isExpanded = false;

        expandableItems.forEach(item => {
            // Toggle the 'hidden' class
            if (item.classList.contains('hidden')) {
                item.classList.remove('hidden');
                isExpanded = true;
            } else {
                item.classList.add('hidden');
                isExpanded = false;
            }
        });

        // Update the button text based on the state
        if (isExpanded) {
            this.textContent = 'See Less';
        } else {
            this.textContent = 'See More';
        }
    });
});