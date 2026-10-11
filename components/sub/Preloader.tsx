'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

// 1. THE FLYING BUTTERFLY
function FlyingButterfly({ onImpact }: { onImpact: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/butterfly.glb');
  const { actions } = useAnimations(animations, group);
  const [hasShattered, setHasShattered] = useState(false);

  useEffect(() => {
    // Play the flapping animation
    const actionName = Object.keys(actions)[0];
    if (actionName && actions[actionName]) {
      actions[actionName].play();
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (!group.current || hasShattered) return;
    
    // Fly directly towards the camera (Z axis)
    group.current.position.z += delta * 8; 
    
    // Add slight natural bobbing motion
    group.current.position.y += Math.sin(state.clock.elapsedTime * 10) * 0.02;

    // When it hits the camera (Z > 4.5), trigger the shatter
    if (group.current.position.z > 4.5) {
      setHasShattered(true);
      onImpact();
    }
  });

  if (hasShattered) return null; // Hide butterfly once it hits

  return (
    // Start far back in the screen (-8)
    <primitive ref={group} object={scene} position={[0, -1, -8]} scale={[1.5, 1.5, 1.5]} rotation={[0.2, -Math.PI / 4, 0]} />
  );
}

// 2. THE GLASS SHATTER EFFECT (Instanced Particles)
function GlassShards({ active }: { active: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const count = 150; // Number of glass shards

  // Generate random trajectories for the explosion
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 4.5), // Start at camera
        velocity: new THREE.Vector3((Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10),
        rotation: new THREE.Vector3(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        rotSpeed: new THREE.Vector3(Math.random() * 0.4, Math.random() * 0.4, Math.random() * 0.4),
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!active || !meshRef.current) return;
    
    // Animate each glass shard exploding outward
    particles.forEach((particle, i) => {
      particle.position.add(particle.velocity.clone().multiplyScalar(0.015));
      particle.rotation.add(particle.rotSpeed);
      
      dummy.position.copy(particle.position);
      dummy.rotation.set(particle.rotation.x, particle.rotation.y, particle.rotation.z);
      
      // Shrink shards as they fly away
      const scale = Math.max(0, 1 - (Math.abs(particle.position.x) + Math.abs(particle.position.y)) / 15);
      dummy.scale.setScalar(scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={active}>
      {/* Tetrahedron geometry looks exactly like sharp glass shards */}
      <tetrahedronGeometry args={[0.15, 0]} />
      <meshPhysicalMaterial 
        color="#ffffff" 
        transmission={0.9} 
        opacity={1} 
        metalness={0.1}
        roughness={0.1} 
        ior={1.5} 
        transparent 
      />
    </instancedMesh>
  );
}

// 3. THE 3D BENDING TEXT COMPONENT
function BendingText({ onTextComplete }: { onTextComplete: () => void }) {
  const text = "SAMBIT".split("");

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="flex gap-2 md:gap-4 text-[18vw] md:text-[14vw] font-black tracking-tighter text-[#030014] perspective-[1200px]">
        {text.map((char, index) => (
          <motion.span
            key={index}
            // Start heavily distorted, rotated, and scaled down
            initial={{ 
              opacity: 0, 
              rotateY: 90, 
              rotateX: 45, 
              z: -500,
              y: 100,
              scale: 0.3
            }}
            // Bend into perfect position
            animate={{ 
              opacity: 1, 
              rotateY: 0, 
              rotateX: 0,
              z: 0,
              y: 0, 
              scale: 1 
            }}
            transition={{ 
              duration: 1.4, 
              delay: index * 0.15, // Staggered curve effect
              type: "spring",
              bounce: 0.4
            }}
            // Only trigger the exit when the VERY LAST letter is done
            onAnimationComplete={() => {
              if (index === text.length - 1) {
                setTimeout(() => onTextComplete(), 500); // 0.5s pause to read it
              }
            }}
            className="inline-block origin-bottom transform-style-3d drop-shadow-2xl"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// 4. MAIN PRELOADER SEQUENCE
export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'flying' | 'shattered' | 'exit'>('flying');

  const handleImpact = () => {
    setPhase('shattered');
  };

  const handleTextComplete = () => {
    setPhase('exit');
    // Wait for the slide-up animation to finish, then unmount
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#f8fafc]"
      initial={{ y: "0%" }}
      animate={{ y: phase === 'exit' ? "-100%" : "0%" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Cinematic slide up
    >
      {/* The 3D Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
          <Environment preset="city" />
          
          <FlyingButterfly onImpact={handleImpact} />
          <GlassShards active={phase === 'shattered' || phase === 'exit'} />
        </Canvas>
      </div>

      {/* The Bending Text Sequence */}
      <AnimatePresence>
        {phase === 'shattered' && (
          <BendingText onTextComplete={handleTextComplete} />
        )}
      </AnimatePresence>

    </motion.div>
  );
}