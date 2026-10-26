import { listProducts } from './data';
export default async function sitemap() { const base = 'https://mek-lab-studio.sasabelle.chatgpt.site'; let products: Awaited<ReturnType<typeof listProducts>> = []; try {
    products = await listProducts();
}
catch { } return [...['', '/collection', '/about', '/pricing', '/subscriptions', '/faq', '/contact'].map(p => ({ url: base + p })), ...products.map(p => ({ url: `${base}/collection/${p.slug}` }))]; }
