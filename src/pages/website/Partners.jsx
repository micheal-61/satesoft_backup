import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch('/api/partners');
        if (!response.ok) throw new Error('Failed to fetch partners');
        const data = await response.json();
        setPartners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-28 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 text-primary-500">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-medium">Loading partners...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-28 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-28 bg-white border-y border-border">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h4 className="text-primary-600 uppercase font-bold tracking-[0.2em] mb-4 text-sm">Our Network</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-0 tracking-tight">Trusted by Global Leaders</h2>
        </div>

        {partners.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={48}
              slidesPerView={2}
              loop={true}
              speed={3000}
              autoplay={{ delay: 0, disableOnInteraction: false }}
              breakpoints={{
                576: { slidesPerView: 3 },
                768: { slidesPerView: 4 },
                992: { slidesPerView: 5 },
                1200: { slidesPerView: 6 },
              }}
              className="w-full"
            >
              {partners.map((partner, index) => (
                <SwiperSlide key={partner.id || index}>
                  <div className="flex flex-col items-center justify-center h-24 p-4">
                    <img 
                      src={partner.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name || 'Partner')}&background=random`} 
                      alt={partner.name} 
                      className="max-h-12 max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name || 'Partner')}&background=random`;
                      }}
                    />
                    <p className="text-xs font-medium text-text/60 mt-2 text-center">{partner.name}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface/70 p-10 text-center text-text/60">
            <h5 className="text-xl font-medium mb-2">No partners available</h5>
            <p>Check back later or add partners from the admin dashboard.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;
