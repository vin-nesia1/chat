// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// WhatsApp Integration Functions
function openWhatsApp(packageType) {
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
    let message = `Halo, saya tertarik dengan paket ${packageType} ProMax. `;
    
    switch(packageType) {
        case 'starter':
            message += 'Bisakah Anda memberikan informasi lebih lanjut tentang paket Starter (Rp 299K/bulan)?';
            break;
        case 'professional':
            message += 'Bisakah Anda memberikan informasi lebih lanjut tentang paket Professional (Rp 599K/bulan)?';
            break;
        case 'enterprise':
            message += 'Bisakah Anda memberikan informasi lebih lanjut tentang paket Enterprise (Rp 1.2JT/bulan)?';
            break;
        default:
            message += 'Bisakah Anda memberikan informasi lebih lanjut?';
    }
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const package = formData.get('package');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !phone) {
        showNotification('Harap lengkapi semua field yang wajib diisi!', 'error');
        return;
    }
    
    // Create WhatsApp message
    let whatsappMessage = `*Pesan Baru dari Website ProMax*\n\n`;
    whatsappMessage += `*Nama:* ${name}\n`;
    whatsappMessage += `*Email:* ${email}\n`;
    whatsappMessage += `*WhatsApp:* ${phone}\n`;
    
    if (package) {
        const packageNames = {
            'starter': 'Starter - Rp 299K/bulan',
            'professional': 'Professional - Rp 599K/bulan',
            'enterprise': 'Enterprise - Rp 1.2JT/bulan'
        };
        whatsappMessage += `*Paket:* ${packageNames[package]}\n`;
    }
    
    if (message) {
        whatsappMessage += `*Pesan:* ${message}\n`;
    }
    
    // Send to WhatsApp
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    showNotification('Pesan berhasil disiapkan! Anda akan diarahkan ke WhatsApp.', 'success');
    
    // Reset form
    this.reset();
    
    // Redirect to WhatsApp after short delay
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 1500);
});

// Email Form Handler (Alternative)
function sendEmail(formData) {
    // Ini adalah contoh implementasi untuk mengirim email
    // Anda perlu mengintegrasikan dengan service email seperti EmailJS
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const package = formData.get('package');
    const message = formData.get('message');
    
    // Contoh integrasi dengan EmailJS
    // emailjs.send('service_id', 'template_id', {
    //     from_name: name,
    //     from_email: email,
    //     phone: phone,
    //     package: package,
    //     message: message
    // }).then(() => {
    //     showNotification('Pesan berhasil dikirim!', 'success');
    // }).catch(() => {
    //     showNotification('Gagal mengirim pesan. Silakan coba lagi.', 'error');
    // });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Add notification animation styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(notificationStyles);

// Scroll animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .testimonial-card, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numTarget = parseInt(target.replace(/[^\d]/g, ''));
        const increment = numTarget / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < numTarget) {
                current += increment;
                if (target.includes('+')) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else if (target.includes('%')) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (target.includes('/')) {
                    counter.textContent = (current / 10).toFixed(1) + '/5';
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Loading Screen (Optional)
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Add mobile menu styles
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            right: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            transition: right 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.active {
            right: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .nav-link {
            font-size: 1.2rem;
            padding: 1rem;
        }
    }
`;
document.head.appendChild(mobileMenuStyles);
