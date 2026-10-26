# Personalize

`/personalize/<product-slug>` and `/personalize/custom?concept=<slug>` open the same seven-step brief (`app/personalize.tsx`):

1. **Your website**: the website whose Personalize button was clicked (a published product, or a concept shown as its live responsive homepage), with links to view it or choose another from the collection. There is no website picker; `/personalize/custom` without a website asks the visitor to choose one in the collection first.
2. **Visual identity**: logo, colors (up to three brand colors), typography, images.
3. **Content**: texts, additional pages (0–10), company name, activity, address/hours/contact details.
4. **Features**: forms, newsletter, booking, payments/shop, multilingual, other integrations, with notes.
5. **Budget & estimate**: the customer's budget range and a live estimate.
6. **Your details**: name, email (prefilled when signed in), remarks.
7. **Review**: recap, estimate and **Request Customization**.

The estimate is a sticky panel on desktop and a sticky bar on smaller screens. A session draft keeps the choices through sign-in.

## Prices

No price is built into the code. Admin → Content → *Personalization option prices* sets a CAD price per priced option (logo design, brand colors, brand fonts, stock images, text editing/writing, per additional page, forms, newsletter). *Personalization starting price* is the setup line. A blank price shows **On quote**. Photo shoots, booking, payments, multilingual and other integrations are always quoted, so they never get an automatic price. Concept templates are quoted; product templates use their listed price.

## Requests

The server re-validates every choice (`sanitizeBrief`), checks the model is a published product or a known concept, recomputes the estimate from the saved prices, and stores the request in `customizations`: a readable summary in `details` (shown in the account and Admin → Projects) and `{ brief, estimate }` in `options`. Sign-in is required to send. Nothing is charged; the studio replies with a quote.

Verified: model/estimate/sanitize, page render and API tests (`tests/personalize.mjs`); production build; local pages at 1440 and 390 px without overflow or console errors; live estimate updates; mobile sticky bar; end-to-end on the dev server (sign-in → choices → request saved → record readable → draft cleared).
