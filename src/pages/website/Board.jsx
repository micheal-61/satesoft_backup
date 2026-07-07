import React, { useState } from "react";

const dummyAdvisors = [
  {
    id: 1,
    firstName: "Dr. Adebayo",
    lastName: "Ogunlesi",
    role: { roleName: "CHAIRMAN" },
    bio: "Former tech executive with 20+ years of experience scaling digital infrastructure across emerging markets.",
    profileLink: "#",
    image: "/assets/images/african_tech_board_1_1783002554188.png"
  },
  {
    id: 2,
    firstName: "Sarah",
    lastName: "Ndiaye",
    role: { roleName: "TECH ADVISOR" },
    bio: "Pioneer in African fintech, advising on blockchain adoption and secure payment gateways.",
    profileLink: "#",
    image: "/assets/images/african_tech_board_2_1783002564170.png"
  },
  {
    id: 3,
    firstName: "Michael",
    lastName: "Chen",
    role: { roleName: "STRATEGY LEAD" },
    bio: "Global strategist specializing in data analytics and enterprise software growth.",
    profileLink: "#",
    image: "/assets/images/african_tech_board_3_1783002610416.png"
  },
  {
    id: 4,
    firstName: "Amina",
    lastName: "Mohammed",
    role: { roleName: "LEGAL & COMPLIANCE" },
    bio: "Expert in international tech law, ensuring Satesoft's products meet global regulatory standards.",
    profileLink: "#",
    image: "/assets/images/african_tech_board_4_1783002620680.png"
  }
];

const Board = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAdvisors = dummyAdvisors.filter(adv => 
    `${adv.firstName} ${adv.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    adv.role.roleName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-bg py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-8 border-b border-border gap-8">
          <div className="lg:w-2/3">
            <a href="/" className="inline-flex items-center text-text/60 hover:text-primary-600 font-bold text-xs tracking-widest uppercase mb-8 transition-colors">
              <svg className="mr-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              BACK TO HOME
            </a>
            <h4 className="text-primary-600 font-bold text-sm tracking-widest uppercase mb-3">Leadership</h4>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 tracking-tight">
              Board of Advisors
            </h1>
            <p className="text-text/70 text-lg md:text-xl max-w-3xl">
              A specialized assembly of distinguished leaders and innovators providing strategic guidance to drive Satesoft's technological excellence.
            </p>
          </div>
          <div className="lg:w-1/3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search board members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-6 pr-12 py-4 bg-surface border border-border rounded-full text-text placeholder-text/40 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <svg className="absolute right-6 top-1/2 -translate-y-1/2 text-text/40 w-5 h-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredAdvisors.map((advisor, index) => (
            <div className="bg-surface rounded-3xl shadow-sm border border-border overflow-hidden flex flex-col sm:flex-row group hover:shadow-xl transition-all duration-300 hover:-translate-y-1" key={advisor.id}>
              <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden flex-shrink-0">
                <img src={advisor.image} alt={`${advisor.firstName} ${advisor.lastName}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/10"></div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="inline-flex self-start px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-primary-100">
                  {advisor.role?.roleName || "ADVISOR"}
                </div>
                <h3 className="text-2xl font-bold text-text mb-4">{advisor.firstName} {advisor.lastName}</h3>
                <p className="text-text/70 text-sm leading-relaxed mb-6 flex-1">{advisor.bio}</p>
                
                {advisor.profileLink && (
                  <div className="mt-auto pt-4 border-t border-border">
                    <a href={advisor.profileLink} className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700 transition-colors group/link">
                      Full Profile 
                      <svg className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
          {filteredAdvisors.length === 0 && (
            <div className="col-span-1 lg:col-span-2 text-center text-text/50 py-16 bg-surface rounded-3xl border border-dashed border-border">
              <h5 className="text-xl font-medium">No board members found matching your search.</h5>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Board;
