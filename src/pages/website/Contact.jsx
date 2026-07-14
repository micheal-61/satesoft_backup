import React, { useState } from "react";
import { FaPlay, FaTimes, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [showVideo, setShowVideo] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully (offline mode)!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: "Email Us",
      value: "info@satesoft.com",
    },
    {
      icon: <FaPhone />,
      label: "Call Us",
      value: "+250 788 000 000",
    },
    {
      icon: <FaMapMarkerAlt />,
      label: "Visit Us",
      value: "Kigali, Rwanda",
    },
  ];

  return (
    <section id="Contact" className="contact-section py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="contact-badge">Contact Us</span>
          <h2 className="mt-5 text-3xl md:text-5xl font-extrabold tracking-tight" style={{ color: "var(--color-secondary)" }}>
            Let's build something great together
          </h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: "var(--color-text)" }}>
            Have a question or a project in mind? Drop us a message and our team will get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
          {contactInfo.map((item, idx) => (
            <div key={idx} className="contact-info-card">
              <div className="contact-info-icon">{item.icon}</div>
              <div>
                <p className="contact-label">{item.label}</p>
                <p className="contact-value">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Card */}
        <div className="contact-card flex flex-col lg:flex-row rounded-3xl overflow-hidden">
          {/* Left Column: Video Placeholder */}
          <div
            className="lg:w-1/2 relative min-h-[360px] lg:min-h-full group cursor-pointer"
            onClick={() => setShowVideo(true)}
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Video thumbnail"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20 flex items-center justify-center group-hover:from-black/70 transition-colors">
              <button
                className="contact-play-btn"
                aria-label="Play video"
                type="button"
              >
                <FaPlay className="text-2xl ml-1" />
              </button>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-white font-semibold text-lg drop-shadow">Watch how we work</p>
            </div>
          </div>

          {/* Right Column: Form */}
          <div
            className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight" style={{ color: "var(--color-secondary)" }}>
                Send us a message
              </h3>
              <p className="leading-relaxed" style={{ color: "var(--color-text)" }}>
                Or email us directly at <strong style={{ color: "var(--color-primary-600)" }}>info@satesoft.com</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  className="contact-field"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="contact-field"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                className="contact-field"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                className="contact-field resize-y"
                rows="4"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <div className="pt-2">
                <button type="submit" className="contact-submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setShowVideo(false)}
              aria-label="Close modal"
              type="button"
            >
              <FaTimes />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/ScMzIvxBSi4?autoplay=1"
                title="YouTube video"
                className="w-full h-full border-0"
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
