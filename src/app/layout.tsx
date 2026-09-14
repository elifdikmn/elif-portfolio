import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Elif Dikmen — Portfolio",
  description:
    "Elif Dikmen — Data science & machine learning portfolio. Georgia Tech MS Analytics student specializing in Computational Data Analysis.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable}`}>
      <body>{children}</body>
    </html>
  );
}
