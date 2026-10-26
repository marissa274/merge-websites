import { env } from 'cloudflare:workers';
import { db, currentUser } from '../../data';
const fail = (message: string, status: number) => Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
export async function GET(req: Request) {
    const user = await currentUser();
    if (!user)
        return fail('Sign in to download your purchases.', 401);
    const url = new URL(req.url), assetId = url.searchParams.get('asset'), token = url.searchParams.get('token');
    if (assetId) {
        const a = await db().prepare("SELECT a.id FROM downloadable_assets a WHERE a.id=? AND EXISTS (SELECT 1 FROM order_items i JOIN orders o ON o.id=i.order_id WHERE i.product_id=a.product_id AND o.user_id=? AND o.status='paid')").bind(assetId, user.userId).first();
        if (!a)
            return fail('This download is not available for your account.', 404);
        const id = crypto.randomUUID();
        await db().prepare('INSERT INTO download_tokens (id,user_id,asset_id,expires_at) VALUES (?,?,?,?)').bind(id, user.userId, assetId, Date.now() + 60000).run();
        return Response.redirect(new URL(`/api/download?token=${id}`, url.origin), 302);
    }
    if (!token || !env.BUCKET)
        return fail('Download link not found.', 404);
    const a = await db().prepare("SELECT a.key,a.name,d.id FROM download_tokens d JOIN downloadable_assets a ON a.id=d.asset_id WHERE d.id=? AND d.user_id=? AND d.expires_at>? AND d.used_at IS NULL AND EXISTS (SELECT 1 FROM order_items i JOIN orders o ON o.id=i.order_id WHERE i.product_id=a.product_id AND o.user_id=? AND o.status='paid')").bind(token, user.userId, Date.now(), user.userId).first<{
        key: string;
        name: string;
        id: string;
    }>();
    if (!a)
        return fail('This link has expired. Return to Downloads for a new link.', 410);
    const file = await env.BUCKET.get(a.key);
    if (!file)
        return fail('The file is not available. Contact the studio.', 404);
    const result = await db().prepare('UPDATE download_tokens SET used_at=? WHERE id=? AND used_at IS NULL').bind(Date.now(), a.id).run();
    if (!result.meta.changes)
        return fail('This link was already used. Return to Downloads.', 410);
    return new Response(file.body, { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename="${a.name.replace(/[^a-zA-Z0-9._ -]/g, '_')}"`, 'Cache-Control': 'private,no-store', 'X-Content-Type-Options': 'nosniff' } });
}
