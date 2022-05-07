import { configureStore } from '@reduxjs/toolkit'

import productModalReducer from './product-modal/productModalSlice'
import cartItemsReducer from './shopping-cart/cartItemsSlide'
import productListReducer from './productLists/productListSlide'


export const store = configureStore({
    reducer: {
        productModal: productModalReducer,
        cartItems: cartItemsReducer,
        productList : productListReducer
    },
})