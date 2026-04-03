// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navMenu?.classList.remove('active');
            mobileMenuToggle?.classList.remove('active');
        }
    });
});

// Sticky Header Effect
let lastScroll = 0;
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }

    lastScroll = currentScroll;
});

// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.testimonial-prev');
const nextBtn = document.querySelector('.testimonial-next');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach(item => item.classList.remove('active'));
    testimonials[index].classList.add('active');
}

prevBtn?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
});

nextBtn?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
});

// Auto-rotate testimonials
if (testimonials.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Welcome Popup
const welcomePopup = document.getElementById('welcomePopup');
const popupClose = document.querySelector('.popup-close');
const popupForm = document.querySelector('.popup-form');

// Show popup after 3 seconds (only for first-time visitors)
setTimeout(() => {
    if (!localStorage.getItem('welcomePopupShown')) {
        welcomePopup?.classList.add('show');
    }
}, 3000);

popupClose?.addEventListener('click', () => {
    welcomePopup.classList.remove('show');
    localStorage.setItem('welcomePopupShown', 'true');
});

popupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    try {
        await fetch('https://www.bogen.ai/api/book/speaker-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: 'Website',
                last_name: 'Visitor',
                email: email,
                phone: 'N/A',
                message: '[Popup form] Free Business Assessment request'
            })
        });
    } catch (err) {
        console.error('Popup form error:', err);
    }
    alert('Thank you! Check your email for your free business assessment.');
    welcomePopup.classList.remove('show');
    localStorage.setItem('welcomePopupShown', 'true');
});

// Click outside to close popup
welcomePopup?.addEventListener('click', (e) => {
    if (e.target === welcomePopup) {
        welcomePopup.classList.remove('show');
        localStorage.setItem('welcomePopupShown', 'true');
    }
});

// Form Submissions
const contactForm = document.querySelector('.contact-form');
const newsletterForm = document.querySelector('.newsletter-form');

contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const status = form.querySelector('.form-status');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
        const res = await fetch('https://www.bogen.ai/api/book/speaker-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: form.first_name.value,
                last_name: form.last_name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message?.value || ''
            })
        });

        if (!res.ok) throw new Error('Server error');

        if (status) {
            status.style.display = 'block';
            status.style.color = '#4CAF50';
            status.textContent = 'Thank you! We will contact you within 24 hours.';
        }
        form.reset();
    } catch (err) {
        console.error('Contact form error:', err);
        if (status) {
            status.style.display = 'block';
            status.style.color = '#f44336';
            status.textContent = 'Something went wrong. Please call 561-235-7575.';
        }
    } finally {
        btn.disabled = false;
        btn.textContent = originalText;
    }
});

newsletterForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    try {
        await fetch('https://www.bogen.ai/api/book/speaker-inquiry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                first_name: 'Newsletter',
                last_name: 'Subscriber',
                email: email,
                phone: 'N/A',
                message: '[Newsletter signup] from speaker site'
            })
        });
    } catch (err) {
        console.error('Newsletter form error:', err);
    }
    alert('Thank you for subscribing! Check your email for exclusive insights.');
    e.target.reset();
});

// Chat Widget
const chatToggle = document.querySelector('.chat-toggle');

chatToggle?.addEventListener('click', () => {
    // Here you would normally open a chat widget
    alert('Chat functionality would open here. For immediate assistance, call 561-235-7575');
});

// Animate elements on scroll
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

// Add animation to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add animation to library cards
document.querySelectorAll('.library-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add animation to industry cards
document.querySelectorAll('.industry-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Add animation to resource cards
document.querySelectorAll('.resource-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Interactive hover effects for buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.width = '0';
        ripple.style.height = '0';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s ease';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < 800) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Counter animation for stats
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.dataset.suffix ? target + element.dataset.suffix : target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 20);
};

// Observe stat numbers for animation
const statNumbers = document.querySelectorAll('.stat-number');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            if (text.includes('+')) {
                const number = parseInt(text);
                entry.target.dataset.suffix = '+';
                animateCounter(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statObserver.observe(stat));

// Dynamic copyright year
const currentYear = new Date().getFullYear();
const copyrightElement = document.querySelector('.footer-bottom p');
if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear} Edmund Bogen. All rights reserved.`;
}

console.log('Edmund Bogen website initialized successfully');