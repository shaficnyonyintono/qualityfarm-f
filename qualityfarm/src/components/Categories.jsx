import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://qualityfarm-b-1.onrender.com/categories/")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch categories");
        return res.json();
      })
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setItemsLoading(true);
    fetch(`https://qualityfarm-b-1.onrender.com/items/?category=${cat.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then(setSelectedItems)
      .catch(console.error)
      .finally(() => setItemsLoading(false));
  };

  if (loading) return <div>Loading categories...</div>;

  // Center and enlarge if few categories, scroll if many
  const isFew = categories.length <= 3;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-green-700">Categories</h2>
      </div>
      <div
        className={`pb-4 flex gap-4 ${isFew ? "justify-center" : "overflow-x-auto"} `}
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
          overflowX: isFew ? undefined : "auto", // Ensure horizontal scroll when many
        }}
      >
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={`bg-white p-4 rounded shadow cursor-pointer hover:ring-2 ring-green-400 block transition-all duration-200
              ${isFew ? "min-w-[260px] max-w-xs scale-110" : "min-w-[200px]"}
            `}
            style={{ flex: "0 0 auto" }}
          >
            <img
              src={cat.image ? `https://qualityfarm-b-1.onrender.com${cat.image}` : "/placeholder.jpg"}
              alt={cat.name}
              className={`object-cover rounded mb-2 w-full ${isFew ? "h-40" : "h-32"}`}
            />
            <h3 className={`font-bold ${isFew ? "text-xl" : ""}`}>{cat.name}</h3>
            <p className={isFew ? "text-base" : ""}>{cat.description}</p>
          </Link>
        ))}
      </div>

      {selectedCategory && (
        <div className="mt-8">
          <h3 className="text-xl font-bold text-green-700 mb-4">
            Items in "{selectedCategory.name}"
          </h3>
          {itemsLoading ? (
            <div>Loading items...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedItems.length === 0 ? (
                <div className="col-span-full text-gray-500">No items found.</div>
              ) : (
                selectedItems.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded shadow">
                    <h4 className="font-bold">{item.title}</h4>
                    <p>{item.description}</p>
                    <span className="text-green-700 font-semibold">UGX {item.price}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Categories;
