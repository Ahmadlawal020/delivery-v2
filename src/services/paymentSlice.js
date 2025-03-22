import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    paymentUrl: null, // Store the payment URL
    paymentStatus: null, // Store the payment status
    error: null, // Store any errors
  },
  reducers: {
    setPaymentUrl: (state, action) => {
      state.paymentUrl = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetPaymentState: (state) => {
      state.paymentUrl = null;
      state.paymentStatus = null;
      state.error = null;
    },
  },
});

export const { setPaymentUrl, setPaymentStatus, setError, resetPaymentState } =
  paymentSlice.actions;

export default paymentSlice.reducer;
