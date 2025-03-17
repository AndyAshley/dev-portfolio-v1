import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

// Components
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ParticleBackground from "@/components/particle/particle-background";

// Toast
import { ToastProvider } from "@/context/toast-context";
import ToastContainer from "@/components/ui/toast-container";

// Fonts
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Metadata initialization
export const metadata: Metadata = {
  metadataBase: new URL("https://www.andyashley.dev"),
  alternates: {
    canonical: "/",
  },
  title: {
    template: "Andy A. // %s",
    default: "Andy A. // Software Engineer",
  },
  description:
    "Welcome to my corner of the internet—where ideas become code, caffeine fuels development, and every project is a controlled experiment (mostly).",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ToastProvider>
        <body className="grid grid-rows-[auto_1fr_auto] min-h-screen w-full body-background">
          <Header />
          <main className="w-full h-full mx-auto px-4 py-20 my-auto">
            {children}
          </main>
          <Footer />
          <ParticleBackground />
          <ToastContainer />
        </body>
      </ToastProvider>
    </html>
  );
}
