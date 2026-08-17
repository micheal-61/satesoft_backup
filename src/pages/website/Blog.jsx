import React, { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaClock, FaComments, FaSearch, FaCalendarAlt, FaEye, FaNewspaper, 
  FaRocket, FaHandshake, FaCode, FaArrowRight
} from "react-icons/fa";

const resolveImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^file:\/\//i.test(trimmed)) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('data:')) return trimmed;
  return '/' + trimmed;
};

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    const refresh = () => {
      fetch('/api/news')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(setArticles)
        .catch(() => {});
    };

    const handleStorage = (e) => {
      if (e.key === 'satesoft_comments_cleared') {
        refresh();
      }
    };

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    const handleFocus = () => {
      refresh();
    };

    window.addEventListener('storage', handleStorage);
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handleVisibility);
    return () => {
      window.removeEventListener('storage', handleStorage);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handleVisibility);
    };
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = ['All', ...new Set(articles.map(a => a.category) || [])];
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

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO HEADER */}
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

        {/* FILTERS & SEARCH */}
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

        {/* ARTICLES GRID */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredArticles.map((article) => {
              const CategoryIcon = article.category ? categoryIcons[article.category] || FaNewspaper : FaNewspaper;
              return (
                <div
                  key={article.id || article.title}
                  className="group relative block overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                   {/* Image */}
                   <div className="relative h-56 overflow-hidden bg-gray-100">
                     <img
                       src={resolveImageUrl(article.imageUrl) || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500"}
                       alt={article.title}
                       className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                     />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/10 to-transparent" />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-[#72bf24] shadow-lg">
                      <CategoryIcon className="text-[#72bf24]" />
                      {article.category || "General"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-[#72bf24]" />
                        {formatDate(article.published_at || article.created_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaClock className="text-[#72bf24]" />
                        {article.readTime || "5 min read"}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight group-hover:text-[#72bf24] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-4">
                      {article.excerpt || "Read more about this insightful article..."}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                       <span className="flex items-center gap-1.5">
                         <div className="w-6 h-6 rounded-full bg-[#72bf24]/10 flex items-center justify-center text-[#72bf24] font-semibold text-xs">
                           {article.author?.charAt(0) || 'S'}
                         </div>
                         {article.author || "Satesoft Team"}
                       </span>
                       
                        <Link 
                          to={`/blog/${article.id}`}
                          className="flex items-center gap-1.5 hover:text-[#72bf24] transition-colors"
                        >
                          <FaComments className="text-[#72bf24]" />
                          <span>{article.comments || 0}</span>
                        </Link>
                        
                        <Link 
                          to={`/blog/${article.id}`}
                          className="flex items-center gap-1.5 hover:text-[#72bf24] transition-colors"
                        >
                          <FaEye className="text-[#72bf24]" />
                          {article.views || 0}
                        </Link>
                     </div>
                  </div>

                  {/* Read more button */}
                  <div className="p-5 pt-0">
                    <Link 
                      to={`/blog/${article.id}`}
                      className="inline-flex items-center text-sm font-semibold text-[#72bf24] group-hover:text-[#62a71e] transition-colors"
                    >
                      Read full article 
                      <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
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

      {/* CSS */}
      <style>{`
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
