'use client';
import React, { useState, useEffect, useRef } from 'react';


const PERSONAS: Record<string, {
  headline: string;
  sub: string;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  testimonial: { quote: string; name: string; condition: string; result: string };
}> = {
  stress: {
    headline: 'Your mind deserves space to breathe deeply.',
    sub: 'Within fifteen minutes, brainwave patterns shift. Theta frequencies — the gateway to profound calm and creative insight — replace the constant mental chatter.',
    leftContent: null,
    rightContent: null,
    testimonial: {
      quote: "I hadn't experienced true silence in years. Thirty-five minutes in, I wasn't processing problems anymore — I'd forgotten problems existed.",
      name: 'Elena Martinez',
      condition: 'Tech executive, startup founder',
      result: 'Now achieves deep rest after 5 sessions',
    },
  },
  pain: {
    headline: 'When gravity disappears, your body remembers how to heal.',
    sub: 'The therapeutic salt solution creates weightless conditions. Inflamed tissues decompress naturally. Stress hormones decrease measurably within the first twenty minutes.',
    leftContent: null,
    rightContent: null,
    testimonial: {
      quote: "Physical therapy had plateaued. After four sessions, I cut my pain medication significantly. The relief builds progressively with each float.",
      name: 'Robert Chen',
      condition: 'Chronic pain condition, 6 years',
      result: '72% discomfort reduction after 7 sessions',
    },
  },
  creative: {
    headline: 'Breakthrough ideas emerge in stillness, not struggle.',
    sub: 'Sensory quieting removes the mental static that blocks inspiration. Theta brain states facilitate pattern recognition and creative synthesis naturally.',
    leftContent: null,
    rightContent: null,
    testimonial: {
      quote: "I entered with a creative problem that had stumped me for months. I emerged with solutions I couldn't have logically constructed. The silence connected what my busy mind couldn't.",
      name: 'Sophia Laurent',
      condition: 'Design director, creative agency',
      result: 'Regular floats before major projects',
    },
  },
  curious: {
    headline: 'Sometimes not knowing why you\'re here is the perfect reason to arrive.',
    sub: 'Many people come exhausted from the pressure to have answers. The float pod demands nothing from you. No goals, no metrics, no outcomes to optimize.',
    leftContent: null,
    rightContent: null,
    testimonial: {
      quote: "I came because a colleague wouldn't stop talking about it. I had zero expectations. I left feeling like I'd returned to a part of myself I didn't know was missing.",
      name: 'Marcus Williams',
      condition: 'First-time floater',
      result: 'Purchased membership the following week',
    },
  },
};

// EEG Wave SVG Component
function EEGGraphic() {
  const pathRef = useRef<SVGPathElement>(null);
  const [animated, setAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col justify-center px-8 py-12">
      <div className="mb-6">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--dusty-blue)' }}>
          Brainwave Activity Patterns
        </span>
      </div>

      {/* Wave labels */}
      <div className="space-y-6">
        {[
          { label: 'Beta (alert)', freq: '12–30 Hz', color: 'rgba(250,248,243,0.3)', path: 'M0,20 Q15,5 30,20 Q45,35 60,20 Q75,5 90,20 Q105,35 120,20 Q135,5 150,20 Q165,35 180,20 Q195,5 210,20 Q225,35 240,20 Q255,5 270,20 Q285,35 300,20', delay: '0s' },
          { label: 'Alpha (calm)', freq: '8–12 Hz', color: 'rgba(125,132,113,0.7)', path: 'M0,20 Q30,2 60,20 Q90,38 120,20 Q150,2 180,20 Q210,38 240,20 Q270,2 300,20', delay: '0.3s' },
          { label: 'Theta (float state)', freq: '4–8 Hz', color: 'var(--dusty-blue)', path: 'M0,20 Q50,0 100,20 Q150,40 200,20 Q250,0 300,20', delay: '0.6s', highlight: true },
        ].map((wave) => (
          <div key={wave.label} className="flex items-center gap-4">
            <div className="w-24 shrink-0">
              <div className={`text-xs font-medium ${wave.highlight ? 'text-dusty-blue' : ''}`} style={{ color: wave.highlight ? 'var(--dusty-blue)' : 'var(--stone)' }}>
                {wave.label}
              </div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(250,248,243,0.3)', fontSize: '10px' }}>
                {wave.freq}
              </div>
            </div>
            <div className="flex-1 h-12 relative overflow-hidden">
              <svg
                viewBox="0 0 300 40"
                preserveAspectRatio="none"
                className="w-full h-full"
              >
                <path
                  ref={wave.highlight ? pathRef : undefined}
                  d={wave.path}
                  stroke={wave.color}
                  strokeWidth={wave.highlight ? '2.5' : '1.5'}
                  fill="none"
                  strokeLinecap="round"
                  className={`eeg-path ${animated ? 'animate' : ''}`}
                  style={{ transitionDelay: wave.delay }}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Minute marker */}
      <div
        className="mt-8 pt-6"
        style={{ borderTop: '1px solid rgba(245,240,235,0.1)' }}
      >
        <div className="flex justify-between text-xs" style={{ color: 'rgba(250,248,243,0.3)' }}>
          <span>0 min</span>
          <span className="text-dusty-blue font-medium" style={{ color: 'var(--dusty-blue)' }}>↑ Theta onset ~15 min</span>
          <span>60 min</span>
        </div>
        <div className="mt-2 h-1 rounded-full" style={{ background: 'rgba(250,248,243,0.08)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: animated ? '25%' : '0%',
              background: 'var(--dusty-blue)',
              transition: 'width 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1s',
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Thermal image simulation
function ThermalGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full h-full flex flex-col items-center justify-center px-8 py-12 relative"
    >
      <div className="mb-6 w-full">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--dusty-blue)' }}>
          Thermal Imaging Analysis
        </span>
      </div>

      {/* Thermal body silhouette */}
      <div
        className="relative w-48 h-72 rounded-[80px] overflow-hidden"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease 0.3s',
        }}
      >
        {/* Before float */}
        <div
          className="absolute inset-0 thermal-gradient"
          style={{
            opacity: visible ? 0 : 1,
            transition: 'opacity 1.5s ease 0.8s',
          }}
        />
        {/* After float — cooler, more uniform */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #0e3a6e 0%, #1a5c8c 25%, #2d8a8a 50%, #3a9e7a 65%, #4a8a5e 80%, #3a7a5e 100%)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 1.5s ease 0.8s',
          }}
        />

        {/* Joint hotspot indicators */}
        {[
          { top: '18%', left: '30%', size: 20, delay: '1.2s' },
          { top: '18%', right: '30%', size: 20, delay: '1.4s' },
          { top: '55%', left: '15%', size: 16, delay: '1.6s' },
          { top: '55%', right: '15%', size: 16, delay: '1.8s' },
          { top: '70%', left: '20%', size: 14, delay: '2s' },
          { top: '70%', right: '20%', size: 14, delay: '2.2s' },
        ].map((spot, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              top: spot.top,
              left: spot.left,
              right: spot.right,
              width: spot.size,
              height: spot.size,
              background: 'radial-gradient(circle, rgba(107,140,174,0.8) 0%, transparent 70%)',
              opacity: visible ? 0.9 : 0,
              transition: `opacity 0.6s ease ${spot.delay}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Before/After labels */}
      <div
        className="mt-6 flex gap-8 text-xs"
        style={{
          color: 'var(--stone)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 1.5s',
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: '#e87820' }} />
          <span>Before float</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ background: 'var(--dusty-blue)' }} />
          <span>After 60 min</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-center max-w-xs" style={{ color: 'rgba(250,248,243,0.4)' }}>
        Cortisol reduction measurable within 20 minutes of immersion
      </p>
    </div>
  );
}

// Creative block graphic — waveform
function CreativeGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const heights = [20, 35, 55, 42, 68, 80, 72, 90, 85, 95, 88, 76, 82, 70, 65, 58, 72, 80, 75, 60, 55, 48, 62, 70];

  return (
    <div ref={ref} className="w-full h-full flex flex-col justify-center px-8 py-12">
      <div className="mb-6">
        <span className="text-xs tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--dusty-blue)' }}>
          Creative Insight Frequency
        </span>
      </div>
      <div className="flex items-end gap-1.5 h-32">
        {heights.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-sm"
            style={{
              height: visible ? `${h}%` : '0%',
              background: i > 7 && i < 14
                ? 'var(--dusty-blue)'
                : i >= 14
                ? 'rgba(125,132,113,0.5)'
                : 'rgba(250,248,243,0.15)',
              transition: `height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.04}s`,
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs" style={{ color: 'rgba(250,248,243,0.3)' }}>
        <span>Session start</span>
        <span style={{ color: 'var(--dusty-blue)' }}>↑ Peak creative window</span>
        <span>Session end</span>
      </div>
      <p className="mt-6 text-sm" style={{ color: 'var(--stone)' }}>
        Self-reported creative insights peak between minutes 25–45 of a 60-minute session.
      </p>
    </div>
  );
}

// Unknown/explorer graphic — concentric circles
function ExplorerGraphic() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center px-8 py-12">
      <div className="relative w-64 h-64">
        {[1, 2, 3, 4, 5].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border"
            style={{
              inset: `${(ring - 1) * 22}px`,
              borderColor: ring === 3 ? 'var(--dusty-blue)' : 'rgba(250,248,243,0.12)',
              borderWidth: ring === 3 ? '1.5px' : '1px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.7)',
              transition: `opacity 0.8s ease ${ring * 0.15}s, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${ring * 0.15}s`,
            }}
          />
        ))}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.8s',
          }}
        >
          <span className="font-serif text-4xl italic" style={{ color: 'var(--soft-blue)' }}>○</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  dark,
}: {
  testimonial: typeof PERSONAS['racing']['testimonial'];
  dark: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-full flex flex-col justify-center px-8 md:px-16 py-16"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(24px)',
        transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s',
      }}
    >
      {/* Quote mark */}
      <div className="mb-6 font-serif text-5xl leading-none" style={{ color: 'var(--dusty-blue)', opacity: 0.4 }}>
        "
      </div>

      <blockquote
        className="font-serif text-xl md:text-2xl leading-relaxed mb-8"
        style={{
          color: dark ? 'var(--cream)' : 'var(--navy)',
          fontStyle: 'italic',
          fontWeight: 300,
        }}
      >
        {testimonial.quote}
      </blockquote>

      {/* Attribution */}
      <div>
        <div
          className="text-sm font-semibold mb-1"
          style={{ color: dark ? 'var(--cream)' : 'var(--navy)' }}
        >
          {testimonial.name}
        </div>
        <div className="text-xs mb-3" style={{ color: 'var(--sage)' }}>
          {testimonial.condition}
        </div>
        <div
          className="inline-block px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: 'rgba(107, 140, 174, 0.15)',
            color: 'var(--dusty-blue)',
            border: '1px solid rgba(107, 140, 174, 0.3)',
          }}
        >
          {testimonial.result}
        </div>
      </div>
    </div>
  );
}

export default function PersonalizedSections() {
  const [activePersona, setActivePersona] = useState<string>('stress');

  useEffect(() => {
    const handler = (e: Event) => {
      const custom = e as CustomEvent;
      setActivePersona(custom.detail.answerId);
    };
    window.addEventListener('quiz-answer', handler);
    return () => window.removeEventListener('quiz-answer', handler);
  }, []);

  const persona = PERSONAS[activePersona] || PERSONAS['stress'];

  // Map persona to graphic component
  const LeftGraphic = () => {
    if (activePersona === 'stress') return <EEGGraphic />;
    if (activePersona === 'pain') return <ThermalGraphic />;
    if (activePersona === 'creative') return <CreativeGraphic />;
    return <ExplorerGraphic />;
  };

  return (
    <section id="personalized">
      {/* Section 1: Dark — Graphic + Testimonial */}
      <div
        className="section-charcoal relative overflow-hidden"
        style={{ minHeight: '70vh' }}
      >
        {/* Subtle salt texture */}
        <div className="absolute inset-0 salt-texture opacity-10 pointer-events-none" />

        {/* Persona indicator */}
        <div
          className="pt-20 px-10 md:px-16 flex items-center gap-4"
          style={{ color: 'var(--sage)' }}
        >
          <div className="w-6 h-px" style={{ background: 'var(--dusty-blue)' }} />
          <span className="text-xs tracking-[0.2em] uppercase">
            {activePersona === 'stress' && 'For mental clarity'}
            {activePersona === 'pain' && 'For physical relief'}
            {activePersona === 'creative' && 'For creative breakthrough'}
            {activePersona === 'curious' && 'For open exploration'}
          </span>
        </div>

        <div className="grid md:grid-cols-2 min-h-[60vh]">
          {/* Left: Data visualization */}
          <div
            className="border-r"
            style={{ borderColor: 'rgba(250,248,243,0.06)' }}
          >
            <LeftGraphic />
          </div>

          {/* Right: Testimonial */}
          <div>
            <TestimonialCard testimonial={persona.testimonial} dark={true} />
          </div>
        </div>
      </div>

      {/* Section 2: Light — Headline + Supporting copy */}
      <div
        className="section-warm-white py-28 px-10 md:px-16 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2
                className="font-serif mb-6"
                style={{
                  fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.015em',
                  color: 'var(--navy)',
                }}
              >
                {persona.headline}
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--sage)', fontWeight: 300 }}
              >
                {persona.sub}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '1,200', unit: 'lbs', label: 'therapeutic salt solution' },
                { number: '94.1°F', unit: '', label: 'skin-neutral temperature' },
                { number: '15', unit: 'min', label: 'average time to deep state' },
                { number: '0', unit: '', label: 'gravity. complete weightlessness.' },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-7 rounded-2xl"
                  style={{
                    background: 'var(--ivory)',
                    border: '1px solid rgba(26,35,50,0.06)',
                  }}
                >
                  <div
                    className="font-serif text-3xl font-light mb-1"
                    style={{ color: 'var(--navy)' }}
                  >
                    {stat.number}
                    <span className="text-lg" style={{ color: 'var(--dusty-blue)' }}>
                      {stat.unit}
                    </span>
                  </div>
                  <div className="text-xs leading-snug" style={{ color: 'var(--sage)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}