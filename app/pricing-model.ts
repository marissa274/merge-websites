import { parsePricing } from './personalize-model';

const ADDONS = [
    { id: 'pages-extra', name: 'Additional pages', detail: 'Extend your chosen website with another page.', unit: 'per page' },
    { id: 'logo-design', name: 'Logo design', detail: 'A simple wordmark or symbol for your project.' },
    { id: 'colors-brand', name: 'Brand colors', detail: 'Apply your palette to the selected design.' },
    { id: 'type-brand', name: 'Typography', detail: 'Use licensed web fonts that fit your identity.' },
    { id: 'images-stock', name: 'Image sourcing', detail: 'Find suitable images; any asset licenses are agreed separately.' },
    { id: 'copy-edit', name: 'Text editing', detail: 'Edit and adapt the copy you provide.' },
    { id: 'feature-forms', name: 'Contact & quote forms', detail: 'Add a form suited to your website and workflow.' },
    { id: 'feature-booking', name: 'Booking & appointments', detail: 'Scope the calendar, services and reminders together.', quote: true },
    { id: 'feature-payments', name: 'Payments & shop', detail: 'Plan checkout, products and third-party integrations.', quote: true },
] as const;

export function pricingOverview(products: { price: number; published: number }[], settings: Record<string, string>) {
    const listed = products.filter(product => product.published === 1 && Number.isSafeInteger(product.price) && product.price > 0).map(product => product.price);
    const setup = Math.round(Number(settings.personalizationPrice) * 100);
    const extras = parsePricing(settings.personalizationPricing);
    return {
        template: listed.length ? Math.min(...listed) : null,
        setup: Number.isSafeInteger(setup) && setup > 0 ? setup : null,
        addons: ADDONS.map(item => ({ ...item, amount: 'quote' in item ? null : extras[item.id] || null })),
    };
}

export const pricingMoney = (cents: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(cents / 100);
