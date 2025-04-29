import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useContext, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import AboutProduct from '../components/product/AboutProduct';

const Cart = () => {
  const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(CartContext);
  const {
    getCartItems,
    itemsIsLoading,
    itemsError,
    items,
    deleteCartItem,
    deleteIsLoading,
    deleteError,
    deleteSuccess
  } = useContext(CartContext);

  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
  }, [deleteCartItem]);

  // Calculate total price using useMemo for efficiency
  const totalPrice = useMemo(() => {
    return items?.products?.reduce((sum, product) => sum + product.price * product.quantity, 0) || 0;
  }, [items]);

  const handlePayment = () => {
    if (totalPrice > 0) {
      // Navigate to the payment page and pass the total price via state
      navigate('/payment', { state: { totalPrice } });
    } else {
      alert('Your cart is empty.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Cart Items" />

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          
          {/* Cart Items Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {itemsIsLoading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : itemsError ? (
              <p className="text-center text-red-500">Error loading cart items.</p>
            ) : (
              items.products.map((product, index) => (
                <div
                  key={index}
                  onClick={() => getProductDetail(product.productId)}
                  className="group cursor-pointer p-4 border rounded-md shadow-sm transition-transform duration-200 hover:scale-105 hover:shadow-md hover:bg-slate-100 relative"
                >
                  {/* Product Name */}
                  <h3 className="mt-2 text-sm text-gray-700 font-semibold">{product.name}</h3>

                  {/* Product Price */}
                  <p className="mt-1 text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>

                  {/* Product Quantity */}
                  <p className="mt-1 text-sm text-gray-600">Quantity: {product.quantity}</p>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCartItem(product._id);
                    }}
                    className="absolute top-2 right-2 p-2 text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Total Price & Pay Button */}
          <div className="mt-8 p-6 border rounded-lg shadow-md bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span></h2>
            <button
              disabled={totalPrice === 0}
              onClick={handlePayment}
              className={`mt-4 w-full py-3 text-white font-semibold rounded-lg transition-all ${
                totalPrice === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Pay for Cart Items
            </button>
          </div>

          {/* Product Detail Modal */}
          {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}

        </div>
      </div>
    </>
  );
};

export default Cart;
