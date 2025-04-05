import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faWallet,
  faMobileAlt,
  faArrowLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const PaymentOptions = ({ product, onClose, onPayment }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");

  if (!product) {
    return <div className="text-center text-gray-700">No product selected for payment.</div>;
  }

  const totalAmount = product.price * product.quantity;

  const handleCreditCardPayment = () => {
    setShowCardForm(true);
  };

  const handleConfirmPurchase = () => {
    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardHolderName) {
      alert("Please fill in all card details.");
      return;
    }

    // Here, you would typically send the card information to your backend for processing.
    // For demonstration, we'll just log the details and simulate a successful purchase.
    console.log("Card Details:", {
      cardNumber,
      expiryDate,
      cvv,
      cardHolderName,
    });
    console.log("Purchase confirmed for:", product.name);

    onPayment("Credit Card"); // Notify parent component of payment success
    onClose(); // Close the payment options
  };

  if (showCardForm) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative border border-gray-200">
          <button
            onClick={() => setShowCardForm(false)}
            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none text-lg"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Enter Card Details</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Expiry Date (MM/YY)</label>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Card Holder Name</label>
            <input
              type="text"
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            onClick={handleConfirmPurchase}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            Confirm Purchase
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative border border-gray-200">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 focus:outline-none text-lg"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <button
          onClick={onClose}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-900 focus:outline-none text-sm flex items-center"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-1" /> Back
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Choose Payment Method</h2>

        <div className="bg-gray-100 p-4 rounded-md shadow-sm mb-4">
          <p className="text-gray-700 font-medium">{product.name}</p>
          <p className="text-gray-600 text-sm">Quantity: {product.quantity}</p>
          <p className="text-gray-900 font-semibold">Total: BDT {totalAmount.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleCreditCardPayment}
            className="flex items-center justify-between bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-300 rounded-md p-3 cursor-pointer transition duration-300"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCreditCard} className="mr-3" /> Credit/Debit Card
            </div>
            <FontAwesomeIcon icon={faCreditCard} className="text-blue-500" />
          </button>

          <button
            onClick={() => onPayment("Mobile Banking")}
            className="flex items-center justify-between bg-green-50 hover:bg-green-100 text-green-700 border border-green-300 rounded-md p-3 cursor-pointer transition duration-300"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faMobileAlt} className="mr-3" /> Mobile Banking (Bkash, Nagad, Rocket)
            </div>
            <FontAwesomeIcon icon={faMobileAlt} className="text-green-500" />
          </button>

          <button
            onClick={() => onPayment("Wallet")}
            className="flex items-center justify-between bg-yellow-50 hover:bg-yellow-100 text-yellow-700 border border-yellow-300 rounded-md p-3 cursor-pointer transition duration-300"
          >
            <div className="flex items-center">
              <FontAwesomeIcon icon={faWallet} className="mr-3" /> Online Wallet (PayPal, etc.)
            </div>
            <FontAwesomeIcon icon={faWallet} className="text-yellow-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;