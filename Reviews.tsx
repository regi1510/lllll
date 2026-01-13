import React, { useRef, useMemo } from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const reviews = [
  { name: "Sarah Jenkins", role: "CEO, TechFlow", text: "Ibrahim's eye for design is unmatched. He transformed our vague ideas into a world-class product." },
  { name: "David Chen", role: "Product Lead, Stripe", text: "Fast, reliable, and incredibly creative. The animations he built increased our conversion by 40%." },
  { name: "Elena Rodriguez", role: "Founder, ArtSpace", text: "A true master of his craft. The 3D integration on our portfolio site blew everyone away." },
  { name: "Michael Chang", role: "CTO, FutureScale", text: "Clean code and beautiful design. Rare to find a developer who excels at both." },
  { name: "Jessica Doe", role: "Marketing VP, Solstice", text: "The attention to detail is staggering. Every interaction feels polished and deliberate." },
];

// Futuristic Particle Dust using Three.js
const CyberParticles = ({ count = 400 }) => {
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 50;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -20 + Math.random() * 40;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        
        particles.forEach((particle, i) => {
            let { t, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed;
            
            // Oscillating motion
            const x = xFactor + Math.sin(t) * 2;
            const y = yFactor + Math.cos(t / 2) * 2;
            const z = zFactor + Math.cos(t) * 2;

            dummy.position.set(x, y, z);
            
            // Pulse scale
            const s = Math.abs(Math.cos(t)) * 0.5 + 0.1;
            dummy.scale.set(s, s, s);
            
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <octahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};


const ReviewCard = ({ review }: { review: any }) => (
    <div className="w-[300px] md:w-[450px] flex-shrink-0 mx-4 bg-[#050505]/80 border border-amber-500/20 p-8 rounded-2xl relative group hover:border-amber-500/60 transition-all duration-300 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        {/* Futuristic Corner Accents */}
        <div className="absolute top-0 left-0 w-4 h-[1px] bg-amber-500 opacity-50 group-hover:w-full transition-all duration-500" />
        <div className="absolute top-0 left-0 w-[1px] h-4 bg-amber-500 opacity-50 group-hover:h-full transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-4 h-[1px] bg-amber-500 opacity-50 group-hover:w-full transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-[1px] h-4 bg-amber-500 opacity-50 group-hover:h-full transition-all duration-500" />

        <div className="absolute top-6 right-6 p-2 rounded-full bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors text-amber-500">
             <Quote size={20} />
        </div>

        <p className="text-stone-300 text-sm md:text-base mb-8 relative z-10 leading-relaxed font-light tracking-wide">
            "{review.text}"
        </p>

        <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-stone-800 to-black border border-stone-700 flex items-center justify-center text-sm font-bold text-amber-500 shadow-lg group-hover:border-amber-500 transition-colors">
                {review.name.charAt(0)}
            </div>
            <div>
                <div className="text-white font-bold text-sm tracking-wider uppercase">{review.name}</div>
                <div className="text-xs text-amber-500/70 font-mono">{review.role}</div>
            </div>
        </div>
    </div>
);

const Reviews: React.FC = () => {
  return (
    <section className="py-32 relative z-10 border-t border-white/5 bg-black overflow-hidden">
        
      {/* Futuristic Background */}
      <div className="absolute inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
             <ambientLight intensity={0.5} />
             <CyberParticles />
         </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-4 mb-16 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold flex items-center justify-center gap-3">
             Client <span className="text-gradient-gold">Transmission</span>
             <Sparkles className="text-amber-500 animate-pulse" size={24} />
        </h2>
      </div>

      <div className="relative overflow-hidden w-full z-10">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
        
        {/* Marquee Container */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
                <ReviewCard key={i} review={review} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;