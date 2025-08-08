import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://andreiartap.vercel.app'),
  title: {
    default: 'Andrei Artap | Full-Stack Developer',
    template: '%s | Andrei Artap'
  },
  description: 'Full-stack developer specializing in React, Next.js, and TypeScript. Computer Studies graduate from Langara College with experience building modern web applications.',
  keywords: [
    'Full-Stack Developer',
    'React Developer',
    'Next.js Developer',
    'TypeScript',
    'JavaScript',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'Andrei Artap',
    'Vancouver Developer',
    'Langara College',
    'Computer Studies'
  ],
  authors: [{ name: 'Andrei Artap', url: 'https://andreiartap.vercel.app' }],
  creator: 'Andrei Artap',
  publisher: 'Andrei Artap',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andreiartap.vercel.app',
    title: 'Andrei Artap | Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and TypeScript. Building modern web applications with clean, efficient code.',
    siteName: 'Andrei Artap Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Andrei Artap - Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Andrei Artap | Full-Stack Developer',
    description: 'Full-stack developer specializing in React, Next.js, and TypeScript.',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://andreiartap.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}