import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

const HomeProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="py-28 bg-bg">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <div className="inline-flex items-center gap-2 text-primary-500">
            <i className="bi bi-arrow-clockwise animate-spin text-2xl"></i>
            <span className="text-lg font-medium">Loading products...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-28 bg-bg">
        <div className="container mx-auto px-8 sm:px-12 lg:px-20 text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <>
      <section className="relative py-28 bg-bg overflow-hidden">
      <div className="container mx-auto px-8 sm:px-12 lg:px-20 lg:pr-40 relative z-10">
        <div className="mb-16">
          <div className="w-full md:w-1/2">
            <h5 className="uppercase tracking-widest text-[#72bf24] font-semibold text-sm mb-4">Our Products</h5>
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight m-0">
              Explore Our <span className="text-[#72bf24]">Products.</span>
            </h2>
          </div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={24}
          pagination={{
            clickable: true,
            bulletClass: 'product-pagination-bullet',
            bulletActiveClass: 'product-pagination-bullet-active'
          }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={products.length > 1}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-10 lg:gap-16 bg-surface border border-border rounded-[2rem] p-6 sm:p-10 shadow-xl">
                {/* LEFT: Description */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <span className="inline-block px-4 py-2 bg-primary-50 border border-primary-100 rounded-lg uppercase tracking-[0.15em] text-[#72bf24] font-semibold text-xs mb-6 w-fit">
                     {product.category || "Product"}
                   </span>

                   <h3 className="text-3xl md:text-4xl font-light text-gray-900 leading-tight mb-4">
                     {product.name}
                   </h3>

                   {product.tagline && (
                     <p className="text-lg text-gray-600 font-light mb-4">
                       {product.tagline}
                     </p>
                   )}

                   {product.description && (
                     <p className="text-gray-600 font-light leading-relaxed mb-6">
                       {product.description}
                     </p>
                   )}

                   {product.keyFeatures && product.keyFeatures.length > 0 && (
                     <ul className="space-y-2 mb-8">
                       {product.keyFeatures.slice(0, 4).map((feature, idx) => (
                         <li key={idx} className="flex items-start gap-2 text-gray-600 font-light">
                           <i className="bi bi-check-circle-fill text-[#72bf24] mt-1"></i>
                           <span>{feature}</span>
                         </li>
                       ))}
                     </ul>
                   )}

                    <Link to={`/products/${product.id}`} className="relative inline-flex items-center gap-1.5 px-4 py-4 bg-gradient-to-r from-[#72bf24] to-[#5fa31d] text-white font-bold rounded-full shadow-lg shadow-[#72bf24]/30 hover:shadow-xl hover:shadow-[#72bf24]/40 hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10 text-xs">Learn More</span>
                      <i className="bi bi-arrow-right-circle-fill text-xs relative z-10 transition-transform group-hover:translate-x-1"></i>
                    </Link>
                </div>

                {/* RIGHT: Image */}
                <div className="w-full lg:w-1/2 flex items-center">
                  <div className="relative w-full">
                    <div className="absolute inset-4 bg-white/40 backdrop-blur-md rounded-[2rem] rotate-2 -z-10"></div>
                    <div className="absolute inset-4 bg-primary-50/60 backdrop-blur-md rounded-[2rem] -rotate-1 -z-10"></div>
                    <img
                      src={product.logoUrl || product.logo_url || "https://via.placeholder.com/600x400"}
                      alt={product.name}
                      className="w-full rounded-[2rem] shadow-2xl object-cover aspect-[4/3]"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

    <style>{`
      .product-pagination-bullet {
        width: 10px;
        height: 10px;
        background: rgba(114, 191, 36, 0.4);
        opacity: 0.6;
        margin: 0 6px;
        border-radius: 5px;
        transition: all 0.3s ease;
        cursor: pointer;
      }
      .product-pagination-bullet-active {
        width: 32px;
        height: 10px;
        background: #72bf24;
        opacity: 1;
        border-radius: 5px;
      }
    `}</style>
    </>
  );
};

export default HomeProducts;
