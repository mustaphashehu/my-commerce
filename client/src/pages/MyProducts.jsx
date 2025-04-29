import { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import AboutProduct from "../components/product/AboutProduct";
import { CheckCircleIcon } from "@heroicons/react/solid";

const MyProducts = () => {
  const {
    myProducts,
    getMyProducts,
    getProductDetail,
    isModalOpen,
    setIsModalOpen,
  } = useContext(ProductContext);

  useEffect(() => {
    getMyProducts();
  }, []);

  return (
    <div className="bg-gradient-to-br from-white to-slate-100 min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-10">
          My Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-8">
          {myProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => getProductDetail(product._id)}
              className="bg-white/70 backdrop-blur-sm border border-gray-200 shadow-md hover:shadow-xl transition-all rounded-2xl p-4 cursor-pointer group"
            >
              {/* Image */}
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={
                    product?.mainImage
                      ? `http://localhost:4000/${product.mainImage}`
                      : "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
                  }
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Info */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-slate-800 truncate">
                  {product.name}
                </h3>
                {product.company && (
                  <p className="text-sm text-gray-500">{product.company}</p>
                )}
                <div className="mt-2 flex items-center justify-center gap-2 text-emerald-600 font-bold text-md">
                  ${product.price}
                  {product.isVerified && (
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default MyProducts;
