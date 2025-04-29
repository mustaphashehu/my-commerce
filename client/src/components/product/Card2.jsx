// import { useContext } from "react";
// import { ProductContext } from "../../context/ProductContext";
// import AboutProduct from "./AboutProduct";
// import { CheckCircleIcon } from "@heroicons/react/solid"; // Importing a checkmark icon

// const Card2 = ({ products }) => {
//     const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);

//     return (
//         <div className="bg-white py-16">
//             <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                 <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
//                     {products.map((product) => (
//                         <div 
//                             key={product._id} 
//                             onClick={() => getProductDetail(product._id)} 
//                             className="group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
//                         >
//                             <div className="w-full h-48 bg-gray-200 flex justify-center items-center">
//                                 <img
//                                     src={
//                                         product?.mainImage
//                                             ? `http://localhost:4000/${product.mainImage}`
//                                             : "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
//                                     }
//                                     alt={product.name}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>
//                             <div className="p-4">
//                                 <div className="flex items-center space-x-2">
//                                     <h3 className="text-sm font-medium text-gray-900 truncate">{product.name}</h3>
//                                     {product.isVerified && (
//                                         <CheckCircleIcon className="h-5 w-5 text-green-500" />
//                                     )}
//                                 </div>
//                                 <p className="mt-2 text-sm font-semibold text-blue-600">${product.price}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}
//             </div>
//         </div>
//     );
// }

// export default Card2;



import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import AboutProduct from "./AboutProduct";
import { CheckCircleIcon } from "@heroicons/react/solid";

const Card2 = ({ products }) => {
  const { getProductDetail, isModalOpen, setIsModalOpen } = useContext(ProductContext);

  return (
    <div className="bg-gradient-to-tr from-slate-100 to-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => getProductDetail(product._id)}
              className="relative group bg-white/60 backdrop-blur-md shadow-xl border border-gray-200 rounded-3xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              {/* Image */}
              <div className="w-32 h-32 mb-4 rounded-full overflow-hidden shadow-md border border-white">
                <img
                  src={
                    product?.mainImage
                      ? `http://localhost:4000/${product.mainImage}`
                      : "https://img.freepik.com/free-photo/elegant-smartphone-composition_23-2149437106.jpg?t=st=1734031864~exp=1734035464~hmac=229827dd5a669e263ea3ee6cf0d2d10660dc144a127e4117ec13d030afd2ab8a&w=360"
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Info */}
              <h3 className="text-lg font-bold text-slate-800 mb-1">{product.name}</h3>
              <p className="text-sm text-slate-500 font-medium mb-1">by {product.company}</p>
              <p className="text-xs text-gray-400 mb-2">{product.category}</p>

              {/* Price + Verified */}
              <div className="flex items-center justify-center gap-2 text-emerald-600 font-semibold text-lg mt-auto">
                ${product.price}
                {product.isVerified && (
                  <CheckCircleIcon className="h-5 w-5 text-[#0d4e78]" title="Verified" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && <AboutProduct onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default Card2;

