# Image prompts for your designer / image-AI

These are the images that would take the app from "uses existing photos" to fully polished.
Each block has: **where it goes**, **exact size + format + filename**, and a **ready-to-paste prompt**
plus a **negative prompt**. Keep everything in the brand palette and avoid generic/stocky AI clip-art.

## Brand reference (paste at the top of any prompt)
- Palette: deep espresso brown `#241a12`, slate blue-grey `#3b4651`, antique gold `#c9a24e`,
  light gold `#e8c170`, warm cream/parchment `#faf6f0`.
- Motif: an empire/castle + family + foundation stones; faith-rooted, dignified, editorial.
- Mood: warm, premium, timeless. Think a fine hardcover book, not a tech app.
- Avoid: neon, sci-fi, cartoon mascots, emoji-style icons, glossy 3D plastic, busy gradients,
  watermarks, text artifacts, extra fingers/limbs.

---

## 1. App icon  ·  `icons/icon-512.png` (+ 192) and `icons/icon-maskable-512.png`
**Where:** home-screen icon, browser tab, splash.
**Size:** 1024×1024 master, export 512 & 192. For maskable, keep the mark inside the centre 66% (safe zone).
**Format:** PNG, flat (no rounded corners — the OS adds them).

> A refined app icon on a deep espresso-brown background (#241a12). Centered emblem: a minimal
> golden castle keep with three towers, its base merging into two interlocking foundation stones,
> rendered as a single elegant line-and-fill mark in antique gold (#c9a24e to #e8c170 gradient).
> Subtle embossed depth, premium engraved feel, perfectly centered, generous padding, symmetrical,
> luxury book-imprint aesthetic.
> **Negative:** text, letters, photo, drop shadow on edges, rounded corners, clutter, neon, cartoon.

---

## 2. Hero cover render  ·  `assets/book-stack.png`
**Where:** top of the home screen (the floating cover).
**Size:** 1200×1200, **transparent background**, PNG.

> A photorealistic 3D render of the hardcover book "Bâtir un Empire Familial — Tome 1" standing
> upright at a slight three-quarter angle, premium matte cover in espresso brown and slate with a
> gold-foil castle illustration and gold title, a thin gold ribbon bookmark, soft studio lighting,
> gentle contact shadow, floating on a fully transparent background, crisp edges, e-commerce hero quality.
> **Negative:** background scene, table, hands, reflections clutter, text errors, multiple books unless stacked neatly.

---

## 3. Reading-paper texture  ·  `assets/paper.jpg`
**Where:** background of the reader pages (set `.r-book` background to this).
**Size:** 1600×2400, JPG, **seamless/tileable vertically**, very subtle.

> A soft warm parchment paper texture in cream (#faf6f0), extremely subtle fibre grain and faint
> vignette at the edges, no creases or stains, even lighting, high-key, gentle and unobtrusive so
> dark text stays perfectly readable on top, tileable. Premium ebook page feel.
> **Negative:** heavy texture, yellow stains, wrinkles, torn edges, patterns, illustrations, high contrast.

---

## 4. Hero ambience (optional)  ·  `assets/hero-bg.jpg`
**Where:** faint backdrop behind the hero cover.
**Size:** 1200×1500, JPG, dark, low-contrast (it sits behind content).

> A dim, atmospheric backdrop: silhouette of a noble castle on a hill at golden dusk, blended into
> deep espresso-brown shadow, faint gold light rim, lots of negative dark space in the lower half for
> text, painterly and elegant, cinematic but quiet.
> **Negative:** bright, busy foreground, people, text, logos, lens flare overload.

---

## 5. Author portrait treatment  ·  `assets/author.jpg`
**Where:** the slim author card on the home screen (round crop).
**Size:** 800×800, JPG, face centred in the upper third (round crop friendly).

> Clean, dignified editorial portrait of a distinguished African pastor/author in a tailored suit,
> warm soft studio light, neutral espresso-to-cream background, gentle gold rim light, confident kind
> expression, square crop with the face in the upper-centre, magazine-quality retouching.
> **Negative:** harsh shadows, cluttered background, busy patterns, oversaturation, distortion.
> *(If you only have existing photos, ask the AI to relight/clean-background the real photo rather than invent a face.)*

---

## 6. Chapter ornament / divider  ·  `assets/ornament.svg` or `assets/ornament.png`
**Where:** under each chapter heading in the reader, and section dividers in the library.
**Size:** 400×80, transparent PNG (or vector).

> A slender symmetrical gold filigree ornament / fleuron, thin antique-gold line work with a small
> central diamond and tapering flourishes, classic book-typography divider, on transparent background.
> **Negative:** thick, ornate baroque overload, color other than gold, background fill, text.

---

## 7. The four "part" emblems (optional, nice-to-have)  ·  `assets/part-{truths,battles,riches,foundation}.png`
**Where:** the four section labels (4 Vérités, 4 Batailles, 4 Richesses, La fondation).
**Size:** 240×240 each, transparent PNG, consistent line-icon set in gold.

> A set of four matching minimalist gold line emblems on transparent backgrounds, same stroke weight
> and style: (1) an open book with a key = truths; (2) a shield with a small sword = battles;
> (3) a coffer/treasure chest with a family crest = treasures; (4) a cornerstone with a cross-etched
> foundation = spiritual foundation. Engraved, elegant, cohesive icon family in antique gold.
> **Negative:** mismatched styles, color, fills, cartoonish, 3D plastic, text.

---

## 8. PWA splash / launch image (optional)  ·  `assets/splash.png`
**Size:** 1290×2796 (iPhone), espresso background.

> A vertical launch screen: espresso-brown background, the gold castle emblem centred in the upper
> half, the title "Bâtir un Empire Familial" in elegant gold serif beneath, a thin gold rule, lots of
> calm negative space. Premium, restrained.
> **Negative:** busy, photographic, multiple elements, bright colors.

---

## 9. Social / share card  ·  `assets/og-cover.jpg`
**Where:** link previews (Open Graph), 1200×630 JPG.

> A landscape share card: the 3D book cover on the left, on the right the title "Bâtir un Empire
> Familial — Tome 1" and "Ebook + livre audio" in gold serif, espresso-and-slate background with a
> faint castle motif, clean and premium.
> **Negative:** cluttered, tiny text, low contrast, watermark.

---

### After your designer delivers
Drop files into `assets/` (or `icons/`) with the **exact filenames above** and they'll slot straight in.
For the reader paper texture and ornament, tell me and I'll wire them into the CSS.
The icon files also feed `manifest.webmanifest` (icons 192/512/maskable) — same names, no other change needed.
