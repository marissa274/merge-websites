import type { Metadata } from 'next';
import './globals.css';
import './mek.css';
import './expressive.css';
import './cinematic.css';
import './collection-gallery.css';
import './collection-shelf.css';
import './collection-refinement.css';
import './website-detail.css';
import './personalize.css';
import './auth.css';
import { Header, Footer } from './ui';
export const metadata: Metadata = {
    metadataBase: new URL('https://mek-lab-studio.sasabelle.chatgpt.site'),
    title: { default: 'MK LAB — Websites with a point of view', template: '%s — MK LAB' },
    description: 'Designed to stand out. Built to be yours. Explore MK LAB, an independent creative studio and premium website marketplace.',
    openGraph: { title: 'MK LAB', description: 'Designed to stand out. Built to be yours.', images: ['/architecture.jpg'] },
    icons: { icon: '/favicon.svg' }
};
export default function RootLayout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" data-theme="dark" suppressHydrationWarning><head><meta name="theme-color" content="#09090b"/><script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('mk-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';const m=localStorage.getItem('mk-motion');document.documentElement.dataset.motion=m==='reduced'?'reduced':'full';document.querySelector('meta[name="theme-color"]')?.setAttribute('content',t==='light'?'#fff1f5':'#09090b')}catch{}` }}/><link rel="stylesheet" href="/tokens.css"/><link rel="preload" href="/fonts/font-3.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/><link rel="preload" href="/fonts/font-4.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body><a className="skip" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>; }
