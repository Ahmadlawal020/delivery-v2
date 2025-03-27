// import React, { useState } from "react";
// import { useLoginUserMutation } from "../services/api/authApiSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../services/authSlice";
// import toast, { Toaster } from "react-hot-toast";
// import usePersist from "../hooks/usePersist";

// const LoginForm = ({ onSwitchToSignUp }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [persist, setPersist] = usePersist();
//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleTogglePersist = () => setPersist((prev) => !prev);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       const response = await loginUser({ email, password }).unwrap();
//       dispatch(setCredentials({ accessToken: response.accessToken }));
//       toast.success("Login successful! Redirecting to dashboard...");
//       setTimeout(() => navigate("/"), 2000);
//     } catch (err) {
//       if (err.status === 404) {
//         toast.error("Email is not registered.");
//       } else if (err.status === 401) {
//         toast.error("Incorrect password.");
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="max-sm:w-[320px] w-[396px] px-4 py-3">
//       <Toaster />
//       <header className="text-center mb-10">
//         <h1 className="text-3xl font-normal capitalize">Welcome Back</h1>
//       </header>
//       <form onSubmit={handleSubmit}>
//         <fieldset className="w-full mb-5">
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="email"
//               className="text-xs font-medium text-black mb-2"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
//           </div>
//           <div className="flex flex-col text-xs w-full mb-2">
//             <label
//               htmlFor="password"
//               className="text-xs font-medium text-black mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
//           </div>
//         </fieldset>
//         <button
//           type="submit"
//           className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 w-full text-white font-medium text-sm hover:bg-[#3b69a5]"
//           disabled={isLoading}
//         >
//           {isLoading ? "Signing In..." : "Sign In"}
//         </button>
//       </form>
//       <div className="w-full flex justify-between items-center h-auto">
//         <hr className="mt-6 mb-6 bg-[#373a3c] grow shrink h-[1px]" />
//       </div>
//       <label htmlFor="persist" className="form__persist">
//         <input
//           type="checkbox"
//           id="persist"
//           onChange={handleTogglePersist}
//           checked={persist}
//         />
//         Trust This Device
//       </label>
//       <footer className="text-center">
//         <p>
//           Don't have an account?{" "}
//           <span
//             onClick={onSwitchToSignUp}
//             className="text-[#0056D2] underline cursor-pointer"
//           >
//             Join Us Today
//           </span>
//         </p>
//       </footer>
//     </div>
//   );
// };

// export default LoginForm;

import React, { useState } from "react";
import { useLoginUserMutation } from "../services/api/authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/authSlice";
import toast, { Toaster } from "react-hot-toast";
import usePersist from "../hooks/usePersist";
import { FaArrowLeft } from "react-icons/fa";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const LoginForm = ({ onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [persist, setPersist] = usePersist();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTogglePersist = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await loginUser(formData).unwrap();
      dispatch(setCredentials({ accessToken: response.accessToken }));
      toast.success("Login successful! Redirecting to dashboard...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      if (err.status === 404) {
        toast.error("Email is not registered.");
      } else if (err.status === 401) {
        toast.error("Incorrect password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className=" min-h-screen">
      {/* Full-width content area */}
      <div className="max-w-7xl mx-auto p-6">
        <Toaster />

        {/* Login Card - Now wider but still contained */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="font-medium text-gray-800 text-xl">Welcome Back</h2>
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
                    name="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="persist"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  onChange={handleTogglePersist}
                  checked={persist}
                />
                <label
                  htmlFor="persist"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Trust This Device
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Signing In..."
                  ) : (
                    <>
                      <CheckCircleIcon className="h-5 w-5" />
                      Sign In
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
                    Don't have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={onSwitchToSignUp}
                  className="w-full md:w-auto flex justify-center py-3 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Join Us Today
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
