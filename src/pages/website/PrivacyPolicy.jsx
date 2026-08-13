import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await fetch('/api/privacy-policies');
        if (!response.ok) throw new Error('Failed to fetch privacy policies');
        const data = await response.json();
        setPolicies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicies();
  }, []);

  const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-text mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-text mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-text mt-4 mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^\s*-\s(.*$)/gim, '<li class="ml-4 list-disc mb-1">$1</li>')
      .replace(/\n/g, '<br />');
    return html;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-lime-400">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-medium">Loading privacy policy...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/" className="text-primary-500 hover:underline mt-4 inline-block">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-semibold mb-6">
              <i className="bi bi-shield-check-fill"></i>
              Privacy Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">Privacy Policy</h1>
            <p className="text-lg text-text/70">Last updated: {new Date().toLocaleDateString()}</p>
          </div>

          {policies.length > 0 ? (
            <div className="space-y-8">
              {policies.map((policy, index) => (
                <div key={policy.id} className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
                  <h2 className="text-2xl font-bold text-text mb-4">{policy.title}</h2>
                  <div 
                    className="text-base text-text/70 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(policy.content) }}
                  ></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-dashed border-slate-300 text-center">
              <p className="text-text/60 text-lg">No privacy policies available at the moment.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full transition-all duration-300 shadow-lg"
            >
              <i className="bi bi-arrow-left"></i>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
