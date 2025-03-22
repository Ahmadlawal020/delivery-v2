import { apiSlice } from "./apiSlice";

export const depositApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Initialize Payment
    initializePayment: builder.mutation({
      query: (paymentData) => ({
        url: "/api/payments/initialize",
        method: "POST",
        body: paymentData,
      }),
    }),

    // Verify Payment
    verifyPayment: builder.query({
      query: (reference) => `/api/payments/verify/${reference}`,
    }),
  }),
});

// Export hooks for usage in components
export const { useInitializePaymentMutation, useVerifyPaymentQuery } =
  depositApiSlice;
