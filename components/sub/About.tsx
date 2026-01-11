'use client';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Terminal, Github, Star, GitBranch, CalendarDays, ExternalLink } from 'lucide-react';

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Sambit-Kumar-Mohanty-26";

const customStyles = `
  @keyframes shine {
    0% { background-position: 200% center; }
    100% { background-position: -200% center; }
  }
  .silver-shimmer {
    background: linear-gradient(90deg, #6b7280 0%, #e5e7eb 45%, #ffffff 50%, #e5e7eb 55%, #6b7280 100%);
    background-size: 200% auto;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: shine 4s linear infinite;
  }
  .neon-text {
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    -webkit-background-clip: text;
    color: transparent;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
  }
  .card-flip-inner {
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .card-back {
    transform: rotateY(180deg);
  }
  .flipped {
    transform: rotateY(180deg);
  }
`;

function Counter({ value, label, icon: Icon }: { value: number; label: string; icon?: any }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(0, value, {
      duration: 2.5,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = Math.round(val).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="flex flex-col items-center p-4 bg-white/5 border border-black/5 dark:border-white/10 rounded-xl hover:bg-white/10 transition-colors group">
      {Icon && <Icon className="w-5 h-5 text-slate-500 dark:text-gray-400 group-hover:text-purple-500 mb-2 transition-colors" />}
      
      <span 
        ref={nodeRef} 
        className="text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-cyan-400 dark:to-blue-500" 
      />
      
      <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-gray-400 mt-1 font-semibold text-center">{label}</span>
    </div>
  );
}

export default function About() {
  const [stats, setStats] = useState({ repos: 0, followers: 0, stars: 0, contributions: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleToggleGraph = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);

    if (newFlippedState && typeof window !== 'undefined' && window.innerWidth < 768 && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 100);
    }
  };

  useEffect(() => {
    async function fetchRealStats() {
      try {
        const res = await fetch('/api/github-stats');
        const data = await res.json();

        if (data.error) throw new Error(data.error);

        setStats({
          repos: data.repos,
          followers: data.followers,
          stars: data.stars,
          contributions: data.contributions
        });

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    fetchRealStats();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ clientX, clientY, currentTarget }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    x.set((clientX - left) / width - 0.5);
    y.set((clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const brightness = useTransform(mouseY, [-0.5, 0.5], [1.2, 0.8]);

  return (
    <section id="about" className="min-h-screen relative flex flex-col items-center justify-center py-20 overflow-hidden">
      <style>{customStyles}</style>

      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-6 mb-12 relative z-10 text-center">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="text-4xl md:text-5xl font-bold text-foreground inline-block"
        >
          About Me
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2"></div>
        </motion.h2>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-10 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
             <h2 className="text-5xl font-extrabold mb-6 dark:text-white text-gray-900 leading-tight">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">SYSTEM STATUS:</span> 
               <br/> 
               <span className="inline-block text-green-500 animate-pulse drop-shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                 ● ONLINE
               </span>
             </h2>

             <div className="text-lg leading-relaxed font-mono font-bold dark:text-gray-300 text-gray-700">
               <span className="silver-shimmer">
                 Initiating protocol: FULL_STACK_DEV. <br/>
                 Fetching live data from GitHub Mainframe... <br/>
                 Subject is proficient in React ecosystems, secure backends, and creative development.
               </span>
             </div>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
             <Counter value={stats.repos} label="Projects" icon={Github} />
             <Counter value={stats.contributions} label="Total Contributions" icon={GitBranch} />
             <Counter value={stats.stars} label="Stars Earned" icon={Star} />
             <Counter value={stats.followers} label="Community" icon={Terminal} />
          </div>
          
          <div className="flex justify-center lg:justify-start">
             <button 
                onClick={handleToggleGraph}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-purple-500/30 hover:bg-purple-500/10 hover:border-purple-500 transition-all text-sm font-bold text-purple-400 uppercase tracking-widest shadow-lg"
             >
                <CalendarDays className="w-4 h-4" /> 
                {isFlipped ? "View ID Card" : "View Contribution Graph"}
             </button>
          </div>
        </div>

        <motion.div 
          ref={cardRef}
          className="perspective-1000 w-full h-[500px] flex justify-center order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            style={{ 
                rotateX, 
                rotateY, 
                filter: `brightness(${brightness})`,
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`
                relative w-80 h-[450px] transition-all duration-500 preserve-3d
            `}
          >
             <div className={`relative w-full h-full card-flip-inner ${isFlipped ? 'flipped' : ''}`}>
                 
                 <div className="card-front bg-gray-100 dark:bg-[#0a0a0a] border border-gray-300 dark:border-white/20 rounded-2xl shadow-2xl overflow-hidden group">
                     <div className="absolute top-0 w-full h-12 bg-gray-200/50 dark:bg-white/5 border-b border-gray-300 dark:border-white/10 flex items-center justify-between px-4 z-20">
                        <div className="flex gap-2">
                           <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-[10px] font-mono text-gray-500 dark:text-gray-400">
                          ID: {stats.repos > 0 ? "VERIFIED" : "LOADING..."}
                        </div>
                     </div>

                     <div className="absolute top-20 left-1/2 -translate-x-1/2 w-40 h-40 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center p-2 z-20">
                        <div className="w-full h-full relative rounded-full overflow-hidden border border-white/20 bg-black">
                            <Image src="/avatar.png" alt="ID Avatar" fill className="object-cover" />
                        </div>
                     </div>

                     <div className="absolute bottom-10 w-full px-8 space-y-4 z-20">
                        <div className="space-y-1">
                           <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Operative Name</div>
                           <div className="text-2xl font-bold neon-text tracking-widest font-mono">
                             SAMBIT
                           </div>
                        </div>
                        <div className="space-y-1">
                           <div className="text-xs text-gray-500 dark:text-gray-400 uppercase">Class</div>
                           <div className="flex items-center gap-2">
                               <Terminal className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                               <span className="font-mono text-sm text-gray-900 dark:text-white font-bold">
                                 Full Stack Eng.
                               </span>
                           </div>
                        </div>
                     </div>

                     <motion.div 
                       animate={{ top: ["0%", "100%", "0%"] }}
                       transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                       className="absolute left-0 w-full h-1 bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-10"
                     >
                        <div className="absolute top-0 w-full h-20 bg-gradient-to-b from-cyan-400/20 to-transparent"></div>
                     </motion.div>

                     <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none z-30"></div>
                 </div>


                 <div className="card-back bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-white/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col items-center justify-center p-4">
                     
                     <div className="absolute top-4 left-4 text-xs font-mono text-gray-500">
                        CONTRIBUTION_LOGS.JSON
                     </div>

                     <div className="w-full flex flex-col items-center gap-4">
                        <h3 className="text-sm font-bold text-gray-800 dark:text-white uppercase tracking-wider">
                           Yearly Activity
                        </h3>
                        
                        <div className="w-full overflow-hidden rounded-lg bg-white p-2 border border-gray-200">
                           <img 
                              src={`https://ghchart.rshah.org/409ba5/${GITHUB_USERNAME}`} 
                              alt="GitHub Contributions"
                              className="w-full"
                           />
                        </div>

                        <a 
                           href={`https://github.com/${GITHUB_USERNAME}`} 
                           target="_blank"
                           rel="noreferrer"
                           className="flex items-center gap-2 text-xs text-blue-500 hover:underline mt-2"
                        >
                           Visit Profile <ExternalLink size={12} />
                        </a>
                     </div>

                     <div className="absolute bottom-4 right-4 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                     <div className="absolute bottom-4 left-4 text-[10px] text-gray-400 font-mono">
                        ID: {new Date().getFullYear()}
                     </div>
                 </div>

             </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}