import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GraphUpArrow, ArrowLeft, ArrowRight, CheckLg } from "react-bootstrap-icons";

const servicesData = [
  {
    id: 1,
    title: "Big Data Analytics",
    subtitle: "Data That Means Something",
    images: ["/assets/images/african_tech_board_1_1783002554188.png"],
    description:
      "We don't just collect data; we make it meaningful. Our analytics engines are built to handle the scale and complexity of African market dynamics.",
    summary:
      "Turn scattered market signals into clear decisions. We help African businesses understand their customers and act on real evidence, not guesswork.",
    features: [
      "Analytics built for African markets",
      "Handles scale & complexity",
      "Meaningful, actionable insights",
      "Resilient data pipelines",
    ],
  },
  {
    id: 2,
    title: "African Market Solutions",
    subtitle: "Software Built In Africa, For Africa",
    image: "/assets/images/african_tech_team_hero_1783002251745.png",
    description:
      "Software built for Africa, in Africa. We understand the infrastructure challenges and build resilient systems that work everywhere.",
    summary:
      "Systems designed for real African conditions — low connectivity, diverse languages, and fast growth — so your software works wherever your customers are.",
    features: [
      "Software built for Africa",
      "Resilient, offline-capable systems",
      "Infrastructure-aware design",
      "Works everywhere",
    ],
  },
  {
    id: 3,
    title: "Strategic R&D",
    subtitle: "Inventing Tomorrow's Solutions",
    image: "/assets/images/african_tech_man_1783002340575.png",
    description:
      "Our research lab is constantly exploring new ways to solve continental problems through AI, IoT, and advanced software engineering.",
    summary:
      "Stay ahead of change. We explore AI, IoT, and new engineering so your business is ready for tomorrow's problems, not just today's.",
    features: [
      "AI & IoT exploration",
      "Advanced software engineering",
      "Continental problem solving",
      "Continuous research lab",
    ],
  },
  {
    id: 4,
    title: "Enterprise Security",
    subtitle: "Your Data, Protected",
    image: "/assets/images/african_tech_meeting_1783002294603.png",
    description:
      "Protecting your data is our priority. We implement world-class security standards tailored for local compliance requirements.",
    summary:
      "Your data stays yours. We apply global security standards tuned to local regulations, so trust and compliance travel together.",
    features: [
      "World-class security standards",
      "Local compliance tailored",
      "Proactive data protection",
      "Continuous monitoring",
    ],
  },
];

export default function OurServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [cycleCount, setCycleCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [detail, setDetail] = useState(null);
  const autoCycleTimer = useRef(null);

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

  // Auto-slide (paused while a detail view is open)
  useEffect(() => {
    if (detail || isPaused) return;

    autoCycleTimer.current = setInterval(() => {
      nextCard();
    }, 7000);

    return () => {
      if (autoCycleTimer.current) {
        clearInterval(autoCycleTimer.current);
        autoCycleTimer.current = null;
      }
    };
  }, [activeIndex, isPaused, detail]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (detail) {
        if (e.key === "Escape") setDetail(null);
        return;
      }
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
  }, [detail]);

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

  // ---- Detail "page" view (everything in this single file) ----
  if (detail) {
    return (
      <section className="py-20 bg-bg min-h-screen relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <div className="mb-12">
            <button
              onClick={() => setDetail(null)}
              className="inline-flex items-center text-text font-bold tracking-widest text-sm hover:text-primary-500 transition-colors uppercase group"
            >
              <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
              BACK TO SERVICES
            </button>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
            {/* Left Section - Description + Image */}
            <div className="w-full lg:w-3/5 text-left flex flex-col justify-center">
              <div className="mb-8 w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center border border-primary-200 shadow-sm">
                <GraphUpArrow size={48} className="text-primary-600" />
              </div>

              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-text mb-6 tracking-tight leading-tight">
                {detail.title}
              </h1>

              <h5 className="uppercase text-primary-500 tracking-widest font-bold mb-8">
                {detail.subtitle}
              </h5>

              <p className="text-xl text-text/70 leading-relaxed max-w-2xl mb-12">
                {detail.description}
              </p>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-border">
                <img
                  src={detail.images ? detail.images[0] : detail.image}
                  alt={detail.title}
                  className="w-full h-[320px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Section - Theme Summary Card */}
            <div className="w-full lg:w-2/5">
              <div className="card h-full bg-white border border-border rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col justify-center">
                <h2 className="font-bold text-3xl text-text mb-6 flex items-center">
                  <span className="text-primary-500 mr-3">
                    <CheckLg size={32} />
                  </span>
                  What This Means
                </h2>

                <p className="text-lg text-text/70 leading-relaxed mb-8">
                  {detail.summary}
                </p>

                <ul className="space-y-4 mb-10">
                  {detail.features.map((feature, index) => (
                    <li key={index} className="flex items-center group">
                      <div className="w-9 h-9 rounded-full bg-primary-50 flex items-center justify-center mr-4 border border-primary-100 group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                        <CheckLg size={18} className="text-primary-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-text font-medium group-hover:text-primary-600 transition-colors">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 group py-4 text-lg"
                >
                  Get Started
                  <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ---- Services carousel view ----
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

                <button
                  onClick={() => setDetail(service)}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-full hover:bg-primary-600 hover:shadow-lg transition-all duration-300"
                >
                  Explore Service
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    →
                  </span>
                </button>
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

        {/* Controls */}
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
