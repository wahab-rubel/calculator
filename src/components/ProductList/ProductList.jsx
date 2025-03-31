import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "./Features/CartSlice"; // Adjust the import based on file location

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProductData());
  }, [dispatch]);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      {items.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          {/* Render more product details here */}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
