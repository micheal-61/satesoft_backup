import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, CheckLg, ArrowRight, Envelope } from "react-bootstrap-icons";

const safeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^file:\/\//i.test(trimmed)) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.startsWith('/')) return trimmed;
  if (trimmed.startsWith('data:')) return trimmed;
  return '/' + trimmed;
};

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(`/api/services/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Service not found.");
          }
          throw new Error("Failed to fetch service details.");
        }
        const data = await response.json();
        setService(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="py-28 bg-bg min-h-screen">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 text-[#72bf24]">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-light">Loading service details...</span>
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
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#72bf24] text-white font-normal rounded-xl hover:bg-[#62a71e] transition-colors">Back to Homepage</Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return null;
  }

  return (
    <div className="py-28 bg-bg min-h-screen">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20">
        {/* Back Button */}
        <div className="mb-12">
          <Link
            to="/services"
            className="inline-flex items-center text-gray-900 font-normal tracking-widest text-sm hover:text-[#72bf24] transition-colors uppercase group"
          >
            <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-20">
          {/* Left Section */}
          <div className="w-full lg:w-3/5 text-left flex flex-col justify-center">
            {/* Category Badge */}
            <span className="inline-block px-4 py-2 bg-[#72bf24]/10 border border-[#72bf24]/20 rounded-lg uppercase tracking-[0.15em] text-[#72bf24] font-semibold text-xs mb-6 w-fit">
              Service
            </span>

            {/* Title */}
            <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 tracking-tight leading-tight">
              {service.title}
            </h1>

            {/* Subtitle */}
            {service.subtitle && (
              <h5 className="uppercase text-gray-600 tracking-widest font-normal mb-8 text-lg">
                {service.subtitle}
              </h5>
            )}

            {/* Description */}
            {service.description && (
              <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mb-6">
                {service.description}
              </p>
            )}

            {/* Summary */}
            {service.summary && (
              <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl mb-10">
                {service.summary}
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
              {service.features && service.features.length > 0 && (
                <>
                  <h2 className="font-light text-3xl text-gray-900 mb-8 flex items-center">
                    <span className="text-[#72bf24] mr-3">
                      <CheckLg size={32} />
                    </span>
                    What We Offer
                  </h2>

                  {/* Features */}
                  <ul className="space-y-6 mb-10">
                    {service.features.map((feature, index) => (
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

              {/* Back to Services */}
              <Link
                to="/services"
                className="inline-flex items-center text-gray-900 font-normal tracking-widest text-sm hover:text-[#72bf24] transition-colors uppercase group mt-auto"
              >
                <ArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
                View All Services
              </Link>
            </div>
          </div>
        </div>

        {/* Service Image */}
        {service.imageUrl && (
          <div className="mt-16 rounded-3xl overflow-hidden shadow-xl border border-border">
            <img
              src={safeImageUrl(service.imageUrl)}
              alt={service.title}
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;
