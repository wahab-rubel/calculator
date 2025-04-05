import { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaStar, FaStarHalfAlt, FaRegStar, FaTimes } from "react-icons/fa";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch products.");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // ⭐ Safe Review Function (Prevents Invalid Array Length Error)
  const renderStars = (rating) => {
    const validRating =
      typeof rating === "number" && rating >= 0 && rating <= 5 ? rating : 0;
    const fullStars = Math.floor(validRating);
    const hasHalfStar = validRating % 1 !== 0;
    const emptyStars = Math.max(0, 5 - fullStars - (hasHalfStar ? 1 : 0)); // Ensure non-negative

    return (
      <div className="flex text-yellow-500 mt-4">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={i} />
        ))}
      </div>
    );
  };

  const handleProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handlePaymentOptions = (product) => {
    setSelectedProduct(product);
    setShowPaymentOptions(true);
  };

  const closeDetails = () => {
    setSelectedProduct(null);
  };

  const closePaymentOptions = () => {
    setShowPaymentOptions(false);
    setSelectedProduct(null);
  };

  return (
    <section className="container mx-auto py-16 px-24">
      <h1 className="text-3xl text-center font-bold mb-8 text-gray-800">
        All Products
      </h1>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-3 shadow-md rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-200 transform hover:-translate-y-1"
          >
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h2 className="mt-3 font-semibold text-lg text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {product.description?.slice(0, 50) || "No description available"}
              ...
            </p>
            <p className="text-gray-800 text-lg font-bold mt-2">
              {product.price} MAD
            </p>

            {/* Review Stars */}
            {renderStars(product.rating)}

            {/* Product Details Button */}
            <button
              onClick={() => handleProductDetails(product)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 shadow-md transition-all transform hover:scale-105"
            >
              <BsArrowRight size={20} />
              Product Details
            </button>

            {/* Payment Options Button */}
            <button
              onClick={() => handlePaymentOptions(product)}
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 shadow-md transition-all transform hover:scale-105"
            >
              <BsArrowRight size={20} />
              Order Now
            </button>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-11/12 md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-y-auto relative p-8">
            <button
              onClick={closeDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <FaTimes className="text-xl" />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full rounded-xl object-cover mb-4 aspect-square"
                />
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-semibold mb-4 text-gray-900">
                  {selectedProduct.title}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedProduct.description || "No description available"}
                </p>
                <div className="flex items-center mb-4">
                  <p className="text-2xl font-bold text-indigo-600 mr-4">
                    {selectedProduct.price} MAD
                  </p>
                  {renderStars(selectedProduct.rating)}
                </div>
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentOptions && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative p-8">
            <button
              onClick={closePaymentOptions}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition-colors duration-300"
            >
              <FaTimes className="text-xl" />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">
              Payment Options
            </h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                Credit/Debit Card
              </button>
              <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors duration-300">
                Mobile Banking (bKash, Nagad, etc.)
              </button>
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-800 font-semibold py-3 rounded-lg transition-colors duration-300">
                Cash on Delivery
              </button>
            </div>
            <p className="mt-6 text-sm text-gray-600 text-center">
              Total: {selectedProduct.price} MAD
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default MyProducts;
