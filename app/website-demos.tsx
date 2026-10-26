'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Play, X, ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { DemoVideo } from './product-presentation';
const ip = { 'aria-hidden': true as const, strokeWidth: 1.5 };
const mediaURL = (id: string) => `/api/media/${encodeURIComponent(id)}`;
type DemoContext = { videos: DemoVideo[]; select: (index: number | null) => void };
const Context = createContext<DemoContext | null>(null);
function Thumbnail({ video }: { video: DemoVideo }) {
    return <><span className="demo-thumbnail">{video.posterId && <img src={mediaURL(video.posterId)} alt="" width={800} height={500} loading="lazy"/>}<span className="demo-play"><Play {...ip}/></span></span><span className="demo-title">{video.title}<ArrowUpRight {...ip}/></span></>;
}
export function DemoTrigger() {
    const context = useContext(Context)!;
    return context.videos.length ? <Dialog.Trigger className="detail-demo-action" onClick={() => context.select(null)}><Play {...ip}/>Watch Website Demo<ArrowUpRight {...ip}/></Dialog.Trigger> : <button className="detail-demo-action" disabled aria-label="Watch Website Demo — not available yet" title="No demo video has been published"><Play {...ip}/>Watch Website Demo</button>;
}
export function DemoGrid() {
    const context = useContext(Context)!;
    if (!context.videos.length) return null;
    return <section className="detail-demo-section detail-shell" id="website-demos" data-detail-act><h2 data-act-heading>See it in motion.</h2><div className="demo-grid" data-act-content>{context.videos.map((video,i) => <Dialog.Trigger className="demo-card" key={`${video.id}-${i}`} onClick={() => context.select(i)}><Thumbnail video={video}/></Dialog.Trigger>)}</div></section>;
}
export function WebsiteDemos({ videos, name, children }: { videos: DemoVideo[]; name: string; children: ReactNode }) {
    const [open, setOpen] = useState(false), [selected, setSelected] = useState<number | null>(null), [error, setError] = useState('');
    const player = useRef<HTMLVideoElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);
    useEffect(() => { if (open && selected !== null) player.current?.focus(); }, [open, selected]);
    const video = selected === null ? undefined : videos[selected];
    return <Context.Provider value={{ videos, select: index => { setSelected(index); setError(''); } }}><Dialog.Root open={open} onOpenChange={value => { if (!value) { player.current?.pause(); setSelected(null); setError(''); } setOpen(value); }}>
        {children}
        <Dialog.Portal><Dialog.Backdrop className="detail-review-backdrop"/><Dialog.Popup className="detail-review demo-modal"><div className="detail-review-heading"><Dialog.Title>{video ? video.title : `${name} / Website demos`}</Dialog.Title><Dialog.Close ref={closeButton} className="nav-icon" aria-label="Close website demo"><X {...ip}/></Dialog.Close></div><Dialog.Description className="visually-hidden">Selected demonstrations of {name}. Choose a video, then use the playback controls.</Dialog.Description>
            <div className="detail-review-scroll">{video ? <><button className="demo-back" onClick={() => { player.current?.pause(); setSelected(null); setError(''); closeButton.current?.focus(); }}><ArrowLeft {...ip}/>All demos</button><video ref={player} key={video.id} controls playsInline preload="metadata" tabIndex={0} onError={() => setError('This demo could not load. Try another video.')} poster={video.posterId ? mediaURL(video.posterId) : undefined} aria-label={video.title}><source src={mediaURL(video.id)}/></video>{error && <p className="demo-error" role="alert">{error}</p>}{video.transcript && <details className="demo-transcript"><summary>Transcript & description</summary><p>{video.transcript}</p></details>}</> : <div className="demo-grid">{videos.map((item,i) => <button className="demo-card" key={`${item.id}-${i}`} onClick={() => { setSelected(i); setError(''); }}><Thumbnail video={item}/></button>)}</div>}</div>
        </Dialog.Popup></Dialog.Portal>
    </Dialog.Root></Context.Provider>;
}
