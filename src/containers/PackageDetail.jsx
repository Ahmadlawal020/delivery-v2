import toast, { Toaster } from "react-hot-toast";
import {
  useDeletePackageMutation,
  useGetPackageByIdQuery,
} from "../services/api/packageApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  XCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { FaArrowLeft } from "react-icons/fa";
import { useUpdatePackageMutation } from "../services/api/packageApiSlice";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";

const ErrorMessage = ({ error }) => (
  <div className="bg-red-50 border-l-4 border-red-500 p-4 max-w-4xl mx-auto my-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <XCircleIcon className="h-5 w-5 text-red-500" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700">
          Error: {error?.data?.message || "Failed to load package details"}
        </p>
      </div>
    </div>
  </div>
);

const WarningMessage = ({ message }) => (
  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 max-w-4xl mx-auto my-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <svg
          className="h-5 w-5 text-yellow-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700">{message}</p>
      </div>
    </div>
  </div>
);

const LoadingIndicator = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-pulse text-gray-500">
      Loading package details...
    </div>
  </div>
);

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = useAuth();

  const [updatePackage] = useUpdatePackageMutation();
  const [deletePackage] = useDeletePackageMutation();

  const {
    data: packageData,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetPackageByIdQuery(id);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  if (!isSuccess || !packageData) {
    return <WarningMessage message="No package data found" />;
  }

  // Destructure the data for easier access
  const {
    senderId,
    deliveryPersonId,
    recipientName,
    recipientPhone,
    recipientEmail,
    description,
    deliveryAddress,
    pickupAddress,
    deliveryDate,
    pickupDate,
    deliveryStatus,
    paymentStatus,
    packageId,
  } = packageData;

  const statusColor =
    {
      pending: "bg-yellow-100 text-yellow-800",
      "in-transit": "bg-blue-100 text-blue-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }[deliveryStatus.toLowerCase()] || "bg-gray-100 text-gray-800";

  const paymentColor =
    paymentStatus === "paid"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  const handleEditSender = () => {
    navigate(`/personal-info`);
  };

  const handleEditShipment = () => {
    navigate(`/edit-package/${id}`);
  };

  const handleRejectDelivery = async () => {
    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} 
      max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <XCircleIcon className="h-6 w-6 text-yellow-500 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Reject Delivery Assignment
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Are you sure you want to reject this delivery assignment?
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-t border-gray-200 divide-x divide-gray-200">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performRejectDelivery();
              }}
              className="w-full py-3 text-sm font-medium text-yellow-600 hover:text-yellow-500"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full py-3 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const performRejectDelivery = async () => {
    try {
      await updatePackage({
        id,
        deliveryPersonId: null,
        deliveryStatus: "Pending",
      }).unwrap();
      navigate(-1);
      toast.success("Delivery rejected successfully", { duration: 1000 });
    } catch (err) {
      console.error("Failed to reject delivery:", err);
      toast.error(
        `Failed to reject delivery: ${
          err?.data?.message || "Please try again"
        }`,
        { duration: 4000 }
      );
    }
  };

  const handleDeletePackage = async () => {
    if (deliveryPersonId) {
      toast.error(
        "A delivery personnel is already assigned to this package. Cannot delete.",
        { duration: 4000 }
      );
      return;
    }

    toast.custom(
      (t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"} 
      max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex flex-col`}
        >
          <div className="p-4">
            <div className="flex items-start">
              <TrashIcon className="h-6 w-6 text-red-500 flex-shrink-0" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-900">
                  Delete Package
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This action cannot be undone. The package will be permanently
                  removed.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-t border-gray-200 divide-x divide-gray-200">
            <button
              onClick={() => {
                toast.dismiss(t.id);
                performDeletePackage();
              }}
              className="w-full py-3 text-sm font-medium text-red-600 hover:text-red-500"
            >
              Delete
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full py-3 text-sm font-medium text-gray-700 hover:text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000,
        position: "top-center",
      }
    );
  };

  const performDeletePackage = async () => {
    try {
      await deletePackage(id).unwrap();
      navigate(-1);
    } catch (err) {
      console.error("Failed to delete package:", err);
      toast.error(
        `Failed to delete package: ${err?.data?.message || "Please try again"}`,
        { duration: 1000 }
      );
    }
  };

  const handlePackageDelivered = async () => {
    try {
      await updatePackage({
        id,
        deliveryStatus: "Delivered",
      }).unwrap();

      toast.success("Package marked as delivered!");
    } catch (err) {
      console.error("Failed to reject delivery:", err);
      toast.error(
        `Failed to reject delivery: ${
          err?.data?.message || "Please try again"
        }`,
        { duration: 4000 }
      );
    }
  };

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
          error: {
            duration: 4000,
          },
        }}
      />

      <nav className="p-2 bg-white border-b border-gray-300 mb-3">
        <div className="h-11 w-full flex items-center gap-2 capitalize">
          <button
            className="px-2"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-base font-medium">Package Details</h1>
        </div>
      </nav>

      <section className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Package Details
            </h1>
            <p className="text-gray-500">ID: #{packageId}</p>
          </div>
          <div className="flex space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
            >
              {deliveryStatus}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${paymentColor}`}
            >
              {paymentStatus}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sender Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Sender Information</h2>
              {!userData?.roles?.includes("Employee") && (
                <button
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  onClick={handleEditSender}
                  aria-label="Edit sender information"
                >
                  <PencilSquareIcon className="h-4 w-4 mr-1" />
                  Edit
                </button>
              )}
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">
                  {senderId.firstName} {senderId.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{senderId.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{senderId.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* Combined Package and Recipient Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden lg:col-span-2">
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Shipment Details</h2>
              {!userData?.roles?.includes("Employee") && (
                <button
                  className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                  onClick={handleEditShipment}
                  aria-label="Edit shipment details"
                >
                  <PencilSquareIcon className="h-4 w-4 mr-1" />
                  Edit
                </button>
              )}
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">
                  Package
                </h3>
                <div>
                  <p className="text-sm text-gray-500">Description</p>
                  <p className="font-medium">{description}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Address</p>
                  <p className="font-medium">{pickupAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Address</p>
                  <p className="font-medium">{deliveryAddress}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pickup Date</p>
                  <p className="font-medium">
                    {new Date(pickupDate).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Delivery Date</p>
                  <p className="font-medium">
                    {new Date(deliveryDate).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-700 border-b pb-2">
                  Recipient
                </h3>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{recipientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{recipientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{recipientPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Personnel Information */}
          {deliveryPersonId && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h2 className="font-medium text-gray-800">
                  Delivery Personnel
                </h2>
                {!userData?.roles?.includes("Customer") && (
                  <button
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    onClick={handleEditSender}
                    aria-label="Edit shipment details"
                  >
                    <PencilSquareIcon className="h-4 w-4 mr-1" />
                    Edit
                  </button>
                )}
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">
                    {deliveryPersonId.firstName} {deliveryPersonId.lastName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{deliveryPersonId.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{deliveryPersonId.phoneNumber}</p>
                </div>
                <div className="pt-4">
                  <button
                    onClick={handleRejectDelivery}
                    className="w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-md py-2 px-4 transition-colors"
                  >
                    <XCircleIcon className="h-4 w-4" />
                    Reject Delivery
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-4">
          {deliveryPersonId && (
            <button
              onClick={handlePackageDelivered}
              className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800 border border-green-200 hover:border-green-300 rounded-md py-2 px-4 transition-colors"
              aria-label="Mark package as delivered"
            >
              <CheckCircleIcon className="h-4 w-4" />
              Package Delivered
            </button>
          )}

          {!userData?.roles?.includes("Employee") && (
            <button
              onClick={handleDeletePackage}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-md py-2 px-4 transition-colors"
              aria-label="Delete package"
            >
              <TrashIcon className="h-4 w-4" />
              Delete Package
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

PackageDetail.propTypes = {
  // Add prop types if this component receives any props
};

export default PackageDetail;
