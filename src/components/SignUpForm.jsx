import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/authSlice";
import toast, { Toaster } from "react-hot-toast";
import { UserPlusIcon } from "@heroicons/react/24/outline";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [userRole, setUserRole] = useState("Customer");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({
        email,
        password,
        role: userRole,
      }).unwrap();

      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          user: response.user,
        })
      );

      toast.success("Account created! Redirecting to Sign In...");
      setTimeout(() => onSwitchToLogin(), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        <Toaster />

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800 text-xl">
              Create Account
            </h2>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Register As
                  </label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 capitalize"
                    required
                  >
                    <option value="Customer">User</option>
                    <option value="Employee">Delivery Personnel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Re-enter your password"
                    required
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Creating Account..."
                  ) : (
                    <>
                      <UserPlusIcon className="h-5 w-5" />
                      Sign Up
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onSwitchToLogin}
                  className="w-full md:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;

// import React, { useState } from "react";
// import { useRegisterUserMutation } from "../services/api/authApiSlice";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../services/authSlice";
// import toast, { Toaster } from "react-hot-toast";

// const SignUpForm = ({ onSwitchToLogin }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [userRole, setUserRole] = useState("Customer"); // Default role

//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const dispatch = useDispatch();

//   // Validate email format
//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   // Validate password strength
//   const validatePassword = (password) => {
//     return password.length >= 8; // Example: Minimum 8 characters
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate email
//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     // Validate password
//     if (!validatePassword(password)) {
//       toast.error("Password must be at least 8 characters long.");
//       return;
//     }

//     // Validate password match
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       // Call the registerUser mutation

//       const response = await registerUser({
//         email,
//         password,
//         role: userRole, // Include the selected role
//       }).unwrap();

//       console.log("Registration successful:", response);

//       // Store the access token and user details in Redux
//       dispatch(
//         setCredentials({
//           accessToken: response.accessToken,
//           user: response.user,
//         })
//       );

//       // Show success toast
//       toast.success("Account created successfully! Switching to sign-in...");

//       // Switch to the login form after a short delay
//       setTimeout(() => {
//         onSwitchToLogin(); // Call the function to switch to the login form
//       }, 2000); // 2 seconds delay
//     } catch (err) {
//       console.error("Registration failed:", err);

//       // Generic error message for the user
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="max-sm:w-[320px] w-[396px] px-4 py-3">
//       <Toaster /> {/* Add Toaster component to display toasts */}
//       <header className="text-center mb-10">
//         <h1 className="text-3xl font-normal capitalize">Create Your Account</h1>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <fieldset className="w-full mb-5">
//           {/* Email */}
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="email"
//               className="text-xs font-medium text-black mb-2 cursor-pointer"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
//           </div>

//           {/* User Role */}
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="userRole"
//               className="text-xs font-medium text-black mb-2 cursor-pointer"
//             >
//               User Role
//             </label>
//             <select
//               id="userRole"
//               value={userRole}
//               onChange={(e) => setUserRole(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2] capitalize"
//               required
//             >
//               <option value="Customer">Customer</option>
//               <option value="Employee">Employee</option>
//             </select>
//           </div>

//           {/* Password */}
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="password"
//               className="text-xs font-medium text-black mb-2 cursor-pointer"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
//           </div>

//           {/* Confirm Password */}
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="confirmPassword"
//               className="text-xs font-medium text-black mb-2 cursor-pointer"
//             >
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               id="confirmPassword"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
//           </div>
//         </fieldset>

//         <button
//           type="submit"
//           className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
//           disabled={isLoading}
//         >
//           {isLoading ? "Submitting..." : "Submit"}
//         </button>
//       </form>
//       <div className="w-full flex justify-between items-center h-auto">
//         <hr className="mt-6 mb-6 bg-[#373a3c] grow shrink h-[1px]" />
//       </div>
//       <footer className="text-center">
//         <p>
//           Already have an account?{" "}
//           <span
//             onClick={onSwitchToLogin}
//             className="text-[#0056D2] underline cursor-pointer"
//           >
//             Sign In
//           </span>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default SignUpForm;

// import React, { useState } from "react";
// import { useRegisterUserMutation } from "../services/api/authApiSlice";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../services/authSlice";
// import toast, { Toaster } from "react-hot-toast";
// import { FaArrowLeft } from "react-icons/fa";
// import {
//   CheckCircleIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

// const SignUpForm = ({ onSwitchToLogin }) => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     userRole: "Customer",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const [registerUser, { isLoading }] = useRegisterUserMutation();
//   const dispatch = useDispatch();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePassword = (password) => {
//     return password.length >= 8;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(formData.email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     if (!validatePassword(formData.password)) {
//       toast.error("Password must be at least 8 characters long.");
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await registerUser({
//         email: formData.email,
//         password: formData.password,
//         role: formData.userRole,
//       }).unwrap();

//       dispatch(
//         setCredentials({
//           accessToken: response.accessToken,
//           user: response.user,
//         })
//       );

//       toast.success("Account created successfully! Switching to sign-in...");
//       setTimeout(() => onSwitchToLogin(), 2000);
//     } catch (err) {
//       toast.error("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen">
//       {/* Full-width content area */}
//       <div className="max-w-7xl mx-auto p-6">
//         <Toaster />

//         {/* Sign Up Card - Matching the login form width */}
//         <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
//           <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
//             <h2 className="font-medium text-gray-800 text-xl">
//               Create Your Account
//             </h2>
//           </div>

//           <div className="p-8">
//             <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Email */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     placeholder="Enter your email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 {/* User Role */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     User Role
//                   </label>
//                   <select
//                     name="userRole"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 capitalize"
//                     value={formData.userRole}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="Customer">Customer</option>
//                     <option value="Employee">Employee</option>
//                   </select>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeSlashIcon className="h-5 w-5 text-gray-400" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Confirm Password */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Confirm password"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       required
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() =>
//                         setShowConfirmPassword(!showConfirmPassword)
//                       }
//                     >
//                       {showConfirmPassword ? (
//                         <EyeSlashIcon className="h-5 w-5 text-gray-400" />
//                       ) : (
//                         <EyeIcon className="h-5 w-5 text-gray-400" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               <div className="pt-4">
//                 <button
//                   type="submit"
//                   className="w-full md:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     "Creating Account..."
//                   ) : (
//                     <>
//                       <CheckCircleIcon className="h-5 w-5" />
//                       Create Account
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>

//             <div className="mt-8 pt-6 border-t border-gray-200">
//               <div className="relative">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-300"></div>
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="px-4 bg-white text-sm text-gray-500">
//                     Already have an account?
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <button
//                   onClick={onSwitchToLogin}
//                   className="w-full md:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                 >
//                   Sign In
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpForm;
