# Deployment — Clear Dental → Hostinger via GitHub

The site is hosted on **Hostinger** and connected to the GitHub repository so updates deploy with one click.

- **Repo:** https://github.com/ProDent-web/clear-dental (**public** — no deploy key needed)
- **Hosting:** Hostinger
- **Temp domain:** teal-sheep-120360.hostingersite.com (until the real domain is purchased + pointed)
- **Branch:** `main`

> **Why public?** Hostinger uses one shared SSH key per hosting account, and GitHub
> won't let that key be a deploy key on two repos at once (it was already serving the
> separate `cleardentalcarecentreville` repo). Making this repo public lets Hostinger
> pull it over HTTPS with no key — and the source contains nothing that isn't already
> visible on the live website anyway.

---

## One-time setup (do this once)

### 1. Connect the repo in Hostinger

1. Log into Hostinger → **hPanel**
2. Open the website (`teal-sheep-120360...`) → **Advanced → GIT**
3. In **Create a New Repository**, fill in:
   - **Repository:** `https://github.com/ProDent-web/clear-dental.git` (HTTPS — no `git@`)
   - **Branch:** `main`
   - **Directory:** leave blank (defaults to `public_html`)
4. Click **Create**

No SSH key step — because the repo is public, Hostinger clones it directly.

### 2. First deploy

In hPanel → GIT → click **Deploy** (or **Update from remote**). Hostinger pulls the repo into `public_html` and the site goes live on the temp domain.

That's it for setup.

---

## Future updates — the workflow you asked for

When I make changes (or you make changes locally):

### Step 1 — Push to GitHub

```bash
cd "Clear Dental Care/New Office Website"
git add .
git commit -m "Short description of what changed"
git push
```

### Step 2 — Click "Deploy" in Hostinger

1. Log into Hostinger hPanel
2. Open the site → **Advanced → Git**
3. Click **Update from remote** (or the **Deploy** button)
4. Site updates in ~10 seconds

### Optional: auto-deploy on push (set it and forget it)

In Hostinger Git settings there's an **Auto-deploy on push** toggle. Turn it on and you skip step 2 entirely — every `git push` to `main` instantly updates the live site.

> Most agencies leave this **OFF** during early development (so you can review before going live), and turn it ON once the client signs off.

---

## Common operations

### "I made changes locally, push them to GitHub"

```bash
cd "Clear Dental Care/New Office Website"
git status                     # see what changed
git add .
git commit -m "Fix typo on home page"
git push
```

### "I want to pull the latest from GitHub before making changes"

```bash
git pull
```

### "Show me the live site"

The Hostinger domain (whatever was configured) — usually the practice's own domain like `cleardental.com` or a temporary `cleardental.hostingersite.com` until DNS is pointed.

### "I want to roll back the live site to a previous version"

In Hostinger Git panel, there's a list of recent deploys. Click an older commit → **Deploy this version**. Or locally:

```bash
git log --oneline           # find the commit hash you want
git revert <hash>           # creates a new commit that undoes that change
git push                    # push and deploy
```

---

## Files excluded from deployment (via `.gitignore`)

These exist locally but are NOT pushed to GitHub / Hostinger:

- `assets/images/Raw/` — original HEIC photos from the client (26 MB)
- `assets/images/processed/` — intermediate JPGs from sips conversion (5.6 MB)
- `_generate-services.py` — one-off build script
- `.DS_Store`, editor configs, etc.

The final selected photos in `assets/images/{doctor,office,cases}/` ARE committed and served.

---

## Hostinger-specific gotchas

- **PHP needed?** No — the site is pure static HTML/CSS/JS. Any Hostinger plan (including the cheapest shared one) works.
- **HTTPS:** Hostinger auto-provisions Let's Encrypt SSL once the domain is connected. Free, automatic.
- **www vs non-www:** Set up a redirect in hPanel → Domains → Redirects.
- **Form submission:** The contact form currently shows a simulated success. To wire to email, follow the "Form submission" section in the README (Formspree, Netlify Forms, or Web3Forms).
- **Caching:** If updates don't show after deploy, hard-refresh the browser (Cmd+Shift+R) — Hostinger doesn't cache HTML aggressively but CDN-cached CSS/JS can stick.

---

## Quick reference

| Task | Command / Action |
|------|-----------------|
| See current status | `git status` |
| Stage all changes | `git add .` |
| Commit | `git commit -m "message"` |
| Push to GitHub | `git push` |
| Pull latest | `git pull` |
| Deploy to live | hPanel → Git → **Update from remote** |
| Roll back | hPanel → Git → pick older deploy |
