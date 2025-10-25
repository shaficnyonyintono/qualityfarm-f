import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://qualityfarm-b-1.onrender.com/categories/");
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        const data = await res.json();
        setCategories(data);
        toast.success("Categories loaded successfully!");
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
        // Fallback categories for demo
        setCategories([
          { id: 1, name: "Seeds", description: "High-quality agricultural seeds", image: null },
          { id: 2, name: "Fertilizers", description: "Organic and chemical fertilizers", image: null },
          { id: 3, name: "Tools", description: "Agricultural tools and equipment", image: null },
          { id: 4, name: "Pesticides", description: "Safe and effective pesticides", image: null }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (cat) => {
    setSelectedCategory(cat);
    setItemsLoading(true);
    try {
      const res = await fetch(`https://qualityfarm-b-1.onrender.com/items/?category=${cat.id}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch items: ${res.status}`);
      }
      const data = await res.json();
      setSelectedItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.error("Failed to load category items. Please try again.");
      setSelectedItems([]);
    } finally {
      setItemsLoading(false);
    }
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

  // Center and enlarge if few categories, scroll if many
  const isFew = categories.length <= 3;

  return (
    <section className="py-6 md:py-10 lg:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Professional Header */}
        <div className="text-center mb-5 md:mb-8 lg:mb-10" data-aos="fade-up">
          <h2 className="text-lg md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 md:mb-3 tracking-tight" data-aos="fade-up" data-aos-delay="200">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Categories</span>
          </h2>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 md:px-4" data-aos="fade-up" data-aos-delay="400">
            Explore our comprehensive range of agricultural products, organized by category for easy browsing and selection.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          className={`grid gap-3 md:gap-5 lg:gap-6 ${
            isFew 
              ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3 place-items-center" 
              : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`group bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-1 ${
                isFew ? "max-w-sm w-full" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 150}
              data-aos-duration="600"
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
                    <i className="fas fa-th-large text-3xl md:text-4xl lg:text-5xl text-green-300"></i>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-2 md:top-3 left-2 md:left-3">
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold shadow-md">
                    Category
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute bottom-2 md:bottom-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-green-600 w-8 h-8 md:w-10 md:h-10 rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center">
                    <i className="fas fa-arrow-right text-xs md:text-sm"></i>
                  </button>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-3 md:p-4 lg:p-5">
                <h3 className={`font-black text-gray-900 mb-1.5 md:mb-2 group-hover:text-green-600 transition-colors duration-200 ${
                  isFew ? "text-base md:text-lg lg:text-xl" : "text-sm md:text-base lg:text-lg"
                }`}>
                  {cat.name}
                </h3>
                <p className={`text-gray-600 mb-2 md:mb-3 line-clamp-2 ${isFew ? "text-xs md:text-sm lg:text-base" : "text-xs md:text-sm"}`}>
                  {cat.description || "Discover premium quality products in this category."}
                </p>
                
                {/* View Category Button */}
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold text-xs md:text-sm group-hover:text-green-700 transition-colors duration-200">
                    Explore Category
                  </span>
                  <i className="fas fa-chevron-right text-green-600 text-xs group-hover:translate-x-1 transition-transform duration-200"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Selected Category Items Section */}
        {selectedCategory && (
          <div className="mt-8 md:mt-10 lg:mt-12 bg-white rounded-2xl md:rounded-3xl shadow-lg border border-gray-100 p-4 md:p-6 lg:p-8" data-aos="fade-up" data-aos-delay="300">
            <div className="text-center mb-5 md:mb-6 lg:mb-8" data-aos="fade-down">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 mb-2 md:mb-3">
                Items in "{selectedCategory.name}"
              </h3>
              <p className="text-gray-600 text-xs md:text-sm lg:text-base">Browse products from this category</p>
            </div>
            
            {itemsLoading ? (
              <div className="text-center py-8 md:py-10">
                <div className="w-10 h-10 md:w-12 md:h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3 md:mb-4"></div>
                <p className="text-gray-600 font-medium text-xs md:text-sm">Loading items...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
                {selectedItems.length === 0 ? (
                  <div className="col-span-full text-center py-8 md:py-10" data-aos="fade-up">
                    <i className="fas fa-box-open text-4xl md:text-5xl text-gray-300 mb-3 md:mb-4"></i>
                    <h4 className="text-lg md:text-xl font-bold text-gray-600 mb-1.5 md:mb-2">No items found</h4>
                    <p className="text-gray-500 text-xs md:text-sm">This category doesn't have any products yet.</p>
                  </div>
                ) : (
                  selectedItems.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="bg-gray-50 rounded-xl md:rounded-2xl p-4 md:p-5 lg:p-6 hover:shadow-md transition-shadow duration-200"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="flex items-start justify-between mb-2 md:mb-3">
                        <h4 className="font-bold text-gray-900 text-sm md:text-base lg:text-lg">{item.title}</h4>
                        <span className="bg-green-100 text-green-700 px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap ml-2">
                          UGX {new Intl.NumberFormat('en-UG').format(item.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">{item.description}</p>
                      <Link
                        to={`/product/${encodeURIComponent(item.title)}`}
                        className="inline-flex items-center gap-1.5 md:gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors duration-200"
                      >
                        View Details
                        <i className="fas fa-arrow-right text-xs"></i>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Call-to-action */}
        <div className="text-center mt-8 md:mt-10 lg:mt-12" data-aos="fade-up" data-aos-delay="600">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl md:rounded-3xl p-5 md:p-6 lg:p-8 border border-green-200">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-2 md:mb-3">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 text-xs md:text-sm mb-4 md:mb-5">
              Contact our agricultural experts for personalized product recommendations.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-5 py-2.5 md:px-6 md:py-3 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 text-xs md:text-sm"
            >
              <span>Browse All Products</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
