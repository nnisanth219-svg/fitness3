import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroQuiz from './components/HeroQuiz';
import PersonalizedSections from './components/PersonalizedSections';
import ScienceSection from './components/ScienceSection';
import WhatToExpect from './components/WhatToExpect';
import FindYourFloat from './components/FindYourFloat';

export default function HomePage() {
  return (
    <main style={{ backgroundColor: 'var(--cream)' }}>
      <Header />
      <HeroQuiz />
      <PersonalizedSections />
      <ScienceSection />
      <WhatToExpect />
      <FindYourFloat />
      <Footer />
    </main>
  );
}