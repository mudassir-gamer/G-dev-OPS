import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://g-dev-ops.com",
    siteName: "G Dev OPS",
    title: "G Dev OPS - Learn Game Development",
    description:
      "Master game development with expert-led courses in Roblox, Unity, and Unreal Engine.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "G Dev OPS - Learn Game Development",
    description: "Master game development with expert-led courses.",
    creator: "@gdevops",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "G Dev OPS",
              description: "Online platform for learning game development",
              url: "https://g-dev-ops.com",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "2500",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
