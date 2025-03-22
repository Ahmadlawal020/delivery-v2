// import React, { useState } from "react";
// import { useLoginUserMutation } from "../services/api/authApiSlice";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../services/authSlice";
// import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster
// import usePersist from "../hooks/usePersist";
// const LoginForm = ({ onSwitchToSignUp }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [persist, setPersist] = usePersist();

//   const [loginUser, { isLoading }] = useLoginUserMutation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Validate email format
//   const validateEmail = (email) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const handleToggle = () => setPersist((prev) => !prev);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate email
//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return;
//     }

//     try {
//       // Call the loginUser mutation
//       const response = await loginUser({ email, password }).unwrap();
//       console.log("Login successful:", response); // Debugging

//       // Store the access token and user details in Redux
//       dispatch(
//         setCredentials({
//           accessToken: response.accessToken,
//           // user: response.user, // Uncomment if user data is needed
//         })
//       );

//       // Show success toast
//       toast.success("Login successful! Redirecting to dashboard...");

//       // Redirect to dashboard after successful login
//       setTimeout(() => {
//         navigate("/");
//       }, 2000); // 2 seconds delay
//     } catch (err) {
//       console.error("Login failed:", err); // Debugging

//       // Handle specific error messages from the backend
//       if (err.status === 404) {
//         toast.error("Email has not been registered yet.");
//       } else if (err.status === 401) {
//         toast.error("Wrong password."); // Explicitly say "Wrong password"
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="max-sm:w-[320px] w-[396px] px-4 py-3">
//       <Toaster /> {/* Add Toaster component to display toasts */}
//       <header className="text-center mb-10">
//         <h1 className="text-3xl font-normal capitalize">Welcome Back</h1>
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
//               placeholder="Enter your Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
//               required
//             />
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
//               placeholder="Enter your Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
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
//           onChange={handleToggle}
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

const LoginForm = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleTogglePersist = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
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
    <div className="max-sm:w-[320px] w-[396px] px-4 py-3">
      <Toaster />
      <header className="text-center mb-10">
        <h1 className="text-3xl font-normal capitalize">Welcome Back</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className="w-full mb-5">
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="email"
              className="text-xs font-medium text-black mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="password"
              className="text-xs font-medium text-black mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>
        </fieldset>
        <button
          type="submit"
          className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 w-full text-white font-medium text-sm hover:bg-[#3b69a5]"
          disabled={isLoading}
        >
          {isLoading ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <div className="w-full flex justify-between items-center h-auto">
        <hr className="mt-6 mb-6 bg-[#373a3c] grow shrink h-[1px]" />
      </div>
      <label htmlFor="persist" className="form__persist">
        <input
          type="checkbox"
          id="persist"
          onChange={handleTogglePersist}
          checked={persist}
        />
        Trust This Device
      </label>
      <footer className="text-center">
        <p>
          Don't have an account?{" "}
          <span
            onClick={onSwitchToSignUp}
            className="text-[#0056D2] underline cursor-pointer"
          >
            Join Us Today
          </span>
        </p>
      </footer>
    </div>
  );
};

export default LoginForm;
