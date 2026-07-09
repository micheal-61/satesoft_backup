import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    id: 1,
    subtitle: "BEST IT SOLUTION PROVIDER",
    title:
      "Elevate Your <span class='text-primary-500'>Business</span> with IT Excellence",
    text:
      "We have been operating for over a decade providing IT solutions and services.",
    thumbImg: "/assets/images/african_tech_team_hero_1783002251745.png",
  },
  {
    id: 2,
    subtitle: "TRUSTED BY ENTERPRISES",
    title:
      "A New <br /><span class='text-primary-500'>Experience.</span>",
    text:
      "Capitalize on research and development to design and deliver innovative products.",
    thumbImg: "/assets/images/african_tech_team_hero_2_1783002263030.png",
  },
];

const Hero = () => {
  return (
    <section className="relative">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        loop
        className="w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative flex items-center min-h-[80vh] bg-surface overflow-hidden py-20">
              {/* Background Effects */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-60"></div>

                <div className="absolute top-40 right-20 w-72 h-72 bg-primary-200 rounded-full blur-3xl opacity-60"></div>

                <div className="absolute bottom-0 left-40 w-72 h-72 bg-primary-50 rounded-full blur-3xl opacity-60"></div>
              </div>

              <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                  {/* LEFT */}
                  <div className="w-full lg:w-5/12">
                    <div className="mb-6">
                      <span className="inline-block px-4 py-2 bg-white shadow-[0_4px_15px_-3px_rgba(61,158,65,0.4)] rounded-lg uppercase tracking-[0.2em] text-primary-600 font-bold text-xs border-y border-primary-100 border-x-4 border-x-primary-500">
                        {slide.subtitle}
                      </span>
                    </div>

                    <h1
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-[1.3] mb-6 break-words"
                      dangerouslySetInnerHTML={{
                        __html: slide.title,
                      }}
                    />

                    <p className="text-lg text-text/70 mb-8 max-w-lg leading-relaxed">
                      {slide.text}
                    </p>

                    <Link
                      to="/about"
                      className="btn-primary px-8 py-3 text-base animate-glow inline-flex items-center gap-3 group"
                    >
                      <span>Get Started</span>
                      <i className="bi bi-arrow-right-circle-fill text-lg transition-transform group-hover:translate-x-2"></i>
                    </Link>
                  </div>

                  {/* RIGHT */}
                  <div className="w-full lg:w-7/12">
                    <div className="relative">
                      <div className="absolute inset-4 bg-white/30 backdrop-blur-md rounded-[2rem] rotate-3 -z-10"></div>

                      <div className="absolute inset-4 bg-primary-50/50 backdrop-blur-md rounded-[2rem] -rotate-2 -z-10"></div>

                      <img
                        src={slide.thumbImg}
                        alt="Satesoft"
                        className="w-full rounded-[2rem] shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* FIXED MEET OUR EXPERTS CARD */}
      <div className="absolute bottom-10 right-8 z-30 hidden lg:block">
        <Link
          to="/board"
          className="flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-[0_4px_15px_-3px_rgba(61,158,65,0.4)] border-y border-primary-100 border-x-4 border-x-primary-500 hover:scale-105 transition-all duration-300"
        >
          <img
            src="/assets/images/african_tech_man_1783002340575.png"
            alt="Expert"
            className="w-14 h-14 rounded-full object-cover border-2 border-primary-500"
          />

          <div>
            <p className="font-bold text-sm uppercase tracking-wide text-text">
              Meet
            </p>
            <p className="text-primary-600 text-sm font-semibold">
              Our Experts
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Hero;