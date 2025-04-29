import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Here, you can verify the payment status using the session_id
    // if necessary, with Stripe's API. For now, just show a success message.
  }, [location]);

  return (
    <div className="payment-success">
      <h1 className="text-2xl font-semibold">Payment Successful!</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>
    </div>
  );
};

export default PaymentSuccess;



// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const PaymentSuccess = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkPaymentStatus = async () => {
//       const urlParams = new URLSearchParams(window.location.search);
//       const sessionId = urlParams.get('session_id');

//       if (sessionId) {
//         // Call your backend to handle the payment success
//         const response = await fetch(`/api/payment-success?session_id=${sessionId}`);
//         const data = await response.json();

//         if (data.msg === "Payment successful") {
//           // Redirect to a confirmation page
//           navigate("/order-confirmation");
//         } else {
//           alert("Payment failed. Please try again.");
//         }
//       }
//     };

//     checkPaymentStatus();
//   }, [navigate]);

//   return <div>Processing your payment...</div>;
// };

// export default PaymentSuccess;

