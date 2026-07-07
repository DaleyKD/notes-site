import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={
        'fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-brand-600 dark:text-neutral-400 dark:hover:text-brand-300 hover:border-brand-300 dark:hover:border-brand-700 shadow-md transition-all duration-200 ' +
        (visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none')
      }
    >
      <ArrowUp size={18} />
    </button>
  );
}
