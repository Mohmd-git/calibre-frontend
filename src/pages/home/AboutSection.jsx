import { Award, Users, BookOpen, TrendingUp, CheckCircle } from "lucide-react";

const CARDS = [
  { bg: "bg-blue-100 border-blue-50", Icon: Award, iconColor: "text-blue-600", title: "Top Tier Faculty", desc: "Expert educators with decades of combined teaching experience." },
  { bg: "bg-white border-gray-50", Icon: Users, iconColor: "text-gray-700", title: "Small Batches", desc: "Personalized attention to every student's learning needs." },
  { bg: "bg-white border-gray-50", Icon: BookOpen, iconColor: "text-blue-500", title: "Digital Resources", desc: "Access to high-quality notes and practice modules 24/7." },
  { bg: "bg-blue-200 border-blue-100", Icon: TrendingUp, iconColor: "text-blue-600", title: "Progress Tracking", desc: "Regular assessments and performance analytics for growth." },
];

const POINTS = [
  "Focused Learning Modules",
  "Comprehensive Test Series",
  "Parent-Teacher Interaction",
  "Career Counseling Sessions",
];

export default function AboutSection() {
  return (
    <section className="bg-[#f8fafc] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* LEFT CARDS */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          {CARDS.map(({ bg, Icon, iconColor, title, desc }) => (
            <div key={title} className={`${bg} rounded-xl p-4 sm:p-6 text-center shadow-sm border`}>
              <Icon className={`mx-auto ${iconColor} mb-2 sm:mb-4`} size={26} />
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">{title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed hidden sm:block">{desc}</p>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="mt-2 md:mt-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight">
            About Calibre Tutorials
          </h2>

          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
            Nurturing academic brilliance since 2010. We are more than just a coaching institute; we are partners in your educational journey.
          </p>

          <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-5 sm:mb-8" />

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
            At Calibre Tutorials, we believe that every student has unique potential. Our mission is to provide structured learning environments that simplify complex concepts and inspire a genuine love for learning.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-y-4 gap-x-6">
            {POINTS.map((p) => (
              <div key={p} className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium text-gray-700">
                <CheckCircle className="text-blue-600 w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                {p}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}