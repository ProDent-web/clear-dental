/* ============================================================
   CLEAR DENTAL — Shared nav + footer partials
   Update once, applies to every page.
   ============================================================ */

(() => {
  'use strict';

  // Determine path prefix based on page depth (e.g. "services/cosmetic-dentistry.html" needs "../")
  const path = window.location.pathname;
  const depth = (path.match(/\//g) || []).length - 1;
  const prefix = depth > 1 ? '../'.repeat(depth - 1) : '';

  const P = (href) => prefix + href;

  const navHTML = `
    <div class="nav__inner container">
      <a href="${P('index.html')}" class="nav__logo" aria-label="Clear Dental home">
        <img class="logo-mark" src="${P('assets/icons/logo.png')}?v=4" alt="Clear Dental" />
      </a>

      <nav class="nav__links" aria-label="Primary">
        <a href="${P('index.html')}" data-nav="home">Home</a>
        <a href="${P('about.html')}" data-nav="about">About</a>

        <div class="nav__dropdown">
          <a href="${P('services.html')}" data-nav="services" class="nav__dropdown-trigger">
            Services
            <svg class="nav__dropdown-caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden="true">
              <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <div class="nav__megamenu" role="menu">
            <div class="nav__megamenu-inner">
              <div class="nav__megamenu-col">
                <h4 class="nav__megamenu-heading">Cosmetic</h4>
                <a href="${P('services/cosmetic-dentistry.html')}">Cosmetic Dentistry</a>
                <a href="${P('services/teeth-whitening.html')}">Teeth Whitening</a>
                <a href="${P('services/invisalign.html')}">Invisalign®</a>
              </div>
              <div class="nav__megamenu-col">
                <h4 class="nav__megamenu-heading">Restorative</h4>
                <a href="${P('services/restorative-dentistry.html')}">Restorative Dentistry</a>
                <a href="${P('services/dental-implants.html')}">Dental Implants</a>
                <a href="${P('services/all-on-four-hybrids.html')}">All-on-4 &amp; Hybrids</a>
                <a href="${P('services/crowns-bridges.html')}">Crowns &amp; Bridges</a>
                <a href="${P('services/endodontics.html')}">Endodontics</a>
              </div>
              <div class="nav__megamenu-col">
                <h4 class="nav__megamenu-heading">Preventive &amp; Family</h4>
                <a href="${P('services/preventative-dentistry.html')}">Preventative Dentistry</a>
                <a href="${P('services/family-dentistry.html')}">Family Dentistry</a>
                <a href="${P('services/pediatric-dentistry.html')}">Pediatric Dentistry</a>
                <a href="${P('services/periodontics.html')}">Periodontics</a>
              </div>
              <div class="nav__megamenu-col">
                <h4 class="nav__megamenu-heading">Surgical &amp; Urgent</h4>
                <a href="${P('services/oral-surgery.html')}">Oral Surgery</a>
                <a href="${P('services/emergency-dentistry.html')}">Emergency Dentistry</a>
              </div>
            </div>
            <div class="nav__megamenu-footer">
              <a href="${P('services.html')}" class="nav__megamenu-all">
                View all services
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>

        <a href="${P('smile-gallery.html')}" data-nav="gallery">Smile Gallery</a>
        <a href="${P('new-patients.html')}" data-nav="patients">New Patients</a>
        <a href="${P('contact.html')}" data-nav="contact">Contact</a>
      </nav>

      <div class="nav__cta">
        <a href="tel:+17038885005" class="nav__phone" aria-label="Call us">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        </a>
        <a href="${P('contact.html')}" class="btn btn--primary btn--small">Book Appointment</a>
      </div>

      <button class="nav__toggle" id="navToggle" aria-label="Open menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  `;

  const mobileMenuHTML = `
    <nav class="mobile-menu__links">
      <a href="${P('index.html')}">Home</a>
      <a href="${P('about.html')}">About</a>
      <a href="${P('services.html')}">Services</a>
      <a href="${P('smile-gallery.html')}">Smile Gallery</a>
      <a href="${P('new-patients.html')}">New Patients</a>
      <a href="${P('contact.html')}">Contact</a>
      <a href="${P('contact.html')}" class="btn btn--primary">Book Appointment</a>
    </nav>
  `;

  const footerHTML = `
    <div class="container footer__inner">
      <div class="footer__brand">
        <a href="${P('index.html')}" class="nav__logo">
          <img class="logo-mark" src="${P('assets/icons/logo.png')}?v=4" alt="Clear Dental" />
        </a>
        <p class="footer__tagline">Precision Dentistry. Beautiful Results.</p>
        <div class="footer__contact-line">
          <a href="tel:+17038885005">703-888-5005</a>
          <span>·</span>
          <a href="mailto:hello@cleardental.com">hello@cleardental.com</a>
        </div>
      </div>

      <div class="footer__col">
        <h4>Care</h4>
        <a href="${P('services/cosmetic-dentistry.html')}">Cosmetic Dentistry</a>
        <a href="${P('services/restorative-dentistry.html')}">Restorative Dentistry</a>
        <a href="${P('services/dental-implants.html')}">Dental Implants</a>
        <a href="${P('services/all-on-four-hybrids.html')}">All-on-4 &amp; Hybrids</a>
        <a href="${P('services/invisalign.html')}">Invisalign</a>
        <a href="${P('services/family-dentistry.html')}">Family &amp; Pediatric</a>
        <a href="${P('services/emergency-dentistry.html')}">Emergency Care</a>
        <a href="${P('services.html')}">View all services →</a>
      </div>

      <div class="footer__col">
        <h4>Practice</h4>
        <a href="${P('about.html')}">About Dr. Lim</a>
        <a href="${P('smile-gallery.html')}">Smile Gallery</a>
        <a href="${P('new-patients.html')}">New Patients</a>
        <a href="${P('contact.html')}">Visit Us</a>
        <a href="${P('contact.html')}">Book Appointment</a>
      </div>

      <div class="footer__col">
        <h4>Visit</h4>
        <a href="https://maps.google.com/?q=14631+Lee+Hwy+STE+117+Centreville+VA+20121" target="_blank" rel="noopener">14631 Lee Hwy STE 117<br />Centreville, VA 20121</a>
        <div class="footer__hours">
          <div><span>Mon — Thu</span><span>8a – 6p</span></div>
          <div><span>Friday</span><span>8a – 4p</span></div>
          <div><span>Sat — Sun</span><span>Closed</span></div>
        </div>
      </div>
    </div>

    <div class="footer__bottom container">
      <span>© <span id="year"></span> Clear Dental. All rights reserved.</span>
      <div class="footer__bottom-links">
        <a href="#">Privacy</a>
        <a href="#">Accessibility</a>
        <a href="#">HIPAA Notice</a>
      </div>
    </div>
  `;

  // Mount
  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.innerHTML = navHTML;

  const mobileMount = document.getElementById('mobile-menu-mount');
  if (mobileMount) mobileMount.innerHTML = mobileMenuHTML;

  const footerMount = document.getElementById('footer-mount');
  if (footerMount) footerMount.innerHTML = footerHTML;

  // Highlight current page in nav
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-nav="${page}"]`).forEach(el => el.classList.add('is-current'));
  }

  // Year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
