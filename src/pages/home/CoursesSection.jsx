import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BookOpen, Clock, PlayCircle, ListVideo, ArrowRight } from "lucide-react";
import calibrePic from "../../assets/calibre-pic.webp";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function CoursesSection() {
  const [premierCourses, setPremierCourses] = useState([]);

  useEffect(() => {
    const fetchHomeCourses = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/courses`);
        const homeCourses = res.data.filter(c => c.showOnHome).slice(0, 4);
        setPremierCourses(homeCourses);
      } catch (err) {
        console.error("Error fetching premier courses:", err);
      }
    };
    fetchHomeCourses();
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-[#f8fafc]" id="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4">
            Our Premier{" "}
            <span className="text-blue-600 border-b-4 border-blue-100">Courses</span>
          </h2>
          <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
            Expertly crafted academic programs tailored for every educational milestone.
          </p>
        </div>

        {premierCourses.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {premierCourses.map((c) => {
              const isPlaylist = c.playlistLink?.includes("list=");
              const hasBadge = c.badge && c.badge !== "Standard";

              return (
                <div
                  key={c._id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={c.image || calibrePic}
                      alt={c.title}
                      className="w-full h-36 sm:h-40 object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-md font-semibold tracking-wide uppercase shadow-sm">
                      {c.targetClass || c.tag}
                    </span>
                    {hasBadge && (
                      <span className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-[10px] px-2.5 py-1 rounded-md font-bold tracking-wide shadow-sm">
                        {c.badge}
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-1.5 text-[11px] text-blue-600 font-bold mb-2 sm:mb-3 uppercase tracking-wider">
                      <BookOpen size={13} className="text-blue-500" />
                      {c.videoType || "Video Lesson"}
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2 line-clamp-2">
                      {c.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-5 line-clamp-2 flex-grow">
                      {c.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3 sm:mb-5 pb-3 sm:pb-5 border-b border-gray-100">
                      <span className="flex items-center gap-1.5">
                        <Clock size={13} className="text-blue-400" />
                        {c.duration || "N/A"}
                      </span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-500 uppercase tracking-wider">
                        {isPlaylist
                          ? <><ListVideo size={13} /> Playlist</>
                          : <><PlayCircle size={13} /> Video</>
                        }
                      </div>
                    </div>

                    <button
                      onClick={() => window.open(c.playlistLink, "_blank")}
                      className="text-xs text-center w-full bg-blue-600 text-white px-5 py-2.5 sm:py-3 rounded-xl hover:bg-blue-700 active:scale-95 font-bold transition-all shadow-md shadow-blue-200 mt-auto"
                    >
                      Start Learning
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-14 bg-white rounded-2xl border-2 border-slate-200 border-dashed shadow-sm">
            <div className="text-4xl sm:text-5xl mb-4">🚀</div>
            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2">
              Exciting Programs on the Horizon!
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto leading-relaxed px-4">
              Our expert faculty is currently crafting premium learning experiences. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-8 sm:mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-800 active:scale-95 transition-all"
          >
            View All Programs <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}