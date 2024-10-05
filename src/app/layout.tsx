import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { wagmiConfig } from "@/config";
import ContextProvider from "@/context";
import { CSPostHogProvider } from "@/context/posthog";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import type { ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import "./globals.css";

const fontHeading = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "Daily Wiser",
    template: "%s | Daily Wiser",
  },
  description:
    "Gamified micro-learning app with AI personalization and blockchain-verified achievements. Learn daily, grow consistently, and earn NFT skill badges.",
  metadataBase: new URL("https://dailywiser.xyz"),
  openGraph: {
    title:
      "Daily Wiser: AI-Powered Micro-Learning Platform for Personal Growth",
    description:
      "Gamified micro-learning app with AI personalization and blockchain-verified achievements. Learn daily, grow consistently, and earn NFT skill badges.",
    url: "https://dailywiser.xyz",
    siteName: "Daily Wiser",
    images: [
      {
        url: "https://dailywiser.xyz/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: "Daily Wiser: AI-Powered Micro-Learning Platform",
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  keywords:
    "micro-learning, AI education, gamified learning, blockchain credentials, personal growth, daily wisdom, NFT badges, skill development, personalized learning",
  authors: [{ name: "Daily Wiser Team" }],
  category: "Education",
  alternates: {
    canonical: "https://dailywiser.xyz",
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <CSPostHogProvider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontHeading.variable,
            fontBody.variable
          )}
        >
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <ContextProvider initialState={initialState}>
                <Header />
                {props.children}
                <Toaster />
                <Analytics />
              </ContextProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </CSPostHogProvider>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
