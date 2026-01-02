import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, Mesh } from 'three';

const Spaceship = () => {
  const shipRef = useRef<Group>(null);
  const engineRef = useRef<Mesh>(null);
  
  // Subtle hovering and engine pulsing
  useFrame((state) => {
    if (shipRef.current) {
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
    }
    if (engineRef.current) {
      // Pulse engine intensity
      const intensity = 1 + Math.sin(state.clock.elapsedTime * 10) * 0.2;
      (engineRef.current.material as any).emissiveIntensity = intensity;
    }
  });

  const hullColor = "#1a1a1e"; // Dark slate/black
  const detailColor = "#2d2d33"; // Slightly lighter
  const accentColor = "#d97706"; // Amber/Gold industrial accent
  const glowColor = "#0ea5e9"; // Cyan engine glow
  const windowColor = "#06b6d4";

  const MetallicMaterial = ({ color, roughness = 0.3 }: { color: string, roughness?: number }) => (
    <meshStandardMaterial 
      color={color} 
      roughness={roughness} 
      metalness={0.8} 
    />
  );

  return (
    <group ref={shipRef} dispose={null}>
      
      {/* --- CENTRAL HULL --- */}
      {/* Main Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 1.2, 5]} />
        <MetallicMaterial color={hullColor} />
      </mesh>

      {/* Front Nose (Tapered) */}
      <mesh position={[0, -0.1, 2.75]} rotation={[Math.PI / 2, 0, 0]}>
         <cylinderGeometry args={[0.2, 0.75, 1.5, 6]} />
         <MetallicMaterial color={detailColor} />
      </mesh>
      
      {/* Top Bridge/Superstructure */}
      <group position={[0, 0.8, -0.5]}>
         <mesh>
            <boxGeometry args={[0.8, 0.6, 2]} />
            <MetallicMaterial color={detailColor} roughness={0.4} />
         </mesh>
         {/* Bridge Windows */}
         <mesh position={[0, 0.1, 1.01]}>
             <planeGeometry args={[0.6, 0.2]} />
             <meshBasicMaterial color={windowColor} />
         </mesh>
      </group>

      {/* --- WINGS / SIDE PODS --- */}
      {/* Left Wing */}
      <group position={[-1.2, 0, -0.5]}>
        <mesh>
          <boxGeometry args={[1, 0.4, 3]} />
          <MetallicMaterial color={hullColor} />
        </mesh>
        <mesh position={[-0.55, 0, 0]}>
           <boxGeometry args={[0.2, 0.6, 2.5]} />
           <MetallicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* Right Wing */}
      <group position={[1.2, 0, -0.5]}>
        <mesh>
          <boxGeometry args={[1, 0.4, 3]} />
          <MetallicMaterial color={hullColor} />
        </mesh>
        <mesh position={[0.55, 0, 0]}>
           <boxGeometry args={[0.2, 0.6, 2.5]} />
           <MetallicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* --- ENGINES --- */}
      {/* Main Rear Thrusters */}
      <group position={[0, 0, -2.5]}>
         {/* Engine Housing */}
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.8, 0.5, 8]} />
            <MetallicMaterial color="#111" />
         </mesh>
         {/* Engine Glow Mesh */}
         <mesh ref={engineRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
             <circleGeometry args={[0.5, 16]} />
             <meshStandardMaterial 
                color={glowColor} 
                emissive={glowColor} 
                emissiveIntensity={2} 
                toneMapped={false} 
             />
         </mesh>
         {/* Engine Light Source */}
         <pointLight color={glowColor} intensity={2} distance={5} decay={2} position={[0, 0, -0.5]} />
      </group>

      {/* Side Thrusters L */}
      <group position={[-1.5, 0, -2]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.5, 8]} />
            <MetallicMaterial color="#111" />
         </mesh>
         <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
             <circleGeometry args={[0.25, 16]} />
             <meshBasicMaterial color={glowColor} />
         </mesh>
      </group>
      {/* Side Thrusters R */}
      <group position={[1.5, 0, -2]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.4, 0.5, 8]} />
            <MetallicMaterial color="#111" />
         </mesh>
         <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.05]}>
             <circleGeometry args={[0.25, 16]} />
             <meshBasicMaterial color={glowColor} />
         </mesh>
      </group>

      {/* --- DETAILS --- */}
      {/* Antenna Array */}
      <mesh position={[0.5, 1.1, -1]}>
         <cylinderGeometry args={[0.02, 0.02, 1.5, 4]} />
         <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
      </mesh>
       <mesh position={[-0.5, 1.1, -1.2]}>
         <cylinderGeometry args={[0.02, 0.02, 1.0, 4]} />
         <meshStandardMaterial color="#888" metalness={1} roughness={0.2} />
      </mesh>

      {/* Turrets */}
      <group position={[0, 0.6, 1.5]}>
         <mesh position={[0.4, 0, 0]} rotation={[0, 0.2, 0]}>
             <boxGeometry args={[0.2, 0.2, 0.8]} />
             <MetallicMaterial color="#333" />
         </mesh>
         <mesh position={[-0.4, 0, 0]} rotation={[0, -0.2, 0]}>
             <boxGeometry args={[0.2, 0.2, 0.8]} />
             <MetallicMaterial color="#333" />
         </mesh>
      </group>

    </group>
  );
};

export default Spaceship;