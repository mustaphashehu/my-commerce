// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
// import AboutUser from "../users/AboutUser";

// const TableOne = ({users}) => {
//   const { getOneUser, isModalOpen, setIsModalOpen } = useContext(UserContext)
//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


//       <div className="flex flex-col">
//         <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Index
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Name
//             </h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//               Email
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//             Phone Number
//             </h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">
//             Account Type
//             </h5>
//           </div>

//         </div>

//         {users.map((user, key) => (

//           <div
//             className={`grid grid-cols-3 sm:grid-cols-5 cursor-pointer ${
//               key === users.length - 1
//                 ? ''
//                 : 'border-b border-stroke dark:border-strokedark'
//             }`}
//             key={key+1}
//             onClick={()=> getOneUser(user._id)}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <div className="flex-shrink-0">
//                 {/* <img src={brand.logo} alt="Brand" /> */}
//               </div>
//               <p className="hidden text-black dark:text-white sm:block">
//                 {key+1}
//               </p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{user.name}</p>
//             </div>

//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black">{user.email}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user?.phoneNumber}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user.role}</p>
//             </div>
//             {/* {isModalOpen && <AboutUser user={user._id} onClose={() => setIsModalOpen(false)} />} */}
//           </div>
//         ))}

//         {isModalOpen && <AboutUser onClose={() => setIsModalOpen(false)} />}
//       </div>
//     </div>
//   );
// };

// export default TableOne;





















//222222222222222222222222
// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
// import AboutUser from "../users/AboutUser";

// const TableOne = ({ users, theName }) => {
//   const { getOneUser, isModalOpen, setIsModalOpen, verifyUser, unVerifyUser, markUserAsFake } = useContext(UserContext);

//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h1>{theName}</h1>
//       <div className="flex flex-col">
//         <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Index</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Phone Number</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Account Type</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Action</h5>
//           </div>
//         </div>

//         {users.map((user, key) => (
//           <div
//             className={`grid grid-cols-4 sm:grid-cols-6 cursor-pointer ${key === users.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
//               }`}
//             key={key + 1}
//             onClick={() => getOneUser(user._id)}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <p className="hidden text-black dark:text-white sm:block">{key + 1}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{user.name}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black">{user.email}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user?.phoneNumber}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user.role}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <button
//                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   console.log("Button clicked:", theName, user._id);

//                   if (theName === "users") {
//                     verifyUser(user._id);
//                   }else if (theName === "verified users") {
//                     unVerifyUser(user._id);
//                   } else if (theName === "unverified users") {
//                     verifyUser(user._id);
//                   } else if (theName === "fake users") {
//                     markUserAsFake(user._id);
//                   }
//                 }}
//               >
//                 {theName === "users" ? "Verify" : theName === "verified users" ? "Unverify" : theName === "unverified users" ? "verify user" : theName === "pending users" ? "pending" : theName === "fake users" ? "fake" : ""}
//               </button>
//             </div>
//           </div>
//         ))}

//         {isModalOpen && <AboutUser onClose={() => setIsModalOpen(false)} />}
//       </div>
//     </div>
//   );
// };

// export default TableOne;


{/* <button 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  verifyUser(user._id);
                }}
              >
                Verify
              </button> */}


//////333333333333333333333
// import { useContext } from "react";
// import { UserContext } from "../../context/UserContext";
// import AboutUser from "../users/AboutUser";

// const TableOne = ({ users, theName }) => {
//   const { getOneUser, isModalOpen, setIsModalOpen, verifyUser, unVerifyUser, markUserAsFake, unmarkUserAsFake } = useContext(UserContext);

//   return (
//     <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
//       <h1>{theName}</h1>
//       <div className="flex flex-col">
//         <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
//           <div className="p-2.5 xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Index</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Email</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Phone Number</h5>
//           </div>
//           <div className="hidden p-2.5 text-center sm:block xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Account Type</h5>
//           </div>
//           <div className="p-2.5 text-center xl:p-5">
//             <h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5>
//           </div>
//         </div>

//         {users.map((user, key) => (
//           <div
//             className={`grid grid-cols-4 sm:grid-cols-6 cursor-pointer ${key === users.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"
//               }`}
//             key={key + 1}
//             onClick={() => getOneUser(user._id)}
//           >
//             <div className="flex items-center gap-3 p-2.5 xl:p-5">
//               <p className="hidden text-black dark:text-white sm:block">{key + 1}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black dark:text-white">{user.name}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5">
//               <p className="text-black">{user.email}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user?.phoneNumber}</p>
//             </div>
//             <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
//               <p className="text-black dark:text-white">{user.role}</p>
//             </div>
//             <div className="flex items-center justify-center p-2.5 xl:p-5 gap-2">
//               {theName === "users" && (
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     verifyUser(user._id);
//                   }}
//                 >
//                   Verify
//                 </button>
//               )}
              
//               {theName === "verified users" && (
//                 <>
//                   <button
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     unVerifyUser(user._id);
//                   }}
//                 >
//                   Unverify
//                 </button>

//                 <button
//                   className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     unVerifyUser(user._id);
//                   }}
//                 >
//                   Mark As Fake
//                 </button>
//                 </>
//               )}

//               {theName === "unverified users" && (
//                 <button
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     verifyUser(user._id);
//                   }}
//                 >
//                   Verify
//                 </button>
//               )}

//               {theName === "pending users" && (
//                 <>
//                   <button
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       verifyUser(user._id);
//                     }}
//                   >
//                     Verify
//                   </button>
//                   <button
//                     className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       markUserAsFake(user._id);
//                     }}
//                   >
//                     Mark as Fake
//                   </button>
//                 </>
//               )}

//               {theName === "fake users" && (
//                 <button
//                   className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     unmarkUserAsFake(user._id);
//                   }}
//                 >
//                   Unfake
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         {isModalOpen && <AboutUser onClose={() => setIsModalOpen(false)} />}
//       </div>
//     </div>
//   );
// };

// export default TableOne;











import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import AboutUser from "../users/AboutUser";

const TableOne = ({ users, theName }) => {
  const { getOneUser, isModalOpen, setIsModalOpen, verifyUser, unVerifyUser, markUserAsFake, unMarkUserAsFake } = useContext(UserContext);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="text-lg font-semibold mb-4">{theName}</h1>
      <div className="flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-4 rounded-sm bg-gray-200 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-3 xl:p-4 text-center font-medium uppercase">Index</div>
          <div className="p-3 xl:p-4 text-center font-medium uppercase">Name</div>
          <div className="p-3 xl:p-4 text-center font-medium uppercase">Email</div>
          <div className="hidden sm:block p-3 xl:p-4 text-center font-medium uppercase">Phone</div>
          <div className="hidden sm:block p-3 xl:p-4 text-center font-medium uppercase">Role</div>
          <div className="p-3 xl:p-4 text-center font-medium uppercase">Actions</div>
        </div>

        {/* Table Rows */}
        {users.map((user, key) => (
          <div
            key={key}
            className={`grid grid-cols-4 sm:grid-cols-6 items-center cursor-pointer 
              ${key === users.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}
            onClick={() => getOneUser(user._id)}
          >
            <div className="p-3 xl:p-4 text-center">{key + 1}</div>
            <div className="p-3 xl:p-4 text-center">{user.name}</div>
            <div className="p-3 xl:p-4 text-center">{user.email}</div>
            <div className="hidden sm:block p-3 xl:p-4 text-center">{user.phoneNumber || "-"}</div>
            <div className="hidden sm:block p-3 xl:p-4 text-center">{user.role}</div>
            <div className="p-3 xl:p-4 flex flex-wrap justify-center gap-2">
              {/* Actions based on user category */}
              {theName === "users" && (
                <>
                  <button
                    className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      verifyUser(user._id);
                    }}
                  >
                    Verify
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      markUserAsFake(user._id);
                    }}
                  >
                    Mark as Fake
                  </button>
                </>
              )}
              {theName === "verified users" && (
                <>
                  <button
                    className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      unVerifyUser(user._id);
                    }}
                  >
                    Unverify
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      markUserAsFake(user._id);
                    }}
                  >
                    Mark as Fake
                  </button>
                </>
              )}
              {theName === "unverified users" && (
                <>
                  <button
                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      verifyUser(user._id);
                    }}
                  >
                    Verify
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      markUserAsFake(user._id);
                    }}
                  >
                    Mark as Fake
                  </button>
                </>
              )}
              {theName === "pending users" && (
                <>
                  <button
                    className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      verifyUser(user._id);
                    }}
                  >
                    Verify
                  </button>
                  <button
                    className="px-3 py-1.5 text-sm bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      markUserAsFake(user._id);
                    }}
                  >
                    Mark as Fake
                  </button>
                </>
              )}
              {theName === "fake users" && (
                <button
                  className="px-3 py-1.5 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    unMarkUserAsFake(user._id);
                  }}
                >
                  Unfake
                </button>
              )}
            </div>
          </div>
        ))}

        {isModalOpen && <AboutUser onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
};

export default TableOne;
