'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function Cursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [touches, setTouches] = useState<{ id: number; x: number; y: number }[]>([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const dotSpring = { damping: 25, stiffness: 400, mass: 0.2 };
  const dotX = useSpring(mouseX, dotSpring);
  const dotY = useSpring(mouseY, dotSpring);
  const circleSpring = { damping: 20, stiffness: 150, mass: 0.8 };
  const circleX = useSpring(mouseX, circleSpring);
  const circleY = useSpring(mouseY, circleSpring);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsDesktop(true);
    }

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (['A', 'BUTTON', 'H1', 'SPAN', 'IMG'].includes(target.tagName)) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (window.matchMedia("(pointer: fine)").matches) return;
      
      const { clientX, clientY } = e.touches[0];
      const newTouch = { id: Date.now(), x: clientX, y: clientY };
      
      setTouches((prev) => [...prev, newTouch]);

      setTimeout(() => {
        setTouches((prev) => prev.filter((t) => t.id !== newTouch.id));
      }, 600);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', handleTouchStart);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) {
    return (
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        <AnimatePresence>
          {touches.map((touch) => (
            <motion.div
              key={touch.id}
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute rounded-full border-2 border-purple-500/50 dark:border-white/50 bg-purple-500/10 dark:bg-white/10"
              style={{
                left: touch.x,
                top: touch.y,
                width: 50,
                height: 50,
                x: "-50%",
                y: "-50%",
              }}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] 
                   bg-black dark:bg-white dark:mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 20 : 8,
          height: isHovering ? 20 : 8,
        }}
        transition={{ duration: 0.2 }}
      />

      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] 
                   bg-black/10 dark:bg-white dark:mix-blend-difference dark:opacity-80"
        style={{ x: circleX, y: circleY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHovering ? 150 : 60, 
          height: isHovering ? 150 : 60,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}