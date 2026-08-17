import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaEnvelope, FaPhone, FaBook, FaVideo, FaQuestionCircle, FaChevronRight, FaBars } from "react-icons/fa";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Topics', icon: FaBook },
    { id: 'getting-started', label: 'Getting Started', icon: FaBook },
    { id: 'account', label: 'Account & Settings', icon: FaQuestionCircle },
    { id: 'products', label: 'Products & Services', icon: FaBook },
    { id: 'billing', label: 'Billing & Payments', icon: FaBook },
    { id: 'technical', label: 'Technical Support', icon: FaVideo },
  ];

  const supportTopics = [
    {
      id: 1,
      category: 'getting-started',
      title: 'Welcome to Satesoft',
      description: 'Learn how to navigate the platform and access our services.',
      steps: [
        'Create an account or log in with your existing credentials',
        'Complete your profile setup with accurate information',
        'Browse our products and services in the menu',
        'Contact us through the contact form for personalized assistance',
      ],
      relatedLinks: [
        { label: 'About Satesoft', path: '/about' },
        { label: 'Our Products', path: '/products' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      id: 2,
      category: 'getting-started',
      title: 'How to Browse Products and Services',
      description: 'Understand how to explore our offerings and find what suits your needs.',
      steps: [
        'Navigate to the "Products" section from the main menu',
        'Use filters and categories to narrow down your search',
        'Click on any product to view detailed information',
        'Use the "Learn More" button to see full specifications',
      ],
      relatedLinks: [
        { label: 'Products', path: '/products' },
        { label: 'Services', path: '/services' },
        { label: 'Pricing', path: '/pricing' },
      ],
    },
    {
      id: 3,
      category: 'account',
      title: 'Managing Your Account',
      description: 'Learn how to update your profile and account settings.',
      steps: [
        'Log in to your account using your credentials',
        'Click on your profile icon in the navigation bar',
        'Select "Account Settings" from the dropdown menu',
        'Update your information as needed and save changes',
      ],
      relatedLinks: [
        { label: 'Contact Support', path: '/contact' },
      ],
    },
    {
      id: 4,
      category: 'products',
      title: 'How to Request a Demo or Quote',
      description: 'Steps to request product demonstrations or pricing quotes.',
      steps: [
        'Go to the product or service page you are interested in',
        'Click on the "Request Demo" or "Get Quote" button',
        'Fill in the required information in the form',
        'Our team will contact you within 24-48 hours',
      ],
      relatedLinks: [
        { label: 'Products', path: '/products' },
        { label: 'Services', path: '/services' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      id: 5,
      category: 'billing',
      title: 'Payment Methods and Invoices',
      description: 'Information about accepted payment methods and invoice requests.',
      steps: [
        'We accept bank transfers, mobile money, and major credit cards',
        'Invoices are issued upon service delivery or as agreed',
        'Payment terms are typically 14-30 days from invoice date',
        'Contact our billing team for invoice copies or payment plans',
      ],
      relatedLinks: [
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      id: 6,
      category: 'technical',
      title: 'Getting Technical Help',
      description: 'How to access technical support and report issues.',
      steps: [
        'Visit the Contact page and select "Technical Support"',
        'Describe your issue in detail with screenshots if possible',
        'Include your device type, browser, and operating system',
        'Our technical team will respond within 24 hours',
      ],
      relatedLinks: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
      ],
    },
    {
      id: 7,
      category: 'account',
      title: 'Privacy and Data Protection',
      description: 'Understanding how we protect and handle your data.',
      steps: [
        'Review our Privacy Policy for detailed data handling practices',
        'Contact our data protection officer for privacy concerns',
        'Request data deletion or export through our contact form',
        'We comply with applicable data protection regulations',
      ],
      relatedLinks: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
      ],
    },
    {
      id: 8,
      category: 'products',
      title: 'Service Level Agreements (SLA)',
      description: 'Understanding our service commitments and guarantees.',
      steps: [
        'Each product has a specific SLA outlining uptime guarantees',
        'Support response times vary by service tier',
        'Escalation procedures are outlined in the service agreement',
        'Contact us for a copy of the SLA for any product',
      ],
      relatedLinks: [
        { label: 'Service Agreement', path: '/service-agreement' },
      ],
    },
  ];

  const filteredTopics = supportTopics.filter(topic => {
    const matchesCategory = activeCategory === 'all' || topic.category === activeCategory;
    const matchesSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-8 md:px-12 lg:px-20 py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-text mb-4 leading-tight">Support Center</h1>
          <p className="text-lg text-text/70 font-light mb-8">
            Find guides, tutorials, and answers to common questions about using the Satesoft platform.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#72bf24] focus:ring-2 focus:ring-[#72bf24]/20"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 md:px-12 lg:px-20 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Categories</h3>
              <nav className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeCategory === category.id
                          ? 'bg-[#72bf24]/10 text-[#72bf24] font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{category.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* Contact Card */}
              <div className="mt-8 p-4 bg-[#72bf24]/5 rounded-lg border border-[#72bf24]/20">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Need more help?</h4>
                <div className="space-y-2 text-sm">
                  <Link to="/contact" className="flex items-center gap-2 text-gray-700 hover:text-[#72bf24]">
                    <FaEnvelope className="w-4 h-4" />
                    Contact Support
                  </Link>
                  <a href="tel:+256749095200" className="flex items-center gap-2 text-gray-700 hover:text-[#72bf24]">
                    <FaPhone className="w-4 h-4" />
                    +256 749095200
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredTopics.length === 0 ? (
              <div className="text-center py-16">
                <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No topics found</h3>
                <p className="text-gray-600">Try adjusting your search or browse categories.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTopics.map((topic) => (
                  <div key={topic.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-[#72bf24] bg-[#72bf24]/10 rounded-full mb-2">
                          {categories.find(c => c.id === topic.category)?.label || topic.category}
                        </span>
                        <h3 className="text-xl font-semibold text-text mb-2">{topic.title}</h3>
                        <p className="text-text/80 font-light">{topic.description}</p>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
                        <FaChevronRight className="w-4 h-4 text-[#72bf24]" />
                        Step-by-Step Guide
                      </h4>
                      <ol className="space-y-3">
                        {topic.steps.map((step, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#72bf24] text-white text-xs flex items-center justify-center font-medium">
                              {index + 1}
                            </span>
                            <span className="text-text/80 font-light pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {topic.relatedLinks && topic.relatedLinks.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-lg font-semibold text-text mb-3">Related Links</h4>
                        <div className="flex flex-wrap gap-2">
                          {topic.relatedLinks.map((link, index) => (
                            <Link
                              key={index}
                              to={link.path}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm text-[#72bf24] bg-[#72bf24]/5 rounded-lg hover:bg-[#72bf24]/10 transition-colors"
                            >
                              {link.label}
                              <FaChevronRight className="w-3 h-3" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
