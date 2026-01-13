import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const SlowStars = () => {
    const starsRef = useRef<any>(null);
    useFrame((state) => {
        if(starsRef.current) {
            starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.01;
            starsRef.current.rotation.x = state.clock.getElapsedTime() * 0.005;
        }
    })
    return (
        <group ref={starsRef}>
            <Stars 
                radius={200} 
                depth={50} 
                count={5000} 
                factor={4} 
                saturation={0} 
                fade 
                speed={1} 
            />
        </group>
    )
}

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-dark">
      <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, powerPreference: "high-performance" }}>
        {/* Warm fog for depth - Deep Brown/Black */}
        <fog attach="fog" args={['#0c0a09', 10, 40]} />
        
        <SlowStars />
        
        {/* Minimal Ambient Light */}
        <ambientLight intensity={0.1} />
        
        {/* Subtle Background Gradients - Gold and Neutral */}
        <pointLight position={[50, 50, 50]} intensity={0.3} color="#d97706" /> {/* Amber */}
        <pointLight position={[-50, -50, -50]} intensity={0.2} color="#ffffff" /> {/* White/Neutral instead of Red */}
        
      </Canvas>
      {/* Vignette Overlay for focus */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0c0a09_100%)] opacity-70" />
    </div>
  );
};

export default Background3D;