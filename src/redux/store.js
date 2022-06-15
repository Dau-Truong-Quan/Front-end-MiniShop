import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import productModalReducer from "./product-modal/productModalSlice";
import cartItemsReducer from "./shopping-cart/cartItemsSlide";
import productListReducer from "./productLists/productListSlide";
import uploadImage from "./uploadImage/uploadImage";
import orderList from "./order/orderList";
import emailAndPhone from "./ForgotPassword/emailAndPhone";
import otp from "./ForgotPassword/otp";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    productModal: productModalReducer,
    cartItems: cartItemsReducer,
    productList: productListReducer,
    uploadImage: uploadImage,
    orderList: orderList,
    emailAndPhone: emailAndPhone,
    otp: otp,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
