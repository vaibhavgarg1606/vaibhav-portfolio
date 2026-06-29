import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";

import { QueryProvider } from "@/providers/query-provider";

import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vaibhav Garg | Software Engineer",
  description:
    "Portfolio of Vaibhav Garg - full stack engineer exploring AI/ML, product development, and data analytics.",
  keywords: ["Vaibhav Garg", "Software Engineer", "AI/ML", "Full Stack", "Portfolio"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${jetBrainsMono.variable} h-full dark antialiased`}
    >
      <body className="min-h-full bg-zinc-950 text-zinc-100">
        <QueryProvider>{children}</QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
