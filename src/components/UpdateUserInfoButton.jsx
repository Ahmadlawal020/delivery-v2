import { useNavigate } from "react-router";
import { ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { expandToMid } from "../services/bottomSheetSlice";
import { useDispatch } from "react-redux";
import useAuth from "../hooks/useAuth";

const UpdateUserInfoButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useAuth();

  const handleNavigate = () => {
    navigate(`/edit-user/${id}`); // Adjust this route to match your profile update page
    dispatch(expandToMid());
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
      <div className="p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-yellow-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          Profile Incomplete
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Please complete your profile information before creating a package.
        </p>
        <div className="mt-6">
          <button
            onClick={handleNavigate}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Update Profile
            <ArrowRightCircleIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserInfoButton;
