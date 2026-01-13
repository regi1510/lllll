import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const steps = [
    { 
        id: "01", 
        title: "Discovery", 
        subtitle: "Uncovering the Core",
        desc: "We begin by deep-diving into your brand's essence, analyzing competitors, and identifying user needs to build a solid strategic foundation."
    },
    { 
        id: "02", 
        title: "Architecture", 
        subtitle: "System Blueprints",
        desc: "Structuring data flow and user journeys. We create wireframes and high-fidelity prototypes to visualize the experience before code is written."
    },
    { 
        id: "03", 
        title: "Synthesis", 
        subtitle: "Code & Craft",
        desc: "The magic happens here. Using modern frameworks like React and Three.js, we translate designs into performant, interactive reality."
    },
    { 
        id: "04", 
        title: "Evolution", 
        subtitle: "Launch & Scale",
        desc: "Deployment is just the beginning. We monitor performance, gather user feedback, and iterate to ensure your product grows."
    }
];

const NeuralNetwork = (props: any) => {
    const ref = useRef<any>(null);
    // Use 6000 or any multiple of 3 to avoid NaN errors when Three.js computes bounding sphere
    // (5000 / 3 is not an integer, leading to out-of-bounds reads)
    const [sphere] = React.useState(() => random.inSphere(new Float32Array(6000), { radius: 1.5 }));
    
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial transparent color="#d97706" size={0.005} sizeAttenuation={true} depthWrite={false} />
            </Points>
        </group>
    )
}

const ProcessStep = ({ step, index }: { step: any, index: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-12 mb-32 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
        >
            {/* Number Display */}
            <div className="relative flex-shrink-0">
                 <div className="text-8xl md:text-9xl font-display font-bold text-white/5 relative z-10">
                    {step.id}
                 </div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
            </div>

            {/* Content Card */}
            <div className="flex-1 bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <div className="w-20 h-1 bg-gradient-to-r from-transparent to-amber-500" />
                </div>
                
                <h4 className="text-amber-500 font-mono text-sm tracking-widest uppercase mb-4">{step.subtitle}</h4>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 group-hover:text-amber-100 transition-colors">{step.title}</h3>
                <p className="text-stone-400 leading-relaxed text-lg">
                    {step.desc}
                </p>
            </div>
        </motion.div>
    )
}

const Process: React.FC = () => {
  return (
    <section className="py-32 relative z-10 bg-black overflow-hidden">
      
      {/* 3D Neural Background */}
      <div className="absolute inset-0 z-0 opacity-40">
          <Canvas camera={{ position: [0, 0, 1] }}>
              <NeuralNetwork />
          </Canvas>
      </div>
      
      {/* Connecting Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden md:block" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-24">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-amber-500 font-mono text-sm tracking-[0.3em] uppercase mb-4"
            >
                The Methodology
            </motion.h2>
            <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-display font-bold text-white"
            >
                Digital <span className="text-gradient-gold">Alchemy</span>
            </motion.h3>
        </div>

        <div className="relative">
             {steps.map((step, index) => (
                 <ProcessStep key={index} step={step} index={index} />
             ))}
        </div>
      </div>
    </section>
  );
};

export default Process;