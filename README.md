# Hema Vardhan Velaga — Author & Books

Static author website featuring The Road Back to Myself. No external dependencies, database, paid services, external fonts or tracking.

## Run the review draft

Run `node scripts/build.cjs` then `node scripts/serve.cjs`.
Open http://127.0.0.1:4173/mybook/. Stop with Ctrl+C. No install is required. `npm run build` and `npm run preview` are equivalent shortcuts.
The server exposes only an explicit public-file allowlist, never manuscripts or attachments.

## Source and editing

- index.html: all homepage sections and SEO metadata.
- styles.css, refinement.css, cinematic.css, final-polish.css, reading-book.css, author-site.css, interactions.css: authored styles, bundled in this order into site.css. Rebuild after edits and commit the bundle too.
- script.js: mobile navigation, reveals and verified purchase links. approvedStores stays empty until store links are confirmed.
- books.js: expandable catalog and requested under-wraps teaser. Future books need approved titles and individual story/preview/detail links.
- reading-book.js: approved opening, clearly labelled companion notes, stable-size spreads, animated sheet turns, swipe/keyboard controls and reduced motion.
- interactions.js: focus handling at anchor destinations.
- 404.html, sitemap.xml, .nojekyll: GitHub Pages support.

## Assets

The official front-cover PNG is preserved; the optimized JPEG displays it uncropped at its original proportions. Only the front panel is public. The river/cafe scene is AI-generated supporting artwork. The logo and signature were supplied by the author. The solo author portrait is AI-edited from the supplied photo; its room background is retained. The header logo has no backing box, as requested.
Never publish the wraparound cover, full interior PDF, manuscript, production files or personal records.

## Still needed

Verified purchase links, confirmed format availability/release announcement, optional public email/social profiles, and genuine reader reviews when available. No dates, prices, sales, availability or reviews are invented. A sample PDF needs explicit approval; only the short approved excerpt is shown. There is no nonfunctional newsletter form.

## Draft branch and publishing

The existing main branch is already publicly deployed from earlier approved work. The Phase 2 draft is prepared on a separate codex/ development branch. Do not merge, publish this draft, change visibility or Pages settings without explicit author approval. The existing Pages workflow targets main only.
After approval, merge the reviewed branch into main and verify deployment. Relative assets support /mybook/; canonical and sharing URLs use the existing public address and must change if the domain changes.

## Checks and packaging

Review desktop/tablet/phone layouts, menu and Escape, internal links, image loading, keyboard focus, reduced motion, JavaScript-free core content and nested /mybook/ paths. Confirm title, author and ISBN 978-93-345-7669-6. Browser smoke checks and asset sizes do not establish formal accessibility certification or field Core Web Vitals.
`python scripts/package.py` creates a ZIP using the explicit public-file allowlist and does not publish. Review screenshots remain in review/ and are excluded from packages.
