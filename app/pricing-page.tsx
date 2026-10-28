import { ArrowUpRight, ArrowDown, Check, Plus } from 'lucide-react';
import { pricingOverview, pricingMoney } from './pricing-model';

// Cloud outlines: puffs of uneven size on every side, one silhouette per offer.
const SHAPES = [
    'M62.0 62.0 C56.2 30.2 115.8 30.2 110.0 62.0 C97.7 -2.1 224.7 -2.1 212.4 62.0 C204.6 23.7 285.4 23.7 277.5 62.0 C270.3 21.7 345.3 21.7 338.0 62.0 C394.7 50.2 394.7 172.0 338.0 160.2 C392.1 150.1 392.1 255.4 338.0 245.2 C397.6 233.9 397.6 350.3 338.0 339.0 C385.2 328.1 385.2 440.7 338.0 429.8 C402.6 417.5 402.6 544.2 338.0 531.9 C377.3 524.0 377.3 605.9 338.0 598.0 C348.2 657.6 242.5 657.6 252.7 598.0 C262.3 650.2 163.6 650.2 173.1 598.0 C178.6 627.7 121.6 627.7 127.1 598.0 C135.0 639.3 54.2 639.3 62.0 598.0 C4.0 610.9 4.0 477.2 62.0 490.2 C1.4 503.1 1.4 369.7 62.0 382.6 C18.5 391.5 18.5 299.6 62.0 308.5 C21.6 317.1 21.6 228.1 62.0 236.7 C-8.0 249.1 -8.0 121.2 62.0 133.6 C18.3 142.2 18.3 53.4 62.0 62.0 Z',
    'M62.0 62.0 C54.2 23.0 134.6 23.0 126.8 62.0 C118.3 20.3 206.5 20.3 197.9 62.0 C193.5 42.0 239.0 42.0 234.6 62.0 C229.1 31.2 285.7 31.2 280.2 62.0 C273.3 32.0 344.9 32.0 338.0 62.0 C375.7 53.6 375.7 140.0 338.0 131.6 C376.0 123.4 376.0 208.1 338.0 199.9 C387.5 189.5 387.5 297.7 338.0 287.2 C394.5 274.9 394.5 402.1 338.0 389.8 C383.9 380.4 383.9 477.7 338.0 468.2 C372.7 461.3 372.7 533.0 338.0 526.0 C376.4 517.4 376.4 606.6 338.0 598.0 C347.3 646.4 251.1 646.4 260.4 598.0 C267.3 632.6 196.1 632.6 203.0 598.0 C212.1 643.5 118.3 643.5 127.4 598.0 C135.2 639.4 54.2 639.4 62.0 598.0 C-6.2 611.9 -6.2 468.3 62.0 482.2 C14.1 491.8 14.1 392.6 62.0 402.2 C-5.8 414.3 -5.8 289.6 62.0 301.7 C13.5 310.1 13.5 223.0 62.0 231.4 C11.3 242.5 11.3 127.8 62.0 138.9 C9.8 148.1 9.8 52.8 62.0 62.0 Z',
    'M62.0 62.0 C54.6 16.4 131.4 16.4 124.0 62.0 C113.8 12.3 219.0 12.3 208.8 62.0 C200.7 17.3 284.1 17.3 276.0 62.0 C268.6 26.6 345.4 26.6 338.0 62.0 C390.0 52.7 390.0 149.0 338.0 139.7 C395.9 129.4 395.9 236.0 338.0 225.7 C375.6 218.7 375.6 290.8 338.0 283.8 C397.4 271.1 397.4 402.7 338.0 390.0 C391.2 377.5 391.2 506.3 338.0 493.8 C395.8 481.3 395.8 610.5 338.0 598.0 C343.1 623.6 290.1 623.6 295.2 598.0 C299.9 622.9 251.3 622.9 256.0 598.0 C264.2 636.1 178.9 636.1 187.1 598.0 C193.2 631.6 130.8 631.6 136.8 598.0 C145.8 639.3 53.0 639.3 62.0 598.0 C16.4 606.4 16.4 519.9 62.0 528.2 C12.2 540.3 12.2 415.8 62.0 427.9 C26.4 434.5 26.4 366.6 62.0 373.2 C21.8 382.3 21.8 287.4 62.0 296.6 C30.3 302.4 30.3 242.9 62.0 248.7 C2.0 260.8 2.0 135.0 62.0 147.2 C9.9 157.4 9.9 51.8 62.0 62.0 Z',
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
        <section className="pricing-comparison pricing-content" id="compare-offers" aria-labelledby="pricing-compare-title"><div className="pricing-section-heading"><h2 id="pricing-compare-title">Find your fit.</h2></div><div className="pricing-table-scroll" role="region" aria-label="Website offer comparison, scroll horizontally on small screens" tabIndex={0}><table><caption className="visually-hidden">Compare ready-made, personalized and custom-made website offers.</caption><thead><tr><th scope="col">What’s included</th><th scope="col">Ready-made</th><th scope="col">Personalized</th><th scope="col">Custom-made</th></tr></thead><tbody>{COMPARISON.map(([title, ...cells]) => <tr key={title}><th scope="row">{title}</th>{cells.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></section>
        <section className="pricing-addons pricing-content" aria-labelledby="pricing-addons-title"><div className="pricing-section-heading"><h2 id="pricing-addons-title">A little more,<br/><span>if you need it.</span></h2></div><div className="pricing-addons-list">{prices.addons.map(item => <article className="pricing-addon" key={item.id}><div><h3>{item.name}</h3><p>{item.detail}</p></div><p className="pricing-addon-amount"><strong>{item.amount !== null ? pricingMoney(item.amount) : 'On quote'}</strong>{item.amount !== null && 'unit' in item && <span>{item.unit}</span>}</p></article>)}</div></section>
        <section className="pricing-details pricing-content" aria-labelledby="pricing-details-title"><div className="pricing-section-heading"><h2 id="pricing-details-title">The practical<br/>details.</h2></div><div className="pricing-details-list">{DETAILS.map(([title, copy], index) => <details key={title} open={index === 0}><summary>{title}<Plus aria-hidden="true" strokeWidth={1.5}/></summary><p>{copy}</p></details>)}</div></section>
        <section className="pricing-final pricing-content"><h2>Choose your website.<br/><span>We’ll shape the rest.</span></h2><p>Explore the collection, or tell the studio what you have in mind.</p><div><a className="pricing-final-cta" href="/collection">Choose Your Website<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a><a className="pricing-final-quote" href="/contact">Get a Quote<ArrowUpRight aria-hidden="true" strokeWidth={1.5}/></a></div></section>
    </main>;
}
