import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import CategoryItems from './components/CategoryItems'
import AllFeaturedProducts from './components/AllFeaturedProducts'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Login from './components/Login'
import LatestProductsPage from './components/LatestProductsPage'
import Checkout from './components/Checkout'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:name" element={<ProductDetails />} />
        <Route path="/category/:id" element={<CategoryItems />} />
        <Route path="/featured" element={<AllFeaturedProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/latest" element={<LatestProductsPage />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
