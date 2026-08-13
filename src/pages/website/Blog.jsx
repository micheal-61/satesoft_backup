import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowRight, FaClock, FaComments, FaSearch, FaTag, FaUser, 
  FaCalendarAlt, FaShareAlt, FaEye, FaArrowLeft, FaArrowRight as FaArrowRightIcon,
  FaNewspaper, FaRocket, FaHandshake, FaCode
} from "react-icons/fa";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Category icons mapping
  const categoryIcons = {
    'Company News': FaNewspaper,
    'Product Updates': FaRocket,
    'Partnerships': FaHandshake,
    'Technology': FaCode,
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (!response.ok) throw new Error('Failed to fetch news');
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Extract unique categories from articles
  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(articles.map(a => a.category))];
    return uniqueCategories;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return articles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesSearch = query === "" || 
        article.title.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query) ||
        article.author?.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchTerm]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50);
  };

  // Reset carousel when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [filteredArticles, activeCategory, searchTerm]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const nextSlide = useCallback(() => {
    if (isTransitioning || filteredArticles.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % filteredArticles.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [filteredArticles.length, isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning || filteredArticles.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + filteredArticles.length) % filteredArticles.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [filteredArticles.length, isTransitioning]);

  // Auto-rotate carousel
  useEffect(() => {
    if (filteredArticles.length <= 1 || !isAutoPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [filteredArticles.length, nextSlide, isAutoPlaying]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 font-light">Loading stories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-5xl mb-4">😕</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load stories</h3>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#72bf24] text-white rounded-lg hover:bg-[#62a71e] transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const currentArticle = filteredArticles[currentIndex];
  const CategoryIcon = currentArticle?.category ? categoryIcons[currentArticle.category] || FaNewspaper : FaNewspaper;

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ============================================================
            HERO HEADER
            ============================================================ */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
            <FaNewspaper className="text-[#72bf24]" />
            Insights Hub
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4">
            Fresh Ideas for <span className="font-semibold text-[#72bf24]">Modern Teams</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 font-light">
            Stay updated with the latest company news, product innovations, and industry insights.
          </p>
        </div>

        {/* ============================================================
            FILTERS & SEARCH
            ============================================================ */}
        <div className="mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#72bf24] text-white shadow-lg shadow-[#72bf24]/20"
                    : "bg-white text-gray-600 hover:bg-[#72bf24]/10 hover:text-[#72bf24] border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm min-w-full sm:min-w-[280px]">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stories..."
              className="w-full bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ============================================================
            CAROUSEL
            ============================================================ */}
        {filteredArticles.length > 0 ? (
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden rounded-2xl">
              <div
                className={`transition-all duration-700 ease-in-out ${
                  isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                }`}
              >
                <Link
                  to={`/blog/${currentArticle.slug || generateSlug(currentArticle.title)}`}
                  className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500"
                >
                  <div className="grid lg:grid-cols-5">
                    {/* Image */}
                    <div className="relative h-72 sm:h-96 lg:h-auto lg:col-span-2 overflow-hidden bg-gray-100">
                      <img
                        src={currentArticle.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500"}
                        alt={currentArticle.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-gray-900/10" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-[#72bf24] shadow-lg">
                        <CategoryIcon className="text-[#72bf24]" />
                        {currentArticle.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3 flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-[#72bf24]" />
                          {formatDate(currentArticle.published_at || currentArticle.created_at)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-[#72bf24]" />
                          {currentArticle.readTime || "5 min read"}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3 leading-tight group-hover:text-[#72bf24] transition-colors">
                        {currentArticle.title}
                      </h3>
                      
                      <p className="text-base text-gray-600 leading-relaxed line-clamp-2 mb-4">
                        {currentArticle.excerpt || "Read more about this insightful article..."}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-[#72bf24]/10 flex items-center justify-center text-[#72bf24] font-semibold text-xs">
                            {currentArticle.author?.charAt(0) || 'S'}
                          </div>
                          {currentArticle.author || "Satesoft Team"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaComments className="text-[#72bf24]" />
                          {currentArticle.comments || 0} comments
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaEye className="text-[#72bf24]" />
                          {currentArticle.views || 0} views
                        </span>
                      </div>
                      
                      <div className="mt-6">
                        <span className="inline-flex items-center font-semibold text-[#72bf24] group-hover:text-[#62a71e] transition-colors">
                          Read full article 
                          <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Navigation Controls */}
            {filteredArticles.length > 1 && (
              <>
                <div className="flex items-center justify-center gap-4 mt-8">
                  <button
                    onClick={prevSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-[#72bf24] hover:text-[#72bf24] hover:shadow-md"
                    aria-label="Previous slide"
                  >
                    <FaArrowLeft className="text-sm" />
                  </button>

                  <div className="flex items-center gap-2">
                    {filteredArticles.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`rounded-full transition-all duration-500 ${
                          idx === currentIndex
                            ? "h-2.5 w-8 bg-[#72bf24] shadow-md shadow-[#72bf24]/30"
                            : "h-2.5 w-2.5 bg-gray-300 hover:bg-[#72bf24]/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-all duration-300 hover:border-[#72bf24] hover:text-[#72bf24] hover:shadow-md"
                    aria-label="Next slide"
                  >
                    <FaArrowRightIcon className="text-sm" />
                  </button>
                </div>

                <div className="mt-3 text-center text-sm text-gray-400 font-light">
                  {currentIndex + 1} of {filteredArticles.length} articles
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/70 p-16 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-400 font-light">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        )}
      </div>

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
      `}</style>
    </section>
  );
};

export default Blog;