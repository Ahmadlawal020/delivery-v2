import { apiSlice } from "../api/apiSlice";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    initiatePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/api/payments/initiate",
        method: "POST",
        body: paymentData, // expects { email, amount }
      }),
    }),
    verifyPayment: builder.query({
      query: (reference) => `/api/payments/verify/${reference}`,
    }),
  }),
});

export const { useInitiatePaymentMutation, useVerifyPaymentQuery } =
  paymentApiSlice;
