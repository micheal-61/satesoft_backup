import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "Website Development & Hosting",
    images: ["/assets/images/web_design.png", "/assets/images/web_hosting.png"],
    description:
      "Our hosting is affordable at a fixed annual fee. The fee covers a domain of your choice and ensures reliable performance, security, and scalability.",
    link: "/services/website-development",
  },
  {
    id: 2,
    title: "Client Support",
    image: "/assets/images/client_support.png",
    description:
      "We aim to be our clients' first point of contact for all support and business development issues, providing timely and effective solutions.",
    link: "/services/client-support",
  },
  {
    id: 3,
    title: "Research, Design & Development",
    image: "/assets/images/future.png",
    description:
      "Research and development play a critical role in innovation, helping organizations prepare for future opportunities and challenges.",
    link: "/services/research-design",
  },
  {
    id: 4,
    title: "Social Media Management",
    image: "/assets/images/social.png",
    description:
      "We use our expertise to help clients maximize engagement, visibility, and value across social media platforms.",
    link: "/services/social-media",
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
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h5 className="uppercase tracking-widest text-primary-500 font-semibold text-sm mb-3">SATESOFT SERVICES</h5>
          <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight max-w-3xl">
            How Professional IT Services<br /> Can Drive <span className="text-primary-500">Success.</span>
          </h1>                            
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="group">
              <div className="card h-full flex flex-col items-start border border-border bg-white hover:border-primary-200 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <i className={`${service.icon} text-3xl text-primary-500 group-hover:text-white transition-colors duration-300`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="text-text/70 mb-8 flex-grow leading-relaxed">{service.description}</p>
                
                <div className="mt-auto">
                  <Link to={service.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-700 transition-colors">
                    <i className="fas fa-plus text-xs"></i> READ MORE
                  </Link>
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
          ))}
        </div>
      </div>
    </section>
  );
}