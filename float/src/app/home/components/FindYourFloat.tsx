'use client';
import React, { useState, useRef, useEffect } from 'react';

const PERSONA_RESULTS: Record<string, {
  archetype: string;
  description: string;
  recommendation: string;
  duration: string;
}> = {
  stress: {
    archetype: 'Mindful Explorer',
    description: 'Your nervous system operates in high-alert mode. Meditation introduces it to another state — one where challenges dissolve before you engage with them.',
    recommendation: '60-minute introductory session, evening appointment',
    duration: '60 min',
  },
  pain: {
    archetype: 'Physical Harmonizer',
    description: 'You\'ve been working with discomfort through effort. Meditation eliminates effort entirely — and often, discomfort follows.',
    recommendation: '90-minute extended session, daytime scheduling',
    duration: '90 min',
  },
  creative: {
    archetype: 'Creative Catalyst',
    description: 'You excel at analytical thinking. Meditation teaches you the art of non-thinking — that\'s where breakthroughs you can\'t force actually emerge.',
    recommendation: '60-minute session, morning before creative work',
    duration: '60 min',
  },
  curious: {
    archetype: 'Open Discovery',
    description: 'Having no specific goal creates the ideal meditation state. The pod addresses what you need, not what you think you need.',
    recommendation: '60-minute introductory session, flexible timing',
    duration: '60 min',
  },
};

export default function FindYourFloat() {
  const [activePersona, setActivePersona] = useState('stress');
  const [formStep, setFormStep] = useState<'result' | 'form' | 'download' | 'submitted'>('result');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [hasFloated, setHasFloated] = useState(false);
  const [downloadEmail, setDownloadEmail] = useState('');
  const [downloadSubmitted, setDownloadSubmitted] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      setActivePersona(custom.detail.answerId);
    };
    window.addEventListener('quiz-answer', handler);
    return () => window.removeEventListener('quiz-answer', handler);
  }, []);

  const result = PERSONA_RESULTS[activePersona] || PERSONA_RESULTS['stress'];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep('submitted');
  };

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloadSubmitted(true);
  };

  return (
    <section
      id="find-your-float"
      ref={sectionRef}
      className="section-charcoal relative overflow-hidden noise-overlay"
      style={{ padding: '120px 0' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 50% 60% at 30% 50%, rgba(107,140,174,0.07) 0%, transparent 100%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-8 md:px-16 relative z-10">

        {/* Header */}
        <div
          className="mb-16"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: 'var(--dusty-blue)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--dusty-blue)' }}>
              Your Personalized Session
            </span>
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: 'var(--cream)',
            }}
          >
            Book Your Session
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left: Personalized result card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
            }}
          >
            {/* Result card */}
            <div
              className="rounded-3xl p-8 mb-6"
              style={{
                background: 'rgba(250,248,243,0.04)',
                border: '1px solid rgba(107,140,174,0.25)',
              }}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--sage)' }}>
                    You are a
                  </div>
                  <h3
                    className="font-serif text-3xl"
                    style={{ color: 'var(--soft-blue)', fontStyle: 'italic' }}
                  >
                    {result.archetype}
                  </h3>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: 'rgba(107,140,174,0.15)',
                    color: 'var(--dusty-blue)',
                    border: '1px solid rgba(107,140,174,0.3)',
                  }}
                >
                  {result.duration} session
                </div>
              </div>

              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: 'var(--stone)', fontWeight: 300 }}
              >
                {result.description}
              </p>

              <div
                className="pt-6"
                style={{ borderBottom: '1px solid rgba(250,248,243,0.1)' }}
              >
                <div className="text-xs mb-2" style={{ color: 'var(--sage)' }}>
                  Recommended session
                </div>
                <div className="text-sm font-medium" style={{ color: 'var(--warm-white)' }}>
                  {result.recommendation}
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="flex gap-2 items-center">
              {['result', 'form', 'submitted'].map((step, i) => (
                <div
                  key={step}
                  className="h-0.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    background: formStep === step || (formStep === 'submitted' && i <= 2)
                      ? 'var(--dusty-blue)' :'rgba(250,248,243,0.15)',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Form / CTA */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.3s',
            }}
          >
            {formStep === 'submitted' ? (
              /* Success state */
              <div
                className="rounded-3xl p-8 text-center"
                style={{
                  background: 'rgba(107,140,174,0.08)',
                  border: '1px solid rgba(107,140,174,0.25)',
                }}
              >
                <div className="text-4xl mb-4">○</div>
                <h3
                  className="font-serif text-2xl mb-3"
                  style={{ color: 'var(--cream)' }}
                >
                  We'll be in touch, {firstName}.
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--sage)' }}
                >
                  Check your inbox for your booking details and pre-float preparation guide.
                </p>
                <div
                  className="mt-6 pt-6 text-xs"
                  style={{
                    borderTop: '1px solid rgba(250,248,243,0.08)',
                    color: 'var(--sage)',
                  }}
                >
                  Sensory Wellness Studio · 147 Stillwater Lane, San Francisco
                </div>
              </div>
            ) : formStep === 'form' ? (
              /* Booking form */
              <div
                className="rounded-3xl p-8"
                style={{
                  background: 'rgba(250,248,243,0.03)',
                  border: '1px solid rgba(250,248,243,0.08)',
                }}
              >
                <h3
                  className="font-serif text-2xl mb-2"
                  style={{ color: 'var(--stone)' }}
                >
                  Reserve your session
                </h3>
                <p className="text-sm mb-8" style={{ color: 'var(--moss)' }}>
                  Three questions. That's all.
                </p>

                <form onSubmit={handleBookSubmit} className="space-y-8">
                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--moss)' }}>
                      First name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="What do people call you?"
                      className="float-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs tracking-[0.15em] uppercase mb-3" style={{ color: 'var(--moss)' }}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Where should we send your confirmation?"
                      className="float-input"
                      required
                    />
                  </div>

                  {/* Toggle: Have you floated before? */}
                  <div className="flex items-center justify-between py-4" style={{ borderBottom: '1px solid rgba(245,240,235,0.1)' }}>
                    <span className="text-sm" style={{ color: 'var(--mist)' }}>
                      Have you floated before?
                    </span>
                    <button
                      type="button"
                      onClick={() => setHasFloated(!hasFloated)}
                      className="relative flex-shrink-0"
                      style={{ width: 52, height: 28 }}
                      aria-label="Toggle: Have you floated before?"
                    >
                      <div
                        className="w-full h-full rounded-full transition-colors duration-300"
                        style={{
                          background: hasFloated ? 'var(--dusty-blue)' : 'rgba(250,248,243,0.15)',
                        }}
                      />
                      <div
                        className="absolute top-1 left-1 w-5 h-5 rounded-full transition-transform duration-300"
                        style={{
                          background: 'var(--cream)',
                          transform: hasFloated ? 'translateX(24px)' : 'translateX(0)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                        }}
                      />
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn-blue w-full py-4 rounded-2xl text-sm font-medium tracking-wide"
                  >
                    Book Your Meditation Session
                  </button>

                  <p className="text-xs text-center" style={{ color: 'rgba(245,240,235,0.25)' }}>
                    No payment required to reserve · Cancel any time
                  </p>
                </form>
              </div>
            ) : (
              /* Initial CTA state */
              <div className="space-y-4">
                {/* Primary CTA */}
                <div
                  className="rounded-3xl p-8"
                  style={{
                    background: 'rgba(245,240,235,0.03)',
                    border: '1px solid rgba(245,240,235,0.08)',
                  }}
                >
                  <h3
                    className="font-serif text-2xl mb-3"
                    style={{ color: 'var(--stone)' }}
                  >
                    Ready to disappear for an hour of meditation?
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--moss)' }}>
                    First sessions are $75. No experience needed. No goals required.
                  </p>
                  <button
                    onClick={() => setFormStep('form')}
                    className="btn-blue w-full py-4 rounded-2xl text-sm font-medium tracking-wide"
                  >
                    Find Your Meditation
                  </button>
                </div>

                {/* Secondary: Download guide */}
                <div
                  className="rounded-3xl p-6"
                  style={{
                    background: 'rgba(122,139,111,0.08)',
                    border: '1px solid rgba(122,139,111,0.2)',
                  }}
                >
                  {downloadSubmitted ? (
                    <div className="text-center py-2">
                      <p className="text-sm font-medium" style={{ color: 'var(--teal)' }}>
                        Guide on its way ✓
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--moss)' }}>
                        Check your inbox for the Pre-Float Ritual guide.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(122,139,111,0.2)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'var(--moss)' }}>
                            <path d="M12 2v10m0 0l-4-4m4 4l4-4M2 17v3a2 2 0 002 2h16a2 2 0 002-2v-3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium" style={{ color: 'var(--warm-white)' }}>
                            Download Your Pre-Float Ritual
                          </div>
                          <div className="text-xs" style={{ color: 'var(--moss)' }}>
                            Free guide · What to eat, avoid, and expect
                          </div>
                        </div>
                      </div>
                      <form onSubmit={handleDownloadSubmit} className="flex gap-2">
                        <input
                          type="email"
                          value={downloadEmail}
                          onChange={(e) => setDownloadEmail(e.target.value)}
                          placeholder="Your email"
                          required
                          className="flex-1 bg-transparent text-sm px-0 py-2 outline-none"
                          style={{
                            borderBottom: '1px solid rgba(122,139,111,0.4)',
                            color: 'var(--warm-white)',
                          }}
                        />
                        <button
                          type="submit"
                          className="text-xs font-medium px-4 py-2 rounded-xl transition-colors"
                          style={{
                            background: 'rgba(122,139,111,0.25)',
                            color: 'var(--warm-white)',
                          }}
                        >
                          Send
                        </button>
                      </form>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}