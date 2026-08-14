import React from 'react';
import { Routes, Route } from 'react-router-dom';

import WebsiteLayout from './components/WebsiteLayout';
import Home from './pages/website/Home';
import About from './pages/website/About';
import Products from './pages/website/Products';
import ProductDetailsDuqcat from './pages/website/Productdetailsduqcat';
import ProductDetailsKaribyshoo from './pages/website/ProductdetailsKaribyshoo';
import ProductDetailsFoundDocument from './pages/website/ProductdetailsFoundDocument';
import Services from './pages/website/Services';
import Blog from './pages/website/Blog';
import BlogDetails from './pages/website/BlogDetails';
import Contact from './pages/website/Contact';
import Pricing from './pages/website/Pricing';
import Testimonials from './pages/website/Testimonials';
import Board from './pages/website/Board';
import Opportunities from './pages/website/Opportunities';
import OpportunityDetails from './pages/website/OpportunityDetails';
import OpportunityApplication from './pages/website/OpportunityApplication';

// Admin application (keeps the existing admin UI available under /admin)
import AdminApp from './pages/admin/RaincloudDashboard';
import AdminLogin from './pages/admin/AdminLogin';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<WebsiteLayout />}>
        <Route path="/" element={<About />} />
        <Route path="/about" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/duqact" element={<ProductDetailsDuqcat />} />
        <Route path="/products/karibyshoo" element={<ProductDetailsKaribyshoo />} />
        <Route path="/products/founddocument" element={<ProductDetailsFoundDocument />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/opportunities" element={<Opportunities />} />
        <Route path="/opportunities/:id" element={<OpportunityDetails />} />
        <Route path="/opportunities/:id/apply" element={<OpportunityApplication />} />
        <Route path="*" element={<Home />} />
      </Route>

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminApp />} />
    </Routes>
  );
}
