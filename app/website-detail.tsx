'use client';
import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { ArrowLeft, ArrowUpRight, Expand, X, Check, Monitor, Tablet, Smartphone, Signal, Wifi, BatteryFull } from 'lucide-react';
import type { Product } from './ui';
import { AnimatedPreview } from './bento-preview';
import { MosaicStudyPreview } from './collection-preview';
import { MotionControl } from './home-v2';
import { DetailMotion } from './detail-motion';
import { ConceptSite, hasConceptSite } from './concept-site';
import { WebsiteDemos, DemoTrigger, DemoGrid } from './website-demos';
import { useGalleryPurchase } from './gallery-work';
import { purchaseGaps, type Presentation, type Preview } from './product-presentation';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
const money = (value: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value / 100);
export type DetailProject = { name: string; slug: string; description: string; category: string; presentation: Presentation; concept?: boolean; product?: Product };
function ConceptArt({ slug }: { slug: string }) { return ['muse','offgrid','sunday','studio-09'].includes(slug) ? <AnimatedPreview slug={slug} large/> : <MosaicStudyPreview slug={slug}/>; }
function Screenshot({ preview, name, priority = false }: { preview: Preview; name: string; priority?: boolean }) {
    const src = `/api/media/${encodeURIComponent(preview.id)}`;
    return <figure className={`detail-screenshot detail-screenshot-${preview.role}`}>
        <Dialog.Root><Dialog.Trigger className="detail-image-button" aria-label={`Review ${preview.alt || `${name} ${preview.role} preview`}`}><img src={src} alt={preview.alt || `${name} ${preview.role} preview`} width={preview.role === 'mobile' ? 480 : 1600} height={preview.role === 'mobile' ? 960 : 1000} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'}/><span className="detail-image-expand"><Expand {...ip}/></span></Dialog.Trigger>
            <Dialog.Portal><Dialog.Backdrop className="detail-review-backdrop"/><Dialog.Popup className="detail-review"><div className="detail-review-heading"><Dialog.Title>{name} / {preview.role}</Dialog.Title><Dialog.Close className="nav-icon" aria-label="Close image review"><X {...ip}/></Dialog.Close></div><Dialog.Description className={preview.caption ? undefined : 'visually-hidden'}>{preview.caption || preview.alt || 'Selected website screenshot.'}</Dialog.Description><div className="detail-review-scroll"><img src={src} alt={preview.alt || `${name} ${preview.role} preview`} width={1600} height={1000}/></div></Dialog.Popup></Dialog.Portal>
        </Dialog.Root>
    </figure>;
}
type DeviceKind = 'desktop' | 'tablet' | 'mobile';
// Each screen takes its screenshot's proportion within the range real devices use. Taller full-page captures keep the default screen and stay top-aligned, so navigation is never cropped.
const SCREENS: Record<DeviceKind, { label: string; ratio: number; min: number; max: number; landscape?: [number, number]; icon: typeof Monitor }> = {
    desktop: { label: 'Desktop', ratio: 1.6, min: 1.42, max: 1.78, icon: Monitor },
    tablet: { label: 'Tablet', ratio: .75, min: .66, max: .8, landscape: [1.3, 1.6], icon: Tablet },
    mobile: { label: 'Mobile', ratio: .46, min: .42, max: .52, icon: Smartphone },
};
function screenRatio(kind: DeviceKind, width: number, height: number) {
    const screen = SCREENS[kind], ratio = width / height;
    if (screen.landscape && ratio > 1) return Math.min(Math.max(ratio, screen.landscape[0]), screen.landscape[1]);
    return ratio < screen.min ? screen.ratio : Math.min(ratio, screen.max);
}
const protect = { draggable: false, onContextMenu: (event: MouseEvent) => event.preventDefault() };
function DeviceScreen({ kind, preview, name, setRatio }: { kind: DeviceKind; preview: Preview; name: string; setRatio: (ratio: number) => void }) {
    const image = useRef<HTMLImageElement>(null);
    const src = `/api/media/${encodeURIComponent(preview.id)}`, label = SCREENS[kind].label, alt = preview.alt || `${name} ${kind} screenshot`;
    // A cached image can finish loading before hydration, when onLoad no longer fires.
    useEffect(() => { const img = image.current; if (img?.complete && img.naturalWidth) setRatio(screenRatio(kind, img.naturalWidth, img.naturalHeight)); }, [kind, setRatio, src]);
    return <Dialog.Root><Dialog.Trigger className="device-screen-button" style={{ '--device-shot': `url("${src}")` } as CSSProperties} aria-label={`Enlarge ${name} ${label.toLowerCase()} preview`}><img ref={image} src={src} alt={alt} width={kind === 'desktop' ? 1600 : kind === 'tablet' ? 1112 : 780} height={kind === 'desktop' ? 1000 : kind === 'tablet' ? 1480 : 1688} loading="lazy" decoding="async" onLoad={event => setRatio(screenRatio(kind, event.currentTarget.naturalWidth, event.currentTarget.naturalHeight))} {...protect}/><span className="detail-image-expand"><Expand {...ip}/></span></Dialog.Trigger>
        <Dialog.Portal><Dialog.Backdrop className="detail-review-backdrop"/><Dialog.Popup className={`detail-review device-review device-review-${kind}`}><div className="detail-review-heading"><Dialog.Title>{name} / {label}</Dialog.Title><Dialog.Close className="nav-icon" aria-label="Close preview"><X {...ip}/></Dialog.Close></div><Dialog.Description className={preview.caption ? undefined : 'visually-hidden'}>{preview.caption || `${label} layout of ${name}.`}</Dialog.Description><div className="detail-review-scroll"><img src={src} alt={alt} width={1600} height={1000} {...protect}/></div></Dialog.Popup></Dialog.Portal>
    </Dialog.Root>;
}
const StatusBar = () => <div className="phone-status" aria-hidden="true"><span>9:41</span><span className="phone-status-icons"><Signal {...ip}/><Wifi {...ip}/><BatteryFull {...ip}/></span></div>;
// A second, decorative phone beside the laptop or tablet, as in the references. It repeats this same website's mobile layout and is not interactive.
function CompanionPhone({ where, children }: { where: 'desktop' | 'tablet'; children: ReactNode }) {
    return <div className={`device device-mobile device-companion device-companion-${where}`} data-device="companion" aria-hidden="true" style={{ '--screen-ratio': SCREENS.mobile.ratio } as CSSProperties}><div className="device-body"><div className="device-screen">{children}<StatusBar/></div></div></div>;
}
const companionShot = (preview: Preview) => { const src = `/api/media/${encodeURIComponent(preview.id)}`; return <div className="device-screen-button" style={{ '--device-shot': `url("${src}")` } as CSSProperties}><img src={src} alt="" width={780} height={1688} loading="lazy" decoding="async" {...protect}/></div>; };
function Device({ kind, preview, project, companion }: { kind: DeviceKind; preview?: Preview; project: DetailProject; companion?: Preview }) {
    const screen = SCREENS[kind], Icon = screen.icon;
    const [ratio, setRatio] = useState(screen.ratio);
    const landscape = ratio > 1 && kind !== 'desktop';
    // Concepts have no uploaded captures: their own responsive homepage is rendered live at this device's width instead.
    const live = !preview && !!project.concept && hasConceptSite(project.slug), palette = project.presentation.palette;
    if (preview?.framing === 'composed') return <figure className={`device-figure device-figure-${kind}`}><figcaption className="device-label">{screen.label}</figcaption><div className={`device-stage device-stage-${kind} device-stage-composed`}><div className="device-composed" data-device={kind}><Screenshot preview={preview} name={project.name}/></div></div></figure>;
    const content = preview ? <DeviceScreen kind={kind} preview={preview} name={project.name} setRatio={setRatio}/>
        : live ? <div className="device-live" role="img" aria-label={`${project.name} ${kind} layout`}><ConceptSite slug={project.slug} palette={palette} viewport={kind}/></div>
        : <div className="device-placeholder" role="img" aria-label={`${screen.label} screenshot not yet available`}><Icon {...ip}/><span>{`${screen.label} screenshot coming soon`}</span></div>;
    const companionScreen = kind === 'mobile' ? null : companion ? companionShot(companion) : live ? <div className="device-live"><ConceptSite slug={project.slug} palette={palette} viewport="mobile"/></div> : null;
    return <figure className={`device-figure device-figure-${kind}`}>
        <figcaption className="device-label">{screen.label}</figcaption>
        <div className={`device-stage device-stage-${kind}`}>
            {/* The pose holds the resting angle from the references; scroll motion animates the device inside it. */}
            <div className="device-pose"><div className={`device device-${kind}${landscape ? ' is-landscape' : ''}`} data-device={kind} style={{ '--screen-ratio': ratio } as CSSProperties}>
                <div className="device-body"><div className={`device-screen${preview || live ? '' : ' is-empty'}`}>{content}{kind === 'mobile' && (preview || live) && <StatusBar/>}</div>{kind === 'tablet' && !landscape && <span className="tablet-home" aria-hidden="true"/>}</div>
                {kind === 'desktop' && <div className="laptop-base" aria-hidden="true"/>}
            </div></div>
            {companionScreen && kind !== 'mobile' && <CompanionPhone where={kind}>{companionScreen}</CompanionPhone>}
        </div>
    </figure>;
}
// The same selected website on three devices. Products use only their own approved screenshots (missing ones show a marked placeholder); concepts render their own responsive homepage.
function DeviceShowcase({ project }: { project: DetailProject }) {
    const previews = project.presentation.previews, pick = (role: Preview['role']) => previews.find(image => image.role === role);
    const mobile = pick('mobile'), phone = mobile?.framing === 'composed' ? undefined : mobile;
    return <section className="detail-devices detail-shell" data-detail-act aria-labelledby="devices-title">
        <h2 id="devices-title" data-act-heading>One Website.<br/>Three Devices.<br/>Fully Responsive.</h2>
        <Device kind="desktop" preview={pick('desktop') || pick('hero')} project={project} companion={phone}/>
        <div className="device-pair"><Device kind="mobile" preview={mobile} project={project}/><Device kind="tablet" preview={pick('tablet')} project={project} companion={phone}/></div>
    </section>;
}
function PurchaseActions({ product, canBuy, personalize, onBuy, demo = false }: { product?: Product; canBuy: boolean; personalize: string; onBuy: (product: Product) => void; demo?: boolean }) {
    return <div className="detail-purchase-actions"><div className="detail-action-pair"><button className="detail-primary" disabled={!canBuy} onClick={() => { if (canBuy && product) onBuy(product); }}>Buy Now<ArrowUpRight {...ip}/></button><a className="detail-secondary" href={personalize}>Personalize<ArrowUpRight {...ip}/></a></div>{demo && <DemoTrigger/>}</div>;
}
export function WebsiteDetail({ project, related = [], commerceReady = false }: { project: DetailProject; related?: Product[]; commerceReady?: boolean }) {
    const root = useRef<HTMLElement>(null);
    const { purchaseError, buy } = useGalleryPurchase();
    const p = project.presentation, product = project.product, concept = !!project.concept;
    const description = p.statement || project.description;
    const heroDescription = description.length > 180 ? `${description.slice(0, 177).replace(/\s+\S*$/, '')}…` : description;
    const hero = p.previews.find(image => image.role === 'hero') || p.previews.find(image => image.role === 'desktop') || p.previews[0];
    const gaps = purchaseGaps(p), canBuy = !!product && !!product.published && commerceReady && !gaps.length;
    const style = { '--detail-paper': p.palette.background, '--detail-ink': p.palette.ink, '--detail-accent': p.palette.accent, '--detail-accent-ink': p.palette.accentInk } as CSSProperties;
    const personalize = concept ? `/personalize/custom?concept=${encodeURIComponent(project.slug)}` : `/personalize/${encodeURIComponent(project.slug)}`;
    const inquiry = `/contact?demo=${encodeURIComponent(project.slug)}${concept ? '&concept=1' : ''}`;
    const facts = [['Responsive compatibility', p.compatibility], ['Technology', p.technologies.join(' / ')], ['Customization', p.customization.join(' / ')], ['Delivery format', p.deliveryFormat], ['Hosting', p.hosting], ['Deployment', p.deployment], ['Documentation', p.documentation]].filter(([,value]) => !!value);
    const purchaseFacts = [['License', p.licenseDetails || product?.license], ['Delivery', p.delivery], ['Recurring costs', p.recurring]].filter(([,value]) => !!value);
    const suggestions = related.filter(item => item.id !== product?.id && item.published).slice(0,3);
    const price = product ? <>{money(product.price)} <span>CAD</span></> : <>Price on request</>;
    return <WebsiteDemos videos={p.videos} name={project.name}><main id="main" ref={root} className={`website-detail detail-type-${p.typography}`} style={style}>
        <DetailMotion scope={root} rhythm={p.motion}/>
        <header className="detail-hero detail-shell">
            <nav className="detail-breadcrumb" aria-label="Breadcrumb"><a href="/collection"><ArrowLeft {...ip}/>Collection</a><span aria-hidden="true">/</span><span aria-current="page">{project.name}</span></nav>
            <h1 className="detail-title"><span className="detail-title-mask"><span data-title-line>{project.name}</span></span></h1>
            <p className="detail-description">{heroDescription}</p>
            <div className="detail-hero-layout">
                <div className="detail-hero-stage" data-detail-hero-art><div data-detail-hero-zoom>{concept ? <div className="detail-concept-art"><ConceptArt slug={project.slug}/></div> : hero ? <Screenshot preview={hero} name={project.name} priority/> : <div className="detail-no-preview">Preview coming soon</div>}</div></div>
                <div className="detail-hero-purchase" aria-label="Purchase options"><p className="detail-price">{price}</p><PurchaseActions product={product} canBuy={canBuy} personalize={personalize} onBuy={buy} demo/>{concept ? <p className="detail-availability">Concept · not for sale</p> : !canBuy && <p className="detail-availability">Checkout is not open yet. <a href="#purchase-information">View purchase information</a></p>}{purchaseError && <p role="alert" className="detail-purchase-error">{purchaseError} <a href="/cart">View bag</a></p>}</div>
            </div>
        </header>
        <DemoGrid/>
        <DeviceShowcase project={project}/>
        <section className="detail-about detail-shell" data-detail-act><h2 data-act-heading>About This Website.</h2><div data-act-content><p>{p.firstBody || project.description}</p>{p.brandBody && p.brandBody !== p.firstBody && p.brandBody !== project.description && <p>{p.brandBody}</p>}</div></section>
        {(p.pages.length > 0 || p.features.length > 0 || facts.length > 0) && <section className="detail-included detail-shell" data-detail-act><h2 data-act-heading>Made to work<br/>for you.</h2>
            {p.pages.length > 0 && <div className="detail-pages" data-act-content><h3>Included pages</h3><ul>{p.pages.map(page => <li key={page}>{page}</li>)}</ul></div>}
            {p.features.length > 0 && <ul className="detail-feature-list" data-act-content>{p.features.map(feature => <li key={feature}><Check {...ip}/>{feature}</li>)}</ul>}
            {facts.length > 0 && <dl className="detail-facts" data-act-content>{facts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
        </section>}
        <section id="purchase-information" className="detail-purchase-information detail-shell" data-detail-act><h2 data-act-heading>License & delivery.</h2><div data-act-content>{product ? <><dl className="detail-facts">{purchaseFacts.map(([label,value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>{(!commerceReady || gaps.length > 0) && <details className="detail-purchase-status"><summary>Purchase availability</summary><p>{!commerceReady && 'Payment setup and published policies are required. '}{gaps.length > 0 && `Still to confirm: ${gaps.join(', ').toLowerCase()}.`}</p></details>}<p className="detail-tax-note">Applicable taxes calculated at checkout.</p></> : <p>This design study is not for sale. Scope, price and delivery are agreed in your quote.</p>}<a className="detail-text-link" href="/licenses">License terms<ArrowUpRight {...ip}/></a></div></section>
        <section id="make-it-yours" className="detail-purchase detail-shell" data-detail-act><h2 data-act-heading>Make it yours.</h2><div className="detail-final-offer" data-act-content><div><h3>{project.name}</h3><p className="detail-price">{price}</p>{product && <p className="detail-final-summary">{product.license}{p.delivery && <> / {p.delivery}</>}</p>}</div><div><PurchaseActions product={product} canBuy={canBuy} personalize={personalize} onBuy={buy}/><a className="detail-text-link" href={inquiry}>Ask the studio<ArrowUpRight {...ip}/></a></div></div></section>
        {suggestions.length > 0 && <section className="detail-related detail-shell" data-detail-act><h2 data-act-heading>You Might Also Like.</h2><div className="detail-related-grid" data-act-content>{suggestions.map(item => <article key={item.id}><a href={`/collection/${encodeURIComponent(item.slug)}`}>{item.image_id ? <img src={`/api/media/${encodeURIComponent(item.image_id)}`} alt={`${item.name} website screenshot`} width={1200} height={900} loading="lazy"/> : <div className="detail-related-placeholder">{item.name}</div>}<div><h3>{item.name}</h3><span>{money(item.price)} CAD<ArrowUpRight {...ip}/></span></div></a></article>)}</div></section>}
        <div className="detail-end detail-shell"><a href="/collection"><ArrowLeft {...ip}/>Back to Collection</a><MotionControl/></div>
    </main></WebsiteDemos>;
}
