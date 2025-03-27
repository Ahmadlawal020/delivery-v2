// import React, { useState, useEffect } from "react";
// import { FiDollarSign, FiMail } from "react-icons/fi";
// import {
//   useInitiatePaymentMutation,
//   useVerifyPaymentQuery,
// } from "../services/api/paymentApiSlice";
// import useAuth from "../hooks/useAuth";
// import { useSearchParams } from "react-router-dom";

// const Deposit = () => {
//   const [amount, setAmount] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [depositedAmount, setDepositedAmount] = useState(null);

//   const { email } = useAuth();
//   const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
//   const [searchParams] = useSearchParams();

//   // Get reference from URL or localStorage
//   const urlReference = searchParams.get("reference");
//   const storedReference = localStorage.getItem("pendingReference");
//   const reference = urlReference || storedReference;

//   // Trigger verification
//   const {
//     data: verificationData,
//     isSuccess: isVerified,
//     isFetching: isVerifying,
//   } = useVerifyPaymentQuery(reference, {
//     skip: !reference,
//   });

//   useEffect(() => {
//     if (isVerified && verificationData?.balance) {
//       setPaymentSuccess(true);
//       setDepositedAmount(verificationData.balance);

//       // Clean up
//       localStorage.removeItem("pendingReference");

//       const url = new URL(window.location);
//       url.searchParams.delete("reference");
//       window.history.replaceState({}, document.title, url.toString());
//     }
//   }, [isVerified, verificationData]);

//   const handlePayment = async () => {
//     if (!amount || amount < 100) {
//       return alert("Minimum deposit is ₦100");
//     }

//     try {
//       const response = await initiatePayment({ email, amount }).unwrap();
//       const { authorization_url, reference } = response.data;

//       // Store reference for fallback
//       localStorage.setItem("pendingReference", reference);

//       // Redirect to Paystack
//       window.location.href = authorization_url;
//     } catch (err) {
//       console.error("Payment initiation failed:", err);
//       alert("Something went wrong, try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               value={email}
//               readOnly
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Amount (NGN)
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiDollarSign className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               min="100"
//               step="100"
//             />
//           </div>
//           <p className="mt-1 text-xs text-gray-500">Minimum deposit: ₦100.00</p>
//         </div>

//         <button
//           onClick={handlePayment}
//           disabled={isLoading}
//           className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           {isLoading ? "Processing..." : "Proceed to Payment"}
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
//         <ul className="space-y-3 text-sm">
//           <li className="flex justify-between">
//             <span className="text-gray-600">Payment Status:</span>
//             <span className="font-medium capitalize">
//               {isVerifying
//                 ? "Verifying..."
//                 : paymentSuccess
//                 ? "Success"
//                 : reference
//                 ? "Failed"
//                 : "Not started"}
//             </span>
//           </li>
//           {paymentSuccess && (
//             <li className="flex justify-between">
//               <span className="text-gray-600">Amount Deposited:</span>
//               <span className="font-medium">₦{depositedAmount}</span>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Deposit;

// import React, { useState, useEffect } from "react";
// import { FiDollarSign, FiMail } from "react-icons/fi";
// import {
//   useInitiatePaymentMutation,
//   useVerifyPaymentQuery,
// } from "../services/api/paymentApiSlice";
// import { useUpdateBalanceMutation } from "../services/api/userApiSlice";
// import useAuth from "../hooks/useAuth";
// import { useSearchParams } from "react-router-dom";

// const Deposit = () => {
//   const [amount, setAmount] = useState("");
//   const [paymentSuccess, setPaymentSuccess] = useState(false);
//   const [depositedAmount, setDepositedAmount] = useState(null);

//   const { email, id: userId } = useAuth(); // Make sure useAuth returns id and email
//   const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
//   const [updateBalance] = useUpdateBalanceMutation();
//   const [searchParams] = useSearchParams();

//   // Get reference from URL or localStorage
//   const urlReference = searchParams.get("reference");
//   const storedReference = localStorage.getItem("pendingReference");
//   const reference = urlReference || storedReference;

//   // Verify payment if reference exists
//   const {
//     data: verificationData,
//     isSuccess: isVerified,
//     isFetching: isVerifying,
//   } = useVerifyPaymentQuery(reference, {
//     skip: !reference,
//   });

//   // Update user balance only once per verified transaction
//   useEffect(() => {
//     const updateUserWallet = async () => {
//       if (isVerified && verificationData?.depositedAmount > 0) {
//         const amountPaid = verificationData.depositedAmount;

//         try {
//           await updateBalance({
//             userId,
//             amount: amountPaid,
//             type: "deposit",
//           }).unwrap();

//           setPaymentSuccess(true);
//           setDepositedAmount(amountPaid);

//           localStorage.removeItem("pendingReference");

//           const url = new URL(window.location);
//           url.searchParams.delete("reference");
//           window.history.replaceState({}, document.title, url.toString());
//         } catch (err) {
//           console.error("Balance update failed:", err);
//           localStorage.removeItem("pendingReference");
//         }
//       }
//     };

//     updateUserWallet();
//   }, [isVerified, verificationData, userId, updateBalance]);

//   const handlePayment = async () => {
//     if (!amount || amount < 100) {
//       return alert("Minimum deposit is ₦100");
//     }

//     try {
//       const response = await initiatePayment({ email, amount }).unwrap();
//       const { authorization_url, reference } = response.data;

//       // Save reference for post-payment verification
//       localStorage.setItem("pendingReference", reference);

//       // Redirect to Paystack
//       window.location.href = authorization_url;
//     } catch (err) {
//       console.error("Payment initiation failed:", err);
//       alert("Something went wrong, try again.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>

//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Email Address
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiMail className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="email"
//               value={email}
//               readOnly
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Amount (NGN)
//           </label>
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <FiDollarSign className="h-5 w-5 text-gray-400" />
//             </div>
//             <input
//               type="number"
//               placeholder="Enter amount"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               min="100"
//               step="100"
//             />
//           </div>
//           <p className="mt-1 text-xs text-gray-500">Minimum deposit: ₦100.00</p>
//         </div>

//         <button
//           onClick={handlePayment}
//           disabled={isLoading}
//           className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           {isLoading ? "Processing..." : "Proceed to Payment"}
//         </button>
//       </div>

//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
//         <ul className="space-y-3 text-sm">
//           <li className="flex justify-between">
//             <span className="text-gray-600">Payment Status:</span>
//             <span className="font-medium capitalize">
//               {isVerifying
//                 ? "Verifying..."
//                 : paymentSuccess
//                 ? "Success"
//                 : reference
//                 ? "Failed"
//                 : "Not started"}
//             </span>
//           </li>
//           {paymentSuccess && (
//             <li className="flex justify-between">
//               <span className="text-gray-600">Amount Deposited:</span>
//               <span className="font-medium">₦{depositedAmount}</span>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Deposit;
// Deposit.js
import React, { useState, useEffect } from "react";
import { FiDollarSign, FiMail } from "react-icons/fi";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentQuery,
} from "../services/api/paymentApiSlice";
import useAuth from "../hooks/useAuth";
import { useSearchParams } from "react-router-dom";
import { NavigationBack } from "../components";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState(null);

  const { email } = useAuth();
  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();
  const [searchParams] = useSearchParams();

  const urlReference = searchParams.get("reference");
  const storedReference = localStorage.getItem("pendingReference");
  const reference = urlReference || storedReference;

  const {
    data: verificationData,
    isSuccess: isVerified,
    isFetching: isVerifying,
  } = useVerifyPaymentQuery(reference, {
    skip: !reference,
  });

  useEffect(() => {
    if (isVerified && verificationData?.depositedAmount > 0) {
      setPaymentSuccess(true);
      setDepositedAmount(verificationData.depositedAmount);

      localStorage.removeItem("pendingReference");

      const url = new URL(window.location);
      url.searchParams.delete("reference");
      window.history.replaceState({}, document.title, url.toString());
    }
  }, [isVerified, verificationData]);

  const handlePayment = async () => {
    if (!amount || amount < 100) {
      return alert("Minimum deposit is ₦100");
    }

    try {
      const response = await initiatePayment({ email, amount }).unwrap();
      const { authorization_url, reference } = response.data;

      localStorage.setItem("pendingReference", reference);
      window.location.href = authorization_url;
    } catch (err) {
      console.error("Payment initiation failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section>
      <NavigationBack routeTitle={"Deposit"} />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                readOnly
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (NGN)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiDollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="100"
                step="100"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Minimum deposit: ₦100.00
            </p>
          </div>

          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>

        {/* <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span className="text-gray-600">Payment Status:</span>
            <span className="font-medium capitalize">
              {isVerifying
                ? "Verifying..."
                : paymentSuccess
                ? "Success"
                : reference
                ? "Failed"
                : "Not started"}
            </span>
          </li>
          {paymentSuccess && (
            <li className="flex justify-between">
              <span className="text-gray-600">Amount Deposited:</span>
              <span className="font-medium">₦{depositedAmount}</span>
            </li>
          )}
        </ul>
      </div> */}
      </div>
    </section>
  );
};

export default Deposit;
