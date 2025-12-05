'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "The Artisan's Loom",
    category: "Full Stack • E-Commerce",
    description: "Empowering artisans with AI-powered discovery tools & voice listings.",
    color: "#ff7b00", 
    border: "from-orange-500 via-yellow-500 to-orange-500",
    image: "/project1.png",
    link: "#"
  },
  {
    title: "Phoenix - AI Chat",
    category: "AI • Realtime Sockets",
    description: "Gemini-powered chat with history, code syntax highlighting & memory.",
    color: "#00f0ff", 
    border: "from-cyan-400 via-blue-500 to-cyan-400",
    image: "/project2.png",
    link: "#"
  },
  {
    title: "Code Snapper",
    category: "Open Source • Tooling",
    description: "Generate beautiful code snippets. Export as SVG/PNG with 12+ themes.",
    color: "#bd24ff", 
    border: "from-purple-500 via-pink-500 to-purple-500",
    image: "/project3.png",
    link: "#"
  },
  {
    title: "Taskify - SaaS",
    category: "Productivity • Next.js",
    description: "A collaborative task manager with Drag & Drop boards, real-time analytics, and team workspaces.",
    color: "#84cc16", 
    border: "from-lime-400 via-green-500 to-lime-400",
    image: "/project4.png", 
    link: "#"
  },
];

function Card({ i, project, progress, range }: any) {
  const container = useRef(null);
  const filter = useTransform(progress, range, ["brightness(100%)", "brightness(50%)"]); 
  const opacity = useTransform(progress, range, [1, 0.8]); 
  const topOffset = `calc(120px + ${i * 50}px)`;

  return (
    <div ref={container} className="flex justify-center sticky" style={{ top: topOffset }}>
      <motion.div 
        style={{ filter, opacity, zIndex: i }} 
        className="relative flex flex-col w-[1000px] h-[500px] origin-top"
      >
        <div className={`absolute inset-0 rounded-4xl bg-linear-to-r ${project.border} p-px shadow-[0_0_40px_-15px_rgba(255,255,255,0.1)]`}>
            <div className="relative h-full w-full bg-[#080808] rounded-[31px] overflow-hidden flex flex-col md:flex-row gap-8 pl-10 pr-4 py-8 z-20">
                <div className="w-full md:w-[45%] flex flex-col justify-between pt-4">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6 w-fit shadow-lg">
                            <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: project.color, color: project.color }}></div>
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-300">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                            {project.title}
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-4">
                            {project.description}
                        </p>
                    </div>
                    <div className="flex gap-4 mt-8">
                        <a href={project.link} className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-shadow">
                            VISIT SITE 
                            <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        </a>
                        <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white hover:bg-white/10 hover:border-white transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>
                <div className="flex-1 relative h-full rounded-2xl overflow-hidden border border-white/5 bg-linear-to-br from-gray-900 to-black mx-4 md:mr-2 group">
                    <div className="absolute inset-0 hover:scale-105 transition-transform duration-700">
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-60"></div>
                </div>

            </div>
        </div>

        <div 
           className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-[150px] opacity-20 pointer-events-none -z-10"
           style={{ backgroundColor: project.color }}
        ></div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={container} id="projects" className="relative mt-20 mb-32">
      
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-purple-900/5 to-transparent blur-3xl -z-10"></div>
      <div className="container mx-auto px-4 mb-20 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
            <h2 className="text-7xl font-bold text-white tracking-tighter">
                Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500">Works</span>
            </h2>
            <p className="text-gray-400 mt-4 text-xl">Crafting digital perfection, pixel by pixel.</p>
        </motion.div>
      </div>

      <div className="w-full relative z-10 text-white" style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, i) => {
          return (
            <Card 
              key={i} 
              i={i} 
              project={project} 
              progress={scrollYProgress}
              range={[i / projects.length, (i + 1) / projects.length]}
            />
          );
        })}
      </div>
      
    </div>
  );
}