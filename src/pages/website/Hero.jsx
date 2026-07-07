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
    title: "Elevate Your <span class='text-primary-500'>Business</span> with IT Excellence",
    text: "We have been operating for over a decade providing IT solutions and services.",
    btnText: "Get Started",
    btnLink: "/about",
    expertText: "<span class='font-bold block'>MEET</span> Our Experts",
    expertLink: "/company",
    profileImg: "/assets/images/african_tech_man_1783002340575.png",
    thumbImg: "/assets/images/african_tech_team_hero_1783002251745.png"
  },
  {
    id: 2,
    subtitle: "TRUSTED BY ENTERPRISES",
    title: "A New <br /> <span class='text-primary-500'>Experience.</span>",
    text: "Capitalize on research and development to design and deliver innovative products.",
    btnText: "Get Started",
    btnLink: "/about",
    expertText: "<span class='font-bold block'>MEET</span> Our Experts",
    expertLink: "/company",
    profileImg: "/assets/images/african_tech_man_1783002340575.png",
    thumbImg: "/assets/images/african_tech_team_hero_2_1783002263030.png"
  }
];

const Hero = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay, EffectFade]}
      effect="fade"
      speed={1000}
      autoplay={{ delay: 6000, disableOnInteraction: false }}
      loop={true}
      className="w-full relative"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="relative flex items-center min-h-[80vh] bg-surface overflow-hidden py-20">
            {/* Background elements for depth */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
              <div className="absolute top-40 right-20 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-40 w-72 h-72 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="w-full lg:w-5/12">
                  <div className="pr-0 lg:pr-8">
                    <h6 className="uppercase tracking-[0.2em] text-primary-600 font-semibold text-sm mb-4">
                      {slide.subtitle}
                    </h6>
                    <h1 
                      className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight mb-6"
                      dangerouslySetInnerHTML={{ __html: slide.title }} 
                    />
                    <p className="text-lg text-text/70 mb-8 max-w-lg">
                      {slide.text}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-8">
                      <Link to={slide.btnLink} className="btn-primary px-8 py-3 rounded-full text-base">
                        {slide.btnText}
                      </Link>

                      <div className="flex items-center gap-4 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 shadow-sm hover:shadow-md transition-all">
                        <img 
                          decoding="async" 
                          src={slide.profileImg} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <Link 
                          to={slide.expertLink} 
                          className="text-sm text-text hover:text-primary-500 transition-colors"
                          dangerouslySetInnerHTML={{ __html: slide.expertText }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-7/12">
                  <div className="relative w-full">
                    {/* Glassmorphism card behind image */}
                    <div className="absolute inset-4 bg-white/30 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-xl rotate-3 -z-10"></div>
                    <div className="absolute inset-4 bg-primary-50/50 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-xl -rotate-2 -z-10"></div>
                    
                    <img 
                      decoding="async" 
                      src={slide.thumbImg} 
                      alt="Thumb" 
                      className="w-full h-auto object-cover rounded-[2rem] shadow-2xl relative z-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Hero;
