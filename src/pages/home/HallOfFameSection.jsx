import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import calibrePic from "../../assets/calibre-pic.webp";
const API_URL = import.meta.env.VITE_BACKEND_URL;

const getRankColor = (rank) => {
  if (rank === "1") return "bg-yellow-500";
  if (rank === "2") return "bg-slate-400";
  if (rank === "3") return "bg-amber-600";
  return "bg-blue-500";
};

export default function HallOfFameSection() {
  const [hallOfFame, setHallOfFame] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/results`);
        let homeResults = response.data.filter((r) => r.showOnHome);
        homeResults.sort((a, b) => {
          const rankA = a.topperRank ? Number(a.topperRank) : 999;
          const rankB = b.topperRank ? Number(b.topperRank) : 999;
          return rankA - rankB;
        });
        setHallOfFame(homeResults.slice(0, 4));
      } catch (err) {
        console.error("Error fetching Hall of Fame:", err);
      }
    };
    fetchResults();
  }, []);

  return (
    <section className="py-14 sm:py-20 bg-blue-50" id="results">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Hall of Fame</h2>
          <div className="w-12 h-1 bg-blue-600 rounded mx-auto mb-3" />
          <p className="text-gray-500 text-xs sm:text-sm px-4">
            Celebrating the consistent academic brilliance of our students year after year.
          </p>
        </div>

        {hallOfFame.length > 0 ? (
          /* Horizontal scroll on mobile */
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6 mb-8 sm:mb-12 -mx-4 px-4 sm:mx-0 sm:px-0">
            {hallOfFame.map((student, index) => {
              const displayRank = student.topperRank || index + 1;
              const rankColor = getRankColor(student.topperRank);

              return (
                <div
                  key={student._id}
                  className="bg-white rounded-2xl p-5 sm:p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col shrink-0 w-[65vw] sm:w-auto snap-start"
                >
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
                    <img
                      src={student.image || calibrePic}
                      alt={student.studentName}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                    />
                    <span className={`absolute bottom-0 right-0 ${rankColor} text-white text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-md border-2 border-white`}>
                      {displayRank}
                    </span>
                  </div>

                  <div className="text-[#1884FF] font-black text-xl sm:text-2xl mb-1">{student.score}</div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{student.studentName}</h3>
                  <p className="text-gray-500 text-[10px] sm:text-[11px] mb-4 sm:mb-6">
                    {student.course} — Batch of {student.year || "N/A"}
                  </p>

                  <Link
                    to="/results"
                    className="mt-auto text-blue-600 text-xs font-semibold border border-blue-200 rounded-lg px-4 py-2 sm:py-2.5 hover:bg-blue-50 active:scale-95 transition-all w-full inline-block"
                  >
                    See More Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-blue-100 shadow-sm mb-8 sm:mb-12 relative overflow-hidden mx-0">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-500" />
            <div className="text-4xl sm:text-6xl mb-4">🖼️</div>
            <h3 className="font-extrabold text-gray-900 text-lg sm:text-2xl mb-2">This Spot is Reserved for You</h3>
            <p className="text-gray-500 text-xs sm:text-sm max-w-md mx-auto leading-relaxed px-4">
              We are waiting to feature our next batch of toppers. Your success story could be right here.
            </p>
          </div>
        )}

        <div className="text-center">
          <Link to="/results" className="text-blue-600 text-sm font-semibold hover:text-blue-800 active:scale-95 transition-all inline-flex items-center gap-1 group">
            View All Past Achievements <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}