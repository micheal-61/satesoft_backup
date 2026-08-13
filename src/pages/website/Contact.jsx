import React, { useState } from "react";
import { FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    setIsSubmitting(true);
    try {
      await axios.post("/api/public/contact", formData);
      setStatus({ type: "success", message: "Message sent successfully! We will get back to you soon." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.response?.data?.error || "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email Us",
      value: "info@satesoft.com",
      href: "mailto:info@satesoft.com"
    },
    {
      icon: FaPhone,
      label: "Call Us",
      value: "+250 788 000 000",
      href: "tel:+250788000000"
    },
    {
      icon: FaMapMarkerAlt,
      label: "Visit Us",
      value: "NATIONAL ICT INNOVATION HUB, Kampala, Uganda",
      href: "#"
    },
  ];

  // Your Google Maps embed URL
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7524131483033!2d32.611908174225!3d0.3293275640075355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb42c53a1d2d%3A0xd7d2ad8945566450!2sNATIONAL%20ICT%20INNOVATION%20HUB!5e0!3m2!1sen!2sug!4v1786612170683!5m2!1sen!2sug";

  return (
    <section id="Contact" className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================
            HEADER
            ============================================================ */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
            Contact Us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            Let's build something <span className="font-semibold text-[#72bf24]">great</span> together
          </h2>
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Have a question or a project in mind? Drop us a message and our team will get back to you as soon as possible.
          </p>
        </div>

        {/* ============================================================
            CONTACT INFO CARDS
            ============================================================ */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {contactInfo.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-[#72bf24]/10 flex items-center justify-center group-hover:bg-[#72bf24] transition-colors duration-300 flex-shrink-0">
                <item.icon className="text-[#72bf24] group-hover:text-white transition-colors duration-300 text-lg" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#72bf24] transition-colors">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* ============================================================
            MAIN CONTENT GRID - Map + Form
            ============================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          
          {/* LEFT COLUMN - Google Map */}
          <div className="relative group rounded-2xl overflow-hidden shadow-xl border border-gray-100 bg-white">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[560px]">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Satesoft Office Location - NATIONAL ICT INNOVATION HUB, Kampala"
              />
              
              {/* Map Overlay with Address */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-full bg-[#72bf24]/20 flex items-center justify-center backdrop-blur-sm">
                    <FaMapMarkerAlt className="text-[#72bf24] text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Our Office</p>
                    <p className="text-sm text-white/70">NATIONAL ICT INNOVATION HUB, Kampala, Uganda</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Contact Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-8 lg:p-10">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
                Send us a message
              </h3>
              <p className="text-sm text-gray-500 font-light">
                Or email us directly at{' '}
                <a href="mailto:info@satesoft.com" className="text-[#72bf24] font-medium hover:text-[#62a71e] transition-colors">
                  info@satesoft.com
                </a>
              </p>
            </div>

            {/* Status Messages */}
            {status.message && (
              <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
                status.type === "success" 
                  ? "bg-green-50 text-green-800 border border-green-200" 
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}>
                {status.type === "success" ? (
                  <FaCheckCircle className="text-green-600 text-lg flex-shrink-0 mt-0.5" />
                ) : (
                  <FaTimes className="text-red-600 text-lg flex-shrink-0 mt-0.5" />
                )}
                <span className="text-sm font-medium">{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent transition-all"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent transition-all"
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent transition-all resize-none"
                  rows="5"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#72bf24] text-white font-semibold rounded-xl hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="32" />
                      </svg>
                    </span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="text-sm" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* ============================================================
            ADDITIONAL INFO
            ============================================================ */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 font-light">
            We typically respond within 24 hours during business days.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Contact;