'use client';
import { motion } from 'framer-motion';

const technologies = [
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/default" },
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Express.js", icon: "https://cdn.simpleicons.org/express/default" },
  { name: "FastAPI", icon: "https://cdn.simpleicons.org/fastapi/009688" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonaws/232F3E" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/default" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker/2496ED" },
];

// Duplicate items to ensure seamless infinite scrolling
const items = [...technologies, ...technologies];

export default function TechStack() {
  return (
    <section className="py-24 overflow-hidden relative z-20 group">
      <div className="container mx-auto px-4 mb-12 text-center relative">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           className="text-3xl md:text-4xl font-bold text-foreground inline-block"
        >
          My Tech Stack
          <div className="w-full h-1 bg-linear-to-r from-transparent via-purple-500 to-transparent mt-2"></div>
        </motion.h2>
      </div>

      <div className="relative flex w-full overflow-hidden py-8">
        <motion.div
          className="flex gap-12 items-center whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          whileHover={{ animationPlayState: "paused" }} 
        >
          {items.map((tech, index) => (
            <div 
                key={index} 
                className="flex flex-col items-center gap-4 group/item cursor-pointer"
            >
              <div className="relative w-20 h-20 flex items-center justify-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/10 group-hover/item:border-purple-500 transition-all duration-300 shadow-lg dark:shadow-none">
                <img 
                    src={tech.icon} 
                    alt={tech.name} 
                    className="w-10 h-10 object-contain" 
                />
              </div>
              
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover/item:text-purple-500 transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </motion.div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r from-white dark:from-black to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l from-white dark:from-black to-transparent z-10"></div>
      </div>
    </section>
  );
}