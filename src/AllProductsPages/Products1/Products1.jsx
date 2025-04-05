/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faTimes,
  faStar,
  faHeart,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "@fortawesome/fontawesome-svg-core/styles.css"; // Import the CSS
import PaymentOptions from "../PaymentOptions/PaymentOptions";
config.autoAddCss = false; // Prevent auto adding CSS which can cause conflicts

const MyProducts1 = () => {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [wishlist, setWishlist] = useState([]); 

  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        console.log("Fetched Data:", response.data);
        setProductsData(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data from server.");
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


  const handleShowDetails = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setMainImage(product.img || "/default-image.jpg"); // Set initial main image
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
    setIsImageZoomed(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleImageMouseEnter = () => {
    setIsImageZoomed(true);
  };

  const handleImageMouseLeave = () => {
    setIsImageZoomed(false);
    setZoomPosition({ x: 0, y: 0 });
  };

  const handleImageMouseMove = (e) => {
    if (!isImageZoomed || !selectedProduct?.img) return;

    const image = e.target;
    const rect = image.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const zoomX = (offsetX / rect.width) * 100;
    const zoomY = (offsetY / rect.height) * 100;

    setZoomPosition({ x: zoomX, y: zoomY });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`star ${
            i < rating ? "text-yellow-500" : "text-gray-300"
          } mr-1`}
        />
      );
    }
    return <div>{stars}</div>;
  };

  const handleAddToCartClick = (product) => {
    console.log(`Attempting to add ${product.name} (Quantity: ${quantity}) to cart and show payment options`);
    console.log("Product before setting selectedProduct:", product);
    setSelectedProduct({ ...product, quantity }); // Ensure 'quantity' is included here
    console.log("selectedProduct after setting:", { ...product, quantity });
    setShowPaymentOptions(true);
  };


  const handlePayment = (paymentMethod) => {
    if (selectedProduct) {
      const priceString = selectedProduct.price;
      const cleanedPriceString = priceString.replace('BDT', '').replace(',', ''); // Remove "BDT" and comma
      const price = parseFloat(cleanedPriceString);
      const quantity = parseInt(selectedProduct.quantity, 10);
  
      if (isNaN(price) || isNaN(quantity)) {
        console.error("Invalid price or quantity:", price, quantity);
        alert("Error: Invalid price or quantity. Please try again.");
        return;
      }
  
      const totalAmount = price * quantity;
      console.log("totalAmount:", totalAmount);
      alert(`Payment initiated with ${paymentMethod} for ${selectedProduct.name} (Quantity: ${quantity}, Total: BDT ${totalAmount.toFixed(2)})`);
      setShowPaymentOptions(false);
      setSelectedProduct(null);
    } else {
      console.log("selectedProduct is null in handlePayment");
    }
  };

  const handleAddToWishlist = (product) => {
    const isAlreadyInWishlist = wishlist.some((item) => item.id === product.id);
    if (!isAlreadyInWishlist) {
      setWishlist([...wishlist, product]);
      alert(`${product.name} added to wishlist!`);
    } else {
      alert(`${product.name} is already in your wishlist!`);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Today's Deals</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {productsData.map((category, index) => (
          <div
            key={category.id || index}
            className="border p-4 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl">{category.icon}</span>
              <h3 className="text-lg font-bold">{category.category}</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">{category.title}</p>

            {category.products && category.products.length > 0 ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 1 },
                }}
                pagination={category.products.length > 2 ? true : false}
                navigation={category.products.length > 2 ? true : false}
                modules={[Pagination, Navigation]}
                className="mt-4"
              >
                {category.products.map((product, idx) => (
                  <SwiperSlide key={product.id || idx}>
                    <div className="text-center p-2">
                      <div className="relative rounded-md overflow-hidden mb-2">
                        <img
                          src={product.img || "/default-image.jpg"}
                          alt={product.name || "Product Image"}
                          className="w-full h-48 object-contain rounded-md transition-transform duration-300 hover:scale-105"
                        />
                        {product.discount && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                            {product.discount}
                          </div>
                        )}
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
                        <p className="text-yellow-500 text-xs flex items-center">
                          {renderStars(product.rating)} {product.rating}
                        </p>
                        <p className="text-gray-500 text-xs ml-2">
                          ({product.reviews ? product.reviews.length : "0"}{" "}
                          reviews)
                        </p>
                      </div>
                      <p className="text-gray-500 text-xs mt-1">
                        Sold: {product.sold}
                      </p>
                      <div className="mt-2 flex justify-center">
                        <button
                          onClick={() => handleShowDetails(product)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
                        >
                          View Details
                        </button>
                      </div>
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

      {/* Modal for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-4/5 lg:w-3/4 relative">
            {/* Close Button */}
            <button
              onClick={handleCloseDetails}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <div className="md:flex md:space-x-6">
              {/* Product Image Section */}
              <div className="md:w-1/2 mb-4 md:mb-0 relative overflow-hidden rounded-md">
                <div
                  className={`relative w-full h-96 bg-gray-100 flex items-center justify-center cursor-zoom-in ${
                    isImageZoomed ? "scale-150 transform-origin-top-left" : ""
                  }`}
                  style={{
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: isImageZoomed ? "auto" : "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: isImageZoomed
                      ? `${zoomPosition.x}% ${zoomPosition.y}%`
                      : "center",
                  }}
                  onMouseEnter={handleImageMouseEnter}
                  onMouseLeave={handleImageMouseLeave}
                  onMouseMove={handleImageMouseMove}
                >
                  {!mainImage && (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                {selectedProduct.images &&
                  selectedProduct.images.length > 1 && (
                    <div className="flex mt-2 space-x-2 overflow-auto">
                      {[selectedProduct.img, ...selectedProduct.images]
                        .filter(Boolean)
                        .map((imgUrl, index) => (
                          <button
                            key={index}
                            onClick={() => handleThumbnailClick(imgUrl)}
                            className={`w-20 h-20 rounded-md overflow-hidden border ${
                              mainImage === imgUrl
                                ? "border-blue-500"
                                : "border-gray-300"
                            } hover:border-blue-500 focus:outline-none`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                    </div>
                  )}
              </div>

              {/* Product Details Section */}
              <div className="md:w-1/2">
                <h2 className="text-xl font-bold mb-2">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center mb-2">
                  <p className="text-yellow-500 text-sm flex items-center mr-2">
                    {renderStars(selectedProduct.rating)}{" "}
                    {selectedProduct.rating}
                  </p>
                  <p className="text-gray-500 text-sm">
                    (
                    {selectedProduct.reviews
                      ? selectedProduct.reviews.length
                      : "0"}{" "}
                    reviews)
                  </p>
                  <p className="text-gray-500 text-sm ml-4">
                    Sold: {selectedProduct.sold}
                  </p>
                </div>
                {selectedProduct.discountPercentage && (
                  <div className="bg-red-100 text-red-500 py-1 px-2 rounded-full text-sm inline-block mb-2">
                    {selectedProduct.discountPercentage} off
                  </div>
                )}
                <div className="mb-4">
                  <p className="text-red-600 font-bold text-2xl">
                    BDT {selectedProduct.price}
                  </p>
                  {selectedProduct.oldPrice && (
                    <p className="text-gray-400 line-through text-lg">
                      BDT {selectedProduct.oldPrice}
                    </p>
                  )}
                  {selectedProduct.taxIncluded && (
                    <p className="text-gray-500 text-xs mt-1">
                      Tax included, add at checkout if applicable
                    </p>
                  )}
                  {selectedProduct.wholesaleDiscount && (
                    <p className="text-green-500 text-xs mt-1">
                      {selectedProduct.wholesaleDiscount}
                    </p>
                  )}
                </div>
                <p className="text-gray-700 mb-4">
                  {selectedProduct.description || "No description available."}
                </p>

                {/* Color Options (Example - Adapt to your data) */}
                {selectedProduct.colors &&
                  selectedProduct.colors.length > 0 && (
                    <div className="mb-4">
                      <label className="mr-3 font-semibold">Color:</label>
                      <div className="flex items-center space-x-2">
                        {selectedProduct.colors.map((color, index) => (
                          <button
                            key={index}
                            className={`w-8 h-8 rounded-full border ${
                              selectedProduct.selectedColor === color
                                ? "border-blue-500"
                                : "border-gray-300"
                            } focus:outline-none`}
                            style={{ backgroundColor: color }}
                            onClick={() =>
                              console.log(`Selected color: ${color}`)
                            } // Implement color selection logic
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {/* Quantity Selector */}
                <div className="flex items-center mb-4">
                  <label className="mr-3 font-semibold">Quantity:</label>
                  <div className="flex border rounded-md overflow-hidden">
                    <button
                      className="px-3 py-2 hover:bg-gray-200 focus:outline-none"
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-16 text-center focus:outline-none"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="px-3 py-2 hover:bg-gray-200 focus:outline-none"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  {selectedProduct.availableQuantity && (
                    <p className="text-gray-500 text-sm ml-3">
                      {selectedProduct.availableQuantity} available
                    </p>
                  )}
                </div>

                {/* Add to Cart and Wishlist Buttons */}


                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => handleAddToCartClick(selectedProduct)}
                    className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 text-black font-semibold py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out flex items-center justify-center mb-2"
                  >
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    Add to Cart
                  </button>

                  <button
                  onClick={() => handleAddToWishlist(selectedProduct)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out flex items-center justify-center"
                >
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  Wishlist
                </button>

                </div>

                {/* AliExpress Commitment (Example) */}
                <div className="border p-3 rounded-md bg-red-50 bg-opacity-20 mb-4">
                  <h4 className="text-sm font-semibold text-red-500 mb-1">
                    AliExpress commitment
                  </h4>
                  <p className="text-gray-600 text-xs">
                    <FontAwesomeIcon icon={faShippingFast} className="mr-1" />{" "}
                    Shipping: BDT{selectedProduct.shippingCost || "N/A"}
                  </p>
                  <p className="text-gray-600 text-xs">
                    Delivery: {selectedProduct.deliveryDate || "N/A"}
                  </p>
                  <p className="text-blue-500 text-xs cursor-pointer">
                    Return & refund policy
                  </p>
                </div>

                {/* Security & Privacy (Example) */}
                <div className="border p-3 rounded-md bg-gray-100 mb-4">
                  <h4 className="text-sm font-semibold mb-1">
                    Security & Privacy
                  </h4>
                  <p className="text-gray-600 text-xs">
                    Safe payments: We do not share your pers...
                  </p>
                  <p className="text-gray-600 text-xs">
                    Secure personal details: We protect your p...
                  </p>
                </div>

                {/* Sold By (Example) */}
                {selectedProduct.soldBy && (
                  <div className="border p-3 rounded-md bg-gray-100">
                    <h4 className="text-sm font-semibold mb-1">Sold by</h4>
                    <p className="text-blue-500 text-xs cursor-pointer">
                      {selectedProduct.soldBy}
                    </p>
                    {/* You can add more seller details here */}
                  </div>
                )}

                {/* Payment Options Modal */}
                {showPaymentOptions && selectedProduct && (
                  <PaymentOptions
                    product={selectedProduct}
                    onClose={() => setShowPaymentOptions(false)}
                    onPayment={handlePayment}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProducts1;
