import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Code2, Palette, Terminal, Globe, Smartphone, Layers, ArrowUpRight } from 'lucide-react';

const services = [
  { icon: Palette, title: "UI/UX Design", desc: "Crafting pixel-perfect, intuitive interfaces that delight users and drive engagement." },
  { icon: Globe, title: "Web Development", desc: "Building lightning-fast, SEO-optimized web applications with modern frameworks." },
  { icon: Smartphone, title: "Mobile Solutions", desc: "Native-performance cross-platform apps for iOS and Android ecosystems." },
  { icon: Terminal, title: "Backend Architecture", desc: "Scalable, secure server-side systems designed for high availability." },
  { icon: Layers, title: "Design Systems", desc: "Unified component libraries ensuring consistency across all digital touchpoints." },
  { icon: Code2, title: "Code Audits", desc: "Optimizing performance, security, and maintainability of existing codebases." },
];

const AuroraBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,transparent_0%,#0c0a09_70%)] z-10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 blur-[100px]">
             <motion.div 
                animate={{ 
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.2, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/40 rounded-full" 
             />
             <motion.div 
                animate={{ 
                    x: [0, -100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-900/30 rounded-full" 
             />
             <motion.div 
                animate={{ 
                    x: [0, 50, 0],
                    y: [0, 100, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-purple-900/20 rounded-full" 
             />
        </div>
    </div>
)

const MagicCard = ({ children, index }: { children: React.ReactNode, index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all duration-500 overflow-hidden h-full backdrop-blur-sm"
            onMouseMove={handleMouseMove}
        >
             {/* Spotlight Gradient */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
                    radial-gradient(
                        400px circle at ${mouseX}px ${mouseY}px,
                        rgba(245, 158, 11, 0.1),
                        transparent 80%
                    )
                    `,
                }}
            />
            
            <div className="relative p-8 h-full z-10 flex flex-col items-start">
                {children}
            </div>
        </motion.div>
    );
}

const Services: React.FC = () => {
  return (
    <section className="py-32 relative z-10 overflow-hidden">
      <AuroraBackground />
      
      <div className="max-w-7xl mx-auto px-4 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/5 pb-12">
            <div className="max-w-2xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-sm font-mono text-amber-500 mb-4 tracking-[0.2em] uppercase flex items-center gap-2"
                >
                    <span className="w-8 h-[1px] bg-amber-500"></span> What I Do
                </motion.h2>
                <motion.h3 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-display font-bold text-white leading-tight"
                >
                    Solving problems through <span className="text-gradient-gold">Design & Code</span>
                </motion.h3>
            </div>
            <motion.p 
                 initial={{ opacity: 0 }} 
                 whileInView={{ opacity: 1 }}
                 viewport={{ once: true }}
                 className="text-stone-400 max-w-sm text-right hidden md:block"
            >
                A full-service digital capability covering every aspect of product creation.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <MagicCard key={index} index={index}>
              <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all duration-500 shadow-lg shadow-black/20">
                <service.icon size={28} className="text-stone-300 group-hover:text-amber-500 transition-colors" />
              </div>
              
              <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-100 transition-colors flex items-center gap-2">
                {service.title}
              </h4>
              
              <p className="text-stone-400 leading-relaxed text-sm mb-8 flex-grow group-hover:text-stone-300 transition-colors">
                {service.desc}
              </p>
              
              <div className="flex items-center gap-2 text-xs font-bold text-stone-600 uppercase tracking-wider group-hover:text-amber-500 transition-colors mt-auto">
                 <span>Explore Service</span>
                 <ArrowUpRight size={14} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </MagicCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;