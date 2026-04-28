import type { Metadata } from "next";
import type React from "react";

import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Onest } from "next/font/google";

const onest = Onest({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-onest",
});

export const metadata: Metadata = {
  title: "Fahd Roussafi",
  description: "Full Stack Developer",
  icons: {
    icon: "/images/design-mode/grid1.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${onest.variable} font-sans antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
