import React from "react";
import { Link } from "react-router-dom";
import {
  FileEarmarkText,
  ArrowRight,
  ArrowLeft,
  CheckCircleFill,
} from "react-bootstrap-icons";

function ProductDetailsFoundDocument() {
  const features = [
    "OCR-powered intelligent search",
    "Secure cloud document storage",
    "Version control & history tracking",
    "Role-based user access",
    "Fast document retrieval",
    "Automated digital archiving",
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
            <div className="mb-8 w-24 h-24 bg-primary-50 rounded-3xl flex items-center justify-center border border-primary-100 shadow-sm">
              <FileEarmarkText size={48} className="text-primary-500" />
            </div>

            {/* Title */}
            <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl text-text mb-6 tracking-tight leading-tight">
              FoundDocument
            </h1>

            {/* Subtitle */}
            <h5 className="uppercase text-primary-500 tracking-widest font-bold mb-8">
              Intelligent Archiving & Retrieval
            </h5>

            {/* Description */}
            <p className="text-xl text-text/70 leading-relaxed max-w-2xl mb-12">
              A robust document management system built for the unique needs of African enterprises. FoundDocument ensures that critical records are digitized, securely stored, and instantly retrievable, reducing administrative overhead.
            </p>

            {/* Buttons */}
            <div>
              <button className="btn-primary inline-flex items-center gap-2 group">
                Request a Demo
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-2/5">
            <div className="card h-full bg-white border border-border rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col">
              {/* Heading */}
              <h2 className="font-bold text-3xl text-text mb-8">
                Key Features
              </h2>

              {/* Features */}
              <div className="space-y-4 flex-grow mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-surface border border-border/50 rounded-2xl hover:border-primary-200 transition-colors"
                  >
                    <CheckCircleFill
                      size={24}
                      className="text-primary-500 mr-4 flex-shrink-0"
                    />
                    <span className="text-lg text-text font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Info Box */}
              <div className="mt-auto p-6 bg-primary-50 rounded-2xl border border-primary-100">
                <h5 className="font-bold text-lg text-text mb-3">
                  Why Choose FoundDocument?
                </h5>
                <p className="text-text/70 leading-relaxed mb-0">
                  Reduce paperwork, improve collaboration, secure
                  organizational records, and instantly locate any
                  document whenever you need it through intelligent
                  archiving and retrieval technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsFoundDocument;