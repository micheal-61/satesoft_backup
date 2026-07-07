import React from 'react';
import { Link } from 'react-router-dom';

const servicesData = [
  {
    id: 1,
    title: 'Website Development & Hosting',
    icon: 'bi bi-laptop',
    description: 'Our hosting is affordable at a fixed annual fee. The fee covers a domain of your choice.',
    link: '/services/website-development'
  },
  {
    id: 2,
    title: 'Client Support',
    icon: 'bi bi-headset',
    description: 'We aim to be our clients first point of contact for all support and business development issues.',
    link: '/services/client-support'
  },
  {
    id: 3,
    title: 'Research, Design & Development',
    icon: 'bi bi-lightbulb',
    description: 'Research and development plays a critical role in innovation process to satisfy the needs of tomorrow.',
    link: '/services/research-design'
  },
  {
    id: 4,
    title: 'Social-media Management',
    icon: 'bi bi-share',
    description: 'We use our expertise to help clients realize more value from the social media platforms.',
    link: '/services/social-media'
  }
];

export default function OurServices() {
  return (
    <div className="py-24 bg-surface relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center justify-center mb-16 text-center">
          <h5 className="uppercase tracking-widest text-primary-500 font-semibold text-sm mb-3">SATESOFT SERVICES</h5>
          <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight max-w-3xl">
            How Professional IT Services<br /> Can Drive <span className="text-primary-500">Success.</span>
          </h1>                            
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div key={service.id} className="group">
              <div className="card h-full flex flex-col items-start border border-border bg-white hover:border-primary-200 transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <i className={`${service.icon} text-3xl text-primary-500 group-hover:text-white transition-colors duration-300`}></i>
                </div>
                
                <h3 className="text-xl font-bold text-text mb-4 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="text-text/70 mb-8 flex-grow leading-relaxed">{service.description}</p>
                
                <div className="mt-auto">
                  <Link to={service.link} className="inline-flex items-center gap-2 text-sm font-bold text-primary-500 hover:text-primary-700 transition-colors">
                    <i className="fas fa-plus text-xs"></i> READ MORE
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
