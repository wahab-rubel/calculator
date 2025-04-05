import React from "react";
import { useNavigate } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-2xl font-bold text-green-600">🎉 Order Confirmed!</h1>
      <p className="text-gray-600">Thank you for your order. We will contact you soon.</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
