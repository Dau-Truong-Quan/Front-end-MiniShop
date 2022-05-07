import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
}

export const productListSlide = createSlice({
    name: 'productList',
    initialState,
    reducers: {
        setList: (state, action) => {                                                                                                                                                                                                                                                                                                       
            state.value = action.payload
        },
        removeList: (state) => {
            state.value = null
        },
    },
})

// Action creators are generated for each case reducer function
export const { setList, removeList } = productListSlide.actions

export default productListSlide.reducer