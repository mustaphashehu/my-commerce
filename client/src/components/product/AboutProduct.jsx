import { useEffect, useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ReviewContext } from "../../context/ReviewContext";
import { CartContext } from "../../context/CartContext";

const AboutProduct = ({ onClose }) => {
  const myImg = [
    "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360",
  ];

  const { product, productIsLoading, productError, deleteProduct } = useContext(ProductContext);
  const { reviews, fetchReviews, createReview, reviewData, reviewInput, reviewIsLoading, reviewError } = useContext(ReviewContext);
  const { addToCart, addIsLoading, addError, addSuccess } = useContext(CartContext);

  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('')
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  useEffect(() => {
    if (!product) {
      onClose();
    }
  }, [product, onClose]);

  const handleCloseModal = (e) => {
    if (e.target.id === "modal-overlay") {
      onClose();
    }
  };

  if (productIsLoading) return <p>Loading...</p>;
  if (productError) return <p>Error: {productError}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div
      id="modal-overlay"
      onClick={handleCloseModal}
      className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50 p-4"
    >
      <div
        className="bg-[#0d4e78] text-white rounded-lg shadow-lg w-full max-w-2xl max-h-[70vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full px-3 py-1 font-semibold"
        >
          ×
        </button>

        <div className="flex flex-col gap-4 items-center text-center">
          <img src={`http://localhost:4000/${product.mainImage}`} className="w-40 h-40 object-cover rounded-md" />
          <h1 className="text-xl font-bold">{product.name}</h1>
          <p className="text-lg">{product.description}</p>
          <h2 className="text-lg font-semibold">Price: ${product.price}</h2>
        </div>

        {/* <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <button onClick={decreaseQuantity} className="bg-gray-300 px-3 py-1 rounded text-lg font-bold">−</button>
            <span className="text-lg font-medium w-6 text-center">{quantity}</span>
            <button onClick={increaseQuantity} className="bg-gray-300 px-3 py-1 rounded text-lg font-bold">+</button>
          </div>
          <button
            onClick={() => addToCart(product._id, quantity, product.price, product.name)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div> */}


        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center space-x-2">
            <button onClick={decreaseQuantity} className="bg-gray-300 px-3 py-1 rounded text-lg font-bold">−</button>
            <span className="text-lg font-medium w-6 text-center">{quantity}</span>
            <button onClick={increaseQuantity} className="bg-gray-300 px-3 py-1 rounded text-lg font-bold">+</button>
          </div>

          {/* Postal Code and Delivery Address */}
          <div className="mt-4 w-full max-w-md">
            <input
              type="text"
              placeholder="Enter Postal Code"
              className="w-full px-4 py-2 text-black-2 mb-3 border border-gray-300 rounded-lg text-lg"
              onChange={(e) => setPostalCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full px-4 py-2 text-black-2 mb-3 border border-gray-300 rounded-lg text-lg"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <textarea
              placeholder="Enter Delivery Address"
              className="w-full text-black-2 px-4 py-2 mb-3 border border-gray-300 rounded-lg text-lg"
              rows="4"
              onChange={(e) => setDeliveryAddress(e.target.value)}
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(product._id, quantity, product.price, product.name, postalCode, phoneNumber, deliveryAddress)}
            className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {addIsLoading ? 'Adding...' : 'Add to Cart'}
          </button>

          {/* Error/Success Messages */}
          {addError && <div className="mt-3 text-red-600">{addError}</div>}
          {addSuccess && <div className="mt-3 text-green-600">{addSuccess}</div>}
        </div>

        <div className="mt-6">
          <button className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={() => deleteProduct(product._id)}>
            Delete Product
          </button>
          <h3 className="text-xl font-semibold text-center">{reviews.length > 0 ? "Reviews" : "No Reviews Yet"}</h3>
          {reviews.length === 0 && (
            <button onClick={fetchReviews} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Fetch Reviews
            </button>
          )}
          <ul className="mt-4 space-y-3 text-sm">
            {reviews.map((review, index) => (
              <li key={index} className="border-b border-gray-700 pb-2">
                <p className="font-medium">{review.name}</p>
                <p>{review.comment}</p>
                <p className="text-xs text-gray-400">Rating: {review.rating} / 5</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-center">Add a Review</h3>
          <form onSubmit={createReview} className="space-y-3">
            <textarea
              name="comment"
              value={reviewData.comment}
              onChange={reviewInput}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              placeholder="Write your review"
            />
            <input
              type="number"
              name="rating"
              value={reviewData.rating}
              onChange={reviewInput}
              className="w-full px-3 py-2 border border-gray-300 rounded text-black"
              placeholder="Enter rating (1-5)"
              min="1"
              max="5"
            />
            <button
              type="submit"
              className={`w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition ${reviewIsLoading ? "opacity-50 cursor-not-allowed" : reviewError ? "bg-red-500" : ""}`}
            >
              {reviewIsLoading ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutProduct;