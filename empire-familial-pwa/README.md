# Bâtir un Empire Familial — Ebook + Audiobook (PWA)

A mobile-first **page-flip ebook** with attached narration, for *Bâtir un Empire Familial — Tome 1*
by Pasteur Grâce A. Sumbela. French by default, English toggle. Installable, works offline.

## Test mode — no paywall right now
The Stripe gate has been **removed** so the whole book is open for testing. Every chapter reads
and plays freely. (The Stripe link is still kept at the top of `app.js` as `STRIPE_LINK` for when
you want to re-introduce access control later.)

## The reader (page-flip)
- Real book page-turn animation via the self-hosted `page-flip` engine (`vendor/page-flip.browser.js`).
- The book cover (`assets/cover.jpg`) is the first page; the text is paginated into real pages that
  fill the screen, with drop-caps, justified type, and a chapter ornament.
- **Flip** by swiping/dragging the page, the ◀ ▶ buttons, arrow keys, or the on-page click zones.
- A−/A+ resize the text and re-paginate. Page counter + progress bar at the bottom.
- If the flip engine ever fails to load, it falls back to a clean scroll reader automatically.

## Audio — read-along, mapped to the page ranges in the filenames
Narration is recorded in page-range segments; each chapter holds a `parts[]` list whose `ps`/`pe`
match the **pages named in the audio file** exactly:

| File | Pages | Chapter |
|------|-------|---------|
| `audio/ch1-1.mp3` | 17–20 | Chapter 1, part 1 |
| `audio/ch1-2.mp3` | 20–24 | Chapter 1, part 2 |
| `audio/ch1-3.mp3` | 24–27 | Chapter 1, part 3 |
| `audio/ch1-4.mp3` | 27–29 | Chapter 1, part 4 |
| `audio/ch1-5.mp3` | 29–32 | Chapter 1, part 5 (chapter complete) |
| `audio/ch2-1.mp3` | 33–36 | Chapter 2, part 1 |

With **Follow** on (default once you press play), the reader auto-turns to the page being narrated.
Tappable part-chips (1·2·3…) jump between segments. To add more: drop the MP3 in `/audio` and add
`{src, pg, sec, ps, pe}` to that chapter's `parts` array in `app.js`.

## Run locally
```bash
cd empire-familial-pwa
python3 -m http.server 8099
# open http://localhost:8099
```
(The flip engine, audio, and service worker need a real server — not `file://`.)

## Deploy to Vercel
Static site, `vercel.json` included (service-worker header, manifest type, long-cache for media,
`.vercelignore` trims unused files). With your repo connected to Vercel, just commit and push.
CLI alternative: `vercel --prod` from this folder.

## Files
```
index.html              app shell + styles
app.js                  chapters, i18n (FR/EN), page-flip reader, audio read-along
book-content.js         the book text, embedded (window.BOOK), extracted from the PDF
vendor/page-flip.browser.js   page-flip engine (self-hosted, offline-capable)
manifest.webmanifest · sw.js · vercel.json
assets/  audio/  icons/
IMAGE-PROMPTS.md        prompts for your designer (cover, icon, textures, ornaments…)
```
