import './App.css'
import Navbar from './components/NavbarNew'
import HeroSection from './components/HeroSection'
import FeaturedProducts from './components/FeaturedProductsProfessional'
import CategoriesSlider from './components/CategoriesSlider'
import LatestProducts from './components/LatestProducts'
import BestSelling from './components/BestSelling'
import Footer from './components/Footer'
import AIAssistant from './components/AIAssistant'
import { useEffect } from 'react'
import { ToastContainer } from "react-toastify";

function App() {
  // Fade-in animation for main content
  useEffect(() => {
    const main = document.getElementById('main-content')
    if (main) {
      main.classList.add('animate-fadein')
    }
  }, [])

  return (
    <>
      <div className="w-full">
        <Navbar />
      </div>
      <div
        id="main-content"
        className="pt-14 md:pt-20 lg:pt-24"
      >
        <HeroSection />
        <div>
          <FeaturedProducts />
        </div>
        <div>
          <CategoriesSlider />
        </div>
        <div>
          <LatestProducts />
        </div>
        <div>
          <BestSelling />
        </div>
      </div>
      <AIAssistant />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App

/* Add this to your App.css or global CSS:
@keyframes fadein {
  to { opacity: 1; }
}
.animate-fadein {
  animation: fadein 1s ease forwards;
}
*/
