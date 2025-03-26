import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { useUpdatePackageMutation } from "../services/api/packageApiSlice";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const PackageCard = ({ packageData }) => {
  const userData = useAuth();
  const navigate = useNavigate();

  const [updatePackage, { isSuccess, error }] = useUpdatePackageMutation();
  const [deliveryPersonData] = useState(userData.id || "");

  const {
    id,
    priceOffer = 0,
    paymentMethod = "Not specified",
    pickupAddress = "Not specified",
    deliveryAddress = "Not specified",
    pickupDate,
    deliveryDate,
    description = "No description provided",
    deliveryPersonId,
    deliveryStatus = "Pending",
    packageId,
  } = packageData || {};

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime())
        ? null
        : date.toLocaleDateString("en-NG", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
    } catch {
      return null;
    }
  };

  const handleDetail = () => navigate(`/package-detail/${id}`);

  const onAcceptClick = async () => {
    if (deliveryPersonId) {
      toast.error("This package has already been assigned");
      return;
    }

    try {
      await updatePackage({
        id,
        deliveryPersonId: deliveryPersonData,
        deliveryStatus: "In Transit",
      });
      toast.success("Package accepted successfully");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to accept package. Please try again.");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/delivery/in-transit");
    }
  }, [isSuccess, navigate]);

  const showDetailsButton =
    userData.roles.includes("Customer") ||
    (userData.roles.includes("Employee") && deliveryStatus !== "Pending");

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    "In Transit": "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
        <div>
          <h2 className="font-medium text-gray-800">Package #{packageId}</h2>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusColors[deliveryStatus] || "bg-gray-100 text-gray-800"
          }`}
        >
          {deliveryStatus}
        </span>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-700">{description}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Payment Information
            </h3>
            <div className="mt-1 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Amount</p>
                <p className="font-medium">
                  ₦{Number(priceOffer).toLocaleString("en-NG")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Method</p>
                <p className="font-medium capitalize">
                  {paymentMethod.toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Pickup Information
            </h3>
            <p className="mt-1 text-gray-700">{pickupAddress}</p>
            {pickupDate && (
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(pickupDate) || "Date not specified"}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">
              Delivery Information
            </h3>
            <p className="mt-1 text-gray-700">{deliveryAddress}</p>
            {deliveryDate && (
              <p className="mt-1 text-xs text-gray-500">
                {formatDate(deliveryDate) || "Date not specified"}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
        {showDetailsButton && (
          <button
            onClick={handleDetail}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-md py-2 px-4 transition-colors"
          >
            View Details
          </button>
        )}

        {userData.roles.includes("Employee") && !deliveryPersonId && (
          <button
            onClick={onAcceptClick}
            className="flex items-center gap-2 text-sm text-white bg-green-600 hover:bg-green-700 rounded-md py-2 px-4 transition-colors"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Accept Delivery
          </button>
        )}

        {userData.roles.includes("Employee") && deliveryPersonId && (
          <button
            disabled
            className="flex items-center gap-2 text-sm text-gray-600 bg-gray-200 rounded-md py-2 px-4 cursor-not-allowed"
          >
            <XCircleIcon className="h-4 w-4" />
            Already Assigned
          </button>
        )}
      </div>
    </div>
  );
};

export default PackageCard;
