# Bâtir un Empire Familial — Application (PWA)

Mobile-first audiobook app for *Bâtir un Empire Familial — Tome 1* by Pasteur Grâce A. Sumbela.
French by default, English toggle in the top bar. Installable to the home screen, works offline.

## See the changes / get past the Stripe gate (preview)

The Stripe purchase gate stays live for real visitors. To preview the **unlocked** app
(all chapters + audio player + the book reader) without paying, open the site with a secret flag:

```
index.html?preview=1
```

A green **"Mode aperçu"** badge confirms you're in. (You can also type an access
code in the "Déjà acheté ?" box — any non-empty code unlocks it, for buyers you give a code to.)

To go back to the normal locked view: clear the tab's session, or open without `?preview=1`.

## Run it locally

PDF reading, audio, and the service worker need a real server (not `file://`):

```bash
cd empire-familial-pwa
python3 -m http.server 8099
# then open http://localhost:8099/?preview=1
```

Double-clicking `index.html` works for a quick look (audio/video/PDF play), but
install + offline only work over `http://localhost` or HTTPS.

## Deploy to Vercel

This folder is ready for Vercel (static site, `vercel.json` included — it sets the right
`Service-Worker-Allowed` header, manifest content-type, and long-cache headers for media).

Option A — CLI:

```bash
npm i -g vercel
cd empire-familial-pwa
vercel            # preview deploy
vercel --prod     # production HTTPS URL
```

Option B — Dashboard: push this folder to a Git repo and "Import Project" on vercel.com
(Framework preset: **Other**, no build command, output dir = the folder root).

`.vercelignore` keeps two stale duplicate MP3s out of the deploy. Once live, phones get the
**Install** prompt; the in-app "Installer l'application" button shows iOS + Android steps.
(Netlify Drop at app.netlify.com/drop also works — just drag the folder.)

## What's wired

- **Audio — multi-part chapters.** Narration is recorded in page-range segments, so each
  chapter holds a `parts[]` list and the player streams them in order, auto-advancing across
  parts and then into the next chapter. Tappable part-chips (1·2·3…) appear in the full player.
  - **Chapter 1** — complete: 5 parts, pages 17–32 (`audio/ch1-1.mp3` … `ch1-5.mp3`).
  - **Chapter 2** — in progress: 1 part, pages 33–36 (`audio/ch2-1.mp3`).
  - Other chapters show "narration coming soon."
  - To add more: drop the MP3 in `/audio` and add `{src,pg,sec}` to that chapter's `parts`
    array in `app.js` (the `CHAPTERS` list). Chapter→page map is in the book's table of contents.
- **The book** — strictly `livre-batir-un-empire-familial.pdf`, opened in the in-app reader
  and downloadable (gated behind access).
- **Design** — built from your own banner art, transparent book/author cutouts, family
  photos, teaser + testimonial videos. No stock/AI icons; all icons are custom SVG.
- **Stripe** — `STRIPE_LINK` at the top of `app.js`. Change it there if your link changes.

## Files

```
index.html              app shell + styles
app.js                  chapters, i18n (FR/EN), gate, player, install, reader
manifest.webmanifest    PWA metadata + icons
sw.js                   service worker (offline cache)
assets/  icons/  media/  audio/   livre-...pdf
```
