import { normalizePresentation, presentationKey } from '../../product-presentation';
import { sanitizeBrief, estimate, describeBrief, parsePricing, validEmail, type Model } from '../../personalize-model';
import { buildEntries } from '../../collection-model';
import { env } from 'cloudflare:workers';
import { db, config, isAdmin, upsertUser, currentUser, listProducts, getSettings, ownedData } from '../../data';
const json = (v: unknown, status = 200) => Response.json(v, { status, headers: { 'Cache-Control': 'no-store' } });
export async function GET() { const user = await currentUser(); if (!user)
    return json({ error: 'Sign in to view your account.' }, 401); try {
    return json(await ownedData(user));
}
catch {
    return json({ error: 'Your account could not be loaded. Try again.' }, 503);
} }
export async function POST(request: Request) {
    const user = await currentUser();
    if (!user)
        return json({ error: 'Sign in to save your request.' }, 401);
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin)
        return json({ error: 'Request origin rejected.' }, 403);
    try {
        await upsertUser(user);
        if (request.headers.get('content-type')?.includes('multipart/form-data')) {
            if (!isAdmin(user))
                return json({ error: 'Administrator access required.' }, 403);
            if (!env.BUCKET)
                return json({ error: 'File storage is unavailable.' }, 503);
            const f = await request.formData(), file = f.get('file'), productId = String(f.get('productId') || ''), kind = f.get('kind');
            if (!(file instanceof File) || file.size > 25 * 1024 * 1024)
                return json({ error: 'Choose a file smaller than 25 MB.' }, 400);
            const product = await db().prepare('SELECT id FROM products WHERE id=?').bind(productId).first();
            if (!product)
                return json({ error: 'Save a product before uploading files.' }, 400);
            const image = kind === 'image', video = kind === 'video';
            if (!['image', 'video', 'asset'].includes(String(kind))) return json({ error: 'Choose a valid file type.' }, 400);
            if (video && !['video/mp4', 'video/webm'].includes(file.type)) return json({ error: 'Use an MP4 or WebM video.' }, 400);
            if (image && !['image/jpeg', 'image/png', 'image/webp', 'image/avif'].includes(file.type))
                return json({ error: 'Use a JPG, PNG, WebP, or AVIF image.' }, 400);
            const id = crypto.randomUUID(), key = `${image || video ? 'previews' : 'private'}/${id}`;
            await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: image || video ? file.type : 'application/octet-stream' } });
            if (image || video) {
                await db().batch([db().prepare('INSERT INTO product_images (id,product_id,key,mime,public) VALUES (?,?,?,?,1)').bind(id, productId, key, file.type), ...(image && f.get('primary') !== '0' ? [db().prepare('UPDATE products SET image_id=? WHERE id=?').bind(id, productId)] : [])]);
            }
            else {
                await db().prepare('INSERT INTO downloadable_assets (id,product_id,key,name) VALUES (?,?,?,?)').bind(id, productId, key, file.name.slice(0, 160)).run();
            }
            return json({ ok: true, id });
        }
        const b = await request.json() as Record<string, any>;
        const clean = (v: unknown, max = 5000) => String(v || '').trim().slice(0, max);
        if (b.action === 'inquiry') {
            const name = clean(b.name, 100), email = clean(b.email, 200), body = clean(b.body), subject = clean(b.subject, 100);
            if (!name || !/^\S+@\S+\.\S+$/.test(email) || body.length < 10)
                return json({ error: 'Add your name, a valid email address, and a message of at least 10 characters.' }, 400);
            const recent = await db().prepare('SELECT count(*) AS n FROM inquiries WHERE user_id=? AND created_at>?').bind(user.userId, Date.now() - 3600000).first<{
                n: number;
            }>();
            if ((recent?.n || 0) >= 5)
                return json({ error: 'You have sent five inquiries this hour. Please try again later.' }, 429);
            await db().prepare('INSERT INTO inquiries (id,user_id,name,email,subject,body,created_at) VALUES (?,?,?,?,?,?,?)').bind(crypto.randomUUID(), user.userId, name, email, subject, body, Date.now()).run();
            return json({ ok: true, message: 'Your inquiry is saved. You can find it in your account. Email notifications are not yet configured.' });
        }
        if (b.action === 'customize') {
            // Structured brief from the Personalize page: every choice is re-validated and the estimate recomputed from the studio's own prices.
            if (b.brief) {
                const brief = sanitizeBrief(b.brief);
                if (!brief.contact.name || !validEmail(brief.contact.email))
                    return json({ error: 'Add your name and a valid email address.' }, 400);
                let model: Model | null = null;
                if (brief.model?.kind === 'product') {
                    const p = await db().prepare('SELECT id,slug,name,category,price FROM products WHERE slug=? AND published=1').bind(brief.model.slug).first<{ id: string; slug: string; name: string; category: string; price: number }>();
                    if (p) model = { kind: 'product', slug: p.slug, name: p.name, category: p.category, price: p.price, productId: p.id };
                }
                else if (brief.model?.kind === 'concept') {
                    const entry = buildEntries([]).find(item => item.kind === 'study' && item.slug === brief.model!.slug);
                    if (entry) model = { kind: 'concept', slug: entry.slug, name: entry.name, category: entry.category };
                }
                if (!model)
                    return json({ error: 'Choose the model you want to personalize.' }, 400);
                const settings = await getSettings();
                const result = estimate(brief, parsePricing(settings.personalizationPricing), Math.round(Number(settings.personalizationPrice || 0) * 100), model);
                await db().prepare('INSERT INTO customizations (id,user_id,product_id,name,details,options,status,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(), user.userId, model.productId || null, model.name, describeBrief(brief, result, model), JSON.stringify({ brief, estimate: result }), 'Pending', Date.now()).run();
                return json({ ok: true, message: 'Your customization request is saved. The studio will reply with your quote; follow it in your account.' });
            }
            const details = clean(b.details), name = clean(b.name, 100), productId = clean(b.productId, 100) || null;
            if (!name || details.length < 10)
                return json({ error: 'Choose a design and describe your changes in at least 10 characters.' }, 400);
            if (productId && !await db().prepare('SELECT id FROM products WHERE id=? AND published=1').bind(productId).first())
                return json({ error: 'This website is no longer available.' }, 400);
            await db().prepare('INSERT INTO customizations (id,user_id,product_id,name,details,options,status,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(), user.userId, productId, name, details, JSON.stringify(Array.isArray(b.options) ? b.options.slice(0, 10) : []), 'Pending', Date.now()).run();
            return json({ ok: true, message: 'Your request is saved. Follow its progress in your account.' });
        }
        if (b.action === 'profile') {
            const name = clean(b.name, 100);
            if (!name)
                return json({ error: 'Add your display name.' }, 400);
            await db().prepare('UPDATE users SET name=?,preferences=? WHERE id=?').bind(name, JSON.stringify({ updates: !!b.updates }), user.userId).run();
            return json({ ok: true, message: 'Account settings saved.' });
        }
        if (b.action === 'message') {
            const id = clean(b.requestId, 100), body = clean(b.body, 2000);
            if (!body)
                return json({ error: 'Write a message first.' }, 400);
            const item = await db().prepare('SELECT id FROM customizations WHERE id=? AND user_id=?').bind(id, user.userId).first();
            if (!item && !isAdmin(user))
                return json({ error: 'Request not found.' }, 404);
            await db().prepare('INSERT INTO project_messages (id,request_id,author_id,body,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(), id, user.userId, body, Date.now()).run();
            return json({ ok: true, message: 'Message saved.' });
        }
        if (!isAdmin(user))
            return json({ error: 'Administrator access required.' }, 403);
        if (b.action === 'product') {
            const id = clean(b.id, 100) || crypto.randomUUID(), slug = clean(b.slug, 100), name = clean(b.name, 100), price = Math.round(Number(b.price) * 100);
            if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !name || !Number.isSafeInteger(price) || price < 100 || price > 10000000)
                return json({ error: 'Add a name, a lowercase URL slug, and a price between $1 and $100,000 CAD.' }, 400);
            let presentation: ReturnType<typeof normalizePresentation> | undefined;
            if (b.presentation !== undefined) {
                try { const raw = typeof b.presentation === 'string' ? JSON.parse(b.presentation) : b.presentation; presentation = normalizePresentation(raw, clean(b.category, 100)); }
                catch { return json({ error: 'Editorial presentation is not valid JSON.' }, 400); }
                const media = (await db().prepare('SELECT id,mime FROM product_images WHERE product_id=? AND public=1').bind(id).all<{id:string;mime:string}>()).results;
                const selectedPresentation = presentation;
                if (selectedPresentation.previews.some(p => !media.some(m => m.id === p.id && m.mime.startsWith('image/'))) || selectedPresentation.videos.some(v => !media.some(m => m.id === v.id && /^video\/(mp4|webm)$/.test(m.mime)) || (v.posterId && !media.some(m => m.id === v.posterId && m.mime.startsWith('image/'))))) return json({ error: 'Use only approved public media uploaded for this website.' }, 400);
            }
            const productStatement = db().prepare('INSERT INTO products (id,slug,name,description,category,tags,price,license,featured,published,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET slug=excluded.slug,name=excluded.name,description=excluded.description,category=excluded.category,tags=excluded.tags,price=excluded.price,license=excluded.license,featured=excluded.featured,published=excluded.published').bind(id, slug, name, clean(b.description), clean(b.category, 100), JSON.stringify(clean(b.tags, 500).split(',').filter(Boolean)), price, clean(b.license, 100) || 'Single website', b.featured ? 1 : 0, b.published ? 1 : 0, Date.now());
            await db().batch([productStatement, ...(presentation ? [db().prepare('INSERT INTO site_settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(presentationKey(id), JSON.stringify(presentation))] : [])]);
            return json({ ok: true, id, message: 'Website saved.' });
        }
        if (b.action === 'setting') {
            const allowed = ['homeTitle', 'homeDescription', 'about', 'contactEmail', 'faq', 'terms', 'privacy', 'licenses', 'basicPrice', 'growthPrice', 'studioPrice', 'personalizationPrice', 'taxMode', 'taxRateIds', 'personalizationPricing'];
            if (!allowed.includes(b.key))
                return json({ error: 'Setting is not editable.' }, 400);
            if (['basicPrice', 'growthPrice', 'studioPrice', 'personalizationPrice'].includes(b.key) && (!Number.isFinite(Number(b.value)) || Number(b.value) < 0))
                return json({ error: 'Use a valid nonnegative price.' }, 400);
            await db().prepare('INSERT INTO site_settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value').bind(b.key, b.key === 'personalizationPricing' ? JSON.stringify(parsePricing(String(b.value || ''))) : clean(b.value, 20000)).run();
            return json({ ok: true, message: 'Setting saved.' });
        }
        if (b.action === 'status') {
            if (!['Pending', 'Quoted', 'In Progress', 'Review', 'Completed'].includes(b.status))
                return json({ error: 'Choose a valid project status.' }, 400);
            const quote = b.quote === '' || b.quote == null ? null : Math.round(Number(b.quote) * 100);
            if (quote !== null && (!Number.isSafeInteger(quote) || quote < 0))
                return json({ error: 'Use a valid quote.' }, 400);
            await db().prepare('UPDATE customizations SET status=?,quote=? WHERE id=?').bind(b.status, quote, clean(b.id, 100)).run();
            return json({ ok: true, message: 'Project updated.' });
        }
        if (b.action === 'export') {
            const records = await db().prepare('SELECT id,user_id,status,subtotal,total,currency,created_at FROM orders ORDER BY created_at DESC').all();
            return json({ ok: true, records: records.results });
        }
        return json({ error: 'Action not found.' }, 400);
    }
    catch (e) {
        console.error('MEK LAB request failed', e instanceof Error ? e.message : 'unknown');
        return json({ error: 'Your changes could not be saved. Check the fields and try again.' }, 500);
    }
}
