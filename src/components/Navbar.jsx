import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Appheader() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="w-full z-50 transition-all duration-300">
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
                <h1 className="font-bold text-2xl tracking-tight text-primary-500 m-0">SATESOFT</h1>
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/" className={`font-medium text-sm transition-colors hover:text-primary-500 ${location.pathname === '/' ? 'text-primary-500' : 'text-text'}`}>Home</Link>
              
              <div className="relative group">
                <Link to="/company" className="font-medium text-sm transition-colors hover:text-primary-500 flex items-center gap-1 text-text">
                  Company <i className="bi bi-chevron-down text-[10px]"></i>
                </Link>
                <div className="absolute top-full left-0 mt-2 w-48 bg-surface rounded-lg shadow-card border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                  <div className="py-2">
                    <Link to="/about" className="block px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-500">About Us</Link>
                    <Link to="/company" className="block px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-500">Our Team</Link>
                    <Link to="/services" className="block px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-500">Testimonials</Link>
                    <Link to="/pricing" className="block px-4 py-2 text-sm text-text hover:bg-black/5 dark:hover:bg-white/5 hover:text-primary-500">Pricing</Link>
                  </div>
                </div>
              </div>

              <Link to="/products" className={`font-medium text-sm transition-colors hover:text-primary-500 ${location.pathname === '/products' ? 'text-primary-500' : 'text-text'}`}>Portfolio</Link>
              <Link to="/services" className={`font-medium text-sm transition-colors hover:text-primary-500 ${location.pathname === '/services' ? 'text-primary-500' : 'text-text'}`}>Services</Link>
              <Link to="/blog" className={`font-medium text-sm transition-colors hover:text-primary-500 ${location.pathname.startsWith('/blog') ? 'text-primary-500' : 'text-text'}`}>Blog</Link>
              <Link to="/contact" className={`font-medium text-sm transition-colors hover:text-primary-500 ${location.pathname === '/contact' ? 'text-primary-500' : 'text-text'}`}>Contact</Link>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link to="/contact" className="btn-primary hidden md:inline-flex">
                Get A Quote
              </Link>
              <button className="lg:hidden text-text hover:text-primary-500 transition-colors p-2">
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}