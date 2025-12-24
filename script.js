// Fade-in animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Copy to clipboard for email
document.querySelectorAll('.info-item.copiable').forEach(item => {
    item.addEventListener('click', function() {
        const textToCopy = this.getAttribute('data-copy');
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.classList.add('copied');
            
            setTimeout(() => {
                this.classList.remove('copied');
            }, 600);
        }).catch(err => {
            console.error('Kopyalama xətası:', err);
        });
    });
});

// Performance optimization
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.shape').forEach(el => {
        el.style.animation = 'none';
    });
}