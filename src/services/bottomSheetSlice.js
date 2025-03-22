// slices/bottomSheetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState: {
    isFullScreen: false,
  },
  reducers: {
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
    },
  },
});

export const { setFullScreen } = bottomSheetSlice.actions;
export default bottomSheetSlice.reducer;
