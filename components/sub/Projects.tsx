'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: "The Artisan's Loom",
    category: "Cultural Heritage • E-Commerce",
    description: "An AI-powered digital marketplace designed to empower Indian artisans by connecting them with a global audience.",
    tech: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "Shadcn UI", "Google Gemini AI"],
    color: "#ff7b00",
    image: "/project1.png",
    link: "https://artisans-loom.vercel.app/",
    github: "https://github.com/Sambit-Kumar-Mohanty-26/Artisans-Loom"
  },
  {
    title: "Eco-Oracle",
    category: "GeoSpatial AI • ReFi(Regenerative Finance)",
    description: "An AI-driven environmental verification platform that fuses multi-spectral satellite imagery, LIDAR depth analysis, and blockchain technology to autonomously audit forests and mint verified Carbon Credit NFTs.",
    tech: ["Next.js", "Python", "Sepolia", "MongoDB", "Verbwire API"],
    color: "#00f0ff",
    image: "/project21_v3.png",
    link: "https://eco-oracle.vercel.app/",
    github: "https://github.com/Sambit-Kumar-Mohanty-26/Eco-Oracle"
  },
  {
    title: "Axion Flow",
    category: "Open Source • Tooling",
    description: "Axion Flow is the AI command center for your factory, transforming operational chaos into predictable, optimized workflow.",
    tech: ["TypeScript", "Express.js", "Tailwind CSS", "TensorFlow.js", "Socket.io", "PostgreSQL"],
    color: "#bd24ff",
    image: "/project3_V2.png",
    link: "https://axion-flow.vercel.app/",
    github: "https://github.com/Sambit-Kumar-Mohanty-26/Axion-Flow"
  },
  {
    title: "Obsidian Vault",
    category: " Cryptography • End-to-End Security",
    description: "Obsidian Market is the zero-knowledge command center for digital assets, transforming raw data into secure, tradeable, and encrypted collectibles..",
    tech: ["Next.js", "Solidity", "Ethers.js", "IPFS", "AES-256-GCM"],
    color: "#84cc16",
    image: "/ProjectVersion4_v2.png",
    link: "https://secure-ipfs-marketplace.vercel.app/",
    github: "https://github.com/Sambit-Kumar-Mohanty-26/Secure-IPFS-Marketplace"
  },
  {
    title: "DevOptic",
    category: "Productivity • Collaboration",
    description: "DevOptic transforms how developers and designers review code. It eliminates screen-sharing fatigue by providing a shared, interactive browser where you can debug, draw, and navigate together in real-time.",
    tech: ["Next.js", "Express.js", "Socket.io", "WebRTC", "Fabric.js"],
    color: "#ec4899",
    image: "/Project43_v5.png",
    link: "https://dev-optic.vercel.app/",
    github: "https://github.com/Sambit-Kumar-Mohanty-26/DevOptic"
  },
];

function Card({ i, project, progress, range, targetScale }: any) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-start justify-center sticky top-0 px-4 pt-4">
      <motion.div
        style={{
          scale,
          top: `calc(40px + ${i * 25}px)`,
        }}
        className="relative flex flex-col w-full max-w-[1100px] h-auto max-h-[90vh] md:h-[550px] origin-top shadow-2xl rounded-[30px]"
      >
        <div className="relative w-full h-full rounded-[30px] p-[1.5px] overflow-hidden bg-transparent">
          
          <div
            className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite]"
            style={{
              background: `conic-gradient(from 90deg at 50% 50%, #00000000 50%, ${project.color} 100%)`
            }}
          />

          <div className="relative h-full w-full rounded-[29px] bg-white dark:bg-[#0c0c0c] flex flex-col md:flex-row p-5 md:p-12 gap-4 md:gap-10 overflow-hidden">

            <div className="relative w-full h-[180px] sm:h-[220px] md:h-full md:flex-1 rounded-2xl overflow-hidden bg-gray-100 dark:bg-white/5 border border-black/5 dark:border-white/5 group order-1 md:order-2 flex-shrink-0">
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 dark:bg-black/40 pointer-events-none" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-center md:object-left-top transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="w-full md:w-[45%] flex flex-col justify-between relative z-20 order-2 md:order-1 pb-2 md:pb-0">
              <div className="space-y-3 md:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md w-fit">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
                    style={{ backgroundColor: project.color, color: project.color }}
                  ></div>
                  <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-600 dark:text-gray-300">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-2xl md:text-5xl font-bold tracking-tighter text-black dark:text-white leading-tight">
                  {project.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-lg leading-relaxed line-clamp-3 md:line-clamp-none">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className="text-[9px] md:text-[11px] font-mono font-medium px-2 py-0.5 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4 md:pt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-[11px] md:text-sm transition-transform active:scale-95 shadow-md"
                >
                  Visit Site <ExternalLink size={12} />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 md:p-3 rounded-full border border-black/10 dark:border-white/10 text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                >
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
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
    <div ref={container} id="projects" className="relative mt-12 md:mt-20 mb-12 md:mb-32">
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 mb-8 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
        >
            <h2 className="text-7xl font-bold text-foreground tracking-tighter text-black dark:text-white">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">Works</span>
            </h2>
            <p className="text-gray-400 mt-4 text-xl">Crafting digital perfection, pixel by pixel.</p>
        </motion.div>
      </div>

      <div className="relative">
        {projects.map((project, i) => {
          const targetScale = 1 - ((projects.length - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </div>
  );
}