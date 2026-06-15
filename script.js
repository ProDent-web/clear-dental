/* ============================================================
   CLEAR DENTAL — Interactions
   ============================================================ */

(() => {
  'use strict';

  const $  = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Year in footer ---------- */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = $('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle  = $('#navToggle');
  const mobileMenu = $('#mobile-menu-mount');

  const closeMobileMenu = () => {
    if (!navToggle || !mobileMenu) return;
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.classList.toggle('is-open', isOpen);
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('.mobile-menu a').forEach(a => a.addEventListener('click', closeMobileMenu));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = $$('.reveal');
  if (reveals.length) {
    // Apply per-element data-delay → CSS custom property
    reveals.forEach(el => {
      const delay = parseInt(el.dataset.delay || '0', 10);
      el.style.setProperty('--reveal-delay', delay);
    });

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      reveals.forEach(el => el.classList.add('is-visible'));
    } else {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

      reveals.forEach(el => io.observe(el));
    }
  }

  /* ---------- Before / After slider ---------- */
  class BeforeAfter {
    constructor(root) {
      this.root = root;
      this.before = root.querySelector('.ba-slider__image--before');
      this.handle = root.querySelector('.ba-slider__handle');
      this.beforeImg = this.before?.querySelector('img');
      this.afterImg = root.querySelector('.ba-slider__image--after img');
      this.active = false;
      this.pos = 0.5;

      if (!this.before || !this.handle) return;

      this.bind();
      this.set(0.5);
    }

    bind() {
      const onDown = (e) => {
        this.active = true;
        this.move(e);
      };
      const onMove = (e) => {
        if (!this.active) return;
        this.move(e);
      };
      const onUp = () => { this.active = false; };

      this.root.addEventListener('mousedown', onDown);
      this.root.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);

      // Hover preview
      this.root.addEventListener('mousemove', (e) => {
        if (this.active) return;
        // Subtle follow on hover only when not dragging
      });

      // Keyboard support
      this.root.tabIndex = 0;
      this.root.setAttribute('role', 'slider');
      this.root.setAttribute('aria-label', 'Drag to compare before and after');
      this.root.setAttribute('aria-valuemin', '0');
      this.root.setAttribute('aria-valuemax', '100');
      this.root.setAttribute('aria-valuenow', '50');

      this.root.addEventListener('keydown', (e) => {
        const step = 0.05;
        if (e.key === 'ArrowLeft')  { this.set(this.pos - step); e.preventDefault(); }
        if (e.key === 'ArrowRight') { this.set(this.pos + step); e.preventDefault(); }
        if (e.key === 'Home')       { this.set(0); e.preventDefault(); }
        if (e.key === 'End')        { this.set(1); e.preventDefault(); }
      });
    }

    move(e) {
      const rect = this.root.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = clientX - rect.left;
      this.set(x / rect.width);
    }

    set(ratio) {
      this.pos = Math.min(0.999, Math.max(0.001, ratio));
      const pct = this.pos * 100;
      this.before.style.width = pct + '%';
      this.handle.style.left = pct + '%';
      if (this.beforeImg) {
        // Counter-stretch so the before image stays aligned with the after
        this.beforeImg.style.width = (100 / this.pos) + '%';
      }
      this.root.setAttribute('aria-valuenow', String(Math.round(pct)));
    }

    setImages(before, after) {
      if (this.beforeImg) this.beforeImg.src = before;
      if (this.afterImg)  this.afterImg.src  = after;
    }
  }

  const sliders = $$('.ba-slider').map(el => new BeforeAfter(el));

  /* ---------- Gallery thumbnails ---------- */
  const thumbs = $$('.gallery__thumb');
  if (thumbs.length && sliders.length) {
    const slider = sliders[0];

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('gallery__thumb--active'));
        thumb.classList.add('gallery__thumb--active');

        const before = thumb.dataset.before;
        const after  = thumb.dataset.after;
        if (before && after) {
          slider.setImages(before, after);
        }
      });
    });
  }

  /* ---------- Contact form ----------
     Posts to FormSubmit (https://formsubmit.co), which emails each
     submission to the practice. Native validation runs first (the form
     no longer has novalidate), so required fields are enforced by the
     browser before this handler fires. */
  const form = $('#contactForm');
  if (form) {
    const AJAX_ENDPOINT = 'https://formsubmit.co/ajax/marketing@prodentadvisors.com';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;

      const original = btn.innerHTML;
      const restore = (label, ok) => {
        btn.innerHTML = label;
        btn.style.background = ok ? 'var(--accent)' : '';
        btn.style.color = ok ? 'var(--text)' : '';
      };

      btn.disabled = true;
      btn.innerHTML = 'Sending…';

      try {
        const res = await fetch(AJAX_ENDPOINT, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => ({}));

        if (res.ok && String(data.success) === 'true') {
          // Send the visitor to the dedicated thank-you page
          window.location.href = 'thank-you.html';
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        btn.disabled = false;
        restore('Couldn\'t send — please call 703-888-5005', false);
        setTimeout(() => restore(original, false), 5000);
      }
    });
  }

  /* ---------- Google Reviews widget fallback ----------
     If the Elfsight widget doesn't render within a few seconds
     (blocked by iOS Safari tracking prevention, ad-blocker, network,
     or not yet configured), reveal a fallback CTA so the section is
     never blank. */
  const reviewsFallback = $('#reviews-fallback');
  const elfsightApp = $('[class*="elfsight-app-"]');
  if (reviewsFallback) {
    const widgetRendered = () => {
      if (!elfsightApp) return false;
      // Elfsight injects an iframe/markup and the box gains real height
      return elfsightApp.children.length > 0 || elfsightApp.offsetHeight > 60;
    };
    let checks = 0;
    const poll = setInterval(() => {
      checks++;
      if (widgetRendered()) {
        reviewsFallback.hidden = true;
        clearInterval(poll);
      } else if (checks >= 8) {            // ~4s (8 × 500ms)
        reviewsFallback.hidden = false;     // give up — show fallback
        clearInterval(poll);
      }
    }, 500);
  }

  /* ---------- FAQ accordion ---------- */
  $$('.faq__item').forEach(item => {
    const btn = item.querySelector('.faq__btn');
    const body = item.querySelector('.faq__body');
    if (!btn || !body) return;

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) {
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0px';
      }
    });
  });

  /* ---------- Smooth scroll for anchor links (with offset) ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  });

})();
