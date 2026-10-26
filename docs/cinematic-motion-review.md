# MK LAB — cinematic hero and musical categories

The user selected a cinematic hero and independent musical movement for Find Your Vibe. This is an animation-layer update of the existing Home, with the existing palette, typography, routes and concept disclosures retained.

## Motion decisions

- The title enters once through line masks: 850ms, 100ms line offsets, power3.out. It does not replay after pausing/resuming motion or returning to a scrolled position.
- On desktops at least 1024px wide and 700px tall, the leading project pulls back from a wide composition into a three-project bento. One ScrollTrigger pins that scene, with 650ms catch-up and a scroll range equal to 80% of the viewport height. Keyboard focus settles the scene.
- Smaller/shorter screens retain native unpinned scrolling with small 12px entrances. Server-rendered content remains visible without JavaScript.
- Each category has a separate phrase, duration, amplitude, initial phase and rest. The loops pause outside the viewport, in a hidden document, and individually on hover or keyboard focus. The existing global motion control and system preference disable the scene and loops through cleanup/reversion.
- WaterStory and water.css are no longer imported. Their previous source files are retained. Concept preview loops are quiet on Home while the cinematic scene and musical categories carry the motion.
- The final CTA has a violet surface and lime action, replacing the water-dependent background.

## Skill contributions

| Skill | Applied decision |
| --- | --- |
| frontend-design | The projects themselves are the central visual event; giant typography and the established multicolor identity remain. |
| hallmark | In-place scope, named tokens, honest concept copy, no new decorative objects or fake metrics, progressive enhancement. |
| web-design-guidelines | Semantic links, retained focus rings, pause control, reduced motion, transform/opacity animation and keyboard escape from pinning. |
| find-skills | Identified the now-installed Emil Kowalski and official GSAP skills during the selection stage. |
| better-ui | Interruptible pointer response, 0.96 press feedback over 150ms, hover gating and instant focus styling. |
| motion-design | Premium easing without overshoot in the hero; separate musical phrases, rests and restrained amplitudes in the categories. |
| ui-ux-pro-max | Local scroll-storytelling recipe: one pinned scene, asset/font refresh, no mobile pinning, visible static fallback. |
| animate / find-animation-opportunities | Motion concentrated in first-visit presentation and category exploration; no ambient animation on prices, purchase actions or frequently used navigation. |
| GSAP core / timeline / ScrollTrigger / React / performance | Scoped useGSAP cleanup, matchMedia responsiveness, controlled timelines, transform-based animation and offscreen suspension. |

## Verification

- TypeScript check passed.
- Production build passed.
- Home/collection/concept and retained-route HTTP checks passed.
- Simulated interaction checks passed: category navigation, touch feedback, pointer cancellation, motion preference, six independent phases/periods, offscreen/hidden-tab pause, per-note focus/hover pause, keyboard settlement, mobile unpinned behavior and listener cleanup.
- CSS reviewed for 320, 375, 414, 768 and desktop breakpoints; this is source inspection, not rendered-layout verification.
- **Not verified:** actual browser rendering, touch feel on a physical device, real frame rate and visual rhythm. The browser inventory exposed no available browsers or apps in this session. The simulation does not verify browser geometry or GSAP's rendered pin behavior.
