import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Assignment UI",
  description: "Replicated UI per assignment instructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${plusJakarta.variable} antialiased bg-black text-gray-300 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
