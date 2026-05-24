import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Target, Map, HelpCircle, ArrowRight, Star } from "lucide-react";

// ✅ IMPORTED YOUR NEW IMAGE HERE
import counselingHeroPic from "../assets/hero.png";

// ✅ UPDATED SCROLL REVEAL COMPONENT (Animates Every Time You Scroll)
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // If it's on screen, show it. If it leaves the screen, hide it again!
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.15 } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

// 8 Custom Reviews for the Marquee
const TESTIMONIALS = [
  { name: "Rahul V.", role: "Class 10 Student", quote: "The 1-on-1 session helped me choose between Engineering and Pure Sciences. I'm now much more focused and clear about my future.", initial: "R" },
  { name: "Sneha M.", role: "Parent", quote: "My daughter was struggling with time management. The customized study roadmap provided by the counselor changed her results completely.", initial: "S" },
  { name: "Ishaan S.", role: "Class 12 Student", quote: "Finally got a clear picture of how to prepare for CET along with my Boards. The guidance was practical and incredibly helpful!", initial: "I" },
  { name: "Priya D.", role: "Class 11 Student", quote: "I was so confused about professional courses. The counselor explained the CA and CS pathways brilliantly. Highly recommended.", initial: "P" },
  { name: "Rajesh K.", role: "Parent", quote: "The study strategy they provided helped my son overcome his fear of Mathematics. Great mentors who really care about students.", initial: "R" },
  { name: "Ananya T.", role: "Class 9 Student", quote: "I didn't know how to start preparing for Olympiads. The personalized timetable made everything seem achievable and less stressful.", initial: "A" },
  { name: "Vikas R.", role: "Parent", quote: "We were worried about stream selection after 10th. The aptitude insights and counseling session were a total eye-opener for us.", initial: "V" },
  { name: "Meera J.", role: "Class 12 Student", quote: "Balancing NEET prep and board exams was stressing me out. The counselor gave me a perfect, realistic schedule to follow.", initial: "M" }
];

export default function Counseling() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      
      {/* ✅ CUSTOM CSS FOR INFINITE SCROLL MARQUEE */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .pause-on-hover:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* HERO SECTION */}
      <section className="pt-16 md:pt-20 pb-16 md:pb-24 bg-gradient-to-b from-[#f0f6ff] to-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <ScrollReveal delay={100}>
              <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-6 inline-block">
                Expert Mentorship
              </span>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-5 md:mb-6">
                Unlock Your <span className="text-blue-600">True Potential</span> with Expert Guidance
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-xl mx-auto md:mx-0">
                Navigate your academic journey and career choices with personalized 1-on-1 counseling from Calibre Tutorials' senior faculty.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                Book My Free Session <ArrowRight size={20} />
              </Link>
            </ScrollReveal>
          </div>
          
          {/* ✅ UPDATED IMAGE CONTAINER (Hidden on Mobile) */}
          <div className="hidden md:block md:w-1/2">
            <ScrollReveal delay={300}>
              <img
                src={counselingHeroPic}
                alt="Academic Counseling"
                className="w-full max-w-xl mx-auto drop-shadow-2xl rounded-2xl"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WHY COUNSELING GRID */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Professional Counseling?</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">We help students bridge the gap between confusion and clarity through a scientific approach to career planning.</p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target className="text-blue-600" />, title: "Stream Selection", desc: "Expert advice for Class 10 & 12 students to choose the right academic path." },
              { icon: <Map className="text-blue-600" />, title: "Career Roadmap", desc: "Identifying long-term goals and the steps needed to achieve them." },
              { icon: <HelpCircle className="text-blue-600" />, title: "Doubt Clearing", desc: "Resolving academic hurdles and motivational blocks effectively." },
              { icon: <CheckCircle className="text-blue-600" />, title: "Custom Strategy", desc: "Designing personalized study timetables for peak performance." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-blue-50 transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXACT PROCESS TIMELINE DESIGN UPDATE */}
      <section className="py-24 bg-[#f4f8ff]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-[#475569]">Your Path to Clarity</h2>
            </div>
          </ScrollReveal>
          
          <div className="relative">
            
            {/* Horizontal Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-[35px] left-[5%] right-[5%] h-[2px] bg-[#bfdbfe] z-0"></div>

            {/* Vertical Connecting Line (Mobile only) */}
            <div className="md:hidden absolute top-[35px] bottom-[35px] left-1/2 w-[2px] -translate-x-1/2 bg-[#bfdbfe] z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 relative z-10">
              {[
                { step: "1", title: "Register Online", desc: "Fill out your basic details\nand academic background." },
                { step: "2", title: "Get a Call-back", desc: "Our relationship manager\nwill call you to schedule\nyour session." },
                { step: "3", title: "1-on-1 Session", desc: "Deep dive into your goals\nwith a dedicated mentor." }
              ].map((item, i) => (
                <ScrollReveal key={i} delay={i * 150}>
                  <div className="flex flex-col items-center text-center">
                    
                    {/* White Circle with Thicker Blue Border and Soft Glow */}
                    <div className="w-[72px] h-[72px] bg-white border-[3px] border-[#1884FF] text-[#1884FF] rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-[0_8px_24px_rgba(24,132,255,0.25)] relative z-20">
                      {item.step}
                    </div>
                    
                    {/* Text Content */}
                    <h4 className="font-bold text-[#475569] text-[17px] mb-3">{item.title}</h4>
                    <p className="text-[13px] text-slate-500 max-w-[200px] leading-relaxed whitespace-pre-line">
                      {item.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE SCROLLING TESTIMONIALS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Success Stories</h2>
              <p className="text-slate-500">Hear from students who found their direction at Calibre Tutorials.</p>
            </div>
          </ScrollReveal>
        </div>

        {/* Marquee Container */}
        <ScrollReveal delay={200}>
          <div className="relative w-full flex overflow-hidden bg-white pb-10">
            
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-scroll-left pause-on-hover gap-6 px-3">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <div key={i} className="w-[320px] md:w-[380px] p-8 rounded-3xl border border-slate-100 bg-white flex flex-col justify-between shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-default">
                  <div>
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, idx) => <Star key={idx} size={16} className="fill-yellow-400 text-yellow-400" />)}
                    </div>
                    <p className="text-slate-600 italic mb-8 leading-relaxed text-sm">"{t.quote}"</p>
                  </div>
                  
                  <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 font-bold rounded-full flex items-center justify-center shrink-0">
                      {t.initial}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-xs text-slate-500">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

     <section className="py-16 md:py-20">
  <div className="max-w-5xl mx-auto px-4 md:px-6">
    <ScrollReveal>
      <div className="bg-blue-600 rounded-[30px] md:rounded-[40px] px-6 py-10 md:p-12 text-center text-white shadow-2xl">

        <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
          Ready to find your direction?
        </h2>

        <p className="text-blue-100 mb-8 md:mb-10 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
          Seats are limited for personal counseling sessions. Book your slot today and start your journey towards academic excellence.
        </p>

        <Link
          to="/contact"
          className="inline-flex items-center justify-center bg-white text-blue-600 px-6 md:px-10 py-3 md:py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all shadow-sm text-sm md:text-base whitespace-nowrap"
        >
          Schedule Free Session Now
        </Link>

      </div>
    </ScrollReveal>
  </div>
</section>
    </div>
  );
}