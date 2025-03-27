import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LiaExclamationCircleSolid } from "react-icons/lia";
import { IoCardOutline } from "react-icons/io5";
import { BsQuestionCircle } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { IoBriefcaseOutline } from "react-icons/io5";
import NavigationBack from "../components/NavigationBack";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { id, roles } = useAuth();

  const user = useSelector((state) => selectUserById(state, id));

  // Display payment status notification
  useEffect(() => {
    if (state?.paymentStatus === "success") {
      toast.success("Payment successful!", {
        position: "top-center",
        style: {
          background: "#22c55e",
          color: "#fff",
        },
      });
    } else if (state?.paymentStatus === "failed") {
      toast.error("Payment failed. Please try again.", {
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
    }
  }, [state]);

  const onAddFundClicked = () => navigate("/deposit");

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <NavigationBack routeName="/" routeTitle="Payment" />

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="bg-blue-50 p-4 border-b border-blue-100">
            <h2 className="text-lg font-medium text-gray-800">Movit Balance</h2>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ₦{user?.balance?.toLocaleString("en-NG") || "0.00"}
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            <Link
              to="#"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <BsQuestionCircle className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">
                What is Movit balance?
              </span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <LiaExclamationCircleSolid className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">
                See Movit balance transactions
              </span>
            </Link>
          </div>
        </div>

        {/* Add Funds Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-800">Add Funds</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <button
              onClick={onAddFundClicked}
              className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
            >
              <IoCardOutline className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">
                Add using debit/credit card
              </span>
            </button>
            <Link
              to="#"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <GoPlus className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Bank transfer</span>
            </Link>
          </div>
        </div>

        {/* Work Profile Card (Conditional) */}
        {!roles.includes("Employee") && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Link
              to="#"
              className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
            >
              <IoBriefcaseOutline className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-700">Set up work profile</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
