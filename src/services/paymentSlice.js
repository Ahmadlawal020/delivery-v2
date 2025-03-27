import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentUrl: null,
  status: "idle", // 'idle' | 'processing' | 'redirecting' | 'success' | 'failed' | 'verified'
  reference: null,
  amount: 0,
  error: null,
  verificationData: null,
  lastUpdated: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    paymentInitiated: (state, action) => {
      state.status = "processing";
      state.amount = action.payload.amount;
      state.error = null;
    },
    paymentRedirecting: (state, action) => {
      state.status = "redirecting";
      state.paymentUrl = action.payload.url;
      state.reference = action.payload.reference;
    },
    paymentVerified: (state, action) => {
      state.status = "verified";
      state.verificationData = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    paymentSuccess: (state) => {
      state.status = "success";
      state.lastUpdated = new Date().toISOString();
    },
    paymentFailed: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      state.lastUpdated = new Date().toISOString();
    },
    resetPayment: () => initialState,
    setPaymentError: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
  },
});

// Action creators
export const {
  paymentInitiated,
  paymentRedirecting,
  paymentVerified,
  paymentSuccess,
  paymentFailed,
  resetPayment,
  setPaymentError,
} = paymentSlice.actions;

// Selectors
export const selectPaymentStatus = (state) => state.payment.status;
export const selectPaymentUrl = (state) => state.payment.paymentUrl;
export const selectPaymentReference = (state) => state.payment.reference;
export const selectPaymentAmount = (state) => state.payment.amount;
export const selectPaymentError = (state) => state.payment.error;
export const selectVerificationData = (state) => state.payment.verificationData;
export const selectIsProcessing = (state) =>
  state.payment.status === "processing";
export const selectIsRedirecting = (state) =>
  state.payment.status === "redirecting";

export default paymentSlice.reducer;
