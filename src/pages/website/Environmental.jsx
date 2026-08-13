import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaArrowLeft, FaArrowRight, FaLeaf, FaRecycle, FaGlobeAmericas, FaSun, FaTint, FaBolt, FaBuilding } from "react-icons/fa";

const points = [
  {
    id: 1,
    title: "Unmatched Energy Efficiency",
    subtitle: "Leading the industry in power efficiency",
    content: "Satesoft's cloud infrastructure is up to 4.1 times more energy efficient than traditional on-premises data centers, potentially reducing a workload's carbon footprint by up to 99%. This efficiency comes from operating at massive scale, which allows for better hardware utilization and automated workload management that can shift tasks to times when renewable energy is more available.",
    icon: FaBolt,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    stat: "99%",
    statLabel: "Carbon Reduction",
    statDetail: "4.1x more efficient than on-premises",
    gradient: "from-yellow-50 to-yellow-100/50"
  },
  {
    id: 2,
    title: "100% Renewable Energy Match",
    subtitle: "Powering operations with clean energy",
    content: "Satesoft has matched 100% of the electricity consumed by our global operations with renewable energy purchases since 2023—a goal achieved seven years ahead of schedule. We remain among the world's largest corporate purchasers of renewable energy, with over 600 renewable energy projects across 28 countries.",
    icon: FaSun,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    stat: "100%",
    statLabel: "Renewable Energy",
    statDetail: "600+ projects across 28 countries",
    gradient: "from-orange-50 to-orange-100/50"
  },
  {
    id: 3,
    title: "Water Positive Commitment",
    subtitle: "Returning more water than we use",
    content: "Satesoft is committed to being water positive by 2030, meaning we will return more water to communities than we use in our direct operations. Our data centers achieved a global Water Usage Effectiveness (WUE) of 0.12 liters of water per kilowatt-hour in 2025—more than 7 times better than the industry average.",
    icon: FaTint,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    stat: "0.12L",
    statLabel: "Water / kWh",
    statDetail: "7x better than industry average",
    gradient: "from-blue-50 to-blue-100/50"
  },
  {
    id: 4,
    title: "Lower-Carbon Construction",
    subtitle: "Building a greener infrastructure",
    content: "Satesoft is actively reducing the embodied carbon in our infrastructure by using lower-carbon building materials. Since 2024, our design standards require the use of concrete with 35% less embodied carbon than the industry average for new data centers worldwide.",
    icon: FaBuilding,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    stat: "35%",
    statLabel: "Less Carbon",
    statDetail: "38 data centers built with low-carbon materials",
    gradient: "from-emerald-50 to-emerald-100/50"
  },
  {
    id: 5,
    title: "Circular Economy & Waste Reduction",
    subtitle: "Designing for reuse and recycling",
    content: "Satesoft practices a circular economy approach by designing hardware for reuse, repair, and recycling. Through our reverse logistics hubs, over 99% of decommissioned hardware is diverted from landfills by being reused, sold, or recycled.",
    icon: FaRecycle,
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    stat: "99%",
    statLabel: "Hardware Diverted",
    statDetail: "14.6M components kept in use",
    gradient: "from-green-50 to-green-100/50"
  },
  {
    id: 6,
    title: "The Climate Pledge: Net-Zero by 2040",
    subtitle: "A decade ahead of the Paris Agreement",
    content: "As part of The Climate Pledge, Satesoft has committed to reaching net-zero carbon emissions across all operations by 2040—a decade ahead of the Paris Agreement. This commitment covers not just energy and water, but also materials, supply chain, and circular economy initiatives.",
    icon: FaGlobeAmericas,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    stat: "2040",
    statLabel: "Net-Zero Target",
    statDetail: "10 years ahead of Paris Agreement",
    gradient: "from-teal-50 to-teal-100/50"
  }
];

const Environmental = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            if (id) {
              setVisibleCards(prev => [...new Set([...prev, parseInt(id)])]);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Detail view
  if (selectedPoint) {
    const Icon = selectedPoint.icon;
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-[#72bf24] transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <Link to="/environmental" className="hover:text-[#72bf24] transition-colors">Sustainability</Link>
            <span className="text-gray-300">/</span>
            <span className="text-[#72bf24] font-medium">{selectedPoint.title}</span>
          </nav>

          <button
            onClick={() => setSelectedPoint(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#72bf24] hover:border-[#72bf24] transition-all duration-300 hover:shadow-md mb-8 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to all initiatives
          </button>

          <div className={`relative bg-white rounded-3xl p-8 md:p-12 border ${selectedPoint.borderColor} shadow-xl animate-fadeInUp`}>
            <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${selectedPoint.gradient} rounded-l-3xl`}></div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-8">
                  <div className={`w-20 h-20 rounded-2xl ${selectedPoint.bgColor} border ${selectedPoint.borderColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-4xl ${selectedPoint.color}`} />
                  </div>
                  <div>
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${selectedPoint.bgColor} ${selectedPoint.color} text-sm font-bold border ${selectedPoint.borderColor} mb-2`}>
                      {selectedPoint.id}
                    </span>
                    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
                      {selectedPoint.title}
                    </h1>
                    <p className="text-lg text-gray-500 mt-1">{selectedPoint.subtitle}</p>
                  </div>
                </div>

                <div className={`rounded-2xl p-6 text-center border ${selectedPoint.borderColor} ${selectedPoint.bgColor} mb-8`}>
                  <div className={`text-5xl md:text-6xl font-bold ${selectedPoint.color} mb-1`}>
                    {selectedPoint.stat}
                  </div>
                  <div className="text-sm font-medium text-gray-600 uppercase tracking-wider">
                    {selectedPoint.statLabel}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {selectedPoint.statDetail}
                  </div>
                </div>

                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                  {selectedPoint.content}
                </p>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#72bf24] text-white font-medium rounded-lg hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Learn more about our commitment
                    <FaArrowRight className="text-sm" />
                  </Link>
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-all duration-300"
                  >
                    View all initiatives
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main view
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-[#72bf24]/5 via-transparent to-[#72bf24]/5"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#72bf24]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center animate-fadeInUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-6">
              <FaLeaf className="text-[#72bf24]" />
              Environmental Commitment
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
              Building a <span className="font-semibold text-[#72bf24]">Sustainable</span> Future
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              At Satesoft, we are committed to environmental stewardship through innovation, 
              efficiency, and responsible resource management.
            </p>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Carbon Reduction', value: '99%' },
                { label: 'Renewable Energy', value: '100%' },
                { label: 'Water Efficiency', value: '0.12L' },
                { label: 'Net-Zero Target', value: '2040' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100 hover:border-[#72bf24]/30 hover:shadow-md transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-2xl font-bold text-[#72bf24]">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SUSTAINABILITY CARDS
          ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-20 py-16 md:py-24" ref={sectionRef}>
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Our <span className="font-semibold text-[#72bf24]">Sustainability</span> Initiatives
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            Discover how we're making a positive impact on the planet through six key initiatives.
          </p>
        </div>

        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: true, pauseOnMouseEnter: true }}
            pagination={{ 
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-gray-300 !opacity-100',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#72bf24] !opacity-100'
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 32 },
            }}
            className="pb-14 [&_.swiper-slide]:h-full"
          >
            {points.map((point, index) => {
              const Icon = point.icon;
              return (
                <SwiperSlide key={point.id} className="h-full">
                  <div 
                    className="h-full animate-on-scroll"
                    data-id={point.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div 
                      className="relative bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 h-full flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group cursor-pointer"
                      onClick={() => setSelectedPoint(point)}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${point.gradient} rounded-t-2xl`}></div>
                      
                      <div className={`w-14 h-14 rounded-xl ${point.bgColor} border ${point.borderColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`text-2xl ${point.color}`} />
                      </div>

                      <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${point.bgColor} ${point.color} text-xs font-bold border ${point.borderColor} mb-3`}>
                        {point.id}
                      </span>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                        {point.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 font-light mb-2">{point.subtitle}</p>
                      
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-grow">
                        {point.content}
                      </p>

                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div>
                          <span className={`text-xl font-bold ${point.color}`}>{point.stat}</span>
                          <span className="text-xs text-gray-500 ml-2">{point.statLabel}</span>
                        </div>
                        <span className="text-[#72bf24] font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                          Learn more →
                        </span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* ============================================================
            SUBTLE FOOTER NAVIGATION - Clean and Minimal
            ============================================================ */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 font-light">
            Together, we can build a more sustainable future.
          </p>
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="text-sm text-gray-500 hover:text-[#72bf24] transition-colors font-light"
            >
              ← Back to Home
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/contact" 
              className="text-sm text-[#72bf24] hover:text-[#62a71e] transition-colors font-medium"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          CSS ANIMATIONS
          ============================================================ */}
      <style jsx>{`
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
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Environmental;