import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

const Spaceship = () => {
   const group = useRef<Group>(null);
   const { scene } = useGLTF('/models/ship.glb');

   // Subtle hover + slow roll to keep the model alive.
   useFrame(({ clock }) => {
      if (!group.current) return;
      const t = clock.elapsedTime;
      group.current.position.y = Math.sin(t * 0.5) * 0.2;
      group.current.rotation.y = t * 0.1;
   });

   return (
      <primitive
         ref={group}
         object={scene}
         scale={2.5}
         position={[0, 0, 0]}
         castShadow
         receiveShadow
         dispose={null}
      />
   );
};

useGLTF.preload('/models/ship.glb');

export default Spaceship;