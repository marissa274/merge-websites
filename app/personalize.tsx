'use client';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, ArrowRight, Check, Minus, Plus } from 'lucide-react';
import { ConceptSite } from './concept-site';
import { ALL_CHOICES, SINGLE, FEATURES, BUDGETS, MAX_PAGES, PAGE, emptyBrief, estimate, formatAmount, validEmail, type Brief, type Choice, type Model, type Pricing, type SingleKey } from './personalize-model';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
const DRAFT = 'mk-personalize-draft';
const STEPS = [['pz-model', 'Your website'], ['pz-identity', 'Visual identity'], ['pz-content', 'Content'], ['pz-features', 'Features'], ['pz-budget', 'Budget & estimate'], ['pz-contact', 'Your details'], ['pz-review', 'Review']] as const;
function Step({ n, children, lead }: { n: number; lead: string; children: ReactNode }) {
    const [id, title] = STEPS[n - 1];
    return <section className="pz-step" id={id} aria-labelledby={`${id}-title`}><div className="pz-step-head"><span className="pz-step-n" aria-hidden="true">{n}</span><div><h2 id={`${id}-title`}>{title}</h2><p>{lead}</p></div></div>{children}</section>;
}
function Tag({ choice, pricing, count = 1 }: { choice: Choice; pricing: Pricing; count?: number }) {
    const amount = choice.kind === 'included' ? 0 : choice.kind === 'priced' && pricing[choice.id] ? pricing[choice.id] * count : null;
    return <span className={`pz-tag pz-tag-${amount === null ? 'quote' : amount ? 'priced' : 'included'}`}>{amount === 0 ? 'Included' : amount === null ? 'On quote' : `+${formatAmount(amount)}`}</span>;
}
// The customer arrives from the Personalize button of one website; that website is the one being personalized.
export function Personalize({ model, pricing, base, user }: { model: Model | null; pricing: Pricing; base: number; user: { fullName?: string; email?: string } | null }) {
    const [brief, setBrief] = useState(() => emptyBrief(model && { kind: model.kind, slug: model.slug }, { name: user?.fullName, email: user?.email }));
    const [errors, setErrors] = useState<string[]>([]), [busy, setBusy] = useState(false), [sent, setSent] = useState('');
    const errorRef = useRef<HTMLDivElement>(null);
    // Focus the error summary once it is rendered (it is hidden while empty).
    useEffect(() => { if (errors.length) errorRef.current?.focus(); }, [errors]);
    // A draft survives sign-in and reloads in this tab; a link to a different model starts fresh.
    useEffect(() => {
        try {
            const saved = JSON.parse(sessionStorage.getItem(DRAFT) || 'null') as Brief | null;
            // Restoring from browser storage can only happen after hydration, so this state update belongs in the effect.
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (saved && model && saved.model?.kind === model.kind && saved.model.slug === model.slug) setBrief(current => ({ ...current, ...saved, model: current.model, contact: { ...saved.contact, name: saved.contact?.name || current.contact.name, email: saved.contact?.email || current.contact.email } }));
        } catch { /* storage unavailable: the form still works */ }
    }, [model]);
    useEffect(() => { try { if (!sent) sessionStorage.setItem(DRAFT, JSON.stringify(brief)); } catch { /* ignore */ } }, [brief, sent]);
    if (!model) return <div className="pz-empty"><h2>Choose a website first.</h2><p>Open a website from the collection and select Personalize. It will appear here, ready to make your own.</p><a className="btn" href="/collection">Browse the collection<ArrowRight {...ip}/></a></div>;
    const result = estimate(brief, pricing, base, model);
    const set = (patch: Partial<Brief>) => setBrief(current => ({ ...current, ...patch }));
    const choose = (key: SingleKey, id: string) => setBrief(current => ({ ...current, choices: { ...current.choices, [key]: id } }));
    const label = (id: string) => ALL_CHOICES.find(choice => choice.id === id)?.label || id;
    function group(key: SingleKey, extra?: ReactNode) {
        const g = SINGLE[key];
        return <fieldset className="pz-group"><legend>{g.legend}</legend><div className="pz-options">{(g.choices as Choice[]).map(choice => <label className="pz-option" key={choice.id}><input type="radio" name={key} value={choice.id} checked={brief.choices[key] === choice.id} onChange={() => choose(key, choice.id)}/><span className="pz-option-text"><b>{choice.label}</b>{choice.hint && <small>{choice.hint}</small>}</span><Tag choice={choice} pricing={pricing}/></label>)}</div>{extra}</fieldset>;
    }
    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const problems = [!brief.contact.name.trim() && 'Add your name.', !validEmail(brief.contact.email.trim()) && 'Add a valid email address.'].filter((x): x is string => !!x);
        setErrors(problems); setSent('');
        if (problems.length) return;
        setBusy(true);
        try {
            const r = await fetch('/api/market', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'customize', brief }) });
            const d = await r.json() as { error?: string; message?: string };
            if (!r.ok) throw Error(d.error || 'Your request could not be saved. Try again.');
            setSent(d.message || 'Request saved.'); try { sessionStorage.removeItem(DRAFT); } catch { /* ignore */ }
        }
        catch (e) { setErrors([e instanceof Error ? e.message : 'Your request could not be saved. Try again.']); }
        finally { setBusy(false); }
    }
    const returnTo = model.kind === 'product' ? `/personalize/${encodeURIComponent(model.slug)}` : `/personalize/custom?concept=${encodeURIComponent(model.slug)}`;
    const total = <><strong className="pz-total">{result.total ? formatAmount(result.total) : 'On quote'}</strong>{result.quoted && <span className="pz-total-note">{result.total ? '+ quoted items' : 'Every item is priced by the studio'}</span>}</>;
    const breakdown = <ul className="pz-lines">{result.lines.map(line => <li key={line.id}><span>{line.label}</span><span>{formatAmount(line.amount)}</span></li>)}</ul>;
    return <div className="pz">
        <form className="pz-form" onSubmit={submit} noValidate>
            <Step n={1} lead="The website you chose. Everything below is applied to it.">
                <div className="pz-site"><div className="pz-site-preview">{model.kind === 'concept' && model.palette ? <ConceptSite slug={model.slug} palette={model.palette} viewport="desktop"/> : model.image ? <img src={model.image} alt={`${model.name} website`} width={1600} height={1000}/> : <span translate="no">{model.name}</span>}</div>
                    <div className="pz-site-info"><span className="pz-site-meta">{model.kind === 'product' ? `${model.category} / ${model.price ? formatAmount(model.price) : 'Price on request'}` : `${model.category} / Concept`}</span><p className="pz-site-name" translate="no">{model.name}</p><a className="text-link" href={model.kind === 'product' ? `/collection/${encodeURIComponent(model.slug)}` : `/concepts/${encodeURIComponent(model.slug)}`}>View this website<ArrowUpRight {...ip}/></a><a className="pz-change" href="/collection">Choose another website</a></div></div>
            </Step>
            <Step n={2} lead="Logo, colors, typography and images.">
                {group('logo')}
                {group('colors', brief.choices.colors === 'colors-brand' && <div className="pz-palette">{[0, 1, 2].map(i => <label key={i}><span className="visually-hidden">Brand color {i + 1}</span><input type="color" value={brief.palette[i] || '#ffffff'} onChange={e => { const palette = [...brief.palette]; palette[i] = e.target.value; set({ palette }); }}/><span translate="no">{brief.palette[i] || '#ffffff'}</span></label>)}</div>)}
                {group('type')}
                {group('images')}
            </Step>
            <Step n={3} lead="Texts, additional pages and your business information.">
                {group('copy')}
                <fieldset className="pz-group"><legend>Additional pages</legend><div className="pz-pages"><div className="pz-stepper"><button type="button" aria-label="Remove a page" disabled={brief.pages <= 0} onClick={() => setBrief(current => ({ ...current, pages: Math.max(0, current.pages - 1) }))}><Minus {...ip}/></button><output aria-live="polite">{brief.pages}</output><button type="button" aria-label="Add a page" disabled={brief.pages >= MAX_PAGES} onClick={() => setBrief(current => ({ ...current, pages: Math.min(MAX_PAGES, current.pages + 1) }))}><Plus {...ip}/></button></div><span className="pz-option-text"><b>{brief.pages === 1 ? '1 page' : `${brief.pages} pages`}</b><small>Beyond the template’s included pages</small></span><Tag choice={PAGE} pricing={pricing} count={Math.max(1, brief.pages)}/></div>
                    {brief.pages > 0 && <div className="field"><label htmlFor="pz-page-names">Which pages?</label><input id="pz-page-names" value={brief.pageNames} maxLength={500} placeholder="For example: Services, FAQ, Team…" onChange={e => set({ pageNames: e.target.value })}/></div>}</fieldset>
                <fieldset className="pz-group"><legend>Your business</legend><div className="pz-fields"><div className="field"><label htmlFor="pz-company">Company name</label><input id="pz-company" autoComplete="organization" maxLength={120} value={brief.business.company} onChange={e => set({ business: { ...brief.business, company: e.target.value } })}/></div><div className="field"><label htmlFor="pz-sector">Activity</label><input id="pz-sector" maxLength={120} value={brief.business.sector} placeholder="Skincare studio, restaurant…" onChange={e => set({ business: { ...brief.business, sector: e.target.value } })}/></div></div>
                    <div className="field"><label htmlFor="pz-info">Address, hours, contact details</label><textarea id="pz-info" maxLength={2000} value={brief.business.info} onChange={e => set({ business: { ...brief.business, info: e.target.value } })}/></div></fieldset>
            </Step>
            <Step n={4} lead="Booking, payment, forms or other integrations.">
                <fieldset className="pz-group"><legend className="visually-hidden">Features</legend><div className="pz-options pz-options-grid">{FEATURES.map(choice => <label className="pz-option" key={choice.id}><input type="checkbox" checked={brief.features.includes(choice.id)} onChange={e => set({ features: e.target.checked ? [...brief.features, choice.id] : brief.features.filter(id => id !== choice.id) })}/><span className="pz-option-text"><b>{choice.label}</b>{choice.hint && <small>{choice.hint}</small>}</span><Tag choice={choice} pricing={pricing}/></label>)}</div>
                    <div className="field"><label htmlFor="pz-feature-notes">Anything specific? <span className="pz-optional">Optional</span></label><textarea id="pz-feature-notes" maxLength={1500} value={brief.featureNotes} placeholder="Tools you already use, how bookings or payments should work…" onChange={e => set({ featureNotes: e.target.value })}/></div></fieldset>
            </Step>
            <Step n={5} lead="Updated as you choose. Complex options are priced by quote.">
                <fieldset className="pz-group"><legend>Your budget</legend><div className="pz-chips">{BUDGETS.map(b => <label className="pz-chip" key={b}><input type="radio" name="budget" checked={brief.budget === b} onChange={() => set({ budget: b })}/>{b}</label>)}</div></fieldset>
                <div className="pz-estimate" aria-live="polite"><div className="pz-estimate-head"><span>Estimated cost</span><div>{total}</div></div>{breakdown}<p>{result.quoted ? 'Items on quote are priced by the studio after reviewing your request. ' : ''}All prices in CAD, before taxes. This is an estimate, not a charge.</p></div>
            </Step>
            <Step n={6} lead="So the studio can reply with your quote.">
                <div className="pz-fields"><div className="field"><label htmlFor="pz-name">Name</label><input id="pz-name" autoComplete="name" required maxLength={100} value={brief.contact.name} onChange={e => set({ contact: { ...brief.contact, name: e.target.value } })}/></div><div className="field"><label htmlFor="pz-email">Email</label><input id="pz-email" type="email" autoComplete="email" spellCheck={false} required maxLength={200} value={brief.contact.email} onChange={e => set({ contact: { ...brief.contact, email: e.target.value } })}/></div></div>
                <div className="field"><label htmlFor="pz-notes">Remarks <span className="pz-optional">Optional</span></label><textarea id="pz-notes" maxLength={3000} value={brief.contact.notes} placeholder="Deadlines, references, anything else…" onChange={e => set({ contact: { ...brief.contact, notes: e.target.value } })}/><small>Please leave out passwords or payment details.</small></div>
            </Step>
            <Step n={7} lead="Check your choices, then send your request.">
                <dl className="pz-recap">{[['Website', model.name], ['Logo', label(brief.choices.logo)], ['Colors', label(brief.choices.colors) + (brief.choices.colors === 'colors-brand' ? ` ${brief.palette.join(' ')}` : '')], ['Typography', label(brief.choices.type)], ['Images', label(brief.choices.images)], ['Texts', label(brief.choices.copy)], ['Additional pages', String(brief.pages)], ['Features', brief.features.map(label).join(', ') || 'None'], ['Budget', brief.budget || 'Not given'], ['Contact', brief.contact.email ? `${brief.contact.name} / ${brief.contact.email}` : 'Missing']].map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
                <div className="pz-send"><div className="pz-send-total"><span>Estimated cost</span>{total}</div>
                    <div ref={errorRef} tabIndex={-1} role="alert" className="pz-errors">{errors.length > 0 && <ul>{errors.map(e => <li key={e}>{e}</li>)}</ul>}</div>
                    {sent ? <div className="pz-sent" role="status"><Check {...ip}/><p>{sent}</p><a className="text-link" href="/account/customizations">Follow it in your account<ArrowRight {...ip}/></a></div>
                        : user ? <button className="btn pz-submit" disabled={busy} type="submit">{busy ? 'Sending your request…' : 'Request Customization'}<ArrowUpRight {...ip}/></button>
                        : <div className="pz-signin"><p>Sign in to send your request and follow its progress. Your choices are kept.</p><a className="btn pz-submit" href={`/login?return_to=${encodeURIComponent(returnTo)}`}>Sign in to request<ArrowUpRight {...ip}/></a></div>}
                    <p className="pz-fineprint">Nothing is charged. Options marked On quote are confirmed in your quote before any work or payment begins.</p></div>
            </Step>
        </form>
        <aside className="pz-summary" aria-label="Estimate summary">
            <div className="pz-summary-card"><span className="pz-summary-label">Your estimate</span><div className="pz-summary-total">{total}</div><p className="pz-summary-model">{model.name}</p>{breakdown}</div>
            <nav className="pz-steps" aria-label="Personalization steps"><ol>{STEPS.map(([id, title], i) => <li key={id}><a href={`#${id}`}><span aria-hidden="true">{i + 1}</span>{title}</a></li>)}</ol></nav>
        </aside>
        <a className="pz-bar" href="#pz-review"><span>Estimate</span>{total}<ArrowRight {...ip}/></a>
    </div>;
}
