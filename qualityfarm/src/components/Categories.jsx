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
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

  // Center and enlarge if few categories, scroll if many
  const isFew = categories.length <= 3;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header */}
        <div className="text-center mb-16" data-aos="fade-up">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-emerald-100 px-6 py-3 rounded-full border border-green-200 mb-6">
            <i className="fas fa-th-large text-green-600"></i>
            <span className="font-semibold text-gray-700">Browse Collection</span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 mb-6 tracking-tight" data-aos="fade-up" data-aos-delay="200">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="400">
            Explore our comprehensive range of agricultural products, organized by category for easy browsing and selection.
          </p>
        </div>

        {/* Categories Grid */}
        <div
          className={`grid gap-8 ${
            isFew 
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center" 
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2 ${
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
                    <i className="fas fa-th-large text-6xl text-green-300"></i>
                  </div>
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Category
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-green-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center">
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <h3 className={`font-black text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-200 ${
                  isFew ? "text-2xl" : "text-xl"
                }`}>
                  {cat.name}
                </h3>
                <p className={`text-gray-600 mb-4 ${isFew ? "text-lg" : "text-base"}`}>
                  {cat.description || "Discover premium quality products in this category."}
                </p>
                
                {/* View Category Button */}
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-semibold group-hover:text-green-700 transition-colors duration-200">
                    Explore Category
                  </span>
                  <i className="fas fa-chevron-right text-green-600 group-hover:translate-x-1 transition-transform duration-200"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Selected Category Items Section */}
        {selectedCategory && (
          <div className="mt-16 bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-gray-900 mb-4">
                Items in "{selectedCategory.name}"
              </h3>
              <p className="text-gray-600">Browse products from this category</p>
            </div>
            
            {itemsLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading items...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedItems.length === 0 ? (
                  <div className="col-span-full text-center py-12">
                    <i className="fas fa-box-open text-6xl text-gray-300 mb-4"></i>
                    <h4 className="text-xl font-bold text-gray-600 mb-2">No items found</h4>
                    <p className="text-gray-500">This category doesn't have any products yet.</p>
                  </div>
                ) : (
                  selectedItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                          UGX {new Intl.NumberFormat('en-UG').format(item.price)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <Link
                        to={`/product/${encodeURIComponent(item.title)}`}
                        className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
                      >
                        View Details
                        <i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}

        {/* Call-to-action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our agricultural experts for personalized product recommendations.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <span>Browse All Products</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
