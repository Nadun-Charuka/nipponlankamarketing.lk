import type { Metadata } from "next";
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
  description: "Buy premium home appliances and furniture with easy in-house installments in Sri Lanka. No credit card required. Free delivery in Western Province (Colombo, Gampaha, Kalutara). TVs, refrigerators, washing machines, air conditioners at best prices.",
  keywords: [
    // General
    "home appliances Sri Lanka",
    "furniture installments Sri Lanka",
    "no credit card installments",
    "free delivery Colombo",
    "Western Province delivery",

    // TV Keywords
    "TV price in Sri Lanka",
    "television installment plans",
    "Singer TV price",
    "Samsung TV Sri Lanka",
    "Sony TV installment",
    "LG TV price Colombo",
    "smart TV Sri Lanka",

    // Refrigerator Keywords
    "fridge price in Sri Lanka",
    "refrigerator installment",
    "LG refrigerator Sri Lanka",
    "Samsung fridge price",
    "double door fridge Colombo",

    // Washing Machine Keywords
    "washing machine price Sri Lanka",
    "washing machine installment",
    "front load washer Colombo",
    "Abans washing machine",

    // Air Conditioner Keywords
    "air conditioner price Sri Lanka",
    "AC installment plans",
    "Panasonic AC Sri Lanka",
    "inverter AC Colombo",

    // Furniture Keywords
    "furniture installments Colombo",
    "sofa set price Sri Lanka",
    "Damro furniture installment",

    // Location-based
    "home appliances Colombo",
    "furniture Gampaha",
    "appliances Kalutara",

    // Payment & Service
    "easy installment plans",
    "low price home appliances",
    "installment options Sri Lanka",
  ],
  authors: [{ name: "Nippon Lanka Marketing" }],
  creator: "Nippon Lanka Marketing",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Nippon Lanka Marketing",
    title: "Nippon Lanka Marketing - Easy Installments on Home Appliances in Sri Lanka",
    description: "Buy TVs, refrigerators, washing machines, air conditioners & furniture with easy in-house installments. No credit card needed. Free delivery in Colombo, Gampaha & Kalutara.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nippon Lanka Marketing - Home Appliances Sri Lanka",
    description: "Easy installments on TVs, fridges, washing machines & more. No credit card required. Free delivery in Western Province.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-right"
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
      </body>
    </html>
  );
}

