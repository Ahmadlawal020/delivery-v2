// src/features/packages/packageSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPackage: null, // Currently selected package
  filters: {
    status: "", // Filter by status (e.g., "Pending", "In Transit", "Delivered")
    senderId: "", // Filter by sender ID
    employeeId: "", // Filter by employee ID
  },
};

const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setSelectedPackage: (state, action) => {
      state.selectedPackage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
});

export const { setSelectedPackage, setFilters, resetFilters } =
  packageSlice.actions;

export default packageSlice.reducer;
