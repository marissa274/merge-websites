# MK LAB — expressive redesign

User-directed redesign of Home and Collection, with shared floating navigation and dark/light theme. Existing account, commerce, authorization, persistent records, and route ownership remain in place. No production files or routes are deleted.

The user explicitly overrides the previous single-accent, modest-display, restrained-motion system: deep black default; pale pink light mode (never beige); coral, lime, violet, yellow, pink and turquoise used in harmony. Atmospheric/playful bespoke direction, Hero + asymmetric Bento composition. N5 floating pill navigation, compact on scroll; statement-led close. Previous N9 / Portfolio Grid is replaced at the visual layer.

Archivo display and Space Grotesk UI are retained, locally hosted. Oversized type intentionally exceeds Hallmark's default size cap, per the user. The opening has a masked procedural art layer reacting to pointer movement, with short-lived brush trails; no WebGL or large animation dependency. Coarse-pointer screens get a gentle, finite introductory reveal and touch response. Animation stops when offscreen, hidden, paused, or reduced motion is active. A visible motion control supplements system preferences.

Four original rendered website concepts: MUSE (beauty, pink/coral), OFFGRID (gaming, violet/lime), Sunday (food, coral/yellow), Studio 09 (fashion, turquoise/yellow). Each is a real rendered HTML/CSS preview, linked to its own limited concept page. No invented sales listings: each caption shows “Concept · price pending” rather than fabricated prices. Real published products replace the concepts when supplied. Photos are illustrative local Unsplash assets. No copied Dribbble design; the supplied URL did not load.

Home sequence: floating nav → giant three-line headline and interactive artwork → interlocked project bento → “Explore More — View Our Collection” → oval category equalizer → multicolored typographic studio statement → oversized animated inquiry CTA.

Collection: rounded search, compact Filters disclosure with category pills and price inputs; separate native sorting control. Multiple categories + query + sort + budget live in URL search parameters. Active category chips can be cleared. Category links from the equalizer target Collection directly. The collection is useful with no real inventory because design concepts remain clearly separate from available products.

Motion: Premium/expression hybrid. Finite 500–800ms staged hero; compositor transforms for shapes, cards and category bars; 150ms .96 press feedback; 300ms panels. Reduced motion keeps all content visible and disables spatial effects. No scroll interception, custom cursor, blocking transition, autoplay audio, or continuous offscreen rendering.

Validation: TypeScript + production build, route/content HTTP checks; browser availability rechecked before visual QA. Never claim a visual viewport pass without a browser.
