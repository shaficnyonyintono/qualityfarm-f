import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryItems() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch category info
    fetch(`https://qualityfarm-b-1.onrender.com/categories/`)
      .then(res => res.json())
      .then(data => {
        const cat = data.find(c => String(c.id) === String(id));
        setCategory(cat);
      });

    // Fetch items for this category
    fetch(`https://qualityfarm-b-1.onrender.com/items/?category=${id}`)
      .then(res => res.json())
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-8">
      <div className="text-center">
        <div className="w-10 h-10 md:w-14 md:h-14 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-2.5 md:mb-3"></div>
        <p className="text-gray-600 font-medium text-xs md:text-sm">Loading items...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 md:py-8 lg:py-10">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-green-700 mb-4 md:mb-5 lg:mb-6">
        {category ? `Items in "${category.name}"` : "Category"}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
        {items.length === 0 ? (
          <div className="col-span-full text-center py-8 md:py-10">
            <i className="fas fa-box-open text-4xl md:text-5xl text-gray-300 mb-3 md:mb-4"></i>
            <h4 className="text-lg md:text-xl font-bold text-gray-600 mb-1.5 md:mb-2">No items found</h4>
            <p className="text-gray-500 text-xs md:text-sm">This category doesn't have any products yet.</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].image.startsWith("http")
                      ? item.images[0].image
                      : `https://qualityfarm-b-1.onrender.com${item.images[0].image}`
                    : "https://via.placeholder.com/300x200/10B981/ffffff?text=Product"
                }
                alt={item.title}
                className="w-full h-24 md:h-32 lg:h-36 object-cover rounded-lg md:rounded-xl mb-2 md:mb-3"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200/10B981/ffffff?text=Product";
                }}
              />
              <h4 className="font-bold text-sm md:text-base text-gray-900 mb-1 md:mb-1.5 line-clamp-2">{item.title}</h4>
              <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2">{item.description}</p>
              <span className="text-green-700 font-semibold text-sm md:text-base">
                UGX {new Intl.NumberFormat('en-UG').format(item.price)}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryItems;