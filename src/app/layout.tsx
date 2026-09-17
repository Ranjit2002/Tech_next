import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "SYNTHESIS // How Technology Is Changing The World (3D Experience)",
  description:
    "An immersive 3D WebGL scrolling journey visualizing the 5 transformative technological revolutions reshaping humanity: Artificial Superintelligence, Quantum Supremacy, Clean Fusion, Synthetic Biology, and Interstellar Exploration.",
  keywords: [
    "Technology",
    "3D WebGL",
    "Next.js",
    "Artificial Intelligence",
    "Quantum Computing",
    "Clean Fusion",
    "Synthetic Biology",
    "Space Exploration",
  ],
  authors: [{ name: "Synthesis Initiative" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-black"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
