import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import "./experience.css";
import { profile } from "@/content/profile";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Ahmed Abo Zahra | Full-Stack Web Developer",
  description: "Explore Ahmed Abo Zahra's web development work, from responsive interfaces and motion to full-stack functionality.",
  metadataBase: new URL("https://ahmedabozahra.me"),
  authors: [{ name: profile.name, url: profile.website }],
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ahmed Abo Zahra | Full-Stack Web Developer",
    description: "Full-stack web development work across responsive interfaces, motion, and product functionality.",
    url: "/",
    siteName: "Ahmed Abo Zahra",
    type: "website",
  },
  // Known pages opt in. Unknown routes must not inherit indexable metadata.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${profile.website}/#person`,
    name: "Ahmed Abo Zahra",
    url: "https://ahmedabozahra.me",
    jobTitle: "Full-Stack Web Developer",
    email: "mailto:ahmedabozahra68@gmail.com",
    image: `${profile.website}/images/portrait/ahmed-abo-zahra.jpg`,
    sameAs: [profile.github, profile.linkedin],
  };

  return <html lang="en" className={`${manrope.variable} ${cormorant.variable}`}><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></body></html>;
}
