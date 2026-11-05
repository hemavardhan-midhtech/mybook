# The Road Back to Myself

Official book and author website for Hema Vardhan Velaga. A dependency-free, responsive static site with semantic HTML, local illustrations, accessible mobile navigation, and reduced-motion support.

## Run locally

From `/workspace/mybook` (or your checkout directory):

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000` locally. No installation, build, database, credentials, or paid services are required. All assets use relative paths, including deployment beneath `/mybook/`.

## Edit

- `index.html`: approved book copy, sections, chapter list, metadata, and details.
- `styles.css`: design tokens, layouts, and responsive styles. Typography uses local system fonts (Georgia and Arial) to avoid external font requests.
- `script.js`: mobile menu, optional scroll reveals, and reusable purchase-link creation. `approvedStores` is deliberately empty. Add only author-approved, verified HTTPS URLs; never imply availability before confirmation. Update the availability note when links are approved.
- `assets/`: local artwork. The sunset river SVG is an original temporary illustration created for this draft; it has no third-party attribution requirement. It is not the approved book cover.

## Assets and decisions needed before launch

1. Approved front-cover artwork is installed as `assets/front-cover.png`. Both cover displays now use the exact approved front-cover PNG supplied by the author. Do not put the wraparound artwork, production files, manuscript, or full interior PDF in the public repository. The accessible cover images retain the original 712 × 1076 proportions.
2. Approve or replace the original temporary river illustration and author biography. Author portrait is optional; a monogram is used now.
3. Supply verified purchase URLs, confirmed launch information, social profiles, and any approved sample PDF when available. The site currently shows only the approved opening excerpt; there is no sample download, newsletter form, fabricated review, rating, or release date.
4. After the final public URL and cover are approved, set an absolute `og:image` URL for an optimized JPG/PNG sharing image (SVG support varies by social network), add `og:url` and a canonical link. Current Open Graph image is the approved local cover PNG; make its URL absolute after hosting is confirmed.

## GitHub Pages deployment — prepare only, approval required

This source is directly deployable; no build is needed. **Do not enable deployment or push a publishing change without the owner's approval.** No deployment workflow is installed, so a future push cannot accidentally trigger a new workflow from this draft.

After approval: commit and push the reviewed files to the repository. In GitHub repository Settings → Pages, choose **Deploy from a branch**, select the approved branch (normally `main`) and `/ (root)`, then Save. Keep repository visibility unchanged. GitHub Pages serves this site under the repository path; verify the actual assigned URL, nested-path assets, navigation, and social preview after deployment. To use Actions instead later, add an approved static-site Pages workflow at that time.

## Review and verification

Browser smoke checks should cover desktop and mobile rendering, no horizontal overflow, all internal anchor targets, menu open/close and Escape behavior, image loading, reduced motion, JavaScript-disabled content, and `/mybook/` path loading. Confirm title, author, and ISBN `978-93-345-7669-6`. Screenshots in `review/` document the current draft. Core Web Vitals require measurement after hosting; no field-performance claim is made.

## Future content

The standalone story, journey, excerpt, author, details, and reader-connection sections can grow independently. Add only approved announcements and verified reviews to the reader-connection section. A newsletter requires an actual service integration, consent wording, and privacy information; do not add a decorative subscription form.

## Approved front cover

`assets/front-cover.png` is the exact unmodified PNG extracted from the author-supplied `logo.zip`. Both book displays use semantic HTML images, including when JavaScript is disabled. It is displayed uncropped with its original 712 × 1076 aspect ratio. To update it later, replace only this public front-cover asset with an author-approved file and update dimensions if necessary. The ZIP and wraparound artwork are not included in the site.

## Deployment package

`python3 scripts/package.py` builds `/workspace/deliverables/mybook-website.zip` (or `<checkout-parent>/deliverables/mybook-website.zip` outside this environment). The archive contains only public website files and `.nojekyll`, with `index.html` at the root. It excludes Git metadata, attachments, screenshots, tests, and production files. This command creates a local archive only; it does not publish or push anything.


## Author book catalog
The site now has an author-level header, Books catalog and Updates section. Add approved books to the authorBooks array in books.js with unique story, preview and details URLs (separate static book pages work well for future titles). The catalog renders a grid automatically as titles are added. Keep the static fallback in index.html aligned with the catalog for visitors without JavaScript. Existing story, excerpt and product sections belong to the featured debut novel; do not duplicate their IDs for another title. Never add unannounced titles, dates or store links.
