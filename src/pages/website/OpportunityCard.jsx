import React from 'react';

export const OpportunityCard = ({ title, jobType, paymentType, description, keyRequirements }) => {
  return (
    <div className="bg-surface border border-border rounded-3xl p-8 w-full max-w-md shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
      <h2 className="text-2xl font-bold mb-3 text-text group-hover:text-primary-600 transition-colors">{title}</h2>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-3 py-1 bg-text text-white text-xs font-bold rounded-full">{jobType}</span>
        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full">{paymentType}</span>
      </div>
      
      {description && (
        <p className="text-text/70 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
      )}
      
      <h5 className="text-xs font-bold uppercase tracking-wider mb-3 text-text/80">Key Requirements</h5>
      
      <ul className="space-y-2 mb-8">
        {keyRequirements?.map((req, idx) => (
          <li key={idx} className="flex items-start text-sm text-text/70">
            <svg className="w-4 h-4 text-primary-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {req}
          </li>
        ))}
      </ul>
      
      <button className="w-full py-3 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg shadow-primary-500/30 mt-auto">
        Apply Now
      </button>
    </div>
  );
};
