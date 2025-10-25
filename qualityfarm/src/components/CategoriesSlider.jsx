import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function CategoriesSlider() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://qualityfarm-b-1.onrender.com/categories/");
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        const data = await res.json();
        // Limit to 8 categories for the slider
        setCategories(data.slice(0, 8));
        toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
        // Fallback categories for demo
        setCategories([
          { id: 1, name: "Seeds", description: "High-quality agricultural seeds", image: null },
          { id: 2, name: "Fertilizers", description: "Organic and chemical fertilizers", image: null },
          { id: 3, name: "Tools", description: "Agricultural tools and equipment", image: null },
          { id: 4, name: "Pesticides", description: "Safe and effective pesticides", image: null },
          { id: 5, name: "Machinery", description: "Modern farming machinery", image: null },
          { id: 6, name: "Irrigation", description: "Irrigation systems and supplies", image: null },
          { id: 7, name: "Storage", description: "Crop storage solutions", image: null },
          { id: 8, name: "Livestock", description: "Livestock feed and supplies", image: null }
        ].slice(0, 8));
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Calculate slides per view based on screen size
  const getSlidesPerView = () => {
    if (isMobile) return 4; // Changed from 1 to 4 for mobile
    if (window.innerWidth <= 1024) return 3;
    return Math.min(4, categories.length);
  };

  const slidesPerView = getSlidesPerView();
  const maxSlides = Math.max(0, categories.length - slidesPerView);

  // Auto-slide functionality
  useEffect(() => {
    if (maxSlides <= 0) return; // Don't auto-slide if all items fit

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (maxSlides + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlides]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentSlide < maxSlides) {
      setCurrentSlide(prev => prev + 1);
    }
    if (isRightSwipe && currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const nextSlide = () => {
    setCurrentSlide(prev => prev < maxSlides ? prev + 1 : 0);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => prev > 0 ? prev - 1 : maxSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlides));
  };

  if (loading) {
    return (
      <section className="py-6 md:py-10 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center">
            <div className="w-10 h-10 md:w-14 md:h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2.5 md:mb-3"></div>
            <p className="text-gray-600 font-medium text-xs md:text-sm">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Professional Header */}
        <div className="text-center mb-5 md:mb-8 lg:mb-10">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Categories</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 md:px-4">
            Explore our comprehensive range of agricultural products, organized by category for easy browsing and selection.
          </p>
        </div>

        {/* Categories Slider */}
        <div className="relative categories-slider-container">
          {/* Navigation Arrows */}
          {maxSlides > 0 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 w-6 md:w-10 h-6 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center -translate-x-3 md:-translate-x-5 hover:scale-110 categories-slider-arrow left"
              >
                <i className="fas fa-chevron-left text-[10px] md:text-sm"></i>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-green-600 w-6 md:w-10 h-6 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center translate-x-3 md:translate-x-5 hover:scale-110 categories-slider-arrow right"
              >
                <i className="fas fa-chevron-right text-[10px] md:text-sm"></i>
              </button>
            </>
          )}

          {/* Slider Container */}
          <div className="overflow-hidden rounded-2xl md:rounded-3xl">
            <div
              ref={sliderRef}
              className="flex transition-transform duration-500 ease-in-out categories-slider-track"
              style={{
                transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex-shrink-0 px-1 md:px-3 categories-slider-card"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <Link
                    to={`/category/${cat.id}`}
                    className="group bg-white rounded-lg md:rounded-2xl shadow-sm md:shadow-md hover:shadow-md md:hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-0.5 md:hover:-translate-y-1 block h-full"
                  >
                    {/* Category Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 aspect-square">
                      {cat.image ? (
                        <img
                          src={
                            cat.image.startsWith("http")
                              ? cat.image
                              : `https://qualityfarm-b-1.onrender.com${cat.image}`
                          }
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <i className="fas fa-th-large text-xl md:text-4xl lg:text-5xl text-green-300"></i>
                        </div>
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Category Badge - Hidden on mobile */}
                      <div className="absolute top-1 md:top-3 left-1 md:left-3 hidden md:block">
                        <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-md">
                          Category
                        </span>
                      </div>

                      {/* Quick View Button - Hidden on mobile */}
                      <div className="absolute bottom-1 md:bottom-3 right-1 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">
                        <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-green-600 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                          <i className="fas fa-arrow-right text-xs md:text-sm"></i>
                        </button>
                      </div>
                    </div>

                    {/* Category Info */}
                    <div className="p-1.5 md:p-4 lg:p-5">
                      <h3 className="font-bold md:font-black text-gray-900 mb-0.5 md:mb-2 group-hover:text-green-600 transition-colors duration-200 text-[10px] md:text-base lg:text-lg line-clamp-1 md:line-clamp-2">
                        {cat.name}
                      </h3>
                      <p className="text-gray-600 mb-1 md:mb-3 text-[8px] md:text-sm line-clamp-1 md:line-clamp-2 hidden md:block">
                        {cat.description || "Discover premium quality products in this category."}
                      </p>
                      
                      {/* View Category Button - Simplified on mobile */}
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-semibold text-[9px] md:text-sm group-hover:text-green-700 transition-colors duration-200">
                          Explore
                        </span>
                        <i className="fas fa-chevron-right text-green-600 text-[8px] md:text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {maxSlides > 0 && (
            <div className="flex justify-center gap-1 md:gap-2 mt-3 md:mt-6">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-green-600 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Mobile swipe hint */}
          {isMobile && maxSlides > 0 && (
            <div className="categories-slider-mobile-hint"></div>
          )}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-8 md:mt-10">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-xs md:text-sm"
          >
            <span>View All Categories</span>
            <i className="fas fa-arrow-right text-xs"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default CategoriesSlider;
