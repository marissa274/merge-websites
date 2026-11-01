import { env } from 'cloudflare:workers';

/** Absolute public origin for metadata; local until the owner configures their domain. */
export function siteUrl(): URL {
    const value = (env as unknown as Record<string, string | undefined>).SITE_URL || 'http://localhost:5173';
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
        throw new Error('SITE_URL must be an HTTP(S) origin without credentials.');
    }
    return new URL(url.origin);
}
