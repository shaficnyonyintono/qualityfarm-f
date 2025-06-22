import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-green-950 text-white pt-10">
    <div className="max-w-7xl mx-auto px-4">
      {/* Call to Action */}
      <div className="flex flex-col md:flex-row items-center justify-between py-8 border-b border-green-800">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Join QualityFarm Today</h2>
          <p className="text-green-200 text-sm">
            Get the freshest produce and best farm deals delivered to your door.
          </p>
        </div>
        <form className="flex w-full md:w-auto">
          <input
            type="email"
            placeholder="Your email"
            className="rounded-l px-4 py-2 text-gray-800 focus:outline-none w-full md:w-64"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-r font-semibold"
          >
            Subscribe
          </button>
        </form>
      </div>
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-10">
        {/* Brand */}
        <div>
          <h3 className="font-extrabold text-2xl mb-3 tracking-tight">QualityFarm</h3>
          <p className="text-sm mb-4 opacity-80">
            Get the freshest produce and best farm deals delivered to your door.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-green-300"
            >
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-green-300"
            >
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-green-300"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-green-300"
            >
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="hover:underline">
                Categories
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        {/* Customer Service */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/support" className="hover:underline">
                Support
              </Link>
            </li>
          </ul>
        </div>
        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4 text-lg">Contact</h4>
          <p className="text-sm mb-1">
            Email:{" "}
            <a href="mailto:support@qualityfarm.com" className="hover:underline">
              support@qualityfarm.com
            </a>
          </p>
          <p className="text-sm mb-1">
            Phone:{" "}
            <a href="tel:+256740432030" className="hover:underline">
              +256 740432030
            </a>
          </p>
          <p className="text-sm mb-4">Address: Kampala, Uganda</p>
        </div>
      </div>
      {/* Legal */}
      <div className="flex flex-col md:flex-row items-center justify-between py-5 text-xs text-green-200 border-t border-green-800">
        <span>&copy; {new Date().getFullYear()} QualityFarm. All rights reserved.</span>
        <div className="space-x-4 mt-2 md:mt-0">
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;