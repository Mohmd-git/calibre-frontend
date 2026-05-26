import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Clock, Users, PlayCircle, ListVideo, BookX, Loader2, BookOpen } from "lucide-react";
import calibrePic from "../../assets/calibre-pic.jpeg";
import { TextField, Chip, Stack, InputAdornment } from "@mui/material";
import { Search as MuiSearch } from "@mui/icons-material";

const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else setIsVisible(false);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

const TAG_MATCHERS = {
  "All Courses": () => true,
  "Class 5-10": (c) => {
    const tc = c.targetClass?.toLowerCase() || "";
    const tag = c.tag?.toLowerCase() || "";
    const classNum = tc.match(/class\s*(\d+)/);
    if (classNum) {
      const num = parseInt(classNum[1]);
      return num >= 5 && num <= 10;
    }
    return tag.includes("5-10") || tag.includes("class 5") || tag.includes("class 6") ||
           tag.includes("class 7") || tag.includes("class 8") || tag.includes("class 9") ||
           tag.includes("class 10");
  },
  "Class 11-12 Science": (c) => {
    const tc = c.targetClass?.toLowerCase() || "";
    const classNum = tc.match(/class\s*(\d+)/);
    if (classNum) {
      const num = parseInt(classNum[1]);
      return (num === 11 || num === 12) && tc.includes("sci");
    }
    return false;
  },
  "Class 11-12 Commerce": (c) => {
    const tc = c.targetClass?.toLowerCase() || "";
    const classNum = tc.match(/class\s*(\d+)/);
    if (classNum) {
      const num = parseInt(classNum[1]);
      return (num === 11 || num === 12) && tc.includes("com");
    }
    return false;
  },
};

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("All Courses");
  const [isLoading, setIsLoading] = useState(true);

  const tags = ["All Courses", "Class 5-10", "Class 11-12 Science", "Class 11-12 Commerce"];

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data);
        setFilteredCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;
    const matcher = TAG_MATCHERS[selectedTag] || (() => true);
    result = result.filter(matcher);
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.title?.toLowerCase().includes(lowerSearch) ||
          c.tag?.toLowerCase().includes(lowerSearch) ||
          c.targetClass?.toLowerCase().includes(lowerSearch) ||
          c.description?.toLowerCase().includes(lowerSearch) ||
          c.videoType?.toLowerCase().includes(lowerSearch)
      );
    }
    setFilteredCourses(result);
  }, [searchTerm, selectedTag, courses]);

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">

      {/* HERO — mobile: reduce padding & font sizes */}
      <div className="bg-[#eef4fb] py-12 sm:py-20 text-center overflow-hidden px-4 sm:px-6">
        <ScrollReveal delay={100}>
          <p className="text-xs sm:text-sm md:text-base text-blue-600 font-bold tracking-widest mb-3 uppercase">
            ACADEMIC EXCELLENCE
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
            Our Educational <span className="text-blue-600">Programs</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-5 leading-relaxed">
            Access our free, high-quality video modules designed to nurture talent and ensure top academic results.
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-6 sm:mt-10">

        {/* SEARCH + FILTER — stack on mobile, row on md+ */}
        <ScrollReveal delay={100}>
          <div className="bg-white border border-gray-200 rounded-2xl px-4 sm:px-5 py-4 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            {/* Search — full width always */}
            <div className="w-full md:w-auto">
              <TextField
                placeholder="Search courses, classes, or topics..."
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: { xs: "100%", md: 320 },
                  backgroundColor: "#f9fafb",
                  "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: "14px" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MuiSearch fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            {/* Filter chips — horizontal scroll on mobile */}
            <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Stack
                direction="row"
                spacing={1}
                sx={{ flexWrap: { xs: "nowrap", md: "wrap" }, gap: "8px", minWidth: "max-content" }}
              >
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    clickable
                    color={selectedTag === tag ? "primary" : "default"}
                    variant={selectedTag === tag ? "filled" : "outlined"}
                    onClick={() => setSelectedTag(tag)}
                    sx={{ fontWeight: selectedTag === tag ? "bold" : "medium" }}
                  />
                ))}
              </Stack>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex justify-between items-center mt-4 sm:mt-6 text-xs text-gray-500">
            <p>Showing {filteredCourses.length} courses that match your selection</p>
          </div>
        </ScrollReveal>

        {/* COURSES GRID & EMPTY STATES */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-blue-600">
            <Loader2 size={40} className="animate-spin mb-4" />
            <p className="text-sm font-medium text-gray-500">Loading curriculum...</p>
          </div>
        ) : filteredCourses.length === 0 ? (
          
          /* ✅ SMART EMPTY STATE LOGIC */
          searchTerm ? (
            /* STATE 1: User searched for something but nothing matched */
            <ScrollReveal delay={200}>
              <div className="flex flex-col items-center justify-center py-16 sm:py-20 bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mt-6 px-5 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-5 border border-gray-100">
                  <BookX size={32} className="text-gray-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No matching courses</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
                  We couldn't find anything for <span className="font-semibold text-gray-700">"{searchTerm}"</span>. Try adjusting your keywords or filters.
                </p>
              </div>
            </ScrollReveal>
          ) : (
            /* STATE 2: The category is empty (Admin hasn't uploaded courses yet) */
            <ScrollReveal delay={200}>
              <div className="flex flex-col items-center justify-center py-16 sm:py-24 bg-white rounded-[2rem] border border-blue-50 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mt-6 px-5 text-center">
                <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">🎓</div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Curriculum in Progress!</h3>
                <p className="text-sm sm:text-base text-gray-500 max-w-md mx-auto leading-relaxed font-medium">
                  Our expert faculty is currently designing and recording top-tier video modules for this section. Stay tuned for new content!
                </p>
              </div>
            </ScrollReveal>
          )

        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
            {filteredCourses.map((c, index) => {
              const isPlaylist = c.playlistLink?.includes("list=");
              const hasBadge = c.badge && c.badge !== "Standard";

              return (
                <ScrollReveal key={c._id} delay={(index % 3) * 100}>
                  <div className="bg-white h-full rounded-xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
                    <div className="relative overflow-hidden">
                      <img
                        src={c.image || calibrePic}
                        alt={c.title}
                        className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider uppercase shadow-sm">
                        {c.targetClass || c.tag}
                      </span>
                      {hasBadge && (
                        <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wider shadow-sm">
                          {c.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] text-blue-600 font-bold mb-3 uppercase tracking-widest">
                        <BookOpen size={14} className="text-blue-500" />
                        {c.videoType || "Video Lesson"}
                      </div>

                      <h3 className="font-extrabold text-gray-900 text-base mb-2 line-clamp-2 leading-snug">
                        {c.title}
                      </h3>

                      <p className="text-sm text-gray-500 mb-5 line-clamp-2 flex-grow font-medium leading-relaxed">
                        {c.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-5 pb-5 border-b border-gray-100">
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} className="text-blue-400" /> {c.duration || "N/A"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users size={14} className="text-blue-400" /> Free Access
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-auto">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                          {isPlaylist
                            ? <><ListVideo size={16} className="text-slate-400" /> Playlist</>
                            : <><PlayCircle size={16} className="text-slate-400" /> Video</>
                          }
                        </div>
                        <button
                          onClick={() => window.open(c.playlistLink, "_blank")}
                          className="text-xs bg-[#1884FF] text-white px-5 py-2.5 rounded-xl hover:bg-blue-600 active:scale-95 font-bold transition-all shadow-[0_4px_14px_0_rgb(24,132,255,0.39)] hover:shadow-[0_6px_20px_rgba(24,132,255,0.23)] whitespace-nowrap"
                        >
                          Start Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* CTA BANNER */}
        <ScrollReveal>
          <div className="mt-16 sm:mt-20 rounded-[2rem] flex flex-col md:flex-row overflow-hidden shadow-[0_8px_30px_rgb(24,132,255,0.2)]">
            <div className="bg-[#1884FF] p-8 sm:p-10 lg:p-12 flex-1 text-white">
              <span className="bg-[#4D9EFF] text-white text-[10px] font-bold tracking-widest mb-4 inline-block px-3.5 py-1.5 rounded-full uppercase">
                Admissions Open
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight tracking-tight">
                Need help choosing the right program for your child?
              </h2>
              <p className="text-sm md:text-base text-blue-100 mt-3 max-w-lg leading-relaxed font-medium">
                Schedule a free academic counseling session with our expert faculty to identify strengths and career goals.
              </p>
            </div>

            <div className="bg-[#3B9CFF] p-8 sm:p-10 lg:p-12 flex flex-row md:flex-col xl:flex-row items-center justify-center gap-4 md:min-w-[300px] lg:min-w-[420px]">
              <Link
                to="/contact"
                className="flex-1 md:flex-none bg-white text-[#1884FF] px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-gray-50 active:scale-95 transition-all w-full xl:w-auto shadow-sm text-center whitespace-nowrap"
              >
                Book Free Session
              </Link>
              <Link
                to="/counseling"
                className="flex-1 md:flex-none bg-transparent border-2 border-white/80 text-white px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-white/10 active:scale-95 transition-all w-full xl:w-auto text-center whitespace-nowrap"
              >
                Learn More
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* STATS */}
        <div className="mt-16 sm:mt-24 text-center">
          <ScrollReveal delay={100}>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">
              Join over 5,000+ Successful Alumni
            </h3>
            <p className="text-sm md:text-base font-medium text-gray-500 mb-10 sm:mb-12">
              Trusted by parents for over 20 years across Navi Mumbai
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {["100%", "20+", "15:1", "50+"].map((val, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-[#FAFAFB] border border-gray-100 py-8 px-4 rounded-2xl text-center h-full hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-4xl sm:text-5xl font-black text-[#1884FF] mb-3">{val}</div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                    {["Pass Rate", "Experience", "Student Ratio", "Top Rankers"][i]}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom"; 
// import { Clock, Users, PlayCircle, ListVideo, BookX, Loader2, BookOpen } from "lucide-react";
// import calibrePic from "../../assets/calibre-pic.jpeg";
// import { TextField, Chip, Stack, InputAdornment } from "@mui/material";
// import { Search as MuiSearch } from "@mui/icons-material";

// // ✅ UPDATED SCROLL REVEAL COMPONENT
// const ScrollReveal = ({ children, delay = 0 }) => {
//   const [isVisible, setIsVisible] = useState(false);
//   const ref = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//         } else {
//           setIsVisible(false);
//         }
//       },
//       { threshold: 0.15 }
//     );

//     if (ref.current) observer.observe(ref.current);
//     return () => {
//       if (ref.current) observer.unobserve(ref.current);
//     };
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`transition-all duration-1000 ease-out ${
//         isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
//       }`}
//       style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
//     >
//       {children}
//     </div>
//   );
// };

// export default function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [filteredCourses, setFilteredCourses] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTag, setSelectedTag] = useState("All Courses");
//   const [isLoading, setIsLoading] = useState(true);

//   const tags = ["All Courses", "Class 5-10", "Class 11-12 Science", "Class 11-12 Commerce"];

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/courses");
//         setCourses(res.data);
//         setFilteredCourses(res.data);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     let result = courses;

//     if (selectedTag !== "All Courses") {
//       result = result.filter((c) => c.tag === selectedTag);
//     }

//     if (searchTerm) {
//       const lowerSearch = searchTerm.toLowerCase();
//       result = result.filter(
//         (c) =>
//           c.title.toLowerCase().includes(lowerSearch) ||
//           c.tag.toLowerCase().includes(lowerSearch) ||
//           (c.targetClass && c.targetClass.toLowerCase().includes(lowerSearch)) ||
//           (c.description && c.description.toLowerCase().includes(lowerSearch)) ||
//           (c.videoType && c.videoType.toLowerCase().includes(lowerSearch))
//       );
//     }

//     setFilteredCourses(result);
//   }, [searchTerm, selectedTag, courses]);

//   return (
//     <div className="bg-[#f8fafc] min-h-screen pb-20">
//       {/* HERO */}
//       <div className="bg-[#eef4fb] py-20 text-center overflow-hidden">
//         <ScrollReveal delay={100}>
//           <p className="text-sm text-blue-600 font-bold tracking-widest mb-4 uppercase">
//             Academic Excellence
//           </p>
//         </ScrollReveal>
        
//         <ScrollReveal delay={200}>
//           <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight px-4">
//             Our Educational <span className="text-blue-600">Programs</span>
//           </h1>
//         </ScrollReveal>
        
//         <ScrollReveal delay={300}>
//           <p className="text-gray-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mt-6 px-4">
//             Access our free, high-quality video modules designed to nurture talent and ensure top academic results.
//           </p>
//         </ScrollReveal>
//       </div>

//       <div className="max-w-7xl mx-auto px-6 mt-12">
        
//         {/* SEARCH + FILTER SECTION */}
//         <ScrollReveal delay={100}>
//           <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
//             <div className="flex items-center w-full md:w-auto">
//               <TextField
//                 placeholder="Search courses, classes, or topics..."
//                 variant="outlined"
//                 size="small"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 sx={{
//                   width: { xs: '100%', md: 360 }, 
//                   backgroundColor: "#f9fafb",
//                   "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize: "16px" },
//                   "& .MuiOutlinedInput-input": { padding: "12px 14px" }
//                 }}
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <MuiSearch fontSize="medium" />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </div>

//             <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ gap: '10px' }}>
//               {tags.map((tag) => (
//                 <Chip
//                   key={tag}
//                   label={tag}
//                   clickable
//                   color={selectedTag === tag ? "primary" : "default"}
//                   variant={selectedTag === tag ? "filled" : "outlined"}
//                   onClick={() => setSelectedTag(tag)}
//                   sx={{ fontSize: "14px", padding: "18px 4px", borderRadius: "8px", fontWeight: 500 }}
//                 />
//               ))}
//             </Stack>
//           </div>
//         </ScrollReveal>

//         <ScrollReveal delay={200}>
//           <div className="flex justify-between items-center mt-6 text-sm font-medium text-gray-500">
//             <p>Showing {filteredCourses.length} courses that match your selection</p>
//           </div>
//         </ScrollReveal>

//         {/* COURSES GRID */}
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-20 text-blue-600">
//             <Loader2 size={40} className="animate-spin mb-4" />
//             <p className="text-base font-medium text-gray-500">Loading curriculum...</p>
//           </div>
//         ) : filteredCourses.length === 0 ? (
//           <ScrollReveal delay={200}>
//             <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm mt-6">
//               <BookX size={64} className="text-gray-300 mb-5" />
//               <h3 className="text-2xl font-bold text-gray-800">No courses found</h3>
//               <p className="text-base text-gray-500 mt-2">Try adjusting your search or filters.</p>
//             </div>
//           </ScrollReveal>
//         ) : (
//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
//             {filteredCourses.map((c, index) => {
//               const isPlaylist = c.playlistLink?.includes("list=");
//               const hasBadge = c.badge && c.badge !== "Standard";

//               return (
//                 <ScrollReveal key={c._id} delay={(index % 3) * 100}>
//                   <div className="bg-white h-full rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
//                     {/* Image Container */}
//                     <div className="relative">
//                       <img 
//                         src={c.image || calibrePic} 
//                         alt={c.title} 
//                         className="w-full h-52 object-cover" 
//                       />
                      
//                       <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md font-bold tracking-wide uppercase shadow-sm">
//                         {c.targetClass || c.tag}
//                       </span>

//                       {hasBadge && (
//                         <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs px-3 py-1.5 rounded-md font-bold tracking-wide shadow-sm">
//                           {c.badge}
//                         </span>
//                       )}
//                     </div>

//                     <div className="p-6 flex flex-col flex-grow">
//                       <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mb-3 uppercase tracking-wider">
//                         <BookOpen size={16} className="text-blue-500" />
//                         {c.videoType || "Video Lesson"}
//                       </div>

//                       <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2">
//                         {c.title}
//                       </h3>

//                       <p className="text-base text-gray-500 mb-6 line-clamp-3 flex-grow leading-relaxed">
//                         {c.description}
//                       </p>

//                       <div className="flex items-center gap-5 text-sm text-gray-500 font-medium mb-6 pb-6 border-b border-gray-100">
//                         <span className="flex items-center gap-2">
//                           <Clock size={16} className="text-blue-400" /> {c.duration || "N/A"}
//                         </span>
//                         <span className="flex items-center gap-2">
//                           <Users size={16} className="text-blue-400" /> Free Access
//                         </span>
//                       </div>

//                       <div className="flex justify-between items-center mt-auto">
//                         <div className="flex items-center gap-1.5 text-sm font-bold text-slate-500 uppercase tracking-wider">
//                           {isPlaylist ? (
//                             <><ListVideo size={18} /> Playlist</>
//                           ) : (
//                             <><PlayCircle size={18} /> Video</>
//                           )}
//                         </div>
                        
//                         <a 
//                           href={c.playlistLink}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="text-sm bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 font-bold transition-all shadow-md shadow-blue-200 whitespace-nowrap"
//                         >
//                           Start Learning
//                         </a>
//                       </div>
//                     </div>
//                   </div>
//                 </ScrollReveal>
//               );
//             })}
//           </div>
//         )}

//         {/* CTA BANNER & STATS */}
//         <ScrollReveal>
//           <div className="mt-20 rounded-3xl flex flex-col md:flex-row overflow-hidden shadow-lg">
//             <div className="bg-[#1884FF] p-10 lg:p-12 flex-1 text-white">
//               <span className="bg-[#4D9EFF] text-white text-xs font-bold tracking-wider mb-5 inline-block px-4 py-2 rounded-full">
//                 Admissions Open
//               </span>
//               <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight">
//                 Need help choosing the right<br className="hidden md:block"/> program for your child?
//               </h2>
//               <p className="text-base md:text-lg text-blue-50 mt-3 max-w-xl leading-relaxed">
//                 Schedule a free academic counseling session with our expert faculty to identify strengths and career goals.
//               </p>
//             </div>
            
//             <div className="bg-[#3B9CFF] p-10 lg:p-12 flex flex-col sm:flex-row xl:flex-row items-center justify-center gap-4 lg:min-w-[420px]">
//               <Link 
//                 to="/contact" 
//                 className="bg-white text-[#1884FF] px-8 py-3.5 rounded-xl text-base font-bold hover:bg-gray-50 transition w-full sm:w-auto shadow-sm text-center whitespace-nowrap"
//               >
//                 Book Free Session
//               </Link>
//               <Link 
//                 to="/counseling" 
//                 className="bg-transparent border border-white text-white px-8 py-3.5 rounded-xl text-base font-bold hover:bg-white/10 transition w-full sm:w-auto shadow-sm text-center whitespace-nowrap"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </ScrollReveal>

//         <div className="mt-24 text-center">
//           <ScrollReveal delay={100}>
//             <h3 className="text-3xl font-bold text-gray-900 mb-3">Join over 5,000+ Successful Alumni</h3>
//             <p className="text-base md:text-lg text-gray-500 mb-12">Trusted by parents for over 20 years across Navi Mumbai</p>
//           </ScrollReveal>
          
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {["98%", "20+", "15:1", "50+"].map((val, i) => (
//               <ScrollReveal key={i} delay={i * 100}>
//                 <div className="bg-white border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-10 px-4 rounded-2xl text-center h-full">
//                   <div className="text-5xl font-extrabold text-[#6bb5ff] mb-3">{val}</div>
//                   <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
//                     {["Pass Rate", "Experience", "Student Ratio", "Top Rankers"][i]}
//                   </div>
//                 </div>
//               </ScrollReveal>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }