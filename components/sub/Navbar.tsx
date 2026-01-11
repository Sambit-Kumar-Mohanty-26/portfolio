'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isOpen = !isScrolled || isHovered;

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const navLinks = [
    { name: 'Home', link: '#' },
    { name: 'About', link: '#about' },
    { name: 'Projects', link: '#projects' },
    { name: 'Contact', link: '#contact' },
  ];

  if (!mounted) return null;

  return (
    <div 
      className={`fixed top-6 w-full z-50 flex px-6 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] pointer-events-none
        ${isScrolled ? 'justify-start' : 'justify-center'}
      `}
    >
      <motion.div
        layout
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ borderRadius: 50 }}
        animate={{ 
           borderRadius: 50,
           width: isOpen ? "auto" : "50px", 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="pointer-events-auto relative overflow-hidden shadow-2xl rounded-full"
      >
        <span className="absolute inset-[-1000%] animate-ray-spin" />
        <div className="h-full w-full p-[1.5px] rounded-full">
            <motion.div 
                layout
                className={`
                    relative h-11 flex items-center justify-center rounded-full transition-colors duration-300
                    backdrop-blur-xl
                    bg-[var(--nav-bg)] 
                    text-[var(--nav-text)]
                    
                    ${isOpen ? "px-6" : "px-0 w-11"} 
                `}
            >
                
                <motion.a 
                    layout
                    href="#"
                    className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center text-white font-bold font-display text-sm shadow-md"
                >
                    S
                </motion.a>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-4 md:gap-6 overflow-hidden ml-4 md:ml-6 whitespace-nowrap"
                        >
                            <ul className="flex items-center gap-4 md:gap-6">
                                {navLinks.map((item) => (
                                    <li key={item.name}>
                                        <a 
                                            href={item.link}
                                            className="text-xs md:text-sm font-medium transition-colors hover:text-[var(--nav-text-hover)]"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div className="hidden md:flex items-center gap-6">
                                <div className="h-4 w-[1px] bg-[var(--nav-border)]"></div>
                                <div className="flex items-center gap-3">
                                    <a href="https://github.com/Sambit-Kumar-Mohanty-26" target="_blank" className="hover:text-[var(--nav-text-hover)] transition-colors">
                                        <Github size={16} />
                                    </a>
                                    <a href="https://www.linkedin.com/in/sambit-kumar-mohanty-36b20234a/" target="_blank" className="hover:text-[var(--nav-text-hover)] transition-colors">
                                        <Linkedin size={16} />
                                    </a>
                                    <ThemeToggle />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </motion.div>
        </div>

      </motion.div>
        <div className="md:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
            <div className="relative group">
                <div className="absolute inset-[-1px] rounded-full overflow-hidden">
                    <span className="absolute inset-[-1000%] animate-ray-spin" />
                </div>
                
                <div className="relative flex items-center gap-8 px-8 py-3 rounded-full bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--nav-border)] shadow-2xl">
                <a href="https://github.com/Sambit-Kumar-Mohanty-26" target="_blank" className="text-[var(--nav-text)] hover:text-purple-500 transition-colors">
                    <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/sambit-kumar-mohanty-36b20234a/" target="_blank" className="text-[var(--nav-text)] hover:text-blue-500 transition-colors">
                    <Linkedin size={20} />
                </a>
                <div className="h-4 w-[1px] bg-[var(--nav-border)]"></div>
                <ThemeToggle />
                </div>
            </div>
        </div>
    </div>
  );
}