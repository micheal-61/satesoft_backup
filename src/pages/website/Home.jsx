import React from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      {/* HERO SLIDER - Primary landing section */}
      <Hero />

      {/* HOME INFO SECTION */}
      <section id="Home" className="py-20 bg-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* LEFT SIDE TEXT */}
            <div className="w-full lg:w-1/2">
              {/* TOP TEXT */}
              <h5 className="font-semibold uppercase tracking-widest text-primary-500 mb-4 text-sm md:text-base">
                Empowering Africa's Digital Future
              </h5>

              {/* MAIN TITLE */}
              <h1 className="font-bold text-5xl md:text-7xl text-primary-500 leading-tight mb-4 tracking-tight">
                African Solutions.
              </h1>

              {/* SUBTITLE */}
              <h3 className="font-semibold text-text text-2xl md:text-4xl mb-6">
                Meaningful Data.
              </h3>

              {/* PARAGRAPH */}
              <p className="text-text/70 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
                Satesoft builds intelligent software that generates actionable
                big data, specifically tailored for the unique challenges and
                opportunities of the African continent.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary">
                  View Our Products &rarr;
                </Link>

                <Link to="/services" className="btn-secondary">
                  Our Services
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
                  alt="dashboard"
                  className="relative rounded-2xl shadow-xl w-full object-cover aspect-video border border-white/10"
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