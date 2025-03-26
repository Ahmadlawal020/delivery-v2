import { useSelector } from "react-redux";
import { selectUserById } from "../services/api/userApiSlice";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { FaArrowLeft } from "react-icons/fa";

const UserInfo = () => {
  const { id } = useAuth();
  const navigate = useNavigate();

  const userData = useSelector((state) => selectUserById(state, id));

  if (!userData) {
    return (
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
            <p className="text-sm text-yellow-700">User not found</p>
          </div>
        </div>
      </div>
    );
  }

  const userRoleString = userData.roles?.join(", ") || "No roles";
  const statusColor = userData.active
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  const handleEdit = () => navigate(`/edit-user/${id}`);

  return (
    <div>
      {/* Navigation Bar */}

      <section className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-gray-500">ID: #{id}</p>
          </div>
          <div className="flex space-x-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">
                Personal Information
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">First Name</p>
                <p className="font-medium">{userData.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Last Name</p>
                <p className="font-medium">{userData.lastName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Roles</p>
                <p className="font-medium">{userRoleString}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">Contact Information</h2>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{userData.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">
                  {userData.address || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h2 className="font-medium text-gray-800">
                Additional Information
              </h2>
            </div>
            <div className="p-4 space-y-3">
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">
                  {userData.status || "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle</p>
                <p className="font-medium">
                  {userData.vehicle || "Not specified"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Single Edit Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-200 hover:border-blue-300 rounded-md py-2 px-4 transition-colors"
          >
            <PencilSquareIcon className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </section>
    </div>
  );
};

export default UserInfo;
