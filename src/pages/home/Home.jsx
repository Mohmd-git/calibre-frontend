import { useEffect, useState, useRef } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ActivitiesSection from "./ActivitiesSection"; 
import CoursesSection from "./CoursesSection";
import HallOfFameSection from "./HallOfFameSection";
import WhyChooseSection from "./WhyChooseSection";
import TestimonialsSection from "./TestimonialsSection";
import CTASection from "./CTASection";

const ScrollReveal = ({ children, delay = 0, direction = "up" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.08 } // Lower threshold = triggers earlier on mobile
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const getTransform = () => {
    if (isVisible) return "opacity-100 translate-y-0 translate-x-0";
    switch (direction) {
      case "left": return "opacity-0 -translate-x-8";
      case "right": return "opacity-0 translate-x-8";
      default: return "opacity-0 translate-y-10";
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${getTransform()}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden">
      <ScrollReveal delay={0}>
        <HeroSection />
      </ScrollReveal>
      
      <ScrollReveal delay={50}>
        <AboutSection />
      </ScrollReveal>

      {/* ✅ MOVED BELOW ABOUT SECTION */}
      <ScrollReveal delay={50}>
        <ActivitiesSection />
      </ScrollReveal>
      
      <ScrollReveal delay={50}>
        <CoursesSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <HallOfFameSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <WhyChooseSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <TestimonialsSection />
      </ScrollReveal>
      <ScrollReveal delay={50}>
        <CTASection />
      </ScrollReveal>
    </div>
  );
}