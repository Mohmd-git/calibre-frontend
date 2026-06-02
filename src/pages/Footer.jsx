import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { MapPin, Phone, Mail, CheckCircle } from "lucide-react";
import calibreLogo from "../assets/calibre-logo.png";

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-gray-200 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand — full width on mobile */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <img src={calibreLogo} alt="Calibre Tutorials" className="h-7 sm:h-8 w-auto object-contain rounded-md" />
              <span className="font-bold text-blue-600 text-sm sm:text-base">Calibre Tutorials</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
              Grooming talents for academic excellence for over 20 years.
              Professional coaching for Class 5 to 12 and competitive exams.
            </p>
            <div className="flex gap-4 text-gray-400 text-lg">
              <a href="https://share.google/BHNtgvKQyt1aXGwL1" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#1877F2] active:scale-90 transition-all p-1">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/calibre_tutorials_" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#E4405F] active:scale-90 transition-all p-1">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@calibretutorial2148" target="_blank" rel="noopener noreferrer"
                className="hover:text-[#FF0000] active:scale-90 transition-all p-1">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-500">
              {[
                { label: "Home", to: "/" },
                { label: "Our Courses", to: "/courses" },
                { label: "Hall of Fame", to: "/results" },
                { label: "Study Material", to: "/studymaterial" },
                { label: "Counseling", to: "/counseling" },
                { label: "Contact Us", to: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-blue-600 transition-colors active:text-blue-800">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Why Calibre */}
          <div>
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wide">
              Why Calibre?
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-500">
              {[
                "20+ Years of Legacy",
                "5,000+ Students Mentored",
                "Expert Faculty Team",
                "State-of-the-art Study Material",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={13} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — full width on small mobile */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-semibold text-gray-900 text-xs sm:text-sm mb-3 sm:mb-4 uppercase tracking-wide">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-gray-500">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-blue-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">Plot no. 70, opposite Ganesh Talav Road, near Shiv Mandir Road, Nerul (W, Sector 18A, Nerul, Navi Mumbai, Maharashtra 400706</span>
              </div>
              <a href="tel:+919987889849" className="flex items-center gap-2.5 hover:text-blue-600 transition-colors">
                <Phone size={14} className="text-blue-600 shrink-0" />
                <span>+91 99878 89849</span>
              </a>
              <a href="mailto:calibretutorial89@gmail.com" className="flex items-center gap-2.5 hover:text-blue-600 transition-colors break-all">
                <Mail size={14} className="text-blue-600 shrink-0" />
                <span>calibretutorial89@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 sm:mt-12 pt-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 Calibre Tutorials. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="#" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-600 transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}