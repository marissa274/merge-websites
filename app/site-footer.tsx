import { ArrowUpRight, ArrowUp } from 'lucide-react';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
export function SiteFooter() {
    return <footer className="site-footer" aria-label="MK lab footer">
        <div className="site-footer-top">
            <div className="site-footer-invitation"><p>Designed to stand out. Built to be yours.</p><h2>Have an idea?<br/>Let’s give it a home.</h2><a className="site-footer-contact" href="/contact">Start a conversation<ArrowUpRight {...ip}/></a></div>
            <nav className="site-footer-nav" aria-label="Explore MK lab"><a href="/collection">Collection<ArrowUpRight {...ip}/></a><a href="/about">Studio<ArrowUpRight {...ip}/></a><a href="/pricing">Pricing<ArrowUpRight {...ip}/></a><a href="/contact">Contact<ArrowUpRight {...ip}/></a></nav>
        </div>
        <a className="site-footer-wordmark" href="/" aria-label="MK lab home" translate="no">MK lab<span aria-hidden="true">.</span></a>
        <div className="site-footer-bottom"><span>© {new Date().getFullYear()} MK lab</span><nav aria-label="Account and policies"><a href="/account">My account</a><a href="/#home-faq">FAQ</a><a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/licenses">Licenses</a></nav><a className="site-footer-up" href="#main">Back to top<ArrowUp {...ip}/></a></div>
    </footer>;
}
