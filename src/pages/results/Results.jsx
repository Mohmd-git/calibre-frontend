import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Award, TrendingUp, CheckCircle2, GraduationCap, ChevronDown } from "lucide-react";
import calibrePic from "../../assets/calibre-pic.jpeg";
import badgePic from "../../assets/excellence-badge.png";

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
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

export default function Results() {
  const [results, setResults] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [filterClass, setFilterClass] = useState("All");
  const [filterYear, setFilterYear] = useState("All");
  const [filterBoard, setFilterBoard] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchResults = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/results");
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  const topPerformers = results
    .filter((s) => s.topperRank)
    .sort((a, b) => Number(a.topperRank) - Number(b.topperRank));

  const uniqueClasses = [...new Set(results.map(r => r.course?.split(" | ")[0]).filter(Boolean))].sort();
  const uniqueYears = [...new Set(results.map(r => r.year).filter(Boolean))].sort((a, b) => b - a);
  const uniqueBoards = [...new Set(results.map(r => r.course?.split(" | ")[1]).filter(Boolean))].sort();

  const displayedResults = results
    .filter((s) => {
      const matchClass = filterClass === "All" || s.course?.startsWith(filterClass);
      const matchYear = filterYear === "All" || String(s.year) === String(filterYear);
      const matchBoard = filterBoard === "All" || s.course?.endsWith(filterBoard);
      return matchClass && matchYear && matchBoard;
    })
    .sort((a, b) => (b.year || 0) - (a.year || 0));

  const rankLabel = (rank) => {
    if (rank === "1") return "1st Rank";
    if (rank === "2") return "2nd Rank";
    if (rank === "3") return "3rd Rank";
    return `Rank #${rank}`;
  };

  return (
    <div className="bg-[#fafcff] min-h-screen font-sans text-gray-800">

      {/* HERO */}
      <section className="bg-[#f0f6ff] pt-12 sm:pt-16 md:pt-20 pb-20 sm:pb-24 md:pb-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

            <div className="w-full md:w-3/5 text-center md:text-left">
              <ScrollReveal delay={100}>
                <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full inline-block mb-4">
                  Celebrating Academic Excellence
                </span>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Honoring Our{" "}
                  <span className="text-blue-500 italic">Champions</span> of 2024
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 italic max-w-xl mx-auto md:mx-0">
                  Year after year, our students redefine success with stellar performances in board exams and competitive tests.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={400}>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Link
                    to="/courses"
                    className="bg-[#1884FF] hover:bg-blue-600 active:scale-95 transition text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-sm text-center"
                  >
                    Explore Courses
                  </Link>
                  <button className="bg-white border border-gray-200 hover:bg-gray-50 active:scale-95 transition text-gray-700 px-6 py-3 rounded-lg text-sm font-semibold shadow-sm">
                    Share Your Story
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Badge */}
            <div className="flex justify-center w-full md:w-2/5 md:justify-end">
              <ScrollReveal delay={300}>
                <img
                  src={badgePic}
                  alt="Legacy of Excellence Badge"
                  className="w-40 sm:w-56 md:w-full md:max-w-[260px] lg:max-w-[340px] drop-shadow-xl object-contain hover:scale-105 transition-transform duration-500"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:mt-[-3.5rem] md:-mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {[
            { value: "150+",  label: "Distinctions",       icon: <Award size={16} className="text-blue-500" /> },
            { value: "99.4%", label: "Highest Aggregate",  icon: <TrendingUp size={16} className="text-blue-500" /> },
            { value: "100%", label: "Overall Pass Rate",  icon: <CheckCircle2 size={16} className="text-blue-500" /> },
            { value: "45+",   label: "CET/NEET Cleared",   icon: <GraduationCap size={16} className="text-blue-500" /> },
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 flex flex-col items-center justify-center text-center">
                <div className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5">{stat.value}</div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* BOARD TOPPERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-16 md:mt-24">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
              Board Toppers
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 max-w-2xl mx-auto px-2">
              Meet the brilliant minds who topped their respective boards with flying colors.
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
          {topPerformers.length > 0 ? (
            topPerformers.map((topper, index) => (
              <ScrollReveal key={topper._id} delay={index * 150}>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-6 md:p-8 text-center relative hover:shadow-md transition flex flex-col shrink-0 w-[70vw] sm:w-[55vw] md:w-auto snap-start h-full">
                  <span className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-[#1884FF] text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {rankLabel(topper.topperRank)}
                  </span>
                  <img
                    src={topper.image || calibrePic}
                    alt={topper.studentName}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full object-cover mb-3 sm:mb-4 md:mb-5 shadow-sm border-2 border-white"
                  />
                  <div className="text-[#1884FF] font-bold text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">
                    {topper.score}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base font-bold text-gray-900">{topper.studentName}</div>
                  <div className="text-[11px] sm:text-xs text-gray-400 mt-1 mb-4 flex-grow">{topper.course}</div>
                  <div className="flex items-center justify-center gap-1.5 text-slate-600 bg-slate-50 w-full py-2 rounded-xl text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mt-auto border border-slate-200">
                    <Award size={12} /> Calibre Pride
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            <p className="text-center text-gray-400 py-10 italic w-full col-span-3">
              New toppers will be updated soon!
            </p>
          )}
        </div>
      </section>

      {/* DETAILED RESULTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-14 sm:mt-16 md:mt-24">
        <ScrollReveal>
          <div className="flex flex-col gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">Detailed Results</h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-500">View our top performers across all courses.</p>
            </div>

            {/* Filters — horizontal scroll on mobile */}
            <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {[
                { value: filterClass, setValue: setFilterClass, options: uniqueClasses, defaultLabel: "All Classes" },
                { value: filterYear, setValue: setFilterYear, options: uniqueYears, defaultLabel: "All Years", format: (y) => `Batch of ${y}` },
                { value: filterBoard, setValue: setFilterBoard, options: uniqueBoards, defaultLabel: "All Boards" },
              ].map(({ value, setValue, options, defaultLabel, format }, idx) => (
                <div key={idx} className="relative flex-shrink-0 min-w-[120px] sm:min-w-[140px]">
                  <select
                    className="appearance-none w-full border border-gray-200 bg-white pl-3 pr-7 py-2 rounded-lg text-xs sm:text-sm text-gray-600 font-medium outline-none hover:bg-gray-50 focus:ring-2 focus:ring-blue-100 cursor-pointer transition-all"
                    value={value}
                    onChange={(e) => { setValue(e.target.value); setVisibleCount(8); }}
                  >
                    <option value="All">{defaultLabel}</option>
                    {options.map((o) => (
                      <option key={o} value={o}>{format ? format(o) : o}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} className="text-gray-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Results grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {displayedResults.slice(0, visibleCount).map((student, index) => (
            <ScrollReveal key={student._id} delay={(index % 4) * 80}>
              <div className="bg-white h-full rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6 text-center hover:shadow-md transition relative flex flex-col">
                {student.topperRank && (
                  <span className="absolute top-2 right-2 bg-yellow-100 text-yellow-700 text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                    🏆 #{student.topperRank}
                  </span>
                )}
                <img
                  src={student.image?.startsWith("blob") ? calibrePic : student.image || calibrePic}
                  alt={student.studentName}
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-full object-cover mb-2 sm:mb-3 md:mb-4 shadow-sm border border-gray-50"
                />
                <div className="text-[#1884FF] font-bold text-base sm:text-lg md:text-xl mb-0.5 sm:mb-1">{student.score}</div>
                <div className="text-[11px] sm:text-xs md:text-sm font-bold text-gray-900 leading-tight">{student.studentName}</div>
                <div className="text-[10px] sm:text-[11px] md:text-xs text-gray-500 mt-0.5 font-medium leading-snug">{student.course}</div>
                <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 mb-3 sm:mb-4 font-medium flex-grow">
                  Batch of {student.year || "N/A"}
                </div>
                <div className="flex items-center justify-center gap-1 text-slate-500 text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest border-t border-slate-50 pt-2 mt-auto">
                  <Award size={11} className="text-blue-400" /> Calibre Alumni
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {displayedResults.length === 0 && (
          <div className="text-center bg-white border border-gray-100 rounded-2xl py-10 px-4 shadow-sm text-gray-500">
            <span className="text-3xl mb-2 block">🔍</span>
            <p className="font-semibold text-gray-800 text-sm">No results found.</p>
            <button
              onClick={() => { setFilterClass("All"); setFilterYear("All"); setFilterBoard("All"); }}
              className="mt-3 text-[#1884FF] text-xs font-bold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}

        {displayedResults.length > visibleCount && (
          <ScrollReveal>
            <div className="text-center mt-8 sm:mt-10">
              <button
                onClick={() => setVisibleCount(prev => prev + 8)}
                className="bg-white border border-gray-200 hover:bg-gray-50 active:scale-95 text-gray-700 px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition"
              >
                Load Previous Batches
              </button>
            </div>
          </ScrollReveal>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 mb-4 sm:mb-6 md:mb-10">
        <ScrollReveal>
          <div className="bg-[#1884FF] rounded-2xl p-6 sm:p-8 md:p-12 text-center text-white shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
              Ready to be Our Next Success Story?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Join the ranks of our high achievers. Expert guidance and a proven track record await you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="bg-white text-[#1884FF] px-6 sm:px-8 py-3 rounded-lg text-sm font-bold shadow-sm hover:bg-gray-50 active:scale-95 transition text-center"
              >
                Join Our Next Batch
              </Link>
              <Link
                to="/courses"
                className="bg-transparent border border-white text-white px-6 sm:px-8 py-3 rounded-lg text-sm font-bold hover:bg-white/10 active:scale-95 transition text-center"
              >
                View Courses
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}