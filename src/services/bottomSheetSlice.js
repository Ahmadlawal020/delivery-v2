// // slices/bottomSheetSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const bottomSheetSlice = createSlice({
//   name: "bottomSheet",
//   initialState: {
//     isFullScreen: false,
//   },
//   reducers: {
//     setFullScreen: (state, action) => {
//       state.isFullScreen = action.payload;
//     },
//   },
// });

// export const { setFullScreen } = bottomSheetSlice.actions;
// export default bottomSheetSlice.reducer;

// slices/bottomSheetSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isFullScreen: false,
  currentHeight: "mid",
  heights: {
    collapsed: "18%",
    mid: "32%",
    full: "100%",
  },
  content: null,
};

const bottomSheetSlice = createSlice({
  name: "bottomSheet",
  initialState,
  reducers: {
    // openSheet: (state) => {
    //   state.isOpen = true;
    //   state.currentHeight = "mid";
    // },
    // closeSheet: (state) => {
    //   state.isOpen = false;
    // },
    setFullScreen: (state, action) => {
      state.isFullScreen = action.payload;
      state.currentHeight = action.payload ? "full" : "mid";
    },
    // setHeight: (state, action) => {
    //   if (["collapsed", "mid", "full"].includes(action.payload)) {
    //     state.currentHeight = action.payload;
    //     state.isFullScreen = action.payload === "full";
    //   }
    // },
    // setContent: (state, action) => {
    //   state.content = action.payload;
    // },
    // collapseSheet: (state) => {
    //   state.currentHeight = "collapsed";
    //   state.isFullScreen = false;
    // },
    expandToMid: (state) => {
      state.currentHeight = "mid";
      state.isFullScreen = false;
    },
    // expandToFull: (state) => {
    //   state.currentHeight = "full";
    //   state.isFullScreen = true;
    // },
  },
});

export const {
  // openSheet,
  // closeSheet,
  setFullScreen,
  // setHeight,
  // setContent,
  // collapseSheet,
  // expandToFull,
  expandToMid,
} = bottomSheetSlice.actions;

// export const selectBottomSheet = (state) => {
//   const heightValue =
//     state.bottomSheet.heights[state.bottomSheet.currentHeight];
//   return {
//     isOpen: state.bottomSheet.isOpen,
//     isFullScreen: state.bottomSheet.isFullScreen,
//     height: heightValue,
//     currentHeight: state.bottomSheet.currentHeight,
//     content: state.bottomSheet.content,
//   };
// };

export default bottomSheetSlice.reducer;
