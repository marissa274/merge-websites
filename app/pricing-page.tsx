import { ArrowUpRight, ArrowDown, Check, Plus } from 'lucide-react';
import { pricingOverview, pricingMoney } from './pricing-model';

const SHAPES = [
    'M48 22 C15 -4 18 72 42 70 C-8 58 -4 136 34 134 C-3 148 6 220 37 215 C1 242 6 298 38 296 C-2 324 9 379 40 378 C10 412 8 465 42 462 C12 501 22 545 48 536 C20 586 34 640 67 627 C75 670 117 652 130 621 C158 663 201 659 219 623 C248 666 290 649 298 622 C330 660 379 637 361 597 C402 582 392 530 363 522 C412 491 399 447 369 438 C414 408 400 365 372 360 C414 330 399 286 366 280 C411 251 399 205 363 199 C414 169 398 122 362 118 C409 89 391 40 355 48 C390 3 325 10 310 25 C251 6 199 36 151 21 C114 8 71 39 48 22 Z',
    'M48 25 C13 7 7 55 38 79 C-1 99 8 152 43 156 C5 185 5 234 39 239 C3 270 13 315 42 319 C1 356 12 403 44 407 C7 443 14 487 44 492 C11 537 27 575 58 570 C15 622 49 661 83 634 C98 675 139 656 148 625 C173 666 212 659 225 626 C251 663 293 652 305 620 C336 665 386 639 364 598 C408 570 396 524 367 522 C408 484 395 439 366 437 C413 405 402 360 370 357 C410 321 400 276 365 273 C405 237 400 193 366 190 C410 157 394 113 362 112 C402 70 388 27 352 40 C322 8 287 38 256 26 C213 10 182 34 140 24 C106 11 75 43 48 25 Z',
    'M48 37 C32 5 76 -6 91 29 C110 -4 149 3 156 34 C183 0 222 3 231 36 C256 3 295 10 302 42 C345 5 383 26 362 67 C410 88 400 137 367 143 C410 174 396 221 368 227 C411 262 401 308 369 313 C410 350 394 395 365 400 C406 436 394 482 363 486 C406 527 393 569 359 571 C395 618 364 654 330 628 C316 672 271 660 260 628 C235 669 192 660 183 628 C157 668 114 657 108 624 C76 661 30 638 52 600 C8 575 18 534 45 526 C4 488 13 445 44 439 C2 403 13 359 42 354 C1 317 10 274 41 270 C2 231 10 186 42 184 C0 146 14 103 45 103 C13 70 20 45 48 37 Z',
];

type Offer = { id: string; name: string; description: string; price: number | null; emptyPrice: string; note: string; items: string[]; href: string; action: string };

function FloatingOffer({ offer, index }: { offer: Offer; index: number }) {
    return <div className={`pricing-offer-stage pricing-offer-stage--${index + 1}`} data-pricing-offer={offer.id}>
        <div className="pricing-drift">
            <article className="pricing-paper" aria-labelledby={`offer-${offer.id}`}>
                <svg className="pricing-paper-shape" viewBox="0 0 400 660" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d={SHAPES[index]}/></svg>
                <div className="pricing-paper-content">
                    <p className="pricing-offer-kicker">{index === 0 ? 'Choose a design' : index === 1 ? 'Make it yours' : 'Start with an idea'}</p>
                    <h2 id={`offer-${offer.id}`}>{offer.name}</h2>
                    <p className="pricing-offer-description">{offer.description}</p>
                    <div className="pricing-offer-price">{offer.price !== null && <span>From</span>}<strong>{offer.price !== null ? pricingMoney(offer.price) : offer.emptyPrice}</strong></div>
                    <p className="pricing-offer-note">{offer.note}</p>
                    <ul>{offer.items.map(item => <li key={item}><Check aria-hidden="true" strokeWidth={1.5}/><span>{item}</span></li>)}</ul>
                    <a className="pricing-paper-cta" href={offer.href}>{offer.action}<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a>
                </div>
            </article>
        </div>
        <span className="pricing-float-shadow" aria-hidden="true"/>
    </div>;
}

const COMPARISON = [
    ['Starting point', 'An existing collection design', 'A website you choose', 'A new visual direction'],
    ['Design changes', 'Available separately', 'Changes agreed in your brief', 'Defined in your project scope'],
    ['Pages', 'As listed on the website', 'Extra pages priced separately', 'Planned together'],
    ['Features', 'As described in the listing', 'Choose optional additions', 'Specified in your quote'],
    ['Price structure', 'Website price', 'Website + setup + selected extras', 'A project quote'],
    ['Delivery', 'As specified in the listing', 'Schedule confirmed after your brief', 'Schedule confirmed in your quote'],
    ['Hosting & maintenance', 'Separate unless included', 'Separate unless included', 'As agreed in your quote'],
];
const DETAILS = [
    ['Delivery', 'Delivery format and timing depend on the website listing or agreed project scope. For personalized and custom work, the studio confirms the schedule after reviewing your brief and materials.'],
    ['Hosting & domains', 'Check the platform and hosting requirements for the website you choose. Domains, hosting subscriptions and external services are separate unless explicitly included in your listing or quote.'],
    ['License', 'Each website has its own license and deliverables. Review the permitted use, platform requirements and any restrictions on redistribution before purchasing.'],
    ['Maintenance', 'Ongoing maintenance is optional and scoped separately. A website purchase does not automatically start a care subscription.'],
    ['Content & images', 'You can provide your own logo, text and images, or ask for the relevant additions. Any stock images, paid fonts or other asset licenses are confirmed separately.'],
    ['Additional costs & changes', 'All prices are in CAD. Taxes and third-party costs may be additional unless explicitly included. Work outside the agreed scope is quoted separately before it starts.'],
];

export function PricingPage({ products, settings }: { products: { price: number; published: number }[]; settings: Record<string, string> }) {
    const prices = pricingOverview(products, settings);
    const offers: Offer[] = [
        { id: 'ready', name: 'Ready-made', description: 'A distinctive website, already designed. Find the one that feels like you.', price: prices.template, emptyPrice: 'Per design', note: 'One-time website price. Deliverables are listed per design.', items: ['An existing design from the collection', 'Website-specific features and license', 'Personalization available separately'], href: '/collection', action: 'Choose Your Website' },
        { id: 'personalized', name: 'Personalized', description: 'Your chosen website, shaped around your brand and your content.', price: prices.setup, emptyPrice: 'On quote', note: 'Personalization setup. Template price and selected extras are separate.', items: ['Start with the website you choose', 'Adapt colors, fonts, copy and images', 'Add pages and features to your brief'], href: '/personalize/custom', action: 'Make It Yours' },
        { id: 'custom', name: 'Custom-made', description: 'A new direction for an idea that needs something of its own.', price: null, emptyPrice: 'On quote', note: 'Your scope and total are agreed before work begins.', items: ['A visual direction for your project', 'Pages and functionality planned together', 'A defined scope and project quote'], href: '/contact', action: 'Get a Quote' },
    ];
    return <main id="main" className="pricing-editorial">
        <header className="pricing-heading"><h1>Simple Pricing.<br/><span>Beautiful Results.</span></h1><p>A website from the collection, a personal touch, or something made just for you.<br className="pricing-wide-break"/> Choose the level that fits. All prices are in CAD.</p><a className="pricing-compare-link" href="#compare-offers">Compare the offers<ArrowDown aria-hidden="true" strokeWidth={1.5}/></a></header>
        <section className="pricing-offers" aria-label="Website offers">{offers.map((offer, index) => <FloatingOffer key={offer.id} offer={offer} index={index}/>)}</section>
        <section className="pricing-comparison pricing-content" id="compare-offers" aria-labelledby="pricing-compare-title"><div className="pricing-section-heading"><h2 id="pricing-compare-title">Find your fit.</h2><p>Three ways to begin.<br/>The details, side by side.</p></div><div className="pricing-table-scroll" role="region" aria-label="Website offer comparison, scroll horizontally on small screens" tabIndex={0}><table><caption className="visually-hidden">Compare ready-made, personalized and custom-made website offers.</caption><thead><tr><th scope="col">What’s included</th><th scope="col">Ready-made</th><th scope="col">Personalized</th><th scope="col">Custom-made</th></tr></thead><tbody>{COMPARISON.map(([title, ...cells]) => <tr key={title}><th scope="row">{title}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></section>
        <section className="pricing-addons pricing-content" aria-labelledby="pricing-addons-title"><div className="pricing-section-heading"><h2 id="pricing-addons-title">A little more,<br/><span>if you need it.</span></h2><p>Choose additions in your personalization brief.<br/>Unpriced options are quoted by the studio.</p></div><div className="pricing-addons-list">{prices.addons.map(item => <article className="pricing-addon" key={item.id}><div><h3>{item.name}</h3><p>{item.detail}</p></div><p className="pricing-addon-amount"><strong>{item.amount !== null ? pricingMoney(item.amount) : 'On quote'}</strong>{item.amount !== null && 'unit' in item && <span>{item.unit}</span>}</p></article>)}</div></section>
        <section className="pricing-details pricing-content" aria-labelledby="pricing-details-title"><div className="pricing-section-heading"><h2 id="pricing-details-title">The practical<br/>details.</h2><p>Know what’s included<br/>before you commit.</p></div><div className="pricing-details-list">{DETAILS.map(([title, copy], index) => <details key={title} open={index === 0}><summary>{title}<Plus aria-hidden="true" strokeWidth={1.5}/></summary><p>{copy}</p></details>)}</div><a className="pricing-care-link" href="/subscriptions">Explore optional care plans<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a></section>
        <section className="pricing-final pricing-content"><h2>Choose your website.<br/><span>We’ll shape the rest.</span></h2><p>Explore the collection, or tell the studio what you have in mind.</p><div><a className="pricing-final-cta" href="/collection">Choose Your Website<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a><a className="pricing-final-quote" href="/contact">Get a Quote<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a></div></section>
    </main>;
}
