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
