import React from "react";
import { Link } from "react-router-dom";
import { PeopleFill, ArrowLeft, ArrowRight, CheckLg } from "react-bootstrap-icons";

function ProductDetailsKaribyshoo() {
  const features = [
    "Digital guest registration",
    "QR code visitor check-in",
    "Security & access control",
    "Visitor analytics dashboard",
  ];

  return (
    <div className="py-28 bg-bg min-h-screen">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/products"
            className="inline-flex items-center text-text font-bold tracking-widest text-sm hover:text-primary-500 transition-colors uppercase group"
          >
            <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            BACK TO PRODUCTS
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="w-full lg:w-3/5 text-left flex flex-col justify-center">
            {/* Icon */}
            <div className="mb-8 w-24 h-24 bg-primary-100 rounded-3xl flex items-center justify-center border border-primary-200 shadow-sm">
              <PeopleFill size={48} className="text-primary-600" />
            </div>

            {/* Title */}
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-text mb-6 tracking-tight leading-tight">
              Karibyshoo
            </h1>

            {/* Subtitle */}
            <h5 className="uppercase text-primary-500 tracking-widest font-bold mb-8">
              Smart Visitor & Event Management
            </h5>

            {/* Description */}
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl mb-12">
              Karibyshoo (Welcome Show) is a modern visitor management
              system that streamlines entry processes for offices,
              institutions, and events. It enhances security, improves
              visitor experiences, and provides real-time insights
              through digital check-in and analytics tools.
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-2/5">
            <div className="card h-full bg-white border border-border rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col justify-center">
              {/* Heading */}
              <h2 className="font-bold text-3xl text-text mb-8 flex items-center">
                <span className="text-primary-500 mr-3">
                  <CheckLg size={32} />
                </span>
                Key Features
              </h2>

              {/* Features */}
              <ul className="space-y-6 mb-10">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center group"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mr-4 border border-primary-100 group-hover:bg-primary-500 group-hover:border-primary-500 transition-colors">
                      <CheckLg size={20} className="text-primary-500 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-xl text-text font-medium group-hover:text-primary-600 transition-colors">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button className="btn-primary w-full inline-flex items-center justify-center gap-2 group py-4 text-lg">
                Request a Demo
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsKaribyshoo;