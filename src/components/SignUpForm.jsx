import React, { useState } from "react";
import { useRegisterUserMutation } from "../services/api/authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../services/authSlice";
import toast, { Toaster } from "react-hot-toast";

const SignUpForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userRole, setUserRole] = useState("Customer"); // Default role

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  // Validate email format
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validate password strength
  const validatePassword = (password) => {
    return password.length >= 8; // Example: Minimum 8 characters
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!validatePassword(password)) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      // Call the registerUser mutation

      const response = await registerUser({
        email,
        password,
        role: userRole, // Include the selected role
      }).unwrap();

      console.log("Registration successful:", response);

      // Store the access token and user details in Redux
      dispatch(
        setCredentials({
          accessToken: response.accessToken,
          user: response.user,
        })
      );

      // Show success toast
      toast.success("Account created successfully! Switching to sign-in...");

      // Switch to the login form after a short delay
      setTimeout(() => {
        onSwitchToLogin(); // Call the function to switch to the login form
      }, 2000); // 2 seconds delay
    } catch (err) {
      console.error("Registration failed:", err);

      // Generic error message for the user
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="max-sm:w-[320px] w-[396px] px-4 py-3">
      <Toaster /> {/* Add Toaster component to display toasts */}
      <header className="text-center mb-10">
        <h1 className="text-3xl font-normal capitalize">Create Your Account</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset className="w-full mb-5">
          {/* Email */}
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="email"
              className="text-xs font-medium text-black mb-2 cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>

          {/* User Role */}
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="userRole"
              className="text-xs font-medium text-black mb-2 cursor-pointer"
            >
              User Role
            </label>
            <select
              id="userRole"
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2] capitalize"
              required
            >
              <option value="Customer">Customer</option>
              <option value="Employee">Employee</option>
            </select>
          </div>

          {/* Password */}
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="password"
              className="text-xs font-medium text-black mb-2 cursor-pointer"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col text-xs w-full mb-2">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-medium text-black mb-2 cursor-pointer"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-[#373a3c] pt-3 pb-3 pl-4 pr-4 rounded-sm text-sm focus:outline-none focus:border-[#0056D2]"
              required
            />
          </div>
        </fieldset>

        <button
          type="submit"
          className="mt-4 bg-[#0056D2] rounded-sm pt-3 pb-3 pl-9 pr-9 w-full text-white font-medium text-sm hover:bg-[#3b69a5] capitalize"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
      <div className="w-full flex justify-between items-center h-auto">
        <hr className="mt-6 mb-6 bg-[#373a3c] grow shrink h-[1px]" />
      </div>
      <footer className="text-center">
        <p>
          Already have an account?{" "}
          <span
            onClick={onSwitchToLogin}
            className="text-[#0056D2] underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </footer>
    </div>
  );
};

export default SignUpForm;
