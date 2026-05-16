'use client';
import React from 'react';
import ProfileVisits from '@/components/ui/ProfileVisits';

const Footer = () => {
  return (
    <footer className="relative w-full py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Cinematic Video Container */}
        <div className="relative w-full h-[400px] md:h-[600px] rounded-[64px] overflow-hidden border border-black/10 dark:border-white/10 shadow-[0_0_50px_-12px_rgba(120,40,200,0.15)] dark:shadow-[0_0_50px_-12px_rgba(120,40,200,0.3)] group">
          
          {/* Background Video */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover brightness-90 dark:brightness-60 contrast-110 transition-transform duration-1000 group-hover:scale-105"
          >
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_171521_25968ba2-b594-4b32-aab7-f6b69398a6fa.mp4" type="video/mp4" />
          </video>

          {/* Inner Overlays for Depth */}
          <div className="absolute inset-0 bg-linear-to-t from-white/90 via-white/20 to-transparent dark:from-[#030014]/80 dark:via-transparent dark:to-transparent z-10" />
          <div className="absolute inset-0 bg-linear-to-b from-white/50 via-transparent to-transparent dark:from-[#030014]/40 dark:via-transparent dark:to-transparent z-10" />

          {/* Minimal Text inside the frame */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
             <div className="w-12 h-px bg-white/60 dark:bg-white/20 mb-6 transition-all duration-700 group-hover:w-24 group-hover:bg-purple-500 dark:group-hover:bg-purple-500/50" />
             <p className="text-white font-medium dark:font-light drop-shadow-lg dark:drop-shadow-none dark:text-white/40 text-[10px] tracking-[0.5em] uppercase transition-all duration-700 group-hover:text-white dark:group-hover:text-white group-hover:tracking-[0.7em]">Cinematic Vision</p>
          </div>
        </div>

        {/* Footer Signature below the frame */}
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-8 text-black/40 dark:text-white/20 text-[9px] tracking-[0.3em] uppercase font-bold">
           <div className="flex flex-col items-center md:items-start gap-2">
             <span>© 2025 Sambit Kumar Mohanty</span>
             <span className="text-[7px] text-black/30 dark:text-white/10 font-light tracking-[0.5em]">Crafting Digital Excellence</span>
           </div>

            <ProfileVisits />
           
           <div className="flex gap-10">
              <span className="hover:text-purple-500 transition-colors duration-500 cursor-default">Precision</span>
              <span className="hover:text-cyan-500 transition-colors duration-500 cursor-default">Elegance</span>
              <span className="hover:text-black dark:hover:text-white transition-colors duration-500 cursor-default">Innovation</span>
           </div>
        </div>
      </div>
      
      {/* Background Ambient Glows */}
      <div className="absolute -bottom-48 -left-48 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" />
    </footer>
  );
};

export default Footer;
