import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  const [article, setArticle] = useState(null);
  const slug = window.location.pathname.split("/blog/")[1];

  useEffect(() => {
    if (!slug) return;
    // Backend connection removed
    setArticle({
      title: "Backend Disconnected",
      category: "System",
      publishDate: "N/A",
      content: "This application is running in frontend-only mode. The backend has been removed.",
      imageUrl: ""
    });
  }, [slug]);

  if (!article) return <div className="max-w-4xl mx-auto px-4 py-20 min-h-screen text-center text-text/70 font-medium text-lg">Loading...</div>;

  return (
    <section className="bg-bg min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold mb-8 transition-colors">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
          Back to Blog
        </Link>
        <div className="bg-surface rounded-2xl overflow-hidden shadow-sm border border-border">
          {article.imageUrl ? (
            <img src={article.imageUrl} alt={article.title} className="w-full h-[400px] object-cover" />
          ) : (
            <div className="w-full h-48 bg-gradient-to-r from-border to-bg flex items-center justify-center">
              <span className="text-text/40 text-lg font-medium">No Image Available</span>
            </div>
          )}
          <div className="p-8 sm:p-12">
            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-md mb-6">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 leading-tight">{article.title}</h1>
            <div className="flex items-center text-text/60 text-sm font-medium mb-10 pb-8 border-b border-border">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              {article.publishDate}
            </div>
            <div className="prose prose-lg max-w-none text-text/80 leading-relaxed">
              <p>{article.content}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
