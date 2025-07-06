import React from 'react'
import './App.css'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import AOS from 'aos';
import 'aos/dist/aos.css';
import App from './App'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Categories from './components/Categories'
import CategoryItems from './components/CategoryItems'
import AllFeaturedProducts from './components/AllFeaturedProducts'
import Cart from './components/Cart'
import Signup from './components/Signup'
import Login from './components/Login'
import LatestProductsPage from './components/LatestProductsPage'
import Checkout from './components/Checkout'
import UserProfile from './components/UserProfile'
import Navbar from './components/NavbarNew'
import Footer from './components/Footer'
import { ToastContainer } from "react-toastify";

// Admin Components
import AdminPanel from './components/AdminPanel'
import AdminDashboard from './components/AdminDashboard'
import ProductManagement from './components/ProductManagement'
import OrderManagement from './components/OrderManagement'
import CustomerManagement from './components/CustomerManagement'

// Layout wrapper component for regular pages
const Layout = ({ children }) => (
  <>
    <Navbar />
    <div className="pt-28">
      {children}
    </div>
    <Footer />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
  </>
);

AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  mirror: false,
  offset: 100,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Main Application Route */}
        <Route path="/" element={<App />} />
        
        {/* User Pages with Navbar */}
        <Route path="/products" element={
          <Layout>
            <Products />
          </Layout>
        } />
        <Route path="/product/:name" element={
          <Layout>
            <ProductDetails />
          </Layout>
        } />
        <Route path="/category/:id" element={
          <Layout>
            <CategoryItems />
          </Layout>
        } />
        <Route path="/categories" element={
          <Layout>
            <Categories />
          </Layout>
        } />
        <Route path="/featured" element={
          <Layout>
            <AllFeaturedProducts />
          </Layout>
        } />
        <Route path="/cart" element={
          <Layout>
            <Cart />
          </Layout>
        } />
        <Route path="/signup" element={
          <Layout>
            <Signup />
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <Login />
          </Layout>
        } />
        <Route path="/latest" element={
          <Layout>
            <LatestProductsPage />
          </Layout>
        } />
        <Route path="/checkout" element={
          <Layout>
            <Checkout />
          </Layout>
        } />
        <Route path="/profile" element={
          <Layout>
            <UserProfile />
          </Layout>
        } />
        
        {/* Admin Panel Routes - Separate from main site */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="categories" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-600">Categories Management Coming Soon</h2></div>} />
          <Route path="analytics" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-600">Analytics Dashboard Coming Soon</h2></div>} />
          <Route path="settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold text-gray-600">Settings Panel Coming Soon</h2></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
