import React from 'react';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  const year = new Date()?.getFullYear();

  return (
    <footer
      className="border-t"
      style={{
        borderColor: 'rgba(26,35,50,0.1)',
        backgroundColor: 'var(--cream)',
        padding: '80px 0 48px',
      }}
    >
      <div className="max-w-6xl mx-auto px-10 md:px-16">
        {/* Pattern 3 — Vercel Horizontal Flow */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + links */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <AppLogo size={28} text="Meditation" iconName="SparklesIcon" />
            <nav className="flex items-center gap-1 text-sm" style={{ color: 'var(--sage)' }}>
              <a href="#about" className="px-3 py-2 hover:text-navy transition-colors font-medium" style={{ color: 'inherit' }}>
                About
              </a>
              <span style={{ color: 'var(--stone)' }}>·</span>
              <a href="#science" className="px-3 py-2 hover:text-navy transition-colors font-medium" style={{ color: 'inherit' }}>
                Research
              </a>
              <span style={{ color: 'var(--stone)' }}>·</span>
              <a href="#find-your-float" className="px-3 py-2 hover:text-navy transition-colors font-medium" style={{ color: 'inherit' }}>
                Sessions
              </a>
              <span style={{ color: 'var(--stone)' }}>·</span>
              <a href="#find-your-float" className="px-3 py-2 hover:text-navy transition-colors font-medium" style={{ color: 'inherit' }}>
                Guide
              </a>
            </nav>
          </div>

          {/* Social + legal */}
          <div className="flex items-center gap-6">
            {/* Twitter/X */}
            <a
              href="#"
              aria-label="Meditation on X"
              className="transition-colors"
              style={{ color: 'var(--sage)' }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Meditation on Instagram"
              className="transition-colors"
              style={{ color: 'var(--sage)' }}
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
              </svg>
            </a>

            <span className="text-sm" style={{ color: 'var(--stone)' }}>
              © {year} Meditation Studio
            </span>
            <span style={{ color: 'var(--stone)' }}>·</span>
            <a href="#" className="text-sm transition-colors font-medium" style={{ color: 'var(--sage)' }}>
              Privacy
            </a>
            <span style={{ color: 'var(--stone)' }}>·</span>
            <a href="#" className="text-sm transition-colors font-medium" style={{ color: 'var(--sage)' }}>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}