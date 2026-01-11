'use client';

import React, { useState, useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { useTheme } from "next-themes";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const DarkStars = (props: any) => {
  const ref: any = useRef(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const LightParticles = (props: any) => {
  const ref1: any = useRef(null); 
  const ref2: any = useRef(null); 
  const [sphere1] = useState(() => random.inSphere(new Float32Array(3000 * 3), { radius: 1.5 }));
  const [sphere2] = useState(() => random.inSphere(new Float32Array(3000 * 3), { radius: 1.2 }));

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if(ref1.current && ref2.current) {
        ref1.current.rotation.x -= delta / 10;
        ref1.current.rotation.y -= delta / 15;
        ref2.current.rotation.x += delta / 10;
        ref2.current.rotation.y += delta / 10;
        const scale = 1 + Math.sin(t * 0.3) * 0.05;
        ref1.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref1} positions={sphere1} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#3b82f6" size={0.003} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
      </Points>
      <Points ref={ref2} positions={sphere2} stride={3} frustumCulled {...props}>
        <PointMaterial transparent color="#a855f7" size={0.004} sizeAttenuation={true} depthWrite={false} opacity={0.8} />
      </Points>
    </group>
  );
};

export default function StarBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = (theme === 'dark' || resolvedTheme === 'dark');

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-white'}`}>
       <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
          <Suspense fallback={null}>
             {isDark ? <DarkStars /> : <LightParticles />}
          </Suspense>
          <Preload all />
       </Canvas>
    </div>
  );
}