# Calm surface → one drop → impact → footer

24 October 2026. This direction supersedes the filled-puddle implementation. Its components, material model, displaced texture, multicolor contour and tests have been deleted. The existing typography, Home composition, concept previews, marketplace routes and dark/pale-pink themes remain.

## Art direction

The hero contains no filled liquid mask or cursor-following object. Thin pink/orange water fronts expand from fixed contact points, with small edge displacement, shallow perspective, a faint halo and rapid damping. Moving the mouse seeds new surface disturbances; taps emit short echo waves. Passive touch movement does not activate hover behavior. The Waves button supplies keyboard activation. The effect settles and stops scheduling after interaction.

A single custom SVG teardrop emerges as scrolling starts. Its elongated silhouette, transparent warm fill, narrow rim, tapered light strokes and small refracted lines replace the former puddle. Mouse coordinates do not affect the drop's position. It follows a continuous page-space route: emergence → gallery margin → a quiet About pause → accelerated fall. It stays behind the content and never replaces any project previews or heading.

At impact, a low fan opens outward with three dissipating wave fronts. Accumulated water expands horizontally and forms a pale rose/peach footer surface. Formation completes in 950 ms even if the visitor stops scrolling. One damped surface oscillation follows impact. Text and links stay stable; wordmark and navigation enter only when their own rows become visible. Reverse scrolling blends the settled material back toward the drop instead of abruptly swapping visuals. Footer touch/mouse input can seed localized waves.

## Interaction and performance

One passive scroll listener, one RAF scheduler, cached geometry, no state updates per frame, no animation libraries or raster effects. Desktop schedules at most once per display frame up to 60 Hz; coarse input is capped at 30 Hz. These are scheduling targets, not measured achieved frame rates. Offscreen Home, hidden tabs, settled interactions and finished splash stop scheduling. The footer has no perpetual motion loop.

Pause/system reduced motion paints the static final footer and visible About copy, without moving the drop or emitting spatial waves. A CSS background preserves footer contrast before hydration or without JavaScript. All decorative SVG content is assistive-tech hidden and pointer-transparent. No scroll interception.

## Cards

Existing separate arrival/idle/hover/press layers remain. Independent pill/rest timings use smaller 4–5 px gestures; magnetism is limited to 3/4 px and gentle tilt. Hover stretch is reduced. The native anchor hit box is stable, focus pauses idle motion, and .96/150 ms press feedback retains the opacity-only reduced variant. The three-column narrow-phone layout retains 44 px widths.

## Validation boundary

Model tests cover 320/375/414/768/1024/1280/1440 widths, continuous single-drop geometry, downward emergence, gravity acceleration, footer coverage and static reduced state. Simulated component tests cover fixed-origin waves, cursor independence, single RAF, cached layout, touch alternatives, timed splash completion, reverse scrolling, pause and cleanup. HTTP checks cover the new markup and existing routes. Offline SVG art studies inspect the actual drop paths and material at 320/1280 widths.

No browser is connected. These checks are not real mobile/desktop page screenshots, physical touch, keyboard walkthrough, computed-style contrast or achieved-frame-rate measurements. Final browser acceptance remains open.
