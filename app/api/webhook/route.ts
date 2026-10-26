import { db, config } from '../../data';
export async function POST(req: Request) {
    const secret = config('STRIPE_WEBHOOK_SECRET');
    if (!secret)
        return new Response('Payment verification is not configured', { status: 503 });
    const raw = await req.text(), sig = req.headers.get('stripe-signature') || '', parts = sig.split(',').map(x => x.split('=')), ts = parts.find(x => x[0] === 't')?.[1], signatures = parts.filter(x => x[0] === 'v1').map(x => x[1]);
    if (!ts || Math.abs(Date.now() / 1000 - Number(ts)) > 300)
        return new Response('Invalid signature', { status: 400 });
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    let verified = false;
    for (const s of signatures) {
        if (!/^[a-f0-9]{64}$/.test(s))
            continue;
        const bytes = new Uint8Array(s.match(/.{2}/g)!.map(x => parseInt(x, 16)));
        if (await crypto.subtle.verify('HMAC', key, bytes, new TextEncoder().encode(`${ts}.${raw}`)))
            verified = true;
    }
    if (!verified)
        return new Response('Invalid signature', { status: 400 });
    let event: any;
    try {
        event = JSON.parse(raw);
    }
    catch {
        return new Response('Invalid payload', { status: 400 });
    }
    if (!['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type))
        return Response.json({ received: true });
    const s = event.data.object;
    if (s.mode !== 'payment' || s.payment_status !== 'paid')
        return Response.json({ received: true });
    const order = await db().prepare('SELECT * FROM orders WHERE id=? AND session_id=?').bind(s.metadata?.order_id || '', s.id).first<any>();
    if (!order || s.currency !== 'cad' || Number(s.amount_subtotal) !== order.subtotal || Number(s.amount_total) < order.subtotal)
        return new Response('Order verification failed', { status: 400 });
    let receipt: string | null = null;
    if (config('STRIPE_SECRET_KEY') && typeof s.payment_intent === 'string') {
        try {
            const r = await fetch(`https://api.stripe.com/v1/payment_intents/${encodeURIComponent(s.payment_intent)}?expand[]=latest_charge`, { headers: { Authorization: `Bearer ${config('STRIPE_SECRET_KEY')}` } });
            if (r.ok) {
                const intent = await r.json() as any;
                const value = intent.latest_charge?.receipt_url;
                if (typeof value === 'string' && new URL(value).hostname === 'pay.stripe.com')
                    receipt = value;
            }
        }
        catch { }
    }
    if (await db().prepare('SELECT id FROM payment_events WHERE id=?').bind(event.id).first())
        return Response.json({ received: true });
    try {
        await db().batch([db().prepare('INSERT OR IGNORE INTO payment_events (id,created_at) VALUES (?,?)').bind(event.id, Date.now()), db().prepare("UPDATE orders SET status='paid',total=?,receipt=? WHERE id=? AND status='pending'").bind(s.amount_total, receipt, order.id), db().prepare('INSERT OR IGNORE INTO payments (id,order_id,provider_id,amount,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(), order.id, s.payment_intent || s.id, s.amount_total, Date.now())]);
        return Response.json({ received: true });
    }
    catch {
        return new Response('Verification could not be stored', { status: 500 });
    }
}
