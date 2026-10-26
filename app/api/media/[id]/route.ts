import { env } from 'cloudflare:workers';
import { db } from '../../../data';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await db().prepare('SELECT key,mime FROM product_images WHERE id=? AND public=1').bind(id).first<{ key: string; mime: string }>();
    if (!image || !env.BUCKET) return new Response('Media not found', { status: 404 });
    const headers = { 'Content-Type': image.mime, 'Cache-Control': 'public,max-age=86400', 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' };
    const range = request.headers.get('range');
    if (range) {
        const meta = await env.BUCKET.head(image.key);
        if (!meta) return new Response('Media not found', { status: 404 });
        const match = /^bytes=(\d*)-(\d*)$/.exec(range);
        if (!match || (!match[1] && !match[2]) || !meta.size) return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${meta.size}` } });
        const offset = match[1] ? Number(match[1]) : Math.max(0, meta.size - Number(match[2]));
        const end = match[1] && match[2] ? Math.min(Number(match[2]), meta.size - 1) : meta.size - 1;
        if (!Number.isSafeInteger(offset) || !Number.isSafeInteger(end) || offset < 0 || offset >= meta.size || end < offset) return new Response(null, { status: 416, headers: { ...headers, 'Content-Range': `bytes */${meta.size}` } });
        const file = await env.BUCKET.get(image.key, { range: { offset, length: end - offset + 1 } });
        if (!file) return new Response('Media not found', { status: 404 });
        return new Response(file.body, { status: 206, headers: { ...headers, 'Content-Range': `bytes ${offset}-${end}/${meta.size}`, 'Content-Length': String(end - offset + 1) } });
    }
    const file = await env.BUCKET.get(image.key);
    if (!file) return new Response('Media not found', { status: 404 });
    return new Response(file.body, { headers: { ...headers, 'Content-Length': String(file.size) } });
}
