import { PencilSquareIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { NavigationBack } from "../components";
import {
  selectUserById,
  useUpdateUserMutation,
} from "../services/api/userApiSlice";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ChangePasswordButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-md py-2 px-4 transition-colors"
    >
      <PencilSquareIcon className="h-4 w-4" />
      Change Password
    </button>
  );
};

const PasswordSection = () => {
  const { id } = useAuth();
  const user = useSelector((state) => selectUserById(state, id));
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const toastId = toast.loading("Updating password...");

    try {
      await updateUser({
        id: user.id,
        password: formData.newPassword,
      }).unwrap();

      toast.success("Password updated successfully!", { id: toastId });
      setShowChangePassword(false);
      setFormData({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      //   console.error("Update failed:", err);
      toast.error(err?.data?.message || "Failed to update password", {
        id: toastId,
      });
      if (err?.data?.errors) {
        setErrors(err.data.errors);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium text-gray-700">Password</h3>
        <ChangePasswordButton
          onClick={() => setShowChangePassword(!showChangePassword)}
        />
      </div>

      {showChangePassword && (
        <form onSubmit={onSaveUserClicked} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.newPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4 transition-colors disabled:opacity-50"
            >
              Update Password
            </button>
            <button
              type="button"
              onClick={() => {
                setShowChangePassword(false);
                setFormData({
                  newPassword: "",
                  confirmPassword: "",
                });
                setErrors({});
              }}
              className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-md py-2 px-4 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

const Security = () => {
  return (
    <section>
      <NavigationBack />
      <div className="max-w-3xl mx-auto p-4">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Security Settings
          </h2>
          <PasswordSection />
        </div>
      </div>
    </section>
  );
};

export default Security;
