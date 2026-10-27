import './globals.css';
import Script from 'next/script';
import UkTopStrip from '../components/UkTopStrip';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import LeadModal from '../components/LeadModal';
import VideoModal from '../components/VideoModal';
import WhatsAppButton from '../components/WhatsAppButton';

export const metadata = {
  metadataBase: new URL('https://growthore.co.uk'),
  title: {
    default: 'GrowthOre — Performance Marketing, Social Media & AI SEO',
    template: '%s | GrowthOre',
  },
  description:
    'GrowthOre combines performance marketing, social media and AI-powered SEO to turn attention into leads and ad spend into measurable revenue.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GrowthOre — Performance Marketing, Social Media & AI SEO',
    description:
      'GrowthOre combines performance marketing, social media and AI-powered SEO to turn attention into leads and ad spend into measurable revenue.',
    url: 'https://growthore.co.uk',
    siteName: 'GrowthOre',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GrowthOre — Performance Marketing, Social Media & AI SEO',
    description:
      'GrowthOre combines performance marketing, social media and AI-powered SEO to turn attention into leads and ad spend into measurable revenue.',
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
    icon: '/favicon.ico',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && window.location.hostname.includes('growthore.co.uk')) {
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-PR6WZ9RH');
            }
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <div className="grain" aria-hidden="true" />
        <UkTopStrip />
        <Navbar />
        {children}
        <Footer />
        <LeadModal />
        <VideoModal />
        <WhatsAppButton />
      </body>
    </html>
  );
}
