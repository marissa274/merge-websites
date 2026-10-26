# Home mosaic and Collection poster shelf

The user clarified the placement after viewing the current COLLINS case-studies page and supplying two screenshots. The previously implemented immersive mosaic belongs on Home immediately after the hero. Collection now follows the screenshot's vertical, staggered poster shelf.

## Result

- Home: existing hero, then six featured product covers (or the six existing design studies when no products are published), followed by Explore More, Find Your Vibe, About and the final CTA. The old pinned project composition is no longer mounted. The title entrance and independent musical category capsules remain.
- Collection: portrait covers with common row baselines, varied top positions, larger vertical row gaps and alternating five/four project placement on wide screens. Breakpoints reduce to four, three, two and one column. Filtered subsets remain usable without forced horizontal scrolling.
- `gallery-work.tsx` shares project imagery, preview/buy/personalize actions, image palette sampling and bag handling.
- `gallery-motion.tsx` shares reveal-once motion, visible-area/centrality color selection, hysteresis, palette-update observation, cleanup and reduced-motion handling.
- Home's changing atmosphere is bounded to the mosaic section. Collection retains its viewport atmosphere.
- The reference informs layout only: all six concept covers, copy and images remain MK LAB originals; no COLLINS client artwork or branding is copied.

## Design skill application

The established seven-skill system continues: frontend-design and hallmark separate the two page compositions within the same brand; better-ui and web-design-guidelines keep interaction/focus/touch behavior consistent; motion-design and ui-ux-pro-max guide the shared color/reveal behavior and responsive reflow; find-skills previously identified the installed GSAP tools used here. No additional installation is needed for this layout change.

## Validation

TypeScript, model/handler tests, shared atmosphere lifecycle tests, hero/category lifecycle tests (including absence of the old stage) and Home/Collection/retained-route HTTP checks passed. Production build passed.

CSS was reviewed for narrow mobile, tablet and wide-screen breakpoints. A real browser is unavailable in this session, so visual geometry, exact resemblance to the screenshots and physical touch/animation feel are not claimed as verified.
