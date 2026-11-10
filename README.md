# The Road Back to Myself — official website

Author: **Hema Vardhan Velaga**  
Live project URL: **https://hemavardhan-midhtech.github.io/mybook/**  
Repository: **hemavardhan-midhtech/mybook**

This is a dependency-free static author website for *The Road Back to Myself*. It features the approved book cover, a synopsis, an author section, a book catalog, and a short interactive reading preview.

## Local review

From the repository root, run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000/ in a browser. For basic static checks, run:

```sh
node scripts/check-site.cjs
node --check script.js
node --check reading-book.js
node --check books.js
node --check interactions.js
```

These checks do **not** replace real desktop/mobile browser testing.

## Update the website

- `index.html`: book text, sections, links, SEO metadata.
- `styles.css`, `refinement.css`, `cinematic.css`, `final-polish.css`, `reading-book.css`, `author-site.css`, `interactions.css`: source CSS.
- `site.css`: generated stylesheet that browsers actually load.
- `script.js`: mobile navigation, scroll animations, future purchase links.
- `reading-book.js`: interactive **website preview panels**. Only the first panel contains a short approved novel excerpt; the other panels are clearly labeled companion notes and reflections, **not** manuscript pages.
- `books.js`: current book and future catalog placeholders.
- `assets/front-cover.jpg`: approved front-cover art, displayed without cropping.
- `assets/river-evening.jpg`: hero background and story image.
- `assets/author-logo.png`, `assets/author-portrait.jpg`, `assets/author-signature.png`: author visuals.

After editing any source CSS, regenerate the served stylesheet:

```sh
node scripts/build.cjs
node scripts/check-site.cjs
```

The build script also refreshes the stylesheet cache version in `index.html` and checks local HTML file references. Commit both generated files when they change.

## Publication safeguards

- The site is already configured for GitHub Pages and is reachable at the public project URL above, subject to deployment and host availability.
- Normal updates to the deployed `main` branch can automatically update the public GitHub Pages website. Review changes on a feature branch first, then merge only after approval.
- Do not upload the full manuscript, interior PDFs, production wraparound cover, private metadata, or any unapproved assets.
- Purchase links remain intentionally empty until verified Amazon URLs are approved. Do not imply the book is currently for sale.
- The approved paperback ISBN is **978-93-345-7669-6**. A Kindle edition is planned; no release date, pricing, ratings, or testimonials are invented.
- The approved front cover is `assets/front-cover.jpg`, **712 × 1076 px**. Keep its aspect ratio.
- The social sharing image currently uses the front-cover JPG, not a separate 1200 × 630 share card. Test the preview when a sharing crawler can access the deployed site.
- Confirm that the author portrait, logo, and signature are approved for public display.

## Launch QA checklist

1. Check the site at 320, 375, 768, 1024, and 1440 px viewport widths.
2. Check hero title, CTA, cover aspect ratio, and no horizontal overflow.
3. Open and close mobile navigation; check keyboard Escape and section anchors.
4. Test the reading preview's Next/Previous controls, wheel/swipe behavior, restart, and reduced-motion preference.
5. Verify all images, headings, ISBN, and social preview.
6. Test with JavaScript disabled; the first short excerpt and core book information should remain accessible.
7. Confirm that purchase buttons are not shown without verified product URLs.
8. Review Core Web Vitals and prioritize large image optimization if needed.

`scripts/package.py` creates an archive of public deployment files only. It never publishes the site.
