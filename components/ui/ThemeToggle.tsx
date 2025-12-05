'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <button
      onClick={cycleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-foreground/10 bg-foreground/5 hover:bg-foreground/10 transition-colors overflow-hidden"
    >
        <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {theme === 'light' && <Sun className="w-5 h-5 text-orange-500" />}
            {theme === 'dark' && <Moon className="w-5 h-5 text-purple-500" />}
            {theme === 'system' && <Monitor className="w-5 h-5 text-blue-500" />}
        </motion.div>
    </button>
  );
}