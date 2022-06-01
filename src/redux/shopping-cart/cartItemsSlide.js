import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setItem: (state, action) => {
      const newItem = action.payload;
      if (items.length === 0) {
        state.value = [
          ...state.value,
          {
            productId: newItem.productId,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity,
            cartId: newItem.cartId,
            image: newItem.image,
          },
        ];
      }
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      console.log(newItem);
      const duplicate = state.value.filter((e) => e.name === newItem.name);
      if (duplicate.length > 0) {
        state.value = state.value.filter((e) => e.name !== newItem.name);
        state.value = [
          ...state.value,
          {
            productId: newItem.productId,
            cartId: duplicate[0].cartId,
            name: newItem.name,
            price: newItem.price,
            image: newItem.image,
            quantity: newItem.quantity + duplicate[0].quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            productId: newItem.productId,
            name: newItem.name,
            price: newItem.price,
            quantity: newItem.quantity,
            cartId: newItem.cartId,
            image: newItem.image,
          },
        ];
      }
      console.log(state.value);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) =>
            a.cartId > b.cartId ? 1 : a.cartId < b.cartId ? -1 : 0
          )
        )
      );
    },
    updateItem: (state, action) => {
      const newItem = action.payload;
      const item = state.value.filter((e) => e.name === newItem.name);
      if (item.length > 0) {
        state.value = state.value.filter((e) => e.name !== newItem.name);
        state.value = [
          ...state.value,
          {
            productId: newItem.productId,
            cartId: item[0].cartId,
            name: newItem.name,
            price: newItem.price,
            image: newItem.image,
            quantity: newItem.quantity,
          },
        ];

        let loginData = JSON.parse(localStorage.getItem("login"));

        axios
          .request({
            method: "PUT",
            url: `http://localhost:8080/api/cart`,
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
            },
            data: {
              productId: newItem.productId,
              userId: loginData.dataLogin.id,
              quantity: newItem.quantity,
            },
          })
          .then((response) => {
            console.log("ok");
          });
      }
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) =>
            a.cartId > b.cartId ? 1 : a.cartId < b.cartId ? -1 : 0
          )
        )
      );
    },
    removeItem: (state, action) => {
      let loginData = JSON.parse(localStorage.getItem("login"));
      const item = action.payload;
      state.value = state.value.filter((e) => e.name !== item.name);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(
          state.value.sort((a, b) =>
            a.cartId > b.cartId ? 1 : a.cartId < b.cartId ? -1 : 0
          )
        )
      );

      axios
        .request({
          method: "DELETE",
          url: `http://localhost:8080/api/cart/${item.cartId}`,
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
        })
        .then((response) => {
          console.log("ok");
        });
    },
    removeAllItem: (state) => {
      state.value = [];
      localStorage.removeItem("cartItems");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setItem, addItem, removeItem, updateItem, removeAllItem } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
