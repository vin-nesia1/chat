# 🚀 ProMax Landing Page

Landing page profesional yang responsif dan modern untuk produk/bisnis Anda dengan integrasi WhatsApp dan fitur SEO-friendly.

## 📁 Struktur File

```
promax-landing/
├── index.html          # File HTML utama
├── css/
│   └── styles.css      # File CSS styling
├── js/
│   └── script.js       # File JavaScript
├── images/             # Folder untuk gambar (buat manual)
│   ├── logo.png
│   ├── hero-image.jpg
│   └── testimonial-1.jpg
└── README.md           # Dokumentasi ini
```

## 🎯 Fitur Utama

- ✅ **Desain Modern & Responsif** - Mobile-first design
- ✅ **SEO Optimized** - Meta tags lengkap dan struktur HTML semantic
- ✅ **Loading Cepat** - Optimized CSS & JS
- ✅ **Integrasi WhatsApp** - Tombol WhatsApp floating dan form terintegrasi
- ✅ **Form Kontak** - Form yang mengarah ke WhatsApp
- ✅ **Animasi Smooth** - Scroll animations dan micro-interactions
- ✅ **3 Paket Harga** - Pricing table yang mudah dikustomisasi
- ✅ **Testimonial** - Section untuk review pelanggan
- ✅ **Mobile Navigation** - Hamburger menu untuk mobile

## 🛠 Instalasi & Setup

### 1. Download Files
- Download semua file dan buat struktur folder seperti di atas
- Pastikan semua file berada di lokasi yang benar

### 2. Setup Folder Images
Buat folder `images/` dan tambahkan gambar berikut:
- `logo.png` - Logo website (ukuran: 200x60px)
- `hero-image.jpg` - Gambar hero section (ukuran: 600x400px)
- `testimonial-*.jpg` - Foto testimonial (ukuran: 100x100px)

### 3. Buka Website
- Buka file `index.html` di browser
- Atau upload ke web hosting/server

## 📝 Cara Mengubah Data Website

### 🏷 Mengubah Nama Website & Brand

**File: `index.html`**
```html
<!-- Ganti di bagian title -->
<title>ProMax - Solusi Terbaik untuk Bisnis Anda</title>

<!-- Ganti di bagian navbar -->
<div class="nav-brand">
    <h1>ProMax</h1>  <!-- Ganti "ProMax" -->
</div>

<!-- Ganti di bagian hero -->
<h1 class="hero-title">Revolusi Bisnis Anda dengan <span class="highlight">ProMax</span></h1>

<!-- Ganti di bagian footer -->
<div class="footer-brand">
    <h3>ProMax</h3>  <!-- Ganti "ProMax" -->
</div>
```

### 🎨 Mengubah Warna Website

**File: `css/styles.css`**
```css
/* Warna Utama - Cari dan ganti kode warna berikut: */

/* Warna Biru Utama */
#6366f1 → #YOUR_COLOR  /* Ganti dengan warna pilihan Anda */

/* Warna Gradient Hero */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
/* Ganti dengan: */
background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);

/* Warna Tombol */
background: linear-gradient(45deg, #ff6b6b, #ee5a52);
/* Ganti dengan warna tombol pilihan Anda */
```

### 📱 Mengubah Nomor WhatsApp

**File: `js/script.js`**
```javascript
// Cari dan ganti nomor berikut:
const phoneNumber = '6281234567890'; // Ganti dengan nomor Anda

// Format: 62 + nomor (tanpa 0 di depan)
// Contoh: 081234567890 → 6281234567890
```

**File: `index.html`**
```html
<!-- Cari dan ganti link WhatsApp -->
<a href="https://wa.me/6281234567890?text=..." target="_blank">
<!-- Ganti 6281234567890 dengan nomor Anda -->
```

### ✍️ Mengubah Konten Text

**File: `index.html`**

**Hero Section:**
```html
<h1 class="hero-title">Revolusi Bisnis Anda dengan <span class="highlight">ProMax</span></h1>
<p class="hero-subtitle">Tingkatkan produktivitas bisnis hingga 300%...</p>
<!-- Ganti dengan headline dan deskripsi produk Anda -->
```

**Stats/Statistik:**
```html
<div class="stat">
    <span class="stat-number">10,000+</span>
    <span class="stat-label">Pengguna Aktif</span>
</div>
<!-- Ganti angka dan label sesuai data bisnis Anda -->
```

**Fitur/Features:**
```html
<div class="feature-card">
    <div class="feature-icon">
        <i class="fas fa-lightning-bolt"></i> <!-- Ganti icon -->
    </div>
    <h3>Performa Super Cepat</h3> <!-- Ganti judul fitur -->
    <p>Loading time di bawah 2 detik...</p> <!-- Ganti deskripsi -->
</div>
```

### 💰 Mengubah Paket Harga

**File: `index.html`**
```html
<div class="pricing-card">
    <div class="pricing-header">
        <h3>Starter</h3> <!-- Nama paket -->
        <div class="price">
            <span class="currency">Rp</span>
            <span class="amount">299K</span> <!-- Harga -->
            <span class="period">/bulan</span>
        </div>
    </div>
    <ul class="pricing-features">
        <li><i class="fas fa-check"></i>Hingga 1,000 transaksi</li>
        <!-- Tambah/kurang fitur sesuai kebutuhan -->
    </ul>
</div>
```

### 👥 Mengubah Testimonial

**File: `index.html`**
```html
<div class="testimonial-card">
    <div class="testimonial-content">
        <div class="stars">
            <!-- 5 bintang, kurangi jika rating lebih rendah -->
        </div>
        <p>"ProMax mengubah total cara kami..."</p> <!-- Ganti testimoni -->
    </div>
    <div class="testimonial-author">
        <img src="images/testimonial-1.jpg" alt="Nama"> <!-- Ganti foto -->
        <div>
            <h4>Budi Santoso</h4> <!-- Ganti nama -->
            <span>CEO, TechStart Indonesia</span> <!-- Ganti jabatan -->
        </div>
    </div>
</div>
```

### 📧 Mengubah Informasi Kontak

**File: `index.html`**
```html
<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-phone"></i>
    </div>
    <div>
        <h4>Telepon</h4>
        <p>+62 812-3456-7890</p> <!-- Ganti nomor -->
    </div>
</div>

<div class="contact-item">
    <div class="contact-icon">
        <i class="fas fa-envelope"></i>
    </div>
    <div>
        <h4>Email</h4>
        <p>support@promax.co.id</p> <!-- Ganti email -->
    </div>
</div>
```

### 🔍 Mengubah SEO (Meta Tags)

**File: `index.html`**
```html
<head>
    <title>ProMax - Solusi Terbaik untuk Bisnis Anda</title>
    <meta name="description" content="Deskripsi website Anda untuk Google">
    <meta name="keywords" content="kata, kunci, produk, anda">
    
    <!-- Tambahan untuk social media -->
    <meta property="og:title" content="Nama Website Anda">
    <meta property="og:description" content="Deskripsi untuk Facebook/WhatsApp">
    <meta property="og:image" content="images/og-image.jpg">
    <meta property="og:url" content="https://website-anda.com">
</head>
```

## 🎨 Kustomisasi Lanjutan

### Mengubah Font
**File: `css/styles.css`**
```css
/* Ganti Google Fonts di bagian atas */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

/* Kemudian ganti font-family */
body {
    font-family: 'Poppins', sans-serif; /* Ganti dengan font pilihan */
}
```

### Mengubah Animasi
**File: `css/styles.css`**
```css
/* Untuk mempercepat/memperlambat animasi */
.btn {
    transition: all 0.3s ease; /* Ganti 0.3s dengan durasi lain */
}

/* Untuk mengubah efek hover */
.btn:hover {
    transform: translateY(-3px); /* Ganti nilai sesuai keinginan */
}
```

## 📱 Integrasi WhatsApp Lanjutan

### Setup Pesan Otomatis
**File: `js/script.js`**
```javascript
function openWhatsApp(packageType) {
    const phoneNumber = '6281234567890'; // Nomor Anda
    let message = `Halo, saya tertarik dengan paket ${packageType}.`;
    
    // Tambah informasi lebih detail
    message += ` Saya ingin mengetahui lebih lanjut tentang:
    - Fitur yang tersedia
    - Cara pembayaran  
    - Waktu implementasi
    
    Terima kasih!`;
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}
```

### Tombol WhatsApp Kustom
**File: `css/styles.css`**
```css
.whatsapp-float {
    /* Ubah posisi */
    bottom: 30px;  /* Jarak dari bawah */
    right: 30px;   /* Jarak dari kanan */
    
    /* Ubah ke kiri */
    left: 30px;
    right: auto;
}

.whatsapp-float a {
    /* Ubah ukuran */
    width: 70px;   /* Lebar */
    height: 70px;  /* Tinggi */
    
    /* Ubah warna */
    background: #075e54; /* Warna WhatsApp gelap */
}
```

## 🌐 Upload ke Hosting

### 1. Upload Files
- Upload semua file ke folder public_html (cPanel) atau www (hosting lain)
- Pastikan struktur folder tetap sama

### 2. Setup Domain
- Arahkan domain ke folder website
- Tunggu propagasi DNS (1-24 jam)

### 3. SSL Certificate
- Aktifkan SSL di hosting panel
- Ubah semua link HTTP menjadi HTTPS

### 4. Google Analytics (Opsional)
**File: `index.html`** - Tambah sebelum `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🐛 Troubleshooting

### WhatsApp Tidak Berfungsi
1. Periksa nomor WhatsApp (format: 6281234567890)
2. Pastikan nomor aktif dan terdaftar WhatsApp Business
3. Test link WhatsApp secara manual

### Website Tidak Responsive
1. Periksa meta viewport di `<head>`
2. Pastikan CSS media queries tidak tertimpa
3. Test di berbagai device/browser

### Loading Lambat
1. Compress gambar (gunakan TinyPNG)
2. Minify CSS/JS (gunakan online minifier)
3. Gunakan CDN untuk assets external

### Form Tidak Berfungsi
1. Periksa JavaScript console untuk error
2. Pastikan semua ID form sudah benar
3. Test fungsi WhatsApp integration

## 🔧 Tools Rekomendasi

### Untuk Edit Code:
- **Visual Studio Code** (Free)
- **Sublime Text** 
- **Notepad++** (Windows)

### Untuk Gambar:
- **TinyPNG** - Compress gambar
- **Canva** - Design banner/logo
- **Unsplash** - Stock photos gratis

### Untuk Testing:
- **Google PageSpeed Insights** - Cek kecepatan
- **GTmetrix** - Performance testing
- **BrowserStack** - Cross-browser testing

## 📞 Support

Jika mengalami kesulitan dalam kustomisasi:

1. **Backup** - Selalu backup file sebelum edit
2. **Test** - Test setiap perubahan di browser
3. **Dokumentasi** - Catat setiap perubahan yang dibuat

## 📜 License

Website template ini dapat digunakan untuk:
- ✅ Proyek komersial
- ✅ Proyek personal  
- ✅ Client projects
- ✅ Modifikasi dan distribusi

## 🚀 Tips Optimasi SEO

### 1. Content is King
- Tulis konten original dan berkualitas
- Gunakan keyword alami dalam text
- Update konten secara berkala

### 2. Technical SEO
- Pastikan semua gambar punya alt text
- Gunakan heading tags (H1, H2, H3) dengan benar
- Buat sitemap.xml

### 3. Page Speed
- Optimize gambar (WebP format)
- Minify CSS/JS
- Gunakan caching

### 4. Mobile-First
- Test di Google Mobile-Friendly Test
- Pastikan semua element bisa diklik di mobile
- Font minimal 16px untuk readability

---

**🎉 Selamat! Website landing page Anda siap digunakan!**

Jangan lupa untuk:
- ✅ Ganti semua placeholder dengan data real
- ✅ Test semua fitur sebelum go-live  
- ✅ Setup Google Analytics untuk tracking
- ✅ Backup website secara berkala
