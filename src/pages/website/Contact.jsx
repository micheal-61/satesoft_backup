import React, { useState } from "react";
import { FaPlay, FaTimes } from "react-icons/fa";

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

  return (
    <section id="Contact" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl bg-surface border border-border">
          
          {/* Left Column: Video Placeholder */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full group cursor-pointer" onClick={() => setShowVideo(true)}>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Video thumbnail" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
              <button 
                className="w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(var(--p500-rgb),0.5)] group-hover:scale-110 transition-transform duration-300"
                aria-label="Play video"
              >
                <FaPlay className="text-2xl ml-2" />
              </button>
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className="lg:w-1/2 bg-gray-900 p-8 md:p-12 lg:p-16 text-white flex flex-col justify-center">
            <div className="mb-10">
              <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-400 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-500/20">
                CONTACT US
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Need Any Support?</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                To contact us, please send an email to <strong className="text-white">info@satesoft.com</strong> or fill out the form below. We promise to get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="name" 
                  className="w-full px-5 py-4 bg-gray-800 border-none rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                  placeholder="Your Name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                />
                <input 
                  type="email" 
                  name="email" 
                  className="w-full px-5 py-4 bg-gray-800 border-none rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                  placeholder="Your Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <input 
                type="text" 
                name="subject" 
                className="w-full px-5 py-4 bg-gray-800 border-none rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all" 
                placeholder="Subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
              />
              <textarea 
                name="message" 
                className="w-full px-5 py-4 bg-gray-800 border-none rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-y" 
                rows="4" 
                placeholder="Your Message" 
                value={formData.message} 
                onChange={handleChange} 
                required
              ></textarea>
              <div className="pt-4">
                <button 
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-1 tracking-wider uppercase"
                >
                  SEND MESSAGE
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
