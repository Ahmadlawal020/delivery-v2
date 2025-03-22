import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../services/api/apiSlice";
import authReducer from "../services/authSlice";
import paymentReducer from "../services/paymentSlice";
import packageReducer from "../services/packageSlice";
import bottomSheetReducer from "../services/bottomSheetSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    bottomSheet: bottomSheetReducer,
    payment: paymentReducer,
    package: packageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query API slice
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // Add RTK Query middleware
  devTools: false, // Enable Redux DevTools
});

setupListeners(store.dispatch);
