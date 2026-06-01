import React, { useEffect, useRef, useState } from "react";
import { BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ✅ SCROLL REVEAL
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
      else setIsVisible(false);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`} style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
};

export default function HomeTuitionPromo() {
  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Text & Redirect Button */}
          <div className="w-full lg:w-5/12 text-center lg:text-left">
            <ScrollReveal>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs md:text-sm mb-4 block">
                The Calibre Bridge
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 leading-tight tracking-tight">
                One Platform.<br />Two Opportunities.
              </h2>
              <p className="text-slate-600 text-sm md:text-base font-medium mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
                A premium, secure network connecting dedicated students with verified, top-tier educators for personalized home learning.
              </p>
              
              {/* Primary "More Details" Button */}
              <Link to="/hometuition" className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg w-full sm:w-auto hover:gap-4">
                Explore Platform Details <ArrowRight size={18} />
              </Link>
            </ScrollReveal>
          </div>

          {/* Right Cards */}
          <div className="w-full lg:w-7/12 grid sm:grid-cols-2 gap-6">
            
            {/* Student Card */}
            <ScrollReveal delay={100}>
              <Link to="/hometuition" className="block bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors group h-full">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-blue-600">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">I Need a Tutor</h3>
                <p className="text-slate-500 text-sm font-medium">Find experienced, verified subject experts for personalized academic guidance at your doorstep.</p>
              </Link>
            </ScrollReveal>

            {/* Tutor Card */}
            <ScrollReveal delay={200}>
              <Link to="/hometuition" className="block bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-green-200 hover:bg-green-50/50 transition-colors group h-full">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 text-green-600">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-700 transition-colors">I Want to Teach</h3>
                <p className="text-slate-500 text-sm font-medium">Join our verified network, gain access to quality student leads, and enjoy flexible teaching hours.</p>
              </Link>
            </ScrollReveal>

          </div>
        </div>

      </div>
    </section>
  );
}