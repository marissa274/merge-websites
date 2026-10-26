import { parsePresentation, presentationKey, purchaseGaps } from '../../product-presentation';
import { db, config, currentUser, upsertUser, getSettings } from '../../data';
export async function POST(req: Request) {
    const user = await currentUser();
    if (!user)
        return Response.json({ error: 'Sign in before checkout.' }, { status: 401 });
    const origin = new URL(req.url).origin;
    if (req.headers.get('origin') && req.headers.get('origin') !== origin)
        return Response.json({ error: 'Request origin rejected.' }, { status: 403 });
    const key = config('STRIPE_SECRET_KEY');
    if (!key || !config('STRIPE_WEBHOOK_SECRET'))
        return Response.json({ error: 'Checkout is not open yet. Payment configuration is required. No payment has been taken.' }, { status: 503 });
    try {
        const settings = await getSettings();
        if (!settings.terms || !settings.privacy || !settings.licenses)
            return Response.json({ error: 'Checkout will open when the studio publishes its legal and licensing terms.' }, { status: 503 });
        if (!['stripe_automatic', 'manual', 'no_tax'].includes(settings.taxMode || ''))
            return Response.json({ error: 'Tax configuration must be confirmed before checkout opens.' }, { status: 503 });
        const taxRates = (settings.taxRateIds || '').split(',').map(x => x.trim()).filter(x => /^txr_[A-Za-z0-9]+$/.test(x));
        if (settings.taxMode === 'manual' && !taxRates.length)
            return Response.json({ error: 'The studio must configure its applicable tax rates before checkout.' }, { status: 503 });
        const body = await req.json() as {
            items?: unknown[];
        };
        if (!Array.isArray(body.items) || !body.items.length || body.items.length > 20)
            return Response.json({ error: 'Add a website to your bag.' }, { status: 400 });
        const ids = [...new Set(body.items.map((x: unknown) => String(x)))];
        const products = [];
        for (const id of ids) {
            const p = await db().prepare('SELECT * FROM products WHERE id=? AND published=1').bind(id).first<any>();
            if (!p)
                return Response.json({ error: 'A website in your bag is no longer available. Refresh your bag.' }, { status: 400 });
            if (purchaseGaps(parsePresentation(settings[presentationKey(p.id)], p.category)).length) return Response.json({ error: `${p.name} is awaiting complete purchase conditions. Please contact the studio.` }, { status: 409 });
            const asset = await db().prepare('SELECT id FROM downloadable_assets WHERE product_id=? LIMIT 1').bind(id).first();
            if (!asset)
                return Response.json({ error: `${p.name} is awaiting delivery files. Please contact the studio.` }, { status: 409 });
            products.push(p);
        }
        await upsertUser(user);
        const id = crypto.randomUUID(), subtotal = products.reduce((n, p) => n + p.price, 0);
        await db().batch([db().prepare('INSERT INTO orders (id,user_id,status,subtotal,currency,created_at) VALUES (?,?,?,?,?,?)').bind(id, user.userId, 'pending', subtotal, 'cad', Date.now()), ...products.map(p => db().prepare('INSERT INTO order_items (id,order_id,product_id,name,license,price) VALUES (?,?,?,?,?,?)').bind(crypto.randomUUID(), id, p.id, p.name, p.license, p.price))]);
        const form = new URLSearchParams({ mode: 'payment', success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`, cancel_url: `${origin}/checkout/cancel`, client_reference_id: id, 'metadata[order_id]': id, 'customer_email': user.email, 'billing_address_collection': 'required' });
        products.forEach((p, i) => { form.set(`line_items[${i}][price_data][currency]`, 'cad'); form.set(`line_items[${i}][price_data][unit_amount]`, String(p.price)); form.set(`line_items[${i}][price_data][product_data][name]`, p.name); form.set(`line_items[${i}][quantity]`, '1'); if (settings.taxMode === 'manual')
            taxRates.forEach((rate, j) => form.set(`line_items[${i}][tax_rates][${j}]`, rate)); });
        if (settings.taxMode === 'stripe_automatic')
            form.set('automatic_tax[enabled]', 'true');
        const res = await fetch('https://api.stripe.com/v1/checkout/sessions', { method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/x-www-form-urlencoded', 'Idempotency-Key': id }, body: form });
        const session = await res.json() as any;
        if (!res.ok || !session.url)
            throw new Error('Stripe session creation failed');
        await db().prepare('UPDATE orders SET session_id=? WHERE id=?').bind(session.id, id).run();
        return Response.json({ url: session.url });
    }
    catch {
        return Response.json({ error: 'Checkout could not start. No payment has been taken. Please try again.' }, { status: 502 });
    }
}
