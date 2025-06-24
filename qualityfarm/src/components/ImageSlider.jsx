import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const backendUrl = "https://qualityfarm-b-1.onrender.com"; // adjust if needed

function shuffle(array) {
  // Fisher-Yates shuffle
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }
  return array;
}

const ImageSlider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/items/`)
      .then(res => res.json())
      .then(data => {
        // Collect all images from all products
        let imgs = [];
        data.forEach(product => {
          if (product.images && product.images.length > 0) {
            product.images.forEach(imgObj => {
              if (imgObj.image) {
                imgs.push(
                  imgObj.image.startsWith("http")
                    ? imgObj.image
                    : backendUrl + imgObj.image
                );
              }
            });
          }
        });
        setImages(shuffle(imgs).slice(0, 10)); // Show up to 10 random images
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    arrows: true,
    pauseOnHover: true,
  }

  return (
    <div className="w-[90%] mx-auto mt-6 shadow rounded-2xl overflow-hidden">
      <Slider {...settings}>
        {images.length === 0 ? (
          <div>
            <img
              src="/placeholder.jpg"
              alt="No product"
              className="w-full h-64 object-cover rounded-2xl"
            />
          </div>
        ) : (
          images.map((img, idx) => (
            <div key={idx}>
              <img
                src={img}
                alt={`slide-${idx}`}
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
          ))
        )}
      </Slider>
    </div>
  )
}

export default ImageSlider
