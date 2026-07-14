import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaClock, FaShareAlt, FaUser } from "react-icons/fa";

const blogDetailsData = {
  "future-of-ai-in-africa": {
    id: 1,
    title: "Satesoft Expands Operations to West Africa",
    category: "Company News",
    date: "2026-03-20",
    author: "Corporate Communications",
    content: `Satesoft Corporation Limited is proud to announce the official registration
    of its subsidiary in Nigeria. This expansion is a key part of our strategic
    vision to provide inclusive technology solutions across the continent.

    Our Nigerian team will focus on deploying Duacqt and Karibyshoo to local
    retail and facility management sectors.

    This move follows our successful operations in Kenya and Uganda, and we look
    forward to bringing our smart, inclusive technology to the vibrant Nigerian
    market.`
  }
};

const BlogDetails = () => {
  const [article, setArticle] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const selectedArticle = blogDetailsData[slug] || blogDetailsData["future-of-ai-in-africa"];

    if (!selectedArticle) return;

    setArticle({
      ...selectedArticle,
      publishDate: selectedArticle.date,
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500"
    });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Unable to copy link", error);
    }
  };

  const paragraphs = article?.content?.split(/\n\s*\n/).filter(Boolean) || [];
  const readTime = useMemo(() => {
    const words = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
    return Math.max(2, Math.ceil(words / 180));
  }, [paragraphs]);

  if (!article) {
    return <div className="mx-auto min-h-screen max-w-4xl px-4 py-20 text-center text-lg font-medium text-text/70">Loading...</div>;
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg py-10 sm:py-16">
      <div className="fixed left-0 top-0 z-40 h-1 w-full bg-slate-200/70">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-semibold text-primary-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50">
            <FaArrowLeft />
            Back to Blog
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-semibold text-text/70 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-50 hover:text-primary-600"
          >
            <FaShareAlt />
            {copied ? "Link copied" : "Share story"}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
          <article className="group overflow-hidden rounded-[0.3rem] border border-border bg-surface shadow-xl shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="relative h-72 overflow-hidden sm:h-[430px]">
              <img src={article.imageUrl} alt={article.title} className="h-full w-full object-cover transition duration-700 hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
                  {article.category}
                </span>
                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">{article.title}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-200">
                  <span className="flex items-center gap-2"><FaUser /> {article.author}</span>
                  <span className="flex items-center gap-2"><FaClock /> {readTime} min read</span>
                  <span>{article.publishDate}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="mb-8 rounded-[0.3rem] border border-primary-100 bg-primary-50/70 p-4 text-sm text-text/80 shadow-sm sm:p-5">
                <p className="font-semibold text-primary-700">Why this matters</p>
                <p className="mt-2 leading-7">
                  Satesoft is expanding its footprint across West Africa to bring smarter, more accessible technology to businesses and communities.
                </p>
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-text/80 leading-8">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${article.id}-${index}`} className="rounded-[0.3rem] bg-white/40 p-0.5">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            <div className="group sticky top-16 rounded-[0.3rem] border border-border bg-surface p-6 shadow-lg shadow-slate-200/70 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">At a glance</p>
              <h2 className="mt-3 text-xl font-bold text-text">What this update means</h2>
              <ul className="mt-5 space-y-3 text-sm text-text/70">
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">A new West African subsidiary in Nigeria</li>
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">Expanded delivery of Duacqt and Karibyshoo</li>
                <li className="rounded-[0.3rem] border border-border bg-bg/70 p-3">A stronger local footprint for inclusive innovation</li>
              </ul>

              <div className="mt-6 rounded-[0.3rem] border border-dashed border-primary-200 bg-primary-50/60 p-4 text-sm text-primary-700">
                This announcement reflects our commitment to scale responsibly and serve more communities with practical technology.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
