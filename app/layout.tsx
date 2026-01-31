import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Space_Grotesk } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/Navbar";


const inter = Inter({
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700']
});


export const metadata: Metadata = {
  title: "Price-Wise",
  description: "Track product price effeortlessly and save money on your online shoping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className="max-w-7xl mx-auto">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
