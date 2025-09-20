import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SoundEffects } from '@/components/ui/sound-effects';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tiny Wins - Build Identity Through Showing Up',
  description:
    'The micro-habits app that transforms your identity, one small action at a time.',
  keywords: [
    'habits',
    'identity',
    'psychology',
    'personal growth',
    'micro-habits',
  ],
  authors: [{ name: 'Tiny Wins Team' }],
  openGraph: {
    title: 'Tiny Wins - Build Identity Through Showing Up',
    description:
      'The micro-habits app that transforms your identity, one small action at a time.',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Tiny Wins',
  },
  formatDetection: {
    telephone: false, // Prevent phone number detection
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover', // Important for safe areas
  userScalable: false, // Prevent zoom for better app-like experience
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#769E54' },
    { media: '(prefers-color-scheme: dark)', color: '#9CBA82' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <SoundEffects enabled={true} />
        <div className="min-h-full [padding-top:env(safe-area-inset-top)] [padding-bottom:env(safe-area-inset-bottom)] [padding-left:env(safe-area-inset-left)] [padding-right:env(safe-area-inset-right)]">
          {children}
        </div>
      </body>
    </html>
  );
}
