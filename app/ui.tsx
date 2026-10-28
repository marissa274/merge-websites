'use client';
import { HomeV2, NavV2 } from './home-v2';
import { SignOutButton } from './auth-form';
import { WebsiteDetail } from './website-detail';
import { normalizePresentation } from './product-presentation';
import { CollectionV2 } from './collection-v2';
import { useState, useEffect, useRef, type FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, ArrowDown, ArrowLeft, ShoppingBag, X, Check, Plus, Download, LockKeyhole, LogOut, Menu, RefreshCw } from 'lucide-react';
export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: string;
    tags: string;
    price: number;
    license: string;
    featured: number;
    published: number;
    image_id: string | null;
    presentation?: import('./product-presentation').Presentation;
    created_at?: number;
    purchase_count?: number;
};
export type User = {
    userId: string;
    displayName: string;
    email: string;
    fullName: string | null;
    provider?: 'chatgpt' | 'password' | 'google';
};
export const money = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(n / 100);
const iconProps = { 'aria-hidden': true as const, strokeWidth: 1.5 };
export function Mark() { return <span className="brand-mark" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i}/>)}</span>; }
export function Brand() { return <a className="brand mk-wordmark" href="/" aria-label="MK lab home" translate="no">MK lab</a>; }
function readBag(): string[] {
    try {
        const a = JSON.parse(localStorage.getItem('mek-bag') || '[]');
        return Array.isArray(a) ? a.filter(x => typeof x === 'string').slice(0, 20) : [];
    }
    catch {
        return [];
    }
}
function writeBag(a: string[]) {
    try {
        localStorage.setItem('mek-bag', JSON.stringify(a));
        window.dispatchEvent(new Event('mek-bag'));
    }
    catch { }
}
export function Header() { return <NavV2 />; }
export function Footer() { return <footer className="footer shell"><div className="footer-top"><Brand /><p>Designed to stand out. Built to be yours.</p><div className="footer-links"><a href="/collection">Collection</a><a href="/about">Studio</a><a href="/merge-launch/index.html">Events</a><a href="/contact">Contact</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} MK lab</span><div className="footer-links"><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/licenses">Licenses</a><a href="/account">My account</a></div><span>All prices in CAD</span></div></footer>; }
export function Btn({ href, children, secondary = false }: {
    href: string;
    children: React.ReactNode;
    secondary?: boolean;
}) { return <a href={href} className={`btn${secondary ? ' secondary' : ''}`}>{children}<ArrowUpRight {...iconProps}/></a>; }
export function Intro({ title, children, back }: {
    title: string;
    children?: React.ReactNode;
    back?: string;
}) { return <div className="page-intro">{back && <a className="back" href={back}><ArrowLeft {...iconProps}/>Back to collection</a>}<h1>{title}</h1>{children && <p>{children}</p>}</div>; }
export function Concept({ kind = 'forma', priority = false }: {
    kind?: string;
    priority?: boolean;
}) { const still = kind === 'still-life'; return <div className={`concept ${still ? 'still-concept' : ''}`}><div className="concept-nav"><span className="concept-logo">{still ? 'still / life' : 'forma®'}</span><small>{still ? 'Objects. Stories. Perspective.' : 'Architecture & interior design'}</small><span aria-hidden="true">{still ? 'Journal ↗' : 'Explore ↗'}</span></div><div className="concept-main"><div className="concept-title"><h3>{still ? <>Objects.<br />With stories.</> : <>Spaces for<br />better living.</>}</h3><p>{still ? 'A considered collection of everyday objects and the people who make them.' : 'Thoughtful spaces. Natural materials. A different way to feel at home.'}</p></div><img className="concept-photo" src={still ? '/still-life.jpg' : '/architecture.jpg'} width={1200} height={1000} alt={still ? 'Sunlit interior with plants and carefully arranged books' : 'Sculptural timber staircase in a light-filled architectural interior'} fetchPriority={priority ? 'high' : 'auto'} loading={priority ? 'eager' : 'lazy'}/></div><div className="concept-bottom"><span>{still ? 'The art of the everyday' : 'Considered from every angle.'}</span><span>{still ? 'An editorial design concept' : 'An architecture design concept'}</span></div></div>; }
export function ConceptCard({ kind }: {
    kind: string;
}) { const still = kind === 'still-life'; return <article><a href={`/concepts/${kind}`} className={`project-stage ${still ? 'still' : ''}`} style={{ display: 'block' }} aria-label={`Explore ${still ? 'Still / Life' : 'Forma'} concept`}><Concept kind={kind}/></a><div className="project-caption"><div><h3>{still ? 'Still / Life' : 'Forma'}</h3><p>{still ? 'Editorial & lifestyle' : 'Architecture & interiors'}</p></div><div className="meta">Design concept<br />Preview only</div></div></article>; }
export const faqs = [['What am I purchasing?', 'Each published listing describes its included pages, source files, platform requirements, and license. Design concepts are previews only and cannot be purchased.'], ['Can you make a website feel like my brand?', 'Yes. Choose a design and send a personalization request with your content, colors, and the changes you have in mind. The studio will confirm scope and a quote before work starts.'], ['Do I need a subscription?', 'No. Care plans are optional and separate from website purchases. Each plan has a defined support allowance; development is never unlimited.'], ['How will I receive my website?', 'After a payment is verified, eligible files appear in your account. Each download is checked against your purchase and uses a short-lived link. Personalized projects follow the agreed delivery schedule.'], ['Are hosting and domains included?', 'Hosting, domain names, platform subscriptions, third-party assets, and ongoing services are only included when a listing or quote explicitly says so.'], ['Can I use a website for a client?', 'Check the listing’s license before purchase. License terms must clearly define client use, the number of permitted websites, and redistribution restrictions.']];
export function faqItems(custom?: string): string[][] {
    try {
        const v = JSON.parse(custom || 'null');
        if (Array.isArray(v) && v.every(x => Array.isArray(x) && x.length === 2 && x.every(y => typeof y === 'string')))
            return v;
    }
    catch { }
    return faqs;
}
export function FAQ({ short = false, custom }: {
    short?: boolean;
    custom?: string;
}) {
    const items = faqItems(custom);
    return <div className="faq-list">{items.slice(0, short ? 3 : items.length).map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}
export function Home({ settings, products }: {
    settings: Record<string, string>;
    products: Product[];
}) { return <HomeV2 settings={settings} products={products}/>; }
export function ProductCard({ p }: {
    p: Product;
}) { return <article><a href={`/collection/${p.slug}`} className="project-stage" style={{ display: 'block' }}>{p.image_id ? <img src={`/api/media/${p.image_id}`} alt={`${p.name} website preview`} width={1200} height={900} loading="lazy"/> : <div className="empty"><h3>{p.name}</h3><p>Preview image coming soon.</p></div>}</a><div className="project-caption"><div><h3><a href={`/collection/${p.slug}`}>{p.name}</a></h3><p>{p.category}</p></div><div className="meta">{money(p.price)} CAD<br />{p.license}</div></div></article>; }
export function Collection({ products, initialSearch = '' }: {
    products: Product[];
    initialSearch?: string;
}) { return <CollectionV2 products={products} initialSearch={initialSearch}/>; }
export function ProductDetail({ product, related = [], commerceReady = false }: { product: Product; related?: Product[]; commerceReady?: boolean }) {
    return <WebsiteDetail project={{ name: product.name, slug: product.slug, description: product.description, category: product.category, product, presentation: product.presentation || normalizePresentation({}, product.category) }} related={related} commerceReady={commerceReady}/>;
}
export function Empty({ title, body, href = '/collection', label = 'Explore collection' }: {
    title: string;
    body: string;
    href?: string;
    label?: string;
}) { return <div className="empty"><ShoppingBag {...iconProps}/><h2>{title}</h2><p>{body}</p><Btn href={href}>{label}</Btn></div>; }
export function Cart({ products, checkout = false, user, ready = false }: {
    products: Product[];
    checkout?: boolean;
    user: User | null;
    ready?: boolean;
}) {
    const [ids, setIds] = useState<string[]>([]), [loaded, setLoaded] = useState(false), [removed, setRemoved] = useState<string | null>(null), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    useEffect(() => { setIds(readBag()); setLoaded(true); }, []);
    const items = products.filter(p => ids.includes(p.id)), subtotal = items.reduce((n, p) => n + p.price, 0);
    function remove(id: string) { const a = ids.filter(x => x !== id); setIds(a); writeBag(a); setRemoved(id); }
    async function pay() {
        setBusy(true);
        setError('');
        try {
            const r = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ items: items.map(x => x.id) }) });
            const d = await r.json() as {
                error?: string;
                message?: string;
                url?: string;
                records?: any[];
            };
            if (!r.ok)
                throw Error(d.error);
            if (!d.url)
                throw Error('Checkout could not start.');
            location.assign(d.url);
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'Checkout could not start. Try again.');
            setBusy(false);
        }
    }
    return <main id="main" className="shell"><Intro title={checkout ? 'Yours, from here.' : 'Your bag.'}>{checkout ? 'Review your selection before continuing to secure payment.' : 'A good starting point for your next chapter.'}</Intro>{!loaded ? <div className="skeleton" aria-label="Loading bag…"/> : !items.length ? <Empty title="Your next website is still out there." body="When you find the one, add it to your bag. Your selection will stay on this device."/> : <div className="checkout-layout section"><div>{items.map(p => <div className="record" key={p.id}><div><h3><a href={`/collection/${p.slug}`}>{p.name}</a></h3><p>{p.license}</p><strong>{money(p.price)} CAD</strong></div>{!checkout && <button className="plain" onClick={() => remove(p.id)}>Remove<X {...iconProps}/></button>}</div>)}{removed && <p className="form-message" role="status">Website removed. <button className="plain" onClick={() => { const a = [...ids, removed]; setIds(a); writeBag(a); setRemoved(null); }}>Undo</button></p>}<a href="/collection" className="text-link">Continue browsing<ArrowUpRight {...iconProps}/></a></div><aside className="order-summary"><h2>Order summary</h2><div className="total-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="total-row"><span>Applicable taxes</span><span>At payment</span></div><div className="total-row total"><span>Total before tax</span><span>{money(subtotal)} CAD</span></div><div style={{ marginTop: 24 }}>{!checkout ? <Btn href="/checkout">Proceed to checkout</Btn> : !user ? <a className="btn" href="/login?return_to=%2Fcheckout">Sign in to continue<LockKeyhole {...iconProps}/></a> : <button className="btn" disabled={!ready || busy} onClick={pay}>{busy ? 'Opening secure payment…' : ready ? 'Continue to payment' : 'Checkout not open yet'}<LockKeyhole {...iconProps}/></button>}</div>{checkout && !ready && <p className="aside-title" style={{ marginTop: 20 }}>Payment setup and published legal terms are required before purchases can open. No payment has been taken.</p>}<p className="error" role="alert">{error}</p></aside></div>}<div style={{ height: 80 }}/></main>;
}
export function RequestForm({ type, user, product, concept, inquiry, basePrice = 0 }: {
    type: 'contact' | 'personalize';
    user: User | null;
    product?: Product;
    concept?: { name: string; slug: string };
    inquiry?: { name: string; slug: string; returnTo: string };
    basePrice?: number;
}) {
    const [selected, setSelected] = useState<string[]>([]), [message, setMessage] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false);
    const errorRef = useRef<HTMLParagraphElement>(null);
    const options = ['Brand colors & typography', 'Your copy & imagery', 'Additional pages', 'Integrations & functionality'];
    async function send(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        setError('');
        setMessage('');
        const f = new FormData(form);
        setBusy(true);
        try {
            const r = await fetch('/api/market', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(type === 'contact' ? { action: 'inquiry', name: f.get('name'), email: f.get('email'), subject: f.get('subject'), body: f.get('body') } : { action: 'customize', name: product?.name || f.get('design') || 'Custom website', productId: product?.id, details: f.get('body'), options: selected }) });
            const d = await r.json() as {
                error?: string;
                message?: string;
                url?: string;
                records?: any[];
            };
            if (!r.ok)
                throw Error(d.error);
            setMessage(d.message || 'Request saved.');
            form.reset();
        }
        catch (e) {
            setError(e instanceof Error ? e.message : 'Your request could not be saved. Try again.');
            setTimeout(() => errorRef.current?.focus(), 0);
        }
        finally {
            setBusy(false);
        }
    }
    return <form className="form" onSubmit={send}><p ref={errorRef} tabIndex={-1} className="error" role="alert">{error}</p>{type === 'contact' ? <><div className="field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required maxLength={100} defaultValue={user?.fullName || ''}/></div><div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required defaultValue={user?.email || ''}/></div><div className="field"><label htmlFor="subject">What are you thinking about?</label><select id="subject" name="subject" defaultValue={inquiry ? `Private demo: ${inquiry.name}` : undefined}>{inquiry && <option>{`Private demo: ${inquiry.name}`}</option>}<option>A website from the collection</option><option>A personalized website</option><option>A custom project</option><option>Support for my purchase</option></select></div></> : <><div className="field"><label htmlFor="design">Your starting point</label><input id="design" name="design" defaultValue={product?.name || concept?.name || 'A custom MK lab website'} readOnly={!!product}/></div><fieldset><legend>What would you like to change?</legend>{options.map(x => <label className="check" key={x}><input type="checkbox" checked={selected.includes(x)} onChange={e => setSelected(e.target.checked ? [...selected, x] : selected.filter(s => s !== x))}/>{x}</label>)}</fieldset><div className="notice" aria-live="polite"><strong>{basePrice > 0 ? `Personalization from ${money(basePrice)} CAD` : 'Quoted around your project'}</strong><br />{selected.length ? `${selected.length} areas selected. ` : ''}Your final price is confirmed after the studio reviews your scope. This form does not charge you.</div></>}<div className="field"><label htmlFor="body">{type === 'contact' ? 'Tell us about your project' : 'Describe your changes'}</label><textarea id="body" name="body" autoComplete="off" defaultValue={inquiry ? `I would like a private demo of ${inquiry.name} (${inquiry.slug}). Here is what I would like to explore: ` : undefined} required minLength={10} maxLength={5000} aria-describedby="message-help" placeholder="A little context goes a long way…"/><small id="message-help">At least 10 characters. Please leave out passwords or payment details.</small></div>{!user ? <div className="notice">Sign in to send your request and keep track of the conversation.<div style={{ marginTop: 16 }}><a className="btn" href={`/login?return_to=${encodeURIComponent(type === 'contact' ? (inquiry?.returnTo || '/contact') : `/personalize/${product?.slug || 'custom'}${concept ? `?concept=${encodeURIComponent(concept.slug)}` : ''}`)}`}>Sign in<ArrowUpRight {...iconProps}/></a></div></div> : <button className="btn" disabled={busy} type="submit">{busy ? 'Saving your request…' : type === 'contact' ? 'Send inquiry' : 'Request a quote'}<ArrowUpRight {...iconProps}/></button>}<p role="status" className="form-message success">{message}</p>{message && <a className="text-link" href="/account/customizations">Go to my account<ArrowRight {...iconProps}/></a>}</form>;
}
export function Account({ user, data, path }: {
    user: User;
    data: any;
    path: string;
}) {
    const [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
    const section = path.split('/')[2] || 'overview';
    const tabs = [['overview', 'Overview'], ['purchases', 'My purchases'], ['downloads', 'Downloads'], ['customizations', 'Customizations'], ['subscriptions', 'Care plan'], ['settings', 'Settings']];
    async function save(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setBusy(true);
        const f = new FormData(e.currentTarget);
        try {
            const r = await fetch('/api/market', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'profile', name: f.get('name'), updates: f.get('updates') === 'on' }) });
            const d = await r.json() as {
                error?: string;
                message?: string;
                url?: string;
                records?: any[];
            };
            setMessage(d.message || d.error || 'Please try again.');
        }
        catch {
            setMessage('Settings could not be saved. Try again.');
        }
        finally {
            setBusy(false);
        }
    }
    const name = data.profile?.name || user.displayName;
    return <main id="main" className="shell dashboard"><aside><nav className="account-nav" aria-label="Account navigation">{tabs.map(([id, t]) => <a key={id} href={id === 'overview' ? '/account' : `/account/${id}`} aria-current={section === id ? 'page' : undefined}>{t}</a>)}{user.provider === 'chatgpt' || !user.provider ? <a href="/signout-with-chatgpt?return_to=/" target="_top">Sign out</a> : <SignOutButton/>}</nav></aside><section className="dash-content"><h1>{section === 'overview' ? `Welcome, ${name.split(' ')[0].split('@')[0]}.` : tabs.find(x => x[0] === section)?.[1] || 'Your account'}</h1><p>Your websites, projects, and next steps. All in one place.</p>{section === 'overview' && <><div className="dash-stats">{[[data.orders.filter((x: any) => x.status === 'paid').length, 'Purchases'], [data.requests.filter((x: any) => x.status !== 'Completed').length, 'Active requests'], [data.downloads.length, 'Downloads'], [data.subscriptions.filter((x: any) => x.status === 'active').length, 'Active care plans']].map(([n, label]) => <div className="dash-stat" key={label}><strong>{n}</strong><span>{label}</span></div>)}</div><h2 style={{ fontSize: 28, marginBottom: 24 }}>Your next chapter</h2>{data.orders.length ? <div className="actions"><Btn href="/account/purchases">View purchases</Btn><Btn secondary href="/account/downloads">Your downloads</Btn></div> : <Empty title="Find something that feels like you." body="Explore the collection or start a conversation about a project."/>}{data.inquiries?.length > 0 && <div style={{ marginTop: 48 }}><h2 style={{ fontSize: 28, marginBottom: 24 }}>Your inquiries</h2>{data.inquiries.map((q: any) => <div className="record" key={q.id}><div><h3>{q.subject}</h3><p>{q.body}</p><span className="badge">Received</span></div></div>)}</div>}</>}{section === 'purchases' && (data.orders.length ? data.orders.map((o: any) => <div className="record" key={o.id}><div><h3>Order {o.id.slice(0, 8)}</h3>{data.items?.filter((i: any) => i.order_id === o.id).map((i: any) => <p key={i.id}>{i.name} · {i.license} · {money(i.price)} CAD</p>)}<p>{new Date(o.created_at).toLocaleDateString('en-CA')} · {money(o.total || o.subtotal)} CAD</p></div><div><span className="badge">{o.status === 'paid' ? 'Payment confirmed' : o.status === 'pending' ? 'Awaiting payment' : o.status}</span>{o.receipt && <a className="text-link" href={o.receipt} target="_blank" rel="noopener noreferrer">View receipt<ArrowUpRight {...iconProps}/></a>}</div></div>) : <Empty title="Your purchases will live here." body="Confirmed orders appear here after payment verification."/>)}{section === 'downloads' && (data.downloads.length ? data.downloads.map((a: any) => <div className="record" key={a.id}><div><h3>{a.product_name}</h3><p>{a.name}</p></div><a className="btn secondary" href={`/api/download?asset=${a.id}`}>Download<Download {...iconProps}/></a></div>) : <Empty title="No files to download yet." body="Downloads unlock after your payment is verified. Each link is private and expires after one minute."/>)}{section === 'customizations' && (data.requests.length ? data.requests.map((r: any) => <div className="record" key={r.id}><div><h3>{r.name}</h3><p style={{ whiteSpace: 'pre-wrap' }}>{r.details}</p><span className="badge">{r.status}</span>{r.quote !== null && <p>Quoted price: {money(r.quote)} CAD</p>}{data.messages.filter((m: any) => m.request_id === r.id).map((m: any) => <p key={m.id}><strong>{m.author_id === user.userId ? 'You' : 'MK lab'}:</strong> {m.body}</p>)}<MessageForm requestId={r.id}/></div></div>) : <Empty title="Make a website your own." body="Send a personalization request. Your quote, progress, and conversation will appear here." href="/personalize/custom" label="Request a quote"/>)}{section === 'subscriptions' && (data.subscriptions.length ? data.subscriptions.map((s: any) => <div className="record" key={s.id}><h3>{s.name}</h3><span className="badge">{s.status}</span></div>) : <Empty title="A little care, when you need it." body="You do not have an active care plan. Ongoing support is optional and separate from your purchases." href="/subscriptions" label="Explore care plans"/>)}{section === 'settings' && <form className="form" onSubmit={save}><div className="field"><label htmlFor="profile-name">Display name</label><input id="profile-name" name="name" autoComplete="name" defaultValue={name} maxLength={100} required/></div><div className="field"><label htmlFor="profile-email">Sign-in email</label><input id="profile-email" type="email" autoComplete="email" readOnly value={user.email}/><small>Sign-in and account security are managed through your ChatGPT account.</small></div><label className="check"><input type="checkbox" name="updates" defaultChecked={JSON.parse(data.profile?.preferences || '{}').updates || false}/>Receive collection and studio updates</label><button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save settings'}<Check {...iconProps}/></button><p role="status" className="form-message">{message}</p><div className="notice">Email preferences are saved. Outbound email delivery is not yet configured.</div></form>}</section></main>;
}
export function MessageForm({ requestId }: {
    requestId: string;
}) {
    const [message, setMessage] = useState(''), [busy, setBusy] = useState(false);
    return <form className="form" style={{ marginTop: 24 }} onSubmit={async (e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            setBusy(true);
            try {
                const r = await fetch('/api/market', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'message', requestId, body: f.get('body') }) });
                const d = await r.json() as {
                    error?: string;
                    message?: string;
                    url?: string;
                    records?: any[];
                };
                setMessage(d.message || d.error || 'Please try again.');
                if (r.ok)
                    location.reload();
            }
            catch {
                setMessage('Message could not be saved. Try again.');
            }
            finally {
                setBusy(false);
            }
        }}><div className="field"><label htmlFor={`msg-${requestId}`}>Project message</label><textarea id={`msg-${requestId}`} name="body" required maxLength={2000}/></div><button className="btn secondary" disabled={busy}>{busy ? 'Saving…' : 'Send message'}</button><p role="status">{message}</p></form>;
}
export function Plans({ settings }: {
    settings: Record<string, string>;
}) { return <main id="main" className="shell"><Intro title="A little ongoing care.">Keep your website in good company. Optional support, with a clearly defined scope.</Intro><div className="notice">Care plans are being prepared. Recurring billing is not configured, and no subscription can be started here. Prices below are illustrative starting prices in CAD, billed monthly.</div><div className="pricing-list section">{[['Basic Care', Number(settings.basicPrice || 19), ['Basic maintenance', 'Defined support allowance', 'Routine updates where applicable']], ['Growth Care', Number(settings.growthPrice || 49), ['Everything in Basic Care', 'Limited monthly content changes', 'Priority support', 'Basic performance monitoring']], ['Studio Care', Number(settings.studioPrice || 99), ['Extended maintenance', 'Greater customization allowance', 'Priority assistance', 'Additional services agreed in writing']]].map(([name, price, features]) => <article className="plan" key={String(name)}><div><h2>{name}</h2><p className="price" style={{ marginTop: 24 }}><small>From </small>{money(Number(price) * 100)}<small> / month</small></p></div><ul>{(features as string[]).map(f => <li key={f}><Check {...iconProps}/>{f}</li>)}</ul><Btn href="/contact" secondary>Discuss this plan</Btn></article>)}</div><p className="notice">Subscriptions are optional. They do not include unlimited development. Response times, monthly allowances, renewal dates, cancellation terms, and billing details will be confirmed before enrollment.</p></main>; }
