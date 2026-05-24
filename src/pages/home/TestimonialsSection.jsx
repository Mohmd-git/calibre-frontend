import React from "react";
import { TESTIMONIALS } from "./homeData";

export default function TestimonialsSection() {
  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        /* Slower on mobile for readability */
        @media (max-width: 640px) {
          .animate-scroll-left {
            animation-duration: 30s;
          }
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>

      <section className="py-14 sm:py-24 bg-[#fafcff] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 sm:mb-4">
            Voices of{" "}
            <span className="text-[#1884FF] border-b-4 border-[#1884FF] pb-1">Our Students</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-3 sm:mt-6 max-w-2xl mx-auto px-2">
            Nothing speaks louder than the success stories and feedback from those who have walked our halls.
          </p>
        </div>

        <div className="relative w-full flex overflow-hidden pb-6 sm:pb-10">
          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-r from-[#fafcff] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 md:w-32 bg-gradient-to-l from-[#fafcff] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="flex w-max animate-scroll-left pause-on-hover gap-4 sm:gap-8 px-4 pt-6 sm:pt-8">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
              <div
                key={i}
                className="relative w-[78vw] sm:w-[350px] md:w-[420px] p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100 bg-white flex flex-col justify-between shrink-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-default mt-4"
              >
                {/* Quote bubble */}
                <div className="absolute -top-5 sm:-top-6 left-8 sm:left-10 w-10 h-10 sm:w-14 sm:h-14 bg-[#1884FF] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <span className="text-2xl sm:text-4xl font-serif leading-none pt-3 sm:pt-4">"</span>
                </div>

                <p className="text-slate-600 italic mb-5 sm:mb-8 leading-relaxed mt-3 sm:mt-4 text-xs sm:text-[15px]">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3 sm:gap-4 border-t border-slate-50 pt-4 sm:pt-6 mt-auto">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 bg-blue-50 text-[#1884FF] text-sm sm:text-lg font-bold rounded-full flex items-center justify-center shrink-0">
                    {t.initial}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}