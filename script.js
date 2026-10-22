document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. GERENCIAMENTO DE CONSENTIMENTO LGPD (Robusto)
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    
    function checkConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            setTimeout(() => cookieBanner.classList.add('show'), 1500);
        } else if (consent === 'accepted') {
            activateMarketingScripts();
        }
    }

    function activateMarketingScripts() {
        // Encontra todos os scripts bloqueados e os ativa
        document.querySelectorAll('script[type="text/plain"]').forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            if (script.src) newScript.src = script.src;
            newScript.type = 'text/javascript';
            document.head.appendChild(newScript);
            script.remove(); // Remove o placeholder
        });
        console.log('[LGPD] Scripts de marketing ativados.');
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieBanner.classList.remove('show');
        activateMarketingScripts();
        trackEvent('cookie_consent_accepted', 'compliance');
    });

    rejectBtn.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieBanner.classList.remove('show');
        // Remove scripts de marketing do DOM para garantir que não carreguem
        document.querySelectorAll('script[type="text/plain"][data-category="marketing"], script[type="text/plain"][data-category="analytics"]').forEach(s => s.remove());
    });

    checkConsent();

    // ==========================================================================
    // 2. RASTREAMENTO DE UTM E WHATSAPP DINÂMICO (Inteligente)
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    let utmSource = urlParams.get('utm_source');
    let utmMedium = urlParams.get('utm_medium');
    
    if (utmSource) {
        localStorage.setItem('utm_source', utmSource);
        localStorage.setItem('utm_medium', utmMedium || 'none');
    } else {
        utmSource = localStorage.getItem('utm_source') || 'organico';
        utmMedium = localStorage.getItem('utm_medium') || 'none';
    }

    const waNumber = '5511995795072';
    const waMessage = `Olá! Vim pelo site (Fonte: ${utmSource}) e gostaria de mais informações.`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
    
    // Atualiza todos os links do WhatsApp na página de forma segura
    document.querySelectorAll('a.wa-link').forEach(link => {
        link.href = waLink;
    });

    // ==========================================================================
    // 3. DARK MODE (Com persistência)
    // ==========================================================================
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');

    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
    });

    // ==========================================================================
    // 4. HEADER GLASSMORPHISM & MOBILE MENU (Com Debounce)
    // ==========================================================================
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true }); // Performance boost

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    
    mobileMenuBtn.addEventListener('click', () => {
        const isExpanded = mobileNav.classList.toggle('active');
        mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.textContent = '☰';
        });
    });

    // ==========================================================================
    // 5. ACCORDION FAQ (Acessível)
    // ==========================================================================
    document.querySelectorAll('.accordion-header').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fecha todos
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });
            
            // Abre o clicado se não estava ativo
            if (!isActive) {
                item.classList.add('active');
                button.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ==========================================================================
    // 6. FORMULÁRIO INTELIGENTE (Fallback Mailto/WA)
    // ==========================================================================
    const form = document.getElementById('contact-form');
    const modal = document.getElementById('form-modal');
    const closeModal = document.querySelector('.close-modal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('form-name').value.trim();
        const phone = document.getElementById('form-phone').value.trim();
        const message = document.getElementById('form-message').value.trim();

        if (!name || !phone || !message) return; // Validação básica

        const waText = `Olá, meu nome é ${name}. ${message} (Meu tel: ${phone})`;
        const emailSubject = `Contato do Site: ${name}`;
        const emailBody = `Nome: ${name}\nTelefone: ${phone}\nMensagem: ${message}`;

        document.getElementById('modal-wa-link').href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
        document.getElementById('modal-email-link').href = `mailto:eloygabriel245@icloud.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

        modal.classList.add('active');
        closeModal.focus(); // Acessibilidade: focar no botão de fechar
        form.reset();
        trackEvent('form_submitted', 'conversion');
    });

    const closeModalfn = () => modal.classList.remove('active');
    closeModal.addEventListener('click', closeModalfn);
    window.addEventListener('click', (e) => { if (e.target === modal) closeModalfn(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeModalfn(); });

    // ==========================================================================
    // 7. INTERSECTION OBSERVER (Performance: Unobserve após animação)
    // ==========================================================================
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Para de observar para salvar CPU
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => observer.observe(el));

    // ==========================================================================
    // 8. FUNÇÃO DE RASTREAMENTO (Wrapper Seguro)
    // ==========================================================================
    window.trackEvent = function(action, category = 'engagement', label = '') {
        console.log(`[Analytics] ${category} | ${action} | ${label}`);
        
        // Só dispara se o consentimento foi dado
        if (localStorage.getItem('cookieConsent') === 'accepted') {
            if (typeof gtag !== 'undefined') {
                gtag('event', action, { 'event_category': category, 'event_label': label });
            }
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', action, { content_category: category });
            }
        }
    };

    // Rastreia clique no WhatsApp flutuante
    const floatingWa = document.getElementById('floating-whatsapp');
    if (floatingWa) {
        floatingWa.addEventListener('click', () => {
            trackEvent('whatsapp_click', 'conversion', 'floating_button');
        });
    }

    // Atualiza ano automaticamente no footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});