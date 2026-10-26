# MEK LAB design decisions

Audience: independent businesses and creatives. Primary task: browse a design, inspect its requirements, then buy or request personalization. Tone: sophisticated independent studio with expressive project showcases. Confirmed by the user.

The central move is to treat website designs as gallery pieces, with large original concept layouts and quiet annotations. Homepage: oversized two-line tagline plus narrow explanation → large feature presentation → offset editorial preview and honest catalog state → studio statement and sequential purchasing explanation → FAQ → invitation. Catalog and dashboard use different page structures within the same visual system.

Layout sketch:
```
MEK LAB                           Bag / Menu
[wide signature statement]        [short copy / collection]
[large architectural design preview]       [annotation]
[editorial design study]          [collection release state]
[studio statement]                [studio rationale]
[find]                 [personalize]                [receive]
                             [questions / answers]
[conversation invitation]        [action]
MEK LAB                    tagline / compact links
```

System: cool mineral paper, ink, ultramarine signal, lavender-gray gallery staging. Every color and font used by the authored stylesheet is tokenized in `public/tokens.css`. Archivo supplies typographic presence; Space Grotesk supplies plain, legible controls. Georgia is confined to concept website artwork. Four-pixel spacing basis, 52-pixel base controls, 44-pixel minimum touch targets. Small rounding serves inputs and galleries; no repeated floating cards or decorative gradients.

Revised before implementation: rejected a dark ambient hero and a large marketing feature grid. They would obscure the websites and duplicate common studio templates. The hero instead leads immediately into actual rendered concept designs. Neither design is fabricated inventory: both are labeled visual studies with no price or purchase control.

Motion identity: Premium. Signature curve `cubic-bezier(.4,0,.2,1)`, quick 150 ms, standard 300 ms, slow 500 ms. One entrance sequence stages headline, supporting copy, then gallery in 100 ms increments. Gallery image scale answers pointer intent, button press scales to .96 over 150 ms. No parallax, ambient loops, scroll interception, loading gate, or hover-only actions. Reduced-motion removes spatial animation while preserving immediate visible state feedback.

Navigation follows N9 edge-aligned minimal with a named menu disclosure and native dialog. Footer follows Ft1 masthead. This is a new project with no prior MEK LAB structural stamp to rotate against. Concept previews do not reproduce browser chrome.

Responsive rules address 320/375/414/768/1024/1280/1440 widths in code. Images use minmax(0,1fr) grid tracks, headings wrap long words, controls stay single-line, nav uses the same accessible dialog at every size. Actual browser rendering was not available; no visual pass is claimed.
