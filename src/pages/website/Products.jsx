import React from "react";
import { Link } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    title: "Software Development",
    category: "Software",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 2,
    title: "IT Management",
    category: "Consulting",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: 3,
    title: "Data Analysis",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&h=400&q=80"
  }
];

const brandLabels = ["SateSoft Cloud", "SecureOps", "DataCore", "Digital Works"];

const Products = () => {
  return (
    <>
      <div className="py-24 bg-bg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="w-full md:w-1/2">
              <h5 className="uppercase tracking-widest text-primary-500 font-semibold text-sm mb-3">Portfolio</h5>
              <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight m-0">Explore Our Recent <span className="text-primary-500">Projects.</span></h1>
            </div>
            <div className="w-full md:w-1/2 flex justify-start md:justify-end">
              <Link to="/products" className="btn-primary">
                VIEW PROJECT DETAIL
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project) => (
              <div className="group" key={project.id}>
                <div className="card p-0 overflow-hidden bg-surface border border-border shadow-md hover:shadow-xl transition-all duration-300 rounded-[1rem]">
                  <div className="relative overflow-hidden aspect-[3/2]">
                    <div className="absolute inset-0 bg-primary-900/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                    <img 
                      decoding="async" 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 relative z-20 bg-surface -mt-4 mx-4 rounded-xl shadow-lg border border-border/50 group-hover:-translate-y-2 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-text mb-2">
                      <Link to={`/products/${project.id}`} className="hover:text-primary-600 transition-colors">{project.title}</Link>
                    </h3>
                    <p className="text-primary-500 font-medium text-sm mb-0 uppercase tracking-wider">{project.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-12 bg-white border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-between items-center flex-wrap gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {brandLabels.map((label) => (
              <div className="flex items-center" key={label}>
                <span className="text-2xl font-black text-text uppercase tracking-tighter">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
