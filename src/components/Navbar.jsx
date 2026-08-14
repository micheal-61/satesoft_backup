import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function Appheader() {
  const [scrolled, setScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const companyRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (companyRef.current && !companyRef.current.contains(e.target)) {
        setCompanyOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCompanyOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  // Navigation links configuration
  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Blog', path: '/blog' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'Partners', path: '/partners' },
  ];

  const contactLink = { label: 'Contact', path: '/contact' };

  const companyLinks = [
    { label: 'About Us', path: '/about' },
    { label: 'Our Team', path: '/board' },
    { label: 'Testimonials', path: '/testimonials' },
    { label: 'Pricing', path: '/pricing' },
  ];

  const searchLinks = [...navLinks, ...companyLinks, contactLink];
  const searchResults = searchLinks.filter((link) =>
    link.label.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  return (
    <header 
      className={`w-full z-[100] fixed top-0 left-0 right-0 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}
    >
      {/* ============================================================
          TOP HEADER - Contact Info & Social (Hidden on Mobile)
          ============================================================ */}
      <div className="hidden md:block bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 py-2.5 text-xs text-gray-600">
        <div className="container mx-auto px-8 md:px-12 lg:px-20">
          <div className="flex justify-between items-center">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 font-light">
                <i className="bi bi-geo-alt-fill text-[#72bf24] text-sm"></i>
                National Innovation Hub, Kampala, Uganda
              </span>
              <a 
                href="mailto:info@satesoft.com" 
                className="flex items-center gap-1.5 hover:text-[#72bf24] transition-colors duration-300 font-light"
              >
                <i className="bi bi-envelope text-[#72bf24] text-sm"></i>
                info@satesoft.com
              </a>
              <span className="flex items-center gap-1.5 font-light">
                <i className="bi bi-alarm text-[#72bf24] text-sm"></i>
                9.00 am - 5.30 pm
              </span>
            </div>
            
            {/* Right: Social Media */}
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#72bf24] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a 
                href="https://twitter.com/satesoft" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-[#72bf24] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#72bf24] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#72bf24] transition-all duration-300 hover:scale-110"
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest-p text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
          MAIN NAVIGATION
          ============================================================ */}
      <div className="w-full py-3 transition-all duration-300">
        <div className="container mx-auto px-8 md:px-12 lg:px-20">
          <div className="flex justify-between items-center">
            
            {/* Logo and site search */}
            <div className="relative flex flex-shrink-0 flex-col items-start gap-5" ref={searchRef}>
              <Link to="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
                <Logo textClassName="text-[#72bf24]" showText={true} size="md" />
              </Link>
              <div className="flex w-52 items-center gap-2 rounded-lg border border-gray-200 bg-white/90 px-3 py-1.5 shadow-sm transition-colors focus-within:border-[#72bf24] sm:w-60">
                <i className="bi bi-search text-sm text-[#72bf24]"></i>
                <label htmlFor="site-search" className="sr-only">Search the site</label>
                <input
                  id="site-search"
                  type="search"
                  value={searchQuery}
                  onFocus={() => setSearchOpen(true)}
                  onChange={(event) => {
                    setSearchQuery(event.target.value);
                    setSearchOpen(true);
                  }}
                  placeholder="Search pages..."
                  className="w-full bg-transparent text-xs text-gray-700 outline-none placeholder:text-gray-400"
                />
              </div>

              {searchOpen && (
                <div className="absolute left-0 top-full z-[70] mt-3 w-72 overflow-hidden rounded-xl border border-gray-100 bg-white p-3 shadow-2xl sm:w-80">
                  <p className="px-1 pb-2 text-xs text-gray-500">Search available pages</p>
                  <div className="max-h-56 overflow-y-auto">
                    {searchResults.length ? searchResults.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setSearchOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-[#72bf24]/5 hover:text-[#72bf24]"
                      >
                        {link.label}
                      </Link>
                    )) : (
                      <p className="px-3 py-3 text-sm text-gray-500">No matching pages found.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ==========================================================
                DESKTOP MENU (Hidden on Mobile)
                ========================================================== */}
            <nav className="ml-auto hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-normal text-sm transition-all duration-300 hover:font-bold ${
                      isActive ? 'text-[#72bf24] font-bold' : 'text-gray-600 hover:text-[#72bf24]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* Company Dropdown */}
              <div className="relative group" ref={companyRef}>
                  <button
                    type="button"
                    onClick={() => setCompanyOpen((o) => !o)}
                    aria-haspopup="true"
                    aria-expanded={companyOpen}
                    className={`font-normal text-sm transition-all duration-300 flex items-center gap-1 hover:font-bold ${
                      location.pathname === '/about' || 
                      location.pathname === '/board' || 
                      location.pathname === '/pricing' || 
                      location.pathname === '/testimonials'
                        ? 'text-[#72bf24] font-bold' 
                        : 'text-gray-600 hover:text-[#72bf24]'
                    }`}
                  >
                    Company
                    <i className={`bi bi-chevron-down text-[10px] transition-transform duration-300 ${
                      companyOpen ? 'rotate-180' : ''
                    }`}></i>
                  </button>
                
                {/* Dropdown Menu */}
                <div 
                  className={`absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 transform z-[60] ${
                    companyOpen 
                      ? 'opacity-100 visible translate-y-0' 
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="py-2">
                    {companyLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <Link
                          key={link.path}
                          to={link.path}
                          className={`block px-5 py-2.5 text-sm font-normal transition-all duration-300 border-l-4 ${
                            isActive
                              ? 'border-[#72bf24] text-[#72bf24] bg-[#72bf24]/5'
                              : 'border-transparent text-gray-600 hover:bg-[#72bf24]/5 hover:text-[#72bf24] hover:border-[#72bf24]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              <Link
                to={contactLink.path}
                className={`font-normal text-sm transition-all duration-300 hover:font-bold ${
                  location.pathname.startsWith(contactLink.path)
                    ? 'text-[#72bf24] font-bold'
                    : 'text-gray-600 hover:text-[#72bf24]'
                }`}
              >
                {contactLink.label}
              </Link>
            </nav>

            {/* Mobile menu toggle */}
            <div className="ml-2 flex items-center lg:hidden">
              {/* Mobile Toggle Button */}
              <button
                onClick={toggleMobile}
                className="lg:hidden text-gray-600 hover:text-[#72bf24] transition-all duration-300 p-2 hover:bg-[#72bf24]/10 rounded-lg"
                aria-label="Toggle menu"
              >
                <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* ============================================================
            MOBILE MENU
            ============================================================ */}
        <div 
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-gray-100 py-4 px-6 shadow-lg">
            <nav className="flex flex-col space-y-1">
              {/* Main Navigation */}
              {navLinks.map((link) => {
                const isActive = link.path === '/' 
                  ? location.pathname === '/' 
                  : location.pathname.startsWith(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={toggleMobile}
                    className={`relative font-normal text-sm transition-all duration-300 py-2.5 px-4 rounded-lg ${
                      isActive
                        ? 'text-[#72bf24] bg-[#72bf24]/5'
                        : 'text-gray-600 hover:text-[#72bf24] hover:bg-gray-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                to={contactLink.path}
                onClick={toggleMobile}
                className={`relative font-normal text-sm transition-all duration-300 py-2.5 px-4 rounded-lg ${
                  location.pathname.startsWith(contactLink.path)
                    ? 'text-[#72bf24] bg-[#72bf24]/5'
                    : 'text-gray-600 hover:text-[#72bf24] hover:bg-gray-50'
                }`}
              >
                {contactLink.label}
              </Link>

              {/* Company Links in Mobile */}
              <div className="mt-1 pt-2 border-t border-gray-100">
                <p className="text-xs font-normal text-gray-400 uppercase tracking-wider px-4 py-1">
                  Company
                </p>
                {companyLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={toggleMobile}
                      className={`relative font-normal text-sm transition-all duration-300 py-2.5 px-4 rounded-lg ${
                        isActive
                          ? 'text-[#72bf24] bg-[#72bf24]/5'
                          : 'text-gray-600 hover:text-[#72bf24] hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Admin Portal */}
              <Link
                to="/admin/login"
                onClick={toggleMobile}
                className="mt-2 font-normal text-sm text-[#72bf24] hover:text-[#62a71e] transition-all duration-300 py-2.5 px-4 rounded-lg border border-[#72bf24]/20 hover:bg-[#72bf24]/5 flex items-center gap-2"
              >
                <i className="bi bi-shield-lock"></i>
                Admin Portal
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
