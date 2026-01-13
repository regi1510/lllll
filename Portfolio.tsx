import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, PanInfo, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';
import ProjectFlipCard from './ProjectFlipCard';
import { Canvas } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';

const projects = [
  {
    title: "Neon Finance",
    category: "Fintech",
    image: "https://picsum.photos/800/1000?random=1",
    description: "A real-time cryptocurrency dashboard featuring advanced data visualization using D3.js and WebSockets.",
    link: "https://example.com"
  },
  {
    title: "Aether Store",
    category: "E-Commerce",
    image: "https://picsum.photos/800/1000?random=2",
    description: "Headless Shopify storefront built with Next.js, featuring 3D product previews and instant search.",
    link: "https://example.com"
  },
  {
    title: "Orbit AI",
    category: "SaaS",
    image: "https://picsum.photos/800/1000?random=3",
    description: "AI-powered content generation tool designed for marketing teams with collaborative workspaces.",
    link: "https://example.com"
  },
  {
    title: "Zenith Health",
    category: "Wellness",
    image: "https://picsum.photos/800/1000?random=4",
    description: "Cross-platform wellness tracking application integrated with wearable APIs and personalized insights.",
    link: "https://example.com"
  },
  {
    title: "Cyber Void",
    category: "Gaming",
    image: "https://picsum.photos/800/1000?random=5",
    description: "Immersive WebGL gaming experience built with Three.js and WebGPU.",
    link: "https://example.com"
  }
];

// 3D Star Dust Component
const StarDust = () => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <Sparkles count={200} scale={10} size={4} speed={0.4} opacity={0.5} color="#fbbf24" />
                <Sparkles count={100} scale={15} size={2} speed={0.2} opacity={0.3} color="#ffffff" />
            </Canvas>
        </div>
    )
}

const Portfolio: React.FC = () => {
  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Auto-rotation config
  const autoRotateSpeed = 0.05; // Degrees per frame
  
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      // Increment rotation slowly
      rotation.set(rotation.get() + autoRotateSpeed);
    }
  });

  // Carousel Config
  const radius = 450; 
  const totalCards = projects.length;
  const anglePerCard = 360 / totalCards;

  const handleDragStart = () => {
      setIsDragging(true);
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Add drag delta to current rotation
    // Sensitivity factor: 0.2
    rotation.set(rotation.get() + info.delta.x * 0.2);
  };

  const handleDragEnd = () => {
     setIsDragging(false);
  };

  return (
    <section className="py-32 relative z-10 overflow-hidden min-h-[900px] flex flex-col justify-center" id="work">
       
       {/* Ambient Light Effects */}
       <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none" />
       <div className="absolute left-0 bottom-1/4 w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none" />
       
       {/* 3D Star Dust Background */}
       <StarDust />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-mono text-amber-500 mb-4 tracking-[0.2em] uppercase"
            >
                Cosmic Gallery
            </motion.h2>
            <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-bold text-white mb-6"
            >
                Selected <span className="text-gradient-gold">Works</span>
            </motion.h3>
            <p className="text-stone-400 text-sm md:text-base max-w-md">
                Orbits automatically. Drag to spin the universe. Click to explore.
            </p>
        </div>

        {/* 3D Orbit Carousel Container */}
        {/* Added scale-75 for mobile to ensure the wide orbit fits in viewport */}
        <div className="h-[500px] w-full flex items-center justify-center perspective-container [perspective:1500px] scale-75 md:scale-100 origin-center">
             <motion.div
                className="relative h-[350px] w-[260px] sm:h-[400px] sm:w-[300px] md:w-[350px] [transform-style:preserve-3d]"
                style={{ rotateY: rotation }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} // Infinite drag effect via rotation state
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                whileTap={{ cursor: "grabbing" }}
             >
                {projects.map((project, index) => {
                    const angle = index * anglePerCard;
                    return (
                        <div
                            key={index}
                            className="absolute inset-0"
                            style={{
                                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                            }}
                        >
                            <ProjectFlipCard {...project} />
                        </div>
                    );
                })}
             </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;