import React, { useEffect, useRef, useState } from "react";
import { Users, GraduationCap, BookOpen, ArrowRight, CheckCircle, HelpCircle, Star, ShieldCheck, Layers } from "lucide-react";

// ✅ SCROLL REVEAL COMPONENT
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

// ✅ NUMBER ANIMATION COMPONENT
const Counter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      setCount(easeProgress * end);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  const displayCount = Number.isInteger(end) ? Math.floor(count) : count.toFixed(1);

  return <span ref={ref}>{displayCount}{suffix}</span>;
};

export default function HomeTuition() {
  // ✅ UPDATED LINKS HERE
  const studentForm = "https://docs.google.com/forms/d/e/1FAIpQLScmaWsApgB4uGsyCRFezIvyc2uTush6wS_snXAc4KZDY_VfXA/viewform?usp=header";
  const tutorForm = "https://docs.google.com/forms/d/e/1FAIpQLSdENqp6GQAIJrETNQWWtCtWWAf4imZomq8a2B4NyyWbTpMfZw/viewform?usp=header";

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="bg-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="pt-16 md:pt-20 pb-20 md:pb-24 bg-gradient-to-b from-[#f0f6ff] to-white text-center">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal delay={100}>
            <span className="bg-blue-100 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 md:mb-6 inline-block">
              Premium Education
            </span>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-tight mb-4 md:mb-6 px-2">
              Personalized <span className="text-blue-600">Home Tuition</span> Services
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <p className="text-slate-600 text-base md:text-xl leading-relaxed px-4 md:px-0">
              Connecting students with qualified tutors and helping passionate educators find rewarding teaching opportunities.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* IMPACT STATS BAR */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-10 mb-16 md:mb-24 relative z-20">
        <ScrollReveal delay={400}>
          <div className="bg-white rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row justify-around items-center gap-6 md:gap-8 text-center">
            
            <div className="w-full md:w-auto">
              <div className="text-4xl md:text-5xl font-black text-blue-600 mb-1 md:mb-2">
                <Counter end={500} suffix="+" />
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">Verified Tutors</div>
            </div>
            
            <div className="md:hidden w-16 h-px bg-slate-100 my-1"></div>
            <div className="hidden md:block w-px h-16 bg-slate-100"></div>
            
            <div className="w-full md:w-auto">
              <div className="text-4xl md:text-5xl font-black text-green-500 mb-1 md:mb-2">
                <Counter end={50} suffix="+" />
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">Subjects Covered</div>
            </div>

            <div className="md:hidden w-16 h-px bg-slate-100 my-1"></div>
            <div className="hidden md:block w-px h-16 bg-slate-100"></div>
            
            <div className="w-full md:w-auto">
              <div className="text-4xl md:text-5xl font-black text-yellow-500 mb-1 md:mb-2 flex items-center justify-center gap-2">
                <Counter end={4.9} /> <Star className="fill-yellow-400 text-yellow-400" size={28} />
              </div>
              <div className="text-xs md:text-sm text-slate-500 font-bold uppercase tracking-wider">Parent Rating</div>
            </div>

          </div>
        </ScrollReveal>
      </section>

      {/* TWO CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 mb-16 md:mb-24">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {/* STUDENTS */}
          <ScrollReveal delay={200}>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-blue-600">
                <BookOpen size={28} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">Need a Tutor?</h2>
              <p className="text-slate-600 text-sm md:text-base mb-6 flex-grow">
                Find experienced tutors for school academics, board exams, and personalized guidance targeted to clear academic concepts right at your doorstep.
              </p>
              <ul className="space-y-3 mb-8 text-slate-700 text-sm md:text-base">
                {["Primary Classes (1st – 5th)", "Middle School (6th – 8th)", "Secondary Classes (9th & 10th)", "Higher Secondary (11th & 12th Science/Commerce)"].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-2">
                    <CheckCircle size={18} className="text-blue-500 shrink-0 mt-0.5 md:mt-0" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={studentForm} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm md:text-base">
                Find a Tutor <ArrowRight size={18} />
              </a>
            </div>
          </ScrollReveal>

          {/* TEACHERS */}
          <ScrollReveal delay={300}>
            <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100 h-full flex flex-col hover:-translate-y-1 transition-transform">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-5 md:mb-6 text-green-600">
                <GraduationCap size={28} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 md:mb-4">Become a Tutor</h2>
              <p className="text-slate-600 text-sm md:text-base mb-6 flex-grow">
                Join our network of elite educators. We connect you with verified student requirements and support your professional independent teaching journey.
              </p>
              <ul className="space-y-3 mb-8 text-slate-700 text-sm md:text-base">
                {["Flexible Teaching Hours", "Localized Student Options", "Verified Profiles & Requirements", "Ongoing Support & Resources"].map((item, i) => (
                  <li key={i} className="flex items-start md:items-center gap-2">
                    <CheckCircle size={18} className="text-green-500 shrink-0 mt-0.5 md:mt-0" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href={tutorForm} target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 text-sm md:text-base">
                Register as Tutor <ArrowRight size={18} />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* BOARDS SUPPORTED SECTION */}
      <section className="py-12 md:py-16 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <ScrollReveal>
            <div className="flex items-center justify-center gap-2 mb-3 md:mb-4">
              <Layers size={20} className="text-blue-600" />
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Curriculums We Support</h3>
            </div>
            <p className="text-slate-500 text-xs md:text-sm max-w-xl mx-auto mb-8 md:mb-10 font-medium">Our tutors are uniquely specialized across all standard domestic and international educational paradigms.</p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {["CBSE", "ICSE", "IB", "IGCSE", "State Boards"].map((board, i) => (
                <span key={i} className="bg-white border border-slate-200 text-slate-800 font-extrabold text-xs md:text-sm px-4 md:px-6 py-2 md:py-3 rounded-2xl shadow-sm">
                  {board}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SUBJECTS WE COVER (COURSES SECTION) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">Subjects We Cover</h2>
              <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto font-medium">
                From foundational concepts in primary school to specialized subjects in higher secondary, we provide expert tutors for all your academic needs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Science & Math */}
            <ScrollReveal delay={100}>
              <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 h-full hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-black text-blue-600 mb-4 border-b border-slate-200 pb-3">Science & Math</h3>
                <ul className="space-y-3 text-slate-700 font-medium text-sm">
                  <li>• Mathematics (Algebra/Geometry)</li>
                  <li>• Physics</li>
                  <li>• Chemistry</li>
                  <li>• Biology</li>
                  <li>• General Science</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Commerce */}
            <ScrollReveal delay={200}>
              <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 h-full hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-black text-green-600 mb-4 border-b border-slate-200 pb-3">Commerce</h3>
                <ul className="space-y-3 text-slate-700 font-medium text-sm">
                  <li>• Accountancy</li>
                  <li>• Economics</li>
                  <li>• Business Studies</li>
                  <li>• Secretarial Practice (SP)</li>
                  <li>• Organization of Commerce</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Languages */}
            <ScrollReveal delay={300}>
              <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 h-full hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-black text-purple-600 mb-4 border-b border-slate-200 pb-3">Languages</h3>
                <ul className="space-y-3 text-slate-700 font-medium text-sm">
                  <li>• English Literature & Grammar</li>
                  <li>• Hindi</li>
                  <li>• Marathi</li>
                </ul>
              </div>
            </ScrollReveal>

            {/* Social Studies */}
            <ScrollReveal delay={400}>
              <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 h-full hover:shadow-md transition-shadow">
                <h3 className="text-lg md:text-xl font-black text-orange-600 mb-4 border-b border-slate-200 pb-3">Social Studies</h3>
                <ul className="space-y-3 text-slate-700 font-medium text-sm">
                  <li>• History</li>
                  <li>• Civics & Political Science</li>
                  <li>• Geography</li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 md:py-24 bg-[#f4f8ff]">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-4xl font-bold text-center text-slate-900 mb-10 md:mb-16">How It Works</h2>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10">
            {[
              { title: "For Students", color: "text-blue-600", steps: ["Fill the tutor requirement form.", "Our team reviews your needs.", "We shortlist the perfect match.", "Tutor details are shared."] },
              { title: "For Teachers", color: "text-green-600", steps: ["Submit tutor registration form.", "Profile verification process.", "Added to our priority database.", "Tuition opportunities shared."] }
            ].map((section, i) => (
              <ScrollReveal key={i} delay={i * 200}>
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                  <h3 className={`text-xl md:text-2xl font-bold mb-6 md:mb-8 ${section.color}`}>{section.title}</h3>
                  <div className="space-y-4 md:space-y-6">
                    {section.steps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3 md:gap-4 text-slate-700 font-medium text-sm md:text-base">
                        <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-xs md:text-sm shrink-0">{idx + 1}</span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION FOR TRUST */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <div className="text-center mb-10 md:mb-12">
              <HelpCircle className="mx-auto text-blue-600 mb-3 md:mb-4" size={32} md:size={40} />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
            </div>
          </ScrollReveal>
          <div className="space-y-4 md:space-y-6">
            <ScrollReveal delay={100}>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">Are the tutors verified?</h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Yes. Calibre Tutorials conducts thorough background checks and interviews with every tutor before adding them to our database.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">What if my child doesn't click with the tutor?</h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Your satisfaction is our priority. If the teaching style isn't a match, we will arrange a replacement tutor at no extra matching cost.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="p-5 md:p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2 text-sm md:text-base">How is the fee decided?</h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">Fees depend on the class, subject, and the tutor's experience. We ensure transparent pricing discussions before tuition begins.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16 text-slate-900">Why Families Trust Our Bridge</h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <ScrollReveal delay={100}>
              <div className="p-6 md:p-8 bg-white rounded-3xl h-full shadow-sm border border-slate-100">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm"><ShieldCheck size={20} className="md:w-6 md:h-6" /></div>
                <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3">Verified Profiles</h4>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Every tutor and student is vetted for safety, qualifications, and genuine intent.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="p-6 md:p-8 bg-white rounded-3xl h-full shadow-sm border border-slate-100">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm"><GraduationCap size={20} className="md:w-6 md:h-6" /></div>
                <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3">Expert Matching</h4>
                <p className="text-xs md:text-sm text-gray-600 font-medium">We analyze specific academic needs to find the perfect pedagogical match.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="p-6 md:p-8 bg-white rounded-3xl h-full shadow-sm border border-slate-100">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-sm"><BookOpen size={20} className="md:w-6 md:h-6" /></div>
                <h4 className="font-bold text-base md:text-lg mb-2 md:mb-3">Continuous Support</h4>
                <p className="text-xs md:text-sm text-gray-600 font-medium">Our senior faculty remains involved to resolve any academic hurdles.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
      
    </div>
  );
}