'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Mail, FileText, Layers, Cpu, Blocks, Terminal } from 'lucide-react';

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseTime = 2000;

  useEffect(() => {
    const currentWord = words[index];
    const handleTyping = () => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }
      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % words.length);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, index, words]);

  return (
    <span className="inline-block min-w-[320px] text-left">
      {text}
      <span className="animate-blink ml-1 text-purple-600 dark:text-purple-500 font-bold">|</span>
    </span>
  );
};

const LevitatingNode = ({ icon: Icon, text, color, className, delay, mouseX, mouseY }: any) => {
  
  const x = useTransform(mouseX, [-0.5, 0.5], [-20, 20]); 
  const y = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const styles: any = {
    purple: { 
      bgLight: "bg-purple-100 text-purple-600",
      borderLight: "border-purple-200",
      shadowLight: "shadow-[0_4px_20px_-2px_rgba(168,85,247,0.4)]",
      textLight: "text-gray-800",
      dotLight: "bg-purple-500",
      bgDark: "dark:bg-white/5",
      borderDark: "dark:border-purple-500/50",
      glowDark: "dark:shadow-[0_0_30px_-5px_rgba(168,85,247,0.5)]",
      textDark: "dark:text-purple-200"
    },
    orange: { 
      bgLight: "bg-orange-100 text-orange-600",
      borderLight: "border-orange-200",
      shadowLight: "shadow-[0_4px_20px_-2px_rgba(249,115,22,0.4)]",
      textLight: "text-gray-800",
      dotLight: "bg-orange-500",
      bgDark: "dark:bg-white/5",
      borderDark: "dark:border-orange-500/50",
      glowDark: "dark:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)]",
      textDark: "dark:text-orange-200"
    },
    cyan: { 
      bgLight: "bg-cyan-100 text-cyan-600",
      borderLight: "border-cyan-200",
      shadowLight: "shadow-[0_4px_20px_-2px_rgba(6,182,212,0.4)]",
      textLight: "text-gray-800",
      dotLight: "bg-cyan-500",
      bgDark: "dark:bg-white/5",
      borderDark: "dark:border-cyan-500/50",
      glowDark: "dark:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)]",
      textDark: "dark:text-cyan-200"
    },
  };
  const style = styles[color];

  return (
    <motion.div
        style={{ x, y }} 
        className={`absolute z-30 ${className}`}
    >
        <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: delay }}
        >
            <motion.div
                animate={{ width: [60, 200, 200, 60] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.1, 0.6, 0.7], delay: delay }}
                className={`
                    relative h-14 rounded-full flex items-center overflow-hidden
                    backdrop-blur-xl border
                    
                    /* LIGHT MODE STYLES */
                    bg-white/90 ${style.borderLight} ${style.shadowLight}
                    
                    /* DARK MODE STYLES */
                    dark:bg-[#0a0a0a]/90 ${style.borderDark} ${style.glowDark}
                `}
            >
                <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center z-20">
                    <div className={`
                        p-2 rounded-full transition-colors duration-300
                        ${style.bgLight} 
                        ${style.bgDark} dark:text-white
                    `}>
                        <Icon size={22} />
                    </div>
                </div>

                <motion.div
                    className="flex flex-col justify-center pl-16 pr-4 w-full h-full"
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 8, repeat: Infinity, times: [0, 0.15, 0.55, 0.7], delay: delay }}
                >
                   <span className="text-[9px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold leading-none mb-0.5">Expertise</span>
                   <span className={`text-sm font-bold whitespace-nowrap ${style.textLight} ${style.textDark}`}>
                     {text}
                   </span>
                </motion.div>

                <div className={`
                    absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full animate-pulse
                    ${style.dotLight} dark:${style.dotLight}
                `} />

            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default function Hero() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  return (
    <section 
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex items-center justify-center pt-32 pb-20 overflow-hidden px-4"
    >
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">

        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 z-20">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2 shadow-sm dark:shadow-lg backdrop-blur-sm"
          >
             <Terminal size={14} className="text-purple-600 dark:text-purple-400" />
             <span>Building V 3.0 of the Web</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.1] tracking-tight text-gray-900 dark:text-white"
          >
            Hi, I'm <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-purple-600 to-cyan-500 animate-gradient bg-300%">
              Sambit.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="h-20 md:h-24 text-2xl md:text-4xl font-bold flex flex-col items-center lg:items-start justify-start text-gray-800 dark:text-slate-200"
          >
            <span className="text-lg md:text-xl font-medium text-gray-500 dark:text-slate-400 mb-2">I specialize in</span>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 font-mono">
               <Typewriter words={["Full Stack Development", "Blockchain Engineering", "SaaS Architecture"]} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="max-w-xl text-lg md:text-xl leading-relaxed font-medium text-gray-600 dark:text-slate-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />
            
            From crafting secure <span className="text-purple-600 dark:text-purple-400 font-bold">Smart Contracts</span> to architecting high-performance <span className="text-cyan-600 dark:text-cyan-400 font-bold">SaaS platforms</span>, I build the <span className="text-gray-900 dark:text-white font-bold border-b-2 border-orange-500">future of the web</span>.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-6 pt-4 w-full sm:w-auto"
          >
            <a href="#contact" className="group">
              <button className="relative w-full sm:w-48 h-14 rounded-full bg-gradient-to-r from-orange-500 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
                <span className="flex items-center justify-center gap-3">
                  <Mail className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
                  Contact Me 
                </span>
              </button>
            </a>
            
            <a href="/resume.pdf" target="_blank" className="group">
              <div className="relative w-full sm:w-48 h-14 p-[2px] rounded-full bg-gradient-to-r from-orange-500 to-purple-600">
                 <button className="w-full h-full rounded-full bg-white dark:bg-black text-gray-900 dark:text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-transparent hover:text-white transition-colors duration-300">
                    <FileText className="w-5 h-5" /> Resume
                 </button>
              </div>
            </a>
          </motion.div>
        </div>

        <div className="relative flex justify-center lg:justify-end mt-16 lg:mt-0 h-[600px] w-full perspective-1000">
          
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative w-full h-full flex items-center justify-center transform-style-3d"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-tr from-purple-400/30 to-blue-400/30 dark:from-purple-600/30 dark:to-blue-600/30 rounded-full blur-[100px]" />
            
            <motion.div
               animate={{ y: [-15, 15, -15] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="relative z-20 w-[380px] h-[380px] md:w-[500px] md:h-[500px]"
            >
               <Image
                 src="/avatar.png"
                 alt="Sambit Avatar"
                 fill
                 className="object-contain drop-shadow-2xl"
                 priority
               />
            </motion.div>

            <LevitatingNode 
               icon={Layers} 
               text="Full Stack Dev" 
               color="purple" 
               className="top-[10%] left-[-5%] lg:-left-[10%]" 
               delay={0}
               mouseX={mouseXSpring}
               mouseY={mouseYSpring}
            />

            <LevitatingNode 
               icon={Blocks} 
               text="Blockchain Eng." 
               color="orange" 
               className="top-[40%] right-[-5%] lg:-right-[15%]" 
               delay={2}
               mouseX={mouseXSpring}
               mouseY={mouseYSpring}
            />

            <LevitatingNode 
               icon={Cpu} 
               text="SaaS Architect" 
               color="cyan" 
               className="bottom-[15%] left-[5%] lg:-left-[5%]" 
               delay={4}
               mouseX={mouseXSpring}
               mouseY={mouseYSpring}
            />

          </motion.div>
        </div>
        
      </div>
    </section>
  );
}