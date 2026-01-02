import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const Starfield = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const starsRef = useRef<THREE.Group>(null);
  
  // Load the galaxy texture. 
  // We use a high-res ESO image of the Carina Nebula which matches the "Fire & Ice" aesthetic.
  // You can replace this URL with your own image link.
  const texture = useLoader(THREE.TextureLoader, 'https://cdn.eso.org/images/screen/eso1137a.jpg');

  useFrame((state, delta) => {
    // Slow, majestic rotation of the entire universe background
    if (meshRef.current) {
      meshRef.current.rotation.y -= delta * 0.005;
    }
    
    // Parallax effect for the 3D stars layer
    if (starsRef.current) {
       starsRef.current.rotation.y -= delta * 0.01;
    }
  });

  return (
    <group>
      {/* 1. The Texture-Mapped Background Galaxy */}
      <mesh ref={meshRef}>
        {/* Large sphere to act as the skybox */}
        <sphereGeometry args={[120, 64, 64]} />
        <meshBasicMaterial 
          map={texture} 
          side={THREE.BackSide} 
          toneMapped={false} // Keep colors vivid
        />
      </mesh>

      {/* 2. Main Star Cluster (Preserved from previous background) */}
      <group ref={starsRef}>
        {/* Standard Starfield */}
        <Stars 
          radius={90} 
          depth={20} 
          count={5000} 
          factor={4} 
          saturation={0.5} 
          fade 
          speed={0.5} 
        />
        
        {/* Dense Blue Cluster Core */}
        <Sparkles 
          count={800}
          scale={40}
          size={3}
          speed={0.4}
          opacity={0.6}
          color="#aaddff"
          noise={10} 
        />
        
        {/* Scattered Red/Gold Particles */}
        <Sparkles 
          count={200}
          scale={50}
          size={4}
          speed={0.1}
          opacity={0.4}
          color="#ffaa88"
        />
      </group>
    </group>
  );
};

export default Starfield;