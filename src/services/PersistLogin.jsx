import { Outlet, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshTokenMutation } from "./api/authApiSlice";
import usePersist from "../hooks/usePersist";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";

import React from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { Toaster } from "react-hot-toast";

const PleaseLoginAgain = ({ errMsg }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "0.5rem",
            background: "#333",
            color: "#fff",
          },
        }}
      />

      <div className="max-w-md mx-auto p-4">
        {/* Message Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
            <FiLogIn className="h-6 w-6 text-yellow-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Session Expired
          </h2>

          <button
            onClick={() => navigate("/auth")}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FiLogIn className="h-4 w-4" />
            Go to Login Page
          </button>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-600">{errMsg}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [
    refreshToken,
    { isUninitialized, isLoading, isSuccess, isError, error },
  ] = useRefreshTokenMutation();

  useEffect(() => {
    if (
      effectRan.current === true ||
      import.meta.env.NODE_ENV !== "development"
    ) {
      //  my react version  "react": "^19.0.0",

      const verifyRefreshToken = async () => {
        // console.log("verifying refresh token");
        try {
          //const response =
          await refreshToken();
          //const { accessToken } = response.data
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content;
  if (!persist) {
    // persist: no
    // console.log("no persist");
    content = <Outlet />;
  } else if (isLoading) {
    //persist: yes, token: no
    // console.log("loading");
    content = <h1>loading...</h1>;
  } else if (isError) {
    //persist: yes, token: no
    // console.log("error");
    content = (
      <div className="errmsg">
        <PleaseLoginAgain errMsg={`${error?.data?.message}`} />
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    // console.log("success");
    content = <Outlet />;
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    // console.log("token and uninit");
    // console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};
export default PersistLogin;
