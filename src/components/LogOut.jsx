import { IoIosLogOut } from "react-icons/io";
import { useLogoutUserMutation } from "../services/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

const LogoutButton = () => {
  const [logoutUser, { isSuccess, isError, error, isLoading }] =
    useLogoutUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logged out successfully!");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Logout failed. Please try again.");
    }
  }, [isError, error]);

  return (
    <button
      className="flex items-center gap-2 py-3 px-4 min-h-12"
      onClick={logoutUser}
      disabled={isLoading}
    >
      <span className="font-medium text-2xl">
        <IoIosLogOut />
      </span>
      <span className="text-sm">
        {isLoading ? "Logging Out..." : "Log Out"}
      </span>
    </button>
  );
};

export default LogoutButton;

// import { IoIosLogOut } from "react-icons/io";
// import { useLogoutUserMutation } from "../services/api/authApiSlice";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// // add some error handlers

// const LogoutButton = () => {
//   // const [logoutUser, { isLoading, isSuccess, isError, error }] =
//   const [logoutUser, { isSuccess }] = useLogoutUserMutation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isSuccess) navigate("/");
//   }, [isSuccess, navigate]);

//   return (
//     <>
//       <button
//         className="flex items-center gap-2 py-3 px-4  min-h-12 "
//         onClick={logoutUser}
//       >
//         <span className="font-medium text-2xl">
//           <IoIosLogOut />
//         </span>
//         <span className="text-sm">Log Out</span>
//       </button>
//     </>
//   );
// };

// export default LogoutButton;
