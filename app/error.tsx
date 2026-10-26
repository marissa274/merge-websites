'use client';
export default function ErrorPage({ reset }: {
    reset: () => void;
}) { return <main id="main" className="shell error-page"><h1>This page couldn’t load.</h1><p>Please try again. Your saved purchases and requests have not been changed.</p><button className="btn" onClick={reset}>Try again</button></main>; }
