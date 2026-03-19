# Athena Display System — Deployment Guide

**One-time setup.** After this, Claude pushes updates and the displays auto-refresh.

---

## Option A: GitHub Pages (Recommended — simplest)

### 1. Create the repo (Mac Terminal)

```bash
cd ~/Systems/Athena/_display-html
git init
git add .
git commit -m "Athena Display System v1 — four views (Horizon, Cockpit, Workshop, Compass)"
gh repo create kurt316-ai/athena-displays --public --source=. --push
```

### 2. Enable GitHub Pages

- Go to https://github.com/kurt316-ai/athena-displays/settings/pages
- Source: **Deploy from a branch**
- Branch: **main** / root
- Save

### 3. Access your displays

After ~60 seconds: `https://kurt316-ai.github.io/athena-displays/`

**Bookmark these on all devices:**
- `.../horizon.html` — Strategic landscape
- `.../cockpit.html` — Daily driver
- `.../workshop.html` — Project view
- `.../compass.html` — Reference guide

### 4. Add to iPhone/iPad home screen (optional)

Safari → navigate to the URL → Share → Add to Home Screen. Opens as a standalone app-like experience.

---

## Option B: Cloudflare Pages (If you want a custom domain later)

### 1. Same git setup as above

### 2. Connect to Cloudflare

- Go to https://dash.cloudflare.com → Pages → Create a project
- Connect GitHub → select `athena-displays` repo
- Build settings: Framework = None, Build command = (empty), Output directory = `.`
- Deploy

### 3. Custom domain (optional)

Cloudflare Pages → Custom domains → add `displays.entertheforge.io` (or whatever you want). Cloudflare handles SSL automatically.

---

## How Claude Updates the Displays

At session close (or on `refresh` command), Claude:
1. Regenerates the HTML files with current data
2. Updates `version.txt` with a new timestamp
3. Pushes to GitHub: `git add . && git commit -m "refresh" && git push`
4. GitHub Pages auto-deploys (~30-60 seconds)
5. The auto-refresh JS in each display detects the version change and reloads

**From Cowork:** Claude can't push directly (VM credential limitation). Two options:
- (a) Claude generates updated files → Kurt runs `cwp` to push (current workflow)
- (b) Claude uses GitHub API via `curl` with a PAT (requires `.env` setup — can configure later)

---

## File Structure

```
_display-html/
├── index.html      — Landing page (links to all views)
├── horizon.html    — Zoomed-back strategic landscape
├── cockpit.html    — Daily driver / operational dashboard
├── workshop.html   — Single-project deep dive
├── compass.html    — Reference guide / shared vocabulary
├── shared.css      — Dark dashboard theme (responsive)
├── shared.js       — Auto-refresh (60-second version check)
├── version.txt     — Version stamp (triggers auto-refresh)
└── DEPLOY.md       — This file
```
