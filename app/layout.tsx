import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll"; // Import the provider

export const metadata: Metadata = {
  title: "Sambit | Full Stack Developer",
  description: "Portfolio of a Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
           <SmoothScroll>
             {children}
           </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}