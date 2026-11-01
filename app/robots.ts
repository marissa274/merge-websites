import { siteUrl } from './site-url';
export default function robots() { return { rules: { userAgent: '*', allow: '/', disallow: ['/account', '/admin', '/checkout', '/api', '/login', '/signup', '/forgot-password', '/concepts'] }, sitemap: new URL('/sitemap.xml', siteUrl()).href }; }
