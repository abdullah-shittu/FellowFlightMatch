import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/NavBar'
import { Metadata } from 'next'
import Script from 'next/script'
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

// The URL of the deployed application. Replace with your actual production URL.
const applicationUrl = 'https://fellowflightmatch.abdullah.buzz'

// URL for the "Arrival Pin" icon you approved.
const iconUrl = 'https://fellowflightmatch.abdullah.buzz/favicon.ico'

export const metadata = {
  // Core Metadata for SEO and Browser Information
  title: {
    default: 'FlightMate | Find & Coordinate with Fellows on Your Flight',
    template: `%s | FlightMate`
  },
  description:
    'Never travel alone again. FlightMate helps MLT Career Prep Fellows discover peers on the same flight or arriving at similar times to coordinate travel, share rides, and build community.',
  applicationName: 'FlightMate',
  keywords: [
    'MLT',
    'Management Leadership for Tomorrow',
    'Career Prep',
    'Flight Coordination',
    'Travel App',
    'Airport Meetup',
    'Carpool',
    'Networking',
    'Flight Matcher'
  ],
  authors: [{ name: 'MLT Rising Leaders', url: applicationUrl }],
  creator: 'Abdullah Shittu',
  publisher: 'Abdullah Shittu',

  // Open Graph Metadata for Social Sharing (Facebook, LinkedIn, Slack, etc.)
  openGraph: {
    title: "FlightMate: Who's On Your Flight?",
    description:
      'Coordinate travel, share rides, and meet other MLT Fellows at the airport. Enter your flight to find your peers.',
    url: applicationUrl,
    siteName: 'FlightMate',
    images: [
      {
        url: iconUrl,
        width: 800,
        height: 800,
        alt: 'FlightMate Arrival Pin Logo'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },

  // Twitter Card Metadata for Rich Sharing on Twitter
  twitter: {
    card: 'summary_large_image',
    title: 'FlightMate: Find MLT Fellows on Your Flight',
    description:
      'Flying to the next seminar? See which MLT Fellows are on your flight or arriving nearby. Coordinate and connect before you even land.',
    creator: '@abdullahshittu0', // Replace with your or your organization's Twitter handle
    images: [iconUrl]
  },

  // Icons and Favicons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },

  // Viewport and Theme Color for Mobile Browsers
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#1D1D1F' }
  ],

  // Additional SEO and Web App Manifest Information
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  alternates: {
    canonical: 'https://fellowflightmatch.abdullah.buzz'
  }
}

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head>
        <Script
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-VZDK2WJEBL'
        />
        <Script
          id='google-analytics'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VZDK2WJEBL');
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  )
}
