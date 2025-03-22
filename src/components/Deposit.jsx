// import React, { useState, useEffect } from "react";
// import {
//   useInitializePaymentMutation,
//   useVerifyPaymentQuery,
// } from "../services/api/depositApiSlice";
// import { useSearchParams } from "react-router-dom";
// import NavigationBack from "./NavigationBack";

// const Deposit = () => {
//   const [email, setEmail] = useState("ahmadlawal020@gmail.com");
//   const [amount, setAmount] = useState("");
//   const [reference, setReference] = useState("");
//   const [searchParams] = useSearchParams();
//   const [message, setMessage] = useState("");

//   const [initializePayment, { isLoading: isInitializing }] =
//     useInitializePaymentMutation();
//   const {
//     data: paymentStatus,
//     isLoading: isVerifying,
//     isError: isVerifyError,
//   } = useVerifyPaymentQuery(reference, {
//     skip: !reference,
//   });

//   useEffect(() => {
//     const ref = searchParams.get("reference");
//     if (ref) {
//       setReference(ref);
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     if (paymentStatus) {
//       if (paymentStatus.data.status === "success") {
//         setMessage("Payment successful!");
//       } else {
//         setMessage("Payment failed. Please try again.");
//       }
//     }
//   }, [paymentStatus]);

//   const handleDeposit = async () => {
//     if (!email || !amount) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const amountValue = parseFloat(amount);
//     if (isNaN(amountValue) || amountValue <= 0) {
//       alert("Please enter a valid amount.");
//       return;
//     }

//     try {
//       const response = await initializePayment({ email, amount }).unwrap();
//       window.location.href = response.data.authorization_url;
//     } catch (error) {
//       console.error("Error initializing payment:", error);
//       setMessage("Payment initialization failed. Please try again.");
//     }
//   };

//   return (
//     <div className="bg-[#eee]">
//       <NavigationBack routeName="/payment" routeTitle="deposit funds" />

//       <div className="flex flex-col bg-white mt-2.5 rounded-[5px] py-2.5">
//         <div className="pt-3 pb-3 flex justify-between px-2">
//           <span>Minimum Deposit</span>
//           <span>$10000</span>
//         </div>
//         <div className="pt-3 pb-3 flex justify-between px-2">
//           <span>Maximum Deposit</span>
//           <span>$13200</span>
//         </div>
//         <div className="pt-3 pb-3 flex justify-between px-2">
//           <span>Maximum balance</span>
//           <span>$1234000</span>
//         </div>
//       </div>

//       <div className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5 px-3">
//         <div className="flex flex-col text-xs w-full mb-2">
//           <label
//             htmlFor="email"
//             className="text-xs font-medium text-black mb-2 cursor-pointer capitalize"
//           >
//             Your Email Address
//           </label>
//           <input
//             type="email"
//             placeholder="Email"
//             className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col text-xs w-full mb-2">
//           <label
//             htmlFor="amount"
//             className="text-xs font-medium text-black mb-2 cursor-pointer capitalize"
//           >
//             Enter Amount
//           </label>
//           <input
//             type="number"
//             placeholder="Amount"
//             className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
//           onClick={handleDeposit}
//           disabled={isInitializing}
//         >
//           {isInitializing ? "Processing..." : "Proceed to Pay"}
//         </button>

//         {isVerifying && <p>Verifying payment...</p>}
//         {isVerifyError && <p>Error verifying payment. Please try again.</p>}
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default Deposit;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  useInitializePaymentMutation,
  useVerifyPaymentQuery,
} from "../services/api/depositApiSlice";
import { useUpdateBalanceMutation } from "../services/api/userApiSlice";
import {
  setPaymentUrl,
  setPaymentStatus,
  setError,
} from "../services/paymentSlice";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import NavigationBack from "./NavigationBack";

const Deposit = () => {
  const { email, userId } = useAuth();
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { paymentUrl, paymentStatus, error } = useSelector(
    (state) => state.payment
  );

  const [initializePayment, { isLoading: isInitializing }] =
    useInitializePaymentMutation();
  const {
    data: paymentData,
    isLoading: isVerifying,
    isError: isVerifyError,
  } = useVerifyPaymentQuery(reference, {
    skip: !reference,
  });

  const [updateBalance] = useUpdateBalanceMutation();

  useEffect(() => {
    const ref = searchParams.get("reference");
    if (ref) setReference(ref);
  }, [searchParams]);

  useEffect(() => {
    if (paymentData) {
      if (paymentData.status === "success") {
        dispatch(setPaymentStatus("success"));
        toast.success("Payment successful!");

        updateBalance({ userId, amount: parseFloat(amount), type: "deposit" })
          .unwrap()
          .then(() => toast.success("Balance updated successfully!"))
          .catch(() =>
            toast.error("Failed to update balance. Please contact support.")
          );

        navigate("/payment", { state: { paymentStatus: "success" } });
      } else {
        dispatch(setPaymentStatus("failed"));
        toast.error("Payment failed. Please try again.");
        navigate("/payment", { state: { paymentStatus: "failed" } });
      }
    }
  }, [paymentData, dispatch, navigate, userId, amount, updateBalance]);

  const handleDeposit = async () => {
    if (!email || !amount) return toast.error("Please fill in all fields.");

    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0)
      return toast.error("Please enter a valid amount.");

    try {
      const response = await initializePayment({ email, amount }).unwrap();
      dispatch(setPaymentUrl(response.data.authorization_url));
    } catch (error) {
      dispatch(
        setError(error.data?.message || "Payment initialization failed.")
      );
      toast.error("Payment initialization failed. Please try again.");
    }
  };

  useEffect(() => {
    if (paymentUrl) window.location.href = paymentUrl;
  }, [paymentUrl]);

  return (
    <div className="bg-[#eee]">
      <Toaster />
      <NavigationBack routeName="/payment" routeTitle="deposit funds" />
      <div className="flex flex-col bg-white mt-2.5 rounded-[5px] py-2.5">
        <div className="pt-3 pb-3 flex justify-between px-2">
          <span>Minimum Deposit</span>
          <span>$10000</span>
        </div>
        <div className="pt-3 pb-3 flex justify-between px-2">
          <span>Maximum Deposit</span>
          <span>$13200</span>
        </div>
        <div className="pt-3 pb-3 flex justify-between px-2">
          <span>Maximum Balance</span>
          <span>$1234000</span>
        </div>
      </div>
      <div className="flex flex-col bg-white mt-2.5 rounded-[10px] py-2.5 px-3">
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="email"
            className="text-xs font-medium text-black mb-2 capitalize"
          >
            Your Email Address
          </label>
          <input
            type="email"
            placeholder="Email"
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            value={email}
            readOnly
          />
        </div>
        <div className="flex flex-col text-xs w-full mb-2">
          <label
            htmlFor="amount"
            className="text-xs font-medium text-black mb-2 capitalize"
          >
            Enter Amount
          </label>
          <input
            type="number"
            placeholder="Amount"
            className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
          onClick={handleDeposit}
          disabled={isInitializing}
        >
          {isInitializing ? "Processing..." : "Proceed to Pay"}
        </button>
        {isVerifying && <p>Verifying payment...</p>}
        {isVerifyError && <p>Error verifying payment. Please try again.</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Deposit;
