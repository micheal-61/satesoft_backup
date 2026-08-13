import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckLg, ArrowRight, Envelope } from "react-bootstrap-icons";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found.");
          }
          throw new Error("Failed to fetch product details.");
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="py-28 bg-bg min-h-screen">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 text-primary-500">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-medium">Loading product details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-28 bg-bg min-h-screen">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <p className="text-red-500 text-lg mb-6">{error}</p>
          <Link to="/" className="btn-primary">
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="py-28 bg-bg min-h-screen">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center text-gray-900 font-normal tracking-widest text-sm hover:text-[#72bf24] transition-colors uppercase group"
          >
            <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Homepage
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="w-full lg:w-3/5 text-left flex flex-col justify-center">
            {/* Category Badge */}
            {product.category && (
              <span className="inline-block px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-lg uppercase tracking-[0.15em] text-[#72bf24] font-semibold text-xs mb-6 w-fit">
                {product.category}
              </span>
            )}

            {/* Title */}
            <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Tagline */}
            {product.tagline && (
              <h5 className="uppercase text-gray-600 tracking-widest font-normal mb-8 text-lg">
                {product.tagline}
              </h5>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mb-10">
                {product.description}
              </p>
            )}

            {/* Contact CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 group px-8 py-4 text-lg bg-[#72bf24] text-white font-normal rounded-xl hover:bg-[#62a71e] transition-all duration-300 shadow-lg shadow-[#72bf24]/30"
              >
                <Envelope className="text-xl" />
                <span>Contact Us to Learn More</span>
                <ArrowRight className="transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-2/5">
            <div className="card h-full bg-white border border-border rounded-3xl shadow-xl p-8 lg:p-10 flex flex-col justify-center">
              {/* Key Features Heading */}
              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <>
                  <h2 className="font-light text-3xl text-gray-900 mb-8 flex items-center">
                    <span className="text-[#72bf24] mr-3">
                      <CheckLg size={32} />
                    </span>
                    Key Features
                  </h2>

                  {/* Features */}
                  <ul className="space-y-6 mb-10">
                    {product.keyFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start group">
                        <div className="w-10 h-10 rounded-full bg-[#72bf24]/10 flex items-center justify-center mr-4 border border-[#72bf24]/20 group-hover:bg-[#72bf24] group-hover:border-[#72bf24] transition-colors flex-shrink-0 mt-1">
                          <CheckLg size={20} className="text-[#72bf24] group-hover:text-white transition-colors" />
                        </div>
                        <span className="text-xl text-gray-700 font-light group-hover:text-[#72bf24] transition-colors">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Back to Products */}
              <Link
                to="/products"
                className="inline-flex items-center text-gray-900 font-normal tracking-widest text-sm hover:text-[#72bf24] transition-colors uppercase group mt-auto"
              >
                <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
