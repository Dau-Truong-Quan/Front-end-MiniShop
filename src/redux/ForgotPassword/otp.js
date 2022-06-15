import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const otp = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setOTP: (state, action) => {
      state.value = action.payload;
    },
    removeOTP: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOTP, removeOTP } = otp.actions;

export default otp.reducer;
