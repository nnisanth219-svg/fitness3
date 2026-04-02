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
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(255, 255, 255, 0.4)',
            transform: 'translateZ(0) perspective(1000px)',
            color: '#ffffff',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))',
            fontSize: '3.1em',
            fontWeight: '650',
            transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateZ(20px) scale(1.05)';
            e.currentTarget.style.textShadow = '0 1px 3px rgba(255, 255, 255, 0.7), 0 2px 6px rgba(255, 255, 255, 0.5)';
            e.currentTarget.style.filter = 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.5))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateZ(0) perspective(1000px)';
            e.currentTarget.style.textShadow = '0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.filter = 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4))';
          }}
        >
          <AppLogo
            size={36}
            text="MEDITATION"
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