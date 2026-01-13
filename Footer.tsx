import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-12 border-t border-white/5 bg-dark">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-white flex items-center justify-center">
              <span className="font-bold text-black text-xs">N</span>
            </div>
            <span className="font-display font-bold text-lg">Nova<span className="text-accent">.</span></span>
        </div>
        
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Nova Portfolio. Crafted with React & 3D magic.
        </p>

        <div className="flex gap-6 text-sm text-gray-400">
          <a href="#" className="hover:text-white">Dribbble</a>
          <a href="#" className="hover:text-white">Behance</a>
          <a href="#" className="hover:text-white">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;