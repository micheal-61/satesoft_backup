import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqData = [
  {
    id: 1,
    question: "What Medical Services Do You Provide?",
    answer: "We provide comprehensive IT solutions for medical institutions, including secure data management, EHR integrations, and telemedicine platforms."
  },
  {
    id: 2,
    question: "What is your customer geography?",
    answer: "Our operations span across the African continent and globally, delivering scalable solutions to modern businesses worldwide."
  },
  {
    id: 3,
    question: "What is your industry experience?",
    answer: "We have over a decade of experience in providing cutting-edge technology solutions to sectors such as healthcare, finance, logistics, and education."
  },
  {
    id: 4,
    question: "How do you ensure data security?",
    answer: "We employ enterprise-grade security frameworks, automated backups, and proactive monitoring to ensure your data remains safe and compliant."
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState(1);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="FAQ" className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          
          {/* Left Side: Image & Text */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-widest mb-4 border border-primary-100 shadow-sm">
              KEEPING YOUR BUSINESS SAFE
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-text mb-8 leading-tight">
              Keeping Your Business Safe and Available.
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-lg mb-8 relative group">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Business Meeting" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary-900/10 group-hover:bg-transparent transition-colors duration-500"></div>
            </div>
            <p className="text-text/70 text-lg leading-relaxed">
              We leverage cutting-edge technology and unparalleled expertise to provide scalable, secure, and robust IT solutions for your business.
            </p>
          </div>

          {/* Right Side: Accordion */}
          <div className="lg:w-1/2 w-full mt-8 lg:mt-0">
            <div className="space-y-4">
              {faqData.map((faq) => {
                const isOpen = openId === faq.id;
                return (
                  <div 
                    key={faq.id} 
                    className={`rounded-2xl overflow-hidden transition-all duration-300 border ${isOpen ? 'bg-primary-500 border-primary-500 shadow-lg shadow-primary-500/20' : 'bg-surface border-border hover:border-primary-300'}`}
                  >
                    <div 
                      className="flex justify-between items-center p-6 cursor-pointer"
                      onClick={() => toggleAccordion(faq.id)}
                    >
                      <h5 className={`font-bold text-lg pr-4 ${isOpen ? 'text-white' : 'text-text'}`}>
                        {faq.question}
                      </h5>
                      <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isOpen ? 'bg-white/20 text-white' : 'bg-primary-50 text-primary-500'}`}>
                        {isOpen ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-300 ease-in-out`}
                      style={{ maxHeight: isOpen ? '200px' : '0', opacity: isOpen ? 1 : 0 }}
                    >
                      <div className={`p-6 pt-0 leading-relaxed ${isOpen ? 'text-white/90' : 'text-text/70'}`}>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
