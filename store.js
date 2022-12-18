import { configureStore } from "@reduxjs/toolkit";
import productReducer from './pages/slices/productSlice'

export const store = configureStore({
    reducer: {
        product: productReducer
    },
})