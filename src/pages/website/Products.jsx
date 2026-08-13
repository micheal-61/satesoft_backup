import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const brandLabels = ["SateSoft Cloud", "SecureOps", "DataCore", "Digital Works"];

  const handleLearnMore = async (project) => {
    setSelectedProject(project);
    setLoadingDetails(true);
    setProjectDetails(null);
    try {
      const res = await fetch(`/api/products/${project.id}`);
      if (res.ok) {
        const data = await res.json();
        setProjectDetails(data);
      } else {
        setProjectDetails(project);
      }
    } catch (e) {
      setProjectDetails(project);
    } finally {
      setLoadingDetails(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-500 font-light animate-pulse">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Unable to load products</h3>
          <p className="text-gray-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-[#72bf24] text-white rounded-lg hover:bg-[#62a71e] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Products Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
                Portfolio
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
                Explore Our Recent <span className="font-semibold text-[#72bf24]">Projects.</span>
              </h1>
            </div>
          </div>

          {/* Products Grid */}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="group bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden aspect-[16/10] bg-gray-100">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                    <img
                      decoding="async"
                      loading="lazy"
                      src={project.logo_url || project.image_url || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600&h=400"}
                      alt={project.name || project.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#72bf24] border border-[#72bf24]/20 shadow-sm">
                      {project.category || "Product"}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {project.name || project.title}
                    </h3>
                    <p className="text-sm text-gray-500 font-light mb-4 line-clamp-2">
                      {project.tagline || project.description || "Innovative solution for modern businesses."}
                    </p>
                    <button 
                      onClick={() => handleLearnMore(project)} 
                      className="w-full py-3 bg-[#72bf24] hover:bg-[#62a71e] text-white font-semibold rounded-xl transition-all duration-300 text-sm tracking-wider uppercase hover:shadow-lg hover:-translate-y-0.5"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border-2 border-dashed border-gray-200 bg-white/70 p-16 text-center">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No products available</h3>
              <p className="text-gray-400 font-light">Please check back later for our latest offerings.</p>
            </div>
          )}
        </div>
      </section>

      {/* Brand Labels */}
      <div className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center md:justify-between items-center flex-wrap gap-6 opacity-60 hover:opacity-100 transition-all duration-700">
            {brandLabels.map((label) => (
              <div className="flex items-center" key={label}>
                <span className="text-xl md:text-2xl font-black text-gray-800 uppercase tracking-tighter hover:text-[#72bf24] transition-colors duration-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" 
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl transition-all duration-300 hover:shadow-3xl" 
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-gray-900">
                {selectedProject.name || selectedProject.title}
              </h3>
              <button 
                onClick={() => setSelectedProject(null)} 
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-12 h-12 border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Hero Image */}
                  {(projectDetails?.logo_url || projectDetails?.image_url) && (
                    <div className="rounded-xl overflow-hidden bg-gray-100">
                      <img 
                        src={projectDetails.logo_url || projectDetails.image_url} 
                        alt={projectDetails.name || projectDetails.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}

                  {/* Category */}
                  {projectDetails?.category && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</label>
                      <p className="mt-1 text-gray-700 font-light">{projectDetails.category}</p>
                    </div>
                  )}

                  {/* Tagline */}
                  {projectDetails?.tagline && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tagline</label>
                      <p className="mt-1 text-gray-700 font-light">{projectDetails.tagline}</p>
                    </div>
                  )}

                  {/* Description */}
                  {projectDetails?.description && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                      <p className="mt-2 text-gray-700 font-light leading-relaxed whitespace-pre-line">
                        {projectDetails.description}
                      </p>
                    </div>
                  )}

                  {/* Key Features */}
                  {projectDetails?.keyFeatures && projectDetails.keyFeatures.length > 0 && (
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Key Features</label>
                      <ul className="mt-2 space-y-2">
                        {projectDetails.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-gray-700 font-light">
                            <svg className="w-4 h-4 text-[#72bf24] mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 p-5 border-t border-gray-100 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
              >
                Close
              </button>
              <Link
                to="/contact"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#72bf24] hover:bg-[#62a71e] rounded-xl transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                Get This Product
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;