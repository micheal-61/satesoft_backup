import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCloud, FaUsers, FaRocket, FaShieldAlt, FaChartLine, FaGlobe, FaLightbulb, FaCheckCircle, FaAward, FaHandshake, FaCode, FaDatabase, FaServer, FaLock, FaBuilding } from "react-icons/fa";

const About = () => {
  const [isVisible, setIsVisible] = useState({});
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Company stats
  const stats = [
    { value: '8+', label: 'Years of Excellence' },
    { value: '200+', label: 'Enterprise Clients' },
    { value: '50+', label: 'Expert Team Members' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  // Core values
  const values = [
    { icon: FaRocket, title: 'Innovation First', description: 'Pushing boundaries with cutting-edge technology and forward-thinking solutions.' },
    { icon: FaUsers, title: 'Customer Centric', description: 'Placing our clients at the heart of everything we do, delivering exceptional value.' },
    { icon: FaShieldAlt, title: 'Trust & Security', description: 'Ensuring the highest standards of data protection and security compliance.' },
    { icon: FaGlobe, title: 'Global Impact', description: 'Driving digital transformation across Africa and beyond with scalable solutions.' },
  ];

  // Services
  const services = [
    { icon: FaCloud, title: 'Cloud Solutions', description: 'Enterprise-grade cloud infrastructure and migration services.' },
    { icon: FaCode, title: 'Custom Development', description: 'Tailored software solutions built with modern frameworks.' },
    { icon: FaDatabase, title: 'Data Analytics', description: 'Actionable insights through advanced analytics and AI.' },
    { icon: FaServer, title: 'IT Infrastructure', description: 'Robust and scalable infrastructure solutions.' },
    { icon: FaLock, title: 'Cybersecurity', description: 'Comprehensive security solutions for peace of mind.' },
    { icon: FaChartLine, title: 'Digital Transformation', description: 'Strategic guidance for modernizing business operations.' },
  ];

  // Milestones
  const milestones = [
    { year: '2018', title: 'Company Founded', description: 'Satesoft was established with a vision to transform African businesses.' },
    { year: '2020', title: 'First Major Client', description: 'Secured partnership with a leading enterprise corporation.' },
    { year: '2022', title: 'Pan-African Expansion', description: 'Expanded operations across multiple African countries.' },
    { year: '2024', title: 'Innovation Hub Launch', description: 'Opened state-of-the-art innovation and R&D center.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* ============================================================
          HERO SECTION - Clean Professional Gradient
          ============================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#72bf24]/5 to-white border-b border-gray-100">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#72bf24]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#72bf24]/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-20 py-20 md:py-32 relative">
          <div className="max-w-4xl">
            <div className="animate-fadeInUp">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-6">
                <FaRocket className="text-[#72bf24]" />
                About Satesoft
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Driving <span className="font-semibold text-[#72bf24]">Digital Innovation</span>
                <br />Across Africa
              </h1>
              
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-light">
                We are a leading technology company dedicated to empowering businesses with 
                innovative cloud solutions, intelligent software, and actionable data analytics.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <Link 
                  to="/services" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#72bf24] text-white font-semibold rounded-lg hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Explore Our Services
                  <FaArrowRight />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#72bf24] hover:text-[#72bf24] transition-all duration-300"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-sm font-light flex flex-col items-center gap-2">
          <span>Scroll to explore</span>
          <div className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-[#72bf24] rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATISTICS BAR
          ============================================================ */}
      <section className="relative -mt-8 z-10 container mx-auto px-4 sm:px-6 lg:px-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center ${index < stats.length - 1 ? 'border-r border-gray-100' : ''} ${index === 0 ? 'md:border-r' : ''} ${index === 1 ? 'md:border-r' : ''} ${index === 2 ? 'md:border-r' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#72bf24]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 font-medium mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WHO WE ARE - Main Content
          ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-20 py-20 md:py-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">
          {/* Left: Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative group animate-on-scroll" data-id="image">
              {/* Decorative shapes */}
              <div className="absolute -inset-4 bg-[#72bf24]/10 rounded-3xl transform -rotate-3 transition duration-700 group-hover:rotate-0"></div>
              <div className="absolute -inset-4 bg-[#72bf24]/5 rounded-3xl transform rotate-3 transition duration-700 group-hover:rotate-0"></div>
              
              <img 
                src="/assets/images/african_tech_meeting_1783002294603.png" 
                alt="Satesoft team collaboration" 
                className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl border-4 border-white/50"
              />
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 z-20 bg-white shadow-2xl rounded-2xl p-4 border-l-4 border-[#72bf24] hidden md:block group/badge hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#72bf24]/10 flex items-center justify-center">
                    <FaAward className="text-[#72bf24] text-lg" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm mb-0">Trusted Partner</h4>
                    <p className="text-xs text-gray-500">Enterprise Solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2">
            <div className="animate-on-scroll" data-id="content">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-6">
                <FaLightbulb className="text-[#72bf24]" />
                Who We Are
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4 leading-tight">
                Your Innovation <br />
                <span className="font-semibold text-[#72bf24]">Partner.</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-base">
                  Satesoft is a premier technology solutions provider dedicated to 
                  <span className="font-semibold text-gray-800"> empowering businesses</span> across Africa 
                  with innovative cloud solutions, intelligent software, and actionable data analytics.
                </p>
                <p className="text-base">
                  We aim to be our clients' <span className="font-semibold text-gray-800">first point of contact</span> 
                  for all support and business development issues. Our support entails physical and remote 
                  assistance through phone, email, and video calls where necessary.
                </p>
                <p className="text-base">
                  With a team of <span className="font-semibold text-gray-800">50+ expert professionals</span>, 
                  we deliver enterprise-grade solutions that drive <span className="font-semibold text-gray-800">digital transformation</span> 
                  and sustainable growth for organizations across the continent.
                </p>
              </div>

              {/* Service Quick Links */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Link 
                  to="/services" 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-[#72bf24]/5 hover:border-[#72bf24]/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#72bf24]/10 flex items-center justify-center group-hover:bg-[#72bf24]/20 transition-colors">
                    <FaCloud className="text-[#72bf24] text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">Cloud Solutions</h4>
                    <p className="text-xs text-gray-500">Enterprise-grade</p>
                  </div>
                </Link>
                <Link 
                  to="/products" 
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-[#72bf24]/5 hover:border-[#72bf24]/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#72bf24]/10 flex items-center justify-center group-hover:bg-[#72bf24]/20 transition-colors">
                    <FaCode className="text-[#72bf24] text-sm" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-800">Custom Software</h4>
                    <p className="text-xs text-gray-500">Tailored solutions</p>
                  </div>
                </Link>
              </div>

              <div className="mt-8">
                <Link to="/services" className="bg-[#72bf24] text-white px-8 py-3.5 rounded-full text-base font-semibold inline-flex items-center gap-2 hover:bg-[#62a71e] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  Explore Our Solutions
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR VALUES - Core Values
          ============================================================ */}
      <section className="bg-white border-t border-gray-100 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll" data-id="values-title">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
              <FaCheckCircle className="text-[#72bf24]" />
              Our Core Values
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              What <span className="font-semibold text-[#72bf24]">Drives</span> Us
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Our values shape everything we do, from the solutions we build to the relationships we foster.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className="group p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white hover:shadow-xl hover:border-[#72bf24]/20 transition-all duration-500 animate-on-scroll"
                  data-id={`value-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-14 h-14 rounded-xl bg-[#72bf24]/10 flex items-center justify-center group-hover:bg-[#72bf24] transition-all duration-300 group-hover:scale-110">
                    <Icon className="text-2xl text-[#72bf24] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR SERVICES - Quick Overview
          ============================================================ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
            <div className="animate-on-scroll" data-id="services-title">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
                <FaServer className="text-[#72bf24]" />
                Our Expertise
              </div>
              <h2 className="text-3xl md:text-4xl font-light text-gray-900">
                What <span className="font-semibold text-[#72bf24]">We Do</span>
              </h2>
            </div>
            <Link 
              to="/services" 
              className="inline-flex items-center gap-2 text-[#72bf24] font-medium hover:text-[#62a71e] transition-colors mt-4 lg:mt-0"
            >
              View All Services
              <FaArrowRight />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index} 
                  className="group bg-white p-6 rounded-xl border border-gray-100 hover:border-[#72bf24]/30 hover:shadow-lg transition-all duration-300 animate-on-scroll"
                  data-id={`service-${index}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#72bf24]/10 flex items-center justify-center group-hover:bg-[#72bf24] transition-colors duration-300 flex-shrink-0">
                      <Icon className="text-xl text-[#72bf24] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">{service.title}</h4>
                      <p className="text-sm text-gray-500 font-light">{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          MILESTONES TIMELINE
          ============================================================ */}
      <section className="bg-white border-t border-gray-100 py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-20">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-on-scroll" data-id="milestones-title">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-4">
              <FaRocket className="text-[#72bf24]" />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              From <span className="font-semibold text-[#72bf24]">Startup</span> to Industry Leader
            </h2>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-[#72bf24]/30 to-[#72bf24]/10"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } animate-on-scroll`}
                  data-id={`milestone-${index}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#72bf24] border-4 border-white shadow-md z-10"></div>
                  
                  <div className={`w-full md:w-5/12 text-center md:text-${index % 2 === 0 ? 'right' : 'left'}`}>
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 hover:border-[#72bf24]/30 hover:shadow-lg transition-all duration-300">
                      <div className="text-2xl font-bold text-[#72bf24] mb-2">{milestone.year}</div>
                      <h4 className="font-semibold text-gray-800">{milestone.title}</h4>
                      <p className="text-sm text-gray-500 font-light mt-1">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-5/12"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA SECTION - Professional Gradient
          ============================================================ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-20 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#72bf24]/5 via-white to-[#72bf24]/5 p-12 md:p-16 text-center border border-[#72bf24]/10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#72bf24]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#72bf24]/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-full text-[#72bf24] text-sm font-medium mb-6">
              <FaHandshake className="text-[#72bf24]" />
              Let's Work Together
            </div>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
              Ready to <span className="font-semibold text-[#72bf24]">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-gray-600 font-light mb-8 max-w-2xl mx-auto">
              Let's discuss how Satesoft can help you achieve your digital transformation goals 
              and drive sustainable growth.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#72bf24] text-white font-semibold rounded-lg hover:bg-[#62a71e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                Start Your Journey
                <FaArrowRight />
              </Link>
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-[#72bf24] hover:text-[#72bf24] transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CSS ANIMATIONS
          ============================================================ */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scrollDown {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(8px);
          }
          100% {
            opacity: 0;
            transform: translateY(16px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-on-scroll {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scroll {
          animation: scrollDown 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default About;