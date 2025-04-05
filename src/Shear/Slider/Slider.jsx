import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "https://i.ibb.co.com/X8ygKWy/iphone14proproductshots-1-8.webp",
  "https://i.ibb.co.com/31JLQjt/d5ba7d10-9111-450f-8d1b-be2b65d8c06c-CR0-0-600-450-PT0-SX600-V1.png",
  "https://i.ibb.co.com/31JLQjt/d5ba7d10-9111-450f-8d1b-be2b65d8c06c-CR0-0-600-450-PT0-SX600-V1.png",
  "https://i.ibb.co.com/31JLQjt/d5ba7d10-9111-450f-8d1b-be2b65d8c06c-CR0-0-600-450-PT0-SX600-V1.png",
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000); // Auto-slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-xl">
      {/* Image Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
      >
        <ChevronLeft size={30} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-60 p-3 rounded-full text-white hover:bg-opacity-80"
      >
        <ChevronRight size={30} />
      </button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
