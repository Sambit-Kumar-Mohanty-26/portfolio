import type { Metadata, Viewport } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import TabVisibility from "@/components/ui/TabVisibility";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { siteConfig } from "@/lib/site";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

const calistoga = Calistoga({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-calistoga",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Sambit",
    "Sambit Kumar Mohanty",
    "Sambit Kumar Mohanty full stack developer",
    "Sambit Kumar Mohanty Web3 developer",
    "Full Stack Developer",
    "Web3 Developer",
    "Blockchain Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "SaaS Developer",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  category: "technology",
  verification: {
    google: "9P5FoXSWxpi_7gWFxKMOng2TQBDJRrVF4kRPP4JYzmg",
  },

  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: "/",
    siteName: `${siteConfig.name}'s Portfolio`,
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#030014" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/avatar.png`,
        jobTitle: "Full Stack and Web3 Developer",
        description: siteConfig.description,
        sameAs: [siteConfig.github, siteConfig.linkedin],
        knowsAbout: [
          "Full Stack Development",
          "Web3",
          "Blockchain",
          "Next.js",
          "React",
          "TypeScript",
          "Node.js",
          "MERN Stack",
          "Solidity",
          "SaaS Architecture",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} Portfolio`,
        description: siteConfig.description,
        author: { "@id": `${siteConfig.url}/#person` },
        inLanguage: "en",
      },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`
          ${inter.variable} 
          ${calistoga.variable} 
          antialiased 
          bg-background 
          text-foreground
          font-sans
          overflow-x-hidden
        `}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
           <SmoothScroll>
             <TabVisibility />
             {children}
           </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
