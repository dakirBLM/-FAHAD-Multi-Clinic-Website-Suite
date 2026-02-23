/*
 * ============================================================
 *  components.js  —  Shared Header & Footer — fahadcz.com
 *
 *  EDIT THIS FILE to update the header or footer on ALL pages.
 *
 *  Each HTML page must contain:
 *    <div id="site-header"></div>   (where the header renders)
 *    <div id="site-footer"></div>   (where the footer renders)
 *    <script src="components.js"></script>  (before </body>)
 * ============================================================
 */

(function () {

    /* ── 0. INJECT SHARED HEADER/NAV CSS ────────────────────── */
    /* Adds dropdown + mobile-menu CSS that clinic pages don't have */
    var style = document.createElement('style');
    style.textContent = `
        a.logo-section { text-decoration: none; }

        .nav-dropdown { position: relative; display: inline-block; }

        .clinics-trigger {
            background: transparent; border: none;
            padding: 0.6rem 0.95rem; color: var(--dark-gray);
            font-weight: 600; border-radius: 25px; cursor: pointer;
            display: inline-flex; align-items: center; gap: 0.5rem;
            font-size: 0.875rem; font-family: 'Cairo', sans-serif;
            transition: all 0.3s ease;
        }
        .clinics-trigger:hover, .clinics-trigger.active {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white; box-shadow: 0 6px 15px rgba(13,108,163,0.2);
        }
        .clinics-trigger:focus {
            outline: none; box-shadow: 0 0 0 3px rgba(30,136,199,0.2); border-radius: 20px;
        }

        .clinics-menu {
            position: absolute; right: 0; top: calc(100% + 8px);
            background: white; color: var(--dark); border-radius: 16px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15); padding: 0;
            min-width: 220px; max-height: 0; overflow: hidden;
            transition: max-height 0.35s ease, opacity 0.35s ease, padding 0.35s ease;
            opacity: 0; z-index: 1200; border: 1px solid rgba(0,0,0,0.08);
        }
        .clinics-menu.show { max-height: 450px; opacity: 1; padding: 0.5rem; }
        .clinics-menu a {
            display: block; padding: 0.75rem 1rem; color: var(--dark-gray);
            text-decoration: none; border-radius: 12px;
            transition: all 0.15s ease; white-space: nowrap;
            margin: 0.125rem 0; font-size: 0.875rem;
            background: transparent; overflow: visible;
        }
        .clinics-menu a:hover, .clinics-menu a:focus {
            background: var(--primary-light); color: var(--primary); transform: translateX(-5px);
        }

        .mobile-dropdown { margin: 0.25rem 0; }
        .mobile-dropdown-toggle {
            width: 100%; text-align: right; padding: 1rem 1.25rem;
            background: transparent; border: none; color: var(--dark);
            font-family: 'Cairo', sans-serif; font-weight: 600; font-size: 0.95rem;
            cursor: pointer; display: flex; justify-content: space-between;
            align-items: center; border-radius: 14px; transition: all 0.3s ease;
        }
        .mobile-dropdown-toggle:hover { background: var(--primary-light); color: var(--primary); }
        .mobile-dropdown-menu {
            max-height: 0; overflow: hidden;
            transition: max-height 0.3s ease; padding-right: 1.5rem;
        }
        .mobile-dropdown-menu.show { max-height: 400px; }
        .mobile-dropdown-menu a { padding: 0.75rem 1.25rem; font-size: 0.875rem; color: var(--dark-gray); }
        /* Responsive header — applied to ALL pages via components.js */
        @media (max-width: 1024px) {
            header .btn-primary { display: none !important; }
        }
        @media (max-width: 768px) {
            header .btn-primary { display: none !important; }
            header { left: 0.75rem !important; right: 0.75rem !important; top: 0.75rem !important;
                     border-radius: 20px !important; padding: 0.5rem !important; min-height: 60px !important; }
            .header-content { gap: 2rem !important; }
            .logo-img { height: 60px !important; width: 60px !important; }
            .logo-text h1 { font-size: 0.95rem !important; }
            .logo-text p { font-size: 0.75rem !important; }
            nav { display: none !important; }
            .menu-toggle { display: flex !important; width: 40px !important; height: 40px !important; font-size: 1.1rem !important; }
            .mobile-menu { display: none; padding: 0.75rem; }
            .mobile-menu.active { display: block !important; }
        }
        @media (max-width: 480px) {
            header { left: 0.5rem !important; right: 0.5rem !important; top: 0.5rem !important; border-radius: 16px !important; }
            .logo-text h1 { font-size: 0.8rem !important; }
        }
        /* Footer layout */
        .footer-grid { display: grid; grid-template-columns: 340px repeat(3, 1fr); align-items: start; gap: 2.5rem; margin-bottom: 2rem; }
        .footer-brand { display: flex; flex-direction: column; align-items: flex-start; gap: 1rem; }
        .footer-logo-img { height: 88px; width: auto; border-radius: 12px; display: block; }
        .footer-brand-names { display: flex; flex-direction: row; align-items: flex-start; gap: 0; width: 100%; }
        /* RTL: .footer-brand-ar is the RIGHT div, .footer-brand-en is the LEFT div.
           Separator = border-left of the right div (.footer-brand-ar) */
        .footer-brand-ar { flex: 1; border-left: 2px solid rgba(255,255,255,0.2); padding-left: 1rem; }
        .footer-brand-ar h3 { font-size: 1.05rem; font-weight: 800; color: white; margin-bottom: 0.25rem; }
        .footer-brand-ar p { font-size: 0.8rem; color: rgba(255,255,255,0.65); line-height: 1.5; }
        .footer-brand-en { flex: 1; padding-right: 0; }
        .footer-brand-en p { font-size: 0.72rem; color: rgba(255,255,255,0.6); line-height: 1.65; font-weight: 600; letter-spacing: 0.025em; }
        footer .footer-brand .social-links { margin-top: 0.25rem; }
        .contact-info-list { margin-top: 0.25rem; }
        @media (max-width: 1024px) {
            .footer-grid { grid-template-columns: 280px repeat(3, 1fr); gap: 1.75rem; }
        }
        @media (max-width: 900px) {
            .footer-grid { grid-template-columns: 1fr; gap: 1.5rem; }
            .footer-logo-img { height: 72px; }
            .footer-links { margin-top: 0.5rem; }
            .footer-brand-names { flex-direction: row; gap: 0; }
            .footer-brand-ar { padding-left: 0.75rem; }
        }
    `;
    document.head.appendChild(style);

    /* ── 1. HEADER ─────────────────────────────────────────── */
    var HEADER = `
    <header id="header">
        <div class="container">
            <div class="header-content">

                <a href="index.html" class="logo-section">
                    <img class="logo-img" src="1000038899.png" alt="مركز فهد القرني">
                    <div class="logo-text">
                        <h1>فهد القرني</h1>
                        <p>العلاج الطبيعي في التشيك</p>
                    </div>
                </a>

                <nav id="nav">
                    <a href="index.html">الصفحة الرئيسية</a>
                    <a href="fahad.html">عن فهد القرني</a>
                    <div class="nav-dropdown">
                        <button id="clinicsToggle" class="clinics-trigger" aria-haspopup="true" aria-expanded="false">
                            مصحات العلاج الطبيعي
                            <i class="fas fa-chevron-down" style="margin-inline-start:0.4rem;"></i>
                        </button>
                        <div id="clinicsMenu" class="clinics-menu">
                            <a href="clinic-darcov.html">مصحة داركوف</a>
                            <a href="clinic-dobytabl.html">مصحة دوبي تبليتسه</a>
                            <a href="clinic-beethoven.html">مصحة بيتهوفن</a>
                            <a href="clinic-kaiser.html">مصحة القيصر</a>
                            <a href="clinic-klempovice.html">مصحة كليمكوفيتسه</a>
                            <a href="clinic-arcada.html">مركز اركادا</a>
                            <a href="clinic-jachymov.html">مصحة ياخيموف</a>
                            <a href="clinic-tree-of-life.html">مصح شجرة الحياة</a>
                        </div>
                    </div>
                    <a href="motomed.html">جهاز الموتوميد</a>
                    <a href="index.html#contact">الاتصال</a>
                </nav>


                <button class="menu-toggle" id="menuToggle" aria-label="فتح القائمة">
                    <i class="fas fa-bars"></i>
                </button>
            </div>

            <div class="mobile-menu" id="mobileMenu">
                <a href="index.html">الصفحة الرئيسية</a>
                <a href="fahad.html">عن فهد القرني</a>
                <div class="mobile-dropdown">
                    <button class="mobile-dropdown-toggle" id="mobileClinicsToggle">
                        مصحات العلاج الطبيعي
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    <div class="mobile-dropdown-menu" id="mobileClinicsMenu">
                        <a href="clinic-darcov.html">مصحة داركوف</a>
                        <a href="clinic-dobytabl.html">مصحة دوبي تبليتسه</a>
                        <a href="clinic-beethoven.html">مصحة بيتهوفن</a>
                        <a href="clinic-kaiser.html">مصحة القيصر</a>
                        <a href="clinic-klempovice.html">مصحة كليمكوفيتسه</a>
                        <a href="clinic-arcada.html">مركز اركادا</a>
                        <a href="clinic-jachymov.html">مصحة ياخيموف</a>
                        <a href="clinic-tree-of-life.html">مصح شجرة الحياة</a>
                    </div>
                </div>
                <a href="motomed.html">جهاز الموتوميد</a>
                <a href="index.html#contact">الاتصال</a>
            </div>
        </div>
    </header>`;

    /* ── 2. FOOTER ─────────────────────────────────────────── */
    /*  ↓↓↓  EDIT BELOW TO CHANGE THE FOOTER ON ALL PAGES ↓↓↓  */
    var FOOTER = `
    <footer>
        <div class="container">
            <div class="footer-grid">

                <div class="footer-brand" style="display:flex;flex-direction:column;align-items:flex-start;gap:1rem;">
                    <img class="footer-logo-img" src="1000038901.jpg" alt="فهد القرني" style="display:block;height:88px;width:auto;border-radius:12px;">
                    <div class="footer-brand-names" style="display:flex;flex-direction:row;align-items:flex-start;width:100%;">
                        <div class="footer-brand-ar">
                            <h3>فهد القرني</h3>
                            <p>للعلاج الطبيعي والخدمات الطبية بالتشيك</p>
                        </div>
                        <div class="footer-brand-en">
                            <p>FAHAD ALQARNI</p>
                            <p>PHYSIOTHERAPY &amp; MEDICAL SERVICES IN CZECH REPUBLIC</p>
                        </div>
                    </div>
                    <div class="social-links">
                        <a href="https://x.com/evropajs?s=11&t=6wzL0PhnVREVez-e3nH0SQ" class="social-link" aria-label="تويتر X" target="_blank" rel="noopener"><i class="fab fa-x-twitter"></i></a>
                        <a href="https://snapchat.com/t/1H7yxKip" class="social-link" aria-label="سناب شات" target="_blank" rel="noopener"><i class="fab fa-snapchat"></i></a>
                        <a href="https://www.tiktok.com/@motomed2?_r=1&_t=ZS-948sbVEitYT" class="social-link" aria-label="تيك توك" target="_blank" rel="noopener"><i class="fab fa-tiktok"></i></a>
                    </div>
                </div>

                <div class="footer-links">
                    <h4>روابط سريعة</h4>
                    <ul>
                        <li><a href="index.html"><i class="fas fa-chevron-left"></i> الصفحة الرئيسية</a></li>
                        <li><a href="fahad.html"><i class="fas fa-chevron-left"></i> عن فهد القرني</a></li>
                        <li><a href="index.html#services"><i class="fas fa-chevron-left"></i> مصحات العلاج الطبيعي</a></li>
                        <li><a href="index.html#faq"><i class="fas fa-chevron-left"></i> سؤال وجواب</a></li>
                        <li><a href="index.html#contact"><i class="fas fa-chevron-left"></i> الاتصال</a></li>
                    </ul>
                </div>

                <div class="footer-links">
                    <h4>مصحاتنا</h4>
                    <ul>
                        <li><a href="clinic-darcov.html"><i class="fas fa-chevron-left"></i> مصحة داركوف</a></li>
                        <li><a href="clinic-dobytabl.html"><i class="fas fa-chevron-left"></i> مصحة دوبي تبليتسه</a></li>
                        <li><a href="clinic-beethoven.html"><i class="fas fa-chevron-left"></i> مصحة بيتهوفن</a></li>
                        <li><a href="clinic-kaiser.html"><i class="fas fa-chevron-left"></i> مصحة القيصر</a></li>
                        <li><a href="clinic-klempovice.html"><i class="fas fa-chevron-left"></i> مصحة كليمكوفيتسه</a></li>
                        <li><a href="clinic-arcada.html"><i class="fas fa-chevron-left"></i> مركز اركادا</a></li>
                        <li><a href="clinic-jachymov.html"><i class="fas fa-chevron-left"></i> مصحة ياخيموف</a></li>
                        <li><a href="clinic-tree-of-life.html"><i class="fas fa-chevron-left"></i> مصح شجرة الحياة</a></li>
                    </ul>
                </div>

                <div class="footer-links">
                    <h4>اتصل بنا</h4>
                    <ul class="contact-info-list">
                        <li class="contact-info-item">
                            <div class="contact-icon"><i class="fas fa-phone"></i></div>
                            <div class="contact-text" dir="ltr" style="text-align:right;">+420 608 466 666</div>
                        </li>
                        <li class="contact-info-item">
                            <div class="contact-icon"><i class="fas fa-envelope"></i></div>
                            <div class="contact-text">Js.evropa@seznam.cz</div>
                        </li>
                        <li class="contact-info-item">
                            <div class="contact-icon"><i class="fas fa-globe"></i></div>
                            <div class="contact-text">https://fahadqa.com</div>
                        </li>
                        <li class="contact-info-item">
                            <div class="contact-icon"><i class="fas fa-map-marker-alt"></i></div>
                            <div class="contact-text">جمهورية التشيك</div>
                        </li>
                    </ul>
                </div>

            </div>
            <div class="footer-bottom">
                <p>© 2025 فهد القرني للعلاج الطبيعي والخدمات الطبية بالتشيك. جميع الحقوق محفوظة.</p>
            </div>
        </div>
    </footer>

    <!-- WhatsApp Float -->
    <div class="whatsapp-float">
        <a href="https://wa.me/420608466666?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%84%D8%A7%D8%AC%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A%D8%B9%D9%8A"
           target="_blank" class="whatsapp-btn" aria-label="تواصل عبر واتساب">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <!-- Scroll to Top -->
    <button class="scroll-to-top" id="scrollToTop" aria-label="العودة للأعلى">
        <i class="fas fa-arrow-up"></i>
    </button>`;
    /*  ↑↑↑  END OF FOOTER  ↑↑↑  */

    /* ── 3. INJECT ──────────────────────────────────────────── */
    var hEl = document.getElementById('site-header');
    if (hEl) hEl.outerHTML = HEADER;

    var fEl = document.getElementById('site-footer');
    if (fEl) fEl.outerHTML = FOOTER;

    /* Show header booking button only on index.html, hide on all other pages */
    var bookBtn = document.getElementById('headerBookBtn');
    if (bookBtn) {
        var currentPage = location.pathname.split('/').pop() || 'index.html';
        if (currentPage !== 'index.html') {
            bookBtn.style.display = 'none';
        }
    }

    /* ── 4. HIGHLIGHT ACTIVE NAV LINK ───────────────────────── */
    var page = location.pathname.split('/').pop() || 'index.html';
    var clinics = ['clinic-arcada','clinic-beethoven','clinic-darcov',
                   'clinic-dobytabl','clinic-jachymov','clinic-kaiser',
                   'clinic-klempovice','clinic-tree-of-life'];

    document.querySelectorAll('#nav a').forEach(function(a) {
        var href = a.getAttribute('href').split('#')[0].split('/').pop();
        if (href === page) a.classList.add('active');
    });

    if (clinics.some(function(c){ return page.indexOf(c) === 0; })) {
        var trigger = document.getElementById('clinicsToggle');
        if (trigger) trigger.style.color = 'var(--primary)';
    }

    /* ── 5. HEADER BEHAVIOURS ───────────────────────────────── */
    var header      = document.getElementById('header');
    var menuToggle  = document.getElementById('menuToggle');
    var mobileMenu  = document.getElementById('mobileMenu');
    var clinicsToggle = document.getElementById('clinicsToggle');
    var clinicsMenu   = document.getElementById('clinicsMenu');
    var mobClinicsToggle = document.getElementById('mobileClinicsToggle');
    var mobClinicsMenu   = document.getElementById('mobileClinicsMenu');

    /* scroll hide/show */
    var lastST = 0, stTimer;
    window.addEventListener('scroll', function () {
        var st = window.pageYOffset;
        header.classList.toggle('scrolled', st > 50);
        header.classList.toggle('hidden',   st > lastST && st > 100);
        lastST = st;
        clearTimeout(stTimer);
        stTimer = setTimeout(function(){ header.classList.remove('hidden'); }, 500);
    });

    /* mobile menu */
    if (menuToggle) {
        menuToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            menuToggle.querySelector('i').className =
                mobileMenu.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
        });
    }

    /* mobile clinics sub-menu */
    if (mobClinicsToggle) {
        mobClinicsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            mobClinicsMenu.classList.toggle('show');
            var ic = mobClinicsToggle.querySelector('i');
            ic.style.transform = mobClinicsMenu.classList.contains('show') ? 'rotate(180deg)' : '';
        });
    }

    /* desktop clinics dropdown */
    if (clinicsToggle) {
        clinicsToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            clinicsMenu.classList.toggle('show');
            clinicsToggle.setAttribute('aria-expanded', clinicsMenu.classList.contains('show'));
        });
    }

    /* close menus on outside click */
    document.addEventListener('click', function (e) {
        if (mobileMenu && mobileMenu.classList.contains('active') &&
            !menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
        if (clinicsMenu && clinicsMenu.classList.contains('show') &&
            !clinicsToggle.contains(e.target) && !clinicsMenu.contains(e.target)) {
            clinicsMenu.classList.remove('show');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && clinicsMenu) clinicsMenu.classList.remove('show');
    });

    /* ── 6. SCROLL-TO-TOP BUTTON ────────────────────────────── */
    window.addEventListener('scroll', function () {
        var btn = document.getElementById('scrollToTop');
        if (btn) btn.classList.toggle('show', window.pageYOffset > 300);
    });
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('#scrollToTop')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

})();
