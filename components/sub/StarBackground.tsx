'use client';

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
const DarkStars = (props: any) => {
  const ref: any = useRef(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
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
  const [sphere1] = useState(() =>
    random.inSphere(new Float32Array(3000 * 3), { radius: 1.5 })
  );
  const [sphere2] = useState(() =>
    random.inSphere(new Float32Array(3000 * 3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    ref1.current.rotation.x -= delta / 10;
    ref1.current.rotation.y -= delta / 15;
    ref1.current.scale.x = 1 + Math.sin(t * 0.3) * 0.1;
    ref1.current.scale.y = 1 + Math.sin(t * 0.3) * 0.1;
    ref1.current.scale.z = 1 + Math.sin(t * 0.3) * 0.1;
    ref2.current.rotation.x += delta / 10;
    ref2.current.rotation.y += delta / 10;
    ref2.current.scale.x = 1 + Math.cos(t * 0.5) * 0.1;
    ref2.current.scale.y = 1 + Math.cos(t * 0.5) * 0.1;
    ref2.current.scale.z = 1 + Math.cos(t * 0.5) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref1} positions={sphere1} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>

      <Points ref={ref2} positions={sphere2} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.004}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.8}
        />
      </Points>

    </group>
  );
};

export default function StarBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-700">
      
      <div className="hide-on-light w-full h-full bg-black absolute inset-0">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <DarkStars />
            </Suspense>
            <Preload all />
          </Canvas>
      </div>
      
      <div className="hide-on-dark absolute inset-0 bg-white">
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}>
              <LightParticles />
            </Suspense>
            <Preload all />
          </Canvas>
      </div>

    </div>
  );
}