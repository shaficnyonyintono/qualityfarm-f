import './App.css'
import Navbar from './components/Navbar'
import Body from './components/Body'
import FeaturedProducts from './components/FeaturedProducts'
import Categories from './components/Categories'
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
        className="mt-35"
      >
        <Body />
        <div>
          <FeaturedProducts />
        </div>
        <div>
          <Categories />
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
