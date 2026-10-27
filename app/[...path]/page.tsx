import { AboutPage } from '../about-page';
import { ContactPage } from '../contact-page';
import { PricingPage } from '../pricing-page';
import { WebsiteDetail } from '../website-detail';
import { parsePresentation, normalizePresentation, presentationKey, resolvePreviews, purchaseGaps } from '../product-presentation';
import { studies, conceptCovers } from '../studies';
import { Personalize } from '../personalize';
import { AuthPage, type AuthMode } from '../auth-page';
import { consumeToken, safeReturn, googleEnabled, mailEnabled } from '../auth';
import { parsePricing, type Model } from '../personalize-model';
import { NewConceptPage } from '../home-v2';
import { buildEntries } from '../collection-model';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowUpRight, ArrowLeft, LockKeyhole } from 'lucide-react';
import { db, config, listProducts, getSettings, ownedData, currentUser, isAdmin, upsertUser, approvedProductMedia } from '../data';
import { Home, Collection, ProductDetail, Intro, Btn, FAQ, Concept, RequestForm, Cart, Account, Plans, Empty } from '../ui';
import { Admin } from '../admin-ui';
export const dynamic = 'force-dynamic';
const titles: Record<string, string> = { '': 'Websites with a point of view', collection: 'Website collection', about: 'The Mind Behind MK LAB', pricing: 'Pricing', subscriptions: 'Care plans', faq: 'Questions', contact: 'Contact', cart: 'Your bag', checkout: 'Checkout', login: 'Sign in', signup: 'Create an account', 'forgot-password': 'Reset your password', 'reset-password': 'Choose a new password', 'verify-email': 'Confirm your email', terms: 'Terms and conditions', privacy: 'Privacy policy', licenses: 'Website licenses', account: 'Your account', admin: 'Studio management', personalize: 'Personalize your website', concepts: 'Design concepts' };
export async function generateMetadata({ params }: {
    params: Promise<{
        path?: string[];
    }>;
}): Promise<Metadata> {
    const { path = [] } = await params;
    let title = titles[path[0] || ''] || 'MK LAB';
    if (path[0] === 'collection' && path[1]) {
        try {
            const p = (await listProducts()).find(x => x.slug === path[1]);
            if (p)
                title = p.name;
        }
        catch { }
    }
    return { title, robots: ['account', 'admin', 'checkout', 'login', 'signup', 'forgot-password', 'reset-password', 'verify-email', 'concepts'].includes(path[0]) ? { index: false, follow: false } : undefined };
}
export default async function Page({ params, searchParams }: {
    params: Promise<{
        path?: string[];
    }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
    const { path = [] } = await params;
    const route = '/' + path.join('/');
    const user = await currentUser();
    let products: Awaited<ReturnType<typeof listProducts>> = [], settings: Record<string, string> = {}, dbError = false;
    try {
        [products, settings] = await Promise.all([listProducts(), getSettings()]);
    }
    catch {
        dbError = true;
    }
    const section = path[0] || '';
    const commerceReady = !!config('STRIPE_SECRET_KEY') && !!config('STRIPE_WEBHOOK_SECRET') && !!settings.terms && !!settings.privacy && !!settings.licenses && ['stripe_automatic', 'manual', 'no_tax'].includes(settings.taxMode || '');
    if (path.length > 1 && !['collection', 'concepts', 'personalize', 'checkout', 'account'].includes(section))
        notFound();
    if (path.length > 2)
        notFound();
    if (section === 'checkout' && path[1] && !['success', 'cancel'].includes(path[1]))
        notFound();
    if (!section)
        return <Home products={products} settings={settings}/>;
    if (section === 'collection') {
        if (path[1]) {
            const p = products.find(x => x.slug === path[1]);
            if (!p)
                notFound();
            const presentation = resolvePreviews(parsePresentation(settings[presentationKey(p.id)], p.category), await approvedProductMedia(p.id), p.image_id);
            const ready = commerceReady && !purchaseGaps(presentation).length;
            return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description, ...(ready ? { offers: { "@type": "Offer", priceCurrency: "CAD", price: (p.price / 100).toFixed(2), availability: "https://schema.org/InStock", url: `https://mek-lab-studio.sasabelle.chatgpt.site/collection/${p.slug}` } } : {}) }).replace(/</g, "\\u003c") }}/><ProductDetail product={{...p, presentation}} related={products.filter(item => item.id !== p.id).sort((a,b) => Number(b.category === p.category) - Number(a.category === p.category)).slice(0,3)} commerceReady={commerceReady}/></>;
        }
        const query = new URLSearchParams();
        for (const [key, value] of Object.entries(await searchParams || {})) {
            if (Array.isArray(value)) value.forEach(item => query.append(key, item));
            else if (value !== undefined) query.set(key, value);
        }
        return <Collection products={products} initialSearch={query.toString()}/>;
    }
    if (section === 'concepts') {
        const entry = buildEntries([]).find(item => item.slug === path[1]);
        if (!entry) notFound();
        const presentation = normalizePresentation({ typography: ['Beauty','Wellness','Food & drink'].includes(entry.category) ? 'soft' : 'bold', motion: ['Gaming','Music'].includes(entry.category) ? 'crisp' : 'calm' }, entry.category, entry.tone);
        return <WebsiteDetail project={{name:entry.name,slug:entry.slug,description:entry.description,category:entry.category,presentation,concept:true}} related={products.slice(0,3)}/>;
    }
    if (section === 'about')
        return <AboutPage story={settings.about}/>;
    if (section === 'pricing')
        return <PricingPage products={products} settings={settings}/>;
    if (section === 'subscriptions')
        return <Plans settings={settings}/>;
    if (section === 'faq')
        return <main id="main" className="shell"><Intro title="A few good questions.">The details that help you choose with confidence.</Intro><section className="section"><FAQ custom={settings.faq}/></section><section className="closing"><h2>Still wondering?</h2><Btn href="/contact">Talk to the studio</Btn></section></main>;
    if (section === 'personalize') {
        const p = path[1] && path[1] !== 'custom' ? products.find(x => x.slug === path[1] && x.published) : undefined;
        if (path[1] && path[1] !== 'custom' && !p)
            notFound();
        const conceptSlug = (await searchParams || {}).concept;
        const entry = !p && typeof conceptSlug === 'string' ? buildEntries([]).find(item => item.kind === 'study' && item.slug === conceptSlug) : undefined;
        const model: Model | null = p ? { kind: 'product', slug: p.slug, name: p.name, category: p.category, image: p.image_id ? `/api/media/${encodeURIComponent(p.image_id)}` : undefined, price: p.price, productId: p.id }
            : entry ? { kind: 'concept', slug: entry.slug, name: entry.name, category: entry.category, image: conceptCovers[entry.slug], palette: normalizePresentation({}, entry.category, entry.tone).palette } : null;
        return <main id="main" className="shell"><Intro title={model ? `Make ${model.name} yours.` : 'Make it unmistakably you.'}>{model ? 'Shape the website you chose around your brand. Your estimate updates as you choose; nothing is charged.' : 'Every personalization starts from a website in the collection.'}</Intro><Personalize model={model} pricing={parsePricing(settings.personalizationPricing)} base={Math.round(Number(settings.personalizationPrice || 0) * 100)} user={user ? { fullName: user.fullName || user.displayName, email: user.email } : null}/></main>;
    }
    if (section === 'contact') {
        const query = await searchParams || {};
        const demo = typeof query.demo === 'string' ? (query.concept === '1' ? buildEntries([]).find(item => item.slug === query.demo) : products.find(item => item.slug === query.demo)) : undefined;
        return <ContactPage prefill={{ name: user?.fullName || user?.displayName, email: user?.email, message: demo ? `I would like a private demo of ${demo.name} (${demo.slug}). Here is what I would like to explore: ` : undefined }}/>;
    }
    if (section === 'cart' || section === 'checkout') {
        if (path[1] === 'success')
            return <main className="shell" id="main"><Intro title="We’re checking your payment.">Your redirect does not confirm a purchase. Your account will update when the payment provider verifies it.</Intro><div className="actions section"><Btn href="/account/purchases">Check my purchases</Btn><Btn secondary href="/collection">Keep exploring</Btn></div></main>;
        if (path[1] === 'cancel')
            return <main className="shell" id="main"><Intro title="Take your time.">Checkout was closed. No purchase is confirmed here. Your bag is waiting when you’re ready.</Intro><section className="section"><Btn href="/cart">Return to your bag</Btn></section></main>;
        return <Cart products={products} checkout={section === 'checkout'} user={user} ready={!!config('STRIPE_SECRET_KEY') && !!config('STRIPE_WEBHOOK_SECRET') && !!settings.terms && !!settings.privacy && !!settings.licenses && ['stripe_automatic', 'manual', 'no_tax'].includes(settings.taxMode || '')}/>;
    }
    if (['login', 'signup', 'forgot-password', 'reset-password', 'verify-email'].includes(section)) {
        const query = await searchParams || {}, param = (key: string) => typeof query[key] === 'string' ? query[key] as string : '';
        let verified = false;
        // An email confirmation link marks that account's address as verified, once.
        if (section === 'verify-email') { const owner = await consumeToken(param('token'), 'verify'); if (owner) { await db().prepare("UPDATE auth_identities SET email_verified=1 WHERE user_id=? AND provider='password'").bind(owner).run(); verified = true; } }
        return <AuthPage mode={section as AuthMode} returnTo={safeReturn(param('return_to'))} concepts={buildEntries([]).filter(entry => entry.kind === 'study').length} user={user ? { email: user.email, displayName: user.displayName, provider: user.provider, verified: user.verified } : null} google={googleEnabled()} mail={mailEnabled()} error={param('error')} token={param('token') || undefined} verified={verified}/>;
    }
    if (section === 'account') {
        if (path[1] && !['purchases', 'downloads', 'customizations', 'subscriptions', 'settings'].includes(path[1]))
            notFound();
        if (!user)
            return <SignIn />;
        if (dbError)
            return <DatabaseUnavailable />;
        try {
            const data = await ownedData(user);
            return <Account user={user} data={data} path={route}/>;
        }
        catch {
            return <DatabaseUnavailable />;
        }
    }
    if (section === 'admin') {
        if (!user)
            return <SignIn />;
        if (!isAdmin(user))
            return <main id="main" className="shell"><Intro title="The studio’s private workspace.">Administrator access is required to manage MK LAB.</Intro><div className="notice">{config('ADMIN_EMAILS') ? 'Your signed-in account does not have administrator access.' : 'Administration is locked until an authorized owner configures the ADMIN_EMAILS allowlist in hosting settings.'}</div><section className="section"><Btn href="/account">Go to my account</Btn></section></main>;
        if (dbError)
            return <DatabaseUnavailable />;
        const [all, orders, requests, customers, inquiries] = await Promise.all([listProducts(true), db().prepare('SELECT o.*,u.email FROM orders o JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC LIMIT 500').all(), db().prepare('SELECT c.*,u.email FROM customizations c JOIN users u ON u.id=c.user_id ORDER BY c.created_at DESC LIMIT 500').all(), db().prepare('SELECT * FROM users LIMIT 500').all(), db().prepare('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 500').all()]);
        return <Admin products={all.map(item => ({...item,presentation:parsePresentation(settings[presentationKey(item.id)],item.category)}))} orders={orders.results} requests={requests.results} customers={customers.results} inquiries={inquiries.results} settings={settings}/>;
    }
    if (['terms', 'privacy', 'licenses'].includes(section))
        return <main id="main" className="shell"><Intro title={titles[section]}/><section className="prose section">{settings[section] ? <p style={{ whiteSpace: 'pre-wrap' }}>{settings[section]}</p> : <><div className="notice"><strong>Business policy awaiting publication</strong><br />The studio’s approved {titles[section].toLowerCase()} have not been supplied. Purchases remain unavailable until the required policies are published.</div><h2>{section === 'privacy' ? 'Your account and information' : section === 'licenses' ? 'Know what your purchase includes' : 'Before purchases open'}</h2><p>{section === 'privacy' ? 'This build uses your ChatGPT identity for sign-in and stores account preferences, submitted inquiries, and customization conversations. Checkout, when configured, uses Stripe; MK LAB does not collect raw card details. The owner must publish the legal business identity, contact details, processing purposes, service providers, retention periods, and applicable rights before launch.' : section === 'licenses' ? 'Each listing must state the number of permitted websites, allowed client work, redistribution restrictions, included assets, and third-party requirements. No license is granted by viewing a concept preview.' : 'The business must publish its legal identity, fulfillment and delivery process, cancellation and refund policies, tax treatment, dispute process, and contact details before accepting payments.'}</p><Btn href="/contact" secondary>Ask the studio</Btn></>}</section></main>;
    notFound();
}
function SignIn() { return <main id="main" className="shell"><Intro title="Your own corner of MK LAB.">Sign in to access your purchases, downloads, and project conversations.</Intro><section className="section"><a className="btn" href="/login?return_to=%2Faccount">Sign in<ArrowUpRight aria-hidden="true"/></a></section></main>; }
function DatabaseUnavailable() { return <main id="main" className="shell"><Intro title="Your account needs a moment.">Account data could not be loaded. Refresh the page to try again. Your information has not been changed.</Intro><section className="section"><Btn href="/account">Try again</Btn></section></main>; }
