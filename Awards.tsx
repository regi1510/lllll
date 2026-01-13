import React from 'react';
import { motion } from 'framer-motion';
import { Award, Star, Trophy } from 'lucide-react';

const awards = [
  { title: "Site of the Day", org: "Awwwards", year: "2023", icon: Trophy, color: "text-yellow-400" },
  { title: "Best UI Design", org: "Behance", year: "2022", icon: Star, color: "text-purple-400" },
  { title: "Developer of Choice", org: "Upwork", year: "2024", icon: Award, color: "text-blue-400" },
];

const Meteors = ({ number = 20 }: { number?: number }) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((el, idx) => (
        <span
          key={"meteor" + idx}
          className="animate-meteor absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]"
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + "px",
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + "s",
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
          }}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </span>
      ))}
    </>
  );
};

const Awards: React.FC = () => {
  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="glass-panel rounded-[2rem] p-8 md:p-16 relative overflow-hidden bg-black/40 border border-white/10">
           
           {/* Meteor Background */}
           <div className="absolute inset-0 overflow-hidden h-full w-full pointer-events-none opacity-40">
                <Meteors number={20} />
           </div>

           {/* Decorative Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50 blur-sm" />
           
           <div className="text-center mb-16 relative z-10">
             <h3 className="text-3xl md:text-5xl font-display font-bold mb-4">Recognition & <span className="text-gradient-gold">Awards</span></h3>
             <p className="text-gray-400 max-w-xl mx-auto text-lg">Humbled by the community recognition and the trust placed in my work by industry leaders.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {awards.map((item, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                   <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 ring-1 ring-white/10">
                        <item.icon size={32} className={`${item.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]`} />
                   </div>
                   <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
                   <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">{item.org}</p>
                   <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300">{item.year}</span>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default Awards;