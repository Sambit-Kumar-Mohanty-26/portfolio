'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [text, setText] = useState("");
  const name = "SAMBIT";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setText(name.slice(0, index + 1));
      index++;

      if (index === name.length) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }} // Smooth "Bezier" curve slide up
    >
      <div className="flex flex-col items-center">
        <h1 className="text-6xl md:text-9xl font-extrabold text-white tracking-widest relative">
          {text}
          <span className="text-orange-600 animate-pulse">.</span>
        </h1>
        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 text-sm font-mono text-gray-400 tracking-[0.3em] uppercase"
        >
            Portfolio 2025
        </motion.p>
      </div>
    </motion.div>
  );
}