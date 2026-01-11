import type { Metadata, Viewport } from "next";
import { Inter, Calistoga } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";

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
  title: {
    default: "Sambit | Full Stack Developer",
    template: "%s | Sambit",
  },
  description: "Portfolio of Sambit, a Full Stack Developer specializing in Next.js, MERN Stack, and SaaS Architecture.",
  keywords: ["Full Stack Developer", "Next.js", "React", "TypeScript", "Portfolio", "Web Development", "MERN Stack"],
  authors: [{ name: "Sambit" }],
  creator: "Sambit",

  openGraph: {
    title: "Sambit | Full Stack Developer",
    description: "Building immersive digital experiences with clean code & modern design.",
    url: "https://your-domain.com",
    siteName: "Sambit's Portfolio",
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Sambit | Full Stack Developer",
    description: "Building immersive digital experiences with clean code & modern design.",
    creator: "@yourtwitterhandle",
  },
  
  icons: {
    icon: "/favicon.ico",
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
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
           <SmoothScroll>
             {children}
           </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}