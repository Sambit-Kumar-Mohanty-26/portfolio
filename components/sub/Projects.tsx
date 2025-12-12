'use client';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "The Artisan's Loom",
    category: "Cultural Heritage • E-Commerce",
    description: "An AI-powered digital marketplace designed to empower Indian artisans by connecting them with a global audience.",
    tech: ["React", "Stripe", "Firebase", "Google Cloud AI", "AR.js"],
    color: "#ff7b00", 
    image: "/project1.png",
    link: "#"
  },
  {
    title: "ResuPlex",
    category: "EdTech • Productivity",
    description: "An intelligent resume builder that leverages Generative AI to help users craft perfectly tailored, ATS-friendly resumes.",
    tech: ["TypeScript", "Express", "PostgreSQL", "Puppeteer", "Prisma"],
    color: "#00f0ff", 
    image: "/project2.png",
    link: "#"
  },
  {
    title: "Axion Flow",
    category: "Open Source • Tooling",
    description: "Axion Flow is the AI command center for your factory, transforming operational chaos into predictable, optimized workflow.",
    tech: ["TypeScript", "Tailwind CSS", "Shadcn UI", "Socket.io"],
    color: "#bd24ff", 
    image: "/project3_V2.png", 
    link: "#"
  },
  {
    title: "Project SAMARTH",
    category: "Governance • Analytics",
    description: "A Smart Analytics Dashboard specifically designed for Police Good Work Recognition and performance visualization.",
    tech: ["TypeScript", "Tailwind CSS", "Recharts", "Leaflet Maps"],
    color: "#84cc16", 
    image: "/project4.png", 
    link: "#"
  },
];

function Card({ i, project, progress, range }: any) {
  const container = useRef(null);
  const isLast = i === projects.length - 1;
  const targetScale = isLast ? 1 : 0.90;
  const targetOpacity = isLast ? 1 : 0.8;
  const targetBrightness = isLast ? "brightness(100%)" : "brightness(75%)";
  const filter = useTransform(progress, range, ["brightness(100%)", targetBrightness]); 
  const opacity = useTransform(progress, range, [1, targetOpacity]); 
  const scale = useTransform(progress, range, [1, targetScale]);
  const topOffset = `calc(120px + ${i * 50}px)`;
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    x.set(clientX - left);
    y.set(clientY - top);
  }

  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`;

  return (
    <div className="flex justify-center sticky" style={{ top: topOffset }}>
      <motion.div 
        style={{ filter, opacity, scale, zIndex: i }} 
        className="relative flex flex-col w-[1000px] h-[500px] origin-top perspective-1000"
      >
        <div 
            onMouseMove={handleMouseMove}
            className="group relative w-full h-full rounded-[31px] p-px overflow-hidden bg-[#1a1a1a]"
        >
            <div 
                className="absolute -inset-full animate-[spin_4s_linear_infinite] opacity-100" 
                style={{ 
                    background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${project.color} 100%)` 
                }}
            />

            <div className="relative h-full w-full rounded-[30px] bg-[#080808] overflow-hidden flex flex-col md:flex-row gap-8 pl-10 pr-4 py-8 z-10">
                <motion.div 
                    className="absolute inset-0 pointer-events-none mix-blend-overlay"
                    style={{ background: spotlight }}
                />

                <div className="w-full md:w-[45%] flex flex-col justify-between pt-2 relative z-20">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-4 w-fit shadow-lg">
                            <div className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: project.color, color: project.color }}></div>
                            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-300">
                                {project.category}
                            </span>
                        </div>

                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-[1.1] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                            {project.title}
                        </h3>

                        <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-4 transition-colors mb-6">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech: string, index: number) => (
                                <span 
                                    key={index}
                                    className="px-3 py-1 text-[11px] font-mono font-medium rounded-full bg-white/5 border border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                    </div>
                    
                    <div className="flex gap-4 mt-2">
                        <a href={project.link} className="relative overflow-hidden group/btn flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-sm tracking-wide transition-all hover:scale-105">
                            <span className="relative z-10 flex items-center gap-2">
                                VISIT SITE <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                            </span>
                            <div className="absolute inset-0 bg-linear-to-r from-cyan-400 to-purple-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                        </a>
                        <a href="#" className="flex items-center justify-center w-12 h-12 rounded-full border border-white/10 text-white hover:bg-white/10 hover:border-white transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="flex-1 relative h-full rounded-2xl overflow-hidden border border-white/5 bg-black mx-4 md:mr-2 group/image">
                    <motion.div 
                        className="absolute inset-0 transition-transform duration-700 group-hover/image:scale-105"
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-left opacity-100 transition-opacity duration-500" 
                        />
                    </motion.div>
                    
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-size-[100%_4px] opacity-10 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent opacity-60 pointer-events-none"></div>
                </div>

            </div>
        </div>        
        <div 
           className="absolute -top-10 -right-10 w-96 h-96 rounded-full blur-[150px] opacity-10 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none -z-10"
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
            <h2 className="text-7xl font-bold text-foreground tracking-tighter">
                Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-cyan-500">Works</span>
            </h2>
            <p className="text-gray-400 mt-4 text-xl">Crafting digital perfection, pixel by pixel.</p>
        </motion.div>
      </div>

      <div className="w-full relative z-10 text-white" style={{ height: `${projects.length * 80}vh` }}>
        {projects.map((project, i) => {
          const rangeStart = i * (1 / (projects.length - 1));
          const rangeEnd = (i + 1) * (1 / (projects.length - 1));

          return (
            <Card 
              key={i} 
              i={i} 
              project={project} 
              progress={scrollYProgress}
              range={[rangeStart, rangeEnd]} 
            />
          );
        })}
      </div>
    </div>
  );
}
