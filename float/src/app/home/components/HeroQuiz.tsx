'use client';
import React, { useState, useEffect } from 'react';

const QUIZ_ANSWERS = [
  { id: 'stress', label: 'Mental overload', icon: '◎', persona: 'theta' },
  { id: 'pain', label: 'Physical tension', icon: '◈', persona: 'healer' },
  { id: 'creative', label: 'Creative stagnation', icon: '◇', persona: 'creator' },
  { id: 'curious', label: 'Just exploring', icon: '○', persona: 'explorer' },
];

interface HeroQuizProps {
  onAnswerSelect?: (answerId: string) => void;
}

export default function HeroQuiz({ onAnswerSelect }: HeroQuizProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [headingVisible, setHeadingVisible] = useState(false);
  const [tilesVisible, setTilesVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeadingVisible(true), 600);
    const t2 = setTimeout(() => setTilesVisible(true), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSelect = (id: string) => {
    setSelected(id);
    // Dispatch custom event so PersonalizedSections can react
    window.dispatchEvent(new CustomEvent('quiz-answer', { detail: { answerId: id } }));
    if (onAnswerSelect) onAnswerSelect(id);
    // Smooth scroll to next section
    setTimeout(() => {
      const next = document.getElementById('personalized');
      if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 500);
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--navy)' }}
    >
      {/* Animated caustic light blobs */}
      <div className="caustic-blob caustic-blob-1" />
      <div className="caustic-blob caustic-blob-2" />
      <div className="caustic-blob caustic-blob-3" />

      {/* Salt crystal texture overlay */}
      <div
        className="absolute inset-0 salt-texture opacity-20"
        style={{ backgroundSize: '400px 400px' }}
      />

      {/* Underwater light refractions — SVG caustics */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.06 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="caustic-filter">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.012 0.008"
              numOctaves="3"
              seed="2"
              result="noise"
            />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" />
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="none" filter="url(#caustic-filter)" />
        {/* Caustic light lines */}
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse
            key={i}
            cx={`${10 + i * 8}%`}
            cy={`${20 + (i % 4) * 20}%`}
            rx={`${2 + (i % 3)}%`}
            ry="1%"
            fill="rgba(91,154,139,0.6)"
            style={{
              animation: `caustic-drift ${7 + i * 0.8}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 md:px-12">

        {/* Eyebrow */}
        <div
          className="mb-10 inline-block"
          style={{
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <span
            className="text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: 'var(--dusty-blue)' }}
          >
            Sensory Wellness · Pacific Heights
          </span>
        </div>

        {/* Main question */}
        <h1
          className="font-serif mb-6"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 5.8rem)',
            lineHeight: '1.05',
            letterSpacing: '-0.02em',
            color: 'var(--cream)',
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s',
          }}
        >
          What are you seeking
          <br />
          <em style={{ color: 'var(--soft-blue)', fontStyle: 'italic' }}>to release?</em>
        </h1>

        <p
          className="mb-14 text-base font-light"
          style={{
            color: 'var(--stone)',
            opacity: headingVisible ? 1 : 0,
            transform: headingVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
            letterSpacing: '0.01em',
          }}
        >
          Your intention shapes your experience.
        </p>

        {/* Quiz tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {QUIZ_ANSWERS.map((answer, i) => (
            <button
              key={answer.id}
              onClick={() => handleSelect(answer.id)}
              className={`quiz-tile rounded-2xl px-4 py-5 text-left border cursor-pointer ${
                selected === answer.id ? 'selected' : ''
              }`}
              style={{
                borderColor: selected === answer.id
                  ? 'var(--dusty-blue)'
                  : 'rgba(250, 248, 243, 0.12)',
                background: selected === answer.id
                  ? 'rgba(107, 140, 174, 0.1)'
                  : 'rgba(250, 248, 243, 0.04)',
                opacity: tilesVisible ? 1 : 0,
                transform: tilesVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + i * 0.1}s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.1 + i * 0.1}s, border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease`,
              }}
            >
              <span
                className="block text-xl mb-3"
                style={{ color: 'var(--soft-blue)' }}
              >
                {answer.icon}
              </span>
              <span
                className="block text-sm font-medium leading-snug"
                style={{ color: 'var(--cream)' }}
              >
                {answer.label}
              </span>
            </button>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          className="mt-20 flex flex-col items-center gap-3"
          style={{
            opacity: tilesVisible ? 0.4 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--stone)' }}>
            or scroll to explore
          </span>
          <div className="float-bob" style={{ color: 'var(--dusty-blue)' }}>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <path d="M8 0v20M1 14l7 8 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}