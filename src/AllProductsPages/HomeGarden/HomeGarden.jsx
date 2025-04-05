import React from 'react';
import { useState, useEffect } from 'react';

const HomeGarden = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Filter products to show only "Home & Garden" category
        const homeGardenProducts = data.filter(
          (product) =>
            product.category === "Outdoor Decor" ||
            product.category === "Gardening Tools" ||
            product.category === "Seeds & Bulbs" ||
            product.category === "Watering & Irrigation" ||
            product.category === "Outdoor Lighting" ||
            product.category === "Outdoor Furniture" ||
            product.category === "Planting & Growing" ||
            product.category === "Lawn Care" ||
            product.category === "Composting & Waste" ||
            product.category === "Pest Control" ||
            product.category === "Outdoor Heating" ||
            product.category === "Outdoor Cooking"
        );

        setProducts(homeGardenProducts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading Home & Garden Products...</div>;
  }

  if (error) {
    return <div>Error loading Home & Garden Products: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Home & Garden</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product._id || product.id} className="bg-white rounded-md shadow-md overflow-hidden">
            <img
              src={product.img}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-md font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.description?.substring(0, 50)}...</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-red-500 font-bold">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through ml-2">{product.oldPrice}</span>
                  )}
                </div>
                {product.rating && (
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">&#9733;</span>
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
              {product.sold && (
                <p className="text-gray-500 text-xs mt-1">{product.sold}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeGarden;