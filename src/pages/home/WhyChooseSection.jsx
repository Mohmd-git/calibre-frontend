import { WHY_CHOOSE } from "./homeData";

export default function WhyChooseSection() {
  return (
    <section className="py-14 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-10 md:gap-16 items-start">

        {/* Left */}
        <div className="w-full md:flex-1 md:max-w-sm">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Why Choose Us?
          </h2>
          <div className="w-16 h-1.5 bg-blue-600 rounded-full mb-4 sm:mb-6" />
          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
            We combine traditional teaching methods with modern technology to deliver the best results for every student.
          </p>
        </div>

        {/* Right Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 w-full">
          {WHY_CHOOSE.map((item, i) => (
            <div
              key={item.title}
              className={`flex items-start gap-4 sm:gap-5 p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-lg ${
                i === 2
                  ? "bg-blue-600 text-white shadow-blue-200 shadow-lg sm:scale-105"
                  : "bg-gray-50 border border-gray-100"
              }`}
            >
              <div className="text-2xl sm:text-3xl mt-0.5 shrink-0">{item.icon}</div>
              <div>
                <h4 className={`font-bold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 ${i === 2 ? "text-white" : "text-gray-900"}`}>
                  {item.title}
                </h4>
                <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${i === 2 ? "text-blue-100" : "text-gray-500"}`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}