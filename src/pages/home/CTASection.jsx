import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-12 sm:py-20 bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">

          {/* Text */}
          <div className="text-white text-center md:text-left max-w-md">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-snug mb-2 sm:mb-3">
              Ready to take the first step towards your academic success?
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Admissions for the upcoming academic year are now open.
              Secure your spot in our premium batches today.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 w-full md:w-auto">
            <Link
              to="/contact"
              className="flex-1 md:flex-none bg-white text-blue-600 font-semibold px-5 py-3 rounded-lg hover:bg-gray-100 active:scale-95 transition-all text-center text-sm"
            >
              Contact Us Now
            </Link>
            <Link
              to="/courses"
              className="flex-1 md:flex-none bg-blue-500/40 text-white font-semibold px-5 py-3 rounded-lg border border-white/40 hover:bg-blue-500/60 active:scale-95 transition-all text-center text-sm"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}