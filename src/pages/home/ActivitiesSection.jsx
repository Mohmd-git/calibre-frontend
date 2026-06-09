import React, { useEffect, useState, useRef } from "react";
import { Compass, Smile, Camera, Sun, Sparkles } from "lucide-react";
import activitiesPic from "../../assets/activities-new.webp";

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
    <div ref={ref} className={`transition-all duration-1000 ease-out w-full ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 md:translate-y-12"}`} style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}>
      {children}
    </div>
  );
};

export default function ActivitiesSection() {
  return (
    <section className="py-20 md:py-32 bg-slate-50 overflow-hidden relative border-y border-gray-100">
      
      {/* Funky Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT SIDE: Curiosity Text & Funky Cards */}
          <div className="w-full lg:w-1/2 overflow-hidden">
            
            <ScrollReveal delay={100}>
              {/* Tilted Curiosity Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-300 text-yellow-900 px-3 py-2 md:px-4 rounded-xl font-black tracking-wide md:tracking-widest uppercase text-[10px] md:text-xs shadow-md transform -rotate-3 hover:rotate-0 transition-transform cursor-default mb-6">
                <Sparkles size={16} /> 
                The Secret Formula
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
             <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight break-words">
                What's our secret to
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      stress-free toppers?
               </span>
                </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-medium bg-white p-5 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-500">
                <span className="font-bold text-gray-900">Hint: It involves leaving the textbooks behind.</span> <br/>
                We know that a relaxed, happy mind absorbs knowledge twice as fast. That’s why we take serious breaks to focus on laughter, nature, and making memories.
              </p>
            </ScrollReveal>

            {/* Funky Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { icon: <Sun size={24} />, title: "Annual Picnics", desc: "Outdoor trips to recharge.", bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
                { icon: <Compass size={24} />, title: "Nature Parks", desc: "Breathing fresh air.", bg: "bg-cyan-100", text: "text-cyan-700", border: "border-cyan-200" },
                { icon: <Camera size={24} />, title: "Making Memories", desc: "Building lifelong bonds.", bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
                { icon: <Smile size={24} />, title: "Stress-Free Zone", desc: "Mental health comes first.", bg: "bg-green-100", text: "text-green-700", border: "border-green-200" }
              ].map((item, idx) => (
                <ScrollReveal key={idx} delay={400 + (idx * 100)}>
                  <div className={`${item.bg} ${item.border} border p-5 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-2 hover:rotate-2 transition-all duration-300 flex items-start gap-4 cursor-pointer`}>
                    <div className={`p-3 rounded-2xl bg-white shadow-sm ${item.text}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className={`font-black text-base mb-1 ${item.text}`}>{item.title}</h3>
                      <p className="text-xs font-semibold text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Scrapbook / Polaroid Image */}
          <div className="w-full lg:w-1/2 relative">
            <ScrollReveal delay={400}>
              {/* Floating "Sneak Peek" Sticker */}
              <div className="absolute -top-6 -right-4 md:-top-8 md:-right-8 z-20 bg-pink-500 text-white font-black text-sm md:text-base px-6 py-3 rounded-full transform rotate-12 shadow-xl border-4 border-white animate-bounce">
                Sneak Peek! 👀
              </div>

              {/* The "Polaroid" Frame */}
              <div className="relative bg-white p-4 md:p-6 pb-12 md:pb-16 rounded-lg shadow-[0_20px_50px_rgb(0,0,0,0.15)] transform -rotate-2 hover:rotate-1 transition-transform duration-500">
                {/* Tape graphic effect */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 backdrop-blur-md border border-gray-200 shadow-sm transform -rotate-2 opacity-80 mix-blend-overlay"></div>
                
                <img 
                  src={activitiesPic} 
                  alt="Students enjoying educational and recreational activities at Calibre Tutorials" 
                  className="w-full h-full object-cover rounded-sm min-h-[300px] md:min-h-[450px]"
                />
                
                <div className="absolute bottom-4 left-0 w-full text-center">
                  <p className="font-['Comic_Sans_MS',_cursive,sans-serif] text-gray-500 font-bold text-lg md:text-xl transform -rotate-1">
                    Work Hard. Play Harder. 📸
                  </p>
                </div>
              </div>

              {/* Background accent block */}
              <div className="absolute inset-0 bg-[#1884FF] rounded-lg rotate-6 shadow-lg -z-10 translate-x-4 translate-y-4 opacity-20"></div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}