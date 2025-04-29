import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import AboutProduct from '../components/product/AboutProduct';
import { ProductContext } from '../context/ProductContext';

const OrderedProducts = () => {
  const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);
  const {
    getOrders,
    orders,
    ordersIsLoading,
    ordersError
  } = useContext(CartContext);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <>
      <Breadcrumb pageName="Customer Orders" />

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Customer Orders</h2>

          {/* Orders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ordersIsLoading ? (
              <p className="text-center text-gray-600 text-lg">Loading orders...</p>
            ) : ordersError ? (
              <p className="text-center text-red-500 text-lg">Error loading orders.</p>
            ) : orders.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div
                  key={index}
                  onClick={() => getProductDetail(order.productId)}
                  className="group cursor-pointer p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-transform duration-200 hover:scale-105"
                >
                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-gray-800">{order.name}</h3>

                  {/* Product Price & Quantity */}
                  <p className="mt-2 text-gray-700">
                    <span className="font-semibold">Price:</span> ${order.price.toFixed(2)}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Quantity:</span> {order.quantity}
                  </p>

                  {/* Customer Details */}
                  <div className="mt-4 border-t pt-4">
                    <p className="text-gray-800 font-medium">{order.customerName}</p>
                    <p className="text-gray-600 text-sm">{order.deliveryAddress}</p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Phone:</span> {order.phoneNumber}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Postal Code:</span> {order.postalCode}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Product Detail Modal */}
          {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}
        </div>
      </div>
    </>
  );
};

export default OrderedProducts;

