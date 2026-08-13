import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import HomeProducts from "./HomeProducts";

const africanImages = [
  "/assets/images/african_tech_woman_3_1783002839334.png",
  "/assets/images/african_tech_woman_1783002349511.png",
  "/assets/images/african_developer_laptop_1783002306037.png",
  "/assets/images/african_tech_team_hero_1783002251745.png",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % africanImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
    }
  };

  return (
    <div>
      {/* WELCOME BANNER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-primary-50/80 via-white to-white border-b border-primary-100">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-primary-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-8 sm:px-12 lg:px-20 pt-20 pb-20 md:pt-28 md:pb-28">
              <div className="max-w-3xl mx-auto text-center">
                {/* Welcome Message */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-10 shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                  </span>
                  We're online and ready to help
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-text mb-6 leading-tight border-t-2 border-primary-500 pt-10">
                  Hi, Welcome to <span className="text-lime-400">Satesoft</span>
                </h1>

                <p className="text-xl md:text-2xl text-text/70 mb-12 max-w-2xl mx-auto leading-relaxed">
                  Have question in mind?
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                      <i className="bi bi-search text-text/40 text-lg group-focus-within:text-primary-500 transition-colors"></i>
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for solutions, services, or information..."
                      className="w-full pl-16 pr-40 py-5 bg-white border-2 border-gray-200 rounded-2xl text-text placeholder-text/40 focus:outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all duration-300 shadow-sm hover:shadow-md text-base"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 px-7 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Quick Links */}
                <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
              <span className="text-xs text-text/50 font-medium">Popular:</span>
              {["Cloud Solutions", "Data Analytics", "Consulting", "Support"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-medium text-text/70 hover:text-primary-600 hover:border-primary-300 hover:shadow-sm transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <Hero />

      {/* PRODUCTS SECTION */}
      <HomeProducts />
     </div>
   );
 };

 export default Home;
