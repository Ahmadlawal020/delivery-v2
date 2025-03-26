import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  selectUserById,
  useUpdateUserMutation,
} from "../services/api/userApiSlice";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const EditUserForm = ({ user }) => {
  const [updateUser, { isSuccess, error }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/personal-info");
    }
  }, [isSuccess, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: user.id,
        ...formData,
      }).unwrap();
      toast.success("User updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(error?.data?.message || "Failed to update user");
    }
  };

  return (
    <div>
      <Toaster position="top-center" />

      <nav className="p-2 bg-white border-b border-gray-300 mb-3">
        <div className="h-11 w-full flex items-center gap-2 capitalize">
          <button
            className="px-2"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <FaArrowLeft className="text-xl" />
          </button>
          <h1 className="text-base font-medium">Edit Profile</h1>
        </div>
      </nav>

      <section className="p-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-medium text-gray-800">Edit User Information</h2>
          </div>

          <form
            onSubmit={onSaveUserClicked}
            className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* First Name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {/* Address */}
            <div className="space-y-2 md:col-span-2">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 flex justify-end mt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

const EditUser = () => {
  const { id } = useParams();
  const user = useSelector((state) => selectUserById(state, id));

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-gray-500">Loading user data...</div>
      </div>
    );
  }

  return <EditUserForm user={user} />;
};

export default EditUser;
