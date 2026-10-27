import { db } from '../../data';
import { validateContact } from '../../contact-model';

const MAX_BYTES = 16_384;
const json = (value: unknown, status: number, headers: Record<string, string> = {}) => Response.json(value, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', ...headers } });

async function boundedBody(request: Request) {
    if (Number(request.headers.get('content-length')) > MAX_BYTES) return null;
    const reader = request.body?.getReader();
    if (!reader) return '';
    const decoder = new TextDecoder();
    let result = '', bytes = 0;
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > MAX_BYTES) { await reader.cancel(); return null; }
        result += decoder.decode(value, { stream: true });
    }
    return result + decoder.decode();
}

export async function POST(request: Request) {
    if (request.headers.get('origin') !== new URL(request.url).origin || request.headers.get('sec-fetch-site') === 'cross-site') return json({ error: 'Open the contact page on this site before sending your message.' }, 403);
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json({ error: 'Send your message using the contact form.' }, 415);
    let input: Record<string, unknown>;
    try {
        const body = await boundedBody(request);
        if (body === null) return json({ error: 'Your message is too long. Use no more than 5,000 characters.' }, 413);
        const parsed: unknown = JSON.parse(body);
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return json({ error: 'Check your message and try again.' }, 400);
        input = parsed as Record<string, unknown>;
    } catch { return json({ error: 'Your message could not be read. Please try again.' }, 400); }
    const { values, errors } = validateContact(input);
    if (Object.keys(errors).length) return json({ error: 'Check the highlighted fields.', errors }, 400);
    try {
        const network = request.headers.get('cf-connecting-ip') || 'unavailable';
        const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`mk-contact:${network}`));
        const sender = `contact:${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')}`;
        const now = Date.now();
        // One conditional statement makes the hourly check and insert atomic in D1.
        // Anonymous contact messages remain in the existing administrator inbox.
        const result = await db().prepare(`INSERT INTO inquiries (id,user_id,name,email,subject,body,created_at)
            SELECT ?,?,?,?,?,?,? WHERE (SELECT count(*) FROM inquiries WHERE created_at>? AND (user_id=? OR lower(email)=?))<5`)
            .bind(crypto.randomUUID(), sender, values.name, values.email, values.subject, values.message, now, now - 3_600_000, sender, values.email).run();
        if (!result.success) throw new Error('Message was not saved');
        if (result.meta.changes === 0) return json({ error: 'You have reached the message limit. Please try again in an hour.' }, 429, { 'Retry-After': '3600' });
        return json({ ok: true, message: 'Your message has been saved in the MK LAB studio inbox. Thank you for reaching out.' }, 201);
    } catch { return json({ error: 'The studio inbox is temporarily unavailable. Your message has not been sent. Please try again.' }, 503); }
}
