'use client';
import { ProductPresentationFields } from './product-presentation-fields';
import { PRICED, parsePricing } from './personalize-model';
import { useState, type FormEvent } from 'react';
import { Plus, Check, Upload, Download } from 'lucide-react';
import { type Product, money, MessageForm } from './ui';
export function Admin({ products, orders, requests, customers, inquiries, settings }: {
    products: Product[];
    orders: any[];
    requests: any[];
    customers: any[];
    inquiries: any[];
    settings: Record<string, string>;
}) {
    const [tab, setTab] = useState('Websites'), [editing, setEditing] = useState<Product | null>(null), [message, setMessage] = useState(''), [busy, setBusy] = useState(false), [selected, setSelected] = useState(products[0]?.id || '');
    async function post(body: any) { setBusy(true); setMessage(''); try {
        const r = await fetch('/api/market', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        const d = await r.json() as {
            error?: string;
            message?: string;
            url?: string;
            records?: any[];
            id?: string;
        };
        if (!r.ok)
            throw Error(d.error);
        setMessage(d.message || 'Saved.');
        return d;
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : 'Could not save. Try again.');
        return null;
    }
    finally {
        setBusy(false);
    } }
    async function save(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const f = new FormData(e.currentTarget); const d = await post({ action: 'product', id: editing?.id, ...Object.fromEntries(f), featured: f.has('featured'), published: f.has('published') }); if (d)
        location.reload(); }
    return <main id="main" className="shell"><div className="page-intro"><p className="aside-title">Studio management</p><h1>Behind the collection.</h1></div><div className="dash-stats">{[[products.length, 'Websites'], [orders.filter(o => o.status === 'paid').length, 'Confirmed sales'], [money(orders.filter(o => o.status === 'paid').reduce((n, o) => n + (o.total || 0), 0)), 'Revenue in CAD'], [requests.filter(r => r.status !== 'Completed').length, 'Open requests']].map(([n, l]) => <div className="dash-stat" key={l}><strong>{n}</strong><span>{l}</span></div>)}</div><div className="tabs admin-tabs">{['Websites', 'Projects', 'Customers', 'Sales', 'Content'].map(t => <button className="chip" key={t} aria-pressed={tab === t} onClick={() => setTab(t)}>{t}</button>)}</div><p role="status" className="form-message">{message}</p>{tab === 'Websites' && <div className="split section"><div><h2 style={{ fontSize: 30, marginBottom: 24 }}>Your websites</h2>{products.map(p => <div className="record" key={p.id}><div><h3>{p.name}</h3><p>{money(p.price)} CAD · {p.published ? 'Published' : 'Draft'}</p></div><button className="plain" onClick={() => setEditing(p)}>Edit</button></div>)}<button className="btn secondary" onClick={() => setEditing(null)}>New website<Plus aria-hidden="true"/></button><div style={{ marginTop: 48 }}><h3>Preview & delivery files</h3><p className="aside-title">Save your website first. Preview images are public. Delivery files stay private.</p><form className="form" onSubmit={async (e) => { e.preventDefault(); setBusy(true); const f = new FormData(e.currentTarget); try {
        const r = await fetch('/api/market', { method: 'POST', body: f });
        const d = await r.json() as {
            error?: string;
            message?: string;
            url?: string;
            records?: any[];
            id?: string;
        };
        if (!r.ok)
            throw Error(d.error);
        setMessage(`Uploaded public media ID: ${d.id || ''}. Copy this ID into the editorial preview fields. Private delivery files cannot be used as previews.`);
    }
    catch (e) {
        setMessage(e instanceof Error ? e.message : 'Upload failed. Try again.');
    }
    finally {
        setBusy(false);
    } }}><div className="field"><label htmlFor="upload-product">Website</label><select id="upload-product" name="productId" required value={selected} onChange={e => setSelected(e.target.value)}><option value="">Choose a website</option>{products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div><div className="field"><label htmlFor="kind">File type</label><select id="kind" name="kind"><option value="image">Public preview image</option><option value="video">Public demo video (MP4 / WebM)</option><option value="asset">Private delivery file</option></select></div><div className="field"><label htmlFor="file">Choose file (up to 25 MB)</label><input id="file" name="file" type="file" required/></div><button className="btn secondary" disabled={busy || !products.length}>Upload file<Upload aria-hidden="true"/></button></form></div></div><form className="form" onSubmit={save} key={editing?.id || 'new'}><h2 style={{ fontSize: 30 }}>{editing ? 'Edit website' : 'Add a website'}</h2>{[['name', 'Website name', editing?.name || ''], ['slug', 'URL slug', editing?.slug || ''], ['category', 'Category', editing?.category || ''], ['tags', 'Tags, separated by commas', (() => { try {
                return JSON.parse(editing?.tags || '[]').join(', ');
            }
            catch {
                return '';
            } })()], ['price', 'Base price in CAD', editing ? String(editing.price / 100) : ''], ['license', 'License name', editing?.license || 'Single website']].map(([name, label, value]) => <div className="field" key={name}><label htmlFor={`product-${name}`}>{label}</label><input id={`product-${name}`} name={name} defaultValue={value} required={name !== 'tags'} type={name === 'price' ? 'number' : 'text'} min={name === 'price' ? 1 : undefined} step={name === 'price' ? '.01' : undefined} autoComplete="off"/></div>)}<div className="field"><label htmlFor="description">Description, platform & deliverables</label><textarea id="description" name="description" defaultValue={editing?.description || ''} required/></div><ProductPresentationFields initial={editing?.presentation} category={editing?.category} productId={editing?.id}/><label className="check"><input type="checkbox" name="featured" defaultChecked={!!editing?.featured}/>Feature on the homepage</label><label className="check"><input type="checkbox" name="published" defaultChecked={!!editing?.published}/>Publish in the collection</label><button className="btn" disabled={busy}>{busy ? 'Saving…' : 'Save website'}<Check aria-hidden="true"/></button></form></div>}{tab === 'Projects' && <section className="section">{!requests.length && <p>No customization requests yet.</p>}{requests.map(r => <article className="record" key={r.id}><div><h3>{r.name}</h3><p style={{ whiteSpace: 'pre-wrap' }}>{r.details}</p><p>Customer: {r.email || r.user_id}</p><MessageForm requestId={r.id}/></div><form className="form" style={{ maxWidth: 320 }} onSubmit={async (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); if (await post({ action: 'status', id: r.id, ...Object.fromEntries(f) }))
        location.reload(); }}><div className="field"><label htmlFor={`status-${r.id}`}>Project status</label><select id={`status-${r.id}`} name="status" defaultValue={r.status}>{['Pending', 'Quoted', 'In Progress', 'Review', 'Completed'].map(x => <option key={x}>{x}</option>)}</select></div><div className="field"><label htmlFor={`quote-${r.id}`}>Quoted price in CAD</label><input id={`quote-${r.id}`} name="quote" type="number" min="0" step=".01" defaultValue={r.quote === null ? '' : r.quote / 100}/></div><button className="btn secondary" disabled={busy}>Update project</button></form></article>)}</section>}{tab === 'Customers' && <section className="section"><h2 style={{ fontSize: 30, marginBottom: 24 }}>Customer accounts</h2>{customers.map(c => <div className="record" key={c.id}><h3>{c.name}</h3><p>{c.email}</p></div>)}<h2 style={{ fontSize: 30, marginBlock: 40 }}>Support inquiries</h2>{inquiries.length ? inquiries.map(q => <div className="record" key={q.id}><div><h3>{q.subject}</h3><p>{q.body}</p><p>{q.name} · {q.email}</p></div></div>) : <p>No inquiries yet.</p>}</section>}{tab === 'Sales' && <section className="section"><button className="btn secondary" disabled={busy} onClick={async () => { const d = await post({ action: 'export' }); if (d) {
        const csv = ['Order ID,Customer ID,Status,Subtotal cents,Total cents,Currency,Created at', ...(d.records || []).map((r: any) => [r.id, r.user_id, r.status, r.subtotal, r.total, r.currency, r.created_at].map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(','))].join('\n');
        const u = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
        const a = document.createElement('a');
        a.href = u;
        a.download = 'mek-lab-orders.csv';
        a.click();
        URL.revokeObjectURL(u);
    } }}>Export orders<Download aria-hidden="true"/></button>{orders.map(o => <div className="record" key={o.id}><div><h3>Order {o.id.slice(0, 8)}</h3><p>{o.email || o.user_id}</p></div><span>{money(o.total || o.subtotal)} CAD</span><span className="badge">{o.status}</span></div>)}</section>}{tab === 'Content' && <section className="section settings-list"><p className="notice">Legal fields are empty until approved business copy is supplied. FAQ accepts a JSON array of question-and-answer pairs. Prices use dollars in CAD.</p><PersonalizationPricing settings={settings} busy={busy} save={value => post({ action: 'setting', key: 'personalizationPricing', value })}/>{[['homeTitle', 'Homepage title'], ['homeDescription', 'Homepage description'], ['about', 'About the studio'], ['contactEmail', 'Public contact email'], ['faq', 'FAQ questions and answers (JSON)'], ['terms', 'Terms and conditions'], ['privacy', 'Privacy policy'], ['licenses', 'License terms'], ['basicPrice', 'Basic Care monthly starting price'], ['growthPrice', 'Growth Care monthly starting price'], ['studioPrice', 'Studio Care monthly starting price'], ['personalizationPrice', 'Personalization starting price'], ['taxMode', 'Tax mode: stripe_automatic, manual, or no_tax'], ['taxRateIds', 'Manual tax rate IDs, separated by commas']].map(([key, label]) => <form key={key} className="form" onSubmit={async (e) => { e.preventDefault(); const f = new FormData(e.currentTarget); await post({ action: 'setting', key, value: f.get('value') }); }}><div className="field"><label htmlFor={`setting-${key}`}>{label}</label><textarea id={`setting-${key}`} name="value" defaultValue={settings[key] || ''}/></div><button className="btn secondary" disabled={busy}>Save changes</button></form>)}</section>}</main>;
}

// Prices for the Personalize page estimate, in CAD. A blank price leaves that option on quote; complex options are always quoted.
function PersonalizationPricing({ settings, busy, save }: { settings: Record<string, string>; busy: boolean; save: (value: string) => Promise<unknown> }) {
    const current = parsePricing(settings.personalizationPricing);
    return <form className="form" onSubmit={async e => { e.preventDefault(); const f = new FormData(e.currentTarget); await save(JSON.stringify(Object.fromEntries(PRICED.flatMap(choice => { const dollars = Number(f.get(choice.id)); return Number.isFinite(dollars) && dollars > 0 ? [[choice.id, Math.round(dollars * 100)]] : []; })))); }}><fieldset><legend>Personalization option prices (CAD)</legend><p className="aside-title">Shown in the live estimate on the Personalize page. Leave a price blank to keep that option on quote. Booking, payments, multilingual, photo shoots and other integrations are always quoted. The starting price is the “Personalization starting price” setting below.</p>{PRICED.map(choice => <div className="field" key={choice.id}><label htmlFor={`price-${choice.id}`}>{choice.label}{choice.id === 'pages-extra' ? ' (per page)' : ''}</label><input id={`price-${choice.id}`} name={choice.id} type="number" min="0" step="1" inputMode="decimal" defaultValue={current[choice.id] ? current[choice.id] / 100 : ''} placeholder="On quote"/></div>)}</fieldset><button className="btn secondary" disabled={busy}>Save option prices</button></form>;
}
