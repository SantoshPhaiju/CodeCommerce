import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice'
import userReducer from './slices/userSlice'
import orderReducer from './slices/orderSlice'
import categoryReducer from './slices/categorySlice'
import variantsReducer from './slices/categorySlice'

export const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        order: orderReducer,
        category: categoryReducer,
        variants: variantsReducer
    },
})