import { MiniPlayer } from '@/components/audio-player/MiniPlayer';
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AudioPlayerProvider } from '@/context/AudioPlayerContext';
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "DJ VM Vishal - Official Website",
  description: "Experience the best of music with DJ VM Vishal",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f3f4f6' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning 
      className={`${inter.variable} antialiased`}
    >
      <body 
        className={`${inter.className} text-gray-900 dark:text-gray-100 overflow-x-hidden`} 
        suppressHydrationWarning
      >
        <AuthProvider>
          <ThemeProvider>
            <AudioPlayerProvider>
              <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
                <Header />
                <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden">
                  <div className="mx-auto w-full">
                    {children}
                  </div>
                </main>
                <Footer />
                <MiniPlayer />
              </div>
            </AudioPlayerProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
