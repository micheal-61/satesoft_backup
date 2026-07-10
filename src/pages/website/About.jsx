import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="py-20 bg-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <div className="relative group">
              {/* Decorative shapes behind image */}
              <div className="absolute -inset-4 bg-primary-100 rounded-[2rem] transform -rotate-3 transition duration-500 group-hover:rotate-0"></div>
              <div className="absolute -inset-4 bg-primary-50 rounded-[2rem] transform rotate-3 transition duration-500 group-hover:rotate-0"></div>
              
              <img 
                decoding="async" 
                src="/assets/images/african_tech_meeting_1783002294603.png" 
                alt="About Thumb" 
                className="relative z-10 w-full h-auto object-cover rounded-[2rem] shadow-xl border border-white/50"
              />
              
              <Link 
                to="/products"
                className="absolute -bottom-6 -right-6 z-20 bg-white shadow-[0_4px_15px_-3px_rgba(61,158,65,0.4)] rounded-2xl p-5 border-y border-primary-100 border-x-4 border-x-primary-500 hidden md:block hover:scale-105 transition-all duration-300 group/badge"
              >
                <h4 className="font-bold text-primary-600 mb-0 tracking-widest uppercase text-xs group-hover/badge:text-primary-700">BEST IT SOLUTION</h4>
              </Link>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="mb-8">
              <div className="mb-6">
                <Link to="/about" className="inline-block px-4 py-2 bg-white shadow-[0_4px_15px_-3px_rgba(61,158,65,0.4)] rounded-lg uppercase tracking-[0.2em] text-primary-600 font-bold text-xs border-y border-primary-100 border-x-4 border-x-primary-500 hover:scale-105 transition-all duration-300">
                  SATESOFT COMPANY
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">
                Your Innovation<br /> <span className="text-primary-500">Partner.</span>
              </h1>
              <p className="text-lg text-text/70 leading-relaxed">
                We aim to be our clients first point of contact for all support and business development issues. Our support entail physical and remote through phone, email and video call where necessary.
              </p>
            </div>
            
            <Link to="/services" className="flex items-center gap-4 bg-primary-50 p-6 rounded-2xl mb-6 border border-primary-100 transition duration-300 hover:shadow-md hover:bg-primary-100/50 group/card">
              <div className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl flex-shrink-0 shadow-sm transition-transform group-hover/card:scale-110">
                <i className="bi bi-cloud-check-fill" aria-hidden="true"></i>
              </div>
              <div>
                <h3 className="font-bold text-xl text-text mb-0 group-hover/card:text-primary-700 transition-colors">Cloud Based Solution</h3>
              </div>
            </Link>
            
            <div className="mb-8">
              <p className="text-text/70 leading-relaxed">
                We aim to be our clients first point of contact for all support and business development issues. Our support entail physical and remote through phone, email and video call where necessary.
              </p>
            </div>
            
            <div>
              <Link to="/services" className="btn-primary px-8 py-3 rounded-full text-base font-semibold">
                EXPLORE MORE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
