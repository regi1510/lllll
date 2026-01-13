import React, { useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

interface ProjectProps {
  title: string;
  category: string;
  image: string;
  description: string;
  link?: string;
  style?: React.CSSProperties; // Allow passing style for 3D positioning
}

const ProjectFlipCard: React.FC<ProjectProps> = ({ title, category, image, description, link = "#", style }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div 
      style={{
        perspective: 1000,
        ...style
      }}
      // Responsive width/height: smaller on mobile, larger on tablet/desktop
      className="group h-[350px] w-[260px] sm:h-[400px] sm:w-[300px] md:w-[350px] cursor-pointer"
      onMouseMove={handleMouseMove}
      onClick={() => !isFlipped && setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div 
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative h-full w-full rounded-2xl shadow-2xl shadow-black/80 [transform-style:preserve-3d] border border-white/5"
      >
        
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl [backface-visibility:hidden] bg-dark-accent border border-stone-800 overflow-hidden">
           {/* Spotlight Effect */}
           <motion.div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 z-30"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    400px circle at ${mouseX}px ${mouseY}px,
                    rgba(245, 158, 11, 0.2),
                    transparent 80%
                  )
                `,
              }}
            />
           
           <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09] via-transparent to-transparent z-10 opacity-90" />
           
           <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
           />
           
           <div className="absolute top-4 right-4 z-20">
              <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <ArrowUpRight size={20} />
              </div>
           </div>

           <div className="absolute bottom-6 left-6 z-20">
             <span className="inline-block px-2 py-1 rounded-md bg-amber-500/20 text-amber-500 text-[10px] font-bold font-mono tracking-wider mb-2 border border-amber-500/20 backdrop-blur-sm">
               {category}
             </span>
             <h3 className="text-2xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">{title}</h3>
           </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#141210] border border-amber-500/20 p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-center items-center text-center relative overflow-hidden">
             
             {/* Decorative Grain */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-white opacity-5 mix-blend-overlay"></div>
            
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-4 text-gradient-gold">{title}</h3>
                <p className="text-stone-400 mb-6 leading-relaxed text-sm font-light">
                {description}
                </p>
                
                <div className="flex flex-col gap-3 w-full">
                    <a href={link} target="_blank" rel="noopener noreferrer" className="px-6 py-2 rounded-full bg-white text-dark font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-black shadow-lg text-sm">
                        <ExternalLink size={16} /> View Live
                    </a>
                    <a href="#" className="px-6 py-2 rounded-full border border-stone-600 text-stone-300 font-bold hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 text-sm">
                        <Github size={16} /> Code
                    </a>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectFlipCard;