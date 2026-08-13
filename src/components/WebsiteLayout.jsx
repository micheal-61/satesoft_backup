import React, { useEffect, Suspense, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Appheader from "./Navbar";
import Footer from "./Footer";

export default function WebsiteLayout() {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const mainRef = useRef(null);

  // Microsoft-style page transitions with FORCED scroll
  useEffect(() => {
    // Don't run on first load
    const firstLoad = sessionStorage.getItem('firstLoad');
    if (!firstLoad) {
      sessionStorage.setItem('firstLoad', 'true');
      return;
    }

    // Start loading
    setIsLoading(true);
    setShowContent(false);
    
    // FORCE scroll to top using EVERY method possible
    window.scrollTo(0, 0);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.documentElement.scrollLeft = 0;
    document.body.scrollTop = 0;
    document.body.scrollLeft = 0;
    
    // Also scroll the main content to top
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }

    // Show loading for a moment
    const showLoaderTimer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    // Hide loader
    const hideLoaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(showLoaderTimer);
      clearTimeout(hideLoaderTimer);
    };
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[999] focus:bg-white focus:px-6 focus:py-3 focus:rounded-lg focus:shadow-lg focus:text-[#72bf24] focus:font-medium"
      >
        Skip to main content
      </a>

      <Appheader />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-gray-100 rounded-full relative">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-[#72bf24] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="mt-4 text-gray-500 font-light animate-pulse">Loading...</p>
          </div>
        </div>
      )}
      
      <main id="main-content" ref={mainRef} className="flex-1">
        <div className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}