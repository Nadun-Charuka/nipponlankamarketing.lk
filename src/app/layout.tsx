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
    default: "Nippon Lanka Marketing - Home Appliances & Furniture on Easy Installments",
    template: "%s | Nippon Lanka Marketing",
  },
  description: "Buy premium home appliances and furniture with easy in-house installments. No credit card required. Free delivery in Western Province (Colombo, Gampaha, Kalutara).",
  keywords: [
    "home appliances Sri Lanka",
    "furniture installments",
    "no credit card",
    "free delivery Colombo",
    "Western Province",
    "TVs installments",
    "refrigerators Colombo",
    "washing machines",
  ],
  authors: [{ name: "Nippon Lanka Marketing" }],
  creator: "Nippon Lanka Marketing",
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Nippon Lanka Marketing",
    title: "Nippon Lanka Marketing - Easy Installments on Home Appliances",
    description: "Premium home appliances and furniture with in-house installments. No credit card needed.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nippon Lanka Marketing",
    description: "Easy installments on home appliances. No credit card required.",
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

