import calibrePic from "../../assets/calibre-pic.jpeg";
import { Clock, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="bg-[#f8fafc] pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-14">

        {/* LEFT */}
        <div className="flex-1 w-full text-center md:text-left">
          <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 sm:mb-6">
            #1 Coaching Institute in Navi Mumbai
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-gray-900 leading-[1.15] mb-4 sm:mb-6 tracking-tight">
            Grooming Talents for{" "}
            <span className="text-blue-600">Academic Excellence</span>
          </h1>

          <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0 italic">
            Providing comprehensive coaching solutions for Class 5-12, Science, Commerce,
            and Competitive Exams with a legacy of 20+ years.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <Link
              to="/contact"
              className="bg-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-sm flex items-center gap-2"
            >
              Enroll Now →
            </Link>
            <Link
              to="/courses"
              className="border border-gray-300 text-gray-700 text-sm font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 active:scale-95 transition-all"
            >
              View Courses
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 w-full flex justify-center mt-6 md:mt-0">
          <div className="w-full max-w-sm sm:max-w-md md:max-w-full md:w-[480px] lg:w-[540px] h-52 sm:h-72 md:h-[340px] lg:h-[360px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={calibrePic}
              alt="Students"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 sm:mt-10">
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm grid grid-cols-3 sm:flex sm:flex-row justify-between items-center py-4 sm:py-6 px-4 sm:px-10 gap-2 sm:gap-0">

          {[
            { Icon: Clock, value: "20+ Years", label: "Experience" },
            { Icon: Users, value: "5000+", label: "Students Coached" },
            { Icon: TrendingUp, value: "98.5%", label: "Success Rate" },
          ].map(({ Icon, value, label }, i) => (
            <div key={label} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 text-center sm:text-left">
              <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg">
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-base sm:text-xl font-bold text-gray-900">{value}</div>
                <div className="text-[9px] sm:text-[11px] text-gray-500 uppercase tracking-wide leading-tight">{label}</div>
              </div>
              {i < 2 && <div className="hidden sm:block h-10 w-px bg-gray-200 ml-auto" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}