import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      {/* Top Address Banner */}
      <div className="bg-primary-50 border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center text-2xl">
                <i className="bi bi-lightning-charge-fill" aria-hidden="true"></i>
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-text mb-0">Elevating Customer Experience.</h3>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center text-2xl">
                <i className="bi bi-telephone-outbound-fill" aria-hidden="true"></i>
              </div>
              <div>
                <a href="tel:+44920090505" className="text-xl md:text-2xl font-bold text-primary-500 hover:text-primary-600 transition-colors">
                  +44 920 090 505
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Area */}
      <div className="bg-[#060A22] pt-16 pb-8 text-white/70">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            {/* About Widget */}
            <div className="lg:col-span-4">
              <div className="mb-8">
                <Link to="/">
                  <h2 className="text-white font-bold text-3xl tracking-tight mb-4">SATESOFT</h2>
                </Link>
                <p className="mb-6 leading-relaxed text-white/70">
                  Globally monetize plug-and-play data it solu monotonectally disseminate oriented busine multifunctional mind design.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"><i className="bi bi-facebook"></i></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"><i className="bi bi-twitter-x"></i></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"><i className="bi bi-instagram"></i></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary-500 transition-colors"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>

            {/* Useful Links Widget */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary-500">Useful Links</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="hover:text-primary-500 transition-colors block">About Company</Link></li>
                <li><Link to="/team" className="hover:text-primary-500 transition-colors block">Meet Our Team</Link></li>
                <li><Link to="/blog" className="hover:text-primary-500 transition-colors block">Latest Blog</Link></li>
                <li><Link to="/contact" className="hover:text-primary-500 transition-colors block">Contact Us</Link></li>
                <li><Link to="/testimonials" className="hover:text-primary-500 transition-colors block">Testimonials</Link></li>
                <li><Link to="/admin/login" className="text-primary-400 font-semibold hover:text-primary-300 transition-colors block mt-2">Admin Portal</Link></li>
              </ul>
            </div>

            {/* Services Widget */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary-500">Services</h3>
              <ul className="space-y-3">
                <li><Link to="/services" className="hover:text-primary-500 transition-colors block">Cyber Security</Link></li>
                <li><Link to="/services" className="hover:text-primary-500 transition-colors block">UI/UX Design</Link></li>
                <li><Link to="/services" className="hover:text-primary-500 transition-colors block">App Development</Link></li>
                <li><Link to="/services" className="hover:text-primary-500 transition-colors block">Technology Consult</Link></li>
                <li><Link to="/services" className="hover:text-primary-500 transition-colors block">IT Solution</Link></li>
              </ul>
            </div>

            {/* Newsletter Widget */}
            <div className="lg:col-span-3">
              <h3 className="text-xl font-bold text-white mb-6 relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-12 after:bg-primary-500">Newsletter</h3>
              <p className="mb-6 text-white/70">
                Globally monetize plug-and-play data it solu monotonectally disseminate oriented multifunctional mind design.
              </p>
              <form action="#" method="post" className="relative">
                <input 
                  type="email" 
                  name="EMAIL" 
                  placeholder="Enter Your E-mail" 
                  required 
                  className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-4 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-primary-500 transition-colors"
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 px-4 bg-primary-500 text-white rounded-r-md hover:bg-primary-600 transition-colors">
                  <i className="bi bi-send"></i>
                </button>
              </form>
            </div>

          </div>

          {/* Copyright Area */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="mb-0 text-sm">© Copyright 2026 By Satesoft. All rights reserved.</p>
            <ul className="flex gap-6 text-sm mb-0">
              <li><Link to="/privacy-policy" className="hover:text-primary-500 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/support" className="hover:text-primary-500 transition-colors">Supports</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
