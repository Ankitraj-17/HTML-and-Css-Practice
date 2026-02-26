// Initialize Bootstrap Components
document.addEventListener('DOMContentLoaded', () => {
    // Tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(t => new bootstrap.Tooltip(t));

    // Popovers
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(p => new bootstrap.Popover(p));

    // Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.btn-lg, .navbar-brand');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Scroll Reactive Navbar
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    });

    // Form Validation Logic
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                event.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>SENDING_DATA...';
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerHTML = 'STREAM_SYCNED';
                    btn.classList.replace('btn-dark', 'btn-success');
                    console.log("AXIS-BRUTAL // Project inquiry committed.");
                }, 1500);
            }
            form.classList.add('was-validated');
        }, false);
    });
    // Ensure Calendar opens if linked
    const calendarLinks = document.querySelectorAll('a[href="#calendar-section"]');
    const calendarCollapse = document.getElementById('calendarCollapse');
    if (calendarCollapse) {
        calendarLinks.forEach(link => {
            link.addEventListener('click', () => {
                const bsCollapse = new bootstrap.Collapse(calendarCollapse, {
                    toggle: false
                });
                bsCollapse.show();
            });
        });
    }
});

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

console.log("AXIS-BRUTAL // Studio Runtime 3.0 // Enhanced Effects Active.");
