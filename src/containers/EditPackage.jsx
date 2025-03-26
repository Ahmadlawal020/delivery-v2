import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectPackageById } from "../services/api/packageApiSlice";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  useUpdatePackageMutation,
  useDeletePackageMutation,
} from "../services/api/packageApiSlice";
import { FaArrowLeft } from "react-icons/fa";
import {
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const EditPackageForm = ({ packageData, id }) => {
  const [updatePackage, { isSuccess, error }] = useUpdatePackageMutation();
  const [deletePackage, { isSuccess: isDelSuccess, error: delError }] =
    useDeletePackageMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientName: packageData?.recipientName || "",
    recipientPhone: packageData?.recipientPhone || "",
    recipientEmail: packageData?.recipientEmail || "",
    description: packageData?.description || "",
    deliveryAddress: packageData?.deliveryAddress || "",
    pickupAddress: packageData?.pickupAddress || "",
    deliveryDate: packageData?.deliveryDate || "",
    pickupDate: packageData?.pickupDate || "",
    deliveryStatus: packageData?.deliveryStatus || "pending",
    paymentStatus: packageData?.paymentStatus || "unpaid",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSavePackageClicked = async (e) => {
    e.preventDefault();
    try {
      await updatePackage({
        id: packageData.id,
        ...formData,
      }).unwrap();

      navigate(`/package-detail/${id}`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const onDeletePackageClicked = async () => {
    try {
      await deletePackage({ id: packageData.id }).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navigation Bar */}
      <nav className="p-2 bg-white border-b border-gray-300 mb-3">
        <div className="h-11 w-full flex items-center gap-2 capitalize">
          <button
            className="px-2"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-base font-medium">Edit Package</h1>
        </div>
      </nav>

      <section className="p-6 max-w-6xl mx-auto">
        {/* Error Messages */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">
              {error.data?.message || "Update failed"}
            </p>
          </div>
        )}
        {delError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">
              {delError.data?.message || "Delete failed"}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recipient Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden lg:col-span-1">
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">
                Recipient Information
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Name</label>
                <input
                  type="text"
                  name="recipientName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.recipientName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="recipientPhone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="recipientEmail"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden lg:col-span-2">
            <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Package Details</h2>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Pickup Address
                  </label>
                  <input
                    type="text"
                    name="pickupAddress"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    name="deliveryAddress"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="datetime-local"
                    name="pickupDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.pickupDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Delivery Date
                  </label>
                  <input
                    type="datetime-local"
                    name="deliveryDate"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.deliveryDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Delivery Status
                  </label>
                  <select
                    name="deliveryStatus"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.deliveryStatus}
                    onChange={handleChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-1">
                    Payment Status
                  </label>
                  <select
                    name="paymentStatus"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.paymentStatus}
                    onChange={handleChange}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onSavePackageClicked}
            className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4 transition-colors"
          >
            <CheckCircleIcon className="h-4 w-4" />
            Save Changes
          </button>
          <button
            onClick={onDeletePackageClicked}
            className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 border border-red-200 hover:border-red-300 rounded-md py-2 px-4 transition-colors"
          >
            <TrashIcon className="h-4 w-4" />
            Delete Package
          </button>
        </div>
      </section>
    </div>
  );
};

const EditPackage = () => {
  const { id } = useParams();
  const packageData = useSelector((state) => selectPackageById(state, id));

  const content = packageData ? (
    <EditPackageForm packageData={packageData} id={id} />
  ) : (
    <div className="flex justify-center items-center h-64">
      <div className="animate-pulse text-gray-500">
        Loading package details...
      </div>
    </div>
  );

  return content;
};

export default EditPackage;
