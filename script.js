// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add fade-in animation on scroll
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

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Add hover effect to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add click animation to info items
document.querySelectorAll('.info-item').forEach(item => {
    item.addEventListener('click', function() {
        this.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
});

// Add pulse animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(0.98);
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.glow, .bg-gradient').forEach(el => {
        el.style.animation = 'none';
    });
}

// Log page load time
window.addEventListener('load', () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                     window.performance.timing.navigationStart;
    console.log(`Səhifə yükləndı: ${loadTime}ms`);
});

// Add copy to clipboard for email and phone
document.querySelectorAll('.info-item').forEach(item => {
    const label = item.querySelector('.info-label').textContent;
    const value = item.querySelector('.info-value').textContent;
    
    if (label.includes('📧') || label.includes('📞')) {
        item.style.cursor = 'pointer';
        item.title = 'Kopyalamaq üçün klikləyin';
        
        item.addEventListener('click', () => {
            navigator.clipboard.writeText(value).then(() => {
                // Show success message
                const originalBg = item.style.background;
                item.style.background = 'rgba(0, 255, 100, 0.2)';
                
                setTimeout(() => {
                    item.style.background = originalBg;
                }, 500);
            }).catch(err => {
                console.error('Kopyalama xətası:', err);
            });
        });
    }
});