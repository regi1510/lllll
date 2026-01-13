import React, { Suspense, useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Reviews from './components/Reviews';
import Process from './components/Process';
import Footer from './components/Footer';

// Lazy load the 3D background
const Background3D = React.lazy(() => import('./components/Background3D'));

const MouseFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother performance
      requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-0 mix-blend-screen transition-transform duration-300 ease-out will-change-transform"
      style={{ 
        left: 0, 
        top: 0, 
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`
      }}
    >
        {/* Warm Golden Core */}
      <div className="w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[120px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" />
      {/* Secondary Amber Glow */}
      <div className="w-[400px] h-[400px] rounded-full bg-amber-400/10 blur-[100px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-x-10 -translate-y-10" />
      
      {/* Sharp Center */}
      <div className="w-2 h-2 bg-amber-100 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_2px_rgba(251,191,36,0.5)]" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark text-white selection:bg-primary selection:text-white font-sans overflow-x-hidden relative">
      <MouseFollower />
      
      <Suspense fallback={<div className="fixed inset-0 bg-dark z-[-1]" />}>
        <Background3D />
      </Suspense>

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Reviews />
      </main>

      <Footer />
    </div>
  );
};

export default App;