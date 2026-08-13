import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FaArrowLeft, FaSearch, FaEnvelope, FaLinkedin, FaTwitter, 
  FaUser, FaBriefcase, FaAward, FaUsers, FaChevronRight
} from "react-icons/fa";

const Board = () => {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("All");

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        const response = await fetch('/api/advisors');
        if (!response.ok) throw new Error('Failed to fetch advisors');
        const data = await response.json();
        setAdvisors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAdvisors();
  }, []);

  const getRoleName = (roleId) => {
    const roles = {
      1: 'Board Member',
      2: 'Advisor',
      3: 'Executive',
      4: 'Investor',
    };
    return roles[roleId] || 'Advisor';
  };

  // Get unique roles for filter
  const roles = useMemo(() => {
    const roleSet = new Set(advisors.map(a => getRoleName(a.roleId)));
    return ['All', ...roleSet];
  }, [advisors]);

  const getRoleColor = (roleId) => {
    const colors = {
      1: 'bg-[#72bf24]/10 text-[#72bf24] border-[#72bf24]/20',
      2: 'bg-blue-50 text-blue-600 border-blue-200',
      3: 'bg-purple-50 text-purple-600 border-purple-200',
      4: 'bg-orange-50 text-orange-600 border-orange-200',
    };
    return colors[roleId] || 'bg-gray-50 text-gray-600 border-gray-200';
  };

  const filteredAdvisors = advisors.filter(adv => {
    const fullName = `${adv.firstName || ''} ${adv.lastName || ''}`.trim().toLowerCase();
    const roleName = getRoleName(adv.roleId).toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
      fullName.includes(query) ||
      roleName.includes(query) ||
      (adv.bio && adv.bio.toLowerCase().includes(query)) ||
      (adv.expertise && adv.expertise.toLowerCase().includes(query));
    
    const matchesRole = filterRole === "All" || getRoleName(adv.roleId) === filterRole;
    
    return adv.isActive !== false && matchesSearch && matchesRole;
  });

  if (loading) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 font-light animate-pulse">Loading board members...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load team</h3>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#72bf24] text-white rounded-lg hover:bg-[#62a71e] transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* ============================================================
            HERO HEADER
            ============================================================ */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-8 border-b border-gray-200 gap-6">
          <div className="lg:w-2/3">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#72bf24] font-medium text-sm transition-colors mb-6 group"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium">
                <FaUsers className="text-[#72bf24]" />
                Leadership
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 tracking-tight">
              Board of <span className="font-semibold text-[#72bf24]">Advisors</span>
            </h1>
            
            <p className="text-lg text-gray-600 font-light max-w-3xl leading-relaxed">
              A specialized assembly of distinguished leaders and innovators providing 
              strategic guidance to drive Satesoft's technological excellence.
            </p>
          </div>
          
          <div className="lg:w-1/3 w-full">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, role, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#72bf24] focus:border-transparent transition-all"
                aria-label="Search board members"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================
            FILTERS
            ============================================================ */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="text-sm text-gray-500 font-medium mr-2">Filter by:</span>
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filterRole === role
                  ? 'bg-[#72bf24] text-white shadow-md shadow-[#72bf24]/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#72bf24]/30 hover:text-[#72bf24]'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        {/* ============================================================
            MEMBERS GRID
            ============================================================ */}
        {filteredAdvisors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredAdvisors.map((advisor, index) => {
              const fullName = `${advisor.firstName || ''} ${advisor.lastName || ''}`.trim();
              const roleName = getRoleName(advisor.roleId);
              const roleColor = getRoleColor(advisor.roleId);
              
              return (
                <div 
                  key={advisor.id} 
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Image */}
                  <div className="sm:w-2/5 h-64 sm:h-auto relative overflow-hidden flex-shrink-0 bg-gray-100">
                    {advisor.imageUrl ? (
                      <img 
                        src={advisor.imageUrl} 
                        alt={fullName} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#72bf24]/10 to-[#72bf24]/5 flex items-center justify-center">
                        <FaUser className="text-6xl text-[#72bf24]/30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-gray-900/10"></div>
                    
                    {/* Role Badge */}
                    <div className={`absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${roleColor} backdrop-blur-sm`}>
                      <FaBriefcase className="text-xs" />
                      {roleName}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {fullName}
                    </h3>
                    
                    {advisor.expertise && (
                      <p className="text-sm text-[#72bf24] font-medium mb-3">
                        {advisor.expertise}
                      </p>
                    )}
                    
                    {advisor.bio && (
                      <p className="text-sm text-gray-600 leading-relaxed flex-1 line-clamp-3">
                        {advisor.bio}
                      </p>
                    )}
                    
                    <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {advisor.email && (
                          <a 
                            href={`mailto:${advisor.email}`} 
                            className="text-gray-400 hover:text-[#72bf24] transition-colors"
                            aria-label={`Email ${fullName}`}
                          >
                            <FaEnvelope className="text-sm" />
                          </a>
                        )}
                        {advisor.linkedin && (
                          <a 
                            href={advisor.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                            aria-label={`${fullName} on LinkedIn`}
                          >
                            <FaLinkedin className="text-sm" />
                          </a>
                        )}
                        {advisor.twitter && (
                          <a 
                            href={advisor.twitter} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                            aria-label={`${fullName} on Twitter`}
                          >
                            <FaTwitter className="text-sm" />
                          </a>
                        )}
                      </div>
                      
                      {advisor.profileLink && (
                        <a 
                          href={advisor.profileLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-[#72bf24] hover:text-[#62a71e] transition-colors group/link"
                        >
                          Full Profile
                          <FaChevronRight className="text-xs group-hover/link:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="col-span-2 text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No members found</h3>
            <p className="text-gray-400 font-light">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setFilterRole("All"); }}
              className="mt-4 text-[#72bf24] hover:text-[#62a71e] font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* ============================================================
            STATS / CALL TO ACTION
            ============================================================ */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-[#72bf24]">{advisors.length}</div>
            <div className="text-sm text-gray-500 mt-1">Total Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-[#72bf24]">
              {advisors.filter(a => getRoleName(a.roleId) === 'Board Member').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Board Members</div>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
            <div className="text-3xl font-bold text-[#72bf24]">
              {advisors.filter(a => getRoleName(a.roleId) === 'Advisor').length}
            </div>
            <div className="text-sm text-gray-500 mt-1">Advisors</div>
          </div>
        </div>

        {/* ============================================================
            CTA SECTION
            ============================================================ */}
        <div className="mt-12 p-8 bg-gradient-to-br from-[#72bf24]/5 to-white rounded-2xl border border-[#72bf24]/10 text-center">
          <h3 className="text-lg font-semibold text-gray-800">Interested in joining our advisory board?</h3>
          <p className="text-gray-500 font-light mt-1">
            We're always looking for visionary leaders to guide our mission.
          </p>
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-[#72bf24] text-white font-medium rounded-lg hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg"
          >
            Get in Touch
            <FaChevronRight className="text-sm" />
          </Link>
        </div>
        
      </div>
    </section>
  );
};

export default Board;