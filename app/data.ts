import { env } from 'cloudflare:workers';
import { headers } from 'next/headers';
import { getChatGPTUser, type ChatGPTUser } from './chatgpt-auth';
import { sessionUser, type AccountUser } from './auth';
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
export function db() { if (!env.DB)
    throw new Error('Database is unavailable. Please try again later.'); return env.DB; }
export function config(key: string) { return (env as unknown as Record<string, string | undefined>)[key] || ''; }
// Admin access needs a verified email: an unverified password account can never claim an admin address.
export function isAdmin(user: (ChatGPTUser & { verified?: boolean }) | null) { return !!user && user.verified !== false && config('ADMIN_EMAILS').split(',').map(x => x.trim().toLowerCase()).filter(Boolean).includes(user.email.toLowerCase()); }
export async function upsertUser(user: ChatGPTUser) { await db().prepare('INSERT INTO users (id,email,name,created_at) VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET email=excluded.email').bind(user.userId, user.email, user.displayName, Date.now()).run(); }
export async function listProducts(all = false) { return (await db().prepare(`SELECT p.*, COALESCE(s.purchase_count,0) AS purchase_count FROM products p LEFT JOIN (SELECT i.product_id,COUNT(*) AS purchase_count FROM order_items i JOIN orders o ON o.id=i.order_id WHERE o.status='paid' GROUP BY i.product_id) s ON s.product_id=p.id ${all ? '' : 'WHERE p.published=1'} ORDER BY p.featured DESC,p.created_at DESC`).all<Product>()).results; }
export async function getSettings() { const rows = (await db().prepare('SELECT * FROM site_settings').all<{
    key: string;
    value: string;
}>()).results; return Object.fromEntries(rows.map(r => [r.key, r.value])); }
export const cad = (cents: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 2 }).format(cents / 100);
export async function ownedData(user: ChatGPTUser) {
    await upsertUser(user);
    const results = await db().batch([
        db().prepare('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC').bind(user.userId),
        db().prepare('SELECT * FROM customizations WHERE user_id=? ORDER BY created_at DESC').bind(user.userId),
        db().prepare('SELECT s.*,p.name FROM subscriptions s JOIN subscription_plans p ON p.id=s.plan_id WHERE s.user_id=?').bind(user.userId),
        db().prepare('SELECT a.id,a.name,p.name AS product_name FROM downloadable_assets a JOIN products p ON p.id=a.product_id WHERE EXISTS (SELECT 1 FROM order_items i JOIN orders o ON o.id=i.order_id WHERE i.product_id=a.product_id AND o.user_id=? AND o.status=\'paid\')').bind(user.userId),
        db().prepare('SELECT * FROM users WHERE id=?').bind(user.userId),
        db().prepare('SELECT m.* FROM project_messages m JOIN customizations c ON c.id=m.request_id WHERE c.user_id=? ORDER BY m.created_at').bind(user.userId),
        db().prepare('SELECT * FROM inquiries WHERE user_id=? ORDER BY created_at DESC').bind(user.userId),
        db().prepare('SELECT i.* FROM order_items i JOIN orders o ON o.id=i.order_id WHERE o.user_id=?').bind(user.userId)
    ]);
    return { orders: results[0].results, requests: results[1].results, subscriptions: results[2].results, downloads: results[3].results, profile: results[4].results[0], messages: results[5].results, inquiries: results[6].results, items: results[7].results };
}
// The host's ChatGPT identity comes first; otherwise an MK lab session (email + password or Google).
export async function currentUser(): Promise<AccountUser | null> {
    const chatgpt = await getChatGPTUser();
    if (chatgpt) return { ...chatgpt, provider: 'chatgpt', verified: true };
    return sessionUser((await headers()).get('cookie'));
}

export async function approvedProductMedia(productId: string) { return (await db().prepare('SELECT id,mime FROM product_images WHERE product_id=? AND public=1').bind(productId).all<{ id: string; mime: string }>()).results; }
