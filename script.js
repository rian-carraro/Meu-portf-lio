// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Initialize AOS after loading screen disappears
        setTimeout(() => {
            AOS.init({
                duration: 1000,
                once: true,
                offset: 100,
                easing: 'ease-in-out'
            });
        }, 500);
    }, 2000);
});

// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Lock body scroll when mobile menu is open
    document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Calcular altura do header e expor como CSS var para evitar sobreposição do título
function updateHeaderHeightVar() {
    const header = document.querySelector('.navbar');
    if (!header) return;
    const h = header.offsetHeight;
    document.documentElement.style.setProperty('--header-height', h + 'px');
}
updateHeaderHeightVar();
window.addEventListener('resize', () => {
    // Debounce simples
    clearTimeout(window.__hdrTimer);
    window.__hdrTimer = setTimeout(updateHeaderHeightVar, 100);
});
// Recalcular após fontes carregarem e AOS ajustar layout
window.addEventListener('load', () => setTimeout(updateHeaderHeightVar, 300));

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero title (only 'Desenvolvedor' on second line)
const typingText = document.querySelector('.hero-title-line2.typing-effect');
if (typingText) {
    const words = ['Desenvolvedor'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 80 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400;
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect after page loads
    setTimeout(typeEffect, 1500);
}

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animated counters for statistics
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 50);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

// Skills progress animation
const skillProgress = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 500);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillProgress.forEach(progress => {
    skillObserver.observe(progress);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || (document.querySelector('.navbar')?.offsetHeight) || 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button functionality
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============================================
// 🔧 CONFIGURAÇÃO EMAILJS - ALTERE AQUI:
// =============================================
const EMAIL_CONFIG = {
    publicKey: "CiURYUy5nh-KIxWVg",  // ✅ Sua Public Key
    serviceId: "service_befz2yk", // ❌ PRECISA ALTERAR - Ex: service_gmail_abc123
    templateId: "template_c5aihi3" // ❌ PRECISA ALTERAR - Ex: template_contact_xyz789
};

// Contact form handling
const contactForm = document.querySelector('.contact-form');

// Inicializar EmailJS
(function() {
    emailjs.init({
        publicKey: EMAIL_CONFIG.publicKey,
    });
})();

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, preencha todos os campos!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Por favor, insira um email válido!', 'error');
        return;
    }
    
    // Preparar dados para envio
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_name: 'Rian Carraro', // Seu nome
        reply_to: email
    };
    
    // Enviar email
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    emailjs.send(EMAIL_CONFIG.serviceId, EMAIL_CONFIG.templateId, templateParams)
        .then(function(response) {
            console.log('Email enviado com sucesso!', response.status, response.text);
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            contactForm.reset();
        })
        .catch(function(error) {
            console.error('Erro ao enviar email:', error);
            showNotification('Erro ao enviar mensagem. Tente novamente mais tarde.', 'error');
        })
        .finally(function() {
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.classList.add('removing');
        setTimeout(() => notification.remove(), 300);
    });
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

// Helper function to close notification
function closeNotification(notification) {
    notification.classList.add('removing');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});

// Form input animation enhancements
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentNode.classList.remove('focused');
        }
    });
    
    // Check if input has value on page load
    if (input.value) {
        input.parentNode.classList.add('focused');
    }
});

// Add loading animation to buttons
const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Image lazy loading simulation
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
            imageObserver.unobserve(img);
        }
    });
});

// Observe only images marked to lazy-fade
document.querySelectorAll('img[data-lazy]').forEach(img => {
    img.style.opacity = '0';
    imageObserver.observe(img);
});

// Mobile: clicar no bloco de serviços abre a página de projetos em modo lista
(function enableMobileServiceRedirect(){
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (!isMobile) return; // somente mobile
    const cards = document.querySelectorAll('.services-grid .service-card');
    if (!cards.length) return;
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const titleEl = card.querySelector('.service-title');
            const t = (titleEl?.textContent || '').toLowerCase();
            let cat = 'geral';
            if (t.includes('3d')) cat = '3d';
            else if (t.includes('2d')) cat = '2d';
            else if (t.includes('final')) cat = 'final';
            else if (t.includes('render')) cat = 'render';
            else if (t.includes('web')) cat = 'web';
            const url = `project.html?view=list&cat=${encodeURIComponent(cat)}`;
            window.location.href = url;
        });
    });
})();

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCategory = document.getElementById('lightbox-category');
const prevBtn = document.getElementById('lightbox-prev');
const nextBtn = document.getElementById('lightbox-next');
const thumbsContainer = document.getElementById('lightbox-thumbs');

let currentIndex = 0;
let visibleItems = Array.from(document.querySelectorAll('.portfolio-item'));
let currentGallery = [];
let currentImageIndex = 0;

function openLightbox(index) {
    const item = visibleItems[index];
    if (!item) return;

    const imagesAttr = item.getAttribute('data-images') || item.getAttribute('data-image') || '';
    const images = imagesAttr.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
    currentGallery = images.length ? images : [item.getAttribute('data-image')].filter(Boolean);
    currentImageIndex = 0;

    const img = currentGallery[0] || '';
    const title = item.getAttribute('data-title');
    const desc = item.getAttribute('data-description');
    const cat = item.getAttribute('data-category');

    lightboxImage.src = img || '';
    lightboxTitle.textContent = title || '';
    lightboxDescription.textContent = desc || '';
    lightboxCategory.textContent = cat ? cat.toUpperCase() : '';

    // Build thumbnails
    thumbsContainer.innerHTML = '';
    currentGallery.forEach((src, i) => {
        const t = document.createElement('img');
        t.src = src;
        if (i === 0) t.classList.add('active');
        t.addEventListener('click', () => {
            currentImageIndex = i;
            updateLightboxImage();
        });
        thumbsContainer.appendChild(t);
    });

    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateVisibleItems() {
    visibleItems = Array.from(document.querySelectorAll('.portfolio-item')).filter(i => i.style.display !== 'none');
}

// Bind preview clicks
document.querySelectorAll('.portfolio-item .fa-eye').forEach((eyeIcon, idx) => {
    eyeIcon.parentElement.addEventListener('click', (e) => {
        e.preventDefault();
        updateVisibleItems();
        // Find index of the item clicked among visible items
        const itemEl = eyeIcon.closest('.portfolio-item');
        currentIndex = visibleItems.indexOf(itemEl);
        if (currentIndex < 0) currentIndex = 0;
        openLightbox(currentIndex);
    });
});

function updateLightboxImage() {
    const src = currentGallery[currentImageIndex];
    if (!src) return;
    lightboxImage.style.opacity = '0';
    setTimeout(() => {
        lightboxImage.src = src;
        lightboxImage.onload = () => {
            lightboxImage.style.opacity = '1';
        };
    }, 150);
    // update thumbs active
    if (thumbsContainer) {
        Array.from(thumbsContainer.querySelectorAll('img')).forEach((img, i) => {
            img.classList.toggle('active', i === currentImageIndex);
        });
    }
}

// Navigation buttons
prevBtn.addEventListener('click', () => {
    updateVisibleItems();
    // navigate gallery first
    if (currentGallery.length > 1 && currentImageIndex > 0) {
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
        return;
    }
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    openLightbox(currentIndex);
});

nextBtn.addEventListener('click', () => {
    updateVisibleItems();
    // navigate gallery first
    if (currentGallery.length > 1 && currentImageIndex < currentGallery.length - 1) {
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        updateLightboxImage();
        return;
    }
    currentIndex = (currentIndex + 1) % visibleItems.length;
    openLightbox(currentIndex);
});

// Close handlers
lightbox.addEventListener('click', (e) => {
    if (e.target.dataset.close === 'true') {
        closeLightbox();
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
});

// Basic swipe gestures for lightbox on touch devices
(function addLightboxSwipe() {
    let touchStartX = 0;
    let touchEndX = 0;
    const threshold = 50; // min px to consider a swipe
    const surface = document.querySelector('.lightbox-content') || lightbox;
    if (!surface) return;
    surface.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    surface.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const deltaX = touchEndX - touchStartX;
        if (Math.abs(deltaX) > threshold) {
            if (deltaX < 0) {
                nextBtn.click();
            } else {
                prevBtn.click();
            }
        }
    }, { passive: true });
})();

// Mouse cursor trail effect (optional)
let isMouseTrailEnabled = false; // Set to true to enable

if (isMouseTrailEnabled) {
    const trail = [];
    const trailLength = 20;
    
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: ${1 - (i / trailLength)};
        `;
        document.body.appendChild(dot);
        trail.push(dot);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateTrail() {
        let x = mouseX;
        let y = mouseY;
        
        trail.forEach((dot, index) => {
            const nextDot = trail[index + 1] || trail[0];
            
            dot.style.left = x - 2 + 'px';
            dot.style.top = y - 2 + 'px';
            
            if (nextDot) {
                x += (parseFloat(nextDot.style.left) - x) * 0.3;
                y += (parseFloat(nextDot.style.top) - y) * 0.3;
            }
        });
        
        requestAnimationFrame(animateTrail);
    }
    
    animateTrail();
}

// Console welcome message
console.log(`
    🎨 Portfolio Website Loaded Successfully! 🎨
    
    Features included:
    ✅ Responsive Design
    ✅ Smooth Animations
    ✅ Interactive Portfolio Filter
    ✅ Contact Form
    ✅ Loading Screen
    ✅ Back to Top Button
    ✅ Navigation Effects
    ✅ Typing Animation
    ✅ Counter Animation
    ✅ Skills Progress Bars
    
    Made with ❤️ by GitHub Copilot
`);

// Performance monitoring
const performanceObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            console.log(`Page load time: ${entry.loadEventEnd - entry.loadEventStart}ms`);
        }
    }
});

performanceObserver.observe({ entryTypes: ['navigation'] });