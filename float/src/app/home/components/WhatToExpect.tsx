'use client';
import React, { useRef, useEffect, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const STEPS = [
{
  number: '01',
  title: 'Arrival & Preparation',
  body: 'You begin with a cleansing shower — the salt solution requires clean skin. After a brief orientation, you enter the private suite. The pod remains open until you feel completely ready.',
  detail: '15 minutes preparation',
  image: "https://images.unsplash.com/photo-1663578226611-33d3895b7eac",
  imageAlt: 'Serene spa corridor with soft lighting and stone walls',
  dark: false
},
{
  number: '02',
  title: 'Initial Adjustment',
  body: 'Your body floats effortlessly — the therapeutic salt provides complete buoyancy. Lighting fades when you choose. External sounds vanish. Your nervous system typically needs about ten minutes to fully surrender to the experience.',
  detail: 'Minutes 0–15',
  image: "https://images.unsplash.com/photo-1692814554733-f487d10f6eea",
  imageAlt: 'Person floating in still water with arms relaxed at sides',
  dark: true
},
{
  number: '03',
  title: 'Deep State',
  body: 'Around the fifteen-minute mark, time perception dissolves. Physical awareness fades into the background. The mind doesn\'t empty — it expands into profound spaciousness and clarity.',
  detail: 'Minutes 15–45',
  image: "https://images.unsplash.com/photo-1614295832181-4176b567e8fb",
  imageAlt: 'Misty mountain lake at dawn with still reflective surface',
  dark: false
},
{
  number: '04',
  title: 'Integration',
  body: 'Gentle music signals the session\'s conclusion. You emerge gradually. Most guests spend several minutes in quiet reflection — this integration period is essential to the therapeutic process.',
  detail: 'Final 15 minutes',
  image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
  imageAlt: 'Person sitting quietly in warm light after a wellness treatment',
  dark: true
}];


function StepSection({ step, index }: {step: typeof STEPS[0];index: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const isEven = index % 2 === 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {if (entry.isIntersecting) setVisible(true);},
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={step.dark ? 'section-charcoal' : 'section-warm-white'}
      style={{ padding: '100px 0' }}>
      
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <div
          className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${!isEven ? 'md:[&>*:first-child]:order-2' : ''}`}>
          
          {/* Image */}
          <div
            className={`rounded-3xl overflow-hidden relative ${!isEven ? 'md:order-2' : ''}`}
            style={{
              height: '400px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : `translateX(${isEven ? '-24px' : '24px'})`,
              transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}>
            
            <AppImage
              src={step.image}
              alt={step.imageAlt}
              fill
              className="object-cover" />
            
            {/* Overlay with step number */}
            <div
              className="absolute bottom-6 left-6"
              style={{
                background: 'rgba(26,35,50,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(250,248,243,0.15)',
                borderRadius: '12px',
                padding: '8px 16px'
              }}>
              
              <span
                className="font-mono text-xs font-medium"
                style={{ color: 'var(--dusty-blue)' }}>
                
                {step.detail}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className={isEven ? '' : 'md:order-1'}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : `translateX(${isEven ? '24px' : '-24px'})`,
              transition: 'all 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s'
            }}>
            
            <div className="flex items-center gap-4 mb-6">
              <span
                className="font-mono text-xs font-medium"
                style={{ color: 'var(--dusty-blue)' }}>
                
                {step.number}
              </span>
              <div className="flex-1 h-px" style={{ background: step.dark ? 'rgba(250,248,243,0.1)' : 'rgba(26,35,50,0.1)' }} />
            </div>

            <h3
              className="font-serif mb-4"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                lineHeight: '1.15',
                letterSpacing: '-0.015em',
                color: step.dark ? 'var(--cream)' : 'var(--navy)'
              }}>
              
              {step.title}
            </h3>

            <p
              className="text-base leading-relaxed"
              style={{
                color: step.dark ? 'var(--stone)' : 'var(--sage)',
                fontWeight: 300,
                maxWidth: '420px'
              }}>
              
              {step.body}
            </p>
          </div>
        </div>
      </div>
    </div>);

}

export default function WhatToExpect() {
  return (
    <section id="about">
      {/* Section header */}
      <div
        className="section-warm-white py-20 px-10 md:px-16">
        
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-px" style={{ background: 'var(--sage)' }} />
            <span className="text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--sage)' }}>
              The Experience
            </span>
          </div>
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              lineHeight: '1.05',
              letterSpacing: '-0.02em',
              color: 'var(--navy)',
              maxWidth: '650px'
            }}>
            
            Sixty minutes of profound stillness.
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--sage)' }}>No experience required.</em>
          </h2>
        </div>
      </div>

      {STEPS.map((step, i) =>
      <StepSection key={step.number} step={step} index={i} />
      )}
    </section>);

}