import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { wagmiConfig } from "@/config";
import ContextProvider from "@/context";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { headers } from "next/headers";
import type { ReactNode } from "react";
import { cookieToInitialState } from "wagmi";
import "./globals.css";
import { CSPostHogProvider } from "@/context/posthog";

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
              </ContextProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </CSPostHogProvider>
    </html>
  );
}
