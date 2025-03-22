import { useState, useEffect } from "react";
import { LoginForm, SignUpForm, SplashScreen } from "../components";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster

const UserAuthForm = () => {
  const [authType, setAuthType] = useState("sign-in");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility
  const location = useLocation();

  // Handle switching between login and signup forms
  const handleSwitchAuth = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setAuthType((prev) => (prev === "sign-in" ? "sign-up" : "sign-in"));
      setIsTransitioning(false);

      // Show a toast when switching forms
      toast.success(
        `Switched to ${authType === "sign-in" ? "Sign Up" : "Sign In"} form`,
        {
          position: "top-center",
          duration: 2000,
        }
      );
    }, 300); // Match the transition duration
  };

  // Display a message if redirected from a protected route
  const isRedirectedFromProtectedRoute = location.state?.from === "protected";

  // Effect to hide the splash screen after a few seconds
  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);

      // Show a toast if redirected from a protected route
      if (isRedirectedFromProtectedRoute) {
        toast.error("Please log in to access this page.", {
          position: "top-center",
          duration: 3000,
        });
      }
    }, 3000); // Display splash screen for 3 seconds

    return () => clearTimeout(splashTimer); // Cleanup the timer on component unmount
  }, [isRedirectedFromProtectedRoute]);

  return (
    <section className="w-full h-screen flex justify-center items-center bg-white">
      {/* Render the Toaster component */}
      <Toaster position="top-center" />

      {showSplash ? (
        <SplashScreen />
      ) : (
        <div className="py-2">
          {/* Render the appropriate form with transition */}
          <div className="auth-form-transition">
            {authType === "sign-in" ? (
              <div className={isTransitioning ? "auth-form-hidden" : ""}>
                <LoginForm onSwitchToSignUp={handleSwitchAuth} />
              </div>
            ) : (
              <div className={isTransitioning ? "auth-form-hidden" : ""}>
                <SignUpForm onSwitchToLogin={handleSwitchAuth} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default UserAuthForm;
