import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavChild {
  label: string;
  href: string;
  note?: string;
}

interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

interface MobileNavProps {
  nav: NavItem[];
  pathname: string;
}

export default function MobileNav({ nav, pathname }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="sm:hidden relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className="p-2 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <nav className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-lg py-1 z-50">
          {nav.map(({ label, href, children }) => (
            <div key={href}>
              <a
                href={href}
                onClick={() => setOpen(false)}
                className={
                  'block px-4 py-2 text-sm transition-colors ' +
                  (pathname === href || pathname.startsWith(href + '/')
                    ? 'text-neutral-900 dark:text-neutral-100 font-medium bg-neutral-50 dark:bg-neutral-800'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800')
                }
              >
                {label}
              </a>
              {children && (
                <div className="ml-3 border-l border-neutral-200 dark:border-neutral-800 pl-2">
                  {children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className={
                        'block px-4 py-1.5 text-sm transition-colors ' +
                        (pathname === child.href
                          ? 'text-neutral-900 dark:text-neutral-100 font-medium'
                          : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100')
                      }
                    >
                      {child.label}
                      {child.note && (
                        <span className="text-xs italic text-neutral-400 dark:text-neutral-600"> {child.note}</span>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </div>
  );
}
