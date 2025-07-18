// src/components/AIHologram.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, useGLTF, Html } from '@react-three/drei';

const Model = () => {
  const gltf = useGLTF('/models/robot.glb'); // Ensure you have the model in public/models
  return <primitive object={gltf.scene} scale={2} />;
};

function AIHologram() {
  return (
    <div className='w-full h-[400px] lg:w-[40%]'>
      <Canvas style={{ filter: 'drop-shadow(0 0 20px #30a9ff)' }}>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Html>Loading...</Html>}>
          <Float speed={1.5} rotationIntensity={1}>
            <Model />
          </Float>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default AIHologram;
