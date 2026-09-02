# Mehmet Oğuz Tulum — portfolio

A single-page personal site / online resume. Plain HTML, CSS and ~100 lines of vanilla
JavaScript. No build step, no framework, no third-party requests at runtime.

---

## Where to edit things

Almost everything lives in **one file**.

| What you want to change | Where |
| --- | --- |
| **All page text** — hero, experience, education, projects, skills, contact | `index.html` |
| Page title, SEO description, Open Graph / social card tags | `index.html`, in `<head>` |
| Colours, fonts, spacing, breakpoints | `assets/css/styles.css`, section **1. Design tokens** |
| Nav behaviour, entrance animations | `assets/js/main.js` |
| The resume PDF | `assets/resume/Mehmet-Oguz-Tulum-Resume.pdf` |
| Thesis, project study, certificates | `assets/docs/` |
| Favicon, social share image, portrait | `assets/img/` |

`index.html` is commented section by section (`<!-- ===== 01 · EXPERIENCE ===== -->`
and so on), so you can find any block by scrolling to its heading.

### Things to replace before publishing

1. **`REPLACE-ME.github.io`** — the canonical link and the Open Graph / Twitter tags.
   Six occurrences, all in `<head>`.
2. **`PORTRAIT SLOT`** — the monogram plate in the hero. See *Adding your portrait*.
3. **`link to be added`** — two placeholder slots in the Projects section. Each has a
   commented example `<a>` right above it; delete the `<span>` and paste the link in.
   They render as visibly dashed non-links, so nothing on the page is ever broken.
4. **Phone number** — deliberately left off the public page to limit spam. A
   commented-out `<li>` in the Contact section turns it on.

### Adding your portrait

The hero currently shows a designed navy plate with your monogram. To use a photo:

1. Save it as `assets/img/portrait.jpg` — a **4:5 crop** (e.g. 900 × 1125) under ~250 KB.
2. In `index.html`, find `HERO PORTRAIT` and replace the whole `<div class="portrait">…</div>`
   with the single `<img class="portrait" …>` line shown in the comment just above it.

The frame, the rounded corners and the quote underneath all stay as they are — the
`.portrait` class handles the crop and the radius, so nothing else changes.

### Changing the quote

It sits directly under the portrait, inside `<figcaption class="hero__quote">`.

### Swapping the resume

Drop the new PDF into `assets/resume/`, then update the one `href` in the Resume
section (`class="resume-card"`). It opens in a new tab rather than downloading, which
is what "View Resume" implies — remove `target="_blank"` and add `download` if you would
rather it save straight to disk.

### The linked documents

Three PDFs live in `assets/docs/` and are linked from the entries they belong to:

| File | Linked from |
| --- | --- |
| `Mehmet-Oguz-Tulum-Bachelor-Thesis-IFRS-18.pdf` | TUM entry, Education |
| `Mehmet-Oguz-Tulum-SAP-Project-Study.pdf` | SAP SE entry, Experience |
| `Mehmet-Oguz-Tulum-Funded-Trader-Certificates.pdf` | Prop firm evaluations, Projects |

**These two were redacted before publication** — the redactions remove the underlying
text, not just cover it:

- **Thesis**, title page: home address and matriculation number removed. Name, examiner,
  supervisor, and submission date kept.
- **SAP project study**, title page: all four students' matriculation numbers and
  university email addresses removed. All four names kept, as authors.

If you ever replace either PDF, redo the redaction — dropping in the original will put
that data back on the public internet. The originals are not in this repo.

Each link states the file size, because these are 0.8–1.2 MB and some people will open
them on mobile data. Update the size in the link text if you swap a file.

### Adding a project

Copy any `<li class="card">…</li>` block in the Projects section and edit it. The parts
are: `card__meta` (category / date), `card__title`, `card__body`, `tags`, `card__links`.

---

## Page order

Hero → Experience → Education → Personal Projects & Trading → Skills → Resume → Contact.

To reorder, move a whole `<section class="section" id="…">` block in `index.html` and
update the two-digit label inside its `section__label` (`01 — Professional`, and so on)
plus the matching `<li>` in the nav. Nothing else depends on the order.

---

## Running it locally

No build. Any static server will do:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly with `file://` mostly works too, but a server is closer
to how GitHub Pages will serve it.

---

## Deploying to GitHub Pages

All paths in the site are **relative** (`assets/css/styles.css`, not `/assets/...`), so
it works both at a user-site root and in a project subdirectory without changes.

**Option A — user site (`username.github.io`)**

1. Create a repo named exactly `username.github.io`.
2. Push these files to the default branch, at the repo root.
3. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Live at `https://username.github.io/` within a minute or two.

**Option B — project site (`username.github.io/portfolio`)**

Same, but the repo can have any name. The site is served from
`https://username.github.io/<repo>/`. Relative paths mean nothing else needs changing.

```bash
git add .
git commit -m "Portfolio site"
git push origin main
```

`.nojekyll` is included so GitHub Pages serves the files as-is instead of running them
through Jekyll. Keep it.

If a change doesn't show up, it's almost always browser cache — hard-reload
(<kbd>Shift</kbd> + reload) before assuming the deploy failed.

---

## Design system

Defined once as CSS custom properties at the top of `assets/css/styles.css`.

**Colour**

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#fbf9f5` | page background (warm off-white) |
| `--surface` | `#fffefb` | cards and panels |
| `--ink` | `#1f1e1b` | headings |
| `--ink-body` | `#3b3934` | body copy |
| `--ink-muted` | `#6c6860` | metadata, captions (5.2:1 on paper) |
| `--navy` | `#1b3a5c` | the single accent (11:1 on paper) |
| `--rule` / `--rule-strong` | `#e5e0d5` / `#d3ccbd` | hairlines |

**Type** — Fraunces (variable serif) for display, Inter for body, the system monospace
stack for metadata labels. Sizes are a fluid scale, `--step--1` through `--step-4`,
using `clamp()` so nothing needs per-breakpoint overrides.

**Spacing** — `--space-1` (0.25rem) through `--space-10` (8rem).

**Shape** — 3–4 px radii, 1 px hairlines, one soft shadow used only on hover.

**Breakpoints** — 359 (name steps down), 480, 560, 640, 700, 820 (nav collapses),
900 (two-column sections), 1120 (brand subtitle appears).

---

## Fonts

Fraunces and Inter are **self-hosted and subset** in `assets/fonts/` — about 138 KB for
the five files, versus ~700 KB for the full families. No call to Google Fonts, so
nothing leaks to a third party and there is no render-blocking round trip.

Each family has **two faces split by `unicode-range`**: a Latin file, and a
Latin-Extended file carrying the Turkish characters (ğ, İ, ş). Both are needed — the
Latin subset published by Google does not contain them, and without the second face
your own name falls back to a system font mid-word.

To re-subset after changing the copy:

```bash
npm i @fontsource-variable/fraunces @fontsource-variable/inter
pip install fonttools brotli
pyftsubset <source>.woff2 --output-file=assets/fonts/<name>.woff2 \
  --flavor=woff2 --text="<every character you use>" --no-hinting
```

If you add a character outside Latin-1 + Turkish (an arrow, a `≈`, a Greek letter),
either add it to the subset or it will render in a fallback face.

---

## Accessibility

Checked with axe-core: 0 violations (WCAG 2.1 AA + best practice).

- Semantic landmarks, one `h1`, headings in order
- Skip link to `#main`
- Visible focus ring on every interactive element
- Nav collapses to a real `<button>` with `aria-expanded` / `aria-controls`; Escape closes it
- Body and muted text both exceed 4.5:1 contrast on the paper background
- The hero pattern SVG is decorative and `aria-hidden`; swap in a portrait and give it real `alt` text
- Entrance animations are skipped entirely under `prefers-reduced-motion: reduce`
- Everything renders fully with JavaScript disabled

---

## Performance

- ~300 KB total for the page, styles, script, fonts and images (the resume PDF loads on demand)
- No frameworks, no runtime dependencies, no external requests
- Fonts preloaded with `font-display: swap`
- Animation limited to `opacity` and `transform`; the scroll listener is `passive` and
  rAF-throttled

---

## File map

```
.
├── index.html                  all page content
├── .nojekyll                   tells GitHub Pages to skip Jekyll
├── README.md
└── assets/
    ├── css/styles.css          design tokens + all styles
    ├── js/main.js              nav, scroll spy, reveals
    ├── fonts/                  Fraunces + Inter, subset
    │   ├── fraunces-latin.woff2
    │   ├── fraunces-latinext.woff2
    │   ├── fraunces-italic.woff2
    │   ├── inter-latin.woff2
    │   └── inter-latinext.woff2
    ├── img/                    favicon.svg, favicon.png, og-image.png
    └── resume/Mehmet-Oguz-Tulum-Resume.pdf
```
