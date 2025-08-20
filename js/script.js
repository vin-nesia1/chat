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
// KONFIGURASI WEBSITE
// File ini memudahkan Anda mengubah pengaturan website tanpa mencari di berbagai file

const WEBSITE_CONFIG = {
    // INFORMASI BISNIS
    businessName: "ProMax",
    tagline: "Solusi Terbaik untuk Bisnis Anda",
    description: "ProMax adalah solusi terbaik untuk mengoptimalkan bisnis Anda dengan teknologi terdepan dan layanan profesional",
    
    // KONTAK INFORMASI
    contact: {
        whatsapp: "6281234567890", // Format: 62 + nomor tanpa 0
        email: "support@promax.co.id",
        phone: "+62 812-3456-7890",
        address: "Jl. Sudirman No. 123, Jakarta Pusat"
    },
    
    // SOCIAL MEDIA
    socialMedia: {
        facebook: "https://facebook.com/promax",
        twitter: "https://twitter.com/promax",
        instagram: "https://instagram.com/promax",
        linkedin: "https://linkedin.com/company/promax"
    },
    
    // PAKET HARGA
    pricingPackages: [
        {
            name: "Starter",
            price: "299K",
            period: "/bulan",
            features: [
                "Hingga 1,000 transaksi",
                "Dashboard analytics basic", 
                "Support email",
                "SSL certificate"
            ],
            popular: false
        },
        {
            name: "Professional", 
            price: "599K",
            period: "/bulan",
            features: [
                "Hingga 10,000 transaksi",
                "Dashboard analytics advanced",
                "Support 24/7", 
                "API access",
                "Custom integrations"
            ],
            popular: true
        },
        {
            name: "Enterprise",
            price: "1.2JT", 
            period: "/bulan",
            features: [
                "Unlimited transaksi",
                "Custom dashboard",
                "Dedicated support",
                "White-label solution", 
                "SLA 99.9% uptime"
            ],
            popular: false
        }
    ],
    
    // TESTIMONIAL
    testimonials: [
        {
            name: "Budi Santoso",
            position: "CEO, TechStart Indonesia",
            image: "images/testimonial-1.jpg",
            rating: 5,
            text: "ProMax mengubah total cara kami menjalankan bisnis. Revenue naik 250% dalam 3 bulan!"
        },
        {
            name: "Sarah Williams", 
            position: "Marketing Director, Global Dynamics",
            image: "images/testimonial-2.jpg",
            rating: 5,
            text: "Tim support yang luar biasa responsif. Masalah teknis diselesaikan dalam hitungan menit!"
        },
        {
            name: "Ahmad Rahman",
            position: "Operations Manager, SmartBiz", 
            image: "images/testimonial-3.jpg",
            rating: 5,
            text: "Interface yang sangat user-friendly. Tim kami langsung bisa menggunakannya tanpa training khusus."
        }
    ],
    
    // STATISTIK/STATS
    stats: [
        {
            number: "10,000+",
            label: "Pengguna Aktif"
        },
        {
            number: "99.9%", 
            label: "Uptime"
        },
        {
            number: "4.9/5",
            label: "Rating"
        }
    ],
    
    // FITUR PRODUK
    features: [
        {
            icon: "fas fa-lightning-bolt",
            title: "Performa Super Cepat",
            description: "Loading time di bawah 2 detik dengan teknologi cloud terdepan"
        },
        {
            icon: "fas fa-mobile-alt",
            title: "Mobile First", 
            description: "Responsif sempurna di semua perangkat, desktop hingga smartphone"
        },
        {
            icon: "fas fa-lock",
            title: "Keamanan Tingkat Bank",
            description: "Enkripsi SSL 256-bit dan backup otomatis setiap hari"
        },
        {
            icon: "fas fa-headset", 
            title: "Support 24/7",
            description: "Tim support profesional siap membantu kapan saja Anda membutuhkan"
        },
        {
            icon: "fas fa-chart-bar",
            title: "Analytics Mendalam",
            description: "Dashboard analytics lengkap untuk memantau performa bisnis Anda"
        },
        {
            icon: "fas fa-sync-alt",
            title: "Integrasi Mudah", 
            description: "Integrasi seamless dengan tools favorit Anda dalam hitungan menit"
        }
    ],
    
    // SEO SETTINGS
    seo: {
        keywords: "produk, bisnis, solusi, teknologi, profesional, promax",
        ogImage: "images/og-image.jpg",
        favicon: "images/favicon.ico"
    },
    
    // WARNA TEMA (HEX Codes)
    colors: {
        primary: "#6366f1",      // Warna utama
        secondary: "#ff6b6b",    // Warna aksen  
        success: "#10b981",      // Warna sukses
        warning: "#f59e0b",      // Warna warning
        danger: "#ef4444",       // Warna error
        dark: "#1f2937",         // Warna gelap
        light: "#f8fafc"         // Warna terang
    }
};

// FUNGSI UNTUK MENGAPLIKASIKAN KONFIGURASI
function applyConfig() {
    // Update title halaman
    document.title = `${WEBSITE_CONFIG.businessName} - ${WEBSITE_CONFIG.tagline}`;
    
    // Update meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', WEBSITE_CONFIG.description);
    }
    
    // Update nomor WhatsApp di semua link
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const currentHref = link.getAttribute('href');
        const newHref = currentHref.replace(/wa\.me\/\d+/, `wa.me/${WEBSITE_CONFIG.contact.whatsapp}`);
        link.setAttribute('href', newHref);
    });
    
    // Update informasi kontak
    updateContactInfo();
}

function updateContactInfo() {
    // Update email
    const emailElements = document.querySelectorAll('[data-contact="email"]');
    emailElements.forEach(el => {
        el.textContent = WEBSITE_CONFIG.contact.email;
        if (el.tagName === 'A') {
            el.setAttribute('href', `mailto:${WEBSITE_CONFIG.contact.email}`);
        }
    });
    
    // Update phone  
    const phoneElements = document.querySelectorAll('[data-contact="phone"]');
    phoneElements.forEach(el => {
        el.textContent = WEBSITE_CONFIG.contact.phone;
        if (el.tagName === 'A') {
            el.setAttribute('href', `tel:${WEBSITE_CONFIG.contact.phone}`);
        }
    });
}

// Jalankan konfigurasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
    applyConfig();
});

// Export konfigurasi untuk digunakan di file lain
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WEBSITE_CONFIG;
}
