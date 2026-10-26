# Collection — immersive mosaic

The user selected the immersive mosaic, with COLLINS as the image-first reference. The Collection is a dedicated catalogue with tightly grouped, oversized original project covers. It retains the existing Home, brand, navigation, checkout ownership and access policy.

## Design and behavior

- Compact “Explore Our Collection” introduction, rounded search, visible product/study counts, separate filter disclosure and native accessible sort selector.
- Six-position immersive mosaic: a large two-row lead, two stacked previews, one tall cover and two panoramic pieces. Compact 12px gaps, inset captions and small corner radii. Filtered subsets adapt spans to avoid empty trailing regions. Tablet and mobile reflow without changing DOM reading order.
- Product imagery is sampled locally after loading to choose a named palette token. Neutral/unsampleable artwork stays neutral. Concepts use their existing project colors and actual rendered concept previews.
- Six existing design studies are available: MUSE, OFFGRID, Sunday, Studio 09, Forma and Still / Life. No purchasable listings, prices, dates or popularity figures were invented.
- Filter panel contains category/style chips, budget inputs, last-30-days and confirmed-purchase filters. Popular/newest sorting uses paid-order aggregates and existing creation timestamps. Unknown concept prices/dates do not qualify as free/new items.
- Filters are represented in the URL and applied during server rendering, with browser back/forward synchronization. Reset returns to the complete catalogue.
- Six entries load initially; Load more appends the next six. Keyboard activation transfers focus to the first newly exposed preview.
- Desktop actions appear on hover/focus; touch and narrower layouts show them persistently. Preview opens the existing detail, Buy now preserves/deduplicates the bag and opens checkout, and Personalize preserves the selected design through sign-in. Concepts keep purchasing disabled.
- Full-viewport tinted surfaces crossfade over 1400ms according to visible artwork area and centrality. Same-color projects are grouped, with 10% hysteresis around ties to prevent flickering. IntersectionObserver handles scrolling; a narrowly filtered MutationObserver handles image palette updates. No per-frame scroll loop is used. Entrance motion uses scoped GSAP transform/opacity tweens, short offsets and bounded stagger. No scrolling is pinned. Reduced motion/global pause disables spatial animation and atmospheric shifts.

## Seven requested skills

| Skill | Contribution |
| --- | --- |
| frontend-design | Exhibition structure, varied proportions and compact introduction, using the existing Archivo/Space Grotesk identity. |
| hallmark | In-place redesign, named color tokens, distinct project environments, no fabricated catalogue facts or fake browser chrome. |
| web-design-guidelines | Accessible labels and controls, inert closed filters, Escape/focus return, keyboard-visible actions, stable image dimensions, URL state and reduced motion. |
| find-skills | Checked the directory and official GSAP search results; existing GSAP skills cover the requirements without another installation. |
| better-ui | Consistent chip states, instant focus rings, interruptible disclosure, hover gating and 0.96 press feedback. |
| motion-design | Restrained premium entrances, small offsets, smooth atmospheric crossfades and controlled hover movement without bouncing. |
| ui-ux-pro-max | Local responsive/scroll-reveal guidance: no horizontal scrolling, visible static content, low stagger budget and reduced-motion fallback. |

## Verification and limits

- TypeScript and production build passed.
- Model tests passed for catalogue completeness, accented search, tag/style matching, combined filters, actual-date/popularity sorting, invalid budgets, unknown concept prices, URL round trip and image hue selection.
- Simulated component interactions passed for Load more, search URL changes, filter disclosure/Escape/inert state, bag preservation, deduplication, full bag and blocked storage.
- SQL tested against an in-memory database: drafts excluded, pending orders not counted, paid purchases counted, creation dates retained.
- HTTP checks passed for Home, Collection, concept pages and retained routes. Filtered server-rendered routes returned the expected counts for category, style, budget and no-match searches. Personalization preselection and sign-in return URL were verified.
- Responsive CSS inspected for 320/375/414/768px and desktop; DOM reading order remains unchanged. Actual rendered geometry, physical touch feel and animation frame rate were **not verified**: the available browser inventory returned no apps or browsers. Simulated checks are not a visual or real-browser accessibility audit.

## Immersive direction validation

- Original HTML covers replace miniature nested bento previews in Collection; Home now uses the shared six-cover mosaic after its hero; detail routes retain their existing previews. Images and artwork are from the existing MK LAB project, not copied from COLLINS.
- New dominance tests cover visible area, centrality, grouped colors, near-tie stability, late palette sampling, empty results, reduced motion and observer cleanup.
- TypeScript, production build, handler/model tests and retained-route HTTP checks passed for this revision. Browser inventory again returned no apps or browsers; rendered geometry and animation feel remain unverified.

## Placement correction

The current layout is documented in `home-and-collection-layout.md`: the immersive mosaic is now on Home; Collection uses a staggered portrait poster shelf based on the user’s current COLLINS screenshots. Shared actions, palette extraction and atmospheric behavior remain in both experiences.
