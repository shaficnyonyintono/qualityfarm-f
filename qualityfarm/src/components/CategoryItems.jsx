import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CategoryItems() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch category info
    fetch(`http://localhost:8000/categories/`)
      .then(res => res.json())
      .then(data => {
        const cat = data.find(c => String(c.id) === String(id));
        setCategory(cat);
      });

    // Fetch items for this category
    fetch(`http://localhost:8000/items/?category=${id}`)
      .then(res => res.json())
      .then(setItems)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading items...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-green-700 mb-6">
        {category ? `Items in "${category.name}"` : "Category"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.length === 0 ? (
          <div className="col-span-full text-gray-500">No items found.</div>
        ) : (
          items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded shadow">
              <img
                src={
                  item.images && item.images.length > 0
                    ? item.images[0].image
                    : "/placeholder.jpg"
                }
                alt={item.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h4 className="font-bold">{item.title}</h4>
              <p>{item.description}</p>
              <span className="text-green-700 font-semibold">UGX {item.price}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryItems;