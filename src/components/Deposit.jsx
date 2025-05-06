import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { FiMail } from "react-icons/fi";
import {
  useInitiatePaymentMutation,
  useVerifyPaymentQuery,
} from "../services/api/paymentApiSlice";
import useAuth from "../hooks/useAuth";
import { NavigationBack } from ".";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState(null);
  const { email } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const urlReference = searchParams.get("reference");
  const storedReference = localStorage.getItem("pendingReference");
  const reference = urlReference || storedReference;

  const {
    data: verificationData,
    isSuccess,
    refetch,
    isFetching,
  } = useVerifyPaymentQuery(reference, {
    skip: !reference,
    refetchOnMountOrArgChange: true,
    pollingInterval: 2000, // Poll every 2 seconds to get updated balance
  });

  // ✅ Trigger refetch once we land back from Paystack
  useEffect(() => {
    if (reference) {
      refetch();
    }
  }, [reference, refetch]);

  // ✅ Handle verified payment result
  useEffect(() => {
    if (isSuccess && verificationData?.depositedAmount > 0) {
      // Optional delay to wait for DB sync
      const delay = setTimeout(() => {
        setPaymentSuccess(true);
        setDepositedAmount(verificationData.depositedAmount);
        localStorage.removeItem("pendingReference");
        navigate("/deposit", { replace: true }); // Clear ?reference from URL
      }, 1500);

      return () => clearTimeout(delay);
    }
  }, [isSuccess, verificationData, navigate]);

  const [initiatePayment, { isLoading }] = useInitiatePaymentMutation();

  const handlePayment = async () => {
    if (!amount || Number(amount) < 100) {
      return alert("Minimum deposit is ₦100");
    }

    try {
      const response = await initiatePayment({
        email,
        amount: Number(amount),
      }).unwrap();

      const { authorization_url, reference } = response.data;

      localStorage.setItem("pendingReference", reference);
      window.location.href = authorization_url;
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Payment failed. Try again.");
    }
  };

  return (
    <section>
      <NavigationBack routeTitle="Deposit" />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Deposit Funds</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          {isFetching && (
            <div className="mb-4 text-blue-500">Verifying payment...</div>
          )}

          {paymentSuccess && (
            <div className="mb-4 text-green-600 font-semibold">
              Deposit of ₦{depositedAmount} successful!
            </div>
          )}

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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount (NGN)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="h-5 w-5 text-gray-400">₦</span>
              </div>
              <input
                type="number"
                min="100"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Deposit;
