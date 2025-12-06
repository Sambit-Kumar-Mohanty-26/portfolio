'use client';

import React, { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";

const StarField = (props: any) => {
  const ref: any = useRef(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000*3), { radius: 1.2 })
  );

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
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
              <StarField />
            </Suspense>
            <Preload all />
          </Canvas>
      </div>
      <div className="hide-on-dark absolute inset-0 bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px]"></div>
      </div>

    </div>
  );
}