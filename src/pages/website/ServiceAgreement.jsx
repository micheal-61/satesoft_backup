import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ServiceAgreement = () => {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await fetch('/api/service-agreements');
        if (!response.ok) throw new Error('Failed to fetch service agreements');
        const data = await response.json();
        setAgreements(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAgreements();
  }, []);

  const renderMarkdown = (text) => {
    if (!text) return '';
    let html = text
      .replace(/^### (.*$)/gim, '<div class="mt-3 mb-2"><div class="flex items-center gap-2 mb-1"><span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-[#f0f9e8] text-[#72bf24] text-[10px] font-bold border border-[#d3f0b4] shrink-0">§</span><h3 class="text-lg font-semibold text-text">$1</h3></div><div class="pl-7 text-sm text-text/80 font-light leading-relaxed">')
      .replace(/^## (.*$)/gim, '<div class="mt-4 mb-2"><div class="flex items-center gap-2 mb-1"><span class="inline-flex items-center justify-center w-5 h-5 rounded-md bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200 shrink-0">¶</span><h2 class="text-xl font-semibold text-text">$1</h2></div><div class="pl-7 text-sm text-text/80 font-light leading-relaxed">')
      .replace(/^# (.*$)/gim, '<div class="mb-4 mt-2"><div class="flex items-center gap-2 mb-2"><span class="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-[#72bf24] text-white text-xs font-bold shrink-0">§</span><h1 class="text-2xl md:text-3xl font-semibold text-text">$1</h1></div><div class="pl-8 text-sm text-text/80 font-light leading-relaxed">')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-text">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-text/80">$1</em>')
      .replace(/^\s*-\s(.*$)/gim, '<li class="ml-6 list-disc mb-2 text-text/80 font-light">$1</li>')
      .replace(/\n/g, '<br />');
    return html;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-lime-400">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-medium">Loading service agreement...</span>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 border border-primary-200 rounded-full text-primary-700 text-sm font-medium mb-6">
              <i className="bi bi-file-earmark-text-fill"></i>
              Service Agreement
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text mb-4 leading-tight">Service Agreement</h1>
            <p className="text-lg text-text/70 font-light">Terms and conditions for using our services</p>
          </div>

          {agreements.length > 0 ? (
            <div className="space-y-6">
              {agreements.map((agreement, index) => (
                <div key={agreement.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#f0f9e8] border border-[#d3f0b4] flex items-center justify-center shrink-0">
                        <i className="bi bi-file-earmark-text text-[#72bf24] text-lg"></i>
                      </div>
                       <h2 className="text-xl font-semibold text-text">{agreement.title}</h2>
                    </div>
                    <div 
                      className="text-sm text-slate-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(agreement.content) }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-10 border border-dashed border-slate-300 text-center">
              <p className="text-text/60 text-lg">No service agreements available at the moment.</p>
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

export default ServiceAgreement;
