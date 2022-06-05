import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const uploadImage = createSlice({
  name: "uploadImage",
  initialState,
  reducers: {
    setImage: (state, action) => {
      state.value = action.payload;
    },
    removeImage: (state) => {
      state.value = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setImage, removeImage } = uploadImage.actions;

export default uploadImage.reducer;
