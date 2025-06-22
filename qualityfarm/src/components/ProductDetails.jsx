import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function ProductDetails() {
  const { name } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    fetch(
      `http://127.0.0.1:8000/api/items/?search=${encodeURIComponent(name)}`
    )
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) setProduct(data[0])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [name])

  useEffect(() => {
    if (product) {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      setInCart(cart.some(item => item.id === product.id))
    }
  }, [product])

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.some(item => item.id === product.id)) {
      cart.push({
        ...product,
        quantity: 1,
        image: product.images && product.images.length > 0 ? product.images[0].image : null
      });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event('cartUpdated'));
      setInCart(true);
      alert("Added to cart!");
    }
  };

  if (loading) return <div>Loading...</div>
  if (!product) return <div>Product not found.</div>

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center border border-gray-100">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0].image
              : "/placeholder.jpg"
          }
          alt={product.title}
          className="h-48 w-48 object-cover rounded-full mb-4 border-4 border-green-500 shadow"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {product.title}
        </h2>
        <span className="text-green-700 font-bold mb-2 text-lg">
          UGX {product.price}
        </span>
        <p className="text-gray-600 mb-4">{product.description}</p>
        {inCart ? (
          <button
            className="bg-gray-400 cursor-not-allowed text-white px-6 py-2 rounded-full font-semibold shadow"
            disabled
          >
            Already in Cart
          </button>
        ) : (
          <button
            className="bg-green-600 hover:bg-green-800 text-white px-6 py-2 rounded-full font-semibold shadow transition-all duration-200"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductDetails