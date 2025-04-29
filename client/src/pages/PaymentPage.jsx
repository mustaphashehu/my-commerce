import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PaymentPage = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const handleButtonClick = () => {
    setShowPaymentForm(true);
  };

  if (user.role !== "customer") {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-red-600">Not Allowed</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!showPaymentForm ? (
        <button
          className="px-6 py-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
          onClick={handleButtonClick}
        >
          Proceed to Payment
        </button>
      ) : (
        <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-2xl">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>

          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium">
              Card Number
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 font-medium">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cvv" className="block text-gray-700 font-medium">
              CVV
            </label>
            <input
              id="cvv"
              type="password"
              placeholder="123"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nameOnCard" className="block text-gray-700 font-medium">
              Name on Card
            </label>
            <input
              id="nameOnCard"
              type="text"
              placeholder="John Doe"
              className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button className="w-full px-6 py-3 text-white bg-green-600 rounded-lg shadow hover:bg-green-700">
            Submit Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
