import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Grid } from '@react-three/drei';
import Spaceship from './Spaceship';
import Starfield from './Starfield';
import { ViewMode } from '../../types';

interface SceneViewerProps {
  mode: ViewMode;
  isRotating: boolean;
}

const SceneViewer: React.FC<SceneViewerProps> = ({ mode, isRotating }) => {
  return (
    <div className="w-full h-full bg-black">
      <Canvas shadows dpr={[1, 2]}>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[5, 3, 5]} fov={45} />
          
          {/* Lighting - Dramatic Space Lighting */}
          <ambientLight intensity={0.2} />
          {/* Key Light (Sun) */}
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2} 
            color="#fff" 
            castShadow 
          />
          {/* Rim Light (Blue) */}
          <spotLight 
            position={[-10, 0, -10]} 
            intensity={5} 
            color="#0ea5e9" 
            angle={0.5} 
            penumbra={1} 
          />
          {/* Bounce/Fill Light (Warm) */}
          <pointLight position={[0, -10, 0]} intensity={0.5} color="#d97706" />

          {/* Background & Environment */}
          <Starfield />
          
          {/* The Subject */}
          <group>
             <Spaceship />
          </group>

          {/* Tactical Grid (Only visible in Tactical Mode) */}
          {mode === ViewMode.TACTICAL && (
            <group position={[0, -1.5, 0]}>
               <Grid 
                 renderOrder={-1} 
                 position={[0, 0, 0]} 
                 infiniteGrid 
                 cellSize={1} 
                 sectionSize={5} 
                 fadeDistance={30} 
                 sectionColor="#0ea5e9" 
                 cellColor="#0ea5e9"
                 sectionThickness={1.5}
                 cellThickness={0.6}
               />
            </group>
          )}

          {/* Environment Reflections */}
          <Environment preset="city" blur={1} background={false} />

          {/* Controls */}
          <OrbitControls 
            enablePan={mode === ViewMode.TACTICAL} 
            enableZoom={true} 
            minDistance={3} 
            maxDistance={20}
            autoRotate={isRotating}
            autoRotateSpeed={0.5}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SceneViewer;