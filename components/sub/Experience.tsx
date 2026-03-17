'use client';

import React, { useRef, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useTransform,
  MotionValue,
} from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  GitMerge,
  Terminal,
  Code2,
  Database,
  Globe,
  Network,
  Zap,
  CheckCircle2,
  Copy,
  Clock,
} from 'lucide-react';

interface TechItem {
  name: string;
  icon: React.ReactNode;
  status: 'A' | 'M';
}

interface CommitTheme {
  accent: string;
  hex: string;
  glow: string;
}

interface CommitStats {
  insertions: number;
  deletions: number;
  files: number;
}

interface CommitData {
  sha: string;
  pointer: string;
  role: string;
  company: string;
  period: string;
  location: string;
  author: string;
  timestamp: string;
  stats: CommitStats;
  diffLog: string[];
  tech: TechItem[];
  theme: CommitTheme;
  domain: [number, number, number, number];
}

const REPOSITORY_LOG: CommitData[] =[
  {
    sha: 'c4f3d2a9',
    pointer: 'HEAD -> main, origin/main',
    role: 'Full Stack Developer Intern',
    company: 'WombTo18',
    period: 'Mar 2026 – Present',
    location: 'Pune, India',
    author: 'sys_admin',
    timestamp: 'Current Runtime',
    stats: { insertions: 14502, deletions: 230, files: 5 },
    diffLog:[
      '+ Architecting and developing robust full-stack features',
      '+ Ensuring seamless, high-performance user experiences',
      '+ Collaborating on core system design and architecture',
      '+ Shipping production-ready code in high-velocity sprints',
      '+ Building a modern, optimized architecture with efficient queries',
    ],
    tech:[
      { name: 'Next.js', icon: <Globe size={14} />, status: 'M' },
      { name: 'React', icon: <Code2 size={14} />, status: 'M' },
      { name: 'Node.js', icon: <Network size={14} />, status: 'A' },
      { name: 'MongoDB', icon: <Database size={14} />, status: 'A' },
      { name: 'Tailwind CSS', icon: <Zap size={14} />, status: 'M' },
    ],
    theme: {
      accent: 'purple',
      hex: '#a855f7',
      glow: 'rgba(168, 85, 247, 0.15)',
    },
    domain:[0.0, 0.15, 0.45, 0.6], 
  },
  {
    sha: '9b1e8a7f',
    pointer: 'feat/software-engineering',
    role: 'SDE Intern',
    company: 'noCnX Technologies',
    period: 'Feb 2026 – Mar 2026',
    location: 'Pune, India',
    author: 'sys_admin',
    timestamp: 'Archived Epoch',
    stats: { insertions: 8204, deletions: 105, files: 5 },
    diffLog:[
      '+ Collaborated closely with the core engineering team',
      '+ Built highly scalable and modular software solutions',
      '+ Optimized code architecture for peak runtime efficiency',
      '+ Successfully implemented complex new product features',
    ],
    tech:[
      { name: 'JavaScript', icon: <Code2 size={14} />, status: 'M' },
      { name: 'TypeScript', icon: <Code2 size={14} />, status: 'A' },
      { name: 'React', icon: <Code2 size={14} />, status: 'M' },
      { name: 'Node.js', icon: <Network size={14} />, status: 'M' },
      { name: 'PostgreSQL', icon: <Database size={14} />, status: 'A' },
    ],
    theme: {
      accent: 'cyan',
      hex: '#06b6d4',
      glow: 'rgba(6, 182, 212, 0.15)',
    },
    domain:[0.4, 0.55, 0.85, 1.0], 
  },
];

const usePointerTracking = (ref: React.RefObject<HTMLDivElement | null>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY, ref]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  }, [mouseX, mouseY]);

  return { mouseX, mouseY, handlePointerMove, handlePointerLeave };
};

const RefractionNoise = () => (
  <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay">
    <svg width="100%" height="100%">
      <filter id="crypto-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#crypto-noise)" />
    </svg>
  </div>
);

const CommitNode = ({
  commit,
  globalProgress,
}: {
  commit: CommitData;
  globalProgress: MotionValue<number>;
}) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const { mouseX, mouseY, handlePointerMove, handlePointerLeave } = usePointerTracking(nodeRef);

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, white, transparent 80%)`;
  const ambientGlow = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${commit.theme.glow}, transparent 70%)`;

  const copyHash = () => {
    navigator.clipboard.writeText(commit.sha);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const opacity = useTransform(globalProgress, commit.domain,[0, 1, 1, 0]);
  const y = useTransform(globalProgress, commit.domain, [-40, 0, 0, 40]);
  const scale = useTransform(globalProgress, commit.domain,[0.95, 1, 1, 0.95]);
  
  const branchScaleX = useTransform(globalProgress, commit.domain, [0, 1, 1, 0]);
  
  const blurValue = useTransform(globalProgress, commit.domain,[15, 0, 0, 15]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  const isVisible = useTransform(globalProgress, v => (v > commit.domain[0] && v < commit.domain[3]));
  const pointerEvents = useTransform(isVisible, v => (v ? 'auto' : 'none'));

  return (
    <motion.div 
      className="relative w-full flex pl-[60px] md:pl-[140px] group/commit" 
      style={{ perspective: 1200, opacity, pointerEvents }}
    >

      <div className="absolute left-[36px] md:left-[56px] top-12 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 border border-slate-400 dark:border-white/20 z-10" />

      <motion.div
        className="absolute left-[40px] md:left-[60px] top-[52px] h-[2px] w-[20px] md:w-[80px] origin-left z-0"
        style={{
          scaleX: branchScaleX,
          background: `linear-gradient(to right, ${commit.theme.hex}, transparent)`,
        }}
      />

      <motion.div
        ref={nodeRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative w-full z-20"
        style={{ y, scale, filter, transformStyle: 'preserve-3d' }}
      >
        <div className="relative w-full rounded-2xl md:rounded-3xl border border-slate-200/60 dark:border-white/[0.08] bg-white/70 dark:bg-black/40 backdrop-blur-2xl overflow-hidden shadow-xl dark:shadow-2xl">
          <RefractionNoise />

          <motion.div
            className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover/commit:opacity-100 transition-opacity duration-700 mix-blend-multiply dark:mix-blend-screen"
            style={{ background: ambientGlow }}
          />

          <motion.div
            className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover/commit:opacity-100 transition-opacity duration-500"
            style={{
              border: `1px solid ${commit.theme.hex}`,
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              borderRadius: 'inherit',
            }}
          />

          <div className="relative z-30 flex flex-col h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 border-b border-slate-200/60 dark:border-white/[0.05] bg-slate-50/50 dark:bg-white/[0.02]">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={copyHash}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-colors group/btn shadow-sm dark:shadow-none"
                >
                  <GitCommit size={14} className="text-slate-400" />
                  <span className="font-mono text-xs text-slate-700 dark:text-slate-300 font-medium">{commit.sha}</span>
                  {isCopied ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : (
                    <Copy size={12} className="text-slate-400 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  )}
                </button>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200/60 dark:border-white/[0.05] bg-transparent">
                  <GitBranch size={12} style={{ color: commit.theme.hex }} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {commit.pointer}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Clock size={12} /> {commit.period}</span>
              </div>
            </div>

            <div className="px-6 pt-6 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-slate-300 dark:bg-slate-700" />
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                  {commit.company}
                </span>
                <span className="font-mono text-[10px] text-slate-500">— {commit.location}</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                {commit.role}
              </h3>
            </div>

            <div className="px-6 py-4 bg-slate-50/80 dark:bg-black/20 border-y border-slate-200/60 dark:border-white/[0.05]">
              <div className="mb-3 flex items-center gap-4 font-mono text-[10px] text-slate-500 dark:text-slate-400">
                <span>Showing 1 changed file</span>
                <span className="flex items-center gap-2">
                  <span className="text-emerald-600 dark:text-emerald-400">+{commit.stats.insertions}</span>
                  <span className="text-rose-600 dark:text-rose-400">-{commit.stats.deletions}</span>
                </span>
              </div>

              <div className="font-mono text-xs md:text-sm flex flex-col gap-1">
                {commit.diffLog.map((log, i) => {
                  const isAddition = log.startsWith('+');
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-4 px-3 py-1.5 rounded-sm transition-colors ${
                        isAddition
                          ? 'bg-emerald-100/50 dark:bg-emerald-500/[0.05] text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100/50 dark:bg-rose-500/[0.05] text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      <span className="select-none opacity-50 w-4">{isAddition ? '+' : '-'}</span>
                      <span className="leading-relaxed">{log.substring(1).trim()}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 py-5">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
                Tracked Technologies
              </span>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {commit.tech.map((t, i) => (
                  <div
                    key={i}
                    className="group/tech flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 backdrop-blur-md transition-all cursor-default shadow-sm dark:shadow-none"
                  >
                    <span className="text-slate-400 dark:text-slate-400 group-hover/tech:text-slate-900 dark:group-hover/tech:text-white transition-colors">
                      {t.icon}
                    </span>
                    <span className="font-semibold text-xs text-slate-700 dark:text-slate-200">{t.name}</span>
                    <span
                      className={`ml-1 font-mono text-[9px] font-bold ${
                        t.status === 'A' ? 'text-emerald-600 dark:text-emerald-500' : 'text-blue-600 dark:text-blue-500'
                      }`}
                    >
                      [{t.status}]
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset:['start center', 'end center'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

  const dotY = useTransform(smoothProgress,[0, 1], ['0%', '100%']);
  
  const dotColor = useTransform(
    smoothProgress, [0, 0.45, 0.55, 1],['#a855f7', '#a855f7', '#06b6d4', '#06b6d4']
  );
  
  const dotGlow = useTransform(
    smoothProgress, [0, 0.45, 0.55, 1],[
      'rgba(168,85,247,0.5)', 'rgba(168,85,247,0.5)', 'rgba(6,182,212,0.5)', 'rgba(6,182,212,0.5)'
    ]
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-24 md:py-40 bg-transparent w-full overflow-hidden text-white"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
        
        <motion.div
          initial={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-24 md:mb-32 flex flex-col items-center justify-center text-center relative z-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-6 shadow-sm dark:shadow-none">
            <Terminal size={12} className="text-purple-500 dark:text-purple-400" />
            <span className="font-mono text-[10px] text-slate-600 dark:text-slate-300 uppercase tracking-widest">
              Execution Log
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-slate-900 dark:text-white leading-tight">
            Version{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#3B82F6] to-[#06B6D4]">
              History
            </span>
          </h2>
          
          <p className="mt-6 text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium tracking-wide">
            Crafting digital perfection, pixel by pixel.
          </p>
        </motion.div>

        <div className="relative w-full pb-32">
          <div className="absolute left-[39px] md:left-[59px] top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-white/10 z-0" />

          <motion.div 
            className="absolute left-[39px] md:left-[59px] top-0 bottom-0 w-[2px] origin-top z-10"
            style={{
              scaleY: smoothProgress,
              background: 'linear-gradient(to bottom, #a855f7, #3b82f6, #06b6d4)',
              boxShadow: '0 0 10px rgba(168,85,247,0.4)',
            }}
          />

          <motion.div
            className="absolute left-[34px] md:left-[54px] w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white dark:border-slate-950 z-30"
            style={{
              top: dotY,
              backgroundColor: dotColor,
              boxShadow: useMotionTemplate`0 0 20px 6px ${dotGlow}`,
            }}
          />

          <div className="relative flex flex-col gap-16 md:gap-32 w-full z-10">
            {REPOSITORY_LOG.map((commit) => (
              <CommitNode key={commit.sha} commit={commit} globalProgress={smoothProgress} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}