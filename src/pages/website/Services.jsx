import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "Big Data Analytics",
    images: ["/assets/images/african_tech_board_1_1783002554188.png"],
    description:
      "We don't just collect data; we make it meaningful. Our analytics engines are built to handle the scale and complexity of African market dynamics.",
    link: "/contact",
  },
  {
    id: 2,
    title: "African Market Solutions",
    image: "/assets/images/african_tech_team_hero_1783002251745.png",
    description:
      "Software built for Africa, in Africa. We understand the infrastructure challenges and build resilient systems that work everywhere.",
    link: "/contact",
  },
  {
    id: 3,
    title: "Strategic R&D",
    image: "/assets/images/african_tech_man_1783002340575.png",
    description:
      "Our research lab is constantly exploring new ways to solve continental problems through AI, IoT, and advanced software engineering.",
    link: "/contact",
  },
  {
    id: 4,
    title: "Enterprise Security",
    image: "/assets/images/african_tech_meeting_1783002294603.png",
    description:
      "Protecting your data is our priority. We implement world-class security standards tailored for local compliance requirements.",
    link: "/contact",
  },
];

export default function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const autoCycleTimer = useRef(null);

  // Centralized card change function with fade
  const changeCard = (targetIndex) => {
    setFade(false);
    setImageLoaded(false);
    setTimeout(() => {
      setActiveIndex(targetIndex);
      setCycleCount((prev) => prev + 1);
      setFade(true);
    }, 1000);
  };

  const nextCard = () => {
    changeCard((prev) => (prev + 1) % servicesData.length);
  };

  const prevCard = () => {
    changeCard((prev) => (prev === 0 ? servicesData.length - 1 : prev - 1));
  };

  // Auto-slide with hover pause and proper timer reset
  useEffect(() => {
    if (autoCycleTimer.current) {
      clearInterval(autoCycleTimer.current);
      autoCycleTimer.current = null;
    }

    if (isPaused) return;

    autoCycleTimer.current = setInterval(() => {
      nextCard();
    }, 7000);

    return () => {
      if (autoCycleTimer.current) {
        clearInterval(autoCycleTimer.current);
        autoCycleTimer.current = null;
      }
    };
  }, [activeIndex, isPaused]);

  // Keyboard navigation (professional: only arrows, no spacebar pause)
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
  }, []);

  // Touch/Swipe support for mobile
  useEffect(() => {
    const handleTouchStart = (e) => {
      setTouchStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e) => {
      if (touchStartX === 0) return;
      const diff = touchStartX - e.changedTouches[0].clientX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextCard();
        } else {
          prevCard();
        }
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
  }, [touchStartX]);

  const service = servicesData[activeIndex];
  const imageToShow = service.images
    ? service.images[cycleCount % service.images.length]
    : service.image;

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      {/* Background Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h5 className="uppercase tracking-[4px] text-primary-500 font-semibold text-sm mb-4">
            SATESOFT SERVICES
          </h5>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-text">
            How Professional IT Services <br />
            Can Drive <span className="text-primary-500">Success.</span>
          </h2>
        </div>

        {/* Main Card */}
        <div
          id="carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`transition-opacity duration-1000 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-primary-500 font-semibold">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(servicesData.length).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold mb-5 text-text">
                  {service.title}
                </h3>

                <p className="text-text/70 text-lg leading-relaxed mb-8 min-h-[100px]">
                  {service.description}
                </p>

                {/* Trust Indicators */}
                <div className="flex flex-wrap gap-4 text-sm text-text/60 mb-8">
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Reliable
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Scalable
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="text-green-500">✓</span> Professional Support
                  </span>
                </div>

                <Link
                  to={service.link}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:shadow-lg transition-all duration-300"
                >
                  Explore Service
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </Link>
              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-2xl h-[350px] bg-gray-100">
                <img
                  src={imageToShow}
                  alt={service.title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
                  } hover:scale-105`}
                  onLoad={() => setImageLoaded(true)}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls - Clean, professional navigation only */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={prevCard}
            aria-label="Previous Service"
            className="w-12 h-12 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-primary-50 hover:border-primary-200 hover:shadow-md transition-all duration-300 flex items-center justify-center text-xl text-text/70 hover:text-primary-600"
          >
            ←
          </button>

          <button
            onClick={nextCard}
            aria-label="Next Service"
            className="w-12 h-12 rounded-full bg-primary-500 text-white shadow-md hover:bg-primary-600 hover:shadow-lg transition-all duration-300 flex items-center justify-center text-xl"
          >
            →
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {servicesData.map((serviceItem, index) => (
            <button
              key={serviceItem.id}
              title={serviceItem.title}
              onClick={() => changeCard(index)}
              aria-label={`Go to ${serviceItem.title}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-12 bg-primary-500"
                  : "w-3 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
