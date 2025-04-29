// import { useEffect, useState } from "react";

// const AdminComplaint = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       const token = localStorage.getItem("token");
//       const response = await fetch("http://localhost:4000/api/v1/complaint", {
//         credentials: 'include'
//       });

//       const data = await response.json();
//       setComplaints(data);
//       setLoading(false);
//     };

//     fetchComplaints();
//   }, []);

//   const updateStatus = async (complaintId, newStatus) => {
//     const token = localStorage.getItem("token");
//     const response = await fetch(`http://localhost:4000/api/v1/complaint/${complaintId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ status: newStatus }),
//       credentials: "include"
//     });

//     if (response.ok) {
//       setComplaints((prev) =>
//         prev.map((comp) =>
//           comp._id === complaintId ? { ...comp, status: newStatus } : comp
//         )
//       );
//     } else {
//       alert("Failed to update status");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold text-center mb-4">Admin Complaint Dashboard</h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : complaints.length === 0 ? (
//           <p className="text-center text-gray-500">No complaints found.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">User</th>
//                 <th className="border p-2">Complaint</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {complaints.map((comp) => (
//                 <tr key={comp._id} className="text-center">
//                   <td className="border p-2">
//                     {comp.username} <br />
//                     {/* <span className="text-sm text-gray-500">{comp?.username}</span> */}
//                   </td>
//                   <td className="border p-2">{comp.title}</td>
//                   <td className="border p-2">
//                     <span
//                       className={`px-3 py-1 text-sm rounded-full ${
//                         comp.status === "pending"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : comp.status === "resolved"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-red-200 text-red-800"
//                       }`}
//                     >
//                       {comp.status}
//                     </span>
//                   </td>
//                   <td className="border p-2">
//                     <select
//                       className="px-2 py-1 border rounded-md"
//                       value={comp.status}
//                       onChange={(e) => updateStatus(comp._id, e.target.value)}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="resolved">Resolved</option>
//                       <option value="rejected">Rejected</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminComplaint;



















// import { useEffect, useState } from "react";

// const AdminComplaint = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/v1/complaint", {
//           credentials: "include",
//         });
//         const data = await response.json();
//         setComplaints(data);
//       } catch (error) {
//         console.error("Error fetching complaints:", error);
//       }
//       setLoading(false);
//     };

//     fetchComplaints();
//   }, []);

//   const updateStatus = async (complaintId, newStatus) => {
//     try {
//       const response = await fetch(
//         `http://localhost:4000/api/v1/complaint/${complaintId}`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ status: newStatus }),
//           credentials: "include",
//         }
//       );

//       if (response.ok) {
//         setComplaints((prev) =>
//           prev.map((comp) =>
//             comp._id === complaintId ? { ...comp, status: newStatus } : comp
//           )
//         );
//       } else {
//         alert("Failed to update status");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
//         <h2 className="text-2xl font-semibold text-center mb-4">
//           Admin Complaint Dashboard
//         </h2>

//         {loading ? (
//           <p className="text-center">Loading...</p>
//         ) : complaints.length === 0 ? (
//           <p className="text-center text-gray-500">No complaints found.</p>
//         ) : (
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border p-2">User</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Phone Number</th>
//                 <th className="border p-2">Complaint</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {complaints.map((comp) => (
//                 <tr key={comp._id} className="text-center">
//                   <td className="border p-2">{comp.user?.name || "Unknown"}</td>
//                   <td className="border p-2">{comp.user?.email || "N/A"}</td>
//                   <td className="border p-2">{comp.user?.phoneNumber || "N/A"}</td>
//                   <td className="border p-2">{comp.title}</td>
//                   <td className="border p-2">
//                     <span
//                       className={`px-3 py-1 text-sm rounded-full ${
//                         comp.status === "pending"
//                           ? "bg-yellow-200 text-yellow-800"
//                           : comp.status === "resolved"
//                           ? "bg-green-200 text-green-800"
//                           : "bg-red-200 text-red-800"
//                       }`}
//                     >
//                       {comp.status}
//                     </span>
//                   </td>
//                   <td className="border p-2">
//                     <select
//                       className="px-2 py-1 border rounded-md"
//                       value={comp.status}
//                       onChange={(e) => updateStatus(comp._id, e.target.value)}
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="resolved">Resolved</option>
//                       <option value="rejected">Rejected</option>
//                     </select>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminComplaint;

















import { useEffect, useState } from "react";

const AdminComplaint = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/v1/complaint", {
          credentials: "include",
        });
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
      setLoading(false);
    };

    fetchComplaints();
  }, []);

  // Fetch a single complaint when a row is clicked
  const fetchComplaintDetails = async (complaintId) => {
    setModalLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/v1/complaint/${complaintId}`, {
        credentials: "include",
      });
      const data = await response.json();
      setSelectedComplaint(data);
    } catch (error) {
      console.error("Error fetching complaint details:", error);
    }
    setModalLoading(false);
  };

  const updateStatus = async (complaintId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/complaint/${complaintId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setComplaints((prev) =>
          prev.map((comp) =>
            comp._id === complaintId ? { ...comp, status: newStatus } : comp
          )
        );
        setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : prev));
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Admin Complaint Dashboard
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-500">No complaints found.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">User</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Complaint</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((comp) => (
                <tr
                  key={comp._id}
                  className="text-center cursor-pointer hover:bg-gray-100"
                  onClick={() => fetchComplaintDetails(comp._id)}
                >
                  <td className="border p-2">{comp.user?.name || "Unknown"}</td>
                  <td className="border p-2">{comp.user?.email || "N/A"}</td>
                  <td className="border p-2">{comp.user?.phoneNumber || "N/A"}</td>
                  <td className="border p-2">{comp.title}</td>
                  <td className="border p-2">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${
                        comp.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : comp.status === "resolved"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {comp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal for Viewing Complaint Details */}
      {selectedComplaint && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setSelectedComplaint(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedComplaint(null)}
            >
              ✖
            </button>
            <h3 className="text-xl font-semibold mb-4">Complaint Details</h3>

            {modalLoading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <>
                <p><strong>User:</strong> {selectedComplaint.user?.name || "Unknown"}</p>
                <p><strong>Email:</strong> {selectedComplaint.user?.email || "N/A"}</p>
                <p><strong>Phone Number:</strong> {selectedComplaint.user?.phoneNumber || "N/A"}</p>
                <p><strong>Complaint:</strong> {selectedComplaint.title}</p>
                <p className="mt-2"><strong>Description:</strong> {selectedComplaint.description || "No description provided."}</p>
                <p className="mt-2"><strong>Status:</strong></p>
                <select
                  className="px-2 py-1 border rounded-md w-full"
                  value={selectedComplaint.status}
                  onChange={(e) => updateStatus(selectedComplaint._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminComplaint;
