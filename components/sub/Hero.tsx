'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, FileText, Mail } from 'lucide-react';

export default function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["Full Stack Developer", "MERN Stack Specialist", "SaaS Architect"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden text-center z-20 px-4 pt-20">
      
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }} 
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-linear-to-tr from-purple-500 to-orange-500 rounded-full blur-[80px] opacity-20 dark:opacity-40 animate-pulse"></div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <Image
            src="/avatar.png"
            alt="Sambit Avatar"
            width={350}
            height={350}
            priority
            className="relative z-10 w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-2xl"
          />
        </motion.div>
      </motion.div>

      <div className="space-y-4 px-4 z-30">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground dark:text-white"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-500 to-purple-600">Sambit</span>
        </motion.h1>

        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium"
        >
          Building immersive digital experiences with clean code & modern design.
        </motion.p>
        
        <div className="h-8">
           <span className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-mono">
             I am a <span className="text-purple-500 font-bold">{text}</span>
             <span className="animate-pulse">|</span>
           </span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 flex flex-wrap justify-center gap-6 z-30"
      >
        
        <a href="#contact">
          <button className="relative w-48 h-14 rounded-full bg-linear-to-r from-orange-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-none">
            <span className="flex items-center justify-center gap-2">
              <Mail className="w-5 h-5" /> Contact Me 
            </span>
          </button>
        </a>
        
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
          <div className="relative w-48 h-14 p-0.5 rounded-full bg-linear-to-r from-orange-500 via-purple-600 to-orange-500 bg-size-[200%_auto] animate-gradient hover:scale-105 transition-transform duration-300">
             <button className="w-full h-full rounded-full bg-white dark:bg-black text-gray-900 dark:text-white font-bold text-lg relative group overflow-hidden flex items-center justify-center cursor-none">
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                   <FileText className="w-5 h-5" /> Resume
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
             </button>
          </div>
        </a>

      </motion.div>
    </section>
  );
}