import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Sensory Wellness Studio — Flotation Therapy for Deep Restoration',
  description: 'Experience profound stillness in our flotation therapy pods. Scientifically shown to reduce stress, ease physical tension, and unlock deep meditative states in San Francisco.',
  icons: {
    icon: [
      { url: '/assets/images/app_logo.png', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
</body>
    </html>
  );
}