import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import { 
  Search, 
  Filter, 
  BookOpen, 
  ChevronRight, 
  FileText, 
  Download, 
  Clock, 
  HardDrive,
  Loader2
} from "lucide-react";

import studyHubPic from "../../assets/study-hub-illustration.png";

// ✅ SCROLL REVEAL COMPONENT
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
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

const SIDEBAR_CATEGORIES = [
  { label: "All Materials", value: "All" },
  { label: "Class 5th", value: "5" },
  { label: "Class 6th", value: "6" },
  { label: "Class 7th", value: "7" },
  { label: "Class 8th", value: "8" },
  { label: "Class 9th", value: "9" },
  { label: "Class 10th", value: "10" },
  { label: "Class 11th Science", value: "11 Science" },
  { label: "Class 11th Commerce", value: "11 Commerce" },
  { label: "Class 12th Science", value: "12 Science" },
  { label: "Class 12th Commerce", value: "12 Commerce" },
  { label: "Competitive Exams", value: "Competitive Exams" },
];

export default function StudyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/materials");
      setMaterials(res.data);
      setFilteredMaterials(res.data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let result = materials;
    if (activeCategory !== "All") {
      result = result.filter(m => String(m.classLevel) === String(activeCategory));
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter((m) =>
        (m.title && m.title.toLowerCase().includes(lowerSearch)) ||
        (m.subject && m.subject.toLowerCase().includes(lowerSearch)) ||
        (m.board && m.board.toLowerCase().includes(lowerSearch))
      );
    }
    setFilteredMaterials(result);
  }, [searchTerm, activeCategory, materials]);

  return (
    <div className="bg-[#fafcff] min-h-screen font-sans text-gray-800 pb-20">

      {/* HERO SECTION */}
      <section className="bg-[#f0f6ff] pt-16 pb-20 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            <div className="max-w-2xl text-left md:w-1/2">
              <ScrollReveal delay={100}>
                {/* ✅ UPDATED: Increased slightly for clarity */}
                <span className="text-xs font-bold tracking-wider uppercase bg-blue-100 text-blue-600 px-3 py-1.5 rounded-full inline-block mb-4">
                  Digital Learning Hub
                </span>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                {/* ✅ REVERTED: Kept at text-4xl/5xl as per your request */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                  Explore Our Comprehensive <span className="text-[#1884FF]">Study<br/>Material</span>
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                {/* ✅ UPDATED: Increased Font specifically for this description */}
                <p className="text-gray-500 text-base md:text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
                  Access high-quality revision notes, solved previous year papers, and curated study guides designed by expert faculty to help you excel.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="relative max-w-xl">
                  <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search by topic, chapter, or subject..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm transition"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="hidden md:flex justify-center md:justify-end md:w-1/2 relative">
              <ScrollReveal delay={300}>
                <div className="absolute w-64 h-64 bg-blue-200/40 rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <img 
                  src={studyHubPic} 
                  alt="Digital Learning Hub Illustration" 
                  className="w-full max-w-[400px] lg:max-w-[480px] drop-shadow-xl object-contain hover:-translate-y-2 transition-transform duration-500"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-8 shrink-0">
          <ScrollReveal delay={100}>
            <div>
              <div className="flex items-center gap-2 text-base font-bold text-gray-900 mb-4 px-2">
                <Filter size={18} className="text-[#1884FF]" />
                Filter by Class
              </div>
              <ul className="flex flex-col gap-1 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {SIDEBAR_CATEGORIES.map((cat, idx) => {
                  const isActive = activeCategory === cat.value;
                  return (
                    <li key={idx}>
                      <button 
                        onClick={() => setActiveCategory(cat.value)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm transition-colors ${
                          isActive 
                            ? "bg-[#f0f6ff] text-[#1884FF] font-semibold" 
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {idx === 0 && <BookOpen size={16} />}
                          {cat.label}
                        </div>
                        {idx !== 0 && <ChevronRight size={14} className={isActive ? "text-[#1884FF]" : "text-gray-300"} />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-[#eaf3ff] rounded-2xl p-6 border border-blue-100/50">
              <h3 className="font-bold text-[#146bcc] mb-2">Can't find what you need?</h3>
              <p className="text-xs text-[#3b85d9] leading-relaxed mb-5">
                Looking for a specific topic or reference material? Let us know.
              </p>
              <Link 
                to="/contact"
                className="w-full bg-white text-[#1884FF] border border-blue-100 py-2.5 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 transition flex items-center justify-center"
              >
                Request Material
              </Link>
            </div>
          </ScrollReveal>
        </aside>

        {/* RIGHT CONTENT AREA */}
        <div className="w-full lg:w-3/4">
          <ScrollReveal delay={100}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-gray-100 pb-4">
              <div>
                <div className="text-[10px] text-gray-400 font-medium mb-1">
                  Resources <span className="mx-1">{'>'}</span> <span className="text-gray-700">{SIDEBAR_CATEGORIES.find(c => c.value === activeCategory)?.label}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Available Documents</h2>
              </div>
              {!isLoading && (
                <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-xs text-gray-500 font-medium shadow-sm">
                  Showing {filteredMaterials.length} results
                </div>
              )}
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-blue-600">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="text-sm font-medium text-gray-500">Loading resources...</p>
            </div>
          ) : filteredMaterials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMaterials.map((doc, index) => {
                const fileCount = doc.files ? doc.files.length : 0;
                const uploadDate = new Date(doc.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                
                let displayClass = "Class N/A";
                if (doc.classLevel) {
                  const foundCat = SIDEBAR_CATEGORIES.find(c => c.value === String(doc.classLevel));
                  displayClass = foundCat ? foundCat.label : `Class ${doc.classLevel}`;
                }

                return (
                  <ScrollReveal key={doc._id} delay={(index % 3) * 100}>
                    <div className="bg-white h-full rounded-2xl border border-gray-100 p-6 flex flex-col shadow-sm hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50 text-blue-600">
                          <FileText size={20} />
                        </div>
                        <span className="bg-gray-100 text-gray-600 text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded">
                          {fileCount} {fileCount === 1 ? 'File' : 'Files'}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-gray-900 mb-3 line-clamp-2 leading-snug min-h-[40px]">
                        {doc.title || "Untitled Document"}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-5">
                        <span className="bg-white border border-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-md whitespace-nowrap capitalize">
                          {doc.subject || "Subject N/A"}
                        </span>
                        <span className="bg-white border border-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-md whitespace-nowrap uppercase">
                          {doc.board || "Board N/A"}
                        </span>
                        <span className="bg-white border border-gray-200 text-gray-500 text-[10px] px-2 py-1 rounded-md whitespace-nowrap">
                          {displayClass}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] text-gray-400 font-medium mt-auto mb-5">
                        <span className="flex items-center gap-1.5">
                          <HardDrive size={12} /> Standard PDF
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock size={12} /> {uploadDate !== 'Invalid Date' ? uploadDate : 'Recently Added'}
                        </span>
                      </div>

                      {fileCount > 0 ? (
                        <a 
                          href={doc.files[0]?.fileUrl || "#"} 
                          target="_blank"
                          rel="noreferrer"
                          className="w-full flex items-center justify-center gap-2 bg-[#1884FF] text-white py-2 rounded-lg text-xs font-semibold hover:bg-blue-700 shadow-sm transition"
                        >
                          <Download size={14} /> Download Material
                        </a>
                      ) : (
                        <button disabled className="w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-400 py-2 rounded-lg text-xs font-semibold cursor-not-allowed">
                          No files attached
                        </button>
                      )}
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-blue-100 shadow-sm">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="font-extrabold text-gray-900 text-2xl mb-2">The Library is Expanding!</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed mb-6">
                Our faculty is compiling top-tier study notes. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}