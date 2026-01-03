import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

// Draco 解码器路径 (Google CDN)
const DRACO_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';

interface SpaceshipProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Spaceship: React.FC<SpaceshipProps> = ({ 
  modelPath, 
  scale = 3.2, 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
   const group = useRef<Group>(null);
   // 使用传入的模型路径加载 GLB
   const { scene } = useGLTF(modelPath, DRACO_PATH);

   // Subtle hover + slow roll to keep the model alive.
   useFrame(({ clock }) => {
      if (!group.current) return;
      const t = clock.elapsedTime;
      group.current.position.y = position[1] + Math.sin(t * 0.5) * 0.2;
      group.current.rotation.y = rotation[1] + t * 0.1;
   });

   return (
      <primitive
         ref={group}
         object={scene}
         scale={scale}
         position={position}
         rotation={rotation}
         castShadow
         receiveShadow
         dispose={null}
      />
   );
};

export default Spaceship;