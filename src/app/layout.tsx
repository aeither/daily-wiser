import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
// import { config } from "@/utils/config";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

import Web3Provider from "@/providers/Web3Provider";
import { Manrope } from "next/font/google";

const fontHeading = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

// const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "dailywiser",
  description: "",
};

export default function RootLayout(props: { children: ReactNode }) {
  // const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
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
            {/* <AppKitProvider initialState={initialState}> */}
            <Web3Provider>
              <Header />
              <div className="pt-20">{props.children}</div>
              <Toaster />
            </Web3Provider>
            {/* </AppKitProvider> */}
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
