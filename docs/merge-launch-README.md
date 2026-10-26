> Documentation historique avant unification. Voir le README à la racine pour les chemins et commandes actuels.

# Merge event launch

A responsive, buildless developer event landing page. Serve `dist/` with any static HTTP server. The event identity and proposed program are a launch concept. Replace the event details and connect a real registration provider before accepting registrations.

The signup form validates input and shows a preview confirmation. It sends and stores no personal information. Fonts are loaded from Google Fonts; display and sans-serif fallbacks remain available offline.

Design tokens live in `dist/tokens.css`; page styling and behavior are in `dist/styles.css` and `dist/app.js`.

## Event pages

- `dist/hackathon.html`: interactive tracks, animated prototype stages, participant checklist.
- `dist/lan-party.html`: animated network, selectable game modes, conceptual room layout.
- `dist/ctf.html`: local Base64 challenge, hints, solution, flag validation, reset and checklist.

New event pages are in French. All event details remain illustrative. `src/events.js` uses the Motion JavaScript library, bundled locally into `dist/events.js`; there is no runtime dependency on an animation CDN.

Run `npm install` and `npm run build` to rebuild animations after source edits. A global motion pause button, reduced-motion preference handling, and pause when the document is hidden are included.

## Local reference refresh — 22 October 2026

The homepage now uses an immersive editorial layout inspired by the exploratory composition of https://gif.garajedeideas.com/ and the loading-screen structure of https://emotion-agency.com/. Source-site scripts and artwork were not reused. Four original SVG assets and locally hosted free Google Fonts are included.

Run `npm run dev` and open http://127.0.0.1:4173. Use “Revoir l’intro” in the footer to replay the loader. Run `npm run build` after changing `src/atelier.js`. The gallery has functional filters and detail dialogs; the menu supports Escape and Cmd/Ctrl+K. The form remains a local preview. Existing event pages are preserved.

This refresh is local only: no commits, pushes, or deployments. Browser visual verification remains unavailable in the current session.

## Emotion choreography — local v5

The homepage now uses a procedural Three.js environment and GSAP camera choreography. After preparation, choose “Entrer avec le son” or “Entrer sans le son”. Scroll through five chapters to travel between scene landmarks. Audio is generated locally and starts only after explicit selection; controls are available in the scene and menu.

Reference studied: https://emotion-agency.com/ — loader entry actions, 3-second radial transition, camera offset, 1.1-second chapter handoff, text dissolution and decoding. The code, geometry, shaders and audio in Merge are original implementations. Source-site proprietary models, fonts and audio are not included.

Motion can be paused; reduced-motion preferences default to a linear static reading experience. If WebGL cannot initialize, the original local SVG remains available. Actual GPU rendering could not be visually inspected in the current session. No commit, push or deployment was performed.
