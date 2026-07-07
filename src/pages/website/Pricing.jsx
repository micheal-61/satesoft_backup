import React from "react";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

const pricingData = [
  {
    plan: "Standard",
    price: 49,
    features: ["Digital Marketing", "Database Security", "IT Solution", "Technology Consult"]
  },
  {
    plan: "Basic",
    price: 59,
    features: ["Digital Marketing", "Database Security", "IT Solution", "Technology Consult"],
    popular: true
  },
  {
    plan: "Beginner",
    price: 69,
    features: ["Digital Marketing", "Database Security", "IT Solution", "Technology Consult"]
  },
  {
    plan: "Premium",
    price: 79,
    features: ["Digital Marketing", "Database Security", "IT Solution", "Technology Consult"]
  }
];

const Pricing = () => {
  return (
    <section id="Pricing" className="py-20 bg-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-100 shadow-sm">
            OUR BEST PLAN
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-0 tracking-tight">
            Choose Your Best Plan.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center">
          {pricingData.map((item, index) => (
            <div key={index} className={`relative flex flex-col h-full bg-surface rounded-3xl p-8 transition-all duration-300 ${item.popular ? 'shadow-2xl border-2 border-primary-500 lg:scale-105 z-10' : 'shadow-sm border border-border hover:shadow-lg hover:-translate-y-2'}`}>
              
              {item.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-500 text-white font-bold text-xs py-1.5 px-4 rounded-full shadow-lg tracking-widest uppercase">
                  POPULAR
                </div>
              )}
              
              <h4 className="font-bold text-text/80 text-xl tracking-wider mb-6 text-center">{item.plan}</h4>
              
              <div className="flex items-baseline justify-center mb-8 pb-8 border-b border-border">
                <span className="text-primary-500 font-bold text-2xl self-start mt-2 mr-1">$</span>
                <span className="text-text font-bold text-6xl tracking-tighter">{item.price}</span>
                <span className="text-text/50 font-medium ml-2">/ Monthly</span>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {item.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center text-text/70 text-sm font-medium">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center mr-3">
                      <FaCheck className="text-primary-500 w-3 h-3" />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact" 
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all duration-300 text-center ${item.popular ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 hover:-translate-y-1' : 'bg-surface border-2 border-primary-500 text-primary-600 hover:bg-primary-50'}`}
              >
                CHOOSE PLAN
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
