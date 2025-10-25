import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import freshHarvets from '../freshHarvets.jpg';
import tractorGreen from '../tractorGreen.jpg';
import harvester from '../havester.jpg';
import greens from '../greens.jpg';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const heroSlides = [
    {
      id: 1,
      title: "Premium Agricultural Products",
      subtitle: "Farm Fresh • Quality Guaranteed • Direct from Farmers",
      description: "Discover the finest selection of agricultural products sourced directly from trusted farmers. Quality, freshness, and sustainability in every purchase.",
      buttonText: "Shop Now",
      buttonLink: "/products",
      image: freshHarvets
    },
    {
      id: 2,
      title: "Fresh Harvest Collection",
      subtitle: "Seasonal • Organic • Locally Sourced",
      description: "Experience the taste of fresh harvest with our curated collection of seasonal products. Supporting local farmers and sustainable agriculture.",
      buttonText: "Explore Collection",
      buttonLink: "/featured",
      image: greens
    },
    {
      id: 3,
      title: "Farm Equipment & Tools",
      subtitle: "Professional • Durable • Efficient",
      description: "Enhance your farming operations with our comprehensive range of high-quality equipment and tools designed for modern agriculture.",
      buttonText: "Browse Equipment",
      buttonLink: "/categories",
      image: tractorGreen
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section className="relative h-[50vh] min-h-[300px] overflow-hidden bg-gray-900">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Animated content for current slide */}
            <div
              key={currentSlide}
              className="animate-fadeInUp"
            >
              {/* Subtitle */}
              <div className="mb-1.5 md:mb-2" data-aos="fade-right" data-aos-duration="1000">
                <span className="inline-block px-2 md:px-2.5 py-0.5 md:py-1 bg-white/10 backdrop-blur-sm text-white text-[10px] md:text-xs font-medium rounded-full border border-white/20">
                  {heroSlides[currentSlide].subtitle}
                </span>
              </div>

              {/* Main Title */}
              <h1 className="text-lg md:text-3xl font-bold text-white mb-2 md:mb-3 leading-tight" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                {heroSlides[currentSlide].title}
              </h1>

              {/* Description */}
              <p className="text-xs md:text-base text-white/90 mb-3 md:mb-5 leading-relaxed max-w-2xl">
                {heroSlides[currentSlide].description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  to={heroSlides[currentSlide].buttonLink}
                  className="inline-flex items-center justify-center px-3 md:px-5 py-1.5 md:py-2.5 bg-white text-green-700 font-medium md:font-semibold rounded-full hover:bg-green-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-xs md:text-sm"
                >
                  {heroSlides[currentSlide].buttonText}
                  <i className="fas fa-arrow-right ml-1 md:ml-2 text-[10px] md:text-xs"></i>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-3 md:px-5 py-1.5 md:py-2.5 border-2 border-white text-white font-medium md:font-semibold rounded-full hover:bg-white hover:text-green-700 transition-all duration-300 text-xs md:text-sm"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-4 md:mt-6 grid grid-cols-3 gap-4 md:gap-6 max-w-md" data-aos="fade-up" data-aos-delay="800">
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-white mb-0.5 md:mb-1">
                    500+
                  </div>
                  <div className="text-[10px] md:text-xs text-white/80">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-white mb-0.5 md:mb-1">
                    50+
                  </div>
                  <div className="text-[10px] md:text-xs text-white/80">Local Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-base md:text-lg font-bold text-white mb-0.5 md:mb-1">
                    1000+
                  </div>
                  <div className="text-[10px] md:text-xs text-white/80">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 group"
      >
        <i className="fas fa-chevron-left text-sm group-hover:-translate-x-1 transition-transform"></i>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 bg-white/10 backdrop-blur-sm text-white rounded-full hover:bg-white/20 transition-all duration-300 group"
      >
        <i className="fas fa-chevron-right text-sm group-hover:translate-x-1 transition-transform"></i>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-8 right-8 z-20 text-white/80 animate-bounce">
        <div className="flex flex-col items-center gap-1">
          <span className="text-xs">Scroll</span>
          <i className="fas fa-chevron-down text-xs"></i>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
