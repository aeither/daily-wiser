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
  title: "DailyWiser",
  description: "",
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
