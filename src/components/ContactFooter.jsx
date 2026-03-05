import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Send,
  Flame,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: "ul. Zielona 14/3, 00-001 Warsaw, Poland",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+48 500 123 456",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@moksy.pl",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri 9:00–19:00 · Sat 9:00–14:00",
  },
];

const footerLinks = [
  { title: "Explore", links: ["About Us", "Treatments", "Training", "Blog"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
  { title: "Connect", links: ["Instagram", "Facebook", "YouTube"] },
];

export default function ContactFooter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-28 bg-[#FAFAF5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block mb-4 text-xs uppercase tracking-widest text-[#71797E] font-medium">
                Get in Touch
              </span>
              <h2
                className="text-4xl md:text-5xl font-bold text-[#333333] mb-6 leading-tight"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Begin Your
                <br />
                <span className="italic text-[#71797E]">Healing Journey</span>
              </h2>
              <p className="text-[#555555] text-lg font-light leading-relaxed mb-10">
                Whether you're seeking therapeutic relief or professional
                training, we're here to guide you. Reach out and let's start a
                conversation.
              </p>

              <div className="space-y-5">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#71797E]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon size={17} className="text-[#71797E]" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[#71797E] mb-0.5 font-medium">
                        {item.label}
                      </div>
                      <div className="text-[#555555] text-sm">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="mt-10 flex gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-full border border-[#71797E]/20 flex items-center justify-center text-[#71797E] hover:bg-[#71797E] hover:text-[#F5F5DC] hover:border-[#71797E] transition-all duration-200"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-10 bg-[#71797E]/5 rounded-3xl border border-[#71797E]/15"
                >
                  <div className="w-16 h-16 rounded-full bg-[#71797E]/15 flex items-center justify-center mb-6">
                    <Flame size={28} className="text-[#71797E]" />
                  </div>
                  <h3
                    className="text-2xl font-bold text-[#333333] mb-3"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Thank You!
                  </h3>
                  <p className="text-[#555555] font-light">
                    Your message has been received. We'll be in touch within 24
                    hours to discuss your journey.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5 bg-white rounded-3xl p-8 shadow-sm border border-[#71797E]/8"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                      I'm Interested In
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select an option...</option>
                      <option value="therapy">Therapy Session</option>
                      <option value="foundation">Foundation Course</option>
                      <option value="advanced">Advanced Course</option>
                      <option value="specialist">Specialist Module</option>
                      <option value="other">General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#71797E] mb-2 font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us a little about yourself and how we can help..."
                      className="w-full px-4 py-3 rounded-xl border border-[#71797E]/20 bg-[#FAFAF5] text-[#333333] text-sm placeholder:text-[#555555]/40 focus:outline-none focus:border-[#71797E] focus:ring-1 focus:ring-[#71797E]/20 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-[#333333] text-[#F5F5DC] font-medium text-sm hover:bg-[#71797E] transition-colors duration-300"
                  >
                    <Send size={15} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#333333] text-[#F5F5DC]/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-full bg-[#71797E] flex items-center justify-center">
                  <Flame size={18} className="text-[#F5F5DC]" />
                </div>
                <span
                  className="text-xl font-bold text-[#F5F5DC]"
                  style={{ fontFamily: '"Playfair Display", serif' }}
                >
                  Moksy
                </span>
              </div>
              <p className="text-sm leading-relaxed font-light max-w-xs mb-6">
                Authentic moxibustion therapy and professional training rooted
                in the classical tradition of Traditional Chinese Medicine.
              </p>
              <div className="flex gap-3">
                {[Instagram, Facebook].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full border border-[#F5F5DC]/10 flex items-center justify-center hover:bg-[#71797E] hover:border-[#71797E] hover:text-[#F5F5DC] transition-all duration-200"
                  >
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer links */}
            {footerLinks.map((col) => (
              <div key={col.title}>
                <h4 className="text-[#F5F5DC] text-xs uppercase tracking-widest font-medium mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm hover:text-[#F5F5DC] transition-colors duration-200"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-[#F5F5DC]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <span>© 2026 Moksy. All rights reserved.</span>
            <span className="text-[#71797E]">
              Healing through ancient wisdom · Warsaw, Poland
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
