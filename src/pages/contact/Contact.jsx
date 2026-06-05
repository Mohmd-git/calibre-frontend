import { useEffect, useState, useRef } from "react";
import { 
  Headphones, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  Send, 
  MapPin,
  BookOpen,
  ChevronDown
} from "lucide-react";

// NEW IMPORTS
import { useSendContactMutation } from "../../redux/api/contactApi";
import { toast } from "react-toastify";

import contactHubPic from "../../assets/communication-hub.png";

// ✅ SMOOTH SCROLL REVEAL
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
      className={`transition-all duration-1000 ease-out w-full ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 md:translate-y-12"
      }`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
};

export default function Contact() {
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // REDUX HOOK
  const [sendContact, { isLoading }] = useSendContactMutation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhone(value);
      setPhoneError("");
    }
  };

  const validatePhone = () => {
    if (phone.length === 0) {
      setPhoneError("Phone number is required.");
      return false;
    } else if (phone.length < 10) {
      setPhoneError("Please enter a valid 10-digit number.");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPhoneValid = validatePhone();
    if (!isPhoneValid) return;

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      await sendContact({
        ...data,
        phone,
      }).unwrap();

      toast.success("Inquiry sent successfully! 📩", {
        position: "top-right"
      });
      
      e.target.reset();
      setPhone("");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send inquiry ❌", {
        position: "top-right"
      });
    }
  };

  return (
    <div className="bg-[#fafcff] min-h-screen font-sans text-gray-800 pb-16 md:pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#f0f6ff] to-[#fafcff] pt-12 md:pt-20 pb-16 md:pb-20 border-b border-gray-100/50 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
            <div className="max-w-2xl text-center md:text-left md:w-1/2">
              <ScrollReveal delay={100}>
                <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase bg-blue-100/80 text-blue-600 px-3.5 py-1.5 rounded-full inline-block mb-4 md:mb-5 shadow-sm border border-blue-200/50">
                  Get In Touch
                </span>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-[1.15] tracking-tight">
                  Let's Start Your <br className="hidden lg:block"/> <span className="text-[#1884FF]">Success Journey</span>
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-4 md:mb-0">
                  Have questions about our courses or the admission process? Our expert counselors are here to help you make the best decision for your academic future.
                </p>
              </ScrollReveal>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end relative mt-4 md:mt-0">
              <ScrollReveal delay={300}>
                <div className="absolute w-56 h-56 md:w-72 md:h-72 bg-blue-300/30 rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                <img 
                  src={contactHubPic} 
                  alt="Communication Hub" 
                  className="w-full max-w-[280px] sm:max-w-[350px] lg:max-w-[420px] drop-shadow-2xl object-contain hover:-translate-y-2 transition-transform duration-700 ease-out"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="max-w-7xl mx-auto px-5 md:px-6 py-12 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16">
        
        {/* LEFT COLUMN: CONTACT INFO */}
        <div className="lg:col-span-5 flex flex-col gap-10 md:gap-12">
          <div>
            <ScrollReveal delay={100}>
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8">
                <div className="bg-blue-100 p-2 rounded-lg text-[#1884FF]">
                  <Headphones size={20} strokeWidth={2.5} />
                </div>
                Quick Contacts
              </div>
            </ScrollReveal>
            
            <div className="flex flex-col gap-4">
              <ScrollReveal delay={200}>
                <div className="bg-gradient-to-br from-[#eaf3ff] to-[#f0f6ff] border border-blue-100 rounded-2xl p-5 md:p-6 flex items-start gap-4 md:gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-[#1884FF] rounded-full flex items-center justify-center text-white shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                    <Phone size={22} fill="currentColor" className="opacity-90" />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] md:text-xs font-bold text-blue-500 uppercase tracking-widest mb-1.5">Main Admissions</p>
                    <p className="font-extrabold text-gray-900 text-lg md:text-xl mb-1.5 tracking-tight">+91 99878 89849</p>
                    <p className="text-xs md:text-sm text-gray-500 font-medium"> Mon-Sat, 11:00 AM - 9:00 PM</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="bg-white border border-gray-100/80 rounded-2xl p-5 md:p-6 flex items-start gap-4 md:gap-5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300 group">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 border border-gray-100 rounded-full flex items-center justify-center text-[#1884FF] shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <Mail size={22} strokeWidth={2} />
                  </div>
                  <div className="pt-0.5">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Email Support</p>
                    <p className="font-bold text-gray-900 text-sm md:text-base mb-1.5 break-all">calibretutorial89@gmail.com</p>
                    <p className="text-xs md:text-sm text-gray-500 font-medium">Response within 24 hours</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div>
            <ScrollReveal delay={200}>
              <div className="flex items-center justify-center md:justify-start gap-2.5 text-lg md:text-xl font-bold text-gray-900 mb-6 md:mb-8">
                <div className="bg-blue-100 p-2 rounded-lg text-[#1884FF]">
                  <Clock size={20} strokeWidth={2.5} />
                </div>
                Office Hours
              </div>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <div className="bg-white border border-gray-100/80 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] overflow-hidden">
                <ul className="divide-y divide-gray-50 text-sm md:text-base">
                  {[
                    { day: "Monday", time: "11:00 AM - 9:00 PM" },
                    { day: "Tuesday", time: "11:00 AM - 9:00 PM" },
                    { day: "Wednesday", time: "11:00 AM - 9:00 PM" },
                    { day: "Thursday", time: "11:00 AM - 9:00 PM" },
                    { day: "Friday", time: "11:00 AM - 9:00 PM" },
                    { day: "Saturday", time: "11:00 AM - 9:00 PM" },
                    { day: "Sunday", time: "Closed", isClosed: true },
                  ].map((item, idx) => (
                    <li key={idx} className="flex justify-between items-center px-5 md:px-7 py-4 md:py-5 hover:bg-slate-50/50 transition-colors">
                      <span className="font-semibold text-gray-700">{item.day}</span>
                      <span className={`text-xs md:text-sm ${item.isClosed ? "text-red-500 font-bold bg-red-50 px-3 py-1 rounded-md" : "text-gray-500 font-medium"}`}>
                        {item.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* RIGHT COLUMN: CONTACT FORM */}
        <div className="lg:col-span-7">
          <ScrollReveal delay={400}>
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_40px_rgb(0,0,0,0.04)] p-6 sm:p-8 md:p-12 relative overflow-hidden">
              {/* Decorative top gradient line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-[#1884FF]"></div>
              
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Send a Message</h2>
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-500 hidden sm:block">
                  <MessageSquare size={24} strokeWidth={2} />
                </div>
              </div>
              <p className="text-sm md:text-base text-gray-500 mb-8 md:mb-10 leading-relaxed">
                Fill out the form below and an academic advisor will contact you shortly to guide you.
              </p>

              <form className="flex flex-col gap-5 md:gap-7" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-2.5">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      placeholder="Enter Your Name" 
                      required
                      className="w-full px-4 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm transition-all duration-300 placeholder:text-gray-400 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-2.5">Phone Number</label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 px-4 flex items-center justify-center bg-gray-100 border-y border-l border-gray-200 rounded-l-xl text-sm text-gray-600 font-bold group-focus-within:border-blue-500 group-focus-within:bg-blue-50 group-focus-within:text-blue-600 transition-colors">
                        +91
                      </div>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={handlePhoneChange}
                        onBlur={validatePhone}
                        placeholder="" 
                        className={`w-full pl-16 pr-4 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border ${phoneError ? 'border-red-500 focus:ring-red-500/10' : 'border-gray-200 focus:border-blue-500 focus:ring-blue-500/10'} focus:bg-white focus:outline-none focus:ring-4 text-sm transition-all duration-300 font-medium placeholder:text-gray-400`}
                      />
                    </div>
                    {phoneError && <p className="text-red-500 text-[11px] mt-2 font-bold flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-500 inline-block"></span>{phoneError}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-2.5">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    placeholder="Enter Your Email" 
                    required
                    className="w-full px-4 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm transition-all duration-300 font-medium placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-2.5">Purpose of Inquiry</label>
                  <div className="relative">
                    <select 
                      name="purpose"
                      defaultValue="" 
                      required
                      className="w-full px-4 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm appearance-none cursor-pointer text-gray-700 font-medium transition-all duration-300"
                    >
                      <option value="" disabled className="text-gray-400">Select your purpose...</option>
                      <option value="Admission Inquiry">Admission Inquiry</option>
                      <option value="Academic Counseling">Academic Counseling</option>
                      <option value="Request a Demo Lecture">Request a Demo Lecture</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" strokeWidth={2.5} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-3">Course of Interest</label>
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    {[
                      "Class 9-10",
                      "Class 11-12 Sci",
                      "Class 11-12 Com",
                      "CET/JEE/NEET"
                    ].map((course, idx) => (
                      <label key={idx} className="flex items-center gap-2.5 border border-gray-200 rounded-xl px-3 sm:px-4 py-3 md:py-3.5 cursor-pointer hover:bg-slate-50 transition-all duration-200 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50/50 has-[:checked]:ring-1 has-[:checked]:ring-blue-500 group">
                        <input type="radio" name="course" value={course} className="hidden peer" required />
                        <div className="text-gray-300 peer-checked:text-[#1884FF] group-hover:text-gray-400 transition-colors">
                          <BookOpen size={18} strokeWidth={2.5} />
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 font-bold peer-checked:text-blue-700">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2 md:mb-2.5">How can we help you?</label>
                  <textarea 
                    name="message"
                    rows="4" 
                    placeholder="Tell us about your academic goals..." 
                    className="w-full px-4 py-3.5 md:py-4 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-gray-200 focus:bg-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-sm transition-all duration-300 resize-none font-medium placeholder:text-gray-400"
                  ></textarea>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-[#1884FF] hover:bg-blue-600 active:bg-blue-700 text-white font-extrabold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(24,132,255,0.39)] hover:shadow-[0_6px_20px_rgba(24,132,255,0.23)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 flex justify-center items-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none text-sm md:text-base tracking-wide"
                  >
                    {isLoading ? "Sending..." : "Send Inquiry"} <Send size={18} strokeWidth={2.5} />
                  </button>
                  <p className="text-[10px] md:text-xs text-center text-gray-400 mt-4 font-medium">
                    By submitting, you agree to our privacy policy and terms of service.
                  </p>
                </div>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* LOCATION & MAP SECTION */}
      <section className="max-w-6xl mx-auto px-5 md:px-6 py-12 md:py-20 text-center">
        <ScrollReveal delay={100}>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Our Location</h2>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-500 mb-10">
            <MapPin size={18} className="text-[#1884FF]" />
            Nerul (W), Navi Mumbai - 400706
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="bg-gray-100 rounded-[2rem] h-[380px] md:h-[500px] flex flex-col items-center justify-end border border-gray-200/60 relative overflow-hidden shadow-inner group">
            <div className="absolute inset-0 z-0 transition-transform duration-1000 group-hover:scale-105">
               {/* Note: Update src with the actual Google Maps embed URL for the new address if needed */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.4519656885374!2d73.01344237510255!3d19.04386868215394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c3df9521d801%3A0xc3911d331940984!2sShiv%20Mandir%20Rd%2C%20Nerul%20East%2C%20Sector%2018%2C%20Nerul%2C%20Navi%20Mumbai%2C%20Maharashtra%20400706!5e0!3m2!1sen!2sin!4v1711111111111" 
                className="w-full h-full opacity-70 grayscale contrast-125"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 to-transparent z-0 pointer-events-none"></div>
            
            {/* GLASSMORPHISM CARD */}
            <div className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8 py-8 md:py-10 bg-white/85 backdrop-blur-xl border border-white/60 rounded-[1.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.08)] max-w-sm mb-6 md:mb-10 mx-4 transform transition-transform duration-500 hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(24,132,255,0.4)] text-white -mt-16 md:-mt-20 mb-5 md:mb-6 border-[6px] border-white backdrop-blur-md">
                <MapPin size={24} strokeWidth={2.5} />
              </div>
              <h3 className="font-extrabold text-gray-900 text-lg md:text-xl mb-2.5">Visit Our Campus</h3>
              <p className="text-xs md:text-sm text-gray-600 mb-6 md:mb-8 leading-relaxed font-medium">
                Plot no. 70, opposite Ganesh Talav Road, near Shiv Mandir Road, Sector 18A, Nerul (W), Navi Mumbai, Maharashtra 400706
              </p>
              
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Calibre+Tutorial+Nerul+Sector+18A" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#1884FF] active:scale-95 text-white px-8 py-3.5 md:py-4 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgb(24,132,255,0.39)] hover:shadow-[0_6px_20px_rgba(24,132,255,0.23)] hover:bg-blue-600 transition-all duration-200 w-full tracking-wide"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* INSTANT HELP BANNER */}
      <section className="max-w-5xl mx-auto px-5 md:px-6 pb-16 md:pb-24">
        <ScrollReveal delay={100}>
          <div className="bg-gradient-to-r from-white to-gray-50 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-1.5 tracking-tight">Need Instant Help?</h3>
              <p className="text-sm md:text-base text-gray-500 font-medium">Talk to our counselor right now over a call.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full md:w-auto">
              <a 
                href="https://wa.me/919987889849" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border-2 border-gray-100 text-gray-700 px-8 py-3.5 md:py-4 rounded-xl text-sm font-bold shadow-sm hover:border-gray-200 hover:bg-gray-50 active:scale-95 transition-all duration-200 w-full sm:w-auto text-center block"
              >
                Chat with us
              </a>
              <a 
                href="tel:+919987889849"
                className="bg-[#1884FF] border-2 border-[#1884FF] text-white px-8 py-3.5 md:py-4 rounded-xl text-sm font-bold shadow-[0_4px_14px_0_rgb(24,132,255,0.39)] hover:shadow-[0_6px_20px_rgba(24,132,255,0.23)] hover:bg-blue-600 hover:border-blue-600 active:scale-95 transition-all duration-200 w-full sm:w-auto text-center block"
              >
                Call Now
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}