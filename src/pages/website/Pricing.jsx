import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch('/api/pricing');
        if (!response.ok) throw new Error('Failed to fetch pricing');
        const data = await response.json();
        setPlans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPricing();
  }, []);

  const parseFeatures = (features) => {
    if (!features) return [];
    if (Array.isArray(features)) return features;
    try {
      return JSON.parse(features);
    } catch {
      return features.split('\n').map(f => f.trim()).filter(f => f);
    }
  };

  if (loading) {
    return (
      <section id="Pricing" className="py-28 bg-bg min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 w-full text-center">
          <div className="inline-flex items-center gap-2 text-[#72bf24]">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-light">Loading pricing...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="Pricing" className="py-28 bg-bg min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 w-full text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </section>
    );
  }

  return (
      <section id="Pricing" className="py-28 bg-bg min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 w-full">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#72bf24]/10 text-[#72bf24] font-semibold text-xs uppercase tracking-widest mb-4 border border-[#72bf24]/20 shadow-sm">
            OUR BEST PLAN
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-0 tracking-tight">
            Choose Your Best Plan.
          </h2>
        </div>

        {plans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
            {plans.map((item, index) => {
              const features = parseFeatures(item.features);
              return (
                <div key={item.id || index} className={`relative flex flex-col h-full bg-surface rounded-3xl p-8 transition-all duration-300 ${item.popular ? 'shadow-2xl border-2 border-[#72bf24] lg:scale-105 z-10' : 'shadow-sm border border-border hover:shadow-lg hover:-translate-y-2'}`}>
                  
                  {item.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#72bf24] text-white font-semibold text-xs py-1.5 px-4 rounded-full shadow-lg tracking-widest uppercase">
                      POPULAR
                    </div>
                  )}
                  
                  <h4 className="font-light text-gray-900 text-xl tracking-wider mb-6 text-center">{item.plan}</h4>
                  
                  <div className="flex items-baseline justify-center mb-8 pb-8 border-b border-border">
                    <span className="text-[#72bf24] font-light text-2xl self-start mt-2 mr-1">$</span>
                    <span className="text-gray-900 font-light text-6xl tracking-tighter">{item.price}</span>
                    <span className="text-gray-500 font-light ml-2">/ Monthly</span>
                  </div>

                  <ul className="flex-1 space-y-4 mb-8">
                    {features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-gray-600 font-light text-sm">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#72bf24]/10 flex items-center justify-center mr-3">
                          <FaCheck className="text-[#72bf24] w-3 h-3" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>

                  <Link 
                    to="/contact" 
                    className={`w-full py-4 rounded-xl font-normal text-sm tracking-wider uppercase transition-all duration-300 text-center ${item.popular ? 'bg-[#72bf24] hover:bg-[#62a71e] text-white shadow-lg shadow-[#72bf24]/30 hover:-translate-y-1' : 'bg-surface border-2 border-[#72bf24] text-[#72bf24] hover:bg-[#72bf24]/5'}`}
                  >
                    CHOOSE PLAN
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 font-light text-lg">No pricing plans available at the moment.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Pricing;
