/* ===================================
   SMARTWATCH PRO X1 - MAIN JAVASCRIPT
   =================================== */

// Global variables
let currentQuantity = 1;
const basePrice = 1799000;
const rosePriceIncrement = 100000;

/* ===================================
   INITIALIZATION
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeQuantitySelector();
    initializePricing();
    initializeFormHandling();
    initializeScrollEffects();
    initializeAnimations();
    initializeUrgencyTimer();
    initializeAnalytics();
    
    console.log('SmartWatch Pro X1 - Landing page initialized');
}

/* ===================================
   QUANTITY & PRICING MANAGEMENT
   =================================== */

function initializeQuantitySelector() {
    // Set initial quantity
    updateQuantityDisplay();
    
    // Add event listener for variant changes
    const variantSelect = document.getElementById('variant');
    if (variantSelect) {
        variantSelect.addEventListener('change', updatePricing);
    }
}

function updateQuantity(change) {
    const newQuantity = currentQuantity + change;
    
    // Validate quantity (1-10 items max)
    if (newQuantity >= 1 && newQuantity <= 10) {
        currentQuantity = newQuantity;
        updateQuantityDisplay();
        updatePricing();
        
        // Track quantity change
        trackEvent('quantity_changed', { 
            quantity: currentQuantity,
            change: change 
        });
    }
}

function updateQuantityDisplay() {
    const quantityElement = document.getElementById('quantity');
    if (quantityElement) {
        quantityElement.textContent = currentQuantity;
    }
}

function updatePricing() {
    const variantSelect = document.getElementById('variant');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    if (!variantSelect || !subtotalElement || !totalElement) return;
    
    // Calculate base price based on variant
    let unitPrice = basePrice;
    if (variantSelect.value === 'rose') {
        unitPrice = basePrice + rosePriceIncrement;
    }
    
    // Calculate subtotal
    let subtotal = unitPrice * currentQuantity;
    
    // Apply bulk discount (10% for 2+ items)
    if (currentQuantity >= 2) {
        subtotal = Math.round(subtotal * 0.9);
    }
    
    // Update display
    subtotalElement.textContent = formatPrice(subtotal);
    totalElement.textContent = formatPrice(subtotal);
}

function formatPrice(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

/* ===================================
   FORM HANDLING
   =================================== */

function initializeFormHandling() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Add real-time validation
    addFormValidation();
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    showLoadingState(submitButton);
    
    // Collect form data
    const formData = new FormData(e.target);
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        variant: formData.get('variant'),
        quantity: currentQuantity,
        total: document.getElementById('total').textContent
    };
    
    // Validate required fields
    if (!validateOrderData(orderData)) {
        hideLoadingState(submitButton);
        return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = createWhatsAppMessage(orderData);
    const whatsappURL = `https://wa.me/6281234567890?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Track conversion
    trackEvent('order_submitted', {
        variant: orderData.variant,
        quantity: orderData.quantity,
        total: orderData.total
    });
    
    // Open WhatsApp and show success message
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
        showSuccessMessage();
        hideLoadingState(submitButton);
    }, 1000);
}

function validateOrderData(data) {
    const requiredFields = ['name', 'phone', 'address'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
        if (!data[field] || data[field].trim() === '') {
            missingFields.push(field);
        }
    });
    
    if (missingFields.length > 0) {
        showErrorMessage(`Mohon lengkapi: ${missingFields.join(', ')}`);
        return false;
    }
    
    // Validate phone number (basic)
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
        showErrorMessage('Format nomor WhatsApp tidak valid');
        return false;
    }
    
    return true;
}

function createWhatsAppMessage(data) {
    const variantNames = {
        'black': 'Midnight Black',
        'silver': 'Silver Premium', 
        'rose': 'Rose Gold'
    };
    
    return `Halo, saya mau order SmartWatch Pro X1:

📦 *DETAIL ORDER*
Nama: ${data.name}
HP: ${data.phone}
Alamat: ${data.address}
Varian: ${variantNames[data.variant] || data.variant}
Jumlah: ${data.quantity} unit
Total: ${data.total}

Mohon proses ordernya ya! 🙏

*Terima kasih sudah memilih SmartWatch Pro X1* ✨`;
}

function addFormValidation() {
    const inputs = document.querySelectorAll('#orderForm input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    
    if (!value) {
        showFieldError(field, 'Field ini wajib diisi');
        return false;
    }
    
    // Phone validation
    if (field.name === 'phone') {
        const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
            showFieldError(field, 'Format nomor tidak valid (contoh: 08123456789)');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#f5576c';
    errorDiv.style.fontSize = '0.9rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#f5576c';
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '#e2e8f0';
}

/* ===================================
   UI FEEDBACK
   =================================== */

function showLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
    button.textContent = '⏳ Memproses...';
}

function hideLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
    button.textContent = '🚀 PESAN SEKARANG - COD Tersedia!';
}

function showSuccessMessage() {
    const message = '✅ Terima kasih! Anda akan diarahkan ke WhatsApp untuk konfirmasi order. Tim kami akan segera memproses pesanan Anda!';
    
    // Create and show custom alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'custom-alert success';
    alertDiv.innerHTML = `
        <div class="alert-content">
            <div class="alert-icon">✅</div>
            <div class="alert-text">${message}</div>
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    alertDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 2px solid #22c55e;
        border-radius: 15px;
        padding: 1rem;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

function showErrorMessage(message) {
    alert(`❌ ${message}`);
}

/* ===================================
   SCROLL EFFECTS
   =================================== */

function initializeScrollEffects() {
    // Header scroll effect
    initializeHeaderScroll();
    
    // Fade in animations
    initializeFadeInAnimations();
    
    // Stats counter animation
    initializeStatsAnimation();
}

function initializeHeaderScroll() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    }, { passive: true });
}

function initializeFadeInAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

function initializeStatsAnimation() {
    const statsSection = document.querySelector('.social-proof');
    if (!statsSection) return;
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    statsObserver.observe(statsSection);
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const isPercentage = target.includes('%');
        const isPlus = target.includes('+');
        const isRating = target.includes('/');
        const isDuration = target.includes('/');
        
        let numericTarget;
        if (isRating) {
            numericTarget = parseFloat(target);
        } else {
            numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
        }
        
        let current = 0;
        const increment = numericTarget / 100;
        const duration = 2000; // 2 seconds
        const stepTime = duration / 100;
        
        const timer = setInterval(() => {
            current += increment;
            
            if (current >= numericTarget) {
                // Final value
                if (isRating) {
                    counter.textContent = numericTarget + '/5';
                } else if (isPercentage) {
                    counter.textContent = numericTarget + '%';
                } else if (isPlus) {
                    counter.textContent = numericTarget.toLocaleString('id-ID') + '+';
                } else if (isDuration) {
                    counter.textContent = numericTarget + '/7';
                } else {
                    counter.textContent = numericTarget.toLocaleString('id-ID');
                }
                clearInterval(timer);
            } else {
                // Animated value
                if (isRating) {
                    counter.textContent = current.toFixed(1) + '/5';
                } else if (isPercentage) {
                    counter.textContent = Math.floor(current) + '%';
                } else if (isPlus) {
                    counter.textContent = Math.floor(current).toLocaleString('id-ID') + '+';
                } else if (isDuration) {
                    counter.textContent = Math.floor(current) + '/7';
                } else {
                    counter.textContent = Math.floor(current).toLocaleString('id-ID');
                }
            }
        }, stepTime);
    });
}

/* ===================================
   SMOOTH SCROLLING
   =================================== */

function initializeAnimations() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Track navigation
                trackEvent('navigation_click', { 
                    target: this.getAttribute('href') 
                });
            }
        });
    });
    
    // Add hover effects for feature cards
    initializeHoverEffects();
}

function initializeHoverEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
}

/* ===================================
   URGENCY TIMER
   =================================== */

function initializeUrgencyTimer() {
    updateUrgencyTimer();
    // Update every minute
    setInterval(updateUrgencyTimer, 60000);
}

function updateUrgencyTimer() {
    const urgencyElement = document.querySelector('.urgency');
    if (!urgencyElement) return;
    
    const now = new Date();
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const timeLeft = endOfDay - now;
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0 || minutes > 0) {
        urgencyElement.textContent = `🔥 FLASH SALE - Sisa ${hours}j ${minutes}m Lagi!`;
    } else {
        urgencyElement.textContent = '🔥 FLASH SALE - Berakhir Tengah Malam!';
    }
}

/* ===================================
   ANALYTICS & TRACKING
   =================================== */

function initializeAnalytics() {
    // Track page view
    trackEvent('page_view', { 
        page: 'landing_smartwatch',
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
    });
    
    // Track CTA clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            trackEvent('cta_click', { 
                button_text: this.textContent.trim(),
                button_class: this.className,
                section: getParentSection(this)
            });
        });
    });
    
    // Track scroll depth
    initializeScrollTracking();
    
    // Track time on page
    trackTimeOnPage();
}

function trackEvent(eventName, data = {}) {
    // Enhanced event tracking with more context
    const eventData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        page_url: window.location.href,
        referrer: document.referrer,
        ...data
    };
    
    // In production, send to your analytics service (GA4, Mixpanel, etc.)
    console.log('📊 Analytics Event:', eventData);
    
    // Example: Send to Google Analytics 4
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', eventName, data);
    // }
    
    // Example: Send to custom analytics endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(eventData)
    // });
}

function getParentSection(element) {
    const section = element.closest('section');
    return section ? section.className.split(' ')[0] : 'unknown';
}

function initializeScrollTracking() {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90];
    const trackedMilestones = new Set();
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
                    trackedMilestones.add(milestone);
                    trackEvent('scroll_depth', { 
                        depth: `${milestone}%`,
                        max_scroll: maxScroll 
                    });
                }
            });
        }
    }, { passive: true });
}

function trackTimeOnPage() {
    const startTime = Date.now();
    
    // Track when user leaves the page
    window.addEventListener('beforeunload', function() {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('time_on_page', { 
            seconds: timeSpent,
            minutes: Math.round(timeSpent / 60)
        });
    });
    
    // Track engagement milestones
    const engagementMilestones = [30, 60, 120, 300]; // seconds
    
    engagementMilestones.forEach(milestone => {
        setTimeout(() => {
            trackEvent('engagement_milestone', { 
                milestone: `${milestone}s`,
                still_active: document.hasFocus()
            });
        }, milestone * 1000);
    });
}

/* ===================================
   CART MANAGEMENT
   =================================== */

function addToCart() {
    const cartData = {
        product: 'SmartWatch Pro X1',
        variant: document.getElementById('variant')?.value || 'black',
        quantity: currentQuantity,
        price: document.getElementById('total')?.textContent || 'Rp 1.799.000',
        timestamp: new Date().toISOString()
    };
    
    // Track add to cart event
    trackEvent('add_to_cart', cartData);
    
    // In production, you might save this to localStorage or send to server
    // Note: localStorage not used here due to Claude restrictions
    console.log('🛒 Cart Data:', cartData);
    
    return cartData;
}

/* ===================================
   ERROR HANDLING
   =================================== */

function handleError(error, context = 'general') {
    console.error(`Error in ${context}:`, error);
    
    // Track error
    trackEvent('javascript_error', {
        error_message: error.message,
        context: context,
        stack: error.stack,
        user_agent: navigator.userAgent
    });
    
    // Show user-friendly message for critical errors
    if (context === 'form_submission' || context === 'payment') {
        showErrorMessage('Terjadi kesalahan. Mohon coba lagi atau hubungi customer service.');
    }
}

// Global error handler
window.addEventListener('error', function(e) {
    handleError(e.error, 'global');
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    handleError(new Error(e.reason), 'promise_rejection');
});

/* ===================================
   PERFORMANCE MONITORING
   =================================== */

function monitorPerformance() {
    // Monitor page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            
            trackEvent('page_performance', {
                load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                first_paint: Math.round(performance.getEntriesByType('paint')[0]?.startTime || 0)
            });
        }, 1000);
    });
}

/* ===================================
   ACCESSIBILITY HELPERS
   =================================== */

function enhanceAccessibility() {
    // Add keyboard navigation for custom elements
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Announce important changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Announce quantity changes
    const originalUpdateQuantity = window.updateQuantity;
    window.updateQuantity = function(change) {
        originalUpdateQuantity(change);
        announceToScreenReader(`Kuantitas diubah menjadi ${currentQuantity}`);
    };
}

/* ===================================
   MOBILE OPTIMIZATIONS
   =================================== */

function optimizeForMobile() {
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Add mobile-specific optimizations
        document.body.classList.add('mobile-device');
        
        // Optimize touch interactions
        document.querySelectorAll('.btn, .feature-card').forEach(element => {
            element.style.touchAction = 'manipulation';
        });
        
        // Prevent zoom on input focus (iOS)
        document.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
    }
}

/* ===================================
   INITIALIZE EVERYTHING
   =================================== */

// Run additional optimizations after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    monitorPerformance();
    enhanceAccessibility();
    optimizeForMobile();
});

// Export functions for global access
window.updateQuantity = updateQuantity;
window.addToCart = addToCart;
window.trackEvent = trackEvent;

/* ===================================
   SERVICE WORKER REGISTRATION (PWA)
   =================================== */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registered successfully');
                trackEvent('pwa_service_worker_registered');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

/* ===================================
   END OF FILE
   =================================== */
