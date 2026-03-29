// ==== 1. HIGH-PERFORMANCE SCROLL OBSERVER ====
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-down');

const revealOptions = {
    threshold: 0.1,
    rootMargin: "-20px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => observer.observe(el));

// ==== 2. ADAPTIVE INTERACTION SYSTEM (PC VS MOBILE) ====
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const isTouch = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;

if (!isTouch && cursorDot && cursorOutline) {
    window.addEventListener("mousemove", (e) => {
        const { clientX: x, clientY: y } = e;
        cursorDot.style.translate = `${x}px ${y}px`;
        cursorOutline.animate({ translate: `${x}px ${y}px` }, { duration: 500, fill: "forwards" });
    });

    // Interaction Growth
    document.querySelectorAll('a, button, .tilt-element').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.scale = '1.8';
            cursorOutline.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.scale = '1';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });
}

// ==== 3. 3D TILT (GPU ACCELERATED - PC ONLY) ====
if (!isTouch) {
    const tiltEls = document.querySelectorAll('.tilt-element');
    tiltEls.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = el.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            el.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
        });
    });
}

// ==== 4. STAGGERED MOBILE MENU Reveal ====
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const navItems = document.querySelectorAll('.nav-item');

if (toggle && menu) {
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('mobile-active');
        toggle.classList.toggle('active');
        document.body.style.overflow = isOpen ? 'hidden' : '';

        if (isOpen) {
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('active-item');
                }, 100 + (index * 80)); // Staggered delay
            });
        } else {
            navItems.forEach(item => item.classList.remove('active-item'));
        }
    });

    // Close menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('mobile-active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
            navItems.forEach(i => i.classList.remove('active-item'));
        });
    });
}

// ==== 5. FLUID IMAGE SLIDER (SWIPE FRIENDLY) ====
const slider = document.querySelector('.image-comparison');
const handle = document.querySelector('.comparison-slider');
const beforeImg = document.querySelector('.before-img-container');

if (slider && handle && beforeImg) {
    let isMoving = false;

    const move = (e) => {
        if (!isMoving) return;
        const x = (e.pageX || e.touches?.[0]?.pageX) - slider.getBoundingClientRect().left;
        const percent = Math.max(0, Math.min(100, (x / slider.offsetWidth) * 100));
        handle.style.left = `${percent}%`;
        beforeImg.style.width = `${percent}%`;
    };

    handle.addEventListener('mousedown', () => isMoving = true);
    handle.addEventListener('touchstart', () => isMoving = true, { passive: true });
    window.addEventListener('mouseup', () => isMoving = false);
    window.addEventListener('touchend', () => isMoving = false);
    window.addEventListener('mousemove', move);
    window.addEventListener('touchmove', move, { passive: true });
}

// Performance: Remove initial loading lag
window.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});
