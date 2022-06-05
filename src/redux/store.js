import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";
import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import productListReducer from "./productLists/productListSlide";
import uploadImage from "./uploadImage/uploadImage";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    productList: productListReducer,
    uploadImage: uploadImage,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
