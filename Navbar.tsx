import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#' },
    { name: 'Work', href: '#work' },
    { name: 'About', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className={`flex items-center justify-between p-4 rounded-full border transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-xl border-white/10 shadow-lg' : 'bg-transparent border-transparent'}`}>
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
              <span className="font-bold text-black text-xl">N</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Nova<span className="text-accent">.</span></span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-5 py-2 rounded-full bg-white text-dark font-semibold text-sm hover:scale-105 transition-transform">
              Let's Talk
            </button>
            <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-24 left-4 right-4 bg-[#111] rounded-3xl p-6 border border-white/10 shadow-2xl md:hidden flex flex-col gap-4">
           {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMenuOpen(false)} 
                className="text-lg font-medium text-gray-300 hover:text-white py-2 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <button className="w-full py-3 rounded-xl bg-accent text-dark font-bold mt-2">
              Let's Talk
            </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;