// ==== 1. INDUSTRY STANDARD SCROLL OBSERVER ====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-down, .reveal-right');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "-20px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, no need to observe again for better performance
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => observer.observe(el));

// ==== 2. CUSTOM DEEP SPACE CURSOR ====
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

if (!isTouch && cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Visual Lag effect for high-end feel
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Cursor Expansion Logic
    const growElements = document.querySelectorAll('a, button, .tilt-element, .nav-item');
    growElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.width = '70px';
            cursorOutline.style.height = '70px';
            cursorOutline.style.background = 'rgba(0, 240, 255, 0.05)';
            cursorOutline.style.borderColor = 'rgba(0, 240, 255, 1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.width = '40px';
            cursorOutline.style.height = '40px';
            cursorOutline.style.background = 'transparent';
            cursorOutline.style.borderColor = 'rgba(0, 240, 255, 0.4)';
        });
    });
}

// ==== 3. MAGNETIC BUTTONS (Industry Standard Interaction) ====
const magneticElements = document.querySelectorAll('.magnetic');

if (!isTouch) {
    magneticElements.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            // Shift the button slightly towards the cursor
            this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            this.style.transition = 'none'; // Instant feedback
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = `translate(0px, 0px)`;
            this.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)'; // Smooth return
        });
    });
}

// ==== 4. 3D TILT ALGORITHM (High Performance) ====
const tiltEls = document.querySelectorAll('.tilt-element');

tiltEls.forEach(el => {
    if (!isTouch) {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }
});

// ==== 5. IMAGE COMPARISON SLIDER CRITICAL LOGIC ====
const comparisonWrapper = document.querySelector('.image-comparison');
const sliderResizer = document.querySelector('.comparison-slider');
const beforeContainer = document.querySelector('.before-img-container');

if (comparisonWrapper && sliderResizer && beforeContainer) {
    let active = false;

    const slideMove = (e) => {
        if (!active) return;
        const rect = comparisonWrapper.getBoundingClientRect();
        let x = (e.pageX || e.touches[0].pageX) - rect.left;
        
        // Boundaries
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;

        const percentage = (x / rect.width) * 100;
        beforeContainer.style.width = `${percentage}%`;
        sliderResizer.style.left = `${percentage}%`;
    };

    sliderResizer.addEventListener('mousedown', () => active = true);
    window.addEventListener('mouseup', () => active = false);
    window.addEventListener('mousemove', slideMove);

    // Mobile Support
    sliderResizer.addEventListener('touchstart', () => active = true);
    window.addEventListener('touchend', () => active = false);
    window.addEventListener('touchmove', slideMove);
}

// ==== 6. SMOOTH MOBILE MENU ====
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item, .btn-nav');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('mobile-active');
        toggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('mobile-active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Performance: Remove loading screen
window.addEventListener('load', () => {
    document.body.classList.remove('loading');
});
