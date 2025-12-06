'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from '@/components/sub/Preloader';
import StarBackground from '@/components/sub/StarBackground';
import Navbar from '@/components/sub/Navbar';
import Hero from '@/components/sub/Hero';
import TechStack from '@/components/sub/TechStack';
import About from '@/components/sub/About';
import Cursor from '@/components/ui/Cursor';
import Projects from '@/components/sub/Projects';
import Contact from '@/components/sub/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen w-full bg-black text-white relative selection:bg-purple-500/30">
      <Cursor />
      <AnimatePresence mode='wait'>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full"> 
           
           <StarBackground />
           <Navbar />
    
           <div className="flex flex-col gap-0">
             <Hero />
             <TechStack />
             <About />
             <Projects />
             <Contact /> 
           </div>

        </div>
      )}
      
    </main>
  );
}