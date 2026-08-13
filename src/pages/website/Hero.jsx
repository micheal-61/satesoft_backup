import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    subtitle: "BEST IT SOLUTION PROVIDER",
    title: "Elevate Your <span class='text-[#72bf24]'>Business</span> with IT Excellence",
    text: "We have been operating for over a decade providing IT solutions and services.",
    thumbImg: "/assets/images/african_tech_team_hero_1783002251745.png",
  },
  {
    id: 2,
    subtitle: "TRUSTED BY ENTERPRISES",
    title: "A New <br /><span class='text-[#72bf24]'>Experience.</span>",
    text: "Capitalize on research and development to design and deliver innovative products.",
    thumbImg: "/assets/images/african_tech_team_hero_2_1783002263030.png",
  },
  {
    id: 3,
    subtitle: "EMPOWERING AFRICA'S DIGITAL FUTURE",
    title: "Innovative Solutions for <span class='text-[#72bf24]'>Africa</span>",
    text: "Driving sustainable growth across the continent through cutting-edge technology and local expertise.",
    thumbImg: "/assets/images/african_tech_woman_1783002349511.png",
  },
  {
    id: 4,
    subtitle: "MEANINGFUL DATA",
    title: "African <span class='text-[#72bf24]'>Solutions.</span>",
    text: "Satesoft develops innovative digital solutions that transform organizations through intelligent software, cloud technologies, and actionable data.",
    thumbImg: "/assets/images/african_developer_laptop_1783002306037.png",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(slides.length);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
    setTotalSlides(swiper.slides.length);
  };

  return (
    <section className="relative mb-20" aria-label="Hero Carousel">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
        onInit={handleSlideChange}
        className="hero-swiper w-full"
        aria-label="Featured content carousel"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} role="group" aria-roledescription="slide" aria-label={`Slide ${index + 1} of ${slides.length}`}>
            <div className="relative flex items-center min-h-[85vh] bg-gradient-to-b from-white to-gray-50 overflow-hidden py-16 md:py-20">
              
              {/* Background Effects - Enhanced */}
              <div className="absolute inset-0" aria-hidden="true">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#72bf24]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-[#72bf24]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-0 left-40 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 right-40 w-96 h-96 bg-[#72bf24]/5 rounded-full blur-3xl"></div>
              </div>

              <div className="container mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16">
                  
                  {/* LEFT COLUMN */}
                  <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    {/* Badge */}
                    <div className="mb-6">
                      <span className="inline-flex items-center px-5 py-2.5 bg-white shadow-md rounded-lg uppercase tracking-[0.2em] text-[#72bf24] font-semibold text-xs border-y border-[#72bf24]/20 border-x-4 border-x-[#72bf24] hover:scale-105 transition-transform duration-300">
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-[1.2] mb-6"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />

                    {/* Description */}
                    <p className="text-lg text-gray-600 font-light mb-8 max-w-lg leading-relaxed">
                      {slide.text}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/about"
                        className="relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#72bf24] to-[#5fa31d] text-white font-bold rounded-full shadow-lg shadow-[#72bf24]/30 hover:shadow-xl hover:shadow-[#72bf24]/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative z-10">Get Started</span>
                        <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/services"
                        className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-full hover:border-[#72bf24] hover:text-[#72bf24] transition-all duration-300"
                      >
                        Our Services
                      </Link>
                    </div>

                    {/* Slide Counter */}
                    <div className="mt-8 flex items-center gap-3">
                      <span className="text-sm font-medium text-[#72bf24]">
                        {String(currentSlide + 1).padStart(2, '0')}
                      </span>
                      <div className="w-12 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#72bf24] rounded-full transition-all duration-1000"
                          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400 font-light">
                        {String(totalSlides).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Image */}
                  <div className="w-full lg:w-7/12 flex items-center">
                    <div className="relative w-full group">
                      <div className="absolute inset-4 bg-white/30 backdrop-blur-md rounded-3xl rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-700"></div>
                      <div className="absolute inset-4 bg-[#72bf24]/10 backdrop-blur-md rounded-3xl -rotate-2 -z-10 group-hover:-rotate-6 transition-transform duration-700"></div>
                      <img
                        src={slide.thumbImg}
                        alt={slide.title.replace(/<[^>]*>/g, '').trim()}
                        className="w-full rounded-3xl shadow-2xl object-cover aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ============================================================
          FLOATING MEET EXPERTS CARD
          ============================================================ */}
      <div className="absolute bottom-10 right-8 z-30 hidden lg:block">
        <Link
          to="/board"
          className="flex items-center gap-4 bg-white rounded-full px-5 py-2.5 shadow-xl border-l-4 border-[#72bf24] hover:scale-105 transition-all duration-300 group"
        >
          <img
            src="/assets/images/african_tech_man_1783002340575.png"
            alt="Meet our experts"
            className="w-14 h-14 rounded-full object-cover border-2 border-[#72bf24] group-hover:border-[#62a71e] transition-colors"
          />
          <div>
            <p className="font-medium text-xs uppercase tracking-wide text-gray-400">
              Meet
            </p>
            <p className="text-[#72bf24] text-sm font-semibold group-hover:text-[#62a71e] transition-colors">
              Our Experts
            </p>
          </div>
        </Link>
      </div>

      {/* ============================================================
          CSS ANIMATIONS
          ============================================================ */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Hero;
