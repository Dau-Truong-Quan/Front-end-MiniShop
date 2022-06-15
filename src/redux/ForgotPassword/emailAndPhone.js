import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  phone: null,
  username: null,
};

export const emailAndPhone = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEmail, setPhone, setUsername } = emailAndPhone.actions;

export default emailAndPhone.reducer;
