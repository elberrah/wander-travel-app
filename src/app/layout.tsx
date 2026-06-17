import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wander Travel & Event | Premium Voyages & MICE au Maroc",
  description:
    "Agence de voyage de luxe et événementiel au Maroc. Voyages sur mesure, Omra, incentives, séminaires, limousines VIP et jets privés.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontSerif.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">
        <CustomCursor />
        <SmoothScrollProvider>
          <PageTransition>{children}</PageTransition>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
