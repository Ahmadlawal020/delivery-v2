import { apiSlice } from "./apiSlice";
import { logout, setCredentials } from "../authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Register a new user
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // Login a user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/api/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),

    // Logout a user
    logoutUser: builder.mutation({
      query: () => ({
        url: "/api/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          // console.log(err);
        }
      },
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/api/auth/refresh",
        method: "GET",
        credentials: "include", // 🔥 Ensure cookies are sent
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

// Export hooks for usage in components
export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useRefreshTokenMutation,
} = authApiSlice;
