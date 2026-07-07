import React from "react";
import { useRoutes, Outlet, Navigate } from "react-router-dom";

// ==========================================
// SYSTEM ROUTING ARCHITECTURE
// ==========================================
// This file acts as the central router for the entire application.
// The app is split into two main sections:
// 1. Public Pages (Frontend): Handled by PublicLayout, uses standard pages from src/pages.
// 2. Admin CMS (Backend/Admin Portal): Handled under the /admin path.

// --- Public Pages ---
import Home from "./pages/website/Home";
import AppAbout from "./pages/website/About";
import Products from "./pages/website/Products";
import Services from "./pages/website/Services";
import Pricing from "./pages/website/Pricing";
import FAQ from "./pages/website/FAQ";
import Testimonials from "./pages/website/Testimonials";
import Contact from "./pages/website/Contact";
import Blog from "./pages/website/Blog";
import Board from "./pages/website/Board";
import ProductDetailsDuqcat from "./pages/website/Productdetailsduqcat";
import ProductDetailsKaribyshoo from "./pages/website/ProductdetailsKaribyshoo";
import ProductDetailsFoundDocument from "./pages/website/ProductdetailsFoundDocument";
import Opportunties from "./pages/website/Opportunities";
import OpportunitiesApplicationForm from "./pages/website/OpportunitiesApplicationForm";
import Partners from "./pages/website/Partners";
import BlogDetails from "./pages/website/BlogDetails";

// --- Admin CMS ---
import RaincloudDashboard from "./pages/admin/RaincloudDashboard";
import AdminLogin from "./pages/admin/AdminLogin";

// --- Layouts ---
import Appheader from "./components/Navbar";
import Footer from "./components/Footer";

// Public layout wrapper: Injects Navbar and Footer around public pages
const PublicLayout = () => {
  return (
    <>
      <Appheader />
      <Outlet />
      <Footer />
    </>
  );
};

import { useAuth } from './context/AuthContext';

// Authentication Wrapper for the CMS
const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!user || !user.authenticated) {
    // Redirect to the login page if not logged in
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export const routesConfig = [
  // ----------------------------------------------------
  // PUBLIC FRONTEND ROUTES
  // ----------------------------------------------------
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <AppAbout /> },
      { path: "products", element: <Products /> },
      { path: "services", element: <Services /> },
      { path: "pricing", element: <Pricing /> },
      { path: "faq", element: <FAQ /> },
      { path: "testimonials", element: <Testimonials /> },
      { path: "contact", element: <Contact /> },
      { path: "blog", element: <Blog /> },
      { path: "board", element: <Board /> },
      { path: "opportunities", element: <Opportunties /> },
      { path: "partners", element: <Partners /> },
      { path: "products/duqact", element: <ProductDetailsDuqcat /> },
      { path: "products/karibyshoo", element: <ProductDetailsKaribyshoo /> },
      { path: "products/founddocument", element: <ProductDetailsFoundDocument /> },
      { path: "blog/:slug", element: <BlogDetails /> },
      { path: "opportunities/ApplicationForm", element: <OpportunitiesApplicationForm /> },
    ],
  },
  
  // ----------------------------------------------------
  // CMS ADMIN ROUTES (BACKEND PORTAL)
  // ----------------------------------------------------
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/*",
    element: (
      <RequireAuth>
        <RaincloudDashboard />
      </RequireAuth>
    ),
  },
];

export default function AppRoutes() {
  const element = useRoutes(routesConfig);
  return element;
}
