'use client';
import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 py-6"
      style={{ background: 'transparent' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4">
        <div
          className="cursor-pointer"
          onClick={() => router?.push('/')}
          style={{
            textShadow: '0 4px 8px rgba(26, 35, 50, 0.4), 0 8px 16px rgba(26, 35, 50, 0.25), 0 12px 24px rgba(107, 140, 174, 0.15)',
            transform: 'translateZ(0) perspective(1000px)',
            filter: 'drop-shadow(0 8px 16px rgba(26, 35, 50, 0.3)) drop-shadow(0 4px 8px rgba(107, 140, 174, 0.5))',
            letterSpacing: '0.02em',
            fontWeight: '600',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(20px) scale(1.05)';
            e.currentTarget.style.textShadow = '0 6px 12px rgba(26, 35, 50, 0.5), 0 12px 24px rgba(26, 35, 50, 0.35), 0 16px 32px rgba(107, 140, 174, 0.25)';
            e.currentTarget.style.filter = 'drop-shadow(0 12px 24px rgba(26, 35, 50, 0.4)) drop-shadow(0 6px 12px rgba(107, 140, 174, 0.6))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(0) perspective(1000px)';
            e.currentTarget.style.textShadow = '0 4px 8px rgba(26, 35, 50, 0.4), 0 8px 16px rgba(26, 35, 50, 0.25), 0 12px 24px rgba(107, 140, 174, 0.15)';
            e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(26, 35, 50, 0.3)) drop-shadow(0 4px 8px rgba(107, 140, 174, 0.5))';
          }}
        >
          <AppLogo
            size={36}
            text="Meditation"
            iconName="SparklesIcon"
          />
        </div>
      </div>
      {/* Single CTA */}
      <a
        href="#find-your-float"
        className="btn-blue text-sm font-medium tracking-wide px-7 py-3 rounded-full"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Book Session
      </a>
    </header>
  );
}