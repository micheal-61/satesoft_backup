import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaComments, FaArrowRight } from "react-icons/fa";

const dummyArticles = [
  {
    id: 1,
    slug: "future-of-ai-in-africa",
    title: "The Future of AI in African Supply Chains",
    publishDate: "12 Dec, 2024",
    author: "Admin",
    comments: 5,
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 2,
    slug: "fintech-security-2026",
    title: "Securing Cross-Border Payments in 2026",
    publishDate: "15 Nov, 2024",
    author: "Admin",
    comments: 2,
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=500"
  },
  {
    id: 3,
    slug: "satesoft-series-b",
    title: "Satesoft Announces Series B Funding",
    publishDate: "03 Oct, 2024",
    author: "Admin",
    comments: 8,
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800&h=500"
  }
];

const Blog = () => {
  return (
    <section id="Blog" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 pb-8 border-b border-border">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-100 shadow-sm">
            OUR BLOG
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-0">Latest Blog & Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
          {dummyArticles.map((article) => (
            <div key={article.id} className="bg-surface rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col">
              
              <div className="relative h-56 overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-bold py-1.5 px-3 rounded-lg shadow-md">
                  {article.publishDate}
                </div>
              </div>
              
              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="flex items-center text-text/60 text-sm font-medium mb-4 gap-4">
                  <span className="flex items-center">
                    <FaUser className="text-primary-500 mr-2" /> By {article.author}
                  </span>
                  <span className="flex items-center">
                    <FaComments className="text-primary-500 mr-2" /> Comments ({article.comments})
                  </span>
                </div>
                
                <h4 className="text-xl font-bold mb-6 text-text group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug flex-1">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h4>
                
                <Link to={`/blog/${article.slug}`} className="inline-flex items-center text-sm font-bold text-text uppercase tracking-wider hover:text-primary-600 transition-colors mt-auto group/btn">
                  Read More 
                  <FaArrowRight className="ml-2 text-primary-500 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
