import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronLeft, FaChevronRight, FaCheckCircle } from "react-icons/fa";

const safeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^file:\/\//i.test(trimmed)) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('data:')) return trimmed;
  return '/' + trimmed;
};

const OurServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const autoCycleTimer = useRef(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        if (!response.ok) throw new Error('Failed to fetch services');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const changeCard = (targetIndex) => {
    if (targetIndex === activeIndex || services.length === 0) return;
    setFade(false);
    setImageLoaded(false);
    setImageError(false);
    setTimeout(() => {
      setActiveIndex(targetIndex);
      setFade(true);
    }, 500);
  };

  const nextCard = () => {
    if (services.length > 0) {
      changeCard((activeIndex + 1) % services.length);
    }
  };

  const prevCard = () => {
    if (services.length > 0) {
      changeCard(activeIndex === 0 ? services.length - 1 : activeIndex - 1);
    }
  };

  // Auto-play with pause on hover
  useEffect(() => {
    if (services.length === 0 || isPaused) {
      if (autoCycleTimer.current) {
        clearInterval(autoCycleTimer.current);
        autoCycleTimer.current = null;
      }
      return;
    }

    autoCycleTimer.current = setInterval(() => {
      nextCard();
    }, 6000);

    return () => {
      if (autoCycleTimer.current) {
        clearInterval(autoCycleTimer.current);
        autoCycleTimer.current = null;
      }
    };
  }, [activeIndex, isPaused, services.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextCard();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [services.length]);

  // Touch support
  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
      if (touchStartX === 0) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) nextCard();
        else prevCard();
      }
      setTouchStartX(0);
    };

    const element = document.getElementById("carousel-container");
    if (element) {
      element.addEventListener("touchstart", handleTouchStart);
      element.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart);
        element.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [touchStartX, services.length]);

  // Loading state
  if (loading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 font-light animate-pulse">Loading services...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load services</h3>
          <p className="text-gray-500">{error}</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#72bf24] text-white font-medium rounded-lg hover:bg-[#62a71e] transition-colors">
            Back to Home
          </Link>
        </div>
      </section>
    );
  }

  // Empty state
  if (!services.length) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No services available</h3>
          <p className="text-gray-500 font-light">Please check back later for our service offerings.</p>
        </div>
      </section>
    );
  }

  const service = services[activeIndex];
  const rawImage = service.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500";
  const imageToShow = safeImageUrl(rawImage) || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500";
  const fallbackImage = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500";

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#72bf24]/5 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl opacity-50 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* ============================================================
            HEADER
            ============================================================ */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
            Our Services
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
            Service to your reach <span className="font-semibold text-[#72bf24]">Our dear Customer.</span>
          </h2>
          <p className="text-lg text-gray-500 font-light mt-4">
            Explore our comprehensive range of technology solutions designed to transform your business.
          </p>
        </div>

        {/* ============================================================
            MAIN CARDS
            ============================================================ */}
        <div
          id="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-6 md:p-10 lg:p-14 border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              
              {/* LEFT - Content */}
              <div>
                {/* Counter */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-[#72bf24]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </span>
                  <div className="w-12 h-0.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#72bf24] rounded-full transition-all duration-1000"
                      style={{ width: `${((activeIndex + 1) / services.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 font-light">
                    {String(services.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-600 font-light leading-relaxed mb-6 min-h-[80px]">
                  {service.description}
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Reliable', 'Scalable', 'Secure', '24/7 Support'].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
                      <FaCheckCircle className="text-[#72bf24] text-xs" />
                      {badge}
                    </span>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#72bf24] text-white font-normal rounded-lg hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group"
                  >
                    Explore Service
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#72bf24] hover:text-[#72bf24] transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* RIGHT - Image */}
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[280px] md:h-[320px] lg:h-[380px]">
                <img
                  src={imageError ? fallbackImage : imageToShow}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  } hover:scale-105 transition-transform duration-700`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                  loading="lazy"
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-10 h-10 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            CONTROLS
            ============================================================ */}
        <div className="flex flex-col items-center gap-6 mt-10">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-4">
            <button
              onClick={prevCard}
              aria-label="Previous Service"
              className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-[#72bf24] hover:text-white hover:border-[#72bf24] hover:shadow-md transition-all duration-300 flex items-center justify-center text-gray-600 hover:text-white"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <button
              onClick={nextCard}
              aria-label="Next Service"
              className="w-12 h-12 rounded-full bg-[#72bf24] text-white shadow-md hover:bg-[#62a71e] hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2.5">
            {services.map((serviceItem, index) => (
              <button
                key={serviceItem.id}
                title={serviceItem.title}
                onClick={() => changeCard(index)}
                aria-label={`Go to ${serviceItem.title}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "w-10 bg-[#72bf24] shadow-md shadow-[#72bf24]/20"
                    : "w-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <p className="text-sm text-gray-400 font-light">
            {activeIndex + 1} of {services.length} services
          </p>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
