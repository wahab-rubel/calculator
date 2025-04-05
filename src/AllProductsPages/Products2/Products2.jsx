/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

import "swiper/css";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

const Products2 = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get("/products.json");
        console.log("Fetched Data:", response.data);
        if (Array.isArray(response.data)) {
          setProductsData(response.data);
        } else {
          setError("Data fetched is not an array.");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching data from products.json.");
        setLoading(false);
      }
    };

    fetchProductsData();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Special Offers</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {productsData.map((category) => (
          <div key={category.id} className="border p-4 rounded-xl shadow-md">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl"> {/* Add your icon here */}</span>
              <h3 className="text-lg font-bold">{category.category}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{category.title}</p>

            {category.products && category.products.length > 0 ? (
              <Swiper spaceBetween={10} slidesPerView={1} className="mt-4">
                {category.products.map((product) => (
                  <SwiperSlide key={product._id}>
                    <div className="text-center p-2">
                      <div className="relative rounded-md overflow-hidden mb-2">
                        <img
                          src={product.img || "/default-image.jpg"}
                          alt={product.name || "Product Image"}
                          className="w-full h-48 object-contain rounded-md transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-gray-800 truncate">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-center mt-1">
                        <p className="text-red-600 font-bold text-lg">
                          ${product.price}
                        </p>
                        {product.oldPrice && (
                          <p className="text-gray-400 line-through text-xs ml-2">
                            ${product.oldPrice}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center justify-center mt-1">
                        <p className="text-yellow-500 text-xs">
                          ⭐ {product.rating}
                        </p>
                        <p className="text-gray-500 text-xs ml-2">
                          ({product.reviews || "0"} reviews)
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        Sold: {product.sold}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 text-black font-semibold py-2 px-4 rounded-md mt-2 text-sm transition duration-300 ease-in-out"
                      >
                        <FontAwesomeIcon
                          icon={faShoppingCart}
                          className="mr-2"
                        />
                        Add to Cart
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-gray-500 text-sm">
                No products in this category.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products2;