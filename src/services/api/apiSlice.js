import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logout } from "../authSlice"; // Assuming you have a logout action

const baseQuery = fetchBaseQuery({
  baseUrl: "https://deliverybe-v2.onrender.com",
  // baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Handle both 401 and 403 status codes
  if (result?.error?.status === 401 || result?.error?.status === 403) {
    // console.log("Access token expired. Attempting to refresh...");

    // Send refresh token to get new access token
    const refreshResult = await baseQuery(
      "/api/auth/refresh",
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      // console.log("Refresh token successful. Storing new access token...");

      // Store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      // Retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // console.log("Refresh token failed:", refreshResult?.error);

      // Handle refresh token failure
      if (
        refreshResult?.error?.status === 401 ||
        refreshResult?.error?.status === 403
      ) {
        // Log out the user if the refresh token is invalid or expired
        api.dispatch(logout());
        refreshResult.error.data = {
          message: "Your login has expired. Please log in again.",
        };
      }
      return refreshResult;
    }
  }

  // Handle non-JSON responses
  if (result.error && typeof result.error.data === "string") {
    result.error.data = { message: result.error.data };
  }

  return result;
};

export const apiSlice = createApi({
  tagTypes: ["User", "Package"],
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}), // No endpoints here, just base configuration
});

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
//   tagTypes: ["package", "User"],
//   endpoints: (builder) => ({}),
// });
