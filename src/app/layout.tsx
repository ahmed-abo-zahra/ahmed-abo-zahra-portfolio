import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ahmed Abo Zahra | Full-Stack Web Developer",
  description: "Explore Ahmed Abo Zahra's web development work, from responsive interfaces and motion to full-stack functionality.",
  metadataBase: new URL("https://ahmedabozahra.me"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ahmed Abo Zahra | Full-Stack Web Developer",
    description: "Full-stack web development work across responsive interfaces, motion, and product functionality.",
    url: "/",
    siteName: "Ahmed Abo Zahra",
    type: "website",
  },
  robots: process.env.SITE_INDEXABLE === "true" ? { index: true, follow: true } : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ahmed Abo Zahra",
    url: "https://ahmedabozahra.me",
    jobTitle: "Full-Stack Web Developer",
    email: "mailto:ahmedabozahra68@gmail.com",
    sameAs: ["https://github.com/ahmedfrhat", "https://www.linkedin.com/in/ahmed-abo-zahra/"],
  };

  return <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
