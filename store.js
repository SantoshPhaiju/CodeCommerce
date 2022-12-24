import { configureStore } from "@reduxjs/toolkit";
import productReducer from './pages/slices/productSlice'
import userReducer from './pages/slices/userSlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer
    },
})