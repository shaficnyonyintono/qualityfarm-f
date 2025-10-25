import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"

function ProductDetails() {
  const { name } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    fetch(
      `https://qualityfarm-b-1.onrender.com/items/?search=${encodeURIComponent(name)}`
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
      toast.success("Added to cart!");
    }
  };

  if (loading) return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-6 md:py-8">
          <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-3 text-sm md:text-base text-gray-600">Loading product details...</p>
        </div>
      </div>
    </div>
  );
  
  if (!product) return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-8 md:py-10">
          <i className="fas fa-box-open text-4xl md:text-5xl text-gray-300 mb-3 md:mb-4"></i>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Product not found</h2>
          <p className="text-sm md:text-base text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-16 md:pt-20 px-3 md:px-4 pb-6 md:pb-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 lg:p-8 flex flex-col items-center border border-gray-100">
          <img
            src={
              product.images && product.images.length > 0
                ? product.images[0].image
                : "/placeholder.jpg"
            }
            alt={product.title}
            className="h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 object-cover rounded-full mb-3 md:mb-4 border-2 md:border-4 border-green-500 shadow"
          />
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-1.5 md:mb-2 text-center">
            {product.title}
          </h2>
          <span className="text-green-700 font-bold mb-2 md:mb-3 text-base md:text-lg">
            UGX {new Intl.NumberFormat('en-UG').format(product.price)}
          </span>
          <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base text-center">{product.description}</p>
          {inCart ? (
            <button
              className="bg-gray-400 cursor-not-allowed text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold shadow"
              disabled
            >
              Already in Cart
            </button>
          ) : (
            <button
              className="bg-green-600 hover:bg-green-800 text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold shadow transition-all duration-200"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails