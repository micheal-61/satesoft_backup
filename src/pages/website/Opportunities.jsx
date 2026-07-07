import React, { useState, useEffect } from 'react';
import { OpportunityCard } from './OpportunityCard';

export const OpportunitiesDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ keyword: '', jobType: '', paymentType: '' });

  const fetchJobs = async () => {
    const activeParams = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v.trim() !== '')
    );
    // Backend connection removed
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const updateFilters = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-bg py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-text mb-12">Opportunities</h1>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <input 
            name="keyword" 
            placeholder="Search technology..." 
            onChange={updateFilters} 
            className="px-4 py-3 bg-surface border border-border rounded-xl text-text placeholder-text/50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-auto min-w-[250px] shadow-sm transition-all" 
          />
          <select 
            name="jobType" 
            onChange={updateFilters} 
            className="px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-auto min-w-[200px] shadow-sm cursor-pointer transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]"
          >
            <option value="">All Regions</option>
            <option value="Remote">Remote</option>
            <option value="On-site">On-site</option>
          </select>
          <select 
            name="paymentType" 
            onChange={updateFilters} 
            className="px-4 py-3 bg-surface border border-border rounded-xl text-text focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full sm:w-auto min-w-[200px] shadow-sm cursor-pointer transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[position:right_1rem_center]"
          >
            <option value="">All Payment Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Deferred Payment">Deferred Payment</option>
          </select>
        </div>
        
        <div className="flex flex-wrap gap-6 justify-center">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <OpportunityCard
                key={job.id}
                title={job.title}
                jobType={job.jobType}
                paymentType={job.paymentType}
                description={job.description}
                keyRequirements={job.keyRequirements}
              />
            ))
          ) : (
            <div className="bg-surface border border-border rounded-2xl p-8 text-center max-w-2xl w-full shadow-sm">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-text mb-2">No active opportunities</h3>
              <p className="text-text/70">Check back later or adjust your search filters to find more opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunitiesDashboard;
