import { useEffect, useState, useRef } from "react";
import { BookOpen, Quote, Sparkles, Star } from "lucide-react";

import shahinaPic from "../../assets/shahina mam.jpg.jpeg";
import anuskhaPic from "../../assets/Anuskha.jpeg";
import zarinPic from "../../assets/Zarin mam.jpeg";
import shrutiPic from "../../assets/shruti.jpeg";
import shubhamImg from "../../assets/Shubham.jpeg";
import shanidevPic from "../../assets/shanidev.jpeg";
import teamHeroPic from "../../assets/ourteam.png";

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out w-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

const teachers = [
  {
    id: 1,
    name: "Shahina Mam",
    role: "Founder & Mentor",
    subject: "Mathematics",
    image: shahinaPic,
    quote: "Education is not the learning of facts, but the training of the mind to think.",
    bio: "With years of experience in shaping young minds, our founder believes in building strong foundational concepts. Her innovative approach to mathematics has helped thousands of students overcome their fear of numbers and achieve top-tier results.",
  },
  {
    id: 2,
    name: "Anuskha Mam",
    role: "Science Faculty",
    subject: "Science",
    image: anuskhaPic,
    quote: "Science is a way of thinking much more than it is a body of knowledge.",
    bio: "A passionate educator who brings textbook concepts to life. Through practical examples and interactive teaching methods, she ensures that every student not only understands complex scientific theories but develops a genuine curiosity for how the universe works.",
  },
  {
    id: 3,
    name: "Zarin Mam",
    role: "Language Faculty",
    subject: "Hindi & Marathi",
    image: zarinPic,
    quote: "Language is the road map of a culture. It tells you where its people come from and where they are going.",
    bio: "Dedicated to preserving the beauty of regional and national languages. Her engaging storytelling techniques and focus on grammatical precision have consistently helped students score perfectly in their language board exams.",
  },
  {
    id: 4,
    name: "Shruti Mam",
    role: "English Faculty",
    subject: "English & SST",
    image: shrutiPic,
    quote: "The art of teaching is the art of assisting discovery.",
    bio: "An expert in literature and social sciences, making history and English literature feel like an exciting journey rather than a syllabus. She focuses on improving students' articulation, writing skills, and critical thinking abilities.",
  },
  {
    id: 5,
    name: "Shubham Sir", // ✅ Added Shubham's Profile
    role: "Commerce Faculty",
    subject: "Accounts",
    image: shubhamImg,
    quote: "Accounting is the language of business, and mastering it unlocks the mechanics of success.",
    bio: "With a sharp eye for detail and a knack for simplifying complex financial concepts, our Accounts expert guides students through the rigorous logic of commerce. His practical approach ensures students don't just memorize formulas, but understand the real-world applications of accounting principles.",
  },
  {
    id: 6,
    name: "Shanidev Tiwari",
    role: "Administrator",
    subject: "Operations & Management",
    image: shanidevPic,
    quote: "Behind every successful student is a system that works tirelessly to support them.",
    bio: "Shanidev ensures the seamless operation of Calibre Tutorials. From managing student schedules to coordinating with faculty and parents, he is the backbone that keeps our educational ecosystem running efficiently and effectively.",
  },
];

export default function OurTeam() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#fafcff] font-sans text-gray-800 pb-16 sm:pb-20">

      {/* ── HERO ── */}
      <section className="bg-[#f0f6ff] pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            {/* LEFT — text */}
            <div className="flex-1 text-center md:text-left">
              <ScrollReveal delay={100}>
                <span className="text-[10px] sm:text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full inline-block mb-4">
                  Our Faculty
                </span>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-5 tracking-tight leading-tight">
                  Meet Our{" "}
                  <span className="text-[#1884FF]">Mentors</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8">
                  The dedicated educators and visionaries behind Calibre Tutorials,
                  committed to shaping bright futures through quality education.
                </p>
              </ScrollReveal>

              {/* ✅ INSPIRING QUOTE BOX — the main improvement */}
              <ScrollReveal delay={400}>
                <div className="relative bg-white border border-blue-100 rounded-2xl px-5 sm:px-6 py-4 sm:py-5 shadow-sm max-w-xl mx-auto md:mx-0">
                  {/* decorative quote mark */}
                  <div className="absolute -top-3 left-5 w-7 h-7 bg-[#1884FF] rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-serif text-base leading-none pt-1">"</span>
                  </div>
                  <p className="text-gray-700 italic text-sm sm:text-base font-medium leading-relaxed mt-1">
                    A good teacher can inspire hope, ignite the imagination, and instill a love of learning.
                  </p>
                  <div className="flex items-center gap-1 mt-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-gray-400 ml-1 font-medium">— Brad Henry</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

          {/* RIGHT — image, ONLY on md+ */}
<div className="hidden md:flex justify-end flex-shrink-0 md:w-auto">
  <ScrollReveal delay={300}>
    <div className="relative">
      <div className="absolute w-64 h-64 bg-blue-200/40 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
      <img
        src={teamHeroPic}
        alt="Our Team"
        className="w-72 lg:w-80 xl:w-[400px] drop-shadow-xl object-contain hover:-translate-y-2 transition-transform duration-500"
      />
    </div>
  </ScrollReveal>
</div>
          </div>
        </div>
      </section>

      {/* ── TEAM LIST ── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-12 sm:gap-16 md:gap-24">

          {teachers.map((teacher, index) => (
            <ScrollReveal key={teacher.id} delay={100}>
              <div
                className={`flex flex-col gap-6 sm:gap-8 md:gap-16 items-center ${
                  index % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Image */}
                <div className="w-44 sm:w-56 md:w-5/12 lg:w-1/3 shrink-0 relative group">
                  <div className="absolute inset-0 bg-blue-600 rounded-[2rem] sm:rounded-[2.5rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 -z-10" />
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full aspect-square object-cover object-top rounded-[2rem] sm:rounded-[2.5rem] shadow-xl border-4 sm:border-8 border-white relative z-10 transition-transform duration-500 group-hover:-translate-y-2"
                  />
                </div>

                {/* Content */}
                <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-center text-center md:text-left">

                  <div className="mb-3 sm:mb-4">
                    <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-blue-600 mb-1 sm:mb-2 block">
                      {teacher.role}
                    </span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
                      {teacher.name}
                    </h2>
                  </div>

                  {/* Subject badge */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 w-max px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 mx-auto md:mx-0">
                    <BookOpen size={14} className="text-blue-500" />
                    {teacher.subject}
                  </div>

                  {/* Bio */}
                  <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 sm:mb-8">
                    {teacher.bio}
                  </p>

                  {/* Quote box */}
                  <div className="relative bg-[#f4f8ff] rounded-2xl p-4 sm:p-6 border-l-4 border-blue-500 shadow-sm text-left">
                    <Quote className="absolute top-3 right-3 sm:top-4 sm:right-4 text-blue-200/50" size={32} />
                    <p className="text-gray-700 italic text-sm sm:text-base md:text-lg font-medium leading-relaxed relative z-10">
                      "{teacher.quote}"
                    </p>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          ))}

        </div>
      </section>

      {/* ── CLOSING ── */}
      <section className="bg-white py-16 sm:py-24 border-t border-gray-100">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-sm">
              <Sparkles size={18} />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Together We Build Futures
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              At Calibre Tutorials, our educators work as a team to ensure every
              student receives the guidance, motivation, and support needed to
              succeed academically and personally.
            </p>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}