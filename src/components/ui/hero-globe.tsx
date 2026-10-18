"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Stars } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a procedural dot pattern for the globe
  const dots = useMemo(() => {
    const points = [];
    const count = 1200;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const x = Math.cos(theta) * Math.sin(phi);
      const y = Math.sin(theta) * Math.sin(phi);
      const z = Math.cos(phi);
      points.push(new THREE.Vector3(x, y, z).multiplyScalar(1.5));
    }
    return points;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {dots.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshBasicMaterial color="#c5a059" transparent opacity={0.6} />
        </mesh>
      ))}
      <Sphere args={[1.48, 64, 64]}>
        <meshBasicMaterial color="#c5a059" transparent opacity={0.05} wireframe />
      </Sphere>
    </group>
  );
}

export function HeroGlobe() {
  return (
    <div className="w-full h-full min-h-[500px] relative pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#c5a059" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <Globe />
        </Float>
      </Canvas>
      
      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
