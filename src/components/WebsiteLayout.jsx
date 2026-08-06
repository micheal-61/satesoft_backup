import React from "react";
import { Outlet } from "react-router-dom";
import Appheader from "./Navbar";
import Footer from "./Footer";

export default function WebsiteLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Appheader />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}