'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/ffffff" }, 
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Solidity", icon: "https://cdn.simpleicons.org/solidity/ffffff" },
  { name: "Hardhat", icon: "https://cdn.simpleicons.org/ethereum/FFF100" },
  { name: "Ethers.js", icon: "https://cdn.simpleicons.org/ethereum/2535a0" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/ffffff" }, 
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" }, 
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/ffffff" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
];

const items = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section className="py-24 overflow-hidden relative z-20">
      <div className="container mx-auto px-4 mb-12 text-center relative">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="inline-block"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            My Tech Stack
          </h2>
          <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mt-2"></div>
        </motion.div>
      </div>

      <div className="relative flex w-full overflow-hidden py-4 group">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>

        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 40 
          }}
          whileHover={{ animationPlayState: "paused" }} 
          style={{ willChange: "transform" }}
        >
          {items.map((tech, index) => (
            <div 
                key={index} 
                className="flex flex-col items-center gap-4 cursor-pointer min-w-[80px]"
            >
              <div className="relative w-20 h-20 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 hover:border-purple-500 transition-all duration-300 shadow-lg dark:shadow-none hover:scale-105">
                <div className="relative w-10 h-10">
                    <Image 
                        src={tech.icon} 
                        alt={tech.name} 
                        fill
                        sizes="40px"
                        className="object-contain"
                    />
                </div>
              </div>
              
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-purple-500 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}