import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Oluwaseun Adeyemi",
    role: "Operations Director",
    image: "/assets/images/african_tech_man_3_1783002828452.png",
    text: "Satesoft's data analytics dashboard completely transformed how we understand our cross-border supply chain operations. Unparalleled insights.",
  },
  {
    id: 2,
    name: "Amara Okafor",
    role: "Head of IT",
    image: "/assets/images/african_tech_woman_3_1783002839334.png",
    text: "The cybersecurity infrastructure they deployed for our banking network is world-class. We haven't had a single breach since implementation.",
  },
  {
    id: 3,
    name: "Kofi Mensah",
    role: "Chief Archivist",
    image: "/assets/images/african_tech_man_1783002340575.png",
    text: "Their custom ERP system digitized our entire archive in a fraction of the time we expected. The AI-driven search is an absolute lifesaver.",
  },
  {
    id: 4,
    name: "Sarah Jenkins",
    role: "Logistics Manager",
    image: "/assets/images/african_tech_woman_1783002349511.png",
    text: "Outstanding cloud migration services. Satesoft minimized our downtime to nearly zero during the transition.",
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-100 shadow-sm">
            TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-0 tracking-tight">
            What Our Customer <span className="text-primary-600">Says</span>
          </h2>
        </div>

        <div className="relative pt-12">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={40}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-primary-500 !opacity-50', bulletActiveClass: 'swiper-pagination-bullet-active !opacity-100' }}
            breakpoints={{
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="pt-10">
                <div className="relative bg-surface rounded-3xl p-8 shadow-lg border border-border mt-10 h-full flex flex-col transition-transform hover:-translate-y-2 duration-300">
                  
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                  </div>

                  {/* Author Image */}
                  <div className="absolute -top-12 right-8 w-24 h-24 rounded-full border-4 border-surface shadow-xl overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="mt-8 flex-grow">
                    <p className="text-text/70 text-lg leading-relaxed italic mb-6">"{item.text}"</p>
                    <div className="flex text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 mt-auto">
                    <h3 className="font-bold text-text text-xl">{item.name}</h3>
                    <p className="text-primary-600 font-medium text-sm tracking-wide uppercase mt-1">{item.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
