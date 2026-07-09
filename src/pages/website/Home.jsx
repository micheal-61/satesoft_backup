import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      {/* HERO SECTION */}
      <Hero />

      {/* HOME INFORMATION SECTION */}
      <section id="home" className="py-20 bg-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
            
            {/* LEFT CONTENT */}
            <div className="w-full lg:w-1/2">
              <div className="mb-6">
                <Link to="/about" className="inline-block px-4 py-2 bg-white shadow-[0_4px_15px_-3px_rgba(61,158,65,0.4)] rounded-lg uppercase tracking-[0.2em] text-primary-600 font-bold text-xs border-y border-primary-100 border-x-4 border-x-primary-500 hover:scale-105 transition-all duration-300">
                  Empowering Africa's Digital Future
                </Link>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary-500 leading-[1.3] mb-6 break-words">
                African Solutions.
              </h1>

              <h2 className="text-2xl md:text-3xl font-semibold text-text leading-snug mb-6">
                Meaningful Data.
              </h2>

              <p className="text-lg text-text/70 leading-relaxed mb-8">
                Satesoft develops innovative digital solutions that transform
                organizations through intelligent software, cloud technologies,
                and actionable data. Our mission is to empower businesses,
                governments, and communities across Africa with technology that
                drives sustainable growth.
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg shadow-md hover:bg-primary-600 transition duration-300"
                >
                  Explore Products →
                </Link>

                <Link
                  to="/about"
                  className="px-6 py-3 border-2 border-primary-500 text-primary-500 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="w-full lg:w-1/2">
              <div className="relative group overflow-hidden rounded-3xl">
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 opacity-20 blur-xl group-hover:opacity-40 transition duration-500"></div>

                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
                  alt="Satesoft Digital Solutions"
                  className="relative w-full rounded-3xl shadow-2xl object-cover aspect-video transform group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;