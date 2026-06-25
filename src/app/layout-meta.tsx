import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://g-dev-ops.com"),
  title: {
    default: "G Dev OPS - Learn Game Development | Roblox, Unity, Unreal Engine",
    template: "%s | G Dev OPS",
  },
  description:
    "Master game development with expert-led courses in Roblox, Unity, and Unreal Engine. Learn from industry professionals and build your dream games.",
  keywords: [
    "game development",
    "Roblox development",
    "Unity courses",
    "Unreal Engine",
    "game design",
    "indie game development",
    "Luau scripting",
    "C# Unity",
    "Blueprints",
    "game development certification",
  ],
  authors: [{ name: "G Dev OPS Team" }],
  creator: "G Dev OPS",
  publisher: "G Dev OPS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://g-dev-ops.com",
    siteName: "G Dev OPS",
    title: "G Dev OPS - Learn Game Development",
    description:
      "Master game development with expert-led courses in Roblox, Unity, and Unreal Engine.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "G Dev OPS - Game Development Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G Dev OPS - Learn Game Development",
    description:
      "Master game development with expert-led courses in Roblox, Unity, and Unreal Engine.",
    creator: "@gdevops",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "G Dev OPS",
  description: "Online platform for learning game development",
  url: "https://g-dev-ops.com",
  logo: "https://g-dev-ops.com/logo.png",
  sameAs: [
    "https://twitter.com/gdevops",
    "https://youtube.com/@gdevops",
    "https://discord.gg/gdevops",
  ],
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "99",
    offerCount: "120",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "2500",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
