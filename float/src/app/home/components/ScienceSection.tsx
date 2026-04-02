'use client';
import React, { useRef, useEffect, useState } from 'react';

const RESEARCH_POINTS = [
  {
    stat: '−28%',
    label: 'stress hormone reduction',
    detail: 'Measured via salivary cortisol analysis in 2024 clinical study (n=168)',
  },
  {
    stat: '+45%',
    label: 'magnesium uptake',
    detail: 'Transdermal absorption through therapeutic salt solution',
  },
  {
    stat: '4–8 Hz',
    label: 'theta brainwave state',
    detail: 'EEG-confirmed in 96% of participants by minute 18 of session',
  },
  {
    stat: '2.3×',
    label: 'enhanced recovery',
    detail: 'Compared to passive rest; validated in athletic performance studies',
  },
];

export default function ScienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section
      id="science"
      ref={sectionRef}
      className="section-charcoal relative overflow-hidden noise-overlay"
      style={{ padding: '140px 0' }}
    >
      {/* Background caustics */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(107,140,174,0.06) 0%, transparent 100%)',
        }}
      />
      <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">
        {/* Header */}
        <div
          className="mb-20"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: 'var(--dusty-blue)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--dusty-blue)' }}>
              Clinical Evidence
            </span>
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
              maxWidth: '750px',
            }}
          >
            This isn't relaxation.
            <br />
            <em style={{ color: 'var(--soft-blue)', fontStyle: 'italic' }}>
              It's biological optimization.
            </em>
          </h2>
        </div>

        {/* Research stats grid — asymmetric bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {RESEARCH_POINTS?.map((point, i) => (
            <div
              key={i}
              className="rounded-2xl p-6"
              style={{
                background: i === 2 ? 'rgba(107,140,174,0.12)' : 'rgba(250,248,243,0.04)',
                border: i === 2 ? '1px solid rgba(107,140,174,0.3)' : '1px solid rgba(250,248,243,0.08)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.2 + i * 0.1}s`,
              }}
            >
              <div
                className="font-serif text-4xl font-light mb-2"
                style={{ color: i === 2 ? 'var(--dusty-blue)' : 'var(--cream)' }}
              >
                {point?.stat}
              </div>
              <div
                className="text-sm font-medium mb-3"
                style={{ color: 'var(--stone)' }}
              >
                {point?.label}
              </div>
              <div
                className="text-xs leading-relaxed"
                style={{ color: 'rgba(250,248,243,0.35)' }}
              >
                {point?.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Waveform visualization — full width */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(250,248,243,0.03)',
            border: '1px solid rgba(250,248,243,0.08)',
            padding: '48px',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.9s ease 0.6s',
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--sage)' }}>
              Theta wave simulation
            </span>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: 'var(--dusty-blue)',
                  animation: 'theta-pulse 1.5s ease-in-out infinite',
                }}
              />
              <span className="text-xs" style={{ color: 'var(--dusty-blue)' }}>
                Theta state active
              </span>
            </div>
          </div>

          {/* Animated waveform bars */}
          <div className="flex items-center gap-0.5 h-16">
            {Array.from({ length: 80 })?.map((_, i) => {
              const baseH = 20 + Math.sin((i / 80) * Math.PI * 6) * 30 + Math.sin((i / 80) * Math.PI * 2) * 20;
              const h = Math.max(8, baseH);
              const isThetaRange = i > 25 && i < 55;
              return (
                <div
                  key={i}
                  className="flex-1 rounded-sm waveform-bar"
                  style={{
                    height: visible ? `${h}%` : '0%',
                    background: isThetaRange ? 'var(--dusty-blue)' : 'rgba(250,248,243,0.15)',
                    animationDelay: `${i * 0.03}s`,
                    animationDuration: `${1.2 + (i % 5) * 0.3}s`,
                    transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.015}s`,
                  }}
                />
              );
            })}
          </div>

          <div className="mt-4 flex justify-between text-xs" style={{ color: 'rgba(250,248,243,0.25)' }}>
            <span>0:00</span>
            <span style={{ color: 'var(--dusty-blue)' }}>Theta window (min 15–20)</span>
            <span>60:00</span>
          </div>
        </div>

        {/* Research note */}
        <p
          className="mt-8 text-xs text-center"
          style={{
            color: 'rgba(250,248,243,0.25)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.9s',
          }}
        >
          Research references available · Clinical-grade facility standards maintained
        </p>
      </div>
    </section>
  );
}