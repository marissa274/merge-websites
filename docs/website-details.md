# MK LAB revised website details

Scope: individual `/collection/:slug` and the shared preview-only `/concepts/:slug` details. Home and Collection layouts are unchanged.

## Customer experience

1. Hero: large product screenshot with adjacent CAD price, Buy Now, Personalize and Watch Website Demo. On mobile the image and purchase controls stack, with the two primary actions side by side.
2. Up to six selected video demos. The hero action opens the gallery; each thumbnail opens one video in the same accessible dialog. No video loads before selection. Closing or returning to the gallery pauses and unmounts playback.
3. One Website. Three Devices. Fully Responsive. A large centered laptop shows the product's desktop screenshot; below it, a smartphone (Mobile, left) and a tablet (Tablet, right) show that same product's mobile and tablet screenshots. See *Device showcase* below.
4. About This Website: concise supplied description and optional benefits.
5. Included pages, actual functionality and technical facts from product data.
6. License and delivery information.
7. Final purchase CTA.
8. Up to three other published products, then Back to Collection.

Redundant scroll invitations, repeated project descriptions, decorative captions, the former sticky purchase shortcut and long public-preview explanatory text were removed. Image-review controls use an icon and accessible name. Essential availability, license and delivery conditions remain legible.

## Administration and data

Admin → Websites → Edit website → Editorial details & approved previews controls project colors, typography, motion rhythm, positioning, About copy, included pages, actual functionality, technologies, compatibility, delivery format/process, hosting, deployment, documentation, recurring costs, license restrictions and customization options.

Device showcase screenshots have their own slots under Editorial details & approved previews → Device showcase: choose a Desktop, Tablet or Mobile file, then Save website. Slot uploads never replace the product's main image. Other media: upload public preview media with the existing upload form, then copy the returned media ID into a selected screenshot or video entry. Screenshot roles: hero, desktop, mobile, tablet, detail. Choose Screenshot to add a device presentation, or Finished mockup to display a composed artwork unchanged. No unrelated example screenshots are inserted.

Add up to six videos with a title, uploaded public MP4/WebM media ID, optional public poster-image ID and optional transcript/descriptive walkthrough. Removing all videos clears the previous single-video setting. Existing single-video metadata migrates into a one-item gallery when first read.

Product and normalized presentation save atomically under `product:<id>:presentation` in the existing settings table; no database migration is needed. Every screenshot, video and poster must belong to that product and be public. The server also filters these references on read. Private archives, repositories, credentials and delivery assets are never included in preview data.

The public media endpoint supports bounded byte-range requests for efficient video loading and seeking. Private-media requests are rejected before accessing object storage.

## Commerce

Buy Now uses the existing selected-product bag → checkout flow. Personalize retains the product. Ask the studio retains project context through the account-backed inquiry/sign-in flow. No live payment was performed during development.

Buying remains unavailable for concepts, incomplete product purchase conditions, or incomplete payment/legal configuration. The checkout endpoint retains its server-side checks. Concepts do not acquire invented prices, included features, mobile captures or video demos. Missing demos produce an explicitly unavailable action; they do not open a fake gallery. Related items come only from published products.

## Skills and review

- frontend-design: asymmetric artwork/purchase hero and media-led editorial order.
- hallmark: preserves MK LAB identity, removes redundant copy, keeps inventory honest. The user's explicit device-frame request overrides its default no-device-chrome rule.
- web-design-guidelines: semantic controls, keyboard/focus handling, reserved media dimensions, reduced motion, lazy video loading.
- find-skills: reused the already discovered and installed GSAP React/ScrollTrigger skills; no redundant animation library.
- better-ui: consistent Lucide icons, visible focus, 44px+ targets, 150ms / 0.96 press feedback, hover-capability guards, contained dialog scrolling.
- motion-design: restrained hero reveal and separate desktop scale, mobile slide and tablet depth, with gentle scroll motion.
- ui-ux-pro-max: modal keyboard/focus search, unobscured controls, responsive layout and readable type. The first purchase-visibility query returned an unrelated password result and was rejected; the narrower modal query supplied applicable guidance.

Amethyste's licensed webfont is still not supplied; existing local fonts remain the fallback.

## Verification limits

TypeScript, production build, SSR product fixture with six demos and all three device roles, media normalization/API ownership tests, byte-range streaming tests, modal playback handlers, motion lifecycle/reduced-motion checks, existing page regressions and local HTTP checks are run before publication.

No real published product media/video library was supplied for this task. Those sections populate from the owner's actual uploads. No fictional stock was published.

Browser automation returned no available surfaces. Rendered review at 320 / 375 / 414 / 768 / desktop widths, touch behavior and real browser dialog focus/playback remain unverified. Code review and simulated interactions do not replace that review.

## Removed: scroll composition (25 October 2026, at the user's request)

The overlapping two-screenshot collage below was removed; the page now goes from the hero/demos straight to the device showcase.

### Former description

Between the demo gallery and device showcase, the third supplied reference is interpreted as two overlapping views of the same website on its project-color canvas. The approved hero screenshot sits in front of another approved desktop/detail screenshot. If only one approved image exists, its decorative background echo is a crop of that same image. Existing concepts reuse their own artwork in this composition; no additional page or screenshot is claimed. Products with no approved images omit the composition.

GSAP ScrollTrigger ties the two layers to viewport entry, with opposite initial travel and a small foreground scale. No pinning or scroll interception. Mobile travel is reduced; user pause and reduced-motion restore a fully visible static composition. Each actual screenshot remains individually reviewable; a focused layer rises above the other.

## Device showcase — 25 October 2026

Replaces the earlier border-drawn device scenes, which rendered nothing unless desktop/mobile/tablet roles existed, so most products showed only the collage and About text.

- **Same product only.** Laptop = `desktop` screenshot (falls back to that product's `hero`). Phone = `mobile`. Tablet = `tablet`. A device never borrows another device's screenshot. A missing one shows a striped, labelled placeholder (“Mobile screenshot coming soon”). Concepts show their own artwork in the laptop and state that mobile/tablet layouts were not captured.
- **Fitting.** Each screen takes its screenshot's proportion within real device ranges (laptop 1.42–1.78, phone 0.42–0.52, tablet 0.66–0.8 portrait or 1.3–1.6 landscape; a landscape tablet capture switches the tablet to landscape). Taller full-page captures keep the default screen. Images use `object-fit: cover` anchored top-centre, so they are never stretched and navigation is never cropped. The phone has a status-bar strip, coloured from the capture's top edge, so the dynamic island never covers navigation.
- **Composition (matched to the user's four references).** Labels Desktop / Mobile / Tablet sit above each panel. Desktop: light studio surface tinted by the product palette, a large MacBook-style laptop (thin bezel, notch inside a menu-bar strip so it never covers navigation, slim base) with the same product's phone overlapping the lower right. Mobile: dark sculpted surface, the phone resting at −16° and running off the lower edge, with a 9:41 status bar. Tablet: the product colour, a classic tablet with front camera and home button, the same phone entering from the right edge. Companion phones only appear when a mobile capture exists and are decorative (not focusable, no lightbox).
- **Concepts (no uploaded captures).** `app/concept-site.tsx` turns each concept's existing cover copy, imagery and palette into a small responsive homepage. It is laid out live at the device's CSS width (1440 / 834 / 390) and scaled into the screen; container queries give the laptop, tablet and phone their own layout of the same site. Products still use only their own uploaded screenshots.
- **Bodies.** Pure CSS, scaled with container units: laptop lid, camera, hinge base, thumb groove and floor shadow; phone metal band, concentric corners, island and side button; tablet bezel and camera. Forced-colors mode draws outlines.
- **Motion (GSAP ScrollTrigger, scrubbed, no pinning).** Laptop: scale 0.92→1 rising 64px. Phone: from the left with −7° rotation, 0.94 scale and 0.35 opacity, settling to neutral. Tablet: from the right with −14° Y-rotation depth and 0.92 scale. Small screens use smaller offsets. Only the device moves; the coloured stage stays still. Reduced motion or the page pause control shows the final state.
- **Lightbox.** Selecting a screen opens that screenshot in the existing accessible dialog (focus trap, Escape, labelled close). Drag and context-menu saving are discouraged. Only approved public preview media is ever referenced; this deters casual copying but cannot prevent screenshots.
- **Captures to upload.** Desktop 1440 × 900, tablet 834 × 1112 (or 1112 × 834), mobile 390 × 844 CSS pixels; 2× exports are fine.

Verified: TypeScript, production build, SSR tests (each device contains only its own product screenshot, placeholders, concepts, composed mockups, protected enlarge), motion parameter/cleanup tests, and headless-Chrome renders of the built CSS at 1440 / 768 / 375 / 320 with a three-viewport capture of one sample site. Not verified: live scroll playback in a browser, real touch, and the local `npm start` preview, which returns HTTP 500 on every route with or without this change.

## Local production preview fix — 25 October 2026

`npm start` returned HTTP 500 on every page. Cause: `gsap.registerPlugin()` ran at module load in `detail-motion.tsx`, `cinematic-motion.tsx` and `gallery-motion.tsx`. That wakes GSAP's ticker, which calls `setTimeout`, and Cloudflare Workers forbid timers in global scope. Registration now runs only in the browser. After rebuilding, restart `npm start`: a running Wrangler process can keep serving the previous build's chunks.

Verified on the production build with headless Chrome over CDP: all pages 200, 12 concept HTTP checks pass, no horizontal overflow at 1440 or 390, and the scroll choreography measured live (laptop 0.92/+64px → 1; phone −7° at 0.35 opacity → neutral; tablet Y-rotation depth → neutral).
