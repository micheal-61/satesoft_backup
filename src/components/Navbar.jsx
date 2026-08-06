import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Appheader() {
  const [scrolled, setScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const companyRef = useRef(null);

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
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCompanyOpen(false);
    setMobileOpen(false);
  }, [location]);

  const toggleMobile = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
      <header className="w-full z-[100] transition-all duration-300">
      {/* Top Header - Hidden on mobile */}
      <div className="hidden md:block bg-surface border-b border-border py-2 text-xs text-text/80">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <span className="flex items-center gap-2">
                <i className="bi bi-geo-alt-fill text-primary-500"></i>
                1321 Gateway Atlantic City, Florida, 54012
              </span>
              <a href="mailto:info@satesoft.com" className="flex items-center gap-2 hover:text-primary-500 transition-colors">
                <i className="bi bi-envelope text-primary-500"></i>
                info@satesoft.com
              </a>
              <span className="flex items-center gap-2">
                <i className="bi bi-alarm text-primary-500"></i>
                9.00 am - 5.00 pm
              </span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary-500 transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="https://twitter.com/satesoft" target="_blank" rel="noreferrer" className="hover:text-primary-500 transition-colors"><i className="fab fa-twitter"></i></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="hover:text-primary-500 transition-colors"><i className="fab fa-pinterest-p"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`w-full transition-all duration-300 ${scrolled ? 'fixed top-0 bg-surface/90 backdrop-blur-md shadow-sm py-3' : 'bg-surface py-5 relative'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
               <Link to="/" className="flex items-center">
                <h1 className="font-bold text-2xl tracking-tight m-0">
                  <span className="text-text">SATE</span><span className="text-primary-500">SOFT</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`font-semibold text-sm transition-colors hover:text-primary-500 ${location.pathname === '/' ? 'text-primary-500' : 'text-text'}`}>Home</Link>
              
              <div className="relative group" ref={companyRef}>
                 <button
                   type="button"
                   onClick={() => setCompanyOpen((o) => !o)}
                   aria-haspopup="true"
                   aria-expanded={companyOpen}
                   className={`font-semibold text-sm transition-colors hover:text-primary-500 flex items-center gap-1 ${location.pathname === '/about' || location.pathname === '/board' || location.pathname === '/pricing' || location.pathname === '/testimonials' ? 'text-primary-500' : 'text-text'}`}
                 >
                   Company <i className={`bi bi-chevron-down text-[10px] transition-transform duration-200 ${companyOpen ? 'rotate-180' : ''}`}></i>
                 </button>
                  <div className={`absolute top-full left-0 mt-2 w-56 bg-surface rounded-xl shadow-xl border border-border overflow-hidden transition-all duration-300 transform z-[60] ${companyOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0'}`}>
                    <div className="py-2">
                      <Link to="/about" className="block px-5 py-3 text-sm font-bold text-text hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-500">About Us</Link>
                      <Link to="/board" className="block px-5 py-3 text-sm font-bold text-text hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-500">Our Team</Link>
                      <Link to="/testimonials" className="block px-5 py-3 text-sm font-bold text-text hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-500">Testimonials</Link>
                      <Link to="/pricing" className="block px-5 py-3 text-sm font-bold text-text hover:bg-primary-50 hover:text-primary-600 transition-colors border-l-4 border-transparent hover:border-primary-500">Pricing</Link>
                    </div>
                  </div>
                </div>

              <Link to="/products" className={`font-semibold text-sm transition-colors hover:text-primary-500 ${location.pathname === '/products' ? 'text-primary-500' : 'text-text'}`}>Portfolio</Link>
              <Link to="/services" className={`font-semibold text-sm transition-colors hover:text-primary-500 ${location.pathname === '/services' ? 'text-primary-500' : 'text-text'}`}>Services</Link>
              <Link to="/blog" className={`font-semibold text-sm transition-colors hover:text-primary-500 ${location.pathname.startsWith('/blog') ? 'text-primary-500' : 'text-text'}`}>Blog</Link>
              <Link to="/contact" className={`font-semibold text-sm transition-colors hover:text-primary-500 ${location.pathname === '/contact' ? 'text-primary-500' : 'text-text'}`}>Contact</Link>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link to="/contact" className="btn-primary hidden md:inline-flex">
                Get A Quote
              </Link>
              <button
                onClick={toggleMobile}
                className="lg:hidden text-text hover:text-primary-500 transition-colors p-2"
                aria-label="Toggle menu"
              >
                <i className={`fas ${mobileOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-surface border-t border-border py-4 px-4">
            <nav className="flex flex-col space-y-3">
              <Link to="/" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Home</Link>
              <Link to="/about" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">About</Link>
              <Link to="/board" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Our Team</Link>
              <Link to="/testimonials" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Testimonials</Link>
              <Link to="/pricing" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Pricing</Link>
              <Link to="/products" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Portfolio</Link>
              <Link to="/services" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Services</Link>
              <Link to="/blog" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Blog</Link>
              <Link to="/contact" onClick={toggleMobile} className="font-semibold text-sm text-text hover:text-primary-500 transition-colors py-2">Contact</Link>
              <Link to="/admin/login" onClick={toggleMobile} className="font-semibold text-sm text-primary-500 hover:text-primary-600 transition-colors py-2 mt-2 border-t border-border pt-3">Admin Portal</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}