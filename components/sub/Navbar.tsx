'use client';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ui/ThemeToggle'; 

export default function Navbar() {
  const links = ["Home", "About", "Projects", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 2.2 }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4"
    >
      <div className="flex gap-6 px-8 py-3 bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-full shadow-2xl transition-all">
        {links.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium text-foreground/60 hover:text-foreground hover:scale-105 transition-all cursor-pointer"
          >
            {link}
          </a>
        ))}
      </div>

      <div className="bg-foreground/5 backdrop-blur-xl border border-foreground/10 rounded-full mr-2">
         <ThemeToggle />
      </div>

    </motion.nav>
  );
}