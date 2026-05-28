# Clear Dental — Website

Premium dark-theme website for **Clear Dental Care** (Manassas, VA).

**Tagline:** *Precision Dentistry. Beautiful Results.*

---

## Stack

- **HTML + CSS + Vanilla JS** — no build step, no dependencies
- **Google Fonts:** Cormorant Garamond (display) + Inter (UI)
- Fully responsive, accessible (WCAG AA+), `prefers-reduced-motion` aware
- Nav and footer are injected via `partials.js` — **change them in one place** and every page updates

## Sitemap

```
/                                Home
├── about.html                   About Dr. Lim + practice philosophy
├── services.html                All services overview (filterable by category)
├── services/
│   ├── cosmetic-dentistry.html  Veneers, bonding, smile design
│   ├── dental-implants.html     Single, multi, full-arch implants
│   ├── invisalign.html          Clear aligners
│   ├── teeth-whitening.html     In-office + take-home whitening
│   ├── family-dentistry.html    Preventive, pediatric, fillings
│   └── crowns-bridges.html      Crowns + bridges (incl. implant-supported)
├── smile-gallery.html           Featured + grid of before/after sliders
├── new-patients.html            What to expect, insurance, FAQ
└── contact.html                 Form, address, hours, map
```

12 pages total.

## File structure

```
/
├── index.html
├── about.html
├── services.html
├── smile-gallery.html
├── new-patients.html
├── contact.html
├── services/                    Detail pages
├── styles.css                   Design system (single source of truth)
├── script.js                    Reveal animations, slider, FAQ, mobile nav, form
├── partials.js                  Nav + footer + mobile menu (inject into every page)
├── README.md
└── assets/
    ├── icons/
    │   ├── favicon.svg
    │   └── logo.svg
    └── images/
        ├── dr-lim.svg           ← REPLACE with Dr. Lim's real photo
        └── before-{1..4}.svg, after-{1..4}.svg  ← REPLACE with real before/afters
```

## Local preview

Open `index.html` directly in a browser, or:

```bash
cd "New Office Website"
python3 -m http.server 4173
# open http://localhost:4173
```

> Note: when running from `file://` directly, navigation between pages still works fine — but `partials.js` requires same-origin to inject. Use a local server for development.

## Deployment

Static site — drop the folder onto:
- **Netlify** (drag & drop at app.netlify.com/drop)
- **Vercel** (`vercel --prod`)
- **GitHub Pages**
- Any traditional host (cPanel, FTP) — just upload the contents

No build step needed.

---

## Editing nav, footer, contact info — change ONCE, applies everywhere

| What | Where to change |
|---|---|
| Nav links / mobile menu | `partials.js` → `navHTML` and `mobileMenuHTML` |
| Footer columns / hours | `partials.js` → `footerHTML` |
| Phone number | Search-and-replace `(703) 555-1234` and `+17035551234` across all `.html` |
| Email | Search-and-replace `hello@cleardental.com` |
| Address | Search-and-replace `9825 Liberia Ave` |

The page-specific content (heroes, body text, FAQs) lives in each individual `.html` file.

---

## Swapping in real images

All placeholder SVGs in `assets/images/` should be replaced with real photos.

1. Save the real doctor photo as `assets/images/dr-lim.jpg` (recommend the seated photo against the painting backdrop, ~800×1000px)
2. Save real before/after pairs as `before-1.jpg`/`after-1.jpg`, …, `before-4.jpg`/`after-4.jpg` (~1600×900, under 300KB each — use [squoosh.app](https://squoosh.app) to compress)
3. Update file extensions across all pages:

```bash
# From the project root
find . -name "*.html" -exec sed -i '' \
  -e 's/dr-lim\.svg/dr-lim.jpg/g' \
  -e 's/before-\([0-9]\)\.svg/before-\1.jpg/g' \
  -e 's/after-\([0-9]\)\.svg/after-\1.jpg/g' \
  {} +
```

---

## Design system (in `styles.css`)

| Token | Value |
|-------|-------|
| Background | `#0A0A0A` (near-black, more depth than pure `#000`) |
| Surface | `#16171A` |
| Text | `#F5F5F5` |
| Text muted | `#A1A1AA` |
| Accent | `#4FA8FF` (clean medical blue — per client's chair-color preference) |
| Display font | Cormorant Garamond (matches the CD logo's elegant serif) |
| UI font | Inter |

### Animations (per client's "not too many" feedback)
- Floating accent orbs in hero (slow, decorative)
- Marquee strip (services list)
- Reveal-on-scroll fades (single 900ms ease per element)
- Smooth navbar shrink on scroll
- Card hover lift + accent line glow
- FAQ accordion smooth-open

All animations respect `prefers-reduced-motion`.

---

## Google Reviews widget (homepage)

The "What our patients actually say" section on the home page is set up to host a live Google Reviews widget. Until you paste in the embed code, it shows a "Loading…" fallback with a link to the Google reviews page.

### Recommended: Elfsight (free tier — 200 views/month, $5/mo for more)

1. Go to **https://elfsight.com/google-reviews-widget/**
2. Click **Create Free Widget**
3. Sign in (or create account)
4. Search and select the practice's Google Business Profile: **Clear Dental, Centreville VA**
5. Customize appearance:
   - **Layout:** Slider or Grid
   - **Color scheme:** Dark
   - **Background:** Transparent
   - **Card style:** Modern
   - **Text color:** White / light gray
   - Show: rating, reviewer name, review text, date
6. Click **Add to website** → copy the embed snippet (looks like two `<script>` + `<div>` tags)
7. Open `index.html`, find the comment that says **PASTE YOUR GOOGLE REVIEWS EMBED CODE BELOW THIS LINE** (around line 425), and paste the snippet right below it
8. Save and refresh — the live reviews should appear in place of the fallback

### Alternatives

- **Trustindex** — https://www.trustindex.io (similar free tier)
- **Tagembed** — https://tagembed.com
- **EmbedReviews** — https://embedreviews.com

All work the same way: sign up → connect Google profile → customize → copy embed → paste into the `#google-reviews-widget` div.

### Replacing the "See reviews on Google" button URL

The fallback's "See reviews on Google" link currently points to a Google search for the practice. Once the Google Business Profile is verified, replace the URL with the direct profile reviews link (find it under "Get more reviews" in the Business Profile dashboard).

---

## Form submission

`#contactForm` currently shows a simulated "Thank you" confirmation.
To wire to a real backend, edit `script.js` → the `form.addEventListener('submit', ...)` block.

**Recommended free options:**
- [Formspree](https://formspree.io) — set form `action="https://formspree.io/f/YOUR_ID"` + `method="POST"`
- [Netlify Forms](https://docs.netlify.com/forms/setup/) — add `netlify` attribute to `<form>`
- [Web3Forms](https://web3forms.com) — drop-in access key

---

## Adding a new page

1. Copy any existing page (e.g. `about.html`) as a template
2. Update `<title>`, `<meta description>`, `data-page="…"`, breadcrumb, and content
3. Add a link to it in `partials.js` (if it should appear in nav/footer)

That's it — nav, footer, and active-page highlighting all work automatically.

---

## Browser support

- Chrome / Edge / Safari / Firefox — latest 2 versions
- Mobile Safari iOS 14+
- Chrome Android (latest)

IE not supported (uses CSS custom properties, `backdrop-filter`, etc.).

---

## Credits

- Built by ProDent Advisors for Dr. Lim, Clear Dental Care.
- Logo design © Clear Dental Care.
