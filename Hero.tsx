import React, { Suspense, useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MoveRight, Sparkles, ChevronDown } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
    MeshTransmissionMaterial, 
    Float, 
    Environment, 
    AccumulativeShadows,
    RandomizedLight,
    Octahedron,
    Torus,
    PresentationControls,
    Sparkles as DreiSparkles
} from '@react-three/drei';
import * as THREE from 'three';

// --- 3D Components ---

const FallingStars = () => {
    const count = 300;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const dummy = useMemo(() => new THREE.Object3D(), []);
    
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const t = Math.random() * 100;
            const factor = 20 + Math.random() * 100;
            const speed = 0.01 + Math.random() / 200;
            const xFactor = -50 + Math.random() * 100;
            const yFactor = -50 + Math.random() * 100;
            const zFactor = -50 + Math.random() * 100;
            temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        
        particles.forEach((particle, i) => {
            let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
            t = particle.t += speed / 2;
            const s = Math.cos(t);
            let yPos = (yFactor - t * 10 % 100); 
            if (yPos < -20) particle.t -= 10; 

            dummy.position.set(
                xFactor + Math.cos(t/10) * 2,
                10 - (t * 2 % 30), 
                zFactor + Math.sin(t/10) * 2
            );
            dummy.scale.set(s, s, s);
            dummy.rotation.set(s * 5, s * 5, s * 5);
            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[0.05, 0]} />
            <meshBasicMaterial color="#fbbf24" transparent opacity={0.6} />
        </instancedMesh>
    );
};

const CelestialChronometer = () => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ring1Ref = useRef<THREE.Group>(null);
    const ring2Ref = useRef<THREE.Group>(null);
    const ring3Ref = useRef<THREE.Group>(null);
    const ring4Ref = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        // Gentle overall floating rotation
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.1;
        }

        // Core pulsating rotation
        if (coreRef.current) {
             coreRef.current.rotation.y = t * 0.5;
             coreRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
             coreRef.current.rotation.x = Math.cos(t * 0.3) * 0.2;
        }
        
        // Gyroscopic Rings - Multi-axis rotation for "Full" effect
        if (ring1Ref.current) { // Vertical Ring
            ring1Ref.current.rotation.x = t * 0.4;
            ring1Ref.current.rotation.y = t * 0.1;
        }
        if (ring2Ref.current) { // Horizontal Ring
            ring2Ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.2;
            ring2Ref.current.rotation.z = t * 0.3;
        }
        if (ring3Ref.current) { // Diagonal Ring
            ring3Ref.current.rotation.x = t * 0.2;
            ring3Ref.current.rotation.y = t * 0.2;
        }
         if (ring4Ref.current) { // Outer Slow Ring
            ring4Ref.current.rotation.x = -t * 0.1;
            ring4Ref.current.rotation.z = Math.cos(t * 0.1) * 0.1;
        }
    });

    return (
        <group ref={groupRef} scale={1.3}>
            {/* Central Radiant Core - Diamond Shape */}
            <Octahedron args={[1, 0]} ref={coreRef}>
                <MeshTransmissionMaterial 
                    backside
                    backsideThickness={1}
                    thickness={4}
                    chromaticAberration={1.5}
                    anisotropy={0.5}
                    distortion={0.8}
                    distortionScale={0.5}
                    temporalDistortion={0.2}
                    iridescence={1}
                    iridescenceIOR={1.2}
                    color="#ffffff" 
                    background={new THREE.Color("#0c0a09")}
                    roughness={0}
                    clearcoat={1}
                    attenuationDistance={1}
                    attenuationColor="#fbbf24"
                />
            </Octahedron>
            
            {/* Inner Glow */}
            <pointLight position={[0,0,0]} intensity={5} color="#fbbf24" distance={6} decay={2} />

            {/* Ring 1 - Fast Inner */}
            <group ref={ring1Ref}>
                <Torus args={[1.6, 0.02, 16, 100]}>
                     <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} toneMapped={false} />
                </Torus>
            </group>

            {/* Ring 2 - Mid Golden */}
            <group ref={ring2Ref}>
                <Torus args={[2.1, 0.01, 16, 100]}>
                     <meshStandardMaterial color="#d97706" emissive="#d97706" emissiveIntensity={1} toneMapped={false} />
                </Torus>
                <mesh position={[2.1, 0, 0]}>
                    <sphereGeometry args={[0.06]} />
                    <meshBasicMaterial color="#fff" />
                </mesh>
            </group>

            {/* Ring 3 - White Accents */}
            <group ref={ring3Ref}>
                <Torus args={[2.6, 0.005, 16, 100]}>
                     <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.8} toneMapped={false} />
                </Torus>
            </group>

             {/* Ring 4 - Outer Structure */}
            <group ref={ring4Ref}>
                <Torus args={[3.2, 0.03, 3, 100]}> {/* Triangle cross section */}
                     <MeshTransmissionMaterial 
                        color="#ffffff" 
                        transmission={1}
                        opacity={0.5}
                        roughness={0.1}
                        metalness={0.5}
                     />
                </Torus>
            </group>

            {/* Ambient Sparkles around the object */}
            <DreiSparkles count={80} scale={6} size={3} speed={0.4} opacity={0.6} color="#fbbf24" />
        </group>
    )
}

const ScrambleText = ({ text, className = "" }: { text: string, className?: string }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    useEffect(() => {
        let iteration = 0;
        let interval: any = null;

        interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((letter, index) => {
                        if(index < iteration) {
                            return text[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            );

            if(iteration >= text.length){
                clearInterval(interval);
            }

            iteration += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return <span className={className}>{display}</span>
}

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative min-h-screen flex items-center px-6 overflow-hidden pt-20">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-gradient-to-b from-amber-500/10 to-transparent blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full">
        
        {/* Left Content */}
        <motion.div style={{ y: y1 }} className="order-2 lg:order-1 flex flex-col justify-center relative">
             
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex items-center gap-4 mb-8"
            >
                <div className="h-[1px] w-12 bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
                <span className="text-amber-500 font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-2 drop-shadow-md">
                    <Sparkles size={14} className="animate-pulse" /> Nova Portfolio
                </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] mb-8 text-white tracking-tighter">
                <div className="overflow-hidden">
                    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                        DIGITAL
                    </motion.div>
                </div>
                <div className="overflow-hidden">
                    <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-500 drop-shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                             <ScrambleText text="ALCHEMY" />
                        </span>
                    </motion.div>
                </div>
            </h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-stone-300 text-lg md:text-xl max-w-lg leading-relaxed mb-12 font-light border-l-2 border-amber-500/30 pl-6 backdrop-blur-sm"
            >
                Transmuting complex requirements into elegant, golden-standard digital experiences. Specialized in high-performance WebGL & React interfaces.
            </motion.p>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="flex flex-wrap items-center gap-6"
            >
                <button className="group relative px-8 py-4 bg-white text-black rounded-full hover:bg-amber-400 hover:text-black transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(251,191,36,0.6)]">
                    <span className="font-bold tracking-wide flex items-center gap-2">
                        VIEW PROJECTS <MoveRight size={18} />
                    </span>
                </button>
                <button className="px-8 py-4 rounded-full border border-stone-700 text-stone-300 font-medium hover:text-white hover:border-white transition-all hover:bg-white/5 backdrop-blur-sm">
                    Contact Me
                </button>
            </motion.div>
        </motion.div>

        {/* Right 3D Visual */}
        <motion.div style={{ y: y2 }} className="order-1 lg:order-2 h-[50vh] lg:h-[80vh] w-full relative z-20">
             <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 6], fov: 35 }} gl={{ antialias: true, alpha: true }}>
                    <Environment preset="city" />
                    
                    <FallingStars />

                    <directionalLight position={[-5, 5, 5]} intensity={2} color="#ffffff" />
                    <directionalLight position={[5, -5, 5]} intensity={1} color="#fbbf24" />
                    <ambientLight intensity={0.5} color="#ffffff" />

                    <PresentationControls
                        global
                        snap={true}
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]} // Allowed more rotation
                        azimuth={[-Math.PI / 2, Math.PI / 2]} // Allowed more rotation
                    >
                        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
                            <Suspense fallback={null}>
                                <CelestialChronometer />
                            </Suspense>
                        </Float>
                    </PresentationControls>

                    <AccumulativeShadows temporal frames={60} color="#fbbf24" colorBlend={0.5} toneMapped={true} alphaTest={0.7} opacity={0.3} scale={10} position={[0, -3.5, 0]}>
                         <RandomizedLight amount={8} radius={4} ambient={0.5} intensity={1} position={[5, 8, -10]} bias={0.001} />
                    </AccumulativeShadows>

                </Canvas>
             </div>
             
             {/* Divine Light Effect */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(251,191,36,0.15)_0%,transparent_70%)] blur-[80px] rounded-full pointer-events-none mix-blend-screen" />
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll to Explore</span>
        <ChevronDown className="animate-bounce" size={20} />
      </motion.div>
    </section>
  );
};

export default Hero;