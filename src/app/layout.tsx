import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Nippon Lanka Marketing - Home Appliances & Furniture on Easy Installments | Sri Lanka",
    template: "%s | Nippon Lanka Marketing",
  },
  description: "Buy premium home appliances and furniture with easy in-house installments (warika gewim) in Sri Lanka. No credit card required. Free delivery (gedaratama genath denawa) in Western Province. Authorized dealer for Singer, Damro, LG, Samsung, Sony.",
  keywords: [
    // Brand Keywords
    "Nippon Lanka Marketing",
    "Nippon Lanka",
    "Nippon Electronics",
    "Nippon Furniture",

    // Sinhala Keywords
    "අඩුවට ලී බඩු", // aduwata lee badu
    "වාරික ගෙවීම්", // warika gewim
    "පුටු", // putu
    "ඇදන්", // aden
    "රෙදි සෝදන යන්ත්‍ර", // washing machines
    "ශීතකරණ", // refrigerators
    "ගෘහ භාණ්ඩ", // furniture
    "රූපවාහිනී", // TV

    // Singlish & Price Specific Keywords
    "aduwata lee badu",
    "warika gewim",
    "aduma warika",
    "putu price in Sri Lanka",
    "aden price in Sri Lanka",

    // Product Specific Pricing
    "washing machine price in Sri Lanka",
    "fridge price in Sri Lanka",
    "refrigerator price in Sri Lanka",
    "TV price in Sri Lanka",
    "LED TV price in Sri Lanka",
    "air conditioner price in Sri Lanka",
    "AC price in Sri Lanka",
    "sofa set price in Sri Lanka",
    "bedroom set price in Sri Lanka",
    "dining table price in Sri Lanka",

    // General
    "home appliances Sri Lanka",
    "furniture installments Sri Lanka",
    "no credit card installments",
    "free delivery Colombo",

    // Location
    "home appliances Gampaha",
    "furniture Kalutara",
    "electronics Colombo"
  ],
  authors: [{ name: "Nippon Lanka Marketing" }],
  creator: "Nippon Lanka Marketing",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Nippon Lanka Marketing",
    title: "Nippon Lanka Marketing - Easy Installments on Home Appliances in Sri Lanka",
    description: "Buy TVs, refrigerators, washing machines, ACs & furniture with easy warika gewim (installments). No credit card needed. Free delivery in Colombo, Gampaha & Kalutara.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nippon Lanka Marketing - Home Appliances & Furniture",
    description: "Easy installments on TVs, fridges, washing machines & more. No credit card required. Call/WhatsApp for details.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

import { CartProvider } from '@/features/cart/context/CartContext';
import { CartDrawer } from '@/features/cart/components/CartDrawer';
import { WishlistProvider } from '@/features/wishlist/context/WishlistContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans text-gray-900 bg-gray-50 flex flex-col min-h-screen">
        <CartProvider>
          <WishlistProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#fff',
                  color: '#1E293B',
                  boxShadow: '0 8px 32px 0 rgba(168, 85, 247, 0.1)',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            {children}
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
