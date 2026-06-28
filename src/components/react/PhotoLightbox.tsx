import { useState, useEffect, useCallback } from 'react';

interface Props {
  src: string;
  alt: string;
  imgClass?: string;
  wrapperClass?: string;
}

export default function PhotoLightbox({ src, alt, imgClass = '', wrapperClass = '' }: Props) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`relative group cursor-zoom-in ${wrapperClass}`}
        aria-label={`View ${alt} larger`}
      >
        <img src={src} alt={alt} className={imgClass} />
        <span
          className="absolute inset-0 rounded-full bg-black/0 group-hover:bg-black/15 transition-colors"
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={src}
              alt={alt}
              className="max-w-[min(480px,90vw)] max-h-[85vh] rounded-2xl shadow-2xl object-cover"
            />
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-3 -right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white text-neutral-800 shadow-lg hover:bg-neutral-100 transition-colors text-sm font-bold leading-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
