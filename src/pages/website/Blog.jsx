import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaClock, FaComments, FaSearch, FaTag, FaUser } from "react-icons/fa";

const dummyArticles = [
  {
    id: 1,
    slug: "future-of-ai-in-africa",
    title: "Satesoft Expands Operations to West Africa",
    publishDate: "2026-03-20",
    author: "Admin",
    comments: 5,
    category: "Company News",
    excerpt: "We are thrilled to announce our new subsidiary in Nigeria, marking a significant milestone in our mission to digitize Africa's informal economy.",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 2,
    slug: "fintech-security-2026",
    title: "Dugact 2.0: Now with AI-Powered Predictive Analytics",
    publishDate: "2026-03-15",
    author: "Admin",
    comments: 2,
    category: "Product Updates",
    excerpt: "The latest update to our retail intelligence platform brings advanced forecasting tools to small business owners.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 3,
    slug: "satesoft-series-b",
    title: "Satesoft Partners with Regional Banks for Financial Inclusion",
    publishDate: "2026-03-05",
    author: "Admin",
    comments: 8,
    category: "Partnerships",
    excerpt: "New integration allows Dugact users to access micro-loans directly through the platform.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 4,
    slug: "digital-operations-blueprint",
    title: "Satesoft Launches Next-Generation Cloud Platform",
    publishDate: "2026-02-28",
    author: "Admin",
    comments: 3,
    category: "Company News",
    excerpt: "Our new cloud infrastructure delivers faster performance, enhanced security, and greater scalability for businesses across Africa.",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

const categories = ["All", "AI", "Payments", "Innovation", "Funding"];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return dummyArticles.filter((article) => {
      const matchesCategory = activeCategory === "All" || article.category === activeCategory;
      const matchesSearch =
        query === "" ||
        [article.title, article.excerpt, article.category]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const featuredArticle = filteredArticles[0] || dummyArticles[0];
  const remainingArticles = filteredArticles.slice(1);

  return (
    <section id="Blog" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-100 shadow-sm">
            INSIGHTS HUB
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">Fresh ideas for modern teams</h2>
          <p className="max-w-2xl mx-auto text-lg text-text/70">
            Company News.
          </p>
        </div>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                    : "bg-surface text-text/70 hover:bg-primary-50 hover:text-primary-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 shadow-sm min-w-full sm:min-w-[280px]">
            <FaSearch className="text-primary-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stories"
              className="w-full bg-transparent text-sm outline-none text-text placeholder:text-text/40"
            />
          </label>
        </div>

        {filteredArticles.length > 0 ? (
          <>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] mb-8">
              <Link to={`/blog/${featuredArticle.slug}`} className="group relative overflow-hidden rounded-[0.3rem] border border-border bg-surface shadow-lg hover:shadow-2xl transition-all duration-300">
                <img src={featuredArticle.imageUrl} alt={featuredArticle.title} className="h-96 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm mb-3">
                    <FaTag className="text-primary-300" />
                    Company News
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-3">{featuredArticle.title}</h3>
                  <p className="text-sm sm:text-base text-slate-200 mb-4">{featuredArticle.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200">
                    <span className="flex items-center gap-2"><FaUser /> {featuredArticle.author}</span>
                    <span className="flex items-center gap-2"><FaClock /> {featuredArticle.readTime}</span>
                    <span className="flex items-center gap-2"><FaComments /> {featuredArticle.comments} comments</span>
                  </div>
                </div>
              </Link>

              <div className="space-y-4">
                {remainingArticles.slice(0, 2).map((article) => (
                  <Link key={article.id} to={`/blog/${article.slug}`} className="group flex gap-4 rounded-[0.3rem] border border-border bg-surface p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <img src={article.imageUrl} alt={article.title} className="h-24 w-24 flex-shrink-0 rounded-[0.3rem] object-cover" />
                    <div className="min-w-0">
                      <div className="mb-2 inline-flex items-center rounded-full bg-primary-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-600">
                        {article.category}
                      </div>
                      <h4 className="text-base font-semibold text-text line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {article.title}
                      </h4>
                      <p className="mt-1 text-sm text-text/60">{article.publishDate}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredArticles.map((article) => (
                <div key={article.id} className="group flex flex-col overflow-hidden rounded-[0.3rem] border border-border bg-surface shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative h-56 overflow-hidden">
                    <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute left-4 top-4 rounded-full bg-primary-600/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                      {article.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center gap-4 text-sm text-text/60">
                      <span className="flex items-center gap-2"><FaUser className="text-primary-500" /> {article.author}</span>
                      <span className="flex items-center gap-2"><FaComments className="text-primary-500" /> {article.comments}</span>
                    </div>

                    <h4 className="mb-3 text-xl font-bold text-text transition-colors group-hover:text-primary-600 line-clamp-2">
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h4>
                    <p className="mb-5 flex-1 text-sm leading-6 text-text/70">{article.excerpt}</p>

                    <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
                      <span className="flex items-center gap-2 text-text/60"><FaClock className="text-primary-500" /> {article.readTime}</span>
                      <Link to={`/blog/${article.slug}`} className="inline-flex items-center font-semibold text-primary-600 transition-colors hover:text-primary-700">
                        Read more <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-surface/70 p-10 text-center text-text/60">
            No stories match your current filters. Try another keyword or category.
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;
